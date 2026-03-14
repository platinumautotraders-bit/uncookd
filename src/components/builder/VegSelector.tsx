"use client";

import { useBuilderStore } from "@/stores/builderStore";
import type { Vegetable } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const VEGETABLES: { value: Vegetable; label: string }[] = [
  { value: "broccoli", label: "Broccoli" },
  { value: "spinach", label: "Spinach" },
  { value: "green-beans", label: "Green Beans" },
  { value: "asparagus", label: "Asparagus" },
  { value: "sweet-peppers", label: "Sweet Peppers" },
  { value: "zucchini", label: "Zucchini" },
  { value: "mushrooms", label: "Mushrooms" },
  { value: "carrots", label: "Carrots" },
  { value: "corn", label: "Corn" },
  { value: "mixed-salad", label: "Mixed Salad" },
  { value: "eggplant", label: "Eggplant" },
  { value: "cherry-tomatoes", label: "Cherry Tomatoes" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function VegSelector() {
  const vegetables = useBuilderStore((s) => s.vegetables);
  const toggleVegetable = useBuilderStore((s) => s.toggleVegetable);

  const count = vegetables.length;
  const atMax = count >= 4;
  const atMin = count >= 2;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        Choose your vegetables
      </h2>
      <p className="mb-3 text-text-secondary">
        Pick 2 to 4 vegetables for your meal.
      </p>

      {/* Progress indicator */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "h-2.5 w-8 rounded-full transition-colors duration-300",
                i <= count
                  ? i <= 2
                    ? "bg-brand-red"
                    : "bg-brand-green"
                  : "bg-neutral-200"
              )}
              animate={i === count ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <span
          className={cn(
            "font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold transition-colors",
            atMin ? "text-brand-green" : "text-brand-red"
          )}
        >
          {count}/4
        </span>
        {count < 2 && (
          <span className="text-xs text-brand-red font-medium">
            minimum 2 required
          </span>
        )}
      </div>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {VEGETABLES.map((veg) => {
          const isSelected = vegetables.includes(veg.value);
          const isDisabled = atMax && !isSelected;

          return (
            <motion.button
              key={veg.value}
              type="button"
              variants={itemVariants}
              onClick={() => !isDisabled && toggleVegetable(veg.value)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-brand-green bg-gradient-to-br from-brand-green/8 to-brand-green/3 shadow-lg shadow-brand-green/10"
                  : isDisabled
                    ? "cursor-not-allowed border-neutral-100 bg-neutral-50 opacity-40"
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-gradient-to-br hover:from-neutral-50 hover:to-white hover:shadow-md"
              )}
            >
              {/* Custom checkbox */}
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                  isSelected
                    ? "bg-brand-green shadow-sm shadow-brand-green/30"
                    : "border-2 border-neutral-300 bg-white"
                )}
              >
                {isSelected && (
                  <motion.svg
                    className="h-3.5 w-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  >
                    <path d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected ? "text-brand-green font-semibold" : "text-foreground"
                )}
              >
                {veg.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
