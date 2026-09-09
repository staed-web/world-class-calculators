import type { CalculatorMeta } from "../types";
import {
  percentageOf,
  percentageChange,
  whatIsPercentOf,
  mean,
  median,
  mode,
  gcd,
  lcm,
  isPrime,
  quadratic,
  simplifyFraction,
  ratioSimplify,
  ageFromDob,
} from "../formulas/math";
import {
  requireNums,
  fmtNumber,
  fmtPercent,
  parseList,
  parseNum,
  err,
  ok,
  fmtDate,
} from "./helpers";

export const mathCalculators: CalculatorMeta[] = [
  {
    slug: "basic",
    category: "math",
    name: "Basic Calculator",
    description: "Add, subtract, multiply, and divide two numbers.",
    keywords: ["basic", "add", "subtract", "multiply", "divide", "arithmetic"],
    popular: true,
    kind: "form",
    fields: [
      { id: "a", label: "First number", type: "number", defaultValue: 12 },
      {
        id: "op",
        label: "Operation",
        type: "select",
        defaultValue: "+",
        options: [
          { value: "+", label: "Add (+)" },
          { value: "-", label: "Subtract (−)" },
          { value: "*", label: "Multiply (×)" },
          { value: "/", label: "Divide (÷)" },
          { value: "^", label: "Power (^)" },
          { value: "%", label: "Modulo (%)" },
        ],
      },
      { id: "b", label: "Second number", type: "number", defaultValue: 3 },
    ],
    related: ["scientific", "percentage"],
    compute: (v) => {
      const a = parseNum(v.a);
      const b = parseNum(v.b);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return err("Enter valid numbers.");
      let result = NaN;
      switch (v.op) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
          if (b === 0) return err("Cannot divide by zero.");
          result = a / b;
          break;
        case "^": result = Math.pow(a, b); break;
        case "%":
          if (b === 0) return err("Cannot modulo by zero.");
          result = a % b;
          break;
        default: return err("Unknown operation.");
      }
      return ok([{ label: "Result", value: fmtNumber(result, 8), emphasize: true }]);
    },
  },
  {
    slug: "scientific",
    category: "math",
    name: "Scientific Calculator",
    description: "Common scientific operations: sin, cos, tan, log, ln, sqrt, and more.",
    keywords: ["scientific", "sin", "cos", "log", "sqrt"],
    featured: true,
    popular: true,
    kind: "custom",
    customKey: "scientific",
    related: ["basic", "quadratic"],
  },
  {
    slug: "fraction",
    category: "math",
    name: "Fraction Calculator",
    description: "Simplify fractions and compute sum, difference, product, or quotient.",
    keywords: ["fraction", "simplify", "numerator", "denominator"],
    kind: "form",
    fields: [
      { id: "n1", label: "Numerator 1", type: "number", defaultValue: 2 },
      { id: "d1", label: "Denominator 1", type: "number", defaultValue: 4 },
      {
        id: "op",
        label: "Operation",
        type: "select",
        defaultValue: "simplify",
        options: [
          { value: "simplify", label: "Simplify first fraction" },
          { value: "+", label: "Add" },
          { value: "-", label: "Subtract" },
          { value: "*", label: "Multiply" },
          { value: "/", label: "Divide" },
        ],
      },
      { id: "n2", label: "Numerator 2", type: "number", defaultValue: 1 },
      { id: "d2", label: "Denominator 2", type: "number", defaultValue: 3 },
    ],
    related: ["ratio", "gcf-lcm"],
    compute: (v) => {
      const parsed = requireNums(v, ["n1", "d1", "n2", "d2"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.d1 === 0 || n.d2 === 0) return err("Denominator cannot be zero.");
      if (v.op === "simplify") {
        const s = simplifyFraction(n.n1, n.d1);
        return ok([
          { label: "Simplified", value: `${s.num}/${s.den}`, emphasize: true },
          { label: "Decimal", value: fmtNumber(s.num / s.den, 6) },
        ]);
      }
      let num = 0;
      let den = 1;
      switch (v.op) {
        case "+":
          num = n.n1 * n.d2 + n.n2 * n.d1;
          den = n.d1 * n.d2;
          break;
        case "-":
          num = n.n1 * n.d2 - n.n2 * n.d1;
          den = n.d1 * n.d2;
          break;
        case "*":
          num = n.n1 * n.n2;
          den = n.d1 * n.d2;
          break;
        case "/":
          if (n.n2 === 0) return err("Cannot divide by zero fraction.");
          num = n.n1 * n.d2;
          den = n.d1 * n.n2;
          break;
        default:
          return err("Unknown operation.");
      }
      const s = simplifyFraction(num, den);
      return ok([
        { label: "Result", value: `${s.num}/${s.den}`, emphasize: true },
        { label: "Decimal", value: fmtNumber(s.num / s.den, 6) },
      ]);
    },
  },
  {
    slug: "percentage-change",
    category: "math",
    name: "Percentage Change",
    description: "Calculate percent increase or decrease between two values.",
    keywords: ["percentage change", "increase", "decrease", "delta"],
    kind: "form",
    fields: [
      { id: "from", label: "From", type: "number", defaultValue: 80 },
      { id: "to", label: "To", type: "number", defaultValue: 100 },
    ],
    related: ["percentage-of", "percentage"],
    compute: (v) => {
      const parsed = requireNums(v, ["from", "to"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const pct = percentageChange(n.from, n.to);
      if (!Number.isFinite(pct)) return err("Starting value cannot be zero.");
      return ok([
        { label: "Change", value: fmtNumber(n.to - n.from, 4) },
        { label: "Percentage change", value: fmtPercent(pct), emphasize: true },
      ]);
    },
  },
  {
    slug: "percentage-of",
    category: "math",
    name: "Percentage Of",
    description: "Find what percent one number is of another, or X% of Y.",
    keywords: ["percent of", "what percent"],
    kind: "form",
    fields: [
      {
        id: "mode",
        label: "Mode",
        type: "select",
        defaultValue: "xofy",
        options: [
          { value: "xofy", label: "What is X% of Y?" },
          { value: "partof", label: "X is what % of Y?" },
        ],
      },
      { id: "x", label: "X", type: "number", defaultValue: 20 },
      { id: "y", label: "Y", type: "number", defaultValue: 150 },
    ],
    related: ["percentage", "percentage-change"],
    compute: (v) => {
      const parsed = requireNums(v, ["x", "y"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (v.mode === "partof") {
        const pct = percentageOf(n.x, n.y);
        if (!Number.isFinite(pct)) return err("Y cannot be zero.");
        return ok([{ label: "Result", value: fmtPercent(pct), emphasize: true }]);
      }
      return ok([
        { label: "Result", value: fmtNumber(whatIsPercentOf(n.x, n.y), 6), emphasize: true },
      ]);
    },
  },
  {
    slug: "average",
    category: "math",
    name: "Average / Mean / Median / Mode",
    description: "Compute mean, median, and mode from a list of numbers.",
    keywords: ["average", "mean", "median", "mode", "central tendency"],
    popular: true,
    kind: "form",
    fields: [
      {
        id: "nums",
        label: "Numbers (comma or space separated)",
        type: "textarea",
        defaultValue: "2, 4, 4, 6, 8, 10",
        placeholder: "e.g. 1, 2, 3, 4",
      },
    ],
    related: ["standard-deviation"],
    compute: (v) => {
      const nums = parseList(v.nums || "");
      if (nums.length === 0) return err("Enter at least one number.");
      const modes = mode(nums);
      return ok([
        { label: "Count", value: String(nums.length) },
        { label: "Mean (average)", value: fmtNumber(mean(nums), 6), emphasize: true },
        { label: "Median", value: fmtNumber(median(nums), 6) },
        {
          label: "Mode",
          value: modes.length ? modes.map((m) => fmtNumber(m, 4)).join(", ") : "No unique mode",
        },
      ]);
    },
  },
  {
    slug: "ratio",
    category: "math",
    name: "Ratio Calculator",
    description: "Simplify a ratio and scale it to a target total or part.",
    keywords: ["ratio", "proportion", "simplify"],
    kind: "form",
    fields: [
      { id: "a", label: "Part A", type: "number", defaultValue: 8 },
      { id: "b", label: "Part B", type: "number", defaultValue: 12 },
      { id: "total", label: "Optional: scale to total", type: "number", defaultValue: 100, helpText: "Leave blank-ish 0 to skip" },
    ],
    related: ["fraction", "gcf-lcm"],
    compute: (v) => {
      const parsed = requireNums(v, ["a", "b"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.a === 0 && n.b === 0) return err("Both parts cannot be zero.");
      const [sa, sb] = ratioSimplify(n.a, n.b);
      const items = [
        { label: "Simplified ratio", value: `${sa} : ${sb}`, emphasize: true },
        { label: "A as % of total", value: fmtPercent((n.a / (n.a + n.b)) * 100) },
      ];
      const total = parseNum(v.total);
      if (Number.isFinite(total) && total > 0) {
        const sum = sa + sb;
        items.push(
          { label: "A share of total", value: fmtNumber((sa / sum) * total, 4) },
          { label: "B share of total", value: fmtNumber((sb / sum) * total, 4) }
        );
      }
      return ok(items);
    },
  },
  {
    slug: "gcf-lcm",
    category: "math",
    name: "GCF / LCM Calculator",
    description: "Find the greatest common factor and least common multiple of two integers.",
    keywords: ["gcf", "gcd", "lcm", "greatest common factor"],
    kind: "form",
    fields: [
      { id: "a", label: "First integer", type: "number", defaultValue: 24 },
      { id: "b", label: "Second integer", type: "number", defaultValue: 36 },
    ],
    related: ["fraction", "ratio", "prime-check"],
    compute: (v) => {
      const parsed = requireNums(v, ["a", "b"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([
        { label: "GCF (GCD)", value: String(gcd(n.a, n.b)), emphasize: true },
        { label: "LCM", value: String(lcm(n.a, n.b)) },
      ]);
    },
  },
  {
    slug: "prime-check",
    category: "math",
    name: "Prime Number Checker",
    description: "Check whether an integer is prime.",
    keywords: ["prime", "prime check", "number theory"],
    kind: "form",
    fields: [{ id: "n", label: "Integer", type: "number", defaultValue: 97 }],
    related: ["gcf-lcm"],
    compute: (v) => {
      const parsed = requireNums(v, ["n"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const p = isPrime(n.n);
      return ok([
        {
          label: "Result",
          value: p ? `${Math.trunc(n.n)} is prime` : `${Math.trunc(n.n)} is not prime`,
          emphasize: true,
        },
      ]);
    },
  },
  {
    slug: "quadratic",
    category: "math",
    name: "Quadratic Equation Solver",
    description: "Solve ax² + bx + c = 0 for real roots.",
    keywords: ["quadratic", "roots", "discriminant", "equation"],
    featured: true,
    kind: "form",
    fields: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -3 },
      { id: "c", label: "c", type: "number", defaultValue: 2 },
    ],
    related: ["scientific", "basic"],
    compute: (v) => {
      const parsed = requireNums(v, ["a", "b", "c"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = quadratic(n.a, n.b, n.c);
      if (r.roots.length === 0) {
        return ok([
          { label: "Discriminant", value: fmtNumber(r.discriminant, 6) },
          { label: "Roots", value: "No real roots", emphasize: true },
        ]);
      }
      return ok([
        { label: "Discriminant", value: fmtNumber(r.discriminant, 6) },
        ...r.roots.map((root, i) => ({
          label: r.roots.length === 1 ? "Root" : `Root ${i + 1}`,
          value: fmtNumber(root, 8),
          emphasize: true,
        })),
      ]);
    },
  },
  {
    slug: "age",
    category: "math",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days from a birth date.",
    keywords: ["age", "birthday", "how old"],
    popular: true,
    kind: "form",
    fields: [
      { id: "dob", label: "Date of birth", type: "date", defaultValue: "2000-01-15" },
      { id: "on", label: "Age on date (optional)", type: "date", defaultValue: "" },
    ],
    related: ["age-from-dob", "date-difference"],
    compute: (v) => {
      if (!v.dob) return err("Enter a date of birth.");
      const dob = new Date(v.dob + "T00:00:00");
      const on = v.on ? new Date(v.on + "T00:00:00") : new Date();
      if (isNaN(dob.getTime()) || isNaN(on.getTime())) return err("Invalid date.");
      if (dob > on) return err("Birth date cannot be after the target date.");
      const a = ageFromDob(dob, on);
      return ok([
        {
          label: "Age",
          value: `${a.years} years, ${a.months} months, ${a.days} days`,
          emphasize: true,
        },
        { label: "As of", value: fmtDate(on) },
      ]);
    },
  },
  {
    slug: "factorial",
    category: "math",
    name: "Factorial Calculator",
    description: "Compute n! for non-negative integers (up to 170).",
    keywords: ["factorial", "n!", "permutation"],
    kind: "form",
    fields: [{ id: "n", label: "n", type: "number", defaultValue: 10, min: 0, max: 170 }],
    related: ["scientific", "prime-check"],
    compute: (v) => {
      const parsed = requireNums(v, ["n"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const x = Math.trunc(n.n);
      if (x < 0) return err("n must be ≥ 0.");
      if (x > 170) return err("n too large (max 170 for finite JS Number).");
      let f = 1;
      for (let i = 2; i <= x; i++) f *= i;
      return ok([{ label: `${x}!`, value: fmtNumber(f, 0), emphasize: true }]);
    },
  },
  {
    slug: "logarithm",
    category: "math",
    name: "Logarithm Calculator",
    description: "Compute log base 10, natural log, or custom base.",
    keywords: ["log", "ln", "logarithm"],
    kind: "form",
    fields: [
      { id: "x", label: "Value (x)", type: "number", defaultValue: 100 },
      {
        id: "base",
        label: "Base",
        type: "select",
        defaultValue: "10",
        options: [
          { value: "10", label: "log₁₀" },
          { value: "e", label: "ln (natural)" },
          { value: "2", label: "log₂" },
          { value: "custom", label: "Custom base" },
        ],
      },
      { id: "customBase", label: "Custom base (if selected)", type: "number", defaultValue: 5 },
    ],
    related: ["scientific"],
    compute: (v) => {
      const x = parseNum(v.x);
      if (!Number.isFinite(x) || x <= 0) return err("x must be positive.");
      let result = NaN;
      if (v.base === "10") result = Math.log10(x);
      else if (v.base === "e") result = Math.log(x);
      else if (v.base === "2") result = Math.log2(x);
      else {
        const b = parseNum(v.customBase);
        if (!Number.isFinite(b) || b <= 0 || b === 1) return err("Invalid custom base.");
        result = Math.log(x) / Math.log(b);
      }
      return ok([{ label: "Result", value: fmtNumber(result, 8), emphasize: true }]);
    },
  },
];
