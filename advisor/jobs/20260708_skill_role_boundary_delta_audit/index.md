# Advisor Job Index

Job id: `20260708_skill_role_boundary_delta_audit`

## Overview

Narrow read-only Advisor delta audit of skill role boundaries under `../skill`.

## Generated Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `index.md`

## Verdict

`ADVISOR_SYSTEM_READY_WITH_LIMITS`

## Key Result

Future Advisor briefs should use:

- `fable-builder` for approved implementation Worker batches.
- `fable-sentinel` for independent read-only review/audit.
- `fable-debugger` only for non-contract/general debugging.
- No skill prefix for `shared-reasoning-core`; it is reference-only.

## Finding

Advisor `AGENTS.md` currently lists `../skills`, but the actual repo path is `../skill`. This job reports the mismatch only and does not modify operating files.

## Links

- [00 Intake](00_INTAKE.md)
- [01 Advisor Brief](01_ADVISOR_BRIEF.md)

## Next Recommended Action

Run a separate Advisor maintenance task to patch Advisor operating docs so allowed read scope uses `../skill` or explicitly allows both `../skill` and `../skills`.

