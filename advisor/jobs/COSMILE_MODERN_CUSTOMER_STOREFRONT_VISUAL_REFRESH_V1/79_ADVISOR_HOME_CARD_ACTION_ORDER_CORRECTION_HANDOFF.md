# 79 — Advisor Home Card Action-Order Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `HOME_CARD_ACTION_ORDER_CORRECTION`
BASE: product `806e951ece587777b87165e2b9061f8db2a23e0b`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
VERDICT: `PROCEED_WITH_LIMITS`

The accepted visual contract `12` requires reading order to equal DOM order,
and accepted desktop reference `13` places the 44px Wishlist control left of
the flexible Cart action. The current card DOM already has Wishlist before
Add-to-Cart, but the correction at `806e951` assigns Wishlist to the second
visual column. Close only that presentation-order contradiction before browser
acceptance. Public cutover remains prohibited.

## Exact two-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/src/app/globals.css`

## Tests-first contract

Add one focused assertion proving:

- `.o1-card-actions` uses `44px minmax(0, 1fr)`;
- `.wish-card-btn` occupies column 1;
- the non-Wishlist sibling occupies column 2;
- the existing card source still orders `WishlistButton` before
  `AddToCartButton`, so DOM/tab and visual order agree.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

Require one meaningful RED. Then change only the three column declarations in
`globals.css`; do not edit either component, markup, behavior, data, routes, or
any other CSS. Run the identical command once for GREEN, then `git diff
--check`, verify exact two-path containment, commit without a co-author trailer,
non-force push, return compact evidence, and STOP.

No build/typecheck/runtime/browser/DB/provider/economic action. No backend,
schema, auth, dashboard, catalog-data, commerce-semantic, or public-runtime
change.
