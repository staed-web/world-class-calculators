/** Wave-2 formulas: finance, math, health, construction, science, everyday. */

export function balloonLoanPayment(
  principal: number,
  annualRatePct: number,
  amortYears: number,
  termYears: number
): { payment: number; balloon: number; totalPaid: number } {
  const payment = (() => {
    if (principal <= 0 || amortYears <= 0) return NaN;
    const r = annualRatePct / 100 / 12;
    const n = amortYears * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();
  const r = annualRatePct / 100 / 12;
  const termMonths = Math.round(termYears * 12);
  let bal = principal;
  let totalPaid = 0;
  for (let i = 0; i < termMonths; i++) {
    const interest = bal * r;
    const prin = payment - interest;
    bal = Math.max(0, bal - prin);
    totalPaid += payment;
  }
  return { payment, balloon: bal, totalPaid: totalPaid + bal };
}

export function biweeklyMortgage(
  principal: number,
  annualRatePct: number,
  years: number
): {
  monthlyPayment: number;
  biweeklyPayment: number;
  monthsSaved: number;
  interestSaved: number;
} {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  let monthly: number;
  if (principal <= 0 || years <= 0) {
    return { monthlyPayment: NaN, biweeklyPayment: NaN, monthsSaved: NaN, interestSaved: NaN };
  }
  if (r === 0) monthly = principal / n;
  else monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const biweekly = monthly / 2;
  const baseInterest = monthly * n - principal;

  // 26 biweekly payments/year ≈ 13 monthly equivalents
  const rb = annualRatePct / 100 / 26;
  let bal = principal;
  let periods = 0;
  let interestPaid = 0;
  const max = n * 2;
  while (bal > 0.01 && periods < max) {
    const interest = bal * rb;
    let prin = biweekly - interest;
    if (prin <= 0 && rb > 0) break;
    if (prin > bal) prin = bal;
    bal -= prin;
    interestPaid += interest;
    periods++;
  }
  const yearsElapsed = periods / 26;
  const monthsSaved = n - yearsElapsed * 12;
  return {
    monthlyPayment: monthly,
    biweeklyPayment: biweekly,
    monthsSaved: Math.max(0, monthsSaved),
    interestSaved: Math.max(0, baseInterest - interestPaid),
  };
}

export function helocPayment(
  draw: number,
  annualRatePct: number,
  amortYears: number
): number {
  if (draw <= 0 || amortYears <= 0) return NaN;
  const r = annualRatePct / 100 / 12;
  const n = amortYears * 12;
  if (r === 0) return draw / n;
  return (draw * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function capitalGainsRough(
  proceeds: number,
  costBasis: number,
  holdingYears: number,
  incomeBracket: "low" | "mid" | "high"
): { gain: number; ratePct: number; taxEst: number; net: number } {
  const gain = proceeds - costBasis;
  if (gain <= 0) return { gain, ratePct: 0, taxEst: 0, net: proceeds };
  let ratePct: number;
  if (holdingYears < 1) {
    ratePct = incomeBracket === "low" ? 12 : incomeBracket === "mid" ? 22 : 32;
  } else {
    ratePct = incomeBracket === "low" ? 0 : incomeBracket === "mid" ? 15 : 20;
  }
  const taxEst = gain * (ratePct / 100);
  return { gain, ratePct, taxEst, net: proceeds - taxEst };
}

export function tipTaxSplitMega(
  bill: number,
  taxPct: number,
  tipPct: number,
  people: number,
  tipOn: "pre-tax" | "post-tax"
): {
  tax: number;
  tip: number;
  total: number;
  perPerson: number;
} {
  const tax = bill * (taxPct / 100);
  const tipBase = tipOn === "post-tax" ? bill + tax : bill;
  const tip = tipBase * (tipPct / 100);
  const total = bill + tax + tip;
  return { tax, tip, total, perPerson: total / Math.max(1, people) };
}

/** Rough US federal-only paycheck estimate (single, 2026-ish brackets simplified). */
export function salaryAfterTaxUs(
  annualGross: number,
  filing: "single" | "married"
): { federal: number; fica: number; net: number; effectivePct: number } {
  const stdDeduction = filing === "married" ? 30000 : 15000;
  const taxable = Math.max(0, annualGross - stdDeduction);
  const brackets =
    filing === "married"
      ? [
          [23850, 0.1],
          [96950, 0.12],
          [206700, 0.22],
          [394600, 0.24],
          [501050, 0.32],
          [751600, 0.35],
          [Infinity, 0.37],
        ]
      : [
          [11925, 0.1],
          [48475, 0.12],
          [103350, 0.22],
          [197300, 0.24],
          [250525, 0.32],
          [626350, 0.35],
          [Infinity, 0.37],
        ];
  let federal = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    const slice = Math.min(taxable, limit as number) - prev;
    if (slice > 0) federal += slice * (rate as number);
    if (taxable <= (limit as number)) break;
    prev = limit as number;
  }
  const ssWage = Math.min(annualGross, 176100);
  const fica = ssWage * 0.062 + annualGross * 0.0145;
  const net = annualGross - federal - fica;
  return {
    federal,
    fica,
    net,
    effectivePct: annualGross > 0 ? ((federal + fica) / annualGross) * 100 : 0,
  };
}

/** Illustrative progressive tax slabs with a low-income rebate (educational sample). */
export function salaryAfterTaxIn(annualGross: number): {
  tax: number;
  cess: number;
  net: number;
  effectivePct: number;
} {
  const slabs: [number, number][] = [
    [300000, 0],
    [700000, 0.05],
    [1000000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    const slice = Math.min(annualGross, limit) - prev;
    if (slice > 0) tax += slice * rate;
    if (annualGross <= limit) break;
    prev = limit;
  }
  // Simplified rebate-ish: if income <= 7L, tax ~0 under new regime rebate
  if (annualGross <= 700000) tax = 0;
  const cess = tax * 0.04;
  const total = tax + cess;
  return {
    tax,
    cess,
    net: annualGross - total,
    effectivePct: annualGross > 0 ? (total / annualGross) * 100 : 0,
  };
}

export function aprVsApy(
  ratePct: number,
  compoundsPerYear: number
): { apr: number; apy: number; difference: number } {
  const apr = ratePct;
  const apy = (Math.pow(1 + ratePct / 100 / compoundsPerYear, compoundsPerYear) - 1) * 100;
  return { apr, apy, difference: apy - apr };
}

export function sipGrowthSchedule(
  monthly: number,
  annualRatePct: number,
  years: number
): Array<{ year: number; invested: number; value: number; gains: number }> {
  const rows = [];
  for (let y = 1; y <= Math.min(Math.ceil(years), 40); y++) {
    const t = Math.min(y, years);
    const r = annualRatePct / 100 / 12;
    const n = t * 12;
    const invested = monthly * n;
    let value: number;
    if (r === 0) value = invested;
    else value = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    rows.push({ year: y, invested, value, gains: value - invested });
  }
  return rows;
}

export function distance3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number {
  return Math.hypot(x2 - x1, y2 - y1, z2 - z1);
}

export function vectorMagnitude(x: number, y: number, z = 0): number {
  return Math.hypot(x, y, z);
}

export function matrixMultiply2x2(
  a: number[],
  b: number[]
): number[] {
  // row-major 4 elems
  return [
    a[0] * b[0] + a[1] * b[2],
    a[0] * b[1] + a[1] * b[3],
    a[2] * b[0] + a[3] * b[2],
    a[2] * b[1] + a[3] * b[3],
  ];
}

export function matrixMultiply3x3(a: number[], b: number[]): number[] {
  const out = new Array(9).fill(0);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let s = 0;
      for (let k = 0; k < 3; k++) s += a[i * 3 + k] * b[k * 3 + j];
      out[i * 3 + j] = s;
    }
  }
  return out;
}

export function complexAdd(
  aRe: number,
  aIm: number,
  bRe: number,
  bIm: number
): { re: number; im: number; mag: number; argDeg: number } {
  const re = aRe + bRe;
  const im = aIm + bIm;
  return {
    re,
    im,
    mag: Math.hypot(re, im),
    argDeg: (Math.atan2(im, re) * 180) / Math.PI,
  };
}

export function complexMul(
  aRe: number,
  aIm: number,
  bRe: number,
  bIm: number
): { re: number; im: number; mag: number } {
  const re = aRe * bRe - aIm * bIm;
  const im = aRe * bIm + aIm * bRe;
  return { re, im, mag: Math.hypot(re, im) };
}

export function seriesSum(first: number, diff: number, n: number, kind: "arithmetic" | "geometric"): number {
  if (n <= 0) return NaN;
  if (kind === "arithmetic") return (n / 2) * (2 * first + (n - 1) * diff);
  if (diff === 1) return first * n;
  return first * (Math.pow(diff, n) - 1) / (diff - 1);
}

/** Central difference numeric derivative of ax^2+bx+c or sin/cos/exp presets via fn id. */
export function numericDerivative(
  x: number,
  fn: "poly" | "sin" | "cos" | "exp" | "ln",
  a = 1,
  b = 0,
  c = 0,
  h = 1e-5
): number {
  const f = (t: number) => {
    switch (fn) {
      case "poly":
        return a * t * t + b * t + c;
      case "sin":
        return Math.sin(t);
      case "cos":
        return Math.cos(t);
      case "exp":
        return Math.exp(t);
      case "ln":
        return Math.log(Math.abs(t) < 1e-12 ? 1e-12 : t);
    }
  };
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Trapezoidal numeric integral of poly/sin/cos/exp on [lo, hi]. */
export function numericIntegral(
  lo: number,
  hi: number,
  fn: "poly" | "sin" | "cos" | "exp",
  a = 1,
  b = 0,
  c = 0,
  steps = 200
): number {
  if (steps < 1) return NaN;
  const f = (t: number) => {
    switch (fn) {
      case "poly":
        return a * t * t + b * t + c;
      case "sin":
        return Math.sin(t);
      case "cos":
        return Math.cos(t);
      case "exp":
        return Math.exp(t);
    }
  };
  const h = (hi - lo) / steps;
  let sum = 0.5 * (f(lo) + f(hi));
  for (let i = 1; i < steps; i++) sum += f(lo + i * h);
  return sum * h;
}

export function unitCircle(angleDeg: number): { rad: number; x: number; y: number; sin: number; cos: number; tan: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const tan = Math.abs(cos) < 1e-12 ? Infinity : sin / cos;
  return { rad, x: cos, y: sin, sin, cos, tan };
}

export function oneRepMax(weight: number, reps: number, formula: "epley" | "brzycki" = "epley"): number {
  if (reps <= 0 || weight <= 0) return NaN;
  if (reps === 1) return weight;
  if (formula === "brzycki") return weight * (36 / (37 - reps));
  return weight * (1 + reps / 30);
}

export function vo2MaxEstimate(
  distanceMeters: number,
  timeMinutes: number,
  method: "cooper" | "rockport"
): number {
  if (method === "cooper") {
    // Cooper: VO2 = (distance_m - 504.9) / 44.73
    return (distanceMeters - 504.9) / 44.73;
  }
  // Rough Rockport walk using distance as proxy — expects 1 mile time
  const time = timeMinutes;
  return 132.853 - 0.0769 * 70 - 0.3877 * 30 + 6.315 - 3.2649 * time - 0.1565 * 80;
}

export function macrosByGoal(
  tdee: number,
  goal: "lose" | "maintain" | "gain",
  weightKg: number
): { calories: number; proteinG: number; fatG: number; carbsG: number } {
  const calories =
    goal === "lose" ? tdee * 0.8 : goal === "gain" ? tdee * 1.1 : tdee;
  const proteinG = weightKg * (goal === "lose" ? 2.0 : goal === "gain" ? 1.8 : 1.6);
  const fatG = (calories * 0.25) / 9;
  const carbsG = (calories - proteinG * 4 - fatG * 9) / 4;
  return { calories, proteinG, fatG, carbsG: Math.max(0, carbsG) };
}

export function drywallSheets(
  wallAreaSqFt: number,
  sheetSqFt: number,
  wastePct: number
): { sheets: number; exact: number } {
  const exact = (wallAreaSqFt * (1 + wastePct / 100)) / sheetSqFt;
  return { sheets: Math.ceil(exact), exact };
}

export function lumberLinearFeet(
  pieces: number,
  lengthFt: number
): number {
  return pieces * lengthFt;
}

export function gravelTonnage(
  lengthFt: number,
  widthFt: number,
  depthIn: number,
  densityLbPerCuFt = 105
): { cuYd: number; tons: number } {
  const cuFt = lengthFt * widthFt * (depthIn / 12);
  const cuYd = cuFt / 27;
  const tons = (cuFt * densityLbPerCuFt) / 2000;
  return { cuYd, tons };
}

export function acBtu(
  sqFt: number,
  climate: "mild" | "average" | "hot",
  sunExposure: "low" | "medium" | "high"
): number {
  const base =
    climate === "mild" ? 20 : climate === "hot" ? 30 : 25;
  const sun =
    sunExposure === "low" ? 0.9 : sunExposure === "high" ? 1.15 : 1;
  return Math.round(sqFt * base * sun);
}

export function wireGaugeRough(amps: number, copper: boolean): string {
  // Very rough AWG suggestion for short runs
  const table = copper
    ? [
        [15, "14 AWG"],
        [20, "12 AWG"],
        [30, "10 AWG"],
        [40, "8 AWG"],
        [55, "6 AWG"],
        [70, "4 AWG"],
        [95, "2 AWG"],
        [125, "1/0 AWG"],
      ]
    : [
        [15, "12 AWG"],
        [20, "10 AWG"],
        [30, "8 AWG"],
        [40, "6 AWG"],
        [55, "4 AWG"],
        [70, "2 AWG"],
        [95, "1/0 AWG"],
        [125, "3/0 AWG"],
      ];
  for (const [limit, gauge] of table) {
    if (amps <= (limit as number)) return gauge as string;
  }
  return "Consult electrician (≥ 2/0+)";
}

export function tipByCountry(
  bill: number,
  country: string
): { tipPct: number; tip: number; total: number; note: string } {
  const map: Record<string, { tipPct: number; note: string }> = {
    us: { tipPct: 18, note: "US restaurants typically 15–20%" },
    ca: { tipPct: 15, note: "Canada often 15–18%" },
    uk: { tipPct: 10, note: "UK often optional / service included" },
    eu: { tipPct: 5, note: "Many EU spots include service; small tip OK" },
    jp: { tipPct: 0, note: "Japan: tipping generally not expected" },
    in: { tipPct: 10, note: "~5–10% if no service charge (varies by venue)" },
    au: { tipPct: 10, note: "Australia: optional ~10%" },
    mx: { tipPct: 15, note: "Mexico restaurants often ~15%" },
  };
  const c = map[country] ?? map.us;
  const tip = bill * (c.tipPct / 100);
  return { tipPct: c.tipPct, tip, total: bill + tip, note: c.note };
}

export function splitUneven(
  total: number,
  shares: number[]
): { amounts: number[]; sumShares: number } {
  const sumShares = shares.reduce((a, b) => a + b, 0);
  if (sumShares <= 0) return { amounts: shares.map(() => NaN), sumShares };
  return {
    amounts: shares.map((s) => (total * s) / sumShares),
    sumShares,
  };
}

export function fuelVsEvCost(opts: {
  miles: number;
  mpg: number;
  gasPrice: number;
  kwhPer100mi: number;
  electricityRate: number;
}): { gasCost: number; evCost: number; savings: number } {
  const gasCost = (opts.miles / opts.mpg) * opts.gasPrice;
  const evCost = (opts.miles / 100) * opts.kwhPer100mi * opts.electricityRate;
  return { gasCost, evCost, savings: gasCost - evCost };
}

export function carbonFootprintSimple(opts: {
  carMiles: number;
  mpg: number;
  flightsHours: number;
  kwhHome: number;
}): { carKg: number; flightKg: number; homeKg: number; totalKg: number } {
  const gallons = opts.mpg > 0 ? opts.carMiles / opts.mpg : 0;
  const carKg = gallons * 8.887; // kg CO2 / gallon gasoline approx
  const flightKg = opts.flightsHours * 90; // rough kg/hour
  const homeKg = opts.kwhHome * 0.4; // rough grid factor
  return { carKg, flightKg, homeKg, totalKg: carKg + flightKg + homeKg };
}

export function projectileMotion(
  v0: number,
  angleDeg: number,
  g = 9.80665
): {
  range: number;
  maxHeight: number;
  timeOfFlight: number;
  points: Array<{ t: number; x: number; y: number }>;
} {
  const th = (angleDeg * Math.PI) / 180;
  const range = (v0 * v0 * Math.sin(2 * th)) / g;
  const maxHeight = (v0 * v0 * Math.sin(th) * Math.sin(th)) / (2 * g);
  const timeOfFlight = (2 * v0 * Math.sin(th)) / g;
  const points: Array<{ t: number; x: number; y: number }> = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = (timeOfFlight * i) / steps;
    const x = v0 * Math.cos(th) * t;
    const y = v0 * Math.sin(th) * t - 0.5 * g * t * t;
    points.push({ t, x, y: Math.max(0, y) });
  }
  return { range, maxHeight, timeOfFlight, points };
}

export function idealGasLaw(opts: {
  p?: number;
  v?: number;
  n?: number;
  t?: number;
  solve: "p" | "v" | "n" | "t";
}): number {
  const R = 0.082057; // L·atm/(mol·K)
  const { p, v, n, t, solve } = opts;
  switch (solve) {
    case "p":
      return ((n ?? NaN) * R * (t ?? NaN)) / (v ?? NaN);
    case "v":
      return ((n ?? NaN) * R * (t ?? NaN)) / (p ?? NaN);
    case "n":
      return ((p ?? NaN) * (v ?? NaN)) / (R * (t ?? NaN));
    case "t":
      return ((p ?? NaN) * (v ?? NaN)) / (R * (n ?? NaN));
  }
}

export function wavelengthFrequency(value: number, mode: "f-to-wl" | "wl-to-f", c = 3e8): number {
  if (value <= 0) return NaN;
  return mode === "f-to-wl" ? c / value : c / value;
}

export function ohmsFromTwo(
  known: { v?: number; i?: number; r?: number }
): { v: number; i: number; r: number; p: number } | null {
  let { v, i, r } = known;
  if (v !== undefined && i !== undefined) r = v / i;
  else if (v !== undefined && r !== undefined) i = v / r;
  else if (i !== undefined && r !== undefined) v = i * r;
  else return null;
  if (v === undefined || i === undefined || r === undefined) return null;
  return { v, i, r, p: v * i };
}

export function pythagorean3d(a: number, b: number, c?: number): { hypotenuse2d: number; spaceDiagonal?: number } {
  const hypotenuse2d = Math.hypot(a, b);
  if (c === undefined) return { hypotenuse2d };
  return { hypotenuse2d, spaceDiagonal: Math.hypot(a, b, c) };
}

export function sphereGeometry(r: number): { volume: number; surface: number; diameter: number } {
  return {
    volume: (4 / 3) * Math.PI * r ** 3,
    surface: 4 * Math.PI * r ** 2,
    diameter: 2 * r,
  };
}

export function cylinderGeometry(r: number, h: number): { volume: number; lateral: number; totalSurface: number } {
  return {
    volume: Math.PI * r * r * h,
    lateral: 2 * Math.PI * r * h,
    totalSurface: 2 * Math.PI * r * (r + h),
  };
}

export function mortgagePoints(
  loan: number,
  ratePct: number,
  years: number,
  points: number,
  pointCostPct = 1
): { upfront: number; newRate: number; oldPmt: number; newPmt: number; monthlySave: number; breakEvenMonths: number } {
  const upfront = loan * (points * pointCostPct) / 100;
  const newRate = ratePct - points * 0.25; // rough: 1 point ≈ 0.25%
  const pmt = (p: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return p / n;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };
  const oldPmt = pmt(loan, ratePct);
  const newPmt = pmt(loan, newRate);
  const monthlySave = oldPmt - newPmt;
  return {
    upfront,
    newRate,
    oldPmt,
    newPmt,
    monthlySave,
    breakEvenMonths: monthlySave > 0 ? upfront / monthlySave : Infinity,
  };
}

export function creditUtilization(balances: number[], limits: number[]): { utilPct: number; totalBal: number; totalLim: number } {
  const totalBal = balances.reduce((a, b) => a + b, 0);
  const totalLim = limits.reduce((a, b) => a + b, 0);
  return {
    totalBal,
    totalLim,
    utilPct: totalLim > 0 ? (totalBal / totalLim) * 100 : NaN,
  };
}

export function rentAffordability(grossMonthly: number, rule: "30" | "28" | "25" = "30"): number {
  const pct = Number(rule) / 100;
  return grossMonthly * pct;
}

export function arithmeticNth(a1: number, d: number, n: number): number {
  return a1 + (n - 1) * d;
}

export function geometricNth(a1: number, r: number, n: number): number {
  return a1 * Math.pow(r, n - 1);
}

export function radiansDegrees(value: number, mode: "to-deg" | "to-rad"): number {
  return mode === "to-deg" ? (value * 180) / Math.PI : (value * Math.PI) / 180;
}

export function scientificNotation(n: number): { coefficient: number; exponent: number; formatted: string } {
  if (n === 0) return { coefficient: 0, exponent: 0, formatted: "0 × 10^0" };
  const exponent = Math.floor(Math.log10(Math.abs(n)));
  const coefficient = n / Math.pow(10, exponent);
  return {
    coefficient,
    exponent,
    formatted: `${coefficient.toPrecision(6)} × 10^${exponent}`,
  };
}

export function halfLifeRemaining(initial: number, halfLife: number, time: number): number {
  if (halfLife <= 0) return NaN;
  return initial * Math.pow(0.5, time / halfLife);
}

export function snellsLaw(
  n1: number,
  theta1Deg: number,
  n2: number
): { theta2Deg: number; critical?: number } {
  const s = (n1 / n2) * Math.sin((theta1Deg * Math.PI) / 180);
  if (Math.abs(s) > 1) {
    const critical = (Math.asin(n2 / n1) * 180) / Math.PI;
    return { theta2Deg: NaN, critical };
  }
  return { theta2Deg: (Math.asin(s) * 180) / Math.PI };
}

export function lensEquation(f: number, u: number): { v: number; m: number } {
  // 1/f = 1/v + 1/u  (sign convention: object distance often negative in optics; here use positive object distance)
  const v = 1 / (1 / f - 1 / u);
  const m = -v / u;
  return { v, m };
}

export function concreteBags(
  lengthFt: number,
  widthFt: number,
  depthIn: number,
  bagCuFt: number
): { cuFt: number; bags: number } {
  const cuFt = lengthFt * widthFt * (depthIn / 12);
  return { cuFt, bags: Math.ceil(cuFt / bagCuFt) };
}

export function deckingBoards(
  lengthFt: number,
  widthFt: number,
  boardWidthIn: number,
  boardLengthFt: number,
  gapIn = 0.125
): { boards: number; linearFt: number } {
  const effectiveWidth = (boardWidthIn + gapIn) / 12;
  const rows = Math.ceil(widthFt / effectiveWidth);
  const boardsPerRow = Math.ceil(lengthFt / boardLengthFt);
  const boards = rows * boardsPerRow;
  return { boards, linearFt: boards * boardLengthFt };
}

export function pregnancyWeightByWeek(
  prePregnancyKg: number,
  week: number,
  bmiCategory: "under" | "normal" | "over" | "obese"
): { lowKg: number; highKg: number; gainedEst: number } {
  // IOM-ish total gain ranges, linear-ish through pregnancy
  const totals: Record<string, [number, number]> = {
    under: [12.5, 18],
    normal: [11.5, 16],
    over: [7, 11.5],
    obese: [5, 9],
  };
  const [lo, hi] = totals[bmiCategory];
  const frac = Math.min(40, Math.max(0, week)) / 40;
  return {
    lowKg: prePregnancyKg + lo * frac,
    highKg: prePregnancyKg + hi * frac,
    gainedEst: ((lo + hi) / 2) * frac,
  };
}

export function bloodPressureCategory(sys: number, dia: number): string {
  if (sys >= 180 || dia >= 120) return "Hypertensive crisis (seek care)";
  if (sys >= 140 || dia >= 90) return "High blood pressure (stage 2)";
  if (sys >= 130 || dia >= 80) return "High blood pressure (stage 1)";
  if (sys >= 120 && dia < 80) return "Elevated";
  return "Normal (general guidance only)";
}

export function subscriptionAnnual(monthly: number, count: number): { annual: number; fiveYear: number } {
  const annual = monthly * 12 * count;
  return { annual, fiveYear: annual * 5 };
}

export function unitPrice(price: number, qty: number, unitLabel: string): { perUnit: number; label: string } {
  return { perUnit: qty > 0 ? price / qty : NaN, label: unitLabel };
}

export function movingBoxes(
  rooms: number,
  clutter: "minimal" | "average" | "lots"
): { small: number; medium: number; large: number; total: number } {
  const mult = clutter === "minimal" ? 0.7 : clutter === "lots" ? 1.4 : 1;
  const small = Math.ceil(rooms * 4 * mult);
  const medium = Math.ceil(rooms * 6 * mult);
  const large = Math.ceil(rooms * 3 * mult);
  return { small, medium, large, total: small + medium + large };
}

export function capacitanceCombo(values: number[], mode: "series" | "parallel"): number {
  if (!values.length) return NaN;
  if (mode === "parallel") return values.reduce((a, b) => a + b, 0);
  const inv = values.reduce((a, b) => a + 1 / b, 0);
  return 1 / inv;
}

export function dopplerShift(
  f0: number,
  vSource: number,
  vObserver: number,
  vSound = 343,
  sourceApproaching: boolean,
  observerApproaching: boolean
): number {
  const vo = observerApproaching ? vObserver : -vObserver;
  const vs = sourceApproaching ? -vSource : vSource;
  return f0 * ((vSound + vo) / (vSound + vs));
}

export function evaluatePolynomial(coeffs: number[], x: number): number {
  // coeffs high degree first: [a_n, ..., a0]
  return coeffs.reduce((s, c) => s * x + c, 0);
}

export function sampleFunctionPoints(
  fn: "sin" | "cos" | "poly" | "exp",
  xMin: number,
  xMax: number,
  steps: number,
  a = 1,
  b = 0,
  c = 0
): Array<{ x: number; y: number }> {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    let y: number;
    switch (fn) {
      case "sin":
        y = Math.sin(x);
        break;
      case "cos":
        y = Math.cos(x);
        break;
      case "exp":
        y = Math.exp(x);
        break;
      default:
        y = a * x * x + b * x + c;
    }
    pts.push({ x, y });
  }
  return pts;
}
