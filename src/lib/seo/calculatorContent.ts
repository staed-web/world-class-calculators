import type { CalculatorSeoContent } from "@/lib/types";
import { getCalculatorBySlug, allCalculators } from "@/lib/calculators/registry";
import {
  buildDefaultCalculatorSeo,
  mergeCalculatorSeo,
} from "./seoDefaults";

/** High-ROI FAQ / how-to / SEO overlays keyed by calculator slug. */
export const calculatorSeoContent: Record<string, CalculatorSeoContent> = {
  "mortgage": {
    seoTitle: "Mortgage Calculator — Monthly Payment & Interest",
    seoDescription: "Estimate fixed-rate mortgage principal & interest payments, total interest, and loan cost. Free browser-based tool — no signup.",
    formulaNote: "Standard amortizing loan: M = P · r(1+r)^n / ((1+r)^n − 1), where r is monthly rate and n is months. Taxes, insurance, and HOA are not included.",
    overview: "A mortgage calculator estimates the principal-and-interest (P&I) payment on a fixed-rate home loan and shows how interest vs principal evolves over time. MyCalcsWorld’s mortgage tool is built for both U.S. homebuyers comparing 15- vs 30-year loans and Indian home-loan shoppers who think in EMI terms. Taxes, insurance, PMI/MIP, and HOA dues are not included in P&I — add them separately for a full housing budget. Below you get a live payment estimate, a Recharts principal/interest/balance chart, a full year-by-year amortization table, FAQs, and a worked example you can mirror with your own numbers.",
    howToUse: [
      "Enter the loan amount (principal) you plan to borrow.",
      "Set the annual interest rate your lender quoted (APR may differ slightly).",
      "Choose the loan term in years (commonly 15 or 30).",
      "Read the monthly P&I payment, total of payments, and total interest.",
    ],
    howToUseUS: [
      "Enter the loan amount after your down payment (not the full purchase price).",
      "Use the note rate from your Loan Estimate (not APR, which bundles some fees).",
      "Choose 15 or 30 years — or another fixed term your lender offers.",
      "Read monthly P&I, total interest, then scroll the amortization chart and full yearly table.",
      "Stress-test a higher rate or shorter term before you lock.",
    ],
    howToUseIndia: [
      "Enter the sanctioned home-loan principal (₹) — pick INR in the currency picker.",
      "Enter the bank/NBFC annual floating or fixed rate you were quoted.",
      "Set tenure in years (Indian home loans often run 15–30 years).",
      "Treat the monthly payment as your EMI (P&I). Add property tax, insurance, and society maintenance separately.",
      "Use the yearly schedule to see how early years are interest-heavy — useful before deciding on prepayments.",
    ],
    howToInterpret: [
      "Monthly payment here is principal + interest only — add property tax and insurance for a full PITI estimate.",
      "Total interest shows the cost of borrowing over the full term if you make only scheduled payments.",
      "A lower rate or shorter term reduces interest but raises the monthly payment.",
    ],
    workedExample: {
      title: "Worked example — $300,000 at 6.5% for 30 years",
      steps: [
        "Principal P = 300,000; annual rate 6.5% → monthly r = 0.065/12.",
        "Term n = 30 × 12 = 360 months.",
        "Monthly P&I M = P·r(1+r)^n / ((1+r)^n − 1) ≈ $1,896.20.",
        "Total of payments ≈ $1,896.20 × 360 ≈ $682,632; total interest ≈ $382,632.",
        "Year 1 of the schedule shows most of each payment going to interest; later years flip toward principal.",
      ],
      result: "About $1,896/month P&I; roughly $383k lifetime interest if you never prepay — before taxes/insurance.",
    },
    faqs: [
      {
        question: "Does this mortgage calculator include taxes and insurance?",
        answer: "No. It estimates principal and interest (P&I) only. Escrow for property tax, homeowners insurance, and PMI can add hundreds per month depending on location.",
      },
      {
        question: "Is APR the same as the interest rate I should enter?",
        answer: "Enter the nominal annual interest rate used to amortize the loan. APR includes some fees and can be higher; using APR here slightly overstates the P&I payment.",
      },
      {
        question: "How does a 15-year vs 30-year mortgage change the result?",
        answer: "A 15-year term usually has a higher monthly payment but far less total interest. A 30-year term lowers the monthly payment but increases lifetime interest.",
      },
      {
        question: "Can I model extra payments?",
        answer: "This page shows the base schedule. Use the amortization or EMI extra-payments tools to see how additional principal payments shorten the loan.",
      },
      {
        question: "Are results accurate for adjustable-rate mortgages (ARMs)?",
        answer: "This tool assumes a fixed rate for the full term. ARMs change rate after an initial period, so treat the output as an estimate for the fixed-rate portion only.",
      },
    ],
  },
  "loan-emi": {
    seoTitle: "EMI Calculator India — Loan EMI, Interest & Total Cost",
    seoDescription: "Calculate equated monthly installment (EMI) for personal, auto, or home loans. Popular India EMI formula — free, works in INR in your browser.",
    formulaNote: "EMI = P · r(1+r)^n / ((1+r)^n − 1), where P is principal, r is monthly interest rate (annual%/12/100), and n is tenure in months.",
    overview: "EMI (Equated Monthly Installment) is the standard way Indian banks quote personal, auto, and home loans. The math is the same family as a U.S. amortizing loan payment: a fixed monthly amount that covers interest first, then principal on a reducing balance. This page shows EMI, total interest, a growth/paydown chart, and a full yearly schedule so you can compare tenures and rates transparently — with INR formatting via the currency picker.",
    howToUse: [
      "Enter the loan principal (amount sanctioned).",
      "Enter the annual interest rate your bank or NBFC offers.",
      "Set tenure in months (e.g. 36 for 3 years, 240 for 20 years).",
      "Review EMI, total payment, and total interest.",
    ],
    howToUseUS: [
      "Enter the financed amount (vehicle or personal loan principal).",
      "Enter the APR-like annual rate the lender quoted for amortization.",
      "Set tenure in months (e.g. 60 for a 5-year auto loan).",
      "Compare EMI vs total interest; shorter terms raise payment but cut interest.",
    ],
    howToUseIndia: [
      "Enter principal in ₹ (use INR currency).",
      "Enter the annual interest rate from your sanction letter.",
      "Set months — banks often quote years; multiply by 12.",
      "Review EMI and total interest; check prepayment rules before paying extra.",
    ],
    howToInterpret: [
      "EMI is the fixed monthly outflow if rate and tenure stay unchanged.",
      "Total interest is what you pay beyond principal over the full tenure.",
      "Shorter tenure → higher EMI, lower interest; longer tenure → lower EMI, higher interest.",
    ],
    workedExample: {
      title: "Worked example — ₹5,00,000 personal loan at 12% for 36 months",
      steps: [
        "P = 500,000; annual 12% → monthly r = 0.01; n = 36.",
        "EMI = P·r(1+r)^n / ((1+r)^n − 1) ≈ ₹16,607.",
        "Total payment ≈ ₹5,97,852; interest ≈ ₹97,852.",
      ],
      result: "About ₹16.6k EMI; nearly ₹98k interest over 3 years if you pay on schedule.",
    },
    faqs: [
      {
        question: "What is EMI in India?",
        answer: "Equated Monthly Installment is the fixed amount you pay each month toward a loan. It combines principal and interest so the payment stays level while the interest–principal mix shifts over time.",
      },
      {
        question: "Should I enter monthly or annual interest rate?",
        answer: "Enter the annual rate (e.g. 8.5%). The calculator converts it to a monthly rate internally, matching how Indian banks typically quote loans.",
      },
      {
        question: "Does this work for home loans, car loans, and personal loans?",
        answer: "Yes — the EMI math is the same. Product-specific charges (processing fees, insurance, prepayment penalties) are not included.",
      },
      {
        question: "Why does my bank’s EMI differ slightly?",
        answer: "Banks may use day-count conventions, fee capitalization, or floating-rate resets. This tool uses the standard reducing-balance EMI formula for education and planning.",
      },
      {
        question: "Can I use INR amounts?",
        answer: "Yes. Pick INR in the currency picker — inputs and money results format in your selected currency. The EMI formula itself is currency-agnostic.",
      },
      {
        question: "How do I reduce my EMI or total interest?",
        answer: "Negotiate a lower rate, shorten tenure (raises EMI), make a larger down payment, or prepay principal when your loan allows it without heavy penalties.",
      },
    ],
  },
  "sip": {
    seoTitle: "SIP Calculator India — Mutual Fund Returns Estimator",
    seoDescription: "Estimate SIP (Systematic Investment Plan) maturity value for Indian mutual funds. Enter monthly investment, expected return, and years — free online.",
    formulaNote: "Future value of SIP uses the standard annuity compound formula with monthly rate r and n months (site implementation).",
    overview: "A Systematic Investment Plan (SIP) invests a fixed amount every month — the default habit for many Indian mutual-fund investors, and a useful model for any recurring investment worldwide. This calculator projects maturity value at a constant assumed return, plots invested amount vs portfolio value year by year, and pairs with CAGR/inflation tools for realism. Returns are not guaranteed; equity SIPs can be volatile.",
    howToUse: [
      "Enter how much you invest each month.",
      "Set an expected annual return (historical equity SIPs often use 10–12% for illustration — not a guarantee).",
      "Choose the investment horizon in years.",
      "Compare invested amount vs estimated maturity value.",
    ],
    howToUseUS: [
      "Enter a monthly contribution (e.g. 401(k) or brokerage auto-invest).",
      "Choose a long-run expected return assumption — be conservative.",
      "Set years until your goal and read future value vs total invested on the chart.",
    ],
    howToUseIndia: [
      "Enter your monthly SIP amount in ₹.",
      "Use an illustrative equity return (often 10–12% in planner examples) or a lower debt-fund rate.",
      "Set tenure (5, 10, 15, 20+ years) and compare corpus vs amount invested.",
      "Remember expense ratios, exit loads, and capital-gains tax are not deducted here.",
    ],
    howToInterpret: [
      "Maturity value is an illustration at a constant assumed return — real NAVs fluctuate.",
      "Invested amount is simply monthly SIP × months.",
      "Estimated gains = maturity − invested; they compound more the longer you stay invested.",
    ],
    workedExample: {
      title: "Worked example — ₹10,000/month SIP at 12% for 15 years",
      steps: [
        "Monthly P = 10,000; annual return 12% → monthly r = 0.01; n = 180.",
        "Future value of annuity compounds each contribution to the horizon.",
        "Total invested = 10,000 × 180 = ₹18,00,000; estimated corpus is substantially higher at 12% assumed.",
      ],
      result: "Invested ₹18 lakh; illustrated maturity is much higher at a steady 12% — markets will not be a straight line.",
    },
    faqs: [
      {
        question: "What is a SIP calculator used for?",
        answer: "It projects how regular monthly investments might grow at an assumed rate of return — useful for goal planning for Indian mutual funds, not a promise of returns.",
      },
      {
        question: "What return rate should I enter for equity SIPs?",
        answer: "Many planners illustrate 10–12% p.a. for diversified equity over long periods. Debt funds are typically lower. Past performance does not guarantee future results.",
      },
      {
        question: "Does this include expense ratios or exit loads?",
        answer: "No. Fund expenses and taxes (e.g. capital gains) reduce real outcomes. Treat the result as a pre-expense, pre-tax estimate.",
      },
      {
        question: "Is SIP better than a lump sum?",
        answer: "SIP averages purchase cost over time and builds a habit; lump sum can do better if markets rise after you invest. The better choice depends on cash flow and risk tolerance.",
      },
      {
        question: "Can I model step-up SIPs?",
        answer: "This page assumes a fixed monthly amount. For rising contributions, run scenarios at higher monthly amounts or use a dedicated step-up planner when available.",
      },
    ],
  },
  "compound-interest": {
    seoTitle: "Compound Interest Calculator — Growth Over Time",
    seoDescription: "See how principal grows with compound interest by rate, years, and compounding frequency. Free online compound interest calculator.",
    formulaNote: "A = P(1 + r/n)^(n·t), where P is principal, r annual rate, n compounds per year, t years.",
    howToUse: [
      "Enter starting principal.",
      "Set annual interest rate and number of years.",
      "Choose compounding frequency (monthly is common for savings).",
      "Compare future value vs interest earned.",
    ],
    howToInterpret: [
      "Future value is principal plus all compounded interest.",
      "More frequent compounding slightly increases growth at the same nominal rate.",
      "Small rate differences compound into large gaps over long horizons.",
    ],
    faqs: [
      {
        question: "What is compound interest?",
        answer: "Interest is calculated on principal plus previously earned interest, so growth accelerates over time compared with simple interest.",
      },
      {
        question: "Does monthly vs daily compounding matter much?",
        answer: "At typical retail rates the difference is modest; over decades or high rates it becomes more noticeable. APY already reflects compounding frequency.",
      },
      {
        question: "Can I include monthly contributions?",
        answer: "This calculator is for a single principal. Use the SIP or savings-goal tools when you add money regularly.",
      },
      {
        question: "Is the rate nominal or effective?",
        answer: "Enter the nominal annual rate; compounding frequency converts it into effective growth for the period you chose.",
      },
      {
        question: "How is this different from the Rule of 72?",
        answer: "Rule of 72 quickly estimates doubling time. This tool gives exact future value for any principal, rate, and schedule.",
      },
    ],
  },
  "compounding": {
    seoTitle: "Compounding Frequency Calculator — APY & Growth",
    seoDescription: "Compare how often interest compounds and what that means for effective yield and ending balance. Free compounding calculator.",
    formulaNote: "Effective annual yield ≈ (1 + r/n)^n − 1. Ending balance uses A = P(1 + r/n)^(n·t).",
    howToUse: [
      "Enter principal, nominal annual rate, and years.",
      "Pick or compare compounding schedules.",
      "Note effective yield and final balance.",
    ],
    howToInterpret: [
      "Higher compounding frequency raises effective yield for the same nominal rate.",
      "Banks often advertise APY so you can compare products fairly.",
      "For loans, compounding frequency affects how fast interest accrues — read the product terms.",
    ],
    faqs: [
      {
        question: "What does compounding frequency mean?",
        answer: "It is how often earned interest is added to the balance so later interest can earn interest — annually, quarterly, monthly, daily, etc.",
      },
      {
        question: "Why do two accounts with the same rate pay differently?",
        answer: "Different compounding schedules (and fees) change the effective annual yield even when the advertised nominal rate matches.",
      },
      {
        question: "Is continuous compounding realistic for consumers?",
        answer: "Continuous compounding is mostly a math limit. Consumer products usually compound daily or monthly; continuous is a useful upper-bound illustration.",
      },
      {
        question: "Should investors care more about APY or APR?",
        answer: "For deposits, APY shows what you earn after compounding. For loans, APR helps compare borrowing cost including some fees.",
      },
      {
        question: "Does inflation change compounding results?",
        answer: "Nominal balances still grow as shown; real purchasing power depends on inflation. Pair this with the inflation adjuster for context.",
      },
    ],
  },
  "amortization": {
    seoTitle: "Amortization Calculator — Schedule & Interest Breakdown",
    seoDescription: "Build a loan amortization schedule showing principal vs interest over time. Free amortization calculator with chart-friendly outputs.",
    formulaNote: "Each payment splits into interest = balance × monthly rate and principal = payment − interest. Balance declines until it reaches zero.",
    overview: "An amortization schedule breaks every payment into interest vs principal and tracks remaining balance. This page shows monthly payment totals, a Recharts view of principal, interest, and balance over time, and a full year-by-year table — the same transparency homebuyers and EMI borrowers need when comparing loans.",
    howToUse: [
      "Enter loan amount, annual rate, and term.",
      "Generate the schedule and review early vs late payments.",
      "Note how interest dominates early payments on long loans.",
    ],
    howToUseUS: [
      "Enter loan amount, rate, and term.",
      "Study the chart: interest dominates early years on long mortgages.",
      "Use the full yearly table when comparing lenders or refinance options.",
    ],
    howToUseIndia: [
      "Enter home-loan or personal-loan principal in ₹.",
      "Review how prepayments would cut the interest column in later years.",
      "Pair with the EMI calculator for the headline payment.",
    ],
    howToInterpret: [
      "Early years: most of each payment is interest.",
      "Later years: most of each payment reduces principal.",
      "Extra principal payments cut future interest by shrinking the balance sooner.",
    ],
    faqs: [
      {
        question: "What is an amortization schedule?",
        answer: "A period-by-period table of each payment split into interest and principal, plus the remaining balance.",
      },
      {
        question: "Why is so much interest paid in the first years?",
        answer: "Interest is charged on the outstanding balance. Early on the balance is highest, so interest takes a larger share of a fixed payment.",
      },
      {
        question: "Does prepaying change the schedule?",
        answer: "Yes. Extra principal lowers the balance immediately, reducing later interest. Confirm whether your lender recalculates payment or shortens term.",
      },
      {
        question: "Is amortization the same for EMI loans in India?",
        answer: "Yes in principle — EMI loans also use reducing-balance amortization. Labels differ (EMI vs mortgage payment) but the math is the same family.",
      },
      {
        question: "Are biweekly payments modeled here?",
        answer: "This tool focuses on a standard monthly schedule. Biweekly mortgages effectively make about one extra monthly payment per year.",
      },
    ],
  },
  "gst-vat": {
    seoTitle: "GST Calculator India — Add or Remove GST / VAT",
    seoDescription: "Add or extract GST/VAT from prices. Useful for Indian GST slabs and general VAT — free online GST calculator.",
    formulaNote: "Price with tax = base × (1 + rate/100). Base from tax-inclusive price = gross / (1 + rate/100). Tax amount = gross − base.",
    overview: "GST in India (and VAT elsewhere) is a percentage tax on taxable value. This calculator adds tax to a base price or backs tax out of a gross price for common slabs such as 5%, 12%, 18%, and 28%. It is an educational invoice helper — not a filing tool. CGST/SGST are usually equal halves of the GST rate on intra-state supplies; IGST applies interstate.",
    howToUse: [
      "Enter the amount (tax-exclusive or tax-inclusive).",
      "Choose the GST/VAT rate (e.g. 5%, 12%, 18%, 28% in India).",
      "Select whether you are adding tax or removing tax from a gross price.",
      "Read net, tax, and gross figures.",
    ],
    howToUseUS: [
      "For U.S. sales tax, enter your combined state/local rate and add tax to the pre-tax price.",
      "Use remove-tax mode when a receipt total is tax-inclusive and you need the base.",
    ],
    howToUseIndia: [
      "Enter taxable value and the HSN/SAC GST rate (e.g. 18%).",
      "Add GST for invoice totals, or remove GST from an MRP-style inclusive price.",
      "Split CGST/SGST mentally as half each when preparing intra-state invoices.",
    ],
    howToInterpret: [
      "Use add-tax when you have a taxable value and need invoice totals.",
      "Use remove-tax when a shelf price already includes GST/VAT and you need the base.",
      "CGST/SGST splits are typically half of the GST rate each for intra-state supplies in India — this tool focuses on the combined rate.",
    ],
    workedExample: {
      title: "Worked example — ₹10,000 taxable at 18% GST",
      steps: [
        "Tax = 10,000 × 0.18 = ₹1,800.",
        "Invoice total = ₹11,800.",
        "From a ₹11,800 inclusive price: base = 11,800 / 1.18 = ₹10,000.",
      ],
      result: "₹1,800 GST on ₹10,000 taxable value (₹900 CGST + ₹900 SGST if intra-state).",
    },
    faqs: [
      {
        question: "What GST rates does India commonly use?",
        answer: "Common slabs include 0%, 5%, 12%, 18%, and 28%, with some items under special rates. Always confirm the HSN/SAC rate for your goods or services.",
      },
      {
        question: "Is GST the same as VAT?",
        answer: "Both are consumption taxes on value. India uses GST nationwide; many other countries use VAT. The percentage math is the same.",
      },
      {
        question: "How do I reverse-calculate GST from a final price?",
        answer: "Divide the gross price by (1 + rate/100) to get the taxable value; the difference is GST. That is the remove-tax mode.",
      },
      {
        question: "Does this handle CGST, SGST, and IGST separately?",
        answer: "It works with a single combined rate. For intra-state invoices, CGST and SGST are usually equal halves of that rate; IGST applies on interstate supplies.",
      },
      {
        question: "Are results suitable for filing returns?",
        answer: "No — this is an educational estimator. Use your accounting software and official GST portal rules for compliance.",
      },
    ],
  },
  "salary-after-tax-in": {
    seoTitle: "India Salary After Tax Calculator — Take-Home Estimate",
    seoDescription: "Rough estimate of India take-home pay after a flat tax percentage. Educational only — not a substitute for the Income Tax Department calculator.",
    formulaNote: "Illustrative flat-percentage model: take-home ≈ gross × (1 − tax%/100). Real Indian tax uses slabs, deductions (e.g. 80C), cess, and regime choice.",
    overview: "Indian take-home pay depends on the tax regime (new vs old), slabs, cess, deductions such as 80C/80D, and payroll items like EPF and professional tax. This calculator intentionally uses a flat effective-tax percentage so you can sketch scenarios quickly — then verify with a full slab worksheet, your employer’s payroll, or a CA. It is not the Income Tax Department utility.",
    howToUse: [
      "Enter gross annual or monthly salary as labeled.",
      "Set an approximate effective tax percentage for illustration.",
      "Compare gross vs estimated take-home.",
    ],
    howToUseUS: [
      "If you only need a rough net from gross with a blended rate, enter gross and an effective % — for U.S. federal/state detail use a dedicated paycheck tool.",
      "Treat the output as a planning sketch, then verify with payroll software or a tax preparer.",
      "For India-specific slab math, switch to the India how-to steps and INR framing.",
    ],
    howToUseIndia: [
      "Enter CTC/gross as labeled.",
      "Pick an effective tax % that approximates your slab + cess after deductions (illustrative).",
      "Subtract PF and professional tax separately for a closer in-hand figure.",
      "Re-run after a hike or when switching tax regimes.",
    ],
    howToInterpret: [
      "This is a simplified model — India’s new/old regimes, cess, and deductions change actual liability.",
      "Use it for quick planning, then verify with a full tax worksheet or CA.",
      "Employer deductions (PF, professional tax) may further reduce in-hand pay.",
    ],
    workedExample: {
      title: "Worked example — ₹12 lakh gross with 10% effective tax illustration",
      steps: [
        "Gross = ₹12,00,000; effective tax assumption 10%.",
        "Tax illustration = ₹1,20,000; net ≈ ₹10,80,000 before PF/ptax.",
        "Monthly in-hand sketch ≈ ₹90,000 before other deductions.",
      ],
      result: "Flat-rate sketch only — real Form 16 liability will differ with regime and proofs.",
    },
    faqs: [
      {
        question: "Is this the official Indian income-tax calculator?",
        answer: "No. It applies a flat percentage for education. Official slab math, surcharge, and cess are more detailed.",
      },
      {
        question: "Should I use the new or old tax regime rate?",
        answer: "Pick an effective percentage that roughly matches your expected liability under the regime you choose. Compare both regimes offline for decisions.",
      },
      {
        question: "Does this include PF and professional tax?",
        answer: "Not automatically. Those lower in-hand salary further; subtract them separately if you need a closer paycheck estimate.",
      },
      {
        question: "Can I plan for a hike with this tool?",
        answer: "Yes as a rough check — pair with the salary-hike calculator, then re-estimate tax on the new gross.",
      },
      {
        question: "Why might my Form 16 differ?",
        answer: "Employers withhold based on declarations, investment proofs, and exact slab rules. This page ignores those details by design.",
      },
    ],
  },
  "cagr": {
    seoTitle: "CAGR Calculator — Compound Annual Growth Rate",
    seoDescription: "Compute CAGR from beginning value, ending value, and years. Useful for mutual funds, stocks, and business growth analysis.",
    formulaNote: "CAGR = (Ending / Beginning)^(1/years) − 1.",
    howToUse: [
      "Enter the starting value and ending value.",
      "Enter the number of years between them.",
      "Read the annualized growth rate.",
    ],
    howToInterpret: [
      "CAGR smooths volatility into a single annualized rate — it is not the path you experienced year by year.",
      "Negative CAGR means the investment shrank on an annualized basis.",
      "Compare CAGRs only over similar risk and time horizons.",
    ],
    faqs: [
      {
        question: "What does CAGR mean?",
        answer: "Compound Annual Growth Rate is the constant annual rate that takes you from a beginning value to an ending value over a period.",
      },
      {
        question: "Is CAGR the same as average yearly return?",
        answer: "No. A simple average of yearly returns ignores compounding. CAGR is the geometric rate that links start and end values.",
      },
      {
        question: "Can I use CAGR for Indian mutual funds?",
        answer: "Yes — point-to-point CAGR is a common way to summarize fund performance. Always check the exact dates and whether dividends were reinvested.",
      },
      {
        question: "What if the period is not a whole number of years?",
        answer: "Use fractional years (e.g. 2.5). CAGR still annualizes correctly when the exponent is 1/years.",
      },
      {
        question: "Does CAGR predict future returns?",
        answer: "No. It describes the past path between two points. Future returns can differ sharply.",
      },
    ],
  },
  "refinance": {
    seoTitle: "Refinance Calculator — Break-Even & Savings",
    seoDescription: "Estimate whether refinancing a loan or mortgage saves money after closing costs. Free refinance break-even calculator.",
    formulaNote: "Compare new payment vs old payment; break-even months ≈ closing costs / monthly savings (simplified).",
    howToUse: [
      "Enter current loan details and the proposed refinance terms.",
      "Include estimated closing costs.",
      "Check monthly savings and break-even time.",
    ],
    howToInterpret: [
      "If you will move or sell before break-even, refinancing may not pay off.",
      "A lower rate helps most when the remaining term is long and costs are modest.",
      "Extending the term can lower payments while increasing lifetime interest — watch both metrics.",
    ],
    faqs: [
      {
        question: "When does refinancing make sense?",
        answer: "Typically when the rate drop and remaining horizon justify closing costs, and you plan to keep the loan past the break-even month.",
      },
      {
        question: "What costs should I include?",
        answer: "Origination fees, appraisal, title, and points. Some costs can be rolled into the new loan, which increases principal.",
      },
      {
        question: "Does a cash-out refinance change the math?",
        answer: "Yes — a larger new balance can erase payment savings even if the rate falls. Model the full new principal.",
      },
      {
        question: "Is breaking even in months enough?",
        answer: "It is a starting point. Also compare total interest and how refinance resets amortization.",
      },
      {
        question: "Can I refinance personal loans or only mortgages?",
        answer: "The same break-even idea applies to personal or auto loan refinances, though fee structures differ.",
      },
    ],
  },
  "credit-card-payoff": {
    seoTitle: "Credit Card Payoff Calculator — Time & Interest",
    seoDescription: "Estimate how long it takes to pay off credit card debt and how much interest you will pay at a given monthly payment.",
    formulaNote: "Uses standard revolving-credit payoff math with monthly rate r = APR/12/100 against a fixed payment until balance clears (educational model).",
    howToUse: [
      "Enter the current balance and card APR.",
      "Enter the fixed monthly payment you can make.",
      "Review months to payoff and total interest.",
    ],
    howToInterpret: [
      "Paying only the minimum stretches payoff and maximizes interest.",
      "A modest payment increase often cuts months and interest sharply.",
      "If payment ≤ monthly interest, the balance never clears — raise the payment.",
    ],
    faqs: [
      {
        question: "Why is credit card interest so high?",
        answer: "Cards are unsecured revolving credit. APRs are correspondingly higher than secured loans, so balances compound quickly if you carry debt.",
      },
      {
        question: "Should I pay high-APR cards first?",
        answer: "The avalanche method (highest APR first) usually minimizes interest. The snowball method (smallest balance first) can help motivation.",
      },
      {
        question: "Does this include new purchases?",
        answer: "No — it assumes you stop adding charges. New spending extends payoff.",
      },
      {
        question: "Are grace periods modeled?",
        answer: "No. Once you carry a balance, interest typically accrues; this tool focuses on payoff from a stated balance and APR.",
      },
      {
        question: "What if I have multiple cards?",
        answer: "Run each card separately or combine into a total balance with a weighted APR for a rough blended view.",
      },
    ],
  },
  "tip": {
    seoTitle: "Tip Calculator — Tip Amount & Bill Split",
    seoDescription: "Calculate tip and total bill quickly. Adjust tip percent and split between people — free tip calculator.",
    formulaNote: "Tip = bill × tip%/100. Total = bill + tip. Per person = total / people.",
    howToUse: [
      "Enter the pre-tip bill amount.",
      "Choose a tip percentage.",
      "Optionally set how many people split the bill.",
    ],
    howToInterpret: [
      "Confirm whether tax is already in the bill and whether your group tips on pre-tax or post-tax amounts.",
      "Service charges included on the bill may replace or reduce a customary tip — check local norms.",
    ],
    faqs: [
      {
        question: "What tip percentage is customary?",
        answer: "In the U.S., 15–20% on the pre-tax bill is common for sit-down service. Norms differ widely by country.",
      },
      {
        question: "Should I tip on tax?",
        answer: "Many people tip on the pre-tax subtotal. Follow your preference or local custom.",
      },
      {
        question: "How do I split unevenly?",
        answer: "This tool splits evenly. Use the split-uneven or tip-tax tools when people ordered differently.",
      },
      {
        question: "Is service charge the same as tip?",
        answer: "Not always. A mandatory service charge may go partly to the house. Ask if you are unsure whether an extra tip is expected.",
      },
    ],
  },
  "percentage": {
    seoTitle: "Percentage Calculator — Percent Of, Change & More",
    seoDescription: "Quick percentage calculations for discounts, exam scores, and finance basics. Free percentage calculator.",
    formulaNote: "x% of y = (x/100)×y. Percentage change = (new − old)/old × 100%.",
    howToUse: [
      "Enter the values for the percentage operation you need.",
      "Read the result and apply it to prices, scores, or stats.",
    ],
    howToInterpret: [
      "Percent-of answers how much a share is in absolute terms.",
      "Percentage change can be negative when values fall.",
    ],
    faqs: [
      {
        question: "How do I calculate a percentage of a number?",
        answer: "Multiply the number by the percent divided by 100. Example: 18% of 2,000 = 360.",
      },
      {
        question: "How is percentage change different from percentage points?",
        answer: "A move from 10% to 12% is a 2 percentage-point rise, but a 20% relative change.",
      },
      {
        question: "Can I reverse a percentage increase?",
        answer: "Yes — divide by (1 + rate/100). A 20% increase needs ÷1.2 to recover the original.",
      },
      {
        question: "When should I use Percentage Mega instead?",
        answer: "Use Percentage Mega when you need multiple percentage operations or chained what-if scenarios on one page.",
      },
    ],
  },
  "percentage-mega": {
    seoTitle: "Percentage Mega Calculator — All-in-One Percent Tools",
    seoDescription: "All-in-one percentage toolkit for percent of, change, reverse percent, and more. Free Percentage Mega calculator.",
    formulaNote: "Supports common percent identities: part = pct×whole/100; pct = part/whole×100; reverse from increase/decrease factors.",
    howToUse: [
      "Pick the percentage mode you need.",
      "Enter inputs as labeled.",
      "Use results for discounts, markups, or exam math.",
    ],
    howToInterpret: [
      "Match the mode to the question (of / change / reverse).",
      "Chained discounts are multiplicative, not additive.",
    ],
    faqs: [
      {
        question: "What is Percentage Mega?",
        answer: "A denser percentage workstation that groups several percent operations so you do not bounce between tools.",
      },
      {
        question: "How do stacked discounts work?",
        answer: "Apply each discount to the remaining price. 20% off then 10% off is ×0.8×0.9 = 28% off overall, not 30%.",
      },
      {
        question: "Can I compute GST with percentages?",
        answer: "Yes for simple add/remove tax math, or use the dedicated GST/VAT calculator for clearer tax labels.",
      },
      {
        question: "Is percentage error included?",
        answer: "Use absolute and relative difference modes where provided; scientific contexts may need significant-figure tools too.",
      },
      {
        question: "Why did my reverse-percentage differ from intuition?",
        answer: "A 25% decrease needs ÷0.75 to reverse, which is a 33.33% increase — increases and decreases are not symmetric.",
      },
    ],
  },
  "bmi": {
    seoTitle: "BMI Calculator — Body Mass Index Chart Categories",
    seoDescription: "Calculate Body Mass Index from height and weight with WHO-style category guidance. Free BMI calculator — educational only.",
    formulaNote: "BMI = weight(kg) / [height(m)]². Categories follow common adult cutoffs (screening only).",
    overview: "Body Mass Index (BMI) is a quick height–weight screening ratio used in clinics and public-health charts. It does not measure body fat directly and can misclassify muscular athletes. MyCalcsWorld reports BMI plus a common adult category label for education — not a diagnosis. Pair with waist measures, body-fat estimates, and clinician guidance for decisions.",
    howToUse: [
      "Enter body weight in kilograms.",
      "Enter height in centimetres.",
      "Read BMI and the category label.",
    ],
    howToUseUS: [
      "Convert pounds and inches to kg and cm if needed, then enter metric values.",
      "Read BMI and category; discuss personal targets with a healthcare professional.",
    ],
    howToUseIndia: [
      "Enter weight in kg and height in cm (standard clinic units in India).",
      "Note that some Asian BMI cutoffs for risk start lower than WHO ‘overweight’ thresholds — ask your doctor which chart they use.",
      "Pair BMI with waist measure or the body-fat tool if you lift weights or play sports.",
    ],
    howToInterpret: [
      "BMI is a population screening metric — it does not measure body fat directly.",
      "Athletes with high muscle mass may show a high BMI without high fat mass.",
      "Discuss personal health targets with a clinician.",
    ],
    workedExample: {
      title: "Worked example — 70 kg at 175 cm",
      steps: [
        "Height in metres = 1.75; 1.75² = 3.0625.",
        "BMI = 70 / 3.0625 ≈ 22.9.",
        "Common adult charts label ~18.5–24.9 as normal range.",
      ],
      result: "BMI ≈ 22.9 (typical ‘normal’ category on WHO adult charts) — still not a diagnosis.",
    },
    faqs: [
      {
        question: "What is a healthy BMI range for adults?",
        answer: "Many guidelines treat roughly 18.5–24.9 as the normal range for adults, with different cutoffs sometimes used for Asian populations. It is not a diagnosis.",
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "No. Age, sex, ethnicity, and muscle mass affect how BMI maps to health risk. Pair with waist measures or clinical advice.",
      },
      {
        question: "Can children use this calculator?",
        answer: "Pediatric BMI uses age- and sex-specific percentiles. Prefer a child-specific chart rather than adult categories.",
      },
      {
        question: "Should I use kg/cm or lb/in?",
        answer: "This tool expects kg and cm. Convert first if you have imperial measurements.",
      },
      {
        question: "How often should I check BMI?",
        answer: "For personal tracking, occasional checks with weight trends matter more than daily noise. Focus on sustainable habits.",
      },
    ],
  },
  "bmr": {
    seoTitle: "BMR Calculator — Basal Metabolic Rate (Mifflin–St Jeor)",
    seoDescription: "Estimate basal metabolic rate with the Mifflin–St Jeor equation. Free BMR calculator for calorie planning.",
    formulaNote: "Mifflin–St Jeor: men 10w + 6.25h − 5a + 5; women 10w + 6.25h − 5a − 161 (w kg, h cm, a years).",
    howToUse: [
      "Enter weight, height, age, and sex.",
      "Read estimated calories burned at complete rest.",
      "Feed BMR into TDEE with an activity factor for daily needs.",
    ],
    howToInterpret: [
      "BMR is not your daily calorie target — it excludes activity.",
      "Equations are estimates; medical conditions and body composition shift needs.",
    ],
    faqs: [
      {
        question: "What is BMR?",
        answer: "Basal Metabolic Rate estimates the energy your body uses at complete rest to maintain vital functions.",
      },
      {
        question: "Why Mifflin–St Jeor?",
        answer: "It is a widely used modern equation that often outperforms older Harris–Benedict estimates for average adults.",
      },
      {
        question: "Should I eat at my BMR to lose weight?",
        answer: "Usually no — eating at pure BMR ignores activity and is often too aggressive. Use TDEE and a moderate deficit instead.",
      },
      {
        question: "Does muscle raise BMR?",
        answer: "Yes, lean mass increases resting burn, but equation-based BMR does not measure muscle directly.",
      },
      {
        question: "How does BMR relate to TDEE?",
        answer: "TDEE ≈ BMR × activity multiplier. That better estimates maintenance calories for your lifestyle.",
      },
    ],
  },
  "tdee": {
    seoTitle: "Calorie / TDEE Calculator — Daily Maintenance Calories",
    seoDescription: "Estimate Total Daily Energy Expenditure from BMR and activity level. Free TDEE / calorie maintenance calculator.",
    formulaNote: "TDEE ≈ BMR × activity factor (sedentary ≈1.2 through very active ≈1.9).",
    howToUse: [
      "Enter weight, height, age, and sex.",
      "Select the activity level that best matches your week.",
      "Use TDEE as a maintenance estimate; adjust for loss or gain goals.",
    ],
    howToInterpret: [
      "Sedentary desk jobs need lower multipliers than training athletes.",
      "For fat loss, a modest deficit below TDEE is typical; for surplus, go slightly above.",
      "Track weight for 2–3 weeks and adjust — equations are starting points.",
    ],
    faqs: [
      {
        question: "What is TDEE?",
        answer: "Total Daily Energy Expenditure estimates calories you burn per day including activity, not just resting metabolism.",
      },
      {
        question: "Which activity level should I pick?",
        answer: "Be honest — most office workers with light gym work are light or moderate. Overestimating activity is a common error.",
      },
      {
        question: "How many calories should I cut to lose weight?",
        answer: "A common starting point is ~300–500 kcal/day below TDEE, adjusted for progress and health needs. Seek medical advice when appropriate.",
      },
      {
        question: "Why is my weight not changing at TDEE?",
        answer: "Estimates miss NEAT, tracking errors, and water weight. Recalculate after body-weight changes and refine with logging.",
      },
      {
        question: "Can I use this with macro targets?",
        answer: "Yes — set calories from TDEE (or a goal), then allocate protein, fat, and carbs with the macros calculator.",
      },
    ],
  },
  "macros": {
    seoTitle: "Macro Calculator — Protein, Carbs & Fat Targets",
    seoDescription: "Split daily calories into protein, carbohydrate, and fat targets. Free macro calculator for fitness goals.",
    formulaNote: "Calories from macros: protein & carbs ≈4 kcal/g, fat ≈9 kcal/g. Grams = (calorie share) / kcal per gram.",
    howToUse: [
      "Enter your daily calorie target (from TDEE or a goal).",
      "Choose or enter macro ratios.",
      "Read grams per macro.",
    ],
    howToInterpret: [
      "Higher protein often helps satiety and muscle retention in a deficit.",
      "Ratios are tools — food quality and adherence still matter.",
    ],
    faqs: [
      {
        question: "What are macros?",
        answer: "Macronutrients — protein, carbohydrates, and fat — are the calorie-providing nutrients you distribute across a day.",
      },
      {
        question: "How much protein do I need?",
        answer: "Many active adults aim roughly 1.6–2.2 g per kg of body weight, adjusted for goals and medical context.",
      },
      {
        question: "Do I have to hit macros exactly?",
        answer: "Consistency beats perfection. Hitting protein and calories most days usually matters more than exact gram precision.",
      },
      {
        question: "Are alcohol calories included?",
        answer: "Alcohol adds calories (~7 kcal/g) outside the three macros. Budget them into your daily total if you drink.",
      },
      {
        question: "Should keto use different ratios?",
        answer: "Ketogenic plans use very low carbs and higher fat. Adjust ratios to match your chosen diet framework.",
      },
    ],
  },
  "currency-converter": {
    seoTitle: "Currency Converter — Live FX Rates (USD, INR, EUR & More)",
    seoDescription: "Convert currencies with delayed educational FX rates. INR, USD, EUR, AED and more — free live currency converter.",
    formulaNote: "converted = amount × (rate_to / rate_from) using USD-based reference rates from the site FX feed.",
    howToUse: [
      "Enter the amount to convert.",
      "Choose source and target currencies.",
      "Read the converted value and note the rate timestamp.",
    ],
    howToInterpret: [
      "Rates are delayed educational quotes — not bank or card rates.",
      "Card networks and money changers add spreads and fees on top of mid-market.",
      "For INR travel or remittances, compare your provider’s all-in rate.",
    ],
    faqs: [
      {
        question: "Are these live mid-market rates?",
        answer: "They are periodically refreshed reference rates for education. Your bank, UPI international, or card FX rate will differ.",
      },
      {
        question: "Can I convert to Indian Rupees (INR)?",
        answer: "Yes — select INR as source or target. Pair with EMI/SIP tools when planning India-focused budgets.",
      },
      {
        question: "Why does my card charge a different amount?",
        answer: "Cards add FX markups and sometimes foreign transaction fees. Mid-market × markup explains most gaps.",
      },
      {
        question: "How often do rates update?",
        answer: "The site caches FX for about an hour from a free reference feed, with a fallback snapshot if the feed is unavailable.",
      },
      {
        question: "Is this for trading or forex positions?",
        answer: "No. Use dedicated brokerage tools for trading. This converter is for everyday estimates.",
      },
    ],
  },
  "gold-value": {
    seoTitle: "Gold Value Calculator — Estimate Worth from Live Spot",
    seoDescription: "Estimate gold value from weight and live-ish spot references. Useful for jewellery planning — educational delayed quotes.",
    formulaNote: "Value ≈ weight × (spot per unit) × purity factor. Jewellery making charges and taxes are separate.",
    howToUse: [
      "Enter weight and unit (grams/ounces as labeled).",
      "Confirm metal purity if prompted (e.g. 22K vs 24K).",
      "Compare estimated melt/spot-linked value to retail offers.",
    ],
    howToInterpret: [
      "Retail jewellery prices include making charges and GST in India — often far above melt value.",
      "Quotes are delayed free-feed estimates, not a dealer bid.",
    ],
    faqs: [
      {
        question: "Is 22K gold priced the same as 24K?",
        answer: "No. 22K is about 91.7% pure, so melt value is lower than 24K fine gold for the same weight.",
      },
      {
        question: "Why is jeweller price higher than this estimate?",
        answer: "Making charges, design premium, wastage, and taxes sit on top of metal value.",
      },
      {
        question: "Can I use this for Indian gold jewellery?",
        answer: "Yes as a rough metal-value check. Always weigh hallmarked jewellery and ask for itemized making charges.",
      },
      {
        question: "Are silver and platinum included?",
        answer: "Use the metals spot and related commodity tools for other metals.",
      },
      {
        question: "Is this a buy/sell offer?",
        answer: "No — educational pricing only. Dealers quote their own bid/ask.",
      },
    ],
  },
  "metals-spot": {
    seoTitle: "Metals Spot Price Calculator — Gold, Silver & More",
    seoDescription: "Check delayed spot-style references for precious metals and convert units. Free metals spot calculator.",
    formulaNote: "Displays reference spot-linked prices from the commodities API; conversions apply standard weight factors (troy oz ↔ grams).",
    howToUse: [
      "Open the live metals tool and pick a metal.",
      "Note currency and last-updated time.",
      "Convert units if you need per-gram figures.",
    ],
    howToInterpret: [
      "Spot is not what you pay at a mall jeweller.",
      "Spreads, premiums, and local taxes apply in real trades.",
    ],
    faqs: [
      {
        question: "What is a spot price?",
        answer: "A reference price for immediate settlement of the metal in wholesale markets — not a retail jewellery tag.",
      },
      {
        question: "How delayed are these quotes?",
        answer: "The feed is cached (on the order of minutes) and may fall back if unavailable. Treat it as illustrative.",
      },
      {
        question: "Can I see prices in INR?",
        answer: "Where the UI allows currency selection or you convert via FX, yes — remember local premiums still apply.",
      },
      {
        question: "Do futures prices match spot?",
        answer: "Futures can trade at contango/backwardation to spot. Oil on this site may use a futures supplement.",
      },
      {
        question: "Is this investment advice?",
        answer: "No. Metal investing has storage, premium, and volatility risks.",
      },
    ],
  },
  "savings-goal": {
    seoTitle: "Savings Goal Calculator — Monthly Amount to Target",
    seoDescription: "Find how much to save monthly to reach a goal with compound interest. Free savings goal calculator.",
    formulaNote: "Solves for payment in the future-value-of-annuity relation given target, rate, and periods.",
    howToUse: [
      "Enter your target amount and timeframe.",
      "Set an expected annual return (use a conservative cash rate if unsure).",
      "Read the required monthly savings.",
    ],
    howToInterpret: [
      "Higher assumed returns lower required deposits but increase risk of missing the goal.",
      "Inflation means today’s target may need to be larger in future rupees or dollars.",
    ],
    faqs: [
      {
        question: "What return should I assume for a cash emergency fund?",
        answer: "Use a realistic savings/deposit rate, not equity returns. Emergency funds prioritize liquidity and safety.",
      },
      {
        question: "Can I include money I already saved?",
        answer: "If the form includes a current savings field, enter it; otherwise subtract its future value from the target mentally.",
      },
      {
        question: "How do SIPs relate to savings goals?",
        answer: "SIPs are a vehicle to fund goals. Use this tool for the monthly number, then the SIP calculator to illustrate market-linked growth.",
      },
      {
        question: "Should goals be inflation-adjusted?",
        answer: "For long horizons, yes — raise the target with expected inflation or use the inflation adjuster.",
      },
      {
        question: "What if I miss a month?",
        answer: "Resume and optionally increase later deposits. Recalculate with the remaining time and updated balance.",
      },
    ],
  },
  "retirement": {
    seoTitle: "Retirement Calculator — Nest Egg & Savings Path",
    seoDescription: "Illustrate retirement savings growth from contributions and returns. Free retirement planning calculator — educational.",
    formulaNote: "Projects accumulation with contributions and compound growth; withdrawal phases are simplified if shown.",
    howToUse: [
      "Enter current savings, monthly contribution, years to retirement, and assumed return.",
      "Review projected nest egg.",
      "Stress-test with a lower return assumption.",
    ],
    howToInterpret: [
      "Sequence of returns and fees can change outcomes dramatically.",
      "Indian planners often blend EPF/PPF/mutual funds — model each bucket separately for realism.",
    ],
    faqs: [
      {
        question: "Is this a full retirement plan?",
        answer: "No. It is a growth illustration. Taxes, healthcare, pensions, and drawdown strategy need broader planning.",
      },
      {
        question: "What return rate is reasonable?",
        answer: "Long-run diversified equity assumptions are often mid-to-high single digits to low double digits before inflation; use conservative numbers for safety.",
      },
      {
        question: "How does inflation affect retirement?",
        answer: "It erodes purchasing power. A corpus that looks large today buys less decades later — adjust targets upward.",
      },
      {
        question: "Should I include employer match?",
        answer: "Yes when applicable — add match into the contribution figure for a fairer projection.",
      },
      {
        question: "What about NPS or EPF in India?",
        answer: "Treat them as separate contribution streams with their own return assumptions, then sum projected values.",
      },
    ],
  },
  "debt-payoff": {
    seoTitle: "Debt Payoff Calculator — Timeline & Interest Cost",
    seoDescription: "Estimate how fast you can become debt-free and what interest you will pay with a planned monthly payment.",
    formulaNote: "Amortizing payoff with fixed payment against balance at monthly rate; similar structure to loan EMI math.",
    howToUse: [
      "Enter total debt, APR, and planned monthly payment.",
      "Check months to freedom and interest cost.",
      "Try a higher payment to see interest saved.",
    ],
    howToInterpret: [
      "Payment must exceed monthly interest or balances grow.",
      "Avalanche vs snowball strategies change which debt you attack first when you have several.",
    ],
    faqs: [
      {
        question: "What payment clears debt fastest?",
        answer: "The largest sustainable payment. Extra cash toward principal shortens term and interest more than minimums.",
      },
      {
        question: "Should I consolidate first?",
        answer: "Consolidation helps when the new rate and fees beat your blended APR and you avoid re-spending freed limits.",
      },
      {
        question: "Does this handle multiple debts?",
        answer: "Model one balance at a time or sum balances with a rough weighted APR for a blended estimate.",
      },
      {
        question: "How do EMI loans fit in?",
        answer: "Fixed EMI loans already have a payoff schedule — use amortization/EMI tools; this page shines for revolving or flexible payments.",
      },
      {
        question: "What if my rate is floating?",
        answer: "Re-run when the rate resets. Floating rates change both interest cost and payoff time.",
      },
    ],
  },
  "sales-tax": {
    seoTitle: "Sales Tax Calculator — Add Tax to a Price",
    seoDescription: "Add sales tax to a purchase price or back out tax from a total. Free sales tax calculator.",
    formulaNote: "Total = price × (1 + tax%/100). Pre-tax = total / (1 + tax%/100).",
    howToUse: [
      "Enter the item price and local sales tax rate.",
      "Read tax amount and gross total.",
    ],
    howToInterpret: [
      "U.S. sales tax varies by state/city; this tool does not geo-detect your rate.",
      "For India invoices, prefer the GST calculator and correct HSN rates.",
    ],
    faqs: [
      {
        question: "Is sales tax the same as GST?",
        answer: "Conceptually similar as consumption taxes, but filing rules and rate structures differ. Use GST tools for Indian invoices.",
      },
      {
        question: "How do I remove sales tax from a total?",
        answer: "Divide by (1 + rate/100). Example: $118 at 18% tax → $100 pre-tax.",
      },
      {
        question: "Are food and services taxed the same?",
        answer: "Often not — exemptions and special rates are common. Confirm local rules.",
      },
      {
        question: "Does this include excise or VAT simultaneously?",
        answer: "It models a single rate. Complex stacked taxes need itemized rules.",
      },
    ],
  },
  "discount": {
    seoTitle: "Discount Calculator — Sale Price & Percent Off",
    seoDescription: "Calculate sale price from percent off or find the discount percentage. Free discount calculator.",
    formulaNote: "Sale = original × (1 − discount%/100). Discount% = (original − sale)/original × 100.",
    howToUse: [
      "Enter the original price and discount percent.",
      "Read savings and final price.",
    ],
    howToInterpret: [
      "Stacking discounts multiplies remaining price factors.",
      "“Up to 50% off” may apply only to select SKUs.",
    ],
    faqs: [
      {
        question: "How do I calculate 40% off?",
        answer: "Multiply by 0.60, or subtract 40% of the original from the original.",
      },
      {
        question: "What if there is an additional coupon?",
        answer: "Apply coupon to the already-discounted price unless the store says otherwise.",
      },
      {
        question: "How do I find percent off from two prices?",
        answer: "Percent off = (original − sale) / original × 100.",
      },
      {
        question: "Does discount apply before or after tax?",
        answer: "Retail practice varies; many apply discounts on pre-tax price then add tax.",
      },
    ],
  },
  "roi": {
    seoTitle: "ROI Calculator — Return on Investment %",
    seoDescription: "Measure return on investment from gain and cost. Free ROI calculator for business and personal projects.",
    formulaNote: "ROI% = (gain − cost) / cost × 100, or net profit / investment × 100.",
    howToUse: [
      "Enter investment cost and final value or net profit as labeled.",
      "Read ROI percentage.",
    ],
    howToInterpret: [
      "ROI ignores time — a 20% ROI in one year beats 20% over five years.",
      "Use CAGR when you need annualized performance.",
    ],
    faqs: [
      {
        question: "What is a good ROI?",
        answer: "It depends on risk and alternatives. Compare against similar-risk opportunities and inflation.",
      },
      {
        question: "Does ROI include time value of money?",
        answer: "Basic ROI does not. Use NPV/IRR style tools when timing of cash flows matters.",
      },
      {
        question: "How is ROI different from profit margin?",
        answer: "Margin divides profit by sales; ROI divides profit by capital invested.",
      },
      {
        question: "Can ROI be negative?",
        answer: "Yes — when the investment loses money relative to cost.",
      },
      {
        question: "Should fees be in the cost?",
        answer: "Yes. Include transaction costs and relevant expenses for an honest ROI.",
      },
    ],
  },
  "npv": {
    seoTitle: "NPV Calculator — Net Present Value of Cash Flows",
    seoDescription: "Discount future cash flows to today’s value and compute NPV. Free net present value calculator.",
    formulaNote: "NPV = Σ C_t / (1+r)^t − initial investment (sign convention may vary by inputs).",
    howToUse: [
      "Enter the discount rate and cash flows as labeled.",
      "Include the initial outflow.",
      "Read NPV — positive suggests value creation at that discount rate.",
    ],
    howToInterpret: [
      "NPV > 0 at your hurdle rate means the project beats that opportunity cost (in theory).",
      "Garbage-in cash-flow forecasts produce garbage-out NPVs.",
    ],
    faqs: [
      {
        question: "What discount rate should I use?",
        answer: "Often a WACC or required return that reflects risk. Higher risk → higher discount rate → lower NPV.",
      },
      {
        question: "How is NPV different from ROI?",
        answer: "NPV discounts money through time; ROI is a simple ratio without timing.",
      },
      {
        question: "What does NPV = 0 mean?",
        answer: "The investment earns exactly your discount rate — economically indifferent at that assumption.",
      },
      {
        question: "Can I use NPV for personal decisions?",
        answer: "Yes — e.g. comparing paying cash vs financing — as long as cash flows and the rate are realistic.",
      },
      {
        question: "Does this replace IRR?",
        answer: "IRR solves for the rate that sets NPV to zero. Both are useful; NPV is clearer when scale differs across projects.",
      },
    ],
  },
  "rule-of-72": {
    seoTitle: "Rule of 72 Calculator — Doubling Time Estimate",
    seoDescription: "Estimate years for an investment to double with the Rule of 72. Fast mental-math compound interest aid.",
    formulaNote: "Approximate doubling time ≈ 72 / annual rate%. Works best for moderate rates.",
    howToUse: [
      "Enter an expected annual return percentage.",
      "Read approximate years to double.",
      "Compare with exact compound interest for precision.",
    ],
    howToInterpret: [
      "Rule of 72 is an approximation — fine for intuition, not contracts.",
      "At very high or very low rates, error grows; use exact compounding.",
    ],
    faqs: [
      {
        question: "Why 72?",
        answer: "72 has many factors and approximates the natural-log doubling formula well near common interest rates.",
      },
      {
        question: "How accurate is the Rule of 72?",
        answer: "Reasonably close around ~6–10%. Outside that band, prefer exact math.",
      },
      {
        question: "Can I use it for inflation?",
        answer: "Yes — 72 / inflation% roughly estimates how long until purchasing power halves.",
      },
      {
        question: "Does it assume annual compounding?",
        answer: "It approximates annual compounding intuitively. Exact results depend on the true schedule.",
      },
    ],
  },
  "inflation-adjuster": {
    seoTitle: "Inflation Adjuster — Real Value of Money Over Time",
    seoDescription: "Adjust amounts for inflation to compare purchasing power across years. Free inflation calculator.",
    formulaNote: "Future value ≈ present × (1 + i)^n; real value ≈ future / (1 + i)^n.",
    howToUse: [
      "Enter an amount, inflation rate, and years.",
      "See inflated future cost or deflated real value.",
    ],
    howToInterpret: [
      "A flat salary that ignores inflation loses real purchasing power.",
      "Indian long-term planners often assume mid-single-digit inflation — choose a rate that matches your scenario.",
    ],
    faqs: [
      {
        question: "What inflation rate should I enter?",
        answer: "Use a CPI-style assumption for your country and horizon. India and the U.S. have different historical averages.",
      },
      {
        question: "Is this CPI or food inflation?",
        answer: "The math is the same — pick the index that matches what you are protecting against.",
      },
      {
        question: "How does this relate to SIP returns?",
        answer: "Nominal SIP returns minus inflation approximates real returns. High nominal gains can still be modest in real terms.",
      },
      {
        question: "Can I adjust historical prices?",
        answer: "Yes — deflate an old price forward or backward with the appropriate cumulative inflation.",
      },
      {
        question: "Does deflation work too?",
        answer: "Enter a negative inflation rate to model deflationary scenarios.",
      },
    ],
  },
  "body-fat-navy": {
    seoTitle: "Body Fat Calculator — U.S. Navy Method",
    seoDescription: "Estimate body fat percentage with the U.S. Navy circumference method. Free body fat calculator — not a medical device.",
    formulaNote: "U.S. Navy formula using height, neck, waist (and hips for women) logarithms — screening estimate only.",
    howToUse: [
      "Measure neck, waist, height (and hips if required) as labeled.",
      "Enter sex and measurements carefully in the same units.",
      "Read estimated body-fat percentage.",
    ],
    howToInterpret: [
      "Tape position matters — measure consistently.",
      "DEXA/BOD POD are more precise clinical methods; this is a field estimate.",
    ],
    faqs: [
      {
        question: "How accurate is the Navy body-fat method?",
        answer: "It is reasonable for tracking trends but can err several percentage points versus DEXA. Use it comparatively over time.",
      },
      {
        question: "When should I measure?",
        answer: "Under similar conditions (time of day, before meals) for comparable trends.",
      },
      {
        question: "Is BMI or body fat more useful?",
        answer: "Body-fat estimates speak more directly to composition; BMI is simpler but blunter. Both are screening tools.",
      },
      {
        question: "Do athletes get odd results?",
        answer: "Unusual builds can skew circumference equations. Prefer sport-specific assessment when possible.",
      },
      {
        question: "Is this medical advice?",
        answer: "No — educational only. Discuss health risks with a clinician.",
      },
    ],
  },
  "pregnancy-due-date": {
    seoTitle: "Pregnancy Due Date Calculator — EDD from LMP",
    seoDescription: "Estimate pregnancy due date from last menstrual period (Naegele’s rule style). Free EDD calculator — not medical advice.",
    formulaNote: "Common estimate: LMP + 280 days (40 weeks) for a 28-day cycle; clinicians may adjust for cycle length and ultrasound.",
    howToUse: [
      "Enter the first day of your last menstrual period (LMP).",
      "Review estimated due date and gestational timing if shown.",
      "Confirm with your healthcare provider and ultrasound dating.",
    ],
    howToInterpret: [
      "Only about 5% of births occur on the EDD — it is an estimate.",
      "Irregular cycles and IVF dating need clinician adjustment.",
    ],
    faqs: [
      {
        question: "How is due date calculated?",
        answer: "Typically 280 days from LMP for a standard cycle, sometimes adjusted by early ultrasound measurements.",
      },
      {
        question: "What if my cycle is not 28 days?",
        answer: "Longer or shorter cycles shift ovulation; your provider may adjust EDD. This tool uses a standard assumption unless it asks for cycle length.",
      },
      {
        question: "Is ultrasound dating better?",
        answer: "Early ultrasound is often preferred when LMP is uncertain. Follow your clinician’s dating.",
      },
      {
        question: "Can I calculate conception date?",
        answer: "Conception usually occurs around ovulation (~2 weeks after LMP in a 28-day cycle), but it varies.",
      },
      {
        question: "Is this a substitute for prenatal care?",
        answer: "Absolutely not. Use it for orientation only and consult qualified care.",
      },
    ],
  },
  "square-footage": {
    seoTitle: "Square Footage Calculator — Area for Rooms & Floors",
    seoDescription: "Calculate square footage/meters for rooms and spaces. Free area calculator for flooring and paint planning.",
    formulaNote: "Rectangle area = length × width. Sum sections for irregular layouts.",
    howToUse: [
      "Measure length and width of each rectangular section.",
      "Enter dimensions in consistent units.",
      "Sum areas for the whole space.",
    ],
    howToInterpret: [
      "Buy flooring with waste factor (often 5–10%).",
      "Closets and nooks add up — measure them too.",
    ],
    faqs: [
      {
        question: "How do I measure an L-shaped room?",
        answer: "Split into two rectangles, compute each area, then add.",
      },
      {
        question: "Is square footage the same as square metres?",
        answer: "No — they are different units. Convert: 1 m² ≈ 10.764 ft².",
      },
      {
        question: "Should doors and windows be subtracted for paint?",
        answer: "For wall paint, subtract large openings; for flooring, usually measure floor area only.",
      },
      {
        question: "Do builders round measurements?",
        answer: "Listings may differ from tape measurements. Measure yourself for materials.",
      },
    ],
  },
  "cooking-converter": {
    seoTitle: "Cooking Converter — Cups, Grams, Oz & More",
    seoDescription: "Convert common cooking measurements between volume and weight helpers. Free kitchen unit converter.",
    formulaNote: "Volume conversions use standard cup/tbsp/tsp relationships; weight conversions depend on ingredient density when applicable.",
    howToUse: [
      "Pick the units you have and the units you need.",
      "Enter the quantity from your recipe.",
      "Adjust for ingredient density when converting volume ↔ weight.",
    ],
    howToInterpret: [
      "A cup of flour ≠ a cup of honey in grams.",
      "Prefer weighing coffee, flour, and sugar for consistency.",
    ],
    faqs: [
      {
        question: "Why do my baked goods fail after converting cups to grams?",
        answer: "Cup scooping varies by compression. Gram measurements are more repeatable.",
      },
      {
        question: "Are US and UK cups identical?",
        answer: "US customary cup is 240 mL in many nutrition contexts; older UK recipes may differ. Check which system the recipe uses.",
      },
      {
        question: "Can I convert oven temperatures here?",
        answer: "Use the temperature converter or oven tools for °C ↔ °F; this page focuses on ingredient amounts.",
      },
      {
        question: "How many teaspoons in a tablespoon?",
        answer: "Typically 3 teaspoons = 1 tablespoon in US cooking measures.",
      },
    ],
  },
  "scientific": {
    seoTitle: "Scientific Calculator Online — Free Advanced Keypad",
    seoDescription: "Browser-based scientific calculator with advanced functions. Free online scientific keypad — no signup.",
    formulaNote: "Evaluates standard scientific operations (trig, logs, powers, etc.) client-side. Angle mode matters for trig.",
    howToUse: [
      "Enter expressions using the keypad or keyboard.",
      "Check degree vs radian mode before trig functions.",
      "Use memory keys if available for multi-step work.",
    ],
    howToInterpret: [
      "Floating-point results may show tiny rounding artifacts.",
      "Domain errors (e.g. log of negative) should surface as errors — adjust inputs.",
    ],
    faqs: [
      {
        question: "Is this calculator free?",
        answer: "Yes. It runs in your browser with no account required.",
      },
      {
        question: "Does it support degrees and radians?",
        answer: "Use the mode control on the keypad. Mixing modes is a common source of wrong trig answers.",
      },
      {
        question: "Can I graph functions here?",
        answer: "Use the graphing calculator tool for plots; this scientific pad focuses on keypad evaluation.",
      },
      {
        question: "Are calculations sent to a server?",
        answer: "Core math runs client-side in your browser on MyCalcsWorld.",
      },
      {
        question: "Why did I get a long floating-point result?",
        answer: "Binary floating point cannot represent some decimals exactly. Round appropriately for your context.",
      },
    ],
  },
  "graphing-calculator": {
    seoTitle: "Graphing Calculator Online — Plot Functions Free",
    seoDescription: "Plot functions and explore graphs in your browser. Free online graphing calculator for students and teachers.",
    formulaNote: "Samples y = f(x) across a window and plots points/curves. Resolution depends on sample density.",
    howToUse: [
      "Enter a function of x as labeled.",
      "Set window bounds if available.",
      "Read intercepts and shape from the plot.",
    ],
    howToInterpret: [
      "Sharp corners or asymptotes may need a tighter window to see clearly.",
      "Numerical sampling can miss infinitely thin features.",
    ],
    faqs: [
      {
        question: "What functions can I graph?",
        answer: "Common algebraic and standard math functions supported by the parser — check the on-page syntax hints.",
      },
      {
        question: "Can I graph polar or parametric equations?",
        answer: "This tool focuses on y = f(x) style plots unless otherwise labeled.",
      },
      {
        question: "Why does my graph look jagged?",
        answer: "Increase sample density or zoom into the region of interest; steep slopes need finer sampling.",
      },
      {
        question: "Is this a replacement for a hardware graphing calculator?",
        answer: "It covers quick classroom and homework plots. Exam rules may still require approved hardware.",
      },
      {
        question: "Do I need an account?",
        answer: "No — MyCalcsWorld graphing runs in the browser without signup.",
      },
    ],
  },


  "age": {
    seoTitle: "Age Calculator — Years, Months & Days from Date of Birth",
    seoDescription: "Calculate exact age in years, months, and days from date of birth. Free browser tool with leap-year handling — useful for forms, milestones, and planning.",
    formulaNote: "Age is computed from DOB to the as-of date by walking calendar years, then leftover months and days. Leap days are respected when February 29 falls in the span. Displayed totals are completed units (not rounded-up next birthdays).",
    overview: "An age calculator answers “how old am I on this date?” in completed years, months, and days — the format many forms, schools, and HR portals expect.\n\nMyCalcsWorld’s Age Calculator handles leap years and shows a transparent breakdown so you can verify against a passport DOB or a school admission cutoff. Pair it with the Date Difference tool when you need a raw day count instead of Y/M/D age.",
    howToUse: [
      "Enter date of birth.",
      "Set the as-of date (defaults to today when offered).",
      "Read years, months, and days completed.",
      "Cross-check against any institutional cutoff rule that uses a specific as-of date.",
    ],
    howToUseUS: [
      "Enter DOB in the form’s date fields (U.S. forms often care about age as of a school or sports cutoff date).",
      "Set as-of to the cutoff, not necessarily today.",
      "Read completed years first if the form only asks for age in years.",
    ],
    howToUseIndia: [
      "Enter DOB as on Aadhaar / birth certificate.",
      "For school/college cutoffs, set as-of to the board or university reference date.",
      "Use the Y/M/D breakdown when a form asks for exact age rather than completed years only.",
    ],
    howToInterpret: [
      "Years/months/days are completed units as of the as-of date.",
      "A one-day shift around a birthday or leap day can change the display — expected behavior.",
      "This is calendar age, not gestational age (use pregnancy tools for that).",
    ],
    workedExample: {
      title: "Worked example — DOB 15 Mar 2000 as of 15 Mar 2026",
      steps: [
        "From 15 Mar 2000 to 15 Mar 2026 is exactly 26 completed years.",
        "Months and days remainder = 0 when the anniversary matches.",
        "If as-of were 14 Mar 2026, age would be 25 years, 11 months, and ~27–28 days depending on February.",
      ],
      result: "26 years, 0 months, 0 days on the matching anniversary — illustrative.",
    },
    faqs: [
      { question: "Does this age calculator handle leap years?", answer: "Yes. February 29 is respected when it falls in the span between DOB and the as-of date." },
      { question: "Is age the same as day count ÷ 365?", answer: "No. Calendar age uses years/months/days on the civil calendar, not a fixed 365-day divisor." },
      { question: "Can I pick a future as-of date?", answer: "If the form allows it, yes — useful for “age on exam day” planning. Educational only." },
      { question: "Why might a government portal show a different age?", answer: "Portals may use timezone cutoffs, truncate to years only, or apply scheme-specific rules. Match their as-of definition." },
    ],
  },
  "date-difference": {
    seoTitle: "Date Difference Calculator — Days Between Two Dates",
    seoDescription: "Find the number of days between two dates, with optional breakdowns. Free date-duration tool for planning, deadlines, and project spans.",
    formulaNote: "Day difference counts the calendar span between start and end according to the tool’s inclusive/exclusive convention shown in the result hint. Leap days inside the span are included in the day total.",
    overview: "Need to know how many days until a deadline, between invoices, or across a project window? The Date Difference calculator gives a clear day count (and related breakdowns when shown) without building a spreadsheet.\n\nUse Age Calculator instead when you need years/months/days from a date of birth.",
    howToUse: ["Enter the start date.", "Enter the end date.", "Read the day difference and any secondary breakdown.", "Confirm inclusive vs exclusive counting via the result hint before filing a deadline."],
    howToUseUS: ["Enter start and end in the form fields.", "For U.S. business contexts, remember federal holidays are not auto-excluded unless a business-day mode says so.", "Verify with the institution that owns the deadline."],
    howToUseIndia: ["Enter start and end dates.", "Bank/court holidays are not auto-skipped in plain day-count mode.", "Use for exam countdowns, rent periods, or project spans — confirm with the relevant authority."],
    howToInterpret: ["Read the hint under the result for inclusive/exclusive rules.", "Weekend-only exclusions appear only when that mode is offered.", "Educational scheduling aid — not legal notice calculation."],
    workedExample: {
      title: "Worked example — 1 Jan to 31 Jan in a non-leap year",
      steps: ["Start = Jan 1, end = Jan 31.", "Exclusive end-date conventions often yield 30 days; inclusive spans may show 31 — match the hint.", "February adds leap-day effects only when the span covers Feb 29."],
      result: "About 30–31 days depending on inclusive counting — check the on-page hint.",
    },
    faqs: [
      { question: "Are weekends excluded?", answer: "Only if you use a business-day oriented mode. Standard difference counts all calendar days." },
      { question: "Do holidays count?", answer: "Yes in plain day count. Holiday calendars are not embedded for every country." },
      { question: "Can I measure years between dates?", answer: "Day totals convert roughly to years via ÷365.25, but Age Calculator is better for civil Y/M/D age." },
      { question: "Timezone issues?", answer: "Use the same timezone convention for both dates when crossing midnight matters." },
    ],
  },
  "split-bill": {
    seoTitle: "Split Bill Calculator — Fair Share with Tip",
    seoDescription: "Split a restaurant or group bill evenly (or by share) with optional tip. Free bill-split tool for dinners out and trips.",
    formulaNote: "Even split ≈ (bill + tip) / people. Tip may be percent of pre-tip bill. Uneven shares weight the total by the ratios you enter when that mode exists.",
    overview: "The Split Bill calculator turns an awkward dinner check into clear per-person amounts, with optional tip — handy for restaurants, roommates, and group travel.\n\nRound results the way your group prefers (some always round up for service).",
    howToUse: ["Enter the bill total.", "Set number of people.", "Add tip percent or amount if desired.", "Read each person’s share."],
    howToUseUS: ["Enter pre-tax or post-tax total as your group agrees — U.S. tips are often on pre-tax food & drink.", "15–20%+ tip is common for full-service restaurants; adjust for quality.", "Split evenly or use related tip tools for more control."],
    howToUseIndia: ["Enter the bill including or excluding GST as your group prefers.", "Service charge may already be on the bill — avoid double-tipping unless you intend to.", "Split evenly for casual dining; use per-item honesty for large groups."],
    howToInterpret: ["Per-person share is exact arithmetic; coin rounding is a social choice.", "If service charge is included, decide whether an extra tip is needed.", "Planning aid — not a payment processor."],
    workedExample: {
      title: "Worked example — $120 bill, 4 people, 18% tip",
      steps: ["Tip = 120 × 0.18 = 21.60.", "Total = 141.60.", "Per person = 141.60 / 4 = 35.40."],
      result: "$35.40 each before any rounding.",
    },
    faqs: [
      { question: "Should tip be on pre-tax or post-tax?", answer: "Customs vary. Many U.S. diners tip on pre-tax food & drink; follow your group’s norm." },
      { question: "What if someone only ordered drinks?", answer: "Even split is simplest; for fairness, itemize or use weighted shares when available." },
      { question: "Does this handle tax separately?", answer: "Enter the total your group is splitting. Use sales-tax tools if you need to add tax first." },
      { question: "Cash vs UPI/card rounding?", answer: "Agree how to handle leftover cents before paying." },
    ],
  },
  "fuel-cost": {
    seoTitle: "Fuel Cost Calculator — Trip Cost from Distance & Mileage",
    seoDescription: "Estimate fuel cost for a trip from distance, efficiency, and fuel price. Free planner for road trips and commuting.",
    formulaNote: "Cost ≈ distance × (fuel price) / efficiency, with efficiency in distance-per-volume (e.g. km/L or MPG) depending on fields. Real trips vary with traffic, load, AC, and speed.",
    overview: "Plan a road trip or commute budget by combining distance, fuel efficiency, and pump price. The Fuel Cost calculator gives a transparent estimate you can stress-test with worse mileage or higher prices.\n\nPair with Fuel vs EV tools when comparing powertrains.",
    howToUse: ["Enter trip distance.", "Enter vehicle efficiency (as labeled).", "Enter fuel price per unit.", "Read estimated fuel cost (and quantity when shown)."],
    howToUseUS: ["Use miles and MPG with $/gallon for typical U.S. road-trip math.", "Highway MPG is often higher than city — pick a realistic blend.", "Add parking/tolls separately."],
    howToUseIndia: ["Use km and km/L with ₹/litre for Indian highway planning.", "AC, load, and traffic can cut real km/L vs brochure figures.", "Compare CNG/EV alternatives with related tools when relevant."],
    howToInterpret: ["Estimate assumes steady efficiency — hills and traffic change reality.", "Round-trip = usually 2× one-way if conditions match.", "Planning aid, not a fleet telematics report."],
    workedExample: {
      title: "Worked example — 300 km at 15 km/L and ₹100/L",
      steps: ["Fuel needed = 300 / 15 = 20 L.", "Cost = 20 × 100 = ₹2,000."],
      result: "About ₹2,000 for that leg before tolls.",
    },
    faqs: [
      { question: "City or highway mileage?", answer: "Use a blend that matches your route; brochure highway figures are often optimistic." },
      { question: "Does this include tolls?", answer: "No — add tolls and parking separately." },
      { question: "Can I model a round trip?", answer: "Double the distance if return conditions are similar." },
      { question: "What about EVs?", answer: "Use an EV/fuel comparison tool for electricity cost vs petrol/diesel." },
    ],
  },
  "temperature": {
    seoTitle: "Temperature Converter — Celsius, Fahrenheit & Kelvin",
    seoDescription: "Convert temperatures between °C, °F, and K instantly. Free converter with standard linear formulas for school, cooking, and weather.",
    formulaNote: "°F = °C × 9/5 + 32; °C = (°F − 32) × 5/9; K = °C + 273.15. These are affine transforms — not simple ratios.",
    overview: "Temperature conversion is one of the most common unit tasks — weather apps, oven settings, lab work, and school science all mix °C, °F, and kelvin.\n\nThis converter applies the standard linear formulas so you can move between scales without memorizing offsets every time.",
    howToUse: ["Enter a value in one scale.", "Read the converted outputs.", "Use kelvin for science contexts that need absolute temperature.", "Remember cooking and weather almost never use kelvin."],
    howToUseUS: ["U.S. weather and ovens are usually °F — convert recipes from °C carefully (ovens are not linear “just multiply”).", "Body-temperature references differ slightly by scale."],
    howToUseIndia: ["Weather and school science are usually °C; convert U.S. recipes from °F.", "Lab work may require kelvin — use the K output."],
    howToInterpret: ["0 °C ≠ 0 °F; only the formulas above are correct.", "Differences in °C equal differences in K.", "Educational converter — not a calibrated thermometer."],
    workedExample: {
      title: "Worked example — 25 °C",
      steps: ["°F = 25 × 9/5 + 32 = 77.", "K = 25 + 273.15 = 298.15."],
      result: "25 °C = 77 °F = 298.15 K.",
    },
    faqs: [
      { question: "Why can’t I just multiply by 1.8?", answer: "You also need the +32 offset between °C and °F. Differences can use ×1.8 without offset." },
      { question: "Is kelvin ever negative?", answer: "No — 0 K is absolute zero. Negative °C/°F are fine." },
      { question: "Oven conversion tips?", answer: "Convert the setpoint; also check whether fan/convection instructions differ by region." },
      { question: "Precision?", answer: "Displayed decimals are rounded; metrology needs calibrated instruments." },
    ],
  },
  "length": {
    seoTitle: "Length Converter — Metric & Imperial Distances",
    seoDescription: "Convert length between meters, feet, inches, kilometers, miles, and more. Free unit converter for DIY, school, and travel.",
    formulaNote: "Conversions use standard SI and customary factors (e.g. 1 in = 25.4 mm exact; 1 ft = 12 in). Chain through meters internally for consistency.",
    overview: "Length conversion shows up in DIY plans, travel distances, fabric cutting, and homework. This tool maps common metric and imperial units with standard factors.\n\nFor area or volume, use the dedicated converters so you do not square/cube incorrectly by hand.",
    howToUse: ["Enter a length value.", "Pick or read the target unit outputs.", "Keep significant figures appropriate to your measuring tape or map.", "Use area/volume tools for 2D/3D quantities."],
    howToUseUS: ["Feet/inches and miles are common; watch survey feet vs international feet only for specialized geospatial work.", "Building plans may mix fractional inches — round carefully."],
    howToUseIndia: ["Meters/cm and kilometers dominate; convert U.S. plans from feet/inches.", "BIS and construction docs usually prefer metric."],
    howToInterpret: ["Exact SI definitions beat memory roundings for precision work.", "Do not convert area by converting length once — square the factor.", "DIY aid — verify structural dimensions with a professional when safety matters."],
    workedExample: {
      title: "Worked example — 6 feet to meters",
      steps: ["6 ft = 72 in.", "72 × 25.4 mm = 1828.8 mm = 1.8288 m."],
      result: "About 1.829 m.",
    },
    faqs: [
      { question: "Is 1 inch exactly 25.4 mm?", answer: "Yes — the inch is defined as exactly 25.4 mm." },
      { question: "Miles vs nautical miles?", answer: "This general length tool focuses on common land units; aviation/marine may need nautical miles separately." },
      { question: "Fractional inches?", answer: "Enter decimals (e.g. 0.5 for 1/2) unless the UI offers fractions." },
      { question: "Accuracy for CNC?", answer: "Use engineering tolerances and machine units; web converters are for everyday/school use." },
    ],
  },
  "weight": {
    seoTitle: "Weight Converter — kg, lb, oz & More",
    seoDescription: "Convert mass/weight between kilograms, pounds, ounces, grams, and stones. Free converter for cooking, shipping, and fitness.",
    formulaNote: "Uses standard mass factors (1 lb = 0.45359237 kg exact in the international pound). Everyday language says “weight”; the converter treats mass under standard gravity.",
    overview: "Shipping labels, gym plates, recipes, and baggage allowances constantly mix kilograms and pounds. This weight converter applies standard factors so you can move between systems quickly.\n\nFor cooking volume↔mass you still need ingredient density — use cooking converters when appropriate.",
    howToUse: ["Enter a mass value.", "Read kg/lb/oz (and other) outputs.", "Match the unit your airline, gym, or recipe expects.", "Do not confuse fluid ounces with ounces mass."],
    howToUseUS: ["Pounds and ounces dominate consumer contexts; body weight is usually lb.", "Shipping may show lb or oz — check carrier labels."],
    howToUseIndia: ["Kilograms dominate; convert U.S. product labels from lb/oz.", "Gold jewelry uses grams and purity — see commodities tools for value."],
    howToInterpret: ["lb↔kg uses the international pound factor.", "Stone is 14 lb where shown.", "Educational converter — scales need calibration for trade."],
    workedExample: {
      title: "Worked example — 70 kg to lb",
      steps: ["1 kg ≈ 2.20462 lb.", "70 × 2.20462 ≈ 154.32 lb."],
      result: "About 154.3 lb.",
    },
    faqs: [
      { question: "Weight vs mass?", answer: "Conversationally people say weight; the math uses mass factors. Local gravity differences are ignored." },
      { question: "Troy ounces for gold?", answer: "Precious metals often use troy ounces — use metals tools for karat/purity value, not only avoirdupois oz." },
      { question: "Baby weight charts?", answer: "Convert units, but interpret growth charts with a pediatrician." },
      { question: "Baggage limits?", answer: "Airlines publish limits in kg or lb — convert and leave a margin." },
    ],
  },
  "pythagoras": {
    seoTitle: "Pythagoras Theorem Calculator — Right Triangle Sides",
    seoDescription: "Solve a right triangle with a² + b² = c². Find hypotenuse or a leg instantly — free geometry tool with clear steps.",
    formulaNote: "For a right triangle, a² + b² = c² where c is the hypotenuse. Given two sides, the third is recovered by square roots: c = √(a²+b²), a = √(c²−b²), etc.",
    overview: "The Pythagorean theorem is the workhorse of right-triangle geometry — construction layouts, distance checks, and classroom proofs all rely on a² + b² = c².\n\nThis calculator finds the missing side when you provide the other two, with formula notes you can rewrite on paper for exams.",
    howToUse: ["Identify which side is the hypotenuse (longest, opposite the right angle).", "Enter the two known sides.", "Read the computed third side.", "Confirm units are consistent (all cm or all m)."],
    howToUseUS: ["Common in shop math and SAT-style geometry — keep inches/feet consistent.", "For 3D distance use the 3D Pythagoras / distance tools."],
    howToUseIndia: ["Matches class 8–10 Pythagoras applications in board curricula.", "Keep units consistent; show √ steps on paper for exams."],
    howToInterpret: ["Works only for right triangles.", "If c² < a² + b² checks fail, inputs may not form a right triangle with those legs.", "Educational geometry — not a survey instrument."],
    workedExample: {
      title: "Worked example — legs 3 and 4",
      steps: ["a=3, b=4 → c=√(9+16)=√25=5.", "Classic 3-4-5 triple."],
      result: "Hypotenuse = 5 (same units as the legs).",
    },
    faqs: [
      { question: "Does this work for non-right triangles?", answer: "No — use the law of cosines / triangle solver for oblique triangles." },
      { question: "Can I find a leg from hypotenuse?", answer: "Yes — enter hypotenuse and the other leg; the tool returns the missing leg." },
      { question: "3D version?", answer: "See Pythagoras 3D / distance-3D tools for space diagonals." },
      { question: "Exact vs decimal?", answer: "Display is decimal; leave answers under radicals on exams when required." },
    ],
  },
  "circle": {
    seoTitle: "Circle Calculator — Area, Circumference & Radius",
    seoDescription: "Calculate circle area, circumference, radius, or diameter from any one known value. Free geometry tool for school and DIY.",
    formulaNote: "Circumference C = 2πr = πd; area A = πr². Given any one of r, d, C, or A, the others follow algebraically (r = √(A/π), etc.).",
    overview: "Circles show up in garden beds, pipe sizing, pizza math, and exam problems. This calculator relates radius, diameter, circumference, and area so you can move from any one known value to the rest.\n\nπ is taken as the usual floating-point constant; exams may want answers in terms of π.",
    howToUse: ["Enter the known quantity (radius, diameter, circumference, or area).", "Read the derived circle measures.", "Keep units consistent (area will be length²).", "For arcs/sectors use specialized tools if listed."],
    howToUseUS: ["DIY often uses inches/feet — convert area to ft² carefully (12 in = 1 ft ⇒ 144 in² = 1 ft²)."],
    howToUseIndia: ["School problems often want exact π form — use decimals here and rewrite as π·r² on paper when needed."],
    howToInterpret: ["Area units are squared length units.", "Diameter is twice radius always.", "Educational geometry aid."],
    workedExample: {
      title: "Worked example — radius 7",
      steps: ["d = 14.", "C = 2π·7 = 14π ≈ 43.98.", "A = π·49 ≈ 153.94."],
      result: "Diameter 14; circumference ≈ 43.98; area ≈ 153.94 (same length units).",
    },
    faqs: [
      { question: "What value of π is used?", answer: "JavaScript’s Math.PI (~15 decimals). Exams may require exact π symbols." },
      { question: "Can I start from area?", answer: "Yes — radius = √(A/π), then diameter and circumference follow." },
      { question: "Sphere vs circle?", answer: "This page is 2D. Use sphere tools for surface area/volume of balls." },
      { question: "Pipe OD/ID?", answer: "Treat as circles; engineering fittings need real schedules and tolerances." },
    ],
  },
  "average": {
    seoTitle: "Average Calculator — Mean, Median & Mode",
    seoDescription: "Compute mean, median, and mode from a list of numbers. Free statistics helper for homework and quick analysis.",
    formulaNote: "Mean = Σx / n. Median = middle value after sorting (average of two middles if n even). Mode = most frequent value(s).",
    overview: "Mean, median, and mode answer different questions about a dataset — typical value, middle value, and most common value. This average calculator computes them from your list so you can check homework or summarize a small sample quickly.\n\nFor spread, see the Standard Deviation calculator.",
    howToUse: ["Enter numbers as the form accepts (comma/space separated or fields).", "Read mean, median, and mode.", "Sort mentally to verify median on small sets.", "Use sample vs population std-dev tools for dispersion."],
    howToUseUS: ["Common in middle-school through AP Stats warmups — match whether your teacher wants mean of frequencies separately."],
    howToUseIndia: ["Useful for class 9–11 statistics chapters — show working for mean Σx/n on paper."],
    howToInterpret: ["Outliers pull the mean more than the median.", "Multimodal sets can have multiple modes.", "Descriptive only — not a full stats suite."],
    workedExample: {
      title: "Worked example — 2, 4, 4, 6, 9",
      steps: ["Mean = (2+4+4+6+9)/5 = 5.", "Sorted already; median = 4.", "Mode = 4 (appears twice)."],
      result: "Mean 5; median 4; mode 4.",
    },
    faqs: [
      { question: "When is median better than mean?", answer: "When outliers skew the average — incomes and house prices are classic examples." },
      { question: "What if all values appear once?", answer: "Every value is equally frequent; some texts say “no mode.”" },
      { question: "Weighted averages?", answer: "Use a weighted-mean / grade-weight tool when items have different weights." },
      { question: "Sample vs population?", answer: "Mean formula is the same; variance/std-dev divisors differ — see std-dev tool." },
    ],
  },
  "water-intake": {
    seoTitle: "Water Intake Calculator — Daily Hydration Estimate",
    seoDescription: "Estimate a daily water intake target from body weight and activity. Educational hydration helper — not medical advice.",
    formulaNote: "Many consumer rules of thumb scale fluid needs with body weight and bump for activity/climate. Exact clinical needs vary widely; this tool uses a transparent educational heuristic labeled on the form.",
    overview: "Hydration targets are personalized — body size, climate, exercise, and health conditions all matter. This Water Intake calculator gives an educational daily estimate from common weight-based rules of thumb so you can set a starting goal.\n\nIt is not medical advice; kidney disease, heart failure, and other conditions need clinician guidance.",
    howToUse: ["Enter body weight.", "Adjust activity/climate factors if offered.", "Read the suggested daily volume.", "Increase gradually and listen to thirst/urine cues unless told otherwise by a clinician."],
    howToUseUS: ["Results may show fl oz or cups — convert to bottles you actually use.", "Athletes may need more; discuss with a trainer/clinician."],
    howToUseIndia: ["Results often in liters/ml — practical for bottle planning in hot climates.", "Monsoon humidity and outdoor labor change needs; educational only."],
    howToInterpret: ["Targets are heuristics, not prescriptions.", "Food moisture and other beverages count toward fluids for many people.", "Seek medical advice for specialized diets or illness."],
    workedExample: {
      title: "Worked example — 70 kg moderate activity",
      steps: ["Start from the form’s weight-based baseline.", "Apply the activity bump shown on the page.", "Convert ml to bottles (e.g. 500 ml) for a practical schedule."],
      result: "A moderate adult estimate is often in the ~2–3+ L/day ballpark depending on the heuristic — follow the live output.",
    },
    faqs: [
      { question: "Is 8 glasses universal?", answer: "No — it is a rough slogan. Weight, climate, and activity change needs." },
      { question: "Do coffee/tea count?", answer: "They contribute fluids for most healthy adults; limits differ by person." },
      { question: "Can I drink too much water?", answer: "Yes — overhydration can be dangerous. Do not force extreme intakes." },
      { question: "Medical conditions?", answer: "Follow your clinician — some conditions restrict fluids." },
    ],
  },
  "one-rep-max": {
    seoTitle: "One-Rep Max Calculator — Epley & Training Loads",
    seoDescription: "Estimate one-rep max (1RM) from reps and weight using common formulas. Plan training loads — not a substitute for safe spotting.",
    formulaNote: "Common estimators include Epley: 1RM ≈ w(1 + r/30) for weight w and reps r (typically ≤10–12). Other formulas (Brzycki, etc.) may be noted on-page. Estimates degrade as reps get high.",
    overview: "A one-rep max estimate helps lifters program percentages without testing a true max every week. Enter a weight you lifted for N reps and get an estimated 1RM plus handy training percentages when shown.\n\nUse a spotter and safe form — calculators do not prevent injury.",
    howToUse: ["Enter the weight lifted.", "Enter reps completed cleanly.", "Read estimated 1RM and any percentage chart.", "Prefer rep ranges ≤10 for better estimates."],
    howToUseUS: ["lb plates are common — keep units consistent with your gym.", "Beginner programs often use estimated 1RM percentages rather than weekly max tests."],
    howToUseIndia: ["kg plates dominate most gyms — enter kg.", "Focus on form; estimated 1RM is for programming, not ego maxing."],
    howToInterpret: ["High-rep sets overestimate/underestimate depending on formula and fatigue.", "True 1RM can differ with sleep, grip, and ROM.", "Training aid — not medical advice."],
    workedExample: {
      title: "Worked example — 100 kg × 5 reps (Epley)",
      steps: ["1RM ≈ 100 × (1 + 5/30) = 100 × 1.1667 ≈ 116.7 kg.", "80% of that ≈ 93 kg for volume work."],
      result: "About 117 kg estimated 1RM — illustrative.",
    },
    faqs: [
      { question: "Which formula is best?", answer: "Epley/Brzycki are common; none is perfect. Use the same formula over time for consistency." },
      { question: "Are high-rep estimates accurate?", answer: "They get noisier above ~10–12 reps." },
      { question: "Should beginners test true 1RM?", answer: "Usually no — estimated 1RM from submaximal sets is safer." },
      { question: "Injury disclaimer?", answer: "Stop if you feel sharp pain; use spotters on bar work." },
    ],
  },
  "margin-markup": {
    seoTitle: "Margin & Markup Calculator — Price, Cost & Profit",
    seoDescription: "Convert between margin %, markup %, cost, and price. Free business pricing tool that keeps the two definitions straight.",
    formulaNote: "Margin = (price − cost)/price; Markup = (price − cost)/cost. Therefore price = cost/(1 − margin) and price = cost × (1 + markup).",
    overview: "Teams constantly confuse margin with markup — and misprice products as a result. This calculator converts between cost, price, margin %, and markup % with the standard identities so pricing meetings stay unambiguous.\n\nTaxes, shipping, and payment fees are extra unless you baked them into cost.",
    howToUse: ["Enter cost and either price, margin, or markup depending on fields.", "Read the derived margin/markup/price.", "Label which % you are quoting in customer or investor conversations.", "Re-run after adding freight or fees into cost."],
    howToUseUS: ["U.S. retail conversations often say “margin” but mean markup — clarify definitions.", "Compare with break-even tools for volume targets."],
    howToUseIndia: ["Useful for traders and D2C pricing before GST presentation — decide whether quotes are tax-inclusive.", "Keep margin vs markup language clear with suppliers."],
    howToInterpret: ["50% markup ≠ 50% margin (50% markup = 33.3% margin).", "Negative margin means price below cost.", "Illustrative pricing math — not accounting software."],
    workedExample: {
      title: "Worked example — cost 80, price 100",
      steps: ["Profit = 20.", "Margin = 20/100 = 20%.", "Markup = 20/80 = 25%."],
      result: "20% margin ↔ 25% markup on that item.",
    },
    faqs: [
      { question: "Is markup always higher than margin?", answer: "For profitable items, markup % > margin % because denominators differ." },
      { question: "How do I get price from margin?", answer: "price = cost / (1 − margin) for margin as a decimal." },
      { question: "Does this include tax?", answer: "Only if you included tax in the inputs." },
      { question: "Wholesale vs retail?", answer: "Apply the same identities; stack margins carefully across the channel." },
    ],
  },
  "hourly-to-salary": {
    seoTitle: "Hourly to Salary Converter — Annual Pay Estimate",
    seoDescription: "Convert hourly wages to annual salary (and back) with hours/week and weeks/year. Free compensation planning tool.",
    formulaNote: "Annual ≈ hourly × hours_per_week × weeks_per_year. Reverse: hourly ≈ annual / (hours_per_week × weeks_per_year). Benefits, overtime, and taxes are not included unless modeled elsewhere.",
    overview: "Job offers mix hourly and salaried language. This converter translates between them using explicit hours/week and weeks/year assumptions so you can compare apples to apples.\n\nBenefits load, overtime rules, and taxes differ by country and contract — adjust outside the simple product.",
    howToUse: ["Enter hourly rate or annual salary.", "Set hours/week and paid weeks/year.", "Read the converted figure.", "Adjust weeks down for unpaid time off if needed."],
    howToUseUS: ["Full-time often assumes 40×52 = 2,080 hours — many roles are not truly 2,080 paid hours.", "Exempt vs non-exempt overtime rules are legal topics beyond this math."],
    howToUseIndia: ["Compare monthly CTC vs hourly contract rates carefully — CTC may include benefits.", "Use INR via currency picker for display."],
    howToInterpret: ["Simple product ignores bonuses and equity.", "Fewer paid weeks lowers annualized pay.", "Compensation planning aid — not tax advice."],
    workedExample: {
      title: "Worked example — $30/hr × 40 × 52",
      steps: ["30 × 40 = 1,200 per week.", "1,200 × 52 = 62,400 per year."],
      result: "$62,400 annualized before taxes/benefits.",
    },
    faqs: [
      { question: "Is 2,080 hours always right?", answer: "It is a common full-time assumption, not a law of nature. Use your real schedule." },
      { question: "Does this include employer taxes?", answer: "No — employee gross vs employer total cost differ." },
      { question: "Monthly salary?", answer: "Divide annual by 12 for a rough monthly gross." },
      { question: "Contractors vs employees?", answer: "Contract rates often need to cover benefits and downtime — do not compare raw hourly only." },
    ],
  },
  "standard-deviation": {
    seoTitle: "Standard Deviation Calculator — Sample & Population",
    seoDescription: "Compute standard deviation and variance for a dataset. Free statistics tool labeling sample vs population formulas.",
    formulaNote: "Population variance σ² = Σ(x−μ)² / N; sample variance s² = Σ(x−x̄)² / (n−1). Standard deviation is the square root. Confirm which divisor your coursework requires.",
    overview: "Standard deviation measures spread around the mean. This calculator computes variance and std-dev for your list and distinguishes sample vs population divisors when both are offered — a frequent homework tripwire.\n\nPair with the Average calculator for mean/median/mode.",
    howToUse: ["Enter your dataset.", "Choose sample vs population if prompted.", "Read variance and standard deviation.", "Compare with your textbook’s divisor convention."],
    howToUseUS: ["AP Stats / college intro stats usually want sample s with n−1 for inferential work on samples."],
    howToUseIndia: ["Board and university problems specify population vs sample — match the question wording."],
    howToInterpret: ["Same units as the data for std-dev; squared units for variance.", "Outliers inflate std-dev.", "Descriptive/educational — not a full hypothesis test."],
    workedExample: {
      title: "Worked example — 2, 4, 4, 4, 5, 5, 7, 9",
      steps: ["Mean = 5.", "Squared deviations sum = 32.", "Sample variance = 32/7 ≈ 4.57; s ≈ 2.14.", "Population variance = 32/8 = 4; σ = 2."],
      result: "Sample s ≈ 2.14; population σ = 2 for this set.",
    },
    faqs: [
      { question: "Why n−1 for samples?", answer: "Bessel’s correction makes sample variance unbiased for the population variance under classic assumptions." },
      { question: "Can std-dev be negative?", answer: "No." },
      { question: "Std-dev vs SEM?", answer: "Standard error of the mean divides by √n — different tool/concept." },
      { question: "Do I need a normal distribution?", answer: "These formulas are definitional; normality matters more for certain inferences." },
    ],
  },
  "final-grade": {
    seoTitle: "Final Grade Calculator — Score Needed on the Final",
    seoDescription: "Find the score you need on a final exam given current grade and weights. Free student planning tool — verify against your syllabus.",
    formulaNote: "If course = w·final + (1−w)·current (weights as fractions), then final_needed = (target − (1−w)·current) / w. Multiple categories use the generalized weighted sum on the form.",
    overview: "Students ask what score they need on the final for a reason. Enter your current average, the final exam weight, and your target course grade to see the required exam score.\n\nSyllabus policies (curves, dropped scores) can change the real answer — match official weights.",
    howToUse: ["Enter current grade %.", "Enter final exam weight %.", "Enter desired course grade %.", "Read the required final score (may exceed 100% if the target is unreachable)."],
    howToUseUS: ["Use syllabus weights exactly (e.g. final 20%).", "AP/college courses may curve — this tool assumes linear weights."],
    howToUseIndia: ["Match internal + end-sem weights from your university scheme.", "Some systems use absolute grading bands — convert carefully."],
    howToInterpret: [">100% needed means the target is impossible under these weights.", "Extra credit is not modeled unless you adjust current grade.", "Planning aid — registrar rules win."],
    workedExample: {
      title: "Worked example — current 82%, final weight 30%, target 85%",
      steps: ["final_needed = (0.85 − 0.70×0.82) / 0.30.", "0.70×0.82 = 0.574.", "0.85 − 0.574 = 0.276.", "0.276 / 0.30 = 0.92 → 92%."],
      result: "You need about 92% on the final.",
    },
    faqs: [
      { question: "What if the result is over 100%?", answer: "The target is not reachable with the current average and weight — adjust goals or find extra credit." },
      { question: "Multiple assignment categories?", answer: "Collapse into a current overall % using syllabus weights, or use a multi-category grade tool if available." },
      { question: "Pass/fail courses?", answer: "Map the pass threshold as your target %." },
      { question: "Rounded grades?", answer: "Ask your instructor how .5% boundaries are handled." },
    ],
  },
  "investment-return": {
    seoTitle: "Investment Return Calculator — Gain, Loss & Growth",
    seoDescription: "Estimate investment profit/loss and simple return metrics from start value, end value, and contributions. Educational — not investment advice.",
    formulaNote: "Simple return ≈ (end − start − net_contributions) / start (definitions vary when contributions occur mid-period). Annualization may use CAGR-style roots when a time span is provided.",
    overview: "Investment Return tools summarize how much you gained or lost between two values, optionally adjusting for deposits. Use them to understand a statement period — not to pick securities.\n\nFor pure compounded growth without cash flows, see CAGR and Compound Interest calculators.",
    howToUse: ["Enter starting value.", "Enter ending value.", "Add net contributions/withdrawals if fields exist.", "Read profit/loss and return %."],
    howToUseUS: ["Brokerage statements may use time-weighted returns — this page may be money-simple depending on fields.", "Taxes and fees usually excluded."],
    howToUseIndia: ["Useful for MF folio rough checks — official XIRR may differ with dated cash flows.", "Pick INR for display."],
    howToInterpret: ["Ignoring mid-period cash flows misstates personal return.", "Past returns do not guarantee future results.", "Not investment advice."],
    workedExample: {
      title: "Worked example — $10,000 → $12,000, no contributions",
      steps: ["Gain = 2,000.", "Simple return = 20%."],
      result: "20% simple return over the period (annualize separately if needed).",
    },
    faqs: [
      { question: "Is this CAGR?", answer: "Only when the tool annualizes over a multi-year span; otherwise it may be simple period return." },
      { question: "Are dividends included?", answer: "Include them in the ending value if you want total return." },
      { question: "Fees/taxes?", answer: "Usually excluded unless you reduced the ending value accordingly." },
      { question: "Investment advice?", answer: "No — educational math only." },
    ],
  },
  "loan-affordability": {
    seoTitle: "Loan Affordability Calculator — How Much Can I Borrow?",
    seoDescription: "Estimate a affordable loan principal from payment budget, rate, and term. Educational borrowing guide — not a lender commitment.",
    formulaNote: "Rearranges the standard payment formula: P = M · ((1+r)^n − 1) / (r(1+r)^n) for payment M, monthly rate r, and n months.",
    overview: "Affordability calculators flip the EMI/mortgage payment equation: start from what you can pay monthly, then estimate a principal. Lenders also check credit, DTI, and collateral — this page is math only.\n\nStress-test higher rates before shopping.",
    howToUse: ["Enter the monthly payment you can afford.", "Enter the interest rate and term.", "Read the estimated principal.", "Leave margin for taxes/insurance on housing loans."],
    howToUseUS: ["Mortgage affordability should reserve room for taxes, insurance, and HOA — P&I is only part of PITI.", "DTI limits vary by loan program."],
    howToUseIndia: ["Banks apply FOIR/DTI-like limits and credit checks beyond this formula.", "Use INR and compare floating-rate stress scenarios."],
    howToInterpret: ["Output is capacity under the payment you typed — not a pre-approval.", "Higher rates shrink affordable principal quickly.", "Not lending advice."],
    workedExample: {
      title: "Worked example — $1,500/mo at 6.5% for 30 years",
      steps: ["r = 0.065/12; n = 360.", "Invert the payment formula to solve P.", "Result is on the order of ~$237k P&I capacity (verify live)."],
      result: "Roughly low-to-mid $200ks principal depending on exact rounding — check the live panel.",
    },
    faqs: [
      { question: "Will a bank approve this amount?", answer: "Not based on this page alone — underwriting includes income, credit, and collateral." },
      { question: "Include taxes/insurance?", answer: "For mortgages, reduce the P&I budget so PITI still fits." },
      { question: "Floating rates?", answer: "Stress-test a higher rate; affordability can vanish after resets." },
      { question: "Personal vs home loan?", answer: "Same payment math; risk and tenure norms differ." },
    ],
  },
  "car-loan": {
    seoTitle: "Car Loan Calculator — Auto Loan Payment & Interest",
    seoDescription: "Estimate auto loan monthly payments, total interest, and cost from price, down payment, rate, and term. Free vehicle loan tool.",
    formulaNote: "Amortizing payment on principal after down payment: M = P·r(1+r)^n/((1+r)^n−1). Taxes, title, and extended warranties may need to be added into the financed amount.",
    overview: "Car loans are amortizing loans with shorter tenures than mortgages. This calculator estimates monthly payment and total interest from vehicle price, down payment, APR-like rate, and term so you can compare dealer offers.\n\nAdd taxes/fees into the financed amount when they are rolled in.",
    howToUse: ["Enter vehicle price and down payment.", "Enter APR/interest rate and term in months.", "Read monthly payment and total interest.", "Compare a shorter term vs lower payment tradeoff."],
    howToUseUS: ["Use the contract rate; dealer “add-ons” can inflate principal.", "Gap insurance and warranties are optional costs — know what is financed."],
    howToUseIndia: ["Enter on-road price components carefully if financing them.", "Compare bank vs dealer hypothecation rates; use INR."],
    howToInterpret: ["Negative equity risk rises with long tenures and fast depreciation.", "Total interest matters, not only EMI.", "Not a credit offer."],
    workedExample: {
      title: "Worked example — $25,000 financed at 7% for 60 months",
      steps: ["P=25000; r=0.07/12; n=60.", "Compute M from the amortizing formula.", "Total interest = M·n − P."],
      result: "Payment in the ~$495/mo ballpark before taxes/fees — confirm live.",
    },
    faqs: [
      { question: "Should I finance taxes?", answer: "It raises principal and interest — sometimes convenient, often costlier." },
      { question: "Lease vs loan?", answer: "Different products; this page models a loan payment." },
      { question: "Extra payments?", answer: "Use amortization/extra-payment tools to see interest savings." },
      { question: "Used cars?", answer: "Same math; rates and terms may differ." },
    ],
  },
  "biweekly-mortgage": {
    seoTitle: "Biweekly Mortgage Calculator — Pay Faster, Less Interest",
    seoDescription: "See how biweekly mortgage payments can shorten a loan and cut interest vs a standard monthly schedule. Educational comparison tool.",
    formulaNote: "A common biweekly plan pays half the monthly P&I every two weeks → ~26 half-payments ≈ 13 full monthly payments per year. Extra principal accelerates amortization; exact savings depend on lender application rules.",
    overview: "Biweekly mortgage strategies aim to make the equivalent of an extra monthly payment each year, reducing interest and term. This calculator compares the idea against a standard monthly schedule so you can see the directional savings.\n\nConfirm your servicer applies payments as you expect — not all “biweekly” products are equal.",
    howToUse: ["Enter remaining principal, rate, and current term.", "Compare monthly vs biweekly scenarios in the results.", "Note interest saved and time shortened when shown.", "Ask your lender how partial payments are applied."],
    howToUseUS: ["Some U.S. servicers offer formal biweekly drafts; others let you simply pay extra principal monthly.", "Escrow portions may still be monthly."],
    howToUseIndia: ["Indian home loans more often use EMI + prepayment; model extra monthly prepayment if biweekly drafts are unavailable.", "Check foreclosure/prepayment charges."],
    howToInterpret: ["Savings assume payments post to principal as modeled.", "Rate resets on floating loans change outcomes.", "Not lending advice."],
    workedExample: {
      title: "Worked example — conceptual extra payment",
      steps: ["Monthly P&I = M.", "Biweekly pays M/2 twenty-six times ≈ 13M per year.", "The extra ~M each year goes to principal in a well-applied plan."],
      result: "Directional interest savings vs monthly-only — see live figures for your inputs.",
    },
    faqs: [
      { question: "Is biweekly always better?", answer: "If it truly accelerates principal and you can afford it, interest usually falls — opportunity cost of that cash still matters." },
      { question: "Can I just pay extra monthly?", answer: "Yes — often simpler. Same idea: more principal per year." },
      { question: "Does escrow change?", answer: "Taxes/insurance escrow is often still collected monthly." },
      { question: "Prepayment penalties?", answer: "Check your note — some loans limit freeprepayment." },
    ],
  },
  "apr-vs-apy": {
    seoTitle: "APR vs APY Calculator — Compare Interest Rates Fairly",
    seoDescription: "Convert between APR and APY / effective annual rate for a compounding frequency. Free educational rate comparator.",
    formulaNote: "APY = (1 + r/n)^n − 1 for nominal APR r compounded n times per year (when APR is the nominal rate in that convention). Definitions of APR in consumer lending can legally include fees — read local rules.",
    overview: "APR and APY are easy to mix up. APY (effective annual yield) includes compounding; a higher compounding frequency raises APY for the same nominal rate. This calculator converts between them so savings and loan quotes become comparable.\n\nConsumer “APR” disclosures may also fold in fees — that legal APR is not always pure nominal rate math.",
    howToUse: ["Enter the nominal rate and compounds per year.", "Read APY / effective annual rate.", "Compare products using the same basis.", "Remember fee-inclusive APRs need the lender’s disclosure math."],
    howToUseUS: ["Savings APY is advertised widely; mortgage APR includes certain fees by regulation — different concepts."],
    howToUseIndia: ["Compare FD effective yields carefully; bank compounding conventions differ (quarterly, etc.)."],
    howToInterpret: ["More frequent compounding → higher APY for same nominal r.", "Loan shopping: read whether fees are inside the disclosed APR.", "Educational — not a regulated disclosure engine."],
    workedExample: {
      title: "Worked example — 6% nominal monthly",
      steps: ["APY = (1 + 0.06/12)^12 − 1 ≈ 6.17%."],
      result: "About 6.17% effective annual.",
    },
    faqs: [
      { question: "Is APY always higher than APR?", answer: "For positive rates with compounding more than annually, effective yield exceeds the nominal rate." },
      { question: "Daily compounding?", answer: "Use n=365 (or 360 if a product says so)." },
      { question: "Do loans use APY?", answer: "Marketing differs; focus on total cost and disclosed APR rules in your country." },
      { question: "Fees?", answer: "Statutory APR may include fees; this converter is rate compounding math." },
    ],
  },
  "rent-vs-buy": {
    seoTitle: "Rent vs Buy Calculator — Housing Cost Comparison",
    seoDescription: "Compare renting versus buying with rough payment, opportunity cost, and horizon assumptions. Educational — not financial advice.",
    formulaNote: "Compares estimated ownership costs (mortgage P&I plus optional tax/insurance/maintenance) against rent over a horizon, sometimes netting equity build and opportunity cost of down payment at an assumed return. Highly assumption-driven.",
    overview: "Rent vs buy is less about a single “winner” and more about horizon, rates, local rents, and how long you will stay. This calculator structures the comparison so you can see which assumptions dominate.\n\nTransaction costs, HOA, and maintenance can flip the answer — stress-test them.",
    howToUse: ["Enter rent and home price / loan assumptions.", "Set horizon and rate fields.", "Compare cumulative costs / net position when shown.", "Re-run with higher maintenance and rate shocks."],
    howToUseUS: ["Include property tax and insurance for a fair PITI-aware comparison.", "Closing costs and realtor fees matter if you move often."],
    howToUseIndia: ["Account for stamp duty/registration and society maintenance.", "Floating home-loan rates need stress tests; use INR."],
    howToInterpret: ["Short horizons often favor renting once transaction costs are included.", "Equity build is not the same as cash savings.", "Not financial advice."],
    workedExample: {
      title: "Worked example — framing the tradeoff",
      steps: ["List 5-year rent total.", "List 5-year ownership cash outflows including down payment opportunity cost.", "Subtract estimated equity / selling proceeds net of costs.", "See which side wins under those assumptions."],
      result: "Direction depends on inputs — use the live panel; treat as a discussion framework.",
    },
    faqs: [
      { question: "Is buying always an investment?", answer: "A home is dual-use: consumption + possible appreciation. It can also lose value." },
      { question: "How long to break even?", answer: "Often several years after transaction costs — run your numbers." },
      { question: "Opportunity cost?", answer: "Down payment money could earn returns elsewhere — models that ignore this bias buying." },
      { question: "Advice?", answer: "Educational comparison only — consult a qualified advisor for decisions." },
    ],
  },
  "ohms-law": {
    seoTitle: "Ohm's Law Calculator — V = IR",
    seoDescription: "Solve voltage, current, or resistance with Ohm’s law (V=IR) and related power P=VI. Free physics/electronics helper.",
    formulaNote: "V = I·R; I = V/R; R = V/I. Power P = V·I = I²R = V²/R for resistive DC circuits under ohmic assumptions.",
    overview: "Ohm’s law is the first tool in electronics troubleshooting and classroom circuit problems. Enter any two of V, I, R (as the form allows) to get the third, with power when supported.\n\nReal components are non-ideal — temperature and frequency matter outside this ideal model.",
    howToUse: ["Enter the two known quantities.", "Read the computed third (and power if shown).", "Keep SI units (V, A, Ω).", "Apply safety practices around live circuits."],
    howToUseUS: ["Common in maker and technician training — watch mA vs A unit slips."],
    howToUseIndia: ["Matches class 10/12 and diploma circuit basics — show V=IR working on paper."],
    howToInterpret: ["Assumes ohmic resistors and DC (or instantaneous) values.", "LED/diode circuits need more than bare Ohm’s law.", "Educational — not a certified design calc."],
    workedExample: {
      title: "Worked example — 12 V across 100 Ω",
      steps: ["I = 12/100 = 0.12 A = 120 mA.", "P = 12×0.12 = 1.44 W."],
      result: "0.12 A; 1.44 W dissipated in the resistor (ideal).",
    },
    faqs: [
      { question: "AC circuits?", answer: "Use RMS values carefully; impedances involve reactance beyond pure R." },
      { question: "Series/parallel?", answer: "Reduce the network to an equivalent R first, then apply V=IR." },
      { question: "Power rating?", answer: "Choose resistors with adequate wattage margin above P." },
      { question: "Safety?", answer: "De-energize circuits; this page does not replace electrical codes." },
    ],
  },
  "kinetic-energy": {
    seoTitle: "Kinetic Energy Calculator — ½mv²",
    seoDescription: "Compute kinetic energy from mass and speed with KE = ½mv². Free physics tool for class and quick checks.",
    formulaNote: "KE = ½ m v² with mass in kg and speed in m/s for joules. Double speed ⇒ quadruple KE.",
    overview: "Kinetic energy scales with the square of speed — the reason braking distances and impact energies rise fast. This calculator applies KE = ½mv² in SI units for homework and intuition building.\n\nRelativistic speeds need different formulas.",
    howToUse: ["Enter mass in kg.", "Enter speed in m/s (convert from km/h if needed).", "Read KE in joules.", "Remember the v² relationship when comparing scenarios."],
    howToUseUS: ["Convert mph → m/s (÷2.237 approx) before SI formula, or use a units-aware path if offered."],
    howToUseIndia: ["School problems usually SI — keep kg and m/s."],
    howToInterpret: ["Units: kg·m²/s² = J.", "Quadrupling KE when speed doubles is the key insight.", "Ideal translational KE only."],
    workedExample: {
      title: "Worked example — 2 kg at 3 m/s",
      steps: ["KE = 0.5×2×9 = 9 J."],
      result: "9 joules.",
    },
    faqs: [
      { question: "km/h to m/s?", answer: "Divide by 3.6." },
      { question: "Potential energy?", answer: "Use m·g·h tools separately; mechanical energy sums both when appropriate." },
      { question: "Rotational KE?", answer: "Needs ½Iω² — different calculator." },
      { question: "Relativity?", answer: "Not modeled here." },
    ],
  },
  "speed-distance-time": {
    seoTitle: "Speed Distance Time Calculator — Solve Any One",
    seoDescription: "Calculate speed, distance, or time from the other two. Free motion tool for travel planning and physics basics.",
    formulaNote: "distance = speed × time; speed = distance/time; time = distance/speed. Keep units consistent (e.g. km and hours → km/h).",
    overview: "The speed–distance–time triad is everyday trip math and introductory physics. Enter any two values to get the third, watching unit consistency so hours and minutes do not get mixed up.\n\nReal travel includes stops and variable speeds — this is average-speed math.",
    howToUse: ["Enter any two of speed, distance, time.", "Read the third.", "Convert minutes to hours when speed is per hour.", "Use average speed for multi-leg trips carefully."],
    howToUseUS: ["Miles and hours are common for road trips; watch mph vs minutes."],
    howToUseIndia: ["km/h dominates highway planning; convert minutes properly for shorter legs."],
    howToInterpret: ["Results are averages if speed varied.", "Unit slips are the #1 error.", "Planning/physics aid."],
    workedExample: {
      title: "Worked example — 150 km at 50 km/h",
      steps: ["t = 150/50 = 3 h."],
      result: "3 hours.",
    },
    faqs: [
      { question: "Do I include breaks?", answer: "For ETA, add break time separately; pure formula is moving time." },
      { question: "Average of two speeds?", answer: "Harmonic mean matters for equal-distance legs — not arithmetic mean." },
      { question: "m/s vs km/h?", answer: "Multiply m/s by 3.6 for km/h." },
      { question: "GPS vs formula?", answer: "GPS integrates real paths; this assumes the distance you enter." },
    ],
  },
  "simple-interest": {
    seoTitle: "Simple Interest Calculator — I = Prt",
    seoDescription: "Calculate simple interest and total amount with I = P·r·t. Free educational finance tool for short-term loans and classroom problems.",
    formulaNote: "I = P·r·t with r as decimal annual rate and t in years (or proportional fractions). Amount A = P + I. No compounding.",
    overview: "Simple interest does not compound — interest is only on principal. It still appears in classroom problems and some short-term products. Use this calculator for I = Prt clarity, and switch to compound/daily compound tools when interest earns interest.\n\nCurrency picker formats money displays.",
    howToUse: ["Enter principal.", "Enter annual rate %.", "Enter time in years (or as the form labels).", "Read interest and total amount."],
    howToUseUS: ["Many real consumer loans compound or amortize — do not assume simple interest unless stated."],
    howToUseIndia: ["Useful for textbook problems; real bank products often use reducing-balance EMI math instead."],
    howToInterpret: ["No compounding means linear growth with time.", "Compare with compound interest for the same nominal rate.", "Educational estimate."],
    workedExample: {
      title: "Worked example — $1,000 at 5% for 3 years",
      steps: ["I = 1000×0.05×3 = 150.", "A = 1150."],
      result: "$150 interest; $1,150 total.",
    },
    faqs: [
      { question: "Is EMI simple interest?", answer: "Standard EMIs use reducing-balance compound-style amortization, not plain Prt on full tenure." },
      { question: "Months instead of years?", answer: "Use t = months/12 for an annual rate." },
      { question: "Daily simple interest?", answer: "t = days/365 (or 360 per convention)." },
      { question: "Which is better for savers?", answer: "Compounding benefits savers; compare APY." },
    ],
  },
  "quadratic": {
    seoTitle: "Quadratic Equation Solver — Roots of ax²+bx+c",
    seoDescription: "Solve ax² + bx + c = 0 with the quadratic formula. See discriminant and roots — free algebra tool for students.",
    formulaNote: "x = (−b ± √(b²−4ac)) / (2a). Discriminant D = b²−4ac: two real roots if D>0, one if D=0, complex if D<0 (displayed per tool support).",
    overview: "Quadratic equations appear across algebra, physics trajectories, and optimization warmups. This solver applies the quadratic formula, surfaces the discriminant, and reports roots so you can verify homework quickly.\n\nShow factoring steps on exams when required.",
    howToUse: ["Enter coefficients a, b, c (a ≠ 0).", "Read discriminant and roots.", "Check by substituting roots back into ax²+bx+c.", "Use graphing tools to visualize."],
    howToUseUS: ["Algebra I/II staple — watch sign errors on b."],
    howToUseIndia: ["Class 10 quadratic chapter essential — keep exact radical form on paper when asked."],
    howToInterpret: ["a=0 reduces to linear — not quadratic.", "D<0 means no real roots (complex pair).", "Educational algebra aid."],
    workedExample: {
      title: "Worked example — x² − 5x + 6 = 0",
      steps: ["D = 25 − 24 = 1.", "x = (5±1)/2 → x=3 or x=2."],
      result: "Roots 2 and 3.",
    },
    faqs: [
      { question: "What if a is zero?", answer: "It is linear: x = −c/b when b≠0." },
      { question: "Complex roots?", answer: "Displayed when the tool supports them; otherwise it notes no real roots." },
      { question: "Factoring vs formula?", answer: "Factoring is fine when integers work; formula always works." },
      { question: "Vertex form?", answer: "Use completing-the-square / graphing helpers for vertex insights." },
    ],
  },
  "daily-compound-interest": {
    seoTitle: "Daily Compound Interest Calculator — Reinvest, Deposits & Business Days",
    seoDescription:
      "Calculate daily compound interest with daily or annual rates, optional reinvest %, extra deposits, and weekend exclusion. Free chart + snapshots — not investment advice.",
    formulaNote:
      "Daily rate form: grow the balance each day by interest = balance × r, then keep reinvest% of that interest in the account (withdraw the rest as cash). Closed form when reinvest = 100% and there are no deposits: A = P(1+r)^t with r = daily decimal and t = compounding days. Annual-rate mode uses r_daily = r_annual/365, i.e. A = P(1 + r/365)^(365·T) over a full year of calendar compounding. Deposits are added at the end of each day or every 30 calendar days. Exclude weekends compounds Monday–Friday only inside the calendar span.",
    overview:
      "Daily compound interest credits earnings every day so each session’s interest can itself earn interest. Banks often quote daily compounding on savings, CDs, and money-market products; traders sometimes model daily financing or marked-to-market gains the same way — with far higher risk.\n\nMyCalcsWorld’s Daily Compound Interest Calculator is built to match (and extend) what people expect from flagship finance tools: choose a daily rate or an annual rate divided by 365, set a horizon in years + months + days, optionally keep only part of each day’s interest invested (reinvest %), add daily or monthly deposits at end of period, and exclude weekends for business-day calendars. Results include future value, total interest, deposits, cash withdrawn, effective growth, a balance-over-time chart, and periodic snapshots. Currency formatting uses the site CurrencyProvider / fmtMoney picker (USD, INR, EUR, and more).\n\nIllustrative only — not investment advice. Extreme daily percentage rates sometimes appear in trading or margin examples and can imply severe risk of loss beyond your principal.",
    howToUse: [
      "Enter the starting principal.",
      "Choose Daily rate (%) or Annual rate (%) → ÷365, then enter the rate.",
      "Set years, months, and extra days (horizon = years×365 + months×30 + days).",
      "Optionally set a daily reinvest rate below 100% to model cash withdrawals of interest.",
      "Optionally add daily or monthly deposits and/or exclude weekends.",
      "Read future value, interest, deposits, withdrawn cash, chart, and snapshot table.",
    ],
    howToUseUS: [
      "Enter principal in your display currency (USD via the picker is common for U.S. savings examples).",
      "For bank APY-style thinking, prefer Annual rate mode and compare with our CD/APY tool; for a stated daily % use Daily mode.",
      "Set the calendar horizon with years/months/days.",
      "Use Exclude weekends if you are modeling weekday-only trading calendars — not typical FDIC savings.",
      "Review the chart and snapshots; treat high daily % scenarios as educational stress tests only.",
    ],
    howToUseIndia: [
      "Pick INR in the currency picker for Indian savings / FD-style illustrations.",
      "Indian retail deposits usually quote annual rates with their own compounding conventions — use Annual mode or map the bank’s day-count carefully.",
      "SIP-style monthly top-ups can be approximated with Monthly deposits (every 30 days) while daily compounding runs.",
      "For stock/F&O style weekday calendars, try Exclude weekends — still not brokerage advice.",
      "Compare with the SIP and Compound Interest calculators when your product compounds monthly or quarterly instead of daily.",
    ],
    howToInterpret: [
      "Future value is the invested balance at the end — it excludes cash you already withdrew when reinvest < 100%.",
      "Total interest generated counts all interest before splitting into reinvested vs withdrawn.",
      "Effective growth divides net gain (FV + withdrawn − total deposits) by total deposits.",
      "Compounding days shrinks when weekends are excluded even though the calendar span is unchanged.",
      "Charts downsample long horizons; the snapshot table keeps periodic checkpoints.",
    ],
    workedExample: {
      title: "Worked example — $1,000 at 0.4% per day for 365 days",
      steps: [
        "Principal P = 1000; daily rate r = 0.4/100 = 0.004; t = 365 days; reinvest = 100%.",
        "Closed form: A = P(1+r)^t = 1000 × (1.004)^365.",
        "(1.004)^365 ≈ 4.2934377972993, so A ≈ 4293.44.",
        "Interest ≈ 4293.44 − 1000 = 3293.44.",
        "Enter the same numbers in Daily rate mode with 1 year (365 days) to mirror this result in the live tool.",
      ],
      result:
        "About $4,293.44 future value and $3,293.44 interest after 365 daily compounds at 0.4%/day (illustrative — such a daily rate is extremely high versus typical savings products).",
    },
    faqs: [
      {
        question: "What is daily compound interest?",
        answer:
          "Interest is calculated and credited every day on the current balance, so previously earned interest can earn more interest. More frequent compounding grows a balance faster than the same nominal rate compounded monthly or annually.",
      },
      {
        question: "What is the daily reinvest rate?",
        answer:
          "It is the percentage of each day’s interest you keep invested. At 80% reinvest, 20% of that day’s interest is treated as cash withdrawn and no longer compounds. Example: $5,000 at 0.5%/day earns $25 on day one; 80% reinvest adds $20 to the balance ($5,020) and withdraws $5 cash.",
      },
      {
        question: "How does excluding weekends work?",
        answer:
          "The horizon is still a calendar span (years×365 + months×30 + days), but interest (and daily deposits) apply only Monday–Friday. A 365-day span therefore compounds on roughly 261 business days depending on the start weekday — useful for weekday trading calendars, not typical bank savings.",
      },
      {
        question: "When are additional deposits applied?",
        answer:
          "At the end of each period: daily deposits after that day’s interest on compounding days; monthly deposits every 30 calendar days. They then participate in later compounding.",
      },
      {
        question: "Which formula should I use for an annual rate?",
        answer:
          "With full reinvestment and no deposits, A = P(1 + r/365)^(365·T) for T years of daily calendar compounding. This tool’s Annual mode uses r/365 each calendar (or business) day in the day-by-day engine so reinvest and deposits stay consistent.",
      },
      {
        question: "Is this for trading or margin interest?",
        answer:
          "You can explore daily % scenarios educationally, including ones traders discuss for financing or marked-to-market gains, but leveraged trading can lose more than your principal. This page is not a broker, does not include fees/spreads, and is not investment advice — speak with a qualified advisor.",
      },
      {
        question: "How is this different from the Compound Interest calculator?",
        answer:
          "The classic Compound Interest tool uses A = P(1+r/n)^(n·t) with a chosen n (monthly, daily, …). This Daily Compound page specializes in day-by-day modeling with reinvest %, deposits, weekend filters, charts, and snapshots.",
      },
    ],
  },
};

export const seoContentSlugs = Object.keys(calculatorSeoContent);

/** Explicit overrides only (flagships / enriched pages). */
export const seoOverrideCount = seoContentSlugs.length;

/**
 * Resolves SEO/detail content for any calculator: category-quality defaults
 * merged with optional per-slug overrides (overview, FAQs, worked examples, etc.).
 */
export function getCalculatorSeoContent(
  slug: string
): CalculatorSeoContent | undefined {
  const calc = getCalculatorBySlug(slug);
  const override = calculatorSeoContent[slug];
  if (!calc && !override) return undefined;
  if (!calc) return override;
  return mergeCalculatorSeo(buildDefaultCalculatorSeo(calc), override);
}

/** Every registry calculator gets merged detail content. */
export function getAllCalculatorSeoCoverage(): {
  total: number;
  withOverride: number;
  defaultsOnly: number;
} {
  const total = allCalculators.length;
  let withOverride = 0;
  for (const c of allCalculators) {
    if (calculatorSeoContent[c.slug]) withOverride += 1;
  }
  return {
    total,
    withOverride,
    defaultsOnly: total - withOverride,
  };
}

/** India-focused rail on the home page. */
export const popularInIndiaSlugs = [
  "loan-emi",
  "sip",
  "gst-vat",
  "salary-after-tax-in",
  "currency-converter",
  "gold-value",
  "cagr",
  "compound-interest",
  "daily-compound-interest",
  "inflation-adjuster",
  "metals-spot",
  "emi-extra-payments",
  "sip-growth-chart",
] as const;

