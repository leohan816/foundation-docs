TARGET_ACTOR: Sentinel
TARGET_SESSION: separate existing Fable5 Reviewer session, never Advisor or Worker session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session, Worker session, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Fable5 AO12-C Level-3 Independent Review

Read and execute the exact review brief:

`../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/43_FABLE5_AO12_C_EVENT_ACCESSIBILITY_PERFORMANCE_REVIEW_BRIEF.md`

Requirements:

- Load `/fable-sentinel` and applicable implementation, accessibility, visual,
  and performance review references.
- Use this same existing independent `reviewer-fable5` session.
- Read actual files, diffs, screenshots, tests, commits, and upstream state.
- Do not trust Worker or Advisor summaries.
- Directly inspect all seven AO12-C PNG baselines.
- Agent Office is read-only. Do not patch, commit, or push it.
- Do not access DB, secrets, auth material, remote/public/prod/live systems.
- Do not create an agent, sub-agent, delegated context, or temporary session.
- Do not authorize AO12-D or final M1.2 acceptance.
- Commit and push only the exact review result and pointer in Foundation Docs.
- Terminal summary and pointer block must be ASCII-only.
- Return the result to Advisor and STOP.
