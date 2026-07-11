# Agent Office M01 Batch D Capability Validation Rework

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor

## Mode

`IMPLEMENTATION_BATCH_D_REWORK__CAPABILITY_FAIL_CLOSED`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Read this file, `35_ADVISOR_BATCH_D_VALIDATION.md`, the actual current source,
tests, canonical documents, Git state, and active repo instructions directly.
Do not rely on terminal prose or memory.

Use the same existing Worker session. No new session, agent, sub-agent, delegated
context, or temporary context. Batch E remains unauthorized.

## Exact Patch Scope

Close only finding `AO-D-R1`:

1. In the Batch D tmux Advisor gateway, validate the exact runtime vocabulary:
   - `state`: `ACTIVE | DISABLED | CONFLICT`
   - `killSwitch`: `DISENGAGED | ENGAGED`
   - `synchronization`: `SINGLE_PREVALIDATED_DESTINATION | CONFLICT`
2. No malformed value may produce `READY` or invoke the delivery port.
3. Preserve fail-closed manual fallback for invalid/unavailable authority. Do not
   add a repair, target selection, launcher, command, process, network, or retry
   path.
4. Treat a future `issuedAt` and `now >= expiresAt` as stale/mismatched.
5. Validate the runtime clock consistently in health, queue, and receipt lookup.
6. Add direct regression tests that bypass TypeScript using `unknown`/runtime
   objects for each invalid enum category. Also test future-issued and exact
   expiry. Assert no delivery call.
7. Re-run the full sequential Batch D gate: lint, typecheck, all Vitest, both
   builds, all Playwright, dependency audit, diff check, and boundary scans.
8. Update only documentation materially affected by the corrected behavior.

Do not modify unrelated Batch D behavior or any Batch A-C behavior. Do not start
Batch E or Fable review.

## Git and Result

Commit the narrow code/test patch first and any materially necessary canonical
documentation second. Push only `shadow/agent-office-m01` non-force.

- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_D_REWORK_RESULT.md`
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/37_WORKER_BATCH_D_REWORK_RESULT_POINTER.md`

Commit and push only those exact foundation-docs files serially. Return the
pointer to Advisor and STOP.

## Forbidden

No real tmux input, dynamic target, role/session/pane/command fields, process or
network primitive, Hermes implementation, HTTP/auth/PWA/server, DB/secret/prod/
live/customer data, Batch E, reviewer work, final approval, new context, main or
protected branch, force push, unrelated staging, or next mission.
