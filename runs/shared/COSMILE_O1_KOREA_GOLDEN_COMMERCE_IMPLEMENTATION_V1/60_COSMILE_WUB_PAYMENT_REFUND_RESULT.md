# COSMILE WU-B — Direct Toss V2 Payment/Refund Truth Lane — Result

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B
ACTOR: cosmile (Cosmile repository-owner Worker)   MODEL/EFFORT: Opus 4.8 (1M) / max   SKILL: /fable-builder
HANDOFF: advisor/jobs/.../handoffs/60_COSMILE_WUB_PAYMENT_REFUND_IMPLEMENTATION_HANDOFF.md @ foundation-docs efffa64
STATUS: COMPLETE — library/repository-only truth lane; one local candidate commit; NOT pushed
RETURN_TO: foundation-advisor
```

## 1. Heads / lineage (additive; no amend/rebase/squash/force)

```text
BASE_HEAD (parent):     2733bfd61e407389c3336eba2e655ad081d4cdb5   (WU-D reviewed head == upstream)
CANDIDATE_HEAD:         d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01   (parent verified == BASE)
BRANCH:                 implementation/cosmile-o1-korea-golden-commerce-v1-20260717
UPSTREAM ahead/behind:  1 / 0    PUSH: NOT_PUSHED (withheld pending independent implementation review PASS)
GOVERNING PINS (verified before edit): WU0 c559e7c · WUA e1dc39e · WUC 3ea1b21 (review 58202ed) · WUD 2733bfd (review 3bdc1d5)
  · reviewed design a1ac8016 · independent design review daacd8a6 PASS · PSP=DIRECT_TOSS_PAYMENTS_V2 · PORTONE NOT_AUTHORIZED
  · FULL_CAPTURED_SANDBOX_REFUND_ONLY=YES · PARTIAL_REFUND NOT_AUTHORIZED · RUNTIME_ACTIVATION=NO
```

## 2. Eight-path disposition (numstat 2733bfd→d17a092; 1929 insertions, 0 deletions; NO existing path changed)

```text
244  app/src/lib/payment/contracts.ts        bounded discriminated inputs/outcomes + injected ports; reuses WU-C PaymentProof
128  app/src/lib/payment/tossV2.ts           direct Toss V2 adapter over an injected transport (method/path/body/Idempotency-Key)
270  app/src/lib/payment/repository.ts        Prisma runtime over the fixed WU-0 substrate (advisory locks + partial-unique backstops)
225  app/src/lib/payment/service.ts           pure truth orchestration over ports (intent/claim/capture/refund)
139  app/src/lib/payment/webhook.ts           untrusted-notification boundary + server-pull-verify (node:crypto digest)
114  app/scripts/o1_toss_v2_adapter.vitest.ts adapter over a fake transport
498  app/scripts/o1_payment_contract.vitest.ts contracts+service+webhook over a faithful FakeRepo + fake transport
311  app/scripts/o1_payment_repository.dbtest.py disposable-PostgreSQL parity mirror of the repository transactions
```

No schema / migration / Prisma model / generated client / package / lockfile / env / route / endpoint / page /
component / checkout / cart / order / inventory / auth / Foundation / SIASIU / control / doc / timer / scheduler /
process path changed. No dependency added. `git status` after run: only these 8 new files (symlink removed).

## 3. Provider contract mapping (official Toss V2; consume-don't-invent — design research 30_)

| Operation | Method · relative endpoint | Body | Idempotency | Result binding |
|---|---|---|---|---|
| confirm (capture) | `POST /v1/payments/confirm` | `{paymentKey, orderId, amount}` | `Idempotency-Key` | status=DONE + exact `{orderId==orderNo, totalAmount==expected, currency==KRW, paymentKey}` |
| query (getStatus) | `GET /v1/payments/{paymentKey}` | — | — | same binding; drives webhook server-verify |
| cancel (refund) | `POST /v1/payments/{paymentKey}/cancel` | `{cancelReason}` — **FULL only, NEVER cancelAmount** | `Idempotency-Key` | complete reversal = status `CANCELED` + `balanceAmount==0` + distinct `cancels[].transactionKey` |

The injected transport owns the authenticated base URL, `Authorization` header, credential custody, and network I/O.
WU-B reads no secret and makes no call. All adapter results are closed categories (`ok / invalid_request /
unsupported_status / malformed_response / provider_error{category} / timeout`) — no raw payload/secret/header leaves it.

## 4. Truth / transition tables

Intent (server-authoritative; one live intent/order; gated by a non-expired WU-C `reserved` boundary at the SQL layer):
`created →(atomic reservation-recheck)→ action_required →(atomic single-paymentKey CLAIM)→ authorizing →(verified DONE)→ captured`.
Idempotent by key (actual `Order.orderNo` re-verified on replay); a second active intent for the order (different key)
or a conflicting-key reuse fails closed, zero write.

Capture truth directions (money truth ONLY from server confirmation after the exact comparison):

| Provider result | Outcome | PaymentProof / effect |
|---|---|---|
| DONE + record recorded/idempotent | `captured_pending_order_commit` | `verified_capture` (for WU-E commit) |
| DONE + any non-clean record (already_captured/conflict/error) | `captured_internal_pending` | reconcile; never re-charge, never clean conflict |
| IN_PROGRESS / READY / WAITING_FOR_DEPOSIT | `confirming` | `confirming` → HOLD |
| **ABORTED / EXPIRED (exact provider truth only)** | `not_captured` | `conclusively_non_captured` |
| **CANCELED / PARTIAL_CANCELED at confirm** | `confirming` + reconcile | HOLD — never releases stock |
| HTTP error / timeout / unsupported status | `confirming` | ambiguous → HOLD (NEVER conclusively_non_captured from an error alone) |
| malformed response | `unknown` | HOLD |

Money-safety CLAIM: `claimIntentForConfirm` binds `providerIntentRef=paymentKey` and transitions
action_required→authorizing atomically under the per-order lock, re-validating the tuple + non-expired reserved
boundary. `authorizing`/`captured` re-claim is allowed ONLY for the same bound paymentKey; a different paymentKey →
conflict with ZERO provider calls. Proven concurrently (dbtest): two distinct paymentKeys → exactly one claim, one
capture; two concurrent captures → exactly one succeeded capture (WU-0 partial-unique backstop).

Refund (FULL captured-payment reversal only): authorization is fail-closed default-deny (WU-E supplies the operator
step-up; WU-B invents no operator identity/policy). Eligibility = one server-verified succeeded FULL capture, exact
order/KRW/amount/paymentKey. Provider-confirmed complete reversal creates the immutable
`PaymentTransaction(type=refund,status=succeeded)` (distinct cancel-transaction ref, not the capture paymentKey) AND
advances the `Refund` atomically. ANY incomplete/partial/missing-ref/timeout/error → `confirming` + refund
reconciliation (durable recovery), never a terminal refusal, never `invalid_input`, never a partial amount.

## 5. Webhook trust proof

`PAYMENT_STATUS_CHANGED` is the only supported class (others → unsupported_event). It is UNTRUSTED and never mutates
money/order/inventory/refund directly. No signature is invented (official docs define none for this class). Raw-body
size is bounded BEFORE parse; the body is parsed only for a bounded lookup hint + a versioned `psx1` digest. Inbox
identity = digest(event-class + raw bytes): exact-raw replay → `duplicate_ignored`; DISTINCT state bodies for one
payment (READY→DONE→CANCELED) → DISTINCT inbox events (no false quarantine); a true digest collision → `quarantined`
(best-effort persisted). Only the digest/type/state are stored — never the raw body. After recording, `serverVerifyWebhook`
server-pull-verifies the exact `{orderNo, amount, KRW, paymentKey}` binding and marks the inbox verified/quarantined
(idempotent, non-regressing; never claims a state it did not persist).

## 6. Refund / inventory-HOLD proof

Inventory disposition remains **HOLD**: WU-B never commits/releases/restores inventory, confirms the Order, appends
history, or emits customer/commerce events. A verified capture only returns the `verified_capture` proof for WU-E;
a refund advances only refund truth. The dbtest proves the payment lane left `Order.status` and
`InventoryReservation.status` unmutated after capture + full refund. No refund/return/cancellation restores sellable stock.

## 7. Verification (commands / counts / meaning; already-present deps + proven-safe symlink)

```text
LINK:  ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored; REMOVED after → ABSENT)
RUN1:  npx vitest run scripts/o1_toss_v2_adapter.vitest.ts scripts/o1_payment_contract.vitest.ts → 2 files, 40 passed / 0 failed
RUN2:  npx vitest run → 17 files, 373 passed / 0 failed  (was 333; +40; no regression, no existing oracle changed)
RUN3:  python3 scripts/o1_payment_repository.dbtest.py → 38 passed / 0 failed · exit 0
         · disposable postgres:16-alpine, tmpfs, no host port, docker exec only, synthetic creds
         · cleanup BLOCKING (incomplete cleanup forces a nonzero result; unexpected exceptions propagate, not masked)
         · cleanup: container removed=True, absent=True, tmpfs vanished, host-port=none, transient-cred removed
RUN4:  python3 scripts/o1_inventory_concurrency.dbtest.py (WU-C payment-proof boundary) → 28 passed / 0 failed · cleanup verified
RUN5:  python3 scripts/o1_golden_commerce_migration.dbtest.py (WU-0 regression) → 54 passed / 0 failed · cleanup verified
```

Test meaning: the pure adapter/contract/service/webhook vitests prove the closed request/response/decision contracts
and every fail-closed direction over fakes; the disposable-PG dbtest is a parity-true plpgsql mirror proving the
DB-level money invariants (twin encoding — a divergence would surface). Evidence is counts/categories/booleans only —
no raw provider payload, real payment reference, secret, PII, or customer data. A dedicated no-leak test asserts
outcomes/errors never serialize the paymentKey/cancel ref/secret.

Residual compile/runtime unknown (honest): typecheck/build **NOT_RUN**. The generated Prisma client predates WU-0 and
`prisma generate` is forbidden this cycle, so `repository.ts` (the only @/lib/prisma-importing module) compile+runtime
behavior is a declared deploy-time unknown — NOT converted to PASS evidence. The runtime invariants it encodes are
mirror-proven by RUN3.

## 8. Credential gate / containment

No Leo credential action requested (WU-B is offline library/review only). No provider contacted, account/application
created, secret accessed, network call made, real payment, or runtime activation. Checkout, routes, UI, order
lifecycle, inventory commit/release, operator console, and any running provider process **remain unconnected** — WU-E
owns order/inventory/operator integration; WU-F/WU-G own credential-gated sandbox execution. WU-B leaves a precise,
testable port + durable truth lane for those later authorized WorkUnits without activating them.

## 9. Residual observations (non-blocking; deferred)

- **O-B1** `repository.ts` compile/runtime is unverified (pre-WU-0 generated client; deferred to a generation-authorized gate).
- **O-B2** The refund provider reference binds the parsed `cancels[].transactionKey`; if a future Toss response shape
  omits it, the lane opens refund reconciliation (durable recovery) rather than binding the paymentKey — deferred exact-shape confirmation.
- **O-B3** Operator authorization identity/policy and refund/return/restock policy are Leo/WU-E-owned (default-deny here).
- **O-B4** A reservation may expire in the window between the atomic claim and the external provider confirm landing;
  this is inherent to external I/O and is contained by WU-E's reservation-commit boundary (a capture on a just-expired
  hold surfaces as reconciliation there), not by a second WU-B charge.

```text
ROLE_RESULT: WU-B COMPLETE — library/repository-only truth lane; 8-path containment; all Advisor pre-commit checks closed
RE_REVIEW: independent implementation review, delta 2733bfd..d17a092
CANDIDATE_PUSH: WITHHELD   RETURN_TO: foundation-advisor   STOP (no Reviewer dispatch; no WU-E/F/G)
```
