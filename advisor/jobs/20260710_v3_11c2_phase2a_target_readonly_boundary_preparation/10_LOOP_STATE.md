# Loop State

Status: `WAIT_FOR_FABLE5_DESIGN_REVIEW_RESULT`

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

## Current Actor

`Fable5 Reviewer`

## Current Required Action

Use `07_FABLE5_DESIGN_REVIEW_RUN_PROMPT.md` in the existing separate Fable5
Reviewer session and return the design-review result to Advisor.

## Blocked

- Role provisioning or permission/hygiene changes.
- Phase 2A execution prompt, approval, or execution.
- DB/query/migration/secret/runtime/main/prod/live work.
- Advisor final mission audit until Fable5 design review completes.

## Next-State Rules

- Fable5 `PASS` -> Advisor mission audit and A/B/C recommendation.
- Fable5 `PASS_WITH_RISK` -> STOP and return risk acceptance to Leo/GPT.
- Fable5 `NEEDS_PATCH` -> Advisor classifies findings and routes in-scope Worker
  rework in the same mission.
- Fable5 `FAIL` or any DB/secret/permission/runtime access -> STOP.
