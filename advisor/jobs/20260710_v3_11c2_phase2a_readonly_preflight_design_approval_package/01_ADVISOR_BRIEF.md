# Advisor Brief - Phase 2A Read-Only Preflight Design Package

Instruction validation: `PROCEED_WITH_LIMITS`

Phase 2A execution status: `NOT_APPROVED`

Candidate target status: `IDENTITY_AND_READ_ONLY_BOUNDARY_UNPROVEN`

## Phase 0 Inventory

### Repository State

- repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- HEAD: `029d489728e27abb3a6ea3d1a6831eefe7434d14`
- upstream: `origin/shadow/m4-cosmile-memory`
- ahead/behind: `0/0`
- staged files: `0`
- tracked runtime diff: `0`
- existing unrelated untracked files: six `app/docs/*.md` files; preserve and do
  not stage them.

### Connection Source Inventory

Observed without printing any value:

- local file source exists: `../Cosmile/app/.env.local`
- Prisma connection key referenced by schema: `DATABASE_URL`
- `.env.local` key names include `DATABASE_URL` and `COSMILE_ENV`
- current Advisor process environment does not contain `DATABASE_URL`,
  `DIRECT_URL`, or `SHADOW_DATABASE_URL`
- Prisma provider: `postgresql`
- `.env.local` is ignored by Git
- `.env.local` permission metadata observed: mode `664`

Approved secretless connection-source label for design discussion only:

`COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`

This label identifies the source mechanism, not the DB identity and not an
approved target. No URL, host, username, password, token, or value was read into
the report.

### Non-Production Evidence Assessment

Available circumstantial evidence:

- current branch is a synchronized shadow branch;
- the source file is named `.env.local` and is Git-ignored;
- tracked runtime defaults and event metadata distinguish development from
  production;
- `COSMILE_ENV` is present as a key name in the local source.

Insufficient evidence:

- no approved human-readable DB identity maps the source to an exact DB;
- no value was inspected, so the actual destination cannot be classified;
- branch and `.env.local` naming do not prove the connection is not
  production/live/customer-facing;
- no environment-owner attestation or provisioning record was found.

Conclusion:

`CURRENT_DEV_DB_NON_PROD_CLASSIFICATION_NOT_PROVEN`

### Read-Only Boundary Assessment

Repo search found no tracked evidence of:

- a dedicated read-only DB role;
- `GRANT SELECT`-only provisioning;
- `default_transaction_read_only` configuration;
- `SET TRANSACTION READ ONLY` enforcement;
- a read-only proxy/replica connection alias.

This does not prove that a read-only role does not exist in the DB. It means its
existence is `UNKNOWN_NOT_VERIFIED` without DB access or a provisioning record.

Potential design options, not executed:

1. Dedicated true read-only DB role with only required connect/schema/select
   privileges. Creating it would require a separate approved administrative task.
2. Transaction/session-level PostgreSQL read-only protection as defense in depth.
   This is not equivalent to a least-privilege role and may not cover commands that
   manage their own connections.
3. Separate non-prod DB with a purpose-built read-only role if the current source
   cannot be proven safe.

### Secret and Permission Finding

`app/.env.local` mode `664` is broader than a least-privilege secret file posture.
No permission change is authorized in this mission. The execution plan must treat
this as a pre-execution hardening/approval item and must never print the file's
values.

### Schema and Prior-Rehearsal Alignment

- `schema.prisma` uses PostgreSQL and `env("DATABASE_URL")`.
- `RecOutcomeEvent` has `@@unique([orderItemId])`.
- D-O1 migration creates `RecOutcomeEvent_orderItemId_key` and documents a
  duplicate preflight requirement.
- Phase 1 disposable PostgreSQL rehearsal applied the active migration graph,
  verified the unique index and duplicate rejection, and returned
  `PASS_WITH_RISK` only for evidence/target-boundary limits.
- The canonical Commerce Memory design is `APPROVED_WITH_ACCEPTED_RISKS` and
  restricts Phase 2A to read-only invariant checks after a separate approval.

## Advisor Decision

Proceed only with a design document. The Worker must not claim that the current
development DB is approved or proven non-prod/read-only.

The design package must:

- assign a non-secret candidate alias;
- separate observed evidence from required future approval evidence;
- specify exact read-only commands without executing them;
- exclude any command whose no-write behavior cannot be proven;
- define a dedicated-role preference and transaction-level defense-in-depth;
- include a fallback to separate non-prod DB;
- recommend A, B, or C without authorizing execution.

## Preliminary Path Assessment

Current evidence does not yet support
`APPROVE_CURRENT_DEV_DB_READONLY_PHASE2A`.

The Worker design should determine whether the missing proof can be satisfied by
documented identity/permission evidence alone. If not, the safe recommendation is
`PREPARE_SEPARATE_NON_PROD_DB_FIRST` or
`HOLD_PHASE2A_DUE_TO_UNPROVEN_BOUNDARY`.

