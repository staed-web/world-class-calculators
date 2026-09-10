import type { CalculatorSeoContent } from "@/lib/types";

function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-muted leading-relaxed">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
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

  return (
    <section className="space-y-6 rounded-2xl surface-card p-5 sm:p-6" aria-label="Guide and FAQ">
      {content.overview && (
        <div>
          <h2 className="text-lg font-bold text-foreground">About this calculator</h2>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed whitespace-pre-wrap">
            {content.overview}
          </p>
        </div>
      )}

      {hasHowTo && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">How to use</h2>
          <div className="grid gap-5 md:grid-cols-2">
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
              <StepList title="Quick steps" steps={content.howToUse} />
            )}
        </div>
      )}

      {content.howToInterpret && content.howToInterpret.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground">How to interpret results</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted leading-relaxed">
            {content.howToInterpret.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {content.workedExample && (
        <div className="rounded-xl border border-border bg-background/70 p-4">
          <h2 className="text-lg font-bold text-foreground">Worked example</h2>
          <p className="mt-1 text-sm font-medium text-foreground">{content.workedExample.title}</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-muted leading-relaxed">
            {content.workedExample.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-foreground">
            <span className="font-semibold">Result:</span> {content.workedExample.result}
          </p>
        </div>
      )}

      {note && (
        <div>
          <h2 className="text-lg font-bold text-foreground">Formula notes</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed whitespace-pre-wrap">{note}</p>
        </div>
      )}

      {content.faqs && content.faqs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-3 space-y-2">
            {content.faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-border bg-background/60 px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-medium text-sm text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{f.question}</span>
                    <span className="shrink-0 text-muted transition group-open:rotate-180">▾</span>
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
    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted">
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
