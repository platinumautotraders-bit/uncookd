import type { Ingredient } from "@/types";

export const ingredients: Ingredient[] = [
  // Chicken
  { id: "chicken-breast", name: "Chicken Breast", category: "protein", proteinType: "chicken", cut: "breast", nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sodium: 74 }, defaultCostPerKg: 12.0, organicAvailable: true },
  { id: "chicken-thigh", name: "Chicken Thigh (boneless)", category: "protein", proteinType: "chicken", cut: "thigh", nutritionPer100g: { calories: 209, protein: 26, carbs: 0, fat: 10.9, fiber: 0, sodium: 84 }, defaultCostPerKg: 9.0, organicAvailable: true },
  { id: "chicken-drumstick", name: "Chicken Drumstick", category: "protein", proteinType: "chicken", cut: "drumstick", nutritionPer100g: { calories: 172, protein: 28.3, carbs: 0, fat: 5.7, fiber: 0, sodium: 90 }, defaultCostPerKg: 6.5, organicAvailable: true },
  { id: "chicken-wings", name: "Chicken Wings", category: "protein", proteinType: "chicken", cut: "wings", nutritionPer100g: { calories: 203, protein: 30.5, carbs: 0, fat: 8.1, fiber: 0, sodium: 82 }, defaultCostPerKg: 7.0, organicAvailable: true },
  { id: "chicken-mince", name: "Chicken Mince", category: "protein", proteinType: "chicken", cut: "mince", nutritionPer100g: { calories: 143, protein: 17.4, carbs: 0, fat: 8.1, fiber: 0, sodium: 65 }, defaultCostPerKg: 10.0, organicAvailable: true },

  // Beef
  { id: "beef-ribeye", name: "Beef Ribeye", category: "protein", proteinType: "beef", cut: "ribeye", nutritionPer100g: { calories: 291, protein: 24, carbs: 0, fat: 21.2, fiber: 0, sodium: 59 }, defaultCostPerKg: 45.0, organicAvailable: true },
  { id: "beef-sirloin", name: "Beef Sirloin", category: "protein", proteinType: "beef", cut: "sirloin", nutritionPer100g: { calories: 218, protein: 28.1, carbs: 0, fat: 11, fiber: 0, sodium: 56 }, defaultCostPerKg: 35.0, organicAvailable: true },
  { id: "beef-fillet", name: "Beef Fillet", category: "protein", proteinType: "beef", cut: "fillet", nutritionPer100g: { calories: 198, protein: 28.5, carbs: 0, fat: 9, fiber: 0, sodium: 54 }, defaultCostPerKg: 55.0, organicAvailable: true },
  { id: "beef-rump", name: "Beef Rump", category: "protein", proteinType: "beef", cut: "rump", nutritionPer100g: { calories: 214, protein: 28.8, carbs: 0, fat: 10.3, fiber: 0, sodium: 58 }, defaultCostPerKg: 22.0, organicAvailable: true },
  { id: "beef-tbone", name: "Beef T-Bone", category: "protein", proteinType: "beef", cut: "t-bone", nutritionPer100g: { calories: 247, protein: 25.6, carbs: 0, fat: 15.4, fiber: 0, sodium: 57 }, defaultCostPerKg: 38.0, organicAvailable: true },
  { id: "beef-mince-lean", name: "Extra Lean Beef Mince (5%)", category: "protein", proteinType: "beef", cut: "mince-lean", nutritionPer100g: { calories: 137, protein: 21.4, carbs: 0, fat: 5.3, fiber: 0, sodium: 66 }, defaultCostPerKg: 16.0, organicAvailable: true },
  { id: "beef-mince-regular", name: "Beef Mince (15%)", category: "protein", proteinType: "beef", cut: "mince-regular", nutritionPer100g: { calories: 215, protein: 18.6, carbs: 0, fat: 15.2, fiber: 0, sodium: 68 }, defaultCostPerKg: 12.0, organicAvailable: true },
  { id: "beef-kofta", name: "Beef Kofta", category: "protein", proteinType: "beef", cut: "kofta", nutritionPer100g: { calories: 226, protein: 18.2, carbs: 2.5, fat: 15.8, fiber: 0.3, sodium: 520 }, defaultCostPerKg: 18.0, organicAvailable: false },

  // Lamb
  { id: "lamb-cutlets", name: "Lamb Cutlets", category: "protein", proteinType: "lamb", cut: "cutlets", nutritionPer100g: { calories: 282, protein: 25.5, carbs: 0, fat: 19.4, fiber: 0, sodium: 65 }, defaultCostPerKg: 38.0, organicAvailable: true },
  { id: "lamb-leg-steak", name: "Lamb Leg Steak", category: "protein", proteinType: "lamb", cut: "leg-steak", nutritionPer100g: { calories: 203, protein: 27.7, carbs: 0, fat: 9.7, fiber: 0, sodium: 63 }, defaultCostPerKg: 22.0, organicAvailable: true },
  { id: "lamb-shoulder", name: "Lamb Shoulder", category: "protein", proteinType: "lamb", cut: "shoulder", nutritionPer100g: { calories: 258, protein: 22.7, carbs: 0, fat: 18, fiber: 0, sodium: 67 }, defaultCostPerKg: 18.0, organicAvailable: true },
  { id: "lamb-mince", name: "Lamb Mince", category: "protein", proteinType: "lamb", cut: "mince", nutritionPer100g: { calories: 225, protein: 18.7, carbs: 0, fat: 16.4, fiber: 0, sodium: 70 }, defaultCostPerKg: 16.0, organicAvailable: true },
  { id: "lamb-chops", name: "Lamb Chops", category: "protein", proteinType: "lamb", cut: "chops", nutritionPer100g: { calories: 269, protein: 24.5, carbs: 0, fat: 18.5, fiber: 0, sodium: 66 }, defaultCostPerKg: 32.0, organicAvailable: true },
  { id: "lamb-kofta", name: "Lamb Kofta", category: "protein", proteinType: "lamb", cut: "kofta", nutritionPer100g: { calories: 243, protein: 17.5, carbs: 2.8, fat: 17.8, fiber: 0.3, sodium: 530 }, defaultCostPerKg: 20.0, organicAvailable: false },

  // Vegetables
  { id: "broccoli", name: "Broccoli", category: "vegetable", nutritionPer100g: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sodium: 33 }, defaultCostPerKg: 5.0, organicAvailable: true },
  { id: "spinach", name: "Baby Spinach", category: "vegetable", nutritionPer100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sodium: 79 }, defaultCostPerKg: 8.0, organicAvailable: true },
  { id: "green-beans", name: "Green Beans", category: "vegetable", nutritionPer100g: { calories: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 3.4, sodium: 6 }, defaultCostPerKg: 6.0, organicAvailable: true },
  { id: "asparagus", name: "Asparagus", category: "vegetable", nutritionPer100g: { calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, sodium: 2 }, defaultCostPerKg: 12.0, organicAvailable: true },
  { id: "sweet-peppers", name: "Sweet Peppers", category: "vegetable", nutritionPer100g: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sodium: 4 }, defaultCostPerKg: 7.0, organicAvailable: true },
  { id: "zucchini", name: "Zucchini", category: "vegetable", nutritionPer100g: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, sodium: 8 }, defaultCostPerKg: 4.5, organicAvailable: true },
  { id: "mushrooms", name: "Mushrooms", category: "vegetable", nutritionPer100g: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, sodium: 5 }, defaultCostPerKg: 10.0, organicAvailable: true },
  { id: "carrots", name: "Carrots", category: "vegetable", nutritionPer100g: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sodium: 69 }, defaultCostPerKg: 3.0, organicAvailable: true },
  { id: "corn", name: "Sweet Corn", category: "vegetable", nutritionPer100g: { calories: 86, protein: 3.3, carbs: 19, fat: 1.4, fiber: 2.7, sodium: 15 }, defaultCostPerKg: 4.0, organicAvailable: true },
  { id: "mixed-salad", name: "Mixed Salad Leaves", category: "vegetable", nutritionPer100g: { calories: 17, protein: 1.3, carbs: 2.9, fat: 0.2, fiber: 1.3, sodium: 20 }, defaultCostPerKg: 10.0, organicAvailable: true },
  { id: "eggplant", name: "Eggplant", category: "vegetable", nutritionPer100g: { calories: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, sodium: 2 }, defaultCostPerKg: 5.0, organicAvailable: true },
  { id: "kale", name: "Kale", category: "vegetable", nutritionPer100g: { calories: 49, protein: 4.3, carbs: 8.8, fat: 0.9, fiber: 3.6, sodium: 38 }, defaultCostPerKg: 9.0, organicAvailable: true },
  { id: "cherry-tomatoes", name: "Cherry Tomatoes", category: "vegetable", nutritionPer100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sodium: 5 }, defaultCostPerKg: 8.0, organicAvailable: true },
  { id: "onions", name: "Onions", category: "vegetable", nutritionPer100g: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, sodium: 4 }, defaultCostPerKg: 2.5, organicAvailable: true },

  // Carbs
  { id: "white-rice", name: "White Rice (cooked)", category: "carb", nutritionPer100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sodium: 1 }, defaultCostPerKg: 2.5, organicAvailable: true },
  { id: "brown-rice", name: "Brown Rice (cooked)", category: "carb", nutritionPer100g: { calories: 112, protein: 2.3, carbs: 24, fat: 0.8, fiber: 1.8, sodium: 1 }, defaultCostPerKg: 3.0, organicAvailable: true },
  { id: "pasta", name: "Pasta (cooked)", category: "carb", nutritionPer100g: { calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, sodium: 1 }, defaultCostPerKg: 3.0, organicAvailable: false },
  { id: "couscous", name: "Couscous (cooked)", category: "carb", nutritionPer100g: { calories: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4, sodium: 5 }, defaultCostPerKg: 4.0, organicAvailable: false },
  { id: "white-potato", name: "White Potato", category: "carb", nutritionPer100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, sodium: 6 }, defaultCostPerKg: 2.0, organicAvailable: true },
  { id: "sweet-potato", name: "Sweet Potato", category: "carb", nutritionPer100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sodium: 55 }, defaultCostPerKg: 3.5, organicAvailable: true },
  { id: "baby-potatoes", name: "Baby Potatoes", category: "carb", nutritionPer100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, sodium: 6 }, defaultCostPerKg: 4.0, organicAvailable: true },
  { id: "rice-noodles", name: "Rice Noodles (cooked)", category: "carb", nutritionPer100g: { calories: 109, protein: 0.9, carbs: 25.3, fat: 0.2, fiber: 1, sodium: 3 }, defaultCostPerKg: 5.0, organicAvailable: false },

  // Breakfast
  { id: "protein-pancake-batter", name: "Protein Pancake Batter", category: "breakfast", nutritionPer100g: { calories: 180, protein: 22, carbs: 15, fat: 4, fiber: 1.5, sodium: 300 }, defaultCostPerKg: 8.0, organicAvailable: false },
  { id: "rolled-oats", name: "Rolled Oats", category: "breakfast", nutritionPer100g: { calories: 379, protein: 13.2, carbs: 67.7, fat: 6.5, fiber: 10.1, sodium: 6 }, defaultCostPerKg: 3.0, organicAvailable: true },
  { id: "free-range-eggs", name: "Free-Range Eggs", category: "breakfast", nutritionPer100g: { calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, fiber: 0, sodium: 124 }, defaultCostPerKg: 7.0, organicAvailable: true },
  { id: "turkey-mince", name: "Turkey Mince", category: "breakfast", nutritionPer100g: { calories: 148, protein: 19.7, carbs: 0, fat: 7.5, fiber: 0, sodium: 82 }, defaultCostPerKg: 12.0, organicAvailable: true },
];

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredients.find((i) => i.id === id);
}

export function getIngredientsByCategory(category: string): Ingredient[] {
  return ingredients.filter((i) => i.category === category);
}
