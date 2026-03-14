"use client";

import Image from "next/image";
import type { Plan } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MacroBar } from "@/components/shared/MacroBar";
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
    <div className="relative overflow-hidden">
      {/* Full-width background image with gradient overlay */}
      <div className="absolute inset-0">
        {plan.heroImage ? (
          <Image
            src={plan.heroImage}
            alt={plan.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-bg-dark/40" />
      </div>

      {/* Content */}
      <div className="relative px-4 py-20 sm:px-6 md:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
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

            <h1 className="mb-4 font-[family-name:var(--font-sora)] text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {plan.name}
            </h1>

            <p className="mb-6 text-xl text-white/70">
              {plan.tagline}
            </p>

            <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/50">
              {plan.description}
            </p>

            <div className="mb-8 flex items-center gap-6">
              <div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-4xl font-bold text-brand-red">
                  {formatCalories(plan.targetCalories)}
                </span>
                <span className="ml-1.5 text-sm text-white/50">cal/day</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-semibold text-white">
                  {plan.mealsPerDay}
                </span>
                <span className="ml-1.5 text-sm text-white/50">meals/day</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-sm text-white/50">
                {plan.proteinTypes
                  .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                  .join(", ")}
              </div>
            </div>

            <MacroBar
              protein={plan.macroSplit.protein}
              carbs={plan.macroSplit.carbs}
              fat={plan.macroSplit.fat}
              className="max-w-sm"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
