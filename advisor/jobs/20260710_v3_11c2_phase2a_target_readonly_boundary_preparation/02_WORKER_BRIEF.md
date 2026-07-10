# Cosmile Worker Brief - Phase 2A Target and Read-Only Boundary Plan

Validation decision: `PROCEED_WITH_LIMITS`

Work mode: `DESIGN_AND_ADMIN_PREPARATION_ONLY`

Phase 2A execution status: `NOT_APPROVED`

## Exact Task

Write the repo-local plan:

`../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`

Mirror it byte-identically to:

`../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`

Document status:

`DESIGN_DRAFT_PENDING_FABLE5_REVIEW_AND_LEO_GPT_APPROVAL`

This is a prerequisite design/admin package only. Do not create an execution
launcher and do not perform any DB, secret, permission, or runtime action.

## Required Inputs

- Cosmile root/app active instructions and agent protocols.
- Cosmile security and env/migration policies.
- `../Cosmile/app/prisma/schema.prisma` and tracked active migrations.
- approved Phase 2A execution plan and its Fable5 re-review result.
- canonical Commerce Memory design.
- canonical V2 role protocol.
- this job's `00_INTAKE.md` and `01_ADVISOR_BRIEF.md`.

## Required Content

### 1. Target Identity Package

- alias: `COSMILE_CURRENT_DEV_DB`;
- source mechanism: `COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`;
- values, URL, host, username, password, and token must never appear;
- classification fields: development-only, non-prod, non-live,
  non-customer-facing;
- a Leo/environment-owner attestation template with actor, date, alias,
  classification booleans, approved schema, evidence-reference path, and expiry
  or revalidation trigger;
- status must remain unapproved until the attestation is completed and approved.

### 2. Approved Schema Package

- do not infer `public` or `cosmile`;
- distinguish tracked hints from target-specific proof;
- define acceptable non-secret evidence, such as an approved provisioning record,
  environment inventory record, or owner attestation;
- keep the schema `UNRESOLVED` if no such evidence exists.

### 3. Least-Privilege Read-Only Role Specification

Define a non-secret role alias and a permission matrix for a future separate admin
step. It must cover:

- database CONNECT only as required;
- approved schema USAGE only;
- SELECT only on the exact application objects needed by C-1/C-3
  (`RecOutcomeEvent` and `_prisma_migrations`);
- only the catalog visibility needed by C-2;
- no INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER, EXECUTE, CREATE, DDL,
  TEMP, ownership, write-capable membership, or broad application-table SELECT;
- role attributes: no superuser, create-db, create-role, replication, or bypass-RLS;
- inherited/PUBLIC grants, default privileges, role membership, and ownership must
  be accounted for explicitly;
- transaction/session read-only may be defense in depth but is not a substitute
  for the least-privilege role.

The document may include inert, parameterized admin SQL templates with placeholders
only if clearly marked `DO_NOT_EXECUTE__SEPARATE_ADMIN_APPROVAL_REQUIRED`. It must
not include real DB, schema, username, credential, or secret values.

### 4. Provisioning Evidence Contract

Define the boolean/count/status-only evidence that a later admin step must return:

- role attributes safe;
- memberships/ownership absent;
- required CONNECT/USAGE/SELECT present;
- forbidden privileges absent;
- inherited/PUBLIC/default privilege paths assessed;
- credential source created without exposing its value;
- no DB rows, raw grants containing sensitive identifiers, or credentials printed.

Role provisioning itself is out of scope and must be a separate approved admin
execution mission with post-action review.

### 5. Masked Credential Injection

- recommend a dedicated Phase 2A read-only credential source;
- do not reuse the full-privilege raw `DATABASE_URL`;
- propose only a key name/source label, never a value;
- compare secret-manager/process-local/owner-restricted-file options;
- select a recommended local-development path and explain masking, lifetime,
  cleanup, and accidental-output prevention;
- any source creation or value injection is a separate approval step.

### 6. `.env.local` Hygiene

- record current metadata as mode `664`, values unread;
- recommend owner-only permission such as `600`;
- define verification as permission metadata/status only;
- prohibit value reads, copies, logs, or Git changes;
- actual permission change requires separate approval.

### 7. Query Package Pointer

Point to C-1/C-2/C-3 in:

`../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`

Do not copy, broaden, execute, or turn those queries into an execution prompt.

### 8. Review and STOP Routing

- Fable5 `DESIGN_REVIEW` of this plan before any admin step;
- a separate post-admin review before Phase 2A approval;
- Fable5 `IMPLEMENTATION_REVIEW` after any later Phase 2A execution result;
- exact STOP conditions for missing identity, schema, attestation, least privilege,
  credential masking, hygiene, evidence, or scope compliance;
- expected final recommendation state A, B, or C without granting approval.

### 9. Exact Leo/GPT Approval Fields

List every field Leo/GPT must approve before:

1. role/permission or hygiene admin preparation;
2. Phase 2A execution consideration;
3. post-result routing.

## Allowed Writes

- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/11_WORKER_RESULT_POINTER.md`

## Forbidden

- DB connection, connection test, query, migration, role creation, grant/revoke,
  permission change, or `.env.local` chmod.
- Secret/env value read, output, copy, or logging.
- Runtime source, schema, migration, test, package, config, or flag change.
- Phase 2A execution prompt or Phase 2B work.
- Main merge, prod/live access, Control, or new sub-agent.
- Staging any pre-existing untracked file.

## STOP Conditions

STOP and return to Advisor if:

- branch/HEAD/upstream differs from the brief before authoring;
- any staged or tracked unrelated change exists;
- a required fact would need DB access or secret-value inspection;
- target classification or schema would have to be guessed;
- an effective read-only boundary cannot be specified without unexamined inherited
  privileges, ownership, or PUBLIC/default grants;
- any write outside the four allowed files is needed;
- the task would create an execution launcher or provision anything.

## Completion Evidence

Return an evidence-bearing package containing:

- exact files written and byte-identical mirror proof;
- source documents read;
- actual diff and commit/push status;
- target/schema/role/credential/hygiene status;
- explicit unresolved fields and recommendation A/B/C;
- confirmation of zero DB/query/migration/role/permission/secret/runtime access;
- confirmation unrelated untracked files were excluded;
- foundation-docs result/pointer paths and commit;
- `RETURN_TO: Advisor`.

Only the repo-local design artifact may be committed/pushed in Cosmile. The
foundation-docs mirror, Worker result, and pointer may be committed/pushed in
foundation-docs. No runtime file may be staged or committed.

