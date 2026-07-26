# ADVISOR HANDOFF — M1-E1 GATE CORRECTION

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE: `M1_ORDERS_E1`
VERDICT: `PROCEED_WITH_LIMITS`
ACTOR/BINDING/SKILL: same `cosmile:claude.0`, Opus 5/xhigh, `/fable-builder`; no context/session/model/effort change.
BASE: product HEAD remains `96b363c7`; preserve the current uncommitted exact three-path M1 delta and RED `5 failed / 4 passed`.
EVIDENCE: `141/142` HOLD; first GREEN `6 failed / 20 passed`; one unauthorized diagnostic rerun disclosed.

## Exact path ceiling — unchanged

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/components/console/O1ConsoleFulfillment.tsx`
3. `app/scripts/o1_core_dashboard_orders.vitest.ts`

## Exact corrections

1. Fix the new H1 oracle by pinning `PAGE_HEADING = "주문"` and its H1 placement; do not weaken visible-heading coverage.
2. Count only `<th` elements with a word boundary so `<thead>` is not a cell; retain exactly three named headers.
3. Preserve the restored exact `O1ConsoleFulfillment` import required by the directly affected core-read test.
4. Remove the invented `String(index)` orderId fallback. Any malformed row lacking a nonempty `orderId` or valid list shape must fail closed as the existing unavailable page state; never mint a link/key.
5. When `heading={null}`, give the shared section a real accessible name instead of referencing a missing heading ID.

## Corrected focused gate

The three failures in `o1_console_fulfillment_ui.vitest.ts` are proven pre-existing/out-of-ceiling, and its stale inventory/shipment copy conflicts with contract `122`; exclude that file with zero verdict weight. Do not edit it or its dependency paths.

Run exactly once after the five corrections:
`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_orders.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts --config vitest.config.ts`

Then only `git diff --check`, exact three-path status/diff inspection, commit once, non-force push, and compact `144/145` result. No other test, rerun, read expansion, install/generate/build/typecheck/runtime/browser/DB/provider/economic action.
First failure returns HOLD without diagnosis or retry. On PASS prove no mock/demo row, one bounded real read, malformed-row fail closed, accessibility naming, effects `0`, clean/upstream-equal; STOP.
