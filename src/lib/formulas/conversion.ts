type UnitMap = Record<string, number>;

function convert(value: number, from: string, to: string, map: UnitMap): number {
  const f = map[from];
  const t = map[to];
  if (f === undefined || t === undefined) return NaN;
  return (value * f) / t;
}

export const LENGTH: UnitMap = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
};

export const WEIGHT: UnitMap = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523125,
  t: 1000,
  st: 6.35029318,
};

export const AREA: UnitMap = {
  m2: 1,
  km2: 1e6,
  cm2: 1e-4,
  ha: 10000,
  acre: 4046.8564224,
  ft2: 0.09290304,
  in2: 0.00064516,
};

export const VOLUME: UnitMap = {
  l: 1,
  ml: 0.001,
  m3: 1000,
  gal_us: 3.785411784,
  qt_us: 0.946352946,
  cup_us: 0.2365882365,
  floz_us: 0.0295735295625,
  tbsp: 0.01478676478125,
  tsp: 0.00492892159375,
};

export const SPEED: UnitMap = {
  mps: 1,
  kph: 1 / 3.6,
  mph: 0.44704,
  knot: 0.514444,
  fps: 0.3048,
};

export const DATA: UnitMap = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
};

export const TIME: UnitMap = {
  s: 1,
  ms: 0.001,
  min: 60,
  h: 3600,
  d: 86400,
  wk: 604800,
};

export function convertLength(v: number, from: string, to: string) {
  return convert(v, from, to, LENGTH);
}
export function convertWeight(v: number, from: string, to: string) {
  return convert(v, from, to, WEIGHT);
}
export function convertArea(v: number, from: string, to: string) {
  return convert(v, from, to, AREA);
}
export function convertVolume(v: number, from: string, to: string) {
  return convert(v, from, to, VOLUME);
}
export function convertSpeed(v: number, from: string, to: string) {
  return convert(v, from, to, SPEED);
}
export function convertData(v: number, from: string, to: string) {
  return convert(v, from, to, DATA);
}
export function convertTime(v: number, from: string, to: string) {
  return convert(v, from, to, TIME);
}

export function convertTemp(v: number, from: string, to: string): number {
  let c = v;
  if (from === "F") c = ((v - 32) * 5) / 9;
  else if (from === "K") c = v - 273.15;
  else if (from !== "C") return NaN;
  if (to === "C") return c;
  if (to === "F") return (c * 9) / 5 + 32;
  if (to === "K") return c + 273.15;
  return NaN;
}
