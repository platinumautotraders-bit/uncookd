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
    <div
      className={cn(
        "rounded-xl border border-border-light bg-bg-card p-4 transition-shadow hover:shadow-md"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">
              {slotLabels[meal.slot]}
            </span>
            {activeDietary.map((flag) => (
              <span
                key={flag}
                className="text-[10px] font-bold uppercase text-brand-green"
              >
                {dietaryLabels[flag] ?? flag}
              </span>
            ))}
          </div>
          <h4 className="font-[family-name:var(--font-sora)] text-sm font-semibold leading-snug">
            {meal.name}
          </h4>
          {sauce && (
            <p className="mt-0.5 text-xs text-text-secondary">
              {sauce.name}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold">
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
          <svg
            className={cn(
              "h-4 w-4 text-text-secondary transition-transform",
              expanded && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-border-light pt-4">
              <p className="text-sm text-text-secondary">{meal.description}</p>

              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Ingredients
                </h5>
                <ul className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                  {meal.ingredients.map((ing) => (
                    <li
                      key={ing.ingredientId}
                      className="flex items-center gap-2 text-text-secondary"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand-red" />
                      {ing.name} ({ing.quantity}{ing.unit})
                    </li>
                  ))}
                </ul>
              </div>

              {meal.cookingMethods.length > 0 && (
                <div>
                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
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
                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Cooking Steps
                  </h5>
                  <ol className="space-y-1.5">
                    {meal.cookingSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-text-secondary"
                      >
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-brand-red">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <NutritionLabel nutrition={meal.nutrition} />

              {meal.allergens.length > 0 && (
                <div>
                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Allergens
                  </h5>
                  <AllergenTags allergens={meal.allergens} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
