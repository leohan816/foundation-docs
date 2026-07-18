# 63 — Cosmile WU-B Delta Review 1 (WUB-F1 + WUB-AF1/AF2/AF3 closure, `d17a0926..e1cfc4ad`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-B-CORRECTION-1-DELTA-REVIEW
REVIEW_PASS:  IMPLEMENTATION_REVIEW (DELTA_ONLY: d17a0926..e1cfc4ad + declared correction evidence + adjacent invariants)
ACTOR:        foundation-reviewer-fable5 — same Reviewer as the 61_ full review (session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max)
SKILL:        /fable-sentinel (active this session; delta-review discipline)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 63_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/63_COSMILE_WUB_DELTA_REVIEW_1_HANDOFF.md
              @ foundation-docs commit fca1cca92e288ad92805da4b78e93cbf9bdcca7b (read via git show at pin)
BINDING:      NEW_CORRECTION_HEAD e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515 — this verdict binds to exactly this commit
VERDICT:      PASS
FINDINGS:     WUB-F1, WUB-AF1, WUB-AF2, WUB-AF3 — ALL CLOSED · regression NONE · new blocking findings NONE
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `fca1cca9` | exists; handoff read at pin; foundation-docs worktree HEAD = `fca1cca9`, clean | ✅ |
| OLD_FULL_REVIEWED_HEAD / parent | `d17a0926` | `HEAD~1` = exact; **exactly one additive commit** ("fix(wu-b-corr1): close WUB-F1 + WUB-AF1/AF2/AF3 …") | ✅ |
| NEW_CORRECTION_HEAD | `e1cfc4ad` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / push | base `2733bfd6` · 2/0 · NOT_PUSHED | `ls-remote` = `2733bfd6`; 0 behind / 2 ahead | ✅ |
| Delta scope | exactly the eight WU-B paths | `git diff --name-status` = 8 × M (+588/−101); no schema/migration/client/package/route/timer/scheduler/provider/credential path; no new dependency (only `node:crypto` platform import added to tossV2) | ✅ |
| 61_ full review | committed @ `cce4bb50` | my 61_ text committed **byte-identical** (blob sha256 = disk sha256 = `d08afef6…`) | ✅ |
| 62_ correction handoff / result | @ `7ec0ebc6` / `27f2130a` | both read at pin; finding definitions and adjacent requirements extracted from the committed handoff, not the report | ✅ |

## 1. Finding-by-finding disposition (verified from the diff + reproduced evidence, not the report)

**[WUB-F1] Durable stuck-state recovery — CLOSED.**
- *Durable evidence on every non-conclusive outcome:* `confirmingWithRecovery` (service) now ensures a `capture_confirming` task for **all** ambiguous/suspicious confirm outcomes — adapter timeout/provider_error/unsupported, malformed/invalid (→`unknown`), post-2xx binding/amount mismatch (reclassified as suspicious provider response), and every still-pending or cancel-at-confirm provider state (IN_PROGRESS/READY/WAITING_FOR_DEPOSIT/CANCELED/PARTIAL_CANCELED/default). Clean DONE and conclusive ABORTED/EXPIRED are correctly **zero-task** (tested both directions).
- *Bounded restart-safe discovery:* `findStuckIntents`/`findStuckRefunds` (port + repository + plpgsql mirror) validate limit (integer 1..500) and a finite cutoff (`invalid_bounds` otherwise), select **exactly** the eligible states (`action_required|authorizing`; `requested|confirming|provider_confirmed`) older than the cutoff, return only minimum internal fields, order deterministically by `(updatedAt, id)`, **exclude null-order rows** and rows whose order already has an active matching task (`NOT EXISTS … status IN ('open','in_progress')`) — so repeated bounded passes drain new rows with **no bounded-page starvation** (dbtest: limit=1 passes drain os1→os2→nothing; vitest drain test; null-order row cannot occupy the page).
- *Active-task invariant:* `openOrReuseReconciliation` treats `open` **and** `in_progress` as active (reuse, never duplicate); a `resolved` task permits a new open (both directions dbtest-proven).
- *Pure decision:* `prepareStuckRecovery` returns **counts only** (`stuckIntents/stuckRefunds/tasksEnsured` — no IDs/SQL/hash/provider detail); `tasksEnsured` counts opened **or** reused (durably-present semantics, exactly as the handoff defines); `invalid_bounds` propagates; a failed query returns `repository_error` and **never produces false work** (tested). Deferred recovery proven: if immediate task creation fails after an ambiguous result, the durable stuck intent remains discoverable and a later pass ensures the task.

**[WUB-AF1] Deterministic provider idempotency + true zero-effect replay — CLOSED.**
- Caller-supplied provider keys are **removed from the public inputs** (`ConfirmCaptureInput`/`RefundInput` no longer carry `providerIdempotencyKey` — variation is structurally impossible). The Toss `Idempotency-Key` derives deterministically and versionedly (`tk1_<scope>_sha256(scope⟂seed)`) from values durable **before** the provider call: the persisted+claimed `PaymentIntent.id` for confirm; the durably created `Refund.idempotencyKey` for full cancel. Internal vs provider key concepts remain distinct; the derived key is bounded well within Toss limits and is never logged/emitted (0 `console.*`; no-leak oracles retained).
- A durably **captured** intent replay returns the existing verified-capture proof with **zero further provider requests**, via the new closed claim result `already_captured` (repository splits `captured`→`already_captured|conflict` from `authorizing`→`claimed|conflict`); proven by transport call-count assertions (vitest) and the dbtest claim matrix. An `authorizing` retry contacts Toss only with the same bound paymentKey and the byte-identical derived header — proven even when the caller **varies** `captureIdempotencyKey` across retries, plus the caller-cannot-steer negative. Refund retries from `requested`/`confirming` reuse the same derived key by construction.

**[WUB-AF2] Repository capture requires the claimed paymentKey — CLOSED.** `recordVerifiedCapture` loads `providerIntentRef` with the intent row and requires `providerIntentRef !== null && === input.providerTxnRef` **before any insert or idempotent result** — a null/different reference is `conflict` with zero write, **including direct repository calls that bypass the pure service** (vitest direct-bypass test; dbtest: unclaimed ref → conflict + row-count unchanged; claimed ref + different internal key → `already_captured`). The plpgsql mirror carries the identical rule (parity maintained).

**[WUB-AF3] Webhook pull-verification binds durable internal state — CLOSED.** `serverVerifyWebhook` now takes only `{providerEventId, intentId}`; every caller-supplied tuple value is gone. It reads the durable `PaymentIntent`/`Order` binding through the repository (`getIntentById` now returns `providerIntentRef`), requires a claimed bounded paymentKey, an explicitly allowed current state (`authorizing|captured`), and a well-formed internal `{orderNo, amount, KRW}` before querying Toss **by the durable key**, then compares provider truth to the **internal** binding. Missing/stale/unclaimed/wrong-state/malformed-internal/repo-read-failure → `unresolved`; mismatch → quarantine **claimed only if persisted**; verified **claimed only if the terminal inbox state persisted** (`markInboxQuietly` gates both; catch ⇒ false). Notification stays untrusted; digest-only persistence unchanged. All directions tested, including the no-false-verify-on-non-received-inbox case.

**Adjacent 62_ requirements — all verified:** exact `tasksEnsured` semantics ✓; all non-conclusive provider states ensure recovery ✓; open/reuse failure recovery via deferred discoverability ✓; deterministic `(updatedAt,id)` ordering ✓; no new route/timer/scheduler/runtime/provider/credential/schema/migration surface ✓ (delta confined to the eight paths; zero activation imports unchanged).

## 2. Regression scan

Existing money-safety invariants from 61_ are preserved: claim-before-provider-effect, triple tuple verification, ABORTED/EXPIRED-only conclusive non-capture, full-only refund with persistence-gated success, digest-only webhook inbox, monotonic inbox states, immutable transactions, closed categories, zero leakage (0 `console.*` added; no `process.env`/`fetch`). Interface-following test updates (removal of the caller provider-key argument) are authorized by the 62_ handoff ("tests may be strengthened or expanded only to prove these exact findings"); no oracle was weakened — the full suite grew 373→390 with all prior behavior green. WU-C/WU-D/WU-A surfaces untouched (delta path set). One behavior refinement is a strict **strengthening**: post-2xx mismatch and still-pending states now also leave durable evidence (previous outcomes preserved, evidence added).

## 3. Reproduction (authorized commands; exact counts)

```text
PRE:  HEAD e1cfc4ad porcelain 0 · docker containers 1 · 0 console.* added in delta
RUN1: vitest run <adapter> <contract> → 57 passed / 0 failed   (40 prior + 17)
RUN2: vitest run → 390 passed / 0 failed   (373 prior + 17; no regression)
RUN3: python3 scripts/o1_payment_repository.dbtest.py → 53 passed / 0 failed · exit 0 · cleanup removed=True absent=True
RUN4: python3 scripts/o1_inventory_concurrency.dbtest.py → 28 passed / 0 failed · cleanup verified
RUN5: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · cleanup verified
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All five expected counts (57/390/53/28/54) reproduce exactly. Typecheck/build remain honestly NOT_RUN under the unchanged, verified Prisma-generation blocker (deploy-time residual; mirror-proven transactions; schema-verified columns — `providerIntentRef` exists on `PaymentIntent` per WU-0).

## 4. Residual unknowns (unchanged claim ceiling)

O-B1..O-B4 from 61_ persist as declared (uncompiled repository deploy gate; cancel-ref shape fail-closed dependency; WU-E-owned authorization policy; claim-to-confirm expiry window). No new residual was introduced by this delta; O-B5 is resolved by WUB-F1's evidence fix; O-B6 unchanged (bounded).

## 5. Verdict rationale

All four findings are closed by exactly the mechanisms the correction handoff required, each verified in the diff and proven by mutation-sensitive oracles — durable recovery evidence on every non-conclusive money path with a bounded, starvation-free, restart-safe discovery surface; structurally caller-proof deterministic provider idempotency with zero-request captured replay; the claimed-paymentKey invariant enforced at the repository boundary itself; and webhook verification bound solely to durable internal truth with persistence-gated claims. The delta is exactly the eight authorized paths, additive, with no regression and all expected evidence reproduced exactly. **VERDICT: PASS** — per the committed handoff, the Advisor may push the WU-B candidate and dispatch WU-E only after publication of this review; the Reviewer pushes nothing and starts nothing.

```text
VERDICT: PASS
BINDING: candidate e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515 only
ITEM_VERDICTS: WUB-F1 CLOSED · WUB-AF1 CLOSED · WUB-AF2 CLOSED · WUB-AF3 CLOSED · adjacent requirements ALL VERIFIED · regression NONE
OPEN_FINDINGS_AGAINST_WU-B: NONE
WU-B_CANDIDATE: e1cfc4ad (base 2733bfd6 + WU-B + correction; both commits NOT pushed) — push/WU-E dispatch eligible by ADVISOR after publication per the committed handoff
EVIDENCE_LEDGER: pure 57/57 + suite 390/390 (reproduced) · db-touch 53/53 + WU-C 28/28 + WU-0 54/54 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; post-review product state == pre-review state)
RETURN_TO: foundation-advisor
NEXT_WORKUNIT_AUTO_START: NO
STOP
```
