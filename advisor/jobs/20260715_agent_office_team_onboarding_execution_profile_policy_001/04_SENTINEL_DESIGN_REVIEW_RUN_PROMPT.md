# Sentinel Design Review Run Prompt

TARGET_ACTOR: Agent Office Reviewer

TARGET_SESSION: `agent-office-reviewer`

SOURCE_ADVISOR_JOB:
`advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001`

========
TARGET_ACTOR: Agent Office Reviewer
TARGET_SESSION_NAME: agent-office-reviewer
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: INDEPENDENT_SENTINEL_DESIGN_REVIEW
SELECTED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
REQUIRED_SKILL_PATH: /home/leo/Project/skill/fable-sentinel/SKILL.md
REQUIRED_SKILL_SHA256: 429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001/advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001/04_SENTINEL_DESIGN_REVIEW_HANDOFF.md
REVIEW_BASE: 50124a1ea720e162e906c04c6f6fb2591c4974b8
REVIEW_CANDIDATE: 24e5bc1b52f617648742162376c07e747a2f31e0
DO_NOT_TRUST_SUMMARIES: true
INSPECT_ACTUAL_DIFF_FIRST: true
DO_NOT_IMPLEMENT_OR_PATCH: true
DO_NOT_CREATE_AGENTS_OR_SUBAGENTS: true
RETURN_RESULT_TO: agent-office-advisor
Use the required Sentinel skill and exact committed handoff. Produce one independent DESIGN_REVIEW verdict, commit/push only the two authorized governance artifacts, then STOP.
========
