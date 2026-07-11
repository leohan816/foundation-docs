TARGET_ACTOR: Fable5 Sentinel-ReReview
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or agent-office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Agent Office M1.2 Narrow Product-Intent Delta Review

Load `/fable-sentinel` and its applicable delta-review references. Read directly:

1. `16_LEO_GPT_CHAINED_DECISION_RECORD.md`
2. `19_ADVISOR_NARROW_DESIGN_PATCH_VALIDATION.md`
3. `20_FABLE5_NARROW_DESIGN_DELTA_REVIEW_BRIEF.md`
4. original review result and exact pointer
5. actual Agent Office Git diff `3ba65e0..b7d8cdb`
6. all five current candidate documents in full
7. actual M1 code/test evidence cited by the delta, including the historical
   current-name compatibility paths
8. current Agent Office and Foundation Docs Git state

Do not trust Worker or Advisor conclusions. Answer all 12 required questions from
the actual diff and current files. Confirm changed-path scope and no runtime,
test, asset, auth, authority, transport, DB, network, or deployment change.

This is a narrow Level-3 design delta review. Do not patch, implement, run a
server, access secrets/DB, create sessions/agents/sub-agents, use another model
context, purchase/import/generate assets, grant final approval, or start AO12-A.

Write only:

- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_M1_2_NARROW_DESIGN_DELTA_REVIEW_RESULT.md`
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/21_FABLE5_M1_2_NARROW_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Commit/push only those two Foundation Docs files. Preserve unrelated dirt.
Terminal output must be ASCII-only. Return the exact pointer to Advisor and STOP.
