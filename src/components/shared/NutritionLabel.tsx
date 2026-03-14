"use client";

import type { NutritionInfo } from "@/types";
import { cn } from "@/lib/utils";

interface NutritionLabelProps {
  nutrition: NutritionInfo;
  compact?: boolean;
  className?: string;
}

export function NutritionLabel({ nutrition, compact = false, className }: NutritionLabelProps) {
  if (compact) {
    return (
      <div className={cn("flex gap-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-secondary", className)}>
        <span>{nutrition.calories} cal</span>
        <span>{nutrition.protein}g P</span>
        <span>{nutrition.carbs}g C</span>
        <span>{nutrition.fat}g F</span>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border-light p-4", className)}>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
        Nutrition Per Serve
      </h4>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        <NutritionItem label="Calories" value={`${nutrition.calories}`} unit="cal" highlight />
        <NutritionItem label="Protein" value={`${nutrition.protein}`} unit="g" />
        <NutritionItem label="Carbs" value={`${nutrition.carbs}`} unit="g" />
        <NutritionItem label="Fat" value={`${nutrition.fat}`} unit="g" />
        <NutritionItem label="Fiber" value={`${nutrition.fiber}`} unit="g" />
        <NutritionItem label="Sodium" value={`${nutrition.sodium}`} unit="mg" />
      </div>
    </div>
  );
}

function NutritionItem({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={cn(
          "font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold",
          highlight ? "text-brand-red" : "text-foreground"
        )}
      >
        {value}
        <span className="text-xs font-normal text-text-secondary">{unit}</span>
      </div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  );
}
