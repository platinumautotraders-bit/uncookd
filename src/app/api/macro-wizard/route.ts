import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { age, gender, weight, height, activityLevel, goal } = body;

    // Phase 4: Replace with Claude API call
    // For now, return a sample calculation using Mifflin-St Jeor
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9,
    };

    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

    let targetCalories = tdee;
    let macroSplit = { protein: 30, carbs: 45, fat: 25 };

    switch (goal) {
      case "lose-fat":
        targetCalories = Math.round(tdee * 0.8);
        macroSplit = { protein: 40, carbs: 35, fat: 25 };
        break;
      case "maintain":
        targetCalories = tdee;
        macroSplit = { protein: 30, carbs: 45, fat: 25 };
        break;
      case "build-muscle":
        targetCalories = Math.round(tdee * 1.1);
        macroSplit = { protein: 35, carbs: 45, fat: 20 };
        break;
      case "lean-bulk":
        targetCalories = Math.round(tdee * 1.15);
        macroSplit = { protein: 30, carbs: 50, fat: 20 };
        break;
      case "aggressive-cut":
        targetCalories = Math.round(tdee * 0.7);
        macroSplit = { protein: 45, carbs: 30, fat: 25 };
        break;
    }

    const proteinGrams = Math.round((targetCalories * macroSplit.protein) / 100 / 4);
    const carbsGrams = Math.round((targetCalories * macroSplit.carbs) / 100 / 4);
    const fatGrams = Math.round((targetCalories * macroSplit.fat) / 100 / 9);

    return NextResponse.json({
      success: true,
      data: {
        tdee,
        targetCalories,
        macroSplit,
        dailyTargets: {
          calories: targetCalories,
          protein: proteinGrams,
          carbs: carbsGrams,
          fat: fatGrams,
        },
        note: "This is a sample calculation. Premium members get AI-powered personalised targets.",
      },
      error: null,
    });
  } catch (err) {
    console.error("[Macro Wizard] Calculation failed:", err);
    return NextResponse.json(
      { success: false, data: null, error: { code: "CALC_ERROR", message: "Failed to calculate macros" } },
      { status: 500 }
    );
  }
}
