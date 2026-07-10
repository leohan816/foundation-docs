TARGET_ACTOR: Worker-Rework
TARGET_ROLE: Cosmile Worker
TARGET_SESSION: same existing Cosmile Worker session that wrote the blind first pass
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Cosmile Worker rework session

# Cosmile Blind Assessment Narrow Evidence Correction

Read directly:

- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/15_COSMILE_RESULT_VALIDATION.md`
- `../foundation-docs/runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- actual Cosmile files at `e4ed668` named in the validation

## Exact Task

Correct material finding C-F1 in the existing Cosmile assessment. This is a documentation/evidence correction only.

Required corrections:

1. Acknowledge that `commerceEventService.ts` applies `SENSITIVE_KEYS`, `isForbiddenKey`, and `scanValueForPii`.
2. Acknowledge that `message`, `note`, `query`, `searchQuery`, `raw_text`, and `answer_substance` are blocked by the normalized forbidden-key policy.
3. Acknowledge the existing test that rejects `message`.
4. Remove claims that the route uses only `SENSITIVE_KEYS` or that those blocked keys pass.
5. If retaining A-C3, narrow it to the statically supported residual: arbitrary unlisted keys such as `text`, `comment`, `feedback`, or `description` can carry non-pattern prose through the denylist/value scan. Label this as a code-path possibility, not observed customer-data persistence.
6. Correct all dependent U-01/U-05 text, tables, and future-surface inventory.
7. Preserve all unrelated first-pass findings.

## Blindness Boundary

Do not read Advisor's independent assessment, Foundation Worker assessment, Fable5 assessment, comparison matrix, founder package, or acceptance sheet. The validation file is allowed because it contains only the evidence correction.

If any prohibited assessment is read, STOP with `INDEPENDENCE_COMPROMISED`.

## Forbidden

- Runtime, schema, migration, route, UI, API, test, or config modification.
- DB or secret access.
- Executing a persistence test against DB.
- Live model or production/live access.
- Broadening beyond C-F1.
- Package 1B design or product-policy choice.

## Result

Update and commit/push only:

- `../foundation-docs/runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/12_COSMILE_RESULT_POINTER.md`

The pointer must identify the correction commit and `C-F1: CLOSED` or explain why it remains open.

Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor, then STOP.
