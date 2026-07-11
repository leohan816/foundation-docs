========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office M01 operational config mode patch
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none; follow repo-local AGENTS.md and CLAUDE.md
MODEL_EFFORT: Codex 5.6 Sol High
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/54_WORKER_OPERATIONAL_CONFIG_MODE_PATCH_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Read the committed handoff directly. Patch only the operational authority config group/other-write mode enforcement, exact tests, and matching canonical wording. Preserve all round-2 architecture and security boundaries. Run every required gate, commit and push only the approved branch and exact result artifacts, return the ASCII-only pointer to Advisor, and STOP.
========
