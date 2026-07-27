POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
RESULT_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/204_WORKER_DASHBOARD_ORDER_NAV_READONLY_MAPPING_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/205_WORKER_DASHBOARD_ORDER_NAV_READONLY_MAPPING_POINTER.md
FOUNDATION_DOCS_COMMIT: 7810db63f1edfcabf220d24379d4972e305ae7b2 (handoff) — this result committed separately
RUNTIME_REPO: ../Cosmile
RUNTIME_COMMIT_STATUS: unchanged b39e914bd65899b1dd05de277124fc9eb0ffc80a (no product change)
RETURN_TO: Advisor
NEXT_ACTOR: Advisor

## Status

**MAPPING ONLY** — no implementation, no product delta.

- Handoff `202` at docs `7810db6`; computed sha256 `f1d18271be39338f712d9c980c2c7c2a662f2f432abc26728d5f40a60a74f664`. Nine frozen paths read once each; no other route or source inspected.
- **A** fully supported by existing fields: today the detail `<Link>` wraps `{row.title}` and `{row.orderNo}` renders beneath as plain text — the correction swaps which one the anchor wraps. Quantity, total/currency, UTC time, four state columns and the encoded route already exist and stay. No new read, field, capability or route.
- **B** derivable from the existing validated rows (`createdAt`, `paymentCategory === "captured"`, `captureAmount`) bucketed into KST (UTC+9) windows — but the read is **bounded** (`LIMIT 50`, max 100, ordered `createdAt DESC`, intent-bearing orders only), so a trailing-30-day total can silently truncate. It must be labelled as the bounded window or shown unavailable when the row count hits the limit; an unbounded total is not supported by any existing read.
- **C** both counts already exist on `/dashboard/payments` (`결제 확정 주문`, `환불 완료 주문`) from the same single `readPaymentRefunds` call behind the same `orders.read` + `reconciliation.read` same-principal grants. The home tile currently shows a combined row count, not captured/refund counts.
- **`/dashboard/payments` IS the existing truthful refund read destination** — per-order `환불 상태`/`환불 금액` columns and the refunded count, closed Korean labels. **No route invention needed**; item C's not-implemented fallback is unnecessary. Constraint: the payments suite forbids `/dashboard/payments` inside the **action-queue** region only, so a tile link is permissible but that slice must be re-verified, not assumed.
- **D** supported with no new read: the home already reads `o1OperatorOrderList(50)` once behind `orders.read` + `fulfillment.read`, and the same rows carry `orderId`, so each recent `orderNo` can link its encoded detail route while the count and `최근 주문` heading link `/dashboard/orders`.
- **Smallest ceiling:** sources `app/src/app/dashboard/orders/page.tsx` + `app/src/app/dashboard/page.tsx`; tests `o1_core_dashboard_orders.vitest.ts`, `o1_core_dashboard_reads.vitest.ts`, `o1_core_dashboard_payments.vitest.ts`. For B only, a pure `app/src/lib/operator/capturedSalesSummary.ts` is **recommended** so the KST windows and truncation guard are behaviourally testable — that is a sixth path needing explicit authority; otherwise B is inlined and proven by source contract only.
- **Focused command:** `cd app && ./node_modules/.bin/vitest run -c vitest.config.ts scripts/o1_core_dashboard_orders.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_core_dashboard_payments.vitest.ts -t 'M1 orders|M3A — /dashboard/orders|M5'`
- **Excluded/unavailable:** no settlement, net, profit, ratio or partial-refund derivation; no customer/contact/address/session/provider/internal-id/payload/secret; no new read, query, capability, route or mutation; no control surface; truncatable windows read unavailable rather than partial; KST (UTC+9) stated in visible copy; `/dashboard/payments` never in the action queue; `row.orderId` stays key + encoded href only (exactly two occurrences).
- **Categorical:** schema 0 · DB writes 0 · provider/economic actions 0 · product delta 0 · runtime/browser commands 0.
- Not proven: the payments action-queue slice boundary was read but not re-derived; whether the bounded 50-row window currently truncates a 30-day total is a data question and no DB read was authorized here.

RETURN_TO: Advisor
