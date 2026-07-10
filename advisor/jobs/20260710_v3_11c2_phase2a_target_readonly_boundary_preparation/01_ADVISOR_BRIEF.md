# Advisor Brief - Phase 2A Target and Read-Only Boundary Preparation

Instruction validation: `PROCEED_WITH_LIMITS`

Phase 2A execution status: `NOT_APPROVED`

## Phase 0 Inventory

### Cosmile Repository

- repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- HEAD: `453b6c94b6c72a19f0e5ea7848928be25583d4c6`
- upstream: `origin/shadow/m4-cosmile-memory`
- upstream delta: `0/0`
- staged files: `0`
- tracked working-tree changes: `0`
- unrelated pre-existing untracked files: six `app/docs/*.md` files; preserve and
  never stage them in this mission.

### Prior Approved Evidence

- Prior final closure:
  `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/17_FINAL_CLOSURE_POINTER.md`.
- Approved execution-plan design:
  `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`.
- Fable5 same-session design re-review: `PASS` at foundation-docs commit
  `75c50cf`; execution readiness remained `HOLD`.
- Phase 2A query scope remains exactly C-1/C-2/C-3 in that plan.

### Target Alias and Source Mechanism

Permitted candidate alias:

`COSMILE_CURRENT_DEV_DB`

Permitted source-mechanism label:

`COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`

The source file exists and is Git-ignored. Its values were not read. The alias
and source label do not prove the actual DB identity, environment, schema, or
privilege boundary.

### Target Classification

Current classification:

`CANDIDATE_ONLY__LEO_ENVIRONMENT_OWNER_ATTESTATION_MISSING`

Branch name, `.env.local`, `COSMILE_ENV`, application defaults, or the word
"development" are not sufficient proof that the destination is non-prod,
non-live, and non-customer-facing.

### Approved Schema

Current status:

`UNRESOLVED_WITHOUT_NON_SECRET_TARGET_EVIDENCE`

Tracked evidence is insufficient to determine the target's actual schema:

- `schema.prisma` specifies PostgreSQL and `env("DATABASE_URL")` but no fixed
  PostgreSQL schema;
- the initial migration creates `public`, but unqualified object placement can
  still depend on the connection/search path;
- prior disposable rehearsal used `cosmile`, which does not prove the current
  development target's schema.

The Worker must not choose `public` or `cosmile` by inference. The package must
require a non-secret provisioning record or Leo/environment-owner attestation.

### Read-Only Role

Current status:

`NO_TRACKED_PROVISIONING_ARTIFACT__EXTERNAL_EXISTENCE_UNKNOWN`

No tracked artifact proves a dedicated read-only role, its role attributes,
memberships, ownership, object grants, inherited/PUBLIC privileges, or default
privileges. This mission must specify the future role and evidence package but
must not create the role or inspect a DB.

The future proof must cover more than positive SELECT grants. It must also show:

- no superuser, create-role, create-db, replication, or bypass-RLS authority;
- no object ownership or write-capable role membership;
- no database/schema create or temporary-object path;
- no INSERT/UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER/EXECUTE/DDL authority;
- only the minimum approved schema/table/catalog reads needed by C-1/C-2/C-3;
- transaction/session read-only as defense in depth, not as the primary proof.

### Secret Injection

Existing policy permits runtime injection through a secret manager, process
environment, container/system service secret, or an owner-restricted local env
file. No dedicated Phase 2A read-only credential source is currently approved.

The package must recommend a dedicated read-only credential source and must not
reuse or expose the full-privilege raw `DATABASE_URL`. Any proposed key name or
source label is metadata only and requires Leo/GPT approval before creation.

### Environment Hygiene

`../Cosmile/app/.env.local` current permission metadata is mode `664` owned by
`leo:leo`. No values were read and no permission was changed.

The package must recommend owner-only mode such as `600` and separate the actual
permission change into an explicitly approved hardening/admin step.

### Active Guardrails

- canonical V2 role protocol;
- Cosmile root/app `CLAUDE.md` and `app/AGENTS.md`;
- `docs/agent/RUN_PROTOCOL.md` and result protocol;
- `app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`;
- `app/docs/security/ENV_AND_MIGRATION_POLICY.md`;
- canonical Commerce Memory design.

## Advisor Decision

Proceed with a design/admin preparation document only. The package must keep
target identity, schema, attestation, role provisioning, credential injection,
and permission hardening as explicit prerequisites and separate execution gates.

No Phase 2A execution launcher may be created in this mission.

## Reviewer Routing Decision

- Target actor: Fable5 Reviewer.
- Selected reviewer: existing separate Fable5 Reviewer session.
- Required skill: `/fable-sentinel`.
- Review level: Level 3 because the package concerns DB privilege, secret,
  schema, and customer-data boundaries.
- Reason: the same reviewer validated the underlying C-1/C-2/C-3 plan and must
  now inspect target/admin boundary design independently.
- Not selected: Worker cannot self-review; Control is prohibited by the mission;
  no additional SOL review was requested.
- Reviewer count: one independent Fable5 design review is sufficient for this
  preparation package; later admin execution and Phase 2A results require their
  own implementation review.
- Status: `WAIT_FOR_WORKER_RESULT`.

