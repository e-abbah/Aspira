import { Play, BookOpen, PenLine } from 'lucide-react';
import { ResourceType } from '../../types/learningHub';

const TYPE_CONFIG: Record<ResourceType, { label: string; Icon: typeof Play }> = {
  video: { label: 'Video', Icon: Play },
  reading: { label: 'Reading', Icon: BookOpen },
  practice: { label: 'Practice', Icon: PenLine },
};

interface ResourceTypeBadgeProps {
  type: ResourceType;
}

export function ResourceTypeBadge({ type }: ResourceTypeBadgeProps) {
  const { label, Icon } = TYPE_CONFIG[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-[#121D33]">
      <Icon size={12} />
      {label}
    </span>
  );
}