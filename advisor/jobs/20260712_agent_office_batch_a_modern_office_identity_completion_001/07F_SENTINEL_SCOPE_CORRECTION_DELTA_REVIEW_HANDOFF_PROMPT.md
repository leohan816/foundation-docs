TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 Foundation SOL Sentinel Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Narrow Delta Review - Actor-Overlay Scope Correction

Required skill: `/fable-sentinel`

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_ACTOR_OVERLAY_SCOPE_CORRECTION_DELTA`

Use the same existing independent `foundation-reviewer-sol` session.

Target repository: `/home/leo/Project/agent-office-batch-a-001`

Target branch: `batch-a/modern-office-identity-001`

Exact delta:

- before: `381b41184994da161db3f5e80f0952f82450925e`
- after: `453c661c4f4243c77b2f53089ec599561876b06f`

## Required Reads

Read directly:

1. `29_ADVISOR_WORKER_SCOPE_EXCEPTION_VALIDATION.md`;
2. `30_ADVISOR_CONTROL_SCOPE_CORRECTION_VALIDATION.md` as routing claims, not proof;
3. the exact commit-fixed four-file delta and after snapshots;
4. `src/ui/pixel/living-office-actor-overlay.tsx`;
5. `src/ui/pixel/living-office-detail-drawer.tsx`;
6. `src/ui/pixel/actor-sprite.tsx`;
7. `src/ui/pixel/prototype-entry.tsx` read-only for composition evidence;
8. `tests/ui/pixel-actor-overlay.test.tsx`;
9. `tests/ui/pixel-world-semantic-parity.test.tsx`;
10. prior fourth design delta PASS result for preserved-boundary context.

Do not trust Control or Advisor summaries as proof. Verify actual Git, text,
source, and test ownership directly.

## Review Questions

Return an explicit answer for each:

1. Is `living-office-actor-overlay.tsx` the actual existing host for per-actor
   compact labels and actor-specific accessible dialog?
2. Are the two added tests the direct coupled tests for overlay and semantic
   frame-panel parity?
3. Does the correction assign BA-WU-03 and BA-WU-04 to a single existing host
   without duplicating/reinventing the placement engine?
4. Is `living-office-detail-drawer.tsx` accurately preserved as a distinct
   frame/evidence technical panel?
5. Is `prototype-entry.tsx` still forbidden for modification?
6. Is the changed-file scope still literal and closed, with no wildcard?
7. Are U1-U3/S3/R2/T3 and all accepted product/security/authority/accessibility/
   fallback/Channy/rollback/no-Grok/excluded-session/Batch B-E boundaries preserved?
8. Does this correction introduce no implementation, product decision, authority
   change, security risk, or residual risk requiring Leo/GPT acceptance?
9. Is the corrected design sufficiently deterministic for the same Worker to
   resume BA-WU-01..09 without inventing component ownership?

## Verdict

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

This is read-only independent design review. Do not patch Agent Office, implement,
change the branch, accept risk, grant approval, or enter Batch B-E.

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_SCOPE_CORRECTION_DELTA_REVIEW_RESULT.md`

Write the Advisor pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/31_SENTINEL_SCOPE_CORRECTION_DELTA_REVIEW_RESULT_POINTER.md`

Commit and push only those exact two Foundation Docs files. Return the pointer to
Advisor and STOP.
