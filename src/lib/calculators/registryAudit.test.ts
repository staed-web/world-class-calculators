import { describe, expect, it } from "vitest";
import { allCalculators } from "./registry";

function defaultsFor(calc: (typeof allCalculators)[0]): Record<string, string> {
  const v: Record<string, string> = {};
  for (const f of calc.fields ?? []) {
    v[f.id] =
      f.defaultValue !== undefined && f.defaultValue !== null
        ? String(f.defaultValue)
        : "";
  }
  return v;
}

function visibleIds(
  calc: (typeof allCalculators)[0],
  values: Record<string, string>
): Set<string> {
  const ids = new Set<string>();
  for (const f of calc.fields ?? []) {
    if (f.visibleWhen) {
      const dep = values[f.visibleWhen.field] ?? "";
      if (!f.visibleWhen.in.includes(dep)) continue;
    }
    ids.add(f.id);
  }
  return ids;
}

describe("registry logic audit (288)", () => {
  it("registry has 288 calculators", () => {
    expect(allCalculators.length).toBe(288);
  });

  it("default values compute without error for form calcs (except intentional empty text tools)", () => {
    const allowError = new Set(["password-strength"]);
    const failures: string[] = [];
    for (const calc of allCalculators) {
      if (calc.kind !== "form" || !calc.compute || !calc.fields?.length) continue;
      if (allowError.has(calc.slug)) continue;
      const out = calc.compute(defaultsFor(calc));
      if (out && typeof out === "object" && "error" in out) {
        failures.push(`${calc.slug}: ${out.error}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("emptying hidden visibleWhen number fields still works", () => {
    const failures: string[] = [];
    for (const calc of allCalculators) {
      if (
        calc.kind !== "form" ||
        !calc.compute ||
        !calc.fields?.some((f) => f.visibleWhen)
      ) {
        continue;
      }
      const values = defaultsFor(calc);
      const visible = visibleIds(calc, values);
      for (const f of calc.fields!) {
        if (!visible.has(f.id) && f.type === "number") values[f.id] = "";
      }
      const out = calc.compute(values);
      if (out && typeof out === "object" && "error" in out) {
        failures.push(`${calc.slug}: ${out.error}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("default-0 / optional number fields tolerate blank as zero when peers filled", () => {
    const failures: string[] = [];
    for (const calc of allCalculators) {
      if (calc.kind !== "form" || !calc.compute || !calc.fields?.length) continue;
      const optionalish = calc.fields.filter(
        (f) =>
          f.type === "number" &&
          (/\boptional\b/i.test(f.label) ||
            f.defaultValue === 0 ||
            f.defaultValue === "0")
      );
      if (!optionalish.length) continue;
      const values = defaultsFor(calc);
      for (const f of optionalish) values[f.id] = "";
      const out = calc.compute(values);
      if (!(out && typeof out === "object" && "error" in out)) continue;
      const msg = String(out.error).toLowerCase();
      for (const f of optionalish) {
        const label = f.label.toLowerCase();
        const idWords = f.id.replace(/-/g, " ");
        if (msg.includes(f.id) || msg.includes(label) || msg.includes(idWords)) {
          // ohms-triangle intentionally needs any two — skip soft empty-all case
          if (calc.slug === "ohms-triangle") continue;
          failures.push(`${calc.slug}:${f.id} → ${out.error}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it("daily-compound marks advanced options and hides deposit until needed", () => {
    const calc = allCalculators.find((c) => c.slug === "daily-compound-interest");
    expect(calc).toBeTruthy();
    const byId = Object.fromEntries((calc!.fields ?? []).map((f) => [f.id, f]));
    expect(byId.reinvest?.advanced).toBe(true);
    expect(byId.depositFreq?.advanced).toBe(true);
    expect(byId.deposit?.advanced).toBe(true);
    expect(byId.excludeWeekends?.advanced).toBe(true);
    expect(byId.deposit?.visibleWhen).toEqual({
      field: "depositFreq",
      in: ["daily", "monthly"],
    });
    expect(byId.principal?.advanced).toBeFalsy();
    expect(byId.rate?.advanced).toBeFalsy();
  });
});
