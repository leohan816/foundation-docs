# 65 — Cosmile WU-B Delta Review 2 (WUB-AF4 closure, `e1cfc4ad..b3448894`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-B-CORRECTION-2-DELTA-REVIEW
REVIEW_PASS:  IMPLEMENTATION_REVIEW (DELTA_ONLY: e1cfc4ad..b3448894 · finding WUB-AF4 + adjacent invariants)
ACTOR:        foundation-reviewer-fable5 — same Reviewer as the WU-B full review (61_) and delta review 1 (63_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max; session 1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active this session; delta-review discipline)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 65_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/65_COSMILE_WUB_DELTA_REVIEW_2_HANDOFF.md
              @ foundation-docs commit d030db45fa08107bff04bb77693619f2bc8c9200 (read via git show at pin)
BINDING:      NEW_CANDIDATE_HEAD b344889428971f6baa7208ea3e76858de0c9fc8b — this verdict binds to exactly this commit
VERDICT:      PASS
FINDING:      WUB-AF4 CLOSED · regression NONE · new blocking findings NONE
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `d030db45` | exists; handoff read at pin; foundation-docs worktree HEAD = `d030db45`, clean | ✅ |
| OLD_REVIEWED_PASS_HEAD / parent | `e1cfc4ad` | `HEAD~1` = exact; **exactly one additive commit** ("fix(wu-b-corr2): close WUB-AF4 — complete order-line reservation set before any payment effect"); no amend/rebase/squash (old head is the parent and is now the pushed upstream) | ✅ |
| NEW_CANDIDATE_HEAD | `b3448894` | `git rev-parse HEAD` = exact; CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / push | ahead 1/0 · candidate WITHHELD | `ls-remote` = `e1cfc4ad` (correction-1 head pushed per the 63_ PASS routing); 0 behind / 1 ahead; new candidate not pushed | ✅ |
| Delta scope | exactly 4 paths | `git diff --name-status` = payment `contracts.ts` + `repository.ts` + the two test files (+231/−55); `service.ts`/`tossV2.ts`/`webhook.ts`, schema/migration, routes, order lifecycle, and all unrelated surfaces byte-unchanged | ✅ |
| 64_ evidence | commit `c255e3e` → 64_RESULT+POINTER | adds exactly those two; read at pin (claims) | ✅ |

## 1. Required checks (handoff items 1–15, one by one)

**(1)** One additive commit, parent = old reviewed PASS head; no history rewrite. ✅
**(2)** Diff = exactly the four listed paths; payment service/adapter/webhook and all excluded surfaces unchanged. ✅
**(3–7) Coverage semantics — verified in the single parameterized gate `orderFullyReserved(runner, orderId)` (`repository.ts`), used identically by all call sites:** the order must have ≥1 `OrderItem` (empty/missing order ⇒ incomplete); no line may have a null `skuId` or `quantity <= 0`; required quantities are **aggregated per SKU** (`GROUP BY skuId SUM(quantity)` — duplicate lines require the aggregate); every required SKU must be **exactly** covered by live `reserved` inventory (`status='reserved' AND expiresAt > now()` — committed/released/expired never count) with `COALESCE(res,0) <> req` failing both under- **and** over-coverage; and the join is **anchored on the required set** (LEFT JOIN from required→reserved), so an extra reserved SKU not on any order line can never compensate for a missing/under-covered required SKU. Every one of these directions has a named negative in both the FakeRepo vitest matrix (partial/under/over/expired/null-sku/committed/released/extra-only/qty≤0/empty-order) and the plpgsql dbtest matrix (incl. aggregate 2+3-covered-by-5 exact vs 2+3-covered-by-2 under). ✅
**(8)** The authoritative gate runs **inside both locked transactions**: `createActionableIntent` (before the Order-tuple check and intent insert) and `claimIntentForConfirm` (fresh claim before the authorizing UPDATE, **and** the `authorizing` same-key retry re-checks coverage before returning `claimed` — i.e. immediately before any provider re-contact). `activeReservationFor` is demoted to an explicitly non-authoritative diagnostic returning `{complete}`. ✅
**(9)** Coverage lost after intent creation ⇒ claim returns `reservation_required` with zero provider calls and zero state advance — dbtest proves the intent **stays `action_required`**; the vitest claim-time test asserts the transport call count. ✅
**(10)** Captured replay (WUB-AF1) is preserved: the `captured` branch deliberately performs **no reservation recheck** and returns `already_captured` ⇒ existing proof with zero provider requests — explicitly tested *even after coverage is gone*. ✅
**(11)** Earlier WU-B corrections intact: AF1 derived-key/zero-request-replay, AF2 claimed-paymentKey capture boundary, AF3 durable-binding webhook verification, server-authoritative orderNo/amount/KRW, idempotency, refund, and reconciliation logic are untouched by the diff hunks and the full suite is green. ✅
**(12)** The FakeRepo and the plpgsql `order_fully_reserved` mirror encode the same rule (side-by-side comparison: same anchoring, same exactness, same TTL/status filters); test changes are additive plus the interface-following `ReservationSnapshot {status}→{complete}` update; no prior oracle weakened (373→390→397 monotone additive). ✅
**(13)** Evidence and outcomes are category/count/boolean only; 0 `console.*` added; no secret/PII/paymentKey/provider-reference/raw-payload leakage introduced. ✅
**(14)** Disposable-PostgreSQL cleanup verified on all three runs (container removed=True, absent=True, tmpfs, no host port); host containers 1→1 with zero `*ephemeral*` leftovers. ✅
**(15)** No excluded authority used; WU-E/F/G not started (path set + no new route/timer/scheduler/provider/credential surface). ✅

## 2. Reproduction (authorized commands; exact counts)

```text
PRE:  HEAD b3448894 porcelain 0 · docker containers 1 · 0 console.* added in delta
RUN1: vitest run scripts/o1_payment_contract.vitest.ts → 51 passed / 0 failed   (44 prior + 7 WUB-AF4)
RUN1b: vitest run scripts/o1_toss_v2_adapter.vitest.ts → 13 passed / 0 failed   (unchanged)
RUN2: vitest run → 17 files, 397 passed / 0 failed   (390 prior + 7; no regression)
RUN3: python3 scripts/o1_payment_repository.dbtest.py → 71 passed / 0 failed · exit 0 · cleanup verified   (53 prior + 18 AF4)
RUN4: python3 scripts/o1_inventory_concurrency.dbtest.py → 28 passed / 0 failed · cleanup verified
RUN5: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · cleanup verified
POST: symlink removed (ABSENT) · no .next · HEAD/porcelain unchanged · containers 1 (unchanged) · 0 ephemeral leftovers
```

All Worker-claimed counts (51 / 397 / 71 / 28 / 54) reproduce exactly. Typecheck/build remain honestly NOT_RUN under the unchanged, verified Prisma-generation blocker (`repository.ts` deploy-time residual; the coverage gate is mirror-proven by RUN3 and its column names — `OrderItem.skuId/quantity/orderId` — exist in the schema).

## 3. Verdict rationale

WUB-AF4 is closed by exactly the required mechanism: one shared, parameterized, required-set-anchored exact-coverage gate over aggregated order lines and live reservations, enforced inside both locked money transactions including the authorizing-retry path, with captured replay untouched (zero-provider-call preserved), the diagnostic surface honestly demoted, and a complete positive/adjacent-negative matrix in both the pure and DB-mirror encodings. The delta is exactly the four authorized paths, additive on the pushed correction-1 head, with no regression across the entire WU-B invariant set and every count reproduced. **VERDICT: PASS.** Push routing for `b3448894` belongs to the Advisor after publication; the Reviewer pushes and starts nothing.

```text
VERDICT: PASS
BINDING: candidate b344889428971f6baa7208ea3e76858de0c9fc8b only
ITEM_VERDICTS: checks 1–15 ALL SATISFIED · WUB-AF4 CLOSED · regression NONE
OPEN_FINDINGS_AGAINST_WU-B: NONE
WU-B_CANDIDATE: b3448894 (upstream e1cfc4ad + 1 additive correction commit; NOT pushed) — push routing is Advisor's after publication
EVIDENCE_LEDGER: contract 51/51 + adapter 13/13 + suite 397/397 (reproduced) · db-touch 71/71 + WU-C 28/28 + WU-0 54/54 (reproduced, cleanup proven)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push; post-review product state == pre-review state)
RETURN_TO: foundation-advisor
STOP
```
