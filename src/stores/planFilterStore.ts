"use client";

import { create } from "zustand";
import type { PlanGoal, DietaryFlag } from "@/types";

interface PlanFilterState {
  goal: PlanGoal | null;
  proteinType: string | null;
  dietary: DietaryFlag[];
  includesBreakfast: boolean | null;
  maxCalories: number | null;
  setGoal: (goal: PlanGoal | null) => void;
  setProteinType: (type: string | null) => void;
  toggleDietary: (flag: DietaryFlag) => void;
  setIncludesBreakfast: (value: boolean | null) => void;
  setMaxCalories: (value: number | null) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const usePlanFilterStore = create<PlanFilterState>()((set, get) => ({
  goal: null,
  proteinType: null,
  dietary: [],
  includesBreakfast: null,
  maxCalories: null,

  setGoal: (goal) => set({ goal }),
  setProteinType: (proteinType) => set({ proteinType }),

  toggleDietary: (flag) =>
    set((state) => ({
      dietary: state.dietary.includes(flag)
        ? state.dietary.filter((d) => d !== flag)
        : [...state.dietary, flag],
    })),

  setIncludesBreakfast: (includesBreakfast) => set({ includesBreakfast }),
  setMaxCalories: (maxCalories) => set({ maxCalories }),

  clearFilters: () =>
    set({
      goal: null,
      proteinType: null,
      dietary: [],
      includesBreakfast: null,
      maxCalories: null,
    }),

  hasActiveFilters: () => {
    const state = get();
    return !!(
      state.goal ||
      state.proteinType ||
      state.dietary.length > 0 ||
      state.includesBreakfast !== null ||
      state.maxCalories
    );
  },
}));
