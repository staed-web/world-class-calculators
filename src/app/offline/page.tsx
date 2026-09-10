import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <div
          className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand) 35%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={88}
          height={88}
          className="relative h-20 w-20 rounded-2xl shadow-lg ring-1 ring-teal-500/25"
          priority
        />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        Offline
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        You’re offline
      </h1>
      <p className="mt-3 max-w-md text-muted leading-relaxed">
        MyCalcsWorld needs a connection for live rates and fresh pages. Local
        calculators you already opened may still work — try again when you’re
        back online.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-teal-900/20 transition hover:opacity-95"
        >
          Try again
        </a>
        <Link
          href="/calculators/math/scientific"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          Open scientific
        </Link>
      </div>
    </div>
  );
}
