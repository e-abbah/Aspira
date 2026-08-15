import { useRef } from 'react';
import { useSubscription } from '../stats/hooks/useSubscription';
import { CurrentPlanBanner } from '../components/subscription/CurrentPlanBanner';
import { BillingCycleToggle } from '../components/subscription/BillingCycleToggle';
import { PlanCard } from '../components/subscription/PlanCard';
import { BillingHistoryList } from '../components/subscription/BillingHistoryList';
import DashboardLayout from '../components/dashboard/DashboardLayout';
export default function SubscriptionBilling() {
  const { plans, subscription, invoices, isLoading, isUpgrading, error, toggleBillingCycle, upgradeTo, refetch } =
    useSubscription();
  const plansRef = useRef<HTMLDivElement>(null);

  if (isLoading || !subscription) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
        <div className="h-24 animate-pulse rounded-xl border border-[#E5E2DA] bg-white" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-2xl border border-[#E5E2DA] bg-white" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
        <div className="rounded-xl border border-[#E5E2DA] bg-white p-8 text-center">
          <p className="text-sm text-[#8A93A6]">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded-lg bg-[#121D33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2b4d]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const currentPlan = plans.find((p) => p.id === subscription.currentPlanId)!;

  return (
    <DashboardLayout><div className="min-h-screen bg-[#F7F5F0] p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#121D33]">Subscription & Billing</h1>
        <p className="mt-1 text-sm text-[#8A93A6]">Manage your Aspiria plan</p>
      </header>

      <section className="mb-8">
        <CurrentPlanBanner
          currentPlan={currentPlan}
          onUpgradeClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
      </section>

      <section ref={plansRef} className="mb-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-[#121D33]">Choose a plan</h2>
          <BillingCycleToggle
            cycle={subscription.billingCycle}
            discountPercent={plans.find((p) => p.id === 'premium')?.annualDiscountPercent ?? 0}
            onChange={toggleBillingCycle}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billingCycle={subscription.billingCycle}
              isCurrent={plan.id === subscription.currentPlanId}
              isUpgrading={isUpgrading}
              onUpgrade={upgradeTo}
            />
          ))}
        </div>
      </section>

      <section>
        <BillingHistoryList invoices={invoices} />
      </section>
    </div></DashboardLayout>
  );
}