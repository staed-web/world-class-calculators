import type { CalculatorSeoContent } from "@/lib/types";

/**
 * Extra unique, hand-tuned SEO/detail overlays for popular tools
 * that previously relied mostly on FAQ stubs + generic defaults.
 */
export const calculatorSeoExtra: Record<string, CalculatorSeoContent> = {
  "compound-interest": {
    seoTitle: "Compound Interest Calculator — Growth Over Time",
    seoDescription:
      "See how principal grows with compound interest by rate, years, and compounding frequency. Free online compound interest calculator with worked example.",
    formulaNote:
      "A = P(1 + r/n)^(n·t), where P is principal, r is the nominal annual rate (as a decimal), n is compounds per year, and t is time in years. Interest earned = A − P.",
    overview:
      "Compound interest is interest on interest — the reason long-horizon savings and investments can accelerate. MyCalcsWorld’s Compound Interest Calculator lets you set principal, annual rate, years, and compounding frequency, then read future value and interest earned in your display currency.\n\nUse it to compare monthly vs daily compounding, to see how a 1% rate change compounds over a decade, or to sanity-check a bank brochure before you open a spreadsheet. Pair it with the daily compound interest and SIP tools when contributions or day-count matter.",
    whenToUse: [
      "Comparing savings or CD-style growth at a fixed rate and compounding schedule.",
      "Teaching or checking the classic A = P(1+r/n)^(nt) identity with live numbers.",
      "Stress-testing a slightly higher or lower rate over the same horizon.",
      "Before you commit cash, getting an independent estimate you can compare to a bank quote.",
    ],
    commonMistakes: [
      "Entering APY when the form expects a nominal annual rate (or the reverse).",
      "Forgetting that this page is a single principal — regular deposits belong on SIP / savings-goal tools.",
      "Mixing years and months in the tenure field.",
      "Assuming the display currency converts FX — use the Currency Converter for that.",
    ],
    howToUse: [
      "Enter the starting principal.",
      "Set the nominal annual interest rate (percent).",
      "Choose the number of years and compounding frequency (monthly is common for savings).",
      "Read future value and interest earned; skim any growth chart if shown.",
      "Re-run with a second rate or frequency to compare scenarios side by side.",
    ],
    howToInterpret: [
      "Future value is principal plus all compounded interest for the schedule you chose.",
      "More frequent compounding slightly increases growth at the same nominal rate.",
      "Small rate differences compound into large gaps over long horizons.",
      "Educational estimate — product day-count and fees can differ from this idealization.",
    ],
    workedExample: {
      title: "Worked example — 10,000 at 6% for 10 years, monthly compounding",
      steps: [
        "P = 10,000; r = 0.06; n = 12; t = 10.",
        "A = 10,000 × (1 + 0.06/12)^(12×10) ≈ 18,193.97.",
        "Interest earned ≈ 8,193.97.",
        "Annual compounding at the same 6% would finish slightly lower — frequency matters modestly at retail rates.",
      ],
      result:
        "About 18,194 future value; roughly 8,194 interest over 10 years at 6% monthly — before taxes and fees.",
    },
    faqs: [
      { question: "What is compound interest?", answer: "Interest is calculated on principal plus previously earned interest, so growth accelerates over time compared with simple interest." },
      { question: "Does monthly vs daily compounding matter much?", answer: "At typical retail rates the difference is modest; over decades or high rates it becomes more noticeable. APY already reflects compounding frequency." },
      { question: "Can I include monthly contributions?", answer: "This calculator is for a single principal. Use the SIP, savings-goal, or daily compound interest tools when you add money regularly." },
      { question: "Is the rate nominal or effective?", answer: "Enter the nominal annual rate; compounding frequency converts it into effective growth for the period you chose." },
      { question: "How is this different from the Rule of 72?", answer: "Rule of 72 quickly estimates doubling time. This tool gives exact future value for any principal, rate, and schedule." },
      { question: "Does currency picker change the math?", answer: "No — it only changes how money is formatted. The compound-interest formula is currency-agnostic." },
    ],
  },
  tip: {
    seoTitle: "Tip Calculator — Split Bill with Tip",
    seoDescription: "Calculate tip and split a bill fairly. Enter bill, tip percent, and people — free tip calculator on MyCalcsWorld.",
    formulaNote: "Tip = bill × (tip% / 100). Total = bill + tip. Per person = total / people (when splitting).",
    overview: "Splitting a restaurant or delivery bill should not require a spreadsheet. MyCalcsWorld’s Tip Calculator takes the bill amount, tip percent, and number of people, then shows tip, total, and each person’s share.\n\nIt is built for dinners, takeout, and group outings worldwide — pick your display currency when you think in dollars, euros, pounds, or another supported code. Customs differ on whether tip is pre-tax or post-tax; enter the base your group agrees on.",
    whenToUse: [
      "Dining out or ordering in when you want a clean tip and split.",
      "Comparing 15% vs 18% vs 20% before you tap pay.",
      "Splitting evenly among friends without mental math errors.",
    ],
    commonMistakes: [
      "Forgetting shared appetizers or delivery fees in the bill amount.",
      "Splitting before agreeing whether tip is on pre-tax or post-tax.",
      "Rounding each person differently so the table does not sum to the total.",
      "Leaving the people count at 1 when you meant to split.",
    ],
    howToUse: [
      "Enter the bill amount your group is tipping on.",
      "Choose a tip percent (or type a custom one).",
      "Set how many people are splitting.",
      "Read tip, grand total, and per-person share.",
      "Use Copy if you want to paste the summary into a group chat.",
    ],
    howToInterpret: [
      "Tip is a percentage of the bill figure you entered — nothing more.",
      "Per-person assumes an even split; adjust offline for uneven orders.",
      "Currency formatting does not convert FX by itself.",
    ],
    workedExample: {
      title: "Worked example — 64.50 bill, 18% tip, 2 people",
      steps: [
        "Bill = 64.50; tip% = 18 → tip = 64.50 × 0.18 = 11.61.",
        "Total = 64.50 + 11.61 = 76.11.",
        "Per person = 76.11 / 2 = 38.055 → typically round to 38.06 each.",
      ],
      result: "Tip 11.61; total 76.11; about 38.06 each if split evenly.",
    },
    faqs: [
      { question: "Should tip be on pre-tax or post-tax?", answer: "Customs vary. Enter whichever base your table agrees on — the calculator multiplies the number you give it." },
      { question: "Can I exclude one person from the tip?", answer: "Not automatically. Compute total tip, then allocate shares by agreement." },
      { question: "What about service charges already on the bill?", answer: "If a mandatory service charge is included, you may tip less or not at all — local norms and the receipt wording matter." },
      { question: "Does this handle uneven splits?", answer: "The form assumes equal shares. For itemized uneven splits, allocate offline." },
      { question: "Is Copy useful?", answer: "Yes — Copy builds a plain-text summary you can paste into chat apps." },
    ],
  },
  percentage: {
    seoTitle: "Percentage Calculator — Percent Of, Change & More",
    seoDescription: "Calculate percentage of a number, percent change, and related percent math. Free percentage calculator with clear steps.",
    formulaNote: "Percent of: (p/100) × amount. Percent change: ((new − old) / old) × 100. “What percent is A of B”: (A/B) × 100.",
    overview: "Percentage math shows up in discounts, exam scores, portfolio moves, and everyday “what percent is this of that?” questions. MyCalcsWorld’s Percentage Calculator keeps the base and the percent labeled so you do not flip numerator and denominator.\n\nUse it for quick checks, homework, and shopping comparisons — then open related finance tools when you need tax, tip, or discount-specific flows.",
    whenToUse: [
      "Finding p% of an amount (tax-like add-ons, exam weights, allocations).",
      "Measuring percent increase or decrease between two values.",
      "Checking homework that asks “what percent of B is A?”",
    ],
    commonMistakes: [
      "Using the wrong base (dividing by the new value instead of the old for percent change).",
      "Forgetting to divide the percent by 100 before multiplying.",
      "Mixing percentage points with percent change.",
      "Applying a discount percent twice by accident.",
    ],
    howToUse: [
      "Enter the percentage and the amount (or the pair of values your mode needs).",
      "Confirm which quantity is the base.",
      "Read the primary result and any secondary breakdown.",
      "Re-run with a second scenario if you are comparing options.",
    ],
    howToInterpret: [
      "“Percent of” scales the amount; it is not the same as percent change.",
      "Percent change can be negative when the new value is lower.",
      "Displayed precision is rounded — exact fractions may be needed for proofs.",
    ],
    workedExample: {
      title: "Worked example — 15% of 80",
      steps: [
        "p = 15; amount = 80.",
        "Result = (15/100) × 80 = 12.",
        "If 80 rises to 92, percent change = ((92−80)/80)×100 = 15%.",
      ],
      result: "15% of 80 is 12; an 80→92 move is a 15% increase.",
    },
    faqs: [
      { question: "How do I calculate a percentage of a number?", answer: "Multiply the number by the percent divided by 100. Example: 15% of 80 = 0.15 × 80 = 12." },
      { question: "What is percent change?", answer: "((new − old) / old) × 100. Positive means increase; negative means decrease." },
      { question: "Are percentage points the same as percent?", answer: "No. A rate moving from 10% to 12% rose by 2 percentage points, which is a 20% relative increase." },
      { question: "Can I reverse a percentage?", answer: "If you know the final amount after a percent increase, divide by (1 + p/100) to recover the original." },
      { question: "Is this the same as the discount calculator?", answer: "Related. Discount focuses on sale price after an off-percent; this page is the general percent toolkit." },
    ],
  },
roi: {
    seoTitle: "ROI Calculator — Return on Investment",
    seoDescription: "Calculate return on investment from cost and gain. Free ROI calculator with percent return and profit — MyCalcsWorld.",
    formulaNote: "ROI% = ((gain − cost) / cost) × 100. Profit = gain − cost. ROI ignores time unless you annualize separately.",
    overview: "Return on investment (ROI) answers a simple question: relative to what I spent, how much did I earn (or lose)? MyCalcsWorld’s ROI Calculator turns cost and gain into profit and ROI percent so you can compare projects, campaigns, or paper trades quickly.\n\nIt does not annualize by itself — a 20% ROI in three months is not the same as 20% over three years. Pair with CAGR when time-weighted growth matters.",
    whenToUse: [
      "Comparing two projects with clear cost and ending value.",
      "Checking a marketing or equipment spend after the fact.",
      "Teaching the difference between profit (money) and ROI (percent).",
    ],
    commonMistakes: [
      "Leaving fees, taxes, or shipping out of cost.",
      "Comparing ROI across different time spans without annualizing.",
      "Using revenue instead of profit when the definition you need is net.",
      "Mixing margin (profit/revenue) with ROI (profit/cost).",
    ],
    howToUse: [
      "Enter the total cost (what you invested).",
      "Enter the gain / ending value (what you got back).",
      "Read profit and ROI%.",
      "If horizons differ, also compute CAGR or annualize offline.",
    ],
    howToInterpret: [
      "Positive ROI means gain exceeded cost; negative means a loss.",
      "ROI% is relative to cost — a large percent on a tiny stake can still be small money.",
      "Time is not inside basic ROI; state the holding period when you share results.",
    ],
    workedExample: {
      title: "Worked example — cost 5,000 / ending 6,200",
      steps: [
        "Cost = 5,000; gain = 6,200.",
        "Profit = 6,200 − 5,000 = 1,200.",
        "ROI% = (1,200 / 5,000) × 100 = 24%.",
      ],
      result: "Profit 1,200; ROI 24% for that holding period.",
    },
    faqs: [
      { question: "What does ROI stand for?", answer: "Return on investment — typically profit divided by cost, expressed as a percent." },
      { question: "Is ROI the same as CAGR?", answer: "No. CAGR annualizes growth over time. ROI is a simple cost-vs-gain ratio unless you annualize it yourself." },
      { question: "Should fees be in the cost?", answer: "Yes, if you want a realistic investor-style ROI." },
      { question: "Can ROI be over 100%?", answer: "Yes — that means profit exceeded the original cost." },
      { question: "Does currency matter?", answer: "Use one currency for both cost and gain. The picker only changes display formatting." },
    ],
  },
  cagr: {
    seoTitle: "CAGR Calculator — Compound Annual Growth Rate",
    seoDescription: "Compute compound annual growth rate from start value, end value, and years. Free CAGR calculator on MyCalcsWorld.",
    formulaNote: "CAGR = (End / Start)^(1 / years) − 1. It is the constant annual rate that grows Start into End over the stated years.",
    overview: "CAGR (compound annual growth rate) compresses a multi-year journey into a single annualized rate. MyCalcsWorld’s CAGR Calculator asks for start value, end value, and years, then reports the smoothed annual growth rate.\n\nInvestors and analysts use CAGR to compare funds or projects with different horizons. Remember: real paths are volatile; CAGR is a geometric average, not a promise of steady yearly returns.",
    whenToUse: [
      "Comparing two investments held for different numbers of years.",
      "Turning a start→end portfolio move into an annualized rate.",
      "Checking a pitch deck’s growth claim against start/end figures.",
    ],
    commonMistakes: [
      "Using months as years (or the reverse) in the tenure field.",
      "Treating CAGR as the return you earned each calendar year.",
      "Ignoring cash flows mid-period — basic CAGR assumes a single start and end.",
      "Comparing CAGR on different fee bases (gross vs net).",
    ],
    howToUse: [
      "Enter the starting value.",
      "Enter the ending value.",
      "Enter the number of years (use decimals for partial years if appropriate).",
      "Read CAGR as a percent and sanity-check against the span.",
    ],
    howToInterpret: [
      "CAGR is the constant rate that compounds Start into End over the years you entered.",
      "It does not show drawdowns or volatility along the way.",
      "Negative CAGR means the end value is below the start.",
    ],
    workedExample: {
      title: "Worked example — 10,000 → 19,500 over 7 years",
      steps: [
        "Start = 10,000; End = 19,500; years = 7.",
        "CAGR = (19,500/10,000)^(1/7) − 1 ≈ 0.1006 → about 10.1% per year.",
        "Check: 10,000 × (1.101)^7 ≈ 19,500.",
      ],
      result: "About 10.1% CAGR over 7 years for that start→end path.",
    },
    faqs: [
      { question: "What is CAGR?", answer: "Compound annual growth rate — the smoothed yearly rate that takes a start value to an end value over a stated number of years." },
      { question: "Does CAGR assume yearly deposits?", answer: "Basic CAGR assumes one start and one end. Mid-period contributions need a money-weighted approach." },
      { question: "CAGR vs average annual return?", answer: "A simple average of yearly returns can differ from CAGR. CAGR uses the geometric path from start to end." },
      { question: "Can I use months?", answer: "Convert to years (e.g. 18 months = 1.5 years) unless the form explicitly asks for months." },
      { question: "Is a higher CAGR always better?", answer: "Not by itself — risk, liquidity, fees, and goals matter." },
    ],
  },
  retirement: {
    seoTitle: "Retirement Calculator — Savings Growth Estimate",
    seoDescription: "Estimate retirement savings from current balance, contributions, return, and years. Free retirement planner-style calculator.",
    formulaNote: "Future value combines compounded current savings with the future value of regular contributions at an assumed constant return. Real products have fees, taxes, and sequence-of-returns risk this educational model omits.",
    overview: "Retirement planning starts with a transparent growth sketch: what you have now, what you add, what return you assume, and how many years you have. MyCalcsWorld’s Retirement Calculator projects a nest-egg illustration under those assumptions.\n\nIt is a planning aid — not a pension promise. Markets, inflation, fees, and withdrawal rules will move the real outcome. Pair with inflation and SIP tools for richer scenarios.",
    whenToUse: [
      "Sketching whether current saving rates point near a ballpark goal.",
      "Comparing higher contributions vs a longer horizon.",
      "Teaching time-value ideas with retirement-flavored inputs.",
    ],
    commonMistakes: [
      "Assuming a high constant return without testing a lower case.",
      "Ignoring inflation — today’s currency units shrink in purchasing power.",
      "Forgetting fees and taxes that reduce net compounding.",
      "Treating the illustration as a guaranteed pension quote.",
    ],
    howToUse: [
      "Enter your current retirement savings balance.",
      "Enter regular contribution amount and how it is applied (as the form labels).",
      "Set an assumed annual return and years until retirement.",
      "Read the projected balance and adjust one input at a time.",
    ],
    howToInterpret: [
      "The headline is an illustration at a constant assumed return — not a forecast.",
      "Higher contributions and more years usually matter as much as a slightly higher return.",
      "Run a pessimistic return case before you treat a number as a plan.",
    ],
    workedExample: {
      title: "Worked example — 25,000 balance, 400/month, 7%, 25 years",
      steps: [
        "Current = 25,000 compounds for 25 years at 7%.",
        "Monthly 400 contributions add a growing annuity at the same assumed return.",
        "Sum both pieces for an illustrated corpus (live panel shows the rounded total).",
        "Re-run at 5% to see how sensitive the goal is to return assumptions.",
      ],
      result: "A six-figure illustrated balance is typical under those demo assumptions — verify on the live form; not a guarantee.",
    },
    faqs: [
      { question: "Is this financial advice?", answer: "No. It is an educational growth illustration. Seek a licensed advisor for personal retirement planning." },
      { question: "What return should I assume?", answer: "Many planners show a range (e.g. 5–8% for diversified portfolios). Past performance is not a guarantee." },
      { question: "Does it include pensions?", answer: "Only if you fold those into your own inputs. The core model is savings + contributions + assumed return." },
      { question: "What about inflation?", answer: "This page works in nominal units unless you adjust. Use the inflation adjuster to think in today’s purchasing power." },
      { question: "Can I model drawdowns in retirement?", answer: "This tool focuses on accumulation. For withdrawal math, use a dedicated drawdown workflow." },
    ],
  },
  "currency-converter": {
    seoTitle: "Currency Converter — Live FX Rates",
    seoDescription: "Convert between world currencies with live educational FX rates. Free currency converter — USD, EUR, GBP, INR, AED, and more.",
    formulaNote: "Converted = amount × (rate_to / rate_from) using the latest educational reference rates fetched for this site. Spreads, card fees, and weekend market closures mean bank/cash rates differ.",
    overview: "Travel, shopping, and freelancing all need a quick FX sense-check. MyCalcsWorld’s live Currency Converter turns an amount from one currency into another using delayed educational reference rates — not a bank’s sell desk.\n\nPick source and target codes, enter an amount, and read the converted figure. For loan or SIP math in a single display currency, use the site currency picker on those tools instead of FX conversion.",
    whenToUse: [
      "Estimating what a price tag means in your home currency.",
      "Rough freelancing or remittance sketches before a bank quote.",
      "Teaching cross rates with live-ish educational numbers.",
    ],
    commonMistakes: [
      "Treating educational mid-market style quotes as the cash rate you will get at a desk.",
      "Forgetting card FX markups and ATM fees.",
      "Converting twice (FX tool + currency picker) and double-counting.",
      "Using stale tabs without refreshing rates.",
    ],
    howToUse: [
      "Choose the from and to currencies.",
      "Enter the amount to convert.",
      "Read the converted value and the implied rate.",
      "Refresh if rates look stale; confirm with your bank for real transfers.",
    ],
    howToInterpret: [
      "The result is an educational estimate from the site’s FX feed — not an executable trade.",
      "Retail spreads can move the number you actually receive.",
      "Large transfers deserve a dealer or bank quote, not a web estimate alone.",
    ],
    workedExample: {
      title: "Worked example — 1,000 USD to EUR",
      steps: [
        "Amount = 1,000; from = USD; to = EUR.",
        "Converted ≈ 1,000 × (EUR per USD reference rate).",
        "Compare to your card’s pending charge — the difference is mostly spread + fees.",
      ],
      result: "About 1,000 × live USD→EUR reference rate (see panel) — educational only.",
    },
    faqs: [
      { question: "Are these rates live tradable quotes?", answer: "No. They are delayed educational references. Banks and apps add spreads and fees." },
      { question: "Which currencies are supported?", answer: "Major codes including USD, EUR, GBP, INR, AED, and others exposed by the converter UI." },
      { question: "Why does my bank differ?", answer: "Retail FX includes spread, possible weekend pricing, and fees." },
      { question: "Is this the same as the currency picker?", answer: "No. The picker only formats money on other calculators. This page actually converts between currencies." },
      { question: "Do you store my amounts?", answer: "Conversions run in your browser session against the FX API. See Privacy for analytics details." },
    ],
  },
bmr: {
    seoTitle: "BMR Calculator — Basal Metabolic Rate",
    seoDescription: "Estimate basal metabolic rate with Mifflin–St Jeor style inputs. Free BMR calculator for educational calorie planning.",
    formulaNote: "Mifflin–St Jeor (common educational default): Men: BMR = 10w + 6.25h − 5a + 5; Women: BMR = 10w + 6.25h − 5a − 161, with weight w in kg, height h in cm, age a in years.",
    overview: "Basal metabolic rate (BMR) estimates the calories your body burns at complete rest. MyCalcsWorld’s BMR Calculator uses widely published educational equations (Mifflin–St Jeor style) from sex, age, height, and weight.\n\nBMR is not TDEE — activity multiplies the picture. Use the TDEE and macro tools next when you are planning intake. This is education, not medical advice.",
    whenToUse: [
      "Getting a resting-calorie ballpark before activity multipliers.",
      "Comparing how weight or age shifts an educational BMR estimate.",
      "Teaching metabolism basics with transparent formula notes.",
    ],
    commonMistakes: [
      "Mixing cm/in or kg/lb on the height and weight fields.",
      "Treating BMR as the calories you can eat while training hard (that is closer to TDEE).",
      "Using adult equations for pediatric or clinical populations without guidance.",
      "Expecting lab-grade calorimetry from a web form.",
    ],
    howToUse: [
      "Select sex as labeled on the form.",
      "Enter age, height, and weight in the units shown.",
      "Read BMR in kcal/day.",
      "Open TDEE next to apply an activity factor.",
    ],
    howToInterpret: [
      "BMR is a resting estimate — most people burn more once activity is included.",
      "Different equations can differ by a modest margin.",
      "Not a diagnosis — confirm major diet changes with a clinician.",
    ],
    workedExample: {
      title: "Worked example — 30y woman, 165 cm, 62 kg",
      steps: [
        "BMR = 10×62 + 6.25×165 − 5×30 − 161 = 620 + 1031.25 − 150 − 161.",
        "BMR ≈ 1,340 kcal/day (rounded).",
        "Lightly active TDEE would multiply this by an activity factor on the TDEE page.",
      ],
      result: "About 1,340 kcal/day BMR for those inputs — educational estimate.",
    },
    faqs: [
      { question: "BMR vs TDEE?", answer: "BMR is resting burn; TDEE multiplies for activity to estimate total daily expenditure." },
      { question: "Which formula do you use?", answer: "A Mifflin–St Jeor style educational default unless the form labels another equation." },
      { question: "Should athletes use this?", answer: "Athletes often need adjusted approaches. Treat this as a starting point." },
      { question: "Metric or imperial?", answer: "Match the field labels. Mixing units is the #1 BMR error." },
      { question: "Is this medical advice?", answer: "No. Educational only — not for diagnosis or treatment." },
    ],
  },
  tdee: {
    seoTitle: "TDEE Calculator — Total Daily Energy Expenditure",
    seoDescription: "Estimate total daily energy expenditure from BMR-style inputs and activity level. Free TDEE calculator on MyCalcsWorld.",
    formulaNote: "TDEE ≈ BMR × activity factor (sedentary ≈ 1.2 through very active ≈ 1.9, depending on the scale labeled on the form).",
    overview: "Total daily energy expenditure (TDEE) estimates how many calories you burn in a typical day including activity. MyCalcsWorld’s TDEE Calculator combines body metrics with an activity level to produce a planning range — not a lab measurement.\n\nUse it beside BMR and macro tools when sketching surplus or deficit goals. Confirm significant diet changes with a qualified professional.",
    whenToUse: [
      "Ballparking maintenance calories before a cut or lean bulk.",
      "Seeing how activity level changes estimated burn.",
      "Pairing with macros once you pick a calorie target.",
    ],
    commonMistakes: [
      "Picking an optimistic activity level you do not actually sustain.",
      "Unit mix-ups on height/weight.",
      "Treating TDEE as a fixed entitlement rather than an estimate that drifts with weight and NEAT.",
      "Ignoring medical conditions that change energy needs.",
    ],
    howToUse: [
      "Enter sex, age, height, and weight as labeled.",
      "Choose the activity level that best matches your week.",
      "Read estimated TDEE (kcal/day).",
      "Re-run with a lower activity level for a conservative plan.",
    ],
    howToInterpret: [
      "TDEE is a planning estimate — weigh trends over weeks matter more than one day’s math.",
      "Activity factors are coarse buckets, not GPS-tracked burn.",
      "Not medical advice.",
    ],
    workedExample: {
      title: "Worked example — BMR ~1,340 × 1.55 active",
      steps: [
        "Suppose BMR ≈ 1,340 kcal/day from the BMR tool.",
        "Moderate activity factor 1.55 → TDEE ≈ 2,077 kcal/day.",
        "A mild deficit might target ~300–500 kcal below that estimate — individual advice varies.",
      ],
      result: "About 2,080 kcal/day TDEE for that illustration — educational only.",
    },
    faqs: [
      { question: "What does TDEE mean?", answer: "Total daily energy expenditure — estimated calories burned per day including activity." },
      { question: "Which activity level should I pick?", answer: "Be honest. Most desk workers overestimate. When unsure, choose the lower plausible level." },
      { question: "Can I use TDEE for weight loss?", answer: "People often start from TDEE and create a modest deficit. Medical contexts need professional care." },
      { question: "Why does my wearable disagree?", answer: "Wearables and equations use different models. Use trend weight and energy as feedback." },
      { question: "Next step after TDEE?", answer: "Macro calculators can split calories into protein, carbs, and fat for educational planning." },
    ],
  },
  discount: {
    seoTitle: "Discount Calculator — Sale Price & Savings",
    seoDescription: "Calculate sale price and savings from original price and discount percent. Free discount calculator.",
    formulaNote: "Savings = price × (discount% / 100). Sale price = price − savings. Stacked discounts multiply sequentially.",
    overview: "Sale tags are easier when the math is explicit. MyCalcsWorld’s Discount Calculator turns an original price and off-percent into savings and the amount you pay.\n\nHandy for shopping, teaching percent applications, and catching stacked-discount mistakes.",
    whenToUse: [
      "Checking a sale tag against the listed percent off.",
      "Comparing two discount percents on the same item.",
      "Teaching sequential vs single discounts.",
    ],
    commonMistakes: [
      "Adding stacked percents instead of applying them sequentially.",
      "Forgetting taxes or shipping that still apply after the discount.",
      "Mixing currency symbols without converting.",
    ],
    howToUse: [
      "Enter the original price.",
      "Enter the discount percent.",
      "Read savings and sale price.",
      "For a second coupon, apply it to the already-reduced price in a second run.",
    ],
    howToInterpret: [
      "Sale price is what you pay before extra taxes/fees unless those are in the original price.",
      "Savings is the absolute money off — useful next to the percent.",
    ],
    workedExample: {
      title: "Worked example — 80 off 25%",
      steps: [
        "Price = 80; discount = 25%.",
        "Savings = 80 × 0.25 = 20.",
        "Sale = 80 − 20 = 60.",
      ],
      result: "Save 20; pay 60 before any extra fees.",
    },
    faqs: [
      { question: "How do stacked discounts work?", answer: "Apply each discount to the remaining price in order. 20% then 10% is not the same as 30% once." },
      { question: "Does this include sales tax?", answer: "Only if tax is already inside the price you entered." },
      { question: "Can I enter a coupon amount instead of percent?", answer: "This page is percent-oriented. Subtract a fixed coupon offline." },
      { question: "Is a bigger percent always the better deal?", answer: "Compare final sale prices — a smaller percent on a lower base can still win." },
      { question: "Currency?", answer: "Picker changes formatting only; enter prices already in one currency." },
    ],
  },
  compounding: {
    seoTitle: "Compounding Frequency Calculator — APY & Growth",
    seoDescription: "Compare how often interest compounds and what that means for effective yield and ending balance. Free compounding calculator.",
    formulaNote: "Effective annual rate (APY-style) ≈ (1 + r/n)^n − 1 for nominal rate r compounded n times per year.",
    overview: "Compounding frequency is the quiet lever behind APY. MyCalcsWorld’s Compounding Frequency Calculator helps you see how annual, monthly, daily, or continuous-style schedules change effective yield and ending balance at the same nominal rate.\n\nUse it when a bank touts “compounded daily” or when you are teaching why APY and APR are not identical.",
    whenToUse: [
      "Comparing APY-like outcomes across compounding schedules.",
      "Checking marketing claims that emphasize daily compounding.",
      "Teaching nominal vs effective rates.",
    ],
    commonMistakes: [
      "Confusing APR with APY.",
      "Assuming daily compounding doubles returns vs monthly — at retail rates the gap is usually small.",
      "Ignoring fees that dominate tiny compounding differences.",
    ],
    howToUse: [
      "Enter principal, nominal rate, and years.",
      "Compare frequencies the form offers.",
      "Read effective yield and ending balances.",
      "Decide whether the difference justifies product choice — often fees matter more.",
    ],
    howToInterpret: [
      "Higher n raises effective yield slightly at fixed nominal r.",
      "APY already bakes in frequency — compare APY to APY when shopping products.",
    ],
    workedExample: {
      title: "Worked example — 5% nominal, monthly vs annual",
      steps: [
        "Nominal r = 0.05.",
        "Annual compound effective = 5%.",
        "Monthly effective = (1 + 0.05/12)^12 − 1 ≈ 5.116%.",
        "On 10,000 for 1 year, monthly finishes a few dollars ahead of annual.",
      ],
      result: "About 5.12% effective monthly vs 5% annual at a 5% nominal rate — modest gap.",
    },
    faqs: [
      { question: "APR vs APY?", answer: "APR is a nominal-style quote; APY reflects compounding. Compare APY when asking what you actually earn in a year." },
      { question: "Is daily compounding a big deal?", answer: "At typical savings rates, the edge over monthly is small. Read fees and APY first." },
      { question: "Continuous compounding?", answer: "Uses e^(rt) − 1 for effective growth. More of a textbook limit than most retail products." },
      { question: "Same as compound interest calculator?", answer: "Same math family — this page emphasizes frequency comparison." },
      { question: "Taxes?", answer: "Not included. Taxable interest reduces what you keep." },
    ],
  },
  "credit-card-payoff": {
    seoTitle: "Credit Card Payoff Calculator — Time & Interest",
    seoDescription: "Estimate how long to pay off a credit card balance at a given APR and monthly payment. Free payoff calculator.",
    formulaNote: "Reducing-balance interest accrues on the outstanding principal. Months-to-payoff solves for the payment schedule at a fixed APR and fixed payment.",
    overview: "Credit card APRs turn revolving balances into expensive debt if you pay slowly. MyCalcsWorld’s Credit Card Payoff Calculator estimates months to clear a balance and the interest you might pay at a fixed APR and payment.\n\nUse it to compare “pay X more per month” scenarios before you commit. It is educational — issuer day-count, fees, and new charges will change reality.",
    whenToUse: [
      "Seeing how long a balance lasts at your planned payment.",
      "Comparing a higher payment vs a balance-transfer pitch.",
      "Teaching why minimum payments stretch interest.",
    ],
    commonMistakes: [
      "Entering monthly rate when the form expects annual APR.",
      "Forgetting new purchases that keep the balance alive.",
      "Ignoring annual fees in the total cost of carrying the card.",
    ],
    howToUse: [
      "Enter the current balance.",
      "Enter the annual APR.",
      "Enter the monthly payment you can sustain.",
      "Read months to payoff and estimated interest; raise payment to compare.",
    ],
    howToInterpret: [
      "If payment ≤ first month’s interest, the balance may never clear — raise payment.",
      "Total interest assumes no new charges and a constant APR.",
    ],
    workedExample: {
      title: "Worked example — 3,500 balance, 19.9% APR, 150/month",
      steps: [
        "Balance = 3,500; APR 19.9% → monthly rate ≈ 1.658%.",
        "Payment = 150 each month on a reducing balance.",
        "Live panel estimates months-to-zero and cumulative interest.",
        "Re-run at 200/month to see how much time and interest you save.",
      ],
      result: "Paying 150/month clears on the order of a couple of years with meaningful interest — check the live schedule; paying more cuts both.",
    },
    faqs: [
      { question: "Does this include new purchases?", answer: "No — it assumes you stop adding charges." },
      { question: "What if my payment is too low?", answer: "If payment does not cover interest, the tool should warn you. Increase payment carefully." },
      { question: "APR vs penalty rate?", answer: "Use the rate that applies to the balance you are modeling." },
      { question: "Avalanche vs snowball?", answer: "This page models one card. Multi-card strategies need a debt-payoff planner." },
      { question: "Is this advice?", answer: "Educational estimate only — not credit counseling." },
    ],
  },
scientific: {
    seoTitle: "Scientific Calculator — Online with Functions",
    seoDescription: "Free online scientific calculator for trig, logs, powers, and everyday technical math. Runs in your browser on MyCalcsWorld.",
    formulaNote: "Functions follow standard scientific-calculator conventions. Angle mode (degrees vs radians) matters for trig. Intermediate floating-point precision is IEEE-754 double.",
    overview: "Sometimes you need sin, log, and exponents without unlocking your phone’s hidden modes. MyCalcsWorld’s Scientific Calculator is a browser keypad for technical everyday math — homework checks, quick engineering sketches, and classroom demos.\n\nKeep angle mode in mind for trig. For symbolic algebra or graphing-heavy work, use the dedicated graphing / 3D tools nearby.",
    whenToUse: [
      "Homework that needs trig, logs, or powers quickly.",
      "Quick engineering arithmetic with parentheses.",
      "Demoing calculator hygiene (mode, parentheses) in class.",
    ],
    commonMistakes: [
      "Leaving the calculator in radians when the problem is in degrees (or reverse).",
      "Skipping parentheses so order of operations surprises you.",
      "Comparing rounded display digits to an exact fractional answer key.",
    ],
    howToUse: [
      "Enter expressions with the on-screen keys.",
      "Confirm degrees vs radians before trig.",
      "Use parentheses for nested operations.",
      "Clear and re-enter if a long chain becomes hard to audit.",
    ],
    howToInterpret: [
      "The display is a rounded floating-point result.",
      "Domain errors (e.g. log of a negative) should surface as errors — fix the input.",
    ],
    workedExample: {
      title: "Worked example — sin(30°) and 2^10",
      steps: [
        "Set degrees mode; compute sin(30) → 0.5.",
        "Compute 2^10 → 1024.",
        "Combine: 2^10 × sin(30) → 512.",
      ],
      result: "sin(30°)=0.5; 2^10=1024; product 512.",
    },
    faqs: [
      { question: "Degrees or radians?", answer: "Match your problem statement. Trig results are meaningless if the mode is wrong." },
      { question: "Is this a graphing calculator?", answer: "No — use the graphing / 3D function tools for plots." },
      { question: "Can I use it offline?", answer: "Once the page is loaded it runs in your browser; a network is needed to load the site initially." },
      { question: "Precision?", answer: "Double-precision math with readable rounding. Not a CAS for symbolic exactness." },
      { question: "Keyboard support?", answer: "Use the on-screen keypad for full function coverage; hardware keyboards vary by browser." },
    ],
  },
  "gold-value": {
    seoTitle: "Gold Value Calculator — Weight × Purity × Price",
    seoDescription: "Estimate gold value from weight, purity/karat, and reference price. Free gold value calculator — educational melt notionals.",
    formulaNote: "Notional ≈ weight × (purity fraction) × price per weight unit. Karat purity ≈ karat/24 (e.g. 22K ≈ 22/24).",
    overview: "Jewelry and bullion quotes make more sense when you can separate melt notionals from retail premiums. MyCalcsWorld’s Gold Value Calculator multiplies weight, purity, and a reference price so you can estimate a melt-style figure before talking to a dealer.\n\nHallmarks matter: wrong karat dominates errors. This is not a buy/sell bid.",
    whenToUse: [
      "Estimating melt notionals on a hallmark-stamped piece.",
      "Comparing how karat steps change value at the same weight.",
      "Preparing questions before a dealer visit.",
    ],
    commonMistakes: [
      "Wrong karat/fineness — the #1 jewelry melt error.",
      "Treating educational spot as the cash bid you will receive.",
      "Forgetting making charges and taxes on retail tickets.",
      "Mixing grams and troy ounces without converting.",
    ],
    howToUse: [
      "Enter weight in the unit the form labels.",
      "Set purity / karat accurately from the hallmark.",
      "Enter or load a reference price per unit weight.",
      "Read notional value; expect retail to differ.",
    ],
    howToInterpret: [
      "Output is weight × purity × reference price — a notional, not a dealer ticket.",
      "Live prices (when shown) are delayed educational feeds.",
    ],
    workedExample: {
      title: "Worked example — 10 g of 22K at a sample price",
      steps: [
        "Weight = 10 g; purity = 22/24 ≈ 0.9167.",
        "Fine gold mass ≈ 9.167 g.",
        "Notional = fine mass × price-per-gram reference.",
        "Dealer bid will usually sit below that notional after spreads.",
      ],
      result: "Notional scales with fine gold mass × price — check the live panel for the numeric total.",
    },
    faqs: [
      { question: "Is this the price I will get at a shop?", answer: "Usually not. Shops subtract spreads and may ignore making charges on buy-back." },
      { question: "22K vs 24K?", answer: "24K is finer; 22K is 22/24 pure. Same gross weight yields less fine gold at 22K." },
      { question: "Grams vs troy ounces?", answer: "Match the price unit to the weight unit. 1 troy ounce ≈ 31.1035 g." },
      { question: "Are spot prices live trades?", answer: "No — educational delayed references when live helpers are enabled." },
      { question: "Investment advice?", answer: "No. Educational estimate only." },
    ],
  },
  "metals-spot": {
    seoTitle: "Metals Spot Price Helper — Educational Quotes",
    seoDescription: "Check delayed educational spot-style references for precious metals. Free metals spot helper on MyCalcsWorld.",
    formulaNote: "Displayed figures come from delayed educational market references used by this site. They are not executable bids/offers.",
    overview: "Spot boards move all day — this helper gives an educational snapshot so jewelry and bullion math has a reference price to plug in. MyCalcsWorld’s Metals Spot tools are delayed references, not a trading terminal.\n\nUse them with gold-value / jewelry-melt calculators, then confirm with a dealer for actual settlements.",
    whenToUse: [
      "Grabbing a reference price before a melt estimate.",
      "Teaching how spot notionals differ from retail tags.",
      "Comparing metals on an educational basis.",
    ],
    commonMistakes: [
      "Trading against these numbers as if they were dealer bids.",
      "Ignoring unit (oz vs gram) mismatches.",
      "Forgetting premiums on retail bullion.",
    ],
    howToUse: [
      "Open the metals spot helper and read the quoted references.",
      "Note the unit (typically per troy ounce unless labeled otherwise).",
      "Copy into a metal-value / melt calculator with matching units.",
      "Confirm with a dealer before money changes hands.",
    ],
    howToInterpret: [
      "Delayed educational quotes — timestamps matter.",
      "Retail and pawn offers embed spreads far from mid-market references.",
    ],
    workedExample: {
      title: "Worked example — using spot in a melt estimate",
      steps: [
        "Read the educational gold reference per troy ounce.",
        "Convert to per-gram if your jewelry weight is in grams.",
        "Multiply by fine gold mass in the gold-value tool.",
        "Expect the dealer number to differ after spread.",
      ],
      result: "Spot feeds the notional; dealer settlement is a separate negotiation.",
    },
    faqs: [
      { question: "Can I trade on these prices?", answer: "No. Educational only — not a brokerage feed." },
      { question: "How often do they update?", answer: "On fetch/refresh cycles for this site’s commodities API — treat as delayed." },
      { question: "Which metals?", answer: "Those exposed in the live commodities UI (commonly gold, silver, and related)." },
      { question: "Why is my local shop so different?", answer: "Premiums, making charges, taxes, and buy-back spreads." },
      { question: "Next tool?", answer: "Gold value / jewelry melt calculators turn spot × weight × purity into notionals." },
    ],
  },
  "distance-3d": {
    seoTitle: "3D Distance Calculator — Space Between Points",
    seoDescription: "Calculate the distance between two points in 3D space. Free 3D distance calculator with formula notes.",
    formulaNote: "Distance = √((x2−x1)² + (y2−y1)² + (z2−z1)²).",
    overview: "Three-dimensional distance shows up in geometry homework, game math, and spatial sketches. MyCalcsWorld’s 3D Distance Calculator applies the Euclidean formula to two points you enter.\n\nPair with Pythagoras 3D visualizations when you want a geometric feel for the same identity.",
    whenToUse: [
      "Homework on spatial distance.",
      "Quick game-dev or graphics checks.",
      "Verifying a vector length between two coordinates.",
    ],
    commonMistakes: [
      "Dropping the z term (accidentally computing 2D distance).",
      "Mixing units across axes.",
      "Sign errors when subtracting coordinates.",
    ],
    howToUse: [
      "Enter (x1,y1,z1) and (x2,y2,z2).",
      "Read the Euclidean distance.",
      "Optionally square-check one component contribution on paper.",
    ],
    howToInterpret: [
      "Result is always non-negative.",
      "Zero means the points coincide.",
    ],
    workedExample: {
      title: "Worked example — (0,0,0) to (3,4,12)",
      steps: [
        "Δx=3, Δy=4, Δz=12.",
        "Distance = √(9+16+144) = √169 = 13.",
      ],
      result: "Distance 13 (same units as the coordinates).",
    },
    faqs: [
      { question: "2D vs 3D distance?", answer: "2D omits z. Use the matching tool for your dimension." },
      { question: "Manhattan distance?", answer: "This page is Euclidean (straight-line). Manhattan sums absolute axis steps." },
      { question: "Vector magnitude?", answer: "Distance from origin to (x,y,z) is the vector’s Euclidean norm." },
      { question: "Units?", answer: "Whatever you used for the coordinates — keep them consistent." },
      { question: "Related tools?", answer: "Pythagoras and 3D viz pages nearby for geometric intuition." },
    ],
  },
  "pythagoras-3d": {
    seoTitle: "3D Pythagoras Calculator — Space Diagonal",
    seoDescription: "Explore 3D Pythagorean relationships and space diagonals with interactive visualization. Free MyCalcsWorld tool.",
    formulaNote: "For a rectangular box with edges a, b, c, space diagonal d = √(a² + b² + c²).",
    overview: "Pythagoras in 3D connects edge lengths to space diagonals. MyCalcsWorld’s 3D Pythagoras experience pairs the identity with a visualization so students can see why √(a²+b²+c²) appears.\n\nUse it for solid-geometry homework and intuition — then confirm with a hand derivation when exams require it.",
    whenToUse: [
      "Finding a rectangular box’s space diagonal.",
      "Teaching 2D vs 3D Pythagorean extensions.",
      "Checking game-world movement magnitudes.",
    ],
    commonMistakes: [
      "Using only two edges when the problem needs all three.",
      "Forgetting to square-root after summing squares.",
      "Mixing units on a, b, c.",
    ],
    howToUse: [
      "Enter the three orthogonal lengths.",
      "Read the space diagonal (and any face diagonals shown).",
      "Use the visualization to relate edges to the diagonal.",
    ],
    howToInterpret: [
      "Larger any edge → larger diagonal.",
      "Result units match the edge units.",
    ],
    workedExample: {
      title: "Worked example — 3 × 4 × 12 box",
      steps: [
        "d = √(3² + 4² + 12²) = √(9+16+144) = √169 = 13.",
        "Face diagonal on 3×4 face = 5 (classic 3-4-5).",
      ],
      result: "Space diagonal 13; 3-4 face diagonal 5.",
    },
    faqs: [
      { question: "Is this the distance formula?", answer: "Yes — same Euclidean idea as distance from origin to (a,b,c)." },
      { question: "Do I need a right angle?", answer: "The a²+b²+c² form assumes orthogonal edges (a rectangular box)." },
      { question: "2D Pythagoras?", answer: "Use the standard Pythagoras calculator for plane right triangles." },
      { question: "Visualization required?", answer: "Helpful but optional — the numeric result stands alone." },
      { question: "Exam tip?", answer: "Write the identity before punching numbers; show √(a²+b²+c²)." },
    ],
  },
  "compound-interest-3d": {
    seoTitle: "3D Compound Interest Visualizer",
    seoDescription: "See compound growth as an interactive 3D bar visualization. Free educational compound interest visualizer.",
    formulaNote: "Underlying growth still follows compound interest: balances update by the rate each period. The 3D view is a teaching visualization.",
    overview: "Numbers grow quietly; bars make the story obvious. MyCalcsWorld’s 3D Compound Interest visualizer turns a compounding schedule into interactive bars so students and savers can feel how interest stacks.\n\nUse it beside the classic compound interest calculator when you want intuition, not only a final figure.",
    whenToUse: [
      "Teaching compounding with a memorable visual.",
      "Comparing rate or tenure changes visually.",
      "Engaging learners who glaze over pure formulas.",
    ],
    commonMistakes: [
      "Reading artistic bar height as a literal currency scale without checking axes.",
      "Forgetting the same caveats as any compound-interest model (fees, taxes, variable rates).",
    ],
    howToUse: [
      "Enter principal, rate, and periods as labeled.",
      "Watch the 3D bars update.",
      "Tweak rate or tenure and compare the shape of growth.",
      "Confirm exact figures on the numeric compound interest page if needed.",
    ],
    howToInterpret: [
      "Later bars taller than early bars illustrate interest-on-interest.",
      "Exact money figures belong to the numeric readout / sibling calculator.",
    ],
    workedExample: {
      title: "Worked example — visualizing 6% growth",
      steps: [
        "Set a modest principal and 6% annual-style rate.",
        "Step through several years — bars rise faster later.",
        "Lower the rate and notice flatter growth.",
      ],
      result: "Visual acceleration matches compound interest — verify numeric A = P(1+r)^t on the classic tool.",
    },
    faqs: [
      { question: "Is the 3D view precise accounting?", answer: "It is an educational visualization. Use the numeric compound interest calculator for exact figures." },
      { question: "Same formula as compound interest?", answer: "Yes — same family of growth; different presentation." },
      { question: "Can I include monthly deposits?", answer: "Follow the fields on this visualizer; for SIP-style contributions use the SIP tools." },
      { question: "Performance on phones?", answer: "Built to run in modern mobile browsers; reduce other tabs if the GPU is busy." },
      { question: "Advice?", answer: "Educational only — not investment advice." },
    ],
  },
  "break-even": {
    seoTitle: "Break-Even Calculator — Units to Cover Costs",
    seoDescription: "Find break-even units from fixed costs, price, and variable cost. Free break-even calculator for business planning.",
    formulaNote: "Break-even units = Fixed costs / (Price − Variable cost per unit). Contribution margin per unit = Price − Variable cost.",
    overview: "Break-even analysis asks how many units you must sell before fixed costs are covered. MyCalcsWorld’s Break-Even Calculator uses fixed costs, price per unit, and variable cost per unit to estimate that threshold.\n\nIt ignores taxes, inventory timing, and financing unless you folded them into the inputs — a transparent first cut before a full model.",
    whenToUse: [
      "Pricing a product with clear fixed and variable costs.",
      "Stress-testing whether a lower price still allows a break-even volume you can hit.",
      "Teaching contribution margin in a class or workshop.",
    ],
    commonMistakes: [
      "Confusing margin with markup when setting price.",
      "Leaving owner salary or rent out of fixed costs.",
      "Using break-even as a cash-flow forecast without timing.",
      "Price ≤ variable cost — math cannot save a negative contribution margin.",
    ],
    howToUse: [
      "Enter fixed costs for the period.",
      "Enter selling price per unit.",
      "Enter variable cost per unit.",
      "Read break-even units (and revenue if shown).",
    ],
    howToInterpret: [
      "Selling above break-even units contributes to profit (before items you excluded).",
      "Lower price raises required volume — check capacity.",
    ],
    workedExample: {
      title: "Worked example — fixed 10,000 / price 40 / variable 15",
      steps: [
        "Contribution = 40 − 15 = 25 per unit.",
        "Break-even units = 10,000 / 25 = 400.",
        "Break-even revenue = 400 × 40 = 16,000.",
      ],
      result: "400 units (16,000 revenue) to cover 10,000 fixed costs.",
    },
    faqs: [
      { question: "What is contribution margin?", answer: "Price minus variable cost per unit — what each sale contributes toward fixed costs and profit." },
      { question: "Does this include tax?", answer: "Only if you put tax into the cost or price fields yourself." },
      { question: "Multi-product businesses?", answer: "This page is single-product. Use weighted margins or a fuller model for mixes." },
      { question: "Break-even in money vs units?", answer: "Units × price gives revenue at break-even when the form shows it." },
      { question: "Is this accounting software?", answer: "No — transparent management math for planning." },
    ],
  },
  gpa: {
    seoTitle: "GPA Calculator — Grade Point Average",
    seoDescription: "Calculate GPA from course grades and credit hours. Free GPA calculator — match your school’s scale.",
    formulaNote: "GPA = Σ(grade points × credit hours) / Σ(credit hours). Scales differ (4.0 unweighted, weighted AP/IB, 10-point).",
    overview: "GPA math is a weighted average — credits matter as much as letter grades. MyCalcsWorld’s GPA Calculator totals grade points × credits and divides by credit hours so you can plan semesters transparently.\n\nAlways match your school’s scale and policies (weighted courses, repeated classes, rounded transcripts).",
    whenToUse: [
      "Estimating semester GPA from provisional grades.",
      "Planning how a tough course’s credits move your average.",
      "Checking “what if I get a B vs A” scenarios.",
    ],
    commonMistakes: [
      "Mixing 4.0 and 10-point scales in one run.",
      "Forgetting credit hours — unweighted averages of letters are not GPA.",
      "Ignoring retake / forgive policies your registrar uses.",
    ],
    howToUse: [
      "Enter each course’s grade points and credit hours as labeled.",
      "Add all courses for the term (or cumulative set) you care about.",
      "Read GPA and total credits.",
      "Scenario-plan by changing one grade at a time.",
    ],
    howToInterpret: [
      "Higher-credit courses pull GPA more strongly.",
      "Displayed GPA may round differently than your official transcript.",
    ],
    workedExample: {
      title: "Worked example — 4.0/3cr, 3.7/3cr, 3.3/4cr, 3.0/2cr",
      steps: [
        "Points = 4×3 + 3.7×3 + 3.3×4 + 3×2 = 12 + 11.1 + 13.2 + 6 = 42.3.",
        "Credits = 3+3+4+2 = 12.",
        "GPA = 42.3 / 12 = 3.525 → often reported 3.53 or 3.52 by policy.",
      ],
      result: "About 3.53 GPA on a 4.0-style scale for those courses.",
    },
    faqs: [
      { question: "Weighted vs unweighted?", answer: "Weighted scales give extra points for advanced courses. Enter the points your school actually uses." },
      { question: "Can I mix percentage grades?", answer: "Convert to grade points first using your institution’s chart." },
      { question: "Semester vs cumulative?", answer: "Include only the courses in the set you want averaged — or all courses for cumulative." },
      { question: "Pass/fail courses?", answer: "Usually excluded from GPA — follow your registrar." },
      { question: "Official record?", answer: "No. Transcripts win when numbers disagree." },
    ],
  },

  "refinance": {
    seoTitle: "Refinance Calculator — Payment Comparison",
    seoDescription: "Compare current vs new loan payments when refinancing. Free refinance calculator on MyCalcsWorld.",
    formulaNote: "Compares amortizing payments using the standard EMI/mortgage payment identity on each scenario; fees affect cash break-even when modeled.",
    overview: "Refinancing only helps if the new payment and total interest story beats your current loan after fees. MyCalcsWorld’s Refinance Calculator lets you compare scenarios side by side so you can see payment changes before talking to a lender.\n\nClosing costs and cash-out amounts matter — include them when the form asks.",
    whenToUse: [
      "When you specifically need refinance calculator — payment comparison math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — rate drop with fees",
      steps: [
        "Enter remaining balance, current rate/term, and proposed rate/term.",
        "Include estimated refinance fees if the form has a field.",
        "Compare new payment vs old and note break-even months if shown.",
        "Re-run with a smaller rate cut to stress-test the benefit."
      ],
      result: "A lower rate can cut the payment, but fees may delay break-even — check the live comparison.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Refinance Calculator — Payment Comparison for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Refinance Calculator — Payment Comparison?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },





  "sales-tax": {
    seoTitle: "Sales Tax Calculator — Add or Remove Tax",
    seoDescription: "Add or back out sales tax from a price. Free sales tax calculator for receipts and invoices.",
    formulaNote: "See the live Sales Tax Calculator — Add or Remove Tax formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "Receipts and invoices often need tax added or removed cleanly. MyCalcsWorld’s Sales Tax Calculator applies a percent to a net or gross figure so you can reconcile tickets quickly.\n\nTax rules vary by place — enter the rate that applies to your case.",
    whenToUse: [
      "When you specifically need sales tax calculator — add or remove tax math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — 8% on 50",
      steps: [
        "Net = 50; tax rate = 8%.",
        "Tax = 50 × 0.08 = 4.",
        "Gross = 54.",
        "To back tax out of 54 at 8%: net = 54 / 1.08 = 50."
      ],
      result: "Tax 4; gross 54 — or net 50 when removing 8% from 54.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Sales Tax Calculator — Add or Remove Tax for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Sales Tax Calculator — Add or Remove Tax?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "npv": {
    seoTitle: "NPV Calculator — Net Present Value",
    seoDescription: "Estimate net present value of cash flows at a discount rate. Free NPV calculator for project checks.",
    formulaNote: "See the live NPV Calculator — Net Present Value formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "NPV discounts future cash flows to today so projects with different timings can be compared. MyCalcsWorld’s NPV Calculator applies a discount rate to the cash flows you enter.\n\nIt is a teaching and first-cut tool — not a full capital-budgeting suite.",
    whenToUse: [
      "When you specifically need npv calculator — net present value math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — simple two-period project",
      steps: [
        "Enter initial outflow as a negative cash flow.",
        "Enter later inflows and the discount rate.",
        "Sum discounted values for NPV.",
        "Positive NPV means value above the discount hurdle under these assumptions."
      ],
      result: "Sign and magnitude of NPV depend on rate and timing — check the live panel.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the NPV Calculator — Net Present Value for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the NPV Calculator — Net Present Value?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "rule-of-72": {
    seoTitle: "Rule of 72 Calculator — Doubling Time",
    seoDescription: "Estimate years to double money with the Rule of 72. Free doubling-time calculator.",
    formulaNote: "See the live Rule of 72 Calculator — Doubling Time formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "The Rule of 72 is a quick mental model: years to double ≈ 72 / rate%. MyCalcsWorld’s Rule of 72 Calculator makes that estimate instant and reminds you it is an approximation to true compound doubling time.\n\nUse the compound interest tool for exact future value.",
    whenToUse: [
      "When you specifically need rule of 72 calculator — doubling time math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — 8% rate",
      steps: [
        "Rate = 8%.",
        "Years ≈ 72 / 8 = 9.",
        "Exact compound doubling time is ln(2)/ln(1.08) ≈ 9.01 years — close."
      ],
      result: "About 9 years to double at 8% by the Rule of 72.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Rule of 72 Calculator — Doubling Time for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Rule of 72 Calculator — Doubling Time?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "inflation-adjuster": {
    seoTitle: "Inflation Adjuster — Real vs Nominal Value",
    seoDescription: "Adjust money for inflation between two years. Free inflation adjuster on MyCalcsWorld.",
    formulaNote: "See the live Inflation Adjuster — Real vs Nominal Value formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "A currency unit today is not the same purchasing power as years ago. MyCalcsWorld’s Inflation Adjuster scales amounts between years using an assumed inflation rate so you can compare real values.\n\nOfficial CPI series may differ from a constant-rate assumption.",
    whenToUse: [
      "When you specifically need inflation adjuster — real vs nominal value math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — 1,000 over 10 years at 3%",
      steps: [
        "Amount = 1,000; years = 10; inflation = 3%.",
        "Future nominal equivalent ≈ 1,000 × (1.03)^10 ≈ 1,343.92.",
        "Or discount a future amount back the same way."
      ],
      result: "About 1,344 in then-year units for 1,000 today at 3% over 10 years.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Inflation Adjuster — Real vs Nominal Value for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Inflation Adjuster — Real vs Nominal Value?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "macros": {
    seoTitle: "Macro Calculator — Protein Carbs Fat Split",
    seoDescription: "Split daily calories into protein, carbs, and fat. Free macro calculator for educational meal planning.",
    formulaNote: "See the live Macro Calculator — Protein Carbs Fat Split formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "Macro splits turn a calorie target into grams of protein, carbohydrates, and fat. MyCalcsWorld’s Macro Calculator applies the ratios or gram targets you choose for educational meal planning.\n\nNot medical or sports-nutrition advice — athletes and clinical cases need professionals.",
    whenToUse: [
      "When you specifically need macro calculator — protein carbs fat split math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — 2,000 kcal with a balanced split",
      steps: [
        "Calories = 2,000.",
        "Apply the form’s default ratio or gram targets.",
        "Convert kcal from each macro using 4/4/9 kcal per gram for protein/carbs/fat.",
        "Adjust protein upward for training goals if appropriate — individually."
      ],
      result: "Gram totals depend on the ratio you pick — see the live panel.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Macro Calculator — Protein Carbs Fat Split for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Macro Calculator — Protein Carbs Fat Split?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "body-fat-navy": {
    seoTitle: "Navy Body Fat Calculator — Tape Estimate",
    seoDescription: "Estimate body fat percentage with the U.S. Navy tape method. Free educational body-fat calculator.",
    formulaNote: "See the live Navy Body Fat Calculator — Tape Estimate formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "The Navy tape method estimates body-fat percentage from circumference measurements. MyCalcsWorld’s Navy Body Fat Calculator implements that educational equation from the measurements you enter.\n\nTape estimates differ from DEXA or Bod Pod — use them as ballparks, not diagnoses.",
    whenToUse: [
      "When you specifically need navy body fat calculator — tape estimate math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — tape inputs on the form defaults",
      steps: [
        "Enter sex, height, and the circumference fields labeled on the form.",
        "Keep units consistent (cm or inches as shown).",
        "Read estimated body-fat % and category labels if shown.",
        "Re-measure carefully — tape placement dominates error."
      ],
      result: "The live panel shows the Navy-method estimate for your inputs — educational only.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Navy Body Fat Calculator — Tape Estimate for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Navy Body Fat Calculator — Tape Estimate?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "cooking-converter": {
    seoTitle: "Cooking Converter — Cups Grams & More",
    seoDescription: "Convert common cooking measures between cups, grams, ml, and more. Free cooking converter.",
    formulaNote: "See the live Cooking Converter — Cups Grams & More formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "Recipes cross unit systems all the time. MyCalcsWorld’s Cooking Converter helps you move between cups, grams, milliliters, and related measures for kitchen planning.\n\nIngredient density matters for volume↔weight — when unsure, prefer a scale.",
    whenToUse: [
      "When you specifically need cooking converter — cups grams & more math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — cups to ml",
      steps: [
        "Enter the amount and choose from/to units.",
        "For water-like liquids, 1 US cup ≈ 240 ml.",
        "For flour or sugar, prefer weight when the recipe allows — density varies.",
        "Convert back once to confirm."
      ],
      result: "Unit pair result appears in the panel — density caveats apply for weight conversions.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Cooking Converter — Cups Grams & More for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Cooking Converter — Cups Grams & More?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "graphing-calculator": {
    seoTitle: "Graphing Calculator — Plot Functions",
    seoDescription: "Plot functions and explore graphs in your browser. Free graphing calculator on MyCalcsWorld.",
    formulaNote: "See the live Graphing Calculator — Plot Functions formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "Graphs make functions obvious. MyCalcsWorld’s Graphing Calculator plots expressions so students and curious learners can explore intercepts and shapes quickly.\n\nFor 3D surfaces, open the 3D function tools nearby.",
    whenToUse: [
      "When you specifically need graphing calculator — plot functions math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — y = x² − 5x + 6",
      steps: [
        "Enter the expression as the form accepts it.",
        "Set a sensible x range.",
        "Observe roots near x = 2 and x = 3 for this quadratic.",
        "Zoom or re-range if the interesting part is off-screen."
      ],
      result: "Parabola crossing the x-axis near 2 and 3 — confirm with the quadratic solver.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Graphing Calculator — Plot Functions for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Graphing Calculator — Plot Functions?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "percentage-mega": {
    seoTitle: "Percentage Mega Calculator — Multi-mode Percents",
    seoDescription: "All-in-one percentage toolkit: percent of, change, reverse, and more. Free percentage mega calculator.",
    formulaNote: "See the live Percentage Mega Calculator — Multi-mode Percents formula notes on MyCalcsWorld for the exact identity used in this build.",
    overview: "Sometimes you need several percent operations in one place. MyCalcsWorld’s Percentage Mega Calculator packs common modes — percent of, change, and reverse-style helpers — with clear labels so the base never gets confused.\n\nPair with discount and tip tools for shopping-specific flows.",
    whenToUse: [
      "When you specifically need percentage mega calculator — multi-mode percents math rather than a neighboring tool.",
      "When you want a transparent second opinion before a spreadsheet or quote.",
      "When teaching or checking a worked example with live numbers."
    ],
    commonMistakes: [
      "Entering values in the wrong units or mixing similar definitions.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice."
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results, then any chart or table.",
      "Skim the guide below before relying on the figure."
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain what was included or excluded.",
      "Educational estimate only — verify critical numbers independently."
    ],
    workedExample: {
      title: "Worked example — reverse a 20% increase",
      steps: [
        "Final amount after +20% = 120.",
        "Original = 120 / 1.20 = 100.",
        "Percent of: 20% of 100 = 20.",
        "Change from 100 to 120 = +20%."
      ],
      result: "Original 100; increase amount 20; confirm mode labels on the form.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only. Confirm critical decisions with a qualified professional." },
      { question: "Who is the Percentage Mega Calculator — Multi-mode Percents for?", answer: "Anyone who needs a clear, browser-based estimate for this topic without signing up." },
      { question: "Will my inputs be stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics details." },
      { question: "How accurate is the Percentage Mega Calculator — Multi-mode Percents?", answer: "It follows the published educational formula on this page. Product rules, labs, and institutions may differ." },
      { question: "Mobile friendly?", answer: "Yes — the form and results are laid out for phones as well as desktops." }
    ],
  },

  "cd-apy": {
    seoTitle: "CD / APY Calculator — Yield & Maturity Estimate",
    seoDescription:
      "Convert APR to APY and project certificate of deposit maturity. Free CD APY calculator with compounding choices, worked example, and FAQs — educational only.",
    formulaNote:
      "APY = (1 + APR/n)^n − 1, where n is compounds per year. Maturity illustration uses compound growth A = P(1 + APR/n)^(n·t) for term t in years. Bank day-count and early-withdrawal penalties can differ.",
    overview:
      "A certificate of deposit (CD) locks money for a term in exchange for a stated yield. Brochures often show APR and APY side by side — APY already folds in compounding so you can compare products fairly.\n\nMyCalcsWorld’s CD / APY Calculator turns a deposit, APR, compounding schedule, and term into an APY-style effective yield and an ending-balance sketch. Use it next to the Daily Compound and classic Compound Interest tools when you want day-by-day detail or a single-lump growth check. Confirm day-count and penalties on the real disclosure before you open an account.",
    whenToUse: [
      "Comparing two CD quotes with different compounding frequencies.",
      "Turning a nominal APR into an APY-style effective yield.",
      "Sketching maturity value before you talk to a bank or credit union.",
      "Teaching why daily compounding raises APY slightly at the same APR.",
    ],
    commonMistakes: [
      "Comparing APR on one product to APY on another without converting.",
      "Ignoring early-withdrawal penalties that can erase the yield advantage.",
      "Assuming the display currency converts FX — formatting only.",
      "Using promotional teaser rates that apply only to a short introductory window.",
    ],
    howToUse: [
      "Enter the deposit (principal).",
      "Enter the nominal APR the institution quotes.",
      "Choose compounding frequency (daily is common on many CDs).",
      "Set the term in years (use 0.5 for six months).",
      "Read APY and projected maturity value; re-run with another compounding choice to compare.",
    ],
    howToInterpret: [
      "APY is the effective annual yield if compounding follows the schedule you chose.",
      "Maturity value assumes you leave interest in the CD for the full term.",
      "Real disclosures may use actual/365 or other day-count conventions — treat this as an educational estimate.",
    ],
    workedExample: {
      title: "Worked example — $10,000 at 4.5% APR, daily compounding, 2 years",
      steps: [
        "APR = 4.5% = 0.045; n = 365; t = 2; P = 10,000.",
        "APY = (1 + 0.045/365)^365 − 1 ≈ 4.602%.",
        "A = 10,000 × (1 + 0.045/365)^(365×2) ≈ 10,941 (rounded).",
        "Monthly compounding at the same APR would finish a few dollars lower — frequency matters modestly at retail rates.",
      ],
      result:
        "About 4.60% APY and roughly $10,941 maturity before taxes and penalties — confirm with the bank disclosure.",
    },
    faqs: [
      { question: "What is the difference between APR and APY?", answer: "APR is the nominal annual rate; APY is the effective annual yield after compounding. APY is usually the fairer number for comparing deposit products." },
      { question: "Does daily compounding always win?", answer: "At the same APR, more frequent compounding raises APY slightly. Product fees and penalties often matter more than the last basis point of compounding." },
      { question: "Are CD early-withdrawal penalties included?", answer: "Not automatically. If you might break the term, ask the issuer how interest is forfeited." },
      { question: "Is this the same as the Daily Compound Interest calculator?", answer: "Related family — CD/APY focuses on APR→APY and maturity for a certificate-style deposit. Daily Compound adds reinvest %, deposits, and weekend filters day by day." },
      { question: "Can I model a bump-up or callable CD?", answer: "This page assumes a fixed APR for the term. Specialty CDs need scenario runs or the issuer’s worksheet." },
      { question: "Does currency picker change yield math?", answer: "No — it only formats money. The APY formula is currency-agnostic." },
    ],
  },

  "net-worth": {
    seoTitle: "Net Worth Calculator — Assets Minus Liabilities",
    seoDescription: "Calculate net worth from assets and liabilities. Free net worth calculator.",
    overview: "Net worth is a snapshot: what you own minus what you owe. MyCalcsWorld’s Net Worth Calculator totals assets and liabilities so you can track a personal balance-sheet style figure.\n\nIt is a planning snapshot — not a credit score or loan approval.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — sample household snapshot",
      steps: [
        "List liquid and long-term assets in the asset fields.",
        "List mortgage, cards, and other debts as liabilities.",
        "Net worth = assets − liabilities.",
        "Re-run quarterly to see trend, not just one day."
      ],
      result: "Positive net worth means assets exceed debts on the figures you entered.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "salary-hike": {
    seoTitle: "Salary Hike Calculator — Raise Impact",
    seoDescription: "See how a percent raise changes salary. Free salary hike calculator.",
    overview: "A raise percent is clearer when you see the new annual and monthly figures. MyCalcsWorld’s Salary Hike Calculator applies the hike to your current pay so you can plan budgets.\n\nTaxes and benefits may change the take-home differently than the gross hike.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 8% on 60,000",
      steps: [
        "Current = 60,000; hike = 8%.",
        "Increase = 4,800; new = 64,800.",
        "Monthly gross rises by 400 before tax."
      ],
      result: "New salary 64,800; raise amount 4,800 before tax.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "emi-extra-payments": {
    seoTitle: "EMI Extra Payments Calculator — Prepay Impact",
    seoDescription: "See how extra EMI payments cut tenure and interest. Free prepayment calculator.",
    overview: "Prepaying principal can shorten loans and trim interest. MyCalcsWorld’s EMI Extra Payments Calculator sketches the impact of additional payments on an amortizing loan under fixed-rate assumptions.\n\nCheck your lender’s prepayment rules and fees.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — add monthly prepayment",
      steps: [
        "Enter principal, rate, tenure, and base EMI inputs as labeled.",
        "Add an extra monthly prepayment amount.",
        "Compare tenure and interest vs the base schedule.",
        "Try a one-time lump sum scenario if the form supports it."
      ],
      result: "Extra payments usually cut months and interest — confirm on the live comparison.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "percentage-change": {
    seoTitle: "Percentage Change Calculator",
    seoDescription: "Calculate percent increase or decrease between two numbers. Free percentage change calculator.",
    overview: "Percent change answers how much something moved relative to its start. MyCalcsWorld’s Percentage Change Calculator uses ((new − old) / old) × 100 with clear labels so the base stays obvious.\n\nUse it for prices, scores, and portfolio moves — and remember a rise and a later fall use different bases.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 80 to 92",
      steps: [
        "Old = 80; new = 92.",
        "Change = 12; percent = 12/80 × 100 = 15%.",
        "A drop from 92 to 80 is −13.04% (different base)."
      ],
      result: "15% increase from 80 to 92.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "percentage-of": {
    seoTitle: "Percentage Of Calculator",
    seoDescription: "Find what percent one number is of another, or p% of an amount. Free percentage-of calculator.",
    overview: "“What percent is A of B?” and “what is p% of X?” are everyday questions. MyCalcsWorld’s Percentage Of Calculator keeps both modes labeled so homework and shopping math stay clean.\n\nAlways confirm which quantity is the base before you screenshot a result.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 15 is what percent of 60",
      steps: [
        "A = 15; B = 60.",
        "Percent = 15/60 × 100 = 25%.",
        "Also: 25% of 60 = 15."
      ],
      result: "15 is 25% of 60.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "ratio": {
    seoTitle: "Ratio Calculator — Simplify & Compare",
    seoDescription: "Simplify ratios and compare parts. Free ratio calculator for students and everyday math.",
    overview: "Ratios compare parts without forcing percents. MyCalcsWorld’s Ratio Calculator simplifies and scales ratios so recipes, maps, and homework stay consistent.\n\nEnter the parts, read the simplified form, and scale to a target whole when you need equivalent ratios for real-world quantities.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 8:12",
      steps: [
        "8:12 divides by 4 → 2:3.",
        "If the whole is 30 parts at 2:3, parts are 12 and 18.",
        "Confirm by cross-multiplying equivalents."
      ],
      result: "8:12 simplifies to 2:3.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "ideal-weight": {
    seoTitle: "Ideal Weight Calculator — Educational Ranges",
    seoDescription: "Estimate educational ideal body-weight ranges from height. Free ideal weight calculator.",
    overview: "Ideal-weight formulas are population heuristics, not prescriptions. MyCalcsWorld’s Ideal Weight Calculator shows educational ranges from height using published methods labeled on the page.\n\nAthletes and medical contexts need professional guidance.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — height-based range",
      steps: [
        "Enter height in the labeled unit.",
        "Read the formula range shown.",
        "Treat it as a ballpark, not a goal mandate.",
        "Pair with BMI for another educational lens."
      ],
      result: "Range depends on the formula selected — see the live panel.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "pace": {
    seoTitle: "Pace Calculator — Speed Distance Time",
    seoDescription: "Convert between running/walking pace, speed, and time. Free pace calculator.",
    overview: "Training plans talk in pace; courses talk in distance and time. MyCalcsWorld’s Pace Calculator converts among pace, speed, and finish time so workouts are easier to plan.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 5 km in 25 minutes",
      steps: [
        "Distance = 5 km; time = 25 min.",
        "Pace = 5:00 per km.",
        "Speed = 12 km/h."
      ],
      result: "5:00/km pace; 12 km/h.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "fuel-economy": {
    seoTitle: "Fuel Economy Calculator — MPG & L/100km",
    seoDescription: "Convert and estimate fuel economy between MPG and L/100km. Free fuel economy calculator.",
    overview: "Fuel economy figures cross unit systems. MyCalcsWorld’s Fuel Economy Calculator converts and estimates consumption so trip planning and car comparisons stay consistent worldwide.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 30 MPG to L/100km",
      steps: [
        "MPG (US) 30 ≈ 7.84 L/100km.",
        "Higher MPG means lower L/100km.",
        "Real trips vary with traffic and load."
      ],
      result: "About 7.8 L/100km for 30 US MPG.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "slope": {
    seoTitle: "Slope Calculator — Rise Over Run",
    seoDescription: "Calculate slope from two points or rise/run. Free slope calculator for algebra and geometry.",
    overview: "Slope measures steepness: rise over run. MyCalcsWorld’s Slope Calculator computes m from coordinates or rise/run so algebra homework checks stay fast.\n\nVertical lines have undefined slope when the run is zero — the tool will surface that case.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — (1,2) to (4,8)",
      steps: [
        "Δy = 6; Δx = 3.",
        "Slope m = 6/3 = 2.",
        "Undefined if Δx = 0 (vertical line)."
      ],
      result: "Slope 2.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "factorial": {
    seoTitle: "Factorial Calculator — n!",
    seoDescription: "Calculate factorials for permutations and combinatorics prep. Free factorial calculator.",
    overview: "n! multiplies 1 through n and appears in permutations and series. MyCalcsWorld’s Factorial Calculator computes factorials for integers in a safe range with clear overflow messaging when numbers get huge.\n\nPair with combinatorics tools when you need nPr or nCr next.",
    whenToUse: [
      "When you need this specific calculation rather than a neighboring tool.",
      "When you want a transparent browser estimate before a spreadsheet.",
      "When checking homework or a quick plan with live numbers.",
    ],
    commonMistakes: [
      "Entering values in the wrong units or flipping numerator/denominator.",
      "Trusting a single run without a sensitivity check.",
      "Treating an educational estimate as professional advice.",
    ],
    howToUse: [
      "Open the form and review the labeled fields.",
      "Enter your values or tap Try example for demo numbers.",
      "Read the primary results and any secondary breakdown.",
      "Skim the guide below before relying on the figure.",
    ],
    howToInterpret: [
      "Primary metrics appear at the top of the results panel.",
      "Hints under results explain definitions and caveats.",
      "Educational estimate only — verify critical numbers independently.",
    ],
    workedExample: {
      title: "Worked example — 6!",
      steps: [
        "6! = 6×5×4×3×2×1 = 720.",
        "0! is defined as 1.",
        "Factorials grow very fast — large n may overflow display."
      ],
      result: "720.",
    },
    faqs: [
      { question: "Is this professional advice?", answer: "No — educational estimates only." },
      { question: "Who is this for?", answer: "Anyone who needs a clear, browser-based estimate without signing up." },
      { question: "Are inputs stored on a server?", answer: "Calculations run in your browser session. See Privacy for analytics." },
      { question: "How accurate is it?", answer: "It follows the educational formula on this page; institutions and products may differ." },
      { question: "Mobile friendly?", answer: "Yes — forms and results are laid out for phones and desktops." },
    ],
  },

  "apr-vs-apy": {
    seoTitle: "APR vs APY Comparator — See Compounding Lift",
    seoDescription:
      "Compare nominal APR to effective APY for any compounding schedule. Free side-by-side APR vs APY calculator with formula, example, and FAQs.",
    formulaNote:
      "APY = (1 + APR/n)^n − 1, with APR as a decimal and n = compounds per year. The gap APY − APR is the compounding lift for that schedule.",
    overview:
      "APR and APY get mixed up constantly — one is nominal, the other is effective after compounding. MyCalcsWorld’s APR vs APY Comparator puts them side by side so you can see how monthly or daily compounding lifts the effective yield.\n\nEnter a nominal APR and compounds per year. Read APY and the difference. Pair with CD/APY or Daily Compound when you also need a balance projection.",
    whenToUse: [
      "Reading a loan or savings quote that lists APR and APY differently.",
      "Teaching why more frequent compounding raises effective yield.",
      "Sanity-checking a marketing APY against the stated APR and schedule.",
    ],
    commonMistakes: [
      "Comparing one product’s APR to another’s APY.",
      "Forgetting that loan APR may include fees while deposit APY usually does not use the same fee rules.",
      "Assuming continuous compounding when the product compounds monthly.",
    ],
    howToUse: [
      "Enter the nominal APR.",
      "Choose compounds per year.",
      "Read APY and the compounding lift.",
      "Re-run with another frequency to compare.",
    ],
    howToInterpret: [
      "APY ≥ APR when APR ≥ 0 and n ≥ 1 (for standard positive rates).",
      "Larger n raises APY toward the continuous-compounding limit.",
      "Educational — product disclosures define the legal APY/APR labels in your region.",
    ],
    workedExample: {
      title: "Worked example — 5% APR compounded monthly",
      steps: [
        "APR = 0.05; n = 12.",
        "APY = (1 + 0.05/12)^12 − 1 ≈ 5.116%.",
        "Lift ≈ 0.116 percentage points from compounding.",
      ],
      result: "About 5.12% APY from a 5% nominal APR with monthly compounding.",
    },
    faqs: [
      { question: "Why is APY higher than APR?", answer: "Because interest compounds inside the year, so the effective annual yield exceeds the nominal rate." },
      { question: "What n should I use for daily?", answer: "Often 365 (sometimes 360 in banking conventions). Match the disclosure when you can." },
      { question: "Does this include loan fees?", answer: "No — it converts a nominal rate given compounding frequency. Fee-inclusive APR rules differ by product and country." },
      { question: "How is this different from APR to APY Converter?", answer: "Same math family — this comparator emphasizes the side-by-side lift; the converter is a focused APR→APY tool." },
      { question: "Is continuous compounding supported?", answer: "Use a very large n as an approximation, or the continuous compound tool when available." },
    ],
  },

  "apr-to-apy": {
    seoTitle: "APR to APY Converter — Effective Annual Yield",
    seoDescription:
      "Convert nominal APR to APY for annual, quarterly, monthly, or daily compounding. Free APR to APY converter with worked example.",
    formulaNote:
      "APY = (1 + APR/n)^n − 1. Enter APR in percent; the tool converts to a decimal internally.",
    overview:
      "Need a quick effective yield from a nominal APR? MyCalcsWorld’s APR to APY Converter is the focused one-step tool: pick compounding frequency, read APY.\n\nIt is ideal when you already know the schedule and just want the effective annual number — then jump to CD/APY or compound interest if you also need a balance.",
    whenToUse: [
      "Converting a brochure APR into an APY-style effective yield.",
      "Homework checks on the (1+r/n)^n − 1 identity.",
      "Comparing monthly vs daily compounding on the same APR.",
    ],
    commonMistakes: [
      "Entering APY into an APR field on another form afterward.",
      "Using 360 vs 365 day bases inconsistently.",
      "Ignoring that advertised loan APR may embed fees.",
    ],
    howToUse: [
      "Enter APR (%).",
      "Choose compounds per year.",
      "Read APY.",
      "Optionally compare with the APR vs APY comparator page.",
    ],
    howToInterpret: [
      "APY is the effective annual yield under the compounding assumption.",
      "It does not by itself show fees, taxes, or penalties.",
      "Educational estimate — match your product’s disclosure.",
    ],
    workedExample: {
      title: "Worked example — 5.99% APR monthly",
      steps: [
        "APR = 0.0599; n = 12.",
        "APY = (1 + 0.0599/12)^12 − 1 ≈ 6.15%.",
      ],
      result: "Roughly 6.15% APY from 5.99% APR compounded monthly.",
    },
    faqs: [
      { question: "Is APY the same worldwide?", answer: "The compounding idea is universal; legal labels and fee inclusion differ by country and product." },
      { question: "Can I convert APY back to APR?", answer: "Yes algebraically: APR = n · ((1+APY)^(1/n) − 1). This page focuses on APR→APY." },
      { question: "Daily compounding uses 365 or 360?", answer: "Many consumer calculators use 365; some banks use 360. Match the disclosure." },
      { question: "Does this project my balance?", answer: "No — use CD/APY or Compound Interest for balances; this converter is rate-only." },
    ],
  },

  "debt-payoff": {
    seoTitle: "Debt Payoff Calculator — Months, Interest & Total Paid",
    seoDescription:
      "Estimate how long to pay off a credit card or loan with fixed monthly payments. Free debt payoff calculator with interest totals and FAQs.",
    formulaNote:
      "Each month: interest = balance × (APR/12/100); principal reduction = payment − interest. Repeat until balance clears. If payment ≤ first-month interest, payoff never occurs.",
    overview:
      "Minimum payments can hide how long high-APR balances linger. MyCalcsWorld’s Debt Payoff Calculator runs a fixed monthly payment against a balance and APR to estimate months to clear, total interest, and total paid.\n\nUse it for credit cards, personal loans, or any amortizing consumer debt where you control the payment. Pair with EMI extra-payments or amortization tools when you want a full schedule chart.",
    whenToUse: [
      "Stress-testing a larger monthly payment to shorten payoff.",
      "Seeing total interest if you only pay a fixed amount.",
      "Comparing payoff timelines before a balance transfer.",
    ],
    commonMistakes: [
      "Entering a payment that does not cover monthly interest — the tool will say so.",
      "Forgetting new purchases that keep a revolving balance alive.",
      "Ignoring fees and penalty APRs that real cards can trigger.",
    ],
    howToUse: [
      "Enter the current balance.",
      "Enter the APR.",
      "Enter the monthly payment you can sustain.",
      "Read months to payoff, interest, and total paid.",
    ],
    howToInterpret: [
      "Months to payoff assumes the payment never changes and no new charges.",
      "Total interest is the cost of carrying the balance at that APR and payment.",
      "Educational — issuer statements win for legal payoff quotes.",
    ],
    workedExample: {
      title: "Worked example — $8,000 at 19.9% APR, $250 / month",
      steps: [
        "Monthly rate ≈ 19.9%/12.",
        "Month 1 interest ≈ 8,000 × 0.199/12 ≈ 132.67; principal ≈ 250 − 132.67 ≈ 117.33.",
        "Repeat until balance reaches zero — months and cumulative interest appear in results.",
      ],
      result:
        "A multi-year payoff with substantial interest if you never raise the payment — check the live panel for exact months.",
    },
    faqs: [
      { question: "Why does it say payment is too low?", answer: "If the payment does not cover the first month’s interest, the balance grows or stalls — raise the payment." },
      { question: "Does this model minimum payments that shrink?", answer: "No — it assumes a fixed payment you choose." },
      { question: "Can I include extra payments?", answer: "Raise the monthly payment field, or use the EMI extra-payments tool for loan-style schedules." },
      { question: "Is snowball vs avalanche included?", answer: "This page is single-balance. Multi-debt strategy needs separate runs per balance." },
      { question: "Are results advice to close a card?", answer: "No — educational estimates only. Consider credit-score and emergency-fund impacts separately." },
    ],
  },

  "savings-goal": {
    seoTitle: "Savings Goal Calculator — Monthly Deposit Needed",
    seoDescription:
      "Estimate the monthly deposit required to reach a savings target with growth. Free savings goal calculator with worked example and FAQs.",
    formulaNote:
      "Solves for the monthly contribution that grows current savings to a goal over a given number of years at an assumed annual return (standard savings-goal annuity identity in MyCalcsWorld finance formulas).",
    overview:
      "A savings goal is clearer when you know the monthly number. MyCalcsWorld’s Savings Goal Calculator asks for the target, what you already have, years available, and an assumed annual return — then estimates the monthly deposit needed.\n\nIt is a planning aid for emergency funds, travel pots, and down-payment timelines. Returns are not guaranteed; stress-test a lower rate.",
    whenToUse: [
      "Planning a down payment or emergency fund with a deadline.",
      "Checking whether a monthly auto-transfer is in the right ballpark.",
      "Comparing aggressive vs conservative return assumptions.",
    ],
    commonMistakes: [
      "Using an equity-like return for money you need in one year.",
      "Forgetting that contributions themselves need to come from after-tax cash flow.",
      "Ignoring inflation — pair with the inflation adjuster for long goals.",
    ],
    howToUse: [
      "Enter the goal amount.",
      "Enter current savings.",
      "Set years to the goal and an expected annual return.",
      "Read the monthly deposit needed and approximate total deposits.",
    ],
    howToInterpret: [
      "Monthly deposit assumes level contributions and a steady annualized return.",
      "Total deposits approx multiplies the monthly figure by months — actual invested path can differ.",
      "Educational — markets and bank rates vary.",
    ],
    workedExample: {
      title: "Worked example — $20,000 goal, $2,000 saved, 3 years, 4% return",
      steps: [
        "Goal 20,000; current 2,000; years 3; annual return 4%.",
        "The solver finds the monthly deposit that grows the nest egg to the goal.",
        "Re-run at 2% return to see how much more you may need to save if yields are lower.",
      ],
      result:
        "A few hundred per month in the classic 4%/3y illustration — confirm the live panel and stress-test lower returns.",
    },
    faqs: [
      { question: "Is the return guaranteed?", answer: "No. It is an assumption. Use a conservative rate for short-term goals." },
      { question: "Can I model irregular deposits?", answer: "This page assumes a steady monthly amount. Average lumpy deposits or re-run scenarios." },
      { question: "How is this different from SIP?", answer: "SIP projects growth from a chosen monthly investment. Savings goal solves for the monthly amount needed to hit a target." },
      { question: "Should I include inflation?", answer: "For multi-year goals, raise the target with the inflation adjuster, then re-run." },
      { question: "What if I already saved more than the goal?", answer: "Monthly needed may be zero or negative — you are already there under the assumptions." },
    ],
  },

};
