# Agent Office M01 Batch B Run Prompt

```text
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_APP_ROOT: /home/leo/Project/agent-office
TARGET_SESSION_NAME: agent-office
REQUIRED_SKILL: none
MODEL_EFFORT: GPT-5.6-Sol Ultra
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/23_WORKER_BATCH_B_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
ASCII_ONLY_TERMINAL_OUTPUT: true

Read the exact committed handoff directly and implement Batch B only. Preserve the
existing session/context and GPT-5.6-Sol Ultra configuration. Do not infer state
from terminal prose. Do not send tmux input or mutate observed repositories. Do
not start Batch C. Write and push the exact durable Batch B result and pointer,
return the pointer to Advisor, and STOP.
```
