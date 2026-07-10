# Loop State

Status: `WAIT_FOR_COSMILE_DESIGN_ONLY_RESULT`

## Completed

- Phase 0 Advisor inventory: complete.
- Instruction validation: `PROCEED_WITH_LIMITS` for design only.
- DB/query/migration/secret-value access: `0`.
- Worker brief and launcher: ready for publish.

## Current Actor

`Cosmile Worker`

## Current Required Action

Use `06_WORKER_DESIGN_RUN_PROMPT.md` in the existing Cosmile Worker session and
return the design artifact, Worker result, and pointer to Advisor.

## Blocked

- Fable5 review routing until Worker result is validated.
- Advisor mission audit until Fable5 result exists.
- Phase 2A execution approval and execution.
- Phase 2B, runtime, DB, migration, flag, main, prod/live work.

## Next-State Rules

- Valid Worker design package -> Advisor validates and prepares Fable5
  `DESIGN_REVIEW` routing.
- Scope violation, secret exposure, DB access, or unsupported classification ->
  STOP and return to Leo/GPT if Advisor cannot resolve within mission scope.

