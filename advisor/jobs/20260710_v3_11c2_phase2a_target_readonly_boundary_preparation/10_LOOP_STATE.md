# Loop State

Status: `WAIT_FOR_COSMILE_WORKER_DESIGN_PACKAGE`

Phase 2A execution status: `NOT_APPROVED`

## Completed

- Leo/GPT mission received and validated.
- Phase 0 Advisor inventory complete without DB or secret access.
- Target candidate alias and source-mechanism labels defined.
- Target identity, environment attestation, schema, role, credential path, and
  hygiene prerequisites classified as unresolved or unapproved.
- Worker and Fable5 design-review standards prepared.

## Current Actor

`Cosmile Worker`

## Current Required Action

Use `06_WORKER_DESIGN_RUN_PROMPT.md` in the existing Cosmile Worker session and
return the design/admin preparation package to Advisor.

## Blocked

- Role provisioning or permission/hygiene changes.
- Phase 2A execution prompt, approval, or execution.
- DB/query/migration/secret/runtime/main/prod/live work.
- Fable5 routing until Advisor validates the Worker result.

## Next-State Rules

- Valid Worker package -> Advisor direct validation -> existing Fable5 session
  `DESIGN_REVIEW`.
- In-scope document defect -> Worker patch loop after Advisor classification.
- Any DB/secret/permission/runtime access or unproven claim -> STOP.

