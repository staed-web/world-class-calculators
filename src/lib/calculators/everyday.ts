import type { CalculatorMeta } from "../types";
import { tipAmount } from "../formulas/finance";
import { requireNums, fmtMoney, fmtNumber, fmtPercent, parseNum, err, ok, parseList } from "./helpers";

function passwordScore(pw: string): { score: number; label: string; tips: string[] } {
  let score = 0;
  const tips: string[] = [];
  if (pw.length >= 8) score += 1; else tips.push("Use at least 8 characters");
  if (pw.length >= 12) score += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1; else tips.push("Mix upper and lower case");
  if (/\d/.test(pw)) score += 1; else tips.push("Add a number");
  if (/[^A-Za-z0-9]/.test(pw)) score += 1; else tips.push("Add a symbol");
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  return { score, label: labels[score] ?? "Unknown", tips };
}

export const everydayCalculators: CalculatorMeta[] = [
  {
    slug: "split-bill",
    category: "everyday-life",
    name: "Split Bill Calculator",
    description: "Split a restaurant bill with optional tip across any number of people.",
    keywords: ["split bill", "share", "restaurant"],
    popular: true,
    kind: "form",
    fields: [
      { id: "bill", label: "Bill subtotal", type: "number", defaultValue: 120, prefix: "$", step: 0.01 },
      { id: "tipPct", label: "Tip %", type: "number", defaultValue: 15, suffix: "%" },
      { id: "people", label: "People", type: "number", defaultValue: 4, min: 1 },
    ],
    related: ["tip", "sales-tax"],
    compute: (v) => {
      const parsed = requireNums(v, ["bill", "tipPct", "people"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = tipAmount(n.bill, n.tipPct, n.people);
      return ok([
        { label: "Tip", value: fmtMoney(r.tip) },
        { label: "Grand total", value: fmtMoney(r.total), emphasize: true },
        { label: "Each person pays", value: fmtMoney(r.perPerson), emphasize: true },
      ]);
    },
  },
  {
    slug: "fuel-cost",
    category: "everyday-life",
    name: "Fuel Cost Calculator",
    description: "Estimate trip fuel cost from distance, economy, and price per unit.",
    keywords: ["fuel cost", "gas", "trip cost", "petrol"],
    popular: true,
    kind: "form",
    fields: [
      { id: "distance", label: "Distance", type: "number", defaultValue: 250 },
      {
        id: "economy",
        label: "Fuel economy",
        type: "number",
        defaultValue: 30,
        helpText: "MPG or km/L depending on units below",
      },
      { id: "price", label: "Fuel price per unit", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 },
      {
        id: "unitNote",
        label: "Units (for your reference)",
        type: "select",
        defaultValue: "mpg",
        options: [
          { value: "mpg", label: "Miles & MPG & $/gallon" },
          { value: "kml", label: "Km & km/L & $/liter" },
        ],
      },
    ],
    related: ["fuel-economy"],
    compute: (v) => {
      const parsed = requireNums(v, ["distance", "economy", "price"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.economy <= 0) return err("Economy must be positive.");
      const fuel = n.distance / n.economy;
      const cost = fuel * n.price;
      return ok([
        { label: "Fuel needed", value: fmtNumber(fuel, 2), emphasize: true },
        { label: "Trip cost", value: fmtMoney(cost), emphasize: true },
        { label: "Cost per distance unit", value: fmtMoney(cost / n.distance) },
      ]);
    },
  },
  {
    slug: "gpa",
    category: "everyday-life",
    name: "GPA Calculator",
    description: "Weighted GPA from course grades and credit hours (4.0 scale).",
    keywords: ["gpa", "grade point average", "college"],
    kind: "form",
    fields: [
      {
        id: "rows",
        label: "Courses (grade,credits per line — grade 0–4)",
        type: "textarea",
        defaultValue: "4,3\n3.7,3\n3.3,4\n3,2",
        helpText: "Example: 3.7,3 means A- for 3 credits",
      },
    ],
    related: ["grade-percentage"],
    compute: (v) => {
      const lines = (v.rows || "").trim().split(/\n+/).filter(Boolean);
      if (!lines.length) return err("Enter at least one course.");
      let points = 0;
      let credits = 0;
      for (const line of lines) {
        const [g, c] = line.split(/[,\s]+/).map(Number);
        if (!Number.isFinite(g) || !Number.isFinite(c)) return err(`Bad row: ${line}`);
        points += g * c;
        credits += c;
      }
      if (credits <= 0) return err("Total credits must be positive.");
      return ok([
        { label: "GPA", value: fmtNumber(points / credits, 3), emphasize: true },
        { label: "Total credits", value: fmtNumber(credits, 1) },
        { label: "Quality points", value: fmtNumber(points, 2) },
      ]);
    },
  },
  {
    slug: "grade-percentage",
    category: "everyday-life",
    name: "Grade Percentage Calculator",
    description: "Convert score over total into a percentage and letter-grade hint.",
    keywords: ["grade", "percentage", "test score"],
    kind: "form",
    fields: [
      { id: "score", label: "Score", type: "number", defaultValue: 87 },
      { id: "total", label: "Total possible", type: "number", defaultValue: 100 },
    ],
    related: ["gpa", "percentage-of"],
    compute: (v) => {
      const parsed = requireNums(v, ["score", "total"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.total <= 0) return err("Total must be positive.");
      const pct = (n.score / n.total) * 100;
      let letter = "F";
      if (pct >= 90) letter = "A";
      else if (pct >= 80) letter = "B";
      else if (pct >= 70) letter = "C";
      else if (pct >= 60) letter = "D";
      return ok([
        { label: "Percentage", value: fmtPercent(pct), emphasize: true },
        { label: "Letter (typical US)", value: letter },
      ]);
    },
  },
  {
    slug: "password-strength",
    category: "everyday-life",
    name: "Password Strength Checker",
    description: "Heuristic strength score for a password (checked only in your browser).",
    keywords: ["password", "strength", "security"],
    kind: "form",
    formulaNote: "Client-side heuristic only — not a guarantee of security. Never reuse passwords.",
    fields: [
      { id: "password", label: "Password", type: "text", defaultValue: "", placeholder: "Type a password to check" },
    ],
    related: ["random-number"],
    compute: (v) => {
      const pw = v.password ?? "";
      if (!pw) return err("Enter a password to evaluate.");
      const r = passwordScore(pw);
      return ok([
        { label: "Strength", value: r.label, emphasize: true },
        { label: "Score", value: `${r.score} / 5` },
        { label: "Tips", value: r.tips.length ? r.tips.join("; ") : "Looks solid on basic checks." },
      ]);
    },
  },
  {
    slug: "random-number",
    category: "everyday-life",
    name: "Random Number Generator",
    description: "Generate a random integer between min and max (inclusive).",
    keywords: ["random", "rng", "dice"],
    kind: "form",
    fields: [
      { id: "min", label: "Minimum", type: "number", defaultValue: 1 },
      { id: "max", label: "Maximum", type: "number", defaultValue: 100 },
      { id: "count", label: "How many", type: "number", defaultValue: 1, min: 1, max: 20 },
    ],
    related: ["password-strength"],
    compute: (v) => {
      const parsed = requireNums(v, ["min", "max", "count"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      let { min, max, count } = n;
      min = Math.ceil(min);
      max = Math.floor(max);
      if (max < min) return err("Max must be ≥ min.");
      count = Math.min(20, Math.max(1, Math.trunc(count)));
      const nums = Array.from({ length: count }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
      );
      return ok([
        { label: count === 1 ? "Random number" : "Random numbers", value: nums.join(", "), emphasize: true },
      ]);
    },
  },
  {
    slug: "tip-everyday",
    category: "everyday-life",
    name: "Everyday Tip Helper",
    description: "Quick tip presets for coffee, haircuts, delivery, and dining.",
    keywords: ["tip helper", "gratuity"],
    kind: "form",
    fields: [
      { id: "bill", label: "Amount", type: "number", defaultValue: 45, prefix: "$", step: 0.01 },
      {
        id: "preset",
        label: "Suggested tip",
        type: "select",
        defaultValue: "18",
        options: [
          { value: "10", label: "10% — coffee / counter" },
          { value: "15", label: "15% — standard" },
          { value: "18", label: "18% — dining" },
          { value: "20", label: "20% — great service" },
          { value: "25", label: "25% — exceptional" },
        ],
      },
    ],
    related: ["tip", "split-bill"],
    compute: (v) => {
      const bill = parseNum(v.bill);
      const tipPct = parseNum(v.preset);
      if (!Number.isFinite(bill) || !Number.isFinite(tipPct)) return err("Invalid input.");
      const r = tipAmount(bill, tipPct, 1);
      return ok([
        { label: "Tip", value: fmtMoney(r.tip), emphasize: true },
        { label: "Total", value: fmtMoney(r.total) },
      ]);
    },
  },
  {
    slug: "hours-to-decimal",
    category: "everyday-life",
    name: "Time to Decimal Hours",
    description: "Convert hours and minutes into decimal hours for timesheets.",
    keywords: ["timesheet", "decimal hours", "payroll time"],
    kind: "form",
    fields: [
      { id: "hours", label: "Hours", type: "number", defaultValue: 7 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 30, min: 0, max: 59 },
    ],
    related: ["hourly-to-salary"],
    compute: (v) => {
      const parsed = requireNums(v, ["hours", "minutes"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const dec = n.hours + n.minutes / 60;
      return ok([
        { label: "Decimal hours", value: fmtNumber(dec, 4), emphasize: true },
      ]);
    },
  },
];
