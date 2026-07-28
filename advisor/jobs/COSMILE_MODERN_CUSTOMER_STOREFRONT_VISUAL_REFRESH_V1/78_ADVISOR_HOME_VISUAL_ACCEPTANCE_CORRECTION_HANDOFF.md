# 78 — Advisor Home Visual-Acceptance Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `HOME_VISUAL_ACCEPTANCE_CORRECTION`
BASE: product `3f4f368cc24567455223c5e6c63adf8ef87269e1`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
DESIGN AUTHORITY: accepted `12` / `13` and design re-review `32` / `33`

Font-corrected local Chromium proves the shell/card grid structurally passes,
but the home lead is unstyled and the card wishlist button overlaps the cart
CTA. Public cutover remains prohibited.

## Exact three-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/src/app/page.tsx`
3. `app/src/app/globals.css`

## Frozen presentation correction

Tests first:

- require the home lead to contain a grouped editorial copy region and a
  collection-ledger region;
- ledger count and tile count must derive only from `items.length` and
  `items.map`; no literal catalog size, eighth item, identity, image, claim, or
  alternate data source;
- desktop lead is a two-column editorial/ledger composition; mobile collapses
  to one column;
- title uses the accepted serif scale, action is a 44px pine pill, ledger is a
  quiet mist surface;
- card actions use non-overlapping `minmax(0,1fr) 44px` columns; the wishlist
  button is static in that action grid and the add-control root is shrink-safe.

Implementation:

- reuse the current count-independent copy and existing `/shop` link;
- present `오늘 만나는` + `테스트 컬렉션.` as the editorial title;
- add one non-interactive ledger aside showing the current dynamic count and
  one decorative ledger tile per current `items` entry;
- style only the accepted responsive lead and existing card-action siblings;
- reset only `.o1-card-actions .wish-card-btn` from legacy absolute positioning
  to static placement. Do not change Wishlist/Add-to-Cart components or
  behavior.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

One meaningful RED, exact implementation, one identical GREEN. On PASS:
`git diff --check`, exact three-path containment, commit without co-author,
non-force push, compact return, STOP. No other test/build/typecheck/runtime/
browser/DB/provider/economic action; no backend, route, data, auth, schema,
dashboard, or commerce-semantics change.
