import { useCallback, useEffect, useMemo, useState } from 'react';
import { Mentor, MentorFilters, MentorCategory, MentorSort } from '../../types/mentor';
import { getMentors, bookSession } from '../services/mentorService';

const DEFAULT_FILTERS: MentorFilters = {
  search: '',
  category: 'All',
  sort: 'bestMatch',
};

function applyFilters(list: Mentor[], filters: MentorFilters): Mentor[] {
  let result = [...list];

  if (filters.category !== 'All') {
    result = result.filter((m) => m.category === filters.category);
  }

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  switch (filters.sort) {
    case 'topRated':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'availableSoon':
      // placeholder until backend provides real next-slot data
      break;
    case 'bestMatch':
    default:
      result.sort((a, b) => b.rating - a.rating || b.sessionCount - a.sessionCount);
  }

  return result;
}

export function useMentors() {
  const [allMentors, setAllMentors] = useState<Mentor[]>([]);
  const [filters, setFilters] = useState<MentorFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAllMentors(await getMentors());
    } catch {
      setError('Could not load mentors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Unfiltered list stays stable so category-tab counts don't shift while searching.
  const filteredMentors = useMemo(() => applyFilters(allMentors, filters), [allMentors, filters]);

  const handleBookSession = useCallback(async (mentorId: string) => {
    try {
      await bookSession(mentorId);
    } catch {
      // Surface via toast/error state once that pattern exists elsewhere in the app.
    }
  }, []);

  return {
    mentors: filteredMentors,
    allMentors,
    filters,
    isLoading,
    error,
    setSearch: (search: string) => setFilters((f: MentorFilters) => ({ ...f, search })),
    setCategory: (category: MentorCategory) => setFilters((f: MentorFilters) => ({ ...f, category })),
    setSort: (sort: MentorSort) => setFilters((f: MentorFilters) => ({ ...f, sort })),
    bookSession: handleBookSession,
    refetch: load,
  };
}