========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office M1.2 AO12-D
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL: GPT-5.6 SOL
MODEL_EFFORT: ULTRA
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/49_AO12_D_WORKER_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
ASCII_ONLY_TERMINAL_OUTPUT: true

Read the exact committed handoff and rework brief. Correct only AO12-D-A1: remove
synthetic spatial fixture code from the production dashboard bundle while
preserving explicit demo/test fixtures and all authenticated M1/AO12-D behavior.
Reproduce the defect, patch, add a deterministic bundle gate, run every required
regression and Git check, publish the exact rework result/pointer, return to
Advisor, and STOP. Do not self-review or start another mission.
========
