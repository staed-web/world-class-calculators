export function percentageOf(part: number, whole: number): number {
  if (whole === 0) return NaN;
  return (part / whole) * 100;
}

export function percentageChange(from: number, to: number): number {
  if (from === 0) return NaN;
  return ((to - from) / Math.abs(from)) * 100;
}

export function whatIsPercentOf(pct: number, of: number): number {
  return (pct / 100) * of;
}

export function mean(nums: number[]): number {
  if (!nums.length) return NaN;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function median(nums: number[]): number {
  if (!nums.length) return NaN;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function mode(nums: number[]): number[] {
  if (!nums.length) return [];
  const freq = new Map<number, number>();
  let max = 0;
  for (const n of nums) {
    const f = (freq.get(n) ?? 0) + 1;
    freq.set(n, f);
    max = Math.max(max, f);
  }
  if (max === 1 && nums.length > 1) return [];
  return [...freq.entries()].filter(([, f]) => f === max).map(([n]) => n);
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.trunc(a) * Math.trunc(b)) / gcd(a, b);
}

export function isPrime(n: number): boolean {
  const x = Math.trunc(n);
  if (x <= 1) return false;
  if (x <= 3) return true;
  if (x % 2 === 0 || x % 3 === 0) return false;
  for (let i = 5; i * i <= x; i += 6) {
    if (x % i === 0 || x % (i + 2) === 0) return false;
  }
  return true;
}

export function quadratic(
  a: number,
  b: number,
  c: number
): { roots: number[]; discriminant: number } {
  const d = b * b - 4 * a * c;
  if (a === 0) {
    if (b === 0) return { roots: [], discriminant: d };
    return { roots: [-c / b], discriminant: d };
  }
  if (d < 0) return { roots: [], discriminant: d };
  if (d === 0) return { roots: [-b / (2 * a)], discriminant: d };
  const sqrtD = Math.sqrt(d);
  return {
    roots: [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)],
    discriminant: d,
  };
}

export function simplifyFraction(
  num: number,
  den: number
): { num: number; den: number } {
  if (den === 0) return { num: NaN, den: 0 };
  const g = gcd(num, den);
  let n = Math.trunc(num) / g;
  let d = Math.trunc(den) / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return { num: n, den: d };
}

export function ratioSimplify(a: number, b: number): [number, number] {
  const g = gcd(a, b);
  return [Math.trunc(a) / g, Math.trunc(b) / g];
}

export function stdDeviation(nums: number[], sample = true): number {
  if (nums.length < 2) return NaN;
  const m = mean(nums);
  const sq = nums.reduce((s, x) => s + (x - m) ** 2, 0);
  const denom = sample ? nums.length - 1 : nums.length;
  return Math.sqrt(sq / denom);
}

export function ageFromDob(dob: Date, on: Date = new Date()): {
  years: number;
  months: number;
  days: number;
} {
  let years = on.getFullYear() - dob.getFullYear();
  let months = on.getMonth() - dob.getMonth();
  let days = on.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(on.getFullYear(), on.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

/** Pythagoras: solve for hypotenuse or a leg given the other two sides. */
export function pythagoras(
  a: number,
  b: number,
  c: number,
  solve: "c" | "a" | "b"
): number {
  if (solve === "c") return Math.sqrt(a * a + b * b);
  if (solve === "a") {
    if (c * c < b * b) return NaN;
    return Math.sqrt(c * c - b * b);
  }
  if (c * c < a * a) return NaN;
  return Math.sqrt(c * c - a * a);
}

/** 3D space diagonal of a rectangular box, or find missing edge. */
export function pythagoras3d(a: number, b: number, c: number): number {
  return Math.sqrt(a * a + b * b + c * c);
}

export function heronArea(a: number, b: number, c: number): number {
  const s = (a + b + c) / 2;
  const area2 = s * (s - a) * (s - b) * (s - c);
  if (area2 < 0) return NaN;
  return Math.sqrt(area2);
}

export function distance2d(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function slope(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  if (x2 === x1) return NaN;
  return (y2 - y1) / (x2 - x1);
}

export function circleMetrics(radius: number): {
  area: number;
  circumference: number;
  diameter: number;
} {
  return {
    diameter: 2 * radius,
    circumference: 2 * Math.PI * radius,
    area: Math.PI * radius * radius,
  };
}

export function sphereVolume(radius: number): number {
  return (4 / 3) * Math.PI * radius ** 3;
}

export function sphereSurface(radius: number): number {
  return 4 * Math.PI * radius ** 2;
}

export function cylinderMetrics(
  radius: number,
  height: number
): { volume: number; lateral: number; totalSurface: number } {
  const lateral = 2 * Math.PI * radius * height;
  return {
    volume: Math.PI * radius * radius * height,
    lateral,
    totalSurface: lateral + 2 * Math.PI * radius * radius,
  };
}

export function factorial(n: number): number {
  const x = Math.trunc(n);
  if (x < 0 || x > 170) return NaN;
  let f = 1;
  for (let i = 2; i <= x; i++) f *= i;
  return f;
}

export function permutation(n: number, r: number): number {
  n = Math.trunc(n);
  r = Math.trunc(r);
  if (n < 0 || r < 0 || r > n) return NaN;
  let p = 1;
  for (let i = 0; i < r; i++) p *= n - i;
  return p;
}

export function combination(n: number, r: number): number {
  n = Math.trunc(n);
  r = Math.trunc(r);
  if (n < 0 || r < 0 || r > n) return NaN;
  r = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= r; i++) c = (c * (n - r + i)) / i;
  return Math.round(c);
}

export function fibonacciNth(n: number): number {
  const x = Math.trunc(n);
  if (x < 0 || x > 1476) return NaN;
  if (x <= 1) return x;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= x; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
}

/** Apply successive percent changes: start * Π(1 + p_i/100). */
export function multiStepPercentage(
  start: number,
  stepsPct: number[]
): { final: number; overallPct: number } {
  let value = start;
  for (const p of stepsPct) value *= 1 + p / 100;
  const overallPct = start === 0 ? NaN : ((value - start) / Math.abs(start)) * 100;
  return { final: value, overallPct };
}
