# Result Reporting Protocol - foundation-docs

## Rule

Do not print long role results in chat by default.

Store long results under:

`../foundation-docs/runs/foundation-docs/<job-id>/`

Store Advisor pointers under:

`../foundation-docs/advisor/jobs/<job-id>/`

## Standard Result Files

- Worker: `../foundation-docs/runs/foundation-docs/<job-id>/WORKER_RESULT.md`
- Sentinel: `../foundation-docs/runs/foundation-docs/<job-id>/SENTINEL_REVIEW_RESULT.md`
- Service Reviewer: `../foundation-docs/runs/foundation-docs/<job-id>/SERVICE_REVIEW_RESULT.md`

## Standard Pointer Files

- Worker pointer: `../foundation-docs/advisor/jobs/<job-id>/11_WORKER_RESULT_POINTER.md`
- Sentinel pointer: `../foundation-docs/advisor/jobs/<job-id>/12_SENTINEL_RESULT_POINTER.md`
- Service Review pointer: `../foundation-docs/advisor/jobs/<job-id>/13_SERVICE_REVIEW_RESULT_POINTER.md`

## Chat Output

Chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

Do not paste the full long result unless Advisor/Leo explicitly requests it.

## NEXT ACTION ROUTING Required Fields

- Target actor
- Target session
- Leo action
- Return result to
- Do not send to
- Status

## POINTER BLOCK Standard

```text
POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: foundation-docs
ROLE_ACTOR: <Worker | Sentinel | Service Reviewer>
RESULT_FILE: ../foundation-docs/runs/foundation-docs/<job-id>/<RESULT_FILE>.md
POINTER_FILE: ../foundation-docs/advisor/jobs/<job-id>/<POINTER_FILE>.md
FOUNDATION_DOCS_COMMIT: <commit hash>
RUNTIME_REPO: ../foundation-docs
RUNTIME_COMMIT_STATUS: <not committed | committed <hash>>
RETURN_TO: Advisor
NEXT_ACTOR: <Advisor | Sentinel | Service Reviewer | Leo/GPT | STOP>
```

## Safety

Reports must not include secrets, PII, raw customer IDs, raw order IDs, raw payment IDs, prod/live details, full env dumps, or real customer data.

Include foundation-docs commit hash and runtime repo commit status.
