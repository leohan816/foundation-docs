# Loop State

Status: `ROLE_RELOAD_IN_PROGRESS__NEXT_FABLE5_REVIEWER`

## Completed

- Phase 0 inventory: complete.
- Phase 1 canonical V2 authoring: complete and pushed.
- Phase 2 active instruction propagation: complete and pushed for Git repos;
  foundation-advisor local active files updated.
- Phase 3 Advisor self-check: complete.
- Phase 4 Fable5 `DESIGN_REVIEW`: PASS.
- Phase 4 Fable5 `IMPLEMENTATION_REVIEW`: PASS.
- Canonical status promoted to `ACTIVE_CANONICAL_V2` pending publish of this update.

## Current Actor

`Fable5 Reviewer`

## Current Required Action

Reload the existing Fable5 Reviewer session with
`08_FABLE5_REVIEWER_RELOAD_RUN_PROMPT.md` and return `ROLE_PROTOCOL_RELOADED` to
Advisor.

## Remaining Reload Actors

- Advisor: reload confirmation to be recorded after active-status publish.
- Control: reloaded.
- Foundation Worker: reloaded.
- Shashu Worker: reloaded.
- Cosmile Worker: reloaded.
- Fable5 Reviewer: pending, next.

## Blocked Until All Reloads

- Final mission audit.
- `MISSION_COMPLETE` report.

## Verdict Routing

- Reload confirmation valid -> Advisor records it and routes the next existing actor.
- Missing file, conflict, wrong session, or non-active canonical status -> STOP and investigate.
