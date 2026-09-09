import type { CalculatorMeta } from "../types";
import {
  mortgagePayment,
  simpleInterest,
  compoundInterest,
  amortizeSchedule,
  refinanceSavings,
  roi,
  tipAmount,
  salesTax,
  discountPrice,
  savingsGoalMonthly,
  retirementNestEgg,
  apyFromApr,
  debtPayoffMonths,
  breakEvenUnits,
  gstVat,
  cdFutureValue,
} from "../formulas/finance";
import {
  requireNums,
  fmtMoney,
  fmtNumber,
  fmtPercent,
  parseNum,
  err,
  ok,
} from "./helpers";

export const financeCalculators: CalculatorMeta[] = [
  {
    slug: "mortgage",
    category: "finance",
    name: "Mortgage Calculator",
    description:
      "Estimate monthly principal & interest payments for a fixed-rate mortgage.",
    keywords: ["mortgage", "home loan", "monthly payment", "house"],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote: "Standard amortizing loan formula. Taxes and insurance not included.",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 300000, prefix: "$", min: 0 },
      { id: "rate", label: "Annual interest rate", type: "number", defaultValue: 6.5, suffix: "%", step: 0.01, min: 0 },
      { id: "years", label: "Loan term", type: "number", defaultValue: 30, suffix: "years", min: 1 },
    ],
    related: ["amortization", "refinance", "loan-emi"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const pmt = mortgagePayment(n.principal, n.rate, n.years);
      const total = pmt * n.years * 12;
      return ok([
        { label: "Monthly payment (P&I)", value: fmtMoney(pmt), emphasize: true },
        { label: "Total of payments", value: fmtMoney(total) },
        { label: "Total interest", value: fmtMoney(total - n.principal) },
      ]);
    },
  },
  {
    slug: "loan-emi",
    category: "finance",
    name: "Loan / EMI Calculator",
    description: "Calculate equated monthly installment (EMI) for personal or auto loans.",
    keywords: ["emi", "loan", "installment", "auto loan", "personal loan"],
    popular: true,
    kind: "form",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 10000, prefix: "$", min: 0 },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 8, suffix: "%", step: 0.01 },
      { id: "months", label: "Tenure", type: "number", defaultValue: 36, suffix: "months", min: 1 },
    ],
    related: ["mortgage", "amortization", "debt-payoff"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "months"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const years = n.months / 12;
      const pmt = mortgagePayment(n.principal, n.rate, years);
      return ok([
        { label: "Monthly EMI", value: fmtMoney(pmt), emphasize: true },
        { label: "Total payment", value: fmtMoney(pmt * n.months) },
        { label: "Total interest", value: fmtMoney(pmt * n.months - n.principal) },
      ]);
    },
  },
  {
    slug: "compound-interest",
    category: "finance",
    name: "Compound Interest Calculator",
    description: "See how money grows with compound interest over time.",
    keywords: ["compound interest", "investment", "growth", "compounding"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 7, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
      {
        id: "compounds",
        label: "Compounded",
        type: "select",
        defaultValue: "12",
        options: [
          { value: "1", label: "Annually" },
          { value: "2", label: "Semi-annually" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" },
        ],
      },
    ],
    related: ["simple-interest", "cd-apy", "savings-goal"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years", "compounds"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = compoundInterest(n.principal, n.rate, n.years, n.compounds);
      return ok([
        { label: "Future value", value: fmtMoney(r.total), emphasize: true },
        { label: "Interest earned", value: fmtMoney(r.interest) },
      ]);
    },
  },
  {
    slug: "simple-interest",
    category: "finance",
    name: "Simple Interest Calculator",
    description: "Calculate simple interest and total amount payable.",
    keywords: ["simple interest", "interest"],
    kind: "form",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 5, suffix: "%" },
      { id: "years", label: "Time", type: "number", defaultValue: 3, suffix: "years" },
    ],
    related: ["compound-interest"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = simpleInterest(n.principal, n.rate, n.years);
      return ok([
        { label: "Interest", value: fmtMoney(r.interest), emphasize: true },
        { label: "Total amount", value: fmtMoney(r.total) },
      ]);
    },
  },
  {
    slug: "amortization",
    category: "finance",
    name: "Amortization Schedule",
    description: "View payment breakdown of principal vs interest over the loan life.",
    keywords: ["amortization", "schedule", "principal", "interest"],
    kind: "form",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 6, suffix: "%" },
      { id: "years", label: "Term", type: "number", defaultValue: 30, suffix: "years" },
    ],
    related: ["mortgage", "loan-emi"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const rows = amortizeSchedule(n.principal, n.rate, n.years, 12);
      const pmt = mortgagePayment(n.principal, n.rate, n.years);
      const firstYearInterest = rows.reduce((s, r) => s + r.interest, 0);
      const firstYearPrincipal = rows.reduce((s, r) => s + r.principal, 0);
      return ok([
        { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
        { label: "Year 1 interest", value: fmtMoney(firstYearInterest) },
        { label: "Year 1 principal paid", value: fmtMoney(firstYearPrincipal) },
        { label: "Balance after 12 months", value: fmtMoney(rows[rows.length - 1]?.balance ?? 0) },
        { label: "Note", value: "First 12 months summarized (full schedule available in a future update)." },
      ]);
    },
  },
  {
    slug: "refinance",
    category: "finance",
    name: "Refinance Calculator",
    description: "Compare current vs new loan payments and estimate break-even.",
    keywords: ["refinance", "refi", "mortgage refinance"],
    kind: "form",
    fields: [
      { id: "balance", label: "Current balance", type: "number", defaultValue: 280000, prefix: "$" },
      { id: "currentRate", label: "Current rate", type: "number", defaultValue: 7.5, suffix: "%" },
      { id: "yearsLeft", label: "Years remaining", type: "number", defaultValue: 25 },
      { id: "newRate", label: "New rate", type: "number", defaultValue: 6.0, suffix: "%" },
      { id: "newYears", label: "New term (years)", type: "number", defaultValue: 30 },
      { id: "closing", label: "Closing costs", type: "number", defaultValue: 4000, prefix: "$" },
    ],
    related: ["mortgage", "amortization"],
    compute: (v) => {
      const parsed = requireNums(v, ["balance", "currentRate", "yearsLeft", "newRate", "newYears", "closing"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = refinanceSavings({
        currentBalance: n.balance,
        currentRate: n.currentRate,
        currentYearsLeft: n.yearsLeft,
        newRate: n.newRate,
        newYears: n.newYears,
        closingCosts: n.closing,
      });
      return ok([
        { label: "Current payment", value: fmtMoney(r.oldPayment) },
        { label: "New payment", value: fmtMoney(r.newPayment), emphasize: true },
        { label: "Monthly difference", value: fmtMoney(r.monthlySavings) },
        {
          label: "Break-even",
          value: Number.isFinite(r.breakEvenMonths)
            ? `${fmtNumber(r.breakEvenMonths, 1)} months`
            : "N/A (no monthly savings)",
        },
        { label: "Lifetime cash difference (approx)", value: fmtMoney(r.lifetimeSavings) },
      ]);
    },
  },
  {
    slug: "roi",
    category: "finance",
    name: "ROI Calculator",
    description: "Measure return on investment as gain and percentage.",
    keywords: ["roi", "return on investment", "profit"],
    featured: true,
    kind: "form",
    fields: [
      { id: "initial", label: "Initial investment", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "final", label: "Final value", type: "number", defaultValue: 13500, prefix: "$" },
    ],
    related: ["compound-interest", "profit-margin"],
    compute: (v) => {
      const parsed = requireNums(v, ["initial", "final"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = roi(n.initial, n.final);
      return ok([
        { label: "Net gain / loss", value: fmtMoney(r.gain), emphasize: true },
        { label: "ROI", value: fmtPercent(r.roiPct) },
      ]);
    },
  },
  {
    slug: "percentage",
    category: "finance",
    name: "Percentage Calculator",
    description: "Quick percentage of a number — useful for tips, discounts, and taxes.",
    keywords: ["percentage", "percent of"],
    popular: true,
    kind: "form",
    fields: [
      { id: "pct", label: "Percentage", type: "number", defaultValue: 15, suffix: "%" },
      { id: "of", label: "Of amount", type: "number", defaultValue: 80, prefix: "$" },
    ],
    related: ["tip", "discount", "sales-tax", "percentage-of"],
    compute: (v) => {
      const parsed = requireNums(v, ["pct", "of"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const result = (n.pct / 100) * n.of;
      return ok([{ label: "Result", value: fmtNumber(result, 4), emphasize: true }]);
    },
  },
  {
    slug: "tip",
    category: "finance",
    name: "Tip Calculator",
    description: "Calculate tip amount and per-person split for dining out.",
    keywords: ["tip", "gratuity", "restaurant"],
    popular: true,
    kind: "form",
    fields: [
      { id: "bill", label: "Bill amount", type: "number", defaultValue: 64.5, prefix: "$", step: 0.01 },
      { id: "tipPct", label: "Tip percent", type: "number", defaultValue: 18, suffix: "%" },
      { id: "people", label: "Split between", type: "number", defaultValue: 2, suffix: "people", min: 1 },
    ],
    related: ["split-bill", "percentage", "sales-tax"],
    compute: (v) => {
      const parsed = requireNums(v, ["bill", "tipPct", "people"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = tipAmount(n.bill, n.tipPct, n.people);
      return ok([
        { label: "Tip", value: fmtMoney(r.tip), emphasize: true },
        { label: "Total", value: fmtMoney(r.total) },
        { label: "Per person", value: fmtMoney(r.perPerson) },
      ]);
    },
  },
  {
    slug: "sales-tax",
    category: "finance",
    name: "Sales Tax Calculator",
    description: "Add sales tax to a price or see tax amount for a given rate.",
    keywords: ["sales tax", "tax", "vat"],
    kind: "form",
    fields: [
      { id: "amount", label: "Pre-tax amount", type: "number", defaultValue: 49.99, prefix: "$", step: 0.01 },
      { id: "rate", label: "Tax rate", type: "number", defaultValue: 7.25, suffix: "%", step: 0.01 },
    ],
    related: ["gst-vat", "discount"],
    compute: (v) => {
      const parsed = requireNums(v, ["amount", "rate"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = salesTax(n.amount, n.rate);
      return ok([
        { label: "Tax", value: fmtMoney(r.tax), emphasize: true },
        { label: "Total", value: fmtMoney(r.total) },
      ]);
    },
  },
  {
    slug: "discount",
    category: "finance",
    name: "Discount Calculator",
    description: "Find the sale price and savings from a percent-off discount.",
    keywords: ["discount", "sale", "percent off", "markdown"],
    popular: true,
    kind: "form",
    fields: [
      { id: "original", label: "Original price", type: "number", defaultValue: 120, prefix: "$" },
      { id: "pct", label: "Discount", type: "number", defaultValue: 25, suffix: "%" },
    ],
    related: ["sales-tax", "percentage"],
    compute: (v) => {
      const parsed = requireNums(v, ["original", "pct"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = discountPrice(n.original, n.pct);
      return ok([
        { label: "Sale price", value: fmtMoney(r.final), emphasize: true },
        { label: "You save", value: fmtMoney(r.savings) },
      ]);
    },
  },
  {
    slug: "currency-converter",
    category: "finance",
    name: "Currency Converter",
    description:
      "Illustrative static FX conversion for common currencies. Rates are sample snapshots, not live market data.",
    keywords: ["currency", "fx", "exchange rate", "usd", "eur"],
    kind: "form",
    formulaNote:
      "Uses fixed illustrative rates vs USD for demo purposes. Always verify with a live FX source before transferring money.",
    fields: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 100, min: 0 },
      {
        id: "from",
        label: "From",
        type: "select",
        defaultValue: "USD",
        options: [
          { value: "USD", label: "USD" },
          { value: "EUR", label: "EUR" },
          { value: "GBP", label: "GBP" },
          { value: "INR", label: "INR" },
          { value: "JPY", label: "JPY" },
          { value: "CAD", label: "CAD" },
          { value: "AUD", label: "AUD" },
        ],
      },
      {
        id: "to",
        label: "To",
        type: "select",
        defaultValue: "EUR",
        options: [
          { value: "USD", label: "USD" },
          { value: "EUR", label: "EUR" },
          { value: "GBP", label: "GBP" },
          { value: "INR", label: "INR" },
          { value: "JPY", label: "JPY" },
          { value: "CAD", label: "CAD" },
          { value: "AUD", label: "AUD" },
        ],
      },
    ],
    related: ["percentage"],
    compute: (v) => {
      const amount = parseNum(v.amount);
      if (!Number.isFinite(amount)) return err("Enter a valid amount.");
      // Illustrative USD-based rates (not live)
      const usdPer: Record<string, number> = {
        USD: 1,
        EUR: 1.08,
        GBP: 1.27,
        INR: 0.012,
        JPY: 0.0067,
        CAD: 0.74,
        AUD: 0.66,
      };
      const from = v.from || "USD";
      const to = v.to || "EUR";
      const inUsd = amount * (usdPer[from] ?? 1);
      const converted = inUsd / (usdPer[to] ?? 1);
      return ok([
        { label: "Converted amount", value: `${fmtNumber(converted, 4)} ${to}`, emphasize: true },
        { label: "Note", value: "Static illustrative rates — not live market quotes." },
      ]);
    },
  },
  {
    slug: "savings-goal",
    category: "finance",
    name: "Savings Goal Calculator",
    description: "Estimate monthly deposits needed to reach a savings target.",
    keywords: ["savings", "goal", "monthly deposit"],
    kind: "form",
    fields: [
      { id: "goal", label: "Goal amount", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "current", label: "Current savings", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "years", label: "Years to goal", type: "number", defaultValue: 3 },
      { id: "rate", label: "Expected annual return", type: "number", defaultValue: 4, suffix: "%" },
    ],
    related: ["compound-interest", "retirement"],
    compute: (v) => {
      const parsed = requireNums(v, ["goal", "current", "years", "rate"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const monthly = savingsGoalMonthly(n.goal, n.years, n.rate, n.current);
      return ok([
        { label: "Monthly deposit needed", value: fmtMoney(monthly), emphasize: true },
        { label: "Total deposits (approx)", value: fmtMoney(monthly * n.years * 12) },
      ]);
    },
  },
  {
    slug: "retirement",
    category: "finance",
    name: "Retirement Nest Egg (Simple)",
    description: "Project retirement savings with regular monthly contributions.",
    keywords: ["retirement", "401k", "nest egg", "pension"],
    featured: true,
    kind: "form",
    fields: [
      { id: "starting", label: "Starting balance", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "monthly", label: "Monthly contribution", type: "number", defaultValue: 500, prefix: "$" },
      { id: "years", label: "Years until retirement", type: "number", defaultValue: 25 },
      { id: "returnPct", label: "Expected annual return", type: "number", defaultValue: 7, suffix: "%" },
    ],
    related: ["compound-interest", "savings-goal"],
    compute: (v) => {
      const parsed = requireNums(v, ["starting", "monthly", "years", "returnPct"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const fv = retirementNestEgg(n.monthly, n.years, n.returnPct, n.starting);
      const contributed = n.starting + n.monthly * n.years * 12;
      return ok([
        { label: "Projected balance", value: fmtMoney(fv), emphasize: true },
        { label: "Total contributed", value: fmtMoney(contributed) },
        { label: "Estimated growth", value: fmtMoney(fv - contributed) },
      ]);
    },
  },
  {
    slug: "cd-apy",
    category: "finance",
    name: "CD / APY Calculator",
    description: "Convert APR to APY and project certificate of deposit maturity value.",
    keywords: ["cd", "apy", "apr", "certificate of deposit"],
    kind: "form",
    fields: [
      { id: "principal", label: "Deposit", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "apr", label: "APR", type: "number", defaultValue: 4.5, suffix: "%" },
      {
        id: "compounds",
        label: "Compounding",
        type: "select",
        defaultValue: "365",
        options: [
          { value: "1", label: "Annually" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" },
        ],
      },
      { id: "years", label: "Term (years)", type: "number", defaultValue: 2, step: 0.5 },
    ],
    related: ["compound-interest"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "apr", "compounds", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const apy = apyFromApr(n.apr, n.compounds);
      const fv = cdFutureValue(n.principal, apy, n.years);
      return ok([
        { label: "APY", value: fmtPercent(apy), emphasize: true },
        { label: "Maturity value (approx)", value: fmtMoney(fv) },
        { label: "Interest earned", value: fmtMoney(fv - n.principal) },
      ]);
    },
  },
  {
    slug: "debt-payoff",
    category: "finance",
    name: "Debt Payoff Calculator",
    description: "Estimate how long to pay off a debt with fixed monthly payments.",
    keywords: ["debt", "payoff", "credit card", "snowball"],
    kind: "form",
    fields: [
      { id: "balance", label: "Balance", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "rate", label: "APR", type: "number", defaultValue: 19.9, suffix: "%" },
      { id: "payment", label: "Monthly payment", type: "number", defaultValue: 250, prefix: "$" },
    ],
    related: ["loan-emi", "amortization"],
    compute: (v) => {
      const parsed = requireNums(v, ["balance", "rate", "payment"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = debtPayoffMonths(n.balance, n.rate, n.payment);
      if (!Number.isFinite(r.months)) {
        return err("Payment is too low to cover monthly interest. Increase the payment.");
      }
      return ok([
        { label: "Months to payoff", value: String(r.months), emphasize: true },
        { label: "Years (approx)", value: fmtNumber(r.months / 12, 1) },
        { label: "Total interest", value: fmtMoney(r.totalInterest) },
        { label: "Total paid", value: fmtMoney(r.totalPaid) },
      ]);
    },
  },
  {
    slug: "net-worth",
    category: "finance",
    name: "Net Worth Calculator",
    description: "Add assets and subtract liabilities for a simple net worth snapshot.",
    keywords: ["net worth", "assets", "liabilities"],
    kind: "form",
    fields: [
      { id: "cash", label: "Cash & bank", type: "number", defaultValue: 12000, prefix: "$" },
      { id: "investments", label: "Investments", type: "number", defaultValue: 45000, prefix: "$" },
      { id: "property", label: "Home / property equity value", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "otherAssets", label: "Other assets", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "mortgage", label: "Mortgage balance", type: "number", defaultValue: 220000, prefix: "$" },
      { id: "loans", label: "Other loans / credit cards", type: "number", defaultValue: 15000, prefix: "$" },
    ],
    related: ["debt-payoff", "retirement"],
    compute: (v) => {
      const parsed = requireNums(v, ["cash", "investments", "property", "otherAssets", "mortgage", "loans"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const assets = n.cash + n.investments + n.property + n.otherAssets;
      const liabilities = n.mortgage + n.loans;
      return ok([
        { label: "Total assets", value: fmtMoney(assets) },
        { label: "Total liabilities", value: fmtMoney(liabilities) },
        { label: "Net worth", value: fmtMoney(assets - liabilities), emphasize: true },
      ]);
    },
  },
  {
    slug: "break-even",
    category: "finance",
    name: "Break-Even Calculator",
    description: "Find units needed to cover fixed costs given price and variable cost.",
    keywords: ["break even", "units", "fixed cost"],
    kind: "form",
    fields: [
      { id: "fixed", label: "Fixed costs", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "price", label: "Price per unit", type: "number", defaultValue: 40, prefix: "$" },
      { id: "variable", label: "Variable cost per unit", type: "number", defaultValue: 15, prefix: "$" },
    ],
    related: ["profit-margin", "margin-markup"],
    compute: (v) => {
      const parsed = requireNums(v, ["fixed", "price", "variable"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const units = breakEvenUnits(n.fixed, n.price, n.variable);
      if (!Number.isFinite(units)) return err("Price must exceed variable cost per unit.");
      return ok([
        { label: "Break-even units", value: fmtNumber(units, 2), emphasize: true },
        { label: "Contribution margin / unit", value: fmtMoney(n.price - n.variable) },
      ]);
    },
  },
  {
    slug: "gst-vat",
    category: "finance",
    name: "GST / VAT Calculator",
    description: "Add or extract GST/VAT from an amount at a chosen rate.",
    keywords: ["gst", "vat", "tax inclusive", "tax exclusive"],
    kind: "form",
    fields: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "GST/VAT rate", type: "number", defaultValue: 18, suffix: "%" },
      {
        id: "mode",
        label: "Mode",
        type: "select",
        defaultValue: "exclusive",
        options: [
          { value: "exclusive", label: "Tax exclusive (add tax)" },
          { value: "inclusive", label: "Tax inclusive (extract tax)" },
        ],
      },
    ],
    related: ["sales-tax"],
    compute: (v) => {
      const parsed = requireNums(v, ["amount", "rate"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const mode = (v.mode === "inclusive" ? "inclusive" : "exclusive") as "exclusive" | "inclusive";
      const r = gstVat(n.amount, n.rate, mode);
      return ok([
        { label: "Net (ex-tax)", value: fmtMoney(r.net) },
        { label: "Tax", value: fmtMoney(r.tax), emphasize: true },
        { label: "Gross (inc-tax)", value: fmtMoney(r.gross) },
      ]);
    },
  },
  {
    slug: "inflation",
    category: "finance",
    name: "Inflation Calculator",
    description: "Estimate future purchasing power given an annual inflation rate.",
    keywords: ["inflation", "purchasing power", "cpi"],
    kind: "form",
    fields: [
      { id: "amount", label: "Amount today", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Annual inflation", type: "number", defaultValue: 3, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
    ],
    related: ["compound-interest"],
    compute: (v) => {
      const parsed = requireNums(v, ["amount", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const future = n.amount * Math.pow(1 + n.rate / 100, n.years);
      const power = n.amount / Math.pow(1 + n.rate / 100, n.years);
      return ok([
        { label: "Equivalent future cost", value: fmtMoney(future), emphasize: true },
        { label: "Today's purchasing power of that future sum", value: fmtMoney(power), hint: "If you hold cash with no return" },
      ]);
    },
  },
];
