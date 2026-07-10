# Loop State

Status: `WAIT_FOR_FABLE5_INDEPENDENT_REVIEW`

## Completed

- Phase 0 inventory: complete.
- Phase 1 canonical V2 authoring: complete and pushed.
- Phase 2 active instruction propagation: complete and pushed for Git repos;
  foundation-advisor local active files updated.
- Phase 3 Advisor self-check: complete.

## Current Actor

`Fable5 Reviewer`

## Current Required Action

Run the existing Fable5 Reviewer session with
`07_FABLE5_REVIEW_RUN_PROMPT.md` and return separate `DESIGN_REVIEW` and
`IMPLEMENTATION_REVIEW` result pointers to Advisor.

## Blocked Until Fable5 PASS

- Role protocol status promotion from candidate to active canonical.
- Session reload for Advisor, Control, Foundation Worker, Shashu Worker, Cosmile
  Worker, and Fable5 Reviewer.
- Final mission audit.
- `MISSION_COMPLETE` report.

## Verdict Routing

- Both PASS -> Advisor prepares existing-session reload prompts.
- PASS_WITH_RISK -> STOP and return to Leo/GPT.
- NEEDS_PATCH -> Advisor patch and same Fable5 session re-review.
- FAIL -> STOP and return to Leo/GPT.

