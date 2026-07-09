========
보낼 곳: [검수자-fable5 세션]
보내면 안 되는 곳: Advisor / GPT 전략 세션 / cosmile Worker / Service Reviewer

TARGET_ACTOR: Sentinel
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: 검수자-fable5
TARGET_SESSION: separate fable5 Sentinel session, never Advisor session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/07_SENTINEL_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Sentinel 확인.
필요 skill: /fable-sentinel
이 작업은 [검수자-fable5 세션]에서 실행한다.
Advisor 세션, GPT 전략 세션, cosmile Worker 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 검수하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_sqlite_migration_cleanup_gate/07_SENTINEL_HANDOFF_PROMPT.md

기억이나 요약만 보고 검수하지 말라.
Worker 보고를 신뢰하지 말고 실제 diff/code/result를 직접 확인하라.
read-only 검수만 수행하라.
runtime 파일을 수정하지 말라.
파일을 stage/commit/push하지 말라.
DB/prod/live/main/secret에 접근하지 말라.
prisma migrate deploy를 실행하지 말라.
COSMILE_REC_OUTCOME_ENABLED flag를 ON으로 바꾸지 말라.
검수 결과는 Advisor에게 반환할 수 있는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========
