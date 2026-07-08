# Advisor Job Index

Job id: `20260708_cross_repo_v1_to_v3_current_state_audit`

## Overview

Advisor system smoke test plus current-state audit for V1, V2, and V3 across Foundation, Cosmile, SIASIU, foundation-docs, and the allowed skills path.

This job is audit-only. It does not contain a Worker brief or implementation instruction.

## Generated Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `index.md`

## Verdict

`ADVISOR_SYSTEM_READY_WITH_LIMITS`

Key limits:

- `../skills` was not found; candidate `../skill` was not inspected because it was outside the allowed read scope.
- V2 is overloaded in available docs and needs a narrowed definition before a single cross-repo V2 verdict can be asserted.
- V3 implementation is partial: 11A/11B/11C have shadow/non-prod evidence, while 11D, 11C2, 11E, 12, and production are not implemented.

## Links

- [00 Intake](00_INTAKE.md)
- [01 Advisor Brief](01_ADVISOR_BRIEF.md)

## Next Recommended Action

Leo/GPT should correct the skills repo read scope by either providing `../skills` or explicitly allowing `../skill`, then run a narrow Advisor delta audit of the skills role boundaries before any Worker brief is written.

