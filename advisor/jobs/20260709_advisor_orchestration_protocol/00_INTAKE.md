# 00 Intake - Advisor Orchestration Protocol Patch

## Job

`20260709_advisor_orchestration_protocol`

## Leo/GPT Instruction Summary

Patch the Advisor operating rules so the Advisor is defined as a manual Hermes-style orchestration controller, not only a brief writer.

Leo/GPT will give high-level instructions only to Advisor. Advisor must validate the instruction, write role briefs and copy-paste-ready handoff prompts, receive Worker and Reviewer results back, manage patch loops, and write final audit only after required results and reviews are complete.

## Goal

Encode the Advisor orchestration protocol in:

- local Advisor operating files
- GitHub-readable Advisor system mirror under `../foundation-docs/advisor/_system/`
- this Advisor job report

When appropriate, add a V3-11C2 Worker handoff prompt and loop state to the existing V3-11C2 brief job.

## Non-Goals

- Do not implement V3-11C2.
- Do not act as Worker.
- Do not act as Sentinel Reviewer.
- Do not act as Service Reviewer.
- Do not create a final audit for V3-11C2.
- Do not modify runtime repositories.

## Allowed Read

- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`
- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/**`

## Allowed Write

- `./AGENTS.md`
- `./README.md` if needed
- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md` if needed
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_advisor_orchestration_protocol/index.md`
- optional V3-11C2 handoff artifacts:
  - `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
  - `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`

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
- Worker, Sentinel, or Service Reviewer role execution.

## Initial Assumptions

- This is an Advisor operating rules patch and report publication task.
- Local `foundation-advisor` files are the operating cockpit files; foundation-docs `_system` files are the GitHub-readable mirror.
- Handoff prompts are not implementation. They are instructions Leo/GPT may inspect and manually paste into separate role sessions.
- Foundation-docs Advisor artifacts may be committed and pushed if runtime repo changes are zero and staged files are limited to `foundation-docs/advisor/`.
