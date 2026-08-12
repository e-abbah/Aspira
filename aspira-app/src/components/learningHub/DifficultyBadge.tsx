import { DifficultyLevel } from '../../types/learningHub';

const LABELS: Record<DifficultyLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-[#121D33]">
      {LABELS[difficulty]}
    </span>
  );
}