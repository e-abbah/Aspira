import { LearningResource, LearningHubStats, ExamCategoryFilter } from '../../types/learningHub';
import { mockResources, mockStats, mockCategories } from '../data/learningHubData';

const SIMULATED_LATENCY_MS = 250;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

export const learningHubService = {
  async getResources(): Promise<LearningResource[]> {
    // TODO(api): return apiClient.get<LearningResource[]>('/learning-hub/resources');
    return delay(mockResources);
  },

  async getStats(): Promise<LearningHubStats> {
    // TODO(api): return apiClient.get<LearningHubStats>('/learning-hub/stats');
    return delay(mockStats);
  },

  async getCategories(): Promise<ExamCategoryFilter[]> {
    // TODO(api): return apiClient.get<ExamCategoryFilter[]>('/learning-hub/categories');
    return delay(mockCategories);
  },

  async updateResourceStatus(
    resourceId: string,
    status: LearningResource['status']
  ): Promise<void> {
    // TODO(api): return apiClient.patch(`/learning-hub/resources/${resourceId}`, { status });
    void resourceId;
    void status;
    return delay(undefined);
  },
};