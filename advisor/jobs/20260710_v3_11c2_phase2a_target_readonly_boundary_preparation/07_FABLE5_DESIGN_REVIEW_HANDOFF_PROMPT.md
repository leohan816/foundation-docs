TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Fable5 Level 3 Design Review Handoff

Use `/fable-sentinel` in the existing separate Fable5 Reviewer session. Perform
`DESIGN_REVIEW` only.

## Read Directly

- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/03_FABLE5_DESIGN_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/04_ADVISOR_WORKER_RESULT_VALIDATION.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/11_WORKER_RESULT_POINTER.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its byte-identical foundation-docs mirror
- prior approved C-1/C-2/C-3 execution plan and Fable5 PASS result
- relevant Cosmile schema/migrations/security/env policies and canonical designs

Inspect the actual commits and diffs:

- Cosmile: `0ec8667a66b7d6973bb4508a234d638a81d69b2c`
- foundation-docs: `03d856562ee1d97726a28125de0e9733a0480cd2`

Do not trust Worker or Advisor summaries.

## Required Review Coverage

Review every criterion in `03_FABLE5_DESIGN_REVIEW_BRIEF.md` and explicitly
answer the seven questions in `04_ADVISOR_WORKER_RESULT_VALIDATION.md`.

Pay particular attention to:

- whether PUBLIC/default privileges, TEMP/CONNECT, ownership, memberships,
  inheritance, role attributes, schema CREATE, and future-object grants make the
  proposed least-privilege proof feasible;
- whether the inert password template and future role provisioning need a safer
  secret channel before this design can PASS;
- whether process-local credential injection prevents argv/history/process/env/
  debug/log leakage rather than merely avoiding a tracked file;
- whether the target attestation and schema evidence are concrete, non-circular,
  expiring/revalidated, and do not guess the target;
- whether `.env.local` hygiene and each admin action remain separately approved;
- whether no query scope, role action, permission action, or Phase 2A execution
  approval is smuggled into the design package.

## Boundaries

Do not connect to a DB, test a connection, execute a query/migration, create or
alter a role, grant/revoke privileges, chmod files, inspect secret values, patch
the plan, modify any repository, create a new session/sub-agent, or perform an
implementation review.

## Verdict and Result

Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Save the full result to:

`../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REVIEW_RESULT.md`

Save the pointer to:

`../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`

Commit/push only those foundation-docs result artifacts. Return the pointer to
Advisor. A design PASS does not approve admin provisioning, permission hardening,
credential creation, DB access, or Phase 2A execution.

The UTF-8 result file may contain Korean for human readability. Terminal output
must provide a Korean human summary followed by a separate ASCII-only POINTER
BLOCK. Leo copies only the ASCII block between sessions.

