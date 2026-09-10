import type { CalculatorMeta } from "../types";
import {
  bmi,
  bmrMifflin,
  tdee,
  bodyFatNavy,
  idealWeightRobinson,
  pregnancyDueDate,
  macrosFromCalories,
  waterIntakeLiters,
  pregnancyWeightGainRange,
  waistHipRatio,
} from "../formulas/health";
import { requireNums, fmtNumber, fmtDate, err, ok, parseNum } from "./helpers";

export const healthCalculators: CalculatorMeta[] = [
  {
    slug: "bmi",
    category: "health-fitness",
    name: "BMI Calculator",
    description: "Free BMI calculator from height and weight with category guidance — educational screening only.",
    keywords: ["bmi", "body mass index", "weight", "BMI chart"],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote: "BMI is a screening estimate, not a diagnosis.",
    fields: [
      { id: "weight", label: "Weight", type: "number", defaultValue: 70, min: 1, suffix: "kg" },
      { id: "height", label: "Height", type: "number", defaultValue: 175, min: 1, suffix: "cm" },
    ],
    related: ["ideal-weight", "body-fat-navy", "bmr"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight", "height"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = bmi(n.weight, n.height);
      return ok([
        { label: "BMI", value: fmtNumber(r.bmi, 1), emphasize: true },
        { label: "Category", value: r.category },
      ]);
    },
  },
  {
    slug: "bmr",
    category: "health-fitness",
    name: "BMR Calculator",
    description: "Basal Metabolic Rate using the Mifflin–St Jeor equation.",
    keywords: ["bmr", "metabolism", "calories"],
    popular: true,
    kind: "form",
    fields: [
      { id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" },
      { id: "height", label: "Height", type: "number", defaultValue: 175, suffix: "cm" },
      { id: "age", label: "Age", type: "number", defaultValue: 30, suffix: "years", min: 1 },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
    related: ["tdee", "macros", "bmi"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight", "height", "age"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const sex = v.sex === "female" ? "female" : "male";
      const value = bmrMifflin({ weightKg: n.weight, heightCm: n.height, age: n.age, sex });
      return ok([
        { label: "BMR", value: `${fmtNumber(value, 0)} kcal/day`, emphasize: true },
        { label: "Note", value: "Calories burned at complete rest (estimate)." },
      ]);
    },
  },
  {
    slug: "tdee",
    category: "health-fitness",
    name: "Calorie / TDEE Calculator",
    description: "Total Daily Energy Expenditure from BMR and activity level.",
    keywords: ["tdee", "calories", "maintenance", "activity"],
    featured: true,
    kind: "form",
    fields: [
      { id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" },
      { id: "height", label: "Height", type: "number", defaultValue: 175, suffix: "cm" },
      { id: "age", label: "Age", type: "number", defaultValue: 30, suffix: "years", min: 1 },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        id: "activity",
        label: "Activity level",
        type: "select",
        defaultValue: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary" },
          { value: "light", label: "Light exercise" },
          { value: "moderate", label: "Moderate exercise" },
          { value: "active", label: "Active" },
          { value: "very_active", label: "Very active" },
        ],
      },
    ],
    related: ["bmr", "macros"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight", "height", "age"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const sex = v.sex === "female" ? "female" : "male";
      const b = bmrMifflin({ weightKg: n.weight, heightCm: n.height, age: n.age, sex });
      const t = tdee(b, v.activity || "moderate");
      return ok([
        { label: "BMR", value: `${fmtNumber(b, 0)} kcal/day` },
        { label: "TDEE (maintenance)", value: `${fmtNumber(t, 0)} kcal/day`, emphasize: true },
        { label: "Mild cut (−10%)", value: `${fmtNumber(t * 0.9, 0)} kcal/day` },
        { label: "Mild bulk (+10%)", value: `${fmtNumber(t * 1.1, 0)} kcal/day` },
      ]);
    },
  },
  {
    slug: "body-fat-navy",
    category: "health-fitness",
    name: "Body Fat (U.S. Navy)",
    description: "Estimate body fat percentage using the U.S. Navy circumference method.",
    keywords: ["body fat", "navy method", "bf%"],
    kind: "form",
    fields: [
      {
        id: "sex",
        label: "Sex",
        type: "select",
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      { id: "height", label: "Height", type: "number", defaultValue: 175, suffix: "cm" },
      { id: "neck", label: "Neck (cm)", type: "number", defaultValue: 38 , suffix: "cm"},
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 84 , suffix: "cm"},
      { id: "hip", label: "Hip (cm, required for female)", type: "number", defaultValue: 95 , suffix: "cm"},
    ],
    related: ["bmi", "ideal-weight"],
    compute: (v) => {
      const parsed = requireNums(v, ["height", "neck", "waist"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const sex = v.sex === "female" ? "female" : "male";
      const hip = parseNum(v.hip) || 0;
      if (sex === "female" && !hip) return err("Hip measurement required for female estimate.");
      const bf = bodyFatNavy({
        sex,
        heightCm: n.height,
        neckCm: n.neck,
        waistCm: n.waist,
        hipCm: hip,
      });
      if (!Number.isFinite(bf)) return err("Check measurements — values may be invalid for the formula.");
      return ok([
        { label: "Estimated body fat", value: `${fmtNumber(bf, 1)}%`, emphasize: true },
        { label: "Note", value: "Circumference method estimate only." },
      ]);
    },
  },
  {
    slug: "ideal-weight",
    category: "health-fitness",
    name: "Ideal Weight Calculator",
    description: "Robinson formula ideal body weight estimate from height and sex.",
    keywords: ["ideal weight", "healthy weight", "robinson"],
    kind: "form",
    fields: [
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170 , suffix: "cm"},
      {
        id: "sex",
        label: "Sex",
        type: "select",
        defaultValue: "female",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
    ],
    related: ["bmi"],
    compute: (v) => {
      const parsed = requireNums(v, ["height"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const sex = v.sex === "male" ? "male" : "female";
      const w = idealWeightRobinson(n.height, sex);
      return ok([
        { label: "Ideal weight (Robinson)", value: `${fmtNumber(w, 1)} kg`, emphasize: true },
        { label: "Approx lbs", value: `${fmtNumber(w * 2.20462, 1)} lb` },
      ]);
    },
  },
  {
    slug: "pregnancy-due-date",
    category: "health-fitness",
    name: "Pregnancy Due Date",
    description: "Estimate due date from last menstrual period (Naegele’s rule, +280 days).",
    keywords: ["pregnancy", "due date", "lmp", "edd"],
    kind: "form",
    formulaNote: "Educational estimate only — confirm with a clinician.",
    fields: [{ id: "lmp", label: "First day of last menstrual period", type: "date", defaultValue: "2026-01-01" }],
    related: ["age"],
    compute: (v) => {
      if (!v.lmp) return err("Enter LMP date.");
      const lmp = new Date(v.lmp + "T00:00:00");
      if (isNaN(lmp.getTime())) return err("Invalid date.");
      const due = pregnancyDueDate(lmp);
      const today = new Date();
      const daysLeft = Math.ceil((due.getTime() - today.getTime()) / 86400000);
      return ok([
        { label: "Estimated due date", value: fmtDate(due), emphasize: true },
        {
          label: "Days from today",
          value: daysLeft >= 0 ? `${daysLeft} days remaining` : `${Math.abs(daysLeft)} days past estimate`,
        },
      ]);
    },
  },
  {
    slug: "macros",
    category: "health-fitness",
    name: "Macro Calculator",
    description: "Split daily calories into protein, carbs, and fat grams.",
    keywords: ["macros", "protein", "carbs", "fat", "diet"],
    kind: "form",
    fields: [
      { id: "calories", label: "Daily calories", type: "number", defaultValue: 2200 },
      { id: "proteinPct", label: "Protein %", type: "number", defaultValue: 30, suffix: "%" },
      { id: "carbPct", label: "Carb %", type: "number", defaultValue: 40, suffix: "%" },
      { id: "fatPct", label: "Fat %", type: "number", defaultValue: 30, suffix: "%" },
    ],
    related: ["tdee", "bmr"],
    compute: (v) => {
      const parsed = requireNums(v, ["calories", "proteinPct", "carbPct", "fatPct"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const sum = n.proteinPct + n.carbPct + n.fatPct;
      if (Math.abs(sum - 100) > 0.5) return err(`Macros must sum to 100% (currently ${sum}%).`);
      const m = macrosFromCalories(n.calories, n.proteinPct, n.carbPct, n.fatPct);
      return ok([
        { label: "Protein", value: `${fmtNumber(m.proteinG, 0)} g`, emphasize: true },
        { label: "Carbohydrates", value: `${fmtNumber(m.carbG, 0)} g` },
        { label: "Fat", value: `${fmtNumber(m.fatG, 0)} g` },
      ]);
    },
  },
  {
    slug: "pace",
    category: "health-fitness",
    name: "Running Pace Calculator",
    description: "Convert distance and time into pace per km/mile and estimated speed.",
    keywords: ["pace", "running", "jogging", "split"],
    kind: "form",
    fields: [
      { id: "distance", label: "Distance", type: "number", defaultValue: 5 },
      {
        id: "unit",
        label: "Unit",
        type: "select",
        defaultValue: "km",
        options: [
          { value: "km", label: "Kilometers" },
          { value: "mi", label: "Miles" },
        ],
      },
      { id: "minutes", label: "Time (minutes)", type: "number", defaultValue: 28 },
      { id: "seconds", label: "Extra seconds", type: "number", defaultValue: 0 },
    ],
    related: ["tdee"],
    compute: (v) => {
      const parsed = requireNums(v, ["distance", "minutes", "seconds"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.distance <= 0) return err("Distance must be positive.");
      const totalMin = n.minutes + n.seconds / 60;
      if (totalMin <= 0) return err("Time must be positive.");
      const pace = totalMin / n.distance;
      const paceMin = Math.floor(pace);
      const paceSec = Math.round((pace - paceMin) * 60);
      const hours = totalMin / 60;
      const speed = n.distance / hours;
      const unit = v.unit === "mi" ? "mi" : "km";
      return ok([
        {
          label: `Pace per ${unit}`,
          value: `${paceMin}:${String(paceSec).padStart(2, "0")}`,
          emphasize: true,
        },
        { label: "Average speed", value: `${fmtNumber(speed, 2)} ${unit}/h` },
      ]);
    },
  },
  {
    slug: "water-intake",
    category: "health-fitness",
    name: "Water Intake Calculator",
    description: "Estimate daily water needs from body weight and activity minutes.",
    keywords: ["water intake", "hydration", "how much water"],
    popular: true,
    kind: "form",
    formulaNote: "Rule-of-thumb only (~33 ml/kg + activity). Individual needs vary.",
    fields: [
      { id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" },
      { id: "activity", label: "Exercise (minutes/day)", type: "number", defaultValue: 45 },
    ],
    related: ["bmi", "tdee"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight", "activity"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.weight <= 0) return err("Weight must be positive.");
      const liters = waterIntakeLiters(n.weight, Math.max(0, n.activity));
      return ok([
        { label: "Suggested intake", value: `${fmtNumber(liters, 2)} L/day`, emphasize: true },
        { label: "Approx cups (240 ml)", value: fmtNumber(liters / 0.24, 1) },
      ]);
    },
  },
  {
    slug: "pregnancy-weight-gain",
    category: "health-fitness",
    name: "Pregnancy Weight Gain Estimate",
    description: "IOM-style total pregnancy weight-gain ranges by pre-pregnancy BMI category.",
    keywords: ["pregnancy weight gain", "gestational weight", "IOM"],
    kind: "form",
    formulaNote: "Educational ranges only — follow your clinician's guidance.",
    fields: [
      {
        id: "category",
        label: "Pre-pregnancy BMI category",
        type: "select",
        defaultValue: "normal",
        options: [
          { value: "underweight", label: "Underweight (BMI < 18.5)" },
          { value: "normal", label: "Normal (18.5–24.9)" },
          { value: "overweight", label: "Overweight (25–29.9)" },
          { value: "obese", label: "Obese (BMI ≥ 30)" },
        ],
      },
    ],
    related: ["pregnancy-due-date", "bmi"],
    compute: (v) => {
      const r = pregnancyWeightGainRange(v.category || "normal");
      return ok([
        {
          label: "Suggested total gain",
          value: `${fmtNumber(r.totalKg[0], 1)}–${fmtNumber(r.totalKg[1], 1)} kg`,
          emphasize: true,
        },
        {
          label: "In pounds (approx)",
          value: `${fmtNumber(r.totalKg[0] * 2.20462, 0)}–${fmtNumber(r.totalKg[1] * 2.20462, 0)} lb`,
        },
        { label: "Note", value: r.note },
      ]);
    },
  },
  {
    slug: "waist-hip-ratio",
    category: "health-fitness",
    name: "Waist–Hip Ratio",
    description: "Waist-to-hip ratio with a simple risk band hint.",
    keywords: ["waist hip ratio", "whr", "body shape"],
    kind: "form",
    formulaNote: "Screening hint only — not a medical diagnosis. Cutoffs vary by sex and guideline.",
    fields: [
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 80 , suffix: "cm"},
      { id: "hip", label: "Hip (cm)", type: "number", defaultValue: 100 , suffix: "cm"},
    ],
    related: ["bmi", "body-fat-navy"],
    compute: (v) => {
      const parsed = requireNums(v, ["waist", "hip"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.waist <= 0 || n.hip <= 0) return err("Measurements must be positive.");
      const r = waistHipRatio(n.waist, n.hip);
      return ok([
        { label: "WHR", value: fmtNumber(r.ratio, 3), emphasize: true },
        { label: "Rough risk band", value: r.risk },
      ]);
    },
  },
];
