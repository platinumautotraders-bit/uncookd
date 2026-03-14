"use client";

import { usePlanFilterStore } from "@/stores/planFilterStore";
import type { PlanGoal, DietaryFlag } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const goalOptions: { value: PlanGoal; label: string }[] = [
  { value: "fat-loss", label: "Fat Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "high-protein", label: "High Protein" },
  { value: "balanced", label: "Balanced" },
  { value: "chicken-lovers", label: "Chicken Only" },
  { value: "premium-beef", label: "Premium Beef" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "athletic", label: "Athletic" },
  { value: "full-day", label: "Full Day" },
  { value: "global", label: "Global Flavour" },
];

const dietaryOptions: { value: DietaryFlag; label: string }[] = [
  { value: "gf", label: "Gluten Free" },
  { value: "df", label: "Dairy Free" },
  { value: "lf", label: "Lactose Free" },
];

export function PlanFilter() {
  const {
    goal,
    includesBreakfast,
    dietary,
    setGoal,
    setIncludesBreakfast,
    toggleDietary,
    clearFilters,
    hasActiveFilters,
  } = usePlanFilterStore();

  return (
    <div className="sticky top-20 z-30 -mx-4 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:px-0 sm:py-0 sm:backdrop-blur-none">
      <div className="space-y-4">
        {/* Goal pills */}
        <div>
          <span className="mb-2.5 block text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Goal
          </span>
          <div className="flex flex-wrap gap-2">
            {goalOptions.map((opt) => {
              const isActive = goal === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGoal(isActive ? null : opt.value)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/25"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="goalPill"
                      className="absolute inset-0 rounded-full bg-brand-red"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary pills + Breakfast toggle */}
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <span className="mb-2.5 block text-xs font-semibold uppercase tracking-widest text-text-secondary">
              Dietary
            </span>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((opt) => {
                const isActive = dietary.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleDietary(opt.value)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-brand-green text-white shadow-lg shadow-brand-green/25"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Breakfast toggle switch */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-600">
              Breakfast
            </span>
            <button
              type="button"
              onClick={() =>
                setIncludesBreakfast(includesBreakfast ? null : true)
              }
              className={cn(
                "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
                includesBreakfast
                  ? "bg-brand-red"
                  : "bg-neutral-200"
              )}
            >
              <motion.span
                className="block h-5 w-5 rounded-full bg-white shadow-md"
                animate={{
                  x: includesBreakfast ? 24 : 4,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Clear filters */}
          <AnimatePresence>
            {hasActiveFilters() && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearFilters}
                className="ml-auto self-end text-sm font-medium text-text-secondary transition-colors hover:text-brand-red"
              >
                Clear all
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
