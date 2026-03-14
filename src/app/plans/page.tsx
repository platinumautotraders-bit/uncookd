"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PlanFilter } from "@/components/plans/PlanFilter";
import { PlanGrid } from "@/components/plans/PlanGrid";
import { allPlans } from "@/config/plans";

export default function PlansPage() {
  return (
    <SectionWrapper>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
          All Meal Plans
        </h1>
        <p className="mt-2 text-text-secondary">
          10 plans for every goal. Halal certified. Zero prep. You only cook.
        </p>
      </div>

      <div className="mb-8">
        <PlanFilter />
      </div>

      <PlanGrid plans={allPlans} />
    </SectionWrapper>
  );
}
