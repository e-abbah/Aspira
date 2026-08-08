import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { JourneyStep } from '../../types/journey';
import ProgressBar from './ProgressBar';
import TaskChecklist from './TaskChecklist';

interface JourneyStepCardProps {
  step: JourneyStep;
  isExpanded: boolean;
  onToggleExpand: (stepId: string) => void;
  onToggleTask?: (stepId: string, taskId: string) => void;
  onCtaClick?: (href: string) => void;
}

const JourneyStepCard: React.FC<JourneyStepCardProps> = ({
  step,
  isExpanded,
  onToggleExpand,
  onToggleTask,
  onCtaClick,
}) => {
  const completedCount = step.tasks.filter((t) => t.done).length;
  const isActive = step.status === 'active';

  return (
    <div
      className={`rounded-2xl p-5 transition-colors ${
        isActive ? 'bg-white border-2 border-[#121D33]/10' : 'bg-white/60'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggleExpand(step.id)}
        aria-expanded={isExpanded}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#8A93A6] font-medium">
              Step {step.stepNumber}
            </span>
            {isActive && (
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#E0A63C]/20 text-[#121D33] px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <h3 className="text-sm font-serif font-bold text-[#121D33]">
            {step.title}
          </h3>
          <p className="text-xs text-[#8A93A6] mt-0.5">{step.description}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#8A93A6] shrink-0 mt-1 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className="mt-4">
        <ProgressBar completed={completedCount} total={step.tasks.length} />
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#121D33]/5 space-y-4">
          <TaskChecklist
            tasks={step.tasks}
            onToggleTask={(taskId) => onToggleTask?.(step.id, taskId)}
          />
          {step.ctaLabel && step.ctaHref && (
            <button
              type="button"
              onClick={() => onCtaClick?.(step.ctaHref as string)}
              className="flex items-center gap-1 text-sm font-medium text-[#121D33] hover:text-[#E0A63C] transition-colors"
            >
              {step.ctaLabel} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JourneyStepCard;