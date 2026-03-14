import type { NutritionInfo } from "./nutrition";

export type SauceCode =
  | "garlic-herb-butter"
  | "lemon-herb"
  | "smoky-bbq"
  | "chimichurri"
  | "peri-peri"
  | "teriyaki"
  | "coconut-curry"
  | "tomato-curry"
  | "shawarma"
  | "korean"
  | "med-herb"
  | "simple-spo";

export type SideSauceCode = "side-mushroom" | "side-pepper" | "side-gravy";

export type SaladCode = "salad-garden" | "salad-slaw";

export type DietaryFlag = "gf" | "df" | "lf";

export type DietaryStatus = "yes" | "no" | "swap";

export interface DietaryInfo {
  gf: DietaryStatus;
  df: DietaryStatus;
  lf: DietaryStatus;
}

export type Allergen =
  | "dairy"
  | "gluten"
  | "soy"
  | "sesame"
  | "mustard"
  | "eggs"
  | "tree-nut";

export interface SauceIngredient {
  name: string;
  quantity: string;
}

export interface Sauce {
  code: SauceCode;
  name: string;
  style: string;
  bestWith: string;
  cookingMethods: string;
  ingredients: SauceIngredient[];
  allergens: Allergen[];
  dietary: DietaryInfo;
  nutritionPerServe: NutritionInfo;
  servingSize: number;
}

export interface SideSauce {
  code: SideSauceCode;
  name: string;
  description: string;
  style: string;
  bestWith: string;
  heatingInstructions: string;
  ingredients: SauceIngredient[];
  allergens: Allergen[];
  dietary: DietaryInfo;
  nutritionPerServe: NutritionInfo;
  servingSize: number;
}

export interface SaladAddOn {
  code: SaladCode;
  name: string;
  description: string;
  ingredients: SauceIngredient[];
  dressing: SauceIngredient[];
  allergens: Allergen[];
  dietary: DietaryInfo;
  nutritionPerServe: NutritionInfo;
}
