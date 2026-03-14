"use client";

import { useBuilderStore } from "@/stores/builderStore";
import type { BuilderStep } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const STEPS: { key: BuilderStep; label: string }[] = [
  { key: "cooking-method", label: "Method" },
  { key: "meal-type", label: "Type" },
  { key: "protein", label: "Protein" },
  { key: "carb", label: "Carb" },
  { key: "vegetables", label: "Veg" },
  { key: "sauce", label: "Sauce" },
];

const STEP_KEYS = STEPS.map((s) => s.key);

export function BuilderProgress() {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const isStepValid = useBuilderStore((s) => s.isStepValid);
  const goToStep = useBuilderStore((s) => s.goToStep);

  const currentIndex = STEP_KEYS.indexOf(currentStep);

  function getStepState(index: number): "completed" | "active" | "upcoming" {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "active";
    return "upcoming";
  }

  function canNavigateTo(index: number): boolean {
    if (index >= currentIndex) return false;
    for (let i = 0; i < index; i++) {
      if (!isStepValid(STEP_KEYS[i])) return false;
    }
    return true;
  }

  return (
    <div className="w-full">
      {/* Desktop — horizontal progress bar */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Background track */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200" />
          {/* Filled track */}
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-brand-red"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentIndex / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Step dots and labels */}
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => {
              const state = getStepState(index);
              const navigable = canNavigateTo(index);

              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => navigable && goToStep(step.key)}
                  disabled={!navigable}
                  className={cn(
                    "flex flex-col items-center gap-2",
                    navigable && "cursor-pointer"
                  )}
                >
                  {/* Dot */}
                  <div className="relative">
                    {state === "active" && (
                      <motion.div
                        className="absolute -inset-2 rounded-full bg-brand-red/20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 1.5,
                        }}
                      />
                    )}
                    <motion.div
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-colors",
                        state === "completed" && "bg-brand-green text-white",
                        state === "active" && "bg-brand-red text-white",
                        state === "upcoming" && "bg-neutral-100 text-neutral-400"
                      )}
                      animate={
                        state === "active"
                          ? { boxShadow: "0 0 0 4px rgba(220, 38, 38, 0.15)" }
                          : { boxShadow: "0 0 0 0px rgba(0,0,0,0)" }
                      }
                    >
                      {state === "completed" ? (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </motion.div>
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      state === "completed" && "text-brand-green",
                      state === "active" && "text-brand-red font-semibold",
                      state === "upcoming" && "text-neutral-400"
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile — compact bar */}
      <div className="sm:hidden">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-brand-red">
            Step {currentIndex + 1} / {STEPS.length}
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {STEPS[currentIndex].label}
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-red to-brand-red/80"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {STEPS.map((step, index) => {
            const state = getStepState(index);
            const navigable = canNavigateTo(index);

            return (
              <button
                key={step.key}
                type="button"
                onClick={() => navigable && goToStep(step.key)}
                disabled={!navigable}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all",
                  state === "completed" && "bg-brand-green text-white",
                  state === "active" &&
                    "bg-brand-red text-white shadow-md shadow-brand-red/30",
                  state === "upcoming" && "bg-neutral-100 text-neutral-400"
                )}
              >
                {state === "completed" ? (
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
