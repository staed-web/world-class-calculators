/** High-traffic formula helpers for the expanded calculator catalog. */

export function creditCardPayoff(
  balance: number,
  aprPct: number,
  monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } {
  const r = aprPct / 100 / 12;
  if (balance <= 0 || monthlyPayment <= 0) {
    return { months: NaN, totalInterest: NaN, totalPaid: NaN };
  }
  if (r > 0 && monthlyPayment <= balance * r) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  let bal = balance;
  let months = 0;
  let interest = 0;
  const max = 1200;
  while (bal > 0.01 && months < max) {
    const i = bal * r;
    interest += i;
    const principal = Math.min(bal, monthlyPayment - i);
    if (principal <= 0) {
      return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
    }
    bal -= principal;
    months++;
  }
  return { months, totalInterest: interest, totalPaid: balance + interest };
}

export function leaseVsBuy(opts: {
  carPrice: number;
  downPayment: number;
  loanRatePct: number;
  loanYears: number;
  leasePayment: number;
  leaseMonths: number;
  leaseDown: number;
  residualValue: number;
}): { buyTotal: number; leaseTotal: number; buyEffective: number; better: string } {
  const loanPrincipal = Math.max(0, opts.carPrice - opts.downPayment);
  const r = opts.loanRatePct / 100 / 12;
  const n = opts.loanYears * 12;
  let monthly = 0;
  if (n > 0) {
    monthly = r === 0 ? loanPrincipal / n : (loanPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  const buyTotal = opts.downPayment + monthly * n;
  const leaseTotal = opts.leaseDown + opts.leasePayment * opts.leaseMonths;
  const buyEffective = buyTotal - opts.residualValue;
  const better = buyEffective <= leaseTotal ? "Buy (lower net cost)" : "Lease (lower cash outlay over term)";
  return { buyTotal, leaseTotal, buyEffective, better };
}

export function rentVsBuy(opts: {
  homePrice: number;
  downPct: number;
  mortgageRatePct: number;
  years: number;
  monthlyRent: number;
  propertyTaxAnnual: number;
  maintenanceAnnual: number;
  expectedAppreciationPct: number;
}): { monthlyOwn: number; monthlyRent: number; equityEstimate: number; note: string } {
  const down = opts.homePrice * (opts.downPct / 100);
  const principal = opts.homePrice - down;
  const r = opts.mortgageRatePct / 100 / 12;
  const n = opts.years * 12;
  const pmt =
    n <= 0
      ? 0
      : r === 0
        ? principal / n
        : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyOwn =
    pmt + opts.propertyTaxAnnual / 12 + opts.maintenanceAnnual / 12;
  const futureHome = opts.homePrice * Math.pow(1 + opts.expectedAppreciationPct / 100, opts.years);
  // Rough remaining balance after years
  let bal = principal;
  for (let i = 0; i < n; i++) {
    const interest = bal * r;
    bal = Math.max(0, bal - (pmt - interest));
  }
  const equityEstimate = futureHome - bal;
  return {
    monthlyOwn,
    monthlyRent: opts.monthlyRent,
    equityEstimate,
    note: "Illustrative only — ignores tax deductions, HOA, opportunity cost of down payment.",
  };
}

export function budgetPercent(income: number, expenses: number): {
  remaining: number;
  spentPct: number;
  savePct: number;
} {
  const remaining = income - expenses;
  const spentPct = income === 0 ? NaN : (expenses / income) * 100;
  const savePct = income === 0 ? NaN : (remaining / income) * 100;
  return { remaining, spentPct, savePct };
}

/** Very rough paycheck estimate — NOT professional tax advice. */
export function roughPaycheck(opts: {
  grossAnnual: number;
  payPeriods: number;
  federalPct: number;
  statePct: number;
  otherPct: number;
}): { grossPerPeriod: number; totalTaxPct: number; netPerPeriod: number; netAnnual: number } {
  const totalTaxPct = opts.federalPct + opts.statePct + opts.otherPct;
  const netAnnual = opts.grossAnnual * (1 - totalTaxPct / 100);
  const periods = Math.max(1, opts.payPeriods);
  return {
    grossPerPeriod: opts.grossAnnual / periods,
    totalTaxPct,
    netPerPeriod: netAnnual / periods,
    netAnnual,
  };
}

export function investmentReturn(
  principal: number,
  annualRatePct: number,
  years: number,
  monthlyContribution: number
): { futureValue: number; contributed: number; growth: number } {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  const fvStart = principal * Math.pow(1 + r, n);
  const fvContrib =
    r === 0
      ? monthlyContribution * n
      : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  const futureValue = fvStart + fvContrib;
  const contributed = principal + monthlyContribution * n;
  return { futureValue, contributed, growth: futureValue - contributed };
}

/** Simple bond current yield ≈ annual coupon / price * 100 */
export function bondCurrentYield(couponAnnual: number, price: number): number {
  if (price <= 0) return NaN;
  return (couponAnnual / price) * 100;
}

/** Approximate YTM for annual coupon bond (Newton-ish closed form approx). */
export function bondYtmApprox(
  face: number,
  price: number,
  couponAnnual: number,
  years: number
): number {
  if (years <= 0 || price <= 0) return NaN;
  // Common approximation: (C + (F-P)/n) / ((F+P)/2)
  const approx = (couponAnnual + (face - price) / years) / ((face + price) / 2);
  return approx * 100;
}

export function forexPositionSize(opts: {
  account: number;
  riskPct: number;
  stopPips: number;
  pipValuePerLot: number;
}): { riskAmount: number; lots: number } {
  const riskAmount = opts.account * (opts.riskPct / 100);
  const pipCost = opts.stopPips * opts.pipValuePerLot;
  const lots = pipCost <= 0 ? NaN : riskAmount / pipCost;
  return { riskAmount, lots };
}

export function gstInvoiceSplit(
  total: number,
  gstPct: number
): { taxable: number; gst: number; total: number } {
  const taxable = total / (1 + gstPct / 100);
  const gst = total - taxable;
  return { taxable, gst, total };
}

export function dividendYield(annualDividend: number, price: number): number {
  if (price <= 0) return NaN;
  return (annualDividend / price) * 100;
}

export function peRatio(price: number, eps: number): number {
  if (eps === 0) return NaN;
  return price / eps;
}

export function interestOnlyPayment(principal: number, annualRatePct: number): number {
  return (principal * (annualRatePct / 100)) / 12;
}

export function loanAffordability(
  monthlyIncome: number,
  monthlyDebts: number,
  dtiPct: number,
  annualRatePct: number,
  years: number
): { maxPayment: number; maxLoan: number } {
  const maxPayment = monthlyIncome * (dtiPct / 100) - monthlyDebts;
  if (maxPayment <= 0) return { maxPayment: 0, maxLoan: 0 };
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return { maxPayment, maxLoan: maxPayment * n };
  const maxLoan = maxPayment * (1 - Math.pow(1 + r, -n)) / r;
  return { maxPayment, maxLoan };
}

export function downPaymentNeeded(price: number, downPct: number): {
  down: number;
  loan: number;
} {
  const down = price * (downPct / 100);
  return { down, loan: price - down };
}

export function matrix2x2Det(a: number, b: number, c: number, d: number): number {
  return a * d - b * c;
}

export function binomialProbability(n: number, k: number, p: number): number {
  n = Math.trunc(n);
  k = Math.trunc(k);
  if (n < 0 || k < 0 || k > n || p < 0 || p > 1) return NaN;
  // C(n,k) * p^k * (1-p)^(n-k)
  let c = 1;
  const r = Math.min(k, n - k);
  for (let i = 1; i <= r; i++) c = (c * (n - r + i)) / i;
  return c * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/** Solve triangle given SAS / ASA / SSS / AAS using law of sines/cosines. Degrees. */
export function triangleSolve(opts: {
  a?: number;
  b?: number;
  c?: number;
  A?: number;
  B?: number;
  C?: number;
}): { a: number; b: number; c: number; A: number; B: number; C: number } | null {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  let { a = NaN, b = NaN, c = NaN, A = NaN, B = NaN, C = NaN } = opts;

  const sides = [a, b, c].filter(Number.isFinite).length;
  const angles = [A, B, C].filter(Number.isFinite).length;
  if (sides + angles < 3) return null;

  // Fill third angle if two known
  if (Number.isFinite(A) && Number.isFinite(B) && !Number.isFinite(C)) C = 180 - A - B;
  if (Number.isFinite(A) && Number.isFinite(C) && !Number.isFinite(B)) B = 180 - A - C;
  if (Number.isFinite(B) && Number.isFinite(C) && !Number.isFinite(A)) A = 180 - B - C;

  // SSS
  if (Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(c)) {
    A = toDeg(Math.acos(Math.min(1, Math.max(-1, (b * b + c * c - a * a) / (2 * b * c)))));
    B = toDeg(Math.acos(Math.min(1, Math.max(-1, (a * a + c * c - b * b) / (2 * a * c)))));
    C = 180 - A - B;
    return { a, b, c, A, B, C };
  }

  // SAS: two sides + included angle
  if (Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(C) && !Number.isFinite(c)) {
    c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(C)));
    A = toDeg(Math.acos(Math.min(1, Math.max(-1, (b * b + c * c - a * a) / (2 * b * c)))));
    B = 180 - A - C;
    return { a, b, c, A, B, C };
  }
  if (Number.isFinite(a) && Number.isFinite(c) && Number.isFinite(B) && !Number.isFinite(b)) {
    b = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(toRad(B)));
    A = toDeg(Math.acos(Math.min(1, Math.max(-1, (b * b + c * c - a * a) / (2 * b * c)))));
    C = 180 - A - B;
    return { a, b, c, A, B, C };
  }
  if (Number.isFinite(b) && Number.isFinite(c) && Number.isFinite(A) && !Number.isFinite(a)) {
    a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(toRad(A)));
    B = toDeg(Math.acos(Math.min(1, Math.max(-1, (a * a + c * c - b * b) / (2 * a * c)))));
    C = 180 - A - B;
    return { a, b, c, A, B, C };
  }

  // ASA / AAS via law of sines
  if (Number.isFinite(A) && Number.isFinite(B) && Number.isFinite(C)) {
    const knownSide =
      Number.isFinite(a) ? ["a", a] : Number.isFinite(b) ? ["b", b] : Number.isFinite(c) ? ["c", c] : null;
    if (!knownSide) return null;
    const [, sideVal] = knownSide as [string, number];
    const angleFor = knownSide[0] === "a" ? A : knownSide[0] === "b" ? B : C;
    const ratio = sideVal / Math.sin(toRad(angleFor));
    a = ratio * Math.sin(toRad(A));
    b = ratio * Math.sin(toRad(B));
    c = ratio * Math.sin(toRad(C));
    return { a, b, c, A, B, C };
  }

  return null;
}

export function percentageMega(mode: string, a: number, b: number): number {
  switch (mode) {
    case "what_is": // what is a% of b
      return (a / 100) * b;
    case "is_what": // a is what % of b
      return b === 0 ? NaN : (a / b) * 100;
    case "percent_of": // a% of b is? same as what_is
      return (a / 100) * b;
    case "change": // % change from a to b
      return a === 0 ? NaN : ((b - a) / Math.abs(a)) * 100;
    default:
      return NaN;
  }
}

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(n: number): string {
  const x = Math.trunc(n);
  if (x <= 0 || x > 3999) return "";
  let rem = x;
  let out = "";
  for (const [val, sym] of ROMAN_MAP) {
    while (rem >= val) {
      out += sym;
      rem -= val;
    }
  }
  return out;
}

export function fromRoman(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const u = s.toUpperCase().replace(/[^IVXLCDM]/g, "");
  let total = 0;
  for (let i = 0; i < u.length; i++) {
    const cur = map[u[i]] ?? 0;
    const next = map[u[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}

export function convertBase(value: string, fromBase: number, toBase: number): string {
  const n = parseInt(value, fromBase);
  if (!Number.isFinite(n)) return "";
  return n.toString(toBase).toUpperCase();
}

export function meanAbsoluteDeviation(nums: number[]): number {
  if (!nums.length) return NaN;
  const m = nums.reduce((a, b) => a + b, 0) / nums.length;
  return nums.reduce((s, x) => s + Math.abs(x - m), 0) / nums.length;
}

export function stepsToDistance(steps: number, strideMeters: number): {
  km: number;
  miles: number;
  calories: number;
} {
  const meters = steps * strideMeters;
  const km = meters / 1000;
  const miles = meters / 1609.344;
  // ~0.04 kcal per step rough adult average
  const calories = steps * 0.04;
  return { km, miles, calories };
}

export function heartRateZones(age: number, resting = 60): {
  max: number;
  zones: { name: string; low: number; high: number }[];
} {
  const max = 220 - age;
  const reserve = max - resting;
  const zone = (lo: number, hi: number) => ({
    low: Math.round(resting + reserve * lo),
    high: Math.round(resting + reserve * hi),
  });
  return {
    max,
    zones: [
      { name: "Zone 1 (Recovery)", ...zone(0.5, 0.6) },
      { name: "Zone 2 (Fat burn)", ...zone(0.6, 0.7) },
      { name: "Zone 3 (Aerobic)", ...zone(0.7, 0.8) },
      { name: "Zone 4 (Threshold)", ...zone(0.8, 0.9) },
      { name: "Zone 5 (Max)", ...zone(0.9, 1.0) },
    ],
  };
}

export function sleepCycles(wakeTimeHours: number, wakeTimeMins: number): string[] {
  // Work backward in 90-min cycles + 15 min fall-asleep
  const wake = wakeTimeHours * 60 + wakeTimeMins;
  const fallAsleep = 15;
  const options: string[] = [];
  for (let cycles = 6; cycles >= 3; cycles--) {
    let bed = wake - fallAsleep - cycles * 90;
    if (bed < 0) bed += 24 * 60;
    const h = Math.floor(bed / 60) % 24;
    const m = bed % 60;
    options.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} (${cycles} cycles ≈ ${cycles * 1.5}h)`
    );
  }
  return options;
}

export function proteinNeed(weightKg: number, goal: string): number {
  const mult =
    goal === "athlete" ? 1.8 : goal === "lose" ? 1.6 : goal === "muscle" ? 2.0 : 0.8;
  return weightKg * mult;
}

export function bodySurfaceArea(weightKg: number, heightCm: number): number {
  // Mosteller: sqrt((cm * kg) / 3600)
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function pregnancyWeek(lmpIso: string, onIso?: string): {
  weeks: number;
  days: number;
  trimester: number;
} {
  const lmp = new Date(lmpIso);
  const on = onIso ? new Date(onIso) : new Date();
  const diff = Math.floor((on.getTime() - lmp.getTime()) / 86400000);
  const weeks = Math.floor(diff / 7);
  const days = diff % 7;
  const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
  return { weeks, days, trimester };
}

export function squareFootage(length: number, width: number, units: string): {
  area: number;
  unit: string;
} {
  const area = length * width;
  return { area, unit: units === "m" ? "m²" : "ft²" };
}

export function concreteVolume(
  lengthFt: number,
  widthFt: number,
  depthInches: number
): { cubicYards: number; cubicFeet: number } {
  const depthFt = depthInches / 12;
  const cubicFeet = lengthFt * widthFt * depthFt;
  return { cubicFeet, cubicYards: cubicFeet / 27 };
}

export function paintCoverage(
  wallArea: number,
  coats: number,
  coveragePerGallon: number
): number {
  if (coveragePerGallon <= 0) return NaN;
  return (wallArea * coats) / coveragePerGallon;
}

export function tileCalculator(
  roomArea: number,
  tileArea: number,
  wastePct: number
): { tiles: number; withWaste: number } {
  if (tileArea <= 0) return { tiles: NaN, withWaste: NaN };
  const tiles = Math.ceil(roomArea / tileArea);
  const withWaste = Math.ceil(tiles * (1 + wastePct / 100));
  return { tiles, withWaste };
}

export function stairStringer(
  totalRiseIn: number,
  targetRiserIn: number
): { risers: number; riserHeight: number; treads: number; runApprox: number } {
  const risers = Math.max(1, Math.round(totalRiseIn / targetRiserIn));
  const riserHeight = totalRiseIn / risers;
  const treads = risers - 1;
  const treadDepth = 10; // typical inches
  return { risers, riserHeight, treads, runApprox: treads * treadDepth };
}

export function fencePosts(lengthFt: number, spacingFt: number): number {
  if (spacingFt <= 0) return NaN;
  return Math.ceil(lengthFt / spacingFt) + 1;
}

export function roofPitch(rise: number, run: number): {
  pitchRatio: string;
  degrees: number;
  slopePct: number;
} {
  if (run === 0) return { pitchRatio: "—", degrees: NaN, slopePct: NaN };
  const degrees = (Math.atan(rise / run) * 180) / Math.PI;
  const slopePct = (rise / run) * 100;
  // Express as x/12
  const x = (rise / run) * 12;
  return { pitchRatio: `${x.toFixed(1)}/12`, degrees, slopePct };
}

export function recipeScale(
  originalServings: number,
  desiredServings: number,
  amounts: number[]
): number[] {
  if (originalServings <= 0) return amounts.map(() => NaN);
  const f = desiredServings / originalServings;
  return amounts.map((a) => a * f);
}

export function ovenTempConvert(value: number, from: string): {
  C: number;
  F: number;
  gasMark: string;
} {
  let C = value;
  if (from === "F") C = ((value - 32) * 5) / 9;
  else if (from === "gas") {
    // gas mark approx to C
    const map: Record<number, number> = {
      1: 140, 2: 150, 3: 160, 4: 180, 5: 190, 6: 200, 7: 220, 8: 230, 9: 240,
    };
    C = map[Math.round(value)] ?? 180;
  }
  const F = (C * 9) / 5 + 32;
  let gasMark = "—";
  if (C < 135) gasMark = "¼–½";
  else if (C < 145) gasMark = "1";
  else if (C < 155) gasMark = "2";
  else if (C < 170) gasMark = "3";
  else if (C < 185) gasMark = "4";
  else if (C < 195) gasMark = "5";
  else if (C < 210) gasMark = "6";
  else if (C < 225) gasMark = "7";
  else if (C < 235) gasMark = "8";
  else gasMark = "9";
  return { C, F, gasMark };
}

export const PRESSURE: Record<string, number> = {
  pa: 1,
  kpa: 1000,
  bar: 1e5,
  psi: 6894.757,
  atm: 101325,
  torr: 133.322,
  mmhg: 133.322,
};

export const ENERGY: Record<string, number> = {
  j: 1,
  kj: 1000,
  cal: 4.184,
  kcal: 4184,
  wh: 3600,
  kwh: 3.6e6,
  btu: 1055.06,
};

export const POWER: Record<string, number> = {
  w: 1,
  kw: 1000,
  hp: 745.7,
  mw: 1e6,
};

export function convertUnit(
  value: number,
  from: string,
  to: string,
  map: Record<string, number>
): number {
  const f = map[from];
  const t = map[to];
  if (f === undefined || t === undefined) return NaN;
  return (value * f) / t;
}

export function fuelEconomyConvert(value: number, from: string, to: string): number {
  // Store as L/100km
  let l100 = value;
  if (from === "mpg_us") l100 = 235.214583 / value;
  else if (from === "mpg_uk") l100 = 282.4809363 / value;
  else if (from === "kml") l100 = 100 / value;
  else if (from !== "l100") return NaN;
  if (to === "l100") return l100;
  if (to === "mpg_us") return 235.214583 / l100;
  if (to === "mpg_uk") return 282.4809363 / l100;
  if (to === "kml") return 100 / l100;
  return NaN;
}

/** Rough adult shoe size bridging (illustrative). */
export function shoeSizeConvert(size: number, from: string, to: string): number {
  // Convert to Mondopoint mm approx then out
  let mm = size;
  if (from === "us_m") mm = (size + 22) * 25.4 / 3; // rough
  else if (from === "us_w") mm = (size + 21) * 25.4 / 3;
  else if (from === "uk") mm = (size + 23) * 25.4 / 3;
  else if (from === "eu") mm = size * 6.67;
  else if (from === "cm") mm = size * 10;
  else if (from !== "mm") return NaN;
  if (to === "mm") return mm;
  if (to === "cm") return mm / 10;
  if (to === "eu") return mm / 6.67;
  if (to === "uk") return (mm * 3) / 25.4 - 23;
  if (to === "us_m") return (mm * 3) / 25.4 - 22;
  if (to === "us_w") return (mm * 3) / 25.4 - 21;
  return NaN;
}

export function businessDaysBetween(startIso: string, endIso: string): number {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (end < start) return -businessDaysBetween(endIso, startIso);
  let count = 0;
  const d = new Date(start);
  while (d <= end) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

export function zodiacSign(month: number, day: number): string {
  const signs: [string, number, number][] = [
    ["Capricorn", 1, 19],
    ["Aquarius", 2, 18],
    ["Pisces", 3, 20],
    ["Aries", 4, 19],
    ["Taurus", 5, 20],
    ["Gemini", 6, 20],
    ["Cancer", 7, 22],
    ["Leo", 8, 22],
    ["Virgo", 9, 22],
    ["Libra", 10, 22],
    ["Scorpio", 11, 21],
    ["Sagittarius", 12, 21],
    ["Capricorn", 12, 31],
  ];
  for (const [sign, m, d] of signs) {
    if (month < m || (month === m && day <= d)) return sign;
  }
  return "Capricorn";
}

export function paydayCalendar(
  startIso: string,
  frequencyDays: number,
  count: number
): string[] {
  const d = new Date(startIso);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + frequencyDays);
  }
  return out;
}

export function ohmsLaw(opts: {
  v?: number;
  i?: number;
  r?: number;
}): { v: number; i: number; r: number; p: number } | null {
  let { v = NaN, i = NaN, r = NaN } = opts;
  const known = [v, i, r].filter(Number.isFinite).length;
  if (known < 2) return null;
  if (!Number.isFinite(v) && Number.isFinite(i) && Number.isFinite(r)) v = i * r;
  if (!Number.isFinite(i) && Number.isFinite(v) && Number.isFinite(r) && r !== 0) i = v / r;
  if (!Number.isFinite(r) && Number.isFinite(v) && Number.isFinite(i) && i !== 0) r = v / i;
  const p = v * i;
  return { v, i, r, p };
}

export function density(mass: number, volume: number): number {
  if (volume === 0) return NaN;
  return mass / volume;
}

export function wavelength(frequencyHz: number, speed = 299792458): number {
  if (frequencyHz === 0) return NaN;
  return speed / frequencyHz;
}

export function freefall(opts: {
  height?: number;
  time?: number;
  g?: number;
}): { time: number; velocity: number; height: number } {
  const g = opts.g ?? 9.80665;
  let time = opts.time ?? NaN;
  let height = opts.height ?? NaN;
  if (Number.isFinite(height) && !Number.isFinite(time)) {
    time = Math.sqrt((2 * height) / g);
  }
  if (Number.isFinite(time) && !Number.isFinite(height)) {
    height = 0.5 * g * time * time;
  }
  const velocity = g * time;
  return { time, velocity, height };
}

export function powerVI(v: number, i: number): number {
  return v * i;
}

export function resistorSeries(ohms: number[]): number {
  return ohms.reduce((a, b) => a + b, 0);
}

export function resistorParallel(ohms: number[]): number {
  const inv = ohms.reduce((s, r) => (r === 0 ? Infinity : s + 1 / r), 0);
  return inv === 0 || !Number.isFinite(inv) ? NaN : 1 / inv;
}

export function momentum(mass: number, velocity: number): number {
  return mass * velocity;
}

export function capacitorEnergy(cFarads: number, vVolts: number): number {
  return 0.5 * cFarads * vVolts * vVolts;
}

export function gravelVolume(
  lengthFt: number,
  widthFt: number,
  depthInches: number
): { cubicYards: number; tonsApprox: number } {
  const cf = lengthFt * widthFt * (depthInches / 12);
  const cy = cf / 27;
  return { cubicYards: cy, tonsApprox: cy * 1.4 };
}

export function flooringCost(
  area: number,
  pricePerUnit: number,
  wastePct: number
): { material: number; withWaste: number } {
  const material = area * pricePerUnit;
  return { material, withWaste: material * (1 + wastePct / 100) };
}

export function idealWeightDevine(heightCm: number, sex: "male" | "female"): number {
  const inches = heightCm / 2.54;
  const over5 = Math.max(0, inches - 60);
  return sex === "male" ? 50 + 2.3 * over5 : 45.5 + 2.3 * over5;
}

export function idealWeightMiller(heightCm: number, sex: "male" | "female"): number {
  const inches = heightCm / 2.54;
  const over5 = Math.max(0, inches - 60);
  return sex === "male" ? 56.2 + 1.41 * over5 : 53.1 + 1.36 * over5;
}

export function caloriesBurned(
  met: number,
  weightKg: number,
  minutes: number
): number {
  // kcal ≈ MET * kg * hours
  return met * weightKg * (minutes / 60);
}

export function hoursBetween(startIso: string, endIso: string): number {
  const a = new Date(startIso).getTime();
  const b = new Date(endIso).getTime();
  return (b - a) / 3600000;
}

export function daysUntil(targetIso: string, fromIso?: string): number {
  const from = fromIso ? new Date(fromIso) : new Date();
  const target = new Date(targetIso);
  from.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - from.getTime()) / 86400000);
}

export function coneVolume(radius: number, height: number): number {
  return (1 / 3) * Math.PI * radius * radius * height;
}

export function pyramidVolume(baseArea: number, height: number): number {
  return (1 / 3) * baseArea * height;
}

export function trapezoidArea(a: number, b: number, height: number): number {
  return ((a + b) / 2) * height;
}

export function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}

export function radToDeg(r: number): number {
  return (r * 180) / Math.PI;
}

export function nthRoot(value: number, n: number): number {
  if (n === 0) return NaN;
  if (value < 0 && n % 2 === 0) return NaN;
  return Math.sign(value) * Math.pow(Math.abs(value), 1 / n);
}

export function cookingGramsToCups(grams: number, densityGPerCup: number): number {
  if (densityGPerCup <= 0) return NaN;
  return grams / densityGPerCup;
}

/** Yearly amortization summary from monthly schedule. */
export function amortizeYearlySummary(
  principal: number,
  annualRatePct: number,
  years: number
): Array<{
  year: number;
  interest: number;
  principal: number;
  payment: number;
  endBalance: number;
}> {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  const payment =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = principal;
  const yearsOut: Array<{
    year: number;
    interest: number;
    principal: number;
    payment: number;
    endBalance: number;
  }> = [];
  for (let y = 1; y <= years; y++) {
    let yi = 0;
    let yp = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      let principalPaid = payment - interest;
      if (principalPaid > balance) principalPaid = balance;
      balance = Math.max(0, balance - principalPaid);
      yi += interest;
      yp += principalPaid;
    }
    yearsOut.push({
      year: y,
      interest: yi,
      principal: yp,
      payment: payment * 12,
      endBalance: balance,
    });
  }
  return yearsOut;
}
