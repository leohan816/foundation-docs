TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing agent-office session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation
RETURN_RESULT_TO: Advisor

AO-WU-15 final audit changed the canonical M01 manifest to the truthful current
state: `AO-WU-21=COMPLETED`, `AO-WU-15=READY`. The full `npm run check` then
failed seven cases in `tests/integration/observation-coordinator.test.ts` because
`activeAdvisorProjection()` hardcodes an initial
`AO-WU-15 WAITING_DEPENDENCY -> READY` transition while reading the live
canonical manifest.

Patch only this test-fixture dependency. The activity-freshness tests must use a
deliberately synthetic initial AO-WU-15 state rather than silently requiring a
particular current canonical lifecycle status. Preserve the purpose and all
seven freshness cases. Do not modify or revert the canonical manifest to make
tests pass. Do not change runtime behavior.

Required proof:

- reproduce the seven failures against the current canonical manifest;
- make the fixture state explicit and deterministic;
- run the focused observation-coordinator suite;
- run full `npm run check`;
- confirm only the authorized test file changes unless direct evidence requires
  a minimal adjacent fixture change;
- commit and push Agent Office, then publish result and pointer only.

Do not start a server, invoke tmux mutation, create authority/credential/lease
material, change product policy, or resume another mission. Return an ASCII-only
pointer to Advisor and STOP.
