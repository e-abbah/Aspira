import { Search, SlidersHorizontal } from 'lucide-react';
import { OpportunityFilters } from '../../types/opportunity';

interface SearchAndSortBarProps {
  search: string;
  sort: OpportunityFilters['sort'];
  onSearchChange: (value: string) => void;
  onSortChange: (value: OpportunityFilters['sort']) => void;
  onOpenFilters?: () => void; // wired up when a filter panel exists; safe no-op until then
}

const SORT_LABELS: Record<OpportunityFilters['sort'], string> = {
  bestMatch: 'Best Match',
  deadlineSoon: 'Deadline Soon',
  newest: 'Newest',
};

export function SearchAndSortBar({
  search,
  sort,
  onSearchChange,
  onSortChange,
  onOpenFilters,
}: SearchAndSortBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A6]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or subject..."
          className="w-full rounded-lg border border-[#E5E2DA] bg-white py-2.5 pl-9 pr-3 text-sm text-[#121D33] placeholder:text-[#8A93A6] focus:border-[#E0A63C] focus:outline-none focus:ring-1 focus:ring-[#E0A63C]"
        />
      </div>

      <button
        type="button"
        onClick={onOpenFilters}
        className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E2DA] px-4 py-2.5 text-sm font-medium text-[#121D33] hover:bg-[#F7F5F0]"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filter
      </button>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as OpportunityFilters['sort'])}
        className="rounded-lg border border-[#E5E2DA] bg-white px-4 py-2.5 text-sm font-medium text-[#121D33] focus:border-[#E0A63C] focus:outline-none focus:ring-1 focus:ring-[#E0A63C]"
      >
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}