// src/data/workspaceData.ts
import type {
  Application,
  DraftDocument,
  WorkspaceDocument,
  WorkspaceStats,
} from "../../types/workspace";

export const mockStats: WorkspaceStats = {
  documentsUploaded: 2,
  documentsTotal: 8,
  applicationsInProgress: 3,
  applicationsSubmitted: 1,
  documentsPending: 2,
};

export const mockDocuments: WorkspaceDocument[] = [
  {
    id: "doc-1",
    name: "Academic Transcript",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 1200,
    updatedAtLabel: "2 weeks ago",
    fileUrl: "#",
  },
  {
    id: "doc-2",
    name: "Statement of Purpose",
    kind: "file",
    status: "in_progress",
    fileSizeKb: null,
    updatedAtLabel: "in progress",
    fileUrl: null,
  },
  {
    id: "doc-3",
    name: "Certificates & Awards",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 1200,
    updatedAtLabel: "2 weeks ago",
    fileUrl: "#",
  },
  {
    id: "doc-4",
    name: "CV/Resume",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 1200,
    updatedAtLabel: "2 weeks ago",
    fileUrl: "#",
  },
  {
    id: "doc-5",
    name: "Passport Photograph",
    kind: "image",
    status: "missing",
    fileSizeKb: null,
    updatedAtLabel: "Not uploaded yet",
    fileUrl: null,
  },
  {
    id: "doc-6",
    name: "Supplemental Essays",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 250,
    updatedAtLabel: "1 day ago",
    fileUrl: "#",
  },
  {
    id: "doc-7",
    name: "Personal Statement",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 500,
    updatedAtLabel: "1 week ago",
    fileUrl: "#",
  },
  {
    id: "doc-8",
    name: "Recommendation Letter 2",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 300,
    updatedAtLabel: "3 days ago",
    fileUrl: "#",
  },
  {
    id: "doc-9",
    name: "Recommendation Letter 1",
    kind: "file",
    status: "missing",
    fileSizeKb: null,
    updatedAtLabel: "Not uploaded yet",
    fileUrl: null,
  },
  {
    id: "doc-10",
    name: "IELTS Result",
    kind: "file",
    status: "uploaded",
    fileSizeKb: 1500,
    updatedAtLabel: "5 days ago",
    fileUrl: "#",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app-1",
    programName: "Master of Public Health — University of Alberta",
    status: "in_progress",
    updatedAtLabel: "2 days ago",
  },
  {
    id: "app-2",
    programName: "MSc Data Science — University of Toronto",
    status: "in_progress",
    updatedAtLabel: "5 days ago",
  },
  {
    id: "app-3",
    programName: "MPH — McGill University",
    status: "submitted",
    updatedAtLabel: "1 week ago",
  },
];

export const mockDraft: DraftDocument = {
  id: "draft-sop",
  title: "Statement of Purpose - Draft",
  status: "in_progress",
  content:
    "My name is Bryan Stone, and I am applying for the Master of Public Health programme at the University of Alberta. With a background in...",
};
