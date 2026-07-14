TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Agent Office Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001/advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
DO_NOT_SEND_TMUX_INPUT: true
DO_NOT_ACTIVATE_SLACK_OR_AS1: true
========
