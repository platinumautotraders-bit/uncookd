"use client";

import { useState } from "react";
import type { Plan, PlanDuration, ServingSize } from "@/types";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

        <div className="rounded-2xl border border-border-light bg-bg-card p-6 sm:p-8">
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Duration
            </h3>
            <Tabs
              defaultValue={String(duration)}
              onValueChange={(val) => setDuration(Number(val) as PlanDuration)}
            >
              <TabsList className="w-full">
                {plan.durationOptions.map((d) => (
                  <TabsTrigger
                    key={d}
                    value={String(d)}
                    className="flex-1"
                  >
                    {formatDuration(d)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Serving Size
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {plan.servingOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setServingSize(s)}
                  className={cn(
                    "rounded-lg border-2 px-4 py-3 text-center text-sm font-semibold transition-all",
                    servingSize === s
                      ? "border-brand-red bg-brand-red/5 text-brand-red"
                      : "border-border-light text-text-secondary hover:border-gray-300"
                  )}
                >
                  {formatServingSize(s)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Quantity
            </h3>
            <div className="inline-flex items-center rounded-lg border border-border-light">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center text-lg font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                -
              </button>
              <span className="flex h-10 w-12 items-center justify-center border-x border-border-light font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
                className="flex h-10 w-10 items-center justify-center text-lg font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between border-t border-border-light pt-6">
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
            <div className="text-right text-xs text-text-secondary">
              <p className="font-[family-name:var(--font-jetbrains-mono)]">
                ~{formatServingSize(1)} = {(price / duration / servingSize).toFixed(2)}/meal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              "w-full rounded-lg px-8 py-4 text-base font-semibold transition-all",
              added
                ? "bg-brand-green text-white"
                : "bg-brand-red text-white hover:bg-brand-red-hover active:scale-[0.98]"
            )}
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
