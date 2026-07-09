# Agent Run Protocol - foundation-docs

## Target

- `TARGET_PROJECT`: `foundation-docs`
- `TARGET_REPO`: `../foundation-docs`
- `TARGET_APP_ROOT`: not applicable

## Role Boundary

foundation-docs owns:

- advisor artifacts
- evidence reports
- architecture docs
- run result archives
- mirrored operating rules

foundation-docs must not be treated as runtime behavior source when runtime code differs.

## Orchestration

Advisor is the orchestration controller. Worker, Sentinel, and Service Reviewer sessions execute only the role assigned by Advisor handoff/run prompts.

Role results return to Advisor. Final approval remains Leo/GPT only.

## Launcher First

Use launcher/run prompts before full handoff prompts.

When a launcher contains `READ_AND_EXECUTE`, open and read that file directly before acting.

Required launcher invariants:

- `DO_NOT_EXECUTE_FROM_MEMORY: true`
- `DO_NOT_BROADEN_SCOPE: true`

Do not execute from memory or summaries. Do not broaden scope beyond the referenced handoff.

## Skill Prefix Rules

- Worker implementation: `/fable-builder`
- Sentinel review: `/fable-sentinel`
- Debugger: `/fable-debugger`
- `shared-reasoning-core` is not an active launcher skill prefix.

## STOP Conditions

STOP and return to Advisor/Leo if:

- The launcher target is not foundation-docs.
- The task treats foundation-docs reports as runtime behavior source when runtime code differs.
- The task requires runtime source code edits in service repos.
- The task requires schema/migration changes without explicit approval.
- The task requires DB write, prod/live/main/secret access, or real customer data.
- The task asks for final approval from the role session.
