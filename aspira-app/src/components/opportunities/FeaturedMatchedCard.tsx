import { Bookmark, Calendar } from 'lucide-react';
import { Opportunity } from '../../types/opportunity';
import { getDeadlineLabel } from '../../stats/utils/date';

interface FeaturedMatchCardProps {
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

export function FeaturedMatchCard({ opportunity, onToggleSave, onApply }: FeaturedMatchCardProps) {
  const { id, type, title, organization, fundingLabel, deadline, matchScore, isSaved, isApplied } =
    opportunity;

  return (
    <div className="flex flex-col justify-between rounded-xl bg-[#121D33] p-6 text-white">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            {TYPE_LABEL[type]}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            {matchScore}% match
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-white/60">{organization}</p>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="font-medium">{fundingLabel}</span>
          <span className="flex items-center gap-1 text-white/60">
            <Calendar className="h-3.5 w-3.5" />
            {getDeadlineLabel(deadline)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onApply(id)}
          disabled={isApplied}
          className="flex-1 rounded-lg bg-[#E0A63C] px-4 py-2 text-sm font-medium text-[#121D33] transition-colors hover:bg-[#c99530] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60"
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
        <button
          type="button"
          onClick={() => onToggleSave(id)}
          aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
          aria-pressed={isSaved}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 transition-colors hover:bg-white/10"
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-[#E0A63C] text-[#E0A63C]' : 'text-white'}`} />
        </button>
      </div>
    </div>
  );
}