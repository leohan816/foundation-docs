========
TARGET_ACTOR: Sentinel
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: fable5-sentinel
TARGET_SESSION: separate fable5 Sentinel session, never Advisor session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/07_SENTINEL_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Sentinel 확인.
필요 skill: /fable-sentinel
이 작업은 fable5 Sentinel 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Worker 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 read-only 검수를 수행하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/07_SENTINEL_HANDOFF_PROMPT.md

Worker 결과를 믿지 말고 직접 diff/schema/migration/test/evidence를 확인하라.
runtime code를 수정하지 말라.
stage/commit/push 하지 말라. 단, foundation-docs의 Sentinel result/pointer 파일만 결과 저장용으로 commit/push할 수 있다.
prod/live/main/secret/production DB에 접근하지 말라.
DB rehearsal은 non-prod/ephemeral 환경에서만 가능하다.
DB rehearsal을 실행할 수 없으면 PASS라고 쓰지 말고, SKIP/NEEDS_VERIFICATION/RISK를 명확히 보고하라.
작업 결과는 Advisor에게 반환할 수 있는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========
