# Loop State

Status: `WAIT_FOR_COSMILE_DESIGN_REWORK_RESULT`

## Completed

- Phase 0 Advisor inventory: complete.
- Instruction validation: `PROCEED_WITH_LIMITS` for design only.
- DB/query/migration/secret-value access: `0`.
- Worker brief and launcher: ready for publish.
- Cosmile Worker DESIGN_ONLY result: complete and validated.
- Cosmile design commit: `9e9ad28e83e6d505a2d7abd3b33b44c695b3dfad`.
- foundation-docs Worker result commit: `b585a501be6fdce8e4193d45d5262215459550e3`.
- Fable5 `DESIGN_REVIEW`: `NEEDS_PATCH` at foundation-docs commit `c107a5a`.
- Findings F-1/F-2/F-3 classified as in-scope design rework.

## Current Actor

`Cosmile Worker-Rework`

## Current Required Action

Use `09_REWORK_RUN_PROMPT.md` in the existing Cosmile Worker session and return
the patched design, rework result, and pointer to Advisor.

## Blocked

- Advisor mission audit until Fable5 re-review PASS exists.
- Phase 2A execution approval and execution.
- Phase 2B, runtime, DB, migration, flag, main, prod/live work.

## Next-State Rules

- Valid rework -> Advisor validates and routes same Fable5 session for re-review.
- Rework scope violation, DB/secret access, or runtime change -> STOP.
