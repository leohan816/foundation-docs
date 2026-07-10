# Loop State

Status: `WAIT_FOR_COSMILE_DESIGN_REWORK_RESULT`

Phase 2A execution status: `NOT_APPROVED`

## Completed

- Leo/GPT mission received and validated.
- Phase 0 Advisor inventory complete without DB or secret access.
- Target candidate alias and source-mechanism labels defined.
- Target identity, environment attestation, schema, role, credential path, and
  hygiene prerequisites classified as unresolved or unapproved.
- Worker and Fable5 design-review standards prepared.
- Cosmile Worker design/admin package completed.
- Cosmile design commit: `0ec8667a66b7d6973bb4508a234d638a81d69b2c`.
- foundation-docs Worker result commit: `03d856562ee1d97726a28125de0e9733a0480cd2`.
- Advisor direct validation:
  `VALIDATED_FOR_FABLE5_DESIGN_REVIEW_WITH_EXPLICIT_QUESTIONS`.
- Fable5 Level 3 `DESIGN_REVIEW`: `NEEDS_PATCH` at foundation-docs commit
  `507df24a39e45b183f7b51b8e039aca7d654152b`.
- P-1/P-2/P-3 classified as in-scope design rework.

## Current Actor

`Cosmile Worker-Rework`

## Current Required Action

Use `09_REWORK_RUN_PROMPT.md` in the same existing Cosmile Worker session and
return the patched design package to Advisor.

## Blocked

- Role provisioning or permission/hygiene changes.
- Phase 2A execution prompt, approval, or execution.
- DB/query/migration/secret/runtime/main/prod/live work.
- Fable5 re-review and Advisor final mission audit until Worker rework completes.

## Next-State Rules

- Valid rework -> Advisor direct validation -> same Fable5 session re-review.
- Rework scope violation or any DB/secret/permission/runtime access -> STOP.
- Re-review `PASS` -> Advisor mission audit and A/B/C recommendation.
- Re-review `PASS_WITH_RISK` or `FAIL` -> return to Leo/GPT.
