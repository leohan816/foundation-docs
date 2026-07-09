# Worker Result — V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

> Actor: Worker (fable-builder) · Project: Cosmile · Date: 2026-07-09 · Return to: Advisor.
> Disposable PostgreSQL rehearsal only. No real/staging/prod DB, no secrets, no runtime edit/stage/commit/push. Not operational readiness.
> Brief: `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/02_WORKER_BRIEF.md`

## 1. Overall outcome
**REHEARSAL EXECUTED — PASS** (not SKIP). Docker was available, so a disposable PostgreSQL was provisioned and the fresh deploy + D-O1 duplicate-rejection were executed and verified. This resolves the live-DB evidence that was `SKIP` in the D-O1 implementation batch (psycopg2 unavailable there).

## 2. Rehearsal target
- Repo `../Cosmile`, branch `shadow/m4-cosmile-memory`, HEAD `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9` (== origin, ahead/behind 0/0).

## 3. Pre-checks — all PASS
| Check | Observed |
|---|---|
| branch | `shadow/m4-cosmile-memory` ✓ |
| HEAD | `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9` ✓ |
| local == origin | yes (ahead/behind 0/0) ✓ |
| staged diff | empty ✓ |
| active migrations exclude `20260624181637_commerce_intelligence` | yes (only init_postgres, v3_11b, v3_11c2_d_o1) ✓ |

## 4. Disposable PostgreSQL
- Image `postgres:16-alpine`, container `cosmile-v3-11c2-phase1-rehearsal`, `--rm`, no persistent volume, synthetic password (`phase1_ephemeral_pw`), bound `127.0.0.1:55433->5432` (loopback only). Ready after ~3s (`pg_isready`).
- No real DB / staging / prod / live used. No secret read. No `.env` value used.

## 5. Migration rehearsal (synthetic disposable URL only) — PASS
- `npx prisma validate` → **valid**.
- `npx prisma migrate deploy` → **3 migrations applied fresh, in order**:
  `00000000000000_init_postgres` → `20260706120000_v3_11b_learning_commerce_memory` → `20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique`. "All migrations have been successfully applied." (exit 0)
- `npx prisma migrate status` → "Database schema is up to date!"

## 6. D-O1 SQL smoke (disposable DB, `docker exec psql`, synthetic rows only) — all PASS
| # | Check | Result |
|---|---|---|
| A | unique index on `RecOutcomeEvent.orderItemId` exists | `RecOutcomeEvent_orderItemId_key` UNIQUE btree present ✓ |
| B | duplicate preflight on empty table | `0` ✓ |
| C | insert 1 Order + 2 OrderItem + 1 organic RecOutcomeEvent (oi1) | SUCCESS ✓ |
| D | 2nd RecOutcomeEvent for **same** orderItemId (oi1) | **REJECTED** — `duplicate key value violates unique constraint "RecOutcomeEvent_orderItemId_key"` ✓ |
| E | RecOutcomeEvent for **distinct** orderItemId (oi2), CHECKs satisfied | SUCCESS ✓ |
| F | final `RecOutcomeEvent` row count / duplicate preflight | rows = `2`, preflight dups = `0` ✓ |

Duplicate preflight query used:
```sql
SELECT COUNT(*) FROM (
  SELECT "orderItemId" FROM "RecOutcomeEvent"
  WHERE "orderItemId" IS NOT NULL
  GROUP BY "orderItemId" HAVING COUNT(*) > 1
) d;   -- result: 0
```
Synthetic IDs only (`ph1_*`); no real customer/order/payment IDs. Output limited to status/counts.

## 7. Teardown
- `docker rm -f cosmile-v3-11c2-phase1-rehearsal` → removed ✓. No listener remains on `127.0.0.1:55433`. Disposable DB fully torn down.

## 8. Runtime / safety confirmations
- Runtime repo **unchanged**: no file edited/staged/committed/pushed; HEAD still `ac2ea4c` (only pre-existing `app/docs/**` untracked remain).
- `COSMILE_REC_OUTCOME_ENABLED` **OFF** (unchanged). No main merge. No operational-readiness claim.
- No real target DB, no staging/prod/live DB, no secrets, no real customer/order/payment data. No Phase 2 target-DB preflight performed (out of scope).

## 9. Proved / not proved
- **Proved (live, executed):** the active PostgreSQL migration graph deploys cleanly from scratch after the F-2 quarantine; the D-O1 `@@unique([orderItemId])` is created and **enforced at the DB level** (duplicate orderItemId rejected; distinct accepted; preflight 0). This closes the D-O1 batch's `SKIP` DB-evidence gap.
- **Not proved (out of scope):** Phase 2 real target-DB preflight/deploy, flag-ON behavior, operational rollout — all remain gated and require separate Leo/GPT-approved routing.
