TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

========
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office Batch A
TARGET_REPO: /home/leo/Project/agent-office-batch-a-001
TARGET_APP_ROOT: /home/leo/Project/agent-office-batch-a-001
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
READ_AND_EXECUTE: /home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/06B_WORKER_IMPLEMENTATION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Resume after the clean scope stop. The reviewed implementation base is now
`453c661c4f4243c77b2f53089ec599561876b06f`; actor-overlay ownership and both
coupled tests are explicitly authorized. Re-read the amended handoff and current
design directly, use `/fable-builder`, run `npm ci` from the committed lockfile if
needed, and implement/test BA-WU-01..09. Do not use agents/sub-agents, Grok code,
or the excluded session. Commit/push the exact branch and result/pointer, return
to Advisor, and STOP.
========
