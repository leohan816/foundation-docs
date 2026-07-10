TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Fable5 Level 3 Design Re-Review Round 3 Handoff

Use `/fable-sentinel` in the **same existing Fable5 Reviewer session**. Review
only F-A and F-B from the prior result. Do not reopen closed P-1/P-3 or minor
findings unless the round-2 patch directly regressed them.

## Read Directly

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REREVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/16_ADVISOR_REREVIEW_FINDING_CLASSIFICATION.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/18_ADVISOR_REWORK_ROUND2_VALIDATION.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_REWORK_ROUND2_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/17_WORKER_REWORK_ROUND2_RESULT_POINTER.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its byte-identical foundation-docs mirror

Inspect the actual Cosmile diff `41e5394..e4ed668` and foundation-docs commit
`d0aa1f430b30a95e24c2f9bb56f06b5cec45c1c3`. Do not trust summaries.

## Fixed Questions

1. Is the two-step path internally consistent: create the role without a password,
   then set the credential on the existing role through `psql \password <ROLE>`
   or a verified existing-role equivalent, with `createuser --pwprompt` excluded
   from all active selected paths?
2. Does verifier logging risk STOP before provisioning when safety is unproven,
   and does possible/actual capture become a sensitive incident requiring
   Leo/GPT decisions for log handling and credential reset/rotation, with no
   automatic logging change, log deletion, reset, or rotation?

Verify mirror equality, scope, status, evidence minimization, and that admin and
Phase 2A remain `NOT_APPROVED`.

## Boundaries

Do not access a DB, execute queries/migrations, provision roles, change logging or
permissions, inspect secrets/logs, patch files, modify a repo, create a new
session/sub-agent, or perform implementation review.

## Verdict and Result

Use one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Save the result to:

`../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REREVIEW_ROUND3_RESULT.md`

Save the pointer to:

`../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/19_FABLE5_DESIGN_REREVIEW_ROUND3_RESULT_POINTER.md`

Commit/push only those foundation-docs result artifacts and return the pointer to
Advisor. A PASS does not approve admin work or Phase 2A execution.

Keep Markdown in its existing language/style. Terminal output must be ASCII
English only.

