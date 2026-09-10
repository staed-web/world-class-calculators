"use client";

import { useMemo, useState } from "react";
import { contactMailto } from "@/lib/site";
import { ContactEmail } from "./ContactEmail";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const sub = subject.trim() || "MyCalcsWorld feedback";
    const body = [
      name.trim() ? `Name: ${name.trim()}` : null,
      email.trim() ? `Reply-to: ${email.trim()}` : null,
      "",
      message.trim() || "(no message)",
    ]
      .filter((line) => line !== null)
      .join("\n");
    return contactMailto(sub, body);
  }, [name, email, subject, message]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = mailto;
  }

  const field =
    "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-base sm:text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 min-h-11";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl surface-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">Name</span>
          <input
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Your email</span>
          <input
            type="email"
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-foreground">Subject</span>
        <input
          className={field}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Formula question, bug, partnership…"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          className={`${field} min-h-[140px] resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="How can we help?"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 min-h-11"
        >
          Open email draft
        </button>
        <span className="text-sm text-muted">Or email <ContactEmail className="text-brand hover:underline" /> directly</span>
      </div>
    </form>
  );
}
