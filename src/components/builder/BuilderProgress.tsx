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
      {/* Desktop progress bar */}
      <div className="hidden sm:flex items-center justify-between gap-1">
        {STEPS.map((step, index) => {
          const state = getStepState(index);
          const navigable = canNavigateTo(index);

          return (
            <div key={step.key} className="flex flex-1 items-center gap-1">
              <button
                type="button"
                onClick={() => navigable && goToStep(step.key)}
                disabled={!navigable}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  state === "completed" &&
                    "cursor-pointer text-brand-green hover:bg-brand-green/5",
                  state === "active" && "text-brand-red cursor-default",
                  state === "upcoming" &&
                    "cursor-default text-text-secondary opacity-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    state === "completed" && "bg-brand-green text-white",
                    state === "active" && "bg-brand-red text-white",
                    state === "upcoming" && "bg-gray-200 text-gray-500"
                  )}
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
                </span>
                <span className="hidden md:inline">{step.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className="h-px flex-1 bg-border-light">
                  <motion.div
                    className="h-full bg-brand-green"
                    initial={{ width: "0%" }}
                    animate={{
                      width: state === "completed" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile progress bar */}
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-red">
            Step {currentIndex + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {STEPS[currentIndex].label}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-brand-red"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="mt-2 flex justify-between">
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
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                  state === "completed" && "bg-brand-green text-white",
                  state === "active" && "bg-brand-red text-white",
                  state === "upcoming" && "bg-gray-200 text-gray-400"
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
