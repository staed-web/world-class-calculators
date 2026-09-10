"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  favoritesChangedEvent,
  readFavorites,
  type FavoriteCalculatorRef,
} from "@/lib/favorites";

export function FavoriteCalculators({
  className = "",
}: {
  className?: string;
}) {
  const [items, setItems] = useState<FavoriteCalculatorRef[]>([]);

  useEffect(() => {
    function sync() {
      setItems(readFavorites());
    }
    sync();
    const ev = favoritesChangedEvent();
    window.addEventListener(ev, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ev, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className={className} aria-label="Favorite calculators">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Your favorites
          </h2>
          <p className="text-sm text-muted mt-0.5">
            Star tools while you work — they stay on this device only.
          </p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:overflow-visible">
        {items.map((r) => (
          <Link
            key={r.slug}
            href={r.href}
            className="shrink-0 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-2 text-sm font-medium text-amber-950 hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100 transition"
          >
            <span aria-hidden>★</span>
            {r.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
