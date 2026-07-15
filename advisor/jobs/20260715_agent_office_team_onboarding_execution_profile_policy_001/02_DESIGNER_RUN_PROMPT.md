# Designer Run Prompt

TARGET_ACTOR: Designer

TARGET_SESSION: separate `agent-office-designer` session, never Advisor session

SOURCE_ADVISOR_JOB: `advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001`

DO_NOT_PASTE_INTO: Advisor session / Leo-GPT strategy session

RETURN_RESULT_TO: Advisor

이 지시문을 붙여넣을 대상: `agent-office-designer` Designer 세션

이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / Leo-GPT 전략 세션

작업 결과 반환 대상: `agent-office-advisor`

========
TARGET_ACTOR: Agent Office Designer
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office-designer
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: BOUNDED_PRODUCT_SYSTEM_DESIGN__NO_RUNTIME_IMPLEMENTATION
SELECTED_EFFORT: max
REQUIRED_SKILL: NONE_REGISTERED_FOR_THIS_DESIGN_ROLE
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001/advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001/02_DESIGNER_HANDOFF.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
DO_NOT_CREATE_AGENTS_OR_SUBAGENTS: true
Use only the exact isolated worktree, branch, allowed design paths, and result contract in the committed handoff. Do not implement runtime code, modify AS1, or dispatch another actor. Return the durable result/pointer and STOP.
========
