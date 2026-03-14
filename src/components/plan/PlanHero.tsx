"use client";

import Image from "next/image";
import type { Plan } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MacroBar } from "@/components/shared/MacroBar";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { Badge } from "@/components/shared/Badge";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { formatCalories } from "@/lib/formatters";
import { motion } from "framer-motion";
import { fadeInUp } from "@/hooks/useScrollReveal";

const dietaryLabels: Record<string, string> = {
  gf: "Gluten Free",
  df: "Dairy Free",
  lf: "Lactose Free",
};

interface PlanHeroProps {
  plan: Plan;
}

export function PlanHero({ plan }: PlanHeroProps) {
  return (
    <SectionWrapper dark>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="order-2 lg:order-1"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <HalalBadge size="md" />
            <DifficultyBadge difficulty={plan.difficulty} />
            {plan.includesBreakfast && (
              <Badge variant="premium">Includes Breakfast</Badge>
            )}
            {plan.dietaryOptions.map((flag) => (
              <Badge key={flag} variant="dietary">
                {dietaryLabels[flag] ?? flag.toUpperCase()}
              </Badge>
            ))}
          </div>

          <h1 className="mb-3 font-[family-name:var(--font-sora)] text-3xl font-bold text-text-inverse sm:text-4xl lg:text-5xl">
            {plan.name}
          </h1>

          <p className="mb-6 max-w-lg text-lg text-text-inverse-muted">
            {plan.tagline}
          </p>

          <p className="mb-8 text-sm leading-relaxed text-text-inverse-muted">
            {plan.description}
          </p>

          <div className="mb-6 flex items-center gap-6">
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-3xl font-bold text-brand-red">
                {formatCalories(plan.targetCalories)}
              </span>
              <span className="ml-1 text-sm text-text-inverse-muted">
                cal/day
              </span>
            </div>
            <div className="h-10 w-px bg-border-dark" />
            <div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-semibold text-text-inverse">
                {plan.mealsPerDay}
              </span>
              <span className="ml-1 text-sm text-text-inverse-muted">
                meals/day
              </span>
            </div>
            <div className="h-10 w-px bg-border-dark" />
            <div className="text-sm text-text-inverse-muted">
              {plan.proteinTypes.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
            </div>
          </div>

          <MacroBar
            protein={plan.macroSplit.protein}
            carbs={plan.macroSplit.carbs}
            fat={plan.macroSplit.fat}
            className="max-w-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2"
        >
          {plan.heroImage ? (
            <div className="overflow-hidden rounded-xl">
              <Image
                src={plan.heroImage}
                alt={plan.name}
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : (
            <ImagePlaceholder aspectRatio="4:3" className="rounded-xl" />
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
