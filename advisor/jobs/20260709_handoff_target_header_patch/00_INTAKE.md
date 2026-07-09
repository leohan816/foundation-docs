# 00 Intake - Handoff Prompt Target Header Patch

## Job

`20260709_handoff_target_header_patch`

## Leo/GPT Instruction Summary

Add a required target header rule for all Advisor handoff prompt documents so Leo/GPT can clearly identify which actor/session should receive the prompt.

Existing V3-11C2 Worker handoff prompt must be updated to include the target header at the top.

## Goal

- Define the target header rule in Advisor operating rules.
- Mirror the rule in `foundation-docs/advisor/_system/`.
- Update existing V3-11C2 `06_WORKER_HANDOFF_PROMPT.md` with the required header.
- Record this Advisor maintenance job under `foundation-docs/advisor/jobs/`.

## Non-Goals

- Do not implement V3-11C2.
- Do not act as Worker, Sentinel, or Service Reviewer.
- Do not write or execute runtime code.
- Do not modify runtime repositories.
- Do not start a review loop or final audit.

## Required Header Format

```text
TARGET_ACTOR: Worker | Sentinel | Service Reviewer | Worker-Rework | Sentinel-ReReview | Service-ReReview
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: <advisor job path>
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session
```

For Korean-readable prompts, also include:

```text
이 지시문을 붙여넣을 대상: <Worker/Sentinel/Service Reviewer>
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor
```

## Allowed Writes

- `./AGENTS.md`
- `./README.md` if needed
- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md` if needed
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md` if needed
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/index.md`

## Forbidden Actions

- Runtime repo edits.
- `../Cosmile` edits.
- `../SIASIU` edits.
- `../foundation-control` edits.
- `../skill` edits.
- Schema or migration edits.
- DB writes.
- prod/live/main/secret access.
- Implementation start.
- Worker, Sentinel, or Service Reviewer execution.

## Initial Assumptions

- Existing V3-11C2 `06_WORKER_HANDOFF_PROMPT.md` is a Worker handoff prompt and should use `TARGET_ACTOR: Worker`.
- The Korean target lines are required because this prompt is Korean-readable at the top and may be inspected in GPT strategy sessions.
- Foundation-docs Advisor changes may be committed and pushed if staged files remain under `foundation-docs/advisor/` and runtime repo changes are zero.
