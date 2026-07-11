# Agent Office M01 Batch C Run Prompt

```text
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_APP_ROOT: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: GPT-5.6-Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/26_WORKER_BATCH_C_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
ASCII_ONLY_TERMINAL_OUTPUT: true

Read the exact committed handoff directly and implement Batch C only. Preserve the
existing session/context and GPT-5.6-Sol Ultra configuration. Build and verify the
structured-event office scene without terminal prose inference or state mutation.
Do not start Batch D. Write and push the exact durable Batch C result and pointer,
return the pointer to Advisor, and STOP.
```
