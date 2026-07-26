# ADVISOR GATE — M1 ORDERS

VERDICT: `PASS`; next module `M2_CUSTOMERS`.
PRODUCT: `96b363c7` → `9bd0c7785ff49850010b021c75d765cd45a6a166`; clean/upstream-equal; exact 3-path delta.
DELTA: `dashboard/orders/page.tsx`, `O1ConsoleFulfillment.tsx`, `o1_core_dashboard_orders.vitest.ts`.
TRUTH: one existing `o1OperatorOrderList(50)` read; totals/status derived from that array; no direct Prisma/mock/demo/business row.
FIELDS: visible `orderNo`, mapped `dbStatus`, existing detail link only; malformed/missing `orderId` fails closed without invented identifier.
UI: visible Korean page identity, bounded summary, stable 3-column table, contained zero body, same real-row structure, accessible section name.
RED: `5 failed / 4 passed`; meaningful.
FIRST GREEN: `6 failed / 20 passed`; HOLD preserved in `141/142`; 3 stale out-of-ceiling failures, 2 oracle defects, 1 import regression.
DEVIATION: one extra diagnostic rerun exceeded inventory; zero verdict weight.
E1: five exact corrections; corrected focused gate `22/22 PASS` once; stale `o1_console_fulfillment_ui` excluded, unmodified.
CHECKS: `git diff --check` PASS; base ancestry PASS; product push non-force PASS.
EFFECTS: schema/DB/runtime/browser/provider/economic `0`; preview remains listening on `127.0.0.1:3000`.
LIMIT: real non-zero browser row is deferred to the final storefront sandbox acceptance.
SKILL: Worker Opus 5/xhigh, `/fable-builder` required refs loaded.
NEXT: freeze a privacy-minimized CustomerAccount/order-activity read contract; no operator/customer authority conflation and no PII.
