import type { CookingMethod, MealType, ProteinType, ProteinCut, SauceCode } from "@/types";
import type { Carb } from "@/types";
import { proteinCookingMatrix, proteinSauceMatrix, carbMealTypeMatrix, mealTemplates } from "@/config/builder";

export function getCompatibleMethods(proteinType: ProteinType, cut: ProteinCut): CookingMethod[] {
  const entry = proteinCookingMatrix.find(
    (p) => p.proteinType === proteinType && p.cut === cut
  );
  return entry?.methods ?? [];
}

export function getCompatibleProteins(method: CookingMethod): typeof proteinCookingMatrix {
  return proteinCookingMatrix.filter((p) => p.methods.includes(method));
}

export function getCompatibleSauces(
  proteinType: ProteinType,
  cut: ProteinCut
): { code: SauceCode; note?: string }[] {
  const results: { code: SauceCode; note?: string }[] = [];

  for (const entry of proteinSauceMatrix) {
    for (const compat of entry.compatibleProteins) {
      if (compat.proteinType === proteinType && compat.cuts.includes(cut)) {
        results.push({ code: entry.sauceCode, note: compat.note });
      }
    }
  }

  return results;
}

export function getCompatibleCarbs(mealType: MealType): typeof carbMealTypeMatrix {
  return carbMealTypeMatrix.filter((c) =>
    c.compatibleMealTypes.includes(mealType)
  );
}

export function getMealTypesForMethod(method: CookingMethod): MealType[] {
  const types = new Set<MealType>();
  for (const t of mealTemplates) {
    if (t.cookingMethod === method) {
      types.add(t.mealType);
    }
  }
  if (types.size === 0) {
    return ["steak-plate", "roast", "bowl"];
  }
  return Array.from(types);
}

export function isValidCombination(
  proteinType: ProteinType,
  cut: ProteinCut,
  method: CookingMethod,
  sauceCode: SauceCode | null,
  carb: Carb | null,
  mealType: MealType
): boolean {
  const methodValid = proteinCookingMatrix.some(
    (p) =>
      p.proteinType === proteinType &&
      p.cut === cut &&
      p.methods.includes(method)
  );
  if (!methodValid) return false;

  if (sauceCode) {
    const sauceEntry = proteinSauceMatrix.find((s) => s.sauceCode === sauceCode);
    if (sauceEntry) {
      const sauceValid = sauceEntry.compatibleProteins.some(
        (cp) => cp.proteinType === proteinType && cp.cuts.includes(cut)
      );
      if (!sauceValid) return false;
    }
  }

  if (carb && carb !== "none") {
    const carbEntry = carbMealTypeMatrix.find((c) => c.carb === carb);
    if (carbEntry && !carbEntry.compatibleMealTypes.includes(mealType)) {
      return false;
    }
  }

  return true;
}

export function shouldInferStrips(method: CookingMethod, mealType: MealType): boolean {
  return method === "stir-fry" || mealType === "stir-fry" || mealType === "bowl";
}
