# Advisor Orchestration Protocol Patch

## Job

`20260709_advisor_orchestration_protocol`

## Verdict

`ADVISOR_ORCHESTRATION_PROTOCOL_READY`

## Overview

This job patches Advisor operating rules so Advisor acts as the manual orchestration controller for Leo/GPT. Advisor now validates instructions, writes role briefs, writes copy-paste-ready handoff prompts, receives Worker and Reviewer results, manages rework loops, and writes final audit only after required evidence and reviews are complete.

## Generated Artifacts

- [00_INTAKE.md](./00_INTAKE.md)
- [01_ADVISOR_BRIEF.md](./01_ADVISOR_BRIEF.md)
- [index.md](./index.md)

Related V3-11C2 handoff artifacts:

- [../20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md](../20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md)
- [../20260709_v3_11c2_worker_brief/10_LOOP_STATE.md](../20260709_v3_11c2_worker_brief/10_LOOP_STATE.md)

## Next Recommended Action

Leo/GPT should inspect the committed V3-11C2 Worker handoff prompt and paste it into a separate Worker session.
