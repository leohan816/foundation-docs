TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
RETURN_RESULT_TO: Advisor

========
TARGET_ACTOR: Agent Office Grok Pilot Worker Rework
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office-grok-pilot-001
TARGET_SESSION_NAME: agent-office-grok
MODEL: grok-build
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001/13A_GROK_REWORK_API_RETRY_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
RETRY_LIMIT: one

Open READ_AND_EXECUTE directly. Resume the exact bounded rework once. On repeated 403/auth/permission failure, return AUTHENTICATION_REQUIRED and STOP.
========
