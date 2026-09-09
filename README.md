# World-Class Calculators

A polished, SEO-friendly **Next.js** calculator megasite with **119 working calculators**, live commodity prices, modern UX, and AdSense-ready placements.

> **Scope honesty:** This is a production-quality hub + extensible calculator registry — not literally every calculator on earth. The seed suite covers the must-have finance, math, health, conversion, date, everyday, business, stats, science, and education tools; adding more is designed to be straightforward.

## Live / repo

- GitHub: https://github.com/staed-web/world-class-calculators
- Deploy target: Vercel (App Router)

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Client-side calculations (no backend required for math)
- Vitest unit tests for core finance/math formulas

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm start        # serve production build
npm test         # formula unit tests
```

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, search, featured, categories, popular |
| `/categories/[slug]` | Category listing |
| `/calculators/[category]/[slug]` | Individual calculator |
| `/search?q=` | Full-text style catalog search |
| `/about` `/privacy` `/disclaimer` | Site info & legal |
| `/sitemap.xml` `/robots.txt` | SEO |

**Categories:** finance, math, health-fitness, conversion, date-time, everyday-life, science-engineering, business, education, statistics, commodities.

## Included calculators (119)

Finance (mortgage, loan/EMI, compound interest, **compounding** with continuous/EAR/schedule, SIP, Rule of 72, CAGR, NPV, salary hike, EMI with extra payments, inflation adjuster, …), Math (**Pythagoras**, Heron triangle area, distance, slope, circle/sphere/cylinder, permutations/combinations, Fibonacci, multi-step %, …), Health (BMI, water intake, pregnancy weight gain, waist–hip ratio, …), **Commodities & Metals** (live gold/silver/platinum/palladium/copper/oil spot, gold value by weight, jewelry melt-ish estimate, commodity unit converter), Conversion, Date & time, Everyday life, Business, Statistics, Science & engineering, and Education tools.

### Live commodity prices

- Route handler: `GET /api/commodities` (cached ~10 minutes)
- Primary feed: free key-less [gold-api.com](https://api.gold-api.com) for XAU/XAG/XPT/XPD/HG
- Oil: Yahoo Finance futures chart (`CL=F`) as a free supplement
- UI shows last-updated timestamps, currency, and a delayed/illustrative disclaimer; failures fall back to an error state (no invented live prices)

## Adding a calculator

1. Implement any pure formula helpers under `src/lib/formulas/` (optional but preferred for testability).
2. Add a `CalculatorMeta` entry in the matching file under `src/lib/calculators/` (e.g. `finance.ts`) **or** create a new category module and register it in `src/lib/calculators/registry.ts`.
3. Prefer `kind: "form"` with `fields` + `compute` so the shared `CalculatorForm` UI works automatically.
4. For special UIs (like the scientific keypad), use `kind: "custom"` + `customKey` and wire the component in `CalculatorView`.
5. Run `npm test` and `npm run build`.

Typed registry helpers: `getCalculator`, `searchCalculators`, `getCalculatorsByCategory`, etc.

## AdSense

Placeholders render until you set environment variables:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | e.g. `ca-pub-xxxxxxxx` — required to enable ads |
| `NEXT_PUBLIC_ADSENSE_SLOT_HEADER` | Optional slot ID |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_STICKY_MOBILE` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | Optional |
| `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` | Fallback slot |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/metadata |

`AdSlot` placements: `header`, `in-content`, `sidebar`, `sticky-mobile`, `footer`.

When `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set, the AdSense script is loaded from `src/app/layout.tsx`.

## Deploy on Vercel

1. Import the GitHub repo in Vercel.
2. Framework preset: Next.js (defaults are fine).
3. Set env vars above as needed.
4. Deploy — `npm run build` must succeed (verified in CI/local).

## Disclaimers

Results are **estimates for education only** — not professional financial, medical, legal, or tax advice. Currency rates are static illustrations, not live FX. Commodity quotes are delayed free-feed estimates. See [/disclaimer](/disclaimer).

## License

Private / as designated by the repository owner.
