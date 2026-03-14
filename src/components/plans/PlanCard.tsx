"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Plan } from "@/types";
import { MacroBar } from "@/components/shared/MacroBar";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { Badge } from "@/components/shared/Badge";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { formatPrice } from "@/lib/formatters";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-xl border border-border-light bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link href={`/plan/${plan.slug}`}>
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
          <div className="absolute top-3 left-3 flex gap-2">
            <HalalBadge size="sm" />
            {plan.includesBreakfast && (
              <Badge variant="dietary">Breakfast</Badge>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold leading-tight">
              {plan.name}
            </h3>
            <DifficultyBadge difficulty={plan.difficulty} />
          </div>

          <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">
            {plan.tagline}
          </p>

          <div className="mt-4">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-secondary">
              {plan.targetCalories} cal / day
            </div>
            <MacroBar
              protein={plan.macroSplit.protein}
              carbs={plan.macroSplit.carbs}
              fat={plan.macroSplit.fat}
              className="mt-1.5"
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
            <div className="text-sm text-text-secondary">
              From{" "}
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-base font-bold text-foreground">
                {formatPrice(49.99)}
              </span>
            </div>
            <span className="rounded-lg bg-brand-red px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-brand-red-hover">
              View Plan
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
