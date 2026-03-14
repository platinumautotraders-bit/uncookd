"use client";

import { cn } from "@/lib/utils";

interface MacroBarProps {
  protein: number;
  carbs: number;
  fat: number;
  showLabels?: boolean;
  className?: string;
}

export function MacroBar({ protein, carbs, fat, showLabels = true, className }: MacroBarProps) {
  const total = protein + carbs + fat;
  if (total === 0) return null;

  const pPct = Math.round((protein / total) * 100);
  const cPct = Math.round((carbs / total) * 100);
  const fPct = 100 - pPct - cPct;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-brand-red transition-all"
          style={{ width: `${pPct}%` }}
        />
        <div
          className="bg-amber-400 transition-all"
          style={{ width: `${cPct}%` }}
        />
        <div
          className="bg-blue-500 transition-all"
          style={{ width: `${fPct}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-red" />
            {pPct}% P
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            {cPct}% C
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            {fPct}% F
          </span>
        </div>
      )}
    </div>
  );
}
