# V3-11C2 F-2 Runtime Push Routing

Date: 2026-07-09

## Job Overview

This Advisor job prepares a push-only Worker handoff for the already-reviewed and locally committed F-2 sqlite migration cleanup.

The only authorized runtime action is pushing commit `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9` from `shadow/m4-cosmile-memory` to `origin/shadow/m4-cosmile-memory`.

## Verdict

`F2_RUNTIME_PUSH_ROUTING_READY_WITH_LIMITS`

## Generated Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `index.md`

## Next Recommended Action

Paste `06_WORKER_RUN_PROMPT.md` into [cosmile Worker 세션].

Do not send this prompt to GPT strategy session, Advisor session, Sentinel, or Service Reviewer.
