import { Check, Zap, Crown, Users } from 'lucide-react';
import { Plan, BillingCycle } from '../../types/subscription';

interface PlanCardProps {
  plan: Plan;
  billingCycle: BillingCycle;
  isCurrent: boolean;
  isUpgrading: boolean;
  onUpgrade: (planId: Plan['id']) => void;
}

const ICONS: Record<Plan['id'], typeof Zap> = {
  free: Zap,
  premium: Crown,
  family: Users,
};

function formatPrice(plan: Plan, cycle: BillingCycle): string {
  if (plan.monthlyPrice === 0) return 'Free';
  const price =
    cycle === 'annual'
      ? Math.round(plan.monthlyPrice * (1 - plan.annualDiscountPercent / 100))
      : plan.monthlyPrice;
  return `₦${price.toLocaleString('en-NG')}`;
}

export function PlanCard({ plan, billingCycle, isCurrent, isUpgrading, onUpgrade }: PlanCardProps) {
  const Icon = ICONS[plan.id];
  const isFeatured = plan.id === 'premium'; // dark variant, matches screenshot
  const showStrikethrough = billingCycle === 'annual' && plan.monthlyPrice > 0;

  const containerClasses = isFeatured
    ? 'bg-[#121D33] text-white'
    : 'bg-white text-[#121D33] border border-[#E5E2DA]';

  return (
    <div className={`flex flex-col rounded-2xl p-6 ${containerClasses}`}>
      {plan.badge && (
        <span
          className={`mb-4 w-fit rounded-full px-3 py-1 text-xs font-medium ${
            isFeatured ? 'bg-white/10' : 'bg-[#F7F5F0]'
          }`}
        >
          {plan.badge}
        </span>
      )}

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          isFeatured ? 'bg-white/10' : 'bg-[#F7F5F0]'
        }`}
      >
        <Icon className={`h-4 w-4 ${isFeatured ? 'text-[#E0A63C]' : 'text-[#121D33]'}`} />
      </div>

      <p className={`mt-4 text-xs font-medium tracking-wide ${isFeatured ? 'text-white/60' : 'text-[#8A93A6]'}`}>
        {plan.name.toUpperCase()}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        {showStrikethrough && (
          <span className={`text-sm line-through ${isFeatured ? 'text-white/40' : 'text-[#8A93A6]'}`}>
            ₦{plan.monthlyPrice.toLocaleString('en-NG')}
          </span>
        )}
        <span className="text-2xl font-semibold">{formatPrice(plan, billingCycle)}</span>
        {plan.monthlyPrice > 0 && (
          <span className={`text-sm ${isFeatured ? 'text-white/60' : 'text-[#8A93A6]'}`}>/month</span>
        )}
      </div>

      <p className={`mt-2 text-sm ${isFeatured ? 'text-white/60' : 'text-[#8A93A6]'}`}>{plan.tagline}</p>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isFeatured ? 'text-[#E0A63C]' : 'text-[#121D33]'}`} />
            <span className={isFeatured ? 'text-white/90' : 'text-[#121D33]/90'}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => !isCurrent && onUpgrade(plan.id)}
        disabled={isCurrent || isUpgrading}
        className={`mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
          isCurrent
            ? isFeatured
              ? 'bg-white/10 text-white/60'
              : 'border border-[#E5E2DA] bg-white text-[#8A93A6]'
            : isFeatured
              ? 'bg-[#E0A63C] text-[#121D33] hover:bg-[#c99530] disabled:opacity-60'
              : 'bg-[#121D33] text-white hover:bg-[#1c2b4d] disabled:opacity-60'
        }`}
      >
        {isCurrent && <Check className="h-4 w-4" />}
        {isCurrent ? 'Current Plan' : isUpgrading ? 'Processing...' : plan.ctaLabel}
      </button>
    </div>
  );
}