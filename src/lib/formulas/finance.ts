/** Monthly mortgage / amortizing loan payment (P&I). */
export function mortgagePayment(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return NaN;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function simpleInterest(
  principal: number,
  ratePct: number,
  years: number
): { interest: number; total: number } {
  const interest = principal * (ratePct / 100) * years;
  return { interest, total: principal + interest };
}

export function compoundInterest(
  principal: number,
  ratePct: number,
  years: number,
  compoundsPerYear: number
): { interest: number; total: number } {
  const r = ratePct / 100;
  const n = compoundsPerYear;
  const total = principal * Math.pow(1 + r / n, n * years);
  return { interest: total - principal, total };
}

export function amortizeSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
  maxRows = 360
): Array<{
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const payment = mortgagePayment(principal, annualRatePct, years);
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  let balance = principal;
  const rows = [];
  for (let i = 1; i <= Math.min(n, maxRows); i++) {
    const interest = balance * r;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    rows.push({
      period: i,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });
  }
  return rows;
}

export function refinanceSavings(opts: {
  currentBalance: number;
  currentRate: number;
  currentYearsLeft: number;
  newRate: number;
  newYears: number;
  closingCosts: number;
}): {
  oldPayment: number;
  newPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
} {
  const oldPayment = mortgagePayment(
    opts.currentBalance,
    opts.currentRate,
    opts.currentYearsLeft
  );
  const newPayment = mortgagePayment(
    opts.currentBalance + opts.closingCosts,
    opts.newRate,
    opts.newYears
  );
  const monthlySavings = oldPayment - newPayment;
  const oldTotal = oldPayment * opts.currentYearsLeft * 12;
  const newTotal =
    newPayment * opts.newYears * 12 + opts.closingCosts;
  const lifetimeSavings = oldTotal - newTotal;
  const breakEvenMonths =
    monthlySavings > 0 ? opts.closingCosts / monthlySavings : Infinity;
  return {
    oldPayment,
    newPayment,
    monthlySavings,
    breakEvenMonths,
    lifetimeSavings,
  };
}

export function roi(
  initial: number,
  final: number
): { gain: number; roiPct: number } {
  const gain = final - initial;
  const roiPct = initial === 0 ? NaN : (gain / initial) * 100;
  return { gain, roiPct };
}

export function tipAmount(
  bill: number,
  tipPct: number,
  people = 1
): { tip: number; total: number; perPerson: number } {
  const tip = bill * (tipPct / 100);
  const total = bill + tip;
  return { tip, total, perPerson: total / Math.max(1, people) };
}

export function salesTax(
  amount: number,
  taxPct: number
): { tax: number; total: number } {
  const tax = amount * (taxPct / 100);
  return { tax, total: amount + tax };
}

export function discountPrice(
  original: number,
  discountPct: number
): { savings: number; final: number } {
  const savings = original * (discountPct / 100);
  return { savings, final: original - savings };
}

export function savingsGoalMonthly(
  goal: number,
  years: number,
  annualRatePct: number,
  current = 0
): number {
  const months = years * 12;
  if (months <= 0) return NaN;
  const r = annualRatePct / 100 / 12;
  const fvCurrent = current * Math.pow(1 + r, months);
  const need = goal - fvCurrent;
  if (need <= 0) return 0;
  if (r === 0) return need / months;
  return (need * r) / (Math.pow(1 + r, months) - 1);
}

export function retirementNestEgg(
  monthlyContribution: number,
  years: number,
  annualReturnPct: number,
  starting = 0
): number {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  const fvStart = starting * Math.pow(1 + r, n);
  if (r === 0) return fvStart + monthlyContribution * n;
  const fvContrib =
    monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
  return fvStart + fvContrib;
}

export function apyFromApr(aprPct: number, compoundsPerYear: number): number {
  const r = aprPct / 100;
  const n = compoundsPerYear;
  return (Math.pow(1 + r / n, n) - 1) * 100;
}

export function debtPayoffMonths(
  balance: number,
  annualRatePct: number,
  monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } {
  const r = annualRatePct / 100 / 12;
  if (monthlyPayment <= 0 || balance <= 0) return { months: NaN, totalInterest: NaN, totalPaid: NaN };
  if (r === 0) {
    const months = Math.ceil(balance / monthlyPayment);
    return { months, totalInterest: 0, totalPaid: balance };
  }
  if (monthlyPayment <= balance * r) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  const months =
    Math.log(monthlyPayment / (monthlyPayment - balance * r)) /
    Math.log(1 + r);
  const totalPaid = monthlyPayment * months;
  return {
    months: Math.ceil(months),
    totalInterest: totalPaid - balance,
    totalPaid,
  };
}

export function breakEvenUnits(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): number {
  const contrib = pricePerUnit - variableCostPerUnit;
  if (contrib <= 0) return Infinity;
  return fixedCosts / contrib;
}

export function gstVat(
  amount: number,
  ratePct: number,
  mode: "exclusive" | "inclusive"
): { tax: number; net: number; gross: number } {
  if (mode === "exclusive") {
    const tax = amount * (ratePct / 100);
    return { tax, net: amount, gross: amount + tax };
  }
  const net = amount / (1 + ratePct / 100);
  const tax = amount - net;
  return { tax, net, gross: amount };
}

export function cdFutureValue(
  principal: number,
  apyPct: number,
  years: number
): number {
  return principal * Math.pow(1 + apyPct / 100, years);
}

/** Continuous compounding: A = P * e^(rt) */
export function continuousCompound(
  principal: number,
  ratePct: number,
  years: number
): { total: number; interest: number } {
  const total = principal * Math.exp((ratePct / 100) * years);
  return { total, interest: total - principal };
}

/** Effective annual rate from nominal rate compounded n times (or continuous). */
export function effectiveAnnualRate(
  nominalPct: number,
  compoundsPerYear: number | "continuous"
): number {
  const r = nominalPct / 100;
  if (compoundsPerYear === "continuous") {
    return (Math.exp(r) - 1) * 100;
  }
  const n = compoundsPerYear;
  if (n <= 0) return NaN;
  return (Math.pow(1 + r / n, n) - 1) * 100;
}

/** Year-by-year growth schedule for discrete or continuous compounding. */
export function compoundingSchedule(
  principal: number,
  ratePct: number,
  years: number,
  compoundsPerYear: number | "continuous"
): Array<{ year: number; balance: number; interestThatYear: number }> {
  const rows: Array<{ year: number; balance: number; interestThatYear: number }> = [];
  let prev = principal;
  const yMax = Math.min(Math.ceil(years), 50);
  for (let y = 1; y <= yMax; y++) {
    const t = Math.min(y, years);
    let bal: number;
    if (compoundsPerYear === "continuous") {
      bal = principal * Math.exp((ratePct / 100) * t);
    } else {
      const n = compoundsPerYear;
      bal = principal * Math.pow(1 + ratePct / 100 / n, n * t);
    }
    rows.push({ year: y, balance: bal, interestThatYear: bal - prev });
    prev = bal;
  }
  return rows;
}

/** SIP / recurring investment future value (end-of-period deposits). */
export function sipFutureValue(
  monthlyInvestment: number,
  annualRatePct: number,
  years: number
): { total: number; invested: number; gains: number } {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  const invested = monthlyInvestment * n;
  let total: number;
  if (r === 0) total = invested;
  else total = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { total, invested, gains: total - invested };
}

export function ruleOf72(ratePct: number): number {
  if (ratePct <= 0) return NaN;
  return 72 / ratePct;
}

export function cagr(
  beginValue: number,
  endValue: number,
  years: number
): number {
  if (beginValue <= 0 || years <= 0) return NaN;
  return (Math.pow(endValue / beginValue, 1 / years) - 1) * 100;
}

/** Adjust amount across years using annual inflation (forward or backward). */
export function inflationAdjust(
  amount: number,
  inflationPct: number,
  years: number,
  direction: "future" | "past"
): number {
  const factor = Math.pow(1 + inflationPct / 100, years);
  return direction === "future" ? amount * factor : amount / factor;
}

/** Simple NPV of cash flows at periods 0..n with flat discount rate. */
export function npv(ratePct: number, cashFlows: number[]): number {
  const r = ratePct / 100;
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + r, t), 0);
}

export function salaryHike(
  current: number,
  hikePct: number
): { newSalary: number; increase: number } {
  const increase = current * (hikePct / 100);
  return { newSalary: current + increase, increase };
}

/**
 * EMI with optional fixed extra monthly payment — returns payoff months and interest saved vs base EMI.
 */
export function emiWithExtra(opts: {
  principal: number;
  annualRatePct: number;
  years: number;
  extraMonthly: number;
}): {
  baseEmi: number;
  payoffMonths: number;
  totalInterest: number;
  interestSaved: number;
  monthsSaved: number;
} {
  const baseEmi = mortgagePayment(opts.principal, opts.annualRatePct, opts.years);
  const r = opts.annualRatePct / 100 / 12;
  const baseMonths = opts.years * 12;
  const baseTotalInterest = baseEmi * baseMonths - opts.principal;

  const payment = baseEmi + Math.max(0, opts.extraMonthly);
  if (payment <= 0) {
    return {
      baseEmi,
      payoffMonths: NaN,
      totalInterest: NaN,
      interestSaved: NaN,
      monthsSaved: NaN,
    };
  }

  let balance = opts.principal;
  let months = 0;
  let totalInterest = 0;
  const maxIter = baseMonths + 600;
  while (balance > 0.01 && months < maxIter) {
    const interest = balance * r;
    let principalPaid = payment - interest;
    if (principalPaid <= 0 && r > 0) {
      return {
        baseEmi,
        payoffMonths: Infinity,
        totalInterest: Infinity,
        interestSaved: NaN,
        monthsSaved: NaN,
      };
    }
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    totalInterest += interest;
    months++;
  }

  return {
    baseEmi,
    payoffMonths: months,
    totalInterest,
    interestSaved: baseTotalInterest - totalInterest,
    monthsSaved: baseMonths - months,
  };
}

/** Convert years + months + days into a calendar-day horizon (365 / 30 convention). */
export function totalDaysFromYMD(
  years: number,
  months: number,
  days: number
): number {
  const y = Number.isFinite(years) ? years : 0;
  const m = Number.isFinite(months) ? months : 0;
  const d = Number.isFinite(days) ? days : 0;
  return Math.max(0, Math.floor(y * 365 + m * 30 + d));
}

export type DailyCompoundRateMode = "daily" | "annual";
export type DailyDepositFrequency = "none" | "daily" | "monthly";

export interface DailyCompoundOptions {
  principal: number;
  /** Percent figure — daily % if rateMode is "daily", else annual %. */
  ratePct: number;
  rateMode: DailyCompoundRateMode;
  /** Calendar-day horizon (include weekends in the span even if excludeWeekends). */
  totalDays: number;
  /** Share of each day's interest kept invested (0–100). Default 100. */
  reinvestPct?: number;
  depositAmount?: number;
  depositFrequency?: DailyDepositFrequency;
  /** When true, interest (and daily deposits) apply Mon–Fri only within the span. */
  excludeWeekends?: boolean;
  /** First calendar day of the horizon. Defaults to 2024-01-01 (Monday). */
  startDate?: Date;
}

export interface DailyCompoundPoint {
  /** 1-based compounding step index (business days when weekends excluded). */
  step: number;
  /** Calendar day index within the horizon (1..totalDays). */
  calendarDay: number;
  balance: number;
  interestThatDay: number;
  cashWithdrawnThatDay: number;
  depositThatDay: number;
  cumulativeInterest: number;
  cumulativeWithdrawn: number;
  cumulativeDeposits: number;
}

export interface DailyCompoundSnapshot {
  label: string;
  calendarDay: number;
  balance: number;
  cumulativeInterest: number;
  cumulativeWithdrawn: number;
  cumulativeDeposits: number;
}

export interface DailyCompoundResult {
  futureValue: number;
  /** All interest generated (reinvested + withdrawn). */
  totalInterest: number;
  /** Principal + additional deposits. */
  totalDeposits: number;
  additionalDeposits: number;
  cashWithdrawn: number;
  /** (FV + cash withdrawn − total deposits) / total deposits × 100. */
  effectiveGrowthPct: number;
  compoundingDays: number;
  dailyRate: number;
  points: DailyCompoundPoint[];
  snapshots: DailyCompoundSnapshot[];
}

function addCalendarDays(start: Date, days: number): Date {
  const d = new Date(start.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function isWeekendUTC(d: Date): boolean {
  const day = d.getUTCDay();
  return day === 0 || day === 6;
}

/**
 * Day-by-day daily compound interest engine.
 * Deposits are applied at end of period. Partial reinvest withdraws (1 − reinvest%) of each day's interest as cash.
 */
export function dailyCompoundInterest(
  opts: DailyCompoundOptions
): DailyCompoundResult {
  const principal = opts.principal;
  const totalDays = Math.max(0, Math.floor(opts.totalDays));
  const reinvestFrac = Math.min(
    1,
    Math.max(0, (opts.reinvestPct ?? 100) / 100)
  );
  const depositAmount = opts.depositAmount ?? 0;
  const depositFrequency = opts.depositFrequency ?? "none";
  const excludeWeekends = Boolean(opts.excludeWeekends);
  const start = opts.startDate
    ? new Date(
        Date.UTC(
          opts.startDate.getUTCFullYear(),
          opts.startDate.getUTCMonth(),
          opts.startDate.getUTCDate()
        )
      )
    : new Date(Date.UTC(2024, 0, 1)); // Monday

  const dailyRate =
    opts.rateMode === "daily"
      ? opts.ratePct / 100
      : opts.ratePct / 100 / 365;

  let balance = principal;
  let cumulativeInterest = 0;
  let cumulativeWithdrawn = 0;
  let cumulativeDeposits = 0;
  let compoundingDays = 0;
  const points: DailyCompoundPoint[] = [];

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(dailyRate) ||
    principal < 0 ||
    dailyRate < -0.99
  ) {
    return {
      futureValue: NaN,
      totalInterest: NaN,
      totalDeposits: NaN,
      additionalDeposits: NaN,
      cashWithdrawn: NaN,
      effectiveGrowthPct: NaN,
      compoundingDays: 0,
      dailyRate,
      points: [],
      snapshots: [],
    };
  }

  for (let calendarDay = 1; calendarDay <= totalDays; calendarDay++) {
    const date = addCalendarDays(start, calendarDay - 1);
    const weekend = isWeekendUTC(date);
    const compoundsToday = !excludeWeekends || !weekend;

    let interestThatDay = 0;
    let cashWithdrawnThatDay = 0;
    let depositThatDay = 0;

    if (compoundsToday) {
      interestThatDay = balance * dailyRate;
      const reinvested = interestThatDay * reinvestFrac;
      cashWithdrawnThatDay = interestThatDay - reinvested;
      balance += reinvested;
      cumulativeInterest += interestThatDay;
      cumulativeWithdrawn += cashWithdrawnThatDay;
      compoundingDays += 1;

      if (depositFrequency === "daily" && depositAmount !== 0) {
        depositThatDay += depositAmount;
        balance += depositAmount;
        cumulativeDeposits += depositAmount;
      }
    }

    if (
      depositFrequency === "monthly" &&
      depositAmount !== 0 &&
      calendarDay % 30 === 0
    ) {
      depositThatDay += depositAmount;
      balance += depositAmount;
      cumulativeDeposits += depositAmount;
    }

    points.push({
      step: compoundingDays,
      calendarDay,
      balance,
      interestThatDay,
      cashWithdrawnThatDay,
      depositThatDay,
      cumulativeInterest,
      cumulativeWithdrawn,
      cumulativeDeposits,
    });
  }

  const totalDeposits = principal + cumulativeDeposits;
  const netGain = balance + cumulativeWithdrawn - totalDeposits;
  const effectiveGrowthPct =
    totalDeposits > 0 ? (netGain / totalDeposits) * 100 : NaN;

  const snapshots = buildDailyCompoundSnapshots(points, totalDays);

  return {
    futureValue: balance,
    totalInterest: cumulativeInterest,
    totalDeposits,
    additionalDeposits: cumulativeDeposits,
    cashWithdrawn: cumulativeWithdrawn,
    effectiveGrowthPct,
    compoundingDays,
    dailyRate,
    points,
    snapshots,
  };
}

function buildDailyCompoundSnapshots(
  points: DailyCompoundPoint[],
  totalDays: number
): DailyCompoundSnapshot[] {
  if (points.length === 0) return [];
  const targets = new Set<number>();
  targets.add(1);
  targets.add(totalDays);
  const step =
    totalDays <= 31
      ? 1
      : totalDays <= 120
        ? 7
        : totalDays <= 730
          ? 30
          : 90;
  for (let d = step; d < totalDays; d += step) targets.add(d);
  // Always include ~year boundaries for multi-year runs
  for (let y = 365; y < totalDays; y += 365) targets.add(y);

  const sorted = [...targets].sort((a, b) => a - b);
  return sorted
    .map((d) => points[d - 1])
    .filter(Boolean)
    .map((p) => ({
      label:
        p.calendarDay === totalDays
          ? `Day ${p.calendarDay} (end)`
          : `Day ${p.calendarDay}`,
      calendarDay: p.calendarDay,
      balance: p.balance,
      cumulativeInterest: p.cumulativeInterest,
      cumulativeWithdrawn: p.cumulativeWithdrawn,
      cumulativeDeposits: p.cumulativeDeposits,
    }));
}

/** Downsample balance series for charts (keeps first/last). */
export function sampleDailyCompoundPoints(
  points: DailyCompoundPoint[],
  maxPoints = 90
): Array<{ day: number; balance: number; withdrawn: number; deposits: number }> {
  if (points.length <= maxPoints) {
    return points.map((p) => ({
      day: p.calendarDay,
      balance: p.balance,
      withdrawn: p.cumulativeWithdrawn,
      deposits: p.cumulativeDeposits,
    }));
  }
  const out: Array<{
    day: number;
    balance: number;
    withdrawn: number;
    deposits: number;
  }> = [];
  const last = points.length - 1;
  for (let i = 0; i < maxPoints; i++) {
    const idx =
      i === maxPoints - 1 ? last : Math.round((i * last) / (maxPoints - 1));
    const p = points[idx];
    out.push({
      day: p.calendarDay,
      balance: p.balance,
      withdrawn: p.cumulativeWithdrawn,
      deposits: p.cumulativeDeposits,
    });
  }
  return out;
}
