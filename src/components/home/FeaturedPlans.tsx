"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MacroBar } from "@/components/shared/MacroBar";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";
import { formatPrice } from "@/lib/formatters";
import type { Plan } from "@/types";

interface FeaturedPlansProps {
  plans: Plan[];
}

export function FeaturedPlans({ plans }: FeaturedPlansProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper dark>
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
          Popular Plans
        </h2>
        <p className="mt-3 text-text-inverse-muted">
          Meal plans designed for every goal. Halal certified. Zero prep.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12 grid gap-8 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.slug}
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group overflow-hidden rounded-xl border border-border-dark bg-bg-card-dark"
          >
            <div className="relative">
              {plan.heroImage ? (
                <img
                  src={plan.heroImage}
                  alt={plan.name}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <ImagePlaceholder aspectRatio="16:9" />
              )}
              <div className="absolute top-3 left-3">
                <HalalBadge size="sm" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-text-inverse-muted">
                    {plan.tagline}
                  </p>
                </div>
                <DifficultyBadge difficulty={plan.difficulty} />
              </div>

              <div className="mt-4">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse-muted">
                  {plan.targetCalories} cal / day
                </div>
                <MacroBar
                  protein={plan.macroSplit.protein}
                  carbs={plan.macroSplit.carbs}
                  fat={plan.macroSplit.fat}
                  className="mt-2"
                />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-inverse-muted">
                  From{" "}
                  <span className="text-lg font-bold text-white">
                    {formatPrice(49.99)}
                  </span>
                </div>
                <Link
                  href={`/plan/${plan.slug}`}
                  className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover"
                >
                  View Plan
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 text-center">
        <Link
          href="/plans"
          className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
        >
          View All 10 Plans
        </Link>
      </div>
    </SectionWrapper>
  );
}
