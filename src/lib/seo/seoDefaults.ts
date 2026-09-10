import type {
  CalculatorMeta,
  CalculatorSeoContent,
  CategorySlug,
  FaqItem,
  FieldDef,
  WorkedExample,
} from "@/lib/types";
import { categoryMap } from "@/lib/categories";

function fieldList(fields?: FieldDef[], max = 6): string {
  if (!fields?.length) return "the inputs on the form";
  return fields
    .slice(0, max)
    .map((f) => {
      const unit = f.suffix ? ` (${f.suffix})` : f.prefix === "$" ? " (money)" : "";
      return f.label + unit;
    })
    .join(", ");
}

function fieldDefaults(fields?: FieldDef[]): string {
  if (!fields?.length) return "the default inputs shown on the form";
  const bits = fields
    .filter((f) => f.defaultValue !== undefined && f.defaultValue !== null && f.defaultValue !== "")
    .slice(0, 5)
    .map((f) => {
      const unit = f.suffix ? ` ${f.suffix}` : "";
      const pre = f.prefix === "$" ? "" : f.prefix || "";
      return `${f.label.toLowerCase()} ${pre}${f.defaultValue}${unit}`;
    });
  return bits.length ? bits.join(", ") : "the default inputs shown on the form";
}

function firstFieldDefaults(fields?: FieldDef[]): { label: string; value: string; suffix: string }[] {
  if (!fields?.length) return [];
  return fields
    .filter((f) => f.defaultValue !== undefined && f.defaultValue !== null && f.defaultValue !== "")
    .slice(0, 4)
    .map((f) => ({
      label: f.label,
      value: String(f.defaultValue),
      suffix: f.suffix || (f.prefix === "$" ? "" : ""),
    }));
}

function audienceFor(cat: CategorySlug): string {
  const map: Record<CategorySlug, string> = {
    finance:
      "homebuyers, loan shoppers, investors, freelancers, and anyone comparing a bank quote to an independent worksheet",
    math: "students, tutors, contest-prep learners, and professionals who need a transparent check against homework or hand math",
    "health-fitness":
      "people setting fitness goals, coaches doing quick estimates, and anyone curious about BMI, calories, or training numbers — not a clinic visit",
    conversion:
      "engineers, cooks, travelers, students, and DIY folks who need a clean unit swap without hunting conversion tables",
    "date-time":
      "HR teams, students, travelers, and planners who need age, day counts, or schedule math without a spreadsheet",
    "everyday-life":
      "households splitting bills, road-trippers estimating fuel, DIY planners, and anyone doing practical day-to-day arithmetic",
    "science-engineering":
      "lab students, makers, and engineers doing first-cut checks with textbook identities before applying real tolerances",
    business:
      "founders, freelancers, analysts, and managers pressure-testing margins, break-even, and hourly↔salary math",
    education:
      "students and teachers planning grades, GPA, and “what final do I need?” targets against a real syllabus",
    statistics:
      "students and analysts validating means, spreads, combinations, and classical probabilities on small datasets",
    commodities:
      "jewelry buyers, bullion curious investors, and anyone estimating melt or spot notionals before talking to a dealer",
  };
  return map[cat] || "anyone who wants a clear, browser-based estimate";
}

function formulaFallback(calc: CalculatorMeta): string {
  const cat = calc.category;
  const map: Partial<Record<CategorySlug, string>> = {
    finance:
      "Results use standard time-value-of-money and cash-flow relationships (interest, amortization, growth, tax helpers) implemented in MyCalcsWorld formula modules. Exact algebraic forms appear on flagship pages; elsewhere the live form is the source of truth for rounding and edge cases. Day-count and compounding conventions can differ from a specific bank product — always cross-check against your Loan Estimate, sanction letter, or prospectus before committing money.",
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
  return `${base} For the ${calc.name}, the labeled fields (${fieldList(calc.fields, 4)}) drive the live result panel.`;
}

const categoryWhenToUse: Record<CategorySlug, (name: string) => string[]> = {
  finance: (name) => [
    `Use the ${name} when you want a second opinion on a bank, broker, or app quote before you sign.`,
    "Compare two scenarios side by side (rate, tenure, contribution) by changing one input at a time.",
    "Stress-test a worse rate or shorter horizon so the payment or growth figure is not a surprise later.",
  ],
  math: (name) => [
    `Use the ${name} to check homework, contest practice, or a quick engineering sketch.`,
    "Mirror the same numbers on paper using the formula notes when exams ban calculators.",
    "Explore how each coefficient or dimension moves the answer before you commit to a write-up.",
  ],
  "health-fitness": (name) => [
    `Use the ${name} for educational goal-setting and coach-style ballparks — not diagnosis.`,
    "Re-run with honest activity or measurement inputs to see a planning range, not a single magic number.",
    "Bring the output to a clinician or dietitian if you plan major diet or training changes.",
  ],
  conversion: (name) => [
    `Use the ${name} when a recipe, drawing, or travel doc mixes unit systems.`,
    "Convert once, then convert back to confirm the factor round-trips cleanly.",
    "Prefer this over mental math when a wrong unit family (oz vs lb, cm vs in) would be costly.",
  ],
  "date-time": (name) => [
    `Use the ${name} for age, day counts, or schedule spans without spreadsheet gymnastics.`,
    "Confirm inclusive vs exclusive day counting against the institution that sets the deadline.",
    "Adjust manually for public holidays when your bank, court, or school skips them.",
  ],
  "everyday-life": (name) => [
    `Use the ${name} for dinner splits, trips, DIY lists, and other practical planning.`,
    "Treat the number as a plan, then round in a way your group or project agrees on.",
    "Verify structural or tax-critical numbers with a professional when stakes are high.",
  ],
  "science-engineering": (name) => [
    `Use the ${name} for homework checks and first-cut design estimates under textbook assumptions.`,
    "Keep SI (or the form’s stated units) consistent — a wrong unit ruins precision.",
    "Apply safety factors and real component tolerances before anything safety-critical.",
  ],
  business: (name) => [
    `Use the ${name} to pressure-test pricing, staffing, or ROI before opening a full spreadsheet model.`,
    "Separate margin from markup when pricing products so you do not undercharge.",
    "Add taxes, benefits, and financing yourself unless the form already asks for them.",
  ],
  education: (name) => [
    `Use the ${name} to plan GPA or “final needed” targets against your syllabus weights.`,
    "Match your school’s scale (4.0, 10-point, percentage) exactly before trusting a target.",
    "Ask the registrar or teacher when curves, dropped scores, or policies are unclear.",
  ],
  statistics: (name) => [
    `Use the ${name} to validate homework summaries or exploratory stats on small samples.`,
    "State sample vs population formulas before comparing to a textbook key.",
    "Move to a full stats package for inference, A/B tests, or publication work.",
  ],
  commodities: (name) => [
    `Use the ${name} to estimate melt or spot notionals before you visit a dealer.`,
    "Verify karat/fineness hallmarks — purity errors dominate jewelry estimates.",
    "Expect retail tickets to add making charges, premiums, and taxes on top of melt value.",
  ],
};

const categoryMistakes: Record<CategorySlug, (name: string, fields: string) => string[]> = {
  finance: (name, fields) => [
    `Entering APR when the ${name} expects a nominal note rate (or the reverse) — that quietly skews payments.`,
    "Forgetting fees, insurance, GST, or escrow that your real product includes outside the core fields: " + fields + ".",
    "Treating display currency as FX conversion — use the dedicated converter when you need an actual rate.",
    "Ignoring that early loan years are interest-heavy; the schedule matters as much as the EMI headline.",
  ],
  math: (name, fields) => [
    `Mixing degrees and radians, or skipping parentheses, when the ${name} assumes a specific convention.`,
    "Comparing rounded display values to an answer key that wants exact fractions.",
    "Entering the wrong field order among: " + fields + ".",
    "Assuming a unique root when the equation can have two (or none).",
  ],
  "health-fitness": (name, fields) => [
    "Mixing cm/in or kg/lb on fields: " + fields + " — unit mix-ups swing BMI and calorie outputs hard.",
    "Optimistic activity levels that produce calorie targets you cannot sustain.",
    `Using the ${name} as a diagnosis instead of an educational estimate.`,
    "Applying adult formulas to pediatric, pregnant, or clinical populations without guidance.",
  ],
  conversion: (name, fields) => [
    "Picking the wrong unit family (e.g. oz vs lb, ml vs fl oz) among: " + fields + ".",
    "Scaling temperatures as if °C were a simple ratio like kelvin differences.",
    "Expecting volume↔weight without density for cooking ingredients.",
    `Assuming the ${name} is a legal-metrology certificate — labs need primary standards.`,
  ],
  "date-time": (name, fields) => [
    "Crossing timezones or midnight without matching the convention on: " + fields + ".",
    "Forgetting leap days on long age or anniversary spans.",
    "Assuming business-day mode removes public holidays (most tools only skip weekends).",
    `Using the ${name} as a court or bank deadline without confirming their calendar.`,
  ],
  "everyday-life": (name, fields) => [
    "Forgetting to agree how to round coins or tip when splitting among friends.",
    "Ignoring waste factors on DIY quantities when the form labels them separately.",
    "Treating fuel math as exact when traffic and driving style change real consumption.",
    "Misreading fields: " + fields + ".",
  ],
  "science-engineering": (name, fields) => [
    "Mixing SI and customary units across: " + fields + ".",
    "Ignoring that textbook models omit friction, temperature drift, or non-ohmic behavior.",
    "Trusting excessive decimal places when the input precision was coarse.",
    `Skipping safety factors after the ${name} gives an idealized first cut.`,
  ],
  business: (name, fields) => [
    "Confusing margin (profit ÷ revenue) with markup (profit ÷ cost).",
    "Leaving taxes, benefits, or inventory out of: " + fields + " when they matter to the decision.",
    "Using break-even as a cash forecast without working-capital timing.",
    `Treating the ${name} as accounting software instead of transparent management math.`,
  ],
  education: (name, fields) => [
    "Wrong weight percentages among: " + fields + " — a 5% weight error swings “final needed” a lot.",
    "Mixing 4.0 and 10-point GPA scales.",
    "Ignoring dropped scores or curves your syllabus actually uses.",
    `Relying on the ${name} over the registrar when transcript rules conflict.`,
  ],
  statistics: (name, fields) => [
    "Using population variance when the homework wants the sample formula (or reverse).",
    "Typing unsorted or incomplete lists into: " + fields + ".",
    "Generalizing a tiny sample as if it were a population claim.",
    `Expecting the ${name} to run a full hypothesis test suite.`,
  ],
  commodities: (name, fields) => [
    "Wrong karat/fineness on: " + fields + " — the #1 jewelry melt error.",
    "Treating delayed educational spot quotes as tradeable dealer bids.",
    "Forgetting making charges, premiums, and GST/sales tax on retail tickets.",
    `Using the ${name} as investment advice instead of a notional estimate.`,
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

function buildFaqs(calc: CalculatorMeta): FaqItem[] {
  const catName = categoryMap[calc.category]?.name || calc.category;
  const fields = fieldList(calc.fields, 5);
  const defaults = fieldDefaults(calc.fields);
  const faqs: FaqItem[] = [
    {
      question: `What does the ${calc.name} on MyCalcsWorld actually compute?`,
      answer: `${calc.description} You enter ${fields}, and the result panel updates in your browser — free, no signup. Below the form you will find when-to-use tips, common mistakes, a worked example, formula notes, and FAQs written for this specific tool (not a generic category blurb).`,
    },
    {
      question: `How do I use the ${calc.name} step by step?`,
      answer: `Start from the defaults (${defaults}) or type your own values into ${fields}. Watch the live results (and any chart or table). Then scroll to interpretation tips and the worked example before you rely on the figure for a real decision. Related ${catName} tools sit in the sidebar and “You might also like” section.`,
    },
    {
      question: `Who is the ${calc.name} for?`,
      answer: `It helps ${audienceFor(calc.category)}. If your case needs a neighboring metric, jump to a related tool rather than forcing the wrong inputs into this form.`,
    },
    {
      question: "Is this result financial, medical, or professional advice?",
      answer:
        "No. MyCalcsWorld outputs are educational estimates for illustration only. They are not a substitute for a licensed advisor, clinician, attorney, engineer of record, or tax professional — especially when money, health, safety, or legal outcomes are at stake.",
    },
    {
      question: "Will my numbers be stored on a server?",
      answer:
        "Calculations run locally in your browser session. We do not require an account to use this tool. Recently-used shortcuts (if you enable them on the home page) stay in your device’s localStorage only. See the Privacy page for analytics and ads.",
    },
  ];

  if (calc.category === "finance") {
    faqs.push({
      question: "Can I switch currency display (INR, USD, EUR…)?",
      answer:
        "Yes. Use the currency picker on finance tools to format money in USD, INR, EUR, GBP, AED, and other supported codes. This changes display symbols, not FX conversion of the underlying inputs (unless you are on the dedicated converter).",
    });
    faqs.push({
      question: `Why might my bank show a different figure than this ${calc.name}?`,
      answer:
        "Live products may use different day-count conventions, compounding schedules, fees, taxes, or rounding. Treat this page as an independent cross-check, then confirm with your statement, sanction letter, or advisor.",
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
  } else {
    faqs.push({
      question: `When should I use another ${catName} calculator instead of ${calc.name}?`,
      answer: `If your problem needs a different primary output (for example a schedule, a unit change, or a related identity), pick a related tool from the sidebar or search MyCalcsWorld — each page stays focused so inputs stay unambiguous.`,
    });
  }

  if (calc.keywords?.some((k) => /emi|sip|gst|vat|loan|mortgage|currency|fx/i.test(k))) {
    faqs.push({
      question: "Can I use my local currency?",
      answer:
        "Yes — choose USD, EUR, INR, GBP, AED, or another supported code in the currency picker where money fields appear. Tax and product rules still vary by lender and jurisdiction.",
    });
  }

  faqs.push({
    question: `What are common mistakes on the ${calc.name}?`,
    answer: `The biggest gotchas are covered in the “Common mistakes” section on this page — usually wrong units, mixing similar definitions, or ignoring fees/assumptions outside ${fields}. Skim that list before you screenshot a result.`,
  });

  const computed = summarizeCompute(calc);
  if (computed) {
    faqs.push({
      question: `What do the default numbers show on the ${calc.name}?`,
      answer: `With the demo defaults (${defaults}), the live panel currently shows: ${computed.headline}. Treat that as a worked illustration — replace the defaults with your own figures for a personalized estimate.`,
    });
  }

  if (calc.formulaNote?.trim()) {
    faqs.push({
      question: `Where is the formula for the ${calc.name}?`,
      answer: `Open the Formula notes section on this page (and the “Formula / how it works” disclosure next to results when present). Registry note: ${calc.formulaNote.trim().slice(0, 220)}${calc.formulaNote.trim().length > 220 ? "…" : ""}`,
    });
  }

  return faqs.slice(0, 8);
}

function defaultValuesRecord(fields?: FieldDef[]): Record<string, string> {
  const init: Record<string, string> = {};
  if (!fields) return init;
  for (const f of fields) {
    init[f.id] =
      f.defaultValue !== undefined && f.defaultValue !== null
        ? String(f.defaultValue)
        : "";
  }
  return init;
}

function summarizeCompute(
  calc: CalculatorMeta
): { lines: string[]; headline: string } | null {
  if (!calc.compute || !calc.fields?.length) return null;
  try {
    const values = defaultValuesRecord(calc.fields);
    const out = calc.compute(values);
    if (!out || "error" in out) return null;
    const primary = out.filter((r) => r.emphasize).slice(0, 3);
    const pick = (primary.length ? primary : out).slice(0, 4);
    if (!pick.length) return null;
    const lines = pick.map((r) => {
      const hint = r.hint ? ` — ${r.hint}` : "";
      return `${r.label}: ${r.value}${hint}`;
    });
    const headline = pick
      .slice(0, 2)
      .map((r) => `${r.label} ${r.value}`)
      .join("; ");
    return { lines, headline };
  } catch {
    return null;
  }
}

function slugCue(slug: string): string {
  return slug.replace(/-/g, " ");
}

function buildWorkedExample(calc: CalculatorMeta): WorkedExample {
  const defaults = fieldDefaults(calc.fields);
  const pairs = firstFieldDefaults(calc.fields);
  const pairLines = pairs.map(
    (p) => `${p.label} = ${p.value}${p.suffix ? ` ${p.suffix}` : ""}`
  );
  const computed = summarizeCompute(calc);
  const catTips: Partial<Record<CategorySlug, string>> = {
    finance:
      "Optional: switch currency display and re-run with a ±1% rate shock to see payment or growth sensitivity.",
    math: "Optional: recompute one intermediate step on paper using the formula notes to confirm the live panel.",
    "health-fitness":
      "Optional: re-run with a second activity level or body-weight scenario to see a planning range.",
    conversion: "Optional: convert back the other direction to confirm the factor round-trips cleanly.",
    "date-time": "Optional: flip start/end or change the as-of date by one day to see inclusive/exclusive behavior.",
    commodities: "Optional: change purity/karat by one step to see how sensitive melt value is to fineness.",
    business: "Optional: toggle margin vs markup thinking and confirm you did not mix the two definitions.",
    education: "Optional: nudge a weight by 5% to see how sensitive “final needed” is to syllabus assumptions.",
    statistics: "Optional: add or remove one data point to see how mean/spread move.",
    "everyday-life": "Optional: change the split or tip percent by a small step to match your group’s norm.",
    "science-engineering": "Optional: scale one input by 10% and confirm the output moves in the expected direction.",
  };

  const inputLine = pairLines.length
    ? `Use these labeled inputs (the form defaults): ${pairLines.join("; ")}.`
    : `Enter realistic values into each labeled field on the ${calc.name}.`;

  const steps = [
    `Open the ${calc.name} (${slugCue(calc.slug)}) and note the starting defaults (${defaults}). These are demo numbers — not recommendations.`,
    inputLine,
    computed
      ? `Read the live result panel. With those defaults, MyCalcsWorld currently reports: ${computed.lines.join(" · ")}.`
      : "Watch the result panel update. If a chart or table appears, skim the pattern (growth curve, schedule mix, snapshots) — not only the top-line number.",
    `Sanity-check against a hand calculation or spreadsheet using the formula notes for this ${calc.name}.`,
    catTips[calc.category] ||
      "Optional: open a related tool from the sidebar if your real scenario needs a neighboring metric.",
  ];

  const result = computed
    ? `With defaults (${defaults}), the ${calc.name} shows: ${computed.headline}. Re-run with your own numbers for a personalized estimate — illustrative only, not professional advice.`
    : `With the default inputs (${defaults}), the live ${calc.name} on MyCalcsWorld shows the authoritative rounded result for this build. Re-run with your own numbers for a personalized estimate — illustrative only, not professional advice.`;

  const titleBits = pairLines.slice(0, 2).join(", ");
  return {
    title: titleBits
      ? `Worked example — ${calc.name} (${titleBits})`
      : `Worked example — ${calc.name}`,
    steps,
    result,
  };
}

function buildHowTo(calc: CalculatorMeta): {
  howToUse: string[];
} {
  const fields = fieldList(calc.fields, 6);
  const howToUse = [
    `Open the ${calc.name} and review the labeled fields: ${fields}.`,
    "Enter your values (or start from the defaults) — results update as you type or when you press Calculate.",
    "Read the primary result(s) in the panel, including any chart or table when shown. Use Copy / Share if you want a plain-text summary.",
    "Scroll to When to use, Common mistakes, How to interpret, the worked example, formula notes, and FAQs before relying on the figure.",
    "Use Related tools / You might also like if you need a neighboring calculation in the same category.",
  ];
  const extra = categoryHowToExtra[calc.category] || [];
  // Enrich the shared how-to with a couple of category tips when available
  const enriched = [
    ...howToUse,
    "If a bank, insurer, school, or lab uses a different definition of an input, match their definition before comparing.",
    ...extra.slice(0, 2),
  ];
  // Keep a focused 5–7 steps
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const s of enriched) {
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(s);
    if (merged.length >= 7) break;
  }
  return { howToUse: merged };
}

function relatedHint(calc: CalculatorMeta): string {
  if (!calc.related?.length) return "";
  const names = calc.related
    .slice(0, 3)
    .map((s) => s.replace(/-/g, " "))
    .join(", ");
  return ` Nearby tools people often open next: ${names}.`;
}

function buildOverview(calc: CalculatorMeta): string {
  const cat = categoryMap[calc.category];
  const fields = fieldList(calc.fields, 6);
  const keywords =
    calc.keywords?.slice(0, 5).join(", ") || calc.slug.replace(/-/g, " ");
  const desc = calc.description.replace(/\.$/, "");
  const defaults = fieldDefaults(calc.fields);
  const computed = summarizeCompute(calc);

  const openings: Partial<Record<CategorySlug, string>> = {
    finance: `Money math should be transparent. The ${calc.name} on MyCalcsWorld gives you a browser-side estimate you can compare to a bank or broker worksheet — with multi-currency formatting (USD, EUR, INR, GBP, AED, and more) via the currency picker when money fields appear.`,
    math: `Clear math beats a black-box app. The ${calc.name} on MyCalcsWorld keeps inputs labeled and formula notes visible so you can reconcile with a textbook or homework key.`,
    "health-fitness": `Fitness numbers are starting points, not diagnoses. The ${calc.name} on MyCalcsWorld uses published educational formulas so you can plan goals — then confirm with a clinician when it matters.`,
    conversion: `Unit mix-ups are expensive. The ${calc.name} on MyCalcsWorld applies clear SI / customary factors so homework, DIY, and travel docs stay consistent.`,
    "date-time": `Date math without spreadsheet gymnastics. The ${calc.name} on MyCalcsWorld handles the calendar details the form documents (including leap years where relevant).`,
    "everyday-life": `Practical planning, not paperwork. The ${calc.name} on MyCalcsWorld is built for dinners, trips, and weekend projects with numbers you can tweak instantly.`,
    "science-engineering": `Textbook physics/chemistry, SI-friendly. The ${calc.name} on MyCalcsWorld is for homework checks and first-cut estimates under idealized assumptions unless noted.`,
    business: `Management math you can explain. The ${calc.name} on MyCalcsWorld keeps margin, markup, break-even, and similar identities transparent before you open a full model.`,
    education: `Syllabus-aware planning. The ${calc.name} on MyCalcsWorld helps you align weights and scales to your school’s published policy.`,
    statistics: `Classical stats, no mystery. The ${calc.name} on MyCalcsWorld uses textbook definitions so homework checks stay reproducible.`,
    commodities: `Melt and spot notionals, not dealer tickets. The ${calc.name} on MyCalcsWorld estimates weight × purity × reference price — retail still adds premiums and taxes.`,
  };

  const lead =
    openings[calc.category] ||
    `The ${calc.name} on MyCalcsWorld is a free, no-signup tool that runs entirely in your browser.`;

  const demo = computed
    ? ` Demo defaults (${defaults}) currently resolve to ${computed.headline} in the live panel — change any field to explore sensitivity.`
    : ` Start from the demo defaults (${defaults}) or type your own values; the result panel updates as you go.`;

  return `${lead}

What it does: ${desc}. Typical inputs: ${fields || "the fields on the form"}. People often land here searching for ${keywords}.${demo}

Who it helps: ${audienceFor(calc.category)}.${relatedHint(calc)}

Below the live form you get MyCalcsWorld-specific guidance — when to use this ${calc.name}, common mistakes, how to interpret results, step-by-step how-to, a worked example with real numbers, formula notes, and FAQs. Charts and tables appear in the results panel whenever this engine provides them. ${cat?.name || "Category"} related tools are linked so you can jump without starting from search.`;
}

function toolSpecificWhen(calc: CalculatorMeta): string[] {
  const name = calc.name;
  const fields = fieldList(calc.fields, 4);
  const base = categoryWhenToUse[calc.category]?.(name) || [
    `Reach for the ${name} when you need a clear, browser-based estimate for this topic.`,
    "Change one input at a time to learn sensitivity before you decide.",
    "Cross-check critical outcomes with a primary source or professional.",
  ];
  const extra: string[] = [
    `Reach for this page when your question is specifically about “${slugCue(calc.slug)}” rather than a neighboring ${categoryMap[calc.category]?.name || "category"} metric.`,
  ];
  if (fields && fields !== "the inputs on the form") {
    extra.push(
      `Have ${fields} ready — those labeled fields are what drive the ${name} result panel.`
    );
  }
  if (calc.related?.length) {
    extra.push(
      `If you need ${calc.related[0].replace(/-/g, " ")} instead, jump via Related tools rather than forcing the wrong inputs here.`
    );
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...base, ...extra]) {
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
    if (out.length >= 5) break;
  }
  return out;
}

function toolSpecificMistakes(calc: CalculatorMeta): string[] {
  const name = calc.name;
  const fields = fieldList(calc.fields, 5);
  const base =
    categoryMistakes[calc.category]?.(name, fields) || [
      `Entering values in the wrong units among: ${fields}.`,
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ];
  const extras: string[] = [
    `Leaving a required field blank among ${fields} — the ${name} cannot invent missing inputs.`,
    `Comparing the ${name} headline to a product that uses a different definition of the same label (rate type, inclusive days, sample vs population, margin vs markup).`,
  ];
  if (calc.fields?.some((f) => f.suffix || f.prefix === "$")) {
    extras.push(
      "Ignoring the unit suffix / currency prefix printed on each field — the most common silent error on this form."
    );
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...base, ...extras]) {
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
    if (out.length >= 5) break;
  }
  return out;
}

function toolSpecificInterpret(calc: CalculatorMeta): string[] {
  const base = categoryInterpret[calc.category] || [
    "Primary outputs appear at the top of the result panel; secondary breakdowns, charts, and tables follow when the tool supports them.",
    "If a hint appears under a result, it explains a definition (for example what was included or excluded).",
    "Re-run with optimistic and pessimistic inputs to see sensitivity before making a decision.",
    "Educational estimate only — verify critical numbers with a qualified professional or primary source.",
  ];
  const extras = [
    `On the ${calc.name}, read the large primary result first, then secondary totals, then any chart or table.`,
    calc.fields?.length
      ? `Each result is driven only by the labeled inputs (${fieldList(calc.fields, 4)}); anything not on the form (fees, holidays, clinical adjustments) is outside this estimate.`
      : `Anything not collected on this form is outside the ${calc.name} estimate.`,
    "If the form offers More options, open them only when you need advanced controls — the essentials stay above.",
  ];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of [...extras, ...base]) {
    const k = s.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
    if (out.length >= 5) break;
  }
  return out;
}

/** Substantial default SEO/detail sections for any registry calculator. */
export function buildDefaultCalculatorSeo(calc: CalculatorMeta): CalculatorSeoContent {
  const cat = categoryMap[calc.category];
  const { howToUse } = buildHowTo(calc);
  return {
    seoTitle: `${calc.name} — Free Online Tool with Guide & FAQ`,
    seoDescription: `${calc.description} Free ${cat?.name || "online"} calculator on MyCalcsWorld with step-by-step how-to, worked example, common mistakes, and FAQs — no signup.`.replace(
      /\s+/g,
      " "
    ).trim(),
    overview: buildOverview(calc),
    whenToUse: toolSpecificWhen(calc),
    commonMistakes: toolSpecificMistakes(calc),
    howToUse,
    howToInterpret: toolSpecificInterpret(calc),
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
    whenToUse: preferLongerSteps(override.whenToUse, defaults.whenToUse, 3),
    commonMistakes: preferLongerSteps(
      override.commonMistakes,
      defaults.commonMistakes,
      3
    ),
    howToUse: preferLongerSteps(override.howToUse, defaults.howToUse, 4),
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
