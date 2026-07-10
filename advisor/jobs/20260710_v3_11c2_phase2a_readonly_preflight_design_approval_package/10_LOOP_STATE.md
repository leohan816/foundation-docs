# Loop State

Status: `WAIT_FOR_FABLE5_DESIGN_REREVIEW_RESULT`

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
- Cosmile Worker DESIGN_ONLY_REWORK result: complete.
- Cosmile patched design commit: `453b6c94b6c72a19f0e5ea7848928be25583d4c6`.
- foundation-docs rework result commit: `415436b6f752fbbee488a043d6b57efc0cb7b49b`.
- Advisor direct rework validation: `VALIDATED_FOR_SAME_SESSION_FABLE5_REREVIEW`.

## Current Actor

`Fable5 Reviewer` in the same existing review session

## Current Required Action

Use `07_FABLE5_DESIGN_REREVIEW_RUN_PROMPT.md` in the same Fable5 Reviewer session
that issued the original `NEEDS_PATCH` verdict. Return the re-review result and
pointer to Advisor.

## Blocked

- Advisor mission audit until Fable5 re-review PASS exists.
- Phase 2A execution approval and execution.
- Phase 2B, runtime, DB, migration, flag, main, prod/live work.

## Next-State Rules

- Re-review `PASS` -> Advisor completes mission audit and returns the execution-
  approval recommendation to Leo/GPT.
- Re-review `PASS_WITH_RISK` -> STOP and return the risk decision to Leo/GPT.
- Re-review `NEEDS_PATCH` -> Advisor classifies findings and continues only if
  patchable within approved design scope.
- Re-review `FAIL` or any scope/DB/secret/runtime violation -> STOP.
