"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { getMealTypesForMethod } from "@/lib/builder-validation";
import type { MealType } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MealTypeOption {
  value: MealType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const ALL_MEAL_TYPES: MealTypeOption[] = [
  {
    value: "stir-fry",
    label: "Stir Fry",
    description: "Protein strips + veg + sauce over rice or noodles",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 15c0 3 4 5 9 5s9-2 9-5c0-2-4-4-9-4s-9 2-9 4z" />
        <path d="M21 15l3-3" />
        <path d="M8 12l2-4M12 11l1-3M16 12l-1-4" />
      </svg>
    ),
  },
  {
    value: "roast",
    label: "Roast",
    description: "Marinated protein + roasted carb + fresh veg",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <ellipse cx="12" cy="14" rx="10" ry="5" />
        <path d="M8 11c0-3 2-7 4-7s4 4 4 7" />
        <path d="M6 14h12" />
      </svg>
    ),
  },
  {
    value: "steak-plate",
    label: "Steak Plate",
    description: "Seared protein + side carb + side veg",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="9" cy="11" rx="4" ry="2.5" />
        <path d="M15 9c1 0 3 1 3 3s-2 3-3 3" />
        <path d="M14 16c0 0 1 1 3 1" />
      </svg>
    ),
  },
  {
    value: "bowl",
    label: "Bowl",
    description: "Rice or noodle base + protein + veg + sauce drizzle",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 12h18c0 5-4 9-9 9s-9-4-9-9z" />
        <path d="M3 12c0-1 4-2 9-2s9 1 9 2" />
        <path d="M8 10V7M12 9V5M16 10V7" />
      </svg>
    ),
  },
  {
    value: "tray-bake",
    label: "Tray Bake",
    description: "Protein + veg + carb all on one tray",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="8" width="20" height="12" rx="2" />
        <path d="M2 10h20" />
        <circle cx="7" cy="14" r="1.5" />
        <circle cx="12" cy="14" r="1.5" />
        <circle cx="17" cy="14" r="1.5" />
      </svg>
    ),
  },
  {
    value: "curry",
    label: "Curry",
    description: "Protein + sauce + veg, served over rice",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 14h16a0 0 0 010 0c0 4-3.5 7-8 7s-8-3-8-7z" />
        <path d="M4 14c0-2 3.5-4 8-4s8 2 8 4" />
        <path d="M9 7c0-2 1.5-4 3-4s3 2 3 4" />
        <path d="M11 7v3M13 6v4" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MealTypeSelector() {
  const cookingMethod = useBuilderStore((s) => s.cookingMethod);
  const mealType = useBuilderStore((s) => s.mealType);
  const setMealType = useBuilderStore((s) => s.setMealType);

  if (!cookingMethod) return null;

  const availableTypes = getMealTypesForMethod(cookingMethod);
  const filteredTypes = ALL_MEAL_TYPES.filter((t) =>
    availableTypes.includes(t.value)
  );

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        What kind of meal?
      </h2>
      <p className="mb-8 text-text-secondary">
        Pick a meal style that suits your vibe tonight.
      </p>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTypes.map((type) => {
          const selected = mealType === type.value;

          return (
            <motion.button
              key={type.value}
              type="button"
              variants={itemVariants}
              onClick={() => setMealType(type.value)}
              className={cn(
                "group relative flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-brand-red bg-brand-red/5 shadow-md"
                  : "border-border-light bg-white hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <div
                className={cn(
                  "shrink-0 transition-colors",
                  selected
                    ? "text-brand-red"
                    : "text-text-secondary group-hover:text-foreground"
                )}
              >
                {type.icon}
              </div>
              <div>
                <div
                  className={cn(
                    "text-sm font-semibold",
                    selected ? "text-brand-red" : "text-foreground"
                  )}
                >
                  {type.label}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {type.description}
                </div>
              </div>
              {selected && (
                <motion.div
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <svg
                    className="h-3.5 w-3.5"
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
