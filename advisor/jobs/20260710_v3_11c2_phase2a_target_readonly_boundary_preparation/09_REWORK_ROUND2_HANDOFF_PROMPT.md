TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Cosmile Worker Design Rework Round 2 Handoff

Work in the same existing Cosmile Worker session. This is a narrow
`DESIGN_ONLY_REWORK`; do not invoke `/fable-builder`.

Read directly:

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REREVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/14_FABLE5_DESIGN_REREVIEW_RESULT_POINTER.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/16_ADVISOR_REREVIEW_FINDING_CLASSIFICATION.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its foundation-docs mirror

## Exact Task

Patch only F-A and F-B exactly as specified in
`16_ADVISOR_REREVIEW_FINDING_CLASSIFICATION.md`.

Do not modify the closed P-1/P-3 mechanisms except for references needed to keep
the F-B STOP/evidence text internally consistent.

Required status:

`DESIGN_DRAFT_PATCHED_AFTER_FABLE5_REREVIEW_NEEDS_PATCH_PENDING_ROUND3`

Keep the two-step flow: create the role without a password, then set the
credential on that existing role through `psql \password <ROLE>` or an
independently verified existing-role equivalent. Remove `createuser --pwprompt`
from this selected path; do not introduce a combined-create alternative.

Add a pre-provisioning server-statement-log safety gate and a sensitive-incident
STOP/Leo decision route for any raw-password or SCRAM-verifier capture. Do not
change logging, reset credentials, rotate credentials, or delete logs.

## Allowed Result Artifacts

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_REWORK_ROUND2_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/17_WORKER_REWORK_ROUND2_RESULT_POINTER.md`

Keep the repo-local plan and mirror byte-identical. Commit/push only the patched
design file in Cosmile and only the mirror, round-2 result, and pointer in
foundation-docs.

## Forbidden

- DB/query/migration/role/grant/revoke/logging/permission/chmod/credential action.
- Secret, password, verifier, env value, log content, or credential URI access or
  output.
- Runtime/schema/migration/test/package/config/flag change.
- Admin/Phase 2A execution prompt, Phase 2B, main, prod/live, Control, or new
  sub-agent.
- Reopening P-1/P-3 or adding a combined createuser flow.

Return the result to Advisor. Terminal output must be ASCII English only. Markdown
files keep their existing language and format.

