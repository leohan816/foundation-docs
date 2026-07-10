# Advisor Finding Classification - Fable5 DESIGN_REVIEW

Fable5 verdict: `NEEDS_PATCH`

Advisor decision: `IN_SCOPE_DESIGN_REWORK`

Phase 2A execution status: `NOT_APPROVED`

## Finding Classification

| Finding | Classification | Blocking design PASS | Patch authority |
|---|---|---:|---|
| F-1 C-2 index detection can accept renamed/composite unique indexes | Exactness defect in approved design scope | yes | Cosmile Worker DESIGN_ONLY rework |
| F-2 C-3 filters to expected names and cannot detect unexpected migration drift | Coverage defect in approved design scope | yes | Cosmile Worker DESIGN_ONLY rework |
| F-3 missing-row mapping, rollback state, and checksum handling are incomplete | State-classification defect in approved design scope | yes | Cosmile Worker DESIGN_ONLY rework |

All findings are patchable without DB access, secret access, runtime code, schema,
migration, or scope expansion. Leo/GPT decision is not required before rework.

## Required Rework Outcome

The patched plan must:

1. Detect the exact D-O1 index by schema, table, exact index name, uniqueness,
   validity/readiness, no predicate/expression, and exact single key column
   `orderItemId`.
2. Compare the complete Prisma migration ledger against the current three-migration
   approved set and return an aggregate unexpected-migration count.
3. Define expected migration status explicitly:
   - missing expected row -> `PENDING`;
   - finished and not rolled back with matching checksum -> `APPLIED_MATCH`;
   - rolled back -> `ROLLED_BACK_STOP`;
   - unfinished -> `INCOMPLETE_STOP`;
   - checksum mismatch -> `CHECKSUM_DRIFT_STOP`;
   - ledger missing/unreadable -> `UNKNOWN_STOP`.
4. Calculate expected checksums only from tracked local migration files and include
   them as non-secret design constants. Do not read DB values during rework.
5. Keep result output limited to approved migration names, booleans/counts/status;
   never output DB ledger rows or raw checksum values returned from a DB.
6. Update STOP/routing/evidence sections consistently.

## Review Loop

After Worker rework, Advisor must validate the exact diff and route the same
Fable5 Reviewer session to re-review the three fixed questions. No new Reviewer
session is allowed.

