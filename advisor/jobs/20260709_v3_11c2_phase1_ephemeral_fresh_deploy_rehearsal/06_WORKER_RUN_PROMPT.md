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
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Worker 확인.
필요 skill: /fable-builder
이 작업은 [cosmile Worker 세션]에서 실행한다.
Advisor 세션, GPT 전략 세션, Sentinel 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 작업하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/06_WORKER_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
이번 작업은 Phase 1 disposable/ephemeral PostgreSQL fresh deploy rehearsal only다.
real target DB, staging DB, prod/live DB를 사용하지 말라.
secret을 읽지 말라.
실제 고객/주문/결제 데이터를 사용하지 말라.
runtime 파일을 수정하지 말라.
runtime 파일을 stage/commit/push하지 말라.
COSMILE_REC_OUTCOME_ENABLED flag를 ON으로 바꾸지 말라.
main merge/push를 하지 말라.
DB infra가 없으면 PASS라고 하지 말고 SKIP_INFRA_NOT_PASS로 보고하라.
rehearsal 실패 시 수정하지 말고 원인과 결과를 Advisor에게 보고하라.
작업 결과는 Advisor에게 반환할 수 있는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========
