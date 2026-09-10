import type { CalculatorMeta } from "../types";
import {
  creditCardPayoff,
  leaseVsBuy,
  rentVsBuy,
  budgetPercent,
  roughPaycheck,
  investmentReturn,
  bondCurrentYield,
  bondYtmApprox,
  forexPositionSize,
  gstInvoiceSplit,
  dividendYield,
  peRatio,
  interestOnlyPayment,
  loanAffordability,
  downPaymentNeeded,
  matrix2x2Det,
  binomialProbability,
  triangleSolve,
  percentageMega,
  toRoman,
  fromRoman,
  convertBase,
  meanAbsoluteDeviation,
  stepsToDistance,
  heartRateZones,
  sleepCycles,
  proteinNeed,
  bodySurfaceArea,
  pregnancyWeek,
  squareFootage,
  concreteVolume,
  paintCoverage,
  tileCalculator,
  stairStringer,
  fencePosts,
  roofPitch,
  recipeScale,
  ovenTempConvert,
  PRESSURE,
  ENERGY,
  POWER,
  convertUnit,
  fuelEconomyConvert,
  shoeSizeConvert,
  businessDaysBetween,
  zodiacSign,
  paydayCalendar,
  ohmsLaw,
  density,
  wavelength,
  freefall,
  powerVI,
  resistorSeries,
  resistorParallel,
  momentum,
  capacitorEnergy,
  gravelVolume,
  flooringCost,
  idealWeightDevine,
  idealWeightMiller,
  caloriesBurned,
  hoursBetween,
  daysUntil,
  coneVolume,
  pyramidVolume,
  trapezoidArea,
  degToRad,
  radToDeg,
  nthRoot,
  cookingGramsToCups,
} from "../formulas/catalog";
import { mortgagePayment, apyFromApr } from "../formulas/finance";
import { idealWeightRobinson } from "../formulas/health";
import {
  requireNums,
  fmtMoney,
  fmtNumber,
  fmtPercent,
  parseNum,
  parseList,
  err,
  ok,
} from "./helpers";

export const extraCalculators: CalculatorMeta[] = [
  {
    slug: "credit-card-payoff",
    category: "finance",
    name: "Credit Card Payoff Calculator",
    description: "Estimate months and interest to pay off a credit card balance with fixed monthly payments.",
    keywords: ["credit card", "payoff", "debt", "apr"],
    popular: true,
    formulaNote: "Month-by-month amortization at APR/12.",
    fields: [{ id: "balance", label: "Balance", type: "number", defaultValue: 5000, prefix: "$" }, { id: "apr", label: "APR", type: "number", defaultValue: 22.9, suffix: "%", step: 0.1 }, { id: "payment", label: "Monthly payment", type: "number", defaultValue: 200, prefix: "$" }],
    related: ["debt-payoff", "loan-emi", "student-loan-payoff"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["balance", "apr", "payment"]);
      if (!parsed.ok) return err(parsed.error);
      const r = creditCardPayoff(parsed.n.balance, parsed.n.apr, parsed.n.payment);
      if (!Number.isFinite(r.months)) return err("Payment is too low to cover interest — increase payment.");
      return ok([
        { label: "Months to payoff", value: String(r.months), emphasize: true },
        { label: "Years", value: fmtNumber(r.months / 12, 1) },
        { label: "Total interest", value: fmtMoney(r.totalInterest) },
        { label: "Total paid", value: fmtMoney(r.totalPaid) },
      ]);
    },
  },
  {
    slug: "lease-vs-buy",
    category: "finance",
    name: "Lease vs Buy Calculator",
    description: "Compare cash outlay for leasing a car versus buying with a loan.",
    keywords: ["lease", "buy", "car", "auto"],
    formulaNote: "Illustrative cash comparison; ignores tax and mileage penalties.",
    fields: [{ id: "carPrice", label: "Car price", type: "number", defaultValue: 35000, prefix: "$" }, { id: "downPayment", label: "Down payment (buy)", type: "number", defaultValue: 5000, prefix: "$" }, { id: "loanRate", label: "Loan APR", type: "number", defaultValue: 6.5, suffix: "%" }, { id: "loanYears", label: "Loan term", type: "number", defaultValue: 5, suffix: "years" }, { id: "leasePayment", label: "Lease monthly", type: "number", defaultValue: 399, prefix: "$" }, { id: "leaseMonths", label: "Lease months", type: "number", defaultValue: 36 }, { id: "leaseDown", label: "Lease due at signing", type: "number", defaultValue: 2000, prefix: "$" }, { id: "residual", label: "Est. residual / resale", type: "number", defaultValue: 18000, prefix: "$" }],
    related: ["loan-emi", "rent-vs-buy", "car-loan"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["carPrice","downPayment","loanRate","loanYears","leasePayment","leaseMonths","leaseDown","residual"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = leaseVsBuy({ carPrice: n.carPrice, downPayment: n.downPayment, loanRatePct: n.loanRate, loanYears: n.loanYears, leasePayment: n.leasePayment, leaseMonths: n.leaseMonths, leaseDown: n.leaseDown, residualValue: n.residual });
      return ok([
        { label: "Buy total payments", value: fmtMoney(r.buyTotal) },
        { label: "Buy net (minus residual)", value: fmtMoney(r.buyEffective), emphasize: true },
        { label: "Lease total cash", value: fmtMoney(r.leaseTotal) },
        { label: "Suggestion", value: r.better },
      ]);
    },
  },
  {
    slug: "rent-vs-buy",
    category: "finance",
    name: "Rent vs Buy Calculator",
    description: "Rough monthly cost and equity estimate for renting versus buying a home.",
    keywords: ["rent", "buy", "home", "housing"],
    featured: true,
    formulaNote: "Educational estimate only \u2014 not a substitute for a housing advisor.",
    fields: [{ id: "homePrice", label: "Home price", type: "number", defaultValue: 400000, prefix: "$" }, { id: "downPct", label: "Down payment", type: "number", defaultValue: 20, suffix: "%" }, { id: "rate", label: "Mortgage rate", type: "number", defaultValue: 6.5, suffix: "%" }, { id: "years", label: "Horizon", type: "number", defaultValue: 7, suffix: "years" }, { id: "rent", label: "Monthly rent", type: "number", defaultValue: 2200, prefix: "$" }, { id: "tax", label: "Property tax / year", type: "number", defaultValue: 4800, prefix: "$" }, { id: "maint", label: "Maintenance / year", type: "number", defaultValue: 3000, prefix: "$" }, { id: "appr", label: "Expected appreciation", type: "number", defaultValue: 3, suffix: "%" }],
    related: ["mortgage", "lease-vs-buy", "down-payment"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["homePrice","downPct","rate","years","rent","tax","maint","appr"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = rentVsBuy({ homePrice: n.homePrice, downPct: n.downPct, mortgageRatePct: n.rate, years: n.years, monthlyRent: n.rent, propertyTaxAnnual: n.tax, maintenanceAnnual: n.maint, expectedAppreciationPct: n.appr });
      return ok([
        { label: "Est. monthly ownership", value: fmtMoney(r.monthlyOwn), emphasize: true },
        { label: "Monthly rent", value: fmtMoney(r.monthlyRent) },
        { label: "Monthly difference", value: fmtMoney(r.monthlyOwn - r.monthlyRent) },
        { label: "Est. equity at horizon", value: fmtMoney(r.equityEstimate) },
        { label: "Note", value: r.note },
      ]);
    },
  },
  {
    slug: "budget-percent",
    category: "finance",
    name: "Budget Percentage Calculator",
    description: "See what share of income goes to expenses and what remains to save.",
    keywords: ["budget", "spending", "income"],
    fields: [{ id: "income", label: "Monthly income", type: "number", defaultValue: 5000, prefix: "$" }, { id: "expenses", label: "Monthly expenses", type: "number", defaultValue: 3500, prefix: "$" }],
    related: ["savings-goal", "paycheck-estimator"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["income","expenses"]);
      if (!parsed.ok) return err(parsed.error);
      const r = budgetPercent(parsed.n.income, parsed.n.expenses);
      return ok([
        { label: "Remaining", value: fmtMoney(r.remaining), emphasize: true },
        { label: "Spent", value: fmtPercent(r.spentPct) },
        { label: "Saved / leftover", value: fmtPercent(r.savePct) },
      ]);
    },
  },
  {
    slug: "paycheck-estimator",
    category: "finance",
    name: "Paycheck / Tax Rough Estimator",
    description: "Very rough net paycheck from flat withholding percentages. Not tax advice (US/IN/elsewhere).",
    keywords: ["paycheck", "salary", "tax", "net pay"],
    formulaNote: "DISCLAIMER: Flat % model only. Real taxes use brackets and deductions. Not professional advice.",
    fields: [{ id: "gross", label: "Gross annual", type: "number", defaultValue: 75000, prefix: "$" }, { id: "periods", label: "Pay periods / year", type: "number", defaultValue: 26, helpText: "26 biweekly, 24 semi-monthly, 12 monthly" }, { id: "federal", label: "Federal / central tax %", type: "number", defaultValue: 12, suffix: "%" }, { id: "state", label: "State / local %", type: "number", defaultValue: 5, suffix: "%" }, { id: "other", label: "Other (FICA/PF/etc) %", type: "number", defaultValue: 7.65, suffix: "%" }],
    related: ["salary-hike", "hourly-to-salary", "budget-percent"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["gross","periods","federal","state","other"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = roughPaycheck({ grossAnnual: n.gross, payPeriods: n.periods, federalPct: n.federal, statePct: n.state, otherPct: n.other });
      return ok([
        { label: "Net per paycheck", value: fmtMoney(r.netPerPeriod), emphasize: true },
        { label: "Gross per paycheck", value: fmtMoney(r.grossPerPeriod) },
        { label: "Total withholding %", value: fmtPercent(r.totalTaxPct) },
        { label: "Est. net annual", value: fmtMoney(r.netAnnual) },
        { label: "Disclaimer", value: "Rough flat-rate model — not US/IN tax filing advice." },
      ]);
    },
  },
  {
    slug: "investment-return",
    category: "finance",
    name: "Investment Return Calculator",
    description: "Project future value with starting principal, return rate, and monthly contributions.",
    keywords: ["investment", "return", "portfolio", "growth"],
    popular: true,
    fields: [{ id: "principal", label: "Starting amount", type: "number", defaultValue: 10000, prefix: "$" }, { id: "rate", label: "Annual return", type: "number", defaultValue: 8, suffix: "%" }, { id: "years", label: "Years", type: "number", defaultValue: 15 , suffix: "years"}, { id: "monthly", label: "Monthly contribution", type: "number", defaultValue: 300, prefix: "$" }],
    related: ["compound-interest", "sip", "cagr"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["principal","rate","years","monthly"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = investmentReturn(n.principal, n.rate, n.years, n.monthly);
      return ok([
        { label: "Future value", value: fmtMoney(r.futureValue), emphasize: true },
        { label: "Total contributed", value: fmtMoney(r.contributed) },
        { label: "Growth", value: fmtMoney(r.growth) },
      ]);
    },
  },
  {
    slug: "bond-yield",
    category: "finance",
    name: "Bond Yield Calculator",
    description: "Current yield and approximate yield-to-maturity for a simple coupon bond.",
    keywords: ["bond", "yield", "ytm", "coupon"],
    formulaNote: "YTM uses the common textbook approximation.",
    fields: [{ id: "face", label: "Face value", type: "number", defaultValue: 1000, prefix: "$" }, { id: "price", label: "Market price", type: "number", defaultValue: 950, prefix: "$" }, { id: "coupon", label: "Annual coupon", type: "number", defaultValue: 50, prefix: "$" }, { id: "years", label: "Years to maturity", type: "number", defaultValue: 10 , suffix: "years"}],
    related: ["dividend-yield", "pe-ratio", "investment-return"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["face","price","coupon","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([
        { label: "Current yield", value: fmtPercent(bondCurrentYield(n.coupon, n.price)), emphasize: true },
        { label: "Approx YTM", value: fmtPercent(bondYtmApprox(n.face, n.price, n.coupon, n.years)) },
      ]);
    },
  },
  {
    slug: "forex-position-size",
    category: "finance",
    name: "Forex Position Size Calculator",
    description: "Size a forex trade from account risk %, stop distance, and pip value.",
    keywords: ["forex", "position size", "pips", "risk"],
    formulaNote: "Educational risk sizing \u2014 not trading advice.",
    fields: [{ id: "account", label: "Account equity", type: "number", defaultValue: 10000, prefix: "$" }, { id: "risk", label: "Risk per trade", type: "number", defaultValue: 1, suffix: "%" }, { id: "stop", label: "Stop loss (pips)", type: "number", defaultValue: 20 }, { id: "pip", label: "Pip value per standard lot", type: "number", defaultValue: 10, prefix: "$" }],
    related: ["investment-return", "risk-reward"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["account","risk","stop","pip"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = forexPositionSize({ account: n.account, riskPct: n.risk, stopPips: n.stop, pipValuePerLot: n.pip });
      return ok([
        { label: "Risk amount", value: fmtMoney(r.riskAmount) },
        { label: "Position size (lots)", value: fmtNumber(r.lots, 3), emphasize: true },
      ]);
    },
  },
  {
    slug: "gst-invoice-split",
    category: "finance",
    name: "GST Invoice Split Calculator",
    description: "Split a GST-inclusive invoice into taxable value and tax amount.",
    keywords: ["gst", "invoice", "vat"],
    fields: [{ id: "total", label: "Invoice total (incl. GST)", type: "number", defaultValue: 1180, prefix: "$" }, { id: "rate", label: "GST rate", type: "number", defaultValue: 18, suffix: "%" }],
    related: ["gst-vat", "sales-tax"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["total","rate"]);
      if (!parsed.ok) return err(parsed.error);
      const r = gstInvoiceSplit(parsed.n.total, parsed.n.rate);
      return ok([
        { label: "Taxable value", value: fmtMoney(r.taxable), emphasize: true },
        { label: "GST amount", value: fmtMoney(r.gst) },
        { label: "Gross", value: fmtMoney(r.total) },
      ]);
    },
  },
  {
    slug: "dividend-yield",
    category: "finance",
    name: "Dividend Yield Calculator",
    description: "Annual dividend yield from dividend per share and share price.",
    keywords: ["dividend", "yield", "stock"],
    fields: [{ id: "div", label: "Annual dividend / share", type: "number", defaultValue: 2.4, prefix: "$", step: 0.01 }, { id: "price", label: "Share price", type: "number", defaultValue: 60, prefix: "$" }],
    related: ["pe-ratio", "bond-yield"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["div","price"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Dividend yield", value: fmtPercent(dividendYield(parsed.n.div, parsed.n.price)), emphasize: true }]);
    },
  },
  {
    slug: "pe-ratio",
    category: "finance",
    name: "P/E Ratio Calculator",
    description: "Price-to-earnings ratio from share price and earnings per share.",
    keywords: ["pe", "p/e", "valuation"],
    fields: [{ id: "price", label: "Share price", type: "number", defaultValue: 150, prefix: "$" }, { id: "eps", label: "EPS", type: "number", defaultValue: 5, prefix: "$", step: 0.01 }],
    related: ["dividend-yield", "roi"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["price","eps"]);
      if (!parsed.ok) return err(parsed.error);
      const pe = peRatio(parsed.n.price, parsed.n.eps);
      if (!Number.isFinite(pe)) return err("EPS cannot be zero.");
      return ok([{ label: "P/E ratio", value: fmtNumber(pe, 2), emphasize: true }]);
    },
  },
  {
    slug: "interest-only-mortgage",
    category: "finance",
    name: "Interest-Only Mortgage Calculator",
    description: "Monthly interest-only payment for a mortgage principal and rate.",
    keywords: ["interest only", "mortgage"],
    fields: [{ id: "principal", label: "Principal", type: "number", defaultValue: 400000, prefix: "$" }, { id: "rate", label: "Annual rate", type: "number", defaultValue: 6.25, suffix: "%" }],
    related: ["mortgage", "amortization"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["principal","rate"]);
      if (!parsed.ok) return err(parsed.error);
      const pmt = interestOnlyPayment(parsed.n.principal, parsed.n.rate);
      return ok([
        { label: "Monthly IO payment", value: fmtMoney(pmt), emphasize: true },
        { label: "Annual interest", value: fmtMoney(pmt * 12) },
      ]);
    },
  },
  {
    slug: "loan-affordability",
    category: "finance",
    name: "Loan Affordability Calculator",
    description: "Estimate max loan from income, debts, DTI limit, rate, and term.",
    keywords: ["affordability", "dti", "prequalify"],
    popular: true,
    fields: [{ id: "income", label: "Monthly gross income", type: "number", defaultValue: 7000, prefix: "$" }, { id: "debts", label: "Other monthly debts", type: "number", defaultValue: 500, prefix: "$" }, { id: "dti", label: "Max DTI", type: "number", defaultValue: 36, suffix: "%" }, { id: "rate", label: "Interest rate", type: "number", defaultValue: 6.5, suffix: "%" }, { id: "years", label: "Term", type: "number", defaultValue: 30, suffix: "years" }],
    related: ["mortgage", "down-payment"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["income","debts","dti","rate","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = loanAffordability(n.income, n.debts, n.dti, n.rate, n.years);
      return ok([
        { label: "Max monthly P&I", value: fmtMoney(r.maxPayment) },
        { label: "Max loan amount", value: fmtMoney(r.maxLoan), emphasize: true },
      ]);
    },
  },
  {
    slug: "down-payment",
    category: "finance",
    name: "Down Payment Calculator",
    description: "Calculate down payment and loan amount from price and percent.",
    keywords: ["down payment", "deposit"],
    fields: [{ id: "price", label: "Purchase price", type: "number", defaultValue: 450000, prefix: "$" }, { id: "pct", label: "Down payment %", type: "number", defaultValue: 20, suffix: "%" }],
    related: ["mortgage", "loan-affordability"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["price","pct"]);
      if (!parsed.ok) return err(parsed.error);
      const r = downPaymentNeeded(parsed.n.price, parsed.n.pct);
      return ok([
        { label: "Down payment", value: fmtMoney(r.down), emphasize: true },
        { label: "Loan amount", value: fmtMoney(r.loan) },
      ]);
    },
  },
  {
    slug: "car-loan",
    category: "finance",
    name: "Car Loan Calculator",
    description: "Monthly payment and total interest for an auto loan.",
    keywords: ["car loan", "auto loan"],
    popular: true,
    fields: [{ id: "price", label: "Vehicle price", type: "number", defaultValue: 28000, prefix: "$" }, { id: "down", label: "Down payment", type: "number", defaultValue: 3000, prefix: "$" }, { id: "rate", label: "APR", type: "number", defaultValue: 5.9, suffix: "%" }, { id: "months", label: "Term", type: "number", defaultValue: 60, suffix: "months" }],
    related: ["loan-emi", "lease-vs-buy"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["price","down","rate","months"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const principal = Math.max(0, n.price - n.down);
      const pmt = mortgagePayment(principal, n.rate, n.months / 12);
      return ok([
        { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
        { label: "Amount financed", value: fmtMoney(principal) },
        { label: "Total interest", value: fmtMoney(pmt * n.months - principal) },
      ]);
    },
  },
  {
    slug: "student-loan-payoff",
    category: "finance",
    name: "Student Loan Payoff Calculator",
    description: "Estimate payoff time and interest for student debt with fixed payments.",
    keywords: ["student loan", "education loan"],
    fields: [{ id: "balance", label: "Balance", type: "number", defaultValue: 35000, prefix: "$" }, { id: "rate", label: "Interest rate", type: "number", defaultValue: 5.5, suffix: "%" }, { id: "payment", label: "Monthly payment", type: "number", defaultValue: 350, prefix: "$" }],
    related: ["debt-payoff", "credit-card-payoff"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["balance","rate","payment"]);
      if (!parsed.ok) return err(parsed.error);
      const r = creditCardPayoff(parsed.n.balance, parsed.n.rate, parsed.n.payment);
      if (!Number.isFinite(r.months)) return err("Payment too low to pay down the loan.");
      return ok([
        { label: "Months to payoff", value: String(r.months), emphasize: true },
        { label: "Total interest", value: fmtMoney(r.totalInterest) },
        { label: "Total paid", value: fmtMoney(r.totalPaid) },
      ]);
    },
  },
  {
    slug: "401k-contribution",
    category: "finance",
    name: "401(k) Contribution Growth",
    description: "Rough future value of 401(k)-style contributions with employer match.",
    keywords: ["401k", "retirement", "match"],
    formulaNote: "Ignores contribution limits and tax treatment \u2014 educational only.",
    fields: [{ id: "salary", label: "Annual salary", type: "number", defaultValue: 80000, prefix: "$" }, { id: "employeePct", label: "Your contribution", type: "number", defaultValue: 6, suffix: "%" }, { id: "matchPct", label: "Employer match of salary", type: "number", defaultValue: 3, suffix: "%" }, { id: "returnPct", label: "Expected return", type: "number", defaultValue: 7, suffix: "%" }, { id: "years", label: "Years", type: "number", defaultValue: 25 , suffix: "years"}],
    related: ["retirement", "investment-return", "sip"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["salary","employeePct","matchPct","returnPct","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const monthly = (n.salary * ((n.employeePct + n.matchPct) / 100)) / 12;
      const r = investmentReturn(0, n.returnPct, n.years, monthly);
      return ok([
        { label: "Monthly contribution (you + match)", value: fmtMoney(monthly) },
        { label: "Projected balance", value: fmtMoney(r.futureValue), emphasize: true },
        { label: "Total contributed", value: fmtMoney(r.contributed) },
        { label: "Growth", value: fmtMoney(r.growth) },
      ]);
    },
  },
  {
    slug: "risk-reward",
    category: "finance",
    name: "Risk / Reward Ratio Calculator",
    description: "Compute risk-reward ratio from entry, stop loss, and take profit.",
    keywords: ["risk reward", "trading"],
    fields: [{ id: "entry", label: "Entry price", type: "number", defaultValue: 100, step: 0.01 }, { id: "stop", label: "Stop loss", type: "number", defaultValue: 95, step: 0.01 }, { id: "target", label: "Take profit", type: "number", defaultValue: 115, step: 0.01 }],
    related: ["forex-position-size", "roi"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["entry","stop","target"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const risk = Math.abs(n.entry - n.stop);
      const reward = Math.abs(n.target - n.entry);
      if (risk === 0) return err("Stop must differ from entry.");
      return ok([
        { label: "Risk", value: fmtNumber(risk, 4) },
        { label: "Reward", value: fmtNumber(reward, 4) },
        { label: "R:R ratio", value: "1 : " + fmtNumber(reward / risk, 2), emphasize: true },
      ]);
    },
  },
  {
    slug: "apr-to-apy",
    category: "finance",
    name: "APR to APY Converter",
    description: "Convert nominal APR to effective annual yield (APY).",
    keywords: ["apr", "apy", "effective rate"],
    fields: [{ id: "apr", label: "APR", type: "number", defaultValue: 5.99, suffix: "%" }, { id: "n", label: "Compounds / year", type: "select", defaultValue: "12", options: [{ value: "1", label: "Annually" }, { value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" }, { value: "365", label: "Daily" }] }],
    related: ["cd-apy", "compound-interest"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["apr","n"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([
        { label: "APY", value: fmtPercent(apyFromApr(parsed.n.apr, parsed.n.n)), emphasize: true },
        { label: "APR", value: fmtPercent(parsed.n.apr) },
      ]);
    },
  },
  {
    slug: "matrix-2x2-determinant",
    category: "math",
    name: "2\u00d72 Matrix Determinant",
    description: "Compute the determinant of a 2\u00d72 matrix [[a,b],[c,d]].",
    keywords: ["matrix", "determinant", "linear algebra"],
    formulaNote: "det = ad \u2212 bc",
    fields: [{ id: "a", label: "a", type: "number", defaultValue: 1 }, { id: "b", label: "b", type: "number", defaultValue: 2 }, { id: "c", label: "c", type: "number", defaultValue: 3 }, { id: "d", label: "d", type: "number", defaultValue: 4 }],
    related: ["quadratic", "slope"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["a","b","c","d"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([{ label: "Determinant", value: fmtNumber(matrix2x2Det(n.a,n.b,n.c,n.d), 6), emphasize: true }]);
    },
  },
  {
    slug: "binomial-probability",
    category: "math",
    name: "Binomial Probability Calculator",
    description: "P(X = k) for a binomial distribution with n trials and success probability p.",
    keywords: ["binomial", "probability", "bernoulli"],
    formulaNote: "P(X=k) = C(n,k) \u00b7 p^k \u00b7 (1\u2212p)^(n\u2212k)",
    fields: [{ id: "n", label: "Trials (n)", type: "number", defaultValue: 10, min: 0 }, { id: "k", label: "Successes (k)", type: "number", defaultValue: 3, min: 0 }, { id: "p", label: "Success probability p", type: "number", defaultValue: 0.5, step: 0.01, min: 0, max: 1 }],
    related: ["combination-permutation", "permutation-combination"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["n","k","p"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const p = binomialProbability(n.n, n.k, n.p);
      if (!Number.isFinite(p)) return err("Invalid n, k, or p (need 0≤k≤n and 0≤p≤1).");
      return ok([
        { label: "P(X = k)", value: fmtNumber(p, 8), emphasize: true },
        { label: "As percent", value: fmtPercent(p * 100, 4) },
      ]);
    },
  },
  {
    slug: "triangle-solver",
    category: "math",
    name: "Triangle Sides & Angles Solver",
    description: "Solve a triangle from SSS, SAS, or two angles + a side using laws of sines/cosines.",
    keywords: ["triangle", "trig", "law of sines", "law of cosines"],
    popular: true,
    formulaNote: "Enter any valid SSS / SAS / ASA / AAS combination. Angles in degrees.",
    fields: [{ id: "a", label: "Side a", type: "number", defaultValue: 7, helpText: "Leave blank if unknown" }, { id: "b", label: "Side b", type: "number", defaultValue: 8 }, { id: "c", label: "Side c", type: "number", defaultValue: 9 }, { id: "A", label: "Angle A (\u00b0)", type: "number", placeholder: "optional" }, { id: "B", label: "Angle B (\u00b0)", type: "number", placeholder: "optional" }, { id: "C", label: "Angle C (\u00b0)", type: "number", placeholder: "optional" }],
    related: ["triangle-area-heron", "pythagoras"],
    kind: "form",
    compute: (v) => {
      const num = (x: string) => { const n = parseNum(x); return Number.isFinite(n) ? n : undefined; };
      const r = triangleSolve({ a: num(v.a), b: num(v.b), c: num(v.c), A: num(v.A), B: num(v.B), C: num(v.C) });
      if (!r) return err("Provide a valid SSS, SAS, or two-angles-plus-side combination.");
      return ok([
        { label: "Side a", value: fmtNumber(r.a, 4) },
        { label: "Side b", value: fmtNumber(r.b, 4) },
        { label: "Side c", value: fmtNumber(r.c, 4) },
        { label: "Angle A", value: fmtNumber(r.A, 2) + "°", emphasize: true },
        { label: "Angle B", value: fmtNumber(r.B, 2) + "°" },
        { label: "Angle C", value: fmtNumber(r.C, 2) + "°" },
      ]);
    },
  },
  {
    slug: "percentage-mega",
    category: "math",
    name: "Percentage Calculator (Mega)",
    description: "One tool for: what is X% of Y, X is what % of Y, and percent change.",
    keywords: ["percentage", "percent of", "percent change"],
    featured: true,
    popular: true,
    fields: [{ id: "mode", label: "Mode", type: "select", defaultValue: "what_is", options: [{ value: "what_is", label: "What is A% of B?" }, { value: "is_what", label: "A is what % of B?" }, { value: "change", label: "% change from A to B" }] }, { id: "a", label: "A", type: "number", defaultValue: 20 }, { id: "b", label: "B", type: "number", defaultValue: 150 }],
    related: ["percentage", "percentage-of", "percentage-change"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["a","b"]);
      if (!parsed.ok) return err(parsed.error);
      const r = percentageMega(v.mode || "what_is", parsed.n.a, parsed.n.b);
      if (!Number.isFinite(r)) return err("Cannot compute with these values.");
      const label = v.mode === "is_what" || v.mode === "change" ? "Result (%)" : "Result";
      const value = v.mode === "is_what" || v.mode === "change" ? fmtPercent(r) : fmtNumber(r, 6);
      return ok([{ label, value, emphasize: true }]);
    },
  },
  {
    slug: "roman-numerals",
    category: "math",
    name: "Roman Numerals Converter",
    description: "Convert between Arabic numbers (1\u20133999) and Roman numerals.",
    keywords: ["roman", "numerals", "converter"],
    fields: [{ id: "mode", label: "Direction", type: "select", defaultValue: "to", options: [{ value: "to", label: "Number \u2192 Roman" }, { value: "from", label: "Roman \u2192 Number" }] }, { id: "value", label: "Value", type: "text", defaultValue: "2026", placeholder: "2026 or MMXXVI" }],
    related: ["basic", "base-converter"],
    kind: "form",
    compute: (v) => {
      const raw = (v.value || "").trim();
      if (v.mode === "from") {
        const n = fromRoman(raw);
        if (!n) return err("Enter a valid Roman numeral.");
        return ok([{ label: "Number", value: String(n), emphasize: true }, { label: "Normalized Roman", value: toRoman(n) }]);
      }
      const n = parseInt(raw, 10);
      if (!Number.isFinite(n) || n < 1 || n > 3999) return err("Enter an integer from 1 to 3999.");
      return ok([{ label: "Roman", value: toRoman(n), emphasize: true }]);
    },
  },
  {
    slug: "base-converter",
    category: "math",
    name: "Base Converter",
    description: "Convert integers between binary, octal, decimal, and hexadecimal.",
    keywords: ["base", "binary", "hex", "octal", "radix"],
    fields: [{ id: "value", label: "Value", type: "text", defaultValue: "255" }, { id: "from", label: "From base", type: "select", defaultValue: "10", options: [{ value: "2", label: "Binary (2)" }, { value: "8", label: "Octal (8)" }, { value: "10", label: "Decimal (10)" }, { value: "16", label: "Hex (16)" }] }, { id: "to", label: "To base", type: "select", defaultValue: "16", options: [{ value: "2", label: "Binary (2)" }, { value: "8", label: "Octal (8)" }, { value: "10", label: "Decimal (10)" }, { value: "16", label: "Hex (16)" }] }],
    related: ["roman-numerals", "basic"],
    kind: "form",
    compute: (v) => {
      const from = parseInt(v.from || "10", 10);
      const to = parseInt(v.to || "10", 10);
      const out = convertBase((v.value || "").trim(), from, to);
      if (!out) return err("Invalid value for the selected from-base.");
      const dec = parseInt((v.value || "").trim(), from);
      return ok([
        { label: "Result", value: out, emphasize: true },
        { label: "Decimal", value: String(dec) },
        { label: "Binary", value: convertBase(String(dec), 10, 2) },
        { label: "Hex", value: convertBase(String(dec), 10, 16) },
      ]);
    },
  },
  {
    slug: "mean-absolute-deviation",
    category: "statistics",
    name: "Mean Absolute Deviation",
    description: "Average absolute distance of data points from the mean.",
    keywords: ["mad", "mean absolute deviation", "dispersion"],
    formulaNote: "MAD = mean(|x\u1d62 \u2212 mean|)",
    fields: [{ id: "data", label: "Numbers (comma or space separated)", type: "textarea", defaultValue: "2, 4, 4, 4, 5, 5, 7, 9" }],
    related: ["standard-deviation", "average", "percentile"],
    kind: "form",
    compute: (v) => {
      const nums = parseList(v.data || "");
      if (nums.length < 1) return err("Enter at least one number.");
      return ok([
        { label: "MAD", value: fmtNumber(meanAbsoluteDeviation(nums), 6), emphasize: true },
        { label: "Count", value: String(nums.length) },
      ]);
    },
  },
  {
    slug: "nth-root",
    category: "math",
    name: "Nth Root Calculator",
    description: "Compute square root, cube root, or any nth root of a number.",
    keywords: ["root", "square root", "cube root"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 81 }, { id: "n", label: "Root degree (n)", type: "number", defaultValue: 2, min: 1 }],
    related: ["basic", "scientific"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value","n"]);
      if (!parsed.ok) return err(parsed.error);
      const r = nthRoot(parsed.n.value, parsed.n.n);
      if (!Number.isFinite(r)) return err("Cannot compute this root.");
      return ok([{ label: "Result", value: fmtNumber(r, 8), emphasize: true }]);
    },
  },
  {
    slug: "exponent",
    category: "math",
    name: "Exponent Calculator",
    description: "Raise a base to a power (a^b).",
    keywords: ["exponent", "power", "pow"],
    fields: [{ id: "base", label: "Base", type: "number", defaultValue: 2 }, { id: "exp", label: "Exponent", type: "number", defaultValue: 10 }],
    related: ["nth-root", "logarithm"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["base","exp"]);
      if (!parsed.ok) return err(parsed.error);
      const r = Math.pow(parsed.n.base, parsed.n.exp);
      if (!Number.isFinite(r)) return err("Result overflowed.");
      return ok([{ label: "Result", value: fmtNumber(r, 8), emphasize: true }]);
    },
  },
  {
    slug: "trapezoid-area",
    category: "math",
    name: "Trapezoid Area Calculator",
    description: "Area of a trapezoid from parallel sides and height.",
    keywords: ["trapezoid", "area", "geometry"],
    formulaNote: "Area = (a+b)/2 \u00d7 h",
    fields: [{ id: "a", label: "Base a", type: "number", defaultValue: 10 }, { id: "b", label: "Base b", type: "number", defaultValue: 6 }, { id: "h", label: "Height", type: "number", defaultValue: 4 }],
    related: ["triangle-area-heron", "circle"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["a","b","h"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Area", value: fmtNumber(trapezoidArea(parsed.n.a, parsed.n.b, parsed.n.h), 4), emphasize: true }]);
    },
  },
  {
    slug: "cone-volume",
    category: "math",
    name: "Cone Volume Calculator",
    description: "Volume of a right circular cone from radius and height.",
    keywords: ["cone", "volume", "geometry"],
    formulaNote: "V = (1/3) \u03c0 r\u00b2 h",
    fields: [{ id: "r", label: "Radius", type: "number", defaultValue: 3 }, { id: "h", label: "Height", type: "number", defaultValue: 5 }],
    related: ["sphere-volume", "cylinder", "pyramid-volume"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["r","h"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Volume", value: fmtNumber(coneVolume(parsed.n.r, parsed.n.h), 4), emphasize: true }]);
    },
  },
  {
    slug: "pyramid-volume",
    category: "math",
    name: "Pyramid Volume Calculator",
    description: "Volume of a pyramid from base area and height.",
    keywords: ["pyramid", "volume"],
    formulaNote: "V = (1/3) \u00d7 base area \u00d7 height",
    fields: [{ id: "base", label: "Base area", type: "number", defaultValue: 25 }, { id: "h", label: "Height", type: "number", defaultValue: 9 }],
    related: ["cone-volume", "sphere-volume"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["base","h"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Volume", value: fmtNumber(pyramidVolume(parsed.n.base, parsed.n.h), 4), emphasize: true }]);
    },
  },
  {
    slug: "angle-converter",
    category: "math",
    name: "Angle Converter (Deg \u2194 Rad)",
    description: "Convert angles between degrees and radians.",
    keywords: ["degrees", "radians", "angle"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 180 }, { id: "from", label: "From", type: "select", defaultValue: "deg", options: [{ value: "deg", label: "Degrees" }, { value: "rad", label: "Radians" }] }],
    related: ["triangle-solver", "scientific"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const x = parsed.n.value;
      if (v.from === "rad") {
        return ok([
          { label: "Degrees", value: fmtNumber(radToDeg(x), 6), emphasize: true },
          { label: "Radians", value: fmtNumber(x, 6) },
        ]);
      }
      return ok([
        { label: "Radians", value: fmtNumber(degToRad(x), 6), emphasize: true },
        { label: "Degrees", value: fmtNumber(x, 6) },
      ]);
    },
  },
  {
    slug: "rectangle-area",
    category: "math",
    name: "Rectangle Area & Perimeter",
    description: "Area and perimeter of a rectangle.",
    keywords: ["rectangle", "area", "perimeter"],
    fields: [{ id: "l", label: "Length", type: "number", defaultValue: 12 }, { id: "w", label: "Width", type: "number", defaultValue: 5 }],
    related: ["trapezoid-area", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["l","w"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([
        { label: "Area", value: fmtNumber(n.l * n.w, 4), emphasize: true },
        { label: "Perimeter", value: fmtNumber(2 * (n.l + n.w), 4) },
        { label: "Diagonal", value: fmtNumber(Math.sqrt(n.l * n.l + n.w * n.w), 4) },
      ]);
    },
  },
  {
    slug: "steps-to-miles",
    category: "health-fitness",
    name: "Steps to Miles & Calories",
    description: "Convert step count to distance and estimate calories burned.",
    keywords: ["steps", "miles", "walking", "calories"],
    popular: true,
    fields: [{ id: "steps", label: "Steps", type: "number", defaultValue: 10000 , suffix: "steps"}, { id: "stride", label: "Stride length", type: "number", defaultValue: 0.78, suffix: "m", step: 0.01, helpText: "Typical adult ~0.7\u20130.85 m" }],
    related: ["pace", "calories-burned", "tdee"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["steps","stride"]);
      if (!parsed.ok) return err(parsed.error);
      const r = stepsToDistance(parsed.n.steps, parsed.n.stride);
      return ok([
        { label: "Miles", value: fmtNumber(r.miles, 2), emphasize: true },
        { label: "Kilometers", value: fmtNumber(r.km, 2) },
        { label: "Est. calories", value: fmtNumber(r.calories, 0) },
      ]);
    },
  },
  {
    slug: "heart-rate-zones",
    category: "health-fitness",
    name: "Heart Rate Zones Calculator",
    description: "Karvonen-style training zones from age and resting heart rate.",
    keywords: ["heart rate", "zones", "training", "cardio"],
    formulaNote: "Zones use heart-rate reserve (Karvonen). Educational only.",
    fields: [{ id: "age", label: "Age", type: "number", defaultValue: 35 , suffix: "years"}, { id: "resting", label: "Resting HR", type: "number", defaultValue: 60, suffix: "bpm" }],
    related: ["bmi", "tdee", "calories-burned"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["age","resting"]);
      if (!parsed.ok) return err(parsed.error);
      const r = heartRateZones(parsed.n.age, parsed.n.resting);
      return ok([
        { label: "Est. max HR", value: String(r.max) + " bpm", emphasize: true },
        ...r.zones.map((z) => ({ label: z.name, value: z.low + "–" + z.high + " bpm" })),
      ]);
    },
  },
  {
    slug: "sleep-cycle",
    category: "health-fitness",
    name: "Sleep Cycle Calculator",
    description: "Suggested bedtimes based on 90-minute sleep cycles before a wake time.",
    keywords: ["sleep", "cycles", "bedtime"],
    formulaNote: "Assumes ~15 minutes to fall asleep and 90-minute cycles.",
    fields: [{ id: "wakeH", label: "Wake hour (0\u201323)", type: "number", defaultValue: 7, min: 0, max: 23 }, { id: "wakeM", label: "Wake minute", type: "number", defaultValue: 0, min: 0, max: 59 }],
    related: ["pregnancy-week", "water-intake"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["wakeH","wakeM"]);
      if (!parsed.ok) return err(parsed.error);
      const opts = sleepCycles(parsed.n.wakeH, parsed.n.wakeM);
      return ok([
        { label: "Best bedtimes", value: opts[0], emphasize: true },
        ...opts.slice(1).map((o, i) => ({ label: "Option " + (i + 2), value: o })),
      ]);
    },
  },
  {
    slug: "protein-need",
    category: "health-fitness",
    name: "Protein Need Calculator",
    description: "Estimate daily protein grams from body weight and goal.",
    keywords: ["protein", "macros", "nutrition"],
    formulaNote: "Rule-of-thumb multipliers \u2014 not medical advice.",
    fields: [{ id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" }, { id: "goal", label: "Goal", type: "select", defaultValue: "maintain", options: [{ value: "sedentary", label: "Sedentary (~0.8 g/kg)" }, { value: "lose", label: "Fat loss (~1.6 g/kg)" }, { value: "athlete", label: "Athlete (~1.8 g/kg)" }, { value: "muscle", label: "Muscle gain (~2.0 g/kg)" }] }],
    related: ["macros", "tdee", "bmi"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["weight"]);
      if (!parsed.ok) return err(parsed.error);
      const g = proteinNeed(parsed.n.weight, v.goal || "sedentary");
      return ok([{ label: "Daily protein", value: fmtNumber(g, 0) + " g", emphasize: true }]);
    },
  },
  {
    slug: "body-surface-area",
    category: "health-fitness",
    name: "Body Surface Area (Mosteller)",
    description: "Estimate BSA using the Mosteller formula.",
    keywords: ["bsa", "body surface", "mosteller"],
    formulaNote: "BSA (m\u00b2) = \u221a((cm \u00d7 kg) / 3600)",
    fields: [{ id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" }, { id: "height", label: "Height", type: "number", defaultValue: 170, suffix: "cm" }],
    related: ["bmi", "ideal-weight-variants"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["weight","height"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "BSA", value: fmtNumber(bodySurfaceArea(parsed.n.weight, parsed.n.height), 3) + " m²", emphasize: true }]);
    },
  },
  {
    slug: "pregnancy-week",
    category: "health-fitness",
    name: "Pregnancy Week Tracker",
    description: "Estimate current pregnancy week, day, and trimester from LMP.",
    keywords: ["pregnancy", "week", "trimester", "gestation"],
    fields: [{ id: "lmp", label: "Last menstrual period (LMP)", type: "date", defaultValue: "2026-01-15" }, { id: "on", label: "As of date", type: "date", defaultValue: "2026-09-09" }],
    related: ["pregnancy-due-date", "pregnancy-weight-gain"],
    kind: "form",
    compute: (v) => {
      if (!v.lmp) return err("Enter LMP date.");
      const r = pregnancyWeek(v.lmp, v.on || undefined);
      return ok([
        { label: "Gestational age", value: r.weeks + " weeks + " + r.days + " days", emphasize: true },
        { label: "Trimester", value: String(r.trimester) },
      ]);
    },
  },
  {
    slug: "ideal-weight-variants",
    category: "health-fitness",
    name: "Ideal Body Weight (Multiple Formulas)",
    description: "Compare Robinson, Devine, and Miller ideal body weight estimates.",
    keywords: ["ideal weight", "ibw", "robinson", "devine"],
    fields: [{ id: "height", label: "Height", type: "number", defaultValue: 175, suffix: "cm" }, { id: "sex", label: "Sex", type: "select", defaultValue: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] }],
    related: ["bmi", "ideal-weight", "body-surface-area"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["height"]);
      if (!parsed.ok) return err(parsed.error);
      const sex = (v.sex === "female" ? "female" : "male") as "male" | "female";
      const h = parsed.n.height;
      return ok([
        { label: "Robinson", value: fmtNumber(idealWeightRobinson(h, sex), 1) + " kg", emphasize: true },
        { label: "Devine", value: fmtNumber(idealWeightDevine(h, sex), 1) + " kg" },
        { label: "Miller", value: fmtNumber(idealWeightMiller(h, sex), 1) + " kg" },
      ]);
    },
  },
  {
    slug: "calories-burned",
    category: "health-fitness",
    name: "Calories Burned (MET)",
    description: "Estimate calories burned from MET value, weight, and duration.",
    keywords: ["calories", "met", "exercise"],
    formulaNote: "kcal \u2248 MET \u00d7 body weight (kg) \u00d7 hours",
    fields: [{ id: "met", label: "MET", type: "number", defaultValue: 6, step: 0.1, helpText: "Walking ~3.5, jogging ~7, cycling ~8" }, { id: "weight", label: "Weight", type: "number", defaultValue: 70, suffix: "kg" }, { id: "minutes", label: "Duration", type: "number", defaultValue: 30, suffix: "min" }],
    related: ["steps-to-miles", "tdee", "pace"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["met","weight","minutes"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([{ label: "Calories burned", value: fmtNumber(caloriesBurned(n.met, n.weight, n.minutes), 0) + " kcal", emphasize: true }]);
    },
  },
  {
    slug: "square-footage",
    category: "everyday-life",
    name: "Square Footage Calculator",
    description: "Compute area from length and width in feet or meters.",
    keywords: ["square footage", "area", "room"],
    fields: [{ id: "length", label: "Length", type: "number", defaultValue: 12 , suffix: "ft"}, { id: "width", label: "Width", type: "number", defaultValue: 10 , suffix: "ft"}, { id: "units", label: "Units", type: "select", defaultValue: "ft", options: [{ value: "ft", label: "Feet" }, { value: "m", label: "Meters" }] }],
    related: ["paint-coverage", "tile-calculator", "flooring-cost"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["length","width"]);
      if (!parsed.ok) return err(parsed.error);
      const r = squareFootage(parsed.n.length, parsed.n.width, v.units || "ft");
      return ok([{ label: "Area", value: fmtNumber(r.area, 2) + " " + r.unit, emphasize: true }]);
    },
  },
  {
    slug: "concrete-volume",
    category: "everyday-life",
    name: "Concrete Volume Calculator",
    description: "Estimate cubic yards of concrete for a slab.",
    keywords: ["concrete", "yardage", "slab", "construction"],
    fields: [{ id: "length", label: "Length", type: "number", defaultValue: 20, suffix: "ft" }, { id: "width", label: "Width", type: "number", defaultValue: 10, suffix: "ft" }, { id: "depth", label: "Depth", type: "number", defaultValue: 4, suffix: "in" }],
    related: ["gravel-mulch", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["length","width","depth"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = concreteVolume(n.length, n.width, n.depth);
      return ok([
        { label: "Cubic yards", value: fmtNumber(r.cubicYards, 2), emphasize: true },
        { label: "Cubic feet", value: fmtNumber(r.cubicFeet, 1) },
      ]);
    },
  },
  {
    slug: "paint-coverage",
    category: "everyday-life",
    name: "Paint Coverage Calculator",
    description: "Estimate gallons of paint needed for wall area and coats.",
    keywords: ["paint", "coverage", "gallons", "walls"],
    fields: [{ id: "area", label: "Wall area", type: "number", defaultValue: 400, suffix: "ft\u00b2" }, { id: "coats", label: "Coats", type: "number", defaultValue: 2, min: 1 }, { id: "coverage", label: "Coverage per gallon", type: "number", defaultValue: 350, suffix: "ft\u00b2/gal" }],
    related: ["square-footage", "tile-calculator"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["area","coats","coverage"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const gals = paintCoverage(n.area, n.coats, n.coverage);
      return ok([
        { label: "Gallons needed", value: fmtNumber(gals, 2), emphasize: true },
        { label: "Buy (rounded up)", value: String(Math.ceil(gals)) + " gal" },
      ]);
    },
  },
  {
    slug: "tile-calculator",
    category: "everyday-life",
    name: "Tile Calculator",
    description: "Estimate tiles needed for a room including waste factor.",
    keywords: ["tile", "flooring", "waste"],
    fields: [{ id: "room", label: "Room area", type: "number", defaultValue: 120, suffix: "ft\u00b2" }, { id: "tile", label: "Tile area each", type: "number", defaultValue: 1, suffix: "ft\u00b2", step: 0.01 }, { id: "waste", label: "Waste / cut allowance", type: "number", defaultValue: 10, suffix: "%" }],
    related: ["flooring-cost", "square-footage", "paint-coverage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["room","tile","waste"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = tileCalculator(n.room, n.tile, n.waste);
      return ok([
        { label: "Tiles (exact cover)", value: String(r.tiles) },
        { label: "Tiles with waste", value: String(r.withWaste), emphasize: true },
      ]);
    },
  },
  {
    slug: "stair-stringer",
    category: "everyday-life",
    name: "Stair Stringer (Rough)",
    description: "Rough riser count and total run for a stair stringer.",
    keywords: ["stairs", "stringer", "riser", "construction"],
    formulaNote: "Uses ~10 in tread depth assumption \u2014 verify against local building codes.",
    fields: [{ id: "rise", label: "Total rise", type: "number", defaultValue: 96, suffix: "in" }, { id: "target", label: "Target riser height", type: "number", defaultValue: 7, suffix: "in" }],
    related: ["roof-pitch", "fence-posts"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["rise","target"]);
      if (!parsed.ok) return err(parsed.error);
      const r = stairStringer(parsed.n.rise, parsed.n.target);
      return ok([
        { label: "Number of risers", value: String(r.risers), emphasize: true },
        { label: "Riser height", value: fmtNumber(r.riserHeight, 2) + " in" },
        { label: "Treads", value: String(r.treads) },
        { label: "Approx total run", value: fmtNumber(r.runApprox, 1) + " in" },
      ]);
    },
  },
  {
    slug: "fence-posts",
    category: "everyday-life",
    name: "Fence Posts Calculator",
    description: "How many fence posts for a run length and spacing.",
    keywords: ["fence", "posts", "spacing"],
    fields: [{ id: "length", label: "Fence length", type: "number", defaultValue: 100, suffix: "ft" }, { id: "spacing", label: "Post spacing", type: "number", defaultValue: 8, suffix: "ft" }],
    related: ["square-footage", "gravel-mulch"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["length","spacing"]);
      if (!parsed.ok) return err(parsed.error);
      const posts = fencePosts(parsed.n.length, parsed.n.spacing);
      return ok([{ label: "Posts needed", value: String(posts), emphasize: true }]);
    },
  },
  {
    slug: "roof-pitch",
    category: "everyday-life",
    name: "Roof Pitch Calculator",
    description: "Convert rise/run into pitch ratio, degrees, and slope percent.",
    keywords: ["roof", "pitch", "slope"],
    fields: [{ id: "rise", label: "Rise", type: "number", defaultValue: 6 }, { id: "run", label: "Run", type: "number", defaultValue: 12 }],
    related: ["stair-stringer", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["rise","run"]);
      if (!parsed.ok) return err(parsed.error);
      const r = roofPitch(parsed.n.rise, parsed.n.run);
      return ok([
        { label: "Pitch", value: r.pitchRatio, emphasize: true },
        { label: "Angle", value: fmtNumber(r.degrees, 1) + "°" },
        { label: "Slope", value: fmtPercent(r.slopePct, 1) },
      ]);
    },
  },
  {
    slug: "gravel-mulch",
    category: "everyday-life",
    name: "Gravel / Mulch Calculator",
    description: "Cubic yards (and rough tons) of gravel or mulch for a bed.",
    keywords: ["gravel", "mulch", "landscape", "yards"],
    fields: [{ id: "length", label: "Length", type: "number", defaultValue: 30, suffix: "ft" }, { id: "width", label: "Width", type: "number", defaultValue: 4, suffix: "ft" }, { id: "depth", label: "Depth", type: "number", defaultValue: 3, suffix: "in" }],
    related: ["concrete-volume", "fence-posts"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["length","width","depth"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = gravelVolume(n.length, n.width, n.depth);
      return ok([
        { label: "Cubic yards", value: fmtNumber(r.cubicYards, 2), emphasize: true },
        { label: "Approx tons (gravel)", value: fmtNumber(r.tonsApprox, 2), hint: "Mulch is lighter — use yards for ordering." },
      ]);
    },
  },
  {
    slug: "flooring-cost",
    category: "everyday-life",
    name: "Flooring Cost Calculator",
    description: "Estimate material cost for flooring with waste allowance.",
    keywords: ["flooring", "cost", "laminate", "hardwood"],
    fields: [{ id: "area", label: "Area", type: "number", defaultValue: 250, suffix: "ft\u00b2" }, { id: "price", label: "Price per ft\u00b2", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 }, { id: "waste", label: "Waste", type: "number", defaultValue: 10, suffix: "%" }],
    related: ["tile-calculator", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["area","price","waste"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = flooringCost(n.area, n.price, n.waste);
      return ok([
        { label: "Material (exact)", value: fmtMoney(r.material) },
        { label: "With waste", value: fmtMoney(r.withWaste), emphasize: true },
      ]);
    },
  },
  {
    slug: "recipe-scaler",
    category: "everyday-life",
    name: "Recipe Scaler",
    description: "Scale ingredient amounts from original servings to desired servings.",
    keywords: ["recipe", "scale", "cooking", "servings"],
    popular: true,
    fields: [{ id: "original", label: "Original servings", type: "number", defaultValue: 4, min: 0.1 }, { id: "desired", label: "Desired servings", type: "number", defaultValue: 6, min: 0.1 }, { id: "amounts", label: "Ingredient amounts (comma-separated)", type: "textarea", defaultValue: "2, 1.5, 0.5, 400" }],
    related: ["cooking-grams-cups", "oven-temp", "cooking-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["original","desired"]);
      if (!parsed.ok) return err(parsed.error);
      const amounts = parseList(v.amounts || "");
      if (!amounts.length) return err("Enter at least one ingredient amount.");
      const scaled = recipeScale(parsed.n.original, parsed.n.desired, amounts);
      return ok([
        { label: "Scale factor", value: fmtNumber(parsed.n.desired / parsed.n.original, 3), emphasize: true },
        { label: "Scaled amounts", value: scaled.map((x) => fmtNumber(x, 3)).join(", ") },
      ]);
    },
  },
  {
    slug: "oven-temp",
    category: "everyday-life",
    name: "Oven Temperature Converter",
    description: "Convert oven temperatures between \u00b0C, \u00b0F, and gas mark.",
    keywords: ["oven", "celsius", "fahrenheit", "gas mark"],
    fields: [{ id: "value", label: "Temperature", type: "number", defaultValue: 180 }, { id: "from", label: "From", type: "select", defaultValue: "C", options: [{ value: "C", label: "\u00b0C" }, { value: "F", label: "\u00b0F" }, { value: "gas", label: "Gas mark" }] }],
    related: ["recipe-scaler", "temperature", "cooking-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const r = ovenTempConvert(parsed.n.value, v.from || "C");
      return ok([
        { label: "Celsius", value: fmtNumber(r.C, 0) + " °C", emphasize: true },
        { label: "Fahrenheit", value: fmtNumber(r.F, 0) + " °F" },
        { label: "Gas mark", value: r.gasMark },
      ]);
    },
  },
  {
    slug: "cooking-grams-cups",
    category: "everyday-life",
    name: "Grams \u2194 Cups (by ingredient)",
    description: "Convert grams to cups using ingredient density (g per cup).",
    keywords: ["grams", "cups", "cooking", "flour", "sugar"],
    fields: [{ id: "grams", label: "Grams", type: "number", defaultValue: 120 }, { id: "density", label: "Density (g per cup)", type: "select", defaultValue: "125", options: [{ value: "125", label: "Flour (\u2248125 g/cup)" }, { value: "200", label: "Sugar (\u2248200 g/cup)" }, { value: "227", label: "Butter (\u2248227 g/cup)" }, { value: "240", label: "Water/milk (\u2248240 g/cup)" }, { value: "85", label: "Oats (\u224885 g/cup)" }, { value: "170", label: "Honey (\u2248170 g/cup)" }] }],
    related: ["recipe-scaler", "cooking-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["grams","density"]);
      if (!parsed.ok) return err(parsed.error);
      const cups = cookingGramsToCups(parsed.n.grams, parsed.n.density);
      return ok([
        { label: "Cups", value: fmtNumber(cups, 3), emphasize: true },
        { label: "Tablespoons", value: fmtNumber(cups * 16, 1) },
      ]);
    },
  },
  {
    slug: "pressure-converter",
    category: "conversion",
    name: "Pressure Converter",
    description: "Convert between Pa, kPa, bar, psi, atm, and torr.",
    keywords: ["pressure", "psi", "bar", "atm", "pascal"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 1 }, { id: "from", label: "From", type: "select", defaultValue: "atm", options: [{ value: "pa", label: "Pascal" }, { value: "kpa", label: "kPa" }, { value: "bar", label: "Bar" }, { value: "psi", label: "PSI" }, { value: "atm", label: "Atm" }, { value: "torr", label: "Torr" }] }, { id: "to", label: "To", type: "select", defaultValue: "psi", options: [{ value: "pa", label: "Pascal" }, { value: "kpa", label: "kPa" }, { value: "bar", label: "Bar" }, { value: "psi", label: "PSI" }, { value: "atm", label: "Atm" }, { value: "torr", label: "Torr" }] }],
    related: ["energy-converter", "power-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const r = convertUnit(parsed.n.value, v.from || "pa", v.to || "psi", PRESSURE);
      if (!Number.isFinite(r)) return err("Unsupported unit.");
      return ok([{ label: "Result", value: fmtNumber(r, 6), emphasize: true }]);
    },
  },
  {
    slug: "energy-converter",
    category: "conversion",
    name: "Energy Converter",
    description: "Convert joules, calories, Wh, kWh, and BTU.",
    keywords: ["energy", "joule", "calorie", "kwh", "btu"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 1 }, { id: "from", label: "From", type: "select", defaultValue: "kwh", options: [{ value: "j", label: "Joule" }, { value: "kj", label: "kJ" }, { value: "cal", label: "Calorie" }, { value: "kcal", label: "kcal" }, { value: "wh", label: "Wh" }, { value: "kwh", label: "kWh" }, { value: "btu", label: "BTU" }] }, { id: "to", label: "To", type: "select", defaultValue: "j", options: [{ value: "j", label: "Joule" }, { value: "kj", label: "kJ" }, { value: "cal", label: "Calorie" }, { value: "kcal", label: "kcal" }, { value: "wh", label: "Wh" }, { value: "kwh", label: "kWh" }, { value: "btu", label: "BTU" }] }],
    related: ["power-converter", "pressure-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const r = convertUnit(parsed.n.value, v.from || "j", v.to || "kwh", ENERGY);
      if (!Number.isFinite(r)) return err("Unsupported unit.");
      return ok([{ label: "Result", value: fmtNumber(r, 6), emphasize: true }]);
    },
  },
  {
    slug: "power-converter",
    category: "conversion",
    name: "Power Converter",
    description: "Convert watts, kilowatts, horsepower, and megawatts.",
    keywords: ["power", "watt", "horsepower", "kw"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 1 }, { id: "from", label: "From", type: "select", defaultValue: "hp", options: [{ value: "w", label: "Watt" }, { value: "kw", label: "kW" }, { value: "hp", label: "Horsepower" }, { value: "mw", label: "MW" }] }, { id: "to", label: "To", type: "select", defaultValue: "kw", options: [{ value: "w", label: "Watt" }, { value: "kw", label: "kW" }, { value: "hp", label: "Horsepower" }, { value: "mw", label: "MW" }] }],
    related: ["energy-converter", "power-vi"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const r = convertUnit(parsed.n.value, v.from || "w", v.to || "kw", POWER);
      if (!Number.isFinite(r)) return err("Unsupported unit.");
      return ok([{ label: "Result", value: fmtNumber(r, 6), emphasize: true }]);
    },
  },
  {
    slug: "fuel-economy-converter",
    category: "conversion",
    name: "Fuel Economy Converter",
    description: "Convert between MPG (US/UK), L/100km, and km/L.",
    keywords: ["mpg", "fuel economy", "l/100km"],
    fields: [{ id: "value", label: "Value", type: "number", defaultValue: 30 }, { id: "from", label: "From", type: "select", defaultValue: "mpg_us", options: [{ value: "mpg_us", label: "MPG (US)" }, { value: "mpg_uk", label: "MPG (UK)" }, { value: "l100", label: "L/100km" }, { value: "kml", label: "km/L" }] }, { id: "to", label: "To", type: "select", defaultValue: "l100", options: [{ value: "mpg_us", label: "MPG (US)" }, { value: "mpg_uk", label: "MPG (UK)" }, { value: "l100", label: "L/100km" }, { value: "kml", label: "km/L" }] }],
    related: ["fuel-economy", "fuel-cost"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const r = fuelEconomyConvert(parsed.n.value, v.from || "mpg_us", v.to || "l100");
      if (!Number.isFinite(r)) return err("Invalid conversion.");
      return ok([{ label: "Result", value: fmtNumber(r, 3), emphasize: true }]);
    },
  },
  {
    slug: "shoe-size",
    category: "conversion",
    name: "Shoe Size Converter",
    description: "Rough conversion between US, UK, EU, and Mondopoint shoe sizes.",
    keywords: ["shoe", "size", "footwear"],
    formulaNote: "Approximate bridging only \u2014 lasts and brands vary.",
    fields: [{ id: "size", label: "Size", type: "number", defaultValue: 9, step: 0.5 }, { id: "from", label: "From", type: "select", defaultValue: "us_m", options: [{ value: "us_m", label: "US Men" }, { value: "us_w", label: "US Women" }, { value: "uk", label: "UK" }, { value: "eu", label: "EU" }, { value: "cm", label: "cm (Mondopoint/10)" }] }, { id: "to", label: "To", type: "select", defaultValue: "eu", options: [{ value: "us_m", label: "US Men" }, { value: "us_w", label: "US Women" }, { value: "uk", label: "UK" }, { value: "eu", label: "EU" }, { value: "cm", label: "cm" }] }],
    related: ["clothing-size"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["size"]);
      if (!parsed.ok) return err(parsed.error);
      const r = shoeSizeConvert(parsed.n.size, v.from || "us_m", v.to || "eu");
      if (!Number.isFinite(r)) return err("Unsupported conversion.");
      return ok([
        { label: "Converted size", value: fmtNumber(r, 1), emphasize: true },
        { label: "Approx cm", value: fmtNumber(shoeSizeConvert(parsed.n.size, v.from || "us_m", "cm"), 1) },
      ]);
    },
  },
  {
    slug: "clothing-size",
    category: "conversion",
    name: "Clothing Size (Rough Tables)",
    description: "Rough letter/number size bridging for adult tops (illustrative).",
    keywords: ["clothing", "size", "shirt", "dress"],
    formulaNote: "Brand cuts vary widely \u2014 use as a starting point only.",
    fields: [{ id: "system", label: "System", type: "select", defaultValue: "us", options: [{ value: "us", label: "US letter" }, { value: "uk", label: "UK number" }, { value: "eu", label: "EU number" }] }, { id: "size", label: "Size", type: "text", defaultValue: "M", placeholder: "S/M/L or 10/40" }],
    related: ["shoe-size"],
    kind: "form",
    compute: (v) => {
      const map: Record<string, { us: string; uk: string; eu: string }> = {
        xs: { us: "XS", uk: "6", eu: "34" }, s: { us: "S", uk: "8–10", eu: "36–38" },
        m: { us: "M", uk: "12", eu: "40" }, l: { us: "L", uk: "14–16", eu: "42–44" },
        xl: { us: "XL", uk: "18", eu: "46" }, xxl: { us: "XXL", uk: "20–22", eu: "48–50" },
        "6": { us: "XS", uk: "6", eu: "34" }, "8": { us: "S", uk: "8", eu: "36" },
        "10": { us: "S", uk: "10", eu: "38" }, "12": { us: "M", uk: "12", eu: "40" },
        "14": { us: "L", uk: "14", eu: "42" }, "16": { us: "L", uk: "16", eu: "44" },
        "34": { us: "XS", uk: "6", eu: "34" }, "36": { us: "S", uk: "8", eu: "36" },
        "38": { us: "S", uk: "10", eu: "38" }, "40": { us: "M", uk: "12", eu: "40" },
        "42": { us: "L", uk: "14", eu: "42" }, "44": { us: "L", uk: "16", eu: "44" },
      };
      const key = (v.size || "").trim().toLowerCase();
      const row = map[key];
      if (!row) return err("Try XS–XXL, UK 6–16, or EU 34–44.");
      return ok([
        { label: "US", value: row.us, emphasize: true },
        { label: "UK", value: row.uk },
        { label: "EU", value: row.eu },
      ]);
    },
  },
  {
    slug: "business-days-between",
    category: "date-time",
    name: "Business Days Between Dates",
    description: "Count weekdays (Mon\u2013Fri) between two dates inclusive.",
    keywords: ["business days", "working days", "weekdays"],
    fields: [{ id: "start", label: "Start date", type: "date", defaultValue: "2026-09-01" }, { id: "end", label: "End date", type: "date", defaultValue: "2026-09-30" }],
    related: ["date-difference", "payday-calendar", "days-until"],
    kind: "form",
    compute: (v) => {
      if (!v.start || !v.end) return err("Enter both dates.");
      const n = businessDaysBetween(v.start, v.end);
      return ok([{ label: "Business days", value: String(n), emphasize: true }]);
    },
  },
  {
    slug: "payday-calendar",
    category: "date-time",
    name: "Payday Calendar",
    description: "Generate upcoming payday dates from a start date and frequency.",
    keywords: ["payday", "payroll", "calendar"],
    fields: [{ id: "start", label: "First payday", type: "date", defaultValue: "2026-09-15" }, { id: "freq", label: "Frequency (days)", type: "select", defaultValue: "14", options: [{ value: "7", label: "Weekly (7)" }, { value: "14", label: "Biweekly (14)" }, { value: "15", label: "Semi-monthly (~15)" }, { value: "30", label: "Monthly (~30)" }] }, { id: "count", label: "How many paydays", type: "number", defaultValue: 8, min: 1, max: 52 }],
    related: ["business-days-between", "days-until"],
    kind: "form",
    compute: (v) => {
      if (!v.start) return err("Enter a start date.");
      const parsed = requireNums(v, ["freq","count"]);
      if (!parsed.ok) return err(parsed.error);
      const dates = paydayCalendar(v.start, parsed.n.freq, Math.min(52, Math.max(1, parsed.n.count)));
      return ok([
        { label: "Next payday", value: dates[0], emphasize: true },
        { label: "Schedule", value: dates.join(", ") },
      ]);
    },
  },
  {
    slug: "zodiac",
    category: "date-time",
    name: "Zodiac Sign Calculator",
    description: "Find the Western sun-sign zodiac for a birth month and day (for fun).",
    keywords: ["zodiac", "astrology", "star sign"],
    fields: [{ id: "month", label: "Birth month", type: "number", defaultValue: 9, min: 1, max: 12 }, { id: "day", label: "Birth day", type: "number", defaultValue: 9, min: 1, max: 31 }],
    related: ["age-from-dob", "days-until"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["month","day"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.month < 1 || n.month > 12 || n.day < 1 || n.day > 31) return err("Enter a valid month/day.");
      return ok([{ label: "Zodiac sign", value: zodiacSign(n.month, n.day), emphasize: true }]);
    },
  },
  {
    slug: "days-until",
    category: "date-time",
    name: "Days Until Date",
    description: "How many days until (or since) a target date.",
    keywords: ["countdown", "days until", "deadline"],
    fields: [{ id: "target", label: "Target date", type: "date", defaultValue: "2026-12-31" }, { id: "from", label: "From date (optional)", type: "date", placeholder: "defaults to today" }],
    related: ["date-difference", "business-days-between"],
    kind: "form",
    compute: (v) => {
      if (!v.target) return err("Enter a target date.");
      const d = daysUntil(v.target, v.from || undefined);
      return ok([
        { label: "Days", value: String(d), emphasize: true },
        { label: "Direction", value: d >= 0 ? "until" : "ago" },
      ]);
    },
  },
  {
    slug: "work-hours-between",
    category: "date-time",
    name: "Hours Between Date-Times",
    description: "Total hours between two date-time values (ISO-style).",
    keywords: ["hours between", "duration", "timesheet"],
    fields: [{ id: "start", label: "Start (YYYY-MM-DD or ISO)", type: "text", defaultValue: "2026-09-09T09:00" }, { id: "end", label: "End", type: "text", defaultValue: "2026-09-09T17:30" }],
    related: ["hours-minutes-add", "business-days-between"],
    kind: "form",
    compute: (v) => {
      const h = hoursBetween(v.start || "", v.end || "");
      if (!Number.isFinite(h)) return err("Enter valid start/end date-times.");
      return ok([
        { label: "Hours", value: fmtNumber(h, 2), emphasize: true },
        { label: "Minutes", value: fmtNumber(h * 60, 0) },
      ]);
    },
  },
  {
    slug: "ohms-law-solver",
    category: "science-engineering",
    name: "Ohm's Law Solver",
    description: "Solve for voltage, current, or resistance (and power) given any two.",
    keywords: ["ohm", "voltage", "current", "resistance"],
    popular: true,
    formulaNote: "V = IR, P = VI. Leave the unknown blank.",
    fields: [{ id: "v", label: "Voltage V", type: "number", placeholder: "blank if unknown" }, { id: "i", label: "Current I (amps)", type: "number", defaultValue: 2 }, { id: "r", label: "Resistance R (ohms)", type: "number", defaultValue: 6 }],
    related: ["power-vi", "resistor-combo", "ohms-law"],
    kind: "form",
    compute: (v) => {
      const num = (x: string) => { const n = parseNum(x); return Number.isFinite(n) ? n : undefined; };
      const r = ohmsLaw({ v: num(v.v), i: num(v.i), r: num(v.r) });
      if (!r) return err("Provide any two of V, I, R.");
      return ok([
        { label: "Voltage (V)", value: fmtNumber(r.v, 4), emphasize: true },
        { label: "Current (A)", value: fmtNumber(r.i, 4) },
        { label: "Resistance (Ω)", value: fmtNumber(r.r, 4) },
        { label: "Power (W)", value: fmtNumber(r.p, 4) },
      ]);
    },
  },
  {
    slug: "density-calc",
    category: "science-engineering",
    name: "Density Calculator",
    description: "Density = mass / volume.",
    keywords: ["density", "mass", "volume"],
    fields: [{ id: "mass", label: "Mass", type: "number", defaultValue: 10, suffix: "kg" }, { id: "volume", label: "Volume", type: "number", defaultValue: 2, suffix: "m\u00b3" }],
    related: ["freefall", "wavelength"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["mass","volume"]);
      if (!parsed.ok) return err(parsed.error);
      const d = density(parsed.n.mass, parsed.n.volume);
      if (!Number.isFinite(d)) return err("Volume cannot be zero.");
      return ok([{ label: "Density", value: fmtNumber(d, 6), emphasize: true, hint: "in mass/volume units you entered" }]);
    },
  },
  {
    slug: "power-vi",
    category: "science-engineering",
    name: "Electrical Power (P = VI)",
    description: "Compute electrical power from voltage and current.",
    keywords: ["power", "watts", "voltage", "current"],
    fields: [{ id: "v", label: "Voltage", type: "number", defaultValue: 120, suffix: "V" }, { id: "i", label: "Current", type: "number", defaultValue: 5, suffix: "A" }],
    related: ["ohms-law-solver", "power-converter"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["v","i"]);
      if (!parsed.ok) return err(parsed.error);
      const p = powerVI(parsed.n.v, parsed.n.i);
      return ok([
        { label: "Power", value: fmtNumber(p, 3) + " W", emphasize: true },
        { label: "Kilowatts", value: fmtNumber(p / 1000, 4) + " kW" },
      ]);
    },
  },
  {
    slug: "wavelength-calc",
    category: "science-engineering",
    name: "Wavelength Calculator",
    description: "Wavelength from frequency (default wave speed = speed of light).",
    keywords: ["wavelength", "frequency", "light"],
    formulaNote: "\u03bb = c / f",
    fields: [{ id: "freq", label: "Frequency", type: "number", defaultValue: 500000000000000.0, suffix: "Hz" }, { id: "speed", label: "Wave speed", type: "number", defaultValue: 299792458, suffix: "m/s" }],
    related: ["density-calc", "freefall"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["freq","speed"]);
      if (!parsed.ok) return err(parsed.error);
      const w = wavelength(parsed.n.freq, parsed.n.speed);
      if (!Number.isFinite(w)) return err("Frequency cannot be zero.");
      return ok([
        { label: "Wavelength", value: fmtNumber(w, 6) + " m", emphasize: true },
        { label: "Nanometers", value: fmtNumber(w * 1e9, 2) + " nm" },
      ]);
    },
  },
  {
    slug: "freefall",
    category: "science-engineering",
    name: "Freefall Calculator",
    description: "Time, velocity, or height for freefall under constant g.",
    keywords: ["freefall", "gravity", "physics"],
    formulaNote: "h = \u00bdgt\u00b2, v = gt (from rest). Enter height or time.",
    fields: [{ id: "height", label: "Height (m)", type: "number", defaultValue: 100, helpText: "Leave blank to solve from time" }, { id: "time", label: "Time (s)", type: "number", placeholder: "optional" }, { id: "g", label: "g", type: "number", defaultValue: 9.80665, step: 0.001 }],
    related: ["velocity", "acceleration", "kinetic-energy"],
    kind: "form",
    compute: (v) => {
      const num = (x: string) => { const n = parseNum(x); return Number.isFinite(n) ? n : undefined; };
      const r = freefall({ height: num(v.height), time: num(v.time), g: num(v.g) });
      if (!Number.isFinite(r.time) || !Number.isFinite(r.height)) return err("Provide height or time.");
      return ok([
        { label: "Time", value: fmtNumber(r.time, 3) + " s", emphasize: true },
        { label: "Impact velocity", value: fmtNumber(r.velocity, 3) + " m/s" },
        { label: "Height", value: fmtNumber(r.height, 3) + " m" },
      ]);
    },
  },
  {
    slug: "resistor-combo",
    category: "science-engineering",
    name: "Resistor Series / Parallel",
    description: "Equivalent resistance for series or parallel resistor networks.",
    keywords: ["resistor", "series", "parallel", "ohm"],
    fields: [{ id: "mode", label: "Mode", type: "select", defaultValue: "series", options: [{ value: "series", label: "Series" }, { value: "parallel", label: "Parallel" }] }, { id: "ohms", label: "Resistances (ohms, comma-separated)", type: "textarea", defaultValue: "100, 220, 470" }],
    related: ["ohms-law-solver", "power-vi"],
    kind: "form",
    compute: (v) => {
      const ohms = parseList(v.ohms || "");
      if (ohms.length < 1) return err("Enter at least one resistance.");
      const eq = v.mode === "parallel" ? resistorParallel(ohms) : resistorSeries(ohms);
      if (!Number.isFinite(eq)) return err("Invalid resistances.");
      return ok([{ label: "Equivalent R", value: fmtNumber(eq, 4) + " Ω", emphasize: true }]);
    },
  },
  {
    slug: "momentum-calc",
    category: "science-engineering",
    name: "Momentum Calculator",
    description: "Linear momentum p = m \u00b7 v.",
    keywords: ["momentum", "physics", "mass", "velocity"],
    fields: [{ id: "mass", label: "Mass", type: "number", defaultValue: 2, suffix: "kg" }, { id: "velocity", label: "Velocity", type: "number", defaultValue: 5, suffix: "m/s" }],
    related: ["kinetic-energy", "freefall"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["mass","velocity"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Momentum", value: fmtNumber(momentum(parsed.n.mass, parsed.n.velocity), 4) + " kg·m/s", emphasize: true }]);
    },
  },
  {
    slug: "capacitor-energy",
    category: "science-engineering",
    name: "Capacitor Energy Calculator",
    description: "Energy stored in a capacitor: E = \u00bd C V\u00b2.",
    keywords: ["capacitor", "energy", "farad"],
    fields: [{ id: "c", label: "Capacitance", type: "number", defaultValue: 0.001, suffix: "F", step: "any" }, { id: "v", label: "Voltage", type: "number", defaultValue: 12, suffix: "V" }],
    related: ["energy-converter", "ohms-law-solver"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["c","v"]);
      if (!parsed.ok) return err(parsed.error);
      const e = capacitorEnergy(parsed.n.c, parsed.n.v);
      return ok([
        { label: "Energy", value: fmtNumber(e, 6) + " J", emphasize: true },
        { label: "Millijoules", value: fmtNumber(e * 1000, 3) + " mJ" },
      ]);
    },
  },
  {
    slug: "tip-split-advanced",
    category: "everyday-life",
    name: "Tip + Tax + Split",
    description: "Add tip and sales tax, then split the bill among diners.",
    keywords: ["tip", "tax", "split bill", "restaurant"],
    fields: [{ id: "bill", label: "Bill subtotal", type: "number", defaultValue: 86, prefix: "$" }, { id: "tax", label: "Tax rate", type: "number", defaultValue: 8.5, suffix: "%" }, { id: "tip", label: "Tip", type: "number", defaultValue: 18, suffix: "%" }, { id: "people", label: "People", type: "number", defaultValue: 4, min: 1 }],
    related: ["tip", "split-bill", "tip-tax-combo"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["bill","tax","tip","people"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const taxAmt = n.bill * (n.tax / 100);
      const tipAmt = n.bill * (n.tip / 100);
      const total = n.bill + taxAmt + tipAmt;
      return ok([
        { label: "Total", value: fmtMoney(total), emphasize: true },
        { label: "Tax", value: fmtMoney(taxAmt) },
        { label: "Tip", value: fmtMoney(tipAmt) },
        { label: "Per person", value: fmtMoney(total / Math.max(1, n.people)) },
      ]);
    },
  },
  {
    slug: "discount-stack-extra",
    category: "finance",
    name: "Stacked Discount Calculator",
    description: "Apply successive percentage discounts to a price.",
    keywords: ["discount", "stack", "sale"],
    fields: [{ id: "price", label: "Original price", type: "number", defaultValue: 100, prefix: "$" }, { id: "d1", label: "First discount", type: "number", defaultValue: 20, suffix: "%" }, { id: "d2", label: "Second discount", type: "number", defaultValue: 10, suffix: "%" }, { id: "d3", label: "Third discount (optional)", type: "number", defaultValue: 0, suffix: "%" }],
    related: ["discount", "discount-stack", "sales-tax"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["price","d1","d2","d3"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      let p = n.price;
      for (const d of [n.d1, n.d2, n.d3]) p *= 1 - d / 100;
      return ok([
        { label: "Final price", value: fmtMoney(p), emphasize: true },
        { label: "Total savings", value: fmtMoney(n.price - p) },
        { label: "Effective discount", value: fmtPercent(((n.price - p) / n.price) * 100) },
      ]);
    },
  },
  {
    slug: "break-even-price",
    category: "business",
    name: "Break-Even Price Calculator",
    description: "Minimum selling price per unit to break even.",
    keywords: ["break even", "price", "margin"],
    fields: [{ id: "fixed", label: "Fixed costs", type: "number", defaultValue: 10000, prefix: "$" }, { id: "variable", label: "Variable cost / unit", type: "number", defaultValue: 12, prefix: "$" }, { id: "units", label: "Expected units", type: "number", defaultValue: 500, min: 1 }],
    related: ["break-even", "margin-markup", "profit-margin"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["fixed","variable","units"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const price = n.variable + n.fixed / n.units;
      return ok([
        { label: "Break-even price / unit", value: fmtMoney(price), emphasize: true },
        { label: "Total cost at volume", value: fmtMoney(n.fixed + n.variable * n.units) },
      ]);
    },
  },
  {
    slug: "markup-from-margin",
    category: "business",
    name: "Markup from Margin Calculator",
    description: "Convert a desired profit margin % into the required markup % on cost.",
    keywords: ["markup", "margin", "pricing"],
    formulaNote: "markup% = margin% / (1 \u2212 margin%)",
    fields: [{ id: "margin", label: "Desired margin", type: "number", defaultValue: 40, suffix: "%" }, { id: "cost", label: "Cost (optional)", type: "number", defaultValue: 50, prefix: "$" }],
    related: ["margin-markup", "profit-margin"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["margin","cost"]);
      if (!parsed.ok) return err(parsed.error);
      const m = parsed.n.margin / 100;
      if (m >= 1) return err("Margin must be under 100%.");
      const markup = (m / (1 - m)) * 100;
      const price = parsed.n.cost / (1 - m);
      return ok([
        { label: "Required markup", value: fmtPercent(markup), emphasize: true },
        { label: "Selling price", value: fmtMoney(price) },
      ]);
    },
  },
  {
    slug: "hourly-overtime",
    category: "business",
    name: "Overtime Pay Calculator",
    description: "Estimate weekly pay with overtime at 1.5\u00d7 after a threshold.",
    keywords: ["overtime", "hourly", "paycheck"],
    fields: [{ id: "rate", label: "Hourly rate", type: "number", defaultValue: 25, prefix: "$" }, { id: "hours", label: "Hours worked", type: "number", defaultValue: 48 }, { id: "threshold", label: "OT threshold", type: "number", defaultValue: 40 }, { id: "otMult", label: "OT multiplier", type: "number", defaultValue: 1.5, step: 0.1 }],
    related: ["hourly-to-salary", "paycheck-estimator"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["rate","hours","threshold","otMult"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const reg = Math.min(n.hours, n.threshold);
      const ot = Math.max(0, n.hours - n.threshold);
      const pay = reg * n.rate + ot * n.rate * n.otMult;
      return ok([
        { label: "Gross pay", value: fmtMoney(pay), emphasize: true },
        { label: "Regular hours", value: fmtNumber(reg, 1) },
        { label: "OT hours", value: fmtNumber(ot, 1) },
      ]);
    },
  },
  {
    slug: "sales-tax-add-remove",
    category: "finance",
    name: "Add / Remove Sales Tax",
    description: "Add tax to a net price or extract tax from a gross price.",
    keywords: ["sales tax", "vat", "inclusive"],
    fields: [{ id: "amount", label: "Amount", type: "number", defaultValue: 100, prefix: "$" }, { id: "rate", label: "Tax rate", type: "number", defaultValue: 8.25, suffix: "%" }, { id: "mode", label: "Mode", type: "select", defaultValue: "add", options: [{ value: "add", label: "Add tax to net" }, { value: "remove", label: "Remove tax from gross" }] }],
    related: ["sales-tax", "gst-vat", "gst-invoice-split"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["amount","rate"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (v.mode === "remove") {
        const net = n.amount / (1 + n.rate / 100);
        return ok([
          { label: "Net (ex-tax)", value: fmtMoney(net), emphasize: true },
          { label: "Tax portion", value: fmtMoney(n.amount - net) },
        ]);
      }
      const tax = n.amount * (n.rate / 100);
      return ok([
        { label: "Gross (with tax)", value: fmtMoney(n.amount + tax), emphasize: true },
        { label: "Tax", value: fmtMoney(tax) },
      ]);
    },
  },
  {
    slug: "future-value-annuity",
    category: "finance",
    name: "Future Value of Annuity",
    description: "Future value of equal periodic deposits at a fixed rate.",
    keywords: ["annuity", "future value", "deposits"],
    fields: [{ id: "pmt", label: "Payment per period", type: "number", defaultValue: 500, prefix: "$" }, { id: "rate", label: "Annual rate", type: "number", defaultValue: 6, suffix: "%" }, { id: "years", label: "Years", type: "number", defaultValue: 10 , suffix: "years"}, { id: "perYear", label: "Payments / year", type: "number", defaultValue: 12 }],
    related: ["investment-return", "sip", "savings-goal"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["pmt","rate","years","perYear"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = n.rate / 100 / n.perYear;
      const N = n.years * n.perYear;
      const fv = r === 0 ? n.pmt * N : n.pmt * ((Math.pow(1 + r, N) - 1) / r);
      return ok([
        { label: "Future value", value: fmtMoney(fv), emphasize: true },
        { label: "Total deposited", value: fmtMoney(n.pmt * N) },
        { label: "Interest earned", value: fmtMoney(fv - n.pmt * N) },
      ]);
    },
  },
  {
    slug: "present-value",
    category: "finance",
    name: "Present Value Calculator",
    description: "Discount a future lump sum to present value.",
    keywords: ["present value", "discount", "pv"],
    fields: [{ id: "fv", label: "Future value", type: "number", defaultValue: 10000, prefix: "$" }, { id: "rate", label: "Discount rate", type: "number", defaultValue: 5, suffix: "%" }, { id: "years", label: "Years", type: "number", defaultValue: 5 , suffix: "years"}],
    related: ["npv", "investment-return", "cagr"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["fv","rate","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const pv = n.fv / Math.pow(1 + n.rate / 100, n.years);
      return ok([
        { label: "Present value", value: fmtMoney(pv), emphasize: true },
        { label: "Discount", value: fmtMoney(n.fv - pv) },
      ]);
    },
  },
  {
    slug: "effective-interest",
    category: "finance",
    name: "Effective Interest Rate",
    description: "Convert a nominal rate with compounding into EAR.",
    keywords: ["ear", "effective interest", "nominal"],
    fields: [{ id: "nominal", label: "Nominal rate", type: "number", defaultValue: 6, suffix: "%" }, { id: "n", label: "Compounds / year", type: "number", defaultValue: 12 }],
    related: ["apr-to-apy", "cd-apy"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["nominal","n"]);
      if (!parsed.ok) return err(parsed.error);
      const ear = (Math.pow(1 + parsed.n.nominal / 100 / parsed.n.n, parsed.n.n) - 1) * 100;
      return ok([{ label: "Effective annual rate", value: fmtPercent(ear), emphasize: true }]);
    },
  },
  {
    slug: "debt-to-income",
    category: "finance",
    name: "Debt-to-Income Ratio",
    description: "Monthly DTI ratio used in lending pre-checks.",
    keywords: ["dti", "debt to income", "mortgage"],
    fields: [{ id: "debts", label: "Total monthly debt payments", type: "number", defaultValue: 1800, prefix: "$" }, { id: "income", label: "Gross monthly income", type: "number", defaultValue: 6000, prefix: "$" }],
    related: ["loan-affordability", "budget-percent"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["debts","income"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.income <= 0) return err("Income must be positive.");
      const dti = (parsed.n.debts / parsed.n.income) * 100;
      return ok([
        { label: "DTI", value: fmtPercent(dti), emphasize: true },
        { label: "Guideline", value: dti <= 36 ? "Often considered acceptable (varies by lender)" : "May be high for many lenders" },
      ]);
    },
  },
  {
    slug: "savings-rate",
    category: "finance",
    name: "Savings Rate Calculator",
    description: "What percent of income are you saving?",
    keywords: ["savings rate", "fire", "budget"],
    fields: [{ id: "income", label: "Monthly income", type: "number", defaultValue: 5000, prefix: "$" }, { id: "saved", label: "Monthly saved", type: "number", defaultValue: 1000, prefix: "$" }],
    related: ["budget-percent", "savings-goal"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["income","saved"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.income <= 0) return err("Income must be positive.");
      return ok([
        { label: "Savings rate", value: fmtPercent((parsed.n.saved / parsed.n.income) * 100), emphasize: true },
        { label: "Annual savings", value: fmtMoney(parsed.n.saved * 12) },
      ]);
    },
  },
  {
    slug: "commute-cost",
    category: "everyday-life",
    name: "Commute Cost Calculator",
    description: "Estimate daily/monthly commuting cost from distance, MPG, and fuel price.",
    keywords: ["commute", "gas", "driving cost"],
    fields: [{ id: "miles", label: "Round-trip miles / day", type: "number", defaultValue: 30 }, { id: "mpg", label: "Vehicle MPG", type: "number", defaultValue: 28 }, { id: "price", label: "Fuel price / gallon", type: "number", defaultValue: 3.6, prefix: "$", step: 0.01 }, { id: "days", label: "Work days / month", type: "number", defaultValue: 22 }],
    related: ["fuel-cost", "fuel-economy"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["miles","mpg","price","days"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.mpg <= 0) return err("MPG must be positive.");
      const daily = (n.miles / n.mpg) * n.price;
      return ok([
        { label: "Cost / day", value: fmtMoney(daily), emphasize: true },
        { label: "Cost / month", value: fmtMoney(daily * n.days) },
        { label: "Cost / year", value: fmtMoney(daily * n.days * 12) },
      ]);
    },
  },
  {
    slug: "password-entropy",
    category: "everyday-life",
    name: "Password Entropy Estimator",
    description: "Rough entropy bits from password length and character-set size.",
    keywords: ["password", "entropy", "security"],
    formulaNote: "entropy \u2248 length \u00d7 log2(charset). Not a substitute for a password manager.",
    fields: [{ id: "length", label: "Length", type: "number", defaultValue: 12, min: 1 , suffix: "ft"}, { id: "charset", label: "Character set size", type: "select", defaultValue: "62", options: [{ value: "26", label: "Lowercase only (26)" }, { value: "52", label: "Letters (52)" }, { value: "62", label: "Letters + digits (62)" }, { value: "95", label: "Letters + digits + symbols (~95)" }] }],
    related: ["password-strength", "random-number"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["length","charset"]);
      if (!parsed.ok) return err(parsed.error);
      const bits = parsed.n.length * Math.log2(parsed.n.charset);
      return ok([
        { label: "Entropy", value: fmtNumber(bits, 1) + " bits", emphasize: true },
        { label: "Combinations", value: fmtNumber(Math.pow(parsed.n.charset, parsed.n.length), 3) },
      ]);
    },
  },
  {
    slug: "gpa-to-percentage",
    category: "education",
    name: "GPA to Percentage (Rough)",
    description: "Rough conversion between 4.0-scale GPA and percentage.",
    keywords: ["gpa", "percentage", "grades"],
    formulaNote: "Uses a common linear map % \u2248 GPA/4 \u00d7 100 \u2014 institutions differ.",
    fields: [{ id: "mode", label: "Direction", type: "select", defaultValue: "gpa_to_pct", options: [{ value: "gpa_to_pct", label: "GPA \u2192 %" }, { value: "pct_to_gpa", label: "% \u2192 GPA" }] }, { id: "value", label: "Value", type: "number", defaultValue: 3.5, step: 0.01 }],
    related: ["gpa", "grade-percentage", "weighted-grade"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const x = parsed.n.value;
      if (v.mode === "pct_to_gpa") {
        return ok([{ label: "Approx GPA", value: fmtNumber((x / 100) * 4, 2), emphasize: true }]);
      }
      return ok([{ label: "Approx %", value: fmtPercent((x / 4) * 100), emphasize: true }]);
    },
  },
  {
    slug: "study-pomodoro",
    category: "education",
    name: "Pomodoro Study Planner",
    description: "Plan study blocks with Pomodoro focus/break intervals.",
    keywords: ["pomodoro", "study", "focus"],
    fields: [{ id: "total", label: "Total study minutes available", type: "number", defaultValue: 120 }, { id: "focus", label: "Focus minutes", type: "number", defaultValue: 25 }, { id: "brk", label: "Break minutes", type: "number", defaultValue: 5 }],
    related: ["study-time", "reading-time"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["total","focus","brk"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const cycle = n.focus + n.brk;
      if (cycle <= 0) return err("Focus + break must be positive.");
      const cycles = Math.floor(n.total / cycle);
      const focusTotal = cycles * n.focus;
      return ok([
        { label: "Full Pomodoros", value: String(cycles), emphasize: true },
        { label: "Focus time", value: fmtNumber(focusTotal, 0) + " min" },
        { label: "Break time", value: fmtNumber(cycles * n.brk, 0) + " min" },
      ]);
    },
  },
  {
    slug: "z-score-from-raw",
    category: "statistics",
    name: "Z-Score from Raw Score",
    description: "Convert a raw score to a z-score given mean and standard deviation.",
    keywords: ["z-score", "standard score", "statistics"],
    fields: [{ id: "x", label: "Raw score", type: "number", defaultValue: 85 }, { id: "mean", label: "Mean", type: "number", defaultValue: 70 }, { id: "sd", label: "Std. deviation", type: "number", defaultValue: 10 }],
    related: ["z-score", "standard-deviation", "percentile"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["x","mean","sd"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.sd === 0) return err("Std. deviation cannot be zero.");
      const z = (n.x - n.mean) / n.sd;
      return ok([{ label: "Z-score", value: fmtNumber(z, 4), emphasize: true }]);
    },
  },
  {
    slug: "confidence-margin",
    category: "statistics",
    name: "Margin of Error (Rough)",
    description: "Rough margin of error for a proportion: z \u00d7 \u221a(p(1\u2212p)/n).",
    keywords: ["margin of error", "confidence", "survey"],
    fields: [{ id: "p", label: "Sample proportion", type: "number", defaultValue: 0.5, step: 0.01, min: 0, max: 1 }, { id: "n", label: "Sample size", type: "number", defaultValue: 1000, min: 1 }, { id: "z", label: "Z for confidence", type: "select", defaultValue: "1.96", options: [{ value: "1.645", label: "90% (z\u22481.645)" }, { value: "1.96", label: "95% (z\u22481.96)" }, { value: "2.576", label: "99% (z\u22482.576)" }] }],
    related: ["confidence-interval", "standard-deviation"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["p","n","z"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const moe = n.z * Math.sqrt((n.p * (1 - n.p)) / n.n);
      return ok([
        { label: "Margin of error", value: fmtPercent(moe * 100, 2), emphasize: true },
        { label: "Interval", value: fmtPercent((n.p - moe) * 100, 2) + " – " + fmtPercent((n.p + moe) * 100, 2) },
      ]);
    },
  },
  {
    slug: "speed-from-pace",
    category: "health-fitness",
    name: "Pace \u2194 Speed Converter",
    description: "Convert running/walking pace (min/km or min/mi) to speed.",
    keywords: ["pace", "speed", "running"],
    fields: [{ id: "min", label: "Pace minutes", type: "number", defaultValue: 5 }, { id: "sec", label: "Pace seconds", type: "number", defaultValue: 30 }, { id: "unit", label: "Pace unit", type: "select", defaultValue: "km", options: [{ value: "km", label: "per km" }, { value: "mi", label: "per mile" }] }],
    related: ["pace", "pace-min-km", "steps-to-miles"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["min","sec"]);
      if (!parsed.ok) return err(parsed.error);
      const totalMin = parsed.n.min + parsed.n.sec / 60;
      if (totalMin <= 0) return err("Pace must be positive.");
      const perHour = 60 / totalMin;
      const label = v.unit === "mi" ? "mph" : "km/h";
      return ok([
        { label: "Speed", value: fmtNumber(perHour, 2) + " " + label, emphasize: true },
        { label: "Pace", value: String(parsed.n.min) + ":" + String(Math.round(parsed.n.sec)).padStart(2, "0") + " /" + (v.unit || "km") },
      ]);
    },
  },
  {
    slug: "bac-rough",
    category: "health-fitness",
    name: "BAC Rough Estimate (Widmark)",
    description: "Very rough blood-alcohol estimate. NOT legal advice \u2014 never drink and drive.",
    keywords: ["bac", "alcohol", "widmark"],
    formulaNote: "Educational Widmark estimate only. Metabolism, food, and biology vary. Illegal to drive impaired.",
    fields: [{ id: "drinks", label: "Standard drinks", type: "number", defaultValue: 2, step: 0.5 }, { id: "weight", label: "Body weight", type: "number", defaultValue: 70, suffix: "kg" }, { id: "sex", label: "Sex (distribution ratio)", type: "select", defaultValue: "male", options: [{ value: "male", label: "Male (r\u22480.68)" }, { value: "female", label: "Female (r\u22480.55)" }] }, { id: "hours", label: "Hours since first drink", type: "number", defaultValue: 2, step: 0.5 }],
    related: ["water-intake", "bmi"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["drinks","weight","hours"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = v.sex === "female" ? 0.55 : 0.68;
      const alcoholGrams = n.drinks * 14; // ~14g per standard drink
      const bac = Math.max(0, (alcoholGrams / (n.weight * 1000 * r)) * 100 - 0.015 * n.hours);
      return ok([
        { label: "Est. BAC", value: fmtNumber(bac, 3) + "%", emphasize: true },
        { label: "Disclaimer", value: "Rough educational estimate only — not for legal/medical use. Never drink and drive." },
      ]);
    },
  },
  {
    slug: "target-heart-rate",
    category: "health-fitness",
    name: "Target Heart Rate Calculator",
    description: "Simple % of max heart-rate training targets from age.",
    keywords: ["target heart rate", "exercise", "cardio"],
    fields: [{ id: "age", label: "Age", type: "number", defaultValue: 40 , suffix: "years"}, { id: "pct", label: "Target % of max", type: "number", defaultValue: 70, suffix: "%" }],
    related: ["heart-rate-zones", "calories-burned"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["age","pct"]);
      if (!parsed.ok) return err(parsed.error);
      const max = 220 - parsed.n.age;
      const target = max * (parsed.n.pct / 100);
      return ok([
        { label: "Target HR", value: fmtNumber(target, 0) + " bpm", emphasize: true },
        { label: "Est. max HR", value: String(max) + " bpm" },
      ]);
    },
  },
  {
    slug: "wallpaper-rolls",
    category: "everyday-life",
    name: "Wallpaper Rolls Calculator",
    description: "Estimate wallpaper rolls from wall area and roll coverage.",
    keywords: ["wallpaper", "rolls", "decorating"],
    fields: [{ id: "area", label: "Wall area", type: "number", defaultValue: 400, suffix: "ft\u00b2" }, { id: "coverage", label: "Coverage per roll", type: "number", defaultValue: 30, suffix: "ft\u00b2" }, { id: "waste", label: "Pattern waste", type: "number", defaultValue: 15, suffix: "%" }],
    related: ["paint-coverage", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["area","coverage","waste"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.coverage <= 0) return err("Coverage must be positive.");
      const needed = (n.area * (1 + n.waste / 100)) / n.coverage;
      return ok([
        { label: "Rolls needed", value: String(Math.ceil(needed)), emphasize: true },
        { label: "Exact", value: fmtNumber(needed, 2) },
      ]);
    },
  },
  {
    slug: "board-feet",
    category: "everyday-life",
    name: "Board Feet Calculator",
    description: "Lumber board feet from thickness, width, length, and count.",
    keywords: ["board feet", "lumber", "wood"],
    formulaNote: "BF = (T_in \u00d7 W_in \u00d7 L_ft) / 12 \u00d7 pieces",
    fields: [{ id: "t", label: "Thickness", type: "number", defaultValue: 1, suffix: "in" }, { id: "w", label: "Width", type: "number", defaultValue: 6, suffix: "in" }, { id: "l", label: "Length", type: "number", defaultValue: 8, suffix: "ft" }, { id: "qty", label: "Pieces", type: "number", defaultValue: 10, min: 1 }],
    related: ["concrete-volume", "square-footage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["t","w","l","qty"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const bf = ((n.t * n.w * n.l) / 12) * n.qty;
      return ok([{ label: "Board feet", value: fmtNumber(bf, 2), emphasize: true }]);
    },
  },
  {
    slug: "hvac-tonnage-rough",
    category: "everyday-life",
    name: "HVAC Tonnage (Rough Rule)",
    description: "Very rough AC tonnage from square footage (rule of thumb).",
    keywords: ["hvac", "ac", "tonnage", "cooling"],
    formulaNote: "~1 ton per 500\u2013600 ft\u00b2 \u2014 climate and insulation vary wildly. Consult an HVAC pro.",
    fields: [{ id: "sqft", label: "Home / room area", type: "number", defaultValue: 1800, suffix: "ft\u00b2" }, { id: "perTon", label: "ft\u00b2 per ton", type: "number", defaultValue: 550 }],
    related: ["square-footage", "paint-coverage"],
    kind: "form",
    compute: (v) => {
      const parsed = requireNums(v, ["sqft","perTon"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.perTon <= 0) return err("ft² per ton must be positive.");
      const tons = parsed.n.sqft / parsed.n.perTon;
      return ok([
        { label: "Rough tons", value: fmtNumber(tons, 2), emphasize: true },
        { label: "Note", value: "Illustrative only — get a Manual J load calculation." },
      ]);
    },
  }
];
