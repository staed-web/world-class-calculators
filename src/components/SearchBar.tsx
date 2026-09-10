"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

export function SearchBar({
  initialQuery = "",
  size = "md",
  autofocus = false,
  showShortcut = false,
}: {
  initialQuery?: string;
  size?: "md" | "lg";
  autofocus?: boolean;
  showShortcut?: boolean;
}) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const pad = size === "lg" ? "px-5 py-3.5 text-base min-h-12" : "px-3 py-2.5 text-base sm:text-sm min-h-11";

  return (
    <form onSubmit={onSubmit} className="relative flex w-full gap-2" role="search">
      <label htmlFor={id} className="sr-only">
        Search calculators
      </label>
      <input
        id={id}
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search calculators (mortgage, BMI, tip…)"
        className={`flex-1 rounded-xl border border-border bg-card text-foreground shadow-sm placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${pad}`}
        autoFocus={autofocus}
      />
      {showShortcut && (
        <span className="pointer-events-none absolute right-[5.5rem] top-1/2 hidden -translate-y-1/2 items-center gap-1 sm:flex">
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
        </span>
      )}
      <button
        type="submit"
        className={`rounded-xl bg-brand font-semibold text-white hover:opacity-90 transition ${pad}`}
      >
        Search
      </button>
    </form>
  );
}
