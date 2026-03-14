"use client";

import type { DayPlan } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MealCard } from "./MealCard";
import { formatCalories } from "@/lib/formatters";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

interface MealBreakdownProps {
  days: DayPlan[];
}

export function MealBreakdown({ days }: MealBreakdownProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper id="meals">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <h2 className="mb-2 font-[family-name:var(--font-sora)] text-2xl font-bold sm:text-3xl">
            7-Day Meal Breakdown
          </h2>
          <p className="text-text-secondary">
            Every meal prepped, portioned, and ready to cook. Tap a day to see
            the full menu.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Accordion defaultValue={[0]}>
            {days.map((day, index) => (
              <AccordionItem key={day.day} className="border-b border-border-light">
                <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-2">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-brand-red">
                        Day {day.day}
                      </span>
                      <span className="font-[family-name:var(--font-sora)]">
                        {day.dayName}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span>{day.meals.length} meals</span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold">
                        {formatCalories(day.dailyTotals.calories)} cal
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    {day.meals.map((meal) => (
                      <MealCard key={meal.slug} meal={meal} />
                    ))}

                    <div className="flex justify-end gap-4 rounded-lg bg-gray-50 px-4 py-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-secondary">
                      <span>{day.dailyTotals.protein}g P</span>
                      <span>{day.dailyTotals.carbs}g C</span>
                      <span>{day.dailyTotals.fat}g F</span>
                      <span className="font-bold text-foreground">
                        {formatCalories(day.dailyTotals.calories)} cal
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
