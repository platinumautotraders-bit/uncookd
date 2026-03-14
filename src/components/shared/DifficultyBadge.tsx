"use client";

import type { Difficulty } from "@/types";
import { Badge } from "./Badge";

const difficultyConfig: Record<Difficulty, { label: string; variant: "dietary" | "allergen" | "default" }> = {
  beginner: { label: "Beginner", variant: "dietary" },
  intermediate: { label: "Intermediate", variant: "allergen" },
  advanced: { label: "Advanced", variant: "default" },
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
