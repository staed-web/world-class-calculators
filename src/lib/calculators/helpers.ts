import { parseNum, fmtMoney, fmtNumber, fmtPercent, fmtDate, round } from "../format";
import type { ResultItem } from "../types";

export { parseNum, fmtMoney, fmtNumber, fmtPercent, fmtDate, round };

export function ok(items: ResultItem[]): ResultItem[] {
  return items;
}

export function err(message: string): { error: string } {
  return { error: message };
}

export type NumsOk = { ok: true; n: Record<string, number> };
export type NumsErr = { ok: false; error: string };

export type RequireNumsOpts = {
  /** Keys that treat blank input as 0 (still error on non-numeric junk). */
  emptyAsZero?: readonly string[];
};

export function requireNums(
  values: Record<string, string>,
  keys: string[],
  opts?: RequireNumsOpts
): NumsOk | NumsErr {
  const emptyZero = new Set(opts?.emptyAsZero ?? []);
  const out: Record<string, number> = {};
  for (const k of keys) {
    const raw = values[k];
    const trimmed =
      raw === undefined || raw === null ? "" : String(raw).trim();
    if (trimmed === "" && emptyZero.has(k)) {
      out[k] = 0;
      continue;
    }
    const num = parseNum(raw);
    if (!Number.isFinite(num)) {
      const label = k.replace(/-/g, " ").replace(/_/g, " ");
      return {
        ok: false,
        error: `Enter a valid number for “${label}”. Clear the field if it should be empty, and avoid letters or symbols.`,
      };
    }
    out[k] = num;
  }
  return { ok: true, n: out };
}

export function parseList(raw: string): number[] {
  return raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

/** Parse a number only if the field is non-empty; empty → undefined (not an error). */
export function optionalNum(
  values: Record<string, string>,
  key: string
): number | undefined {
  const raw = values[key];
  if (raw === undefined || raw === null || String(raw).trim() === "") return undefined;
  const num = parseNum(raw);
  return Number.isFinite(num) ? num : undefined;
}
