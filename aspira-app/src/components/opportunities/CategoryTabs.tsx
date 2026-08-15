import { Opportunity, OpportunityCategory } from '../../types/opportunity';

interface CategoryTabsProps {
  opportunities: Opportunity[]; // full unfiltered list — counts stay stable while searching
  activeCategory: OpportunityCategory;
  onChange: (category: OpportunityCategory) => void;
}

const CATEGORIES: { label: OpportunityCategory; type?: Opportunity['type'] }[] = [
  { label: 'All' },
  { label: 'Scholarships', type: 'scholarship' },
  { label: 'Fellowships', type: 'fellowship' },
  { label: 'Competitions', type: 'competition' },
  { label: 'Study Abroad', type: 'study-abroad' },
];

export function CategoryTabs({ opportunities, activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[#E5E2DA] pb-3">
      {CATEGORIES.map(({ label, type }) => {
        const count = type ? opportunities.filter((o) => o.type === type).length : opportunities.length;
        const isActive = activeCategory === label;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive ? 'bg-[#121D33] text-white' : 'text-[#8A93A6] hover:bg-[#F7F5F0]'
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                isActive ? 'bg-white/20' : 'bg-[#F7F5F0] text-[#8A93A6]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}