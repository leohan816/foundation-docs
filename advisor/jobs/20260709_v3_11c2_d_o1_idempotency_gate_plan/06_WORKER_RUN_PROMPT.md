========
TARGET_ACTOR: Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: separate Cosmile Worker session, never Advisor session
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Worker 확인.
필요 skill: /fable-builder
이 작업은 Cosmile Worker 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Sentinel 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 작업하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/06_WORKER_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
허용 파일 밖 수정이 필요하면 즉시 STOP하고 보고하라.
COSMILE_REC_OUTCOME_ENABLED flag를 ON으로 바꾸지 말라.
prod/live/main/secret/production DB에 접근하지 말라.
runtime repo 변경은 commit/push하지 말라.
작업 결과는 Advisor에게 반환할 수 있는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========
