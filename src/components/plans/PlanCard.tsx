"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Plan } from "@/types";
import { MacroBar } from "@/components/shared/MacroBar";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { formatPrice } from "@/lib/formatters";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Link href={`/plan/${plan.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
        className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-black/10"
      >
        {/* Image area — 60% of card */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {plan.heroImage ? (
            <img
              src={plan.heroImage}
              alt={plan.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <ImagePlaceholder aspectRatio="4:3" />
          )}

          {/* Gradient overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Plan name overlaid on image */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold leading-tight text-white drop-shadow-lg">
              {plan.name}
            </h3>
            <p className="mt-1 text-sm text-white/70 line-clamp-1">
              {plan.tagline}
            </p>
          </div>

          {/* Breakfast badge if applicable */}
          {plan.includesBreakfast && (
            <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 backdrop-blur-sm">
              + Breakfast
            </div>
          )}
        </div>

        {/* Info strip — minimal */}
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
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

          <div className="ml-4 text-right">
            <span className="text-xs text-text-secondary">From</span>
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold text-foreground">
              {formatPrice(49.99)}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
