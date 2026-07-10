# Cosmile Worker Brief - Phase 2A Read-Only Preflight Execution Plan

Validation decision: `PROCEED_WITH_LIMITS`

Mode: `DESIGN_ONLY`

## Exact Task

Write the repo-local design document:

`../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`

Mirror it byte-identically to:

`../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`

Document status must be:

`DESIGN_DRAFT_PENDING_FABLE5_REVIEW_AND_LEO_GPT_APPROVAL`

This is an execution-plan design only. Do not create an execution prompt and do
not execute any DB or runtime action.

## Required Inputs

- `../Cosmile/CLAUDE.md`
- `../Cosmile/app/AGENTS.md`
- `../Cosmile/app/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../Cosmile/app/docs/security/ENV_AND_MIGRATION_POLICY.md`
- `../Cosmile/app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`
- `../Cosmile/app/prisma/schema.prisma`
- active V3-11B and D-O1 migration files
- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`
- this job's `00_INTAKE.md` and `01_ADVISOR_BRIEF.md`
- prior Phase 1 final audit and prior Phase 2A approval package

## Required Design Content

1. Exact non-secret target candidate alias. Use
   `COSMILE_CURRENT_DEV_DB_CANDIDATE` unless stronger non-secret repo evidence
   supports a more precise alias.
2. Classification state that distinguishes claimed `development only` from
   `UNPROVEN_PENDING_APPROVAL`.
3. Evidence supporting and evidence missing from that classification.
4. Connection source label only:
   `COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`. Never include a value.
5. Recommended read-only enforcement method and alternatives.
6. Exact allowed command/query list for a future separately approved execution.
7. A no-write justification for each proposed command.
8. Allowed output only: aggregate count, migration status, index/constraint status.
9. Forbidden output: rows, customer/order/payment identifiers, raw env values,
   URL, host, username, password, or token.
10. Checks limited to duplicate `RecOutcomeEvent.orderItemId` group count,
    D-O1 unique constraint/index presence, and migration applied/pending/unknown.
11. STOP conditions.
12. Routing for each expected result.
13. Why rollback is unnecessary for a truly read-only path, plus protection needed
    when that premise is unproven.
14. Evidence Fable5 must inspect.
15. Fallback conditions requiring a separate non-prod DB.
16. Explicit A/B/C recommendation for Leo/GPT without authorizing execution.

## Design Requirements

- Do not treat branch name, `.env.local`, `COSMILE_ENV`, or application defaults
  as proof of DB identity.
- Do not claim a true read-only role exists without a non-secret provisioning or
  permission artifact.
- Prefer a dedicated least-privilege read-only role. Treat transaction-level
  read-only as defense in depth, not equivalent proof.
- A command that opens its own connection must have its no-write behavior proved
  independently; otherwise exclude it and mark STOP.
- Address `.env.local` mode `664` as a secret-hygiene precondition without changing
  permissions or reading values.
- Preserve `RecOutcomeEvent` as the approved one-row-per-OrderItem summary/current
  row. Do not design event-log, refund, cancel, reorder, direct/session, or Phase 2B
  behavior.

## Allowed Writes

- `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/11_WORKER_RESULT_POINTER.md`

## Forbidden

- DB connection, connection test, query, migration, role creation, or permission
  change.
- Reading or printing secret/env values.
- Runtime source, schema, migration, test, package, flag, or config change.
- Phase 2A execution launcher/prompt.
- Phase 2B design or execution.
- Main merge, production/live, Control, or new sub-agent.
- Staging any pre-existing untracked file.

## STOP Conditions

STOP and return to Advisor if:

- branch/HEAD differs from the brief before authoring;
- any staged file already exists;
- any required fact would require DB access or secret-value inspection;
- current DB classification would have to be guessed;
- no exact command can be defended as read-only;
- any write outside the four allowed files is needed;
- canonical Commerce Memory design or V2 role protocol conflicts with the task.

## Completion Evidence

The Worker result must include:

- exact files written and byte-identical mirror proof;
- source documents read;
- exact Git diffs and staged/commit/push status;
- confirmation DB/query/migration/secret-value/runtime access was zero;
- confirmation unrelated untracked files were not staged;
- plan recommendation A/B/C and unresolved approval fields;
- foundation-docs result and pointer paths/commit;
- `RETURN_TO: Advisor`.

Only the design artifact may be committed/pushed in Cosmile. Runtime code remains
untouched. foundation-docs may receive only the mirror, Worker result, and pointer.

