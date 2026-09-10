import type { CalculatorMeta } from "../types";
import {
  marginFromCostPrice,
  priceFromMargin,
  priceFromMarkup,
  hourlyToSalary,
  salaryToHourly,
} from "../formulas/business";
import { roi } from "../formulas/finance";
import { requireNums, fmtMoney, fmtPercent, err, ok } from "./helpers";

export const businessCalculators: CalculatorMeta[] = [
  {
    slug: "margin-markup",
    category: "business",
    name: "Margin & Markup Calculator",
    description: "Convert between cost, price, margin %, and markup %.",
    keywords: ["margin", "markup", "gross margin"],
    featured: true,
    popular: true,
    kind: "form",
    fields: [
      {
        id: "mode",
        label: "Mode",
        type: "select",
        defaultValue: "fromCostPrice",
        options: [
          { value: "fromCostPrice", label: "From cost + price" },
          { value: "fromCostMargin", label: "Price from cost + margin %" },
          { value: "fromCostMarkup", label: "Price from cost + markup %" },
        ],
      },
      { id: "cost", label: "Cost", type: "number", defaultValue: 40, prefix: "$" },
      {
        id: "price",
        label: "Price",
        type: "number",
        defaultValue: 55,
        prefix: "$",
        visibleWhen: { field: "mode", in: ["fromCostPrice"] },
      },
      {
        id: "marginPct",
        label: "Margin %",
        type: "number",
        defaultValue: 25,
        suffix: "%",
        visibleWhen: { field: "mode", in: ["fromCostMargin"] },
      },
      {
        id: "markupPct",
        label: "Markup %",
        type: "number",
        defaultValue: 37.5,
        suffix: "%",
        visibleWhen: { field: "mode", in: ["fromCostMarkup"] },
      },
    ],
    related: ["profit-margin", "break-even"],
    compute: (v) => {
      const cost = Number(v.cost);
      if (v.mode === "fromCostPrice") {
        const parsed = requireNums(v, ["cost", "price"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
        const r = marginFromCostPrice(n.cost, n.price);
        return ok([
          { label: "Profit", value: fmtMoney(r.profit), emphasize: true },
          { label: "Margin", value: fmtPercent(r.marginPct) },
          { label: "Markup", value: fmtPercent(r.markupPct) },
        ]);
      }
      if (v.mode === "fromCostMargin") {
        const parsed = requireNums(v, ["cost", "marginPct"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
        const price = priceFromMargin(n.cost, n.marginPct);
        if (!Number.isFinite(price)) return err("Margin must be below 100%.");
        return ok([
          { label: "Selling price", value: fmtMoney(price), emphasize: true },
          { label: "Profit", value: fmtMoney(price - n.cost) },
        ]);
      }
      const parsed = requireNums(v, ["cost", "markupPct"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const price = priceFromMarkup(n.cost, n.markupPct);
      return ok([
        { label: "Selling price", value: fmtMoney(price), emphasize: true },
        { label: "Profit", value: fmtMoney(price - cost) },
      ]);
    },
  },
  {
    slug: "profit-margin",
    category: "business",
    name: "Profit Margin Calculator",
    description: "Net and gross profit margin from revenue and costs.",
    keywords: ["profit margin", "net margin", "gross profit"],
    kind: "form",
    fields: [
      { id: "revenue", label: "Revenue", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "cogs", label: "Cost of goods sold", type: "number", defaultValue: 60000, prefix: "$" },
      { id: "expenses", label: "Operating expenses", type: "number", defaultValue: 20000, prefix: "$" },
    ],
    related: ["margin-markup", "roi"],
    compute: (v) => {
      const parsed = requireNums(v, ["revenue", "cogs", "expenses"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.revenue === 0) return err("Revenue cannot be zero.");
      const gross = n.revenue - n.cogs;
      const net = gross - n.expenses;
      return ok([
        { label: "Gross profit", value: fmtMoney(gross) },
        { label: "Gross margin", value: fmtPercent((gross / n.revenue) * 100) },
        { label: "Net profit", value: fmtMoney(net), emphasize: true },
        { label: "Net margin", value: fmtPercent((net / n.revenue) * 100), emphasize: true },
      ]);
    },
  },
  {
    slug: "hourly-to-salary",
    category: "business",
    name: "Hourly to Salary Converter",
    description: "Convert hourly wages to weekly, monthly, and yearly salary estimates.",
    keywords: ["hourly", "salary", "wage", "annualize"],
    popular: true,
    kind: "form",
    fields: [
      {
        id: "mode",
        label: "Convert",
        type: "select",
        defaultValue: "hourly",
        options: [
          { value: "hourly", label: "Hourly → Salary" },
          { value: "salary", label: "Salary → Hourly" },
        ],
      },
      { id: "hourly", label: "Hourly rate", type: "number", defaultValue: 35, prefix: "$", step: 0.01 },
      { id: "yearly", label: "Yearly salary", type: "number", defaultValue: 72800, prefix: "$" },
      { id: "hoursPerWeek", label: "Hours / week", type: "number", defaultValue: 40 },
      { id: "weeksPerYear", label: "Weeks / year", type: "number", defaultValue: 52 },
    ],
    related: ["hours-to-decimal"],
    compute: (v) => {
      const hours = Number(v.hoursPerWeek);
      const weeks = Number(v.weeksPerYear);
      if (!Number.isFinite(hours) || !Number.isFinite(weeks) || hours <= 0 || weeks <= 0) {
        return err("Invalid hours/weeks.");
      }
      if (v.mode === "salary") {
        const yearly = Number(v.yearly);
        if (!Number.isFinite(yearly)) return err("Enter yearly salary.");
        const hourly = salaryToHourly(yearly, hours, weeks);
        return ok([
          { label: "Hourly equivalent", value: fmtMoney(hourly), emphasize: true },
          { label: "Weekly", value: fmtMoney(hourly * hours) },
        ]);
      }
      const hourly = Number(v.hourly);
      if (!Number.isFinite(hourly)) return err("Enter hourly rate.");
      const r = hourlyToSalary(hourly, hours, weeks);
      return ok([
        { label: "Weekly", value: fmtMoney(r.weekly) },
        { label: "Monthly (approx)", value: fmtMoney(r.monthly) },
        { label: "Yearly", value: fmtMoney(r.yearly), emphasize: true },
      ]);
    },
  },
  {
    slug: "business-roi",
    category: "business",
    name: "Business ROI",
    description: "Simple ROI for a project or campaign investment.",
    keywords: ["business roi", "campaign roi"],
    kind: "form",
    fields: [
      { id: "invested", label: "Amount invested", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "returned", label: "Amount returned", type: "number", defaultValue: 7500, prefix: "$" },
    ],
    related: ["roi", "profit-margin"],
    compute: (v) => {
      const parsed = requireNums(v, ["invested", "returned"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const r = roi(n.invested, n.returned);
      return ok([
        { label: "Net profit", value: fmtMoney(r.gain), emphasize: true },
        { label: "ROI", value: fmtPercent(r.roiPct) },
      ]);
    },
  },
  {
    slug: "sales-commission",
    category: "business",
    name: "Sales Commission Calculator",
    description: "Calculate commission from sales amount and rate, with optional base salary.",
    keywords: ["commission", "sales", "earnings"],
    kind: "form",
    fields: [
      { id: "sales", label: "Sales amount", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "rate", label: "Commission rate", type: "number", defaultValue: 8, suffix: "%" },
      { id: "base", label: "Base pay (optional)", type: "number", defaultValue: 2000, prefix: "$" },
    ],
    related: ["hourly-to-salary"],
    compute: (v) => {
      const parsed = requireNums(v, ["sales", "rate", "base"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const commission = n.sales * (n.rate / 100);
      return ok([
        { label: "Commission", value: fmtMoney(commission), emphasize: true },
        { label: "Total pay", value: fmtMoney(commission + n.base) },
      ]);
    },
  },
  {
    slug: "discount-stack",
    category: "business",
    name: "Stacked Discount Calculator",
    description: "Apply sequential percentage discounts to a list price.",
    keywords: ["stacked discount", "successive discount"],
    kind: "form",
    fields: [
      { id: "price", label: "List price", type: "number", defaultValue: 200, prefix: "$" },
      { id: "d1", label: "First discount %", type: "number", defaultValue: 20, suffix: "%" },
      { id: "d2", label: "Second discount %", type: "number", defaultValue: 10, suffix: "%" },
      { id: "d3", label: "Third discount %", type: "number", defaultValue: 0, suffix: "%" },
    ],
    related: ["discount", "margin-markup"],
    compute: (v) => {
      const parsed = requireNums(v, ["price", "d1", "d2", "d3"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      let p = n.price;
      for (const d of [n.d1, n.d2, n.d3]) p *= 1 - d / 100;
      const effective = (1 - p / n.price) * 100;
      return ok([
        { label: "Final price", value: fmtMoney(p), emphasize: true },
        { label: "Total savings", value: fmtMoney(n.price - p) },
        { label: "Effective discount", value: fmtPercent(effective) },
      ]);
    },
  },
];
