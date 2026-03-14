import type { NutritionInfo, Meal, DayPlan } from "@/types";

export function emptyNutrition(): NutritionInfo {
  return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 };
}

export function addNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return {
    calories: a.calories + b.calories,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
    fiber: a.fiber + b.fiber,
    sodium: a.sodium + b.sodium,
  };
}

export function calculateDailyTotals(meals: Meal[]): NutritionInfo {
  return meals.reduce((total, meal) => addNutrition(total, meal.nutrition), emptyNutrition());
}

export function calculateWeeklyAverage(days: DayPlan[]): NutritionInfo {
  if (days.length === 0) return emptyNutrition();

  const totals = days.reduce(
    (sum, day) => addNutrition(sum, day.dailyTotals),
    emptyNutrition()
  );

  return {
    calories: Math.round(totals.calories / days.length),
    protein: Math.round(totals.protein / days.length),
    carbs: Math.round(totals.carbs / days.length),
    fat: Math.round(totals.fat / days.length),
    fiber: Math.round(totals.fiber / days.length),
    sodium: Math.round(totals.sodium / days.length),
  };
}

export function scalePortion(nutrition: NutritionInfo, servingSize: number): NutritionInfo {
  return {
    calories: Math.round(nutrition.calories * servingSize),
    protein: Math.round(nutrition.protein * servingSize),
    carbs: Math.round(nutrition.carbs * servingSize),
    fat: Math.round(nutrition.fat * servingSize),
    fiber: Math.round(nutrition.fiber * servingSize),
    sodium: Math.round(nutrition.sodium * servingSize),
  };
}

export function getMacroPercentages(nutrition: NutritionInfo): {
  protein: number;
  carbs: number;
  fat: number;
} {
  const totalCals =
    nutrition.protein * 4 + nutrition.carbs * 4 + nutrition.fat * 9;
  if (totalCals === 0) return { protein: 0, carbs: 0, fat: 0 };

  return {
    protein: Math.round((nutrition.protein * 4 / totalCals) * 100),
    carbs: Math.round((nutrition.carbs * 4 / totalCals) * 100),
    fat: Math.round((nutrition.fat * 9 / totalCals) * 100),
  };
}
