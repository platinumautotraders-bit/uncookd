export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg`;
  }
  return `${grams}g`;
}

export function formatCalories(cal: number): string {
  return new Intl.NumberFormat("en-AU").format(cal);
}

export function formatMacro(grams: number, label?: string): string {
  if (label) {
    return `${grams}g ${label}`;
  }
  return `${grams}g`;
}

export function formatMacroSplit(protein: number, carbs: number, fat: number): string {
  return `${protein}P / ${carbs}C / ${fat}F`;
}

export function formatCookTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hrs} hr`;
  }
  return `${hrs} hr ${mins} min`;
}

export function formatDuration(days: number): string {
  return `${days}-day`;
}

export function formatServingSize(size: number): string {
  if (size === 1) return "1 person";
  if (size === 4) return "Family (4)";
  return `${size} people`;
}
