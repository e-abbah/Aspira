export type ResourceType = 'video' | 'reading' | 'practice';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ResourceStatus = 'not-started' | 'in-progress' | 'completed';

export interface LearningResource {
  id: string;
  title: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  status: ResourceStatus;
  subject: string;
  examCategory: string; // e.g. 'IELTS' | 'TOEFL' | 'GRE' | 'GMAT'
  durationMinutes: number;
  rating: number;
  progressPercent?: number; // meaningful only when status === 'in-progress'
  isPremium: boolean;
}

export interface ExamCategoryFilter {
  id: string;
  label: string;
  count: number;
}

export interface LearningHubStats {
  totalResources: number;
  completed: number;
  inProgress: number;
  studyStreakDays: number;
  personalBestDays: number;
}

export type ResourceTypeFilter = 'all' | ResourceType;