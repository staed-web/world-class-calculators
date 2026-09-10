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
      "Results use standard time-value-of-money and cash-flow relationships implemented in the site formula modules (interest, amortization, growth, and tax helpers). Exact algebraic forms appear on flagship pages; elsewhere the live form is the source of truth for rounding and edge cases. Day-count and compounding conventions can differ from a specific bank product — always cross-check against your Loan Estimate, sanction letter, or prospectus before committing money.",
    math:
      "Outputs follow the usual algebraic / geometric / statistical identities for this tool. Intermediate rounding is limited; final display uses sensible fixed precision so classroom checks stay reproducible. For proofs or contest math, re-derive with the exact symbolic form your course requires.",
    "health-fitness":
      "Health formulas use widely published educational equations (e.g. BMI, Mifflin–St Jeor BMR, Navy body-fat, macro splits). They are population averages — not clinical measurements — and never replace medical advice, lab work, or a licensed clinician’s judgment.",
    conversion:
      "Unit conversions apply fixed SI / customary factors (exact where standards define them, otherwise commonly published rounded constants). Temperature uses the standard linear transforms between °C, °F, and K. Extremely high-precision metrology may need authoritative BIPM / NIST tables beyond this UI.",
    "date-time":
      "Date math counts calendar days (and weekday filters where offered) in the local/UTC conventions documented on the form. Leap years are respected for DOB/age style tools. Business-day logic excludes weekends unless a holiday calendar is explicitly noted (most tools do not encode bank holidays).",
    "everyday-life":
      "Everyday estimators combine simple arithmetic with conventional rules of thumb (splits, tips, DIY material allowances, fuel math). Treat outputs as planning aids, not contractor quotes, tax filings, or binding agreements.",
    "science-engineering":
      "Science tools apply textbook relationships (Ohm’s law, density, kinematics, waves, energy) with SI units unless the form asks otherwise. Idealized assumptions (constant g, ohmic resistors, frictionless motion) apply unless noted — real lab or field conditions need your own corrections.",
    business:
      "Business calculators use standard managerial / accounting identities (break-even, margin, markup, ROI, hourly↔salary). They ignore taxes, inventory write-offs, benefits loading, and financing unless a field explicitly includes them.",
    education:
      "Education tools score or transform inputs with transparent rules (GPA scales, grade weights, final-grade needed). Institution policies may differ — verify against your syllabus, registrar, or exam board before relying on a target.",
    statistics:
      "Statistical outputs use classical definitions (mean, variance, combinations/permutations, binomial probabilities). Sample vs population variance is labeled when both exist. These are descriptive/educational helpers, not full hypothesis-test suites.",
    commodities:
      "Commodity and metal values multiply weight × purity × reference price. Live quotes are delayed educational feeds — not executable trade prices. Retail jewelry and bullion add making charges, premiums, GST/sales tax, and dealer spreads.",
  };
  const base =
    map[cat] ||
    `This ${calc.name} applies the standard calculation for its category. See the live result panel for precision and edge-case handling.`;
  const specific = calc.formulaNote?.trim();
  if (specific && specific.length >= 80) return specific;
  if (specific) return `${specific} ${base}`;
  return base;
}

/** Long-form category intros — used so default pages are not thin boilerplate. */
const categoryOverviewLead: Record<CategorySlug, string> = {
  finance:
    "Finance calculators on MyCalcsWorld are built for quick, transparent money math — loans, interest, investing, taxes, and cash-flow planning — with multi-currency formatting via the currency picker (USD, INR, EUR, GBP, AED, and more).\n\nWhether you are comparing a mortgage quote, checking an EMI, modeling SIP growth, or stress-testing a savings rate, each tool shows live results, charts or tables when the math supports them, and plain-language notes so you can verify against a bank worksheet or spreadsheet. Outputs are educational estimates: day-count conventions, fees, taxes, and product rules vary by lender and country.",
  math:
    "Math calculators on MyCalcsWorld cover arithmetic through algebra, geometry, and specialty solvers so students and professionals can check work without opaque “black box” apps.\n\nEvery page keeps inputs labeled, results readable on mobile, and formula notes visible so you can reconcile with a textbook or homework key. Use these for classroom checks, contest practice, or quick engineering sketches — then apply your required significant figures for graded or high-stakes work.",
  "health-fitness":
    "Health & fitness tools estimate body metrics, calories, hydration, and training targets from published educational formulas (BMI cutoffs, Mifflin–St Jeor, Navy circumference methods, one-rep-max estimators, and more).\n\nThey are for learning and goal-setting, not diagnosis or treatment. Athletes, pregnancy, pediatric, and clinical populations often need adjusted equations — confirm with a clinician or registered dietitian before changing diet, medication, or training load.",
  conversion:
    "Conversion calculators translate between common unit systems with clear factors so engineering, cooking, travel, and schoolwork stay consistent.\n\nPick the quantity you care about (length, mass, temperature, volume, speed, data, …), enter a value, and read the paired unit instantly. Factors follow SI definitions where exact, and commonly published customary constants otherwise — fine for homework and DIY, while metrology labs may need primary standards.",
  "date-time":
    "Date & time calculators answer “how long between…?”, age from date of birth, business-day spans, and schedule shifts without spreadsheet gymnastics.\n\nLeap years and weekday filters are handled in the engines behind each form. Holiday calendars are usually not embedded — if your bank, court, or school skips specific public holidays, adjust the result manually.",
  "everyday-life":
    "Everyday-life calculators handle tips, bill splits, fuel cost, recipe scaling, DIY quantities, and household planning with practical defaults you can tweak instantly.\n\nThese are convenience tools for dinners out, road trips, and weekend projects. They are not tax software, contractor bids, or legal advice — round up for tips when service warrants it, and verify material lists with a tradesperson for structural work.",
  "science-engineering":
    "Science & engineering calculators apply textbook physics and chemistry relationships with SI-friendly inputs for lab, class, and field estimates.\n\nOhm’s law, kinematics, energy, and similar helpers assume idealized conditions unless the page says otherwise. Use them to check homework or size a first-cut design, then apply real-world tolerances, temperature coefficients, and safety factors.",
  business:
    "Business calculators quantify margins, markup, break-even, hourly↔salary, and simple ROI so founders and analysts can pressure-test ideas before opening a full model.\n\nThey intentionally stay transparent: no hidden tax packs or inventory modules unless a field asks for them. Pair results with your accounting system and local tax rules before pricing or hiring decisions.",
  education:
    "Education calculators help with grades, GPA, and “what final score do I need?” planning using transparent weighting rules you can align to your school’s policy.\n\nAlways match the scale your syllabus publishes (4.0, 10-point, percentage weights, dropped scores). Registrars and exam boards have the final say on transcripts.",
  statistics:
    "Statistics calculators compute summaries and classical probabilities so you can validate homework or exploratory analysis quickly.\n\nMeans, medians, modes, spreads, combinations, and simple distributions are covered with classical definitions. For inference, A/B tests, or publication-grade analysis, use a full stats package and report assumptions explicitly.",
  commodities:
    "Commodities tools estimate metal and commodity notionals from weight, purity, and reference prices — including live spot helpers where available.\n\nQuotes are delayed educational feeds, not executable exchange or dealer prices. Jewelry and bullion tickets add making charges, premiums, taxes, and spreads — never treat a melt-value estimate as a buy/sell offer.",
};

const categoryHowToExtra: Partial<Record<CategorySlug, string[]>> = {
  finance: [
    "Use the currency picker when you think in INR, USD, EUR, or another display currency — formulas stay the same; only formatting changes (except on the live FX converter).",
    "Stress-test a worse rate, higher fee, or shorter horizon before you treat a result as a plan.",
    "If a chart or amortization/schedule table appears, scroll it — lifetime interest and early-year interest-heavy payments are easier to see visually than in a single headline number.",
  ],
  "health-fitness": [
    "Enter measurements in the units shown on each field (the form labels metric vs customary clearly).",
    "If you are under medical care, confirm targets with a clinician before changing diet or training.",
    "Re-run with honest activity levels — optimistic inputs produce optimistic calorie targets.",
  ],
  math: [
    "Double-check that parentheses, degrees vs radians, and units match the problem statement before comparing to an answer key.",
    "Use the formula notes to recreate the same steps on paper for exams that ban calculators.",
  ],
  conversion: [
    "Confirm you picked the correct pair (e.g. kg vs lb, not oz) — wrong unit families are the most common conversion mistake.",
  ],
  "date-time": [
    "Use the same timezone convention for both dates when crossing midnight or travel days matters.",
  ],
  "everyday-life": [
    "Round tip and split results in a way your group agrees on — the math is exact; social norms vary.",
  ],
  "science-engineering": [
    "Keep SI base units consistent (meters, kilograms, seconds) unless the form explicitly accepts other units.",
  ],
  business: [
    "Separate margin (profit ÷ revenue) from markup (profit ÷ cost) — mixing them up misprices products.",
  ],
  education: [
    "Match your syllabus weights exactly; a 5% error in weight assumptions swings “final needed” scores a lot.",
  ],
  statistics: [
    "State whether you need sample or population formulas before comparing to a textbook answer.",
  ],
  commodities: [
    "Treat live prices as delayed reference quotes; dealers add premiums, making charges, and taxes.",
    "Purity/karat mistakes dominate jewelry melt estimates — verify hallmarks before trusting a number.",
  ],
};

const categoryInterpret: Record<CategorySlug, string[]> = {
  finance: [
    "Primary outputs (payment, EMI, future value, tax due) appear at the top of the result panel; charts and year-by-year tables follow when the tool supports them.",
    "Total interest / total cost figures assume you keep the rate and schedule unchanged — prepayments, rate resets, and fees will move the real number.",
    "A lower rate or shorter term usually cuts lifetime interest but raises the periodic payment — compare both dimensions, not just the headline installment.",
    "Currency formatting does not convert FX by itself (use the Currency Converter for that). Educational estimate only — verify with a lender or advisor.",
  ],
  math: [
    "Read the primary result first, then any secondary roots, steps, or geometric properties the panel lists.",
    "Displayed precision is rounded for readability; internal math uses floating point — re-check proofs with exact fractions when required.",
    "If multiple solutions exist (e.g. quadratics), confirm which root your problem context needs.",
    "Educational check only — contest and exam rules may require handwritten derivation.",
  ],
  "health-fitness": [
    "Category labels (BMI bands, calorie targets) are population heuristics, not diagnoses.",
    "Small input changes (height rounding, activity level) can move calorie outputs by hundreds of kcal — treat ranges, not single points, as planning guides.",
    "Athletes and clinical populations often need different equations than the defaults on consumer calculators.",
    "Not medical advice — confirm with a qualified professional before acting on health numbers.",
  ],
  conversion: [
    "The paired unit is the authoritative converted value for the factors this tool ships with.",
    "Temperature conversions are affine (not simple ratios) — do not scale °C by the same factor you would use for kelvin differences without care.",
    "Cooking volume↔weight needs density; pure unit converters do not assume an ingredient unless stated.",
    "For legal metrology or lab calibration, prefer primary standards over web calculators.",
  ],
  "date-time": [
    "Day counts usually include or exclude the end date per the tool’s hint — read the result hint before filing deadlines.",
    "Age tools typically use completed years/months/days from DOB to the “as of” date.",
    "Business-day modes skip Saturdays and Sundays; public holidays are rarely auto-excluded.",
    "Illustrative scheduling aid — confirm critical deadlines with the institution that sets them.",
  ],
  "everyday-life": [
    "Tip and split tools show exact arithmetic; decide how to round coins in your group’s favor.",
    "Fuel cost is distance × consumption × price — real trips vary with traffic, load, and driving style.",
    "DIY quantity tools often add a waste factor when labeled; structural work still needs a professional takeoff.",
    "Planning aid only — not a quote, tax form, or legal document.",
  ],
  "science-engineering": [
    "Results assume the idealized model stated in the formula notes (constant parameters, ohmic behavior, etc.).",
    "Unit consistency matters more than decimal places — a wrong unit ruins the answer regardless of precision.",
    "Use outputs as a first-cut check, then apply safety factors and real component tolerances.",
    "Educational / engineering estimate — not a certified design calculation.",
  ],
  business: [
    "Margin and markup are not interchangeable; mislabeling them breaks pricing logic.",
    "Break-even ignores taxes and working-capital timing unless you added those costs into the inputs.",
    "Hourly↔salary converters usually omit benefits load and overtime rules — adjust for your jurisdiction.",
    "Illustrative management math — confirm with accounting and local compliance before decisions.",
  ],
  education: [
    "“Final grade needed” is only as accurate as the weight and current average you entered.",
    "GPA scales differ (4.0 unweighted, weighted AP/IB, 10-point) — match your transcript policy.",
    "Dropped scores and curves are not modeled unless the form has fields for them.",
    "Verify against your syllabus or registrar before relying on a target score.",
  ],
  statistics: [
    "Summary stats describe the sample you typed; they do not automatically generalize to a population.",
    "Watch sample vs population variance/std-dev definitions when matching homework keys.",
    "Combinatorics tools assume distinct items unless replacement/ indistinguishability is stated.",
    "Educational statistics only — not a substitute for a full analysis environment.",
  ],
  commodities: [
    "Notional value = weight × purity × reference price; retail tickets add premiums and taxes.",
    "Live spot helpers are delayed educational quotes — not tradeable bids/offers.",
    "Karat / fineness errors dominate jewelry melt estimates — verify hallmarks.",
    "Not investment or dealing advice — confirm with a licensed dealer for actual settlements.",
  ],
};

function buildFaqs(calc: CalculatorMeta): FaqItem[] {
  const catName = categoryMap[calc.category]?.name || calc.category;
  const faqs: FaqItem[] = [
    {
      question: `What does the ${calc.name} do?`,
      answer: `${calc.description} It runs entirely in your browser on MyCalcsWorld — free, with no signup — and shows results as soon as you change an input. Scroll for how-to steps, interpretation tips, a worked example, formula notes, and FAQs so the page stays useful beyond a single number.`,
    },
    {
      question: "How do I use this calculator step by step?",
      answer: `Fill each labeled field (defaults are sensible starting points), review the live result panel (including any chart or table), then scroll for formula notes, a worked example, and FAQs. Related tools in the ${catName} category appear in the sidebar and “You might also like” section if you need a neighboring calculation.`,
    },
    {
      question: "Is this result financial, medical, or professional advice?",
      answer:
        "No. MyCalcsWorld outputs are educational estimates for illustration only. They are not a substitute for a licensed advisor, clinician, attorney, engineer of record, or tax professional — especially when money, health, safety, or legal outcomes are at stake.",
    },
    {
      question: "Will my numbers be stored on a server?",
      answer:
        "Calculations run locally in your browser session. We do not require an account to use this tool. See the Privacy page for how the site handles general analytics and ads.",
    },
    {
      question: "Why does MyCalcsWorld include guides and FAQs on every calculator?",
      answer:
        "A raw number without context is easy to misread. Each page aims for the depth people expect from flagship tools: what the inputs mean, how to interpret outputs, a worked example you can mirror, and clear limitations — so you can cross-check bank worksheets, homework keys, or other sites with confidence.",
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
    faqs.push({
      question: "Can I use this instead of seeing a doctor?",
      answer:
        "No. These tools are for education and personal goal-setting only. Seek licensed medical care for diagnosis, treatment, pregnancy, eating disorders, or any concerning symptoms.",
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
  } else if (calc.category === "science-engineering") {
    faqs.push({
      question: "Does this include real-world losses and tolerances?",
      answer:
        "Usually not. Textbook identities assume ideal conditions unless a field asks for efficiency, friction, or tolerance. Apply your own safety factors for designs that affect safety or compliance.",
    });
  } else if (calc.category === "business" || calc.category === "education") {
    faqs.push({
      question: `When should I use another ${catName} calculator instead?`,
      answer: `If your problem needs a different primary output (for example a schedule, a unit change, or a related identity), pick a related tool from the sidebar or search MyCalcsWorld — each page stays focused so inputs stay unambiguous.`,
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
  const catTips: Partial<Record<CategorySlug, string>> = {
    finance:
      "Optional: switch currency display and re-run with a ±1% rate shock to see payment or growth sensitivity.",
    math: "Optional: recompute one intermediate step on paper using the formula notes to confirm the live panel.",
    "health-fitness":
      "Optional: re-run with a second activity level or body-weight scenario to see a planning range.",
    conversion: "Optional: convert back the other direction to confirm the factor round-trips cleanly.",
    "date-time": "Optional: flip start/end or change the as-of date by one day to see inclusive/exclusive behavior.",
    commodities: "Optional: change purity/karat by one step to see how sensitive melt value is to fineness.",
  };
  return {
    title: `Worked example — ${calc.name}`,
    steps: [
      `Start from the on-page defaults (${defaults}). These are realistic starting points, not recommendations.`,
      "Change one input at a time and watch the result panel update so you can see each field’s effect on the headline output.",
      "If a chart or table appears, skim it for the pattern (growth curve, amortization mix, snapshots) — not only the top-line number.",
      "Compare the output to a hand calculation or spreadsheet using the formula notes on this page.",
      catTips[calc.category] ||
        "Optional: open a related tool from the sidebar if your real scenario needs a neighboring metric.",
    ],
    result: `With the default inputs, the live ${calc.name} shows the authoritative rounded result for this build of MyCalcsWorld. Re-run with your own numbers for a personalized estimate — illustrative only, not professional advice.`,
  };
}

function buildHowTo(calc: CalculatorMeta): {
  howToUse: string[];
  howToUseUS: string[];
  howToUseIndia: string[];
} {
  const howToUse = [
    `Open the ${calc.name} and review the labeled input fields and any unit hints.`,
    "Enter your values (or start from the defaults) — results update as you type or when you press Calculate.",
    "Read the primary result(s) in the panel, including any chart or table when shown.",
    "Scroll to How to interpret, the worked example, formula notes, and FAQs before relying on the figure for a real decision.",
    "Use Related tools / You might also like if you need a neighboring calculation in the same category.",
  ];
  const extra = categoryHowToExtra[calc.category] || [];
  const howToUseUS = [
    `Use ${calc.name} with the units and conventions commonly quoted in U.S. / global English docs for this topic.`,
    ...howToUse.slice(1, 3),
    "If a bank, insurer, school, or lab uses a different definition of an input, match their definition before comparing.",
    ...extra.slice(0, 2),
  ];
  const howToUseIndia = [
    `Use ${calc.name} with India-relevant units where applicable (INR via the currency picker on money tools, metric measures, financial-year or academic-year context).`,
    ...howToUse.slice(1, 3),
    "Confirm bank/NBFC, CBSE/university, clinic, or BIS-style conventions when your institution publishes its own method.",
    ...extra.slice(0, 2),
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
  const keywords =
    calc.keywords?.slice(0, 6).join(", ") || calc.slug.replace(/-/g, " ");
  const interpret =
    categoryInterpret[calc.category] || [
      "Primary outputs appear at the top of the result panel; secondary breakdowns, charts, and tables follow when the tool supports them.",
      "If a hint appears under a result, it explains a definition (for example what was included or excluded).",
      "Re-run with optimistic and pessimistic inputs to see sensitivity before making a decision.",
      "Educational estimate only — verify critical numbers with a qualified professional or primary source.",
    ];

  return {
    seoTitle: `${calc.name} — Free Online Tool with Guide & FAQ`,
    seoDescription: `${calc.description} Free ${cat?.name || "online"} calculator on MyCalcsWorld with step-by-step how-to, worked example, formula notes, and FAQs — no signup, mobile-friendly.`.replace(
      /\s+/g,
      " "
    ).trim(),
    overview: `${lead}\n\nThe ${calc.name} ${calc.description.replace(/\.$/, "")}. People often find this page by searching for ${keywords}.\n\nBelow the live form you get interpretation tips, region-aware how-to steps (India and U.S./global where relevant), a worked example you can mirror, formula notes, and FAQs — written so the page stays useful even when you are comparing against bank worksheets, homework keys, lab manuals, or other calculator sites. Charts and tables appear in the results panel whenever this tool’s engine provides them.`,
    howToUse,
    howToUseUS,
    howToUseIndia,
    howToInterpret: interpret,
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
    override.overview && override.overview.trim().length >= 120
      ? override.overview
      : override.overview && override.overview.trim().length >= 80
        ? `${override.overview.trim()}\n\n${defaults.overview}`
        : defaults.overview;
  return {
    seoTitle: override.seoTitle || defaults.seoTitle,
    seoDescription: override.seoDescription || defaults.seoDescription,
    overview,
    howToUse: preferLongerSteps(override.howToUse, defaults.howToUse, 4),
    howToUseUS: preferLongerSteps(override.howToUseUS, defaults.howToUseUS, 3),
    howToUseIndia: preferLongerSteps(
      override.howToUseIndia,
      defaults.howToUseIndia,
      3
    ),
    howToInterpret: preferLongerSteps(
      override.howToInterpret,
      defaults.howToInterpret,
      3
    ),
    workedExample: (() => {
      const o = override.workedExample;
      const d = defaults.workedExample;
      if (!o) return d;
      if ((o.steps?.length ?? 0) >= 3) return o;
      if (!d) return o;
      const seen = new Set(o.steps.map((s) => s.toLowerCase()));
      const steps = [...o.steps];
      for (const s of d.steps) {
        if (seen.has(s.toLowerCase())) continue;
        steps.push(s);
        if (steps.length >= 3) break;
      }
      return {
        title: o.title || d.title,
        steps: steps.length ? steps : d.steps,
        result: o.result || d.result,
      };
    })(),
    faqs: mergeFaqs(defaults.faqs, override.faqs),
    formulaNote:
      override.formulaNote && override.formulaNote.length >= 80
        ? override.formulaNote
        : override.formulaNote
          ? `${override.formulaNote} ${defaults.formulaNote || ""}`.trim()
          : defaults.formulaNote,
  };
}
