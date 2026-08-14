import { OpportunityStats } from '../../types/opportunity';
import { StatCard } from './StatCard';

interface StatsGridProps {
  stats: OpportunityStats | null;
}

export function StatsGrid({ stats }: StatsGridProps) {
  // Skeleton state while stats load — keeps layout stable instead of collapsing to nothing
  if (!stats) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[104px] animate-pulse rounded-xl border border-[#E5E2DA] bg-white" />
        ))}
      </div>
    );
  }

  const items = [
    { value: stats.total, label: 'Total Opportunities', sublabel: 'Updated weekly' },
    { value: stats.highMatchCount, label: 'High Match (80%+)', sublabel: 'Based on your profile' },
    { value: stats.savedCount, label: 'Saved', sublabel: 'In your shortlist' },
    { value: stats.appliedCount, label: 'Applied', sublabel: 'This cycle' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}