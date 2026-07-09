# V3-11C2 Worker Re-Report Run Prompt

Copy only the text between the `========` delimiters into the Cosmile Worker session.

========
TARGET_ACTOR: Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: existing Cosmile Worker session, never Advisor session
REQUIRED_SKILL: /fable-builder
READ_EXISTING_RESULT: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md
READ_EXISTING_POINTER: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md
RESULT_REPORTING_PROTOCOL: ../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Worker 확인.
필요 skill: /fable-builder
이 작업은 Cosmile Worker 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Sentinel 세션, Service Reviewer 세션에서 실행하지 말라.

목표:
기존 V3-11C2 Worker 결과를 새 표준 출력 형식으로 재보고한다.
구현을 다시 실행하거나 수정하지 말라.

반드시 지킬 것:
- 테스트를 다시 실행하지 말라.
- 코드를 변경하지 말라.
- runtime repo 파일을 stage/commit/push하지 말라.
- `WORKER_RESULT.md` 내용을 채팅에 길게 출력하지 말라.
- 새 result 파일을 만들지 말라.
- `WORKER_RESULT.md`는 수정하지 말라.
- `11_WORKER_RESULT_POINTER.md`는 pointer metadata에 명확한 오타가 있을 때만 수정하고, 수정이 필요하면 먼저 STOP하고 보고하라.
- 기억이나 요약만 보고 실행하지 말라.
- scope를 넓히지 말라.

아래 파일을 직접 읽어 metadata만 확인하라:
../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md
../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md

채팅에는 아래 3개 블록만 출력하라:

## RESULT SUMMARY

- Actor:
  Worker

- Target project:
  Cosmile

- Job:
  V3-11C2 Organic RecOutcomeEvent MVI

- Result:
  RESULT_REPORTED

- Runtime repo status:
  not committed

- Foundation-docs commit:
  361c533

## NEXT ACTION ROUTING

- Target actor:
  Advisor

- Target session:
  Advisor session

- Leo action:
  이 POINTER BLOCK을 Advisor 세션에 붙여넣으십시오.

- Return result to:
  Advisor

- Do not send to:
  Worker session, Sentinel session, Service Reviewer session, GPT strategy session

- Status:
  RESULT_READY_FOR_ADVISOR

## POINTER BLOCK

```text
RESULT_WRITTEN
TARGET_PROJECT: Cosmile
ROLE_ACTOR: Worker
RESULT_FILE: ../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md
POINTER_FILE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md
FOUNDATION_DOCS_COMMIT: 361c533
RUNTIME_REPO: ../Cosmile
RUNTIME_BRANCH: shadow/m4-cosmile-memory
RUNTIME_COMMIT_STATUS: not committed
RETURN_TO: Advisor
NEXT_ACTOR: Advisor
```
========
