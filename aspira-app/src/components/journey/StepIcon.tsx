import React from 'react';
import { Check } from 'lucide-react';
import type { StepStatus } from '../../types/journey';

interface StepIconProps {
  status: StepStatus;
}

const StepIcon: React.FC<StepIconProps> = ({ status }) => {
  const styles: Record<StepStatus, string> = {
    completed: 'bg-[#121D33] border-[#121D33] text-white',
    active: 'bg-[#121D33] border-[#E0A63C] text-white ring-4 ring-[#E0A63C]/20',
    upcoming: 'bg-white border-[#8A93A6]/40 text-[#8A93A6]/60',
  };

  return (
    <div
      className={`relative z-10 w-9 h-9 shrink-0 rounded-full border-2 flex items-center justify-center ${styles[status]}`}
    >
      <Check className="w-4 h-4" strokeWidth={2.5} />
    </div>
  );
};

export default StepIcon;