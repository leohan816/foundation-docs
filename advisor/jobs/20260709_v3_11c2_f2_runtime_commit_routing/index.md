# V3-11C2 F-2 Runtime Commit Routing

Date: 2026-07-09

## Job Overview

This Advisor job prepares commit-only Worker routing for the reviewed F-2 sqlite migration cleanup move.

The runtime commit should capture exactly the approved migration move and should not push the runtime repo.

## Verdict

`F2_RUNTIME_COMMIT_ROUTING_READY_WITH_LIMITS`

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
