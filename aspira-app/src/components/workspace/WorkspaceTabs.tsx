// src/components/workspace/WorkspaceTabs.tsx
import type { WorkspaceTab } from "../../types/workspace";

interface WorkspaceTabsProps {
  activeTab: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
}

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: "documents", label: "Documents" },
  { id: "applications", label: "Applications" },
];

export default function WorkspaceTabs({ activeTab, onChange }: WorkspaceTabsProps) {
  return (
    <div className="inline-flex rounded-lg bg-[#EDEBE6] p-1">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-[#121D33] shadow-sm"
                : "text-[#8A93A6] hover:text-[#121D33]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
