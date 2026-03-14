"use client";

import { usePlanFilterStore } from "@/stores/planFilterStore";
import type { PlanGoal, DietaryFlag } from "@/types";

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
    <div className="rounded-xl border border-border-light bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={goal ?? ""}
          onChange={(e) =>
            setGoal(e.target.value ? (e.target.value as PlanGoal) : null)
          }
          className="rounded-lg border border-border-light bg-white px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
        >
          <option value="">All Goals</option>
          {goalOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {dietaryOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-1.5 text-sm"
          >
            <input
              type="checkbox"
              checked={dietary.includes(opt.value)}
              onChange={() => toggleDietary(opt.value)}
              className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
            />
            {opt.label}
          </label>
        ))}

        <label className="flex cursor-pointer items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={includesBreakfast === true}
            onChange={() =>
              setIncludesBreakfast(includesBreakfast ? null : true)
            }
            className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
          />
          Includes Breakfast
        </label>

        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="ml-auto text-xs font-medium text-brand-red transition-colors hover:text-brand-red-hover"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
