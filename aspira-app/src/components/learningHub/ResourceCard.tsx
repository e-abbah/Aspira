import { Check, Lock, Clock, Star } from 'lucide-react';
import { LearningResource } from '../../types/learningHub';
import { ResourceTypeBadge } from './ResourceTypeBadge';
import { DifficultyBadge } from './DifficultyBadge';

interface ResourceCardProps {
  resource: LearningResource;
  onAction: (resource: LearningResource) => void;
}

function getFooterConfig(resource: LearningResource) {
  if (resource.isPremium) {
    return { label: 'Unlock with Premium', disabled: true, variant: 'muted' as const };
  }
  switch (resource.status) {
    case 'completed':
      return { label: 'Completed · Review again', disabled: false, variant: 'muted' as const };
    case 'in-progress':
      return { label: 'Continue', disabled: false, variant: 'dark' as const };
    default:
      return { label: 'Start', disabled: false, variant: 'dark' as const };
  }
}

export function ResourceCard({ resource, onAction }: ResourceCardProps) {
  const footer = getFooterConfig(resource);

  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <ResourceTypeBadge type={resource.type} />
          <DifficultyBadge difficulty={resource.difficulty} />
        </div>

        {resource.isPremium && (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-[#8A93A6]">
            <Lock size={12} />
            Premium
          </span>
        )}
        {!resource.isPremium && resource.status === 'completed' && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300">
            <Check size={14} className="text-[#121D33]" />
          </span>
        )}
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug text-[#121D33]">
        {resource.title}
      </h3>

      <div className="mt-3 flex items-center gap-3 text-xs text-[#8A93A6]">
        <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-[#121D33]">
          {resource.subject}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {resource.durationMinutes} mins
        </span>
        <span className="flex items-center gap-1">
          <Star size={12} className="fill-[#E0A63C] text-[#E0A63C]" />
          {resource.rating}
        </span>
      </div>

      {resource.status === 'in-progress' && !resource.isPremium && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-[#8A93A6]">
            <span>Progress</span>
            <span>{resource.progressPercent ?? 0}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200">
            <div
              className="h-1.5 rounded-full bg-[#121D33]"
              style={{ width: `${resource.progressPercent ?? 0}%` }}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={footer.disabled}
        onClick={() => onAction(resource)}
        className={
          footer.variant === 'dark'
            ? 'mt-4 w-full rounded-lg bg-[#121D33] py-2.5 text-sm font-medium text-white transition hover:bg-[#1C2B4A]'
            : 'mt-4 w-full cursor-not-allowed rounded-lg bg-slate-100 py-2.5 text-sm font-medium text-[#8A93A6]'
        }
      >
        {footer.label}
      </button>
    </div>
  );
}