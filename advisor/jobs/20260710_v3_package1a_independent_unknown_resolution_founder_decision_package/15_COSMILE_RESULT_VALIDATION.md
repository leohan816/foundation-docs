# Advisor Validation - Cosmile Blind Assessment

Date: 2026-07-10

Result commit: `1b44760`

Validation status: `NARROW_REWORK_REQUIRED`

## Scope Verified

Commit `1b44760` contains only:

- `runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/12_COSMILE_RESULT_POINTER.md`

The register freeze identifiers match. The result declares that no prohibited first-pass assessment was read. No Cosmile runtime commit or diff was introduced by the assessment.

## Material Finding C-F1

The assessment's U-05 and addendum A-C3 overstate the `/api/events` raw-text persistence path and cite an incomplete sanitizer.

Assessment claim:

- `CommerceEvent.propertiesJson` uses only `SENSITIVE_KEYS` scrubbing;
- generic `message`, `query`, and `note` text can pass;
- arbitrary client free text therefore persists through that route.

Actual code at the assessment's stated evidence commit `e4ed668`:

- `app/src/lib/commerceEventService.ts` imports and applies both `isForbiddenKey` and `scanValueForPii` in addition to `SENSITIVE_KEYS`.
- `app/src/lib/events/piiPolicy.ts` explicitly blocks normalized raw-text keys including `message`, `note`, `query`, `searchQuery`, `raw_text`, and `answer_substance`.
- the same policy scans string values for email, Korean phone, and card patterns.
- `app/scripts/event-schema-eval.mjs` directly tests that a `message` key is rejected.

The broad claim is therefore not evidence-supported.

## Narrow Residual Risk That May Remain

The sanitizer is still an exact normalized-key denylist plus limited value-pattern scanning. Static inspection indicates that unlisted property keys such as `text`, `comment`, `feedback`, or `description` are not automatically rejected merely because their string value is prose, provided the value does not match the email/phone/card patterns and is at most 1000 characters.

This is a code-path possibility, not proof that customer text has actually been persisted. No DB or live evidence was accessed.

## Required Corrections

The same Cosmile Worker session must correct only:

1. U-01 safe-default language that relies on the overstated event-ingestion claim.
2. U-05 position, evidence, facts, missing evidence, safe default, reversibility, and confidence.
3. Addendum A-C3.
4. The input-path reality table.
5. The future affected-surface inventory.

The correction must:

- acknowledge all active sanitizer layers;
- stop claiming that `message`, `query`, or `note` pass;
- distinguish code-path residual exposure from observed persistence;
- preserve the valid narrower unknown about arbitrary unlisted keys and incomplete semantic/health-text value detection, if directly supported;
- leave unrelated U-01 through U-09 findings unchanged unless the correction logically requires a cross-reference edit.

## Comparison Gate

Cosmile first-pass status is `RECEIVED_NEEDS_CORRECTION`.

Advisor must not use it in the cross-actor comparison until the corrected result is committed, pushed, and revalidated. Foundation Worker and Fable5 blind assessments remain independent and may continue.
