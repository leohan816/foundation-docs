# Worker Result — V3-11C2 Organic RecOutcomeEvent MVI

> Actor: Worker (fable-builder) · Project: Cosmile · Date: 2026-07-09 · Return to: Advisor.
> This is a Worker implementation result, not final approval. Runtime changes are uncommitted.
> Source brief: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
> Gate/plan: `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`

## 1. Branch / commit
- Branch: `shadow/m4-cosmile-memory` (verified via `git branch --show-current`; not main/prod — gate passed). HEAD before work: `591e206`.
- **NOT committed.** The Worker brief did not request commit/push; runtime left staged-free for Advisor orchestration.

## 2. Files changed (all within Allowed Files; no forbidden path touched)
| File | Change |
|---|---|
| `app/src/lib/ids.ts` | +6 lines — added `recOutcomeEventId()` + `REC_OUTCOME_ID_RE` |
| `app/src/lib/recOutcomeEventService.ts` | **new** — flag-gated organic outcome service |
| `app/src/app/api/checkout/mock-complete/route.ts` | +8 lines — paid-hook call (purchase_complete untouched) |
| `app/scripts/v3_11c2_rec_outcome.vitest.ts` | **new** — 13 provider-independent tests |

`git diff --stat`: 2 tracked files (+14), 2 new untracked. Optional `dbtest.py` **not** created (see §11).

## 3. Behavior implemented
On `mock-complete`, after `completeMockOrder` returns `justPaid=true`, `trackOrderOutcomeOnPaid` iterates `order.items` and emits **one organic `RecOutcomeEvent` per `OrderItem`**: `recommendationId=null`, `attributionMode="organic"`, `id=recOutcomeEventId()` (`rec_out_v3_`+ULID(26), distinct from `rec_v3_`), `subjectRef`/`anonymousRef` XOR-minted from `ids.ts`, `orderId`/`orderItemId`/`productId`/`skuId` from the paid line. No refund fields. Identity is server-derived (`getShopper()`); ID/subject/anon reuse `ids.ts` generators (no hand-rolling, no reinvention). `AttributionMode` type imported from `types/recOutcome.ts`.

## 4. Feature flag
- `COSMILE_REC_OUTCOME_ENABLED`, **default OFF** (writes only when `=== "1"`). OFF → returns `skipped:"flag_off"`, **no create and no find** (verified TC2/TC10c). Separate from `COSMILE_REC_EVENT_ENABLED`.

## 5. Idempotency
- Code-level existing-check by `orderItemId` (`findFirst` → skip `duplicate`); **no unique index / no schema change** (deferred to later schema gate per D-O1). Double protection: route-level `justPaid` dedupe (`completeMockOrder` returns `justPaid=false` on re-call) + service existing-check (verified TC7). Residual concurrency note in §11.

## 6. Fail-open
- Service **never throws to checkout**: mint + existing-check + create are all inside one `try/catch` → any failure (incl. `ids.ts` prod fail-closed secret throw) returns observable `error:"write_failed"`, never propagates (verified TC8 for both create-throw and exists-throw). Route discards results except a **counts-only** `console.warn` on error (no ids/PII). Checkout response shape and `purchase_complete` are unaffected.

## 7. Test commands & results
```
npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts   → 13 passed
npx vitest run scripts/v3_11c_rec_event.vitest.ts      → 10 passed (regression intact)
npx tsc --noEmit    → my 4 files: 0 errors
npx eslint <my 4 files>   → 0 problems
npm run lint (full) → 25 pre-existing problems, NONE in my files (see §11)
```
All 10 required cases covered (TC1–TC10; TC5/6/8/10 have sub-cases → 13 assertions total).

## 8. Schema/migrations confirmation
- **Not modified.** `prisma/schema.prisma` and `prisma/migrations/**` untouched (confirmed by `git status`). Write targets the existing V3-11B `RecOutcomeEvent` model/delegate; DB CHECKs (attrMode∈5값 / XOR / R-K2 organic→recId null / FK) are satisfied by the organic+null shape.

## 9. SIASIU / foundation-control confirmation
- **Not modified.** No edits outside `../Cosmile/app`; `../SIASIU/**`, `../foundation-control/**`, `src/adapters/**`, `src/lib/foundation/**` untouched.

## 10. Excluded scope confirmation
- **Not implemented:** direct attribution, session attribution, refund/cancel outcome, reorder/repurchase, semantic feedback, V3-11D, `RecOutcomeFeedback`, `MemoryFactCandidate`/LTM promotion. No raw-text classification. Organic MVI only.

## 11. Residual risks / skipped tests
- **Both userId+guestId present → `xor_violation` (no write)** per approved brief (test 5). Consequence: a guest-then-login order with both refs records **no** outcome. This is the approved strict-XOR behavior (earlier sentinel note preferred subjectRef-precedence; the brief chose strict reject — Worker followed the brief). Flagged for Advisor visibility.
- **Concurrency:** code-level existing-check is not race-safe (no unique index); simultaneous duplicate `mock-complete` calls could double-write. Acceptable pre-live (flag OFF); **unique index required before flag-ON/live** (D-O1 deferred, as approved).
- **Group-buy paid path not hooked:** `group-deal/team/[teamId]/mock-complete` produces paid Orders but is out of this MVI's single hook — group-buy conversions won't get outcomes. Not in brief scope; surfaced for Advisor (matches prior sentinel finding).
- **No live DB insert evidence:** optional `dbtest.py` intentionally skipped (avoids DB-connection risk; write shape proven via DI, DB CHECKs enforced by existing V3-11B migration).
- **Pre-existing repo debt (not mine):** full `npm run lint` = 25 problems and `tsc` = 7 errors, all in untouched files (`src/lib/slice/cartStore.tsx`, `CartList`, `console/**`, `scripts/foundation-memory-deanon.vitest.ts`, etc.). The 4 Worker files are tsc- and lint-clean.

**Proven:** flag-OFF inertness, organic write shape, XOR handling, idempotency skip, fail-open observability, per-line fan-out, justPaid gating, purchase_complete preservation — all at the service boundary via DI.
**Not proven:** live DB insert, concurrent-write dedupe, runtime flag-ON emit.
