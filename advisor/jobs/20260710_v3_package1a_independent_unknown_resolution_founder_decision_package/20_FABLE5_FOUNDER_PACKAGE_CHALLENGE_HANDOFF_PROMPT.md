TARGET_ACTOR: Sentinel
TARGET_ROLE: Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session that completed the corrected blind assessment
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session, Worker session, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

# Fable5 Founder Package Challenge

Pass type: `DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE`

This is the second Fable5 pass required by the mission. Blindness restrictions between actor assessments are now lifted only for this challenge because all corrected first passes are committed, revalidated, and frozen as comparison inputs.

## Required Direct Reads

- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ADVISOR_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/foundation/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDATION_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/18_CORRECTED_RESULT_REVALIDATION.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ACTOR_COMPARISON_MATRIX.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_DECISION_PACKAGE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`

Read actual cited repo/canonical files only when needed to verify a disputed load-bearing claim. Do not rely on summaries alone.

## Required Challenge

Check whether:

1. Advisor erased, softened, or fabricated any actor disagreement.
2. Every `FACT` in the comparison and founder package is supported by the corrected evidence.
3. Any recommendation exceeds current evidence or silently chooses product policy.
4. Reversible and irreversible choices are clearly separated.
5. Experimental unknowns are falsely presented as design decisions.
6. Legal/policy conclusions are guessed.
7. Leo/GPT is being asked technical questions that Workers or later Control design should resolve.
8. Any important frozen unknown or valid post-freeze addendum is missing.
9. Safe defaults actually prevent irreversible identity, privacy, safety, or contract harm.
10. The five founder decisions are genuinely founder-level, mutually understandable, and sufficient before Package 1B design.
11. The seven acceptance scenarios state user-visible behavior, stored/deleted data, automatic allowed/forbidden action, human approval, rollback, and proof evidence without pretending the behavior exists today.
12. Traceability from unknown to evidence, decision, future design, test, and result is complete.

## Required Result

Write:

`../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_FOUNDER_PACKAGE_CHALLENGE.md`

Use this structure:

- reviewed artifacts;
- direct evidence spot checks;
- unsupported or overstated facts;
- disagreements preserved or erased;
- reversible/irreversible separation;
- experiment and legal/policy classification;
- founder-question quality;
- acceptance-sheet coverage;
- missing unknowns/addenda;
- safe-default challenge;
- required patch items;
- residual risks;
- verdict rationale;
- verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Write pointer:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/21_FABLE5_FOUNDER_PACKAGE_CHALLENGE_POINTER.md`

Commit/push only the challenge result and pointer in foundation-docs.

## Forbidden

- New agent, sub-agent, delegated model context, or temporary session.
- Final design authorship or product-policy choice.
- Patching Advisor, Worker, canonical, or runtime files.
- Runtime/schema/API modification.
- DB access or query, including metadata inspection.
- Secret/env access, including names, existence, mode, or values.
- Live model, production/live, or Control invocation.
- Package 1B design or implementation.
- Final approval.

If direct review cannot be completed without a forbidden action, return `FAIL` or `NEEDS_PATCH` with the exact blocker. Do not broaden scope.

Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor, then STOP.
