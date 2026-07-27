# WORKER RESULT — DASHBOARD / ORDERS PRESENTATION AND NAVIGATION

Status: **HOLD** — the single RED contains one failure that does **not** map to freeze 206. Stopped before any source change, per handoff 208 ("STOP on … invalid RED").

- Handoff `208` at docs `3e15f9ab3bfff7a347e2997e14a0c6c5784629fd`; computed sha256 `8031b6648d97ad1afae229ae119314869530130608f87ae1e3775338113b70ba`. Contract: freeze `206/207`.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal. **No source change; the three source paths are untouched.**
- `/fable-builder` references already loaded this session and verified byte-identical.

## RED (frozen command, run once)

`3 failed (3)` files, `4 failed | 30 passed (34)`, exit `1`.

**Contract-mapped (expected):**

| Failure | Freeze clause |
|---|---|
| `Cannot find package '@/lib/operator/capturedSalesSummary'` (payments suite) | B — the new pure helper does not exist yet |
| `the anchor wraps the order number: expected '<Link href={…}' to contain '{row.orderNo}'` | A — identity inversion |
| `order count plus Recent Orders destinations: expected 0 to be greater than or equal to 2` | D — home order-count / Recent Orders destinations |
| `the existing encoded detail route is reused, never re-declared: expected 'import Link…' to contain '/dashboard/requests/${encodeURIComponent('` | D — recent `orderNo` detail links |

**Not contract-mapped (the stop point):**

`o1_core_dashboard_reads.vitest.ts > neither read surface introduces customer authority, direct data access, a control surface or economic display`
`AssertionError: src/app/dashboard/orders/page.tsx must not introduce: shipment: expected 'import Link from "next/link";…' not to contain 'shipment'`

This is a **pre-existing stale oracle**, not a defect and not part of freeze 206. It forbids the token `shipment` (and, by its name, "economic display") on the Orders page, but the already-accepted M3A durable enrichment — committed at `990efb8` and carried into the current base `b39e914` — legitimately renders the 배송 column from `row.shipmentState`, plus order total and currency. It has been failing since that enrichment landed; earlier gates never surfaced it because they ran with `-t 'M1 orders|M3A — /dashboard/orders'`, while freeze 206's command runs the three suites unfiltered.

I did not weaken, skip or update it, and I did not proceed to the source phase. The assertion may carry further violations beyond `shipment` (the run stops at the first), so its full scope is undetermined.

## State

- Modified, uncommitted: exactly the three authorized **test** paths (`o1_core_dashboard_orders.vitest.ts`, `o1_core_dashboard_reads.vitest.ts`, `o1_core_dashboard_payments.vitest.ts`).
- Untouched: all three source paths — `dashboard/orders/page.tsx`, `dashboard/page.tsx`, and `capturedSalesSummary.ts` (never created). No seventh path. No product commit or push.
- No build, full suite, typecheck, DB, runtime, browser, provider, refund or economic action. Schema 0, DB writes 0, product delta 0.

## Blocker — Advisor decision required

The stale assertion sits inside an already-authorized test path, so correcting it needs no new ceiling — only your classification. Options, not chosen unilaterally:

1. Supersede it for the Orders page as the M3A enrichment already did elsewhere: keep the customer/authority/control prohibitions intact and narrow the economic-token prohibition so the accepted 배송 / 금액 / 통화 columns are permitted on that page while remaining prohibited on the other read surface; then re-run the identical frozen command once.
2. Re-scope the assertion to the other read surface only.
3. Any other disposition you specify.

I will not choose between them, and I will not touch the source paths until the RED is classified as valid.

## Not proven

- Freeze 206 items A–D are unimplemented; the RED only establishes that the contract is currently unmet.
- The full extent of the stale assertion's violations is unknown — it fails fast at `shipment`.
