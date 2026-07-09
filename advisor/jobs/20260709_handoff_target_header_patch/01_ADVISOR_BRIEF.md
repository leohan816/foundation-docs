# 01 Advisor Brief - Handoff Prompt Target Header Patch

## Verdict

`HANDOFF_TARGET_HEADER_PATCH_READY`

## Instruction Validation

Decision: `PROCEED`

The instruction is an Advisor operating-rules maintenance patch. It does not require runtime repository edits, implementation work, schema changes, DB writes, or role-session execution.

## Executive Summary

Advisor handoff prompt conventions now require every handoff prompt document to start with an explicit target header before the copy-paste prompt body. The header identifies the target actor, target session, source Advisor job, forbidden Advisor-session destination, result return path, and GPT direct-use limitation.

The existing V3-11C2 Worker handoff prompt was updated to start with `TARGET_ACTOR: Worker` and Korean-readable target lines.

## Files Checked

- `./AGENTS.md`
- `./README.md`
- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`

## Files Updated

Local Advisor cockpit:

- `./AGENTS.md`
- `./README.md`

Foundation-docs Advisor files:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_handoff_target_header_patch/index.md`

## Rule Added

Every handoff prompt must start with:

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

## V3-11C2 Prompt Update

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md` now starts with:

```text
TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session
```

It also includes the required Korean-readable target lines before the prompt title and copy-paste body.

## Scope Check

- No runtime code was modified.
- No schema or migrations were modified.
- No DB write was performed.
- No prod/live/main/secret access was performed.
- No Worker, Sentinel, or Service Reviewer role was executed.

## Recommended Next Step

Use the updated V3-11C2 Worker handoff prompt only in a separate Worker session.
