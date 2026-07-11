TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation
RETURN_RESULT_TO: Advisor

Perform a narrow Level-3 implementation/test delta review of Agent Office commit
`2f663304a88c432f19fe56055641b66e57f18ef2` against base
`73157613345ad3046e45b99b145f5400c8dc5428`.

Read the actual one-file diff, current canonical M01 manifest, Worker result, and
test source directly. Do not trust the report.

Verify:

1. the seven failures were caused only by a test fixture assuming live
   `AO-WU-15=WAITING_DEPENDENCY` after canonical state became `READY`;
2. the patch changes test behavior only and does not alter runtime or canonical
   lifecycle state;
3. coordinator startup still verifies the real canonical manifest before the
   projection-only synthetic fixture is derived;
4. all seven activity-freshness variants and their assertions remain intact;
5. the synthetic WorkUnit override preserves every field required now and does
   not create a brittle omission of future/optional fields; classify and require
   patch if object reconstruction should instead preserve the existing object;
6. focused 21/21 and full 296/296 evidence are reproducible;
7. no authority, delivery, browser, tmux, or product-policy scope was changed.

Verdict: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL.

Do not patch, start a server, invoke tmux mutation, create authority material,
or access secrets/DB/prod/live. Publish only result and pointer, return an
ASCII-only pointer to Advisor, and STOP.
