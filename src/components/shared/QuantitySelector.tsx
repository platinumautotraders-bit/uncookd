"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border-light",
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="flex h-9 w-9 items-center justify-center text-lg font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="flex h-9 w-10 items-center justify-center border-x border-border-light font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold">
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center text-lg font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
