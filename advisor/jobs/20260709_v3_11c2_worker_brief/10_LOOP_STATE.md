# 10 Loop State - V3-11C2 Organic RecOutcomeEvent MVI

## Current State

`HANDOFF_READY`

## Last Updated

2026-07-09 UTC

## Current Actor

Advisor

## Next Required Actor

Worker

## Available Handoff Prompt

- `06_WORKER_HANDOFF_PROMPT.md`

## Completed Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `04_SERVICE_REVIEW_BRIEF.md`
- `06_WORKER_HANDOFF_PROMPT.md`
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

- Leo/GPT manually pastes `06_WORKER_HANDOFF_PROMPT.md` into a separate Worker session.
- Worker result returns to Advisor.
- Advisor compares the result against the original Leo/GPT instruction, Advisor brief, Worker brief, actual diff, tests, and evidence.
- Advisor writes or updates Sentinel and Service Review handoff prompts after Worker result exists.
- If review finds issues, Advisor classifies them before any final audit.
- If patchable within approved scope, Advisor writes `09_REWORK_HANDOFF_PROMPT.md` and updates this loop state.
- Final audit is not allowed until Worker result and required reviews are complete.

## Next Required Action

Leo/GPT should paste `06_WORKER_HANDOFF_PROMPT.md` into a separate Worker session.
