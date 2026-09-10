import type { CalculatorMeta } from "../types";
import { requireNums, fmtNumber, fmtPercent, err, ok, parseList } from "./helpers";

export const educationCalculators: CalculatorMeta[] = [
  {
    slug: "final-grade",
    category: "education",
    name: "Final Grade Needed",
    description: "Find the score you need on a final exam to hit a target course grade.",
    keywords: ["final grade", "exam needed", "weighted grade"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "current", label: "Current grade %", type: "number", defaultValue: 85, suffix: "%" },
      { id: "weight", label: "Final exam weight %", type: "number", defaultValue: 30, suffix: "%" },
      { id: "target", label: "Desired course grade %", type: "number", defaultValue: 90, suffix: "%" },
    ],
    related: ["grade-percentage", "gpa"],
    compute: (v) => {
      const parsed = requireNums(v, ["current", "weight", "target"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.weight <= 0 || n.weight > 100) return err("Exam weight must be between 0 and 100.");
      const w = n.weight / 100;
      const needed = (n.target - n.current * (1 - w)) / w;
      return ok([
        { label: "Score needed on final", value: fmtPercent(needed), emphasize: true },
        {
          label: "Status",
          value:
            needed > 100
              ? "Target may be unreachable with this weight."
              : needed < 0
                ? "You can score 0 and still meet the target."
                : "Achievable with enough study.",
        },
      ]);
    },
  },
  {
    slug: "weighted-grade",
    category: "education",
    name: "Weighted Grade Calculator",
    description: "Combine category scores with weights (must sum to 100%).",
    keywords: ["weighted grade", "category weights"],
    kind: "form",
    fields: [
      {
        id: "rows",
        label: "Categories (score%,weight% per line)",
        type: "textarea",
        defaultValue: "92,20\n88,30\n75,20\n90,30",
        helpText: "score,weight — weights should total 100",
      },
    ],
    related: ["final-grade", "gpa"],
    compute: (v) => {
      const lines = (v.rows || "").trim().split(/\n+/).filter(Boolean);
      if (!lines.length) return err("Enter categories.");
      let total = 0;
      let wsum = 0;
      for (const line of lines) {
        const [s, w] = line.split(/[,\s]+/).map(Number);
        if (!Number.isFinite(s) || !Number.isFinite(w)) return err(`Bad row: ${line}`);
        total += s * (w / 100);
        wsum += w;
      }
      return ok([
        { label: "Weighted grade", value: fmtPercent(total), emphasize: true },
        { label: "Weights sum", value: fmtPercent(wsum), hint: wsum === 100 ? "OK" : "Should be 100%" },
      ]);
    },
  },
  {
    slug: "study-time",
    category: "education",
    name: "Study Time Planner",
    description: "Allocate study hours across subjects by exam weight or priority.",
    keywords: ["study time", "planner", "exam prep"],
    kind: "form",
    fields: [
      { id: "hours", label: "Total study hours available", type: "number", defaultValue: 20 },
      {
        id: "weights",
        label: "Subject weights (comma-separated)",
        type: "textarea",
        defaultValue: "40, 35, 25",
        helpText: "Relative weights; will be normalized",
      },
    ],
    related: ["final-grade"],
    compute: (v) => {
      const parsed = requireNums(v, ["hours"]);
      if (!parsed.ok) return err(parsed.error);
      const hours = parsed.n.hours;
      const weights = parseList(v.weights || "");
      if (hours < 0 || !weights.length) return err("Invalid input.");
      const sum = weights.reduce((a, b) => a + b, 0);
      if (sum <= 0) return err("Weights must sum to a positive number.");
      return ok(
        weights.map((w, i) => ({
          label: `Subject ${i + 1}`,
          value: `${fmtNumber((w / sum) * hours, 2)} hours`,
          emphasize: i === 0,
        }))
      );
    },
  },
  {
    slug: "reading-time",
    category: "education",
    name: "Reading Time Estimator",
    description: "Estimate reading time from word count and reading speed.",
    keywords: ["reading time", "words per minute", "wpm"],
    kind: "form",
    fields: [
      { id: "words", label: "Word count", type: "number", defaultValue: 3000 },
      { id: "wpm", label: "Reading speed (WPM)", type: "number", defaultValue: 200 },
    ],
    related: ["study-time"],
    compute: (v) => {
      const parsed = requireNums(v, ["words", "wpm"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.wpm <= 0) return err("WPM must be positive.");
      const minutes = n.words / n.wpm;
      return ok([
        { label: "Estimated time", value: `${fmtNumber(minutes, 1)} minutes`, emphasize: true },
        { label: "Hours", value: fmtNumber(minutes / 60, 2) },
      ]);
    },
  },
];
