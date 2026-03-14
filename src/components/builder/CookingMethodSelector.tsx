"use client";

import { useBuilderStore } from "@/stores/builderStore";
import type { CookingMethod } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MethodOption {
  value: CookingMethod;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const METHODS: MethodOption[] = [
  {
    value: "pan",
    label: "Pan / Stovetop",
    description: "Quick sear, sautee, or fry",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 13h18v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2z" />
        <path d="M21 13l2-2M3 13L1 11" />
        <path d="M12 9v-3M9 10V8M15 10V8" />
      </svg>
    ),
  },
  {
    value: "air-fryer",
    label: "Air Fryer",
    description: "Crispy with less oil",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="2" width="16" height="20" rx="3" />
        <circle cx="12" cy="13" r="4" />
        <path d="M10 7h4" />
        <path d="M12 11v4" />
      </svg>
    ),
  },
  {
    value: "oven",
    label: "Oven",
    description: "Roast and bake to perfection",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <rect x="5" y="13" width="14" height="4" rx="1" />
        <circle cx="7" cy="7" r="1" />
        <circle cx="12" cy="7" r="1" />
      </svg>
    ),
  },
  {
    value: "slow-cooker",
    label: "Slow Cooker",
    description: "Low and slow, max flavour",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M5 12h14a2 2 0 012 2v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a2 2 0 012-2z" />
        <path d="M5 12V9a7 7 0 0114 0v3" />
        <path d="M9 6c0-1 .5-2 3-2s3 1 3 2" />
        <path d="M10 2v1M14 2v1M12 1v2" />
      </svg>
    ),
  },
  {
    value: "bbq",
    label: "BBQ / Grill",
    description: "Charred, smoky, outdoor vibes",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 14h18" />
        <path d="M5 14v5M19 14v5" />
        <path d="M8 19h8" />
        <path d="M4 14l2-4h12l2 4" />
        <path d="M9 6c0-1 .5-2 1.5-2M12 5c0-1 .5-2 1.5-2M15 6c0-1 .5-2 1.5-2" />
      </svg>
    ),
  },
  {
    value: "stir-fry",
    label: "Stir Fry",
    description: "High heat, quick wok toss",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 15c0 3 4 5 9 5s9-2 9-5" />
        <path d="M3 15c0-2 4-4 9-4s9 2 9 4" />
        <path d="M21 15l3-3" />
        <path d="M10 8l-1-3M14 7l1-3M12 6V3" />
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

export function CookingMethodSelector() {
  const cookingMethod = useBuilderStore((s) => s.cookingMethod);
  const setCookingMethod = useBuilderStore((s) => s.setCookingMethod);

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        How do you want to cook?
      </h2>
      <p className="mb-8 text-text-secondary">
        Choose your preferred cooking method. This determines which proteins,
        meal types, and recipes are available.
      </p>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {METHODS.map((method) => {
          const selected = cookingMethod === method.value;

          return (
            <motion.button
              key={method.value}
              type="button"
              variants={itemVariants}
              onClick={() => setCookingMethod(method.value)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all",
                selected
                  ? "border-brand-red bg-brand-red/5 shadow-md"
                  : "border-border-light bg-white hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <div
                className={cn(
                  "transition-colors",
                  selected
                    ? "text-brand-red"
                    : "text-text-secondary group-hover:text-foreground"
                )}
              >
                {method.icon}
              </div>
              <div>
                <div
                  className={cn(
                    "text-sm font-semibold",
                    selected ? "text-brand-red" : "text-foreground"
                  )}
                >
                  {method.label}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {method.description}
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
