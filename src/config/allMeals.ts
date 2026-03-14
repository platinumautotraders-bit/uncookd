import { allPlans } from "@/config/plans";
import type { Meal } from "@/types";

export interface MealWithPlan extends Meal {
  planName: string;
  planSlug: string;
}

function getAllMealsFromPlans(): MealWithPlan[] {
  const seen = new Set<string>();
  const meals: MealWithPlan[] = [];

  for (const plan of allPlans) {
    for (const day of plan.days) {
      for (const meal of day.meals) {
        if (!seen.has(meal.slug)) {
          seen.add(meal.slug);
          meals.push({
            ...meal,
            planName: plan.name,
            planSlug: plan.slug,
          });
        }
      }
    }
  }

  return meals;
}

export const allMeals = getAllMealsFromPlans();

export function getMealsBySlot(slot: "breakfast" | "lunch" | "dinner"): MealWithPlan[] {
  return allMeals.filter((m) => m.slot === slot);
}

export function getMealsByProtein(proteinType: string): MealWithPlan[] {
  return allMeals.filter((m) =>
    m.ingredients.some((i) => i.category === "protein" && i.name.toLowerCase().includes(proteinType))
  );
}

export function searchMeals(query: string): MealWithPlan[] {
  const q = query.toLowerCase();
  return allMeals.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.ingredients.some((i) => i.name.toLowerCase().includes(q))
  );
}
