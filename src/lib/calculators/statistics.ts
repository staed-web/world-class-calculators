import type { CalculatorMeta } from "../types";
import { mean, median, mode, stdDeviation } from "../formulas/math";
import { parseList, fmtNumber, fmtPercent, err, ok, requireNums } from "./helpers";

export const statisticsCalculators: CalculatorMeta[] = [
  {
    slug: "standard-deviation",
    category: "statistics",
    name: "Standard Deviation Calculator",
    description: "Sample or population standard deviation, variance, and mean.",
    keywords: ["standard deviation", "variance", "stdev", "statistics"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      {
        id: "nums",
        label: "Data set",
        type: "textarea",
        defaultValue: "10, 12, 23, 23, 16, 23, 21, 16",
      },
      {
        id: "mode",
        label: "Type",
        type: "select",
        defaultValue: "sample",
        options: [
          { value: "sample", label: "Sample (n−1)" },
          { value: "population", label: "Population (n)" },
        ],
      },
    ],
    related: ["average", "z-score"],
    compute: (v) => {
      const nums = parseList(v.nums || "");
      if (nums.length < 2) return err("Enter at least two numbers.");
      const sample = v.mode !== "population";
      const sd = stdDeviation(nums, sample);
      const m = mean(nums);
      return ok([
        { label: "Mean", value: fmtNumber(m, 6) },
        { label: "Std. deviation", value: fmtNumber(sd, 6), emphasize: true },
        { label: "Variance", value: fmtNumber(sd * sd, 6) },
        { label: "Count", value: String(nums.length) },
      ]);
    },
  },
  {
    slug: "z-score",
    category: "statistics",
    name: "Z-Score Calculator",
    description: "Compute how many standard deviations a value is from the mean.",
    keywords: ["z-score", "standard score", "normalization"],
    kind: "form",
    fields: [
      { id: "x", label: "Value (x)", type: "number", defaultValue: 85 },
      { id: "mean", label: "Mean (μ)", type: "number", defaultValue: 70 },
      { id: "sd", label: "Std. deviation (σ)", type: "number", defaultValue: 10 },
    ],
    related: ["standard-deviation"],
    compute: (v) => {
      const parsed = requireNums(v, ["x", "mean", "sd"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.sd === 0) return err("Std. deviation cannot be zero.");
      const z = (n.x - n.mean) / n.sd;
      return ok([{ label: "Z-score", value: fmtNumber(z, 6), emphasize: true }]);
    },
  },
  {
    slug: "percentile",
    category: "statistics",
    name: "Percentile Rank (Simple)",
    description: "Approximate percentile rank of a score within a data set.",
    keywords: ["percentile", "rank"],
    kind: "form",
    fields: [
      { id: "score", label: "Score", type: "number", defaultValue: 78 },
      {
        id: "nums",
        label: "Data set",
        type: "textarea",
        defaultValue: "55, 60, 65, 70, 75, 78, 80, 85, 90, 95",
      },
    ],
    related: ["standard-deviation", "average"],
    compute: (v) => {
      const score = Number(v.score);
      const nums = parseList(v.nums || "");
      if (!Number.isFinite(score) || !nums.length) return err("Invalid input.");
      const below = nums.filter((n) => n < score).length;
      const equal = nums.filter((n) => n === score).length;
      const pct = ((below + 0.5 * equal) / nums.length) * 100;
      return ok([
        { label: "Percentile rank (approx)", value: fmtPercent(pct), emphasize: true },
        { label: "Values below", value: String(below) },
      ]);
    },
  },
  {
    slug: "combination-permutation",
    category: "statistics",
    name: "Combination & Permutation",
    description: "Compute nCr and nPr for counting problems.",
    keywords: ["combination", "permutation", "nCr", "nPr"],
    kind: "form",
    fields: [
      { id: "n", label: "n", type: "number", defaultValue: 10, min: 0 },
      { id: "r", label: "r", type: "number", defaultValue: 3, min: 0 },
    ],
    related: ["factorial"],
    compute: (v) => {
      const parsed = requireNums(v, ["n", "r"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const N = Math.trunc(n.n);
      const R = Math.trunc(n.r);
      if (N < 0 || R < 0 || R > N) return err("Require 0 ≤ r ≤ n.");
      if (N > 1000) return err("n too large for this demo calculator.");
      const fact = (x: number) => {
        let f = 1;
        for (let i = 2; i <= x; i++) f *= i;
        return f;
      };
      // Safer incremental computation
      let nPr = 1;
      for (let i = 0; i < R; i++) nPr *= N - i;
      const nCr = nPr / fact(R);
      return ok([
        { label: "nPr (permutations)", value: fmtNumber(nPr, 0), emphasize: true },
        { label: "nCr (combinations)", value: fmtNumber(nCr, 0), emphasize: true },
      ]);
    },
  },
  {
    slug: "confidence-interval",
    category: "statistics",
    name: "Mean Confidence Interval (Approx)",
    description: "Approximate 95% CI for a mean using z≈1.96 (large sample).",
    keywords: ["confidence interval", "95%", "mean ci"],
    kind: "form",
    fields: [
      { id: "mean", label: "Sample mean", type: "number", defaultValue: 50 },
      { id: "sd", label: "Sample std. deviation", type: "number", defaultValue: 10 },
      { id: "n", label: "Sample size", type: "number", defaultValue: 100, min: 2 },
    ],
    related: ["standard-deviation", "z-score"],
    compute: (v) => {
      const parsed = requireNums(v, ["mean", "sd", "n"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.n < 2) return err("Sample size must be at least 2.");
      const se = n.sd / Math.sqrt(n.n);
      const z = 1.96;
      return ok([
        { label: "Std. error", value: fmtNumber(se, 6) },
        {
          label: "95% CI (approx)",
          value: `${fmtNumber(n.mean - z * se, 4)} to ${fmtNumber(n.mean + z * se, 4)}`,
          emphasize: true,
        },
        { label: "Note", value: "Uses z=1.96; for small n prefer t-distribution." },
      ]);
    },
  },
];
