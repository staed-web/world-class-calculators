import type { Metadata } from "next";
import Link from "next/link";
import { calculatorCount } from "@/lib/calculators/registry";
import { CONTACT_EMAIL, contactMailto } from "@/lib/site";
import { ContactEmail } from "@/components/ContactEmail";

export const metadata: Metadata = {
  title: "About MyCalcsWorld",
  description:
    "About MyCalcsWorld — free browser-based calculators for finance, math, health, and everyday life. Honest scope, clear formulas, and client-side math for everyone worldwide.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-foreground">About MyCalcsWorld</h1>
      <p className="mt-2 text-sm text-muted">
        Last updated: September 10, 2026 (IST)
      </p>
      <p className="mt-1 text-xs text-muted">
        Operated independently · Contact{" "}
        <ContactEmail className="text-brand hover:underline" />
      </p>

      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          MyCalcsWorld is a free collection of {calculatorCount}+ calculators for everyday
          decisions — finance, math, health &amp; fitness, unit conversion, dates, science,
          business, education, statistics, and more.
        </p>
        <p>
          We keep things simple: clear inputs, readable results, charts where they help (like
          mortgage schedules or SIP growth), and short guides so you understand the numbers —
          not just punch them in. Built for people everywhere.
        </p>
      </div>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">For a worldwide audience</h2>
      <p className="mt-2 text-muted leading-relaxed">
        Tools cover planning people do everywhere:{" "}
        <strong className="text-foreground">loan EMI</strong>,{" "}
        <strong className="text-foreground">SIP / recurring investing</strong>,{" "}
        <strong className="text-foreground">GST / VAT / sales tax</strong>, mortgages, tips, BMI,
        science helpers, and a multi-currency picker (USD, EUR, INR, GBP, AED, and more). Pick the
        units and currency that fit your situation — we do not assume one country.
      </p>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">Privacy &amp; how math runs</h2>
      <p className="mt-2 text-muted leading-relaxed">
        Core calculator math runs in your browser. No account is required. Hosting logs and
        advertising (when shown) follow standard web practice — see{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          Privacy
        </Link>
        .
      </p>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">Who we are</h2>
      <p className="mt-2 text-muted leading-relaxed">
        MyCalcsWorld is an independently operated project at{" "}
        <a href="https://mycalcsworld.online" className="text-brand hover:underline">
          mycalcsworld.online
        </a>
        . We are not a bank, brokerage, clinic, or government portal. Results are educational
        estimates — not professional financial, tax, medical, or legal advice.
      </p>
      <p className="mt-2 text-muted leading-relaxed">
        Reach us at{" "}
        <ContactEmail className="text-brand hover:underline" />{" "}
        or via the{" "}
        <Link href="/contact" className="text-brand hover:underline">
          contact page
        </Link>
        .
      </p>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">What you will find here</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-1">
        <li>A growing library of free, working calculators</li>
        <li>Search and categories so you can find the right tool quickly</li>
        <li>Short how-tos, examples, and formula notes on each calculator page</li>
        <li>Related tools when you want to dig a little deeper</li>
      </ul>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">What this site is not</h2>
      <p className="mt-2 text-muted leading-relaxed">
        We do not claim to include every calculator on earth. Regulated financial products,
        personalized tax filing, and live trading desks are out of scope. Currency and commodity
        quotes are delayed educational references with fallbacks — not executable market orders.
      </p>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">Why people use MyCalcsWorld</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-2">
        <li>
          <strong className="text-foreground">Runs in your browser</strong> — core calculations
          stay on your device; no signup needed to use a tool.
        </li>
        <li>
          <strong className="text-foreground">Guides with every calculator</strong> — when to use
          it, simple steps, common mistakes, worked examples, formula notes, and FAQs written for
          this site.
        </li>
        <li>
          <strong className="text-foreground">Worldwide tools</strong> — EMI, SIP, GST/VAT,
          mortgage, tip, BMI, science, and live FX with a multi-currency picker.
        </li>
        <li>
          <strong className="text-foreground">Honest about limits</strong> — educational estimates
          with clear disclaimers. If something looks wrong, tell us at{" "}
          <ContactEmail className="text-brand hover:underline" />
          .
        </li>
      </ul>

      <h2 className="mt-8 font-serif text-xl font-semibold text-foreground">Our standards</h2>
      <ul className="mt-2 list-disc pl-5 text-muted space-y-2 text-sm leading-relaxed">
        <li>
          <strong className="text-foreground">Practical tools</strong> — built around real planning
          needs (loans, investing, mortgages, health basics, unit conversion) with clear how-tos.
        </li>
        <li>
          <strong className="text-foreground">Transparent math</strong> — each calculator includes
          formula notes and worked examples so you can see how results are produced.
        </li>
        <li>
          <strong className="text-foreground">Clear boundaries</strong> — we do not pose as a bank,
          clinic, or government portal. “Educational estimate” labels are intentional.
        </li>
        <li>
          <strong className="text-foreground">Open to feedback</strong> — no account required for
          core math; privacy policy and disclaimer are linked in the footer; corrections welcome at{" "}
          <ContactEmail className="text-brand hover:underline" />
          .
        </li>
      </ul>
    </div>
  );
}
