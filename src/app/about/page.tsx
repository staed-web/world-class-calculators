import type { Metadata } from "next";
import Link from "next/link";
import { calculatorCount } from "@/lib/calculators/registry";

export const metadata: Metadata = {
  title: "About MyCalcsWorld",
  description:
    "About MyCalcsWorld — free browser-based calculators with an India-friendly finance wedge (EMI, SIP, GST, INR), honest scope, and client-side math.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">About MyCalcsWorld</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 10, 2026 (IST)</p>

      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          MyCalcsWorld is a free online hub of {calculatorCount}+ working calculators
          spanning finance, math, health & fitness, unit conversion, dates, everyday
          life, science & engineering, business, education, statistics, and commodities.
        </p>
        <p>
          We are a <strong className="text-foreground">growing suite</strong> — not a
          claim to match every niche tool on the internet. The goal is clear UX, honest
          formulas, charts where they help (mortgage amortization, SIP growth), and
          SEO-friendly explainers so pages are useful beyond a bare form.
        </p>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-foreground">India-friendly by design</h2>
      <p className="mt-2 text-muted leading-relaxed">
        Alongside global tools (mortgage, tip, BMI, scientific), we emphasize everyday
        Indian planning workflows: <strong className="text-foreground">EMI</strong>,{" "}
        <strong className="text-foreground">SIP</strong>,{" "}
        <strong className="text-foreground">GST</strong>, salary-after-tax sketches, gold
        value, and <strong className="text-foreground">INR</strong> via the live FX
        currency picker. US and global copy sits beside India how-tos on flagship pages.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Privacy & client-side math</h2>
      <p className="mt-2 text-muted leading-relaxed">
        Core calculator math runs in your browser. We do not require an account. Hosting
        logs and optional ads (Google AdSense when enabled) follow standard web practice —
        see{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          Privacy
        </Link>
        .
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Who operates this site</h2>
      <p className="mt-2 text-muted leading-relaxed">
        MyCalcsWorld is an independently operated calculator project published at{" "}
        <a href="https://mycalcsworld.online" className="text-brand hover:underline">
          mycalcsworld.online
        </a>
        . We do not pretend to be a bank, brokerage, clinic, or government portal. Results
        are educational estimates — not professional financial, tax, medical, or legal
        advice.
      </p>
      <p className="mt-2 text-muted leading-relaxed">
        Reach us at{" "}
        <a href="mailto:hello@mycalcsworld.online" className="text-brand hover:underline">
          hello@mycalcsworld.online
        </a>{" "}
        or via the{" "}
        <Link href="/contact" className="text-brand hover:underline">
          contact page
        </Link>
        .
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">What this site is</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-1">
        <li>A polished hub with search, categories, charts, and related tools</li>
        <li>A growing catalog of real calculators (not stubs)</li>
        <li>Deep FAQ / how-to content on high-traffic commercial pages</li>
        <li>An extension-friendly registry so new tools are easy to add</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-foreground">What this site is not</h2>
      <p className="mt-2 text-muted leading-relaxed">
        We do not claim to include every calculator on earth. Regulated financial products,
        personalized tax filing, and live trading desks are out of scope. Currency and
        commodity quotes are delayed educational references with fallbacks — not executable
        market orders.
      </p>
    </div>
  );
}
