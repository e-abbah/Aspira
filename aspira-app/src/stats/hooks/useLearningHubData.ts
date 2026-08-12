import { useEffect, useState, useCallback } from 'react';
import { LearningResource, LearningHubStats, ExamCategoryFilter } from '../../types/learningHub';
import { learningHubService } from '../data/learningHubService';

interface UseLearningHubDataResult {
  resources: LearningResource[];
  stats: LearningHubStats | null;
  categories: ExamCategoryFilter[];
  isLoading: boolean;
  error: string | null;
  advanceResourceStatus: (resource: LearningResource) => void;
}

export function useLearningHubData(): UseLearningHubDataResult {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [stats, setStats] = useState<LearningHubStats | null>(null);
  const [categories, setCategories] = useState<ExamCategoryFilter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [resourcesData, statsData, categoriesData] = await Promise.all([
          learningHubService.getResources(),
          learningHubService.getStats(),
          learningHubService.getCategories(),
        ]);
        if (!isMounted) return;
        setResources(resourcesData);
        setStats(statsData);
        setCategories(categoriesData);
      } catch (err) {
        if (!isMounted) return;
        setError('Failed to load learning hub. Please try again.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const advanceResourceStatus = useCallback((resource: LearningResource) => {
    if (resource.isPremium) return;

    const nextStatus: LearningResource['status'] =
      resource.status === 'not-started' ? 'in-progress' : resource.status;

    setResources((prev) =>
      prev.map((r) =>
        r.id === resource.id
          ? { ...r, status: nextStatus, progressPercent: r.progressPercent ?? 0 }
          : r
      )
    );

    // Fire-and-forget until real auth/backend exists; swap to await + rollback-on-error later.
    learningHubService.updateResourceStatus(resource.id, nextStatus);
  }, []);

  return { resources, stats, categories, isLoading, error, advanceResourceStatus };
}