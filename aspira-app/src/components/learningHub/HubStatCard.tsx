interface HubStatCardProps {
  value: string;
  label: string;
  sublabel: string;
}

export function HubStatCard({ value, label, sublabel }: HubStatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-3xl font-bold text-[#121D33]">{value}</p>
      <p className="mt-3 text-sm font-medium text-[#121D33]">{label}</p>
      <p className="mt-1 text-xs text-[#8A93A6]">{sublabel}</p>
    </div>
  );
}