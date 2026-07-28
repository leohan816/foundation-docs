# 63 — Advisor Implementation-Review Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `IMPLEMENTATION_REVIEW_B1_CORRECTION`
BASE: product `d233cd03799259d66ddd346c1016e4f4e770c511`
REVIEW: `61` / `62` · `NEEDS_PATCH` · blocking B1
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

## Exact three-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/scripts/o1_storefront_account_orders_visual.vitest.ts`
3. `app/src/app/globals.css`

No fourth path.

## B1 and N1

- B1: unconditional `.o1-shell a, .o1-shell button, .o1-shell summary`
  sets `display:inline-flex; align-items:center` at specificity `(0,1,1)`,
  overriding `.o1-card-link` flex/grid and `.o1-history-card` block
  composition.
- N1: at desktop width plus `max-height:480px`, facts/progress retain columns
  1/2 and create an implicit second column despite the root `1fr` reset.

## Frozen correction

Tests first:

- require the common touch-target rule to use
  `.o1-shell :where(a, button, summary)` and set only `min-height:44px`;
- require that rule not to set `display` or `align-items`;
- retain existing card-link mobile flex and desktop grid assertions;
- require short-viewport `.o1-order-facts` and `.o1-order-progress` both reset
  to column 1.

CSS only:

- replace the high-specificity helper with the exact zero-specificity
  descendant rule above;
- do not add a replacement global display/align rule;
- in the existing `max-height:480px` block reset both facts and progress to
  `grid-column:1`.

Existing `.mall-tabs a`, `.o1-card-link`, `.o1-history-card`,
`.o1-account-row`, `.wish-card-btn`, nav/header/footer flex parents, focus, and
44px rules remain. No component, markup, behavior, route, data, query, auth,
schema, DB, provider, or economic change.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts \
  scripts/o1_storefront_account_orders_visual.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts
```

One meaningful RED, exact CSS correction, one identical GREEN. On PASS:
`git diff --check`, exact three-path containment, generated Prisma client
absent, commit without co-author trailer, non-force push, compact return, STOP.
First failure returns HOLD without another command, runtime/browser, build,
typecheck, DB, provider, or economic action.
