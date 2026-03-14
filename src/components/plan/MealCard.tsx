"use client";

import { useState } from "react";
import type { Meal } from "@/types";
import { CookingMethodIcon } from "@/components/shared/CookingMethodIcon";
import { NutritionLabel } from "@/components/shared/NutritionLabel";
import { AllergenTags } from "@/components/shared/AllergenTags";
import { Badge } from "@/components/shared/Badge";
import { formatCookTime } from "@/lib/formatters";
import { getSauceByCode } from "@/config/sauces";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const dietaryLabels: Record<string, string> = {
  gf: "GF",
  df: "DF",
  lf: "LF",
};

const slotLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const [expanded, setExpanded] = useState(false);
  const sauce = meal.sauceCode ? getSauceByCode(meal.sauceCode) : null;

  const activeDietary = (Object.entries(meal.dietary) as [string, string][])
    .filter(([, status]) => status === "yes")
    .map(([flag]) => flag);

  return (
    <motion.div
      layout
      className={cn(
        "rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300",
        expanded && "shadow-md ring-black/10"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-3 p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="rounded-full bg-brand-red/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-red">
              {slotLabels[meal.slot]}
            </span>
            {activeDietary.map((flag) => (
              <span
                key={flag}
                className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-green"
              >
                {dietaryLabels[flag] ?? flag}
              </span>
            ))}
          </div>
          <h4 className="font-[family-name:var(--font-sora)] text-base font-semibold leading-snug">
            {meal.name}
          </h4>
          {sauce && (
            <p className="mt-1 text-xs text-text-secondary">{sauce.name}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-brand-red">
            {meal.nutrition.calories} cal
          </span>
          <div className="flex items-center gap-2">
            {meal.cookingMethods.slice(0, 1).map((method) => (
              <CookingMethodIcon
                key={method}
                method={method}
                showLabel={false}
                size="sm"
              />
            ))}
            <span className="text-xs text-text-secondary">
              {formatCookTime(meal.cookTime)}
            </span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100"
          >
            <svg
              className="h-3.5 w-3.5 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-neutral-100 px-5 pb-5 pt-5">
              <p className="text-sm text-text-secondary leading-relaxed">
                {meal.description}
              </p>

              <div>
                <h5 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Ingredients
                </h5>
                <ul className="grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
                  {meal.ingredients.map((ing) => (
                    <li
                      key={ing.ingredientId}
                      className="flex items-center gap-2 text-text-secondary"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/50" />
                      {ing.name} ({ing.quantity}
                      {ing.unit})
                    </li>
                  ))}
                </ul>
              </div>

              {meal.cookingMethods.length > 0 && (
                <div>
                  <h5 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Cooking Methods
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {meal.cookingMethods.map((method) => (
                      <Badge key={method} variant="cooking-method">
                        <CookingMethodIcon method={method} size="sm" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {meal.cookingSteps.length > 0 && (
                <div>
                  <h5 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Cooking Steps
                  </h5>
                  <ol className="space-y-2">
                    {meal.cookingSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-text-secondary"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-brand-red">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <NutritionLabel nutrition={meal.nutrition} />

              {meal.allergens.length > 0 && (
                <div>
                  <h5 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Allergens
                  </h5>
                  <AllergenTags allergens={meal.allergens} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
