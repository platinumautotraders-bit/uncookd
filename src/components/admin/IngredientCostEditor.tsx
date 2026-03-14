"use client";

import { usePricingStore } from "@/stores/pricingStore";
import { formatPrice } from "@/lib/formatters";

const categoryLabels: Record<string, string> = {
  chicken: "Chicken",
  beef: "Beef",
  lamb: "Lamb",
  vegetables: "Vegetables",
  carbs: "Carbs",
  breakfast: "Breakfast",
  sauces: "Sauces",
};

export function IngredientCostEditor() {
  const { config, updateIngredientCost } = usePricingStore();
  const { ingredientCosts } = config;

  const grouped = ingredientCosts.reduce<Record<string, typeof ingredientCosts>>(
    (acc, item) => {
      const cat = item.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="rounded-xl border border-border-light bg-white p-6">
      <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold">
        Ingredient Costs
      </h2>
      <p className="mt-1 text-xs text-text-secondary">
        Cost per kg in AUD. Retail price = cost / (1 - margin).
      </p>

      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              {categoryLabels[category] || category}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-light text-left text-xs text-text-secondary">
                    <th className="pb-2 pr-4">Ingredient</th>
                    <th className="pb-2 pr-4 text-right">Cost/kg</th>
                    <th className="pb-2 text-right">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.ingredientId} className="border-b border-border-light/50">
                      <td className="py-2 pr-4">{item.name}</td>
                      <td className="py-2 pr-4 text-right">
                        <input
                          type="number"
                          value={item.costPerKg}
                          onChange={(e) =>
                            updateIngredientCost(
                              item.ingredientId,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          step="0.5"
                          min="0"
                          className="w-20 rounded border border-border-light px-2 py-1 text-right font-[family-name:var(--font-jetbrains-mono)] text-sm focus:border-brand-red focus:outline-none"
                        />
                      </td>
                      <td className="py-2 text-right text-xs text-text-secondary">
                        {item.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
