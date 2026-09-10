import { describe, expect, it } from "vitest";
import { getCalculatorBySlug } from "./registry";

function run(slug: string, values: Record<string, string>) {
  const calc = getCalculatorBySlug(slug);
  expect(calc?.compute).toBeTypeOf("function");
  return calc!.compute!(values);
}

describe("pythagoras mode-aware compute", () => {
  it("finds hypotenuse from a and b without requiring c", () => {
    const out = run("pythagoras", { mode: "hyp", a: "3", b: "4", c: "" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    const hyp = items.find((i) => i.label === "Hypotenuse c");
    expect(hyp?.value).toMatch(/^5(\.0+)?$/);
  });

  it("finds leg a from b and c without requiring a", () => {
    const out = run("pythagoras", { mode: "leg-a", a: "", b: "4", c: "5" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Leg a")?.value).toMatch(/^3(\.0+)?$/);
  });

  it("finds leg b from a and c without requiring b", () => {
    const out = run("pythagoras", { mode: "leg-b", a: "3", b: "", c: "5" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Leg b")?.value).toMatch(/^4(\.0+)?$/);
  });

  it("supports legacy leg mode as find leg a", () => {
    const out = run("pythagoras", { mode: "leg", a: "", b: "4", c: "5" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Leg a")?.value).toMatch(/^3(\.0+)?$/);
  });

  it("computes 3d diagonal from a, b, c", () => {
    const out = run("pythagoras", { mode: "3d", a: "1", b: "2", c: "2" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    const d = Number(items.find((i) => i.label === "Space diagonal")?.value);
    expect(d).toBeCloseTo(Math.sqrt(9), 5);
  });

  it("errors when hyp mode missing a leg", () => {
    const out = run("pythagoras", { mode: "hyp", a: "3", b: "", c: "" });
    expect(out).toHaveProperty("error");
  });

  it("hides unused fields via visibleWhen", () => {
    const calc = getCalculatorBySlug("pythagoras");
    const a = calc!.fields!.find((f) => f.id === "a")!;
    const b = calc!.fields!.find((f) => f.id === "b")!;
    const c = calc!.fields!.find((f) => f.id === "c")!;
    expect(a.visibleWhen?.in).toEqual(expect.arrayContaining(["hyp", "leg-b", "3d"]));
    expect(b.visibleWhen?.in).toEqual(expect.arrayContaining(["hyp", "leg-a", "3d"]));
    expect(c.visibleWhen?.in).toEqual(expect.arrayContaining(["leg-a", "leg-b", "3d"]));
    expect(c.defaultValue).toBeUndefined();
  });
});

describe("fraction simplify does not require second fraction", () => {
  it("simplifies with only n1/d1", () => {
    const out = run("fraction", {
      op: "simplify",
      n1: "2",
      d1: "4",
      n2: "",
      d2: "",
    });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Simplified")?.value).toBe("1/2");
  });
});

describe("ohms-law mode-aware fields", () => {
  it("solves voltage from I and R without V", () => {
    const out = run("ohms-law", { solve: "V", V: "", I: "2", R: "6" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items[0].value).toContain("12");
  });
});

describe("speed-distance-time mode-aware", () => {
  it("solves speed without requiring speed input", () => {
    const out = run("speed-distance-time", {
      solve: "speed",
      speed: "",
      distance: "120",
      time: "2",
      unitNote: "kmh",
    });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Speed")?.value).toMatch(/^60(\.0+)?$/);
  });
});

describe("optional fields do not requireNums", () => {
  it("sales-commission allows empty base", () => {
    const out = run("sales-commission", { sales: "50000", rate: "8", base: "" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Commission")?.value).toMatch(/4,000/);
  });

  it("vector-magnitude allows empty z as 0", () => {
    const out = run("vector-magnitude", { x: "3", y: "4", z: "" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Magnitude")?.value).toMatch(/^5(\.0+)?$/);
  });

  it("markup-from-margin works without cost", () => {
    const out = run("markup-from-margin", { margin: "40", cost: "" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Required markup")?.value).toBeTruthy();
    expect(items.find((i) => i.label === "Selling price")).toBeUndefined();
  });

  it("discount-stack-extra allows empty third discount", () => {
    const out = run("discount-stack-extra", { price: "100", d1: "20", d2: "10", d3: "" });
    expect(out).not.toHaveProperty("error");
  });
});

describe("hourly-to-salary mode-aware", () => {
  it("hourly mode does not require yearly", () => {
    const out = run("hourly-to-salary", {
      mode: "hourly",
      hourly: "35",
      yearly: "",
      hoursPerWeek: "40",
      weeksPerYear: "52",
    });
    expect(out).not.toHaveProperty("error");
  });

  it("salary mode does not require hourly", () => {
    const out = run("hourly-to-salary", {
      mode: "salary",
      hourly: "",
      yearly: "72800",
      hoursPerWeek: "40",
      weeksPerYear: "52",
    });
    expect(out).not.toHaveProperty("error");
  });

  it("hides unused wage field via visibleWhen", () => {
    const calc = getCalculatorBySlug("hourly-to-salary");
    expect(calc!.fields!.find((f) => f.id === "hourly")?.visibleWhen?.in).toEqual(["hourly"]);
    expect(calc!.fields!.find((f) => f.id === "yearly")?.visibleWhen?.in).toEqual(["salary"]);
  });
});

describe("unix-timestamp mode-aware", () => {
  it("toDate does not require date field", () => {
    const out = run("unix-timestamp", { mode: "toDate", timestamp: "0", date: "" });
    expect(out).not.toHaveProperty("error");
  });

  it("toTs does not require timestamp", () => {
    const out = run("unix-timestamp", { mode: "toTs", timestamp: "", date: "2026-09-09" });
    expect(out).not.toHaveProperty("error");
  });

  it("empty timestamp errors instead of epoch zero", () => {
    const out = run("unix-timestamp", { mode: "toDate", timestamp: "", date: "" });
    expect(out).toHaveProperty("error");
  });
});

describe("empty required numbers are rejected", () => {
  it("hours-minutes-add rejects empty start hour", () => {
    const out = run("hours-minutes-add", { startH: "", startM: "30", addH: "2", addM: "0" });
    expect(out).toHaveProperty("error");
  });

  it("add-subtract-days rejects empty days", () => {
    const out = run("add-subtract-days", { date: "2026-09-09", days: "" });
    expect(out).toHaveProperty("error");
  });

  it("percentile rejects empty score", () => {
    const out = run("percentile", { score: "", nums: "1,2,3" });
    expect(out).toHaveProperty("error");
  });

  it("study-time rejects empty hours", () => {
    const out = run("study-time", { hours: "", weights: "40,60" });
    expect(out).toHaveProperty("error");
  });
});

describe("emptyAsZero optional numeric fields", () => {
  it("daily-compound empty optional horizon fields", () => {
    const out = run("daily-compound-interest", {
      principal: "1000",
      rateMode: "daily",
      rate: "0.4",
      years: "1",
      months: "",
      days: "",
      reinvest: "",
      depositFreq: "none",
      deposit: "",
      excludeWeekends: "no",
    });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(items.find((i) => i.label === "Future value")?.value).toBeTruthy();
  });

  it("discount-stack allows empty third discount", () => {
    const out = run("discount-stack", { price: "200", d1: "20", d2: "10", d3: "" });
    expect(out).not.toHaveProperty("error");
  });

  it("pace allows empty extra seconds", () => {
    const out = run("pace", { distance: "5", unit: "km", minutes: "28", seconds: "" });
    expect(out).not.toHaveProperty("error");
  });

  it("distance-formula allows empty origin coordinates as zero", () => {
    const out = run("distance-formula", { x1: "", y1: "", x2: "3", y2: "4" });
    expect(out).not.toHaveProperty("error");
    const items = out as { label: string; value: string }[];
    expect(Number(items.find((i) => i.label === "Distance")?.value)).toBeCloseTo(5, 5);
  });
});
