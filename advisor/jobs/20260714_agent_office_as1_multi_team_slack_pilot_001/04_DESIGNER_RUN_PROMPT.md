TARGET_ACTOR: Designer
TARGET_SESSION: agent-office-designer
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001
DO_NOT_PASTE_INTO: Advisor, Worker, Reviewer, Foundation Advisor, or GPT strategy session
RETURN_RESULT_TO: agent-office-advisor
GPT_DIRECT_USE: inspect only; execute only in the named Designer session

========
TARGET_ACTOR: Agent Office Designer
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_APP_ROOT: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001
TARGET_SESSION_NAME: agent-office-designer
MODEL_EFFORT: gpt-5.6-sol / max (verify live; do not infer from session name)
REQUIRED_MODE: BOUNDED_SECURITY_TRANSPORT_DESIGN_MODE
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001/advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/04_DESIGNER_HANDOFF.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_AGENTS_OR_SUBAGENTS: true
NO_RUNTIME_IMPLEMENTATION: true
NO_SECRET_OR_LIVE_SLACK: true
NO_REVIEW_OR_NEXT_ACTOR_DISPATCH: true

Create and push the non-secret Setup Pack checkpoint first, print its exact paths
and commit, then continue the same bounded assignment through the full design
package. Return a concise pointer and STOP.
========
