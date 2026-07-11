# Agent Office M01 Final Rework Run Prompt

NO_NEW_AGENT_OR_SUBAGENT: true

========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_APP_ROOT: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office
MODEL_EFFORT: <Codex 5.6 Sol:Ultra>
REQUIRED_SKILL: none
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/45_WORKER_FINAL_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TERMINAL_OUTPUT_POLICY: ASCII_ONLY

Read the exact committed rework handoff and patch only AO-E-R1, AO-E-R2, and
their D-1/D-2/D-3 as-built documentation. Build an executable loopback
composition and production runtime client that remain AUTH_BLOCKED/read-only
without an approved provider; do not invent NoAuth or a credential. Preserve and
verify authorityRole against immutable authority evidence before durable
decision linkage. Run all required tests and smoke checks, commit/push exact
target changes, publish the durable result/pointer, return to Advisor, and STOP.
========
