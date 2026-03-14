"use client";

import { useMemo } from "react";
import type { Plan, PlanDuration, ServingSize, CalculatedPrice } from "@/types";
import { estimatePlanPrice, applyPremiumDiscount, applyOrganicSurcharge } from "@/lib/pricing";
import { defaultPricingConfig } from "@/config/pricing";

interface UsePricingOptions {
  plan: Plan;
  duration: PlanDuration;
  servingSize: ServingSize;
  isPremium?: boolean;
  organic?: boolean;
}

export function usePricing({
  plan,
  duration,
  servingSize,
  isPremium = false,
  organic = false,
}: UsePricingOptions): CalculatedPrice {
  return useMemo(() => {
    let price = estimatePlanPrice(plan, duration, servingSize, defaultPricingConfig);

    if (isPremium) {
      price = applyPremiumDiscount(price, defaultPricingConfig.premiumDiscount);
    }

    if (organic) {
      price = applyOrganicSurcharge(price, defaultPricingConfig.organicSurcharge);
    }

    return price;
  }, [plan, duration, servingSize, isPremium, organic]);
}
