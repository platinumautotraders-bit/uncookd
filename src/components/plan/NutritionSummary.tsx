"use client";

import type { WeeklySummary } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { formatCalories } from "@/lib/formatters";
import { motion } from "framer-motion";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface NutritionSummaryProps {
  weeklySummary: WeeklySummary;
}

export function NutritionSummary({ weeklySummary }: NutritionSummaryProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper dark id="nutrition">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <h2 className="mb-2 font-[family-name:var(--font-sora)] text-2xl font-bold text-text-inverse sm:text-3xl">
          Weekly Nutrition
        </h2>
        <p className="mb-8 text-text-inverse-muted">
          Daily calorie and macro breakdown across the full 7-day plan.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left">
            <thead>
              <tr className="border-b border-border-dark text-xs font-semibold uppercase tracking-wider text-text-inverse-muted">
                <th className="py-3 pr-4">Day</th>
                <th className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)]">
                  Calories
                </th>
                <th className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)]">
                  Protein
                </th>
                <th className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)]">
                  Carbs
                </th>
                <th className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)]">
                  Fat
                </th>
                <th className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)]">
                  Fiber
                </th>
              </tr>
            </thead>
            <tbody>
              {weeklySummary.days.map((dayData, index) => (
                <tr
                  key={dayData.day}
                  className={cn(
                    "border-b border-border-dark/50 transition-colors hover:bg-white/5",
                    index % 2 === 1 && "bg-white/[0.02]"
                  )}
                >
                  <td className="py-3 pr-4 font-[family-name:var(--font-sora)] text-sm font-medium text-text-inverse">
                    {dayData.day}
                  </td>
                  <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-brand-red">
                    {formatCalories(dayData.nutrition.calories)}
                  </td>
                  <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse">
                    {dayData.nutrition.protein}g
                  </td>
                  <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse">
                    {dayData.nutrition.carbs}g
                  </td>
                  <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse">
                    {dayData.nutrition.fat}g
                  </td>
                  <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse-muted">
                    {dayData.nutrition.fiber}g
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-brand-red/40">
                <td className="py-3 pr-4 font-[family-name:var(--font-sora)] text-sm font-bold text-text-inverse">
                  Average
                </td>
                <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-brand-red">
                  {formatCalories(weeklySummary.average.calories)}
                </td>
                <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-text-inverse">
                  {weeklySummary.average.protein}g
                </td>
                <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-text-inverse">
                  {weeklySummary.average.carbs}g
                </td>
                <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-text-inverse">
                  {weeklySummary.average.fat}g
                </td>
                <td className="px-4 py-3 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-text-inverse-muted">
                  {weeklySummary.average.fiber}g
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
