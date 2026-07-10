TARGET_ACTOR: Sentinel-ReReview
TARGET_ROLE: Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session that issued founder-package NEEDS_PATCH
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session, Worker session, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

# Fable5 Founder Package Delta Re-Review

Pass type: `DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE_DELTA_REREVIEW`

Use the same existing Fable5 Reviewer session that wrote the challenge result at foundation-docs commit `362c331`.

## Required Direct Reads

- `../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_FOUNDER_PACKAGE_CHALLENGE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/21_FABLE5_FOUNDER_PACKAGE_CHALLENGE_POINTER.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/22_FOUNDER_PACKAGE_CHALLENGE_PATCH_RECORD.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_DECISION_PACKAGE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`

Inspect the actual diff from founder-package base commit `2b43cf1` to the current patched versions of the two founder files. Do not trust the patch record without checking the text and diff.

## Fixed Delta Questions

1. Is P-1 closed so every ownership choice remains independent from, and cannot silently waive, the outbox containment decision?
2. Is P-2 closed with a complete abuse/poisoning scenario covering user behavior, stored/blocked data, automatic allowed/forbidden action, human approval, rollback, and proof evidence?
3. Is P-3 closed by explicitly routing the existing consultation external-egress issue to a separate gate without broadening Package 1A?
4. Is P-4 factually precise about `canonicalUserId` row storage versus `payloadJson` contents?
5. Is P-5 closed with a visible consolidated pre-Package-1B gate list that includes ADD-07 documentation hygiene?
6. Is P-6 closed by restoring the M4 governance-overlay no-migrate/no-populate default?
7. Are P-7, P-8, and P-9 resolved without changing actor positions or inventing policy?
8. Does the package still ask only five founder-level decisions and avoid technical questions?
9. Does the acceptance sheet remain honest about current non-existence and complete across all eight scenarios?
10. Did the patch introduce any unsupported fact, hidden product choice, weakened safe default, or missing traceability?

## Verdict

Use exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

## Required Result

Write:

`../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_FOUNDER_PACKAGE_DELTA_REREVIEW.md`

Include:

- reviewed diff and files;
- P-1 through P-9 closure table;
- regression checks;
- residual risks;
- verdict rationale;
- verdict.

Write pointer:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/24_FABLE5_FOUNDER_PACKAGE_DELTA_REREVIEW_POINTER.md`

Commit/push only the delta re-review result and pointer in foundation-docs.

## Forbidden

- New agent, sub-agent, delegated model context, or temporary session.
- Patching any file other than the result and pointer.
- Product-policy choice, final design authorship, or final approval.
- Runtime/schema/API modification.
- DB/secret/env access, including metadata.
- Live model, production/live, Control, or Package 1B work.

Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor, then STOP.
