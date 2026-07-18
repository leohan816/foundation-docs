# 42 — Cosmile WU-C Correction Cycle 1 Result (WUC-F1)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-C-CORRECTION-1
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session; dispatcher-confirmed; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (reconfirmed loaded before edits)
HANDOFF:      advisor/jobs/.../handoffs/42_COSMILE_WUC_CORRECTION_1_HANDOFF.md @ 2cdc8c7947a503ab0298c387a03a04bb88a9fb32 (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one additive correction commit · focused 40/40 · full suite 279/279 · READY_FOR_DELTA_RE_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before any edit (first-hand, local-only — no network)

| Gate | Required | Observed | Result |
|---|---|---|---|
| Correction handoff | `42_…@2cdc8c79` | FDOCS HEAD == `2cdc8c79`; committed ("dispatch WU-C correction 1"); working-tree == committed | ✅ |
| Repository / branch | exact worktree + mission branch | exact | ✅ |
| EXPECTED_HEAD / parent | `84370e86…`, parent `e1dc39e6…` | HEAD == `84370e86…`; `HEAD~1` == `e1dc39e6…` | ✅ |
| Upstream / ahead-behind | `origin/…` head `e1dc39e6`; `1_0` | upstream == `e1dc39e6`; 0 behind / 1 ahead; not pushed | ✅ |
| Worktree clean | CLEAN | clean pre-edit | ✅ |
| Review artifact | commit `c68410a6`, ROLE_VERDICT NEEDS_PATCH, MISSION PASS_WITH_CORRECTIONS, finding WUC-F1 | `c68410a6` = "record WU-C implementation review"; read at pin; binds candidate `84370e86` only | ✅ |
| Model / Effort / Skill | Opus 4.8 (1M) / max / /fable-builder | verified / carried-forward / reconfirmed | ✅ / ⚠️ recorded / ✅ |

## 1. WUC-F1 — deterministic identifier upper bound

**Finding (review §3, LOW):** identifiers were validated non-empty only (`isNonEmptyString`, `service.ts:26-28`),
so `orderId`/`skuId` (reserve) and `reservationId` (transitions) had **no upper length bound**, contrary to the
40_ handoff "integer/time/**identifier** bounds enforced before persistence."

**Fix — `app/src/lib/inventory/service.ts` (only file with logic change):**
- Added `export const MAX_IDENTIFIER_CODE_POINTS = 256;` and replaced `isNonEmptyString` with
  `isBoundedIdentifier(s) = typeof s === "string" && s.length > 0 && [...s].length <= 256`.
- `[...s].length` counts **Unicode code points** (the string iterator yields code points, correctly handling
  surrogate pairs) — **not** UTF-16 code units — so the boundary is deterministic for non-ASCII input.
- Applied at the three identifier sites, **before any repository call**: `reserve` (`orderId`, `skuId`) and
  `runTransition` (`reservationId`, shared by `commit`/`release`/`expire`). Over-cap ⇒ the existing closed
  category **`invalid_input`**, zero repository write (return precedes `deps.repo.*`).
- The existing non-empty requirement is preserved; no new category; **no** normalization / rewriting / hashing /
  truncation / logging / second policy. No change to DB column types, schema, migration, SQL, repository locking,
  transition truth, restoration behavior, or result vocabulary.

**Fix — `app/scripts/o1_inventory_contract.vitest.ts` (+8 boundary tests, additive; no existing oracle changed):**
- cap constant == 256 and code-point-vs-UTF-16 sanity (`[...at].length===256`, `atEmoji.length===512`);
- **256-code-point `orderId`+`skuId` accepted** (reserve → `reserved`) — ASCII;
- **256 non-BMP code points accepted** (`😀`×256 = 512 UTF-16 units → `reserved`), proving the bound counts code
  points, not UTF-16 units;
- **257-code-point `orderId` → `invalid_input`, zero write** (`rows.size === 0`);
- **257-code-point `skuId` → `invalid_input`, zero write**;
- **257 non-BMP `orderId` → `invalid_input`** (cap rejects by code points);
- **257-code-point transition `reservationId` → `invalid_input`, repository NEVER called** (a throwing fake repo
  proves validation rejects before `applyTransition`) — for `commit`/`release`/`expire`;
- 256-code-point `reservationId` passes validation (reaches the repo → `not_found`, not `invalid_input`).

## 2. Delta / Git evidence

```text
OLD_CANDIDATE:  84370e8624c6e908da183a84b38551a6a9441527
NEW_CANDIDATE:  3ea1b211b6111678add9f0e2814c289ed96adca4  (parent = OLD; additive; no amend/rebase/squash/force)
DELTA:  git diff 84370e8..3ea1b21 = 2 files, +67 / -4 == exactly the two authorized paths:
        app/src/lib/inventory/service.ts, app/scripts/o1_inventory_contract.vitest.ts
BYTE-UNCHANGED (vs 84370e8): app/src/lib/inventory/contracts.ts · app/src/lib/inventory/repository.ts · app/scripts/o1_inventory_concurrency.dbtest.py  (git diff --quiet = clean for each)
PRE_GIT:  branch @ 84370e8 (clean; 1 ahead / 0 behind; not pushed)
POST_GIT: branch @ 3ea1b21 (clean; 2 ahead / 0 behind; NOT pushed)
```

## 3. Verification

- **focused** `o1_inventory_contract.vitest.ts` = **40 / 0** (32 prior + 8 WUC-F1). Reproduce:
  `cd app && <orig>/node_modules/.bin/vitest run scripts/o1_inventory_contract.vitest.ts`.
- **full safe Vitest suite** `vitest run` = **279 / 0** (271 prior + 8; no regression).
- **PostgreSQL concurrency + WU-0 migration rehearsals: NOT RERUN** — neither the SQL, `repository.ts`, nor
  either `*.dbtest.py` changed (byte-unchanged, §2), so this is an **evidence-preserving targeted correction**;
  the reviewed 28/28 (concurrency) and 54/54 (WU-0 migration) from candidate `84370e8`/`41_` stand unaltered.
- **build/lint/tsc: NOT_RUN** (worktree has no `node_modules`; forbidden `prisma generate` for the WU-0 client;
  `repository.ts` unchanged and never imported by the tests).
- **containment:** vitest ran via the same gitignored symlink to the original repo's already-present
  `node_modules`, removed after (absent). No install, no `.next`, no network/DB/provider/credential/PII. No
  route/checkout/payment/runtime connected (only `service.ts` logic + a test changed; the added lines import
  nothing new). Secret/PII sweep of the 2-file delta = 0.

## 4. Preserved observations (untouched this cycle)

- **O-1** dbtest `rid_of` dead helper (cosmetic; dbtest is byte-unchanged, outside this cycle's two paths).
- **O-2** dbtest fixture uses %-formatted script-internal synthetic constants (test-only; unchanged).
- **O-3** `reservedAt` provenance cosmetic difference (repo vs mirror; unchanged).
- **O-4** repeated-commit idempotency requires valid proof (stricter fail-closed reading; unchanged, and correct).

## 5. Zero unrelated change / confirmations

Only WUC-F1 was corrected. `contracts.ts`, `repository.ts`, the concurrency dbtest, schema, migrations,
dependencies, lockfiles, routes, checkout/payment/order/runtime, and documentation are **byte-unchanged**.
Result vocabulary, repository locking, transition truth, and restoration behavior are unchanged. Checkout/
payment/runtime remain **unconnected**.

## 6. Next review question set (delta re-review, `84370e8..3ea1b21`)

1. Is the cap enforced by **code-point** length (`[...s].length`, not `s.length`) at 256 for `orderId`, `skuId`,
   and `reservationId`, **before** any repository call, returning existing `invalid_input` with zero write?
2. Do the tests prove 256 accepted (incl. a 512-UTF-16-unit non-BMP identifier) and 257 rejected for reserve
   ids and a transition id, with the repository never reached on the transition rejection?
3. Is the diff exactly the two authorized paths, with `contracts.ts`/`repository.ts`/the concurrency dbtest and
   all SQL byte-unchanged, no new category/policy, and O-1..O-4 untouched?

## 7. rollback

Revert the single correction commit `3ea1b21…` (the branch returns to the reviewed WU-C candidate `84370e8`);
nothing was pushed; no product/runtime/DB state exists.

```text
PRODUCT_CODE_CHANGED: YES (identifier bound in service.ts + its tests; two allowed paths only)
CONTRACTS/REPOSITORY/DBTEST/SCHEMA/MIGRATION/SQL/DEPENDENCY/PRISMA_CHANGED: NO (byte-unchanged)
NEW_CANDIDATE_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4  (parent 84370e86…; additive)
IMPLEMENTATION_PUSHED: NO · FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
CHECKOUT/PAYMENT/RUNTIME_CONNECTED: NO
GOOGLE/TOSS/PROVIDER/NETWORK/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
