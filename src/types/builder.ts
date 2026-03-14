import type { CookingMethod, MealType, Difficulty } from "./meal";
import type { ProteinType, ProteinCut, Vegetable, Carb } from "./ingredient";
import type { SauceCode, SideSauceCode, SaladCode, Allergen, DietaryInfo } from "./sauce";
import type { NutritionInfo } from "./nutrition";
import type { ServingSize } from "./plan";

export type BuilderStep =
  | "cooking-method"
  | "meal-type"
  | "protein"
  | "carb"
  | "vegetables"
  | "sauce";

export interface BuilderState {
  currentStep: BuilderStep;
  cookingMethod: CookingMethod | null;
  mealType: MealType | null;
  proteinType: ProteinType | null;
  proteinCut: ProteinCut | null;
  carb: Carb | null;
  vegetables: Vegetable[];
  sauceCode: SauceCode | null;
  sideSauceCode: SideSauceCode | null;
  saladCode: SaladCode | null;
  servingSize: ServingSize;
  quantity: number;
}

export interface ProteinCookingCompatibility {
  protein: string;
  cut: ProteinCut;
  proteinType: ProteinType;
  methods: CookingMethod[];
}

export interface ProteinSauceCompatibility {
  sauceCode: SauceCode;
  compatibleProteins: {
    proteinType: ProteinType;
    cuts: ProteinCut[];
    note?: string;
  }[];
}

export interface CarbMealTypeCompatibility {
  carb: Carb;
  name: string;
  compatibleMealTypes: MealType[];
}

export interface MealTemplate {
  cookingMethod: CookingMethod;
  mealType: MealType;
  structure: string;
}

export interface CombinationMatrix {
  proteinCooking: ProteinCookingCompatibility[];
  proteinSauce: ProteinSauceCompatibility[];
  carbMealType: CarbMealTypeCompatibility[];
  templates: MealTemplate[];
}

export interface BuilderMealPreview {
  name: string;
  description: string;
  cookingMethod: CookingMethod;
  mealType: MealType;
  protein: { type: ProteinType; cut: ProteinCut; name: string };
  carb: { code: Carb; name: string } | null;
  vegetables: { code: Vegetable; name: string }[];
  sauce: { code: SauceCode; name: string } | null;
  sideSauce: { code: SideSauceCode; name: string } | null;
  salad: { code: SaladCode; name: string } | null;
  nutrition: NutritionInfo;
  allergens: Allergen[];
  dietary: DietaryInfo;
  cookTime: number;
  difficulty: Difficulty;
  price: number;
  servingSize: ServingSize;
  quantity: number;
}
