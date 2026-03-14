"use client";

import { useState } from "react";
import type { Plan, PlanDuration, ServingSize } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { useCartStore } from "@/stores/cartStore";
import { generateId } from "@/lib/utils";
import { formatDuration, formatServingSize } from "@/lib/formatters";
import { motion } from "framer-motion";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

function estimatePrice(duration: PlanDuration, servingSize: ServingSize): number {
  const basePricePerDay: Record<PlanDuration, number> = {
    3: 18.99,
    5: 16.99,
    7: 14.99,
  };
  return basePricePerDay[duration] * duration * servingSize;
}

interface PricingOptionsProps {
  plan: Plan;
}

export function PricingOptions({ plan }: PricingOptionsProps) {
  const [duration, setDuration] = useState<PlanDuration>(plan.durationOptions[0]);
  const [servingSize, setServingSize] = useState<ServingSize>(plan.servingOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { ref, isInView } = useScrollReveal();

  const price = estimatePrice(duration, servingSize);

  function handleAddToCart() {
    addItem({
      type: "plan",
      id: generateId(),
      planSlug: plan.slug,
      planName: plan.name,
      duration,
      servingSize,
      organic: false,
      quantity,
      unitPrice: price,
      nutrition: plan.weeklySummary.average,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <SectionWrapper id="pricing">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="mx-auto max-w-2xl"
      >
        <h2 className="mb-2 text-center font-[family-name:var(--font-sora)] text-2xl font-bold sm:text-3xl">
          Choose Your Plan
        </h2>
        <p className="mb-8 text-center text-text-secondary">
          Select duration and serving size. Price updates live.
        </p>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Duration — pill tabs */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Duration
            </h3>
            <div className="inline-flex rounded-full bg-neutral-100 p-1">
              {plan.durationOptions.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200",
                    duration === d
                      ? "text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {duration === d && (
                    <motion.span
                      layoutId="durationPill"
                      className="absolute inset-0 rounded-full bg-brand-red shadow-md shadow-brand-red/25"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{formatDuration(d)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Serving size — elegant buttons */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Serving Size
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {plan.servingOptions.map((s) => (
                <motion.button
                  key={s}
                  type="button"
                  onClick={() => setServingSize(s)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-xl border-2 px-4 py-3.5 text-center text-sm font-semibold transition-all duration-200",
                    servingSize === s
                      ? "border-brand-red bg-brand-red/5 text-brand-red shadow-sm"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:shadow-sm"
                  )}
                >
                  {formatServingSize(s)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Quantity
            </h3>
            <div className="inline-flex items-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="flex h-11 w-11 items-center justify-center text-lg font-medium text-neutral-600 transition-all hover:bg-neutral-50 active:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                -
              </button>
              <span className="flex h-11 w-14 items-center justify-center border-x border-neutral-200 font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
                className="flex h-11 w-11 items-center justify-center text-lg font-medium text-neutral-600 transition-all hover:bg-neutral-50 active:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* Price summary */}
          <div className="mb-6 flex items-center justify-between border-t border-neutral-100 pt-6">
            <div>
              <p className="text-sm text-text-secondary">
                {formatDuration(duration)} / {formatServingSize(servingSize)}
                {quantity > 1 ? ` x${quantity}` : ""}
              </p>
              <PriceDisplay
                amount={price * quantity}
                size="lg"
                suffix="/week"
              />
            </div>
            <div className="rounded-xl bg-neutral-50 px-4 py-2 text-right">
              <p className="text-[10px] uppercase tracking-wider text-text-secondary">
                Per meal
              </p>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold">
                ${(price / duration / servingSize).toFixed(2)}
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300",
              added
                ? "bg-brand-green text-white shadow-lg shadow-brand-green/25"
                : "bg-brand-red text-white hover:bg-brand-red-hover hover:shadow-lg hover:shadow-brand-red/25"
            )}
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </motion.button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
