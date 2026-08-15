import { Bookmark, BookmarkCheck, Calendar, ExternalLink } from 'lucide-react';
import { Opportunity } from '../../types/opportunity';
import { getDeadlineLabel, isClosingSoon } from '../../stats/utils/date';

interface OpportunityListItemProps {
  opportunity: Opportunity;
  onToggleSave: (id: string) => void;
  onApply: (id: string) => void;
}

const TYPE_LABEL: Record<Opportunity['type'], string> = {
  scholarship: 'Scholarship',
  fellowship: 'Fellowship',
  competition: 'Competition',
  'study-abroad': 'Study Abroad',
};

export function OpportunityListItem({ opportunity, onToggleSave, onApply }: OpportunityListItemProps) {
  const {
    id,
    type,
    title,
    organization,
    organizationRegion,
    description,
    tags,
    fundingLabel,
    deadline,
    matchScore,
    isSaved,
    isApplied,
  } = opportunity;

  const deadlineLabel = getDeadlineLabel(deadline);
  const closingSoon = isClosingSoon(deadline);

  return (
    <div className="rounded-xl border border-[#E5E2DA] bg-white p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-medium text-[#121D33]">
          {TYPE_LABEL[type]}
        </span>
        <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-medium text-[#121D33]">
          {matchScore}% match
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            closingSoon ? 'bg-[#E0A63C]/15 text-[#121D33]' : 'bg-[#F7F5F0] text-[#121D33]'
          }`}
        >
          {deadlineLabel}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-[#121D33]">{title}</h3>
      <p className="mt-1 text-sm text-[#8A93A6]">
        {organization}
        {organizationRegion ? ` · ${organizationRegion}` : ''}
      </p>

      <p className="mt-3 text-sm text-[#121D33]/80">{description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[#E5E2DA] px-2.5 py-1 text-xs text-[#8A93A6]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm">
          <span className="font-semibold text-[#121D33]">{fundingLabel}</span>
          <span className="flex items-center gap-1 text-[#8A93A6]">
            <Calendar className="h-3.5 w-3.5" />
            {deadlineLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onApply(id)}
            disabled={isApplied}
            className="flex items-center gap-1.5 rounded-lg bg-[#121D33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1c2b4d] disabled:cursor-not-allowed disabled:bg-[#8A93A6]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {isApplied ? 'Applied' : 'Apply Now'}
          </button>
          <button
            type="button"
            onClick={() => onToggleSave(id)}
            aria-pressed={isSaved}
            className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              isSaved
                ? 'border-[#121D33] bg-[#121D33] text-white'
                : 'border-[#E5E2DA] text-[#121D33] hover:bg-[#F7F5F0]'
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}