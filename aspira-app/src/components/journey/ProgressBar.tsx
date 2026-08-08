import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-[#121D33]/10 overflow-hidden">
        <div
          className="h-full bg-[#121D33] rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-[#8A93A6] shrink-0 tabular-nums">
        {completed}/{total}
      </span>
    </div>
  );
};

export default ProgressBar;