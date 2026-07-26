# Advisor M5 Payments/Refunds gate
VERDICT: `PASS`
PRODUCT: `2ccde154618f1bf31f48727ad33d4964495dc763..1efde21e2942696b585b8c27e2980e97795cb3e1`
PATHS: exact 9 (`paymentRefundRead`, Prisma read adapter, `/dashboard/payments`, home/nav, 4 focused tests).
FOCUSED_GATE: RED `5F/60P` → first GREEN `4F/75P` HOLD → named diagnostic → corrected GREEN `79/79`.
ORACLES: import-source, direct-Prisma, ID-block and D07-copy checks narrowed to intended syntax/blocks; safety assertions retained or strengthened.
AUTHORITY: runtime flag → `dashboard.operations.read` → `orders.read` + `reconciliation.read`; same principal required.
WRITE_AUTHORITY: `refund.full_execute` is never a read grant or action; no control surface.
READ_TRUTH: bounded 1..100/default 50; one parameterized read over existing Order/Intent/Transaction/Refund facts.
FAIL_CLOSED: malformed, duplicate, non-KRW, multi-capture/nonfailed-refund, amount mismatch, repository error => no partial projection.
PRIVACY: no customer/contact/provider reference/idempotency/webhook/payload field selected or rendered.
ECONOMIC/PROVIDER/SCHEMA EFFECT: `0`; capability catalog and Prisma schema unchanged.
GRANT CONTEXT: docs `612507b` PASS, existing principal 16/16; step-up/nonce/audit/idempotency/default-deny unchanged.
GIT: product clean/upstream-equal at `1efde21`; docs clean/upstream-equal at `4a176f2`.
NEXT: cumulative HARD_IMPORTANT_SAFETY independent review; no runtime/provider action before verdict.
