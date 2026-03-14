"use client";

import { usePricingStore } from "@/stores/pricingStore";
import type { CategoryMargins } from "@/types";

const marginLabels: Record<keyof CategoryMargins, string> = {
  chicken: "Chicken",
  beef: "Beef",
  lamb: "Lamb",
  vegetables: "Vegetables",
  carbs: "Carbs",
  breakfast: "Breakfast",
  sauces: "Core Sauces",
  sideSauces: "Side Sauces",
  salads: "Salads",
};

export function MarginControl() {
  const { config, updateMargin, updateDeliveryFee, updateFreeThreshold, updateOrganicSurcharge, resetToDefaults } = usePricingStore();

  return (
    <div className="rounded-xl border border-border-light bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold">
            Margins & Settings
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Target margin percentage per category.
          </p>
        </div>
        <button
          onClick={resetToDefaults}
          className="text-xs font-medium text-brand-red hover:text-brand-red-hover"
        >
          Reset to Defaults
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Category Margins
        </h3>
        {(Object.keys(config.margins) as (keyof CategoryMargins)[]).map((key) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-28 text-sm">{marginLabels[key]}</label>
            <input
              type="range"
              min="0"
              max="0.9"
              step="0.01"
              value={config.margins[key]}
              onChange={(e) => updateMargin(key, parseFloat(e.target.value))}
              className="flex-1 accent-brand-red"
            />
            <span className="w-14 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold">
              {Math.round(config.margins[key] * 100)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 border-t border-border-light pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Delivery
        </h3>
        <div className="flex items-center gap-4">
          <label className="w-28 text-sm">Flat Fee</label>
          <div className="flex items-center gap-1">
            <span className="text-sm text-text-secondary">$</span>
            <input
              type="number"
              value={config.delivery.flatFee}
              onChange={(e) => updateDeliveryFee(parseFloat(e.target.value) || 0)}
              step="1"
              min="0"
              className="w-20 rounded border border-border-light px-2 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm focus:border-brand-red focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="w-28 text-sm">Free Above</label>
          <div className="flex items-center gap-1">
            <span className="text-sm text-text-secondary">$</span>
            <input
              type="number"
              value={config.delivery.freeThreshold}
              onChange={(e) => updateFreeThreshold(parseFloat(e.target.value) || 0)}
              step="5"
              min="0"
              className="w-20 rounded border border-border-light px-2 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm focus:border-brand-red focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t border-border-light pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
          Organic Surcharge
        </h3>
        <div className="flex items-center gap-4">
          <label className="w-28 text-sm">Surcharge</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={config.organicSurcharge}
            onChange={(e) => updateOrganicSurcharge(parseFloat(e.target.value))}
            className="flex-1 accent-brand-red"
          />
          <span className="w-14 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold">
            {Math.round(config.organicSurcharge * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
