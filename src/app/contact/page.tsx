import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { CONTACT_EMAIL, SITE_URL, contactMailto } from "@/lib/site";
import { ContactEmail } from "@/components/ContactEmail";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact MyCalcsWorld at ${CONTACT_EMAIL} — feedback, corrections, and partnership notes.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact | MyCalcsWorld",
    description: `Reach MyCalcsWorld at ${CONTACT_EMAIL}.`,
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | MyCalcsWorld",
    description: `Reach MyCalcsWorld at ${CONTACT_EMAIL}.`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Contact</h1>
      <p className="mt-2 text-sm text-muted">
        We read every message. For calculator feedback, formula corrections, or site
        questions, email us or use the form below.
      </p>

      <div className="mt-6 rounded-xl surface-card p-5 sm:p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-2">
            Email us
          </p>
          <ContactEmail className="block text-lg sm:text-xl font-semibold text-brand hover:underline" />
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={contactMailto("MyCalcsWorld inquiry")}
            className="btn-primary inline-flex min-h-10 items-center justify-center px-3 py-2 text-sm"
          >
            Open in mail app
          </a>
          <CopyEmailButton />
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-brand hover:text-brand transition"
          >
            Open in Gmail
          </a>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          Tap the address, copy it, or open Gmail. The form below prepares a draft with your
          subject and message — we do not store form submissions on our servers.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Send a message</h2>
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
