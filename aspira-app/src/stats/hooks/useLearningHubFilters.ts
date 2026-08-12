import { useMemo, useState } from 'react';
import { LearningResource, ResourceTypeFilter } from '../../types/learningHub';


interface UseLearningHubFiltersResult {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  typeFilter: ResourceTypeFilter;
  setTypeFilter: (value: ResourceTypeFilter) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  filteredResources: LearningResource[];
}

export function useLearningHubFilters(
  resources: LearningResource[]
): UseLearningHubFiltersResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ResourceTypeFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesQuery =
        query.length === 0 ||
        resource.title.toLowerCase().includes(query) ||
        resource.subject.toLowerCase().includes(query);

      const matchesType = typeFilter === 'all' || resource.type === typeFilter;

      const matchesCategory =
        categoryFilter === 'all' || resource.examCategory === categoryFilter;

      return matchesQuery && matchesType && matchesCategory;
    });
  }, [resources, searchQuery, typeFilter, categoryFilter]);

  return {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    filteredResources,
  };
}