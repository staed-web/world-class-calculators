"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

type Props = {
  /** Compact row for the mobile drawer */
  variant?: "banner" | "menu";
  onNavigated?: () => void;
};

/** Routes where a floating bar would cover primary calculator UI. */
function blocksPrimaryUi(pathname: string | null) {
  if (!pathname) return false;
  return pathname.startsWith("/calculators/");
}

export function InstallApp({ variant = "banner", onNavigated }: Props) {
  const {
    canOffer,
    menuOffer,
    canNativePrompt,
    showIosTip,
    promptInstall,
    dismiss,
  } = useInstallPrompt();
  const pathname = usePathname();
  const [iosOpen, setIosOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Delayed, dismissible subtle bar — never on calculator pages (menu covers install there).
  useEffect(() => {
    if (variant !== "banner" || !canOffer || blocksPrimaryUi(pathname)) {
      setBannerVisible(false);
      return;
    }
    const t = window.setTimeout(() => setBannerVisible(true), 7500);
    return () => window.clearTimeout(t);
  }, [variant, canOffer, pathname]);

  if (variant === "menu") {
    if (!menuOffer) return null;
    return (
      <>
        <button
          type="button"
          className="flex w-full min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-foreground hover:bg-brand-soft/50"
          onClick={async () => {
            if (canNativePrompt) {
              await promptInstall();
              onNavigated?.();
              return;
            }
            if (showIosTip) setIosOpen(true);
          }}
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand ring-1 ring-[color-mix(in_oklab,var(--brand)_25%,transparent)]"
            aria-hidden
          >
            <InstallGlyph />
          </span>
          <span className="flex flex-col">
            <span>Install app</span>
            <span className="text-xs font-normal text-muted">
              Home screen · faster access
            </span>
          </span>
        </button>
        {iosOpen ? (
          <IosTipSheet
            onClose={() => {
              setIosOpen(false);
              onNavigated?.();
            }}
            onDismiss={() => {
              dismiss();
              setIosOpen(false);
              onNavigated?.();
            }}
          />
        ) : null}
      </>
    );
  }

  if (!canOffer || !mounted || !bannerVisible || blocksPrimaryUi(pathname)) {
    return null;
  }

  const portalTarget =
    typeof document !== "undefined"
      ? document.getElementById("app-portal") ?? document.body
      : null;
  if (!portalTarget) return null;

  return createPortal(
    <>
      {/* Slim dismissible strip — does not cover hero CTAs or calculator controls */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[99990] flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4"
        role="region"
        aria-label="Install MyCalcsWorld"
      >
        <div
          className="pointer-events-auto flex w-full max-w-lg items-center gap-2 rounded-full border border-border px-2.5 py-1.5 shadow-[var(--shadow)] sm:gap-3 sm:px-3"
          style={{
            background: "color-mix(in oklab, var(--card) 94%, transparent)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
            aria-hidden
          >
            <InstallGlyph />
          </span>
          <p className="min-w-0 flex-1 truncate text-xs font-medium text-foreground sm:text-sm">
            Install MyCalcsWorld
            <span className="hidden text-muted font-normal sm:inline">
              {" "}
              · home screen
            </span>
          </p>
          <button
            type="button"
            className="inline-flex min-h-8 shrink-0 items-center justify-center rounded-full bg-brand px-3 text-[11px] font-semibold text-white sm:text-xs"
            onClick={async () => {
              if (canNativePrompt) {
                await promptInstall();
                return;
              }
              setIosOpen(true);
            }}
          >
            {showIosTip && !canNativePrompt ? "How" : "Install"}
          </button>
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-border/60 hover:text-foreground"
            aria-label="Dismiss install prompt"
            onClick={dismiss}
          >
            ✕
          </button>
        </div>
      </div>
      {iosOpen ? (
        <IosTipSheet
          onClose={() => setIosOpen(false)}
          onDismiss={() => {
            dismiss();
            setIosOpen(false);
          }}
        />
      ) : null}
    </>,
    portalTarget,
  );
}

function InstallGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v10m0 0l3.5-3.5M12 13L8.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 16.5V18a2 2 0 002 2h10a2 2 0 002-2v-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IosTipSheet({
  onClose,
  onDismiss,
}: {
  onClose: () => void;
  onDismiss: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const target = document.getElementById("app-portal") ?? document.body;

  return createPortal(
    <div
      className="fixed inset-0 z-[100000] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Add to Home Screen"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 m-3 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card p-5 shadow-2xl pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          iPhone & iPad
        </p>
        <h2 className="mt-1 font-serif text-lg font-semibold text-foreground">
          Add to Home Screen
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-foreground/90">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
              1
            </span>
            <span>
              Tap <strong>Share</strong> in Safari’s toolbar
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
              2
            </span>
            <span>
              Choose <strong>Add to Home Screen</strong>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
              3
            </span>
            <span>Confirm — MyCalcs opens full-screen like an app</span>
          </li>
        </ol>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="btn-primary inline-flex min-h-11 flex-1 items-center justify-center text-sm"
            onClick={onClose}
          >
            Got it
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-medium text-muted"
            onClick={onDismiss}
          >
            Don’t show
          </button>
        </div>
      </div>
    </div>,
    target,
  );
}
