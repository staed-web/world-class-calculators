"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { BrandWordmark } from "@/components/BrandWordmark";
import { categories } from "@/lib/categories";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencyPicker } from "./CurrencyPicker";
import { CONTACT_EMAIL, contactMailto } from "@/lib/site";
import { InstallApp } from "./InstallApp";

const mobileQuick = [
  { href: "/calculators/finance/loan-emi", label: "EMI" },
  { href: "/calculators/finance/sip", label: "SIP" },
  { href: "/calculators/finance/currency-converter", label: "FX" },
  { href: "/calculators/finance/daily-compound-interest", label: "Daily compound" },
  { href: "/calculators/health-fitness/bmi", label: "BMI" },
  { href: "/calculators/math/scientific", label: "Scientific" },
  { href: "/calculators/math/3d-function", label: "3D" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.classList.add("nav-drawer-open");
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      html.classList.remove("nav-drawer-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const portalTarget =
    mounted && typeof document !== "undefined"
      ? document.getElementById("app-portal") ?? document.body
      : null;

  const drawer =
    open && portalTarget
      ? createPortal(
          <div
            id="mobile-nav-drawer"
            className="lg:hidden fixed inset-0 z-[99999] h-dvh min-h-dvh w-screen"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              width: "100vw",
              height: "100dvh",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              style={{ position: "absolute", inset: 0 }}
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <div
              className="absolute right-0 top-0 flex h-dvh min-h-dvh w-[min(100%,20rem)] flex-col bg-card text-foreground shadow-2xl border-l border-border pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100dvh",
                backgroundColor: "var(--card)",
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
                <p className="font-semibold text-foreground">Menu</p>
                <button
                  type="button"
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-border bg-card"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-2">
                    Quick tools
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {mobileQuick.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-2 text-sm font-medium hover:border-brand hover:text-brand"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-2">
                    Categories
                  </p>
                  <ul className="space-y-1">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/categories/${c.slug}`}
                          className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground hover:bg-brand-soft/50"
                          onClick={() => setOpen(false)}
                        >
                          <span aria-hidden>{c.icon}</span>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1 border-t border-border pt-4">
                  <InstallApp variant="menu" onNavigated={() => setOpen(false)} />
                  <Link
                    href="/about"
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium hover:bg-brand-soft/50"
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium hover:bg-brand-soft/50"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                  <a
                    href={contactMailto()}
                    className="flex min-h-11 flex-col justify-center rounded-xl px-3 py-2 text-sm font-medium text-brand"
                  >
                    <span>Email us</span>
                    <span className="text-xs font-normal text-muted break-all">{CONTACT_EMAIL}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          portalTarget,
        )
      : null;

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]"
      style={{ background: "var(--header)" }}
    >
      {/* Compact top bar — always */}
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3 font-bold text-base sm:text-lg tracking-tight min-h-10"
          aria-label="MyCalcsWorld home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-cover shadow-sm ring-1 ring-[#07234a]/15 transition group-hover:scale-105"
            priority
          />
          <BrandWordmark
            className="hidden min-[360px]:inline-flex"
            size="sm"
          />
        </Link>

        <div className="hidden flex-1 md:block max-w-md ml-auto">
          <SearchBar showShortcut />
        </div>

        <nav
          className="hidden lg:flex items-center gap-3 text-sm font-medium text-muted"
          aria-label="Primary"
        >
          <Link href="/#categories" className="hover:text-brand transition min-h-10 inline-flex items-center">
            Categories
          </Link>
          <Link
            href="/calculators/finance/currency-converter"
            className="hover:text-brand transition min-h-10 inline-flex items-center"
          >
            FX
          </Link>
          <Link
            href="/calculators/math/3d-function"
            className="hover:text-brand transition min-h-10 inline-flex items-center"
          >
            3D
          </Link>
          <Link href="/about" className="hover:text-brand transition min-h-10 inline-flex items-center">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand transition min-h-10 inline-flex items-center">
            Contact
          </Link>
        </nav>

        <CurrencyPicker compact className="shrink-0 ml-auto md:ml-0" />
        <ThemeToggle />

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop category strip — hidden when compact scroll on smaller desktops optional */}
      <div
        className={`hidden lg:block border-t border-border/70 overflow-x-auto overscroll-x-contain transition-[max-height,opacity] duration-200 ${
          compact ? "max-h-0 opacity-0 overflow-hidden border-0" : "max-h-14 opacity-100"
        }`}
        style={{ background: "color-mix(in oklab, var(--background) 70%, transparent)" }}
      >
        <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2 text-xs font-medium text-muted">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="whitespace-nowrap shrink-0 inline-flex min-h-9 items-center rounded-full px-3 py-1.5 transition hover:bg-card hover:text-brand"
            >
              <span aria-hidden className="mr-1">
                {c.icon}
              </span>
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile search — single slim row under top bar (not a third nav rail) */}
      <div className={`md:hidden border-t border-border/60 px-3 ${compact ? "py-1.5" : "py-2"}`}>
        <SearchBar />
      </div>

      {drawer}
    </header>
  );
}
