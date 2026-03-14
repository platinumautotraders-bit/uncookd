"use client";

import type { Allergen } from "@/types";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

const allergenLabels: Record<Allergen, string> = {
  dairy: "Dairy",
  gluten: "Gluten",
  soy: "Soy",
  sesame: "Sesame",
  mustard: "Mustard",
  eggs: "Eggs",
  "tree-nut": "Tree Nut",
};

interface AllergenTagsProps {
  allergens: Allergen[];
  className?: string;
}

export function AllergenTags({ allergens, className }: AllergenTagsProps) {
  if (allergens.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {allergens.map((allergen) => (
        <Badge key={allergen} variant="allergen">
          {allergenLabels[allergen]}
        </Badge>
      ))}
    </div>
  );
}
