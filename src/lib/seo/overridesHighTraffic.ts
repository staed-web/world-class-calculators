import type { CalculatorSeoContent } from "@/lib/types";

/**
 * Extra depth for ~high-traffic / named planning tools that were still on
 * thinner stubs. Unique MyCalcsWorld voice; merged after base overrides.
 */
export const calculatorSeoHighTraffic: Record<string, CalculatorSeoContent> = {
  gpa: {
    seoTitle: "GPA Calculator — Weighted Grade Point Average (4.0 Scale)",
    seoDescription:
      "Calculate weighted GPA from course grades and credit hours on a 4.0 scale. Free MyCalcsWorld education tool with worked example and FAQs.",
    formulaNote:
      "Weighted GPA = Σ(grade_points × credits) / Σ(credits).\nOn a classic unweighted 4.0 scale, A=4.0, A−=3.7, B+=3.3, B=3.0, and so on (confirm your school’s table).\nWorked check: grades/credits 4.0×3 + 3.7×3 + 3.3×4 + 3.0×2 → quality points 12+11.1+13.2+6 = 42.3; credits 12 → GPA = 42.3/12 = 3.525.",
    overview:
      "A GPA calculator turns course grades and credit hours into a single weighted average — the number colleges, scholarships, and employers often glance at first. MyCalcsWorld’s GPA tool expects one course per line as grade,credits (for example 3.7,3 for an A− worth three credits) on a 4.0-style scale.\n\nIt is built for transparent planning: see how one hard class moves the average, compare “what if I get a B vs an A,” and reconcile with your registrar’s published conversion table. Weighted AP/IB boosts, pass/fail, and repeated-course policies differ by school — match their rules before treating a target as official.\n\nEducational estimate only — not a transcript.",
    whenToUse: [
      "Estimating semester or cumulative GPA before grades post.",
      "Stress-testing how one course grade changes the average.",
      "Checking scholarship GPA thresholds against realistic grades.",
      "Explaining weighted credits to a student or parent.",
      "Converting a quick planning list into a single 4.0-style number.",
    ],
    commonMistakes: [
      "Using percent scores (e.g. 92) when the form expects grade points (e.g. 3.7).",
      "Forgetting credit hours — unweighted averages mis-rank heavy courses.",
      "Mixing 4.0 and 10-point scales in the same list.",
      "Ignoring school rules for repeats, withdrawals, or pass/fail.",
      "Treating this browser estimate as an official registrar transcript.",
    ],
    howToUse: [
      "Open the GPA Calculator and read the Courses textarea hint.",
      "Enter one course per line as grade,credits (demo: 4,3 then 3.7,3 …).",
      "Use your school’s grade-point table (A=4.0, A−=3.7, …) unless told otherwise.",
      "Read the weighted GPA in the result panel.",
      "Optional: change one grade to see sensitivity before a final exam.",
      "If you need percent↔GPA conversion, open the related GPA↔percentage tool.",
    ],
    howToInterpret: [
      "Primary result is credit-weighted GPA on the scale you entered.",
      "Heavier-credit courses move the average more than light electives.",
      "A 3.5 planning GPA is not the same as a weighted AP transcript GPA.",
      "Compare against your syllabus / registrar policy, not a generic chart.",
      "Educational planning aid only.",
    ],
    workedExample: {
      title: "Worked example — four courses on a 4.0 scale",
      steps: [
        "Courses: 4.0 (3 cr), 3.7 (3 cr), 3.3 (4 cr), 3.0 (2 cr).",
        "Quality points = 4×3 + 3.7×3 + 3.3×4 + 3×2 = 12 + 11.1 + 13.2 + 6 = 42.3.",
        "Credits = 3+3+4+2 = 12.",
        "GPA = 42.3 / 12 = 3.525.",
        "Enter the same lines on this page to mirror live rounding.",
      ],
      result: "About 3.53 weighted GPA for those four courses — confirm your school’s grade table.",
    },
    faqs: [
      {
        question: "How do I enter courses?",
        answer:
          "One course per line as grade,credits — for example 3.7,3. Grade is on the point scale (usually 0–4), not a percent.",
      },
      {
        question: "Is this weighted or unweighted GPA?",
        answer:
          "It is credit-weighted. It does not automatically add AP/IB bumps unless you enter the boosted grade points your school uses.",
      },
      {
        question: "What if my school uses a 10-point or percentage GPA?",
        answer:
          "Convert to the scale this form expects first, or use a dedicated percentage/GPA converter that matches your board’s policy.",
      },
      {
        question: "Do withdrawals and pass/fail count?",
        answer:
          "Policies differ. Many schools exclude pass/fail from GPA; withdrawals may or may not appear. Follow your registrar.",
      },
      {
        question: "Can I project “what final do I need?”",
        answer:
          "Use the Final Grade calculator for exam targets; use this GPA tool once you have course-level grade points.",
      },
      {
        question: "Is this official for applications?",
        answer:
          "No. It is an educational MyCalcsWorld estimate. Transcripts and counselor reports are authoritative.",
      },
    ],
  },
  age: {
    seoTitle: "Age Calculator — Exact Years, Months & Days from Date of Birth",
    seoDescription:
      "Calculate exact age in years, months, and days from date of birth to today (or any as-of date). Free MyCalcsWorld calendar tool with leap-year handling.",
  },
  "pregnancy-due-date": {
    seoTitle: "Pregnancy Due Date Calculator — EDD from LMP (Naegele’s Rule)",
    seoDescription:
      "Estimate pregnancy due date (EDD) from last menstrual period using Naegele’s rule style math. Free MyCalcsWorld tool — educational, not medical advice.",
  },
  tdee: {
    seoTitle: "Calorie / TDEE Calculator — Daily Maintenance Calories",
    seoDescription:
      "Estimate TDEE and daily maintenance calories from BMR and activity level (Mifflin–St Jeor style). Free MyCalcsWorld health planner — not medical advice.",
  },
  "salary-after-tax-in": {
    seoTitle: "Salary After Tax Calculator — Take-Home Pay Estimate",
    seoDescription:
      "Estimate take-home salary after tax-style deductions for planning. Free MyCalcsWorld finance tool — not a filing or payroll system.",
  },
  "sales-tax": {
    seoTitle: "Sales Tax Calculator — Add Tax to a Price",
    seoDescription:
      "Add sales tax (or VAT-style percent) to a price and see tax amount plus total. Free MyCalcsWorld checkout math — verify local rates.",
  },
  "simple-interest": {
    seoTitle: "Simple Interest Calculator — I = Prt",
    seoDescription:
      "Calculate simple interest with I = P × r × t. Free MyCalcsWorld finance tool with worked example — compare with compound interest when needed.",
  },
  "final-grade": {
    seoTitle: "Final Grade Calculator — Score Needed on the Final Exam",
    seoDescription:
      "Find the score you need on a final exam given current average and weights. Free MyCalcsWorld education planner with FAQs.",
  },
  "hourly-to-salary": {
    seoTitle: "Hourly to Salary Converter — Annual Pay Estimate",
    seoDescription:
      "Convert hourly wage to annual salary (and related pay views). Free MyCalcsWorld business/pay tool — benefits and overtime not included unless entered.",
  },
  discount: {
    seoTitle: "Discount Calculator — Sale Price & Percent Off",
    seoDescription:
      "Calculate sale price from percent off, or discount amount from original and sale price. Free MyCalcsWorld shopping math tool.",
  },
  percentage: {
    seoTitle: "Percentage Calculator — Percent Of, Change, Increase & Decrease",
    seoDescription:
      "Solve percent of a number, percentage change, and related percent problems instantly. Free MyCalcsWorld math tool with worked examples.",
  },
  tip: {
    seoTitle: "Tip Calculator — Tip Amount, Total & Bill Split",
    seoDescription:
      "Calculate tip, grand total, and per-person split for any bill. Free MyCalcsWorld dining tool — customs vary by country.",
  },
};

/** Named high-traffic / planning slugs (~50) we keep deep for SEO. */
export const highTrafficSlugs = [
  "mortgage",
  "loan-emi",
  "sip",
  "compound-interest",
  "daily-compound-interest",
  "percentage",
  "bmi",
  "tip",
  "salary-after-tax-in",
  "sales-tax",
  "tdee",
  "pregnancy-due-date",
  "pregnancy-week",
  "age",
  "gpa",
  "pythagoras",
  "currency-converter",
  "gst-vat",
  "cagr",
  "amortization",
  "refinance",
  "credit-card-payoff",
  "debt-payoff",
  "savings-goal",
  "retirement",
  "inflation-adjuster",
  "roi",
  "npv",
  "rule-of-72",
  "simple-interest",
  "discount",
  "bmr",
  "macros",
  "body-fat-navy",
  "final-grade",
  "hourly-to-salary",
  "break-even",
  "margin-markup",
  "scientific",
  "graphing-calculator",
  "date-difference",
  "split-bill",
  "fuel-cost",
  "temperature",
  "length",
  "weight",
  "circle",
  "average",
  "standard-deviation",
  "ohms-law",
  "gold-value",
  "metals-spot",
  "emi-extra-payments",
  "sip-growth-chart",
  "apr-vs-apy",
  "car-loan",
  "loan-affordability",
  "percentage-change",
  "percentage-of",
] as const;
