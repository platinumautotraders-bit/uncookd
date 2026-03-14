"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PricingConfig, CategoryMargins, IngredientCost } from "@/types";
import { defaultPricingConfig } from "@/config/pricing";

interface PricingStoreState {
  config: PricingConfig;
  updateIngredientCost: (id: string, costPerKg: number) => void;
  updateMargin: (category: keyof CategoryMargins, value: number) => void;
  updateDeliveryFee: (fee: number) => void;
  updateFreeThreshold: (threshold: number) => void;
  updateOrganicSurcharge: (surcharge: number) => void;
  resetToDefaults: () => void;
  exportCSV: () => string;
}

export const usePricingStore = create<PricingStoreState>()(
  persist(
    (set, get) => ({
      config: defaultPricingConfig,

      updateIngredientCost: (id, costPerKg) =>
        set((state) => ({
          config: {
            ...state.config,
            ingredientCosts: state.config.ingredientCosts.map((i) =>
              i.ingredientId === id
                ? { ...i, costPerKg, lastUpdated: new Date().toISOString().split("T")[0] }
                : i
            ),
          },
        })),

      updateMargin: (category, value) =>
        set((state) => ({
          config: {
            ...state.config,
            margins: { ...state.config.margins, [category]: value },
          },
        })),

      updateDeliveryFee: (fee) =>
        set((state) => ({
          config: {
            ...state.config,
            delivery: { ...state.config.delivery, flatFee: fee },
          },
        })),

      updateFreeThreshold: (threshold) =>
        set((state) => ({
          config: {
            ...state.config,
            delivery: { ...state.config.delivery, freeThreshold: threshold },
          },
        })),

      updateOrganicSurcharge: (surcharge) =>
        set((state) => ({
          config: { ...state.config, organicSurcharge: surcharge },
        })),

      resetToDefaults: () => set({ config: defaultPricingConfig }),

      exportCSV: () => {
        const { config } = get();
        const headers = "Ingredient,Category,Cost per Kg (AUD),Last Updated\n";
        const rows = config.ingredientCosts
          .map(
            (i: IngredientCost) =>
              `"${i.name}","${i.category}",${i.costPerKg.toFixed(2)},"${i.lastUpdated}"`
          )
          .join("\n");
        return headers + rows;
      },
    }),
    {
      name: "uncookd-pricing",
    }
  )
);
