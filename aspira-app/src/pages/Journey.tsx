import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StepIcon from '../components/journey/StepIcon';
import JourneyStepCard from '../components/journey/JourneyStepCard';
import { journeySteps as initialSteps } from '../types/journeySteps';
import type { JourneyStep } from '../types/journey';

interface JourneyProps {
  onLogout?: () => void;
}

const Journey: React.FC<JourneyProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<JourneyStep[]>(initialSteps);

  // Default: only the active step is expanded on load
  const defaultExpandedId = useMemo(
    () => steps.find((s) => s.status === 'active')?.id,
    [steps],
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedId ? [defaultExpandedId] : []),
  );

  const toggleExpand = (stepId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const toggleTask = (stepId: string, taskId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id !== stepId
          ? step
          : {
              ...step,
              tasks: step.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task,
              ),
            },
      ),
    );
  };

  const handleCtaClick = (href: string) => {
    navigate(href);
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#121D33]">
          My Journey
        </h1>
        <p className="text-sm text-[#8A93A6] mt-1">
          Track every step toward your MPH in Canada.
        </p>
      </div>

      <div className="relative">
        {/* connecting vertical line */}
        <div className="absolute left-\[17px] top-4 bottom-4 w-px bg-[#121D33]/10" />

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="relative flex gap-4">
              <StepIcon status={step.status} />
              <div className="flex-1 min-w-0">
                <JourneyStepCard
                  step={step}
                  isExpanded={expandedIds.has(step.id)}
                  onToggleExpand={toggleExpand}
                  onToggleTask={toggleTask}
                  onCtaClick={handleCtaClick}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Journey;