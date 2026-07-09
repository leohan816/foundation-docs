# 00 Intake - Short Worker Run Prompt Patch

## Job

`20260709_short_worker_run_prompt`

## Leo/GPT Instruction Summary

Create a short launcher/run prompt for the V3-11C2 Worker job because the full handoff prompt is too long for Leo to manually copy and paste comfortably. Update Advisor operating rules so future handoff jobs distinguish full handoff prompts from short run prompts.

## Goal

- Add `06_WORKER_RUN_PROMPT.md` to the V3-11C2 Worker brief job.
- Update Advisor operating rules to make short run prompts the default manual paste artifact.
- Update current V3-11C2 loop state to route Leo/GPT to the short run prompt.
- Publish the Advisor artifacts to foundation-docs.

## Non-Goals

- Do not implement V3-11C2.
- Do not act as Worker, Sentinel, or Service Reviewer.
- Do not modify runtime repositories.
- Do not start any role session.

## Required V3-11C2 Run Prompt Contents

- `TARGET_ACTOR: Worker`
- `TARGET_PROJECT: Cosmile`
- `TARGET_SESSION_NAME: cosmile`
- `TARGET_REPO: ../Cosmile`
- `READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- `Do not execute from memory.`
- `Do not broaden scope.`
- `Return result to Advisor.`

## Forbidden Actions

- Runtime repo edits.
- Implementation start.
- Worker execution.
- Sentinel execution.
- Service Reviewer execution.
- Schema or migration edits.
- DB writes.
- prod/live/main/secret access.

## Initial Assumptions

- The full V3-11C2 Worker handoff prompt remains the authoritative role instruction.
- The short run prompt is only a launcher that tells the Worker to open and execute the full handoff file.
- Hermes is not active yet; Leo/GPT manually pastes the run prompt for now.
