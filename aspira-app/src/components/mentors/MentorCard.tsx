import { Lock, Star } from 'lucide-react';
import { Mentor } from '../../../types/mentor';

interface MentorCardProps {
  mentor: Mentor;
  isUserPremium: boolean;
  onViewProfile: (id: string) => void;
  onBookSession: (id: string) => void;
}

export function MentorCard({ mentor, isUserPremium, onViewProfile, onBookSession }: MentorCardProps) {
  const { id, name, title, affiliation, tags, bio, rating, sessionCount, availabilityLabel, isPremium } =
    mentor;

  const locked = isPremium && !isUserPremium;

  return (
    <div className="rounded-xl border border-[#E5E2DA] bg-white p-6">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 rounded-full bg-[#F7F5F0]" />
        <div>
          <h3 className="text-base font-semibold text-[#121D33]">{name}</h3>
          <p className="text-xs text-[#8A93A6]">{title}</p>
          <p className="text-xs text-[#8A93A6]">{affiliation}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-medium text-[#121D33]"
          >
            {tag}
          </span>
        ))}
        {isPremium && (
          <span className="flex items-center gap-1 rounded-full bg-[#E0A63C]/15 px-3 py-1 text-xs font-medium text-[#121D33]">
            <Lock className="h-3 w-3" />
            Premium
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-[#121D33]/80">{bio}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-[#8A93A6]">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-[#E0A63C] text-[#E0A63C]" />
          {rating.toFixed(1)}
          <span>({sessionCount} sessions)</span>
        </span>
        <span>{availabilityLabel}</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewProfile(id)}
          className="flex-1 rounded-lg border border-[#E5E2DA] px-4 py-2 text-sm font-medium text-[#121D33] hover:bg-[#F7F5F0]"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={() => !locked && onBookSession(id)}
          disabled={locked}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            locked
              ? 'cursor-not-allowed bg-[#F7F5F0] text-[#8A93A6]'
              : 'bg-[#121D33] text-white hover:bg-[#1c2b4d]'
          }`}
        >
          {locked ? 'Unlock with Premium' : 'Book Session'}
        </button>
      </div>
    </div>
  );
}