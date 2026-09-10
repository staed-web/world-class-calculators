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
  pythagoras,
  pythagoras3d,
  heronArea,
  distance2d,
  slope,
  circleMetrics,
  sphereVolume,
  sphereSurface,
  cylinderMetrics,
  permutation,
  combination,
  fibonacciNth,
  multiStepPercentage,
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
      {
        id: "n2",
        label: "Numerator 2",
        type: "number",
        defaultValue: 1,
        visibleWhen: { field: "op", in: ["+", "-", "*", "/"] },
      },
      {
        id: "d2",
        label: "Denominator 2",
        type: "number",
        defaultValue: 3,
        visibleWhen: { field: "op", in: ["+", "-", "*", "/"] },
      },
    ],
    related: ["ratio", "gcf-lcm"],
    compute: (v) => {
      if (v.op === "simplify") {
        const parsed = requireNums(v, ["n1", "d1"]);
        if (!parsed.ok) return err(parsed.error);
        const n = parsed.n;
        if (n.d1 === 0) return err("Denominator cannot be zero.");
        const s = simplifyFraction(n.n1, n.d1);
        return ok([
          { label: "Simplified", value: `${s.num}/${s.den}`, emphasize: true },
          { label: "Decimal", value: fmtNumber(s.num / s.den, 6) },
        ]);
      }
      const parsed = requireNums(v, ["n1", "d1", "n2", "d2"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.d1 === 0 || n.d2 === 0) return err("Denominator cannot be zero.");
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
      {
        id: "customBase",
        label: "Custom base",
        type: "number",
        defaultValue: 5,
        visibleWhen: { field: "base", in: ["custom"] },
      },
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
  {
    slug: "pythagoras",
    category: "math",
    name: "Pythagoras Theorem Calculator",
    description:
      "Find the hypotenuse or either leg of a right triangle; optional 3D space diagonal.",
    keywords: ["pythagoras", "hypotenuse", "right triangle", "3d diagonal", "pythagorean"],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote: "a² + b² = c². For 3D: √(a²+b²+c²) is the space diagonal.",
    fields: [
      {
        id: "mode",
        label: "Mode",
        type: "select",
        defaultValue: "hyp",
        options: [
          { value: "hyp", label: "Find hypotenuse c from legs a & b" },
          { value: "leg-a", label: "Find leg a from leg b & hypotenuse c" },
          { value: "leg-b", label: "Find leg b from leg a & hypotenuse c" },
          { value: "3d", label: "3D space diagonal from a, b, c" },
        ],
      },
      {
        id: "a",
        label: "Side a (leg)",
        type: "number",
        defaultValue: 3,
        placeholder: "enter leg a",
        visibleWhen: { field: "mode", in: ["hyp", "leg-b", "3d"] },
      },
      {
        id: "b",
        label: "Side b (leg)",
        type: "number",
        defaultValue: 4,
        placeholder: "enter leg b",
        visibleWhen: { field: "mode", in: ["hyp", "leg-a", "leg", "3d"] },
      },
      {
        id: "c",
        label: "Side c (hypotenuse)",
        type: "number",
        placeholder: "enter hypotenuse c",
        visibleWhen: { field: "mode", in: ["leg-a", "leg-b", "leg", "3d"] },
      },
    ],
    related: ["triangle-area-heron", "distance-formula", "circle"],
    compute: (v) => {
      const mode = v.mode === "leg" ? "leg-a" : v.mode || "hyp";
      if (mode === "3d") {
        const parsed = requireNums(v, ["a", "b", "c"]);
        if (!parsed.ok) return err(parsed.error);
        const n = parsed.n;
        if (n.a < 0 || n.b < 0 || n.c < 0) return err("Sides must be non-negative.");
        const d = pythagoras3d(n.a, n.b, n.c);
        return ok([{ label: "Space diagonal", value: fmtNumber(d, 8), emphasize: true }]);
      }
      if (mode === "leg-a") {
        const parsed = requireNums(v, ["b", "c"]);
        if (!parsed.ok) return err(parsed.error);
        const n = parsed.n;
        if (n.b <= 0 || n.c <= 0) return err("b and c must be positive.");
        if (n.c <= n.b) return err("Hypotenuse c must be greater than leg b.");
        const a = pythagoras(0, n.b, n.c, "a");
        if (!Number.isFinite(a)) return err("Invalid triangle.");
        return ok([
          { label: "Leg a", value: fmtNumber(a, 8), emphasize: true },
          { label: "Check c", value: fmtNumber(pythagoras(a, n.b, 0, "c"), 8) },
        ]);
      }
      if (mode === "leg-b") {
        const parsed = requireNums(v, ["a", "c"]);
        if (!parsed.ok) return err(parsed.error);
        const n = parsed.n;
        if (n.a <= 0 || n.c <= 0) return err("a and c must be positive.");
        if (n.c <= n.a) return err("Hypotenuse c must be greater than leg a.");
        const b = pythagoras(n.a, 0, n.c, "b");
        if (!Number.isFinite(b)) return err("Invalid triangle.");
        return ok([
          { label: "Leg b", value: fmtNumber(b, 8), emphasize: true },
          { label: "Check c", value: fmtNumber(pythagoras(n.a, b, 0, "c"), 8) },
        ]);
      }
      const parsed = requireNums(v, ["a", "b"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.a <= 0 || n.b <= 0) return err("Legs must be positive.");
      const c = pythagoras(n.a, n.b, 0, "c");
      return ok([
        { label: "Hypotenuse c", value: fmtNumber(c, 8), emphasize: true },
        { label: "Perimeter", value: fmtNumber(n.a + n.b + c, 6) },
      ]);
    },
  },
  {
    slug: "triangle-area-heron",
    category: "math",
    name: "Triangle Area (Heron's Formula)",
    description: "Compute triangle area from three side lengths using Heron's formula.",
    keywords: ["heron", "triangle area", "semiperimeter"],
    kind: "form",
    fields: [
      { id: "a", label: "Side a", type: "number", defaultValue: 5 },
      { id: "b", label: "Side b", type: "number", defaultValue: 6 },
      { id: "c", label: "Side c", type: "number", defaultValue: 7 },
    ],
    related: ["pythagoras", "circle"],
    compute: (v) => {
      const parsed = requireNums(v, ["a", "b", "c"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.a <= 0 || n.b <= 0 || n.c <= 0) return err("Sides must be positive.");
      if (n.a + n.b <= n.c || n.a + n.c <= n.b || n.b + n.c <= n.a) {
        return err("Sides do not form a valid triangle.");
      }
      const area = heronArea(n.a, n.b, n.c);
      const s = (n.a + n.b + n.c) / 2;
      return ok([
        { label: "Area", value: fmtNumber(area, 6), emphasize: true },
        { label: "Semiperimeter", value: fmtNumber(s, 6) },
      ]);
    },
  },
  {
    slug: "distance-formula",
    category: "math",
    name: "Distance Formula Calculator",
    description: "Euclidean distance between two points on a plane.",
    keywords: ["distance formula", "euclidean", "coordinate geometry"],
    kind: "form",
    fields: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 0 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 0 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 3 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 4 },
    ],
    related: ["slope", "pythagoras"],
    compute: (v) => {
      const parsed = requireNums(v, ["x1", "y1", "x2", "y2"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const d = distance2d(n.x1, n.y1, n.x2, n.y2);
      return ok([{ label: "Distance", value: fmtNumber(d, 8), emphasize: true }]);
    },
  },
  {
    slug: "slope",
    category: "math",
    name: "Slope Calculator",
    description: "Slope (rise/run) of the line through two points, plus angle.",
    keywords: ["slope", "gradient", "rise over run", "line"],
    kind: "form",
    fields: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 2 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 4 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 8 },
    ],
    related: ["distance-formula"],
    compute: (v) => {
      const parsed = requireNums(v, ["x1", "y1", "x2", "y2"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const m = slope(n.x1, n.y1, n.x2, n.y2);
      if (!Number.isFinite(m)) return err("Vertical line — undefined slope (x₁ = x₂).");
      const deg = (Math.atan(m) * 180) / Math.PI;
      return ok([
        { label: "Slope m", value: fmtNumber(m, 8), emphasize: true },
        { label: "Angle with +x axis", value: `${fmtNumber(deg, 4)}°` },
      ]);
    },
  },
  {
    slug: "circle",
    category: "math",
    name: "Circle Calculator",
    description: "Area, circumference, and diameter from radius.",
    keywords: ["circle", "area", "circumference", "radius"],
    popular: true,
    kind: "form",
    fields: [{ id: "r", label: "Radius", type: "number", defaultValue: 5, min: 0 }],
    related: ["sphere-volume", "cylinder"],
    compute: (v) => {
      const parsed = requireNums(v, ["r"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.r < 0) return err("Radius must be ≥ 0.");
      const m = circleMetrics(parsed.n.r);
      return ok([
        { label: "Area", value: fmtNumber(m.area, 6), emphasize: true },
        { label: "Circumference", value: fmtNumber(m.circumference, 6) },
        { label: "Diameter", value: fmtNumber(m.diameter, 6) },
      ]);
    },
  },
  {
    slug: "sphere-volume",
    category: "math",
    name: "Sphere Volume & Surface",
    description: "Volume and surface area of a sphere from radius.",
    keywords: ["sphere", "volume", "surface area"],
    kind: "form",
    fields: [{ id: "r", label: "Radius", type: "number", defaultValue: 3, min: 0 }],
    related: ["circle", "cylinder"],
    compute: (v) => {
      const parsed = requireNums(v, ["r"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.r < 0) return err("Radius must be ≥ 0.");
      return ok([
        { label: "Volume", value: fmtNumber(sphereVolume(parsed.n.r), 6), emphasize: true },
        { label: "Surface area", value: fmtNumber(sphereSurface(parsed.n.r), 6) },
      ]);
    },
  },
  {
    slug: "cylinder",
    category: "math",
    name: "Cylinder Calculator",
    description: "Volume and surface area of a right circular cylinder.",
    keywords: ["cylinder", "volume", "lateral area"],
    kind: "form",
    fields: [
      { id: "r", label: "Radius", type: "number", defaultValue: 2, min: 0 },
      { id: "h", label: "Height", type: "number", defaultValue: 10, min: 0 },
    ],
    related: ["sphere-volume", "circle"],
    compute: (v) => {
      const parsed = requireNums(v, ["r", "h"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.r < 0 || n.h < 0) return err("Dimensions must be ≥ 0.");
      const m = cylinderMetrics(n.r, n.h);
      return ok([
        { label: "Volume", value: fmtNumber(m.volume, 6), emphasize: true },
        { label: "Lateral surface", value: fmtNumber(m.lateral, 6) },
        { label: "Total surface", value: fmtNumber(m.totalSurface, 6) },
      ]);
    },
  },
  {
    slug: "percentage-increase-multistep",
    category: "math",
    name: "Multi-Step Percentage Change",
    description: "Apply a sequence of percent increases/decreases and see the overall change.",
    keywords: ["percentage increase", "compound percent", "successive percentage"],
    kind: "form",
    fields: [
      { id: "start", label: "Starting value", type: "number", defaultValue: 100 },
      {
        id: "steps",
        label: "Percent steps (comma-separated, e.g. 10, -5, 20)",
        type: "textarea",
        defaultValue: "10, -5, 20",
      },
    ],
    related: ["percentage-change", "percentage-of"],
    compute: (v) => {
      const start = parseNum(v.start);
      if (!Number.isFinite(start)) return err("Enter a starting value.");
      const steps = parseList(v.steps || "");
      if (!steps.length) return err("Enter at least one percent step.");
      const r = multiStepPercentage(start, steps);
      return ok([
        { label: "Final value", value: fmtNumber(r.final, 6), emphasize: true },
        { label: "Overall change", value: fmtPercent(r.overallPct) },
        { label: "Steps applied", value: String(steps.length) },
      ]);
    },
  },
  {
    slug: "permutation-combination",
    category: "math",
    name: "Permutation & Combination",
    description: "Compute P(n,r) and C(n,r) for counting problems.",
    keywords: ["permutation", "combination", "nPr", "nCr", "counting"],
    popular: true,
    kind: "form",
    fields: [
      { id: "n", label: "n", type: "number", defaultValue: 10, min: 0 },
      { id: "r", label: "r", type: "number", defaultValue: 3, min: 0 },
    ],
    related: ["factorial", "fibonacci"],
    compute: (v) => {
      const parsed = requireNums(v, ["n", "r"]);
      if (!parsed.ok) return err(parsed.error);
      const n = Math.trunc(parsed.n.n);
      const r = Math.trunc(parsed.n.r);
      if (n > 1000) return err("n too large for this tool (max 1000).");
      const p = permutation(n, r);
      const c = combination(n, r);
      if (!Number.isFinite(p) || !Number.isFinite(c)) return err("Require 0 ≤ r ≤ n.");
      return ok([
        { label: `P(${n},${r})`, value: fmtNumber(p, 0), emphasize: true },
        { label: `C(${n},${r})`, value: fmtNumber(c, 0), emphasize: true },
      ]);
    },
  },
  {
    slug: "fibonacci",
    category: "math",
    name: "Fibonacci nth Term",
    description: "Compute the nth Fibonacci number (0-indexed: F0=0, F1=1).",
    keywords: ["fibonacci", "sequence", "nth term"],
    kind: "form",
    fields: [{ id: "n", label: "n (0–78 for exact JS integers)", type: "number", defaultValue: 20, min: 0, max: 78 }],
    related: ["factorial", "permutation-combination"],
    compute: (v) => {
      const parsed = requireNums(v, ["n"]);
      if (!parsed.ok) return err(parsed.error);
      const n = Math.trunc(parsed.n.n);
      if (n < 0 || n > 78) return err("n must be between 0 and 78 for exact integer display.");
      const f = fibonacciNth(n);
      return ok([{ label: `F(${n})`, value: fmtNumber(f, 0), emphasize: true }]);
    },
  },
];
