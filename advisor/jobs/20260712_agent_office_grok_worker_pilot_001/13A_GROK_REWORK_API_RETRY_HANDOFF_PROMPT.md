# Grok Rework API Retry

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: same existing `agent-office-grok/$16/%16`
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
RETURN_RESULT_TO: Advisor

The prior rework turn failed before edits with one xAI
`403 permission-denied` response. Advisor revalidated that `grok models` still
reports authenticated `grok.com` access and exposes `grok-build`.

Resume the exact unchanged rework in
`13_GROK_IMPLEMENTATION_REWORK_HANDOFF_PROMPT.md` from current Git state. This is
one idempotent API retry only. Do not repeat completed work, broaden scope, create
an agent/subagent/session, switch models, or change authentication.

If the same 403/auth/permission error occurs again, do not retry. Return exactly:

```text
AUTHENTICATION_REQUIRED
MINIMAL_OWNER_ACTION: reauthenticate the existing Grok CLI account or resolve its Grok Build chat-endpoint permission, then return to Advisor
```

Otherwise complete the exact rework, evidence, commit/push, result, pointer, and
STOP contract already defined.
