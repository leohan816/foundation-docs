# 61 — Cosmile WU-B Independent Implementation Review (Direct Toss V2 payment/refund truth lane)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-B direct Toss V2 payment/refund truth-lane candidate
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_..53_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max; session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active this session)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 61_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/61_COSMILE_WUB_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit c4ddf8ebaf802691b942b8cdf38ce20bee6254b6 (read via git show at pin)
BINDING:      CANDIDATE_HEAD d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01 — this verdict binds to exactly this commit
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS   (deterministic mapping per the committed handoff)
REQUIRED_FINDINGS: WUB-F1 (single, LOW, in-scope)
CANDIDATE_PUSH: MUST NOT BE PUSHED until the correction + delta re-review
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `c4ddf8eb` | exists; handoff read at pin; foundation-docs worktree HEAD = `c4ddf8eb`, clean | ✅ |
| Base / parent | `2733bfd6` (WU-D PASS head) | `HEAD~1` = exact; **single child commit** ("feat(wu-b): … library-only; no route/runtime/provider activation") | ✅ |
| CANDIDATE_HEAD | `d17a0926` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / push | head `2733bfd6` · 1_0 · NOT_PUSHED | `ls-remote` = `2733bfd6`; 0 behind / 1 ahead | ✅ |
| Diff boundary | exactly 8 NEW paths | `git diff --name-status` = 8 × `A` (+1929/−0): payment `contracts/tossV2/repository/service/webhook` + 2 vitest + dbtest; zero existing-file modification; no schema/migration/client/package/route/checkout/order/inventory/catalog/identity path | ✅ |
| Worker evidence | commit `bf2d21f7` → 60_RESULT+POINTER | adds exactly those two; read at pin (claims) | ✅ |
| Implementation handoff | commit `efffa642` | adds exactly the 60_ handoff; read at pin | ✅ |
| Design pins | `a1ac8016` / `daacd8a6` PASS | consistent with 31_ (sha256-verified then) | ✅ |

Official-provider basis: this environment forbids external network by the same handoff, so "current official Toss documentation" is verified against the mission's **committed official-source records** — the admission record (00_, llms-quick-reference facts incl. "general payment events have no signature header; verified by querying payment state with paymentKey") and the reviewed design §10/30_ research — plus reviewer knowledge of the Toss V2 server API, which agrees on every pinned element.

## 1. Determinations

### A. Adapter and exact provider semantics — SATISFIED

`tossV2.ts` is pure over the injected `TossTransport` (no URL base, no credential, no I/O, no env, no logging — sweeps: 0 `console.*`/`process.env`/`fetch(` across all five lib files). Endpoints/bodies are exactly the documented server API: confirm `POST /v1/payments/confirm` `{paymentKey, orderId, amount}` + `Idempotency-Key`; query `GET /v1/payments/{paymentKey}` (URL-encoded path parameter — injection-safe, tested); cancel `POST /v1/payments/{paymentKey}/cancel` `{cancelReason}` with **no `cancelAmount` ever sent** — full-only is structural and pinned by an explicit test (`"cancelAmount" in body === false`). Parsing is strict and closed: object shape, status ∈ the 8 modeled Toss states (unknown ⇒ `unsupported_status`, never success), bounded ids for `orderId`(=orderNo)/`paymentKey`, bounded non-negative integer `totalAmount`/`balanceAmount`, `currency === KRW`; errors map by HTTP status class only (provider bodies never parsed or surfaced); thrown transport ⇒ `timeout` (HOLD downstream); own-input violations ⇒ `invalid_request` with no call. Complete reversal = `CANCELED` + `balanceAmount === 0` + a **distinct** `cancels[].transactionKey` (absent ⇒ null ⇒ refund fails closed rather than reusing the paymentKey). 12 adapter tests cover every direction.

### B. Capture money-safety and concurrency — SATISFIED (evidence-surface gap → WUB-F1)

Attacks answered from source + tests + DB rehearsal:
- **Two paymentKeys / one order**: the atomic per-order claim (`claimIntentForConfirm`, advisory `pg_advisory_xact_lock(hashtext(orderId))`) binds `providerIntentRef=paymentKey` once and precedes any provider effect (service line order 87→95); replay is allowed only for the same bound key; a different key ⇒ `conflict` ⇒ **zero provider calls** (vitest "MONEY SAFETY" test asserts the transport call count; dbtest runs a **real parallel** two-key claim race ⇒ exactly one `claimed`).
- **Multiple intents/keys per order**: one live intent per order enforced under the lock (`otherActive` check); idempotent replay re-verifies the **actual `Order.orderNo`** (never echoes the caller); wrong-tuple reuse ⇒ `conflict`, zero write; 0-row transitions **throw ⇒ rollback** (never a false success).
- **Wrong orderNo/orderId/amount/currency/paymentKey/state**: triple-checked — pre-claim service compare, in-claim SQL re-validation of the tuple + non-expired `reserved` boundary (TTL at the SQL boundary, `expiresAt > now()`; `committed` blocks a fresh charge), and post-response view binding (`view.paymentKey/orderNo/currency/totalAmount` exact).
- **Reservation absent/expired/released/committed at final pre-effect claim**: `reservation_required` with no provider call (tested; dbtest TTL/committed cases).
- **Provider DONE then internal failure**: id-generation and repository throws are both inside the guarded region ⇒ `captured_internal_pending` + reconciliation (open-or-reuse, quiet, never a raw throw; double-throw containment tested ⇒ `reconciliationOpened=false`, no escape). Any non-clean record after DONE (already_captured/conflict/error) ⇒ the same reconcile path — never a clean conflict, never a re-charge.
- **Duplicate effects/rows**: WU-0 partial-unique `PaymentTransaction_one_succeeded_capture_key (orderId) WHERE type='capture' AND status='succeeded'` (verified in migration SQL) + unique `providerTxnRef` + unique `idempotencyKey` backstop the locks; capture replay compares the **full bound tuple** on both the by-order and by-key paths (a weaker replay ⇒ `already_captured`/`conflict`); real concurrent captures ⇒ exactly one succeeded row (dbtest).
- **Confirm-time statuses**: DONE⇒record; IN_PROGRESS/READY/WAITING⇒`confirming`; **only ABORTED/EXPIRED ⇒ `conclusively_non_captured`**; CANCELED/PARTIAL_CANCELED at confirm ⇒ `confirming` **+ reconciliation** (never releases stock); HTTP error/timeout/unsupported ⇒ `confirming` (ambiguous, never non-capture); malformed ⇒ `unknown`. All directions tested.
The advisory locks + WU-0 constraints make the production repository semantics atomic **as encoded**, and the disposable rehearsal is a faithful (not overstated) plpgsql mirror of those transactions — the same lock/tuple/0-row rules, exercised with genuine parallelism.

### C. Refund truth, authorization, recovery — SATISFIED

Authorization is fail-closed default-deny (`AuthorizationVerdictPort`; a throw ⇒ `repository_error` and a non-authorized verdict ⇒ `not_authorized`, both **before any provider effect**; WU-E owns the verdict — no operator identity/policy invented). Eligibility is exact and closed (succeeded capture by id, order, KRW, **full amount only**, bound paymentKey — five distinct categories). One active refund per capture (per-capture advisory lock + `status <> 'failed'` check + WU-0 partial-unique `Refund_one_active_per_capture_key`). Success is persisted **only** on an unambiguous complete reversal (CANCELED + balance 0 + paymentKey match + present distinct cancel ref); partial/incomplete/malformed/error/timeout/missing-ref ⇒ `confirming` + refund reconciliation — durable recovery, never terminal refusal, never `invalid_input`, never a partial amount (structurally impossible: `cancelAmount` is never sent). Post-effect internal failure (record throw / conflict) ⇒ the same hold+reconcile, never false success, never raw escape (double-throw tested). `recordConfirmedRefund` re-proves the exact Refund tuple, requires the full refund-transaction+`providerRefundRef` match for idempotency, rejects a cancel-ref bound to a different refund, and advances Refund atomically with a 0-row-throw guard. The dbtest proves capture-row immutability after refund and that **`Order.status` and `InventoryReservation.status` are unmutated** by the whole lane — WU-B restores no inventory and advances no Order.

### D. Webhook distrust, replay, monotonicity — SATISFIED

Raw body is size-bounded **before** parse (64 KiB); the body is parsed only into a bounded lookup hint + the versioned `psx1` digests and is **never persisted or surfaced** (inbox stores category/digest/type/state only — matches `WebhookEventInbox` columns). No signature exists or is invented for `PAYMENT_STATUS_CHANGED`; other classes ⇒ `unsupported_event`; malformed/no-subject/oversized/repo-failure fail closed with zero money/order/inventory/refund effects (ingest has no money-touching calls). Inbox identity = digest(class + raw bytes): exact-raw replay ⇒ `duplicate_ignored`; **distinct state bodies for one payment ⇒ distinct events** (no false coalescing — tested); true digest collision ⇒ `quarantined` (best-effort persisted, fail-closed). Only `serverVerifyWebhook` (authenticated server query + exact `{orderNo, amount, KRW, paymentKey}` comparison) can mark the inbox verified, and **a state is claimed only if actually persisted** (`verified`/`binding_mismatch` require `setWebhookState === true`, else `unresolved` — exactly the required honesty). `setWebhookState` is monotonic: received→terminal or same-terminal reaffirm; cross-terminal regression matches 0 rows ⇒ false (dbtest-proven).

### E. Data model alignment, leakage, containment — SATISFIED

Field-level schema check against WU-0 at the candidate ancestry: `Order.total/currency/orderNo` exist exactly as read; `PaymentIntent` (statuses used ⊆ CHECK set; `idempotencyKey @unique`; `providerIntentRef` nullable), `PaymentTransaction` (immutable — no UPDATE anywhere in the lane; `providerTxnRef @unique`; `idempotencyKey @unique`; type/status/currency CHECKs), `Refund` (status set exactly matches the CHECK; `idempotencyKey @unique`; `providerRefundRef @unique`), `WebhookEventInbox` (`providerEventId @unique`; processedState CHECK), `ReconciliationTask` — all aligned; both money partial-uniques verified in the migration SQL. No WU-C/WU-D/WU-A/checkout/order/legacy drift (zero existing-file modification; the lane reads `InventoryReservation` read-only). Leakage: closed categories only; no secret/credential/raw payload/SQL/PII anywhere; the bounded opaque `paymentKey`/cancel-ref live only in internal typed values and DB columns (authorized); a dedicated test asserts outcomes/errors serialize without them. No activation: zero imports of `lib/payment` outside the lane; no route/endpoint/timer/network path exists. No generated/cache/symlink residue (post-run tree byte-identical).

### F. Tests, safety, honest ceiling — reproduced

```text
PRE:  HEAD d17a0926 porcelain 0 · docker containers 1
RUN1: vitest run <adapter> <contract> → 2 files, 40 passed / 0 failed
RUN2: vitest run → 373 passed / 0 failed  (333 prior + 40; no regression; no existing oracle changed)
RUN3: python3 scripts/o1_payment_repository.dbtest.py → 38 passed / 0 failed · exit 0 · cleanup removed=True absent=True (tmpfs, no host port, local image, synthetic creds)
RUN4: python3 scripts/o1_inventory_concurrency.dbtest.py (WU-C regression) → 28 passed / 0 failed · cleanup verified
RUN5: python3 scripts/o1_golden_commerce_migration.dbtest.py (WU-0 regression) → 54 passed / 0 failed · cleanup verified
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All five Worker-claimed counts reproduce exactly. Typecheck/build remain honestly NOT_RUN under the same verified generation blocker as prior gates; the uncompiled `repository.ts` is a **bounded residual unknown** (not a blocking gap): its transaction semantics are mirror-proven (RUN3), its column names are schema-verified here, and the deploy-time `prisma generate` gate is already the mission's declared path. No provider-sandbox/route/checkout/order/end-to-end evidence is credited — none was executed.

## 2. Findings

### Required (single; owner: same Cosmile Worker; delta-only re-review by this Reviewer)

**[WUB-F1] Stuck-state recovery surface incomplete (LOW · required by 60_ §5).** The implementation handoff requires: "Provide bounded queries/decisions for intents/refunds stuck in confirming or captured-internal-pending states so WU-E can open/reuse reconciliation work." The `PaymentRepository` port (contracts.ts:211-244) exposes **no** stuck-intent/stuck-refund query, and two ambiguous capture outcomes leave **no durable reconciliation evidence**: (a) a plain confirm timeout/provider_error/unsupported-status (`service.ts:99`) returns `confirming` leaving the intent `authorizing` with no `ReconciliationTask` (only DONE-internal-failure at `:120/:124` and CANCELED-at-confirm at `:137` open tasks); (b) a post-`ok` binding/amount mismatch (`service.ts:101-102`) — a provider response that contradicts the claimed tuple after a 2xx confirm — returns a terminal-looking category with no durable evidence, though the intent stays claimed. Money safety is **not** violated (the claim binding prevents any second charge; same-key confirm replay with the same `Idempotency-Key` recovers deterministically; durable intent state exists) — this is a recovery/evidence completeness gap against an explicit contract line. **Failure scenario:** a sandbox confirm times out; the intent sits `authorizing` forever with no task and no query for WU-E to find it; recovery depends on out-of-band knowledge. **Affected authorized paths:** `app/src/lib/payment/contracts.ts`, `service.ts`, `repository.ts`, `o1_payment_contract.vitest.ts`, `o1_payment_repository.dbtest.py` (all within the eight). **Required correction + proof:** open/reuse a `capture_confirming` reconciliation task on ambiguous confirm outcomes (timeout/provider_error/unsupported) and on post-`ok` binding/amount mismatch; add bounded repository queries (e.g. stuck intents in `authorizing`/`action_required` and refunds in `requested/confirming`, category/count-bounded outputs) to the port + repository + dbtest mirror; positive + adjacent-negative tests (task opened on timeout; no task on clean DONE; queries return the stuck rows and nothing else).

### Observations (non-blocking)

- **[O-B1..O-B4]** (Worker-declared, verified accurate): uncompiled `repository.ts` deploy-time unknown; refund cancel-ref shape dependency fails closed to reconciliation if absent; operator authorization/policy is WU-E/Leo-owned (default-deny here); claim-to-confirm reservation-expiry window is inherent to external I/O and contained by WU-E's commit boundary.
- **[O-B5]** Post-`ok` `binding_mismatch`/`amount_mismatch` categories are semantically "suspicious provider response", not clean caller errors — folded into WUB-F1's evidence fix; no category rename required.
- **[O-B6]** `createOrGetRefund` replay of a still-`failed`-status refund key returns `existing` then proceeds to a fresh provider cancel under the same idempotency keys — bounded and provider-idempotent (safe); noted for WU-E's operator flow design.

## 3. Excluded scope

No patch/stage/commit/push/dispatch/policy/risk action; no provider, network, credential, real DB, or PII; no build/tsc (verified blocker unchanged); no WU-E/F/G inspection beyond confirming the candidate does not start them; no route/checkout/order/end-to-end claims.

## 4. Verdict rationale

The truth lane is architecturally exact against the frozen boundary: claim-before-effect with per-order serialization and schema backstops, triple tuple verification, HOLD-biased ambiguity handling, full-only structural refunds with persistence-gated success, an untrusted webhook boundary whose claims are gated on actual persistence, immutable transaction rows, closed categories with zero leakage, eight-path containment with zero activation — and every claimed count reproduced exactly, including genuine DB-level races. The single unmet element is the explicitly required stuck-state query/evidence surface (WUB-F1): real, LOW-severity, recovery-completeness only, patchable entirely inside the eight authorized paths with an exact evidence recipe. Role verdict **NEEDS_PATCH** (not PASS — an explicit handoff-§5 element is missing; not PASS_WITH_RISK — nothing requires risk acceptance; not FAIL — no money-safety, authority, or containment boundary is broken).

```text
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
BINDING: candidate d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01 only
REQUIRED_FINDINGS: WUB-F1 (LOW · stuck-state queries + ambiguous-outcome reconciliation evidence · exact recipe in §2)
CORRECTION_OWNER: same Cosmile Worker (additive commit on the mission branch; no amend/push)
RE_REVIEW: this same Reviewer, delta-only d17a0926..<new-candidate> plus adjacent invariants
CANDIDATE_PUSH: WITHHELD (manifest: only reviewed PASS heads are pushed)
EVIDENCE_LEDGER: pure 40/40 + suite 373/373 (reproduced) · db-touch 38/38 + WU-C 28/28 + WU-0 54/54 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (post-review product state == pre-review state)
RETURN_TO: foundation-advisor
STOP
```
