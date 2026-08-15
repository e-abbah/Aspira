import { BillingCycle } from '../../types/subscription';

interface BillingCycleToggleProps {
  cycle: BillingCycle;
  discountPercent: number;
  onChange: (cycle: BillingCycle) => void;
}

export function BillingCycleToggle({ cycle, discountPercent, onChange }: BillingCycleToggleProps) {
  const isAnnual = cycle === 'annual';

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${!isAnnual ? 'text-[#121D33]' : 'text-[#8A93A6]'}`}>
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        onClick={() => onChange(isAnnual ? 'monthly' : 'annual')}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          isAnnual ? 'bg-[#121D33]' : 'bg-[#E5E2DA]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            isAnnual ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isAnnual ? 'text-[#121D33]' : 'text-[#8A93A6]'}`}>
        Annual
        <span className="ml-1 text-[#E0A63C]">-{discountPercent}%</span>
      </span>
    </div>
  );
}