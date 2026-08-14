import { useCallback, useEffect, useMemo, useState } from 'react';
import { Opportunity, OpportunityFilters, OpportunityCategory } from '../../types/opportunity';
import {
  getOpportunities,
  toggleSaveOpportunity,
  applyToOpportunity,
  filterOpportunities,
} from '../services/opportunityService';

const DEFAULT_FILTERS: OpportunityFilters = {
  search: '',
  category: 'All',
  sort: 'bestMatch',
};

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filters, setFilters] = useState<OpportunityFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOpportunities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError('Could not load opportunities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  const filteredOpportunities = useMemo(
    () => filterOpportunities(opportunities, filters),
    [opportunities, filters]
  );

  const topMatches = useMemo(
    () => [...opportunities].sort((a, b) => b.matchScore - a.matchScore).slice(0, 2),
    [opportunities]
  );

  const handleToggleSave = useCallback(async (id: string) => {
    // optimistic update
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, isSaved: !o.isSaved } : o)));
    try {
      await toggleSaveOpportunity(id);
    } catch {
      // revert on failure
      setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, isSaved: !o.isSaved } : o)));
    }
  }, []);

  const handleApply = useCallback(async (id: string) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, isApplied: true } : o)));
    try {
      await applyToOpportunity(id);
    } catch {
      setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, isApplied: false } : o)));
    }
  }, []);

  const setSearch = (search: string) => setFilters((f: OpportunityFilters) => ({ ...f, search }));
  const setCategory = (category: OpportunityCategory) => setFilters((f: OpportunityFilters) => ({ ...f, category }));
  const setSort = (sort: OpportunityFilters['sort']) => setFilters((f: OpportunityFilters) => ({ ...f, sort }));

  return {
    opportunities: filteredOpportunities,
    topMatches,
    filters,
    isLoading,
    error,
    setSearch,
    setCategory,
    setSort,
    toggleSave: handleToggleSave,
    applyTo: handleApply,
    refetch: loadOpportunities,
  };
}