TARGET_ACTOR: Sentinel-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 같은 기존 Foundation Reviewer SOL 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Control / Worker / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Delta Re-Review - PRC-1 Through PRC-8

Required skill: `/fable-sentinel`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Mode: independent read-only delta re-review; no patch.

Target: `/home/leo/Project/agent-office-batch-a-001`

Before: `2e0dddfcd8131206f63780c7613bc7d1a03f496d`

After: `e8531a306a28b4f2858a49b32cc2b3c1bfb4ce6d`

Read directly:

1. your prior full `SENTINEL_PRODUCTION_RENDER_CONTRACT_DELTA_REVIEW_RESULT.md`;
2. `37_ADVISOR_SENTINEL_PRODUCTION_RENDER_REVIEW_VALIDATION.md`;
3. `38_ADVISOR_CONTROL_PRC1_PRC8_VALIDATION.md` as routing/challenge, not proof;
4. exact delta `2e0dddf..e8531a3` and all four resulting canonical docs;
5. every actual source/test path cited by PRC-1 through PRC-8.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Required Questions

For each PRC-1 through PRC-8 return `CLOSED`, `PARTIAL__BLOCKING`,
`NOT_CLOSED`, or `REGRESSION` with direct evidence.

Explicitly verify:

- registry, RT, attestation, and visual-config authority labels per field;
- no second WorkUnit/gate/progress truth;
- cues are exactly empty and diagnostics cannot create operational motion;
- owned sentinels and duplicate identity handling;
- complete deterministic layout/pod/project/Advisor/membership/selection/count
  contract without visual authority inference;
- actual raw `LivingOfficePresentationV1` validation in `client.ts` before state,
  then complete composed-input validation before lazy render;
- raw shape versus wrapper shape is not conflated;
- production and prototype call chains, shared extraction, structural DOM props,
  and exact no-fixture/no-prototype-type edges;
- exact Vite JS API/Rollup output/module/import-edge proof is implementable;
- one literal validator test path and complete closed file list;
- the six additional exact questions in Advisor validation 38;
- U1-U3/S3/R2/T3, WU-02/03/04, product/accessibility/security/authority/
  fallback/Channy/rollback/no-Grok/excluded-session/Batch B-E boundaries.

Do not trust Control or Advisor summaries. Do not patch, implement, resume Worker,
accept risk, or approve.

## Verdict

Return exactly `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Write result:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_PRC1_PRC8_DELTA_REREVIEW_RESULT.md`

Write pointer:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/39_SENTINEL_PRC1_PRC8_DELTA_REREVIEW_RESULT_POINTER.md`

Commit/push only those exact two foundation-docs files. Return to Advisor and
STOP.

