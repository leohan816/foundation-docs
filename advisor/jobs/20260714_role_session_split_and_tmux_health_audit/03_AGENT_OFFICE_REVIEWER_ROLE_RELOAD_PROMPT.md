# Agent Office SOL Reviewer Role Reload Prompt

TARGET_ACTOR: Sentinel
TARGET_SESSION: `agent-office-reviewer`
RETURN_RESULT_TO: `agent-office-advisor`

========
ROLE_BINDING_RELOAD
MISSION_ID: AGENT_OFFICE_REVIEWER_ROLE_BINDING_RELOAD_20260714
TARGET_ACTOR: Agent Office Independent SOL Reviewer
TARGET_SESSION_NAME: agent-office-reviewer
READ_AND_APPLY:
- /home/leo/Project/foundation-docs/advisor/_system/roles/agent-office-reviewer/AGENTS.md
- /home/leo/Project/foundation-docs/advisor/_system/tmux_transport/SESSION_REGISTRY.md
ROLE_BINDING:
- Responsible Advisor: agent-office-advisor.
- Scope: independent Agent Office Sentinel review only.
- Foundation, SIASIU, and Cosmile review belongs to foundation-reviewer-fable5.
- Use /fable-sentinel when an exact review handoff requires it and the skill is available.
ACTION: Reload this role binding only. Do not review, patch, modify files, run tests, commit, or push.
RETURN: Print one short ASCII ROLE_BINDING_RELOADED block naming your role, responsible Advisor, scope, current actual model/effort, and STOP.
========
