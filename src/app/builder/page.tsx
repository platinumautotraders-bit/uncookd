"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { BuilderProgress } from "@/components/builder/BuilderProgress";
import { CookingMethodSelector } from "@/components/builder/CookingMethodSelector";
import { MealTypeSelector } from "@/components/builder/MealTypeSelector";
import { ProteinSelector } from "@/components/builder/ProteinSelector";
import { CarbSelector } from "@/components/builder/CarbSelector";
import { VegSelector } from "@/components/builder/VegSelector";
import { SauceSelector } from "@/components/builder/SauceSelector";
import { BuilderReview } from "@/components/builder/BuilderReview";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STEP_ORDER = [
  "cooking-method",
  "meal-type",
  "protein",
  "carb",
  "vegetables",
  "sauce",
] as const;

export default function BuilderPage() {
  const currentStep = useBuilderStore((s) => s.currentStep);
  const isStepValid = useBuilderStore((s) => s.isStepValid);
  const nextStep = useBuilderStore((s) => s.nextStep);
  const prevStep = useBuilderStore((s) => s.prevStep);
  const reset = useBuilderStore((s) => s.reset);
  const getStepIndex = useBuilderStore((s) => s.getStepIndex);

  const stepIndex = getStepIndex();
  const isLastStep = stepIndex === STEP_ORDER.length - 1;
  const isFirstStep = stepIndex === 0;
  const canProceed = isStepValid(currentStep);

  // Show review after final step if valid
  const showReview = isLastStep && canProceed;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionWrapper className="!pb-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] sm:text-4xl">
            Build Your Meal
          </h1>
          <p className="mt-2 text-text-secondary">
            Design your perfect meal from scratch. Choose your cooking method,
            protein, carb, veg, and sauce.
          </p>
        </div>
        <BuilderProgress />
      </SectionWrapper>

      {/* Step content */}
      <SectionWrapper>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {currentStep === "cooking-method" && <CookingMethodSelector />}
            {currentStep === "meal-type" && <MealTypeSelector />}
            {currentStep === "protein" && <ProteinSelector />}
            {currentStep === "carb" && <CarbSelector />}
            {currentStep === "vegetables" && <VegSelector />}
            {currentStep === "sauce" && <SauceSelector />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between border-t border-border-light pt-6">
          <div>
            {!isFirstStep ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 rounded-lg border border-border-light bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!isLastStep ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-bold transition-all",
                  canProceed
                    ? "bg-brand-red text-white hover:bg-brand-red-hover active:scale-[0.98]"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                )}
              >
                Next
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              !showReview && (
                <span className="text-sm text-text-secondary">
                  Complete all selections to review
                </span>
              )
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Review section - shown when on sauce step and all is valid */}
      {showReview && (
        <SectionWrapper dark>
          <BuilderReview />
        </SectionWrapper>
      )}
    </main>
  );
}
