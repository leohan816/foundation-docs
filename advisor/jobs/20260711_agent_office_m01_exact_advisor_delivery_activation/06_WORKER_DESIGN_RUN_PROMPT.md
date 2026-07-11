========
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office M01 exact Advisor delivery bridge design
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: Codex 5.6 Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/06_WORKER_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing Agent Office Worker session. Read the committed design handoff directly. Author and push design/instruction artifacts only; do not implement source/config/tests, create a capability, start a server, or send tmux input. Resolve DQ-01 through DQ-08 from actual evidence or return a decision blocker. Write and push the exact result and pointer, return an ASCII-only pointer to Advisor, and STOP.
========
