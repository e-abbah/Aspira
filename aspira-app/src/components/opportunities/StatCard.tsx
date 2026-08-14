import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  sublabel: string;
  icon?: LucideIcon;
}

export function StatCard({ value, label, sublabel, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E2DA] bg-white p-5">
      <div className="flex items-start justify-between">
        <span className="text-3xl font-semibold text-[#121D33]">{value}</span>
        {Icon && <Icon className="h-5 w-5 text-[#E0A63C]" />}
      </div>
      <p className="mt-2 text-sm font-medium text-[#121D33]">{label}</p>
      <p className="text-xs text-[#8A93A6]">{sublabel}</p>
    </div>
  );
}