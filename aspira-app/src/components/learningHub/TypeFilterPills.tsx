import { ResourceTypeFilter } from '../../types/learningHub';

const OPTIONS: { id: ResourceTypeFilter; label: string }[] = [
  { id: 'all', label: 'All Types' },
  { id: 'video', label: 'Video' },
  { id: 'reading', label: 'Reading' },
  { id: 'practice', label: 'Practice' },
];

interface TypeFilterPillsProps {
  active: ResourceTypeFilter;
  onChange: (value: ResourceTypeFilter) => void;
}

export function TypeFilterPills({ active, onChange }: TypeFilterPillsProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={
            active === option.id
              ? 'rounded-lg bg-[#121D33] px-4 py-2.5 text-sm font-medium text-white'
              : 'rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#121D33]'
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}