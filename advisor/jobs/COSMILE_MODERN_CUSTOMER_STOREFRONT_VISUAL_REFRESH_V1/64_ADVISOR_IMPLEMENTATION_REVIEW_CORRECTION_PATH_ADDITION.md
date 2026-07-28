# 64 — Advisor Implementation-Review Correction Path Addition

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `IMPLEMENTATION_REVIEW_B1_CORRECTION`
BASE: product `d233cd03799259d66ddd346c1016e4f4e770c511`
SUPERSEDES: only the three-path ceiling and command in `63`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

Worker correctly proved that the frozen zero-specificity selector would make
the previously-green M1 oracle in
`app/scripts/o1_storefront_visual_shell.vitest.ts` stale. No product delta or
test run occurred.

## Exact four-path ceiling

1. `app/scripts/o1_storefront_home_catalog_visual.vitest.ts`
2. `app/scripts/o1_storefront_account_orders_visual.vitest.ts`
3. `app/scripts/o1_storefront_visual_shell.vitest.ts`
4. `app/src/app/globals.css`

Retarget only the existing M1 assertion for the common 44px shell-control rule
from the old comma-selector shape to
`.o1-shell :where(a, button, summary) { min-height: 44px; }`. Its behavioral
meaning remains unchanged. Do not weaken or remove the 44px assertion.

All B1/N1 correction requirements in `63` remain frozen. Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_home_catalog_visual.vitest.ts \
  scripts/o1_storefront_account_orders_visual.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts
```

One meaningful RED, exact correction, one identical GREEN. On PASS:
`git diff --check`, exact four-path containment, generated Prisma client
absent, commit without co-author trailer, non-force push, compact return, STOP.
First failure returns HOLD without another command. No component, behavior,
route, data, query, auth, schema, DB, runtime, browser, provider, build,
typecheck, or economic action.
