TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
DO_NOT_PASTE_INTO: Advisor, `agent-office`, or Reviewer
RETURN_RESULT_TO: Advisor

========
TARGET_ACTOR: Agent Office Grok Pilot Worker Rework
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office-grok-pilot-001
TARGET_SESSION_NAME: agent-office-grok
MODEL: grok-build
MODEL_EFFORT: NOT_CONFIGURABLE_BY_MODEL__USE_PROVIDER_DEFAULT
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001/09_GROK_QUALIFICATION_CORRECTION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true

Open READ_AND_EXECUTE directly. Correct only the named qualification evidence defect, publish the bounded correction, return the ASCII-only pointer to Advisor, and STOP.
========
