import type { CalculatorSeoContent } from "@/lib/types";
import { getCalculatorBySlug, allCalculators } from "@/lib/calculators/registry";
import {
  buildDefaultCalculatorSeo,
  mergeCalculatorSeo,
} from "./seoDefaults";
import { calculatorSeoExtra } from "./overridesExtra";

/** High-ROI FAQ / how-to / SEO overlays keyed by calculator slug. */
export const calculatorSeoContent: Record<string, CalculatorSeoContent> = {
  "mortgage": {
    seoTitle: "Mortgage Calculator — Monthly Payment & Interest",
    seoDescription: "Estimate fixed-rate mortgage principal & interest payments, total interest, and loan cost. Free browser-based tool — no signup.",
    formulaNote: "Standard amortizing loan: M = P · r(1+r)^n / ((1+r)^n − 1), where r is monthly rate and n is months. Taxes, insurance, and HOA are not included.",
    overview: "A mortgage calculator estimates the principal-and-interest (P&I) payment on a fixed-rate home loan and shows how interest vs principal evolves over time. MyCalcsWorld’s mortgage / home-loan tool helps you compare tenures and rates whether you think in monthly payment or EMI terms. Taxes, insurance, PMI/MIP, and HOA dues are not included in P&I — add them separately for a full housing budget. Below you get a live payment estimate, a Recharts principal/interest/balance chart, a full year-by-year amortization table, FAQs, and a worked example you can mirror with your own numbers.",
    howToUse: [
      "Enter the loan amount (principal) you plan to borrow.",
      "Set the annual interest rate your lender quoted (APR may differ slightly).",
      "Choose the loan term in years (commonly 15 or 30).",
      "Read the monthly P&I payment, total of payments, and total interest.",
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
    seoTitle: "EMI Calculator — Loan EMI, Interest & Total Cost",
    seoDescription: "Calculate equated monthly installment (EMI) for personal, auto, or home loans. Free loan EMI formula — works with any currency via the picker.",
    formulaNote: "EMI = P · r(1+r)^n / ((1+r)^n − 1), where P is principal, r is monthly interest rate (annual%/12/100), and n is tenure in months.",
    overview: "EMI (Equated Monthly Installment) is a fixed monthly loan payment used worldwide for personal, auto, and home loans. The math is the same family as a classic amortizing loan payment: a fixed monthly amount that covers interest first, then principal on a reducing balance. This page shows EMI, total interest, a growth/paydown chart, and a full yearly schedule so you can compare tenures and rates transparently — with multi-currency formatting via the currency picker.",
    howToUse: [
      "Enter the loan principal (amount sanctioned).",
      "Enter the annual interest rate your bank or NBFC offers.",
      "Set tenure in months (e.g. 36 for 3 years, 240 for 20 years).",
      "Review EMI, total payment, and total interest.",
    ],
    howToInterpret: [
      "EMI is the fixed monthly outflow if rate and tenure stay unchanged.",
      "Total interest is what you pay beyond principal over the full tenure.",
      "Shorter tenure → higher EMI, lower interest; longer tenure → lower EMI, higher interest.",
    ],
    workedExample: {
      title: "Worked example — 500,000 personal loan at 12% for 36 months",
      steps: [
        "P = 500,000; annual 12% → monthly r = 0.01; n = 36.",
        "EMI = P·r(1+r)^n / ((1+r)^n − 1) ≈ 16,607.",
        "Total payment ≈ 597,852; interest ≈ 97,852.",
      ],
      result: "About 16.6k EMI; nearly 98k interest over 3 years if you pay on schedule.",
    },
    faqs: [
      {
        question: "What is EMI?",
        answer: "Equated Monthly Installment is the fixed amount you pay each month toward a loan. It combines principal and interest so the payment stays level while the interest–principal mix shifts over time.",
      },
      {
        question: "Should I enter monthly or annual interest rate?",
        answer: "Enter the annual rate (e.g. 8.5%). The calculator converts it to a monthly rate internally, matching how many lenders quote annual percentage rates.",
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
        question: "Can I use my local currency?",
        answer: "Yes. Pick USD, EUR, GBP, INR, AED, or another supported code in the currency picker — inputs and money results format in your selected currency. The EMI formula itself is currency-agnostic.",
      },
      {
        question: "How do I reduce my EMI or total interest?",
        answer: "Negotiate a lower rate, shorten tenure (raises EMI), make a larger down payment, or prepay principal when your loan allows it without heavy penalties.",
      },
    ],
  },
  "sip": {
    seoTitle: "SIP Calculator — Mutual Fund Returns Estimator",
    seoDescription: "Estimate SIP / recurring investment maturity. Enter monthly investment, expected return, and years — free online.",
    formulaNote: "Future value of SIP uses the standard annuity compound formula with monthly rate r and n months (site implementation).",
    overview: "A Systematic Investment Plan (SIP) invests a fixed amount every month — a useful model for any recurring investment worldwide (mutual funds, brokerage DCA, and similar plans). This calculator projects maturity value at a constant assumed return, plots invested amount vs portfolio value year by year, and pairs with CAGR/inflation tools for realism. Returns are not guaranteed; equity SIPs can be volatile.",
    howToUse: [
      "Enter how much you invest each month.",
      "Set an expected annual return (historical equity SIPs often use 10–12% for illustration — not a guarantee).",
      "Choose the investment horizon in years.",
      "Compare invested amount vs estimated maturity value.",
    ],
    howToInterpret: [
      "Maturity value is an illustration at a constant assumed return — real NAVs fluctuate.",
      "Invested amount is simply monthly SIP × months.",
      "Estimated gains = maturity − invested; they compound more the longer you stay invested.",
    ],
    workedExample: {
      title: "Worked example — 10,000/month SIP at 12% for 15 years",
      steps: [
        "Monthly P = 10,000; annual return 12% → monthly r = 0.01; n = 180.",
        "Future value of annuity compounds each contribution to the horizon.",
        "Total invested = 10,000 × 180 = 1,800,000; estimated corpus is substantially higher at 12% assumed.",
      ],
      result: "Invested 1,800,000; illustrated maturity is much higher at a steady 12% — markets will not be a straight line.",
    },
    faqs: [
      {
        question: "What is a SIP calculator used for?",
        answer: "It projects how regular monthly investments might grow at an assumed rate of return — useful for goal planning with recurring investments, not a promise of returns.",
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
        question: "Is amortization the same for EMI-style loans?",
        answer: "Yes in principle — EMI loans also use reducing-balance amortization. Labels differ (EMI vs mortgage payment) but the math is the same family.",
      },
      {
        question: "Are biweekly payments modeled here?",
        answer: "This tool focuses on a standard monthly schedule. Biweekly mortgages effectively make about one extra monthly payment per year.",
      },
    ],
  },
  "gst-vat": {
    seoTitle: "GST / VAT Calculator — Add or Remove GST / VAT",
    seoDescription: "Add or extract GST/VAT/sales tax from prices. Useful for common tax slabs worldwide — free online.",
    formulaNote: "Price with tax = base × (1 + rate/100). Base from tax-inclusive price = gross / (1 + rate/100). Tax amount = gross − base.",
    overview: "GST, VAT, and sales tax are percentage taxes on taxable value. This calculator adds tax to a base price or backs tax out of a gross price for common slabs (for example 5%, 10%, 12%, 18%, 20%). It is an educational invoice helper — not a filing tool.",
    howToUse: [
      "Enter the amount (tax-exclusive or tax-inclusive).",
      "Choose the GST/VAT/sales-tax rate that applies to your invoice.",
      "Select whether you are adding tax or removing tax from a gross price.",
      "Read net, tax, and gross figures.",
    ],
    howToInterpret: [
      "Use add-tax when you have a taxable value and need invoice totals.",
      "Use remove-tax when a shelf price already includes GST/VAT and you need the base.",
      "Some jurisdictions split tax into multiple components — this tool focuses on the combined rate.",
    ],
    workedExample: {
      title: "Worked example — 10,000 taxable at 18% GST/VAT",
      steps: [
        "Tax = 10,000 × 0.18 = 1,800.",
        "Invoice total = 11,800.",
        "From a ₹11,800 inclusive price: base = 11,800 / 1.18 = ₹10,000.",
      ],
      result: "₹1,800 GST on ₹10,000 taxable value (₹900 CGST + ₹900 SGST if intra-state).",
    },
    faqs: [
      {
        question: "What tax rates can I enter?",
        answer: "Common slabs include 0%, 5%, 12%, 18%, and 28%, with some items under special rates. Always confirm the HSN/SAC rate for your goods or services.",
      },
      {
        question: "Is GST the same as VAT?",
        answer: "GST, VAT, and sales tax are all consumption taxes on value. The percentage math is the same; enter the rate that applies where you are.",
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
    seoTitle: "Salary After Tax Calculator — Take-Home Estimate",
    seoDescription: "Rough take-home pay estimate after an illustrative effective tax percentage. Educational only — not a substitute for official tax software.",
    formulaNote: "Illustrative flat-percentage model: take-home ≈ gross × (1 − tax%/100). Real tax systems use slabs, deductions, credits, and local rules — always verify with official tools.",
    overview: "Take-home pay depends on local tax slabs, deductions/credits, payroll withholdings, and benefits. This calculator intentionally uses a flat effective-tax percentage so you can sketch scenarios quickly — then verify with an official tax worksheet, your employer’s payroll, or a qualified advisor.",
    howToUse: [
      "Enter gross annual or monthly salary as labeled.",
      "Set an approximate effective tax percentage for illustration.",
      "Compare gross vs estimated take-home.",
    ],
    howToInterpret: [
      "This is a simplified model — real tax regimes, cess/surcharges, and deductions change actual liability.",
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
        question: "Is this an official income-tax calculator?",
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
        question: "Can I use CAGR for mutual funds?",
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
        answer: "Tip norms differ widely by country and venue — often roughly 10–20% where tipping is customary, and sometimes already included as a service charge.",
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
        question: "Can I convert to other currencies like INR, EUR, or GBP?",
        answer: "Yes — select any supported currency as source or target. Pair with EMI/SIP tools when planning loan or investment budgets.",
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
      "Retail jewelry prices often include making charges and sales tax/VAT — often far above melt value.",
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
        question: "Can I use this for gold jewellery?",
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
      "Many planners blend retirement accounts and mutual funds — model each bucket separately for realism.",
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
        question: "What about employer retirement accounts?",
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
      "For taxable invoices, prefer the GST/VAT calculator and the correct tax rate for your goods.",
    ],
    faqs: [
      {
        question: "Is sales tax the same as GST?",
        answer: "Conceptually similar as consumption taxes, but filing rules and rate structures differ. Use GST tools for invoices.",
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
      "Long-term planners often assume mid-single-digit inflation — choose a rate that matches your scenario.",
    ],
    faqs: [
      {
        question: "What inflation rate should I enter?",
        answer: "Use a CPI-style assumption for your country and horizon. Historical averages differ by region.",
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
    seoDescription: "Solve a right triangle with a² + b² = c². Find hypotenuse c or either leg from the other two sides — free geometry tool with a 3D diagonal mode.",
    formulaNote: "For a right triangle, a² + b² = c² where c is the hypotenuse. Given two sides, the third is recovered by square roots: c = √(a²+b²), a = √(c²−b²), b = √(c²−a²). 3D mode uses the space diagonal √(a²+b²+c²).",
    overview: "The Pythagorean theorem is the workhorse of right-triangle geometry — construction layouts, distance checks, and classroom proofs all rely on a² + b² = c².\n\nPick a mode to find the hypotenuse from both legs, either missing leg from the other leg and hypotenuse, or a 3D box space diagonal. Only the sides needed for that mode are shown.",
    howToUse: ["Choose a mode: find c, find leg a, find leg b, or 3D diagonal.", "Enter only the known sides for that mode (unused sides stay hidden).", "Read the computed result.", "Confirm units are consistent (all cm or all m)."],
    howToInterpret: ["Works only for right triangles (except the separate 3D diagonal mode).", "Hypotenuse must be longer than each leg.", "Educational geometry — not a survey instrument."],
    workedExample: {
      title: "Worked example — legs 3 and 4",
      steps: ["Mode: find hypotenuse.", "a=3, b=4 → c=√(9+16)=√25=5.", "Classic 3-4-5 triple — no need to enter c."],
      result: "Hypotenuse = 5 (same units as the legs).",
    },
    faqs: [
      { question: "Does this work for non-right triangles?", answer: "No — use the law of cosines / triangle solver for oblique triangles." },
      { question: "Can I find a leg from hypotenuse?", answer: "Yes — choose “Find leg a” or “Find leg b”, then enter the other leg and hypotenuse." },
      { question: "Do I need to enter all three sides?", answer: "No. Hypotenuse mode only needs a and b; leg modes need the other leg plus c; only 3D diagonal needs all three box edges." },
      { question: "3D version?", answer: "Use the 3D space diagonal mode on this page, or dedicated Pythagoras 3D / distance-3D tools." },
      { question: "Exact vs decimal?", answer: "Display is decimal; leave answers under radicals on exams when required." },
    ],
  },
  "circle": {
    seoTitle: "Circle Calculator — Area, Circumference & Radius",
    seoDescription: "Calculate circle area, circumference, radius, or diameter from any one known value. Free geometry tool for school and DIY.",
    formulaNote: "Circumference C = 2πr = πd; area A = πr². Given any one of r, d, C, or A, the others follow algebraically (r = √(A/π), etc.).",
    overview: "Circles show up in garden beds, pipe sizing, pizza math, and exam problems. This calculator relates radius, diameter, circumference, and area so you can move from any one known value to the rest.\n\nπ is taken as the usual floating-point constant; exams may want answers in terms of π.",
    howToUse: ["Enter the known quantity (radius, diameter, circumference, or area).", "Read the derived circle measures.", "Keep units consistent (area will be length²).", "For arcs/sectors use specialized tools if listed."],
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

  "sip-growth-chart": {
    seoTitle: "SIP Growth Chart Calculator — Invested vs Portfolio",
    seoDescription:
      "Visualize SIP / DCA growth with invested-vs-portfolio curves. Free MyCalcsWorld tool for mutual-fund SIPs and global recurring investing — with how-to, FAQ, and worked example.",
    overview:
      "A SIP growth chart turns abstract expected return into a year-by-year picture: how much you put in versus how the portfolio might grow if returns compound as assumed. MyCalcsWorld’s SIP Growth Chart is built for mutual-fund SIP planners and global dollar-cost-averaging investors who want the curve, not only a maturity headline.\n\nEnter monthly investment, expected annual return, and years. Read future value, total invested, gains, and the growth chart. Markets do not deliver a smooth line — treat this as an educational projection, then stress-test lower returns.",
    whenToUse: [
      "Planning a new SIP or increasing an existing monthly contribution.",
      "Comparing 10 vs 15 vs 20 year horizons before you commit.",
      "Explaining invested-vs-gains to a family member with a simple chart.",
    ],
    commonMistakes: [
      "Using last year’s hot return as a guaranteed future rate.",
      "Forgetting expense ratios / exit loads that real funds deduct.",
      "Mixing SIP maturity math with lump-sum CAGR without adjusting contributions.",
    ],
    howToUse: [
      "Enter your monthly investment amount.",
      "Set a conservative expected annual return (many long-term equity planners explore 8–12%).",
      "Choose the number of years.",
      "Read future value, invested total, gains, and skim the growth chart.",
    ],
    howToInterpret: [
      "Future value assumes level contributions and a constant annualized return.",
      "Gains = future value − total invested under that assumption.",
      "Real markets are volatile; the chart is educational, not a promise.",
    ],
    workedExample: {
      title: "Worked example — ₹10,000/month for 15 years at 12%",
      steps: [
        "Monthly investment = 10,000; annual return = 12%; years = 15.",
        "Contributions compound monthly in the SIP future-value formula.",
        "Total invested = 10,000 × 15 × 12 = 1,800,000.",
        "Future value and gains appear in the result panel with a year-by-year chart.",
      ],
      result:
        "Roughly ₹50L+ future value in the classic 12%/15y illustration (exact panel value is authoritative) — with ~₹18L invested; educational only.",
    },
    faqs: [
      {
        question: "Is SIP return guaranteed?",
        answer:
          "No. Expected return is an assumption. Equity SIPs can have negative periods; debt SIPs behave differently. This tool is educational.",
      },
      {
        question: "Does this include expense ratios?",
        answer:
          "Not automatically. If you want a net estimate, lower the expected return by a rough expense/tax drag.",
      },
      {
        question: "How is this different from the SIP calculator?",
        answer:
          "Same family of math — this page emphasizes the growth chart and invested-vs-portfolio view for storytelling and planning.",
      },
      {
        question: "Can I model step-up SIPs?",
        answer:
          "This page uses a constant monthly amount. For annual step-ups, approximate by averaging contributions or re-run at a higher monthly amount.",
      },
    ],
    formulaNote:
      "SIP FV uses the standard recurring-deposit compound formula with monthly rate r = annual%/12/100 and n = months. Chart points are yearly snapshots.",
  },
  "amortization-chart": {
    seoTitle: "Amortization Chart Calculator — Principal vs Interest",
    seoDescription:
      "See how loan payments split between interest and principal over time. Free amortization chart on MyCalcsWorld with schedule insights, FAQ, and worked example.",
    overview:
      "An amortization chart answers the question every borrower eventually asks: why is so little principal gone in year one? MyCalcsWorld’s amortization chart visualizes interest vs principal over the life of a fixed-rate amortizing loan so EMI and mortgage shoppers can see the early interest-heavy years clearly.\n\nEnter principal, annual rate, and term. Read payment, total interest, and the chart/table. Taxes, insurance, and fees are outside P&I unless you add them separately.",
    whenToUse: [
      "Comparing 15- vs 30-year (or 10- vs 20-year) loans visually.",
      "Deciding whether prepayments are worth it by seeing remaining interest.",
      "Explaining loan structure to a co-borrower or family member.",
    ],
    commonMistakes: [
      "Entering purchase price instead of loan principal after down payment.",
      "Using APR (fee-inclusive) when the form expects the note rate.",
      "Ignoring that floating-rate home loans can reprice — chart assumes fixed rate.",
    ],
    howToUse: [
      "Enter loan principal.",
      "Enter annual interest rate.",
      "Set term in years.",
      "Review payment, total interest, and the principal/interest chart.",
    ],
    howToInterpret: [
      "Early years: larger share of each payment is interest.",
      "Later years: principal share rises.",
      "Total interest assumes no prepayment and an unchanged rate.",
    ],
    workedExample: {
      title: "Worked example — $250,000 at 6% for 30 years",
      steps: [
        "Principal 250,000; rate 6%; term 30 years.",
        "Compute fixed monthly P&I from the standard amortization formula.",
        "Year-1 rows show interest dominating each payment.",
        "Sum of interest across 360 months is total interest if you never prepay.",
      ],
      result:
        "Monthly P&I near $1,500 with substantial lifetime interest — check the live panel for exact rounded figures.",
    },
    faqs: [
      {
        question: "Does the chart include escrow?",
        answer:
          "No. It models principal and interest only. Property tax and insurance are separate.",
      },
      {
        question: "Can I model extra payments?",
        answer:
          "Use the EMI extra-payments or debt-payoff tools for principal prepayments; this chart shows the base schedule.",
      },
      {
        question: "Why is year one mostly interest?",
        answer:
          "On a long amortizing loan, balance stays high early, so interest (rate × balance) consumes most of each payment.",
      },
      {
        question: "Is this valid for floating-rate home loans?",
        answer:
          "It illustrates a fixed-rate path. Floating rates can reprice — re-run when your rate changes.",
      },
    ],
  },

  "3d-function": {
    seoTitle: "3D Function Grapher — Interactive Surface Plot",
    seoDescription:
      "Plot z = f(x, y) in an interactive 3D view. Free MyCalcsWorld math tool for students and makers — with guide, FAQ, and examples.",
    overview:
      "The 3D function grapher turns a formula z = f(x, y) into an interactive surface you can rotate — handy for multivariable calculus intuition, contest prep, and teaching. MyCalcsWorld keeps the controls mobile-friendly and loads the WebGL view lazily so the rest of the page stays light.\n\nEnter an expression in x and y, adjust ranges if offered, and explore the surface. This is an educational visualizer, not a CAS proof engine.",
    whenToUse: [
      "Building intuition for surfaces before an exam.",
      "Checking whether a homework surface matches your mental model.",
      "Demo-ing multivariable ideas on a phone or laptop.",
    ],
    commonMistakes: [
      "Writing expressions the parser does not accept (check the on-page syntax hints).",
      "Using tiny ranges that clip interesting features of the surface.",
      "Expecting symbolic simplification — this plots numerically.",
    ],
    howToUse: [
      "Enter or pick a function of x and y.",
      "Adjust domain ranges if available.",
      "Drag to rotate; pinch/scroll to zoom where supported.",
      "Compare to a textbook figure or hand sketch.",
    ],
    howToInterpret: [
      "Color/height encodes z; rotate to avoid optical illusions.",
      "Numerical sampling can miss extremely sharp spikes.",
      "Educational visualization only.",
    ],
    workedExample: {
      title: "Worked example — z = x² + y²",
      steps: [
        "Enter z = x^2 + y^2 (or the form’s equivalent).",
        "Use a symmetric domain around the origin.",
        "Rotate — you should see an upward-opening paraboloid.",
        "Confirm the minimum visually at (0,0,0).",
      ],
      result: "A circular paraboloid bowl with minimum at the origin — matches Calc III intuition.",
    },
    faqs: [
      { question: "Does this work on mobile?", answer: "Yes — the canvas is responsive. Use one-finger drag to rotate; performance depends on your device GPU." },
      { question: "Can I plot implicit surfaces?", answer: "This tool focuses on explicit z = f(x, y). Implicit F(x,y,z)=0 needs a different solver." },
      { question: "Why is the mesh coarse?", answer: "Sampling balances clarity and performance. Extremely fine meshes can lag on phones." },
      { question: "Is WebGL required?", answer: "Yes for the 3D view. If WebGL is blocked, try another browser or update GPU drivers." },
    ],
  },
  "basic": {
    seoTitle: "Basic Calculator — Fast Arithmetic",
    seoDescription: "Simple add, subtract, multiply, divide calculator with clear results. Free MyCalcsWorld tool — mobile-friendly, no signup.",
    overview: "Sometimes you just need clean arithmetic without a scientific keypad. MyCalcsWorld’s basic calculator is for everyday sums, differences, products, and quotients with readable results on phones and desktops.\n\nEnter the operands and operation as labeled, read the result, and copy/share if you want a plain-text summary. For powers, roots, and trig, jump to the scientific calculator.",
    whenToUse: ["Quick bill or homework arithmetic.", "Checking a spreadsheet cell without opening Excel.", "Teaching kids simple operations."],
    commonMistakes: ["Dividing by zero.", "Expecting scientific functions here — use the scientific tool instead.", "Mixing currencies or units without converting first."],
    howToUse: ["Enter the first number.", "Choose the operation.", "Enter the second number.", "Read the result; use Copy if you need it elsewhere."],
    howToInterpret: ["The primary result is the arithmetic outcome within floating-point limits.", "Very large/small values may use scientific notation depending on formatting.", "Educational helper only."],
    workedExample: { title: "Worked example — 48 ÷ 1.5", steps: ["First number = 48; operation = divide; second = 1.5.", "Compute 48 / 1.5 = 32.", "Copy the result if you need it in a chat or sheet."], result: "32" },
    faqs: [
      { question: "Does this support parentheses?", answer: "Basic mode focuses on simple binary operations. Use the scientific calculator for expressions." },
      { question: "Why did I get an error?", answer: "Usually a missing operand or division by zero — check inputs and try again." },
      { question: "Is history stored?", answer: "Calculations run in your browser session. We do not require an account." },
      { question: "Where is percent?", answer: "Use the Percentage or Tip calculators for clearer percent workflows." },
    ],
  },
  "permutation-combination": {
    seoTitle: "Permutation & Combination Calculator",
    seoDescription: "Compute nPr and nCr quickly with clear definitions. Free MyCalcsWorld statistics/math tool with FAQ and worked example.",
    overview: "Permutations (order matters) and combinations (order does not) show up in probability homework, contest math, and interview puzzles. MyCalcsWorld’s permutation & combination calculator computes nPr and nCr with the classical definitions so you can check work fast.\n\nEnter n and r (with n ≥ r ≥ 0), read both results when shown, and remember factorial growth gets huge quickly.",
    whenToUse: ["Homework checks for counting problems.", "Interview or contest prep warm-ups.", "Explaining order-matters vs order-does-not to a student."],
    commonMistakes: ["Using nCr when ranks mean order matters (nPr).", "Entering r > n.", "Forgetting identical items need different formulas."],
    howToUse: ["Enter n (total items).", "Enter r (chosen items).", "Read permutation and/or combination outputs.", "Match the definition to your word problem."],
    howToInterpret: ["nPr = n! / (n−r)! — order matters.", "nCr = n! / (r!(n−r)!) — order does not.", "Large n may hit floating-point limits."],
    workedExample: { title: "Worked example — n=10, r=3", steps: ["n = 10, r = 3.", "nPr = 10×9×8 = 720.", "nCr = 720 / 3! = 120."], result: "P(10,3)=720; C(10,3)=120" },
    faqs: [
      { question: "When do I use permutation vs combination?", answer: "If rearranging creates a new outcome, use permutations. If only the set matters, use combinations." },
      { question: "Does this handle repetition?", answer: "Classical nPr/nCr assume without repetition. With-repetition formulas differ." },
      { question: "What if r = 0?", answer: "C(n,0)=1 and P(n,0)=1 by convention for non-negative n." },
      { question: "Why did I get an error for large n?", answer: "Factorials grow fast; try smaller n or a CAS for huge integers." },
    ],
  },
  "recipe-scaler": {
    seoTitle: "Recipe Scaler — Multiply Ingredients Cleanly",
    seoDescription: "Scale a recipe up or down by servings. Free MyCalcsWorld everyday tool with tips for bakers and home cooks.",
    overview: "Doubling a recipe by eye is how cookies go wrong. MyCalcsWorld’s recipe scaler multiplies ingredient quantities by a servings ratio so home cooks and bakers can scale cleanly — then apply judgment for spices, salt, and bake times.\n\nEnter original servings, desired servings, and ingredient amounts as the form allows. Scaling liquids and dry goods is arithmetic; chemistry (leaveners, salt) sometimes needs softer scaling.",
    whenToUse: ["Cooking for a larger dinner or meal prep batch.", "Halving a bakery formula for a test bake.", "Converting a 4-serving card to 6 without mental fractions."],
    commonMistakes: ["Scaling yeast/baking powder linearly for very large jumps without recipe knowledge.", "Forgetting pan size and bake time may need changes.", "Mixing tbsp/tsp abbreviations inconsistently."],
    howToUse: ["Enter original number of servings.", "Enter desired servings.", "Enter ingredient quantities (or follow the form’s list fields).", "Read scaled amounts; adjust seasoning to taste."],
    howToInterpret: ["Scaled amount = original × (desired ÷ original servings).", "Taste-critical seasonings may need less than a full linear scale.", "Planning aid — not a professional kitchen formula."],
    workedExample: { title: "Worked example — 4 servings → 6", steps: ["Scale factor = 6/4 = 1.5.", "2 cups flour → 3 cups.", "1 tsp salt → 1.5 tsp (taste and adjust)."], result: "Multiply every quantity by 1.5; soften salt/spice if needed." },
    faqs: [
      { question: "Can I scale baking powder the same way?", answer: "Small changes usually yes; large jumps may need baker judgment." },
      { question: "Does this convert cups to grams?", answer: "Not by itself — use a cooking converter with density for weight." },
      { question: "What about cook time?", answer: "Larger pans/volumes often need more time; use visual cues." },
      { question: "Is this only for metric?", answer: "It scales whatever units you enter; keep units consistent per ingredient." },
    ],
  },
  "fuel-vs-ev": {
    seoTitle: "Fuel vs EV Cost Calculator",
    seoDescription: "Compare petrol/diesel running cost vs electric charging for your commute. Free MyCalcsWorld tool for drivers worldwide.",
    overview: "Fuel vs EV cost comparisons are full of marketing charts. MyCalcsWorld’s tool lets you plug in your own fuel price, mileage/efficiency, electricity rate, and distance so the comparison matches your commute — whether you think in ₹/kWh or $/gallon.\n\nEnter the labeled efficiency and price fields, set distance/period, and read estimated energy costs. Insurance, maintenance, and purchase price are separate unless the form includes them.",
    whenToUse: ["Deciding whether an EV’s energy cost beats your current car for a known commute.", "Comparing highway vs city efficiency assumptions.", "Explaining running-cost differences to a household."],
    commonMistakes: ["Using brochure efficiency instead of your real observed mileage/kWh.", "Ignoring home vs public charging price differences.", "Comparing only energy and forgetting insurance/EMI of a new vehicle."],
    howToUse: ["Enter fuel price and vehicle efficiency.", "Enter electricity rate and EV efficiency/consumption.", "Enter distance (daily/monthly as labeled).", "Compare estimated energy costs."],
    howToInterpret: ["Outputs are energy running-cost estimates for the distance you entered.", "Total cost of ownership needs purchase, insurance, maintenance, and incentives too.", "Educational comparison — not a dealer quote."],
    workedExample: { title: "Worked example — 1,000 km month", steps: ["Fuel car: 15 km/l at ₹100/l → ~₹6,667 fuel.", "EV: 6 km/kWh at ₹8/kWh → ~₹1,333 electricity.", "Compare using your real tariffs and efficiency."], result: "EV energy cost can be much lower per km — verify with your tariff and real efficiency." },
    faqs: [
      { question: "Does this include home charger installation?", answer: "Usually not in the energy comparison — add installation as a separate upfront cost." },
      { question: "What about hybrid cars?", answer: "Model the hybrid’s real fuel+electric mix if you have data, or run two scenarios." },
      { question: "Are electricity rates flat?", answer: "Time-of-day and commercial rates vary — use the rate you actually pay to charge." },
      { question: "Is this financial advice to buy an EV?", answer: "No — it is an educational running-cost sketch. Consider total ownership costs." },
    ],
  },
  "steps-to-miles": {
    seoTitle: "Steps to Miles / Km Calculator",
    seoDescription: "Convert step counts to distance using your step length. Free MyCalcsWorld fitness helper with FAQ and example.",
    overview: "Phone step counters are great; turning steps into miles or kilometres needs a step length. MyCalcsWorld’s steps-to-distance tool multiplies steps × stride so walkers and coaches can estimate distance without a GPS track.\n\nEnter steps and step length (or height-based estimate if offered). Results are educational — terrain and gait change real distance.",
    whenToUse: ["Estimating walk distance from a pedometer.", "Setting a daily steps goal that maps to a km target.", "Comparing treadmill distance to outdoor steps."],
    commonMistakes: ["Using a generic stride that does not match your height/gait.", "Mixing miles and kilometres in the same plan.", "Assuming every step is the same length on stairs vs flat ground."],
    howToUse: ["Enter your step count.", "Enter step length or use the form’s estimate method.", "Read distance in the units shown.", "Calibrate against a known walking route when possible."],
    howToInterpret: ["Distance ≈ steps × step length (with unit conversion).", "GPS and wheel measurements beat step estimates for accuracy.", "Educational fitness estimate — not medical advice."],
    workedExample: { title: "Worked example — 8,000 steps at 0.78 m", steps: ["Steps = 8000; step length = 0.78 m.", "Distance = 8000 × 0.78 = 6240 m ≈ 6.24 km.", "Convert to miles if needed (~3.88 mi)."], result: "About 6.24 km (≈ 3.88 miles)." },
    faqs: [
      { question: "How do I find my step length?", answer: "Walk 10 steps, measure the distance, divide by 10. Or use a height-based estimate as a starting point." },
      { question: "Why does my watch disagree?", answer: "Watches mix accelerometer models and GPS. Calibrate stride in the watch settings when available." },
      { question: "Are 10,000 steps magic?", answer: "It is a popular goal, not a medical requirement. Personalize with a clinician or coach if needed." },
      { question: "Does running change step length?", answer: "Yes — running strides are longer. Use a run-specific length for better estimates." },
    ],
  },
  "macros-by-goal": {
    seoTitle: "Macro Calculator by Goal — Cut, Maintain, Bulk",
    seoDescription: "Estimate protein, carbs, and fat targets from calories and goal. Free MyCalcsWorld fitness tool — educational, not medical advice.",
    overview: "Macro-by-goal calculators turn a calorie target into protein/carb/fat grams using split percentages for cut, maintain, or bulk styles. MyCalcsWorld’s tool is for educational meal planning — athletes and clinical populations often need personalized ratios from a professional.\n\nEnter calories (or compute upstream via TDEE), pick a goal split, and read gram targets. Re-run when body weight or activity changes.",
    whenToUse: ["Drafting a starting macro split for a cut or lean bulk.", "Translating a calorie number into grocery planning.", "Comparing higher-protein vs balanced splits."],
    commonMistakes: ["Copying influencer macros without matching calories to your TDEE.", "Setting protein unrealistically high without context.", "Treating macros as medical nutrition therapy."],
    howToUse: ["Enter daily calories.", "Choose goal / macro split as labeled.", "Optionally enter body weight if the form uses g/kg protein.", "Read protein, carb, and fat gram targets."],
    howToInterpret: ["Grams are derived from calorie × macro% ÷ kcal-per-gram.", "Protein often anchored to body weight when the form offers it.", "Not medical advice."],
    workedExample: { title: "Worked example — 2,000 kcal with 30/40/30", steps: ["Protein 30% → 600 kcal → 150 g.", "Carbs 40% → 800 kcal → 200 g.", "Fat 30% → 600 kcal → ~67 g."], result: "About 150 g protein / 200 g carbs / 67 g fat — illustrative." },
    faqs: [
      { question: "Should I eat back exercise calories?", answer: "Depends on your goal and tracking method. Many cut plans already bake activity into TDEE." },
      { question: "Is high protein safe?", answer: "Healthy people often tolerate higher protein, but kidney/liver conditions need clinician guidance." },
      { question: "Do I need exact grams daily?", answer: "Weekly averages matter more than perfection every day for most recreational goals." },
      { question: "How is this different from the Macros calculator?", answer: "Goal presets emphasize cut/maintain/bulk style splits; use whichever matches your workflow." },
    ],
    formulaNote: "Macro grams = (calories × fraction) / (4 for protein & carbs, 9 for fat), unless a g/kg protein rule overrides the protein fraction.",
  },
  "triangle-solver": {
    seoTitle: "Triangle Solver — Sides & Angles",
    seoDescription: "Solve triangles from sides and angles (SSS, SAS, ASA, and related cases). Free MyCalcsWorld geometry tool with FAQ.",
    overview: "Triangle solvers apply the law of sines and law of cosines to find missing sides and angles. MyCalcsWorld’s triangle solver is for geometry homework and drafting checks — enter the knowns the form asks for and read the remaining parts.\n\nWatch the ambiguous SSA case: two triangles can sometimes fit the same inputs. Degree mode is assumed unless labeled otherwise.",
    whenToUse: ["Geometry homework and contest warm-ups.", "Quick drafting checks when you know two sides and an included angle.", "Teaching law of sines/cosines with live numbers."],
    commonMistakes: ["Entering angles in radians when the tool expects degrees.", "Ignoring the ambiguous SSA case.", "Providing inconsistent measurements that cannot form a triangle."],
    howToUse: ["Choose the known pattern (or fill the fields provided).", "Enter sides/angles carefully with units consistent.", "Read computed sides and angles.", "Verify angle sum ≈ 180°."],
    howToInterpret: ["Valid triangles have positive sides and angles summing to 180°.", "SSA may yield 0, 1, or 2 solutions.", "Educational geometry check."],
    workedExample: { title: "Worked example — SAS check", steps: ["Enter the known side-angle-side values on the form.", "Compute the third side via law of cosines, then remaining angles.", "Confirm A+B+C = 180°."], result: "Remaining parts appear in the result panel — verify angle sum." },
    faqs: [
      { question: "What is the ambiguous case?", answer: "SSA can allow two different triangles. Check both when the math allows." },
      { question: "Degrees or radians?", answer: "This tool expects degrees unless a control says otherwise." },
      { question: "Can it solve right triangles only?", answer: "It handles general triangles via sines/cosines — right triangles are a special case." },
      { question: "Why do I get an error?", answer: "Inputs may violate the triangle inequality or leave the problem under/over-determined." },
    ],
  },
  "ohms-law-solver": {
    seoTitle: "Ohm’s Law Solver — V, I, R, P",
    seoDescription: "Solve voltage, current, resistance, and power relationships. Free MyCalcsWorld science tool for students and makers.",
    overview: "Ohm’s law and the basic power identity (P = VI) are the first checks in electronics labs. MyCalcsWorld’s Ohm’s law solver lets you enter any two knowns (as the form allows) to estimate the others under ohmic, DC assumptions.\n\nReal components heat up, LEDs are non-ohmic, and AC needs impedance — use this for textbook and first-cut DC estimates.",
    whenToUse: ["Homework checks for V = IR and P = VI.", "Sizing a resistor for an LED with a series estimate.", "Sanity-checking a bench measurement."],
    commonMistakes: ["Applying ohmic assumptions to diodes/LEDs without the forward drop model.", "Mixing mA and A.", "Ignoring power ratings when current is high."],
    howToUse: ["Enter the two known quantities the form requests.", "Leave unknowns blank or select solve mode if offered.", "Read V, I, R, and/or P.", "Apply safety margin for real parts."],
    howToInterpret: ["V = I R; P = V I = I²R = V²/R for ohmic DC.", "Results assume ideal resistors.", "Educational / first-cut only."],
    workedExample: { title: "Worked example — 12 V across 220 Ω", steps: ["V = 12, R = 220.", "I = V/R ≈ 0.0545 A ≈ 54.5 mA.", "P = V I ≈ 0.655 W — choose a resistor with margin."], result: "≈ 54.5 mA and ≈ 0.66 W dissipation." },
    faqs: [
      { question: "Does this work for AC?", answer: "Only in a simplified resistive sense. AC circuits with reactance need impedance methods." },
      { question: "How do I include an LED?", answer: "Subtract LED forward voltage from supply, then size the series resistor with the remaining voltage." },
      { question: "Why is power important?", answer: "Resistors have watt ratings; exceeding them overheats parts." },
      { question: "Is this a substitute for a multimeter?", answer: "No — measure real circuits with proper instruments and safety practice." },
    ],
  },
  "projectile-motion": {
    seoTitle: "Projectile Motion Calculator",
    seoDescription: "Estimate range, time of flight, and max height for ideal projectile motion. Free MyCalcsWorld physics tool.",
    overview: "Ideal projectile motion ignores air resistance and uses constant g. MyCalcsWorld’s projectile calculator is for physics homework and teaching demos — enter speed and angle (and height if offered) to estimate range, hang time, and peak height.\n\nReal balls, rockets, and arrows need drag models; use this for the vacuum-trajectory textbook case.",
    whenToUse: ["Class physics problems with ideal projectiles.", "Comparing 30° vs 45° launch angles quickly.", "Teaching trajectory symmetry under constant g."],
    commonMistakes: ["Forgetting degrees vs radians.", "Ignoring launch height when landing level differs.", "Applying vacuum results to sports balls with heavy drag."],
    howToUse: ["Enter initial speed.", "Enter launch angle.", "Enter height if the form has it.", "Read range, time, and max height."],
    howToInterpret: ["Flat ground ideal: R = v² sin(2θ)/g, T = 2v sinθ/g, H = v² sin²θ/(2g).", "Uneven ground changes formulas.", "Educational physics estimate."],
    workedExample: { title: "Worked example — 20 m/s at 45° on flat ground", steps: ["v = 20, θ = 45°, g = 9.81.", "Range R = v²/g ≈ 40.8 m.", "Time T ≈ 2.88 s; H ≈ 10.2 m."], result: "About 40.8 m range, ~2.9 s flight, ~10 m peak height." },
    faqs: [
      { question: "Why is 45° optimal on flat ground?", answer: "In the ideal model, sin(2θ) peaks at θ=45°, maximizing range." },
      { question: "Does air resistance matter?", answer: "Yes for sports and long ranges — this tool ignores drag." },
      { question: "What g value is used?", answer: "Standard ≈ 9.81 m/s² unless the form lets you override." },
      { question: "Can I model thrown from a cliff?", answer: "If the form includes initial height, yes; otherwise assume flat landing." },
    ],
  },
  "unit-circle": {
    seoTitle: "Unit Circle Calculator — Angle ↔ Coordinates",
    seoDescription: "Map degrees/radians to sine and cosine on the unit circle. Free MyCalcsWorld math helper for trig students.",
    overview: "The unit circle links angles to (cos θ, sin θ) coordinates. MyCalcsWorld’s unit circle tool helps students convert between degrees and radians and read the matching sine/cosine values for homework and exam prep.\n\nEnter an angle, choose degrees or radians as labeled, and read coordinates. Exact values at special angles may display rounded — know your exact radicals for exams.",
    whenToUse: ["Trig homework and board exam revision.", "Checking calculator mode (deg vs rad) mistakes.", "Visualizing reference angles."],
    commonMistakes: ["Leaving the calculator in the wrong angle mode.", "Expecting exact √2/2 when the UI shows decimals.", "Forgetting cosine is x and sine is y."],
    howToUse: ["Enter the angle.", "Select degrees or radians if offered.", "Read cos and sin (and any diagram).", "Compare to exact special-angle values when required."],
    howToInterpret: ["Point on unit circle: (cos θ, sin θ).", "Angles coterminal differ by 360° / 2π.", "Educational trig helper."],
    workedExample: { title: "Worked example — 30°", steps: ["θ = 30° = π/6 rad.", "cos 30° = √3/2 ≈ 0.866.", "sin 30° = 1/2 = 0.5."], result: "(≈0.866, 0.5) on the unit circle." },
    faqs: [
      { question: "Why don’t I see exact radicals?", answer: "The numeric engine shows decimals. Exams often still want √ forms." },
      { question: "Does it handle negative angles?", answer: "Yes — negative angles rotate clockwise in the standard convention." },
      { question: "What about tan?", answer: "tan θ = sin θ / cos θ when cos ≠ 0; undefined at odd multiples of 90°." },
      { question: "Is this a graphing calculator?", answer: "It focuses on unit-circle values; use the graphing tool for y=f(x) plots." },
    ],
  },
  "ac-btu": {
    seoTitle: "AC BTU / Room Size Estimator",
    seoDescription: "Ballpark air-conditioner capacity from room size. Free MyCalcsWorld everyday estimator — not a substitute for a cooling load calculation.",
    overview: "AC sizing rules of thumb (BTU/hr or tons from square footage) help shoppers ballpark capacity before a technician’s load calculation. MyCalcsWorld’s AC BTU estimator uses educational heuristics — sun, insulation, occupancy, and climate can swing real needs a lot.\n\nEnter room area (and other fields if shown), read a suggested BTU/ton range, and treat it as a starting conversation with a qualified installer.",
    whenToUse: ["Rough shopping range before installer quotes.", "Comparing a 1-ton vs 1.5-ton idea for a bedroom.", "Learning how area maps to BTU rules of thumb."],
    commonMistakes: ["Ignoring sun-facing glass, kitchen heat, and poor insulation.", "Oversizing so humidity control suffers.", "Treating a web estimate as a certified load design."],
    howToUse: ["Enter room length/width or area as labeled.", "Add occupancy/sun factors if the form includes them.", "Read suggested BTU/hr or tonnage range.", "Confirm with a local technician."],
    howToInterpret: ["Output is a heuristic capacity band, not a guarantee.", "Climate, insulation, and windows dominate real loads.", "Educational estimate only."],
    workedExample: { title: "Worked example — 150 sq ft bedroom", steps: ["Many thumb rules suggest ~20 BTU/sq ft as a crude start → ~3,000 BTU.", "Small rooms still often use 0.75–1 ton class units depending on climate.", "Confirm locally with an installer."], result: "A small-room ballpark — verify with installer and climate." },
    faqs: [
      { question: "What is a ton of cooling?", answer: "About 12,000 BTU/hour — common labeling for split ACs." },
      { question: "Should I oversize?", answer: "Usually no — oversized units short-cycle and dehumidify poorly." },
      { question: "Does ceiling height matter?", answer: "Yes — volume and stratification change loads." },
      { question: "Is this an energy bill calculator?", answer: "No — it estimates capacity. Energy use needs power draw, hours, and tariff." },
    ],
  },
  "tip-by-country": {
    seoTitle: "Tip by Country Calculator",
    seoDescription: "Estimate tip amounts with country-style defaults you can edit. Free MyCalcsWorld travel helper — customs vary; be respectful.",
    overview: "Tipping norms differ widely — what is standard in the U.S. can be unusual elsewhere. MyCalcsWorld’s tip-by-country helper starts from editable percentage defaults so travelers can estimate a tip amount, then adjust for service and local custom.\n\nEnter bill amount and tip percent (or pick a regional preset if shown). This is etiquette-aware arithmetic, not a cultural decree.",
    whenToUse: ["Traveling and unsure what percent to start from.", "Splitting an international dinner bill.", "Teaching that norms differ by country."],
    commonMistakes: ["Tipping twice when service charge is already included.", "Applying U.S. percentages everywhere.", "Ignoring local cash vs card tipping norms."],
    howToUse: ["Enter the bill amount.", "Choose or enter a tip percent appropriate to the place.", "Set people if splitting.", "Read tip, total, and per person."],
    howToInterpret: ["Tip = bill × percent; total = bill + tip.", "Presets are starting points — local custom wins.", "Planning aid only."],
    workedExample: { title: "Worked example — $80 bill at 18%", steps: ["Tip = 80 × 0.18 = 14.40.", "Total = 94.40.", "For 2 people ≈ 47.20 each."], result: "$14.40 tip; $94.40 total." },
    faqs: [
      { question: "Is tipping mandatory?", answer: "Laws and norms differ. When unsure, ask discreetly or check a recent local guide." },
      { question: "Before or after tax?", answer: "Customs vary; pick a rule and be consistent with your group." },
      { question: "What if service charge is listed?", answer: "Usually do not double-tip the same percentage unless you want to reward someone extra." },
      { question: "Does this replace local advice?", answer: "No — it does arithmetic. Local etiquette guides are better cultural sources." },
    ],
  },
  "tip-tax-combo": {
    seoTitle: "Tip + Tax Calculator",
    seoDescription: "Add sales tax and tip to a bill in one place. Free MyCalcsWorld dining math tool with split support.",
    overview: "Dining math gets messy when tax and tip both apply. MyCalcsWorld’s tip+tax combo calculates tax, tip, grand total, and optional per-person split so groups can settle quickly.\n\nEnter bill, tax rate, tip percent, and people. Decide whether your group tips on pre-tax or post-tax and match the form’s convention.",
    whenToUse: ["Restaurant bills with sales tax and tip.", "Group dinners that need a clean per-person number.", "Travel days when you do not want mental math."],
    commonMistakes: ["Tipping on post-tax when your group agreed pre-tax (or reverse).", "Forgetting posted menu prices may exclude tax.", "Splitting uneven orders without adjusting shares."],
    howToUse: ["Enter pre-tax bill.", "Enter tax rate and tip percent.", "Enter number of people if splitting.", "Read tax, tip, total, per person."],
    howToInterpret: ["Grand total stacks tax and tip per the form’s order of operations.", "Per-person is an even split unless you adjust manually.", "Social norms vary — math is exact."],
    workedExample: { title: "Worked example — $50 bill, 7% tax, 18% tip (pre-tax tip)", steps: ["Tax = 50 × 0.07 = 3.50.", "Tip on pre-tax = 50 × 0.18 = 9.00.", "Total = 50 + 3.50 + 9.00 = 62.50."], result: "$62.50 grand total (example convention)." },
    faqs: [
      { question: "Should tip include tax?", answer: "Groups disagree. Pick a convention and state it before you split." },
      { question: "What if the bill already has tax?", answer: "Enter the pre-tax subtotal if you still need to compute tax; otherwise set tax rate to 0." },
      { question: "Can I do uneven splits?", answer: "This page even-splits; adjust manually or use the split-bill tool." },
      { question: "Is GST the same as sales tax here?", answer: "Both are percentage add-ons in the math sense, but legal treatment differs — use the rate on your bill." },
    ],
  },
  "tip-tax-split-mega": {
    seoTitle: "Tip, Tax & Split Mega Calculator",
    seoDescription: "One form for tax, tip, and multi-person splits. Free MyCalcsWorld dining mega-tool with clear totals.",
    overview: "The tip-tax-split mega calculator combines the three dining headaches — tax, tip, and splitting — into one mobile-friendly form. Built for group dinners and travel nights when you want a single grand total and per-person share without juggling three tools.\n\nEnter bill, rates, and headcount. Confirm whether tip is on pre-tax or post-tax, then settle up. Use Copy/Share for a chat-ready summary.",
    whenToUse: ["Large group checks.", "Travel dinners with unfamiliar tax rates.", "When you want one shareable summary."],
    commonMistakes: ["Double-counting service charge and tip.", "Wrong headcount.", "Mixing currencies after a multi-country trip."],
    howToUse: ["Enter bill subtotal.", "Enter tax % and tip %.", "Enter people.", "Share the per-person result with the table."],
    howToInterpret: ["Per-person assumes equal split of the grand total.", "Adjust for uneven orders offline if needed.", "Educational arithmetic — not tax advice."],
    workedExample: { title: "Worked example — $120, 8% tax, 20% tip, 4 people", steps: ["Tax = 9.60; tip (pre-tax) = 24.00.", "Total = 153.60.", "Per person = 38.40."], result: "$38.40 per person in this pre-tax tip convention." },
    faqs: [
      { question: "Can I exclude one person from tip?", answer: "Not automatically — compute total tip, then split differently by agreement." },
      { question: "Does Copy include all lines?", answer: "Yes — the Copy button summarizes labels and values for chat apps." },
      { question: "What about service fees on apps?", answer: "Add delivery/app fees into the bill subtotal if you want them shared." },
      { question: "Is this the same as Split Bill?", answer: "Related — this mega form emphasizes tax+tip+split together." },
    ],
  },
  "ohms-triangle": {
    seoTitle: "Ohm’s Triangle Calculator",
    seoDescription: "Visual V–I–R relationships with Ohm’s triangle style solves. Free MyCalcsWorld electronics helper for students.",
    overview: "Ohm’s triangle is the classroom mnemonic for covering V, I, or R to see the formula. MyCalcsWorld’s Ohm’s triangle calculator performs the same solves with numeric inputs so lab students can check work quickly under ohmic DC assumptions.\n\nEnter any two values, read the third, and remember real parts have tolerances and power limits.",
    whenToUse: ["Lab write-ups and homework.", "Quick resistor checks on the bench.", "Teaching the mnemonic with live numbers."],
    commonMistakes: ["Unit mix-ups (mA vs A).", "Using ohmic math on non-linear parts without a model.", "Ignoring wattage."],
    howToUse: ["Enter two of V, I, R.", "Read the computed third value.", "Optionally compute power if shown.", "Apply a safety margin on real parts."],
    howToInterpret: ["Cover V → I×R; cover I → V/R; cover R → V/I.", "Ideal ohmic DC only.", "Not a substitute for meters and safety training."],
    workedExample: { title: "Worked example — I=0.02 A, R=1000 Ω", steps: ["V = I R = 0.02 × 1000 = 20 V.", "Confirm units (A and Ω).", "Check power if needed: P = I²R = 0.4 W."], result: "20 V across the resistor." },
    faqs: [
      { question: "Is this different from Ohm’s Law Solver?", answer: "Same physics family — triangle framing emphasizes the mnemonic teaching approach." },
      { question: "Can I solve for power?", answer: "When the form shows power, it uses P=VI (or equivalents)." },
      { question: "AC circuits?", answer: "Use impedance methods for reactive AC — not this DC helper." },
      { question: "Safety?", answer: "Educational only. Live circuits need proper training and PPE." },
    ],
  },

};

// Merge deep extras (extras win on overlapping keys for richer popular pages).
for (const [slug, extra] of Object.entries(calculatorSeoExtra)) {
  const prev = calculatorSeoContent[slug];
  calculatorSeoContent[slug] = prev ? { ...prev, ...extra } : extra;
}

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

/** Popular planning / money tools rail on the home page. */
export const popularPlanningSlugs = [
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

