import type { CalculatorMeta, FieldOption } from "../types";
import {
  LENGTH, WEIGHT, AREA, VOLUME, SPEED, DATA, TIME,
  convertLength, convertWeight, convertArea, convertVolume,
  convertSpeed, convertData, convertTime, convertTemp,
} from "../formulas/conversion";
import { parseNum, fmtNumber, err, ok } from "./helpers";

function opts(map: Record<string, number>, labels?: Record<string, string>): FieldOption[] {
  return Object.keys(map).map((k) => ({ value: k, label: labels?.[k] ?? k }));
}

function unitConverter(
  slug: string,
  name: string,
  description: string,
  keywords: string[],
  map: Record<string, number>,
  convert: (v: number, f: string, t: string) => number,
  fromDef: string,
  toDef: string,
  labels?: Record<string, string>
): CalculatorMeta {
  return {
    slug,
    category: "conversion",
    name,
    description,
    keywords,
    kind: "form",
    popular: ["length", "weight", "temperature"].includes(slug),
    fields: [
      { id: "value", label: "Value", type: "number", defaultValue: 1 },
      { id: "from", label: "From", type: "select", defaultValue: fromDef, options: opts(map, labels) },
      { id: "to", label: "To", type: "select", defaultValue: toDef, options: opts(map, labels) },
    ],
    related: ["length", "weight", "temperature"].filter((s) => s !== slug),
    compute: (v) => {
      const value = parseNum(v.value);
      if (!Number.isFinite(value)) return err("Enter a valid number.");
      const result = convert(value, v.from, v.to);
      if (!Number.isFinite(result)) return err("Unsupported unit.");
      return ok([
        { label: "Result", value: `${fmtNumber(result, 8)} ${v.to}`, emphasize: true },
      ]);
    },
  };
}

export const conversionCalculators: CalculatorMeta[] = [
  unitConverter("length", "Length Converter", "Convert between metric and imperial lengths.", ["length", "meters", "feet", "inches"], LENGTH, convertLength, "m", "ft"),
  unitConverter("weight", "Weight Converter", "Convert mass/weight units including kg, lb, and oz.", ["weight", "kg", "lb", "mass"], WEIGHT, convertWeight, "kg", "lb"),
  {
    slug: "temperature",
    category: "conversion",
    name: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, and Kelvin.",
    keywords: ["temperature", "celsius", "fahrenheit", "kelvin"],
    popular: true,
    featured: true,
    kind: "form",
    fields: [
      { id: "value", label: "Value", type: "number", defaultValue: 25 },
      {
        id: "from",
        label: "From",
        type: "select",
        defaultValue: "C",
        options: [
          { value: "C", label: "Celsius (°C)" },
          { value: "F", label: "Fahrenheit (°F)" },
          { value: "K", label: "Kelvin (K)" },
        ],
      },
      {
        id: "to",
        label: "To",
        type: "select",
        defaultValue: "F",
        options: [
          { value: "C", label: "Celsius (°C)" },
          { value: "F", label: "Fahrenheit (°F)" },
          { value: "K", label: "Kelvin (K)" },
        ],
      },
    ],
    related: ["length", "weight"],
    compute: (v) => {
      const value = parseNum(v.value);
      if (!Number.isFinite(value)) return err("Enter a valid number.");
      const result = convertTemp(value, v.from, v.to);
      return ok([{ label: "Result", value: `${fmtNumber(result, 4)} °${v.to === "K" ? "K" : v.to}`, emphasize: true }]);
    },
  },
  unitConverter("area", "Area Converter", "Convert area units such as m², acres, and ft².", ["area", "acre", "square meters"], AREA, convertArea, "m2", "ft2", { m2: "m²", km2: "km²", cm2: "cm²", ft2: "ft²", in2: "in²", ha: "hectare", acre: "acre" }),
  unitConverter("volume", "Volume Converter", "Convert liters, gallons, cups, and more.", ["volume", "liters", "gallons", "cups"], VOLUME, convertVolume, "l", "gal_us", { l: "liter", ml: "milliliter", m3: "m³", gal_us: "US gallon", qt_us: "US quart", cup_us: "US cup", floz_us: "US fl oz", tbsp: "tbsp", tsp: "tsp" }),
  unitConverter("speed", "Speed Converter", "Convert between m/s, km/h, mph, and knots.", ["speed", "mph", "kph", "knots"], SPEED, convertSpeed, "kph", "mph", { mps: "m/s", kph: "km/h", mph: "mph", knot: "knot", fps: "ft/s" }),
  unitConverter("data-storage", "Data Storage Converter", "Convert bytes, KB, MB, GB, TB (binary powers of 1024).", ["data", "storage", "gb", "mb", "bytes"], DATA, convertData, "GB", "MB"),
  unitConverter("time", "Time Unit Converter", "Convert seconds, minutes, hours, days, and weeks.", ["time", "hours", "minutes", "days"], TIME, convertTime, "h", "min", { s: "seconds", ms: "milliseconds", min: "minutes", h: "hours", d: "days", wk: "weeks" }),
  {
    slug: "fuel-economy",
    category: "conversion",
    name: "Fuel Economy Converter",
    description: "Convert between MPG (US) and L/100km.",
    keywords: ["mpg", "fuel economy", "l/100km"],
    kind: "form",
    fields: [
      { id: "value", label: "Value", type: "number", defaultValue: 30 },
      {
        id: "from",
        label: "From",
        type: "select",
        defaultValue: "mpg",
        options: [
          { value: "mpg", label: "MPG (US)" },
          { value: "l100", label: "L/100km" },
        ],
      },
    ],
    related: ["fuel-cost", "speed"],
    compute: (v) => {
      const value = parseNum(v.value);
      if (!Number.isFinite(value) || value <= 0) return err("Enter a positive value.");
      if (v.from === "mpg") {
        const l100 = 235.214583 / value;
        return ok([
          { label: "L/100km", value: fmtNumber(l100, 3), emphasize: true },
          { label: "MPG (US)", value: fmtNumber(value, 3) },
        ]);
      }
      const mpg = 235.214583 / value;
      return ok([
        { label: "MPG (US)", value: fmtNumber(mpg, 3), emphasize: true },
        { label: "L/100km", value: fmtNumber(value, 3) },
      ]);
    },
  },
];
