# 10 Loop State - V3-11C2 Organic RecOutcomeEvent MVI

## Current State

`WORKER_RESULT_RETURNED_SENTINEL_READY`

## Last Updated

2026-07-09 UTC

## Current Actor

Advisor

## Next Required Actor

Sentinel

## Reviewer Routing Decision

- Target actor:
  Sentinel

- Selected reviewer:
  fable5 Sentinel

- Target session:
  fable5 Sentinel session

- Required skill:
  `/fable-sentinel`

- Reason:
  V3-11C2 touches Cosmile checkout/order outcome event wiring and uncommitted runtime code. The change is default-OFF and has no schema/prod/live change, but it still requires strict independent diff/test/code/evidence review before Service Review or final audit.

- Not selected:
  Control Reviewer: too broad for direct implementation diff review.
  Opus 4.8 Sentinel: acceptable for Level 2, but this task touches checkout/order learning behavior.
  Codex SOL / Codex 5.6 SOL Sentinel: reserve for DB/schema/payment/prod-live/security/Foundation contract escalation or unresolved fable5 risk.
  Multi-reviewer: not required yet because the scope is narrow, feature flag default OFF, and no schema/prod/live changes are approved.

- Review level:
  Level 3

- Return result to:
  Advisor

- Status:
  READY_TO_USE

## Available Prompts

- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `06_WORKER_REREPORT_RUN_PROMPT.md`
- `07_SENTINEL_HANDOFF_PROMPT.md`
- `07_SENTINEL_RUN_PROMPT.md`
- `08_SERVICE_REVIEW_HANDOFF_PROMPT.md`
- `08_SERVICE_REVIEW_RUN_PROMPT.md`

Target header status:

- `06_WORKER_HANDOFF_PROMPT.md` starts with `TARGET_ACTOR: Worker`.
- `06_WORKER_RUN_PROMPT.md` wraps the copy-paste launcher in `========` delimiters and includes `TARGET_ACTOR: Worker`.
- `06_WORKER_REREPORT_RUN_PROMPT.md` wraps the copy-paste launcher in `========` delimiters and includes `TARGET_ACTOR: Worker`.
- `07_SENTINEL_HANDOFF_PROMPT.md` starts with `TARGET_ACTOR: Sentinel`.
- `07_SENTINEL_RUN_PROMPT.md` wraps the copy-paste launcher in `========` delimiters and includes `TARGET_ACTOR: Sentinel`.
- `08_SERVICE_REVIEW_HANDOFF_PROMPT.md` starts with `TARGET_ACTOR: Service Reviewer`.
- `08_SERVICE_REVIEW_RUN_PROMPT.md` wraps the copy-paste launcher in `========` delimiters and includes `TARGET_ACTOR: Service Reviewer`.

## Completed Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `04_SERVICE_REVIEW_BRIEF.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `06_WORKER_REREPORT_RUN_PROMPT.md`
- `07_SENTINEL_HANDOFF_PROMPT.md`
- `07_SENTINEL_RUN_PROMPT.md`
- `08_SERVICE_REVIEW_HANDOFF_PROMPT.md`
- `08_SERVICE_REVIEW_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `11_WORKER_RESULT_POINTER.md`
- `index.md`

## Returned Worker Result

- Worker result file: `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/WORKER_RESULT.md`
- Worker pointer file: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/11_WORKER_RESULT_POINTER.md`
- Foundation-docs result commit reported by Worker: `361c533`
- Runtime repo: `../Cosmile`
- Runtime branch: `shadow/m4-cosmile-memory`
- Runtime commit status: `not committed`

Worker-reported changed files:

- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts`

## Pending Results

- Worker result: returned
- Sentinel review result: pending
- Service review result: pending, do not run until Sentinel result returns to Advisor
- Final audit: blocked until Sentinel and Service Review results are returned to Advisor

Expected Sentinel result storage:

- result file: `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md`
- Advisor pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/12_SENTINEL_RESULT_POINTER.md`
- chat output: short pointer only
- runtime repo commit: forbidden

Expected Service Review result storage:

- result file: `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SERVICE_REVIEW_RESULT.md`
- Advisor pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/13_SERVICE_REVIEW_RESULT_POINTER.md`
- chat output: short pointer only
- runtime repo commit: forbidden

## Rework State

- Rework attempts: 0
- Active rework prompt: none
- Blocking findings: none yet

## Loop Rules

- Leo/GPT manually pastes `07_SENTINEL_RUN_PROMPT.md` into a separate fable5 Sentinel session.
- Sentinel opens and executes the full handoff prompt at `07_SENTINEL_HANDOFF_PROMPT.md`.
- Sentinel is read-only and must not implement, patch, stage, commit, or push runtime repo files.
- Sentinel writes the long result to `../foundation-docs/runs/cosmile/20260709_v3_11c2_rec_outcome/SENTINEL_REVIEW_RESULT.md`.
- Sentinel writes `12_SENTINEL_RESULT_POINTER.md` in this Advisor job folder.
- Sentinel chat output is a short pointer only.
- Sentinel result returns to Advisor through the pointer and result files.
- Advisor compares Sentinel findings against the Worker result, Advisor brief, Worker brief, actual diff, tests, and evidence.
- If Sentinel finds issues, Advisor classifies them before Service Review or final audit.
- Service Review must wait until Sentinel result returns to Advisor.
- Final audit is not allowed until Worker result and required reviews are complete.

## Next Required Action

Leo/GPT should paste `07_SENTINEL_RUN_PROMPT.md` into a separate fable5 Sentinel session.

Do not run `08_SERVICE_REVIEW_RUN_PROMPT.md` until Sentinel result has returned to Advisor and Advisor explicitly routes Service Review.

## NEXT ACTION ROUTING

### Sentinel

- Target actor:
  Sentinel

- Target session:
  Separate fable5 Sentinel session

- Prompt/file to use:
  `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/07_SENTINEL_RUN_PROMPT.md`

- Leo action:
  Paste the short run prompt between `========` delimiters into a separate fable5 Sentinel session.

- Return result to:
  Advisor

- Do not send to:
  Advisor session, Worker session, Service Reviewer session, GPT strategy session

- Status:
  READY_TO_USE

### Service Review

- Target actor:
  Service Reviewer

- Target session:
  Separate Service Reviewer session

- Prompt/file to use:
  `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/08_SERVICE_REVIEW_RUN_PROMPT.md`

- Leo action:
  Do not use yet. Wait until Sentinel result has returned to Advisor and Advisor explicitly routes Service Review.

- Return result to:
  Advisor

- Do not send to:
  Worker session, Sentinel session, GPT strategy session

- Status:
  WAIT_FOR_SENTINEL_RESULT
