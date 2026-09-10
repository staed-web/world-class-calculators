import type { CalculatorMeta } from "../types";
import { ageFromDob } from "../formulas/math";
import { err, ok, fmtDate, fmtNumber, requireNums } from "./helpers";

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
      if (isNaN(d.getTime())) return err("Invalid input.");
      const parsed = requireNums(v, ["days"]);
      if (!parsed.ok) return err(parsed.error);
      d.setDate(d.getDate() + parsed.n.days);
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
      {
        id: "timestamp",
        label: "Unix timestamp (seconds)",
        type: "number",
        defaultValue: 1788883200,
        visibleWhen: { field: "mode", in: ["toDate"] },
      },
      {
        id: "date",
        label: "Date (YYYY-MM-DD)",
        type: "date",
        defaultValue: "2026-09-09",
        visibleWhen: { field: "mode", in: ["toTs"] },
      },
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
      const parsed = requireNums(v, ["timestamp"]);
      if (!parsed.ok) return err(parsed.error);
      const d = new Date(parsed.n.timestamp * 1000);
      return ok([
        { label: "UTC date", value: d.toISOString(), emphasize: true },
        { label: "Local string", value: d.toString() },
      ]);
    },
  },
  {
    slug: "hours-minutes-add",
    category: "date-time",
    name: "Add Hours & Minutes",
    description: "Add a duration of hours and minutes to a starting clock time (24h).",
    keywords: ["add time", "hours minutes", "clock math"],
    kind: "form",
    fields: [
      { id: "startH", label: "Start hour (0–23)", type: "number", defaultValue: 9, min: 0, max: 23 },
      { id: "startM", label: "Start minute", type: "number", defaultValue: 30, min: 0, max: 59 },
      { id: "addH", label: "Hours to add", type: "number", defaultValue: 2 },
      { id: "addM", label: "Minutes to add", type: "number", defaultValue: 45 },
    ],
    related: ["date-difference", "timezone-difference"],
    compute: (v) => {
      const parsed = requireNums(v, ["startH", "startM", "addH", "addM"]);
      if (!parsed.ok) return err(parsed.error);
      const sh = parsed.n.startH;
      const sm = parsed.n.startM;
      const ah = parsed.n.addH;
      const am = parsed.n.addM;
      let total = sh * 60 + sm + ah * 60 + am;
      const days = Math.floor(total / (24 * 60));
      total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
      const h = Math.floor(total / 60);
      const m = total % 60;
      return ok([
        {
          label: "Result time",
          value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
          emphasize: true,
        },
        { label: "Day offset", value: String(days) },
      ]);
    },
  },
  {
    slug: "week-number",
    category: "date-time",
    name: "ISO Week Number",
    description: "Find the ISO-8601 week number for a given date.",
    keywords: ["week number", "iso week", "calendar week"],
    kind: "form",
    fields: [
      { id: "date", label: "Date", type: "date", defaultValue: "2026-09-09" },
    ],
    related: ["date-difference", "business-days"],
    compute: (v) => {
      if (!v.date) return err("Enter a date.");
      const d = new Date(v.date + "T00:00:00Z");
      if (isNaN(d.getTime())) return err("Invalid date.");
      const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
      const dayNum = target.getUTCDay() || 7;
      target.setUTCDate(target.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
      const week = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      return ok([
        { label: "ISO week", value: String(week), emphasize: true },
        { label: "ISO week-year", value: String(target.getUTCFullYear()) },
      ]);
    },
  },
];
