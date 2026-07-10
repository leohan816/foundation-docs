TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

이 지시문을 붙여넣을 대상: 기존 Fable5 Reviewer 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Cosmile Worker 세션
작업 결과 반환 대상: Advisor

# Fable5 DESIGN_REVIEW Re-Review Handoff

Use `/fable-sentinel` in the **same Fable5 Reviewer session** that issued the
original `NEEDS_PATCH` verdict. Do not create a new reviewer session.

## Read Directly

- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/FABLE5_DESIGN_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/13_ADVISOR_FINDING_CLASSIFICATION.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/15_ADVISOR_REWORK_RESULT_VALIDATION.md`
- `../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/WORKER_REWORK_RESULT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/13_WORKER_REWORK_RESULT_POINTER.md`
- `../Cosmile/app/docs/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md`
- relevant Prisma schema and the three active tracked migration files
- canonical Commerce Memory design and canonical V2 role protocol

Inspect the actual Cosmile diff `9e9ad28..453b6c9` and foundation-docs commit
`415436b`. Do not trust Worker or Advisor summaries.

## Fixed Re-Review Questions

1. **F-1:** Does C-2 now match the exact approved index name and complete required
   shape? Test the reasoning against renamed, composite-key, included-column,
   partial, expression, invalid, not-ready, and wrong-column variants. Explicitly
   decide whether `indnkeyatts = 1` is sufficient or whether total index attributes
   must also be constrained.
2. **F-2:** Does C-3b reliably detect migrations outside the exact approved
   three-migration ledger, with no silent extra-migration pass?
3. **F-3:** Are missing-row=`PENDING`, rollback, unfinished, checksum drift,
   applied-match, and unreadable-ledger states explicit and correctly prioritized?
   Are the local checksum constants accurate and the Prisma checksum assumption
   adequately supported?

Also verify mirror equality, scope, output minimization, STOP conditions, and that
the patch introduces no DB access, secret access, write path, Phase 2B expansion,
or execution approval.

## Verdict and Output

Perform `DESIGN_REVIEW` re-review only. Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Report `DESIGN_PACKAGE_QUALITY` separately from
`PHASE2A_EXECUTION_READINESS`. A design PASS does not approve Phase 2A; its
execution status remains `NOT_APPROVED`.

Save the re-review result to:

`../foundation-docs/runs/cosmile/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/FABLE5_DESIGN_REREVIEW_RESULT.md`

Save the pointer to:

`../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/14_FABLE5_DESIGN_REREVIEW_RESULT_POINTER.md`

Commit/push only those foundation-docs result artifacts. Return the pointer to
Advisor. Do not patch files, connect to a DB, inspect secret values, execute a
query or migration, modify runtime files, or create a new session/sub-agent.

