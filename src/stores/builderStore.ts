"use client";

import { create } from "zustand";
import type {
  BuilderStep,
  CookingMethod,
  MealType,
  ProteinType,
  ProteinCut,
  Vegetable,
  SauceCode,
  SideSauceCode,
  SaladCode,
  ServingSize,
} from "@/types";

const STEPS: BuilderStep[] = [
  "cooking-method",
  "meal-type",
  "protein",
  "carb",
  "vegetables",
  "sauce",
];

interface BuilderStoreState {
  currentStep: BuilderStep;
  cookingMethod: CookingMethod | null;
  mealType: MealType | null;
  proteinType: ProteinType | null;
  proteinCut: ProteinCut | null;
  carb: string | null;
  vegetables: Vegetable[];
  sauceCode: SauceCode | null;
  sideSauceCode: SideSauceCode | null;
  saladCode: SaladCode | null;
  servingSize: ServingSize;
  quantity: number;

  setCookingMethod: (method: CookingMethod) => void;
  setMealType: (type: MealType) => void;
  setProtein: (type: ProteinType, cut: ProteinCut) => void;
  setCarb: (carb: string | null) => void;
  toggleVegetable: (veg: Vegetable) => void;
  setSauceCode: (code: SauceCode | null) => void;
  setSideSauceCode: (code: SideSauceCode | null) => void;
  setSaladCode: (code: SaladCode | null) => void;
  setServingSize: (size: ServingSize) => void;
  setQuantity: (qty: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: BuilderStep) => void;
  reset: () => void;
  isStepValid: (step: BuilderStep) => boolean;
  getStepIndex: () => number;
}

const initialState = {
  currentStep: "cooking-method" as BuilderStep,
  cookingMethod: null as CookingMethod | null,
  mealType: null as MealType | null,
  proteinType: null as ProteinType | null,
  proteinCut: null as ProteinCut | null,
  carb: null as string | null,
  vegetables: [] as Vegetable[],
  sauceCode: null as SauceCode | null,
  sideSauceCode: null as SideSauceCode | null,
  saladCode: null as SaladCode | null,
  servingSize: 1 as ServingSize,
  quantity: 1,
};

export const useBuilderStore = create<BuilderStoreState>()((set, get) => ({
  ...initialState,

  setCookingMethod: (method) => set({ cookingMethod: method }),
  setMealType: (type) => set({ mealType: type }),
  setProtein: (type, cut) => set({ proteinType: type, proteinCut: cut }),
  setCarb: (carb) => set({ carb }),
  toggleVegetable: (veg) =>
    set((state) => {
      if (state.vegetables.includes(veg)) {
        return { vegetables: state.vegetables.filter((v) => v !== veg) };
      }
      if (state.vegetables.length >= 4) return state;
      return { vegetables: [...state.vegetables, veg] };
    }),
  setSauceCode: (code) => set({ sauceCode: code }),
  setSideSauceCode: (code) => set({ sideSauceCode: code }),
  setSaladCode: (code) => set({ saladCode: code }),
  setServingSize: (size) => set({ servingSize: size }),
  setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),

  nextStep: () =>
    set((state) => {
      const idx = STEPS.indexOf(state.currentStep);
      if (idx < STEPS.length - 1) {
        return { currentStep: STEPS[idx + 1] };
      }
      return state;
    }),

  prevStep: () =>
    set((state) => {
      const idx = STEPS.indexOf(state.currentStep);
      if (idx > 0) {
        return { currentStep: STEPS[idx - 1] };
      }
      return state;
    }),

  goToStep: (step) => set({ currentStep: step }),

  reset: () => set(initialState),

  isStepValid: (step) => {
    const state = get();
    switch (step) {
      case "cooking-method":
        return state.cookingMethod !== null;
      case "meal-type":
        return state.mealType !== null;
      case "protein":
        return state.proteinType !== null && state.proteinCut !== null;
      case "carb":
        return true;
      case "vegetables":
        return state.vegetables.length >= 2;
      case "sauce":
        return true;
      default:
        return false;
    }
  },

  getStepIndex: () => {
    return STEPS.indexOf(get().currentStep);
  },
}));
