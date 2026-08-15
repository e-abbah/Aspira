import { useCallback, useEffect, useState } from 'react';
import { Plan, Invoice, SubscriptionState, PlanId, BillingCycle } from '../../types/subscription';
import {
  getPlans,
  getSubscriptionState,
  getBillingHistory,
  setBillingCycle as persistBillingCycle,
  upgradePlan as persistUpgrade,
} from '../services/subscriptionService';

export function useSubscription() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [planData, subState, billingHistory] = await Promise.all([
        getPlans(),
        getSubscriptionState(),
        getBillingHistory(),
      ]);
      setPlans(planData);
      setSubscription(subState);
      setInvoices(billingHistory);
    } catch {
      setError('Could not load subscription details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleBillingCycle = useCallback((cycle: BillingCycle) => {
    setSubscription((prev) => (prev ? { ...prev, billingCycle: cycle } : prev)); // optimistic
    persistBillingCycle(cycle);
  }, []);

  const upgradeTo = useCallback(async (planId: PlanId) => {
    setIsUpgrading(true);
    try {
      const updated = await persistUpgrade(planId);
      setSubscription(updated);
    } catch {
      setError('Upgrade failed. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  }, []);

  return {
    plans,
    subscription,
    invoices,
    isLoading,
    isUpgrading,
    error,
    toggleBillingCycle,
    upgradeTo,
    refetch: load,
  };
}