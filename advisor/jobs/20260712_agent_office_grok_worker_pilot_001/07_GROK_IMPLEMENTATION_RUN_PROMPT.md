TARGET_ACTOR: Worker
TARGET_SESSION: same existing qualified `agent-office-grok/$16/%16` session
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
DO_NOT_PASTE_INTO: Advisor, `agent-office`, or Reviewer
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

========
TARGET_ACTOR: Agent Office Grok Pilot Worker
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office-grok-pilot-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-grok-pilot-001
TARGET_SESSION_NAME: agent-office-grok
REQUIRED_SKILL: none
MODEL: grok-build
MODEL_EFFORT: NOT_CONFIGURABLE_BY_MODEL__USE_PROVIDER_DEFAULT
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001/07_GROK_IMPLEMENTATION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true

Open READ_AND_EXECUTE directly. Confirm the Advisor-accepted qualification exists, implement only the bounded pilot on the exact isolated branch, publish the evidence-bearing result and pointer, return the ASCII-only pointer to Advisor, and STOP.
========
