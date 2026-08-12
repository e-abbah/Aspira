import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A93A6]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or subject..."
        className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-[#121D33] outline-none focus:border-[#121D33]"
      />
    </div>
  );
}