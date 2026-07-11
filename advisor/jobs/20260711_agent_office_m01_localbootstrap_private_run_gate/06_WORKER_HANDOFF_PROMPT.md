# Worker Handoff - Agent Office LocalBootstrap Gate

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate`
DO_NOT_PASTE_INTO: Advisor session or Fable5 Reviewer session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

Read and execute `02_WORKER_BRIEF.md` directly. This is the exact Leo/GPT-approved
LocalBootstrap code/test/documentation pass. Work only in the existing Worker
session, use no agents/sub-agents/delegated contexts, and do not create the real
credential or leave a server running. Implement, test, document, commit, push,
write the durable result/pointer, return to Advisor, and stop.
