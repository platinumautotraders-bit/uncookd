"use client";

import { cn } from "@/lib/utils";

interface HalalBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HalalBadge({ size = "sm", className }: HalalBadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-brand-green font-semibold text-white",
        sizeStyles[size],
        className
      )}
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Halal Certified
    </span>
  );
}
