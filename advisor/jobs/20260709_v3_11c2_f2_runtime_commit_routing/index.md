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
- `05_FINAL_AUDIT.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `11_WORKER_RESULT_POINTER.md`
- `index.md`

## Next Recommended Action

Prepare runtime push routing for commit `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`.

Do not route flag-ON, production migration, main merge, or operational use from this commit-routing job.
