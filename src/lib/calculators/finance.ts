import type { CalculatorMeta } from "../types";
import {
  mortgagePayment,
  amortizeSchedule,
  simpleInterest,
  compoundInterest,
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
  continuousCompound,
  effectiveAnnualRate,
  compoundingSchedule,
  sipFutureValue,
  ruleOf72,
  cagr,
  inflationAdjust,
  npv,
  salaryHike,
  emiWithExtra,
} from "../formulas/finance";
import { amortizeYearlySummary } from "../formulas/catalog";
import { sipGrowthSchedule } from "../formulas/wave2";
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

export const financeCalculators: CalculatorMeta[] = [
  {
    slug: "mortgage",
    category: "finance",
    name: "Mortgage Calculator",
    description:
      "Estimate monthly principal & interest for a fixed-rate mortgage or home loan — with full amortization chart and year-by-year table (US + India EMI-style).",
    keywords: [
      "mortgage",
      "home loan",
      "monthly payment",
      "house",
      "EMI",
      "amortization",
      "India home loan",
    ],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote:
      "Standard amortizing loan: M = P · r(1+r)^n / ((1+r)^n − 1), where r is monthly rate and n is months. Taxes, insurance, PMI, and HOA are not included. Same math family as Indian home-loan EMI.",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", defaultValue: 300000, prefix: "$", min: 0 },
      { id: "rate", label: "Annual interest rate", type: "number", defaultValue: 6.5, suffix: "%", step: 0.01, min: 0 },
      { id: "years", label: "Loan term", type: "number", defaultValue: 30, suffix: "years", min: 1 },
    ],
    related: ["amortization", "refinance", "loan-emi", "emi-extra-payments"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const pmt = mortgagePayment(n.principal, n.rate, n.years);
      if (!Number.isFinite(pmt)) return err("Enter a valid loan amount, rate, and term.");
      const total = pmt * n.years * 12;
      const yearly = amortizeYearlySummary(n.principal, n.rate, n.years);
      const totalInterest = yearly.reduce((s, r) => s + r.interest, 0);
      const monthly = amortizeSchedule(n.principal, n.rate, n.years, 12);
      const y1 = yearly[0];
      return ok([
        { label: "Monthly payment (P&I / EMI)", value: fmtMoney(pmt), emphasize: true },
        { label: "Total of payments", value: fmtMoney(total) },
        { label: "Total interest", value: fmtMoney(totalInterest || total - n.principal) },
        {
          label: "Year 1 snapshot",
          value: y1
            ? `Interest ${fmtMoney(y1.interest)} · Principal ${fmtMoney(y1.principal)} · End bal ${fmtMoney(y1.endBalance)}`
            : "—",
          hint: "Early years are interest-heavy on long fixed-rate loans",
        },
        {
          label: "Amortization chart",
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
              principal: Math.round(r.principal * 100) / 100,
              interest: Math.round(r.interest * 100) / 100,
              balance: Math.round(r.endBalance * 100) / 100,
            })),
          },
        },
        {
          label: "First 12 months (monthly)",
          value: `${monthly.length} payments`,
          table: {
            headers: ["Month", "Payment", "Principal", "Interest", "Balance"],
            rows: monthly.map((r) => [
              String(r.period),
              fmtMoney(r.payment),
              fmtMoney(r.principal),
              fmtMoney(r.interest),
              fmtMoney(r.balance),
            ]),
          },
        },
        {
          label: "Full annual amortization schedule",
          value: `${yearly.length} years — scroll to review every year`,
          table: {
            headers: ["Year", "Payments", "Principal", "Interest", "End balance"],
            rows: yearly.map((r) => [
              String(r.year),
              fmtMoney(r.payment),
              fmtMoney(r.principal),
              fmtMoney(r.interest),
              fmtMoney(r.endBalance),
            ]),
          },
        },
      ]);
    },
  },
  {
    slug: "loan-emi",
    category: "finance",
    name: "Loan / EMI Calculator",
    description:
      "Calculate EMI for personal, auto, or home loans (India + global) with interest breakdown, chart, and yearly schedule.",
    keywords: [
      "emi",
      "loan",
      "installment",
      "auto loan",
      "personal loan",
      "India EMI",
      "home loan EMI",
    ],
    popular: true,
    featured: true,
    kind: "form",
    formulaNote:
      "EMI = P · r(1+r)^n / ((1+r)^n − 1) with monthly rate r = annual%/12/100 and n = tenure months. Reducing-balance amortization — the same family as US mortgage P&I.",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 500000, prefix: "$", min: 0 },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 10, suffix: "%", step: 0.01 },
      { id: "months", label: "Tenure", type: "number", defaultValue: 60, suffix: "months", min: 1 },
    ],
    related: ["mortgage", "amortization", "debt-payoff", "emi-extra-payments", "sip"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "months"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.months < 1) return err("Tenure must be at least 1 month.");
      const years = n.months / 12;
      const pmt = mortgagePayment(n.principal, n.rate, years);
      if (!Number.isFinite(pmt)) return err("Enter a valid principal, rate, and tenure.");
      const yearly = amortizeYearlySummary(n.principal, n.rate, Math.max(Math.ceil(years), 1));
      // For fractional years, yearly summary still helps; also show first-year monthly rows
      const monthlyRows = amortizeSchedule(n.principal, n.rate, years, Math.min(n.months, 12));
      return ok([
        { label: "Monthly EMI", value: fmtMoney(pmt), emphasize: true },
        { label: "Total payment", value: fmtMoney(pmt * n.months) },
        { label: "Total interest", value: fmtMoney(pmt * n.months - n.principal) },
        {
          label: "EMI paydown chart",
          value: `${yearly.length} year buckets`,
          lineChart: {
            xKey: "year",
            series: [
              { key: "principal", label: "Principal", color: "#0d9488" },
              { key: "interest", label: "Interest", color: "#f43f5e" },
              { key: "balance", label: "Balance", color: "#6366f1" },
            ],
            points: yearly.map((r) => ({
              year: r.year,
              principal: Math.round(r.principal * 100) / 100,
              interest: Math.round(r.interest * 100) / 100,
              balance: Math.round(r.endBalance * 100) / 100,
            })),
          },
        },
        {
          label: "First 12 months",
          value: `${monthlyRows.length} payments`,
          table: {
            headers: ["Month", "EMI", "Principal", "Interest", "Balance"],
            rows: monthlyRows.map((r) => [
              String(r.period),
              fmtMoney(r.payment),
              fmtMoney(r.principal),
              fmtMoney(r.interest),
              fmtMoney(r.balance),
            ]),
          },
        },
        {
          label: "Annual schedule",
          value: `${yearly.length} years`,
          table: {
            headers: ["Year", "Payments", "Principal", "Interest", "End balance"],
            rows: yearly.map((r) => [
              String(r.year),
              fmtMoney(r.payment),
              fmtMoney(r.principal),
              fmtMoney(r.interest),
              fmtMoney(r.endBalance),
            ]),
          },
        },
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
      { id: "years", label: "Years", type: "number", defaultValue: 10, suffix: "years", min: 0 },
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
      const pmt = mortgagePayment(n.principal, n.rate, n.years);
      const yearly = amortizeYearlySummary(n.principal, n.rate, n.years);
      const totalInterest = yearly.reduce((s, r) => s + r.interest, 0);
      const y1 = yearly[0];
      const tableRows = yearly.map((r) => [
        String(r.year),
        fmtMoney(r.payment),
        fmtMoney(r.principal),
        fmtMoney(r.interest),
        fmtMoney(r.endBalance),
      ]);
      const chart = yearly.slice(0, Math.min(30, yearly.length)).map((r) => ({
        label: "Y" + r.year,
        value: r.interest,
      }));
      return ok([
        { label: "Monthly payment", value: fmtMoney(pmt), emphasize: true },
        { label: "Total interest", value: fmtMoney(totalInterest) },
        { label: "Total of payments", value: fmtMoney(pmt * n.years * 12) },
        {
          label: "Year 1",
          value: y1
            ? `Interest ${fmtMoney(y1.interest)} · Principal ${fmtMoney(y1.principal)} · Bal ${fmtMoney(y1.endBalance)}`
            : "—",
        },
        {
          label: "Annual schedule",
          value: `${yearly.length} years`,
          table: {
            headers: ["Year", "Payments", "Principal", "Interest", "Balance"],
            rows: tableRows,
          },
          chart,
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
    slug: "refinance",
    category: "finance",
    name: "Refinance Calculator",
    description: "Compare current vs new loan payments and estimate break-even.",
    keywords: ["refinance", "refi", "mortgage refinance"],
    kind: "form",
    fields: [
      { id: "balance", label: "Current balance", type: "number", defaultValue: 280000, prefix: "$" },
      { id: "currentRate", label: "Current rate", type: "number", defaultValue: 7.5, suffix: "%" },
      { id: "yearsLeft", label: "Years remaining", type: "number", defaultValue: 25, suffix: "years" },
      { id: "newRate", label: "New rate", type: "number", defaultValue: 6.0, suffix: "%" },
      { id: "newYears", label: "New term", type: "number", defaultValue: 30, suffix: "years" },
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
      "Convert between USD, EUR, GBP, INR, JPY, AED and more using periodically refreshed FX rates.",
    keywords: ["currency", "fx", "exchange rate", "usd", "eur", "inr", "aed"],
    featured: true,
    popular: true,
    kind: "custom",
    customKey: "currency-live",
    usesMoney: true,
    formulaNote:
      "Rates are pulled from a free ECB reference feed (frankfurter.app) via /api/fx, cached about hourly. Fallback snapshot rates apply if the feed is down. Not for trading or wire transfers.",
    related: ["currency-pairs-quick", "percentage", "forex-position-size"],
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
      { id: "years", label: "Years to goal", type: "number", defaultValue: 3, suffix: "years" },
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
      { id: "years", label: "Years until retirement", type: "number", defaultValue: 25 , suffix: "years"},
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
      { id: "years", label: "Term (years)", type: "number", defaultValue: 2, step: 0.5 , suffix: "years"},
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
      { id: "years", label: "Years", type: "number", defaultValue: 10 , suffix: "years"},
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
  {
    slug: "compounding",
    category: "finance",
    name: "Compounding Calculator",
    description:
      "Compare continuous vs n-times-per-year compounding, effective annual rate, and a year-by-year growth schedule.",
    keywords: [
      "compounding",
      "continuous compounding",
      "effective rate",
      "EAR",
      "compound frequency",
      "growth schedule",
    ],
    featured: true,
    popular: true,
    kind: "form",
    formulaNote:
      "Discrete: A=P(1+r/n)^(nt). Continuous: A=P·e^(rt). EAR shown for the selected frequency.",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "rate", label: "Nominal annual rate", type: "number", defaultValue: 6, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 10, step: 0.5 , suffix: "years"},
      {
        id: "freq",
        label: "Compounding",
        type: "select",
        defaultValue: "12",
        options: [
          { value: "1", label: "Annually (n=1)" },
          { value: "2", label: "Semi-annually (n=2)" },
          { value: "4", label: "Quarterly (n=4)" },
          { value: "12", label: "Monthly (n=12)" },
          { value: "365", label: "Daily (n=365)" },
          { value: "continuous", label: "Continuous (e^(rt))" },
        ],
      },
    ],
    related: ["compound-interest", "cd-apy", "sip", "rule-of-72"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.principal < 0 || n.years < 0) return err("Principal and years must be ≥ 0.");
      const continuous = v.freq === "continuous";
      let total: number;
      let interest: number;
      if (continuous) {
        const r = continuousCompound(n.principal, n.rate, n.years);
        total = r.total;
        interest = r.interest;
      } else {
        const freq = Number(v.freq);
        if (!Number.isFinite(freq) || freq <= 0) return err("Invalid frequency.");
        const r = compoundInterest(n.principal, n.rate, n.years, freq);
        total = r.total;
        interest = r.interest;
      }
      const ear = effectiveAnnualRate(
        n.rate,
        continuous ? "continuous" : Number(v.freq)
      );
      const schedule = compoundingSchedule(
        n.principal,
        n.rate,
        Math.min(n.years, 10),
        continuous ? "continuous" : Number(v.freq)
      );
      const last = schedule[schedule.length - 1];
      const disc = continuousCompound(n.principal, n.rate, n.years);
      const monthly = compoundInterest(n.principal, n.rate, n.years, 12);
      return ok([
        { label: "Future value", value: fmtMoney(total), emphasize: true },
        { label: "Interest earned", value: fmtMoney(interest) },
        { label: "Effective annual rate (EAR)", value: fmtPercent(ear), emphasize: true },
        {
          label: continuous ? "Vs monthly compounding" : "Vs continuous compounding",
          value: continuous
            ? fmtMoney(monthly.total)
            : fmtMoney(disc.total),
          hint: continuous
            ? "Same inputs compounded monthly"
            : "Same inputs with continuous compounding",
        },
        {
          label: `Year ${last?.year ?? "—"} balance (schedule)`,
          value: last ? fmtMoney(last.balance) : "—",
          hint: n.years > 10 ? "Schedule summarized for first 10 years" : "End of schedule",
        },
      ]);
    },
  },
  {
    slug: "sip",
    category: "finance",
    name: "SIP / Recurring Investment",
    description:
      "Project SIP / recurring investment maturity with invested-vs-portfolio chart — popular for Indian mutual funds and global DCA.",
    keywords: [
      "sip",
      "recurring investment",
      "systematic investment",
      "mutual fund",
      "India SIP",
      "SIP calculator",
    ],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      { id: "monthly", label: "Monthly investment", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Expected annual return", type: "number", defaultValue: 12, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 15 , suffix: "years"},
    ],
    related: ["compounding", "retirement", "cagr"],
    compute: (v) => {
      const parsed = requireNums(v, ["monthly", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.monthly < 0 || n.years <= 0) return err("Enter positive tenure and non-negative investment.");
      const r = sipFutureValue(n.monthly, n.rate, n.years);
      const schedule = sipGrowthSchedule(n.monthly, n.rate, n.years);
      return ok([
        { label: "Future value", value: fmtMoney(r.total), emphasize: true },
        { label: "Total invested", value: fmtMoney(r.invested) },
        { label: "Estimated gains", value: fmtMoney(r.gains) },
        {
          label: "Growth chart",
          value: `${schedule.length} years`,
          lineChart: {
            xKey: "year",
            series: [
              { key: "value", label: "Portfolio", color: "#0d9488" },
              { key: "invested", label: "Invested", color: "#6366f1" },
            ],
            points: schedule.map((row) => ({
              year: row.year,
              value: row.value,
              invested: row.invested,
            })),
          },
        },
      ]);
    },
  },
  {
    slug: "rule-of-72",
    category: "finance",
    name: "Rule of 72",
    description: "Estimate years to double your money at a given annual return.",
    keywords: ["rule of 72", "doubling time", "investment"],
    kind: "form",
    fields: [{ id: "rate", label: "Annual return", type: "number", defaultValue: 8, suffix: "%" }],
    related: ["compounding", "cagr"],
    compute: (v) => {
      const parsed = requireNums(v, ["rate"]);
      if (!parsed.ok) return err(parsed.error);
      const years = ruleOf72(parsed.n.rate);
      if (!Number.isFinite(years)) return err("Rate must be positive.");
      return ok([
        { label: "Approx years to double", value: fmtNumber(years, 2), emphasize: true },
        { label: "Exact (ln2 / ln(1+r))", value: fmtNumber(Math.log(2) / Math.log(1 + parsed.n.rate / 100), 2) },
      ]);
    },
  },
  {
    slug: "inflation-adjuster",
    category: "finance",
    name: "Inflation Adjuster",
    description: "Convert an amount forward or backward across years of inflation.",
    keywords: ["inflation adjuster", "real value", "purchasing power"],
    kind: "form",
    fields: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Annual inflation", type: "number", defaultValue: 3, suffix: "%" },
      { id: "years", label: "Years", type: "number", defaultValue: 10 , suffix: "years"},
      {
        id: "direction",
        label: "Direction",
        type: "select",
        defaultValue: "future",
        options: [
          { value: "future", label: "Today → future cost" },
          { value: "past", label: "Future/past sum → today's purchasing power" },
        ],
      },
    ],
    related: ["inflation", "cagr"],
    compute: (v) => {
      const parsed = requireNums(v, ["amount", "rate", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const dir = v.direction === "past" ? "past" : "future";
      const adj = inflationAdjust(n.amount, n.rate, n.years, dir);
      return ok([
        {
          label: dir === "future" ? "Future equivalent" : "Today's purchasing power",
          value: fmtMoney(adj),
          emphasize: true,
        },
      ]);
    },
  },
  {
    slug: "cagr",
    category: "finance",
    name: "CAGR Calculator",
    description: "Compound annual growth rate between a beginning and ending value.",
    keywords: ["cagr", "compound annual growth rate", "annualized return"],
    popular: true,
    kind: "form",
    fields: [
      { id: "begin", label: "Beginning value", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "end", label: "Ending value", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "years", label: "Years", type: "number", defaultValue: 5 , suffix: "years"},
    ],
    related: ["roi", "compounding", "sip"],
    compute: (v) => {
      const parsed = requireNums(v, ["begin", "end", "years"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const rate = cagr(n.begin, n.end, n.years);
      if (!Number.isFinite(rate)) return err("Beginning value and years must be positive.");
      return ok([
        { label: "CAGR", value: fmtPercent(rate), emphasize: true },
        { label: "Total growth", value: fmtPercent(((n.end - n.begin) / Math.abs(n.begin)) * 100) },
      ]);
    },
  },
  {
    slug: "npv",
    category: "finance",
    name: "NPV Calculator (Simple)",
    description: "Net present value of a series of cash flows at a flat discount rate.",
    keywords: ["npv", "net present value", "discounted cash flow"],
    kind: "form",
    fields: [
      { id: "rate", label: "Discount rate (per period)", type: "number", defaultValue: 10, suffix: "%" },
      {
        id: "flows",
        label: "Cash flows (period 0, 1, 2… comma-separated)",
        type: "textarea",
        defaultValue: "-10000, 3000, 4200, 6800",
        helpText: "Use a negative number for the initial investment.",
      },
    ],
    related: ["roi", "cagr"],
    compute: (v) => {
      const rate = parseNum(v.rate);
      if (!Number.isFinite(rate)) return err("Enter a discount rate.");
      const flows = parseList(v.flows || "");
      if (!flows.length) return err("Enter at least one cash flow.");
      // parseList filters non-finite — but negatives are fine
      const raw = (v.flows || "")
        .split(/[\s,;]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map(Number);
      if (raw.some((x) => !Number.isFinite(x))) return err("Invalid cash flow list.");
      const value = npv(rate, raw);
      return ok([
        { label: "NPV", value: fmtMoney(value), emphasize: true },
        { label: "Periods", value: String(raw.length) },
        { label: "Sum of undiscounted flows", value: fmtMoney(raw.reduce((a, b) => a + b, 0)) },
      ]);
    },
  },
  {
    slug: "salary-hike",
    category: "finance",
    name: "Salary Hike Calculator",
    description: "Compute new salary and raise amount from a hike percentage.",
    keywords: ["salary hike", "raise", "pay increase", "appraisal"],
    kind: "form",
    fields: [
      { id: "current", label: "Current salary", type: "number", defaultValue: 60000, prefix: "$" },
      { id: "hike", label: "Hike", type: "number", defaultValue: 10, suffix: "%" },
    ],
    related: ["hourly-to-salary", "inflation-adjuster"],
    compute: (v) => {
      const parsed = requireNums(v, ["current", "hike"]);
      if (!parsed.ok) return err(parsed.error);
      const r = salaryHike(parsed.n.current, parsed.n.hike);
      return ok([
        { label: "New salary", value: fmtMoney(r.newSalary), emphasize: true },
        { label: "Increase", value: fmtMoney(r.increase) },
        { label: "Monthly (÷12)", value: fmtMoney(r.newSalary / 12) },
      ]);
    },
  },
  {
    slug: "emi-extra-payments",
    category: "finance",
    name: "EMI with Extra Payments",
    description: "See how extra monthly payments shorten a loan and reduce total interest.",
    keywords: ["emi extra", "prepayment", "loan extra payment", "payoff faster"],
    kind: "form",
    fields: [
      { id: "principal", label: "Principal", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Annual rate", type: "number", defaultValue: 7, suffix: "%" },
      { id: "years", label: "Original term", type: "number", defaultValue: 20, suffix: "years" },
      { id: "extra", label: "Extra monthly payment", type: "number", defaultValue: 200, prefix: "$" },
    ],
    related: ["loan-emi", "debt-payoff", "amortization"],
    compute: (v) => {
      const parsed = requireNums(v, ["principal", "rate", "years", "extra"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = emiWithExtra({
        principal: n.principal,
        annualRatePct: n.rate,
        years: n.years,
        extraMonthly: n.extra,
      });
      if (!Number.isFinite(r.payoffMonths)) {
        return err("Payment too low to amortize the loan — increase EMI or extra amount.");
      }
      return ok([
        { label: "Base EMI", value: fmtMoney(r.baseEmi) },
        { label: "Payoff months (with extra)", value: String(r.payoffMonths), emphasize: true },
        { label: "Months saved", value: String(r.monthsSaved) },
        { label: "Total interest (with extra)", value: fmtMoney(r.totalInterest) },
        { label: "Interest saved", value: fmtMoney(r.interestSaved), emphasize: true },
      ]);
    },
  },
];
