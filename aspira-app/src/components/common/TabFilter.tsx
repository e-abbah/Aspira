interface TabOption<T extends string> {
  label: T;
  count: number;
}

interface TabFilterProps<T extends string> {
  options: TabOption<T>[];
  active: T;
  onChange: (value: T) => void;
}

export function TabFilter<T extends string>({ options, active, onChange }: TabFilterProps<T>) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[#E5E2DA] pb-3">
      {options.map(({ label, count }) => {
        const isActive = active === label;
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