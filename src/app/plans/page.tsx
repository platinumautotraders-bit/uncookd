"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PlanFilter } from "@/components/plans/PlanFilter";
import { PlanGrid } from "@/components/plans/PlanGrid";
import { allPlans } from "@/config/plans";

export default function PlansPage() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight sm:text-5xl">
          Meal Plans
        </h1>
        <p className="mt-3 max-w-lg text-lg text-text-secondary">
          10 plans designed for every goal. Halal certified, zero prep, you only cook.
        </p>
      </motion.div>

      <div className="mb-10">
        <PlanFilter />
      </div>

      <PlanGrid plans={allPlans} />
    </SectionWrapper>
  );
}
