export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface MacroTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyNutrition {
  day: string;
  nutrition: NutritionInfo;
}

export interface WeeklyNutrition {
  days: DailyNutrition[];
  average: NutritionInfo;
}
