import type { PricingConfig, CategoryMargins, DeliveryConfig } from "@/types";

export const defaultMargins: CategoryMargins = {
  chicken: 0.52,
  beef: 0.47,
  lamb: 0.52,
  vegetables: 0.57,
  carbs: 0.57,
  breakfast: 0.62,
  sauces: 0.72,
  sideSauces: 0.67,
  salads: 0.62,
};

export const defaultDelivery: DeliveryConfig = {
  flatFee: 10,
  freeThreshold: 100,
};

export const defaultPricingConfig: PricingConfig = {
  ingredientCosts: [
    // Chicken
    { ingredientId: "chicken-breast", name: "Chicken Breast", category: "chicken", costPerKg: 12.0, lastUpdated: "2026-03-15" },
    { ingredientId: "chicken-thigh", name: "Chicken Thigh", category: "chicken", costPerKg: 9.0, lastUpdated: "2026-03-15" },
    { ingredientId: "chicken-drumstick", name: "Chicken Drumstick", category: "chicken", costPerKg: 6.5, lastUpdated: "2026-03-15" },
    { ingredientId: "chicken-wings", name: "Chicken Wings", category: "chicken", costPerKg: 7.0, lastUpdated: "2026-03-15" },
    { ingredientId: "chicken-mince", name: "Chicken Mince", category: "chicken", costPerKg: 10.0, lastUpdated: "2026-03-15" },
    // Beef
    { ingredientId: "beef-ribeye", name: "Beef Ribeye", category: "beef", costPerKg: 45.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-sirloin", name: "Beef Sirloin", category: "beef", costPerKg: 35.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-fillet", name: "Beef Fillet", category: "beef", costPerKg: 55.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-rump", name: "Beef Rump", category: "beef", costPerKg: 22.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-tbone", name: "Beef T-Bone", category: "beef", costPerKg: 38.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-mince-lean", name: "Beef Mince (5% fat)", category: "beef", costPerKg: 16.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-mince-regular", name: "Beef Mince (15% fat)", category: "beef", costPerKg: 12.0, lastUpdated: "2026-03-15" },
    { ingredientId: "beef-kofta", name: "Beef Kofta", category: "beef", costPerKg: 18.0, lastUpdated: "2026-03-15" },
    // Lamb
    { ingredientId: "lamb-cutlets", name: "Lamb Cutlets", category: "lamb", costPerKg: 38.0, lastUpdated: "2026-03-15" },
    { ingredientId: "lamb-leg-steak", name: "Lamb Leg Steak", category: "lamb", costPerKg: 22.0, lastUpdated: "2026-03-15" },
    { ingredientId: "lamb-shoulder", name: "Lamb Shoulder", category: "lamb", costPerKg: 18.0, lastUpdated: "2026-03-15" },
    { ingredientId: "lamb-mince", name: "Lamb Mince", category: "lamb", costPerKg: 16.0, lastUpdated: "2026-03-15" },
    { ingredientId: "lamb-chops", name: "Lamb Chops", category: "lamb", costPerKg: 32.0, lastUpdated: "2026-03-15" },
    { ingredientId: "lamb-kofta", name: "Lamb Kofta", category: "lamb", costPerKg: 20.0, lastUpdated: "2026-03-15" },
    // Vegetables
    { ingredientId: "broccoli", name: "Broccoli", category: "vegetables", costPerKg: 5.0, lastUpdated: "2026-03-15" },
    { ingredientId: "spinach", name: "Spinach", category: "vegetables", costPerKg: 8.0, lastUpdated: "2026-03-15" },
    { ingredientId: "green-beans", name: "Green Beans", category: "vegetables", costPerKg: 6.0, lastUpdated: "2026-03-15" },
    { ingredientId: "asparagus", name: "Asparagus", category: "vegetables", costPerKg: 12.0, lastUpdated: "2026-03-15" },
    { ingredientId: "sweet-peppers", name: "Sweet Peppers", category: "vegetables", costPerKg: 7.0, lastUpdated: "2026-03-15" },
    { ingredientId: "zucchini", name: "Zucchini", category: "vegetables", costPerKg: 4.5, lastUpdated: "2026-03-15" },
    { ingredientId: "mushrooms", name: "Mushrooms", category: "vegetables", costPerKg: 10.0, lastUpdated: "2026-03-15" },
    { ingredientId: "carrots", name: "Carrots", category: "vegetables", costPerKg: 3.0, lastUpdated: "2026-03-15" },
    { ingredientId: "corn", name: "Sweet Corn", category: "vegetables", costPerKg: 4.0, lastUpdated: "2026-03-15" },
    { ingredientId: "mixed-salad", name: "Mixed Salad", category: "vegetables", costPerKg: 10.0, lastUpdated: "2026-03-15" },
    { ingredientId: "eggplant", name: "Eggplant", category: "vegetables", costPerKg: 5.0, lastUpdated: "2026-03-15" },
    { ingredientId: "kale", name: "Kale", category: "vegetables", costPerKg: 9.0, lastUpdated: "2026-03-15" },
    { ingredientId: "cherry-tomatoes", name: "Cherry Tomatoes", category: "vegetables", costPerKg: 8.0, lastUpdated: "2026-03-15" },
    { ingredientId: "onions", name: "Onions", category: "vegetables", costPerKg: 2.5, lastUpdated: "2026-03-15" },
    // Carbs
    { ingredientId: "white-rice", name: "White Rice", category: "carbs", costPerKg: 2.5, lastUpdated: "2026-03-15" },
    { ingredientId: "brown-rice", name: "Brown Rice", category: "carbs", costPerKg: 3.0, lastUpdated: "2026-03-15" },
    { ingredientId: "pasta", name: "Pasta", category: "carbs", costPerKg: 3.0, lastUpdated: "2026-03-15" },
    { ingredientId: "couscous", name: "Couscous", category: "carbs", costPerKg: 4.0, lastUpdated: "2026-03-15" },
    { ingredientId: "white-potato", name: "White Potato", category: "carbs", costPerKg: 2.0, lastUpdated: "2026-03-15" },
    { ingredientId: "sweet-potato", name: "Sweet Potato", category: "carbs", costPerKg: 3.5, lastUpdated: "2026-03-15" },
    { ingredientId: "baby-potatoes", name: "Baby Potatoes", category: "carbs", costPerKg: 4.0, lastUpdated: "2026-03-15" },
    { ingredientId: "rice-noodles", name: "Rice Noodles", category: "carbs", costPerKg: 5.0, lastUpdated: "2026-03-15" },
    // Breakfast
    { ingredientId: "protein-pancake-batter", name: "Protein Pancake Batter", category: "breakfast", costPerKg: 8.0, lastUpdated: "2026-03-15" },
    { ingredientId: "rolled-oats", name: "Rolled Oats", category: "breakfast", costPerKg: 3.0, lastUpdated: "2026-03-15" },
    { ingredientId: "free-range-eggs", name: "Free-Range Eggs (per kg)", category: "breakfast", costPerKg: 7.0, lastUpdated: "2026-03-15" },
    { ingredientId: "turkey-mince", name: "Turkey Mince", category: "breakfast", costPerKg: 12.0, lastUpdated: "2026-03-15" },
    // Sauces
    { ingredientId: "sauce-core", name: "Core Sauce (avg)", category: "sauces", costPerKg: 8.0, lastUpdated: "2026-03-15" },
    { ingredientId: "side-sauce", name: "Side Sauce (avg)", category: "sauces", costPerKg: 10.0, lastUpdated: "2026-03-15" },
    { ingredientId: "salad-addon", name: "Salad Add-On (avg)", category: "sauces", costPerKg: 6.0, lastUpdated: "2026-03-15" },
  ],
  margins: defaultMargins,
  delivery: defaultDelivery,
  organicSurcharge: 0.25,
  premiumDiscount: 0.10,
};
