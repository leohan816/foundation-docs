TARGET_ACTOR: Cosmile Worker
TARGET_SESSION: existing Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Cosmile Worker session

이 지시문을 붙여넣을 대상: Cosmile Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션 / Fable5 Reviewer 세션
작업 결과 반환 대상: Advisor

# Cosmile DESIGN_ONLY Handoff

Open and follow:

`../foundation-docs/advisor/jobs/20260710_v3_11c2_phase2a_readonly_preflight_design_approval_package/02_WORKER_BRIEF.md`

Write only the four allowed design/result/pointer files named in the brief.

Do not connect to any DB. Do not test a connection. Do not run a query, migration,
Prisma command that connects to DB, or permission/role command. Do not read or
print `.env.local` values. Use only the key-name and metadata evidence already
recorded by Advisor.

Do not claim the current development DB is approved, non-prod, or read-only unless
the plan identifies sufficient non-secret evidence. The plan may and should
recommend a separate non-prod DB or HOLD if the boundary remains unproven.

Do not modify runtime source, schema, migrations, tests, package files, flags, or
existing untracked docs. Do not create a Phase 2A execution prompt.

Return the evidence-bearing completion package and pointer to Advisor.

