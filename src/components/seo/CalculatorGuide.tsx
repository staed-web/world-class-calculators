import type { ReactNode } from "react";
import type { CalculatorSeoContent } from "@/lib/types";

function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-xl border border-border/80 bg-background/50 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted leading-relaxed">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-xl font-bold tracking-tight text-foreground border-b border-border/70 pb-2"
    >
      {children}
    </h2>
  );
}

export function CalculatorGuide({
  content,
  formulaNote,
}: {
  content: CalculatorSeoContent;
  formulaNote?: string;
}) {
  const note = formulaNote || content.formulaNote;
  const hasHowTo =
    (content.howToUse?.length ?? 0) > 0 ||
    (content.howToUseUS?.length ?? 0) > 0 ||
    (content.howToUseIndia?.length ?? 0) > 0;

  if (
    !content.overview &&
    !hasHowTo &&
    !content.howToInterpret?.length &&
    !content.workedExample &&
    !content.faqs?.length &&
    !note
  ) {
    return null;
  }

  const toc: { id: string; label: string }[] = [];
  if (content.overview) toc.push({ id: "guide-about", label: "About" });
  if (hasHowTo) toc.push({ id: "guide-howto", label: "How to use" });
  if (content.howToInterpret?.length)
    toc.push({ id: "guide-interpret", label: "Interpret" });
  if (content.workedExample)
    toc.push({ id: "guide-example", label: "Example" });
  if (note) toc.push({ id: "guide-formula", label: "Formula" });
  if (content.faqs?.length) toc.push({ id: "guide-faq", label: "FAQ" });

  return (
    <section
      id="calculator-guide"
      className="scroll-mt-28 space-y-8 rounded-2xl surface-card p-5 sm:p-7 ring-1 ring-border/60"
      aria-label="Guide and FAQ"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Detailed guide
          </p>
          <p className="mt-1 text-sm text-muted max-w-2xl">
            Same depth you expect from flagship calculator sites — how-to, worked
            example, formula notes, and FAQs for this tool.
          </p>
        </div>
      </div>

      {toc.length > 1 && (
        <nav
          aria-label="On this guide"
          className="flex flex-wrap gap-2 rounded-xl border border-border bg-background/70 p-3"
        >
          <span className="w-full text-[11px] font-semibold uppercase tracking-wide text-muted sm:w-auto sm:mr-1 sm:self-center">
            On this page
          </span>
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:border-brand hover:text-brand transition"
            >
              {t.label}
            </a>
          ))}
        </nav>
      )}

      {content.overview && (
        <div>
          <SectionTitle id="guide-about">About this calculator</SectionTitle>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed whitespace-pre-wrap">
            {content.overview}
          </p>
        </div>
      )}

      {hasHowTo && (
        <div className="space-y-4">
          <SectionTitle id="guide-howto">How to use</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {content.howToUseIndia && content.howToUseIndia.length > 0 && (
              <StepList title="🇮🇳 India" steps={content.howToUseIndia} />
            )}
            {content.howToUseUS && content.howToUseUS.length > 0 && (
              <StepList title="🇺🇸 United States / global" steps={content.howToUseUS} />
            )}
          </div>
          {content.howToUse && content.howToUse.length > 0 && !content.howToUseUS && !content.howToUseIndia && (
            <StepList title="Steps" steps={content.howToUse} />
          )}
          {content.howToUse &&
            content.howToUse.length > 0 &&
            (content.howToUseUS || content.howToUseIndia) && (
              <StepList title="Quick steps (all regions)" steps={content.howToUse} />
            )}
        </div>
      )}

      {content.howToInterpret && content.howToInterpret.length > 0 && (
        <div>
          <SectionTitle id="guide-interpret">How to interpret results</SectionTitle>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-muted leading-relaxed">
            {content.howToInterpret.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {content.workedExample && (
        <div
          id="guide-example"
          className="scroll-mt-28 rounded-xl border border-teal-200/70 bg-gradient-to-br from-teal-50/80 via-background to-indigo-50/40 p-5 dark:border-teal-900 dark:from-teal-950/40 dark:to-indigo-950/30"
        >
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Worked example
          </h2>
          <p className="mt-1 text-sm font-medium text-foreground">
            {content.workedExample.title}
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted leading-relaxed">
            {content.workedExample.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-lg border border-border/80 bg-background/80 px-3 py-2 text-sm text-foreground">
            <span className="font-semibold text-teal-800 dark:text-teal-300">
              Result:{" "}
            </span>
            {content.workedExample.result}
          </p>
        </div>
      )}

      {note && (
        <div>
          <SectionTitle id="guide-formula">Formula notes</SectionTitle>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed whitespace-pre-wrap">
            {note}
          </p>
        </div>
      )}

      {content.faqs && content.faqs.length > 0 && (
        <div>
          <SectionTitle id="guide-faq">Frequently asked questions</SectionTitle>
          <div className="mt-4 space-y-2">
            {content.faqs.map((f, i) => (
              <details
                key={f.question}
                open={i === 0}
                className="group rounded-xl border border-border bg-background/70 px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-medium text-sm sm:text-base text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{f.question}</span>
                    <span className="shrink-0 text-muted transition group-open:rotate-180">
                      ▾
                    </span>
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function FaqJsonLd({
  faqs,
  pageUrl,
  name,
}: {
  faqs: { question: string; answer: string }[];
  pageUrl: string;
  name: string;
}) {
  if (!faqs.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
    name,
    url: pageUrl,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TrustStrip() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted">
      <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1">
        Runs in your browser
      </span>
      <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1">
        Free
      </span>
      <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1">
        No signup
      </span>
      <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50 px-2.5 py-1 text-teal-900 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-100">
        Educational estimates — not professional advice
      </span>
    </div>
  );
}
