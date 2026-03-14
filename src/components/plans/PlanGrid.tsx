"use client";

import { motion } from "framer-motion";
import type { Plan } from "@/types";
import { usePlanFilterStore } from "@/stores/planFilterStore";
import { PlanCard } from "./PlanCard";
import { staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

interface PlanGridProps {
  plans: Plan[];
}

export function PlanGrid({ plans }: PlanGridProps) {
  const { goal, includesBreakfast, dietary } = usePlanFilterStore();

  const filtered = plans.filter((plan) => {
    if (goal && plan.goal !== goal) return false;
    if (includesBreakfast !== null && plan.includesBreakfast !== includesBreakfast) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-text-secondary">
          No plans match your filters.
        </p>
        <button
          onClick={() => usePlanFilterStore.getState().clearFilters()}
          className="mt-3 text-sm font-semibold text-brand-red hover:text-brand-red-hover"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {filtered.map((plan) => (
        <motion.div key={plan.slug} variants={fadeInUp}>
          <PlanCard plan={plan} />
        </motion.div>
      ))}
    </motion.div>
  );
}
