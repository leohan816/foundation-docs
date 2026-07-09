# 10 Loop State - V3-11C2 Organic RecOutcomeEvent MVI

## Current State

`HANDOFF_READY`

## Last Updated

2026-07-09 UTC

## Current Actor

Advisor

## Next Required Actor

Worker

## Available Prompts

- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`

Target header status:

- `06_WORKER_HANDOFF_PROMPT.md` starts with `TARGET_ACTOR: Worker`.
- `06_WORKER_RUN_PROMPT.md` wraps the copy-paste launcher in `========` delimiters and includes `TARGET_ACTOR: Worker`.
- `06_WORKER_RUN_PROMPT.md` includes `REQUIRED_SKILL: /fable-builder`.
- Target session is a separate Worker role session, never the Advisor session.

## Completed Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `04_SERVICE_REVIEW_BRIEF.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `index.md`

## Pending Results

- Worker result: pending
- Sentinel review result: pending
- Service review result: pending
- Final audit: blocked until Worker result and required reviews are returned to Advisor

## Rework State

- Rework attempts: 0
- Active rework prompt: none
- Blocking findings: none yet

## Loop Rules

- Leo/GPT manually pastes `06_WORKER_RUN_PROMPT.md` into a separate Worker session.
- Worker opens and executes the full handoff prompt at `06_WORKER_HANDOFF_PROMPT.md`.
- Worker result returns to Advisor.
- Advisor compares the result against the original Leo/GPT instruction, Advisor brief, Worker brief, actual diff, tests, and evidence.
- Advisor writes or updates Sentinel and Service Review handoff prompts after Worker result exists.
- If review finds issues, Advisor classifies them before any final audit.
- If patchable within approved scope, Advisor writes `09_REWORK_HANDOFF_PROMPT.md` and updates this loop state.
- Final audit is not allowed until Worker result and required reviews are complete.

## Next Required Action

Leo/GPT should paste `06_WORKER_RUN_PROMPT.md` into a separate Worker session.

## NEXT ACTION ROUTING

- Target actor:
  Worker

- Target session:
  Separate Worker session

- Prompt/file to use:
  `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`

- Leo action:
  Paste the short run prompt between `========` delimiters into an existing or separate Cosmile Worker session. The Worker must read and execute the full handoff prompt referenced by `READ_AND_EXECUTE`.

- Return result to:
  Advisor

- Do not send to:
  Advisor session, Sentinel session, Service Reviewer session, GPT strategy session

- Status:
  READY_TO_USE

Short run prompt:

```text
========
TARGET_ACTOR: Worker
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: existing or separate Cosmile Worker session, never Advisor session
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
Worker 확인.
필요 skill: /fable-builder
이 작업은 Cosmile Worker 세션에서 실행한다.
Advisor 세션, GPT 전략 세션, Sentinel 세션, Service Reviewer 세션에서 실행하지 말라.
아래 파일을 직접 열고, 그 파일의 지시를 기준으로 작업하라:
../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md
기억이나 요약만 보고 실행하지 말라.
scope를 넓히지 말라.
허용 파일 밖 수정이 필요하면 즉시 STOP하고 보고하라.
작업 결과는 Advisor에게 반환할 수 있는 형식으로 보고하라.
========
```
