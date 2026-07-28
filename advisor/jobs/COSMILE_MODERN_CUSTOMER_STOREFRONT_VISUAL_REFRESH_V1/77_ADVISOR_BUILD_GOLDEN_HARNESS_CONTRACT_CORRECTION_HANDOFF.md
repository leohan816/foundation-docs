# 77 — Advisor Build Golden-Harness Contract Correction Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
PHASE: `CUMULATIVE_BUILD_CORRECTION_3`
BASE: product `40db23cb3fb04b8cb8b223f026cae4ad6bfbd0fa`
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

The next corrected build compiled successfully and stopped because the
test-only Golden Order harness returns an older `OperatorOrderData` shape
without `createdAt` and `lines`. The harness is byte-identical to base
`8d4a327` and already owns truthful `OrderRow.createdAt` plus `ItemRow`
name/SKU/option/quantity/unit-price facts.

## Exact two-path ceiling

1. `app/scripts/o1_golden_order.vitest.ts`
2. `app/scripts/o1_golden_order_harness.ts`

Extend the existing operator-view test to require the fixed durable instant and
the one exact line snapshot. Then map only the existing harness facts:

- `createdAt: o.createdAt`;
- each line: product name, SKU, option, quantity, unit price, and
  `totalPrice = quantity * unitPrice`.

Do not invent a field/value, change product source/contracts, alter Golden
Order economics, or broaden the harness.

Run exactly:

```bash
cd app
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_golden_order.vitest.ts
```

The preserved build failure is the RED. Run one focused GREEN only. On PASS:
`git diff --check`, exact two-path containment, commit without co-author,
non-force push, compact return, STOP. Do not rerun build, typecheck, another
test, runtime, browser, DB, provider, or economic action; Advisor owns the
corrected cumulative build.
