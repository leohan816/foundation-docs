# Agent Office M01 Batch C Locale Determinism Rework Run Prompt

```text
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_APP_ROOT: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: GPT-5.6-Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/31_WORKER_BATCH_C_LOCALE_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
ASCII_ONLY_TERMINAL_OUTPUT: true

Read the exact committed handoff. Fix only Playwright process-locale determinism,
prove 10/10 under both C.UTF-8 and ko_KR.UTF-8 callers, run full regression,
publish the exact commits and corrected Batch C pointer, then STOP. Do not start
Batch D.
```
