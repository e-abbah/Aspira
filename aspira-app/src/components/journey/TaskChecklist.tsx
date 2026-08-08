import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { JourneyTask } from '../../types/journey';

interface TaskChecklistProps {
  tasks: JourneyTask[];
  onToggleTask?: (taskId: string) => void;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ tasks, onToggleTask }) => {
  return (
    <ul className="space-y-2.5">
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => onToggleTask?.(task.id)}
            className="w-full flex items-center gap-2.5 text-left group"
          >
            {task.done ? (
              <CheckCircle2 className="w-4 h-4 text-[#121D33] shrink-0" strokeWidth={2} />
            ) : (
              <Circle
                className="w-4 h-4 text-[#8A93A6]/50 shrink-0 group-hover:text-[#8A93A6]"
                strokeWidth={2}
              />
            )}
            <span
              className={`text-sm ${
                task.done ? 'text-[#8A93A6] line-through' : 'text-[#121D33]'
              }`}
            >
              {task.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskChecklist;