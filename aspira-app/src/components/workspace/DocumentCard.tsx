// src/components/workspace/DocumentCard.tsx
import { FileText, Image as ImageIcon, ExternalLink, Upload } from "lucide-react";
import type { WorkspaceDocument } from "../../types/workspace";
import DocumentStatusBadge from "./DocumentStatusBadge";

const ICON_BOX_CLASSES: Record<WorkspaceDocument["status"], string> = {
  uploaded: "bg-green-50 text-green-600",
  missing: "bg-red-50 text-red-500",
  in_progress: "bg-[#FBEBD0] text-[#E0A63C]",
};

function formatMeta(doc: WorkspaceDocument): string {
  if (doc.status === "missing") return "Not uploaded yet";
  const size = doc.fileSizeKb
    ? doc.fileSizeKb >= 1000
      ? `${(doc.fileSizeKb / 1000).toFixed(1)} Mb`
      : `${doc.fileSizeKb} Kb`
    : null;
  return size ? `${size} • Updated ${doc.updatedAtLabel}` : doc.updatedAtLabel;
}

interface DocumentCardProps {
  document: WorkspaceDocument;
  onUpload: (documentId: string) => void;
  onView: (documentId: string) => void;
}

export default function DocumentCard({
  document,
  onUpload,
  onView,
}: DocumentCardProps) {
  const Icon = document.kind === "image" ? ImageIcon : FileText;
  const canView = document.status === "uploaded" && document.fileUrl;

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${ICON_BOX_CLASSES[document.status]}`}
        >
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#121D33]">{document.name}</p>
          <p className="text-xs text-[#8A93A6]">{formatMeta(document)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DocumentStatusBadge status={document.status} />
        {canView ? (
          <button
            type="button"
            onClick={() => onView(document.id)}
            aria-label={`View ${document.name}`}
            className="text-[#8A93A6] transition-colors hover:text-[#121D33]"
          >
            <ExternalLink size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onUpload(document.id)}
            aria-label={`Upload ${document.name}`}
            className="text-[#8A93A6] transition-colors hover:text-[#121D33]"
          >
            <Upload size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
