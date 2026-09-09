import type { CalculatorMeta } from "../types";
import { ageFromDob } from "../formulas/math";
import { err, ok, fmtDate, fmtNumber } from "./helpers";

export const dateTimeCalculators: CalculatorMeta[] = [
  {
    slug: "date-difference",
    category: "date-time",
    name: "Date Difference",
    description: "Find the number of days between two dates.",
    keywords: ["date difference", "days between", "duration"],
    popular: true,
    kind: "form",
    fields: [
      { id: "start", label: "Start date", type: "date", defaultValue: "2026-01-01" },
      { id: "end", label: "End date", type: "date", defaultValue: "2026-09-09" },
    ],
    related: ["add-subtract-days", "age-from-dob"],
    compute: (v) => {
      if (!v.start || !v.end) return err("Enter both dates.");
      const a = new Date(v.start + "T00:00:00");
      const b = new Date(v.end + "T00:00:00");
      if (isNaN(a.getTime()) || isNaN(b.getTime())) return err("Invalid date.");
      const days = Math.round((b.getTime() - a.getTime()) / 86400000);
      return ok([
        { label: "Days", value: String(days), emphasize: true },
        { label: "Weeks (approx)", value: fmtNumber(days / 7, 2) },
        { label: "Absolute days", value: String(Math.abs(days)) },
      ]);
    },
  },
  {
    slug: "add-subtract-days",
    category: "date-time",
    name: "Add / Subtract Days",
    description: "Add or subtract a number of days from a starting date.",
    keywords: ["add days", "subtract days", "date math"],
    kind: "form",
    fields: [
      { id: "date", label: "Start date", type: "date", defaultValue: "2026-09-09" },
      { id: "days", label: "Days (+/−)", type: "number", defaultValue: 30 },
    ],
    related: ["date-difference"],
    compute: (v) => {
      if (!v.date) return err("Enter a date.");
      const d = new Date(v.date + "T00:00:00");
      const days = Number(v.days);
      if (isNaN(d.getTime()) || !Number.isFinite(days)) return err("Invalid input.");
      d.setDate(d.getDate() + days);
      return ok([
        { label: "Resulting date", value: fmtDate(d), emphasize: true },
        { label: "ISO", value: d.toISOString().slice(0, 10) },
      ]);
    },
  },
  {
    slug: "age-from-dob",
    category: "date-time",
    name: "Age from Date of Birth",
    description: "Detailed age breakdown from DOB — same engine as the math age tool.",
    keywords: ["age from dob", "birthday age"],
    kind: "form",
    fields: [
      { id: "dob", label: "Date of birth", type: "date", defaultValue: "1995-06-15" },
    ],
    related: ["age", "date-difference"],
    compute: (v) => {
      if (!v.dob) return err("Enter DOB.");
      const dob = new Date(v.dob + "T00:00:00");
      const on = new Date();
      if (isNaN(dob.getTime())) return err("Invalid date.");
      const a = ageFromDob(dob, on);
      const totalDays = Math.floor((on.getTime() - dob.getTime()) / 86400000);
      return ok([
        { label: "Age", value: `${a.years}y ${a.months}m ${a.days}d`, emphasize: true },
        { label: "Total days lived", value: String(totalDays) },
        { label: "Next birthday in", value: (() => {
          const next = new Date(on.getFullYear(), dob.getMonth(), dob.getDate());
          if (next < on) next.setFullYear(on.getFullYear() + 1);
          return `${Math.ceil((next.getTime() - on.getTime()) / 86400000)} days`;
        })() },
      ]);
    },
  },
  {
    slug: "business-days",
    category: "date-time",
    name: "Business Days Calculator",
    description: "Count weekdays (Mon–Fri) between two dates, excluding weekends.",
    keywords: ["business days", "working days", "weekdays"],
    kind: "form",
    fields: [
      { id: "start", label: "Start date", type: "date", defaultValue: "2026-09-01" },
      { id: "end", label: "End date", type: "date", defaultValue: "2026-09-30" },
    ],
    related: ["date-difference"],
    compute: (v) => {
      if (!v.start || !v.end) return err("Enter both dates.");
      let a = new Date(v.start + "T00:00:00");
      let b = new Date(v.end + "T00:00:00");
      if (isNaN(a.getTime()) || isNaN(b.getTime())) return err("Invalid date.");
      if (a > b) [a, b] = [b, a];
      let count = 0;
      const cur = new Date(a);
      while (cur <= b) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) count++;
        cur.setDate(cur.getDate() + 1);
      }
      return ok([
        { label: "Business days (inclusive)", value: String(count), emphasize: true },
        { label: "Note", value: "Weekends excluded; public holidays not considered." },
      ]);
    },
  },
  {
    slug: "unix-timestamp",
    category: "date-time",
    name: "Unix Timestamp Converter",
    description: "Convert between Unix epoch seconds and a human-readable date.",
    keywords: ["unix", "epoch", "timestamp"],
    kind: "form",
    fields: [
      {
        id: "mode",
        label: "Mode",
        type: "select",
        defaultValue: "toDate",
        options: [
          { value: "toDate", label: "Timestamp → Date" },
          { value: "toTs", label: "Date → Timestamp" },
        ],
      },
      { id: "timestamp", label: "Unix timestamp (seconds)", type: "number", defaultValue: 1788883200 },
      { id: "date", label: "Date (YYYY-MM-DD)", type: "date", defaultValue: "2026-09-09" },
    ],
    related: ["date-difference"],
    compute: (v) => {
      if (v.mode === "toTs") {
        if (!v.date) return err("Enter a date.");
        const d = new Date(v.date + "T00:00:00Z");
        if (isNaN(d.getTime())) return err("Invalid date.");
        return ok([
          { label: "Unix timestamp (UTC midnight)", value: String(Math.floor(d.getTime() / 1000)), emphasize: true },
        ]);
      }
      const ts = Number(v.timestamp);
      if (!Number.isFinite(ts)) return err("Enter a timestamp.");
      const d = new Date(ts * 1000);
      return ok([
        { label: "UTC date", value: d.toISOString(), emphasize: true },
        { label: "Local string", value: d.toString() },
      ]);
    },
  },
];
