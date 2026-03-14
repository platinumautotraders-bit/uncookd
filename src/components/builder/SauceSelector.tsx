"use client";

import { useBuilderStore } from "@/stores/builderStore";
import { getCompatibleSauces } from "@/lib/builder-validation";
import { coreSauces, sideSauces, saladAddOns } from "@/config/sauces";
import { Badge } from "@/components/shared/Badge";
import type { SauceCode, SideSauceCode, SaladCode } from "@/types";
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

export function SauceSelector() {
  const proteinType = useBuilderStore((s) => s.proteinType);
  const proteinCut = useBuilderStore((s) => s.proteinCut);
  const sauceCode = useBuilderStore((s) => s.sauceCode);
  const sideSauceCode = useBuilderStore((s) => s.sideSauceCode);
  const saladCode = useBuilderStore((s) => s.saladCode);
  const setSauceCode = useBuilderStore((s) => s.setSauceCode);
  const setSideSauceCode = useBuilderStore((s) => s.setSideSauceCode);
  const setSaladCode = useBuilderStore((s) => s.setSaladCode);

  if (!proteinType || !proteinCut) return null;

  const compatibleSauceCodes = getCompatibleSauces(proteinType, proteinCut);
  const availableSauces = compatibleSauceCodes
    .map((sc) => {
      const sauce = coreSauces.find((s) => s.code === sc.code);
      return sauce ? { ...sauce, note: sc.note } : null;
    })
    .filter(Boolean) as (typeof coreSauces[number] & { note?: string })[];

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-sora)]">
        Choose your sauce
      </h2>
      <p className="mb-8 text-text-secondary">
        All sauces are sugar-free, made from natural ingredients, and included
        pre-made in a sealed pouch.
      </p>

      {/* Main sauce selection */}
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* No sauce option */}
        <motion.button
          type="button"
          variants={itemVariants}
          onClick={() => setSauceCode(null)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group relative flex items-start gap-4 rounded-2xl border-2 border-dashed p-5 text-left transition-all duration-200",
            sauceCode === null
              ? "border-brand-red bg-gradient-to-br from-brand-red/8 to-brand-red/3 shadow-lg shadow-brand-red/10"
              : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
          )}
        >
          <div className="flex-1">
            <div
              className={cn(
                "text-sm font-semibold",
                sauceCode === null ? "text-brand-red" : "text-foreground"
              )}
            >
              No Sauce
            </div>
            <div className="mt-1 text-xs text-text-secondary">
              Just protein, veg, and carb
            </div>
          </div>
          {sauceCode === null && <CheckBadge />}
        </motion.button>

        {availableSauces.map((sauce) => {
          const isSelected = sauceCode === sauce.code;

          return (
            <motion.button
              key={sauce.code}
              type="button"
              variants={itemVariants}
              onClick={() => setSauceCode(sauce.code)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200",
                isSelected
                  ? "border-brand-red bg-gradient-to-br from-brand-red/8 to-brand-red/3 shadow-lg shadow-brand-red/10"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-gradient-to-br hover:from-neutral-50 hover:to-white hover:shadow-md"
              )}
            >
              <div className="flex-1">
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isSelected ? "text-brand-red" : "text-foreground"
                  )}
                >
                  {sauce.name}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {sauce.style}
                </div>
                {sauce.note && (
                  <div className="mt-1 text-xs italic text-text-secondary">
                    {sauce.note}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {sauce.dietary.gf === "yes" && (
                    <Badge variant="dietary">GF</Badge>
                  )}
                  {sauce.dietary.df === "yes" && (
                    <Badge variant="dietary">DF</Badge>
                  )}
                  {sauce.dietary.lf === "yes" && (
                    <Badge variant="dietary">LF</Badge>
                  )}
                  {sauce.allergens.map((a) => (
                    <Badge key={a} variant="allergen">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
              {isSelected && <CheckBadge />}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Side sauce add-on */}
      <div className="mt-10">
        <h3 className="mb-2 text-lg font-semibold font-[family-name:var(--font-sora)]">
          Add a side sauce?
        </h3>
        <p className="mb-4 text-sm text-text-secondary">
          Optional extra sauce on the side. Great with steaks and roasts.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <motion.button
            type="button"
            onClick={() => setSideSauceCode(null)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-2xl border-2 border-dashed p-4 text-center text-sm font-medium transition-all duration-200",
              sideSauceCode === null
                ? "border-brand-red bg-brand-red/5 text-brand-red shadow-sm"
                : "border-neutral-200 bg-white text-text-secondary hover:border-neutral-300 hover:shadow-sm"
            )}
          >
            No Side Sauce
          </motion.button>
          {sideSauces.map((ss) => {
            const isSelected = sideSauceCode === ss.code;
            return (
              <motion.button
                key={ss.code}
                type="button"
                onClick={() => setSideSauceCode(ss.code)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "rounded-2xl border-2 p-4 text-left transition-all duration-200",
                  isSelected
                    ? "border-brand-red bg-gradient-to-br from-brand-red/8 to-brand-red/3 shadow-md"
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isSelected ? "text-brand-red" : "text-foreground"
                  )}
                >
                  {ss.name}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {ss.style}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Salad add-on */}
      <div className="mt-10">
        <h3 className="mb-2 text-lg font-semibold font-[family-name:var(--font-sora)]">
          Add a salad?
        </h3>
        <p className="mb-4 text-sm text-text-secondary">
          Fresh side salad with dressing included.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <motion.button
            type="button"
            onClick={() => setSaladCode(null)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-2xl border-2 border-dashed p-4 text-center text-sm font-medium transition-all duration-200",
              saladCode === null
                ? "border-brand-red bg-brand-red/5 text-brand-red shadow-sm"
                : "border-neutral-200 bg-white text-text-secondary hover:border-neutral-300 hover:shadow-sm"
            )}
          >
            No Salad
          </motion.button>
          {saladAddOns.map((salad) => {
            const isSelected = saladCode === salad.code;
            return (
              <motion.button
                key={salad.code}
                type="button"
                onClick={() => setSaladCode(salad.code)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "rounded-2xl border-2 p-4 text-left transition-all duration-200",
                  isSelected
                    ? "border-brand-red bg-gradient-to-br from-brand-red/8 to-brand-red/3 shadow-md"
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isSelected ? "text-brand-red" : "text-foreground"
                  )}
                >
                  {salad.name}
                </div>
                <div className="mt-1 text-xs text-text-secondary line-clamp-2">
                  {salad.description}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CheckBadge() {
  return (
    <motion.div
      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-white shadow-md"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
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
  );
}
