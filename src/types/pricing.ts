export interface IngredientCost {
  ingredientId: string;
  name: string;
  category: string;
  costPerKg: number;
  lastUpdated: string;
}

export interface CategoryMargins {
  chicken: number;
  beef: number;
  lamb: number;
  vegetables: number;
  carbs: number;
  breakfast: number;
  sauces: number;
  sideSauces: number;
  salads: number;
}

export interface DeliveryConfig {
  flatFee: number;
  freeThreshold: number;
}

export interface PricingConfig {
  ingredientCosts: IngredientCost[];
  margins: CategoryMargins;
  delivery: DeliveryConfig;
  organicSurcharge: number;
  premiumDiscount: number;
}

export interface CalculatedPrice {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  organicSurcharge: number;
  total: number;
  perMeal: number;
  perDay: number;
}
