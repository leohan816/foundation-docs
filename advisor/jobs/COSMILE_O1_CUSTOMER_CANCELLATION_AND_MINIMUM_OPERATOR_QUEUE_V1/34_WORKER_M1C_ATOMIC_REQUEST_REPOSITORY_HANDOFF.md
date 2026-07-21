# Advisor Worker Handoff — M1C Atomic Customer Request Repository

MISSION_ID: COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
MODULE: M1C_ATOMIC_CUSTOMER_REQUEST_REPOSITORY
PRODUCT_BASE: c8d1a3063384cddddf332268e73f123bf814e6dc
M1A: PASS
M1B: PASS_AFTER_F1
RETURN_TO: foundation-advisor

## Binding

- Existing Cosmile Worker only; Claude Opus 4.8/max; exact mission worktree.
- `/fable-builder`: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only for compact return.
- Current Agent Office authority controls.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/scripts/o1_order_service_request.vitest.ts`
5. `app/scripts/o1_order_service_request.dbtest.ts`

No sixth path and no documentation result file.

## Objective

Add the smallest customer request service/repository boundary. It validates an internal order id plus already-verified customer owner reference, then performs one order-advisory-locked transaction that re-derives all authoritative facts and either creates/replays the request or fails closed. The existing M1B pure decision function is the only eligibility policy.

## Closed service outcomes

`completed_pre_capture | requested | existing_request | terminal | recovery_hold | unavailable | not_found | invalid_input | repository_error`.

- `not_found` covers missing, non-O1, and owner mismatch identically.
- Existing request returns only closed kind/status and writes nothing.
- No outcome exposes internal ids, owner ids, provider/payment references, amounts, raw errors, or PII.

## Repository transaction contract

Inside one Prisma transaction under the existing per-order advisory-lock convention:

1. Lock/re-read Order and the relevant intent, capture, refund, reconciliation, request, shipment, item, and reservation facts.
2. Prove O1 ownership using the existing conservative exact namespace-or-bound-intent rule; prove authenticated ownership by non-null `Order.userId === ownerRef`. Any missing/mismatch/non-O1 result is `not_found`, zero write.
3. Derive the exact M1B category-only facts. Repository/read ambiguity or query failure is `repository_error`; known contradictions remain closed `recovery_hold|unavailable` through M1B.
4. Use one server-derived bounded key `o1sr_<internal orderId>`. No caller-supplied kind/status/key.
5. Existing request, terminal, HOLD, or unavailable returns without mutation.
6. `eligible_pre_capture` atomically:
   - insert one `pre_capture_cancel/completed` request with `resolvedAt=now()`;
   - change exactly one `created|action_required` intent to `cancelled`;
   - release only the complete matching reservation set `reserved -> released`, setting `releasedAt`; never change `CommerceSku.stock`;
   - change exactly one Order `pending -> cancelled`;
   - append exactly one monotonic `OrderStatusHistory` pending→cancelled and one category-only customer audit row;
   - produce zero Refund row, zero new PaymentTransaction, zero provider call/effect.
   Every count/invariant mismatch throws and rolls back the whole transaction.
7. `eligible_paid_unshipped` inserts one `paid_unshipped_cancel/requested` request plus one category-only audit row only. Order/payment/refund/inventory/shipment/history stay byte-state equivalent.
8. `eligible_shipped_support` inserts one `shipped_support/requested` request plus one category-only audit row only. Payment/refund/inventory/shipment/courier/order/history stay byte-state equivalent.
9. Same-order concurrency and replay converge to one durable request and no second effect using the advisory lock plus existing unique constraints.
10. Transactional audit failure rolls back every mutation. A test-only fail-audit hook may exist only inside the repository input and is always `false` from the production service.

Do not create reconciliation tasks in M1C. `recovery_hold` is a no-write disposition here; later operator/recovery work owns any new task.

## Focused tests-first verification

1. Extend the existing pure test first for input validation, result mapping, repository exception, and zero-call rejection; preserve RED.
2. Add the disposable PostgreSQL Vitest test first against the actual repository implementation, using synthetic rows and exact committed migrations; preserve RED.
3. Implement only the three frozen source paths.
4. Run only the M1C-named pure tests and the single disposable M1C DB test. Require GREEN.
5. DB evidence must prove: owner/non-owner/non-O1 indistinguishability; exact safe pre-capture atomic success; no provider/refund/payment transaction/stock effect; paid and shipped request-only zero economic effects; replay and concurrent double-submit; audit-failure rollback; exact coverage failure; multiple/mismatched intent; active reconciliation/unknown fail closed; terminal and existing no-write; shipment/request lock serialization; mandatory cleanup.

Use the already evidenced read-only pinned canonical Vitest toolchain only after package/lock byte equality; no install/copy/symlink/generate/build/typecheck/full suite. Disposable local PostgreSQL only, synthetic data, no host exposure beyond loopback or container-internal access, unconditional cleanup. No provider/network/credential/runtime/UI/route call.

## Explicit exclusions / STOP

No runtime composition, API, UI, operator queue, step-up, refund, Toss transport, actual economic effect, schema/migration edit, fulfillment implementation change, legacy path change, production/shared DB, or sixth path. STOP on any required new state/kind, semantic change to existing payment/order/refund/inventory behavior, or inability to test the actual repository inside this ceiling. M2+ remain blocked.

## Return

Compact evidence index: exact five-path delta; RED/GREEN commands/counts/exits; transaction/invariant matrix; economic/provider effects `0`; disposable DB cleanup; deviations; commit/upstream/clean state; skill refs. One non-force-pushed commit, then STOP.
