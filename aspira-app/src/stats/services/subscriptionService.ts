import { Plan, Invoice, SubscriptionState, PlanId, BillingCycle } from '../../types/subscription';
import { mockPlans, mockSubscriptionState } from '../data/mockPlans';
import { mockInvoices } from '../data/mockBilling';

let subscriptionState: SubscriptionState = { ...mockSubscriptionState };
let invoices: Invoice[] = [...mockInvoices];

const MOCK_DELAY = 250;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPlans(): Promise<Plan[]> {
  await delay(MOCK_DELAY);
  return [...mockPlans];
}

export async function getSubscriptionState(): Promise<SubscriptionState> {
  await delay(MOCK_DELAY);
  return { ...subscriptionState };
}

export async function getBillingHistory(): Promise<Invoice[]> {
  await delay(MOCK_DELAY);
  return [...invoices];
}

export async function setBillingCycle(cycle: BillingCycle): Promise<void> {
  // No network round-trip needed for a local display toggle, but kept async
  // so the call site doesn't need to change when this does hit an endpoint
  // (e.g. if the backend needs to know for proration previews).
  subscriptionState = { ...subscriptionState, billingCycle: cycle };
}

export async function upgradePlan(planId: PlanId): Promise<SubscriptionState> {
  await delay(400); // stands in for a real payment/checkout round-trip
  const renewsOn = new Date();
  renewsOn.setMonth(renewsOn.getMonth() + (subscriptionState.billingCycle === 'annual' ? 12 : 1));

  subscriptionState = {
    ...subscriptionState,
    currentPlanId: planId,
    renewsOn: renewsOn.toISOString(),
  };
  return { ...subscriptionState };
}