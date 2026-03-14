"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "dietary" | "allergen" | "cooking-method" | "halal" | "premium" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  dietary: "bg-brand-green/10 text-brand-green border-brand-green/20",
  allergen: "bg-amber-50 text-amber-700 border-amber-200",
  "cooking-method": "bg-gray-100 text-gray-700 border-gray-200",
  halal: "bg-brand-green text-white border-brand-green",
  premium: "bg-amber-100 text-amber-800 border-amber-300",
  default: "bg-gray-100 text-gray-600 border-gray-200",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
