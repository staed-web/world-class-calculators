import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact MyCalcsWorld at hello@mycalcsworld.online — feedback, corrections, and partnership notes.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Contact</h1>
      <p className="mt-2 text-sm text-muted">
        We read every message. For calculator feedback, formula corrections, or site
        questions, email us or use the form below.
      </p>

      <div className="mt-6 rounded-2xl surface-card p-5 sm:p-6 space-y-3">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:hello@mycalcsworld.online"
            className="text-brand hover:underline"
          >
            hello@mycalcsworld.online
          </a>
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Prefer a mailbox client? Tap the address above. The form opens a pre-filled
          mailto draft in your email app (nothing is stored on our servers).
        </p>
        <p className="text-xs text-muted">
          Operators: create / point the{" "}
          <code className="rounded bg-background px-1">hello@mycalcsworld.online</code>{" "}
          mailbox (or forward it) at your DNS / email host — see README.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Send a message</h2>
        <ContactForm />
      </div>

      <p className="mt-8 text-sm text-muted">
        Looking for legal info? See{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          Privacy
        </Link>
        ,{" "}
        <Link href="/disclaimer" className="text-brand hover:underline">
          Disclaimer
        </Link>
        , or{" "}
        <Link href="/about" className="text-brand hover:underline">
          About
        </Link>
        .
      </p>
    </div>
  );
}
