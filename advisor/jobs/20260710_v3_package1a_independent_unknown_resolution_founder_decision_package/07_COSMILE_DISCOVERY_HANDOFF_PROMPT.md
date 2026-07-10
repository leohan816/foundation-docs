TARGET_ACTOR: Worker
TARGET_ROLE: Cosmile Worker
TARGET_SESSION: existing Cosmile Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/
DO_NOT_PASTE_INTO: Advisor session or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the Cosmile Worker session

# Cosmile Worker Blind Discovery Handoff

Read and execute:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/03_COSMILE_DISCOVERY_BRIEF.md`

## Mission Boundary

Work mode is `DISCOVERY_ONLY_READ_ONLY`.

Read the frozen register directly and answer U-01 through U-09 independently. Do not read Advisor, Foundation Worker, or Fable5 first-pass assessments. Verify register freeze commit and hash before starting.

Use actual Cosmile code, schema, migrations, routes, UI, tests, and current canonical records. Preserve all pre-existing untracked docs. Do not infer input behavior from a schema table or identity from session recency.

Do not modify runtime, schema, migration, route, UI, API, tests, or config. Do not access DB, secrets, environment values, production/live, or live models. Do not decide Foundation authority or product policy. Do not design Package 1B.

Write the required result and pointer exactly as specified in the brief. Commit/push only those foundation-docs files. Return an ASCII-only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` to Advisor.

If independence cannot be maintained, STOP with `INDEPENDENCE_COMPROMISED`.
