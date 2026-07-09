# V3-11C2 Sentinel Run Prompt

Copy only the text between the `========` delimiters into the fable5 Sentinel session.

========
TARGET_ACTOR: Sentinel
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: fable5-sentinel
TARGET_SESSION: separate fable5 Sentinel session, never Advisor session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/07_SENTINEL_HANDOFF_PROMPT.md
WORKER_RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md
WORKER_POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md
RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/12_SENTINEL_RESULT_POINTER.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Sentinel 확인.
필요 skill: /fable-sentinel
이 작업은 별도 fable5 Sentinel 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Worker 세션, Service Reviewer 세션에서 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 read-only 검수를 수행하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/07_SENTINEL_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
코드를 수정하지 말라.
runtime repo 파일을 stage/commit/push하지 말라.
schema/migration/DB/prod/live/main/secret에 접근하지 말라.
Worker report를 신뢰하지 말고 실제 diff/test/code/evidence를 직접 확인하라.

긴 검수 결과는 채팅에 출력하지 말고 아래 파일에 저장하라:
../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md

Advisor job folder에는 아래 pointer 파일만 작성하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/12_SENTINEL_RESULT_POINTER.md

foundation-docs result/pointer 파일만 commit/push하고, 채팅에는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK만 출력하라.
작업 결과는 Advisor에게 반환하라.
========
