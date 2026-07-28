# 85 — Advisor Card Action Selector Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `CARD_ACTION_SELECTOR_CORRECTION`
BASE: product `e6b402e4bbc25d963f5e5518ec71100e42889b18`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`
VERDICT: `PROCEED_WITH_LIMITS`

Original-size desktop/mobile browser inspection proves the `e6b402e` rule is
too broad: `.o1-shell .o1-card-actions button` colors both the Cart button and
the sibling Wishlist button persimmon. Accepted references require the
Wishlist to retain its quiet outlined treatment and only the Cart action to use
persimmon/ink. Preserve the failed owner-only PNGs and correct only selector
containment.

## Exact two-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/src/app/globals.css`

Tests first: replace the overbroad oracle with an assertion that only the
non-Wishlist action child’s nested button receives enabled and disabled
commerce-action colors. Explicitly reject any `.o1-shell .o1-card-actions
button` rule that also matches `.wish-card-btn`. Require meaningful RED against
`e6b402e`.

Implementation: change only the two selectors to target
`.o1-card-actions > :not(.wish-card-btn) button` and its disabled state.
Preserve all declaration values. Do not change Wishlist styles, markup,
components, behavior, Tailwind, routes, or any other rule.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts
```

Run the identical command once for GREEN, then `git diff --check`, exact
two-path containment, commit without co-author, non-force push, compact return,
and STOP. No build/typecheck/runtime/browser/DB/provider/economic action; no
backend, schema, auth, dashboard, data, or commerce-semantic change.
