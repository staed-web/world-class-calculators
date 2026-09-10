export type FavoriteCalculatorRef = {
  slug: string;
  category: string;
  name: string;
  href: string;
  at: number;
};

const KEY = "mcw-favorite-calculators";
const MAX = 24;
const EVENT = "mcw-favorites-changed";

export function readFavorites(): FavoriteCalculatorRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteCalculatorRef[];
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

function writeFavorites(items: FavoriteCalculatorRef[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX)));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // quota / private mode
  }
}

export function isFavorite(slug: string): boolean {
  return readFavorites().some((x) => x.slug === slug);
}

export function toggleFavorite(
  entry: Omit<FavoriteCalculatorRef, "at">
): boolean {
  const prev = readFavorites();
  const exists = prev.some((x) => x.slug === entry.slug);
  if (exists) {
    writeFavorites(prev.filter((x) => x.slug !== entry.slug));
    return false;
  }
  writeFavorites([{ ...entry, at: Date.now() }, ...prev].slice(0, MAX));
  return true;
}

export function favoritesChangedEvent(): string {
  return EVENT;
}
