// src/components/workspace/DocumentStatusBadge.tsx
import type { DocumentStatus } from "../../types/workspace";

const STATUS_CONFIG: Record<
  DocumentStatus,
  { label: string; pillClasses: string }
> = {
  uploaded: {
    label: "Uploaded",
    pillClasses: "bg-green-100 text-green-700",
  },
  missing: {
    label: "Missing",
    pillClasses: "bg-red-100 text-red-600",
  },
  in_progress: {
    label: "In Progress",
    pillClasses: "bg-[#FBEBD0] text-[#E0A63C]",
  },
};

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export default function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${config.pillClasses}`}
    >
      {config.label}
    </span>
  );
}
