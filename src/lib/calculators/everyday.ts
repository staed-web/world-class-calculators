import type { CalculatorMeta } from "../types";
import { tipAmount } from "../formulas/finance";
import { requireNums, fmtMoney, fmtNumber, fmtPercent, parseNum, err, ok } from "./helpers";

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
  {
    slug: "cooking-converter",
    category: "everyday-life",
    name: "Cooking Unit Converter",
    description: "Convert common cooking volume units (tsp, tbsp, cups, ml, liters).",
    keywords: ["cooking", "recipe", "cups", "tablespoon", "ml"],
    popular: true,
    kind: "form",
    fields: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1 },
      {
        id: "from",
        label: "From",
        type: "select",
        defaultValue: "cup",
        options: [
          { value: "tsp", label: "Teaspoon (tsp)" },
          { value: "tbsp", label: "Tablespoon (tbsp)" },
          { value: "cup", label: "Cup (US)" },
          { value: "ml", label: "Milliliter (ml)" },
          { value: "l", label: "Liter (L)" },
          { value: "floz", label: "Fluid ounce (US)" },
        ],
      },
    ],
    related: ["tip-tax-combo"],
    compute: (v) => {
      const amount = parseNum(v.amount);
      if (!Number.isFinite(amount) || amount < 0) return err("Enter a non-negative amount.");
      const toMl: Record<string, number> = {
        tsp: 4.92892,
        tbsp: 14.7868,
        cup: 236.588,
        ml: 1,
        l: 1000,
        floz: 29.5735,
      };
      const ml = amount * (toMl[v.from] ?? 1);
      return ok([
        { label: "Milliliters", value: fmtNumber(ml, 4), emphasize: true },
        { label: "Teaspoons", value: fmtNumber(ml / toMl.tsp, 4) },
        { label: "Tablespoons", value: fmtNumber(ml / toMl.tbsp, 4) },
        { label: "Cups (US)", value: fmtNumber(ml / toMl.cup, 4) },
        { label: "Liters", value: fmtNumber(ml / 1000, 6) },
        { label: "Fl oz (US)", value: fmtNumber(ml / toMl.floz, 4) },
      ]);
    },
  },
  {
    slug: "pace-min-km",
    category: "everyday-life",
    name: "Pace (min/km) Helper",
    description: "Convert a target pace in min/km into speed and race finish times.",
    keywords: ["pace min/km", "running pace", "race time"],
    kind: "form",
    fields: [
      { id: "min", label: "Pace minutes", type: "number", defaultValue: 5 },
      { id: "sec", label: "Pace seconds", type: "number", defaultValue: 30, min: 0, max: 59 },
      { id: "distance", label: "Race distance (km)", type: "number", defaultValue: 10 },
    ],
    related: ["pace", "fuel-cost"],
    compute: (v) => {
      const parsed = requireNums(v, ["min", "sec", "distance"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const paceMin = n.min + n.sec / 60;
      if (paceMin <= 0 || n.distance <= 0) return err("Pace and distance must be positive.");
      const totalMin = paceMin * n.distance;
      const h = Math.floor(totalMin / 60);
      const m = Math.floor(totalMin % 60);
      const s = Math.round((totalMin * 60) % 60);
      const kmh = 60 / paceMin;
      return ok([
        { label: "Speed", value: `${fmtNumber(kmh, 2)} km/h`, emphasize: true },
        {
          label: "Finish time",
          value: `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
          emphasize: true,
        },
      ]);
    },
  },
  {
    slug: "timezone-difference",
    category: "everyday-life",
    name: "Time Zone Difference",
    description: "Approximate hour offset between two IANA time zones right now.",
    keywords: ["time zone", "utc offset", "world clock difference"],
    kind: "form",
    fields: [
      {
        id: "from",
        label: "From zone",
        type: "select",
        defaultValue: "Asia/Kolkata",
        options: [
          { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
          { value: "UTC", label: "UTC" },
          { value: "America/New_York", label: "America/New_York" },
          { value: "America/Los_Angeles", label: "America/Los_Angeles" },
          { value: "Europe/London", label: "Europe/London" },
          { value: "Europe/Paris", label: "Europe/Paris" },
          { value: "Asia/Dubai", label: "Asia/Dubai" },
          { value: "Asia/Singapore", label: "Asia/Singapore" },
          { value: "Asia/Tokyo", label: "Asia/Tokyo" },
          { value: "Australia/Sydney", label: "Australia/Sydney" },
        ],
      },
      {
        id: "to",
        label: "To zone",
        type: "select",
        defaultValue: "America/New_York",
        options: [
          { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
          { value: "UTC", label: "UTC" },
          { value: "America/New_York", label: "America/New_York" },
          { value: "America/Los_Angeles", label: "America/Los_Angeles" },
          { value: "Europe/London", label: "Europe/London" },
          { value: "Europe/Paris", label: "Europe/Paris" },
          { value: "Asia/Dubai", label: "Asia/Dubai" },
          { value: "Asia/Singapore", label: "Asia/Singapore" },
          { value: "Asia/Tokyo", label: "Asia/Tokyo" },
          { value: "Australia/Sydney", label: "Australia/Sydney" },
        ],
      },
    ],
    related: ["unix-timestamp", "date-difference"],
    compute: (v) => {
      const from = v.from || "UTC";
      const to = v.to || "UTC";
      const now = new Date();
      const fmt = (tz: string) =>
        new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          timeZoneName: "shortOffset",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
      const offsetMinutes = (tz: string) => {
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          timeZoneName: "shortOffset",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).formatToParts(now);
        const name = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";
        const m = name.match(/GMT([+-]\d{1,2})(?::?(\d{2}))?/);
        if (!m) return 0;
        const sign = m[1].startsWith("-") ? -1 : 1;
        const hh = Math.abs(parseInt(m[1], 10));
        const mm = m[2] ? parseInt(m[2], 10) : 0;
        return sign * (hh * 60 + mm);
      };
      try {
        const diffMin = offsetMinutes(to) - offsetMinutes(from);
        const hours = diffMin / 60;
        return ok([
          { label: "Offset (to − from)", value: `${fmtNumber(hours, 2)} hours`, emphasize: true },
          { label: `Now in ${from}`, value: fmt(from) },
          { label: `Now in ${to}`, value: fmt(to) },
        ]);
      } catch {
        return err("Invalid time zone.");
      }
    },
  },
  {
    slug: "tip-tax-combo",
    category: "everyday-life",
    name: "Tip + Tax Combo",
    description: "Add sales tax and tip to a bill, with optional per-person split.",
    keywords: ["tip and tax", "restaurant total", "gratuity tax"],
    popular: true,
    kind: "form",
    fields: [
      { id: "subtotal", label: "Subtotal", type: "number", defaultValue: 80, prefix: "$", step: 0.01 },
      { id: "taxPct", label: "Tax %", type: "number", defaultValue: 8, suffix: "%" },
      { id: "tipPct", label: "Tip % (of subtotal)", type: "number", defaultValue: 18, suffix: "%" },
      { id: "people", label: "Split between", type: "number", defaultValue: 2, min: 1 },
    ],
    related: ["tip", "split-bill", "sales-tax"],
    compute: (v) => {
      const parsed = requireNums(v, ["subtotal", "taxPct", "tipPct", "people"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.people < 1) return err("People must be ≥ 1.");
      const tax = n.subtotal * (n.taxPct / 100);
      const tip = n.subtotal * (n.tipPct / 100);
      const total = n.subtotal + tax + tip;
      return ok([
        { label: "Tax", value: fmtMoney(tax) },
        { label: "Tip", value: fmtMoney(tip) },
        { label: "Grand total", value: fmtMoney(total), emphasize: true },
        { label: "Per person", value: fmtMoney(total / n.people), emphasize: true },
      ]);
    },
  },
];
