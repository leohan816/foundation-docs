# WORKER RESULT — DASHBOARD / ORDERS READ-ONLY MAPPING

Status: **MAPPING ONLY** — no implementation, no product delta.

- Handoff `202` at docs `7810db63f1edfcabf220d24379d4972e305ae7b2`; computed sha256 `f1d18271be39338f712d9c980c2c7c2a662f2f432abc26728d5f40a60a74f664`.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal. Nine frozen paths read once each; no other route or source inspected.

## 1. Existing support per item

**A — `/dashboard/orders` identity inversion.** Fully supported by existing fields; no new read, field, capability or route. `OrderListRow` already carries `orderNo`, `title`, `additionalLineCount`, `totalQuantity`, `orderTotal`, `currency`, `createdAt`, `orderStatus`, `paymentCategory`, `refundCategory`, `shipmentState`, `orderId`. Today the `<Link>` to `/dashboard/requests/${encodeURIComponent(row.orderId)}` wraps `{row.title}` and `{row.orderNo}` renders beneath it as plain mono text — the correction is to swap which of the two the anchor wraps. Everything else (quantity, total/currency, UTC time, four state columns, encoded route) already exists and stays.

**B — KST captured-sales summaries.** Source exists but is **bounded**: `readPaymentRefunds(PAYMENT_READ_DEFAULT_LIMIT = 50, …)` returns validated rows carrying `createdAt: Date`, `paymentCategory` (`pending | captured | not_captured`) and `captureAmount: number | null`. Captured sales are therefore derivable as the sum of `captureAmount` over rows whose `paymentCategory === "captured"`, bucketed into KST (UTC+9) day windows from `createdAt`. **Truthfulness constraint:** the repository orders by `o."createdAt" DESC` and applies `LIMIT`, and only includes orders that have at least one `PaymentIntent`. A trailing-30-day total computed from at most 50 (max 100) rows can silently truncate. The summary must therefore either be labelled as covering the bounded read window, or be shown unavailable when the returned row count equals the limit. Inventing an unbounded total is not supported by any existing read.

**C — split payment and refund counts/links.** Both counts already exist on `/dashboard/payments`: `capturedRows = rows.filter(r => r.paymentCategory === "captured").length` (`결제 확정 주문`) and `refundedRows = rows.filter(r => r.refundCategory === "refunded").length` (`환불 완료 주문`). The dashboard home currently has a single combined `결제·환불` tile whose value is `result.rows.length` — a row count, not a captured or refund count. Splitting it uses the same single `readPaymentRefunds` call behind the same `orders.read` + `reconciliation.read` same-principal grants; no second read is required.

**D — dashboard order count / Recent Orders links.** Supported. The home already reads `o1OperatorOrderList(50)` once behind `orders.read` + `fulfillment.read` and renders `최근 주문` rows as `{row.orderNo ?? "—"}` plus `orderStatusLabel(row.dbStatus)`. That same row shape carries `orderId`, so each recent `orderNo` can link `/dashboard/requests/${encodeURIComponent(orderId)}` with **no new read**. The order count and the `최근 주문` heading can link `/dashboard/orders` — an already-frozen existing route.

## 2. Is `/dashboard/payments` the truthful refund read destination?

**Yes.** It is an existing read-only page gated flag → root → `orders.read` → `reconciliation.read` (same principal) over one `readPaymentRefunds` call, and it renders per-order refund truth in dedicated columns (`환불 상태`, `환불 금액`) plus the `환불 완료 주문` count, with closed Korean labels for all four refund categories. The refund count may link there; **no route needs to be invented** and item C's fallback (honest not-implemented state) is not required.

One constraint to respect: `o1_core_dashboard_payments.vitest.ts` asserts `expect(queue, "payments must not become an action row").not.toContain("/dashboard/payments")` — that assertion is scoped to the **action-queue** region only, so a link from the payments tile is not prohibited, but the implementation must keep `/dashboard/payments` out of the action queue and must re-verify that slice boundary rather than assume it.

## 3. Smallest exact implementation ceiling and focused command

Source (2): `app/src/app/dashboard/orders/page.tsx` (A), `app/src/app/dashboard/page.tsx` (B, C, D).
Tests (3): `app/scripts/o1_core_dashboard_orders.vitest.ts`, `app/scripts/o1_core_dashboard_reads.vitest.ts`, `app/scripts/o1_core_dashboard_payments.vitest.ts`.

For B only, a pure KST-bucketing helper is worth one additional path — `app/src/lib/operator/capturedSalesSummary.ts` (new, pure) — so the window arithmetic and the truncation guard are behaviourally testable instead of asserted through JSX. **Recommended**, but it is a sixth path and needs explicit Advisor authority; without it, B must be inlined in the page and proven only by source contract.

Focused command:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_core_dashboard_orders.vitest.ts \
  scripts/o1_core_dashboard_reads.vitest.ts \
  scripts/o1_core_dashboard_payments.vitest.ts \
  -t 'M1 orders|M3A — /dashboard/orders|M5'
```

## 4. Must stay unavailable or excluded

- No settlement, net, profit, ratio or partial-refund derivation — already forbidden by the payments service assertions.
- No customer, buyer, contact, address, session, provider reference, payment/refund internal id, raw payload or secret anywhere.
- No new read, query, capability, route or mutation; no button, form, input, fetch or POST on either page.
- A captured-sales window that could be truncated by the bounded read must read unavailable rather than show a partial figure as if complete; KST (`UTC+9`) semantics must be stated in the visible copy.
- `/dashboard/payments` must not appear in the dashboard action queue.
- The Orders page keeps `row.orderId` out of view — React key and encoded href only (currently pinned at exactly two occurrences; moving the anchor must not change that count).
- The three permitted summary counts and six frozen columns on `/dashboard/payments` are unchanged by this work.

## 5. Categorical confirmation

Schema changes **0** · DB writes **0** · provider/economic actions **0** · product delta **0** · commands executed against runtime/browser **0**. Only the nine frozen paths were read, once each; product tree clean at `b39e914`.

## Not proven

- The `/dashboard/payments` action-queue assertion slice boundary was read but not re-derived; the implementer must confirm it before adding any tile link.
- Whether the bounded 50-row window currently truncates a 30-day total is unknown here — that is a data question, and no DB read was authorized in this mapping.
