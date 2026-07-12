# Grok Rework Resume After Owner Reauthentication

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
RETURN_RESULT_TO: Advisor

Leo completed owner-side `grok logout`, `grok login --device-auth`, and
`grok models`. The account is again authenticated as `leohan80@naver.com` and
`grok-build` remains the default exposed model. No credential value is part of
this handoff.

Resume the exact unchanged rework in
`13_GROK_IMPLEMENTATION_REWORK_HANDOFF_PROMPT.md` from clean target commit
`2378b28de2975f3cf00ba9922ea2f14d7af0fd30`. Directly re-read that file and
`12_ADVISOR_IMPLEMENTATION_VALIDATION.md`; do not execute from memory.

Do not create an agent/subagent/session, switch model, broaden scope, repeat the
first implementation, or contact `agent-office`. Complete A-1 through A-7,
tests, docs, exact report, commit/push, result/pointer, and STOP.

If authentication/permission fails again after this completed owner
reauthentication, return the exact error to Advisor and stop without another
automatic retry.
