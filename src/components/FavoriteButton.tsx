"use client";

import { useEffect, useState } from "react";
import {
  favoritesChangedEvent,
  isFavorite,
  toggleFavorite,
} from "@/lib/favorites";

export function FavoriteButton({
  slug,
  category,
  name,
  href,
  className = "",
}: {
  slug: string;
  category: string;
  name: string;
  href: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync() {
      setOn(isFavorite(slug));
      setReady(true);
    }
    sync();
    const ev = favoritesChangedEvent();
    window.addEventListener(ev, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ev, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = toggleFavorite({ slug, category, name, href });
        setOn(next);
      }}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition ${
        on
          ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100"
          : "border-border bg-card text-muted hover:border-brand hover:text-brand"
      } ${className}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
      title={on ? "Saved on this device" : "Save to favorites on this device"}
    >
      <span aria-hidden>{on ? "★" : "☆"}</span>
      <span>{ready ? (on ? "Saved" : "Save") : "Save"}</span>
    </button>
  );
}
