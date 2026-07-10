TARGET_ACTOR: Worker
TARGET_SESSION: existing separate Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Cosmile Worker Design/Admin Preparation Handoff

Work in the existing Cosmile Worker session. This is
`DESIGN_AND_ADMIN_PREPARATION_ONLY`; do not invoke `/fable-builder`.

Read directly:

- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/02_WORKER_BRIEF.md`
- all required active instructions and evidence named in the Worker brief

Create only the approved target/read-only-boundary design package, its
byte-identical mirror, Worker result, and pointer.

Do not connect to a DB, test a connection, run a query or migration, create a
role, grant/revoke privileges, change permissions, inspect secret values, modify
runtime/schema/migrations/tests/packages/config/flags, or create a Phase 2A
execution prompt.

If identity, schema, or privilege facts are not proven by non-secret artifacts,
keep them unresolved and provide the exact attestation/admin evidence contract.
Do not infer them.

Commit/push only the repo-local design document in Cosmile and only the mirror,
Worker result, and pointer in foundation-docs. Preserve all unrelated files.

Return the ASCII pointer block to Advisor. Human-readable Korean may be written
inside UTF-8 Markdown result files, but terminal transport text must be ASCII-only.

