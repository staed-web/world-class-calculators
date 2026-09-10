import type { CalculatorSeoContent } from "@/lib/types";

/**
 * Flagship-parity hand-tuned guides for popular / spot-check tools.
 * Voice matches daily-compound-interest: tool-specific, MyCalcsWorld, not competitor paste.
 * Merged last so these win on overlapping keys when equally deep.
 */
export const calculatorSeoParity: Record<string, CalculatorSeoContent> = {
  mortgage: {
    seoTitle: "Mortgage Calculator — Monthly Payment, Interest & Amortization",
    seoDescription:
      "Estimate fixed-rate mortgage P&I (EMI-style) with total interest, Recharts amortization, and a year-by-year schedule. Free MyCalcsWorld guide — not a lender quote.",
    formulaNote:
      "Standard amortizing loan (same family as EMI):\nM = P · r(1+r)^n / ((1+r)^n − 1)\nwhere P is principal, r = annualRate/12/100, and n = years×12.\n\nWorked numeric check: P = 300,000, annual 6.5%, 30 years → r = 0.065/12, n = 360 → M ≈ 1,896.20. Total of payments ≈ 682,632; total interest ≈ 382,632. Taxes, insurance, PMI/MIP, and HOA are outside this P&I figure.",
    overview:
      "A mortgage calculator answers the first question every homebuyer asks: what is the principal-and-interest payment on this loan? MyCalcsWorld’s Mortgage Calculator is a full fixed-rate worksheet in our own voice — loan amount, annual rate, and term in years — then a live monthly P&I (EMI-style) result, total interest, a principal/interest/balance chart, the first 12 months, and a full year-by-year amortization table.\n\nIt is built for comparing 15- vs 30-year (or other) tenures and for sanity-checking a Loan Estimate before you sign. Format money in USD, INR, EUR, GBP, AED, and more with the currency picker. Escrow for tax and insurance is not included — add those separately for a full housing budget.\n\nEducational estimate only — not a lender commitment or financial advice.",
    whenToUse: [
      "Comparing fixed-rate quotes before you lock a purchase or refinance.",
      "Seeing how a 0.25% rate change moves the monthly payment and lifetime interest.",
      "Explaining to a co-borrower why early years are interest-heavy on a long loan.",
      "Stress-testing a shorter term (higher payment, lower interest) vs a longer term.",
      "Cross-checking a bank EMI / mortgage worksheet with an independent browser tool.",
    ],
    commonMistakes: [
      "Entering purchase price instead of the loan principal after down payment.",
      "Using APR (fee-inclusive) when this form expects the amortizing note rate.",
      "Treating P&I as full PITI — property tax, insurance, and HOA are separate.",
      "Ignoring that year-1 rows are interest-heavy; the schedule matters as much as the EMI headline.",
      "Assuming the currency picker converts FX — it only changes display formatting.",
    ],
    howToUse: [
      "Enter Loan amount (principal you will borrow) — demo default is 300000.",
      "Set Annual interest rate (%) from your lender quote (not necessarily APR).",
      "Choose Loan term in years (commonly 15 or 30).",
      "Read Monthly payment (P&I / EMI) first, then total of payments and total interest.",
      "Scroll the amortization chart and year-by-year table to see interest vs principal over time.",
      "Optional: switch display currency, then re-run with a ±0.25% rate shock for sensitivity.",
    ],
    howToInterpret: [
      "Monthly payment here is principal + interest only — add tax/insurance for PITI.",
      "Total interest assumes you keep the rate and never prepay.",
      "Year 1 snapshot usually shows interest dominating each payment on long fixed-rate loans.",
      "Shorter term → higher payment, much less lifetime interest; longer term flips that tradeoff.",
      "Charts and tables are the source of truth for the mix — not only the headline EMI.",
    ],
    workedExample: {
      title: "Worked example — $300,000 at 6.5% for 30 years",
      steps: [
        "Principal P = 300,000; annual rate 6.5% → monthly r = 0.065/12.",
        "Term n = 30 × 12 = 360 months.",
        "M = P·r(1+r)^n / ((1+r)^n − 1) ≈ 1,896.20.",
        "Total of payments ≈ 1,896.20 × 360 ≈ 682,632; total interest ≈ 382,632.",
        "Enter the same numbers on this page to mirror the live panel (authoritative rounding).",
      ],
      result:
        "About $1,896/month P&I; roughly $383k lifetime interest if you never prepay — before taxes and insurance.",
    },
    faqs: [
      {
        question: "Does this mortgage calculator include taxes and insurance?",
        answer:
          "No. It estimates principal and interest (P&I) only. Escrow for property tax, homeowners insurance, and PMI/MIP can add hundreds per month depending on location.",
      },
      {
        question: "Is APR the same as the interest rate I should enter?",
        answer:
          "Enter the nominal annual interest rate used to amortize the loan. APR includes some fees and can be higher; using APR here slightly overstates the P&I payment.",
      },
      {
        question: "How does a 15-year vs 30-year mortgage change the result?",
        answer:
          "A 15-year term usually has a higher monthly payment but far less total interest. A 30-year term lowers the monthly payment but increases lifetime interest.",
      },
      {
        question: "Can I model extra payments?",
        answer:
          "This page shows the base schedule. Use the EMI with Extra Payments or amortization tools to see how additional principal shortens the loan.",
      },
      {
        question: "Are results accurate for adjustable-rate mortgages (ARMs)?",
        answer:
          "This tool assumes a fixed rate for the full term. ARMs change after an initial period — treat the output as an estimate for the fixed-rate portion only.",
      },
      {
        question: "Is EMI the same math as a US mortgage payment?",
        answer:
          "Yes in principle — both use reducing-balance amortization with a fixed periodic payment. Labels differ; the formula family is the same.",
      },
      {
        question: "Will my numbers be stored on a server?",
        answer:
          "Calculations run in your browser. No account is required. See the Privacy page for analytics and ads.",
      },
      {
        question: "Is this a lender quote?",
        answer:
          "No. It is an educational MyCalcsWorld estimate. Confirm with your Loan Estimate, sanction letter, or lender worksheet before you commit.",
      },
    ],
  },

  "loan-emi": {
    seoTitle: "EMI Calculator — Loan EMI, Interest, Chart & Schedule",
    seoDescription:
      "Calculate equated monthly installment (EMI) for personal, auto, or home loans with interest totals, chart, and yearly schedule. Free — any display currency.",
    formulaNote:
      "EMI = P · r(1+r)^n / ((1+r)^n − 1)\nwhere P is principal, r = annual%/12/100, n = tenure in months.\n\nWorked numeric check: P = 500,000, annual 12%, n = 36 → r = 0.01 → EMI ≈ 16,607. Total payment ≈ 597,852; interest ≈ 97,852. Same amortizing family as a fixed-rate mortgage P&I.",
    overview:
      "EMI (Equated Monthly Installment) is the fixed monthly loan payment used worldwide for personal, auto, and home loans. MyCalcsWorld’s Loan / EMI Calculator shows EMI, total interest, an invested-style paydown chart, and a yearly schedule so you can compare tenures and rates transparently.\n\nEnter principal, annual rate, and tenure in months. Format money with the currency picker (USD, INR, EUR, and more). Product fees, insurance add-ons, and floating-rate resets are outside this reducing-balance estimate.\n\nEducational planning aid — not a bank sanction letter.",
    whenToUse: [
      "Comparing personal, auto, or home-loan EMI quotes before you sign.",
      "Seeing how a shorter tenure raises EMI but cuts total interest.",
      "Explaining reducing-balance interest to a co-borrower with a chart.",
      "Stress-testing a worse rate so the payment is not a surprise later.",
      "Cross-checking an NBFC or bank EMI worksheet independently.",
    ],
    commonMistakes: [
      "Entering a monthly rate when the form expects an annual percent.",
      "Using years in the tenure field when it asks for months (or the reverse).",
      "Forgetting processing fees, insurance, or GST that the real product adds.",
      "Treating floating-rate loans as forever-fixed — resets change future EMIs.",
      "Assuming display currency is an FX conversion of the principal.",
    ],
    howToUse: [
      "Enter Principal (amount sanctioned) — demo default is 500000.",
      "Enter Annual rate (%) your bank or NBFC offers.",
      "Set Tenure in months (e.g. 36 for 3 years, 240 for 20 years).",
      "Read EMI first, then total payment and total interest.",
      "Skim the chart and yearly schedule — early years are interest-heavy.",
      "Re-run with a different tenure or rate to compare scenarios side by side.",
    ],
    howToInterpret: [
      "EMI is the fixed monthly outflow if rate and tenure stay unchanged.",
      "Total interest is what you pay beyond principal over the full tenure.",
      "Shorter tenure → higher EMI, lower interest; longer tenure → lower EMI, higher interest.",
      "Yearly rows show how the interest/principal mix flips over time.",
      "Educational estimate — day-count and fee conventions can differ at your bank.",
    ],
    workedExample: {
      title: "Worked example — 500,000 personal loan at 12% for 36 months",
      steps: [
        "P = 500,000; annual 12% → monthly r = 0.01; n = 36.",
        "EMI = P·r(1+r)^n / ((1+r)^n − 1) ≈ 16,607.",
        "Total payment ≈ 597,852; interest ≈ 97,852.",
        "Mirror the same inputs on this page — the live panel is authoritative for rounding.",
        "Optional: try 24 months to see a higher EMI with less total interest.",
      ],
      result:
        "About 16.6k EMI; nearly 98k interest over 3 years if you pay on schedule — before fees.",
    },
    faqs: [
      {
        question: "What is EMI?",
        answer:
          "Equated Monthly Installment is the fixed amount you pay each month toward a loan. It combines principal and interest so the payment stays level while the interest–principal mix shifts over time.",
      },
      {
        question: "Should I enter monthly or annual interest rate?",
        answer:
          "Enter the annual rate (e.g. 8.5%). The calculator converts it to a monthly rate internally.",
      },
      {
        question: "Does this work for home loans, car loans, and personal loans?",
        answer:
          "Yes — the EMI math is the same. Product-specific charges (processing fees, insurance, prepayment penalties) are not included.",
      },
      {
        question: "Why does my bank’s EMI differ slightly?",
        answer:
          "Banks may use day-count conventions, fee capitalization, or floating-rate resets. This tool uses the standard reducing-balance EMI formula for education and planning.",
      },
      {
        question: "Can I use my local currency?",
        answer:
          "Yes. Pick USD, EUR, GBP, INR, AED, or another supported code in the currency picker — inputs and money results format in your selected currency.",
      },
      {
        question: "How do I reduce my EMI or total interest?",
        answer:
          "Negotiate a lower rate, shorten tenure (raises EMI), make a larger down payment, or prepay principal when your loan allows it without heavy penalties.",
      },
      {
        question: "Is this the same as the Mortgage Calculator?",
        answer:
          "Same formula family. Mortgage page thinks in years and home-loan P&I; this page thinks in months and EMI labels used worldwide.",
      },
      {
        question: "Can I model extra payments here?",
        answer:
          "Use the EMI with Extra Payments tool for prepayment scenarios. This page is the base EMI schedule.",
      },
    ],
  },

  sip: {
    seoTitle: "SIP Calculator — Mutual Fund & Recurring Investment Returns",
    seoDescription:
      "Estimate SIP / DCA maturity with invested-vs-portfolio chart. Enter monthly investment, expected return, and years — free MyCalcsWorld planner.",
    formulaNote:
      "SIP future value uses the standard annuity compound formula with monthly rate r = annual%/12/100 and n = years×12.\n\nWorked illustration: monthly 10,000 at 12% for 15 years → n = 180, r = 0.01. Total invested = 1,800,000; illustrated maturity is substantially higher at a steady 12% (live panel is authoritative). Markets are not a straight line — treat as educational.",
    overview:
      "A Systematic Investment Plan (SIP) invests a fixed amount every month — a useful model for mutual-fund SIPs and global dollar-cost-averaging alike. MyCalcsWorld’s SIP Calculator projects maturity at a constant assumed return, plots invested amount vs portfolio value year by year, and pairs with CAGR/inflation tools for realism.\n\nEnter monthly investment, expected annual return, and years. Returns are not guaranteed; equity SIPs can be volatile. Format money with the currency picker.\n\nIllustrative only — not investment advice.",
    whenToUse: [
      "Planning a new SIP or raising an existing monthly contribution.",
      "Comparing 10 vs 15 vs 20 year horizons before you commit.",
      "Explaining invested-vs-gains to family with a simple growth chart.",
      "Stress-testing a lower expected return so the goal still feels honest.",
      "Pairing with the inflation adjuster to think in today’s purchasing power.",
    ],
    commonMistakes: [
      "Using last year’s hot return as a guaranteed future rate.",
      "Forgetting expense ratios, exit loads, and taxes that real funds deduct.",
      "Mixing SIP maturity math with lump-sum CAGR without adjusting contributions.",
      "Ignoring that equity SIP paths are volatile — the chart is a smooth illustration.",
      "Treating display currency as an FX conversion of foreign holdings.",
    ],
    howToUse: [
      "Enter Monthly investment — demo default is 500 (scale to your plan).",
      "Set Expected annual return (%) — many long-term equity planners explore 8–12% for illustration only.",
      "Choose Years for the horizon.",
      "Read Future value, Total invested, and Estimated gains.",
      "Skim the growth chart (portfolio vs invested) year by year.",
      "Re-run at a lower return to see whether the goal still holds.",
    ],
    howToInterpret: [
      "Maturity value is an illustration at a constant assumed return — real NAVs fluctuate.",
      "Invested amount is monthly SIP × months.",
      "Estimated gains = maturity − invested under that assumption.",
      "The chart’s smooth curve is educational, not a promise of path.",
      "Not investment advice — verify with a prospectus and a qualified advisor when stakes are high.",
    ],
    workedExample: {
      title: "Worked example — 10,000/month SIP at 12% for 15 years",
      steps: [
        "Monthly P = 10,000; annual return 12% → monthly r = 0.01; n = 180.",
        "Total invested = 10,000 × 180 = 1,800,000.",
        "Future value of the annuity compounds each contribution to the horizon.",
        "Enter 10000 / 12 / 15 on this page and read the live Future value (authoritative).",
        "Optional: re-run at 8% to stress-test a weaker return path.",
      ],
      result:
        "Invested 1,800,000; illustrated maturity is much higher at a steady 12% — markets will not be a straight line.",
    },
    faqs: [
      {
        question: "What is a SIP calculator used for?",
        answer:
          "It projects how regular monthly investments might grow at an assumed rate — useful for goal planning, not a promise of returns.",
      },
      {
        question: "What return rate should I enter for equity SIPs?",
        answer:
          "Many planners illustrate 10–12% p.a. for diversified equity over long periods. Debt funds are typically lower. Past performance does not guarantee future results.",
      },
      {
        question: "Does this include expense ratios or exit loads?",
        answer:
          "No. Fund expenses and taxes reduce real outcomes. Treat the result as a pre-expense, pre-tax estimate — or lower the assumed return to approximate drag.",
      },
      {
        question: "Is SIP better than a lump sum?",
        answer:
          "SIP averages purchase cost over time and builds a habit; lump sum can do better if markets rise after you invest. Cash flow and risk tolerance decide.",
      },
      {
        question: "Can I model step-up SIPs?",
        answer:
          "This page assumes a fixed monthly amount. For rising contributions, run scenarios at higher monthly amounts or approximate an average contribution.",
      },
      {
        question: "How is this different from the SIP Growth Chart page?",
        answer:
          "Same math family — the dedicated growth-chart page emphasizes storytelling visuals; this SIP tool is the core maturity planner.",
      },
      {
        question: "Can I use any currency?",
        answer:
          "Yes — the currency picker formats money. The SIP formula itself is currency-agnostic.",
      },
      {
        question: "Is this investment advice?",
        answer:
          "No. Educational illustration only. Speak with a qualified advisor and read scheme documents before investing.",
      },
    ],
  },

  bmi: {
    seoTitle: "BMI Calculator — Body Mass Index & Category Guide",
    seoDescription:
      "Calculate adult BMI from height and weight with common category bands. Free MyCalcsWorld BMI tool — educational screening only, not a diagnosis.",
    formulaNote:
      "BMI = weight(kg) / [height(m)]²\nwith height_m = height_cm / 100.\n\nWorked numeric check: 70 kg at 175 cm → height_m = 1.75 → BMI = 70 / (1.75²) = 70 / 3.0625 ≈ 22.9 (commonly labeled Normal weight on adult charts). Categories are population heuristics — not clinical diagnoses. Athletes, pregnancy, and pediatric populations need different guidance.",
    overview:
      "Body Mass Index (BMI) is a simple height–weight screening ratio used in public-health charts. MyCalcsWorld’s BMI Calculator takes weight in kilograms and height in centimeters, then shows BMI and a common adult category label so you can see where the demo numbers land.\n\nIt is deliberately educational: BMI does not measure body fat directly, and it can misclassify muscular athletes or certain clinical populations. Pair it with ideal-weight, body-fat, or BMR tools when you need a broader picture — and confirm anything health-critical with a clinician.\n\nNot medical advice.",
    whenToUse: [
      "Quick educational screening from height and weight before a checkup conversation.",
      "Seeing how a few kilograms move the BMI number on a common adult chart.",
      "Classroom or coaching demos of the BMI formula with live numbers.",
      "Pairing with BMR/TDEE tools when calorie planning is the next question.",
      "Never as a stand-alone diagnosis for eating disorders, pregnancy, or pediatric care.",
    ],
    commonMistakes: [
      "Mixing lb/in with kg/cm fields — unit mix-ups swing BMI hard.",
      "Treating BMI category labels as a diagnosis or body-fat measurement.",
      "Applying adult cutoffs to children, teens, pregnancy, or clinical populations.",
      "Obsessing over a tenth of a point when measurement error is larger than that.",
      "Ignoring that muscular builds can land “overweight” on BMI while remaining healthy by other metrics.",
    ],
    howToUse: [
      "Enter Weight in kilograms — demo default is 70 kg.",
      "Enter Height in centimeters — demo default is 175 cm.",
      "Read BMI (one decimal) and the category label in the result panel.",
      "Re-run with honest measurements (morning weight, consistent height).",
      "If you need calories or body-fat estimates next, open related tools from the sidebar.",
      "Bring concerning results to a licensed clinician — do not self-diagnose from a web calculator.",
    ],
    howToInterpret: [
      "BMI is a ratio, not a direct body-fat or health diagnosis.",
      "Common adult bands (underweight / normal / overweight / obesity classes) are population heuristics.",
      "Small height rounding errors change BMI more than people expect — measure carefully.",
      "Athletes and clinical populations often need different equations or clinical judgment.",
      "Educational screening only — not medical advice.",
    ],
    workedExample: {
      title: "Worked example — 70 kg at 175 cm",
      steps: [
        "Weight = 70 kg; height = 175 cm → 1.75 m.",
        "BMI = 70 / (1.75²) = 70 / 3.0625 ≈ 22.86.",
        "Rounded display ≈ 22.9.",
        "On common adult charts that lands in a Normal weight band — still not a diagnosis.",
        "Enter the same numbers here to mirror the live panel.",
      ],
      result:
        "BMI ≈ 22.9 (Normal weight on common adult cutoffs) — educational screening only.",
    },
    faqs: [
      {
        question: "What is BMI?",
        answer:
          "Body Mass Index is weight divided by height squared (kg/m²). It is a screening metric used in population charts, not a direct measure of body fat or health.",
      },
      {
        question: "Which units does this calculator use?",
        answer:
          "Kilograms and centimeters on this page. Convert lb/in first if your scale or stadiometer uses customary units.",
      },
      {
        question: "Are the category cutoffs universal?",
        answer:
          "Common adult WHO-style bands are widely published, but some regions and clinics use adjusted cutoffs. Pediatric BMI uses age/sex percentiles — not this adult tool.",
      },
      {
        question: "Can athletes trust BMI?",
        answer:
          "Often poorly. High muscle mass can raise BMI without high body fat. Use additional metrics and clinical judgment.",
      },
      {
        question: "Is this a diagnosis?",
        answer:
          "No. MyCalcsWorld BMI output is educational only. Seek licensed medical care for diagnosis, treatment, pregnancy, or eating-disorder concerns.",
      },
      {
        question: "How is this different from body-fat %?",
        answer:
          "BMI uses only height and weight. Body-fat estimators (e.g. Navy method) use circumferences and sex-specific equations — related but not the same.",
      },
      {
        question: "Why did my BMI change when height changed by 1 cm?",
        answer:
          "Height is squared in the denominator, so small height errors move BMI more than the same relative weight error.",
      },
      {
        question: "Will my numbers be stored?",
        answer:
          "Calculations run in your browser session. No account is required to use this tool.",
      },
    ],
  },

  tip: {
    seoTitle: "Tip Calculator — Tip Amount, Total & Per-Person Split",
    seoDescription:
      "Calculate tip and split a bill fairly. Enter bill, tip percent, and people — free MyCalcsWorld tip calculator with worked example and FAQ.",
    formulaNote:
      "Tip = bill × (tip% / 100)\nTotal = bill + tip\nPer person = total / people\n\nWorked numeric check: bill 64.50 at 18% for 2 people → tip = 11.61; total = 76.11; per person ≈ 38.06. Decide whether your group tips on pre-tax or post-tax before you enter the bill base.",
    overview:
      "Splitting a restaurant or delivery bill should not require a spreadsheet. MyCalcsWorld’s Tip Calculator takes bill amount, tip percent, and headcount, then shows tip, total, and each person’s share.\n\nBuilt for dinners, takeout, and group outings worldwide — pick your display currency when you think in dollars, euros, pounds, or another supported code. Customs differ on whether tip is pre-tax or post-tax; enter the base your group agrees on. Below the form: when-to-use, common mistakes, a worked numeric example, formula notes, and FAQs in our own voice.\n\nPlanning arithmetic only — not tax advice.",
    whenToUse: [
      "Dining out or ordering in when you want a clean tip and split.",
      "Comparing 15% vs 18% vs 20% before you tap pay.",
      "Splitting evenly among friends without mental-math errors.",
      "Travel nights when local tip customs differ from home.",
      "Teaching kids or newcomers how tip percent maps to real money.",
    ],
    commonMistakes: [
      "Forgetting shared appetizers, delivery fees, or service charges in the bill amount.",
      "Splitting before agreeing whether tip is on pre-tax or post-tax.",
      "Rounding each person differently so the table does not sum to the total.",
      "Leaving the people count at 1 when you meant to split.",
      "Double-tipping when a service charge is already included on the check.",
    ],
    howToUse: [
      "Enter Bill amount your group is tipping on — demo default is 64.5.",
      "Set Tip percent (%) — demo default is 18.",
      "Set Split between (people) — demo default is 2.",
      "Read Tip, Total, and Per person in the result panel.",
      "Agree how to round coins before anyone pays.",
      "Optional: switch display currency if the bill is in another money format.",
    ],
    howToInterpret: [
      "Tip is the gratuity line; Total is bill + tip.",
      "Per person is an even split of the total — adjust offline for uneven orders.",
      "The math is exact; social rounding norms vary by table.",
      "If a service charge is listed, usually do not add the same percent again unless you intend to.",
      "Planning aid only — not a payroll or tax form.",
    ],
    workedExample: {
      title: "Worked example — $64.50 bill at 18% for 2 people",
      steps: [
        "Bill = 64.50; tip% = 18; people = 2.",
        "Tip = 64.50 × 0.18 = 11.61.",
        "Total = 64.50 + 11.61 = 76.11.",
        "Per person = 76.11 / 2 ≈ 38.055 → about 38.06 each.",
        "Enter the same numbers here to mirror the live panel.",
      ],
      result: "Tip $11.61; total $76.11; about $38.06 per person.",
    },
    faqs: [
      {
        question: "Should I tip on pre-tax or post-tax?",
        answer:
          "Groups disagree. Pick a convention before you split and enter that bill base consistently.",
      },
      {
        question: "What if service charge is already included?",
        answer:
          "Usually do not double-tip the same percentage unless you want to reward someone extra. Read the check.",
      },
      {
        question: "Can I do uneven splits?",
        answer:
          "This page even-splits the total. For itemized uneven shares, adjust manually or use a split-bill tool.",
      },
      {
        question: "What tip percent is “normal”?",
        answer:
          "Customs vary widely by country and venue. Use a percent your table agrees on; this tool does the arithmetic.",
      },
      {
        question: "Does currency picker change the math?",
        answer:
          "No — it only changes how money is formatted. Tip percent math is currency-agnostic.",
      },
      {
        question: "How do I include delivery fees?",
        answer:
          "Add delivery or app fees into the bill amount if you want them shared with the tip base.",
      },
      {
        question: "Is this the same as Tip by Country?",
        answer:
          "Related. Tip by Country starts from editable regional presets; this page is the core tip + split calculator.",
      },
      {
        question: "Will my bill be uploaded?",
        answer:
          "No. Calculations run in your browser. No account is required.",
      },
    ],
  },

  percentage: {
    seoTitle: "Percentage Calculator — Percent Of a Number",
    seoDescription:
      "Find x% of y instantly for discounts, tips, exam scores, and finance basics. Free MyCalcsWorld percentage calculator with worked example.",
    formulaNote:
      "x% of y = (x / 100) × y\n\nWorked numeric check: 15% of 80 = 0.15 × 80 = 12. For percent change use ((new − old) / old) × 100 on a dedicated change tool when you need that identity instead.",
    overview:
      "Percentage-of is the everyday building block behind tips, discounts, tax sketches, and exam scores. MyCalcsWorld’s Percentage Calculator multiplies a percent by an amount and shows the result clearly so you can check homework or a price tag without a spreadsheet.\n\nEnter Percentage and Of amount. For percent-change, discount, or sales-tax workflows, jump to the dedicated related tools — each page stays focused so inputs stay unambiguous. The guide covers field-by-field how-to, interpretation, common mistakes, and a worked numeric example.\n\nEducational arithmetic — not tax advice.",
    whenToUse: [
      "Finding a tip, commission, or fee as a percent of a base.",
      "Checking a discount claim (“20% of 80”) before you buy.",
      "Homework and exam questions that ask for x% of y.",
      "Quick finance sketches when you do not need a full tax engine.",
      "Teaching what “percent of” means with live numbers.",
    ],
    commonMistakes: [
      "Confusing “percent of” with “percent change” ((new−old)/old).",
      "Entering 15 instead of 0.15 in a spreadsheet while this form already expects a percent.",
      "Mixing money and unitless amounts without noticing the display prefix.",
      "Using this page for tax-inclusive reverse calculations — use GST/VAT remove-tax mode instead.",
      "Rounding too early when a chain of percent steps follows.",
    ],
    howToUse: [
      "Enter Percentage — demo default is 15%.",
      "Enter Of amount — demo default is 80.",
      "Read Result in the panel (emphasized).",
      "For discounts, open the Discount calculator; for tip splits, open Tip.",
      "Re-run with a second percent to compare scenarios.",
      "Use Copy / Share if you want a chat-ready line.",
    ],
    howToInterpret: [
      "Result is simply (percent/100) × amount.",
      "A money prefix is display formatting — the identity is the same for unitless values.",
      "If you needed “what percent is A of B?”, use a percent-of / reverse tool when available.",
      "Chain multi-step percent problems carefully — order matters for successive discounts.",
      "Educational helper — verify regulated tax figures with official tools.",
    ],
    workedExample: {
      title: "Worked example — 15% of 80",
      steps: [
        "pct = 15; of = 80.",
        "Result = (15/100) × 80 = 12.",
        "Sanity check: 10% of 80 = 8; 5% = 4; 15% = 12.",
        "Enter the same numbers here to mirror the live panel.",
        "Optional: try 18% of 64.5 to connect with the Tip calculator demo.",
      ],
      result: "15% of 80 = 12.",
    },
    faqs: [
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percent divided by 100. Example: 15% of 80 = 0.15 × 80 = 12.",
      },
      {
        question: "Is this the same as percent change?",
        answer:
          "No. Percent of is a simple product. Percent change compares two values: ((new − old) / old) × 100.",
      },
      {
        question: "Can I use this for tips?",
        answer:
          "Yes for the tip amount alone. For tip + split + total, the Tip Calculator is more convenient.",
      },
      {
        question: "Does it handle successive discounts?",
        answer:
          "Apply one percent at a time to the reduced base, or use the Discount tool for a single markdown.",
      },
      {
        question: "Why is there a money prefix?",
        answer:
          "Many people use this for prices. The math is identical for unitless quantities.",
      },
      {
        question: "How is this different from GST/VAT?",
        answer:
          "GST/VAT modes add or extract tax from invoice amounts. This page is the bare percent-of identity.",
      },
      {
        question: "Can I get fractions instead of decimals?",
        answer:
          "The numeric engine shows decimals. Convert to a fraction on paper when your course requires it.",
      },
      {
        question: "Is my input stored?",
        answer:
          "Calculations run locally in your browser. No signup is required.",
      },
    ],
  },

  pythagoras: {
    seoTitle: "Pythagoras Calculator — Right Triangle & 3D Diagonal",
    seoDescription:
      "Solve a² + b² = c² for hypotenuse or either leg; optional 3D space diagonal. Free MyCalcsWorld geometry tool with mode-aware fields.",
    formulaNote:
      "Right triangle: a² + b² = c² (c = hypotenuse).\nSolve forms:\n• c = √(a² + b²)\n• a = √(c² − b²) when c > b\n• b = √(c² − a²) when c > a\n3D space diagonal: d = √(a² + b² + c²).\n\nWorked numeric check: a = 3, b = 4 → c = 5. Classic 3-4-5 triple.",
    overview:
      "Pythagoras’ theorem is the workhorse of right-triangle geometry. MyCalcsWorld’s Pythagoras Calculator lets you pick a mode — find hypotenuse c, find leg a, find leg b, or compute a 3D space diagonal — and only shows the fields that mode needs (unused sides stay hidden).\n\nEnter the known sides, read the unknown, and optionally confirm with the classic 3-4-5 check. Built for homework, DIY squaring, and quick engineering sketches under Euclidean assumptions.\n\nEducational math — contest proofs may still want exact radicals on paper.",
    whenToUse: [
      "Homework or exam practice on right triangles.",
      "DIY squaring a corner (does 3-4-5 hold on your tape measures?).",
      "Finding a missing leg when hypotenuse and one leg are known.",
      "Computing a room or box space diagonal in 3D mode.",
      "Checking calculator work against a hand-derived radical form.",
    ],
    commonMistakes: [
      "Using a non-hypotenuse side as c — c must be the longest side in 2D modes.",
      "Forgetting that leg modes require c > the known leg.",
      "Mixing units (cm vs m) across a and b.",
      "Expecting exact √ forms when the UI shows decimals.",
      "Applying 2D Pythagoras to non-right triangles without more trig.",
    ],
    howToUse: [
      "Choose Mode (find hypotenuse, find a leg, or 3D diagonal).",
      "Enter only the sides shown for that mode — hidden fields are unused on purpose.",
      "Read the primary unknown (c, a, b, or space diagonal).",
      "Optional: switch mode and re-enter to solve a different unknown.",
      "Compare decimals to an exact radical when your course requires it.",
      "Use Related tools (Heron, distance) if the triangle is not right-angled.",
    ],
    howToInterpret: [
      "In hyp mode, c is always the longest side of a right triangle.",
      "In leg modes, the tool rejects inputs where hypotenuse ≤ known leg.",
      "3D mode returns the space diagonal through a rectangular box.",
      "Displayed precision is rounded; re-derive exact forms for proofs.",
      "Educational geometry only — survey work needs real measurement tolerances.",
    ],
    workedExample: {
      title: "Worked example — 3-4-5 right triangle",
      steps: [
        "Mode: Find hypotenuse c from legs a & b.",
        "a = 3; b = 4.",
        "c = √(3² + 4²) = √(9+16) = √25 = 5.",
        "Enter 3 and 4 on this page in hyp mode to mirror the live panel.",
        "Optional: switch to leg-a mode with b=4, c=5 to recover a=3.",
      ],
      result: "Hypotenuse c = 5 for the classic 3-4-5 triple.",
    },
    faqs: [
      {
        question: "What is the Pythagorean theorem?",
        answer:
          "In a right triangle, the square of the hypotenuse equals the sum of the squares of the legs: a² + b² = c².",
      },
      {
        question: "Why do some fields disappear?",
        answer:
          "Mode-aware visibleWhen hides unused sides so you do not type a value that the selected solve path ignores.",
      },
      {
        question: "Can I solve for a leg?",
        answer:
          "Yes — choose Find leg a or Find leg b and enter the other leg plus the hypotenuse (which must be longer).",
      },
      {
        question: "What does 3D mode do?",
        answer:
          "It computes the space diagonal √(a²+b²+c²) of a rectangular box with edges a, b, c.",
      },
      {
        question: "Why don’t I see exact radicals?",
        answer:
          "The numeric engine shows decimals. Exams often still want √ forms — convert on paper when required.",
      },
      {
        question: "Does this work for non-right triangles?",
        answer:
          "Not with this identity alone. Use the law of cosines / Heron tools for general triangles.",
      },
      {
        question: "How precise are results?",
        answer:
          "Internal math uses floating point; display uses fixed precision. Re-check proofs with exact arithmetic.",
      },
      {
        question: "Is this the same as Pythagoras 3D demo pages?",
        answer:
          "Related family — this form focuses on numeric solves with mode-aware inputs; demo pages emphasize visualization.",
      },
    ],
  },

  "gst-vat": {
    seoTitle: "GST / VAT Calculator — Add or Extract Tax",
    seoDescription:
      "Add or extract GST/VAT/sales tax from prices at any rate. Free MyCalcsWorld invoice helper with exclusive/inclusive modes — not a filing tool.",
    formulaNote:
      "Tax-exclusive (add tax):\ngross = net × (1 + rate/100); tax = gross − net.\nTax-inclusive (extract tax):\nnet = gross / (1 + rate/100); tax = gross − net.\n\nWorked numeric check: net 1,000 at 18% exclusive → tax = 180; gross = 1,180. From gross 1,180 inclusive: net = 1,180 / 1.18 = 1,000.",
    overview:
      "GST, VAT, and sales tax are percentage taxes on taxable value. MyCalcsWorld’s GST / VAT Calculator adds tax to a base price or backs tax out of a gross price for any rate you enter (common slabs include 5%, 10%, 12%, 18%, 20%).\n\nPick Mode: Tax exclusive (add tax) or Tax inclusive (extract tax). Read net, tax, and gross. Useful for invoice sketches and shelf-price reverse math worldwide — not a substitute for filing software or a tax professional. The detailed guide covers both modes with a worked numeric example and FAQs.\n\nEducational estimate only.",
    whenToUse: [
      "Adding GST/VAT to a taxable value before you send an invoice draft.",
      "Backing tax out of a tax-inclusive shelf price.",
      "Comparing 5% vs 18% (or local) slabs on the same net amount.",
      "Teaching the difference between exclusive and inclusive tax bases.",
      "Quick checks before you open full accounting software.",
    ],
    commonMistakes: [
      "Using exclusive math on an inclusive price (or reverse).",
      "Forgetting that some invoices split CGST/SGST halves of a combined rate.",
      "Entering 0.18 when the form expects 18 as a percent.",
      "Treating this educational helper as a filing-ready GST return.",
      "Ignoring exempt items or multi-rate baskets that real invoices contain.",
    ],
    howToUse: [
      "Enter Amount — demo default is 1000.",
      "Enter GST/VAT rate (%) — demo default is 18.",
      "Choose Mode: Tax exclusive (add tax) or Tax inclusive (extract tax).",
      "Read Net (ex-tax), Tax, and Gross (inc-tax).",
      "Flip mode on the same numbers to see add vs extract side by side.",
      "Confirm the legal rate for your HSN/SAC or jurisdiction before filing anything.",
    ],
    howToInterpret: [
      "Exclusive mode: you typed the net; tax and gross are computed upward.",
      "Inclusive mode: you typed the gross; net and tax are backed out.",
      "Some jurisdictions split a combined rate into CGST+SGST halves — this tool uses one combined rate.",
      "Currency formatting does not change the percentage identity.",
      "Not a filing tool — verify with accounting software and official rules.",
    ],
    workedExample: {
      title: "Worked example — 1,000 taxable at 18% GST/VAT",
      steps: [
        "Exclusive mode: net = 1,000; rate = 18%.",
        "Tax = 1,000 × 0.18 = 180; gross = 1,180.",
        "Inclusive check: net = 1,180 / 1.18 = 1,000; tax = 180.",
        "Enter 1000 / 18 / exclusive on this page to mirror the live panel.",
        "Optional: switch to inclusive with amount 1180 to reverse the same invoice.",
      ],
      result:
        "Tax 180 on net 1,000 (gross 1,180). If intra-state GST splits apply, that is often 90 + 90 at a 18% combined rate — confirm locally.",
    },
    faqs: [
      {
        question: "What tax rates can I enter?",
        answer:
          "Any percent. Common slabs include 0%, 5%, 12%, 18%, and 28% in some GST systems, and 5–27% VAT bands elsewhere. Confirm the rate that applies to your goods or services.",
      },
      {
        question: "Is GST the same as VAT?",
        answer:
          "GST, VAT, and sales tax are all consumption taxes on value. The percentage math is the same; enter the rate that applies where you are.",
      },
      {
        question: "How do I reverse-calculate tax from a final price?",
        answer:
          "Choose Tax inclusive mode and enter the gross price. Net = gross / (1 + rate/100); tax is the difference.",
      },
      {
        question: "Does this handle CGST, SGST, and IGST separately?",
        answer:
          "It works with a single combined rate. For intra-state invoices, CGST and SGST are often equal halves of that rate; IGST applies on interstate supplies where that system exists.",
      },
      {
        question: "Are results suitable for filing returns?",
        answer:
          "No — this is an educational estimator. Use your accounting software and official tax portals for compliance.",
      },
      {
        question: "Can I use my local currency?",
        answer:
          "Yes — the currency picker formats money. Tax rules still vary by jurisdiction.",
      },
      {
        question: "What about compound taxes or cess?",
        answer:
          "This page models a single percentage. Add cess or secondary levies manually if your invoice needs them.",
      },
      {
        question: "Is this sales-tax advice?",
        answer:
          "No. Educational arithmetic only. Confirm with a qualified tax professional when compliance is at stake.",
      },
    ],
  },

  "currency-converter": {
    seoTitle: "Currency Converter — USD, INR, EUR, GBP, AED & More",
    seoDescription:
      "Convert currencies with delayed educational FX rates (ECB reference feed). Free MyCalcsWorld converter — not for trading or wire transfers.",
    formulaNote:
      "converted = amount × (rate_to / rate_from) using USD-cross reference rates from the site FX feed (/api/fx, frankfurter.app ECB reference, cached about hourly). Fallback snapshot rates apply if the feed is down.\n\nWorked sketch: if 1 USD = 83 INR and 1 USD = 0.92 EUR, then 100 EUR → USD = 100 / 0.92 ≈ 108.70 USD (illustrative — live panel rates win).",
    overview:
      "A currency converter turns an amount in one money into another using a reference exchange rate. MyCalcsWorld’s Currency Converter is a custom live widget: pick From/To currencies, enter an amount, and read the converted value from a delayed educational ECB-based feed (with a fallback snapshot if the network path is down).\n\nBuilt for travelers, freelancers, and students who need a clean USD ↔ INR ↔ EUR ↔ GBP ↔ AED (and more) check — not for trading, banking wires, or executable FX quotes. Spreads, weekend gaps, and retail markup are outside this educational feed.\n\nNot financial advice.",
    whenToUse: [
      "Estimating a travel budget across two currencies before you go.",
      "Sketching a freelance invoice conversion for planning (not settlement).",
      "Checking homework or news figures that mix USD and local currency.",
      "Comparing a card’s retail rate to a mid-market educational reference.",
      "Never for executable trades, wires, or legal settlement amounts.",
    ],
    commonMistakes: [
      "Treating delayed educational rates as a tradeable bid/offer.",
      "Ignoring card/FX markup your bank adds on top of mid-market.",
      "Converting on weekends/holidays without noticing thinner liquidity in real markets.",
      "Assuming the site-wide currency picker on other calculators is this FX converter.",
      "Using a stale fallback snapshot without noticing the feed status hint.",
    ],
    howToUse: [
      "Open the Currency Converter widget on this page.",
      "Choose the From currency and the To currency.",
      "Enter the amount you want to convert.",
      "Read the converted value and the implied rate the widget shows.",
      "If the feed is unavailable, note the fallback snapshot disclaimer before you rely on the number.",
      "For trading or wires, use your broker/bank — this page is educational only.",
    ],
    howToInterpret: [
      "The converted amount uses delayed reference rates, not your card’s retail quote.",
      "Cross rates are derived via the feed’s USD baseline unless stated otherwise.",
      "A feed status / timestamp hint (when shown) tells you how fresh the numbers are.",
      "Fallback snapshots are coarser — fine for ballparks, not settlements.",
      "Educational estimate only — not a tradeable price.",
    ],
    workedExample: {
      title: "Worked example — 100 EUR toward USD (illustrative crosses)",
      steps: [
        "Suppose the feed’s USD crosses imply 1 EUR ≈ 1.087 USD (example only).",
        "100 EUR × 1.087 ≈ 108.70 USD.",
        "Flip From/To to convert back and confirm the round-trip within rounding.",
        "Enter 100 EUR → USD on the live widget — the panel rate is authoritative for this session.",
        "Compare to your card’s rate to see typical retail markup.",
      ],
      result:
        "About 108.70 USD for 100 EUR in this illustrative cross — live widget rates override any static example.",
    },
    faqs: [
      {
        question: "Where do the FX rates come from?",
        answer:
          "A free ECB reference feed via frankfurter.app, proxied through /api/fx and cached about hourly, with a fallback snapshot if the feed is down.",
      },
      {
        question: "Is this a live trading rate?",
        answer:
          "No. It is a delayed educational reference. Brokers and banks add spreads and fees.",
      },
      {
        question: "Which currencies are supported?",
        answer:
          "Major codes including USD, EUR, GBP, INR, JPY, AED, and others exposed by the feed/widget. Availability can vary with the upstream table.",
      },
      {
        question: "Why does my bank show a different number?",
        answer:
          "Retail card and wire rates include markup, weekend gaps, and different day counts. This page shows a mid-market-style educational reference.",
      },
      {
        question: "Does the site currency picker convert FX on other calculators?",
        answer:
          "No. On mortgage/EMI/SIP pages the picker mostly changes display formatting. Use this Currency Converter when you need an actual FX conversion.",
      },
      {
        question: "What if the feed is down?",
        answer:
          "A built-in fallback snapshot may be used. Treat it as a coarser ballpark and retry later for a fresher reference.",
      },
      {
        question: "Can I convert historical dates?",
        answer:
          "This widget focuses on the current educational reference. Historical series belong in dedicated data terminals.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. Educational conversion only. Confirm settlement rates with your bank or licensed advisor.",
      },
    ],
  },

  "compound-interest": {
    seoTitle: "Compound Interest Calculator — Future Value by Frequency",
    seoDescription:
      "See how principal grows with compound interest by rate, years, and compounding frequency. Free MyCalcsWorld tool with worked A=P(1+r/n)^(nt) example.",
    formulaNote:
      "A = P(1 + r/n)^(n·t)\nInterest earned = A − P\nwhere P is principal, r is nominal annual rate as a decimal, n is compounds per year, t is years.\n\nWorked numeric check: P = 10,000; r = 0.06; n = 12; t = 10 → A = 10,000 × (1.005)^120 ≈ 18,193.97; interest ≈ 8,193.97. For day-by-day reinvest/deposits/weekends, use the Daily Compound Interest calculator instead.",
    overview:
      "Compound interest is interest on interest — the reason long-horizon savings can accelerate. MyCalcsWorld’s Compound Interest Calculator lets you set principal, annual rate, years, and compounding frequency (annually through daily), then read future value and interest earned in your display currency.\n\nUse it to compare monthly vs daily compounding, to see how a 1% rate change compounds over a decade, or to sanity-check a bank brochure. Pair it with Daily Compound Interest when you need reinvest %, deposits, or weekend filters — and with SIP when contributions are monthly.\n\nIllustrative only — not investment advice.",
    whenToUse: [
      "Comparing savings or CD-style growth at a fixed rate and compounding schedule.",
      "Teaching or checking A = P(1+r/n)^(nt) with live numbers.",
      "Stress-testing a slightly higher or lower rate over the same horizon.",
      "Seeing how monthly vs daily compounding differs at retail rates.",
      "Before you open a spreadsheet, getting an independent browser estimate.",
    ],
    commonMistakes: [
      "Entering APY when the form expects a nominal annual rate (or the reverse).",
      "Forgetting this page is a single principal — regular deposits belong on SIP / daily-compound tools.",
      "Mixing years and months in the tenure field.",
      "Assuming the currency picker converts FX — use the Currency Converter for that.",
      "Confusing this classic compound page with the day-by-day Daily Compound Interest planner.",
    ],
    howToUse: [
      "Enter Principal — demo default is 5000.",
      "Set Annual rate (%) — demo default is 7.",
      "Set Years — demo default is 10.",
      "Choose Compounded frequency (monthly is common for savings; daily for some products).",
      "Read Future value and Interest earned.",
      "Re-run with a second frequency or rate to compare scenarios side by side.",
    ],
    howToInterpret: [
      "Future value is principal plus all compounded interest for the schedule you chose.",
      "More frequent compounding slightly increases growth at the same nominal rate.",
      "Small rate differences compound into large gaps over long horizons.",
      "Interest earned = future value − principal under this idealization.",
      "Educational estimate — product day-count and fees can differ.",
    ],
    workedExample: {
      title: "Worked example — 10,000 at 6% for 10 years, monthly compounding",
      steps: [
        "P = 10,000; r = 0.06; n = 12; t = 10.",
        "A = 10,000 × (1 + 0.06/12)^(12×10) = 10,000 × (1.005)^120 ≈ 18,193.97.",
        "Interest earned ≈ 8,193.97.",
        "Annual compounding at the same 6% finishes slightly lower — frequency matters modestly at retail rates.",
        "Enter 10000 / 6 / 10 / Monthly here to mirror the live panel.",
      ],
      result:
        "About 18,194 future value; roughly 8,194 interest over 10 years at 6% monthly — before taxes and fees.",
    },
    faqs: [
      {
        question: "What is compound interest?",
        answer:
          "Interest is calculated on principal plus previously earned interest, so growth accelerates over time compared with simple interest.",
      },
      {
        question: "Does monthly vs daily compounding matter much?",
        answer:
          "At typical retail rates the difference is modest; over decades or high rates it becomes more noticeable. APY already reflects compounding frequency.",
      },
      {
        question: "Can I include monthly contributions?",
        answer:
          "This calculator is for a single principal. Use the SIP, savings-goal, or Daily Compound Interest tools when you add money regularly.",
      },
      {
        question: "Is the rate nominal or effective?",
        answer:
          "Enter the nominal annual rate; compounding frequency converts it into effective growth for the period you chose.",
      },
      {
        question: "How is this different from the Rule of 72?",
        answer:
          "Rule of 72 quickly estimates doubling time. This tool gives exact future value for any principal, rate, and schedule.",
      },
      {
        question: "How is this different from Daily Compound Interest?",
        answer:
          "This page uses the classic A=P(1+r/n)^(nt) identity. Daily Compound specializes in day-by-day modeling with reinvest %, deposits, weekend filters, charts, and snapshots.",
      },
      {
        question: "Does currency picker change the math?",
        answer:
          "No — it only changes how money is formatted. The compound-interest formula is currency-agnostic.",
      },
      {
        question: "Is this investment advice?",
        answer:
          "No. Educational illustration only. Confirm product terms with your bank or advisor.",
      },
    ],
  },
};
