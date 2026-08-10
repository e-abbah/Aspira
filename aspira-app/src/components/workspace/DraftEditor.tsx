// src/components/workspace/DraftEditor.tsx
import { Paperclip, RefreshCw } from "lucide-react";
import { useAutosave } from "../../stats/hooks/useAutosave";
import type { DraftDocument } from "../../types/workspace";

interface DraftEditorProps {
  draft: DraftDocument;
  onContentChange: (content: string) => void;
  onSave: (content: string) => Promise<void>;
  onUploadClick: () => void;
}

function formatSecondsAgo(seconds: number): string {
  if (seconds < 1) return "just now";
  if (seconds === 1) return "1 second ago";
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
}

export default function DraftEditor({
  draft,
  onContentChange,
  onSave,
  onUploadClick,
}: DraftEditorProps) {
  const { status, secondsSinceSave } = useAutosave({
    value: draft.content,
    onSave,
  });

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paperclip size={16} className="text-[#8A93A6]" />
          <p className="text-sm font-medium text-[#121D33]">{draft.title}</p>
        </div>
        <span className="rounded-full bg-[#FBEBD0] px-3 py-1 text-xs font-medium text-[#E0A63C]">
          In Progress
        </span>
      </div>

      <textarea
        value={draft.content}
        onChange={(e) => onContentChange(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-[#121D33] outline-none focus:border-[#E0A63C]"
        placeholder="Start writing your statement of purpose..."
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#8A93A6]">
          {status === "syncing" ? (
            <>
              <RefreshCw size={12} className="animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <span>
              Last saved{" "}
              {status === "saved" ? formatSecondsAgo(secondsSinceSave) : "—"}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onUploadClick}
          className="rounded-lg bg-[#121D33] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#1C2B4A]"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
