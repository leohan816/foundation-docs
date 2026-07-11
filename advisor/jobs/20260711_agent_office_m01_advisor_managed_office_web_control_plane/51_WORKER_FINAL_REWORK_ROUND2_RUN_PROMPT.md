========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office M01 final rework round 2
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none; follow repo-local AGENTS.md and CLAUDE.md
MODEL_EFFORT: Codex 5.6 Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/51_WORKER_FINAL_REWORK_ROUND2_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing Agent Office Worker session. Read the actual handoff and evidence files directly. Patch only AO-E-R3 R3.1-R3.9. Preserve all reviewed security and authority boundaries. Do not use DB, secrets, credentials, real auth providers, real tmux delivery, production/live, public exposure, main, or unrelated files. Commit and push only the approved Agent Office branch changes and exact result artifacts. Return the ASCII-only pointer to Advisor and STOP.
========
