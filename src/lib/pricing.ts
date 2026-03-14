import type { PricingConfig, CalculatedPrice, PlanDuration, ServingSize } from "@/types";
import type { Plan } from "@/types";
import { defaultPricingConfig } from "@/config/pricing";

export function calculateRetailPrice(costPerKg: number, margin: number): number {
  return costPerKg / (1 - margin);
}

export function calculateMealPrice(
  ingredientWeightKg: number,
  category: string,
  config: PricingConfig = defaultPricingConfig
): number {
  const marginKey = getCategoryMarginKey(category);
  const margin = config.margins[marginKey];
  const cost = ingredientWeightKg * getAverageCostForCategory(category, config);
  return cost / (1 - margin);
}

function getCategoryMarginKey(category: string): keyof typeof defaultPricingConfig.margins {
  const map: Record<string, keyof typeof defaultPricingConfig.margins> = {
    protein: "chicken",
    chicken: "chicken",
    beef: "beef",
    lamb: "lamb",
    vegetable: "vegetables",
    carb: "carbs",
    breakfast: "breakfast",
    sauce: "sauces",
    "side-sauce": "sideSauces",
    salad: "salads",
  };
  return map[category] || "chicken";
}

function getAverageCostForCategory(category: string, config: PricingConfig): number {
  const items = config.ingredientCosts.filter((i) => i.category === category);
  if (items.length === 0) return 10;
  return items.reduce((sum, i) => sum + i.costPerKg, 0) / items.length;
}

export function estimatePlanPrice(
  plan: Plan,
  duration: PlanDuration,
  servingSize: ServingSize,
  config: PricingConfig = defaultPricingConfig
): CalculatedPrice {
  const daysToInclude = plan.days.slice(0, duration);
  const mealsPerDay = plan.mealsPerDay;
  const totalMeals = duration * mealsPerDay;

  let basePricePerMeal = 0;
  let totalIngredientCost = 0;

  for (const day of daysToInclude) {
    for (const meal of day.meals) {
      let mealCost = 0;
      for (const ing of meal.ingredients) {
        const costItem = config.ingredientCosts.find(
          (c) => c.ingredientId === ing.ingredientId
        );
        const costPerKg = costItem?.costPerKg ?? 10;
        const weightKg = (ing.quantity * servingSize) / 1000;
        const marginKey = getCategoryMarginKey(ing.category);
        const margin = config.margins[marginKey];
        mealCost += (costPerKg * weightKg) / (1 - margin);
      }
      totalIngredientCost += mealCost;
    }
  }

  basePricePerMeal = totalIngredientCost / totalMeals;
  const subtotal = Math.round(totalIngredientCost * 100) / 100;

  const deliveryFee =
    subtotal >= config.delivery.freeThreshold ? 0 : config.delivery.flatFee;

  return {
    subtotal,
    deliveryFee,
    discount: 0,
    organicSurcharge: 0,
    total: subtotal + deliveryFee,
    perMeal: Math.round(basePricePerMeal * 100) / 100,
    perDay: Math.round((totalIngredientCost / duration) * 100) / 100,
  };
}

export function applyPremiumDiscount(price: CalculatedPrice, discountRate: number): CalculatedPrice {
  const discount = Math.round(price.subtotal * discountRate * 100) / 100;
  return {
    ...price,
    discount,
    deliveryFee: 0,
    total: price.subtotal - discount,
    perMeal: Math.round((price.subtotal - discount) / (price.subtotal / price.perMeal) * 100) / 100,
    perDay: Math.round((price.subtotal - discount) / (price.subtotal / price.perDay) * 100) / 100,
  };
}

export function applyOrganicSurcharge(price: CalculatedPrice, surchargeRate: number): CalculatedPrice {
  const surcharge = Math.round(price.subtotal * surchargeRate * 100) / 100;
  return {
    ...price,
    organicSurcharge: surcharge,
    total: price.total + surcharge,
  };
}
