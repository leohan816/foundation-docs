# Loop State

Status: `WAIT_FOR_FABLE5_DESIGN_REVIEW_RESULT`

## Completed

- Phase 0 Advisor inventory: complete.
- Instruction validation: `PROCEED_WITH_LIMITS` for design only.
- DB/query/migration/secret-value access: `0`.
- Worker brief and launcher: ready for publish.
- Cosmile Worker DESIGN_ONLY result: complete and validated.
- Cosmile design commit: `9e9ad28e83e6d505a2d7abd3b33b44c695b3dfad`.
- foundation-docs Worker result commit: `b585a501be6fdce8e4193d45d5262215459550e3`.

## Current Actor

`Fable5 Reviewer`

## Current Required Action

Use `07_FABLE5_DESIGN_REVIEW_RUN_PROMPT.md` in the existing Fable5 Reviewer
session and return the design review result and pointer to Advisor.

## Blocked

- Advisor mission audit until Fable5 result exists.
- Phase 2A execution approval and execution.
- Phase 2B, runtime, DB, migration, flag, main, prod/live work.

## Next-State Rules

- Fable5 PASS -> Advisor performs mission audit and recommends A/B/C to Leo/GPT.
- Fable5 PASS_WITH_RISK -> Advisor does not auto-accept; return risk decision to
  Leo/GPT.
- Fable5 NEEDS_PATCH -> Advisor classifies and routes in-scope Worker design patch.
- Fable5 FAIL -> STOP and return to Leo/GPT.
