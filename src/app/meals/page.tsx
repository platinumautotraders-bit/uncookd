"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { NutritionLabel } from "@/components/shared/NutritionLabel";
import { CookingMethodIcon } from "@/components/shared/CookingMethodIcon";
import { AllergenTags } from "@/components/shared/AllergenTags";
import { allMeals, type MealWithPlan } from "@/config/allMeals";
import { getSauceByCode } from "@/config/sauces";
import { cn } from "@/lib/utils";
import { formatCookTime } from "@/lib/formatters";
import type { MealSlot, CookingMethod } from "@/types";

const slotFilters: { value: MealSlot | "all"; label: string }[] = [
  { value: "all", label: "All Meals" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
];

const proteinFilters = [
  { value: "all", label: "All Proteins" },
  { value: "chicken", label: "Chicken" },
  { value: "beef", label: "Beef" },
  { value: "lamb", label: "Lamb" },
];

function MealCard({ meal }: { meal: MealWithPlan }) {
  const [expanded, setExpanded] = useState(false);
  const sauce = meal.sauceCode ? getSauceByCode(meal.sauceCode) : null;
  const mainProtein = meal.ingredients.find((i) => i.category === "protein");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  meal.slot === "breakfast" ? "bg-amber-100 text-amber-700" :
                  meal.slot === "lunch" ? "bg-blue-100 text-blue-700" :
                  "bg-purple-100 text-purple-700"
                )}>
                  {meal.slot}
                </span>
                {meal.cookingMethods.slice(0, 2).map((m) => (
                  <CookingMethodIcon key={m} method={m} size="sm" showLabel={false} />
                ))}
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-sora)] text-base font-bold leading-tight">
                {meal.name}
              </h3>
              <p className="mt-1 text-xs text-text-secondary line-clamp-2">
                {meal.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold text-brand-red">
                {meal.nutrition.calories}
              </div>
              <div className="text-[10px] text-text-secondary">cal</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-text-secondary">
            {mainProtein && <span>{mainProtein.name}</span>}
            {sauce && (
              <>
                <span className="h-3 w-px bg-border-light" />
                <span>{sauce.name}</span>
              </>
            )}
            <span className="h-3 w-px bg-border-light" />
            <span>{formatCookTime(meal.cookTime)}</span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border-light px-5 pb-5 pt-4">
              <NutritionLabel nutrition={meal.nutrition} compact />

              {meal.allergens.length > 0 && (
                <div className="mt-3">
                  <AllergenTags allergens={meal.allergens} />
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Ingredients
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {meal.ingredients.map((ing) => (
                    <span
                      key={ing.name}
                      className="rounded-full bg-bg-card px-2.5 py-1 text-xs"
                    >
                      {ing.name} ({ing.quantity}g)
                    </span>
                  ))}
                </div>
              </div>

              {meal.cookingSteps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    How to Cook
                  </h4>
                  <ol className="mt-2 space-y-1.5">
                    {meal.cookingSteps.map((step, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/10 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-bold text-brand-red">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href={`/plan/${meal.planSlug}`}
                  className="text-xs font-semibold text-brand-red hover:text-brand-red-hover"
                >
                  Part of {meal.planName} &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MealsPage() {
  const [slotFilter, setSlotFilter] = useState<MealSlot | "all">("all");
  const [proteinFilter, setProteinFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let meals = [...allMeals];

    if (slotFilter !== "all") {
      meals = meals.filter((m) => m.slot === slotFilter);
    }

    if (proteinFilter !== "all") {
      meals = meals.filter((m) =>
        m.ingredients.some(
          (i) => i.category === "protein" && i.name.toLowerCase().includes(proteinFilter)
        )
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      meals = meals.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    return meals;
  }, [slotFilter, proteinFilter, searchQuery]);

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-[family-name:var(--font-sora)] text-4xl font-extrabold sm:text-5xl">
          All <span className="text-gradient-red">Meals</span>
        </h1>
        <p className="mt-3 max-w-lg text-lg text-text-secondary">
          {allMeals.length} unique meals across all plans. Filter, explore, find what you are craving.
        </p>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search meals, ingredients, or sauces..."
          className="w-full max-w-md rounded-xl border border-border-light bg-white px-4 py-3 text-sm transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/10"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Meal Type
          </span>
          <div className="flex flex-wrap gap-2">
            {slotFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSlotFilter(f.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  slotFilter === f.value
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/25"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Protein
          </span>
          <div className="flex flex-wrap gap-2">
            {proteinFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setProteinFilter(f.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  proteinFilter === f.value
                    ? "bg-foreground text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-text-secondary">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> meals
      </div>

      {/* Meal grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((meal) => (
            <MealCard key={meal.slug} meal={meal} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-text-secondary">No meals match your search.</p>
          <button
            onClick={() => {
              setSlotFilter("all");
              setProteinFilter("all");
              setSearchQuery("");
            }}
            className="mt-3 text-sm font-semibold text-brand-red"
          >
            Clear all filters
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
