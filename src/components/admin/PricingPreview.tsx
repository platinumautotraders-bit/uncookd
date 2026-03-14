"use client";

import { usePricingStore } from "@/stores/pricingStore";
import { allPlans } from "@/config/plans";
import { estimatePlanPrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/formatters";
import type { PlanDuration, ServingSize } from "@/types";

const durations: PlanDuration[] = [3, 5, 7];
const servings: ServingSize[] = [1, 2, 4];

export function PricingPreview() {
  const { config, exportCSV } = usePricingStore();

  const handleExport = () => {
    const csv = exportCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uncookd-pricing-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky top-20 rounded-xl border border-border-light bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold">
          Price Preview
        </h2>
        <button
          onClick={handleExport}
          className="text-xs font-medium text-brand-red hover:text-brand-red-hover"
        >
          Export CSV
        </button>
      </div>
      <p className="mt-1 text-xs text-text-secondary">
        Calculated from current costs and margins.
      </p>

      <div className="mt-4 space-y-6">
        {allPlans.map((plan) => (
          <div key={plan.slug} className="border-b border-border-light pb-4 last:border-0">
            <h3 className="text-sm font-semibold">{plan.name}</h3>
            <div className="mt-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-text-secondary">
                    <th className="pb-1 text-left">Duration</th>
                    {servings.map((s) => (
                      <th key={s} className="pb-1 text-right">
                        {s}p
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {durations
                    .filter((d) => plan.durationOptions.includes(d))
                    .map((duration) => (
                      <tr key={duration}>
                        <td className="py-0.5 text-text-secondary">
                          {duration}-day
                        </td>
                        {servings
                          .filter((s) => plan.servingOptions.includes(s))
                          .map((serving) => {
                            const price = estimatePlanPrice(
                              plan,
                              duration,
                              serving,
                              config
                            );
                            return (
                              <td
                                key={serving}
                                className="py-0.5 text-right font-[family-name:var(--font-jetbrains-mono)] font-semibold"
                              >
                                {formatPrice(price.subtotal)}
                              </td>
                            );
                          })}
                        {servings
                          .filter((s) => !plan.servingOptions.includes(s))
                          .map((s) => (
                            <td key={s} className="py-0.5 text-right text-text-secondary">
                              —
                            </td>
                          ))}
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
