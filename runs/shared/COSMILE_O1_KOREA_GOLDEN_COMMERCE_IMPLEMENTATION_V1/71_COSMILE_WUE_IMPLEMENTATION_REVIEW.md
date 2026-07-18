# 71 — Cosmile WU-E Independent Implementation Review (Order lifecycle / recovery / record-only fulfillment / operator control)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-E order lifecycle, recovery, record-only fulfillment, and operator-control candidate
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_..65_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max; session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active this session)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 71_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/71_COSMILE_WUE_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit 08549e21e52250336f8ddcd1f03dde8873ab0bed (read via git show at pin)
BINDING:      CANDIDATE_HEAD d1f21e0fdd51034eef025212729125cee91576dd — this verdict binds to exactly this commit
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS   (deterministic mapping per the committed handoff)
CANDIDATE_PUSH: eligible by the ADVISOR after publication of this review (Reviewer pushes nothing)
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `08549e21` | exists; handoff read at pin; foundation-docs worktree HEAD = `08549e21`, clean | ✅ |
| Base / parent | `b3448894` (WU-B corr-2 head, pushed) | `HEAD~1` = exact; **single additive commit**; `ls-remote` = `b3448894`; ahead 1/0; candidate NOT pushed | ✅ |
| CANDIDATE_HEAD | `d1f21e0f` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Path boundary | exactly the 9 allowlisted paths | `git diff --name-status` = schema (M, additive) + migration/down (A) + 4 lib (A) + 2 tests (A); **+2231/−0**; no route/page/component/existing-lane/package/lockfile/client/config path | ✅ |
| Worker evidence | commit `cf717af0` → 70_RESULT+POINTER | adds exactly those two; read at pin (claims) | ✅ |
| Implementation handoff | commit `3384952a` | adds exactly the 70_ handoff; read at pin in full | ✅ |
| Design pins | `a1ac8016` / `daacd8a6` PASS | consistent with 31_ (sha256-verified then) | ✅ |

## 1. Determinations

### A. Schema and migration — SATISFIED

The Prisma `ShipmentRecord` model and the raw SQL are mutually consistent field-for-field (types, nullability, default, `@unique(orderId)`, status index, FK `ON DELETE RESTRICT`) and strictly additive (schema +15/−0: one back-relation + one model; no existing object touched). Every required invariant is **SQL-enforced**: closed status CHECK (`pending|preparing|shipped|delivered`); bounded **and non-blank** carrier (btrim 1..64) and trackingRef (btrim 1..128); `shipped/delivered ⟹ non-blank trackingRef` CHECK; unique order relation. `down.sql` drops only the additive table with `IF EXISTS` (idempotent, fail-closed, touches no WU-0 object). No PII/address/phone/courier-endpoint/provider field and no competing truth table exists. The disposable rehearsal applies the **exact committed** WU-0 then WU-E migrations, proves forward→down→forward with structure identity (unique+index restored, table empty), down idempotency, and the CHECK backstops (shipped-without-tracking, whitespace carrier/tracking rejected; valid pending row accepted) — reproduced 53/53.

### B. Captured-order bind — SATISFIED (load-bearing, verified in code + twin + concurrency)

`bindCapturedOrder` (repository.ts:137-187) runs one per-order advisory-locked transaction: **capture truth verified before coverage** — the intent must be durably `captured` and bound to this exact order/amount/KRW, the **one** succeeded capture (WU-0 partial-unique ⩽1) must be exactly the input capture with amount/KRW/intent binding, and `Order.total/currency` must align; any mismatch ⇒ `capture_not_verified`, zero write. Reservation rows are locked (`FOR UPDATE`) and first-commit coverage is **exact and bidirectional**: ≥1 valid line (null-SKU/non-positive ⇒ `order_line_invalid`); **no** reservation row in any status other than `reserved` (released/expired/committed contaminants reject); **no** extra reserved SKU outside the required lines (which makes the subsequent blanket `reserved→committed` UPDATE provably exact); aggregate per-SKU equality (duplicate lines aggregate). Per §3.2.5 a `reserved` row is accepted **regardless of wall-clock `expiresAt`** once capture is verified — the TTL non-release rule is implemented, not just stated. Commit path: reserved→committed(+`committedAt`), Order `pending→paid`(+`paidAt`) with a 0-row-throw rollback guard, exactly one monotonic history row (`seq = MAX+1` under the lock; `@@unique(orderId,seq)` backstop), and the **transactional audit written last** — the `failAudit` test hook proves a full rollback (order stays pending, nothing committed, no audit row) in both the FakeRepo and the DB twin. Replay is idempotent **only** through `orderFullyBoundCoherent` — paid+paidAt, **exactly one** `paid` history (duplicate rejected), the single succeeded capture aligned to `Order.total`+KRW and bound to a `captured` same-order intent, **and** exact committed coverage; every adjacent incoherence (leftover non-committed reservation, extra committed SKU, duplicate paid history, wrong-amount/currency capture, non-captured/wrong-order intent) lands in `captured_internal_pending` with order-scoped reconciliation reuse — **never a re-charge** (the lane structurally contains no provider port) and never a conclusive payment failure. Concurrency: two concurrent binds ⇒ exactly one `confirmed` + one `idempotent` and one paid history — proven both in vitest and with genuine parallel connections in the dbtest. The TypeScript repository is **faithful and executable** against the pinned schema: every referenced column (`Order.total/currency/paidAt/orderNo/userId/guestId`, `OrderItem.skuId/quantity/*Snapshot/unitPrice`, `OrderStatusHistory` incl. `@@unique(orderId,seq)` and the `actorType` CHECK values used, `PaymentIntent/PaymentTransaction/Refund/InventoryReservation/ReconciliationTask`, `ConsoleAuditLog.meta`) was verified present; the plpgsql twin was read side-by-side and materially matches (same locks, same guards, same order of checks).

### C. Refund, authorization, recovery — SATISFIED

`finalizeRefund` re-reads, **under the order lock**, the exact succeeded capture (by id+order+type+status) and the `Refund` row by idempotency key+order, requiring capture-link, amount (== capture amount ⇒ full), and KRW equality; a durable `Refund` not yet `refunded` ⇒ `hold` + `refund_hold` reconciliation (order stays paid); amount mismatch ⇒ `refund_not_complete`; a `refunded` order is `idempotent` **only** with a refunded history row (a false-coherent refunded state fails to `hold`); only `paid` may advance (else `state_conflict`); an incoherent committed-coverage projection ⇒ `hold` with stock untouched; the advance is 0-row-throw guarded with transactional history+audit. **No code path touches `InventoryReservation` in the refund lane — restoration is structurally impossible, not merely refused.** The step-up boundary defaults to the `unconfiguredStepUpVerifier` (deny-all, the only runtime-safe verifier); the explicit-grant verifier is unambiguously named/commented **test-only** and authorizes only an exact all-field binding with single-use freshness (replay ⇒ `stale_or_replayed`); malformed operator/reason/freshness/scope values are rejected **before** any authorization in both the service gates and the verifier; the system confirm path rejects any caller-supplied operator (`invalid_input` before repo/audit reach) and hard-binds the audit actor to `system/system`; recovery (`retryCapturedOrderBind`) requires an `order_recovery` verdict scoped to the exact order. The WU-B `AuthorizationVerdictPort` adapter maps only an authorized refund-scoped step-up verdict to `{authorized}` and everything else to `{denied}` — it cannot weaken the boundary and modifies no WU-B file. Reconciliation opens/reuses deterministically (active `open|in_progress` reuse under the order lock) and is never fabricated as resolved.

### D. Fulfillment and safe projections — SATISFIED

`pending→preparing→shipped→delivered` is the only legal step (`nextShipmentStatus` single-increment; equal target idempotent; skip/regression/unknown ⇒ `invalid_transition`; `pending` is not a valid target). Fulfillment entry/advance requires **full bound coherence** (not merely `status='paid'`) — stray reservations, misaligned captures, non-captured/wrong-order intents, duplicate paid history, and unpaid orders all yield `not_paid` (tested). Tracking is bounded/non-blank with btrim parity at the service and CHECK backstop at the DB; shipped/delivered honor a carried-forward reference; tracking is exposed to a customer **only** for shipped/delivered with a non-blank value. The customer view is owner-scoped strictly to the verified authenticated `Order.userId` — a guest-owned row fails closed even when the ref equals `guestId` (guest checkout stays deferred; no new `guestId` trust), and an order without an opaque `orderNo` returns `not_found` rather than leaking the internal id. The operator view is owner/admin-gated and returns only bounded counts/categories (serialization asserted free of capture/intent/SKU/owner ids). Audit failure rolls back the shipment/history mutation (proven both layers).

### E. Error containment and adjacent negatives — SATISFIED

Every repository catch returns a distinct closed `error` (never success/idempotent); the service maps all throws to `repository_error`; 0 `console.*`/`process.env`/`fetch(` across all four lane files and 0 console additions in the whole delta; whitespace-only and over-bound identifiers/categories/scopes are rejected at the earliest gate; unknown enum targets fail closed; DB constraint failures surface as closed errors; the two test-only mechanisms (`failAudit`, `makeTestOnlyExplicitStepUpVerifier`) are explicitly marked and cannot be mistaken for configured runtime mechanisms (the default export path is deny-all).

### F. Tests, parity, safety, honest ceiling — reproduced

Assertions were inspected, not just counted: the 71 vitest cases and 53 dbtest checks include real state assertions (order-stays-pending on rejection, one-history-on-race, stock-committed-after-refund, no-shipment-row-on-audit-failure, no-id-leak serialization) rather than name-only claims, and the in-memory FakeRepo and plpgsql twin materially match the TypeScript repository's guards.

```text
PRE:  HEAD d1f21e0f porcelain 0 · docker containers 1
RUN1: vitest run scripts/o1_order_lifecycle.vitest.ts → 71 passed / 0 failed
RUN2: vitest run → 18 files, 468 passed / 0 failed  (397 prior + 71; no regression; no prior oracle changed)
RUN3: python3 scripts/o1_order_lifecycle.dbtest.py → 53 passed / 0 failed · exit 0 · cleanup verified
RUN4: python3 scripts/o1_payment_repository.dbtest.py → 71 passed / 0 failed · cleanup verified
RUN5: python3 scripts/o1_inventory_concurrency.dbtest.py → 28 passed / 0 failed · cleanup verified
RUN6: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · cleanup verified
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All six Worker-claimed counts reproduce exactly. Typecheck/build remain honestly NOT_RUN under the same verified generation blocker as every prior gate; with the raw-SQL idiom (matching the reviewed WU-B repository), column-level schema verification here, and the parity-true twin, this is a **bounded residual unknown** (deploy-time `prisma generate` gate), not a blocking defect or required correction. No WU-F/G, credentialed sandbox, checkout-route, provider-network, UI, or end-to-end evidence is credited — none was executed.

## 2. Findings

**Blocking/required: NONE.**

Observations (non-blocking):
- **[O-E1]** `repository.ts` compile/runtime under the real generated client remains the declared deploy-time unknown (consistent posture across WU-B/C/D/E; mitigations verified).
- **[O-E2]** The bind verifies `capture.amount == Order.total` but does not cross-check `Σ(OrderItem.totalPrice) == Order.total` — total computation is owned by the pre-existing checkout spine (outside WU-E's allowlist); money truth remains capture==total. Note for the WU-F harness fixtures.
- **[O-E3]** `appendHistory` computes `seq = MAX+1` under the per-order advisory lock; any non-WU-E writer of `OrderStatusHistory` would be serialized only by the `@@unique(orderId,seq)` backstop (hard failure ⇒ closed error). No such writer exists in the candidate.
- **[O-E4]** Fulfillment carry-forward uses `input ?? existing` — a transition cannot clear a recorded carrier/tracking (record-only carry-forward semantics; matches the contract).

## 3. Excluded scope

No patch/stage/commit/push/dispatch/policy/risk action; no provider/network/credential/real DB/PII; no build/tsc; no WU-F/G inspection beyond confirming the candidate does not start them; legacy checkout/admin spine untouched (verified by path set).

## 4. Verdict rationale

WU-E composes the reviewed substrate exactly as frozen: an additive SQL-enforced shipment projection with a rehearsed reversible migration; a capture-bind transaction that verifies durable money truth before touching inventory, commits exactly the required reserved set under lock with TTL-post-capture semantics, and holds every incoherence in reconciliation without ever being able to re-charge; a refund projection that structurally cannot restore stock and never fabricates a refunded state; a deny-all-by-default step-up boundary with exact single-use bindings and a non-weakening WU-B adapter; coherence-gated record-only fulfillment; guest-fail-closed owner scoping; fail-closed transactional audit proven by rollback tests on both layers; and complete containment (nine additive paths, zero activation, zero leakage). Every count reproduced; the fake and the SQL twin materially match the runtime repository, whose SQL is column-verified against the pinned schema. No load-bearing invariant is unconnected, contradicted, or asserted only by a twin or a test name. **ROLE_VERDICT: PASS.**

```text
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS
BINDING: candidate d1f21e0fdd51034eef025212729125cee91576dd only
BLOCKING_FINDINGS: NONE · OBSERVATIONS: O-E1..O-E4 (non-blocking)
WU-E_CANDIDATE: d1f21e0f (base b3448894 + 1 additive commit; NOT pushed) — push eligible by ADVISOR after publication; WU-F/G dispatch remains Advisor/Leo
EVIDENCE_LEDGER: pure 71/71 + suite 468/468 (reproduced) · db-touch 53/53 + WU-B 71/71 + WU-C 28/28 + WU-0 54/54 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; post-review product state == pre-review state)
RETURN_TO: foundation-advisor
STOP
```
