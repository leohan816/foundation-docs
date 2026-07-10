# V3-11C2 Phase 2A Read-Only Preflight — Execution Plan (Design)

Date: 2026-07-10
Author actor: Cosmile Worker (DESIGN_ONLY)
Status: `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`

Canonical mirror: `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
Canonical role authority: `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` (`ACTIVE_CANONICAL_V2`)
Canonical commerce design: `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` (`APPROVED_WITH_ACCEPTED_RISKS`)

> This is an execution-plan **design only**. It does NOT authorize or execute any DB connection, query, migration, role/permission change, secret read, runtime edit, flag change, main merge, or production/live access. It does not create a Phase 2A execution prompt. Phase 2A execution status remains `NOT_APPROVED`.
> No secret value, `DATABASE_URL`, host, username, password, token, or `.env.local` value was read or is recorded here. Evidence is boolean / count / status / key-name only, per `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`.

---

## 1. Target candidate alias (non-secret)

Alias: **`COSMILE_CURRENT_DEV_DB_CANDIDATE`**

No stronger non-secret repo artifact (no human-readable DB identity map, provisioning record, or environment-owner attestation) was found that would justify a more precise alias. This alias names a *candidate*, not an approved target.

## 2. Classification state

Claimed classification: `development only` (application intent implied by key name `COSMILE_ENV` and the `.env.local` naming — **not proof**).

Actual classification: **`UNPROVEN_PENDING_APPROVAL`** (equivalent to Advisor `CURRENT_DEV_DB_NON_PROD_CLASSIFICATION_NOT_PROVEN`).

The plan does not treat the candidate as approved, non-prod, or read-only. Branch name, `.env.local`, `COSMILE_ENV`, and application defaults are explicitly rejected as proof of DB identity (design requirement).

## 3. Evidence — supporting vs missing

Supporting (circumstantial, non-secret):
- current branch `shadow/m4-cosmile-memory` is synchronized shadow, not `main`;
- connection source file is named `.env.local` and is Git-ignored;
- tracked runtime defaults / event metadata distinguish development from production;
- key name `COSMILE_ENV` exists in the local source;
- Prisma provider is `postgresql`; schema references `env("DATABASE_URL")`.

Missing (required before approval):
- no approved human-readable DB identity mapping the source to an exact DB;
- no value inspected, so the actual destination cannot be classified (and must not be inspected here);
- branch/`.env.local` naming does not prove the destination is not production/live/customer-facing;
- no environment-owner attestation or provisioning record;
- no non-secret artifact of a dedicated read-only role, `GRANT SELECT`-only provisioning, `default_transaction_read_only`, `SET TRANSACTION READ ONLY` enforcement, or a read-only replica/proxy alias.

Conclusion: identity **and** read-only boundary are both unproven → `IDENTITY_AND_READ_ONLY_BOUNDARY_UNPROVEN`.

## 4. Connection source label

Source label for design discussion only: **`COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`**.

This names the *mechanism* (a local, Git-ignored env source consumed by Prisma via `env("DATABASE_URL")`), not the DB identity and not an approved target. No value, URL, host, username, password, or token is included. The exact target schema, host, and credentials are non-repo runtime parameters to be supplied through an approved, masked channel at execution-approval time — never read into this document.

## 5. Recommended read-only enforcement method (and alternatives)

Preferred (primary proof) — **dedicated least-privilege read-only role**:
- a DB role granted only `CONNECT` on the target DB, `USAGE` on the approved schema, and `SELECT` on the specific tables/catalogs used by §6; no `INSERT`/`UPDATE`/`DELETE`/`TRUNCATE`/DDL/`CREATE`;
- writes become impossible at the grant level, which is the only *proof* of read-only for a path;
- provisioning this role is a **separate approved administrative task** (role creation is forbidden in this mission and in Phase 2A itself); the role credential is injected at runtime and never printed.

Defense-in-depth (not equivalent proof) — **transaction/session read-only**:
- `BEGIN; SET TRANSACTION READ ONLY; <SELECTs>; ROLLBACK;` (or `SET default_transaction_read_only = on` for the session);
- treated strictly as an *additional* layer under an interactive `psql` session; it does **not** substitute for a least-privilege role and does **not** constrain any command that opens its own connection with a fuller-privilege URL.

Fallback — **separate purpose-built non-prod DB** with the read-only role (see §15).

## 6. Exact allowed command/query list (future, separately-approved execution only)

All commands run through the **least-privilege read-only role** against the **approved schema** (`<APPROVED_SCHEMA>`, supplied at approval time from non-secret target metadata; Phase 1 used `cosmile`). Each is a pure `SELECT`; none performs DDL/DML.

C-1 — duplicate `RecOutcomeEvent.orderItemId` group count:
```sql
SELECT COUNT(*) AS duplicate_group_count
FROM (
  SELECT "orderItemId"
  FROM "<APPROVED_SCHEMA>"."RecOutcomeEvent"
  WHERE "orderItemId" IS NOT NULL
  GROUP BY "orderItemId"
  HAVING COUNT(*) > 1
) d;
```

C-2 — exact D-O1 index-shape detection (catalog; F-1). Confirm the approved unique index by schema, table, **exact index name**, uniqueness, validity/readiness, non-partial, non-expression, and **exactly one key column `orderItemId`** — this rejects renamed, composite `(orderItemId, …)`, partial, expression, invalid, or not-ready unique indexes that a bare `ILIKE '%UNIQUE%…%orderItemId%'` would falsely accept:
```sql
SELECT
  (i.relname = 'RecOutcomeEvent_orderItemId_key') AS name_match,
  ix.indisunique                                  AS is_unique,
  ix.indisvalid                                   AS is_valid,
  ix.indisready                                   AS is_ready,
  (ix.indpred   IS NULL)                          AS non_partial,
  (ix.indexprs  IS NULL)                          AS non_expression,
  (ix.indnkeyatts = 1)                            AS single_key_column,
  (a.attname = 'orderItemId')                     AS key_col_is_orderitemid
FROM pg_index ix
JOIN pg_class     i ON i.oid = ix.indexrelid
JOIN pg_class     t ON t.oid = ix.indrelid
JOIN pg_namespace n ON n.oid = t.relnamespace
LEFT JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ix.indkey[0]
WHERE n.nspname = '<APPROVED_SCHEMA>'
  AND t.relname = 'RecOutcomeEvent'
  AND i.relname = 'RecOutcomeEvent_orderItemId_key';
```
Interpretation:
- **0 rows** → approved-name index absent (or renamed away) → `D_O1_INDEX_ABSENT_STOP`.
- **1 row, all eight booleans TRUE** → `D_O1_INDEX_OK`.
- **1 row, any boolean FALSE** (not unique / invalid / not ready / partial / expression / composite / wrong key column) → `D_O1_INDEX_SHAPE_MISMATCH_STOP`.
Output = the eight booleans + derived `D_O1_INDEX_*` status + the constant approved index name. No `indexdef` text or catalog row is emitted.

C-3 — full Prisma migration ledger comparison (F-2 / F-3). Two SELECTs; the checksum comparison is evaluated **inside** the query so only a boolean leaves the DB (raw DB checksum is never output).

C-3a — per-migration state vs the exact approved three-migration set with locally-computed expected checksums:
```sql
SELECT
  e.migration_name,
  (m.migration_name IS NOT NULL)     AS row_present,
  (m.finished_at    IS NOT NULL)     AS finished,
  (m.rolled_back_at IS NOT NULL)     AS rolled_back,
  (m.checksum = e.expected_checksum) AS checksum_match
FROM (VALUES
  ('00000000000000_init_postgres',
     '0974edd392becaf9bd4f3a40a080a48f0a869b502b86dd0a714832f75a4adaab'),
  ('20260706120000_v3_11b_learning_commerce_memory',
     '53e97c27920db730e7a91218ee0e71ff7a37c4f107de260422f3166798970757'),
  ('20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique',
     '6c927a699d4bc4b0dc323c6c44a10b3f29bf4f5deab7e71e7d0a1503b6f6b901')
) AS e(migration_name, expected_checksum)
LEFT JOIN "<APPROVED_SCHEMA>"."_prisma_migrations" m
  ON m.migration_name = e.migration_name
ORDER BY e.migration_name;
```

C-3b — unexpected/surplus migration drift count (migrations applied to the target that are NOT in the approved set — F-2):
```sql
SELECT COUNT(*) AS unexpected_migration_count
FROM "<APPROVED_SCHEMA>"."_prisma_migrations"
WHERE migration_name NOT IN (
  '00000000000000_init_postgres',
  '20260706120000_v3_11b_learning_commerce_memory',
  '20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique'
);
```

Explicit state mapping (F-3):
| Condition (from C-3a row / C-3b) | Status |
|---|---|
| expected row absent (`row_present = false`) | `PENDING` |
| `rolled_back = true` | `ROLLED_BACK_STOP` |
| present, not rolled back, `finished = false` | `INCOMPLETE_STOP` |
| finished, not rolled back, `checksum_match = false` | `CHECKSUM_DRIFT_STOP` |
| finished, not rolled back, `checksum_match = true` | `APPLIED_MATCH` |
| `_prisma_migrations` absent / unreadable (query errors) | `UNKNOWN_STOP` (do not create the table) |
| `unexpected_migration_count > 0` | `UNEXPECTED_MIGRATION_DRIFT_STOP` |

Ledger overall = `MIGRATION_LEDGER_OK` only when all three names are `APPLIED_MATCH` **and** `unexpected_migration_count = 0`; otherwise the corresponding `*_STOP`.

Expected checksums are **locally-computed `sha256` of the tracked `migration.sql` files** (non-secret design constants; Prisma stores the SHA-256 of the migration file content in `_prisma_migrations.checksum`). If Prisma's checksum normalization ever differs from a raw-file `sha256`, the execution step must recompute the expected constant with Prisma's exact algorithm from the same tracked files; the drift check still emits only the boolean `checksum_match`, never the raw DB checksum.

**Excluded:** `prisma migrate status`, `prisma migrate deploy`, `prisma db execute`, and any Prisma/ORM command that opens its own connection using the full-privilege `DATABASE_URL`. Rationale in §7.

## 7. No-write justification per command

- C-1, C-2, C-3 are pure `SELECT` statements: C-1 an aggregate over `RecOutcomeEvent`; C-2 a read of system catalogs only (`pg_index`/`pg_class`/`pg_namespace`/`pg_attribute`); C-3 a read of `_prisma_migrations` where the checksum comparison is evaluated inside the query so only a boolean is returned. Under the least-privilege read-only role they cannot write even if malformed, because no write privilege is granted. Additionally they can be wrapped in `SET TRANSACTION READ ONLY` + `ROLLBACK` as defense in depth. None creates, alters, or drops any index, table, or migration row.
- `prisma migrate status` / `migrate deploy` / any self-connecting command is **excluded** because its no-write behavior cannot be independently proven here and it would connect with the full-privilege `DATABASE_URL` (bypassing the read-only role and any transaction-level guard). Per the design rule, a command that opens its own connection whose no-write behavior is unproven must be excluded and marked STOP — so migration state is derived via the read-only SELECT C-3 instead.

## 8. Allowed output only

- aggregate counts (e.g. `duplicate_group_count`, `unexpected_migration_count`);
- C-2 index-shape booleans (`name_match`, `is_unique`, `is_valid`, `is_ready`, `non_partial`, `non_expression`, `single_key_column`, `key_col_is_orderitemid`) + derived `D_O1_INDEX_*` status + the constant approved index name;
- per-migration status enum (`PENDING` / `APPLIED_MATCH` / `ROLLED_BACK_STOP` / `INCOMPLETE_STOP` / `CHECKSUM_DRIFT_STOP` / `UNKNOWN_STOP` / `UNEXPECTED_MIGRATION_DRIFT_STOP`) and the overall ledger status;
- the boolean `checksum_match` only.

## 9. Forbidden output

- table rows or row contents;
- any customer / order / payment / subject / anonymous identifier;
- raw env values, `DATABASE_URL`, host, username, password, token, or credential-bearing URL;
- raw DB checksum values from `_prisma_migrations` (only the derived boolean `checksum_match` may leave the DB);
- raw catalog rows or `indexdef` text (only the C-2 booleans + derived status);
- raw hashes, PII, or full env dumps.
(Per `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md` §4 and `ENV_AND_MIGRATION_POLICY.md` §7 — verification output is boolean/count/status only.)

## 10. Scope of checks (exhaustive)

Phase 2A read-only preflight is limited to exactly:
1. duplicate `RecOutcomeEvent.orderItemId` group count (expect `0`);
2. exact D-O1 index-shape detection (`RecOutcomeEvent_orderItemId_key`: unique, valid/ready, non-partial, non-expression, single key column `orderItemId`);
3. full migration-ledger comparison vs the exact three approved migrations — per-migration state (pending / applied-match / rolled-back / incomplete / checksum-drift / unknown) **and** unexpected-migration drift count.

Nothing else. No table scan, no row export, no schema mutation, no data profiling beyond these counts/status. `RecOutcomeEvent` is preserved as the approved **one-row-per-`OrderItem` purchase-outcome summary/current row**; this plan designs no event-log, refund, cancel, reorder, direct/session attribution, or Phase 2B behavior.

## 11. STOP conditions

STOP and return to Advisor if, at approval/execution time:
- the exact target DB identity or its non-prod classification would have to be guessed;
- no least-privilege read-only role artifact exists (would require the full-privilege `DATABASE_URL`);
- any required fact would need a secret-value read or a self-connecting command whose no-write behavior is unproven;
- `_prisma_migrations` is absent/unreadable (`UNKNOWN_STOP`);
- duplicate group count returns non-zero (blocks any later unique enforcement on the real target);
- C-2 returns 0 rows (`D_O1_INDEX_ABSENT_STOP`) or any C-2 boolean is FALSE (`D_O1_INDEX_SHAPE_MISMATCH_STOP` — renamed / composite / partial / expression / invalid / not-ready / wrong key column);
- any migration maps to `ROLLED_BACK_STOP`, `INCOMPLETE_STOP`, or `CHECKSUM_DRIFT_STOP`;
- `unexpected_migration_count > 0` (`UNEXPECTED_MIGRATION_DRIFT_STOP` — the target's ledger contains migrations outside the approved three-set);
- `.env.local` secret-hygiene precondition (see §on hygiene) is unresolved;
- any write, DDL, DML, role/permission change, flag change, main merge, or prod/live access would be required;
- the target schema/host cannot be identified from non-secret metadata.

## 12. Routing per expected result

- duplicate count `= 0` **and** `D_O1_INDEX_OK` **and** `MIGRATION_LEDGER_OK` (all three `APPLIED_MATCH`, `unexpected_migration_count = 0`) → return status to **Advisor**; Advisor consolidates; **Leo/GPT** decides whether the real-target boundary is satisfied to progress toward (still-separate) Phase 2B.
- duplicate count `> 0` → **STOP → Advisor → Leo/GPT**; do not auto-delete/merge; a data-remediation decision is required before any unique enforcement on that target.
- `D_O1_INDEX_ABSENT_STOP` or `D_O1_INDEX_SHAPE_MISMATCH_STOP` → **STOP → Advisor**; the target's index does not match the approved D-O1 shape (renamed/composite/partial/expression/invalid); not a preflight pass.
- any migration `PENDING` / `ROLLED_BACK_STOP` / `INCOMPLETE_STOP` / `CHECKSUM_DRIFT_STOP` / `UNKNOWN_STOP`, or `UNEXPECTED_MIGRATION_DRIFT_STOP` → **STOP → Advisor**; the target does not match the approved migration graph (deploy/remediation is a separate approval, not this preflight).
- any secret / identity / read-only gap → **STOP → Advisor**; recommend §15 fallback.
All routine results return to Advisor; only new scope / high-risk or authority decisions / risk acceptance / final closure reach Leo/GPT (V2 §15).
All routine results return to Advisor; only new scope / high-risk or authority decisions / risk acceptance / final closure return to Leo/GPT (per V2 §15).

## 13. Rollback rationale

For a *truly* read-only path (least-privilege read-only role, `SELECT`-only), no state changes occur, so there is **nothing to roll back — rollback is unnecessary by construction**.

Because that read-only premise is currently **unproven**, protection is required before any execution against the candidate: (i) provision and use a least-privilege read-only role so writes are impossible at the grant level; (ii) wrap checks in `SET TRANSACTION READ ONLY` + `ROLLBACK` as defense in depth; (iii) exclude every self-connecting/full-privilege command (§7); (iv) prefer running against a non-prod copy/snapshot (§15). Until the read-only role is proven, the candidate must be treated as potentially write-capable and must not be used as the Phase 2A target.

## 14. Evidence Fable5 must inspect

- this design doc and its byte-identical foundation-docs mirror (cmp equality);
- status header = `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`;
- **re-review Q1 (F-1):** C-2 matches the **exact** index name `RecOutcomeEvent_orderItemId_key` and full shape (unique, valid/ready, non-partial, non-expression, single key column `orderItemId`) via `pg_index` — a renamed / composite / partial / expression / invalid unique index does **not** pass;
- **re-review Q2 (F-2):** C-3b returns `unexpected_migration_count` so migrations outside the approved three-set are detected (not silently passed);
- **re-review Q3 (F-3):** absent expected row → `PENDING`; `rolled_back_at`, unfinished, and checksum drift are explicitly mapped (`ROLLED_BACK_STOP` / `INCOMPLETE_STOP` / `CHECKSUM_DRIFT_STOP`), with expected checksums as locally-computed non-secret constants and only a boolean `checksum_match` emitted;
- canonical `AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` (`ACTIVE_CANONICAL_V2`) and `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` Phase 2A boundary consistency;
- `prisma/schema.prisma` `@@unique([orderItemId])`; D-O1 migration creating `RecOutcomeEvent_orderItemId_key` and dropping the prior non-unique index; V3-11B CHECK/FK preservation; and that the embedded expected checksums equal the `sha256` of the tracked `migration.sql` files;
- that §6 commands are pure `SELECT` (aggregate / catalog / ledger), read-only-role-scoped, with the checksum comparison evaluated in-query, and `prisma migrate status` + all self-connecting commands excluded;
- that no secret value / `DATABASE_URL` / identifier / raw DB checksum / catalog row appears anywhere; evidence is count/boolean/status only;
- `.env.local` mode `664` handled as a precondition (no permission change, no value read);
- the A/B/C recommendation authorizes nothing; execution remains `NOT_APPROVED`.

## 15. Fallback → separate non-prod DB (conditions)

Use a dedicated non-prod DB (with a purpose-built read-only role) instead of the candidate when any of the following holds:
- the candidate's identity cannot be proven non-prod from non-secret evidence;
- no least-privilege read-only role can be provisioned on the candidate;
- the `.env.local` secret-hygiene precondition cannot be resolved;
- any required check would otherwise need a full-privilege connection.

Limitation to state plainly: a separate/empty non-prod DB would trivially return duplicate count `0`, unique index present, and migrations applied — this **re-confirms the migration graph (already proven in Phase 1)** but does **not** validate the *real* target's actual duplicate/identity state. So the fallback satisfies safety, not the preflight's purpose against the real target.

## 16. Recommendation for Leo/GPT (authorizes nothing)

- **Option A — `APPROVE_CURRENT_DEV_DB_READONLY_PHASE2A`:** run §6 against `COSMILE_CURRENT_DEV_DB_CANDIDATE`. **Not currently supportable** — identity unproven, no read-only-role artifact, `.env.local` 664 hygiene open.
- **Option B — `PREPARE_SEPARATE_NON_PROD_DB_FIRST`:** provision a dedicated non-prod DB + least-privilege read-only role, run §6 there. Safe, but only re-confirms the migration graph; does not validate the real target (see §15).
- **Option C — `HOLD_PHASE2A_DUE_TO_UNPROVEN_BOUNDARY`:** hold until Leo/GPT supplies exact target DB identity, non-prod attestation, a provisioned least-privilege read-only role artifact, a secret-masking path, and `.env.local` hygiene remediation; then Option A becomes supportable.

**Primary recommendation: Option C (HOLD).** Rationale: the canonical design limits Phase 2A to read-only verification of the *exact approved target*, and every prerequisite for a safe, provable read-only run against that target is currently missing. Option A is not yet supportable; Option B is a safe stopgap that does not achieve the preflight's real-target purpose. This recommendation does not authorize execution.

---

## Secret-hygiene precondition (`.env.local` mode `664`)

`app/.env.local` mode `664` is broader (group/other-readable) than a least-privilege posture for a file that holds a DB credential. Before any Phase 2A that resolves `DATABASE_URL` from this source, tighten to owner-only (e.g. `600`) as a **separate approved hardening step**. This plan does **not** change permissions and does **not** read the file's values.

## Unresolved approval fields (for Leo/GPT)

- exact approved target DB identity and `<APPROVED_SCHEMA>` (from non-secret metadata);
- non-prod / not-customer-facing attestation;
- least-privilege read-only role provisioning (separate admin task);
- secret-masking / credential-injection path;
- `.env.local` hygiene remediation;
- selected option (A / B / C);
- review route after any Phase 2A result.

## Rework log — Fable5 `NEEDS_PATCH` (F-1 / F-2 / F-3)

- **F-1 (C-2 index exactness):** replaced the `indexdef ILIKE '%UNIQUE%…%orderItemId%'` heuristic with a `pg_index`/`pg_class`/`pg_namespace`/`pg_attribute` query that matches the **exact** index name and full shape (unique, valid, ready, non-partial, non-expression, single key column `orderItemId`); renamed/composite/partial/expression/invalid unique indexes now map to `D_O1_INDEX_SHAPE_MISMATCH_STOP`, absence to `D_O1_INDEX_ABSENT_STOP`.
- **F-2 (C-3 drift coverage):** added C-3b `unexpected_migration_count` (`migration_name NOT IN` the approved three-set) so surplus/unexpected migrations on the target trigger `UNEXPECTED_MIGRATION_DRIFT_STOP` instead of passing silently.
- **F-3 (state/checksum mapping):** made absent-row → `PENDING` explicit; added `rolled_back_at`, unfinished, and checksum handling with the full status map (`APPLIED_MATCH` / `ROLLED_BACK_STOP` / `INCOMPLETE_STOP` / `CHECKSUM_DRIFT_STOP` / `UNKNOWN_STOP`); expected checksums embedded as locally-computed `sha256` constants of the tracked `migration.sql` files, compared in-query so only the boolean `checksum_match` is emitted.
- Updated §7 no-write, §8/§9 output, §10 scope, §11 STOP, §12 routing, §14 Fable5 evidence; status → `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`. No DB/query/migration/secret access; no runtime/schema/migration/test/package/flag change; scope limited to F-1/F-2/F-3.

## Boundaries reaffirmed

`COSMILE_REC_OUTCOME_ENABLED` remains default OFF. No flag ON, live/prod, main merge, migration deploy, DDL/DML, event-log/refund/cancel/reorder/direct/session/Phase 2B, SIASIU, or foundation-control work is designed or authorized here. R-2 retention/erasure policy remains a hard blocker before flag-ON/operational use (canonical design). `RETURN_TO: Advisor`.
