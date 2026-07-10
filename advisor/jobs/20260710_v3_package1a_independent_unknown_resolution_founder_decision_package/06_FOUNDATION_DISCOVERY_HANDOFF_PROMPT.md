TARGET_ACTOR: Worker
TARGET_ROLE: Foundation Worker
TARGET_SESSION: existing Foundation Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Foundation Worker session

# Foundation Worker Blind Discovery Handoff

Read and execute:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/02_FOUNDATION_DISCOVERY_BRIEF.md`

## Mission Boundary

Work mode is `DISCOVERY_ONLY_READ_ONLY`.

Read the frozen register directly and answer U-01 through U-09 independently. Do not read Advisor, Cosmile Worker, or Fable5 first-pass assessments. Verify register freeze commit and hash before starting.

Use actual Foundation and foundation-control code/contracts for evidence. You may read current canonical foundation-docs records needed to classify authority, but do not treat reports as runtime truth.

Do not modify runtime, contracts, APIs, or design. Do not access DB, secrets, environment values, production/live, or live models. Do not choose canonical product policy. Do not design Package 1B.

Write the required result and pointer exactly as specified in the brief. Commit/push only those foundation-docs files. Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor.

If independence cannot be maintained, STOP with `INDEPENDENCE_COMPROMISED`.
