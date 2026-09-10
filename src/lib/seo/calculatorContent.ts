import type { CalculatorSeoContent } from "@/lib/types";

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
};

export const seoContentSlugs = Object.keys(calculatorSeoContent);

export function getCalculatorSeoContent(slug: string): CalculatorSeoContent | undefined {
  return calculatorSeoContent[slug];
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
  "inflation-adjuster",
  "metals-spot",
  "emi-extra-payments",
  "sip-growth-chart",
] as const;

