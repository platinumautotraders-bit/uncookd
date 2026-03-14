export type SubscriptionTier = "free" | "standard" | "premium";

export interface MembershipFeature {
  name: string;
  free: boolean;
  standard: boolean;
  premium: boolean;
  premiumOnly?: boolean;
}

export interface MembershipTier {
  tier: SubscriptionTier;
  name: string;
  price: number;
  period: "month";
  currency: "AUD";
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}
