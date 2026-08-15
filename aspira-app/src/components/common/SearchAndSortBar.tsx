import { Search, SlidersHorizontal } from 'lucide-react';

interface SortOption<TSort extends string> {
  value: TSort;
  label: string;
}

interface SearchAndSortBarProps<TSort extends string> {
  search: string;
  sort: TSort;
  sortOptions: SortOption<TSort>[];
  placeholder?: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: TSort) => void;
  onOpenFilters?: () => void;
}

export function SearchAndSortBar<TSort extends string>({
  search,
  sort,
  sortOptions,
  placeholder = 'Search...',
  onSearchChange,
  onSortChange,
  onOpenFilters,
}: SearchAndSortBarProps<TSort>) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A6]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
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
        onChange={(e) => onSortChange(e.target.value as TSort)}
        className="rounded-lg border border-[#E5E2DA] bg-white px-4 py-2.5 text-sm font-medium text-[#121D33] focus:border-[#E0A63C] focus:outline-none focus:ring-1 focus:ring-[#E0A63C]"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}