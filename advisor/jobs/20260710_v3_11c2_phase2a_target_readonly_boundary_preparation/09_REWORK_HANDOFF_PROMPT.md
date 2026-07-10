TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Cosmile Worker Design Rework Handoff

Work in the same existing Cosmile Worker session. This is
`DESIGN_ONLY_REWORK`; do not invoke `/fable-builder`.

Read directly:

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/FABLE5_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/12_FABLE5_DESIGN_REVIEW_RESULT_POINTER.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/13_ADVISOR_FINDING_CLASSIFICATION.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its foundation-docs mirror
- the original Worker brief, Advisor validation, and relevant security/env policies

## Exact Task

Patch only:

- `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
- its byte-identical foundation-docs mirror

Resolve P-1, P-2, P-3 and the two minor precision items exactly as specified in
`13_ADVISOR_FINDING_CLASSIFICATION.md`.

Required document status after patch:

`DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`

Do not make an automatic policy choice when PUBLIC privileges are present. The
plan must STOP and require a separately reviewed Leo/GPT decision among safe
remediation options. Do not authorize or execute broad PUBLIC revokes.

Remove raw password literals from the inert SQL template. Define separate secure
credential provisioning and execution-injection contracts without placing any
secret or credential-bearing URI in the document.

Make `NOINHERIT` required and add `catalog_read_verified` plus the effective
PUBLIC/ownership/membership/default-privilege evidence statuses required by the
classification.

## Allowed Result Artifacts

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/WORKER_REWORK_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_target_readonly_boundary_preparation/13_WORKER_REWORK_RESULT_POINTER.md`

Keep the repo-local plan and mirror byte-identical. Commit/push only the patched
design file in Cosmile and only the mirror, rework result, and pointer in
foundation-docs. Preserve unrelated files.

## Forbidden

- DB connection/test, query, migration, role creation, grant/revoke, permission
  change, chmod, or credential creation.
- Secret/env value read, output, copy, logging, or URI construction.
- Runtime/schema/migration/test/package/config/flag change.
- Phase 2A execution prompt, Phase 2B work, main merge, prod/live access, Control,
  or new sub-agent.
- Automatic acceptance of residual PUBLIC/TEMP/CONNECT/CREATE privileges.

Return the rework result to Advisor. Terminal `RESULT SUMMARY`, routing, and
POINTER BLOCK must be ASCII English only. Markdown files keep their existing
language and format; do not translate unrelated content.

