TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

이 지시문을 붙여넣을 대상: Fable5 Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Cosmile Worker 세션
작업 결과 반환 대상: Advisor

# Fable5 DESIGN_REVIEW Handoff

Use `/fable-sentinel` in the existing Fable5 Reviewer session.

Directly read:

- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/03_FABLE5_DESIGN_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/04_ADVISOR_WORKER_RESULT_VALIDATION.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- its foundation-docs mirror
- Worker result and pointer
- canonical Commerce Memory design
- canonical V2 role protocol
- relevant Prisma schema, V3-11B/D-O1 migrations, and Cosmile security/env policies

Inspect actual commits:

- Cosmile: `9e9ad28e83e6d505a2d7abd3b33b44c695b3dfad`
- foundation-docs: `b585a501be6fdce8e4193d45d5262215459550e3`

Perform `DESIGN_REVIEW` only. Do not connect to DB, inspect secret values, execute
queries/migrations, patch the design, modify any repo, or create a new session or
sub-agent.

Explicitly report both:

- `DESIGN_PACKAGE_QUALITY`
- `PHASE2A_EXECUTION_READINESS`

The design can PASS while execution remains HOLD if the plan correctly blocks on
missing identity/read-only evidence. A PASS does not approve Phase 2A.

Use one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`. Include
reviewed artifacts/files/diffs/references, explicit criterion coverage, excluded
scope, conflicts, unresolved risks, and rationale. Save the result and pointer at
the exact paths in the review brief, commit/push foundation-docs result artifacts
only, and return the pointer to Advisor.

