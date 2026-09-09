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

export function waterIntakeLiters(
  weightKg: number,
  activityMinutes: number
): number {
  // ~33 ml/kg base + 0.35 L per 30 min activity (rule-of-thumb)
  const base = (weightKg * 33) / 1000;
  const extra = (activityMinutes / 30) * 0.35;
  return base + extra;
}

/** IOM-style rough pregnancy weight gain ranges by pre-pregnancy BMI category. */
export function pregnancyWeightGainRange(bmiCategory: string): {
  totalKg: [number, number];
  note: string;
} {
  switch (bmiCategory) {
    case "underweight":
      return { totalKg: [12.5, 18], note: "BMI < 18.5 (IOM guideline range)" };
    case "normal":
      return { totalKg: [11.5, 16], note: "BMI 18.5–24.9 (IOM guideline range)" };
    case "overweight":
      return { totalKg: [7, 11.5], note: "BMI 25–29.9 (IOM guideline range)" };
    case "obese":
      return { totalKg: [5, 9], note: "BMI ≥ 30 (IOM guideline range)" };
    default:
      return { totalKg: [11.5, 16], note: "Default normal-BMI range" };
  }
}

export function waistHipRatio(
  waistCm: number,
  hipCm: number
): { ratio: number; risk: string } {
  if (hipCm <= 0) return { ratio: NaN, risk: "Invalid" };
  const ratio = waistCm / hipCm;
  let risk = "Low";
  if (ratio >= 0.9) risk = "High";
  else if (ratio >= 0.85) risk = "Moderate";
  return { ratio, risk };
}
