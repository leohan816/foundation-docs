TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor or Fable5 Reviewer
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

Read and execute `61_PIXEL_OFFICE_DESIGN_BRIEF.md` directly. Work in
`DESIGN_ONLY__NO_RUNTIME_OR_DEPENDENCY_CHANGE` mode. Inspect current source and
canonical documents, perform the required official-library evidence check, and
publish the exact canonical design package, result, and pointer. Do not install
PixiJS, modify runtime/tests/assets/package files, or begin implementation.

Use only the same session. Do not create an agent, sub-agent, delegated context,
or temporary session. Preserve the current loopback demo and all unrelated dirty
state. Return the ASCII-only result pointer to Advisor and stop.
