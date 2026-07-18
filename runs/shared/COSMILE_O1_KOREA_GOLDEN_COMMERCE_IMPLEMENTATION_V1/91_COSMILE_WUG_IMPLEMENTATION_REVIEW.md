# 91 — Cosmile WU-G Independent Implementation Review (Golden Reversal harness + bounded evidence)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-G captured-payment Golden Reversal script-only non-production candidate
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_..81_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max; session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active; Team Operating Model + Reviewer role checksums re-confirmed; Cosmile AGENTS.md/CLAUDE.md previously re-read this session)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 91_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/91_COSMILE_WUG_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit f677b099246943d78b723cbe75d1ba53d064f205 (read via git show at pin)
BINDING:      CANDIDATE_HEAD 63fdd2d507357861aec582b980006baa7d7045a4 — this verdict binds to exactly this commit
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS   (deterministic mapping per the committed handoff)
CANDIDATE_PUSH: eligible by the ADVISOR after publication of this review (Reviewer pushes nothing; no later review started)
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `f677b099` | exists; handoff read at pin; foundation-docs worktree HEAD = `f677b099`, clean | ✅ |
| Base / parent | `c6e793d3` (WU-F PASS head, pushed) | `HEAD~1` = exact; **single additive commit**; `ls-remote` = `c6e793d3`; ahead 1/0; candidate NOT pushed | ✅ |
| CANDIDATE_HEAD | `63fdd2d5` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Foundation snapshot lane | `73ff0036` untouched | HEAD exact, porcelain 0 before and after review | ✅ |
| Path boundary | exactly 4 additive files | `git diff --name-status` = 4 × `A` (+984/−0): reversal harness, vitest, dbtest, sandbox vitest; zero existing-file modification (WU-F/WU-B/WU-E untouched) | ✅ |
| Worker evidence | commit `9d4280cb` → 90_RESULT+POINTER | adds exactly those two; read at pin (claims) | ✅ |
| Implementation handoff | commit `e003d41b` | adds exactly the 90_ handoff | ✅ |
| WU-F review pin | `dc4ebaf5` PASS | consistent with my own 81_ verdict chain | ✅ |
| Design pins | `a1ac8016` / `daacd8a6` PASS | consistent with 31_ (sha256-verified then) | ✅ |

## 1. Determinations

### A. Separate captured-order prerequisite and composition fidelity — SATISFIED

`setupCapturedOrder` runs the **actual reviewed WU-F `runGoldenOrder`** on a fresh `GoldenWorld` with the caller's distinct payment key and admits reversal only at `reachedStep ≥ 8` with a real paid order, succeeded capture, committed reservation, and paid history extracted from durable world state — an absent, failed, mismatched, partial, or pre-capture transaction cannot enter the reversal (fail categories at step 1). The harness then invokes the **actual reviewed** `refundFullCapture` (WU-B) and `finalizeRefundToOrder` (WU-E) services — policy/validation/state semantics are not reimplemented. The load-bearing WU-G `reversalOrderRepo.finalizeRefund` mirror was compared **branch-for-branch** against the reviewed WU-E `repository.finalizeRefund`: identical check order and tuples — succeeded capture by id+order+type+status; Refund by idempotency-key+order; capture-link/amount/KRW/full-amount equality; non-`refunded` durable status ⇒ `hold` + `refund_hold` reconciliation; missing order ⇒ `refund_not_complete`; `refunded` ⇒ `idempotent` only with a refunded history row else `hold`; non-`paid` ⇒ `state_conflict`; exact bidirectional committed-coverage gate (same no-contaminant/no-extra/aggregate semantics as WU-E's `committedCoverageExact`); audit-failure ⇒ `error` with **no durable mutation** (the mirror checks before mutating; the SQL original mutates-then-rolls-back — observably identical); then order→refunded + one history + audit. **Faithful test-port mirror, not a competing truth or semantic shortcut**; `bindCapturedOrder` and both projection reads delegate to the reviewed WU-F world unchanged (object spread of the base repo).

### B. WU-B full-refund / provider truth — SATISFIED

The harness exercises the reviewed full-only path: one exact captured amount/KRW/order/capture-transaction/paymentKey; the reviewed adapter structurally cannot send `cancelAmount` (verified at the WU-B gate and unchanged here); no void, alternate provider, webhook/client truth, retry loop, or second call exists. Durable refund success requires `CANCELED` + zero balance + exact paymentKey + a distinct non-blank cancel reference (the deterministic cancel double scripts complete/partial/missing-ref/wrong-key/unknown/timeout/provider-error, and each non-complete script lands in the reviewed `confirming`/HOLD + reconciliation path — the provider-success-then-internal-write-failure case is separately proven: `recordConfirmedRefund` failure ⇒ `confirming`, refund stays un-refunded, reconciliation opened, never false completion or false terminal failure). Provider idempotency derives from the durable internal refund identity (reviewed `tk1` derivation, unchanged), and **replay returns before provider I/O** — measured `secondProviderCancelCalls === 0` with `idempotent_existing`. One active/full refund per capture holds through the reviewed world rules; the replay effect-delta across refund truth/orders/history/inventory/reconciliation is asserted zero.

### C. Step-up, finalization, inventory, projections — SATISFIED

Runtime default is the deny-all `unconfiguredStepUpVerifier` — proven for **both** privileged transitions (WU-B authorization adapter and WU-E finalization) with zero provider/product mutation on denial. Test-only grants are exactly bound (action/ref/role/order-scope/reason/freshness) and **two distinct single-use freshness references** are used for the two transitions (`freshB` ≠ `freshE`; replay uses fresh values while a consumed freshness is denied `stale_or_replayed` — tested). WU-E re-reads exact durable full-refund truth before projecting one refunded order/history/audit outcome; finalizing before a durable refund exists ⇒ `refund_not_complete` with the order staying paid. Inventory is committed before and after the refund — step 9 asserts exactly one committed reservation and zero released/expired rows, and a dedicated test proves no stock/return/restock is minted; incoherence HOLDs (mirror coverage gate). Customer and operator projections agree (`ORDER_REFUNDED` / `refunded`); a fresh order-service over the already-refunded durable world re-finalizes idempotently (restart-safety).

### D. Evidence separation, claim ceiling, leakage — SATISFIED

The deterministic double is never presented as official proof (layer field; the transport is a local script double that never opens a socket). The official sandbox block is default-fail-closed behind the full gate — ready WU-F transport (one-shot flag + non-blank non-live TEST secret) **plus** synthetic-identity, no-live, no-PII, the explicit **`O1_TOSS_REVERSAL_CAPTURED` separate-captured affirmation** (structurally excluding a pre-capture void), a reversal payment key, and a finite amount — under `describe.skipIf`; it **reuses the reviewed WU-F sandbox transport imported unchanged** (asserted by test, including `not_ready` without the gate) and never manufactures or reuses a capture. Reproduced with the gate provably closed (0 `O1_TOSS_*` variables): 1 passed / 1 skipped, **zero network**; official evidence remains `NOT_RUN_CREDENTIAL_GATE`. The evidence DTO is categories/counts/booleans only and carries every required flag — `notLiveSaleEvidence: true`, `realPayment: "NO"`, `realCustomerPii: "NO"`, `production: "NO"`, plus `partialRefund: "NO"` and `autoStockRestoration: "NO"`; leak attacks assert happy **and** failed serializations contain no payment key/order number/refund reference/freshness/world id; harness sweeps: 0 `console.*`/`process.env`/`fetch(`; 0 console additions in the delta. The claim ceiling is one bounded non-production walking-skeleton reversal — nothing more is claimed.

### E. Disposable PostgreSQL proof and parity limit — SATISFIED (bounded residual)

The dbtest (13 checks, reproduced) reuses the proven containment (already-local image, no pull, tmpfs, no host port, synthetic rows/credentials, blocking `finally` cleanup with absence verification, exact committed WU-0+WU-E migrations) and directly proves captured order → durable full refund → refunded order with exact bindings, committed/HOLD inventory, history/audit, replay zero effect, and failure/reconciliation branches at the SQL layer. The twin is treated as independent evidence; the generated-Prisma-client split remains the **same bounded residual** verified at every prior gate (the WU-G files are pure, no `@/lib/prisma` import, executed by vitest) — not blocking.

### F. Reproduction and containment

```text
PRE:  HEAD 63fdd2d5 porcelain 0 · docker containers 1 · O1_TOSS_* env vars: 0 (gate closed)
RUN1: vitest run scripts/o1_golden_reversal.vitest.ts → 22 passed / 0 failed
RUN2: python3 scripts/o1_golden_reversal.dbtest.py → 13 passed / 0 failed · exit 0 · cleanup removed=True absent=True · git post 0 changed paths
RUN3: vitest run → 22 files, 529 passed | 2 skipped (531)   (the 2 skips are the WU-F and WU-G official credential-gated blocks — honest NOT_RUN)
RUN4: vitest run scripts/o1_golden_reversal.sandbox.vitest.ts → 1 passed | 1 skipped · default fail-closed · ZERO network
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · FOUNDATION 73ff0036 unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All Worker-claimed counts reproduce exactly. `tsc`/build remain honestly NOT_RUN under the unchanged generation blocker — bounded residual, not blocking.

## 2. Findings

**Blocking/required: NONE.**

Observations (non-blocking):
- **[O-G1]** The WU-G finalizeRefund mirror is another twin encoding of the reviewed WU-E repository; fidelity was verified branch-for-branch at this candidate (the audit-failure check runs pre-mutation instead of mutate-then-rollback — observably identical); keep parity discipline on any future change.
- **[O-G2]** The deterministic cancel double returns a constant `orderId` field (`"cancel_ono"`) in the cancel view — unread by the reviewed refund path, which binds by paymentKey + complete-reversal + distinct ref (order binding was established at capture time); consistent with reviewed WU-B semantics.
- **[O-G3]** `tsc`/build deploy-time residual unchanged (consistent posture across the mission).

## 3. Excluded scope

No patch/stage/commit/push/dispatch/credential request/risk acceptance; no provider contact (gate provably closed); no real DB/PII/payment; no integrated/next review started; Foundation lane read-only and proven unchanged.

## 4. Verdict rationale

WU-G is exactly the frozen subject: a script-only captured-payment full-reversal rehearsal that must — and does — start from a fresh reviewed Golden Order with a real capture, drives the actual reviewed WU-B full-only refund and WU-E finalization services through a branch-for-branch faithful repository mirror, keeps runtime authorization deny-all with exactly-bound single-use test grants, holds inventory committed with restoration structurally absent, proves replay produces zero second provider or economic effect, separates its two evidence layers honestly with the official layer fail-closed behind a separate-captured affirmation and truthfully `NOT_RUN_CREDENTIAL_GATE`, serializes only category-safe evidence carrying every required non-claim flag, and lands entirely inside four additive script files with zero activation, zero leakage, and every count reproduced under a provably closed gate. No load-bearing invariant is unconnected, contradicted, or asserted only by a test name. **ROLE_VERDICT: PASS.**

```text
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS
BINDING: candidate 63fdd2d507357861aec582b980006baa7d7045a4 only
BLOCKING_FINDINGS: NONE · OBSERVATIONS: O-G1..O-G3 (non-blocking)
WU-G_CANDIDATE: 63fdd2d5 (base c6e793d3 + 1 additive commit; NOT pushed) — push eligible by ADVISOR after publication; official sandbox reversal remains NOT_RUN_CREDENTIAL_GATE pending Leo's console/environment process (a separate captured sandbox payment); integrated review / mission closure routing remains Advisor/Leo
EVIDENCE_LEDGER: focused 22/22 + full 529/529(+2 honest skips) + sandbox-gate 1/1(+1 skip, zero network) (reproduced) · db-touch 13/13 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; product + Foundation states byte-identical pre/post)
RETURN_TO: foundation-advisor
STOP
```
