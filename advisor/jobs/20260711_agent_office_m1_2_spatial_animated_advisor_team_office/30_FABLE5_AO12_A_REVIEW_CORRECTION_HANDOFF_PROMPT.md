TARGET_ACTOR: Fable5 Sentinel-ReReview
TARGET_SESSION: same existing reviewer-fable5 session that wrote the AO12-A PASS
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or agent-office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# AO12-A Review Result Factual Correction and Narrow Recheck

Load `/fable-sentinel` and the applicable delta-review reference. Read directly:

1. `29_ADVISOR_FABLE5_AO12_A_RESULT_VALIDATION.md`
2. your committed AO12-A result and pointer at commit `331c26d`
3. actual pre/post files and diff for:
   - `src/runtime/operational-config.ts`
   - `src/ui/scene/types.ts`
   - `tests/integration/exact-advisor-delivery.test.ts`
   - `tests/contract/siasiu-current-name.test.ts`
   - `scripts/check-current-product-name.mjs`
4. frozen naming requirements in the Master Design, Identity System, WorkUnit
   Plan, chained Leo/GPT decision, and AO12-A Worker brief
5. current Git and test evidence

The prior result says the integration test became an explicit legacy-alias case
and historical alias IDs remain replayable. That is contradicted by the actual
diff: alias normalization and the `legacyAlias` fixture were removed, and current
forbidden alias input is rejected. Do not rely on the prior statement.

Answer exactly:

1. Does rejecting obsolete forbidden alias input satisfy the frozen current-name
   decision while preserving canonical actor ID, authority, assignment,
   transport, event, state, and baseline meaning?
2. Or does the removal violate a required compatibility invariant and require a
   Worker patch?
3. Are immutable historical artifacts/citations preserved without claiming
   runtime acceptance of forbidden aliases?

Correct the review result and pointer in place with an explicit correction log.
Return `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`. If `PASS`, preserve the
rest of the original coverage only after confirming this correction introduces
no regression. Do not patch Agent Office, broaden scope, access DB/secrets,
create sessions/agents/sub-agents, delegate another context, accept risk, grant
final approval, or start AO12-B.

Commit/push only the corrected exact review result and pointer. Terminal output
must be ASCII-only. Return the corrected pointer to Advisor and STOP.
