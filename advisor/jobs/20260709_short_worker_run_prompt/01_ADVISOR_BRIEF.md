# 01 Advisor Brief - Short Worker Run Prompt Patch

## Verdict

`SHORT_WORKER_RUN_PROMPT_READY`

## Instruction Validation

Decision: `PROCEED`

This is an Advisor operating-rules and handoff-artifact patch. It does not require runtime repository edits, implementation work, schema changes, DB writes, or role-session execution.

## Executive Summary

The V3-11C2 Worker job now has a short launcher prompt at `06_WORKER_RUN_PROMPT.md`. Leo/GPT should paste this short run prompt into the separate Worker session instead of copying the full handoff prompt body.

Advisor operating rules now distinguish:

- Full handoff prompt: complete role instruction stored in a file.
- Short run prompt / launcher: compact prompt Leo/GPT manually pastes into the target session.

After Hermes is introduced, Hermes should read and execute the `READ_AND_EXECUTE` path from the short run prompt.

## Files Updated

Local Advisor cockpit:

- `./AGENTS.md`
- `./README.md`

Foundation-docs Advisor files:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`
- `../foundation-docs/advisor/jobs/20260709_short_worker_run_prompt/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_short_worker_run_prompt/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_short_worker_run_prompt/index.md`

## Rule Added

- Long instructions stay in full handoff prompt files.
- Leo/GPT should paste short run prompts into role sessions by default.
- Short run prompts point to full handoff prompts through `READ_AND_EXECUTE`.
- After Hermes is introduced, Hermes executes the `READ_AND_EXECUTE` path from the short run prompt.
- `NEXT ACTION ROUTING` should prioritize the short run prompt over the full handoff prompt when both exist.

## V3-11C2 Run Prompt

Created:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`

The run prompt points to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`

## Scope Check

- No runtime code was modified.
- No schema or migrations were modified.
- No DB write was performed.
- No prod/live/main/secret access was performed.
- No Worker, Sentinel, or Service Reviewer role was executed.

## Recommended Next Step

Paste the V3-11C2 short Worker run prompt into a separate Worker session.
