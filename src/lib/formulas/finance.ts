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
