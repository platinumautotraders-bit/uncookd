import type { DayPlan, Difficulty, WeeklySummary } from "./meal";
import type { MacroSplit } from "./nutrition";
import type { DietaryFlag } from "./sauce";

export type PlanSlug =
  | "the-lean-machine"
  | "the-bulk-up"
  | "pure-protein"
  | "chicken-only"
  | "the-classic"
  | "steak-night"
  | "the-mediterranean"
  | "the-athlete"
  | "the-breakfast-club"
  | "global-flavour";

export type PlanGoal =
  | "fat-loss"
  | "muscle-gain"
  | "high-protein"
  | "balanced"
  | "chicken-lovers"
  | "premium-beef"
  | "mediterranean"
  | "athletic"
  | "full-day"
  | "global";

export type PlanDuration = 3 | 5 | 7;

export type ServingSize = 1 | 2 | 4;

export interface Plan {
  slug: PlanSlug;
  name: string;
  tagline: string;
  goal: PlanGoal;
  description: string;
  difficulty: Difficulty;
  targetCalories: number;
  macroSplit: MacroSplit;
  mealsPerDay: 2 | 3;
  includesBreakfast: boolean;
  durationOptions: PlanDuration[];
  servingOptions: ServingSize[];
  proteinTypes: string[];
  dietaryOptions: DietaryFlag[];
  days: DayPlan[];
  weeklySummary: WeeklySummary;
  heroImage?: string;
  featured?: boolean;
}

export type GlobalFlavourRegion =
  | "middle-eastern"
  | "mediterranean"
  | "asian"
  | "latin"
  | "african"
  | "caribbean";

export interface GlobalFlavourMonth {
  month: number;
  name: string;
  region: GlobalFlavourRegion;
  description: string;
  keyMeals: string[];
  primarySauces: string[];
}
