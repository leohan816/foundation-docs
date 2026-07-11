========
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office M01 LocalBootstrap private-run gate
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: Codex 5.6 Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/06_WORKER_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
ENCODING_POLICY: ASCII-only terminal output; repository Markdown keeps its normal UTF-8 language
Read the committed handoff and Worker brief directly. Implement only the approved LocalBootstrap code, tests, canonical as-built docs, and non-secret runbook. Do not create the real credential, start the real private run, activate tmux delivery, expose a network interface, or access forbidden systems. Commit and push the target branch and exact foundation-docs result/pointer, return the ASCII-only pointer to Advisor, and STOP.
========
