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
      <p className="mb-2 text-text-secondary">
        Pick 2 to 4 vegetables for your meal.
      </p>
      <div className="mb-8 flex items-center gap-2">
        <span
          className={cn(
            "font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold",
            atMin ? "text-brand-green" : "text-brand-red"
          )}
        >
          {count}/4
        </span>
        <span className="text-sm text-text-secondary">selected</span>
        {count < 2 && (
          <span className="text-xs text-brand-red">
            (minimum 2 required)
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
              className={cn(
                "group relative flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-brand-green bg-brand-green/5 shadow-sm"
                  : isDisabled
                    ? "cursor-not-allowed border-border-light bg-gray-50 opacity-40"
                    : "border-border-light bg-white hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  isSelected
                    ? "border-brand-green bg-brand-green"
                    : "border-gray-300 bg-white"
                )}
              >
                {isSelected && (
                  <motion.svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
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
                  "text-sm font-medium",
                  isSelected ? "text-brand-green" : "text-foreground"
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
