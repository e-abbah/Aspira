import { Zap, Crown } from 'lucide-react';
import { Plan, PlanId } from '../../types/subscription';

interface CurrentPlanBannerProps {
  currentPlan: Plan;
  onUpgradeClick: () => void;
}

export function CurrentPlanBanner({ currentPlan, onUpgradeClick }: CurrentPlanBannerProps) {
  const isFree = currentPlan.id === 'free';

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#E5E2DA] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F5F0]">
          <Zap className="h-4 w-4 text-[#121D33]" />
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-[#8A93A6]">CURRENT PLAN</p>
          <p className="text-lg font-semibold text-[#121D33]">{currentPlan.name}</p>
          <p className="text-sm text-[#8A93A6]">
            {isFree ? 'Upgrade to unlock full platform access' : currentPlan.tagline}
          </p>
        </div>
      </div>

      {isFree && (
        <button
          type="button"
          onClick={onUpgradeClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#121D33] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1c2b4d]"
        >
          <Crown className="h-4 w-4 text-[#E0A63C]" />
          Upgrade Now
        </button>
      )}
    </div>
  );
}