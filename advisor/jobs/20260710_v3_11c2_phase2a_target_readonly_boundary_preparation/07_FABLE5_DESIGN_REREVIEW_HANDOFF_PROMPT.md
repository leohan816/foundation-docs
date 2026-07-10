TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Fable5 Level 3 Design Re-Review Handoff

Use `/fable-sentinel` in the **same existing Fable5 Reviewer session** that issued
the original `NEEDS_PATCH` verdict. Perform `DESIGN_REVIEW` re-review only.

## Read Directly

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/13_ADVISOR_FINDING_CLASSIFICATION.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/15_ADVISOR_REWORK_RESULT_VALIDATION.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_REWORK_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/13_WORKER_REWORK_RESULT_POINTER.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its byte-identical foundation-docs mirror
- original Worker brief, Advisor validation, security/env policies, and prior
  approved Phase 2A query plan

Inspect the actual diffs and commits:

- Cosmile diff `0ec8667..41e5394`
- foundation-docs commit `dccedbba017f903c80773ec58e15cc86eb18458e`

Do not trust Worker or Advisor summaries.

## Fixed Re-Review Questions

1. Does P-1 define an executable, non-automatic STOP/decision route for PUBLIC
   TEMP, unintended other-database CONNECT, and public-schema CREATE, with broad
   revoke blast radius and residual-risk acceptance reserved for Leo/GPT?
2. Does P-2 prevent raw password and SCRAM-verifier exposure in SQL, argv,
   shell/psql history, process state, server logs, evidence, and results? Verify
   the technical claims about `psql \password` and `createuser --pwprompt`,
   including whether the latter conflicts with separate role creation.
3. Does P-3 block execution-credential leakage through inline literals, argv,
   echo/xtrace, env dumps, child inheritance, lifetime/cleanup, and same-user/root
   `/proc` visibility, with unresolved host trust becoming STOP?

Also verify `NOINHERIT`, `catalog_read_verified`, evidence minimization, mirror
equality, scope, and all design/admin/execution gate separations.

## Boundaries

Do not connect to a DB, execute a query/migration, provision a role, grant/revoke,
chmod, inspect secret values, patch files, modify a repo, create a new
session/sub-agent, or perform implementation review.

## Verdict and Result

Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Save the result to:

`../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REREVIEW_RESULT.md`

Save the pointer to:

`../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/14_FABLE5_DESIGN_REREVIEW_RESULT_POINTER.md`

Commit/push only those foundation-docs result artifacts and return the pointer to
Advisor. A re-review PASS does not approve admin work or Phase 2A execution.

Keep the Markdown result in its existing language/style convention. Terminal
`RESULT SUMMARY`, routing, and POINTER BLOCK must be ASCII English only.

