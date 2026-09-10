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
      <p className="mt-2 text-sm text-muted">Last updated: September 10, 2026 (IST) · Reviewed for accuracy of scope &amp; contact details</p>
      <p className="mt-1 text-xs text-muted">
        Operated independently · Formulas documented on each tool · Contact{" "}
        <a href="mailto:hello@mycalcsworld.online" className="text-brand hover:underline">
          hello@mycalcsworld.online
        </a>
      </p>

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

      <h2 className="mt-8 text-xl font-semibold text-foreground">Why trust MyCalcsWorld</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-2">
        <li>
          <strong className="text-foreground">Client-side math</strong> — core calculations run in
          your browser; we do not require an account to use a tool.
        </li>
        <li>
          <strong className="text-foreground">Guides on every calculator</strong> — when to use,
          how-to steps, common mistakes, worked examples, formula notes, and FAQs written for
          MyCalcsWorld (not scraped competitor blurbs).
        </li>
        <li>
          <strong className="text-foreground">India + global</strong> — EMI, SIP, GST, INR FX
          beside mortgage, tip, BMI, and science tools, with region-aware how-tos on flagships.
        </li>
        <li>
          <strong className="text-foreground">Honest scope</strong> — educational estimates with
          clear disclaimers; contact us at{" "}
          <a href="mailto:hello@mycalcsworld.online" className="text-brand hover:underline">
            hello@mycalcsworld.online
          </a>{" "}
          when something looks wrong.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Editorial standards (E-E-A-T)</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-2 text-sm leading-relaxed">
        <li>
          <strong className="text-foreground">Experience</strong> — tools are built around real planning
          workflows (EMI, SIP, mortgage, BMI, unit conversion) used in India and globally, with
          region-aware how-tos on flagship pages.
        </li>
        <li>
          <strong className="text-foreground">Expertise</strong> — each calculator ships formula notes
          and worked examples; math runs from documented helpers in our open codebase, not opaque
          black-box widgets.
        </li>
        <li>
          <strong className="text-foreground">Authoritativeness</strong> — we do not pose as a bank,
          clinic, or government portal. Scope limits and “educational estimate” labels are
          intentional.
        </li>
        <li>
          <strong className="text-foreground">Trust</strong> — no account required for core math;
          privacy policy and disclaimer are linked in the footer; corrections via{" "}
          <a href="mailto:hello@mycalcsworld.online" className="text-brand hover:underline">
            hello@mycalcsworld.online
          </a>
          .
        </li>
      </ul>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm text-muted leading-relaxed">
        <p className="font-semibold text-foreground">Mobile-first</p>
        <p className="mt-1">
          Forms, charts, tables, and guides are tuned for phones: larger tap targets, no
          horizontal page overflow, readable results, and in-flow ads only (no sticky mobile
          bottom bars).
        </p>
      </div>
    </div>
  );
}
