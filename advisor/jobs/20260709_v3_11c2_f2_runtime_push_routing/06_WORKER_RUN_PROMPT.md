========
보낼 곳: [cosmile Worker 세션]
보내면 안 되는 곳: Advisor / GPT 전략 세션 / Sentinel / Service Reviewer

TARGET_ACTOR: Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: separate Cosmile Worker session, never Advisor session
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Worker 확인.
필요 skill: /fable-builder
이 작업은 [cosmile Worker 세션]에서 실행한다.
Advisor 세션, GPT 전략 세션, Sentinel 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 작업하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/06_WORKER_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
이번 작업은 F-2 cleanup runtime commit ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9의 push-only routing이다.
runtime 파일을 수정하지 말라.
파일을 stage하지 말라.
새 commit을 만들지 말라.
force push하지 말라.
main에 push하거나 merge하지 말라.
반드시 commit ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9 그대로인지 확인하라.
target branch는 origin/shadow/m4-cosmile-memory만 허용된다.
허용된 작업은 push only다.
COSMILE_REC_OUTCOME_ENABLED flag를 ON으로 바꾸지 말라.
DB/prod/live/main/secret에 접근하지 말라.
prisma migrate deploy를 실행하지 말라.
조건이 하나라도 맞지 않으면 즉시 STOP하고 Advisor에게 반환하라.
작업 결과는 Advisor에게 반환할 수 있는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========
