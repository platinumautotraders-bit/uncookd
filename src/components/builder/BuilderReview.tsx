"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { useCartStore } from "@/stores/cartStore";
import { coreSauces, sideSauces, saladAddOns } from "@/config/sauces";
import { proteinCookingMatrix } from "@/config/builder";
import { carbMealTypeMatrix } from "@/config/builder";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { NutritionLabel } from "@/components/shared/NutritionLabel";
import { AllergenTags } from "@/components/shared/AllergenTags";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { Badge } from "@/components/shared/Badge";
import { cn, generateId } from "@/lib/utils";
import type { NutritionInfo, Allergen, ServingSize, CartItemBuilderMeal } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVING_OPTIONS: { value: ServingSize; label: string }[] = [
  { value: 1, label: "1 Person" },
  { value: 2, label: "2 People" },
  { value: 4, label: "Family (4)" },
];

function getCutLabel(cut: string): string {
  const labels: Record<string, string> = {
    breast: "Breast",
    thigh: "Thigh",
    drumstick: "Drumstick",
    wings: "Wings",
    mince: "Mince",
    ribeye: "Ribeye",
    sirloin: "Sirloin",
    fillet: "Fillet",
    rump: "Rump",
    "t-bone": "T-Bone",
    "mince-lean": "Lean Mince",
    "mince-regular": "Regular Mince",
    cutlets: "Cutlets",
    "leg-steak": "Leg Steak",
    shoulder: "Shoulder",
    chops: "Chops",
    kofta: "Kofta",
  };
  return labels[cut] || cut;
}

function getVegLabel(veg: string): string {
  const labels: Record<string, string> = {
    broccoli: "Broccoli",
    spinach: "Spinach",
    "green-beans": "Green Beans",
    asparagus: "Asparagus",
    "sweet-peppers": "Sweet Peppers",
    zucchini: "Zucchini",
    mushrooms: "Mushrooms",
    carrots: "Carrots",
    corn: "Corn",
    "mixed-salad": "Mixed Salad",
    eggplant: "Eggplant",
    "cherry-tomatoes": "Cherry Tomatoes",
  };
  return labels[veg] || veg;
}

function getMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    pan: "Pan / Stovetop",
    "air-fryer": "Air Fryer",
    oven: "Oven",
    "slow-cooker": "Slow Cooker",
    bbq: "BBQ / Grill",
    "stir-fry": "Stir Fry",
  };
  return labels[method] || method;
}

function getMealTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "stir-fry": "Stir Fry",
    roast: "Roast",
    "steak-plate": "Steak Plate",
    bowl: "Bowl",
    "tray-bake": "Tray Bake",
    curry: "Curry",
  };
  return labels[type] || type;
}

function getCarbLabel(carb: string | null): string {
  if (!carb) return "No Carb";
  const entry = carbMealTypeMatrix.find((c) => c.carb === carb);
  return entry?.name || carb;
}

function getEstimatedNutrition(servingSize: ServingSize): NutritionInfo {
  // Placeholder estimates per serving
  const base: NutritionInfo = {
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 18,
    fiber: 6,
    sodium: 480,
  };
  return {
    calories: base.calories * servingSize,
    protein: base.protein * servingSize,
    carbs: base.carbs * servingSize,
    fat: base.fat * servingSize,
    fiber: base.fiber * servingSize,
    sodium: base.sodium * servingSize,
  };
}

function getEstimatedCookTime(method: string): number {
  const times: Record<string, number> = {
    pan: 15,
    "air-fryer": 20,
    oven: 30,
    "slow-cooker": 240,
    bbq: 20,
    "stir-fry": 12,
  };
  return times[method] || 20;
}

function getEstimatedPrice(servingSize: ServingSize): number {
  const basePrices: Record<ServingSize, number> = {
    1: 14.99,
    2: 26.99,
    4: 49.99,
  };
  return basePrices[servingSize];
}

export function BuilderReview() {
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  const cookingMethod = useBuilderStore((s) => s.cookingMethod);
  const mealType = useBuilderStore((s) => s.mealType);
  const proteinType = useBuilderStore((s) => s.proteinType);
  const proteinCut = useBuilderStore((s) => s.proteinCut);
  const carb = useBuilderStore((s) => s.carb);
  const vegetables = useBuilderStore((s) => s.vegetables);
  const sauceCode = useBuilderStore((s) => s.sauceCode);
  const sideSauceCode = useBuilderStore((s) => s.sideSauceCode);
  const saladCode = useBuilderStore((s) => s.saladCode);
  const servingSize = useBuilderStore((s) => s.servingSize);
  const quantity = useBuilderStore((s) => s.quantity);
  const setServingSize = useBuilderStore((s) => s.setServingSize);
  const setQuantity = useBuilderStore((s) => s.setQuantity);
  const reset = useBuilderStore((s) => s.reset);

  const addItem = useCartStore((s) => s.addItem);

  if (!cookingMethod || !mealType || !proteinType || !proteinCut) return null;

  const proteinEntry = proteinCookingMatrix.find(
    (p) => p.proteinType === proteinType && p.cut === proteinCut
  );
  const sauceEntry = sauceCode
    ? coreSauces.find((s) => s.code === sauceCode)
    : null;
  const sideSauceEntry = sideSauceCode
    ? sideSauces.find((s) => s.code === sideSauceCode)
    : null;
  const saladEntry = saladCode
    ? saladAddOns.find((s) => s.code === saladCode)
    : null;

  const nutrition = getEstimatedNutrition(1);
  const cookTime = getEstimatedCookTime(cookingMethod);
  const price = getEstimatedPrice(servingSize);

  // Aggregate allergens
  const allergens: Allergen[] = [];
  if (sauceEntry) {
    for (const a of sauceEntry.allergens) {
      if (!allergens.includes(a)) allergens.push(a);
    }
  }
  if (sideSauceEntry) {
    for (const a of sideSauceEntry.allergens) {
      if (!allergens.includes(a)) allergens.push(a);
    }
  }
  if (saladEntry) {
    for (const a of saladEntry.allergens) {
      if (!allergens.includes(a)) allergens.push(a);
    }
  }

  // Build meal name
  const mealName = `Custom ${getMealTypeLabel(mealType)} - ${proteinEntry?.protein || `${proteinType} ${getCutLabel(proteinCut)}`}`;
  const description = [
    proteinEntry?.protein,
    carb ? getCarbLabel(carb) : null,
    vegetables.map(getVegLabel).join(", "),
    sauceEntry?.name,
  ]
    .filter(Boolean)
    .join(" / ");

  function handleAddToCart() {
    const item: CartItemBuilderMeal = {
      type: "builder-meal",
      id: generateId(),
      mealName,
      description,
      servingSize,
      quantity,
      unitPrice: price,
      nutrition: getEstimatedNutrition(servingSize),
    };
    addItem(item);
    setAddedToCart(true);
    setTimeout(() => {
      reset();
      router.push("/cart");
    }, 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        Your Custom Meal
      </h2>
      <p className="mb-8 text-text-secondary">
        Review your selections, choose portions, and add to cart.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Meal summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="rounded-xl border border-border-light bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-sora)]">
                  {mealName}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {description}
                </p>
              </div>
              <HalalBadge />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="cooking-method">
                {getMethodLabel(cookingMethod)}
              </Badge>
              <Badge variant="default">{getMealTypeLabel(mealType)}</Badge>
              <Badge variant="default">
                ~{cookTime < 60 ? `${cookTime} min` : `${Math.round(cookTime / 60)}h`}
              </Badge>
            </div>
          </div>

          {/* Ingredients breakdown */}
          <div className="rounded-xl border border-border-light bg-white p-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Your Selections
            </h4>

            <div className="space-y-4">
              <ReviewRow
                label="Protein"
                value={proteinEntry?.protein || getCutLabel(proteinCut)}
                accent
              />
              <ReviewRow
                label="Carb"
                value={getCarbLabel(carb)}
              />
              <ReviewRow
                label="Vegetables"
                value={vegetables.map(getVegLabel).join(", ")}
              />
              <ReviewRow
                label="Sauce"
                value={sauceEntry?.name || "No Sauce"}
              />
              {sideSauceEntry && (
                <ReviewRow
                  label="Side Sauce"
                  value={sideSauceEntry.name}
                />
              )}
              {saladEntry && (
                <ReviewRow
                  label="Salad"
                  value={saladEntry.name}
                />
              )}
            </div>
          </div>

          {/* Allergens */}
          {allergens.length > 0 && (
            <div className="rounded-xl border border-border-light bg-white p-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                Allergens
              </h4>
              <AllergenTags allergens={allergens} />
            </div>
          )}

          {/* Nutrition estimate */}
          <div className="rounded-xl border border-border-light bg-white p-6">
            <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Estimated Nutrition (Per Serve)
            </h4>
            <p className="mb-4 text-xs text-text-secondary">
              Estimates based on standard portions. Exact values calculated at order time.
            </p>
            <NutritionLabel nutrition={nutrition} />
          </div>
        </div>

        {/* Sticky order card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border-light bg-white p-6 shadow-lg">
            <h4 className="mb-6 text-lg font-bold font-[family-name:var(--font-sora)]">
              Order Details
            </h4>

            {/* Serving size */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-text-secondary">
                Serving Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SERVING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setServingSize(opt.value)}
                    className={cn(
                      "rounded-lg border-2 px-2 py-2 text-xs font-semibold transition-all",
                      servingSize === opt.value
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-border-light bg-white text-foreground hover:border-gray-300"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-text-secondary">
                Quantity
              </label>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
              />
            </div>

            {/* Price */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-text-secondary">Price</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-bold text-brand-red">
                  ${(price * quantity).toFixed(2)}
                </span>
              </div>
              {quantity > 1 && (
                <div className="mt-1 text-right text-xs text-text-secondary">
                  ${price.toFixed(2)} each
                </div>
              )}
            </div>

            {/* Add to cart button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={cn(
                "w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-all",
                addedToCart
                  ? "bg-brand-green text-white"
                  : "bg-brand-red text-white hover:bg-brand-red-hover active:scale-[0.98]"
              )}
            >
              {addedToCart ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReviewRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border-light pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        className={cn(
          "text-right text-sm font-medium",
          accent ? "text-brand-red font-semibold" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}
