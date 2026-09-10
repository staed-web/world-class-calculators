import type { CalculatorMeta } from "../types";
import {
  requireNums,
  optionalNum,
  fmtMoney,
  fmtNumber,
  fmtPercent,
  parseNum,
  parseList,
  err,
  ok,
} from "./helpers";
import {
  balloonLoanPayment,
  biweeklyMortgage,
  helocPayment,
  capitalGainsRough,
  tipTaxSplitMega,
  salaryAfterTaxUs,
  salaryAfterTaxIn,
  aprVsApy,
  sipGrowthSchedule,
  distance3d,
  vectorMagnitude,
  matrixMultiply2x2,
  matrixMultiply3x3,
  complexAdd,
  complexMul,
  seriesSum,
  numericDerivative,
  numericIntegral,
  unitCircle,
  oneRepMax,
  vo2MaxEstimate,
  macrosByGoal,
  drywallSheets,
  gravelTonnage,
  acBtu,
  wireGaugeRough,
  tipByCountry,
  splitUneven,
  fuelVsEvCost,
  carbonFootprintSimple,
  projectileMotion,
  idealGasLaw,
  wavelengthFrequency,
  ohmsFromTwo,
  pythagorean3d,
  sphereGeometry,
  cylinderGeometry,
  mortgagePoints,
  creditUtilization,
  rentAffordability,
  arithmeticNth,
  geometricNth,
  radiansDegrees,
  scientificNotation,
  halfLifeRemaining,
  snellsLaw,
  lensEquation,
  concreteBags,
  deckingBoards,
  pregnancyWeightByWeek,
  bloodPressureCategory,
  subscriptionAnnual,
  unitPrice,
  movingBoxes,
  capacitanceCombo,
  dopplerShift,
  sampleFunctionPoints,
  lumberLinearFeet,
} from "../formulas/wave2";
import { sipFutureValue, compoundingSchedule } from "../formulas/finance";
import { amortizeYearlySummary } from "../formulas/catalog";

export const wave2Calculators: CalculatorMeta[] = [
  {
    slug: "apr-vs-apy",
    category: "finance",
    name: "APR vs APY Comparator",
    description: "See how compounding turns APR into a higher APY — side-by-side.",
    keywords: ["apr", "apy", "compounding", "effective rate"],
    popular: true,
    kind: "form",
    formulaNote: "APY = (1 + APR/n)^n − 1",
    fields: [
      { id: "apr", label: "APR (nominal)", type: "number", defaultValue: 5, suffix: "%", step: 0.01 },
      { id: "compounds", label: "Compounds / year", type: "select", defaultValue: "12", options: [
        { value: "1", label: "Annually" }, { value: "2", label: "Semi-annually" },
        { value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" },
        { value: "365", label: "Daily" },
      ]},
    ],
    related: ["apr-to-apy", "effective-interest", "cd-apy"],
    compute: (v) => {
      const parsed = requireNums(v, ["apr", "compounds"]);
      if (!parsed.ok) return err(parsed.error);
      const r = aprVsApy(parsed.n.apr, parsed.n.compounds);
      return ok([
        { label: "APR", value: fmtPercent(r.apr), emphasize: true },
        { label: "APY", value: fmtPercent(r.apy), emphasize: true },
        { label: "Difference", value: fmtPercent(r.difference) },
      ]);
    },
  },
  {
    slug: "balloon-loan",
    category: "finance",
    name: "Balloon Loan Calculator",
    description: "Payment and balloon balance when amortizing over a longer period than the loan term.",
    keywords: ["balloon loan", "balloon payment", "commercial loan"],
    kind: "form",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 6.5, suffix: "%" },
      { id: "amortYears", label: "Amortization period", type: "number", defaultValue: 30, suffix: "years" },
      { id: "termYears", label: "Loan term (balloon due)", type: "number", defaultValue: 5, suffix: "years" },
    ],
    related: ["mortgage", "amortization", "interest-only-mortgage"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "amortYears", "termYears"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.termYears > n.amortYears) return err("Term should not exceed amortization period.");
      const r = balloonLoanPayment(n.principal, n.rate, n.amortYears, n.termYears);
      return ok([
        { label: "Monthly payment", value: fmtMoney(r.payment), emphasize: true },
        { label: "Balloon due", value: fmtMoney(r.balloon), emphasize: true },
        { label: "Total if paid off at balloon", value: fmtMoney(r.totalPaid) },
      ]);
    },
  },
  {
    slug: "biweekly-mortgage",
    category: "finance",
    name: "Biweekly Mortgage Calculator",
    description: "Estimate interest and time saved by paying half your mortgage every two weeks.",
    keywords: ["biweekly mortgage", "biweekly payment", "payoff faster"],
    popular: true,
    kind: "form",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 6.5, suffix: "%" },
      { id: "years", label: "Term", type: "number", defaultValue: 30, suffix: "years" },
    ],
    related: ["mortgage", "amortization", "emi-extra-payments"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const r = biweeklyMortgage(parsed.n.principal, parsed.n.rate, parsed.n.years);
      return ok([
        { label: "Standard monthly", value: fmtMoney(r.monthlyPayment) },
        { label: "Biweekly payment", value: fmtMoney(r.biweeklyPayment), emphasize: true },
        { label: "Est. months saved", value: fmtNumber(r.monthsSaved, 1) },
        { label: "Est. interest saved", value: fmtMoney(r.interestSaved), emphasize: true },
      ]);
    },
  },
  {
    slug: "heloc-payment",
    category: "finance",
    name: "HELOC Payment Estimator",
    description: "Rough amortizing payment estimate for a HELOC draw (variable rates vary).",
    keywords: ["heloc", "home equity", "line of credit"],
    kind: "form",
    formulaNote: "Illustrative fixed-rate amortizing payment on drawn balance — real HELOCs are often interest-only then amortizing, with variable APR.",
    fields: [
      { id: "draw", label: "Drawn balance", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "rate", label: "APR", type: "number", defaultValue: 8.5, suffix: "%" },
      { id: "years", label: "Repayment years", type: "number", defaultValue: 15 },
    ],
    related: ["mortgage", "loan-emi", "interest-only-mortgage"],
    compute: (v) => {
      const parsed = requireNums(v, ["draw", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const pmt = helocPayment(parsed.n.draw, parsed.n.rate, parsed.n.years);
      return ok([
        { label: "Est. monthly payment", value: fmtMoney(pmt), emphasize: true },
        { label: "Total of payments", value: fmtMoney(pmt * parsed.n.years * 12) },
        { label: "Total interest (approx)", value: fmtMoney(pmt * parsed.n.years * 12 - parsed.n.draw) },
      ]);
    },
  },
  {
    slug: "capital-gains-rough",
    category: "finance",
    name: "Capital Gains Tax (Rough)",
    description: "Educational estimate of US-style capital gains tax from holding period and bracket.",
    keywords: ["capital gains", "investment tax", "stocks"],
    kind: "form",
    formulaNote: "Not tax advice. Uses simplified long-term (0/15/20) and short-term ordinary brackets.",
    fields: [
      { id: "proceeds", label: "Sale proceeds", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "basis", label: "Cost basis", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "years", label: "Holding period", type: "number", defaultValue: 2, suffix: "years", step: 0.1 },
      { id: "bracket", label: "Income bracket (rough)", type: "select", defaultValue: "mid", options: [
        { value: "low", label: "Lower" }, { value: "mid", label: "Middle" }, { value: "high", label: "Higher" },
      ]},
    ],
    related: ["roi", "investment-return", "cagr"],
    compute: (v) => {
      const parsed = requireNums(v, ["proceeds", "basis", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const bracket = (v.bracket as "low" | "mid" | "high") || "mid";
      const r = capitalGainsRough(parsed.n.proceeds, parsed.n.basis, parsed.n.years, bracket);
      return ok([
        { label: "Capital gain", value: fmtMoney(r.gain), emphasize: true },
        { label: "Assumed rate", value: fmtPercent(r.ratePct, 0) },
        { label: "Est. tax", value: fmtMoney(r.taxEst) },
        { label: "Net after tax", value: fmtMoney(r.net) },
      ]);
    },
  },
  {
    slug: "tip-tax-split-mega",
    category: "finance",
    name: "Tip + Tax + Split Mega",
    description: "Bill with sales tax, tip (pre or post tax), and even split per person.",
    keywords: ["tip", "tax", "split bill", "restaurant"],
    popular: true,
    kind: "form",
    fields: [
      { id: "bill", label: "Bill (pre-tax)", type: "number", defaultValue: 86.4, prefix: "$" },
      { id: "tax", label: "Tax rate", type: "number", defaultValue: 8.25, suffix: "%" },
      { id: "tip", label: "Tip", type: "number", defaultValue: 18, suffix: "%" },
      { id: "people", label: "People", type: "number", defaultValue: 4, min: 1 },
      { id: "tipOn", label: "Tip on", type: "select", defaultValue: "pre-tax", options: [
        { value: "pre-tax", label: "Pre-tax subtotal" }, { value: "post-tax", label: "Post-tax total" },
      ]},
    ],
    related: ["tip", "sales-tax", "split-bill"],
    compute: (v) => {
      const parsed = requireNums(v, ["bill", "tax", "tip", "people"]);
      if (!parsed.ok) return err(parsed.error);
      const tipOn = v.tipOn === "post-tax" ? "post-tax" : "pre-tax";
      const r = tipTaxSplitMega(parsed.n.bill, parsed.n.tax, parsed.n.tip, parsed.n.people, tipOn);
      return ok([
        { label: "Tax", value: fmtMoney(r.tax) },
        { label: "Tip", value: fmtMoney(r.tip) },
        { label: "Grand total", value: fmtMoney(r.total), emphasize: true },
        { label: "Per person", value: fmtMoney(r.perPerson), emphasize: true },
      ]);
    },
  },
  {
    slug: "salary-after-tax-us",
    category: "finance",
    name: "Salary After Tax (US Rough)",
    description: "Rough US take-home from federal income tax + FICA. State taxes not included.",
    keywords: ["paycheck", "after tax", "take home", "federal tax"],
    kind: "form",
    formulaNote: "Educational only — simplified 2025/26-style brackets, standard deduction, SS wage base. Not tax advice.",
    fields: [
      { id: "gross", label: "Annual gross", type: "number", defaultValue: 90000, prefix: "$" },
      { id: "filing", label: "Filing status", type: "select", defaultValue: "single", options: [
        { value: "single", label: "Single" }, { value: "married", label: "Married filing jointly" },
      ]},
    ],
    related: ["paycheck-estimator", "hourly-to-salary", "salary-hike"],
    compute: (v) => {
      const parsed = requireNums(v, ["gross"]);
      if (!parsed.ok) return err(parsed.error);
      const filing = v.filing === "married" ? "married" : "single";
      const r = salaryAfterTaxUs(parsed.n.gross, filing);
      return ok([
        { label: "Est. net annual", value: fmtMoney(r.net), emphasize: true },
        { label: "Est. monthly net", value: fmtMoney(r.net / 12) },
        { label: "Federal income tax", value: fmtMoney(r.federal) },
        { label: "FICA (SS + Medicare)", value: fmtMoney(r.fica) },
        { label: "Effective federal+FICA", value: fmtPercent(r.effectivePct) },
      ]);
    },
  },
  {
    slug: "salary-after-tax-in",
    category: "finance",
    name: "Salary After Tax (illustrative slabs)",
    description: "Illustrative salary after-tax / take-home sketch using sample progressive slabs (educational). Not an official tax utility.",
    keywords: ["income tax", "take home", "after tax", "salary net", "illustrative slabs"],
    kind: "form",
    formulaNote: "Simplified sample slabs with an illustrative low-income rebate. Not tax advice; ignores deductions/exemptions nuance and local law.",
    fields: [
      { id: "gross", label: "Annual CTC / taxable income", type: "number", defaultValue: 1200000, prefix: "" },
    ],
    related: ["salary-hike", "paycheck-estimator"],
    compute: (v) => {
      const parsed = requireNums(v, ["gross"]);
      if (!parsed.ok) return err(parsed.error);
      const r = salaryAfterTaxIn(parsed.n.gross);
      return ok([
        { label: "Est. net annual", value: fmtNumber(r.net, 0), emphasize: true },
        { label: "Est. monthly net", value: fmtNumber(r.net / 12, 0) },
        { label: "Income tax", value: fmtNumber(r.tax, 0) },
        { label: "Cess (4%)", value: fmtNumber(r.cess, 0) },
        { label: "Effective rate", value: fmtPercent(r.effectivePct) },
      ]);
    },
  },
  {
    slug: "mortgage-points",
    category: "finance",
    name: "Mortgage Points Calculator",
    description: "Estimate upfront cost and monthly savings from buying discount points (rule-of-thumb).",
    keywords: ["mortgage points", "discount points", "buy down rate"],
    kind: "form",
    formulaNote: "Assumes ~0.25% rate reduction per point — shop actual lender quotes.",
    fields: [
      { id: "loan", label: "Loan amount", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "rate", label: "Base rate", type: "number", defaultValue: 6.75, suffix: "%" },
      { id: "years", label: "Term", type: "number", defaultValue: 30 },
      { id: "points", label: "Points purchased", type: "number", defaultValue: 1, step: 0.125 },
    ],
    related: ["mortgage", "refinance", "amortization"],
    compute: (v) => {
      const parsed = requireNums(v, ["loan", "rate", "years", "points"]);
      if (!parsed.ok) return err(parsed.error);
      const r = mortgagePoints(parsed.n.loan, parsed.n.rate, parsed.n.years, parsed.n.points);
      return ok([
        { label: "Upfront cost", value: fmtMoney(r.upfront) },
        { label: "New rate (est.)", value: fmtPercent(r.newRate) },
        { label: "Old payment", value: fmtMoney(r.oldPmt) },
        { label: "New payment", value: fmtMoney(r.newPmt), emphasize: true },
        { label: "Monthly save", value: fmtMoney(r.monthlySave) },
        { label: "Break-even", value: Number.isFinite(r.breakEvenMonths) ? fmtNumber(r.breakEvenMonths, 1) + " months" : "N/A" },
      ]);
    },
  },
  {
    slug: "credit-utilization",
    category: "finance",
    name: "Credit Utilization Calculator",
    description: "Overall credit card utilization from balances and limits (comma-separated).",
    keywords: ["credit utilization", "credit score", "revolving credit"],
    kind: "form",
    fields: [
      { id: "balances", label: "Balances", type: "text", defaultValue: "1200, 800, 0", placeholder: "e.g. 1200, 800" },
      { id: "limits", label: "Limits", type: "text", defaultValue: "5000, 3000, 2000", placeholder: "e.g. 5000, 3000" },
    ],
    related: ["credit-card-payoff", "debt-payoff", "debt-to-income"],
    compute: (v) => {
      const balances = parseList(v.balances ?? "");
      const limits = parseList(v.limits ?? "");
      if (!balances.length || balances.length !== limits.length) return err("Enter matching balances and limits lists.");
      const r = creditUtilization(balances, limits);
      return ok([
        { label: "Utilization", value: fmtPercent(r.utilPct), emphasize: true },
        { label: "Total balances", value: fmtMoney(r.totalBal) },
        { label: "Total limits", value: fmtMoney(r.totalLim) },
        { label: "Hint", value: r.utilPct < 30 ? "Under 30% is a common target." : "Consider paying down toward <30%." },
      ]);
    },
  },
  {
    slug: "rent-affordability",
    category: "finance",
    name: "Rent Affordability Calculator",
    description: "How much rent fits common 25–30% of gross income rules of thumb.",
    keywords: ["rent", "affordability", "housing"],
    kind: "form",
    fields: [
      { id: "gross", label: "Gross monthly income", type: "number", defaultValue: 6000, prefix: "$" },
      { id: "rule", label: "Rule", type: "select", defaultValue: "30", options: [
        { value: "30", label: "30% rule" }, { value: "28", label: "28% rule" }, { value: "25", label: "25% rule" },
      ]},
    ],
    related: ["rent-vs-buy", "budget-percent", "debt-to-income"],
    compute: (v) => {
      const parsed = requireNums(v, ["gross"]);
      if (!parsed.ok) return err(parsed.error);
      const rule = (v.rule as "30" | "28" | "25") || "30";
      const max = rentAffordability(parsed.n.gross, rule);
      return ok([
        { label: "Max rent (rule)", value: fmtMoney(max), emphasize: true },
        { label: "Annual rent", value: fmtMoney(max * 12) },
      ]);
    },
  },
  {
    slug: "auto-lease-payment",
    category: "finance",
    name: "Auto Lease Payment Estimator",
    description: "Simple lease payment from cap cost, residual, money factor, and term.",
    keywords: ["car lease", "auto lease", "lease payment"],
    kind: "form",
    formulaNote: "Payment ≈ (depreciation + finance fee) / months. Money factor ≈ APR/2400.",
    fields: [
      { id: "cap", label: "Net capitalized cost", type: "number", defaultValue: 32000, prefix: "$" },
      { id: "residual", label: "Residual value", type: "number", defaultValue: 18000, prefix: "$" },
      { id: "mf", label: "Money factor", type: "number", defaultValue: 0.0025, step: 0.0001 },
      { id: "months", label: "Term", type: "number", defaultValue: 36, suffix: "months" },
    ],
    related: ["car-loan", "lease-vs-buy", "loan-emi"],
    compute: (v) => {
      const parsed = requireNums(v, ["cap", "residual", "mf", "months"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.months <= 0) return err("Term must be positive.");
      const depreciation = (n.cap - n.residual) / n.months;
      const finance = (n.cap + n.residual) * n.mf;
      const pmt = depreciation + finance;
      return ok([
        { label: "Est. monthly lease", value: fmtMoney(pmt), emphasize: true },
        { label: "Depreciation portion", value: fmtMoney(depreciation) },
        { label: "Rent/finance charge", value: fmtMoney(finance) },
        { label: "Approx APR", value: fmtPercent(n.mf * 2400) },
      ]);
    },
  },
  {
    slug: "closing-cost-estimate",
    category: "finance",
    name: "Closing Cost Estimate",
    description: "Rough buyer closing costs as a percent of purchase price plus lender fees.",
    keywords: ["closing costs", "home buying", "escrow"],
    kind: "form",
    fields: [
      { id: "price", label: "Purchase price", type: "number", defaultValue: 450000, prefix: "$" },
      { id: "pct", label: "Closing % (typical 2–5%)", type: "number", defaultValue: 3, suffix: "%" },
      { id: "lender", label: "Lender / origination fees", type: "number", defaultValue: 1500, prefix: "$" },
    ],
    related: ["mortgage", "down-payment", "refinance"],
    compute: (v) => {
      const parsed = requireNums(v, ["price", "pct", "lender"]);
      if (!parsed.ok) return err(parsed.error);
      const base = parsed.n.price * (parsed.n.pct / 100);
      const total = base + parsed.n.lender;
      return ok([
        { label: "Est. closing costs", value: fmtMoney(total), emphasize: true },
        { label: "Percent-based portion", value: fmtMoney(base) },
        { label: "Lender fees", value: fmtMoney(parsed.n.lender) },
      ]);
    },
  },
  {
    slug: "property-tax-estimate",
    category: "finance",
    name: "Property Tax Estimate",
    description: "Annual and monthly property tax from assessed value and millage / tax rate.",
    keywords: ["property tax", "real estate tax", "mill rate"],
    kind: "form",
    fields: [
      { id: "value", label: "Assessed / home value", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "rate", label: "Annual tax rate", type: "number", defaultValue: 1.1, suffix: "%", step: 0.01 },
    ],
    related: ["mortgage", "rent-vs-buy"],
    compute: (v) => {
      const parsed = requireNums(v, ["value", "rate"]);
      if (!parsed.ok) return err(parsed.error);
      const annual = parsed.n.value * (parsed.n.rate / 100);
      return ok([
        { label: "Annual tax", value: fmtMoney(annual), emphasize: true },
        { label: "Monthly escrow", value: fmtMoney(annual / 12) },
      ]);
    },
  },
  {
    slug: "stock-average-cost",
    category: "finance",
    name: "Stock Average Cost Calculator",
    description: "Average cost basis after multiple buys (shares and prices).",
    keywords: ["average cost", "dca", "cost basis", "shares"],
    kind: "form",
    fields: [
      { id: "shares", label: "Share quantities", type: "text", defaultValue: "10, 15, 5", helpText: "Comma-separated" },
      { id: "prices", label: "Prices per share", type: "text", defaultValue: "100, 90, 110" },
    ],
    related: ["roi", "investment-return", "cagr"],
    compute: (v) => {
      const shares = parseList(v.shares ?? "");
      const prices = parseList(v.prices ?? "");
      if (!shares.length || shares.length !== prices.length) return err("Matching shares and prices required.");
      const cost = shares.reduce((s, q, i) => s + q * prices[i], 0);
      const totalShares = shares.reduce((a, b) => a + b, 0);
      const avg = cost / totalShares;
      return ok([
        { label: "Average cost / share", value: fmtMoney(avg), emphasize: true },
        { label: "Total shares", value: fmtNumber(totalShares, 4) },
        { label: "Total invested", value: fmtMoney(cost) },
      ]);
    },
  },
  {
    slug: "ira-contribution-room",
    category: "finance",
    name: "IRA Contribution Room",
    description: "Remaining IRA contribution room from annual limit and YTD contributions.",
    keywords: ["ira", "roth", "contribution limit", "retirement"],
    kind: "form",
    fields: [
      { id: "limit", label: "Annual limit", type: "number", defaultValue: 7000, prefix: "$" },
      { id: "ytd", label: "Contributed YTD", type: "number", defaultValue: 2500, prefix: "$" },
      { id: "catchup", label: "Catch-up eligible?", type: "select", defaultValue: "no", options: [
        { value: "no", label: "No" }, { value: "yes", label: "Yes (+$1,000 illustrative)" },
      ]},
    ],
    related: ["401k-contribution", "retirement", "savings-goal"],
    compute: (v) => {
      const parsed = requireNums(v, ["limit", "ytd"]);
      if (!parsed.ok) return err(parsed.error);
      const lim = parsed.n.limit + (v.catchup === "yes" ? 1000 : 0);
      const room = Math.max(0, lim - parsed.n.ytd);
      return ok([
        { label: "Contribution room left", value: fmtMoney(room), emphasize: true },
        { label: "Effective limit", value: fmtMoney(lim) },
      ]);
    },
  },
  {
    slug: "distance-3d",
    category: "math",
    name: "3D Distance Calculator",
    description: "Euclidean distance between two points in 3D space.",
    keywords: ["3d distance", "euclidean", "space distance"],
    featured: true,
    kind: "form",
    formulaNote: "d = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]",
    fields: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 0 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 0 },
      { id: "z1", label: "z₁", type: "number", defaultValue: 0 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 3 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 4 },
      { id: "z2", label: "z₂", type: "number", defaultValue: 12 },
    ],
    related: ["distance-formula", "pythagoras", "vector-magnitude"],
    compute: (v) => {
      const parsed = requireNums(v, ["x1","y1","z1","x2","y2","z2"], { emptyAsZero: ["x1","y1","z1","x2","y2","z2"] });
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const d = distance3d(n.x1,n.y1,n.z1,n.x2,n.y2,n.z2);
      return ok([{ label: "Distance", value: fmtNumber(d, 6), emphasize: true }]);
    },
  },
  {
    slug: "vector-magnitude",
    category: "math",
    name: "Vector Magnitude Calculator",
    description: "Length (magnitude) of a 2D or 3D vector.",
    keywords: ["vector", "magnitude", "norm", "length"],
    kind: "form",
    fields: [
      { id: "x", label: "x", type: "number", defaultValue: 3 },
      { id: "y", label: "y", type: "number", defaultValue: 4 },
      { id: "z", label: "z (optional)", type: "number", defaultValue: 0 },
    ],
    related: ["distance-3d", "pythagoras"],
    compute: (v) => {
      const parsed = requireNums(v, ["x","y"]);
      if (!parsed.ok) return err(parsed.error);
      const z = optionalNum(v, "z") ?? 0;
      const m = vectorMagnitude(parsed.n.x, parsed.n.y, z);
      return ok([{ label: "Magnitude", value: fmtNumber(m, 6), emphasize: true }]);
    },
  },
  {
    slug: "matrix-multiply-2x2",
    category: "math",
    name: "Matrix Multiply 2×2",
    description: "Multiply two 2×2 matrices (row-major entries).",
    keywords: ["matrix", "multiply", "linear algebra", "2x2"],
    kind: "form",
    fields: [
      { id: "a", label: "Matrix A (a11,a12,a21,a22)", type: "text", defaultValue: "1, 2, 3, 4" },
      { id: "b", label: "Matrix B", type: "text", defaultValue: "5, 6, 7, 8" },
    ],
    related: ["matrix-2x2-determinant", "matrix-multiply-3x3"],
    compute: (v) => {
      const a = parseList(v.a ?? "");
      const b = parseList(v.b ?? "");
      if (a.length !== 4 || b.length !== 4) return err("Each matrix needs 4 numbers.");
      const m = matrixMultiply2x2(a, b);
      return ok([
        { label: "Result", value: `[[${fmtNumber(m[0],4)}, ${fmtNumber(m[1],4)}], [${fmtNumber(m[2],4)}, ${fmtNumber(m[3],4)}]]`, emphasize: true },
      ]);
    },
  },
  {
    slug: "matrix-multiply-3x3",
    category: "math",
    name: "Matrix Multiply 3×3",
    description: "Multiply two 3×3 matrices (9 comma-separated values each, row-major).",
    keywords: ["matrix", "3x3", "multiply"],
    kind: "form",
    fields: [
      { id: "a", label: "Matrix A (9 values)", type: "text", defaultValue: "1,0,0, 0,1,0, 0,0,1" },
      { id: "b", label: "Matrix B (9 values)", type: "text", defaultValue: "2,3,4, 5,6,7, 8,9,10" },
    ],
    related: ["matrix-multiply-2x2", "matrix-2x2-determinant"],
    compute: (v) => {
      const a = parseList(v.a ?? "");
      const b = parseList(v.b ?? "");
      if (a.length !== 9 || b.length !== 9) return err("Each matrix needs 9 numbers.");
      const m = matrixMultiply3x3(a, b);
      const rows = [0,1,2].map(i => `[${m.slice(i*3,i*3+3).map(x => fmtNumber(x,4)).join(", ")}]`);
      return ok([{ label: "Result rows", value: rows.join(" "), emphasize: true }]);
    },
  },
  {
    slug: "complex-numbers",
    category: "math",
    name: "Complex Number Calculator",
    description: "Add or multiply two complex numbers; see magnitude and argument.",
    keywords: ["complex", "imaginary", "phasor"],
    kind: "form",
    fields: [
      { id: "op", label: "Operation", type: "select", defaultValue: "add", options: [
        { value: "add", label: "Add" }, { value: "mul", label: "Multiply" },
      ]},
      { id: "aRe", label: "A real", type: "number", defaultValue: 3 },
      { id: "aIm", label: "A imaginary", type: "number", defaultValue: 2 },
      { id: "bRe", label: "B real", type: "number", defaultValue: 1 },
      { id: "bIm", label: "B imaginary", type: "number", defaultValue: -4 },
    ],
    related: ["quadratic", "vector-magnitude"],
    compute: (v) => {
      const parsed = requireNums(v, ["aRe","aIm","bRe","bIm"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (v.op === "mul") {
        const r = complexMul(n.aRe,n.aIm,n.bRe,n.bIm);
        return ok([
          { label: "Product", value: `${fmtNumber(r.re,4)} ${r.im >= 0 ? "+" : "−"} ${fmtNumber(Math.abs(r.im),4)}i`, emphasize: true },
          { label: "Magnitude", value: fmtNumber(r.mag, 4) },
        ]);
      }
      const r = complexAdd(n.aRe,n.aIm,n.bRe,n.bIm);
      return ok([
        { label: "Sum", value: `${fmtNumber(r.re,4)} ${r.im >= 0 ? "+" : "−"} ${fmtNumber(Math.abs(r.im),4)}i`, emphasize: true },
        { label: "Magnitude", value: fmtNumber(r.mag, 4) },
        { label: "Arg (deg)", value: fmtNumber(r.argDeg, 4) },
      ]);
    },
  },
  {
    slug: "series-sum",
    category: "math",
    name: "Series Sum Calculator",
    description: "Sum of arithmetic or geometric series for n terms.",
    keywords: ["series", "arithmetic", "geometric", "sum"],
    kind: "form",
    fields: [
      { id: "kind", label: "Type", type: "select", defaultValue: "arithmetic", options: [
        { value: "arithmetic", label: "Arithmetic" }, { value: "geometric", label: "Geometric" },
      ]},
      { id: "first", label: "First term a₁", type: "number", defaultValue: 2 },
      { id: "diff", label: "Common difference / ratio", type: "number", defaultValue: 3 },
      { id: "n", label: "Terms n", type: "number", defaultValue: 10, min: 1 },
    ],
    related: ["arithmetic-sequence", "geometric-sequence", "fibonacci"],
    compute: (v) => {
      const parsed = requireNums(v, ["first","diff","n"]);
      if (!parsed.ok) return err(parsed.error);
      const kind = v.kind === "geometric" ? "geometric" : "arithmetic";
      const s = seriesSum(parsed.n.first, parsed.n.diff, parsed.n.n, kind);
      return ok([{ label: "Sum Sₙ", value: fmtNumber(s, 6), emphasize: true }]);
    },
  },
  {
    slug: "arithmetic-sequence",
    category: "math",
    name: "Arithmetic Sequence Term",
    description: "Find the nth term of an arithmetic sequence.",
    keywords: ["arithmetic sequence", "nth term"],
    kind: "form",
    fields: [
      { id: "a1", label: "First term", type: "number", defaultValue: 5 },
      { id: "d", label: "Common difference", type: "number", defaultValue: 3 },
      { id: "n", label: "n", type: "number", defaultValue: 10, min: 1 },
    ],
    related: ["series-sum", "geometric-sequence"],
    compute: (v) => {
      const parsed = requireNums(v, ["a1","d","n"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: `a₍${parsed.n.n}₎`, value: fmtNumber(arithmeticNth(parsed.n.a1, parsed.n.d, parsed.n.n), 6), emphasize: true }]);
    },
  },
  {
    slug: "geometric-sequence",
    category: "math",
    name: "Geometric Sequence Term",
    description: "Find the nth term of a geometric sequence.",
    keywords: ["geometric sequence", "nth term", "ratio"],
    kind: "form",
    fields: [
      { id: "a1", label: "First term", type: "number", defaultValue: 2 },
      { id: "r", label: "Common ratio", type: "number", defaultValue: 3 },
      { id: "n", label: "n", type: "number", defaultValue: 6, min: 1 },
    ],
    related: ["series-sum", "arithmetic-sequence"],
    compute: (v) => {
      const parsed = requireNums(v, ["a1","r","n"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: `a₍${parsed.n.n}₎`, value: fmtNumber(geometricNth(parsed.n.a1, parsed.n.r, parsed.n.n), 6), emphasize: true }]);
    },
  },
  {
    slug: "derivative-numeric",
    category: "math",
    name: "Numeric Derivative",
    description: "Approximate f′(x) with a central difference for common functions.",
    keywords: ["derivative", "calculus", "numeric"],
    kind: "form",
    fields: [
      { id: "fn", label: "Function", type: "select", defaultValue: "poly", options: [
        { value: "poly", label: "ax² + bx + c" }, { value: "sin", label: "sin(x)" },
        { value: "cos", label: "cos(x)" }, { value: "exp", label: "exp(x)" }, { value: "ln", label: "ln(x)" },
      ]},
      { id: "x", label: "x", type: "number", defaultValue: 1, step: 0.1 },
      { id: "a", label: "a (poly)", type: "number", defaultValue: 1, advanced: true },
      { id: "b", label: "b (poly)", type: "number", defaultValue: 0, advanced: true },
      { id: "c", label: "c (poly)", type: "number", defaultValue: 0, advanced: true },
    ],
    related: ["integral-numeric", "quadratic"],
    compute: (v) => {
      const parsed = requireNums(v, ["x","a","b","c"], { emptyAsZero: ["a","b","c"] });
      if (!parsed.ok) return err(parsed.error);
      const fn = (v.fn as "poly"|"sin"|"cos"|"exp"|"ln") || "poly";
      const d = numericDerivative(parsed.n.x, fn, parsed.n.a, parsed.n.b, parsed.n.c);
      return ok([{ label: "f′(x) ≈", value: fmtNumber(d, 8), emphasize: true }]);
    },
  },
  {
    slug: "integral-numeric",
    category: "math",
    name: "Numeric Integral",
    description: "Trapezoidal rule integral of common functions on [a, b].",
    keywords: ["integral", "calculus", "area under curve"],
    kind: "form",
    fields: [
      { id: "fn", label: "Function", type: "select", defaultValue: "sin", options: [
        { value: "poly", label: "ax² + bx + c" }, { value: "sin", label: "sin(x)" },
        { value: "cos", label: "cos(x)" }, { value: "exp", label: "exp(x)" },
      ]},
      { id: "lo", label: "Lower bound", type: "number", defaultValue: 0 },
      { id: "hi", label: "Upper bound", type: "number", defaultValue: 3.14159 },
      { id: "a", label: "a (poly)", type: "number", defaultValue: 1, advanced: true },
      { id: "b", label: "b (poly)", type: "number", defaultValue: 0, advanced: true },
      { id: "c", label: "c (poly)", type: "number", defaultValue: 0, advanced: true },
    ],
    related: ["derivative-numeric", "graphing-calculator"],
    compute: (v) => {
      const parsed = requireNums(v, ["lo","hi","a","b","c"], { emptyAsZero: ["lo","a","b","c"] });
      if (!parsed.ok) return err(parsed.error);
      const fn = (v.fn as "poly"|"sin"|"cos"|"exp") || "sin";
      const i = numericIntegral(parsed.n.lo, parsed.n.hi, fn, parsed.n.a, parsed.n.b, parsed.n.c);
      const pts = sampleFunctionPoints(fn === "poly" ? "poly" : fn, parsed.n.lo, parsed.n.hi, 40, parsed.n.a, parsed.n.b, parsed.n.c);
      return ok([
        { label: "∫ f(x) dx ≈", value: fmtNumber(i, 8), emphasize: true },
        {
          label: "Function shape",
          value: `${pts.length} samples`,
          lineChart: {
            xKey: "x",
            series: [{ key: "y", label: "f(x)", color: "#0d9488" }],
            points: pts.map((p) => ({ x: Number(p.x.toFixed(3)), y: p.y })),
          },
        },
      ]);
    },
  },
  {
    slug: "unit-circle",
    category: "math",
    name: "Unit Circle Calculator",
    description: "Sine, cosine, tangent and coordinates for an angle on the unit circle.",
    keywords: ["unit circle", "trigonometry", "sin cos"],
    popular: true,
    kind: "form",
    fields: [
      { id: "deg", label: "Angle", type: "number", defaultValue: 45, suffix: "°" },
    ],
    related: ["pythagoras", "radians-degrees", "triangle-solver"],
    compute: (v) => {
      const parsed = requireNums(v, ["deg"]);
      if (!parsed.ok) return err(parsed.error);
      const r = unitCircle(parsed.n.deg);
      return ok([
        { label: "Radians", value: fmtNumber(r.rad, 6) },
        { label: "cos θ (x)", value: fmtNumber(r.cos, 6), emphasize: true },
        { label: "sin θ (y)", value: fmtNumber(r.sin, 6), emphasize: true },
        { label: "tan θ", value: Number.isFinite(r.tan) ? fmtNumber(r.tan, 6) : "undefined" },
      ]);
    },
  },
  {
    slug: "radians-degrees",
    category: "math",
    name: "Radians ↔ Degrees",
    description: "Convert angles between radians and degrees.",
    keywords: ["radians", "degrees", "angle convert"],
    kind: "form",
    fields: [
      { id: "mode", label: "Convert", type: "select", defaultValue: "to-deg", options: [
        { value: "to-deg", label: "Radians → degrees" }, { value: "to-rad", label: "Degrees → radians" },
      ]},
      { id: "value", label: "Value", type: "number", defaultValue: 1.5708 },
    ],
    related: ["unit-circle", "angle-converter"],
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const mode = v.mode === "to-rad" ? "to-rad" : "to-deg";
      const out = radiansDegrees(parsed.n.value, mode);
      return ok([{ label: "Result", value: fmtNumber(out, 8), emphasize: true }]);
    },
  },
  {
    slug: "scientific-notation",
    category: "math",
    name: "Scientific Notation Converter",
    description: "Express a number as a × 10^n.",
    keywords: ["scientific notation", "exponent", "orders of magnitude"],
    kind: "form",
    fields: [{ id: "n", label: "Number", type: "number", defaultValue: 123456 }],
    related: ["exponent", "logarithm"],
    compute: (v) => {
      const parsed = requireNums(v, ["n"]);
      if (!parsed.ok) return err(parsed.error);
      const r = scientificNotation(parsed.n.n);
      return ok([
        { label: "Scientific notation", value: r.formatted, emphasize: true },
        { label: "Coefficient", value: fmtNumber(r.coefficient, 6) },
        { label: "Exponent", value: String(r.exponent) },
      ]);
    },
  },
  {
    slug: "graphing-calculator",
    category: "math",
    name: "Simple Graphing Calculator",
    description: "Plot sin, cos, exp, or a quadratic over a chosen x-range.",
    keywords: ["graphing", "plot", "function graph"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "fn", label: "Function", type: "select", defaultValue: "sin", options: [
        { value: "sin", label: "sin(x)" }, { value: "cos", label: "cos(x)" },
        { value: "exp", label: "exp(x)" }, { value: "poly", label: "ax² + bx + c" },
      ]},
      { id: "xMin", label: "x min", type: "number", defaultValue: -6.28 },
      { id: "xMax", label: "x max", type: "number", defaultValue: 6.28 },
      { id: "a", label: "a (poly)", type: "number", defaultValue: 1, advanced: true, helpText: "Used when Function = ax² + bx + c" },
      { id: "b", label: "b (poly)", type: "number", defaultValue: 0, advanced: true },
      { id: "c", label: "c (poly)", type: "number", defaultValue: 0, advanced: true },
    ],
    related: ["derivative-numeric", "integral-numeric", "3d-function"],
    compute: (v) => {
      const parsed = requireNums(v, ["xMin","xMax","a","b","c"], { emptyAsZero: ["a","b","c"] });
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.xMax <= parsed.n.xMin) return err("x max must be greater than x min.");
      const fn = (v.fn as "sin"|"cos"|"exp"|"poly") || "sin";
      const pts = sampleFunctionPoints(fn, parsed.n.xMin, parsed.n.xMax, 60, parsed.n.a, parsed.n.b, parsed.n.c);
      const ys = pts.map((p) => p.y);
      return ok([
        { label: "Samples", value: String(pts.length), emphasize: true },
        { label: "y min / max", value: `${fmtNumber(Math.min(...ys),4)} … ${fmtNumber(Math.max(...ys),4)}` },
        {
          label: "Graph",
          value: "Interactive plot",
          lineChart: {
            xKey: "x",
            series: [{ key: "y", label: "f(x)", color: "#4f46e5" }],
            points: pts.map((p) => ({ x: Number(p.x.toFixed(3)), y: p.y })),
          },
        },
      ]);
    },
  },
  {
    slug: "pythagoras-3d",
    category: "math",
    name: "3D Pythagoras / Space Diagonal",
    description: "2D hypotenuse and optional 3D rectangular box space diagonal — with 3D view.",
    keywords: ["pythagoras 3d", "space diagonal", "right triangle"],
    featured: true,
    kind: "custom",
    customKey: "pythagoras-3d",
    fields: [
      { id: "a", label: "Side a", type: "number", defaultValue: 3 },
      { id: "b", label: "Side b", type: "number", defaultValue: 4 },
      { id: "c", label: "Side c (depth)", type: "number", defaultValue: 12 },
    ],
    related: ["pythagoras", "distance-3d", "3d-function"],
    compute: (v) => {
      const parsed = requireNums(v, ["a","b","c"]);
      if (!parsed.ok) return err(parsed.error);
      const r = pythagorean3d(parsed.n.a, parsed.n.b, parsed.n.c);
      return ok([
        { label: "2D hypotenuse √(a²+b²)", value: fmtNumber(r.hypotenuse2d, 6) },
        { label: "Space diagonal √(a²+b²+c²)", value: fmtNumber(r.spaceDiagonal ?? NaN, 6), emphasize: true },
      ]);
    },
  },
  {
    slug: "3d-function",
    category: "math",
    name: "3D Function Plotter",
    description: "Interactive 3D surface for z = sin(√(x²+y²)) and related demos.",
    keywords: ["3d graph", "surface plot", "function plotter"],
    featured: true,
    popular: true,
    kind: "custom",
    customKey: "3d-function",
    related: ["graphing-calculator", "pythagoras-3d", "sphere-geometry-demo"],
  },
  {
    slug: "sphere-geometry-demo",
    category: "math",
    name: "3D Sphere Geometry",
    description: "Volume and surface area with an interactive 3D sphere.",
    keywords: ["sphere", "volume", "surface area", "3d"],
    kind: "custom",
    customKey: "sphere-3d",
    fields: [{ id: "r", label: "Radius", type: "number", defaultValue: 2, min: 0.1, step: 0.1 }],
    related: ["sphere-volume", "cylinder-geometry-demo", "3d-function"],
    compute: (v) => {
      const parsed = requireNums(v, ["r"]);
      if (!parsed.ok) return err(parsed.error);
      const r = sphereGeometry(parsed.n.r);
      return ok([
        { label: "Volume", value: fmtNumber(r.volume, 6), emphasize: true },
        { label: "Surface area", value: fmtNumber(r.surface, 6) },
        { label: "Diameter", value: fmtNumber(r.diameter, 4) },
      ]);
    },
  },
  {
    slug: "cylinder-geometry-demo",
    category: "math",
    name: "3D Cylinder Geometry",
    description: "Cylinder volume and surface with interactive 3D preview.",
    keywords: ["cylinder", "volume", "3d geometry"],
    kind: "custom",
    customKey: "cylinder-3d",
    fields: [
      { id: "r", label: "Radius", type: "number", defaultValue: 2, min: 0.1 },
      { id: "h", label: "Height", type: "number", defaultValue: 5, min: 0.1 },
    ],
    related: ["cylinder", "sphere-geometry-demo", "cone-volume"],
    compute: (v) => {
      const parsed = requireNums(v, ["r","h"]);
      if (!parsed.ok) return err(parsed.error);
      const r = cylinderGeometry(parsed.n.r, parsed.n.h);
      return ok([
        { label: "Volume", value: fmtNumber(r.volume, 6), emphasize: true },
        { label: "Lateral area", value: fmtNumber(r.lateral, 6) },
        { label: "Total surface", value: fmtNumber(r.totalSurface, 6) },
      ]);
    },
  },
  {
    slug: "compound-interest-3d",
    category: "finance",
    name: "Compound Growth 3D Bars",
    description: "Year-by-year compound growth with animated 3D bar visualization.",
    keywords: ["compound interest 3d", "growth chart", "investment visualization"],
    featured: true,
    kind: "custom",
    customKey: "compound-3d",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 8, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 12, min: 1, max: 30 },
    ],
    related: ["compound-interest", "sip", "compounding"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal","rate","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const schedule = compoundingSchedule(n.principal, n.rate, n.years, 12);
      const final = schedule[schedule.length - 1]?.balance ?? n.principal;
      return ok([
        { label: "Final balance", value: fmtMoney(final), emphasize: true },
        { label: "Total interest", value: fmtMoney(final - n.principal) },
        {
          label: "Growth by year",
          value: `${schedule.length} years`,
          lineChart: {
            xKey: "year",
            series: [
              { key: "balance", label: "Balance", color: "#0d9488" },
            ],
            points: schedule.map((r) => ({ year: r.year, balance: r.balance })),
          },
        },
      ]);
    },
  },
  {
    slug: "one-rep-max",
    category: "health-fitness",
    name: "One-Rep Max Calculator",
    description: "Estimate 1RM from weight lifted and reps (Epley or Brzycki).",
    keywords: ["1rm", "one rep max", "strength"],
    popular: true,
    kind: "form",
    fields: [
      { id: "weight", label: "Weight lifted", type: "number", defaultValue: 185, suffix: "lb" },
      { id: "reps", label: "Reps", type: "number", defaultValue: 5, min: 1, max: 12 },
      { id: "formula", label: "Formula", type: "select", defaultValue: "epley", options: [
        { value: "epley", label: "Epley" }, { value: "brzycki", label: "Brzycki" },
      ]},
    ],
    related: ["macros", "calories-burned", "ideal-weight"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight","reps"]);
      if (!parsed.ok) return err(parsed.error);
      const formula = v.formula === "brzycki" ? "brzycki" : "epley";
      const orm = oneRepMax(parsed.n.weight, parsed.n.reps, formula);
      return ok([
        { label: "Est. 1RM", value: fmtNumber(orm, 1) + " lb", emphasize: true },
        { label: "90%", value: fmtNumber(orm * 0.9, 1) + " lb" },
        { label: "80%", value: fmtNumber(orm * 0.8, 1) + " lb" },
        { label: "70%", value: fmtNumber(orm * 0.7, 1) + " lb" },
      ]);
    },
  },
  {
    slug: "vo2-max-estimate",
    category: "health-fitness",
    name: "VO₂ Max Estimate",
    description: "Rough VO₂ max from Cooper 12-min run distance (educational).",
    keywords: ["vo2 max", "cardio fitness", "cooper test"],
    kind: "form",
    formulaNote: "Cooper: VO₂ ≈ (distance_m − 504.9) / 44.73. Not a lab test.",
    fields: [
      { id: "meters", label: "12-min distance", type: "number", defaultValue: 2400, suffix: "m" },
    ],
    related: ["pace", "heart-rate-zones", "calories-burned"],
    compute: (v) => {
      const parsed = requireNums(v, ["meters"]);
      if (!parsed.ok) return err(parsed.error);
      const vo2 = vo2MaxEstimate(parsed.n.meters, 12, "cooper");
      return ok([
        { label: "Est. VO₂ max", value: fmtNumber(vo2, 1) + " mL/kg/min", emphasize: true },
        { label: "Note", value: "Fitness estimate only — not medical advice." },
      ]);
    },
  },
  {
    slug: "macros-by-goal",
    category: "health-fitness",
    name: "Macros by Goal",
    description: "Protein, fat, and carbs from TDEE and lose / maintain / gain goal.",
    keywords: ["macros", "cut", "bulk", "macros by goal"],
    popular: true,
    kind: "form",
    fields: [
      { id: "tdee", label: "TDEE", type: "number", defaultValue: 2400, suffix: "kcal" },
      { id: "weight", label: "Body weight", type: "number", defaultValue: 75, suffix: "kg" },
      { id: "goal", label: "Goal", type: "select", defaultValue: "lose", options: [
        { value: "lose", label: "Lose (~−20%)" }, { value: "maintain", label: "Maintain" }, { value: "gain", label: "Gain (~+10%)" },
      ]},
    ],
    related: ["macros", "tdee", "protein-need"],
    compute: (v) => {
      const parsed = requireNums(v, ["tdee","weight"]);
      if (!parsed.ok) return err(parsed.error);
      const goal = (v.goal as "lose"|"maintain"|"gain") || "lose";
      const r = macrosByGoal(parsed.n.tdee, goal, parsed.n.weight);
      return ok([
        { label: "Target calories", value: fmtNumber(r.calories, 0) + " kcal", emphasize: true },
        { label: "Protein", value: fmtNumber(r.proteinG, 0) + " g" },
        { label: "Fat", value: fmtNumber(r.fatG, 0) + " g" },
        { label: "Carbs", value: fmtNumber(r.carbsG, 0) + " g" },
        {
          label: "Macro split",
          value: "grams",
          chart: [
            { label: "P", value: r.proteinG },
            { label: "F", value: r.fatG },
            { label: "C", value: Math.max(0, r.carbsG) },
          ],
        },
      ]);
    },
  },
  {
    slug: "pregnancy-weight-week",
    category: "health-fitness",
    name: "Pregnancy Weight by Week",
    description: "IOM-style cumulative weight range by week and pre-pregnancy BMI category.",
    keywords: ["pregnancy weight", "gestational weight gain"],
    kind: "form",
    formulaNote: "Educational ranges inspired by IOM guidelines — discuss with your clinician.",
    fields: [
      { id: "weight", label: "Pre-pregnancy weight", type: "number", defaultValue: 60, suffix: "kg" },
      { id: "week", label: "Gestational week", type: "number", defaultValue: 20, min: 0, max: 42 },
      { id: "bmiCat", label: "BMI category", type: "select", defaultValue: "normal", options: [
        { value: "under", label: "Underweight" }, { value: "normal", label: "Normal" },
        { value: "over", label: "Overweight" }, { value: "obese", label: "Obese" },
      ]},
    ],
    related: ["pregnancy-due-date", "pregnancy-week", "pregnancy-weight-gain"],
    compute: (v) => {
      const parsed = requireNums(v, ["weight","week"]);
      if (!parsed.ok) return err(parsed.error);
      const cat = (v.bmiCat as "under"|"normal"|"over"|"obese") || "normal";
      const r = pregnancyWeightByWeek(parsed.n.weight, parsed.n.week, cat);
      return ok([
        { label: "Suggested range", value: `${fmtNumber(r.lowKg,1)} – ${fmtNumber(r.highKg,1)} kg`, emphasize: true },
        { label: "Midpoint gain so far", value: fmtNumber(r.gainedEst, 1) + " kg" },
      ]);
    },
  },
  {
    slug: "blood-pressure-category",
    category: "health-fitness",
    name: "Blood Pressure Category",
    description: "General ACC/AHA-style category labels from systolic and diastolic readings.",
    keywords: ["blood pressure", "hypertension", "bp category"],
    kind: "form",
    formulaNote: "Not a diagnosis. Seek emergency care for crisis-range readings.",
    fields: [
      { id: "sys", label: "Systolic", type: "number", defaultValue: 118, suffix: "mmHg" },
      { id: "dia", label: "Diastolic", type: "number", defaultValue: 76, suffix: "mmHg" },
    ],
    related: ["heart-rate-zones", "bmi", "tdee"],
    compute: (v) => {
      const parsed = requireNums(v, ["sys","dia"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([
        { label: "Category", value: bloodPressureCategory(parsed.n.sys, parsed.n.dia), emphasize: true },
        { label: "Reading", value: `${parsed.n.sys}/${parsed.n.dia} mmHg` },
      ]);
    },
  },
  {
    slug: "intermittent-fasting-window",
    category: "health-fitness",
    name: "Intermittent Fasting Window",
    description: "Eating and fasting window lengths for common IF schedules.",
    keywords: ["intermittent fasting", "16:8", "fasting window"],
    kind: "form",
    fields: [
      { id: "fast", label: "Fasting hours", type: "number", defaultValue: 16, min: 12, max: 23 },
      { id: "startEat", label: "Start eating (hour 0–23)", type: "number", defaultValue: 12, min: 0, max: 23 },
    ],
    related: ["tdee", "macros-by-goal", "water-intake"],
    compute: (v) => {
      const parsed = requireNums(v, ["fast","startEat"]);
      if (!parsed.ok) return err(parsed.error);
      const eat = 24 - parsed.n.fast;
      const end = (parsed.n.startEat + eat) % 24;
      const fmt = (h: number) => `${String(Math.floor(h)).padStart(2,"0")}:00`;
      return ok([
        { label: "Eating window", value: `${fmtNumber(eat,0)} hours`, emphasize: true },
        { label: "Eat from → to", value: `${fmt(parsed.n.startEat)} → ${fmt(end)}` },
      ]);
    },
  },
  {
    slug: "drywall-sheets",
    category: "everyday-life",
    name: "Drywall Sheets Calculator",
    description: "How many drywall sheets you need from wall area, sheet size, and waste.",
    keywords: ["drywall", "sheetrock", "gypsum"],
    kind: "form",
    fields: [
      { id: "area", label: "Wall / ceiling area", type: "number", defaultValue: 320, suffix: "ft²" },
      { id: "sheet", label: "Sheet area", type: "number", defaultValue: 32, suffix: "ft²", helpText: "4×8 sheet = 32 ft²" },
      { id: "waste", label: "Waste", type: "number", defaultValue: 10, suffix: "%" },
    ],
    related: ["paint-coverage", "square-footage", "tile-calculator"],
    compute: (v) => {
      const parsed = requireNums(v, ["area","sheet","waste"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.sheet <= 0) return err("Sheet area must be positive.");
      const r = drywallSheets(parsed.n.area, parsed.n.sheet, parsed.n.waste);
      return ok([
        { label: "Sheets to buy", value: String(r.sheets), emphasize: true },
        { label: "Exact", value: fmtNumber(r.exact, 2) },
      ]);
    },
  },
  {
    slug: "lumber-linear",
    category: "everyday-life",
    name: "Lumber Linear Feet",
    description: "Total linear feet from piece count and length.",
    keywords: ["lumber", "linear feet", "framing"],
    kind: "form",
    fields: [
      { id: "pieces", label: "Pieces", type: "number", defaultValue: 24, min: 1 },
      { id: "length", label: "Length each", type: "number", defaultValue: 8, suffix: "ft" },
    ],
    related: ["board-feet", "fence-posts", "decking-boards"],
    compute: (v) => {
      const parsed = requireNums(v, ["pieces","length"]);
      if (!parsed.ok) return err(parsed.error);
      return ok([{ label: "Linear feet", value: fmtNumber(lumberLinearFeet(parsed.n.pieces, parsed.n.length), 2), emphasize: true }]);
    },
  },
  {
    slug: "gravel-tonnage",
    category: "everyday-life",
    name: "Gravel / Aggregate Tonnage",
    description: "Cubic yards and tons of gravel from length, width, and depth.",
    keywords: ["gravel", "tonnage", "aggregate", "crushed stone"],
    kind: "form",
    fields: [
      { id: "length", label: "Length", type: "number", defaultValue: 20, suffix: "ft" },
      { id: "width", label: "Width", type: "number", defaultValue: 10, suffix: "ft" },
      { id: "depth", label: "Depth", type: "number", defaultValue: 4, suffix: "in" },
      { id: "density", label: "Density", type: "number", defaultValue: 105, suffix: "lb/ft³" },
    ],
    related: ["gravel-mulch", "concrete-volume", "concrete-bags"],
    compute: (v) => {
      const parsed = requireNums(v, ["length","width","depth","density"]);
      if (!parsed.ok) return err(parsed.error);
      const r = gravelTonnage(parsed.n.length, parsed.n.width, parsed.n.depth, parsed.n.density);
      return ok([
        { label: "Cubic yards", value: fmtNumber(r.cuYd, 2), emphasize: true },
        { label: "Tons (approx)", value: fmtNumber(r.tons, 2), emphasize: true },
      ]);
    },
  },
  {
    slug: "ac-btu",
    category: "everyday-life",
    name: "AC BTU Calculator",
    description: "Rough air conditioner sizing in BTU/h from room size and climate.",
    keywords: ["ac btu", "air conditioner size", "cooling load"],
    popular: true,
    kind: "form",
    formulaNote: "Rule-of-thumb only — insulation, windows, and occupancy matter.",
    fields: [
      { id: "sqft", label: "Room area", type: "number", defaultValue: 350, suffix: "ft²" },
      { id: "climate", label: "Climate", type: "select", defaultValue: "average", options: [
        { value: "mild", label: "Mild" }, { value: "average", label: "Average" }, { value: "hot", label: "Hot" },
      ]},
      { id: "sun", label: "Sun exposure", type: "select", defaultValue: "medium", options: [
        { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" },
      ]},
    ],
    related: ["hvac-tonnage-rough", "square-footage"],
    compute: (v) => {
      const parsed = requireNums(v, ["sqft"]);
      if (!parsed.ok) return err(parsed.error);
      const climate = (v.climate as "mild"|"average"|"hot") || "average";
      const sun = (v.sun as "low"|"medium"|"high") || "medium";
      const btu = acBtu(parsed.n.sqft, climate, sun);
      return ok([
        { label: "Suggested BTU/h", value: fmtNumber(btu, 0), emphasize: true },
        { label: "Rough tons", value: fmtNumber(btu / 12000, 2) },
      ]);
    },
  },
  {
    slug: "wire-gauge-rough",
    category: "science-engineering",
    name: "Wire Gauge (Rough)",
    description: "Very rough AWG suggestion from amp load for short copper/aluminum runs.",
    keywords: ["wire gauge", "awg", "electrical", "ampacity"],
    kind: "form",
    formulaNote: "Not a substitute for NEC tables or an electrician — voltage drop & length ignored.",
    fields: [
      { id: "amps", label: "Load", type: "number", defaultValue: 20, suffix: "A" },
      { id: "metal", label: "Conductor", type: "select", defaultValue: "copper", options: [
        { value: "copper", label: "Copper" }, { value: "aluminum", label: "Aluminum" },
      ]},
    ],
    related: ["ohms-law", "power-electrical", "ohms-triangle"],
    compute: (v) => {
      const parsed = requireNums(v, ["amps"]);
      if (!parsed.ok) return err(parsed.error);
      const gauge = wireGaugeRough(parsed.n.amps, v.metal !== "aluminum");
      return ok([
        { label: "Suggested gauge", value: gauge, emphasize: true },
        { label: "Disclaimer", value: "Verify with local code and a licensed electrician." },
      ]);
    },
  },
  {
    slug: "concrete-bags",
    category: "everyday-life",
    name: "Concrete Bags Calculator",
    description: "Bags of concrete mix from slab dimensions and bag volume.",
    keywords: ["concrete bags", "sackcrete", "slab"],
    kind: "form",
    fields: [
      { id: "length", label: "Length", type: "number", defaultValue: 10, suffix: "ft" },
      { id: "width", label: "Width", type: "number", defaultValue: 10, suffix: "ft" },
      { id: "depth", label: "Depth", type: "number", defaultValue: 4, suffix: "in" },
      { id: "bag", label: "Bag yield", type: "number", defaultValue: 0.45, suffix: "ft³", helpText: "60 lb bag ≈ 0.45 ft³" },
    ],
    related: ["concrete-volume", "gravel-tonnage"],
    compute: (v) => {
      const parsed = requireNums(v, ["length","width","depth","bag"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.bag <= 0) return err("Bag yield must be positive.");
      const r = concreteBags(parsed.n.length, parsed.n.width, parsed.n.depth, parsed.n.bag);
      return ok([
        { label: "Bags needed", value: String(r.bags), emphasize: true },
        { label: "Volume", value: fmtNumber(r.cuFt, 2) + " ft³" },
      ]);
    },
  },
  {
    slug: "decking-boards",
    category: "everyday-life",
    name: "Decking Boards Calculator",
    description: "Estimate deck boards from deck size, board width, and length.",
    keywords: ["decking", "deck boards", "patio"],
    kind: "form",
    fields: [
      { id: "length", label: "Deck length", type: "number", defaultValue: 16, suffix: "ft" },
      { id: "width", label: "Deck width", type: "number", defaultValue: 12, suffix: "ft" },
      { id: "boardW", label: "Board width", type: "number", defaultValue: 5.5, suffix: "in" },
      { id: "boardL", label: "Board length", type: "number", defaultValue: 16, suffix: "ft" },
      { id: "gap", label: "Gap", type: "number", defaultValue: 0.125, suffix: "in", step: 0.0625 },
    ],
    related: ["board-feet", "lumber-linear", "fence-posts"],
    compute: (v) => {
      const parsed = requireNums(v, ["length","width","boardW","boardL","gap"]);
      if (!parsed.ok) return err(parsed.error);
      const r = deckingBoards(parsed.n.length, parsed.n.width, parsed.n.boardW, parsed.n.boardL, parsed.n.gap);
      return ok([
        { label: "Boards needed", value: String(r.boards), emphasize: true },
        { label: "Linear feet", value: fmtNumber(r.linearFt, 1) },
      ]);
    },
  },
  {
    slug: "tip-by-country",
    category: "everyday-life",
    name: "Tip by Country",
    description: "Suggested tip percent and amount by dining culture norms.",
    keywords: ["tipping", "gratuity", "travel tip"],
    popular: true,
    kind: "form",
    fields: [
      { id: "bill", label: "Bill", type: "number", defaultValue: 60, prefix: "$" },
      { id: "country", label: "Country / region", type: "select", defaultValue: "us", options: [
        { value: "us", label: "United States" }, { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" }, { value: "eu", label: "Europe (general)" },
        { value: "jp", label: "Japan" }, { value: "in", label: "India" },
        { value: "au", label: "Australia" }, { value: "mx", label: "Mexico" },
      ]},
    ],
    related: ["tip", "tip-tax-split-mega", "split-uneven"],
    compute: (v) => {
      const parsed = requireNums(v, ["bill"]);
      if (!parsed.ok) return err(parsed.error);
      const r = tipByCountry(parsed.n.bill, v.country || "us");
      return ok([
        { label: "Suggested tip %", value: fmtPercent(r.tipPct, 0) },
        { label: "Tip amount", value: fmtMoney(r.tip), emphasize: true },
        { label: "Total", value: fmtMoney(r.total) },
        { label: "Note", value: r.note },
      ]);
    },
  },
  {
    slug: "split-uneven",
    category: "everyday-life",
    name: "Uneven Bill Split",
    description: "Split a total by custom share weights (e.g. 2, 1, 1).",
    keywords: ["split bill", "uneven split", "shares"],
    kind: "form",
    fields: [
      { id: "total", label: "Total", type: "number", defaultValue: 120, prefix: "$" },
      { id: "shares", label: "Shares", type: "text", defaultValue: "2, 1, 1", helpText: "Comma-separated weights" },
    ],
    related: ["split-bill", "tip-tax-split-mega"],
    compute: (v) => {
      const parsed = requireNums(v, ["total"]);
      if (!parsed.ok) return err(parsed.error);
      const shares = parseList(v.shares ?? "");
      if (shares.length < 2) return err("Enter at least two share weights.");
      const r = splitUneven(parsed.n.total, shares);
      const rows = r.amounts.map((a, i) => [String(i + 1), fmtNumber(shares[i], 2), fmtMoney(a)]);
      return ok([
        { label: "People", value: String(shares.length), emphasize: true },
        {
          label: "Amounts",
          value: "by share",
          table: { headers: ["Person", "Share", "Pays"], rows },
        },
      ]);
    },
  },
  {
    slug: "fuel-vs-ev",
    category: "everyday-life",
    name: "Fuel vs EV Cost",
    description: "Compare gasoline vs electric energy cost for the same miles.",
    keywords: ["ev cost", "electric car", "fuel vs electric"],
    popular: true,
    kind: "form",
    fields: [
      { id: "miles", label: "Miles", type: "number", defaultValue: 1000 },
      { id: "mpg", label: "MPG (gas car)", type: "number", defaultValue: 28 },
      { id: "gas", label: "Gas price", type: "number", defaultValue: 3.5, prefix: "$" },
      { id: "kwh", label: "EV kWh / 100 mi", type: "number", defaultValue: 30 },
      { id: "rate", label: "Electricity rate", type: "number", defaultValue: 0.16, prefix: "$", suffix: "/kWh" },
    ],
    related: ["fuel-cost", "fuel-economy", "commute-cost"],
    compute: (v) => {
      const parsed = requireNums(v, ["miles","mpg","gas","kwh","rate"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.mpg <= 0) return err("MPG must be positive.");
      const r = fuelVsEvCost({ miles: n.miles, mpg: n.mpg, gasPrice: n.gas, kwhPer100mi: n.kwh, electricityRate: n.rate });
      return ok([
        { label: "Gas cost", value: fmtMoney(r.gasCost) },
        { label: "EV cost", value: fmtMoney(r.evCost), emphasize: true },
        { label: "Savings (gas − EV)", value: fmtMoney(r.savings), emphasize: true },
        {
          label: "Cost comparison",
          value: "bar",
          chart: [
            { label: "Gas", value: r.gasCost },
            { label: "EV", value: r.evCost },
          ],
        },
      ]);
    },
  },
  {
    slug: "carbon-footprint",
    category: "everyday-life",
    name: "Simple Carbon Footprint",
    description: "Rough CO₂e from car miles, flight hours, and home electricity.",
    keywords: ["carbon footprint", "co2", "emissions"],
    kind: "form",
    formulaNote: "Order-of-magnitude factors only — not a full LCA.",
    fields: [
      { id: "miles", label: "Car miles / year", type: "number", defaultValue: 12000 },
      { id: "mpg", label: "MPG", type: "number", defaultValue: 25 },
      { id: "flights", label: "Flight hours / year", type: "number", defaultValue: 6 },
      { id: "kwh", label: "Home kWh / year", type: "number", defaultValue: 10000 },
    ],
    related: ["fuel-vs-ev", "fuel-cost", "commute-cost"],
    compute: (v) => {
      const parsed = requireNums(v, ["miles","mpg","flights","kwh"]);
      if (!parsed.ok) return err(parsed.error);
      const r = carbonFootprintSimple({ carMiles: parsed.n.miles, mpg: parsed.n.mpg, flightsHours: parsed.n.flights, kwhHome: parsed.n.kwh });
      return ok([
        { label: "Total CO₂e", value: fmtNumber(r.totalKg, 0) + " kg", emphasize: true },
        { label: "Car", value: fmtNumber(r.carKg, 0) + " kg" },
        { label: "Flights", value: fmtNumber(r.flightKg, 0) + " kg" },
        { label: "Home electricity", value: fmtNumber(r.homeKg, 0) + " kg" },
        {
          label: "Breakdown",
          value: "kg",
          chart: [
            { label: "Car", value: r.carKg },
            { label: "Fly", value: r.flightKg },
            { label: "Home", value: r.homeKg },
          ],
        },
      ]);
    },
  },
  {
    slug: "subscription-cost",
    category: "everyday-life",
    name: "Subscription Cost Rollup",
    description: "Annual and 5-year cost of recurring subscriptions.",
    keywords: ["subscriptions", "saas cost", "recurring"],
    kind: "form",
    fields: [
      { id: "monthly", label: "Avg monthly per sub", type: "number", defaultValue: 12.99, prefix: "$" },
      { id: "count", label: "Number of subscriptions", type: "number", defaultValue: 6, min: 1 },
    ],
    related: ["budget-percent", "savings-rate"],
    compute: (v) => {
      const parsed = requireNums(v, ["monthly","count"]);
      if (!parsed.ok) return err(parsed.error);
      const r = subscriptionAnnual(parsed.n.monthly, parsed.n.count);
      return ok([
        { label: "Annual cost", value: fmtMoney(r.annual), emphasize: true },
        { label: "5-year cost", value: fmtMoney(r.fiveYear) },
      ]);
    },
  },
  {
    slug: "unit-price-compare",
    category: "everyday-life",
    name: "Unit Price Calculator",
    description: "Price per unit for grocery and shopping comparisons.",
    keywords: ["unit price", "per ounce", "grocery"],
    kind: "form",
    fields: [
      { id: "price", label: "Price", type: "number", defaultValue: 4.99, prefix: "$" },
      { id: "qty", label: "Quantity", type: "number", defaultValue: 16 },
      { id: "unit", label: "Unit label", type: "text", defaultValue: "oz" },
    ],
    related: ["discount", "sales-tax"],
    compute: (v) => {
      const parsed = requireNums(v, ["price","qty"]);
      if (!parsed.ok) return err(parsed.error);
      const r = unitPrice(parsed.n.price, parsed.n.qty, v.unit || "unit");
      return ok([{ label: `Per ${r.label}`, value: fmtMoney(r.perUnit, "USD", 4), emphasize: true }]);
    },
  },
  {
    slug: "moving-boxes",
    category: "everyday-life",
    name: "Moving Boxes Estimator",
    description: "Estimate small/medium/large moving boxes from rooms and clutter level.",
    keywords: ["moving", "boxes", "relocation"],
    kind: "form",
    fields: [
      { id: "rooms", label: "Rooms", type: "number", defaultValue: 4, min: 1 },
      { id: "clutter", label: "Clutter", type: "select", defaultValue: "average", options: [
        { value: "minimal", label: "Minimal" }, { value: "average", label: "Average" }, { value: "lots", label: "Lots" },
      ]},
    ],
    related: ["square-footage", "paint-coverage"],
    compute: (v) => {
      const parsed = requireNums(v, ["rooms"]);
      if (!parsed.ok) return err(parsed.error);
      const clutter = (v.clutter as "minimal"|"average"|"lots") || "average";
      const r = movingBoxes(parsed.n.rooms, clutter);
      return ok([
        { label: "Total boxes", value: String(r.total), emphasize: true },
        { label: "Small", value: String(r.small) },
        { label: "Medium", value: String(r.medium) },
        { label: "Large", value: String(r.large) },
      ]);
    },
  },
  {
    slug: "projectile-motion",
    category: "science-engineering",
    name: "Projectile Motion Calculator",
    description: "Range, max height, flight time, and trajectory chart for ideal projectile motion.",
    keywords: ["projectile", "trajectory", "physics"],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote: "No air resistance. g = 9.80665 m/s².",
    fields: [
      { id: "v0", label: "Initial speed", type: "number", defaultValue: 40, suffix: "m/s" },
      { id: "angle", label: "Launch angle", type: "number", defaultValue: 45, suffix: "°" },
    ],
    related: ["freefall", "kinetic-energy", "speed-distance-time"],
    compute: (v) => {
      const parsed = requireNums(v, ["v0","angle"]);
      if (!parsed.ok) return err(parsed.error);
      const r = projectileMotion(parsed.n.v0, parsed.n.angle);
      return ok([
        { label: "Range", value: fmtNumber(r.range, 3) + " m", emphasize: true },
        { label: "Max height", value: fmtNumber(r.maxHeight, 3) + " m" },
        { label: "Time of flight", value: fmtNumber(r.timeOfFlight, 3) + " s" },
        {
          label: "Trajectory",
          value: "x–y path",
          lineChart: {
            xKey: "x",
            series: [{ key: "y", label: "Height (m)", color: "#7c3aed" }],
            points: r.points.map((p) => ({ x: Number(p.x.toFixed(2)), y: p.y })),
          },
        },
      ]);
    },
  },
  {
    slug: "ohms-triangle",
    category: "science-engineering",
    name: "Ohm's Law Triangle",
    description: "Solve for V, I, or R from any two values — classic triangle helper.",
    keywords: ["ohms law", "voltage", "current", "resistance"],
    popular: true,
    kind: "form",
    fields: [
      { id: "v", label: "Voltage V (optional)", type: "number", defaultValue: 12, suffix: "V" },
      { id: "i", label: "Current I (optional)", type: "number", defaultValue: 2, suffix: "A" },
      { id: "r", label: "Resistance R (leave blank to solve)", type: "number", placeholder: "leave empty to solve" },
    ],
    related: ["ohms-law", "ohms-law-solver", "power-vi"],
    compute: (v) => {
      const known: { v?: number; i?: number; r?: number } = {};
      const vv = parseNum(v.v); if (Number.isFinite(vv)) known.v = vv;
      const ii = parseNum(v.i); if (Number.isFinite(ii)) known.i = ii;
      const rr = parseNum(v.r); if (Number.isFinite(rr)) known.r = rr;
      const filled = [known.v, known.i, known.r].filter((x) => x !== undefined).length;
      if (filled < 2) return err("Enter any two of V, I, R.");
      const out = ohmsFromTwo(known);
      if (!out) return err("Could not solve — check inputs.");
      return ok([
        { label: "Voltage V", value: fmtNumber(out.v, 4) + " V", emphasize: true },
        { label: "Current I", value: fmtNumber(out.i, 4) + " A" },
        { label: "Resistance R", value: fmtNumber(out.r, 4) + " Ω" },
        { label: "Power P", value: fmtNumber(out.p, 4) + " W" },
      ]);
    },
  },
  {
    slug: "ideal-gas-law",
    category: "science-engineering",
    name: "Ideal Gas Law Solver",
    description: "Solve PV = nRT for P, V, n, or T (R in L·atm/(mol·K)).",
    keywords: ["ideal gas", "PV=nRT", "chemistry"],
    kind: "form",
    fields: [
      { id: "solve", label: "Solve for", type: "select", defaultValue: "p", options: [
        { value: "p", label: "Pressure P (atm)" }, { value: "v", label: "Volume V (L)" },
        { value: "n", label: "Moles n" }, { value: "t", label: "Temperature T (K)" },
      ]},
      {
        id: "p",
        label: "P (atm)",
        type: "number",
        defaultValue: 1,
        visibleWhen: { field: "solve", in: ["v", "n", "t"] },
      },
      {
        id: "v",
        label: "V (L)",
        type: "number",
        defaultValue: 22.4,
        visibleWhen: { field: "solve", in: ["p", "n", "t"] },
      },
      {
        id: "n",
        label: "n (mol)",
        type: "number",
        defaultValue: 1,
        visibleWhen: { field: "solve", in: ["p", "v", "t"] },
      },
      {
        id: "t",
        label: "T (K)",
        type: "number",
        defaultValue: 273.15,
        visibleWhen: { field: "solve", in: ["p", "v", "n"] },
      },
    ],
    related: ["density-calc", "pressure", "half-life"],
    compute: (v) => {
      const solve = (v.solve as "p"|"v"|"n"|"t") || "p";
      const p = parseNum(v.p); const vol = parseNum(v.v); const n = parseNum(v.n); const t = parseNum(v.t);
      const opts: { p?: number; v?: number; n?: number; t?: number; solve: "p"|"v"|"n"|"t" } = { solve };
      if (solve !== "p" && Number.isFinite(p)) opts.p = p;
      if (solve !== "v" && Number.isFinite(vol)) opts.v = vol;
      if (solve !== "n" && Number.isFinite(n)) opts.n = n;
      if (solve !== "t" && Number.isFinite(t)) opts.t = t;
      const ans = idealGasLaw(opts);
      if (!Number.isFinite(ans)) return err("Provide the other three variables with valid numbers.");
      const labels = { p: "P (atm)", v: "V (L)", n: "n (mol)", t: "T (K)" };
      return ok([{ label: labels[solve], value: fmtNumber(ans, 6), emphasize: true }]);
    },
  },
  {
    slug: "wavelength-frequency",
    category: "science-engineering",
    name: "Wavelength ↔ Frequency",
    description: "Convert between wavelength and frequency using c = 3×10⁸ m/s.",
    keywords: ["wavelength", "frequency", "electromagnetic"],
    kind: "form",
    fields: [
      { id: "mode", label: "Convert", type: "select", defaultValue: "f-to-wl", options: [
        { value: "f-to-wl", label: "Frequency → wavelength" },
        { value: "wl-to-f", label: "Wavelength → frequency" },
      ]},
      { id: "value", label: "Value (Hz or m)", type: "number", defaultValue: 5e14 },
    ],
    related: ["wavelength-calc", "energy-converter"],
    compute: (v) => {
      const parsed = requireNums(v, ["value"]);
      if (!parsed.ok) return err(parsed.error);
      const mode = v.mode === "wl-to-f" ? "wl-to-f" : "f-to-wl";
      const out = wavelengthFrequency(parsed.n.value, mode);
      return ok([
        { label: mode === "f-to-wl" ? "Wavelength (m)" : "Frequency (Hz)", value: fmtNumber(out, 6), emphasize: true },
      ]);
    },
  },
  {
    slug: "half-life",
    category: "science-engineering",
    name: "Half-Life Calculator",
    description: "Remaining quantity after radioactive (or any exponential) decay.",
    keywords: ["half life", "decay", "radioactive"],
    kind: "form",
    fields: [
      { id: "initial", label: "Initial amount", type: "number", defaultValue: 100 },
      { id: "half", label: "Half-life", type: "number", defaultValue: 8, suffix: "time units" },
      { id: "time", label: "Elapsed time", type: "number", defaultValue: 24 },
    ],
    related: ["ideal-gas-law", "exponential"],
    compute: (v) => {
      const parsed = requireNums(v, ["initial","half","time"]);
      if (!parsed.ok) return err(parsed.error);
      const left = halfLifeRemaining(parsed.n.initial, parsed.n.half, parsed.n.time);
      const pts = [];
      for (let i = 0; i <= 20; i++) {
        const t = (parsed.n.time * i) / 20;
        pts.push({ t: Number(t.toFixed(3)), amount: halfLifeRemaining(parsed.n.initial, parsed.n.half, t) });
      }
      return ok([
        { label: "Remaining", value: fmtNumber(left, 6), emphasize: true },
        { label: "Fraction left", value: fmtPercent((left / parsed.n.initial) * 100) },
        {
          label: "Decay curve",
          value: "vs time",
          lineChart: {
            xKey: "t",
            series: [{ key: "amount", label: "Amount", color: "#e11d48" }],
            points: pts,
          },
        },
      ]);
    },
  },
  {
    slug: "snells-law",
    category: "science-engineering",
    name: "Snell's Law Calculator",
    description: "Refraction angle from n₁, θ₁, and n₂ — flags total internal reflection.",
    keywords: ["snell", "refraction", "optics"],
    kind: "form",
    fields: [
      { id: "n1", label: "n₁", type: "number", defaultValue: 1.0, step: 0.01 },
      { id: "theta1", label: "θ₁", type: "number", defaultValue: 30, suffix: "°" },
      { id: "n2", label: "n₂", type: "number", defaultValue: 1.33, step: 0.01 },
    ],
    related: ["lens-equation", "wavelength-frequency"],
    compute: (v) => {
      const parsed = requireNums(v, ["n1","theta1","n2"]);
      if (!parsed.ok) return err(parsed.error);
      const r = snellsLaw(parsed.n.n1, parsed.n.theta1, parsed.n.n2);
      if (!Number.isFinite(r.theta2Deg)) {
        return ok([
          { label: "Result", value: "Total internal reflection", emphasize: true },
          { label: "Critical angle", value: fmtNumber(r.critical ?? NaN, 3) + "°" },
        ]);
      }
      return ok([{ label: "θ₂", value: fmtNumber(r.theta2Deg, 4) + "°", emphasize: true }]);
    },
  },
  {
    slug: "lens-equation",
    category: "science-engineering",
    name: "Thin Lens Equation",
    description: "Image distance and magnification from focal length and object distance.",
    keywords: ["lens", "optics", "magnification"],
    kind: "form",
    formulaNote: "1/f = 1/v + 1/u with positive object distance convention here.",
    fields: [
      { id: "f", label: "Focal length f", type: "number", defaultValue: 10, suffix: "cm" },
      { id: "u", label: "Object distance u", type: "number", defaultValue: 30, suffix: "cm" },
    ],
    related: ["snells-law", "wavelength-frequency"],
    compute: (v) => {
      const parsed = requireNums(v, ["f","u"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.u === 0) return err("Object distance cannot be 0.");
      const r = lensEquation(parsed.n.f, parsed.n.u);
      return ok([
        { label: "Image distance v", value: fmtNumber(r.v, 4) + " cm", emphasize: true },
        { label: "Magnification m", value: fmtNumber(r.m, 4) },
      ]);
    },
  },
  {
    slug: "capacitance-combo",
    category: "science-engineering",
    name: "Capacitor Series / Parallel",
    description: "Equivalent capacitance for series or parallel networks.",
    keywords: ["capacitor", "farad", "series parallel"],
    kind: "form",
    fields: [
      { id: "mode", label: "Configuration", type: "select", defaultValue: "parallel", options: [
        { value: "parallel", label: "Parallel" }, { value: "series", label: "Series" },
      ]},
      { id: "values", label: "Capacitances (µF)", type: "text", defaultValue: "10, 20, 30" },
    ],
    related: ["resistor-combo", "capacitor-energy", "ohms-triangle"],
    compute: (v) => {
      const values = parseList(v.values ?? "");
      if (values.length < 2) return err("Enter at least two capacitances.");
      const mode = v.mode === "series" ? "series" : "parallel";
      const eq = capacitanceCombo(values, mode);
      return ok([{ label: "C_eq (µF)", value: fmtNumber(eq, 6), emphasize: true }]);
    },
  },
  {
    slug: "doppler-shift",
    category: "science-engineering",
    name: "Doppler Shift Calculator",
    description: "Observed frequency with moving source and/or observer (sound in air).",
    keywords: ["doppler", "frequency shift", "sound"],
    kind: "form",
    fields: [
      { id: "f0", label: "Source frequency", type: "number", defaultValue: 440, suffix: "Hz" },
      { id: "vs", label: "Source speed", type: "number", defaultValue: 0, suffix: "m/s" },
      { id: "vo", label: "Observer speed", type: "number", defaultValue: 10, suffix: "m/s" },
      { id: "srcDir", label: "Source", type: "select", defaultValue: "away", options: [
        { value: "toward", label: "Approaching observer" }, { value: "away", label: "Moving away" },
      ]},
      { id: "obsDir", label: "Observer", type: "select", defaultValue: "toward", options: [
        { value: "toward", label: "Approaching source" }, { value: "away", label: "Moving away" },
      ]},
    ],
    related: ["wavelength-frequency", "speed"],
    compute: (v) => {
      const parsed = requireNums(v, ["f0","vs","vo"], { emptyAsZero: ["vs","vo"] });
      if (!parsed.ok) return err(parsed.error);
      const f = dopplerShift(
        parsed.n.f0,
        parsed.n.vs,
        parsed.n.vo,
        343,
        v.srcDir === "toward",
        v.obsDir === "toward"
      );
      return ok([
        { label: "Observed frequency", value: fmtNumber(f, 3) + " Hz", emphasize: true },
        { label: "Shift", value: fmtNumber(f - parsed.n.f0, 3) + " Hz" },
      ]);
    },
  },
  {
    slug: "sip-growth-chart",
    category: "finance",
    name: "SIP Growth Chart",
    description: "Year-by-year SIP invested vs value with an interactive growth chart.",
    keywords: ["sip chart", "investment growth", "mutual fund chart"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "monthly", label: "Monthly investment", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Expected annual return", type: "number", defaultValue: 12, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 15 },
    ],
    related: ["sip", "compound-interest-3d", "retirement"],
    compute: (v) => {
      const parsed = requireNums(v, ["monthly","rate","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.years <= 0) return err("Years must be positive.");
      const final = sipFutureValue(n.monthly, n.rate, n.years);
      const schedule = sipGrowthSchedule(n.monthly, n.rate, n.years);
      return ok([
        { label: "Future value", value: fmtMoney(final.total), emphasize: true },
        { label: "Invested", value: fmtMoney(final.invested) },
        { label: "Gains", value: fmtMoney(final.gains) },
        {
          label: "Growth over time",
          value: `${schedule.length} years`,
          lineChart: {
            xKey: "year",
            series: [
              { key: "value", label: "Portfolio", color: "#0d9488" },
              { key: "invested", label: "Invested", color: "#6366f1" },
            ],
            points: schedule.map((r) => ({ year: r.year, value: r.value, invested: r.invested })),
          },
        },
      ]);
    },
  },
  {
    slug: "amortization-chart",
    category: "finance",
    name: "Amortization Chart",
    description: "Interactive principal vs interest chart across the life of the loan.",
    keywords: ["amortization chart", "loan chart", "principal interest"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 6.5, suffix: "%" },
      { id: "years", label: "Term", type: "number", defaultValue: 30, suffix: "years" },
    ],
    related: ["amortization", "mortgage", "biweekly-mortgage"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal","rate","years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const yearly = amortizeYearlySummary(n.principal, n.rate, n.years);
      const totalInterest = yearly.reduce((s, r) => s + r.interest, 0);
      return ok([
        { label: "Total interest", value: fmtMoney(totalInterest), emphasize: true },
        {
          label: "Principal vs interest by year",
          value: `${yearly.length} years`,
          lineChart: {
            xKey: "year",
            series: [
              { key: "principal", label: "Principal", color: "#0d9488" },
              { key: "interest", label: "Interest", color: "#f43f5e" },
              { key: "balance", label: "Balance", color: "#6366f1" },
            ],
            points: yearly.map((r) => ({
              year: r.year,
              principal: r.principal,
              interest: r.interest,
              balance: r.endBalance,
            })),
          },
        },
      ]);
    },
  },
  {
    slug: "currency-pairs-quick",
    category: "finance",
    name: "Currency Convert (Manual Rate)",
    description: "Convert between amounts with a manual FX rate — works offline for any pair.",
    keywords: ["currency", "fx", "exchange rate", "usd eur inr"],
    kind: "form",
    fields: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Rate (quote per base)", type: "number", defaultValue: 83.2, step: 0.0001 },
      { id: "pair", label: "Pair label", type: "text", defaultValue: "USD→INR" },
    ],
    related: ["currency-converter", "forex-position-size"],
    compute: (v) => {
      const parsed = requireNums(v, ["amount","rate"]);
      if (!parsed.ok) return err(parsed.error);
      const out = parsed.n.amount * parsed.n.rate;
      return ok([
        { label: v.pair || "Converted", value: fmtNumber(out, 4), emphasize: true },
        { label: "Inverse rate", value: fmtNumber(1 / parsed.n.rate, 6) },
      ]);
    },
  },
  {
    slug: "parking-fee",
    category: "everyday-life",
    name: "Parking Fee Calculator",
    description: "Total parking cost from hourly rate, hours, and daily cap.",
    keywords: ["parking", "garage fee"],
    kind: "form",
    fields: [
      { id: "rate", label: "Hourly rate", type: "number", defaultValue: 4, prefix: "$" },
      { id: "hours", label: "Hours", type: "number", defaultValue: 5, step: 0.25, suffix: "hours" },
      { id: "cap", label: "Daily max (0 = none)", type: "number", defaultValue: 25, prefix: "$" },
    ],
    related: ["commute-cost", "fuel-cost"],
    compute: (v) => {
      const parsed = requireNums(v, ["rate","hours","cap"]);
      if (!parsed.ok) return err(parsed.error);
      let total = parsed.n.rate * parsed.n.hours;
      if (parsed.n.cap > 0) total = Math.min(total, parsed.n.cap);
      return ok([{ label: "Parking total", value: fmtMoney(total), emphasize: true }]);
    },
  },
  {
    slug: "grocery-budget",
    category: "everyday-life",
    name: "Grocery Budget per Person",
    description: "Weekly and monthly grocery budget from household size and spend level.",
    keywords: ["grocery budget", "food budget"],
    kind: "form",
    fields: [
      { id: "people", label: "People", type: "number", defaultValue: 3, min: 1 },
      { id: "weeklyPer", label: "Weekly per person", type: "number", defaultValue: 75, prefix: "$" },
    ],
    related: ["budget-percent", "unit-price-compare"],
    compute: (v) => {
      const parsed = requireNums(v, ["people","weeklyPer"]);
      if (!parsed.ok) return err(parsed.error);
      const weekly = parsed.n.people * parsed.n.weeklyPer;
      return ok([
        { label: "Weekly", value: fmtMoney(weekly), emphasize: true },
        { label: "Monthly (~4.33 wks)", value: fmtMoney(weekly * 4.33) },
        { label: "Annual", value: fmtMoney(weekly * 52) },
      ]);
    },
  },
  {
    slug: "body-recomp-calories",
    category: "health-fitness",
    name: "Body Recomp Calories",
    description: "Mild deficit calories for body recomposition from TDEE.",
    keywords: ["recomp", "body recomposition", "calories"],
    kind: "form",
    fields: [
      { id: "tdee", label: "TDEE", type: "number", defaultValue: 2500, suffix: "kcal" },
      { id: "deficit", label: "Deficit", type: "number", defaultValue: 10, suffix: "%" },
    ],
    related: ["macros-by-goal", "tdee", "protein-need"],
    compute: (v) => {
      const parsed = requireNums(v, ["tdee","deficit"]);
      if (!parsed.ok) return err(parsed.error);
      const target = parsed.n.tdee * (1 - parsed.n.deficit / 100);
      return ok([
        { label: "Recomp calories", value: fmtNumber(target, 0) + " kcal", emphasize: true },
        { label: "Weekly deficit", value: fmtNumber((parsed.n.tdee - target) * 7, 0) + " kcal" },
      ]);
    },
  },
  {
    slug: "running-cadence",
    category: "health-fitness",
    name: "Running Cadence Estimator",
    description: "Steps per minute from pace and estimated step length.",
    keywords: ["cadence", "running", "spm"],
    kind: "form",
    fields: [
      { id: "pace", label: "Pace", type: "number", defaultValue: 9, suffix: "min/mi", step: 0.1 },
      { id: "stepIn", label: "Step length", type: "number", defaultValue: 40, suffix: "in" },
    ],
    related: ["pace", "steps-to-miles", "vo2-max-estimate"],
    compute: (v) => {
      const parsed = requireNums(v, ["pace","stepIn"]);
      if (!parsed.ok) return err(parsed.error);
      if (parsed.n.pace <= 0 || parsed.n.stepIn <= 0) return err("Pace and step length must be positive.");
      const milesPerMin = 1 / parsed.n.pace;
      const inchesPerMin = milesPerMin * 63360;
      const spm = inchesPerMin / parsed.n.stepIn;
      return ok([{ label: "Cadence", value: fmtNumber(spm, 0) + " spm", emphasize: true }]);
    },
  },
  {
    slug: "insulation-r-value",
    category: "everyday-life",
    name: "Insulation R-Value Layers",
    description: "Add R-values of insulation layers for an approximate total R.",
    keywords: ["insulation", "r-value", "building"],
    kind: "form",
    fields: [
      { id: "layers", label: "R-values", type: "text", defaultValue: "13, 5, 2", helpText: "Comma-separated layer R-values" },
    ],
    related: ["ac-btu", "hvac-tonnage-rough", "square-footage"],
    compute: (v) => {
      const layers = parseList(v.layers ?? "");
      if (!layers.length) return err("Enter at least one R-value.");
      const total = layers.reduce((a, b) => a + b, 0);
      return ok([
        { label: "Total R", value: fmtNumber(total, 2), emphasize: true },
        { label: "Layers", value: String(layers.length) },
      ]);
    },
  },
  {
    slug: "significant-figures",
    category: "math",
    name: "Significant Figures Rounder",
    description: "Round a number to a chosen count of significant figures.",
    keywords: ["significant figures", "sig figs", "rounding"],
    kind: "form",
    fields: [
      { id: "n", label: "Number", type: "number", defaultValue: 1234.567 },
      { id: "sig", label: "Significant figures", type: "number", defaultValue: 3, min: 1, max: 12 },
    ],
    related: ["scientific-notation", "percentage"],
    compute: (v) => {
      const parsed = requireNums(v, ["n","sig"]);
      if (!parsed.ok) return err(parsed.error);
      const sig = Math.max(1, Math.floor(parsed.n.sig));
      if (parsed.n.n === 0) return ok([{ label: "Rounded", value: "0", emphasize: true }]);
      const rounded = Number(parsed.n.n.toPrecision(sig));
      return ok([{ label: "Rounded", value: String(rounded), emphasize: true }]);
    },
  }
];
