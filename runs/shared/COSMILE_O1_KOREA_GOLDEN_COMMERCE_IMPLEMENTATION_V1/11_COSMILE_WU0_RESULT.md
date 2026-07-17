# 11 — Cosmile WU-0 Result (Additive Golden-Commerce Schema Baseline)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-0
ACTOR:        cosmile (Cosmile repository-owner Worker)
SESSION:      cosmile
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (gate accepted PASS by dispatcher; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (loaded before product work; anchor-first / mapping-before-code / test-before-code / declare-don't-deviate / proven-vs-not-proven applied)
JOB_COMMIT:   1a28283254aa901c3b7eafa0772bb4d99ada0ea1 (committed handoff 11_COSMILE_WU0_SCHEMA_HANDOFF.md, live-verified)
STATUS:       COMPLETE — one local candidate commit · rehearsal PASS · READY_FOR_INDEPENDENT_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Session gate verification (live, first-hand)

| Gate | Required | Observed | Result |
|---|---|---|---|
| Model | Opus 4.8 (1M) | `claude-opus-4-8[1m]` | ✅ |
| Repository worktree | `…/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1` | exact | ✅ |
| Role | Cosmile repository-owner Worker | this dispatched session | ✅ |
| Branch | `implementation/cosmile-o1-korea-golden-commerce-v1-20260717` | exact | ✅ |
| START_HEAD | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` | exact (pre-work) | ✅ |
| Clean state | clean | clean pre-work | ✅ |
| JOB_COMMIT | `1a28283254aa…` | foundation-docs worktree HEAD + handoff commit match | ✅ |
| Upstream | MAY_BE_UNSET | unset (candidate stays local) | ✅ |
| Sync OFF | — | no hook / no sync env / no auto-mirror; foundation-docs not committed by this session | ✅ |
| Effort | max | dispatcher accepted PASS; persisted default = `xhigh`; live effort not self-introspectable | ⚠️ recorded |

## 1. 구현 범위 (scope delivered)

Reviewed WU-0 additive schema baseline + disposable migration rehearsal (contract: `60_ §10`, `80_ §6/§9`,
handoff "Authorized implementation"). Delivered: 13 new Cosmile-owned entities, 2 additive nullable extensions
to existing tables, all reviewed unique/partial-unique/CHECK/append-only/default-deny invariants in migration
SQL, an idempotent deterministic `Order.order_no` backfill for existing rows, a fail-closed non-destructive
`down.sql`, and a forward→down→forward disposable-PostgreSQL rehearsal. **Not** delivered by design (deferred):
runtime routes/services/UI, provider calls, feature activation, reserve/commit/release logic + cross-row
oversell aggregate (WU-C), PSP/webhook runtime (WU-B), OIDC mint (WU-A), catalog/snapshot content (WU-D),
lifecycle normalization + new-order `order_no` mint (WU-E) — all flags remain OFF/default-deny.

## 2. 수정 파일 (files; candidate commit `c559e7cd132e7b837dc38d01395f790499abb70d`, +1080/-0)

1. `app/prisma/schema.prisma` — 13 new models + `Order.orderNo?@unique` + `OrderItem.foundationSnapshotRef?` FK + virtual back-relations (Prisma-expressible facts only).
2. `app/prisma/migrations/20260717180000_o1_golden_commerce_baseline/migration.sql` — additive DDL; fail-closed preflight; CHECK/format/XOR; partial-unique; deterministic idempotent backfill; indexes.
3. `app/prisma/migrations/20260717180000_o1_golden_commerce_baseline/down.sql` — fail-closed, non-destructive rollback (aborts if any new table holds a row).
4. `app/scripts/o1_golden_commerce_migration.dbtest.py` — disposable-DB rehearsal harness (docker-exec, tmpfs, no host port, counts/booleans-only).
5. `app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md` — WU-0 design doc + contract-to-code mapping (written before schema/code).
6. `app/docs/FEATURE_INDEX.md` — one index line for the WU-0 baseline + rehearsal command.

## 3. 수정하지 않은 파일 (diff-scope declaration)

Staged set = **exactly the six allowed paths** (verified `git diff --cached --name-only | wc -l = 6`; nothing
else modified/untracked). No existing migration, no `checkout.ts`/`adminWrite.ts`/runtime, no test other than the
new dbtest, no `.env*`, no seed/data, no Foundation/SIASIU file. `CommerceSku.stock` semantics unchanged.

## 4. 계약 매핑 (contract-to-code mapping)

Full mapping table in `app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md §6` — every contract
field has a DB landing + a named rehearsal assertion; **no blank rows**. Key-tracing: `order_no` (mint→column
→unique), `foundation_product_id ↔ cosmile_sku_id` (unique on `cosmileSkuId`, injective), `orderItemId` /
`captureTransactionId` propagate by FK columns present in the child tables.

## 5. 계약 이탈 / placement declarations (no silent deviation)

None changes a contract value, owner, or invariant; each is an invariant-**placement** decision within the
design's own WU split, surfaced for the Reviewer (design §4.3/§4.4/§9):

1. **Oversell `reserved+committed ≤ stock`** is landed as reservation schema + row-level default-deny CHECKs +
   an anti-double-reserve partial-unique. The cross-row aggregate guarantee is the **WU-C** reserve-time atomic
   conditional UPDATE, because a row-level CHECK cannot express a cross-row aggregate and `60_ §10.2` forbids
   changing `CommerceSku` stock semantics / adds no counter entity. **No aggregate table CHECK is faked.**
2. **Append-only** (`OrderStatusHistory`, `PaymentTransaction`) is enforced **structurally** (monotonic
   `@@unique(orderId,seq)` / immutable no-`updatedAt` rows), matching `CommerceEvidenceRecord`; **no trigger or
   GRANT revoke** is introduced (neither exists anywhere in this repo).
3. **`OrderStatusHistory.toStatus` and `ReconciliationTask.taskType` are free-TEXT** (no enum CHECK) to avoid
   freezing a lifecycle/category enum WU-E normalizes (watch-1 discipline).
4. **`Order.orderNo` has no format CHECK**; scheme (UUID/ULID) is a deferred Leo decision (`80_ §15`).
5. **`FoundationProductSnapshot` stores pin/identity only** (7-field superset + sha256), no content blob
   (content materialization = WU-D; keeps WU-0 minimization-safe).

## 6. 테스트 결과 (labeled per TEST_MEANING_POLICY)

- **pure (provider-independent):** none authored (WU-0 is DDL; no app logic added).
- **db-touch (disposable `postgres:16-alpine`):** `o1_golden_commerce_migration.dbtest.py` = **54 passed / 0
  failed**. Reproduce: `cd app && python3 scripts/o1_golden_commerce_migration.dbtest.py` (needs docker + the
  already-local image). Every uniqueness / partial-unique / CHECK / FK / append-only assertion is a
  **bidirectional oracle** (the illegal case named in the contract is rejected AND the legal case accepted):
  one-succeeded-capture-per-order (reject 2nd succeeded, accept failed, accept other order), one-active-refund-
  per-capture (reject 2nd active, accept after failing first), anti-double-reserve (reject 2nd active, accept
  after release), `currency=KRW` (reject USD), sha256 hex-64 (reject non-hex), SkuBinding injectivity (reject
  2nd binding same SKU), `ON DELETE RESTRICT` (referenced snapshot undeletable), deterministic+idempotent
  `order_no`, fail-closed down abort on non-pristine, down success on pristine (zero row loss), forward→down→
  forward.
- **regression (existing migration dbtests):** `wu8_commerce_evidence_delivery_migration.dbtest.py` = **28/0
  PASS** (same docker-exec harness — confirms this batch disturbed nothing). `m2_ab_migration_rehearsal` and
  `v3_11b_db_integration` = **SKIP (exit 2)** — their harness needs `psycopg2`, which is absent; per their own
  infra-gate SKIP ≠ PASS ≠ FAIL. Installing it is forbidden and out of scope; WU-0 touches none of their
  tables/migrations, so no regression is possible from this change.
- **test-diff oracle changes:** none (no existing test/expectation/fixture/snapshot weakened, skipped, or
  changed; only one new test file added).

## 7. 무엇을 증명했는가 (what is proven)

On a disposable real PostgreSQL: the migration is **strictly additive** (existing `Order`/`OrderItem`/
`CommerceSku` rows preserved through forward, down, and re-forward with zero loss); the `order_no` backfill is
**deterministic and idempotent** (identical value before/after re-run and across down→forward); **every named
reviewed invariant holds** and **rejects the specific illegal case the contract forbids**; the **down gate is
fail-closed** (aborts while any new table holds a row, leaving schema intact) and clean-reverses only when
empty; the migration is **reversible** (forward→down→forward). Container was force-removed and absence verified
(tmpfs data, no host port, no image pull, no external network, no host/shared/protected DB, synthetic rows).

## 8. 무엇을 증명하지 않았는가 (what is NOT proven)

- No runtime behavior, API, event, or UI (WU-0 is schema-only).
- **The cross-row oversell aggregate is not DB-enforced by WU-0** — it is the WU-C reserve-time atomic guard.
- Append-only is structural + app-discipline, **not** trigger-enforced against arbitrary UPDATE/DELETE.
- `prisma validate` / `prisma generate` **were not run** (Prisma CLI is not installed; dependency install is
  forbidden). Schema correctness rests on manual relation-pairing review + the SQL DDL rehearsal on real
  Postgres; no Prisma client was (re)generated or exercised.
- `m2_ab` / `v3_11b` migration regressions did not execute (psycopg2 infra-gate) — not evidence of pass.
- Provider eligibility/selection, live sellability, rights/MFDS/imagery, real payment/identity — all out of WU-0.

## 9. 남은 risk

- Schema↔migration naming consistency relies on convention (Prisma CLI not run); a future `prisma migrate`
  should be reconciled under a later authorized step (no `DATABASE_URL`/real DB was opened here).
- The `order_no` backfill scheme for **new** orders and the lifecycle enum for `toStatus` are intentionally
  deferred (WU-E) — downstream WUs must not assume WU-0 froze them.
- The WU-C oversell atomic guard is the load-bearing non-oversell control; WU-0 only lays its substrate.

## 10. 다음 검수 질문 (for the independent Reviewer — attack surface)

1. Does any WU-0 object silently pretend to enforce the cross-row `reserved+committed ≤ stock` aggregate, or is
   it correctly deferred to WU-C (verify no aggregate table CHECK/trigger exists)?
2. Are all partial-unique predicates correct against the contract — one **succeeded** capture per order (not any
   capture), one **non-failed** refund per capture, anti-double-reserve only for active+non-null order line?
3. Is the migration truly additive/nullable with zero destructive change, and does `down.sql` fail closed on
   any non-empty new table (re-run the rehearsal; try seeding a row then down)?
4. Is the `order_no` backfill deterministic **and** idempotent, and free of any format/scheme assumption that
   would collide with WU-E's ULID/UUID mint?
5. Does any new column/table carry PII/secret (raw token, OIDC email/name, raw webhook payload) or breach the
   ontology boundary (any suitability/evidence/claim/ingredient/medical judgment)? Expect none.
6. Are schema.prisma relations coherent (self-relation named both sides; 1:1 `CommerceSku↔SkuBinding`;
   back-relations complete) given `prisma validate` was not run?

## 11. rollback

Revert the single local candidate commit `c559e7cd132e7b837dc38d01395f790499abb70d` (the six files return to
START_HEAD `b8b61d7…`; no DB was migrated outside the destroyed disposable container, so no data rollback is
needed). On any DB the migration was applied to, `down.sql` reverses it while all new tables are empty.

## 12. Runtime-safety record (handoff-required)

```text
INSTANCE_IDENTITY: disposable postgres:16-alpine (already-local image; NO pull), tmpfs data dir, NO host port, docker exec (unix socket) only, synthetic rows only
PRE_GIT:  cosmile branch implementation/cosmile-o1-korea-golden-commerce-v1-20260717 @ b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6 (clean)
POST_GIT: same branch @ c559e7cd132e7b837dc38d01395f790499abb70d (clean; one additive candidate commit; NO upstream / NOT pushed)
REHEARSAL: focused WU-0 = 54 passed / 0 failed · forward(1)->down-abort(non-pristine)->down-success(pristine)->forward(1) bounded cycle
REGRESSION: wu8 migration dbtest 28/0 PASS · m2_ab + v3_11b = SKIP (psycopg2 absent, infra-gate, SKIP != PASS)
SHUTDOWN_CLEANUP: container force-removed = True · post-cleanup absent = True · named-volume = none(tmpfs) · host-port = none
SAFETY: no external network · no image pull · no host/shared/staging/protected/production DB · no secret/credential printed · no dependency installed · no prisma migrate/generate
```

```text
PRODUCT_CODE_CHANGED: YES (additive schema baseline only; flags/route/service/UI/provider none)
DATABASE_CHANGED: NO (only a disposable, destroyed container was migrated)
IMPLEMENTATION_PUSHED: NO
FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes evidence)
REVIEWER_DISPATCHED: NO
NEXT_WORKUNIT_STARTED: NO
GOOGLE/TOSS/PROVIDER/NETWORK/REAL_DB/SECRET/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
