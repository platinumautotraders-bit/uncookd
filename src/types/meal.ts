import type { NutritionInfo } from "./nutrition";
import type { MealIngredient } from "./ingredient";
import type { SauceCode, Allergen, DietaryInfo } from "./sauce";

export type CookingMethod =
  | "pan"
  | "air-fryer"
  | "oven"
  | "slow-cooker"
  | "bbq"
  | "stir-fry";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type MealSlot = "breakfast" | "lunch" | "dinner";

export type MealType =
  | "stir-fry"
  | "roast"
  | "steak-plate"
  | "bowl"
  | "tray-bake"
  | "curry"
  | "salad"
  | "breakfast";

export interface Meal {
  slug: string;
  name: string;
  description: string;
  slot: MealSlot;
  ingredients: MealIngredient[];
  sauceCode: SauceCode | null;
  cookingMethods: CookingMethod[];
  cookTime: number;
  difficulty: Difficulty;
  nutrition: NutritionInfo;
  allergens: Allergen[];
  dietary: DietaryInfo;
  cookingSteps: string[];
  image?: string;
}

export interface DayPlan {
  day: number;
  dayName: string;
  meals: Meal[];
  dailyTotals: NutritionInfo;
}

export interface WeeklySummary {
  days: {
    day: string;
    nutrition: NutritionInfo;
  }[];
  average: NutritionInfo;
}
