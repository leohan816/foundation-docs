TARGET_ACTOR: Worker
TARGET_PROJECT: Cosmile
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: separate role session, never Advisor session
TARGET_REPO: ../Cosmile
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

Worker 확인.

Open and execute exactly:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`

Do not execute from memory.
Do not broaden scope.
Return result to Advisor.
