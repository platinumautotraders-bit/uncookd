"use client";

import type { CookingMethod } from "@/types";
import { cn } from "@/lib/utils";

const methodConfig: Record<CookingMethod, { label: string; icon: string }> = {
  pan: { label: "Pan", icon: "M4 6h16M4 6a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2M4 6V4" },
  "air-fryer": { label: "Air Fryer", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
  oven: { label: "Oven", icon: "M4 4h16v16H4zM4 10h16M8 14h2M14 14h2" },
  "slow-cooker": { label: "Slow Cooker", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  bbq: { label: "BBQ", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
  "stir-fry": { label: "Stir Fry", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
};

interface CookingMethodIconProps {
  method: CookingMethod;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function CookingMethodIcon({
  method,
  showLabel = true,
  size = "sm",
  className,
}: CookingMethodIconProps) {
  const config = methodConfig[method];
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-text-secondary", className)}>
      <svg
        className={iconSize}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
      </svg>
      {showLabel && <span className="text-xs font-medium">{config.label}</span>}
    </span>
  );
}
