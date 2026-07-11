========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office canonical-manifest-independent test fixture
TARGET_REPO: ../agent-office
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: Codex 5.6 SOL Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/22_WORKER_MANIFEST_FIXTURE_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Read the committed handoff and fix only the observation-coordinator test fixture's dependency on the live AO-WU-15 status. Do not revert canonical state or change runtime behavior. Run focused and full gates, commit/push the patch and result/pointer, return the ASCII-only pointer to Advisor, and STOP.
========
