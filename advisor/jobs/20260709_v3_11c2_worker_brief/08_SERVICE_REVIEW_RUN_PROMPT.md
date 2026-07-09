# V3-11C2 Service Review Run Prompt

Do not use this prompt until the Sentinel result has returned to Advisor and Advisor explicitly routes Service Review.

Copy only the text between the `========` delimiters into the separate Service Reviewer session when Advisor says it is ready.

========
TARGET_ACTOR: Service Reviewer
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: service-reviewer
TARGET_SESSION: separate Service Reviewer session, never Advisor session
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/08_SERVICE_REVIEW_HANDOFF_PROMPT.md
WORKER_RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md
WORKER_POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md
SENTINEL_RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md
RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SERVICE_REVIEW_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/13_SERVICE_REVIEW_RESULT_POINTER.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Service Reviewer 확인.
이 작업은 별도 Service Reviewer 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Worker 세션, Sentinel 세션에서 실행하지 말라.
Sentinel 결과가 Advisor에게 반환되기 전에는 실행하지 말라.

아래 파일을 직접 열고, 그 파일의 지시를 기준으로 read-only service semantics review를 수행하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/08_SERVICE_REVIEW_HANDOFF_PROMPT.md

기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
코드를 수정하지 말라.
runtime repo 파일을 stage/commit/push하지 말라.
schema/migration/DB/prod/live/main/secret에 접근하지 말라.
Worker report를 신뢰하지 말고 실제 diff/code/evidence를 직접 확인하라.

긴 Service Review 결과는 채팅에 출력하지 말고 아래 파일에 저장하라:
../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SERVICE_REVIEW_RESULT.md

Advisor job folder에는 아래 pointer 파일만 작성하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/13_SERVICE_REVIEW_RESULT_POINTER.md

foundation-docs result/pointer 파일만 commit/push하고, 채팅에는 RESULT SUMMARY / NEXT ACTION ROUTING / POINTER BLOCK만 출력하라.
작업 결과는 Advisor에게 반환하라.
========
