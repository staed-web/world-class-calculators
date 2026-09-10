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
