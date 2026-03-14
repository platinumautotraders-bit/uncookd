"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { getCompatibleCarbs } from "@/lib/builder-validation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function CarbSelector() {
  const mealType = useBuilderStore((s) => s.mealType);
  const carb = useBuilderStore((s) => s.carb);
  const setCarb = useBuilderStore((s) => s.setCarb);

  if (!mealType) return null;

  const compatibleCarbs = getCompatibleCarbs(mealType);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        Pick your carb
      </h2>
      <p className="mb-8 text-text-secondary">
        Choose a carb to go with your meal, or skip it entirely.
      </p>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {compatibleCarbs.map((entry) => {
          const isSelected = carb === entry.carb;
          const isNone = entry.carb === "none";

          return (
            <motion.button
              key={entry.carb}
              type="button"
              variants={itemVariants}
              onClick={() =>
                setCarb(isNone ? null : entry.carb)
              }
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-all duration-200",
                isSelected || (isNone && carb === null)
                  ? "border-brand-red bg-gradient-to-b from-brand-red/8 to-brand-red/3 shadow-lg shadow-brand-red/10"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-white hover:shadow-md",
                isNone && !(carb === null) && "border-dashed"
              )}
            >
              <div
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isSelected || (isNone && carb === null)
                    ? "text-brand-red"
                    : "text-foreground"
                )}
              >
                {entry.name}
              </div>
              {isNone && (
                <div className="text-xs text-text-secondary">
                  Low carb / keto
                </div>
              )}
              {(isSelected || (isNone && carb === null)) && (
                <motion.div
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white shadow-md"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
