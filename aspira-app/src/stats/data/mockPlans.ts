import { Plan, SubscriptionState } from '../../types/subscription';

// Swap-out point: subscriptionService.ts is the only file that should import from here.
export const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start your journey with the essentials',
    monthlyPrice: 0,
    annualDiscountPercent: 0,
    features: [
      'Aspiria Compass™ Assessment',
      'Personalised education roadmap',
      'Community access',
      '1 mentor session per month',
      '3 resource guides per month',
      'Opportunities Hub (limited — 5 results)',
    ],
    ctaLabel: 'Current Plan',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Everything you need to secure your admission',
    badge: 'Most Popular',
    monthlyPrice: 4500,
    annualDiscountPercent: 25,
    features: [
      'Everything in Free',
      'Full Resource & Study Hub (100+ guides)',
      'Full Opportunities Hub — all scholarships',
      'Progress & performance tracker',
      'Admission application support',
      'Priority notifications & deadline alerts',
    ],
    ctaLabel: 'Upgrade to Premium',
  },
  {
    id: 'family',
    name: 'Family',
    tagline: 'Premium guidance for the whole family',
    badge: 'Best Value for Families',
    monthlyPrice: 7500,
    annualDiscountPercent: 25,
    features: [
      'Everything in Premium',
      'Up to 2 student profiles',
      'Parent progress dashboard',
      'Weekly email summaries for parents',
      'Priority mentor matching',
      'Dedicated support line',
    ],
    ctaLabel: 'Upgrade to Family',
  },
];

export const mockSubscriptionState: SubscriptionState = {
  currentPlanId: 'free',
  billingCycle: 'monthly',
};