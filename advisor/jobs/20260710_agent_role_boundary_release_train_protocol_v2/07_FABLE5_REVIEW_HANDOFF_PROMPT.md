TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: existing separate Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

이 지시문을 붙여넣을 대상: Fable5 Reviewer
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Worker 세션
작업 결과 반환 대상: Advisor

# Fable5 Independent Review Handoff

Use `/fable-sentinel` and directly read:

1. `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
2. `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/00_INTAKE.md`
3. `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/01_ADVISOR_BRIEF.md`
4. `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/02_PROPAGATION_COMMIT_REGISTER.md`
5. `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/03_ADVISOR_SELF_CHECK.md`
6. `../foundation-docs/advisor/jobs/20260710_agent_role_boundary_release_train_protocol_v2/04_FABLE5_REVIEW_BRIEF.md`

Inspect the actual files and commits named in the commit register. Do not rely on
Advisor summaries. Read every changed instruction/reference file and compare each
diff against its parent commit.

Perform two separate passes:

- `DESIGN_REVIEW` of the canonical protocol.
- `IMPLEMENTATION_REVIEW` of propagation, commits, references, exclusions, and
  runtime-unchanged evidence.

Write separate result artifacts and one pointer exactly as specified in the review
brief. Use only `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL` for each pass.

Do not patch. Do not modify reviewed repos. Do not create a new session or
sub-agent. Do not reload any actor session. Do not approve final mission closure.
Return both results to Advisor.

