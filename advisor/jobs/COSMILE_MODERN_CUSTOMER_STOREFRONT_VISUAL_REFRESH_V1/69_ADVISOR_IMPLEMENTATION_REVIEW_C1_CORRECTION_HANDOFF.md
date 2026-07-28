# 69 — Advisor Implementation-Review C1 Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `IMPLEMENTATION_REVIEW_C1_CORRECTION`
BASE: product `4374617e3dde9ae58042fbe668bd2cdc9f35ec48`
REVIEW: `67` / `68` · `NEEDS_PATCH` · blocking C1
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

## Exact three-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/scripts/o1_storefront_detail_cart_visual.vitest.ts`
3. `app/src/app/globals.css`

Direct source confirms only two customer anchors lost an effective 44px box
when the harmful global `inline-flex` was removed:

- home `.o1-lead-action`;
- persistent add-success link `.o1-add-status a`.

Tests first: require one explicit rule for those exact selectors with
`display:inline-flex`, `align-items:center`, and `min-height:44px`. Retain the
zero-specificity common rule and prove it still has no `display` or
`align-items`. Do not weaken any existing shell/card/history/focus assertion.

CSS only: add the exact per-control rule above. Do not restore a global display
or alignment rule and do not change component markup, copy, route, behavior,
data, query, auth, schema, DB, provider, or economic semantics.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts \
  scripts/o1_storefront_detail_cart_visual.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts
```

One meaningful RED, exact CSS correction, one identical GREEN. On PASS:
`git diff --check`, exact three-path containment, generated Prisma client
absent, commit without co-author trailer, non-force push, compact return, STOP.
First failure returns HOLD without another command, runtime/browser, build,
typecheck, DB, provider, or economic action.
