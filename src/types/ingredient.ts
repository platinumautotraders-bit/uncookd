import type { NutritionInfo } from "./nutrition";

export type IngredientCategory =
  | "protein"
  | "vegetable"
  | "carb"
  | "breakfast"
  | "sauce"
  | "side-sauce"
  | "salad";

export type ProteinType = "chicken" | "beef" | "lamb";

export type ProteinCut =
  | "breast"
  | "thigh"
  | "drumstick"
  | "wings"
  | "mince"
  | "ribeye"
  | "sirloin"
  | "fillet"
  | "rump"
  | "t-bone"
  | "mince-lean"
  | "mince-regular"
  | "cutlets"
  | "leg-steak"
  | "shoulder"
  | "chops"
  | "kofta";

export type Vegetable =
  | "broccoli"
  | "spinach"
  | "green-beans"
  | "asparagus"
  | "sweet-peppers"
  | "zucchini"
  | "mushrooms"
  | "carrots"
  | "corn"
  | "mixed-salad"
  | "eggplant"
  | "kale"
  | "cherry-tomatoes"
  | "onions";

export type Carb =
  | "white-rice"
  | "brown-rice"
  | "pasta"
  | "couscous"
  | "white-potato"
  | "sweet-potato"
  | "baby-potatoes"
  | "rice-noodles"
  | "none";

export type BreakfastItem =
  | "protein-pancake-batter"
  | "rolled-oats"
  | "free-range-eggs"
  | "turkey-mince";

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  proteinType?: ProteinType;
  cut?: ProteinCut;
  nutritionPer100g: NutritionInfo;
  defaultCostPerKg: number;
  organicAvailable: boolean;
}

export interface MealIngredient {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: "g" | "ml" | "each";
  category: IngredientCategory;
}
