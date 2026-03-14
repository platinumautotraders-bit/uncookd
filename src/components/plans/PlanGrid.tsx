"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Plan } from "@/types";
import { usePlanFilterStore } from "@/stores/planFilterStore";
import { PlanCard } from "./PlanCard";

interface PlanGridProps {
  plans: Plan[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function PlanGrid({ plans }: PlanGridProps) {
  const { goal, includesBreakfast, dietary } = usePlanFilterStore();

  const filtered = plans.filter((plan) => {
    if (goal && plan.goal !== goal) return false;
    if (includesBreakfast !== null && plan.includesBreakfast !== includesBreakfast) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-neutral-600">
          No plans match your filters
        </p>
        <button
          onClick={() => usePlanFilterStore.getState().clearFilters()}
          className="mt-3 text-sm font-semibold text-brand-red hover:text-brand-red-hover"
        >
          Clear all filters
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${goal}-${includesBreakfast}-${dietary.join(",")}`}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((plan) => (
          <motion.div key={plan.slug} variants={cardVariant}>
            <PlanCard plan={plan} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
