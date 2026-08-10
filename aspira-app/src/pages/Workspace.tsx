// src/pages/Workspace.tsx
import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import {
  mockApplications,
  mockDocuments,
  mockDraft,
  mockStats,
} from "../stats/api/workspaceData";
import type { WorkspaceTab } from "../types/workspace";
import StatCard from "../components/workspace/StatCard";
import WorkspaceTabs from "../components/workspace/WorkspaceTabs";
import DocumentCard from "../components/workspace/DocumentCard";
import DraftEditor from "../components/workspace/DraftEditor";
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function Workspace() {
  const [documents] = useState(mockDocuments);
  const [applications] = useState(mockApplications);
  const [draft, setDraft] = useState(mockDraft);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("documents");

  const handleUpload = useCallback((documentId: string) => {
    // Hook up to a hidden <input type="file"> or an upload modal.
    // Kept as a callback so DocumentCard stays presentation-only.
    console.log("Upload requested for document:", documentId);
  }, []);

  const handleView = useCallback(
    (documentId: string) => {
      const doc = documents.find((d) => d.id === documentId);
      if (doc?.fileUrl) window.open(doc.fileUrl, "_blank", "noopener,noreferrer");
    },
    [documents]
  );

  // No backend yet — resolves immediately so the autosave UI still works locally.
  const handleDraftSave = useCallback(async (_content: string) => {
    return Promise.resolve();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#F7F5F0] p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#121D33]">Application Workspace</h1>
        <p className="text-sm text-[#8A93A6]">
          Manage your documents, applications, and checklists
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          value={`${mockStats.documentsUploaded}/${mockStats.documentsTotal}`}
          label="Documents"
          sublabel="Uploaded"
        />
        <StatCard
          value={String(mockStats.applicationsInProgress)}
          label="Applications"
          sublabel="In progress"
        />
        <StatCard
          value={String(mockStats.applicationsSubmitted)}
          label="Submitted"
          sublabel="Applications"
        />
        <StatCard
          value={String(mockStats.documentsPending)}
          label="Pending"
          sublabel="Documents"
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <WorkspaceTabs activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "documents" && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#121D33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1C2B4A]"
          >
            <Plus size={16} />
            Upload Documents
          </button>
        )}
      </div>

      {activeTab === "documents" ? (
        <>
          <h2 className="mb-3 text-sm font-semibold text-[#121D33]">My Documents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onUpload={handleUpload}
                onView={handleView}
              />
            ))}
          </div>

          <div className="mt-6">
            <DraftEditor
              draft={draft}
              onContentChange={(content) =>
                setDraft((prev) => ({ ...prev, content }))
              }
              onSave={handleDraftSave}
              onUploadClick={() => console.log("Upload draft as final document")}
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {applications.map((app) => (
            <div key={app.id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-[#121D33]">{app.programName}</p>
              <p className="text-xs text-[#8A93A6]">
                Updated {app.updatedAtLabel} •{" "}
                {app.status === "submitted" ? "Submitted" : "In progress"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
