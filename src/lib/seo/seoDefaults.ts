import type {
  CalculatorMeta,
  CalculatorSeoContent,
  CategorySlug,
  FaqItem,
  FieldDef,
  WorkedExample,
} from "@/lib/types";
import { categoryMap } from "@/lib/categories";

function fieldDefaults(fields?: FieldDef[]): string {
  if (!fields?.length) return "the default inputs shown on the form";
  const bits = fields
    .filter((f) => f.defaultValue !== undefined && f.defaultValue !== null && f.defaultValue !== "")
    .slice(0, 4)
    .map((f) => {
      const unit = f.suffix ? ` ${f.suffix}` : "";
      return `${f.label.toLowerCase()} ${f.defaultValue}${unit}`;
    });
  return bits.length ? bits.join(", ") : "the default inputs shown on the form";
}

function formulaFallback(calc: CalculatorMeta): string {
  const cat = calc.category;
  const map: Partial<Record<CategorySlug, string>> = {
    finance:
      "Results use standard time-value-of-money and cash-flow relationships implemented in the site formula modules (interest, amortization, growth, and tax helpers). Exact algebraic forms appear on flagship pages; elsewhere the live form is the source of truth for rounding and edge cases.",
    math:
      "Outputs follow the usual algebraic / geometric / statistical identities for this tool. Intermediate rounding is limited; final display uses sensible fixed precision so classroom checks stay reproducible.",
    "health-fitness":
      "Health formulas use widely published educational equations (e.g. BMI, Mifflin–St Jeor BMR, macro splits). They are population averages — not clinical measurements — and never replace medical advice.",
    conversion:
      "Unit conversions apply fixed SI / customary factors (exact where standards define them, otherwise commonly published rounded constants). Temperature uses the standard linear transforms between °C, °F, and K.",
    "date-time":
      "Date math counts calendar days (and weekday filters where offered) in the local/UTC conventions documented on the form. Leap years are respected for DOB/age style tools.",
    "everyday-life":
      "Everyday estimators combine simple arithmetic with conventional rules of thumb (splits, tips, DIY material allowances). Treat outputs as planning aids, not contractor quotes.",
    "science-engineering":
      "Science tools apply textbook relationships (Ohm’s law, density, kinematics, waves, etc.) with SI units unless the form asks otherwise. Idealized assumptions (constant g, ohmic resistors) apply unless noted.",
    business:
      "Business calculators use standard managerial / accounting identities (break-even, margin, markup, ROI). They ignore taxes, inventory write-offs, and financing unless a field explicitly includes them.",
    education:
      "Education tools score or transform inputs with transparent rules (GPA scales, grade weights, study planners). Institution policies may differ — verify against your syllabus.",
    statistics:
      "Statistical outputs use classical definitions (mean, variance, combinations/permutations, binomial probabilities). Sample vs population variance is labeled when both exist.",
    commodities:
      "Commodity and metal values multiply weight × purity × reference price. Live quotes are delayed educational feeds — not executable trade prices.",
  };
  const base =
    map[cat] ||
    `This ${calc.name} applies the standard calculation for its category. See the live result panel for precision and edge-case handling.`;
  const specific = calc.formulaNote?.trim();
  if (specific && specific.length >= 80) return specific;
  if (specific) return `${specific} ${base}`;
  return base;
}

const categoryOverviewLead: Record<CategorySlug, string> = {
  finance:
    "Finance calculators on MyCalcsWorld are built for quick, transparent money math — loans, interest, investing, taxes, and cash-flow planning — with multi-currency formatting via the currency picker.",
  math:
    "Math calculators on MyCalcsWorld cover arithmetic through algebra, geometry, and specialty solvers so students and professionals can check work without opaque “black box” apps.",
  "health-fitness":
    "Health & fitness tools estimate body metrics, calories, and training targets from published educational formulas. They are for learning and goal-setting, not diagnosis or treatment.",
  conversion:
    "Conversion calculators translate between common unit systems with clear factors so engineering, cooking, travel, and schoolwork stay consistent.",
  "date-time":
    "Date & time calculators answer “how long between…”, age, business days, and schedule shifts without spreadsheet gymnastics.",
  "everyday-life":
    "Everyday-life calculators handle tips, DIY quantities, recipes, and household planning with practical defaults you can tweak instantly.",
  "science-engineering":
    "Science & engineering calculators apply textbook physics and chemistry relationships with SI-friendly inputs for lab, class, and field estimates.",
  business:
    "Business calculators quantify margins, break-even, and simple ROI so founders and analysts can pressure-test ideas before opening a full model.",
  education:
    "Education calculators help with grades, GPA, and study planning using transparent weighting rules you can align to your school’s policy.",
  statistics:
    "Statistics calculators compute summaries and classical probabilities so you can validate homework or exploratory analysis quickly.",
  commodities:
    "Commodities tools estimate metal and commodity notionals from weight, purity, and reference prices — including live spot helpers where available.",
};

const categoryHowToExtra: Partial<Record<CategorySlug, string[]>> = {
  finance: [
    "Use the currency picker when you think in INR, USD, EUR, or another display currency — formulas stay the same.",
    "Stress-test a worse rate or shorter horizon before you treat a result as a plan.",
  ],
  "health-fitness": [
    "Enter measurements in the units shown on each field (the form labels metric vs customary clearly).",
    "If you are under medical care, confirm targets with a clinician before changing diet or training.",
  ],
  math: [
    "Double-check that parentheses and units match the problem statement before comparing to an answer key.",
  ],
  commodities: [
    "Treat live prices as delayed reference quotes; dealers add premiums, making charges, and taxes.",
  ],
};

function buildFaqs(calc: CalculatorMeta): FaqItem[] {
  const catName = categoryMap[calc.category]?.name || calc.category;
  const faqs: FaqItem[] = [
    {
      question: `What does the ${calc.name} do?`,
      answer: `${calc.description} It runs entirely in your browser on MyCalcsWorld — free, with no signup — and shows results as soon as you change an input.`,
    },
    {
      question: "How do I use this calculator step by step?",
      answer: `Fill each labeled field (defaults are sensible starting points), review the live result panel, then scroll for formula notes, a worked example, and FAQs. Related tools in the ${catName} category appear in the sidebar if you need a neighboring calculation.`,
    },
    {
      question: "Is this result financial, medical, or professional advice?",
      answer:
        "No. MyCalcsWorld outputs are educational estimates for illustration only. They are not a substitute for a licensed advisor, clinician, attorney, or tax professional — especially when money, health, or legal outcomes are at stake.",
    },
    {
      question: "Will my numbers be stored on a server?",
      answer:
        "Calculations run locally in your browser session. We do not require an account to use this tool. See the Privacy page for how the site handles general analytics and ads.",
    },
  ];

  if (calc.category === "finance") {
    faqs.push({
      question: "Can I switch currency display?",
      answer:
        "Yes. Use the currency picker on finance tools to format money in USD, INR, EUR, GBP, and other supported codes. This changes display symbols, not FX conversion of the underlying inputs (unless you are on the dedicated converter).",
    });
    faqs.push({
      question: "Why might my bank or broker show a slightly different figure?",
      answer:
        "Live products may use different day-count conventions, compounding schedules, fees, taxes, or rounding. Treat this page as an independent cross-check, then confirm with your statement or advisor.",
    });
  } else if (calc.category === "health-fitness") {
    faqs.push({
      question: "Which formula standard does this health tool follow?",
      answer:
        "We use widely published educational equations labeled in the formula notes. Individual labs and clinics may use alternate cutoffs or adjusted equations for athletes, pregnancy, or clinical populations.",
    });
  } else if (calc.category === "math" || calc.category === "statistics") {
    faqs.push({
      question: "How precise are the results?",
      answer:
        "Internal math uses JavaScript double precision; displayed values are rounded for readability. For proofs or high-stakes engineering, re-check with your required significant figures.",
    });
  } else if (calc.category === "conversion") {
    faqs.push({
      question: "Are conversion factors exact?",
      answer:
        "SI definitions are exact where the standard says so; customary factors may use commonly published rounded constants. Extremely high-precision metrology may need authoritative tables beyond this UI.",
    });
  } else if (calc.category === "commodities") {
    faqs.push({
      question: "Are metal prices live tradeable quotes?",
      answer:
        "No. Spot helpers use delayed educational reference feeds. Retail jewelry and bullion prices include making charges, premiums, GST/sales tax, and dealer spreads.",
    });
  } else {
    faqs.push({
      question: `When should I use another ${catName} calculator instead?`,
      answer: `If your problem needs a different primary output (for example a schedule, a unit change, or a related identity), pick a related tool from the sidebar or search MyCalcsWorld — each page stays focused so inputs stay unambiguous.`,
    });
  }

  if (calc.keywords?.some((k) => /india|emi|sip|gst|inr/i.test(k))) {
    faqs.push({
      question: "Does this work for India (INR) use cases?",
      answer:
        "Yes — choose INR in the currency picker where money fields appear, and read the India-oriented how-to steps when present. Tax and product rules still vary by bank, state, and scheme.",
    });
  }

  return faqs.slice(0, 8);
}

function buildWorkedExample(calc: CalculatorMeta): WorkedExample {
  const defaults = fieldDefaults(calc.fields);
  return {
    title: `Worked example — ${calc.name}`,
    steps: [
      `Start from the on-page defaults (${defaults}).`,
      "Change one input at a time and watch the result panel update so you can see each field’s effect.",
      "Compare the output to a hand calculation or spreadsheet using the formula notes below.",
      "Optional: switch currency (finance) or related tools if your real scenario needs a neighboring metric.",
    ],
    result: `With the default inputs, the live calculator shows the authoritative rounded result for this build of ${calc.name}. Re-run with your own numbers for a personalized estimate — illustrative only.`,
  };
}

function buildHowTo(calc: CalculatorMeta): {
  howToUse: string[];
  howToUseUS: string[];
  howToUseIndia: string[];
} {
  const howToUse = [
    `Open the ${calc.name} and review the labeled input fields.`,
    "Enter your values (or start from the defaults) — results update as you type.",
    "Read the primary result(s) in the panel, including any chart or table when shown.",
    "Scroll for formula notes, a worked example, and FAQs before relying on the figure.",
  ];
  const extra = categoryHowToExtra[calc.category] || [];
  const howToUseUS = [
    `Use ${calc.name} with the units commonly quoted in the U.S. / global English docs for this topic.`,
    ...howToUse.slice(1, 3),
    "If a bank, insurer, or school uses a different convention, match their definition of each input.",
    ...extra.slice(0, 1),
  ];
  const howToUseIndia = [
    `Use ${calc.name} with India-relevant units where applicable (INR via the currency picker on money tools, metric measures, financial-year context).`,
    ...howToUse.slice(1, 3),
    "Confirm bank/NBFC, CBSE/university, or clinic conventions when your institution publishes its own method.",
    ...extra.slice(0, 1),
  ];
  return { howToUse, howToUseUS, howToUseIndia };
}

/** Substantial default SEO/detail sections for any registry calculator. */
export function buildDefaultCalculatorSeo(calc: CalculatorMeta): CalculatorSeoContent {
  const cat = categoryMap[calc.category];
  const lead =
    categoryOverviewLead[calc.category] ||
    "MyCalcsWorld calculators run in your browser with clear inputs and educational disclaimers.";
  const { howToUse, howToUseUS, howToUseIndia } = buildHowTo(calc);

  return {
    seoTitle: `${calc.name} — Free Online Tool`,
    seoDescription: `${calc.description} Free ${cat?.name || ""} calculator on MyCalcsWorld — no signup, mobile-friendly, with explainers and FAQs.`.replace(
      /\s+/g,
      " "
    ).trim(),
    overview: `${lead}\n\nThe ${calc.name} ${calc.description.replace(/\.$/, "")}. Keywords people use for this page include ${calc.keywords
      .slice(0, 5)
      .join(", ") || calc.slug}. Below you get a live form, interpretation tips, formula notes, a worked example you can mirror, and FAQs — written so the page stays useful even when you are comparing against bank worksheets, homework keys, or other sites.`,
    howToUse,
    howToUseUS,
    howToUseIndia,
    howToInterpret: [
      "Primary outputs appear at the top of the result panel; secondary breakdowns, charts, and tables follow when the tool supports them.",
      "If a hint appears under a result, it explains a definition (for example what was included or excluded).",
      "Re-run with optimistic and pessimistic inputs to see sensitivity before making a decision.",
      "Educational estimate only — verify critical numbers with a qualified professional or primary source.",
    ],
    workedExample: buildWorkedExample(calc),
    faqs: buildFaqs(calc),
    formulaNote: formulaFallback(calc),
  };
}

function mergeFaqs(
  base: FaqItem[] | undefined,
  over: FaqItem[] | undefined
): FaqItem[] {
  if (!over?.length) return base || [];
  if (!base?.length) return over;
  const seen = new Set(over.map((f) => f.question.toLowerCase()));
  const merged = [...over];
  for (const f of base) {
    if (seen.has(f.question.toLowerCase())) continue;
    merged.push(f);
    if (merged.length >= 8) break;
  }
  return merged;
}

function preferLongerSteps(
  over: string[] | undefined,
  base: string[] | undefined,
  min = 3
): string[] {
  const b = base || [];
  const o = over || [];
  if (o.length >= min) return o;
  if (!o.length) return b;
  const seen = new Set(o.map((s) => s.toLowerCase()));
  const merged = [...o];
  for (const s of b) {
    if (seen.has(s.toLowerCase())) continue;
    merged.push(s);
    if (merged.length >= min) break;
  }
  return merged.length ? merged : b;
}

/** Merge override onto defaults; thin how-to arrays are padded from defaults. */
export function mergeCalculatorSeo(
  defaults: CalculatorSeoContent,
  override?: CalculatorSeoContent
): CalculatorSeoContent {
  if (!override) return defaults;
  const overview =
    override.overview && override.overview.trim().length >= 80
      ? override.overview
      : defaults.overview;
  return {
    seoTitle: override.seoTitle || defaults.seoTitle,
    seoDescription: override.seoDescription || defaults.seoDescription,
    overview,
    howToUse: preferLongerSteps(override.howToUse, defaults.howToUse, 3),
    howToUseUS: preferLongerSteps(override.howToUseUS, defaults.howToUseUS, 2),
    howToUseIndia: preferLongerSteps(
      override.howToUseIndia,
      defaults.howToUseIndia,
      2
    ),
    howToInterpret: preferLongerSteps(
      override.howToInterpret,
      defaults.howToInterpret,
      2
    ),
    workedExample: override.workedExample || defaults.workedExample,
    faqs: mergeFaqs(defaults.faqs, override.faqs),
    formulaNote:
      override.formulaNote && override.formulaNote.length >= 80
        ? override.formulaNote
        : override.formulaNote
          ? `${override.formulaNote} ${defaults.formulaNote || ""}`.trim()
          : defaults.formulaNote,
  };
}
