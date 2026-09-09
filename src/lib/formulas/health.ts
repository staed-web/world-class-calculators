export function bmi(weightKg: number, heightCm: number): {
  bmi: number;
  category: string;
} {
  const h = heightCm / 100;
  const value = weightKg / (h * h);
  let category = "Unknown";
  if (value < 18.5) category = "Underweight";
  else if (value < 25) category = "Normal weight";
  else if (value < 30) category = "Overweight";
  else category = "Obesity";
  return { bmi: value, category };
}

export function bmrMifflin(opts: {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "male" | "female";
}): number {
  const base =
    10 * opts.weightKg + 6.25 * opts.heightCm - 5 * opts.age;
  return opts.sex === "male" ? base + 5 : base - 161;
}

const ACTIVITY: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function tdee(bmr: number, activity: string): number {
  return bmr * (ACTIVITY[activity] ?? 1.2);
}

/** US Navy body fat % estimate */
export function bodyFatNavy(opts: {
  sex: "male" | "female";
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}): number {
  const { sex, heightCm, neckCm, waistCm, hipCm = 0 } = opts;
  if (sex === "male") {
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450
    );
  }
  return (
    495 /
      (1.29579 -
        0.35004 * Math.log10(waistCm + hipCm - neckCm) +
        0.221 * Math.log10(heightCm)) -
    450
  );
}

export function idealWeightRobinson(
  heightCm: number,
  sex: "male" | "female"
): number {
  const inches = heightCm / 2.54;
  const over5 = Math.max(0, inches - 60);
  if (sex === "male") return 52 + 1.9 * over5;
  return 49 + 1.7 * over5;
}

export function pregnancyDueDate(lmp: Date): Date {
  const d = new Date(lmp);
  d.setDate(d.getDate() + 280);
  return d;
}

export function macrosFromCalories(
  calories: number,
  proteinPct: number,
  carbPct: number,
  fatPct: number
): { proteinG: number; carbG: number; fatG: number } {
  return {
    proteinG: (calories * (proteinPct / 100)) / 4,
    carbG: (calories * (carbPct / 100)) / 4,
    fatG: (calories * (fatPct / 100)) / 9,
  };
}
