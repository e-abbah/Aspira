// src/types/workspace.ts

export type DocumentStatus = "uploaded" | "missing" | "in_progress";

/** Drives which icon a document card renders */
export type DocumentKind = "file" | "image";

export interface WorkspaceDocument {
  id: string;
  name: string;
  kind: DocumentKind;
  status: DocumentStatus;
  fileSizeKb: number | null; // null when nothing has been uploaded yet
  updatedAtLabel: string; // pre-formatted, e.g. "2 weeks ago"
  fileUrl: string | null;
}

export type ApplicationStatus = "in_progress" | "submitted";

export interface Application {
  id: string;
  programName: string;
  status: ApplicationStatus;
  updatedAtLabel: string;
}

export interface WorkspaceStats {
  documentsUploaded: number;
  documentsTotal: number;
  applicationsInProgress: number;
  applicationsSubmitted: number;
  documentsPending: number;
}

export type WorkspaceTab = "documents" | "applications";

export type DraftSyncStatus = "idle" | "syncing" | "saved";

export interface DraftDocument {
  id: string;
  title: string;
  status: "in_progress" | "ready";
  content: string;
}
