export type RecentCalculatorRef = {
  slug: string;
  category: string;
  name: string;
  href: string;
  at: number;
};

const KEY = "mcw-recent-calculators";
const MAX = 8;

export function readRecentCalculators(): RecentCalculatorRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentCalculatorRef[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.slug === "string" &&
          typeof x.category === "string" &&
          typeof x.name === "string" &&
          typeof x.href === "string"
      )
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export function pushRecentCalculator(entry: Omit<RecentCalculatorRef, "at">) {
  if (typeof window === "undefined") return;
  try {
    const prev = readRecentCalculators().filter((x) => x.slug !== entry.slug);
    const next: RecentCalculatorRef[] = [
      { ...entry, at: Date.now() },
      ...prev,
    ].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // quota / private mode
  }
}
