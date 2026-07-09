# 01 Advisor Brief - Short Run Prompt / Launcher Protocol Patch

## Verdict

`SHORT_RUN_PROMPT_PROTOCOL_READY`

## Instruction Validation

Decision: `PROCEED`

This is an Advisor operating-rule and Advisor artifact patch. It does not require runtime repository edits, implementation work, schema changes, DB writes, prod/live/main/secret access, or role-session execution.

## Executive Summary

Advisor operating rules now distinguish full handoff prompts from short launcher/run prompts more explicitly. Full handoff prompts hold long role instructions. Short launcher/run prompts are the default artifact Leo/GPT pastes into target role sessions.

Launcher/run prompts must be Korean-readable by default, include the required fields, include active skill prefixes when required, and wrap the actual copy-paste prompt inside `========` delimiters.

The V3-11C2 Worker run prompt was updated to include `/fable-builder`, `TARGET_APP_ROOT`, `DO_NOT_EXECUTE_FROM_MEMORY`, `DO_NOT_BROADEN_SCOPE`, and `========` delimiters.

## Files Updated

Local Advisor cockpit:

- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`

Foundation-docs Advisor files:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`
- `../foundation-docs/advisor/jobs/20260709_short_run_prompt_protocol_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_short_run_prompt_protocol_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_short_run_prompt_protocol_patch/index.md`

## Protocol Added

Launcher/run prompts must include:

- `TARGET_ACTOR`
- `TARGET_PROJECT`
- `TARGET_REPO`
- `TARGET_APP_ROOT` when applicable
- `TARGET_SESSION_NAME`
- `REQUIRED_SKILL` when a skill is required
- `READ_AND_EXECUTE`
- `RETURN_RESULT_TO`
- `DO_NOT_EXECUTE_FROM_MEMORY`
- `DO_NOT_BROADEN_SCOPE`

The copy-paste body must be wrapped in:

```text
========
<COPY-PASTE PROMPT>
========
```

## Skill Prefix Rule

- Worker implementation work uses `/fable-builder`.
- Sentinel independent review work uses `/fable-sentinel`.
- Debugger general debugging work uses `/fable-debugger`.
- `shared-reasoning-core` is not an active launcher skill prefix.

## V3-11C2 Update

Updated:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`

It now uses:

- `TARGET_ACTOR: Worker`
- `TARGET_PROJECT: Cosmile`
- `TARGET_REPO: ../Cosmile`
- `TARGET_APP_ROOT: ../Cosmile/app`
- `TARGET_SESSION_NAME: cosmile`
- `REQUIRED_SKILL: /fable-builder`
- `READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `RETURN_RESULT_TO: Advisor`
- `DO_NOT_EXECUTE_FROM_MEMORY: true`
- `DO_NOT_BROADEN_SCOPE: true`

## Scope Check

- No runtime code was modified.
- No schema or migrations were modified.
- No DB write was performed.
- No prod/live/main/secret access was performed.
- No Worker, Sentinel, or Service Reviewer role was executed.

## Recommended Next Step

Paste the V3-11C2 short Worker run prompt into the Cosmile Worker session.
