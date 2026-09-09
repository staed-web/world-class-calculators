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

export function requireNums(
  values: Record<string, string>,
  keys: string[]
): NumsOk | NumsErr {
  const out: Record<string, number> = {};
  for (const k of keys) {
    const num = parseNum(values[k]);
    if (!Number.isFinite(num)) {
      return { ok: false, error: `Please enter a valid number for ${k}.` };
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
