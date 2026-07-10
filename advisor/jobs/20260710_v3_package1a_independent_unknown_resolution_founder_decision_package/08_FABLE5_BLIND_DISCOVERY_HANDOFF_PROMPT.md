TARGET_ACTOR: Sentinel
TARGET_ROLE: Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Fable5 Reviewer session

# Fable5 Blind Discovery Adversarial Handoff

Required skill: `/fable-sentinel`

Read and execute:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/04_FABLE5_BLIND_DISCOVERY_REVIEW_BRIEF.md`

## Mission Boundary

Pass type is `DESIGN_REVIEW__DISCOVERY_ADVERSARIAL_PASS`, Level 3.

Read the frozen register directly and challenge U-01 through U-09 independently. Do not read Advisor, Foundation Worker, or Cosmile Worker first-pass assessments. Verify register freeze commit and hash before starting.

Read actual files and distrust summaries, including the register's fact labels, until verified. Identify false certainty, missing unknowns, irreversible choices, unsafe defaults, reward-hacking, leakage, identity contamination, legal guessing, and claims that cannot be proven before pilot.

Do not author final design, choose product policy, patch files, access DB/secrets, invoke live models, or call Control. Do not start Package 1B.

Write the required result and pointer exactly as specified in the brief. Commit/push only those foundation-docs files. Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor.

If independence cannot be maintained, STOP with `INDEPENDENCE_COMPROMISED`.
