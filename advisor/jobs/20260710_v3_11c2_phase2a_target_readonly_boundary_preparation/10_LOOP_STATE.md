# Loop State

Status: `WAIT_FOR_COSMILE_DESIGN_REWORK_ROUND2_RESULT`

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
- Cosmile Worker DESIGN_ONLY_REWORK completed.
- Cosmile rework commit: `41e53949a88d96791a2e5fce07f752f32056dae5`.
- foundation-docs rework result commit:
  `dccedbba017f903c80773ec58e15cc86eb18458e`.
- Advisor rework validation: `VALIDATED_FOR_SAME_SESSION_FABLE5_REREVIEW`.
- Fable5 round-2 re-review: `NEEDS_PATCH` at foundation-docs commit
  `222993216e215ed0746932ae05f29ea6361b2747`.
- P-1/P-3 and minor findings: closed.
- F-A/F-B classified as narrow in-scope P-2 precision rework.

## Current Actor

`Cosmile Worker-Rework` in the same existing Worker session

## Current Required Action

Use `09_REWORK_ROUND2_RUN_PROMPT.md` in the same existing Cosmile Worker session
and return the round-2 rework result to Advisor.

## Blocked

- Role provisioning or permission/hygiene changes.
- Phase 2A execution prompt, approval, or execution.
- DB/query/migration/secret/runtime/main/prod/live work.
- Fable5 round-3 re-review and Advisor audit until F-A/F-B rework completes.

## Next-State Rules

- Valid round-2 rework -> Advisor validation -> same Fable5 session round-3
  re-review of F-A/F-B only.
- Any scope, DB, secret, logging, permission, credential, or runtime action ->
  STOP.
