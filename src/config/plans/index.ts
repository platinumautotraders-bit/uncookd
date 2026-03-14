import type { Plan, PlanSlug } from "@/types";

export { leanMachinePlan } from "./lean-machine";
export { bulkUpPlan } from "./bulk-up";
export { pureProteinPlan } from "./pure-protein";
export { chickenOnlyPlan } from "./chicken-only";
export { theClassicPlan } from "./the-classic";
export { steakNightPlan } from "./steak-night";
export { theMediterraneanPlan } from "./the-mediterranean";
export { theAthletePlan } from "./the-athlete";
export { theBreakfastClubPlan } from "./the-breakfast-club";
export { globalFlavourPlan } from "./global-flavour";

import { leanMachinePlan } from "./lean-machine";
import { bulkUpPlan } from "./bulk-up";
import { pureProteinPlan } from "./pure-protein";
import { chickenOnlyPlan } from "./chicken-only";
import { theClassicPlan } from "./the-classic";
import { steakNightPlan } from "./steak-night";
import { theMediterraneanPlan } from "./the-mediterranean";
import { theAthletePlan } from "./the-athlete";
import { theBreakfastClubPlan } from "./the-breakfast-club";
import { globalFlavourPlan } from "./global-flavour";

const heroImages: Record<string, string> = {
  "the-lean-machine": "/images/plans/the-lean-machine.png",
  "the-bulk-up": "/images/plans/the-bulk-up.png",
  "pure-protein": "/images/plans/pure-protein.png",
  "chicken-only": "/images/plans/chicken-only.png",
  "the-classic": "/images/plans/the-classic.png",
  "steak-night": "/images/plans/steak-night.png",
  "the-mediterranean": "/images/plans/the-mediterranean.png",
  "the-athlete": "/images/plans/the-athlete.png",
  "the-breakfast-club": "/images/plans/the-breakfast-club.png",
  "global-flavour": "/images/plans/global-flavour.png",
};

export const allPlans: Plan[] = [
  leanMachinePlan,
  bulkUpPlan,
  pureProteinPlan,
  chickenOnlyPlan,
  theClassicPlan,
  steakNightPlan,
  theMediterraneanPlan,
  theAthletePlan,
  theBreakfastClubPlan,
  globalFlavourPlan,
].map((plan) => ({
  ...plan,
  heroImage: heroImages[plan.slug] || plan.heroImage,
}));

export function getPlanBySlug(slug: PlanSlug | string): Plan | undefined {
  return allPlans.find((p) => p.slug === slug);
}

export function getFeaturedPlans(): Plan[] {
  return allPlans.filter((p) => p.featured);
}
