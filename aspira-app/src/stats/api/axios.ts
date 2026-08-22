import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends/receives the httpOnly refresh cookie
});


let currentAccessToken: string | null = null;
export const setAxiosAccessToken = (token: string | null) => {
  currentAccessToken = token;
};

api.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        setAxiosAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        setAxiosAccessToken(null);
        window.location.href = "/login"; // refresh token is dead too — force re-login
      }
    }
    return Promise.reject(error);
  }
);