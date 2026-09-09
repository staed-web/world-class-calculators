import type { CalculatorMeta } from "../types";
import { requireNums, fmtNumber, err, ok } from "./helpers";

export const scienceCalculators: CalculatorMeta[] = [
  {
    slug: "ohms-law",
    category: "science-engineering",
    name: "Ohm's Law Calculator",
    description: "Solve for voltage, current, or resistance (V = I × R).",
    keywords: ["ohm", "voltage", "current", "resistance"],
    featured: true,
    kind: "form",
    fields: [
      {
        id: "solve",
        label: "Solve for",
        type: "select",
        defaultValue: "V",
        options: [
          { value: "V", label: "Voltage (V)" },
          { value: "I", label: "Current (I)" },
          { value: "R", label: "Resistance (R)" },
        ],
      },
      { id: "V", label: "Voltage (V)", type: "number", defaultValue: 12 },
      { id: "I", label: "Current (A)", type: "number", defaultValue: 2 },
      { id: "R", label: "Resistance (Ω)", type: "number", defaultValue: 6 },
    ],
    related: ["power-electrical", "velocity"],
    compute: (v) => {
      if (v.solve === "V") {
        const parsed = requireNums(v, ["I", "R"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
        return ok([{ label: "Voltage", value: `${fmtNumber(n.I * n.R, 6)} V`, emphasize: true }]);
      }
      if (v.solve === "I") {
        const parsed = requireNums(v, ["V", "R"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
        if (n.R === 0) return err("Resistance cannot be zero.");
        return ok([{ label: "Current", value: `${fmtNumber(n.V / n.R, 6)} A`, emphasize: true }]);
      }
      const parsed = requireNums(v, ["V", "I"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.I === 0) return err("Current cannot be zero.");
      return ok([{ label: "Resistance", value: `${fmtNumber(n.V / n.I, 6)} Ω`, emphasize: true }]);
    },
  },
  {
    slug: "power-electrical",
    category: "science-engineering",
    name: "Electrical Power Calculator",
    description: "Compute power P = V × I (and related energy over time).",
    keywords: ["power", "watts", "electrical"],
    kind: "form",
    fields: [
      { id: "V", label: "Voltage (V)", type: "number", defaultValue: 120 },
      { id: "I", label: "Current (A)", type: "number", defaultValue: 5 },
      { id: "hours", label: "Hours of use", type: "number", defaultValue: 1 },
    ],
    related: ["ohms-law"],
    compute: (v) => {
      const parsed = requireNums(v, ["V", "I", "hours"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      const watts = n.V * n.I;
      const kwh = (watts * n.hours) / 1000;
      return ok([
        { label: "Power", value: `${fmtNumber(watts, 4)} W`, emphasize: true },
        { label: "Energy", value: `${fmtNumber(kwh, 4)} kWh` },
      ]);
    },
  },
  {
    slug: "velocity",
    category: "science-engineering",
    name: "Velocity Calculator",
    description: "Average velocity from distance and time (v = d / t).",
    keywords: ["velocity", "speed", "distance", "time"],
    kind: "form",
    fields: [
      { id: "distance", label: "Distance (m)", type: "number", defaultValue: 100 },
      { id: "time", label: "Time (s)", type: "number", defaultValue: 9.58 },
    ],
    related: ["speed", "ohms-law"],
    compute: (v) => {
      const parsed = requireNums(v, ["distance", "time"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.time === 0) return err("Time cannot be zero.");
      const vel = n.distance / n.time;
      return ok([
        { label: "Velocity", value: `${fmtNumber(vel, 4)} m/s`, emphasize: true },
        { label: "km/h", value: fmtNumber(vel * 3.6, 4) },
      ]);
    },
  },
  {
    slug: "density",
    category: "science-engineering",
    name: "Density Calculator",
    description: "Density = mass / volume.",
    keywords: ["density", "mass", "volume"],
    kind: "form",
    fields: [
      { id: "mass", label: "Mass (kg)", type: "number", defaultValue: 1 },
      { id: "volume", label: "Volume (m³)", type: "number", defaultValue: 0.001 },
    ],
    related: ["velocity"],
    compute: (v) => {
      const parsed = requireNums(v, ["mass", "volume"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.volume === 0) return err("Volume cannot be zero.");
      return ok([
        { label: "Density", value: `${fmtNumber(n.mass / n.volume, 6)} kg/m³`, emphasize: true },
        { label: "g/cm³", value: fmtNumber(n.mass / n.volume / 1000, 6) },
      ]);
    },
  },
  {
    slug: "acceleration",
    category: "science-engineering",
    name: "Acceleration Calculator",
    description: "Acceleration from change in velocity over time.",
    keywords: ["acceleration", "physics"],
    kind: "form",
    fields: [
      { id: "v0", label: "Initial velocity (m/s)", type: "number", defaultValue: 0 },
      { id: "v1", label: "Final velocity (m/s)", type: "number", defaultValue: 20 },
      { id: "t", label: "Time (s)", type: "number", defaultValue: 4 },
    ],
    related: ["velocity"],
    compute: (v) => {
      const parsed = requireNums(v, ["v0", "v1", "t"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      if (n.t === 0) return err("Time cannot be zero.");
      const a = (n.v1 - n.v0) / n.t;
      return ok([{ label: "Acceleration", value: `${fmtNumber(a, 6)} m/s²`, emphasize: true }]);
    },
  },
  {
    slug: "work-energy",
    category: "science-engineering",
    name: "Work & Kinetic Energy",
    description: "Work W = F × d and kinetic energy KE = ½mv².",
    keywords: ["work", "energy", "kinetic"],
    kind: "form",
    fields: [
      {
        id: "mode",
        label: "Calculate",
        type: "select",
        defaultValue: "work",
        options: [
          { value: "work", label: "Work (F × d)" },
          { value: "ke", label: "Kinetic energy (½mv²)" },
        ],
      },
      { id: "F", label: "Force (N)", type: "number", defaultValue: 50 },
      { id: "d", label: "Distance (m)", type: "number", defaultValue: 10 },
      { id: "m", label: "Mass (kg)", type: "number", defaultValue: 2 },
      { id: "v", label: "Velocity (m/s)", type: "number", defaultValue: 5 },
    ],
    related: ["velocity", "acceleration"],
    compute: (v) => {
      if (v.mode === "ke") {
        const parsed = requireNums(v, ["m", "v"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
        return ok([{ label: "Kinetic energy", value: `${fmtNumber(0.5 * n.m * n.v * n.v, 6)} J`, emphasize: true }]);
      }
      const parsed = requireNums(v, ["F", "d"]);
      if (!parsed.ok) return err(parsed.error);
      const n = parsed.n;
      return ok([{ label: "Work", value: `${fmtNumber(n.F * n.d, 6)} J`, emphasize: true }]);
    },
  },
];
