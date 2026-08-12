import { ExamCategoryFilter } from '../../types/learningHub';

interface CategoryFilterPillsProps {
  categories: ExamCategoryFilter[];
  active: string;
  onChange: (id: string) => void;
}

export function CategoryFilterPills({ categories, active, onChange }: CategoryFilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={
            active === category.id
              ? 'flex items-center gap-2 rounded-full bg-[#121D33] px-4 py-2 text-sm font-medium text-white'
              : 'flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#121D33]'
          }
        >
          {category.label}
          <span
            className={
              active === category.id
                ? 'rounded-full bg-white/20 px-1.5 text-xs'
                : 'rounded-full bg-slate-100 px-1.5 text-xs text-[#8A93A6]'
            }
          >
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}