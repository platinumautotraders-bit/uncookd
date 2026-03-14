import type { PlanSlug, PlanDuration, ServingSize } from "./plan";
import type { NutritionInfo } from "./nutrition";
import type { SideSauceCode, SaladCode } from "./sauce";

export type CartItemType = "plan" | "builder-meal" | "add-on";

export interface CartItemPlan {
  type: "plan";
  id: string;
  planSlug: PlanSlug;
  planName: string;
  duration: PlanDuration;
  servingSize: ServingSize;
  organic: boolean;
  quantity: number;
  unitPrice: number;
  nutrition: NutritionInfo;
}

export interface CartItemBuilderMeal {
  type: "builder-meal";
  id: string;
  mealName: string;
  description: string;
  servingSize: ServingSize;
  quantity: number;
  unitPrice: number;
  nutrition: NutritionInfo;
}

export interface CartItemAddOn {
  type: "add-on";
  id: string;
  code: SideSauceCode | SaladCode;
  name: string;
  quantity: number;
  unitPrice: number;
  nutrition: NutritionInfo;
}

export type CartItem = CartItemPlan | CartItemBuilderMeal | CartItemAddOn;

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}
