========
TARGET_ACTOR: Fable5 Design Reviewer
TARGET_PROJECT: Cosmile
TARGET_REPO: none
TARGET_APP_ROOT: none
TARGET_SESSION_NAME: fable5
TARGET_SESSION: separate Fable5 review session, never Advisor session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/07_FABLE5_DESIGN_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Fable5 Design Reviewer 확인.
필요 skill: /fable-sentinel
이 작업은 Fable5 독립 설계검수 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Worker 세션, Cosmile Worker 세션에서 실행하지 말라.
아래 파일을 직접 열고, 그 파일의 지시를 기준으로 설계검수만 수행하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/07_FABLE5_DESIGN_REVIEW_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
구현하지 말라.
patch하지 말라.
DB 접속, query 실행, migration 실행, runtime repo 수정, Worker handoff 작성은 금지다.
Phase 2A 또는 Phase 2B를 실행하지 말라.
secret 또는 raw DATABASE_URL을 출력하지 말라.
결과는 Advisor에게 반환할 수 있는 표준 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK 형식으로 보고하라.
========

