"use client";

import { useState } from "react";
import { useBuilderStore } from "@/stores/builderStore";
import { getCompatibleProteins } from "@/lib/builder-validation";
import { proteinCookingMatrix } from "@/config/builder";
import type { ProteinType, ProteinCut } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const PROTEIN_TYPES: { value: ProteinType; label: string }[] = [
  { value: "chicken", label: "Chicken" },
  { value: "beef", label: "Beef" },
  { value: "lamb", label: "Lamb" },
];

function getCutLabel(cut: string): string {
  const labels: Record<string, string> = {
    breast: "Breast",
    thigh: "Thigh",
    drumstick: "Drumstick",
    wings: "Wings",
    mince: "Mince",
    ribeye: "Ribeye",
    sirloin: "Sirloin",
    fillet: "Fillet",
    rump: "Rump",
    "t-bone": "T-Bone",
    "mince-lean": "Lean Mince (5%)",
    "mince-regular": "Regular Mince (15%)",
    cutlets: "Cutlets",
    "leg-steak": "Leg Steak",
    shoulder: "Shoulder",
    chops: "Chops",
    kofta: "Kofta",
  };
  return labels[cut] || cut;
}

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

export function ProteinSelector() {
  const cookingMethod = useBuilderStore((s) => s.cookingMethod);
  const proteinType = useBuilderStore((s) => s.proteinType);
  const proteinCut = useBuilderStore((s) => s.proteinCut);
  const setProtein = useBuilderStore((s) => s.setProtein);

  const [selectedType, setSelectedType] = useState<ProteinType | null>(
    proteinType
  );

  if (!cookingMethod) return null;

  const compatibleProteins = getCompatibleProteins(cookingMethod);

  const availableTypes = Array.from(
    new Set(compatibleProteins.map((p) => p.proteinType))
  );

  const cutsForType = selectedType
    ? compatibleProteins.filter((p) => p.proteinType === selectedType)
    : [];

  function handleTypeSelect(type: ProteinType) {
    setSelectedType(type);
  }

  function handleCutSelect(type: ProteinType, cut: ProteinCut) {
    setProtein(type, cut);
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        Choose your protein
      </h2>
      <p className="mb-8 text-text-secondary">
        Select a protein type, then pick the specific cut.
      </p>

      {/* Protein type pills */}
      <div className="mb-8 flex flex-wrap gap-3">
        {PROTEIN_TYPES.filter((pt) => availableTypes.includes(pt.value)).map(
          (pt) => {
            const isActive = selectedType === pt.value;

            return (
              <motion.button
                key={pt.value}
                type="button"
                onClick={() => handleTypeSelect(pt.value)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/25"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                )}
              >
                {pt.label}
              </motion.button>
            );
          }
        )}
      </div>

      {/* Cuts grid */}
      <AnimatePresence mode="wait">
        {selectedType && cutsForType.length > 0 && (
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-semibold font-[family-name:var(--font-sora)]">
              {selectedType === "chicken"
                ? "Chicken Cuts"
                : selectedType === "beef"
                  ? "Beef Cuts"
                  : "Lamb Cuts"}
            </h3>
            <motion.div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cutsForType.map((entry) => {
                const isSelected =
                  proteinType === selectedType &&
                  proteinCut === entry.cut;

                return (
                  <motion.button
                    key={`${entry.proteinType}-${entry.cut}`}
                    type="button"
                    variants={itemVariants}
                    onClick={() =>
                      handleCutSelect(entry.proteinType, entry.cut)
                    }
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-all duration-200",
                      isSelected
                        ? "border-brand-red bg-gradient-to-b from-brand-red/8 to-brand-red/3 shadow-lg shadow-brand-red/10"
                        : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-white hover:shadow-md"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isSelected ? "text-brand-red" : "text-foreground"
                      )}
                    >
                      {getCutLabel(entry.cut)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {entry.protein}
                    </div>
                    {isSelected && (
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
