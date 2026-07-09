# 00 Intake - Short Run Prompt / Launcher Protocol Patch

## Job

`20260709_short_run_prompt_protocol_patch`

## Leo/GPT Instruction Summary

Strengthen the Advisor launcher protocol so long full handoff prompts remain in files and Leo/GPT normally pastes a short Korean-readable run prompt into the target role session. The actual copy-paste prompt must be wrapped in `========` delimiters and include active skill prefixes when required.

## Goal

- Update Advisor operating rules in local cockpit files.
- Update the GitHub-readable Advisor system mirror.
- Update the current V3-11C2 Worker run prompt.
- Publish foundation-docs Advisor changes.

## Non-Goals

- Do not implement V3-11C2.
- Do not act as Worker, Sentinel, or Service Reviewer.
- Do not modify runtime repositories.
- Do not start any role session.

## Required Launcher Rules

- Long instructions are stored in role-specific full handoff prompt files.
- Leo/GPT pastes short launcher/run prompts by default.
- Launcher/run prompts are Korean-readable while preserving paths, role names, skill prefixes, filenames, commands, environment variables, and code identifiers exactly.
- The actual prompt Leo/GPT should paste is wrapped in `========` delimiters.
- Required active skill prefixes:
  - Worker implementation: `/fable-builder`
  - Sentinel independent review: `/fable-sentinel`
  - Debugger general debugging: `/fable-debugger`
- `shared-reasoning-core` is not an active launcher skill prefix.
- After Hermes is introduced, Hermes reads and executes the `READ_AND_EXECUTE` path from the launcher prompt.
- `NEXT ACTION ROUTING` prioritizes the short run prompt over the full handoff prompt.

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

- The current V3-11C2 Worker target project is Cosmile.
- The current V3-11C2 Worker target repo is `../Cosmile`.
- The current V3-11C2 Worker app root is `../Cosmile/app`.
- The required Worker skill prefix is `/fable-builder`.
