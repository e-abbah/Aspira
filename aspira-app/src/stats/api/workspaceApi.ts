// src/api/workspaceApi.ts
import type {
  Application,
  DraftDocument,
  WorkspaceDocument,
  WorkspaceStats,
} from "../../types/workspace";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export class WorkspaceApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "WorkspaceApiError";
  }
}

export function toErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (err instanceof WorkspaceApiError) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}


async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...init,
    });
  } catch {
    throw new WorkspaceApiError("Network error — check your connection.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new WorkspaceApiError(
      body?.error?.message ?? `Request failed (${response.status})`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export interface WorkspaceSummaryResponse {
  stats: WorkspaceStats;
  documents: WorkspaceDocument[];
  applications: Application[];
}

export const workspaceApi = {
  getSummary: (userId: string) =>
    request<WorkspaceSummaryResponse>(`/workspace/${userId}`),

  uploadDocument: (userId: string, documentId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_BASE_URL}/workspace/${userId}/documents/${documentId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then(async (res) => {
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new WorkspaceApiError(
          body?.error?.message ?? "Upload failed",
          res.status
        );
      }
      return res.json() as Promise<WorkspaceDocument>;
    });
  },

  getDraft: (userId: string, draftId: string) =>
    request<DraftDocument>(`/workspace/${userId}/drafts/${draftId}`),

  saveDraft: (userId: string, draftId: string, content: string) =>
    request<DraftDocument>(`/workspace/${userId}/drafts/${draftId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    }),
};
