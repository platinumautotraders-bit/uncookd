import type {
  CombinationMatrix,
  ProteinCookingCompatibility,
  ProteinSauceCompatibility,
  CarbMealTypeCompatibility,
  MealTemplate,
} from "@/types";

export const proteinCookingMatrix: ProteinCookingCompatibility[] = [
  { protein: "Chicken Breast", cut: "breast", proteinType: "chicken", methods: ["pan", "air-fryer", "oven", "slow-cooker", "bbq"] },
  { protein: "Chicken Thigh", cut: "thigh", proteinType: "chicken", methods: ["pan", "air-fryer", "oven", "slow-cooker", "bbq"] },
  { protein: "Chicken Drumstick", cut: "drumstick", proteinType: "chicken", methods: ["pan", "air-fryer", "oven", "bbq"] },
  { protein: "Chicken Wings", cut: "wings", proteinType: "chicken", methods: ["air-fryer", "oven", "bbq"] },
  { protein: "Chicken Mince", cut: "mince", proteinType: "chicken", methods: ["pan", "slow-cooker"] },
  { protein: "Beef Ribeye", cut: "ribeye", proteinType: "beef", methods: ["pan", "bbq"] },
  { protein: "Beef Sirloin", cut: "sirloin", proteinType: "beef", methods: ["pan", "bbq"] },
  { protein: "Beef Fillet", cut: "fillet", proteinType: "beef", methods: ["pan", "bbq"] },
  { protein: "Beef Rump", cut: "rump", proteinType: "beef", methods: ["pan", "oven", "slow-cooker", "bbq"] },
  { protein: "Beef T-Bone", cut: "t-bone", proteinType: "beef", methods: ["pan", "bbq"] },
  { protein: "Beef Mince (Lean)", cut: "mince-lean", proteinType: "beef", methods: ["pan", "slow-cooker"] },
  { protein: "Beef Mince (Regular)", cut: "mince-regular", proteinType: "beef", methods: ["pan", "slow-cooker"] },
  { protein: "Lamb Cutlets", cut: "cutlets", proteinType: "lamb", methods: ["pan", "air-fryer", "oven", "bbq"] },
  { protein: "Lamb Leg Steak", cut: "leg-steak", proteinType: "lamb", methods: ["pan", "oven", "bbq"] },
  { protein: "Lamb Shoulder", cut: "shoulder", proteinType: "lamb", methods: ["pan", "oven", "slow-cooker"] },
  { protein: "Lamb Mince", cut: "mince", proteinType: "lamb", methods: ["pan", "slow-cooker"] },
  { protein: "Lamb Chops", cut: "chops", proteinType: "lamb", methods: ["pan", "air-fryer", "oven", "bbq"] },
  { protein: "Beef Kofta", cut: "kofta", proteinType: "beef", methods: ["pan", "air-fryer", "oven", "bbq"] },
  { protein: "Lamb Kofta", cut: "kofta", proteinType: "lamb", methods: ["pan", "air-fryer", "oven", "bbq"] },
];

export const proteinSauceMatrix: ProteinSauceCompatibility[] = [
  {
    sauceCode: "garlic-herb-butter",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast"] },
      { proteinType: "beef", cuts: ["ribeye", "sirloin", "fillet", "rump", "t-bone"] },
      { proteinType: "lamb", cuts: ["leg-steak"] },
    ],
  },
  {
    sauceCode: "lemon-herb",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast"] },
      { proteinType: "lamb", cuts: ["leg-steak"] },
    ],
  },
  {
    sauceCode: "smoky-bbq",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["thigh", "drumstick", "wings"] },
      { proteinType: "beef", cuts: ["mince-lean", "mince-regular"] },
    ],
  },
  {
    sauceCode: "chimichurri",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast", "drumstick"] },
      { proteinType: "beef", cuts: ["ribeye", "sirloin", "fillet", "rump", "t-bone"] },
      { proteinType: "lamb", cuts: ["cutlets", "chops"] },
    ],
  },
  {
    sauceCode: "peri-peri",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast", "thigh", "drumstick", "wings"] },
    ],
  },
  {
    sauceCode: "teriyaki",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast", "thigh"] },
      { proteinType: "beef", cuts: ["rump", "sirloin"], note: "strips only" },
    ],
  },
  {
    sauceCode: "coconut-curry",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast", "thigh"] },
      { proteinType: "beef", cuts: ["rump", "sirloin"], note: "strips" },
      { proteinType: "lamb", cuts: ["shoulder"] },
    ],
  },
  {
    sauceCode: "tomato-curry",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["thigh"] },
      { proteinType: "beef", cuts: ["mince-lean", "mince-regular", "kofta"] },
      { proteinType: "lamb", cuts: ["mince", "kofta"] },
    ],
  },
  {
    sauceCode: "shawarma",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["thigh"] },
      { proteinType: "lamb", cuts: ["leg-steak"] },
      { proteinType: "beef", cuts: ["kofta"] },
      { proteinType: "lamb", cuts: ["kofta"] },
    ],
  },
  {
    sauceCode: "korean",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["thigh"] },
      { proteinType: "beef", cuts: ["rump", "sirloin"], note: "strips only" },
    ],
  },
  {
    sauceCode: "med-herb",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["thigh"] },
      { proteinType: "lamb", cuts: ["cutlets", "chops", "leg-steak"] },
    ],
  },
  {
    sauceCode: "simple-spo",
    compatibleProteins: [
      { proteinType: "chicken", cuts: ["breast"] },
      { proteinType: "beef", cuts: ["ribeye", "sirloin", "fillet", "rump", "t-bone"] },
      { proteinType: "lamb", cuts: ["cutlets", "chops"] },
    ],
  },
];

export const carbMealTypeMatrix: CarbMealTypeCompatibility[] = [
  { carb: "white-rice", name: "White Rice", compatibleMealTypes: ["stir-fry", "curry", "bowl", "steak-plate"] },
  { carb: "brown-rice", name: "Brown Rice", compatibleMealTypes: ["stir-fry", "curry", "bowl", "steak-plate"] },
  { carb: "pasta", name: "Pasta", compatibleMealTypes: ["roast", "tray-bake", "steak-plate"] },
  { carb: "couscous", name: "Couscous", compatibleMealTypes: ["steak-plate", "salad", "roast"] },
  { carb: "white-potato", name: "White Potato (Mash)", compatibleMealTypes: ["steak-plate", "roast"] },
  { carb: "sweet-potato", name: "Sweet Potato", compatibleMealTypes: ["steak-plate", "roast", "tray-bake", "salad"] },
  { carb: "baby-potatoes", name: "Baby Potatoes", compatibleMealTypes: ["steak-plate", "roast", "tray-bake", "salad"] },
  { carb: "rice-noodles", name: "Rice Noodles", compatibleMealTypes: ["stir-fry", "bowl"] },
  { carb: "none", name: "No Carb", compatibleMealTypes: ["stir-fry", "steak-plate", "roast", "bowl", "tray-bake", "curry", "salad"] },
];

export const mealTemplates: MealTemplate[] = [
  { cookingMethod: "pan", mealType: "steak-plate", structure: "Seared protein + side carb + side veg" },
  { cookingMethod: "pan", mealType: "stir-fry", structure: "Protein strips + veg + sauce, served over rice/noodles" },
  { cookingMethod: "pan", mealType: "curry", structure: "Protein + sauce + veg, served over rice" },
  { cookingMethod: "air-fryer", mealType: "roast", structure: "Marinated protein + roasted carb + fresh veg" },
  { cookingMethod: "air-fryer", mealType: "tray-bake", structure: "Protein + veg + carb in air fryer basket" },
  { cookingMethod: "oven", mealType: "tray-bake", structure: "Protein + veg + carb on one tray, roast together" },
  { cookingMethod: "oven", mealType: "roast", structure: "Roasted protein + roasted sides" },
  { cookingMethod: "slow-cooker", mealType: "curry", structure: "Protein + sauce + veg, slow cook, serve over carb" },
  { cookingMethod: "stir-fry", mealType: "stir-fry", structure: "Protein strips + veg + sauce over rice/noodles" },
  { cookingMethod: "stir-fry", mealType: "bowl", structure: "Rice/noodle base + protein + veg + sauce drizzle" },
  { cookingMethod: "bbq", mealType: "steak-plate", structure: "Grilled protein + side carb + side veg/salad" },
];

export const combinationMatrix: CombinationMatrix = {
  proteinCooking: proteinCookingMatrix,
  proteinSauce: proteinSauceMatrix,
  carbMealType: carbMealTypeMatrix,
  templates: mealTemplates,
};
