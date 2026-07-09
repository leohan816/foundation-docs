# Worker Result — V3-11C2-D-O1 Idempotency Hardening (FULL_ORDER_ITEM_UNIQUE)

> Actor: Worker (fable-builder) · Project: Cosmile · Date: 2026-07-09 · Return to: Advisor.
> Not final approval. Runtime changes uncommitted. Approved strategy: `FULL_ORDER_ITEM_UNIQUE` (Leo/GPT).
> Brief: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/02_WORKER_BRIEF.md`

## 1. Actor / target / branch / base commit
- Actor: Worker · Target project: Cosmile · Repo: `../Cosmile` · App root: `../Cosmile/app`.
- Branch: `shadow/m4-cosmile-memory` (gate passed; not main/prod). Base commit: `caba8c6`.
- Runtime commit: **not committed** (this brief does not authorize runtime commit/push).

## 2. Exact changed files (D-O1 batch — all within Allowed Files)
| File | Change |
|---|---|
| `app/prisma/schema.prisma` | `@@index([orderItemId])` → `@@unique([orderItemId])`; `@@index([recommendationId])` preserved |
| `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql` | **new** — drop non-unique idx, create unique idx |
| `app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql` | **new** — rollback (drop unique, restore lookup idx) |
| `app/src/lib/recOutcomeEventService.ts` | P2002 unique-conflict → `skipped:"duplicate"` mapping + `isUniqueConflict()` helper |
| `app/scripts/v3_11b_db_integration.dbtest.py` | D-O1 expectations: OrderItem `oi2`, DB3c→distinct `oi2`, DB3d duplicate-reject, DB3e preflight=0 |
| `app/scripts/v3_11c2_rec_outcome.vitest.ts` | TC11 — race P2002→duplicate skip; non-P2002→write_failed |

**Not touched by D-O1:** `mock-complete/route.ts` and `ids.ts` appear in the working tree but are the **prior V3-11C2 MVI batch** (still uncommitted); D-O1 did not modify them. No SIASIU / foundation-control / adapters / foundation lib / checkout-route changes.

## 3. Schema / migration summary
- Schema: `RecOutcomeEvent` now declares `@@unique([orderItemId])` (Prisma-native, avoids schema/migration drift) + preserves `@@index([recommendationId])`, nullable `recommendationId`, and all V3-11B CHECK/FK.
- Migration (`migration.sql`): `DROP INDEX "RecOutcomeEvent_orderItemId_idx"; CREATE UNIQUE INDEX "RecOutcomeEvent_orderItemId_key" ON "RecOutcomeEvent"("orderItemId");` — index-replacement only; **non-destructive** to unrelated schema; V3-11B CHECK(attrMode/xor/rk2) + FK(`RecOutcomeEvent_orderItem_fkey`) untouched.
- Rollback (`down.sql`): drop unique, restore non-unique lookup index. Note: rollback does not repair data semantics if duplicates were written after flag-ON → D-O1 must complete before flag-ON.

## 4. Duplicate preflight query and result
Documented in `migration.sql` as a manual, non-destructive precondition and encoded as dbtest `DB3e`:
```sql
SELECT "orderItemId", COUNT(*) FROM "RecOutcomeEvent" GROUP BY "orderItemId" HAVING COUNT(*) > 1;
```
- Result: **not executed against a live DB in this environment** (DB test infra-gated SKIP — see §5). Expected `0` because `COSMILE_REC_OUTCOME_ENABLED` has remained OFF and no operational writes exist. If any target DB returns >0 rows, the migration must STOP and report (no auto-delete/merge).

## 5. Tests run — pass/fail/skip
| # | Command | Result |
|---|---|---|
| 1 | `npx prisma validate` | **PASS** (schema valid; needs `DATABASE_URL` env only to resolve `env()`, no DB connection) |
| 2 | `npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts` | **PASS 15/15** (incl. TC11 race→duplicate skip, non-P2002→write_failed) |
| 3 | `npx vitest run scripts/v3_11c_rec_event.vitest.ts` | **PASS 10/10** (regression intact) |
| 4 | `npx vitest run scripts/v3_11.vitest.ts` | **PASS 43/43** (V3-11A regression intact) |
| 5 | `python3 scripts/v3_11b_db_integration.dbtest.py` | **SKIP** (exit 2 — `psycopg2 unavailable`, infra-gate, NOT pass) |
| 6 | `npx eslint <service + vitest>` | **PASS 0 problems** |
| 7 | `npx tsc --noEmit` (touched files) | **0 errors** in touched files; only pre-existing `foundation-memory-deanon.vitest.ts` errors remain |
| — | `npx prisma format --check` | pre-existing schema drift (verified already unformatted at HEAD; NOT run repo-wide to avoid broadening diff) |

## 6. Non-prod DB evidence / ephemeral status
- No live/ephemeral Postgres was reachable and `psycopg2` is not installed → DB-touch rehearsal **SKIPPED** (sanctioned by brief: "connection failure or missing psycopg2 is SKIP, not PASS").
- DB was **not** ephemeral-provisioned in this run; **no DB was written**; app dev DB and any prod/live DB were **not** touched.
- DB-level duplicate rejection is proven by construction (schema validate + migration SQL + updated dbtest `DB3c/DB3d/DB3e` logic) but **not executed** against a live DB here → see residual risk.

## 7. Runtime repo commit status
- **Not committed / not pushed.** Full runtime diff (D-O1 + prior C2 MVI) remains staged-free for Advisor orchestration.

## 8. Flag / safety confirmations
- `COSMILE_REC_OUTCOME_ENABLED` remains **default OFF** (`process.env[FLAG_ENV] === "1"`; no ON default introduced). Not turned ON.
- **No prod/live/main/secret access.** No production DB migration run. No DB writes. No secrets/PII/raw order/customer/payment identifiers in code, logs, or this report.
- No SIASIU / foundation-control / Foundation-contract changes. No group-buy/refund/reorder/direct/session/semantic/V3-11D expansion.

## 9. Known residual risks
- **[HIGH-for-gate] DB rehearsal not executed:** duplicate-rejection + migration-apply are proven only by schema-validate + SQL construction + test logic, **not** by a live ephemeral Postgres run (psycopg2 absent). Sentinel/next environment with ephemeral Postgres should execute `v3_11b_db_integration.dbtest.py` after applying base+V3-11B+D-O1 and confirm DB3d rejects + DB3e=0 before any flag-ON readiness claim.
- **P2002 mapping breadth:** service treats any `code==="P2002"` during create as duplicate skip. `RecOutcomeEvent`'s only meaningful unique is `orderItemId` (PK `id` is a fresh ULID, collision ~0), so this is safe in practice; a narrower `meta.target` check was intentionally avoided (target-string format fragility).
- **Semantics frozen:** `@@unique([orderItemId])` fixes one purchase-outcome row per OrderItem; future refund/cancel as separate rows would need a later schema redesign (accepted D-O1 limit).
- **Prior C2 MVI still uncommitted:** D-O1 builds on the uncommitted C2 diff; both await Advisor/Leo commit routing together.
- **Pre-existing repo debt (not D-O1):** full `npm run lint` and `tsc` failures live only in untouched files; `prisma format` drift is pre-existing.

**Proven:** schema validity, service race→duplicate-skip/fail-open, provider-independent test coverage, regression intactness, allowed-files-only diff, flag OFF.
**Not proven (SKIP):** live migration apply, live duplicate-rejection, live preflight=0.
