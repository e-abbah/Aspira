// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode, useRef} from "react";
import { api } from "../stats/api/axios";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean; // true while we attempt the silent refresh on load
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
   const hasAttemptedRefresh = useRef(false);

  // On app load, try to silently refresh using the httpOnly cookie.
  // If it succeeds, the user stays "logged in" across a page reload.
  // If it fails (no cookie / expired), they're just treated as logged out.
  useEffect(() => {
     if (hasAttemptedRefresh.current) return;
    hasAttemptedRefresh.current = true;
    api.post("/auth/refresh")
      .then((res) => setAccessToken(res.data.accessToken))
      .catch(() => setAccessToken(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}