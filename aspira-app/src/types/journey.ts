export type StepStatus = 'completed' | 'active' | 'upcoming';

export interface JourneyTask {
  id: string;
  label: string;
  done: boolean;
}

export interface JourneyStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: StepStatus;
  tasks: JourneyTask[];
  ctaLabel?: string;
  ctaHref?: string;
}