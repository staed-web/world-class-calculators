"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

type Props = {
  /** Compact row for the mobile drawer */
  variant?: "banner" | "menu";
  onNavigated?: () => void;
};

export function InstallApp({ variant = "banner", onNavigated }: Props) {
  const {
    canOffer,
    menuOffer,
    canNativePrompt,
    showIosTip,
    promptInstall,
    dismiss,
  } = useInstallPrompt();
  const [iosOpen, setIosOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Soft delay so the install sheet never feels spammy on first paint
  useEffect(() => {
    if (variant !== "banner" || !canOffer) {
      setBannerVisible(false);
      return;
    }
    const t = window.setTimeout(() => setBannerVisible(true), 4200);
    return () => window.clearTimeout(t);
  }, [variant, canOffer]);

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

  if (!canOffer || !mounted || !bannerVisible) return null;

  const portalTarget =
    typeof document !== "undefined"
      ? document.getElementById("app-portal") ?? document.body
      : null;
  if (!portalTarget) return null;

  return createPortal(
    <>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[99990] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
        role="region"
        aria-label="Install MyCalcsWorld"
      >
        <div
          className="pointer-events-auto w-full max-w-md overflow-hidden rounded-xl border border-border shadow-[var(--shadow)]"
          style={{
            background: "var(--card)",
          }}
        >
          <div className="flex gap-3 p-3.5 sm:p-4">
            <Image
              src="/icons/icon-192.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full shadow-sm ring-1 ring-[color-mix(in_oklab,var(--gold)_40%,transparent)]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                Install MyCalcsWorld
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                Keep every calculator one tap away — works like a native app on
                your home screen.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="btn-primary inline-flex min-h-10 items-center justify-center px-3.5 text-xs shadow-sm"
                  onClick={async () => {
                    if (canNativePrompt) {
                      await promptInstall();
                      return;
                    }
                    setIosOpen(true);
                  }}
                >
                  {showIosTip && !canNativePrompt ? "How to install" : "Install"}
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl px-3 text-xs font-medium text-muted hover:text-foreground"
                  onClick={dismiss}
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-border/60 hover:text-foreground"
              aria-label="Dismiss install prompt"
              onClick={dismiss}
            >
              ✕
            </button>
          </div>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
