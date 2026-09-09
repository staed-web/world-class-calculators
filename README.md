# MyCalcsWorld

Free online calculators for finance, math, health, and everyday life.

A polished, SEO-friendly **Next.js** calculator megasite with **200+ working calculators**, live commodity prices, a modern mobile-first UX (dark mode, ⌘K search, richer results), and AdSense-ready placements.

> **Scope honesty:** This pass targets **parity with Calculator.net’s stated ~200 tools** on catalog size, while aiming to **beat peers on UX** (less clutter than ad-stuffed pages, stronger hierarchy, charts/tables, related tools, dark mode). **Omni Calculator’s 3,000+ library is out of scope** for one pass — growing toward that density remains a multi-release effort. Adding more tools is designed to be straightforward via the typed registry.

## Live / repo

- Brand / canonical site: https://mycalcsworld.online
- GitHub: https://github.com/staed-web/world-class-calculators
- Deploy target: Vercel (App Router)

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Client-side calculations (no backend required for math)
- Vitest unit tests for core finance/math/catalog formulas

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
npm run lint
```

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, ⌘K search, featured, categories with counts, scientific keypad widget |
| `/categories/[slug]` | Dense category directory + search-within-category |
| `/calculators/[category]/[slug]` | Individual calculator (inputs + live results + formula accordion + related) |
| `/search?q=` | Catalog search |
| `/about` `/privacy` `/disclaimer` | Site info & legal |
| `/sitemap.xml` `/robots.txt` | SEO |

**Categories:** finance, math, health-fitness, conversion, date-time, everyday-life, science-engineering, business, education, statistics, commodities.

## UX highlights

- Distinctive design tokens + **light/dark toggle** (persisted in `localStorage`)
- Sticky header search with **⌘K / Ctrl+K** focus shortcut
- Calculator shell: input card, results card, **Calculate + Reset**, live updates, formula accordion, print-friendly results
- Amortization: **full year-by-year schedule table** + interest chart bars
- Category pages: scannable list directory (Calculator.net-style density) with filter
- Related tools auto-padded to 6+
- Tasteful **AdSlot** placements (header / in-content / sidebar / footer / sticky-mobile)

## Catalog (200+)

High-traffic additions this pass include credit-card payoff, lease vs buy, rent vs buy, paycheck estimator (flat-% disclaimer), investment return, bond yield, forex position size, GST invoice split, dividend yield, P/E, interest-only mortgage, loan affordability, car/student loans, matrix determinant, binomial probability, triangle solver, percentage mega, roman numerals, base converter, MAD, steps↔miles, heart-rate zones, sleep cycles, protein need, square footage, concrete, paint, tile, stairs, fence, roof pitch, recipe scaler, oven temp, pressure/energy/power converters, shoe/clothing size, business days, payday calendar, zodiac, Ohm’s law solver, density, P=VI, wavelength, freefall, and more.

### Live commodity prices

- Route handler: `GET /api/commodities` (cached ~10 minutes)
- Primary feed: free key-less [gold-api.com](https://api.gold-api.com) for XAU/XAG/XPT/XPD/HG
- Oil: Yahoo Finance futures chart (`CL=F`) as a free supplement
- UI shows last-updated timestamps, currency, and a delayed/illustrative disclaimer

## Adding a calculator

1. Implement pure formula helpers under `src/lib/formulas/` (prefer `catalog.ts` or domain files) and add Vitest coverage.
2. Add a `CalculatorMeta` entry in `src/lib/calculators/` (or `extra.ts` for batch growth) and ensure it is spread into `registry.ts`.
3. Prefer `kind: "form"` with `fields` + `compute` so the shared `CalculatorForm` UI works automatically.
4. For special UIs, use `kind: "custom"` + `customKey` and wire the component in `CalculatorView`.
5. Run `npm test`, `npm run lint`, and `npm run build`.

## AdSense

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | e.g. `ca-pub-xxxxxxxx` |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | Optional slot IDs (header, in-content, sidebar, sticky-mobile, footer, default) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap/metadata (default `https://mycalcsworld.online`) |

## Disclaimers

Results are **estimates for education only** — not professional financial, medical, legal, or tax advice. Paycheck/tax tools use flat percentages. Currency rates may be illustrative. Commodity quotes are delayed free-feed estimates. See [/disclaimer](/disclaimer).

## Known gaps vs Omni

Omni’s thousands of niche calculators and deep educational explainers are not replicated here. This hub focuses on **high-traffic tools**, working math, and a superior day-to-day UX shell. Future passes can deepen explainers and expand long-tail tools category by category.

## License

Private / as designated by the repository owner.
