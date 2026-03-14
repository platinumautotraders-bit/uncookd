"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";

interface PriceDisplayProps {
  amount: number;
  prefix?: string;
  suffix?: string;
  originalAmount?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  amount,
  prefix,
  suffix,
  originalAmount,
  className,
  size = "md",
}: PriceDisplayProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {prefix && (
        <span className="text-sm text-text-secondary">{prefix}</span>
      )}
      {originalAmount && originalAmount > amount && (
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-text-secondary line-through">
          {formatPrice(originalAmount)}
        </span>
      )}
      <span
        className={cn(
          "font-[family-name:var(--font-jetbrains-mono)] font-bold",
          sizeStyles[size]
        )}
      >
        {formatPrice(amount)}
      </span>
      {suffix && (
        <span className="text-sm text-text-secondary">{suffix}</span>
      )}
    </div>
  );
}
