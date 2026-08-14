import { useEffect, useState } from 'react';
import { OpportunityStats } from '../../types/opportunity';
import { getOpportunityStats } from '../services/opportunityService';

export function useOpportunityStats(refreshKey?: unknown) {
  const [stats, setStats] = useState<OpportunityStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    getOpportunityStats().then((data) => {
      if (!cancelled) setStats(data);
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return stats;
}