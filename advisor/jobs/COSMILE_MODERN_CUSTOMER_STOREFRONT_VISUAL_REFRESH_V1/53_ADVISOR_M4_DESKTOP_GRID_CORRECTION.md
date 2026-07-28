# 53 — Advisor M4 Desktop Grid Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M4_ACCOUNT_ORDER_HISTORY_DETAIL_REQUEST_PRESENTATION`
BASE: product `842c7c6b514cafe3ba4dbbc225012bcbbc433405`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

## Exact two-path ceiling

1. `app/scripts/o1_storefront_account_orders_visual.vitest.ts`
2. `app/src/app/globals.css`

No third path.

## Defect

The accepted M4 source makes `.o1-order-summary` a two-column grid but does not
place its direct children. CSS auto-placement can interleave the header, line
list, total, factual rows, progress, request section, and non-production note.
The source-contract gate proved class presence but not the actual composition.

## Frozen correction

- Tests first: require every direct child of `.o1-order-summary` to span both
  columns by default at desktop.
- Require only `.o1-order-facts` to use column 1 and
  `.o1-order-progress` to use column 2.
- The request section, header, line list, total, and note therefore remain
  full-width and in document order.
- Short viewport continues to return the root to one column.
- No markup, behavior, data, query, status, action, endpoint, auth, DB,
  provider, or economic change.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_account_orders_visual.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts
```

One meaningful RED, exact CSS correction, one identical GREEN. On PASS:
`git diff --check`, exact two-path containment, generated Prisma client absent,
commit without co-author trailer, non-force push, compact return, STOP. First
failure returns HOLD without another command.
