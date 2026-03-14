"use client";

import type { Plan } from "@/types";
import { PlanHero } from "./PlanHero";
import { MealBreakdown } from "./MealBreakdown";
import { NutritionSummary } from "./NutritionSummary";
import { PricingOptions } from "./PricingOptions";

interface PlanDetailProps {
  plan: Plan;
}

export function PlanDetail({ plan }: PlanDetailProps) {
  return (
    <div>
      <PlanHero plan={plan} />
      <MealBreakdown days={plan.days} />
      <NutritionSummary weeklySummary={plan.weeklySummary} />
      <PricingOptions plan={plan} />
    </div>
  );
}
