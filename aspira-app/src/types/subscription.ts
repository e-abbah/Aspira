export type PlanId = 'free' | 'premium' | 'family';
export type BillingCycle = 'monthly' | 'annual';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  badge?: string; // "Most Popular" | "Best Value for Families"
  monthlyPrice: number; // in NGN, 0 for Free
  annualDiscountPercent: number; // e.g. 25
  features: string[];
  ctaLabel: string;
}

export interface Invoice {
  id: string;
  date: string; // ISO date
  planId: PlanId;
  amount: number;
  status: 'paid' | 'failed' | 'refunded';
  invoiceUrl?: string;
}

export interface SubscriptionState {
  currentPlanId: PlanId;
  billingCycle: BillingCycle;
  renewsOn?: string; // ISO date, undefined for Free
}