# Worker Rework Result — V3-11C2 Phase 2A Preflight Plan (Fable5 F-1/F-2/F-3)

> Actor: Cosmile Worker (DESIGN_ONLY_REWORK) · Project: Cosmile · Date: 2026-07-10 · Return to: Advisor.
> In-scope design patch only (F-1/F-2/F-3). No DB/query/migration/secret/runtime access. Phase 2A remains NOT_APPROVED.
> Rework handoff: `.../09_REWORK_HANDOFF_PROMPT.md` · Finding classification: `.../13_ADVISOR_FINDING_CLASSIFICATION.md` · Fable5 result: `.../FABLE5_DESIGN_REVIEW_RESULT.md` (`NEEDS_PATCH`).

## 1. Findings addressed (all in-scope, patchable without DB/secret/runtime)
| # | Fable5 finding | Patch applied |
|---|---|---|
| F-1 | C-2 `indexdef ILIKE '%UNIQUE%…%orderItemId%'` falsely accepts renamed/composite/partial/expression unique indexes | Replaced with a `pg_index`/`pg_class`/`pg_namespace`/`pg_attribute` query matching the **exact** index name `RecOutcomeEvent_orderItemId_key` + full shape (`indisunique`, `indisvalid`, `indisready`, `indpred IS NULL`, `indexprs IS NULL`, `indnkeyatts = 1`, key column `orderItemId`). 0 rows → `D_O1_INDEX_ABSENT_STOP`; any false boolean → `D_O1_INDEX_SHAPE_MISMATCH_STOP`; all true → `D_O1_INDEX_OK`. |
| F-2 | C-3 `IN (3 names)` cannot detect unexpected/surplus migrations | Added C-3b `SELECT COUNT(*) … WHERE migration_name NOT IN (approved 3)` → `unexpected_migration_count`; `> 0` → `UNEXPECTED_MIGRATION_DRIFT_STOP`. |
| F-3 | absent-row mapping implicit; no `rolled_back_at`; no checksum compare | Explicit state map: absent → `PENDING`; `rolled_back` → `ROLLED_BACK_STOP`; unfinished → `INCOMPLETE_STOP`; checksum mismatch → `CHECKSUM_DRIFT_STOP`; finished+match → `APPLIED_MATCH`; ledger missing/unreadable → `UNKNOWN_STOP`. Expected checksums embedded as locally-computed `sha256` constants of the tracked `migration.sql` files; comparison done in-query so only boolean `checksum_match` leaves the DB. |

## 2. Mandatory patch scope — completion
1. C-2 exact D-O1 index-shape detection — **done** (§6 C-2).
2. C-3 full-ledger comparison vs exact three-migration set + unexpected count — **done** (§6 C-3a/C-3b).
3. Explicit missing/pending, finished/applied, rolled-back, incomplete, checksum-drift, unknown mappings with locally-calculated expected checksum constants — **done** (§6 mapping table).
4. Output limited to approved migration names, aggregate counts, booleans, statuses; no DB rows / no raw DB checksum — **done** (§8 allowed / §9 forbidden updated: raw DB checksum + catalog rows explicitly forbidden).
5. Updated no-write justification (§7), STOP (§11), routing (§12), Fable5 evidence (§14) — **done**; added a rework log section.
6. Document status → `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW` — **done**.

## 3. Expected checksum constants (locally computed, non-secret)
`sha256` of tracked `../Cosmile/app/prisma/migrations/<name>/migration.sql`:
- `00000000000000_init_postgres` = `0974edd392becaf9bd4f3a40a080a48f0a869b502b86dd0a714832f75a4adaab`
- `20260706120000_v3_11b_learning_commerce_memory` = `53e97c27920db730e7a91218ee0e71ff7a37c4f107de260422f3166798970757`
- `20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique` = `6c927a699d4bc4b0dc323c6c44a10b3f29bf4f5deab7e71e7d0a1503b6f6b901`
(No DB checksum value read; these are computed from tracked repo files only.)

## 4. Files patched + byte-identical mirror proof
| File | Note |
|---|---|
| `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md` | patched design doc |
| `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md` | byte-identical mirror (re-synced via `cp`) |
Mirror proof: `cmp` → IDENTICAL; both `23539` bytes. No active `pg_indexes`/`indexdef` `ILIKE` heuristic remains (the 2 remaining `ILIKE` tokens are descriptive text in the C-2 header and rework log); active C-2 uses `pg_index` catalog.

## 5. Git status
- Cosmile branch `shadow/m4-cosmile-memory`; pre-rework HEAD `9e9ad28`.
- Patch committed `453b6c94b6c72a19f0e5ea7848928be25583d4c6` (`docs(v3-11c2): patch Phase 2A preflight plan for Fable5 F-1/F-2/F-3 …`), 1 file, `+98 / -28`, **pushed** `9e9ad28..453b6c9`.
- Only the design artifact was staged/committed; 6 pre-existing `app/docs/**` untracked files were NOT staged. No runtime source/schema/migration/test/package/flag change.

## 6. Zero-access confirmation
- DB connection / query / migration / role/permission change: **zero**.
- Secret / `.env.local` value / `DATABASE_URL` / host / user / password / token read or printed: **zero** (checksum constants are `sha256` of tracked migration files, not DB or secret values).
- No Phase 2A execution prompt created. No Phase 2B work. No file-permission change. No new sub-agent. Scope limited to F-1/F-2/F-3. Unrelated files preserved.

## 7. Proved / not proved
- **Proved:** all three Fable5 findings are patched in-scope; the plan now detects the exact D-O1 index shape, unexpected migration drift, and full per-migration state incl. rolled-back/incomplete/checksum-drift/unknown, with non-secret expected checksum constants and count/boolean/status-only output; repo-local plan and mirror are byte-identical.
- **Not proved / out of scope:** any live DB state, target identity, or read-only-role existence — unchanged; execution remains `NOT_APPROVED`, primary recommendation still Option C (HOLD).

`RETURN_TO: Advisor`. Next: Advisor validates the exact diff, then routes the **same** Fable5 Reviewer session to re-review the three fixed questions (Q1 exact name/shape, Q2 unexpected-migration detection, Q3 absent-row=pending + rolled-back/checksum handling).
