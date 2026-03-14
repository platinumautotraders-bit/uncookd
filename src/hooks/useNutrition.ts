"use client";

import { useMemo } from "react";
import type { NutritionInfo, Meal, DayPlan, ServingSize } from "@/types";
import {
  calculateDailyTotals,
  calculateWeeklyAverage,
  scalePortion,
  getMacroPercentages,
} from "@/lib/nutrition";

export function useNutrition(meals: Meal[], servingSize: ServingSize = 1) {
  return useMemo(() => {
    const base = calculateDailyTotals(meals);
    const scaled = scalePortion(base, servingSize);
    const macros = getMacroPercentages(scaled);

    return {
      nutrition: scaled,
      macroPercentages: macros,
    };
  }, [meals, servingSize]);
}

export function useWeeklyNutrition(days: DayPlan[], servingSize: ServingSize = 1) {
  return useMemo(() => {
    const average = calculateWeeklyAverage(days);
    const scaled = scalePortion(average, servingSize);
    const macros = getMacroPercentages(scaled);

    const dailyData = days.map((day) => ({
      day: day.dayName,
      nutrition: scalePortion(day.dailyTotals, servingSize),
    }));

    return {
      average: scaled,
      macroPercentages: macros,
      daily: dailyData,
    };
  }, [days, servingSize]);
}

export function useMealNutrition(nutrition: NutritionInfo, servingSize: ServingSize = 1) {
  return useMemo(() => {
    const scaled = scalePortion(nutrition, servingSize);
    const macros = getMacroPercentages(scaled);
    return { nutrition: scaled, macroPercentages: macros };
  }, [nutrition, servingSize]);
}
