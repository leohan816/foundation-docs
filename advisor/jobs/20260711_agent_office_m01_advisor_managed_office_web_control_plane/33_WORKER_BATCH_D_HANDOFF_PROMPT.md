# Agent Office M01 Batch D Implementation Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor

## Mode

`IMPLEMENTATION_BATCH_D__ADVISOR_COMMUNICATION_CENTER`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same session/context. No agent, sub-agent, delegated context, temporary
session, or other Worker. Read all active repository instructions, seven canonical
Agent Office documents, `32_ADVISOR_BATCH_C_FINAL_VALIDATION.md`, current code,
tests, Git state, and M01 authority directly.

Batch C is accepted. Batch D only is authorized. Batch E is not authorized.

## Objective

Implement the structured Leo-to-Advisor communication center, durable message and
notification application services, Advisor-only gateway boundary, alert actions,
deterministic GPT package flow, acknowledgement/intake/decision/resume evidence,
and responsive Inbox/Alerts UI. Browser input can address only Advisor and can
never select or dispatch to a Worker, Reviewer, role, session, pane, shell, argv,
or arbitrary path.

## Required Message Flow

Support `NEW_MISSION`, `CLARIFICATION`, `DECISION_RESPONSE`, `PAUSE`, and
`CANCEL` through exactly:

```text
validated structured input
-> immutable owner-only message artifact
-> durable AdvisorMessagePersisted event
-> notification outbox entry
-> fixed Advisor-only gateway receipt or MANUAL_FALLBACK_REQUIRED
-> separate Advisor acknowledgement artifact/event
-> separate canonical intake or decision reference
-> optional ResumeProof / WORK_RESUMED
-> CLOSED
```

HTTP is Batch E. Batch D tests invoke typed application ports directly. Do not
fake HTTP success or SSE.

Preserve the canonical message states: `PERSISTED`, `DELIVERY_PENDING`,
`DELIVERED`, `DELIVERY_FAILED`, `MANUAL_FALLBACK_REQUIRED`, `ACKNOWLEDGED`,
`INTAKE_RECORDED`, `DECISION_LINKED`, `CLOSED`.

## Persistence, Idempotency, and Audit

- Preserve/generate `requestId` before submission.
- Canonicalize and hash the exact structured payload.
- Same ID and bytes returns the prior durable receipt; same ID and different
  bytes fails atomically with `IDEMPOTENCY_KEY_REUSED`.
- Artifacts are create-exclusive, path-contained, owner-only, size-bounded,
  fsynced, and immutable.
- Event durability precedes acknowledgement; retry keeps the same request ID.
- Offline/background queueing is forbidden.
- Message body must not enter audit, launcher, tmux command, log, alert, receipt,
  or GPT package unless canonically required.
- Add redacted hash-chained audit records for lifecycle, gateway outcome,
  acknowledgement, decision link, and resume proof.
- Cover artifact/event/outbox/receipt crash points with disposable fixtures;
  ambiguous delivery means manual fallback and no blind resend.

## Advisor Gateway

Implement the transport-neutral `AdvisorGateway` contract, fixed logical
Advisor-only `TmuxAdvisorGateway`, disabled interface-compatible
`HermesAdvisorGateway`, and manual fallback.

The Tmux input is exactly the canonical pointer envelope. It accepts no role,
session, pane, body, prompt, command, argv, executable, or arbitrary path. It
depends on an injected Advisor-owned prevalidated transport capability and
immutable authority snapshot. Agent Office must not infer a pane, construct a
launcher, edit transport state, disengage the kill switch, answer prompts, retry
ambiguous delivery, or duplicate the transport decision matrix.

Tests use inert fakes. Do not send real tmux input. Missing, stale, conflicting,
or disabled capability returns manual fallback/disabled with no process side
effect. Hermes has no endpoint, credential, discovery, network, process, or write
side effect.

## Alerts and GPT Package

Implement projector/application/UI support for the canonical nine AlertKind
values only. Preserve typed deduplication, severity, acknowledgement versus
resolution, snooze/suppression, blocker reason, safe default, resolution owner,
next action, and evidence references.

Alert detail includes initiative/package/mission, request ID, phase/WorkUnit,
facts, unknowns, exact question, options, recommendation, safe default, blocked
capability, and evidence where present.

Required UI actions: `GPT용 패키지 복사`, `증거 열기`, `Advisor에게 답변`,
`보류`, `미션 일시정지`, `미션 취소`.

The deterministic copy package uses the canonical ordered fields exactly:

```text
TARGET_ACTOR: Leo/GPT
MISSION:
REQUEST_ID:
SOURCE_ADVISOR_JOB:
READ_DECISION_REQUEST:
CONFIRMED_FACTS:
UNKNOWNS:
QUESTION:
OPTIONS:
ADVISOR_RECOMMENDATION:
SAFE_DEFAULT:
RETURN_RESULT_TO: Advisor
DO_NOT_START_ANOTHER_MISSION_AUTOMATICALLY: true
```

Copying is not approval, acknowledgement, resolution, or execution.

## Inbox and Alerts UI

- Add operations-focused Inbox and Alerts views to the real dashboard.
- Compose fields: mission, structured kind, subject, text, allowlisted entity
  references only. No role/session/pane/command/path input.
- Show persistent request ID, artifact hash, message timeline, timestamps,
  evidence, delivery receipt, acknowledgement, intake/decision, and resume states
  separately.
- Manual fallback shows pointer/hash and Advisor routing requirement only.
- Sanitized text/limited Markdown is inert; code blocks never become controls.
- Critical alerts remain visible across views.
- Responsive 1440/1024/390/320/landscape/200%-text, no overlap/hidden submit
  state/hover dependency/sub-44px controls.
- Full keyboard/focus/live-region/no-color-only support and Korean labels.
- Local fixtures cannot write real transport or claim acknowledgement.

## Required Tests

Test immutable artifact/path containment; same-ID replay/conflict and restart;
crash boundaries; message transitions; fixed Advisor-only gateway and no dynamic
command surface; active/disabled/stale/kill-switch/manual fallback; ambiguous
receipt no-resend; Hermes disabled; notification dedup/recovery; acknowledgement
separation; GPT snapshots/copy; alert actions/evidence/accessibility; malicious
inert text; responsive Inbox/Alerts; complete A-C regression; and continued
absence of Batch E server/auth/SSE/PWA/exposure.

Run lint, strict typecheck, full Vitest, both builds, Playwright, audit,
`git diff --check`, and boundary scans sequentially.

## Git and Result

Commit code/config/tests first and materially affected canonical docs second.
Push `shadow/agent-office-m01` non-force; no main push/merge.

- result: `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_D_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/34_WORKER_BATCH_D_RESULT_POINTER.md`

Commit/push only those exact foundation-docs files serially. Return pointer to
Advisor and STOP.

## Forbidden

No browser direct role dispatch, arbitrary terminal/dynamic target/shell,
synchronized or wildcard tmux, real tmux input, HTTP/SSE/WebSocket/auth/CSRF/rate
limit/PWA/service worker/deployment/private-network exposure, Hermes
implementation, DB/secret/credential/prod/live/customer data, automatic approval,
Batch E/Fable review/final approval/next mission, new session/agent/delegation,
main/protected branch, force push, or unrelated staging.

STOP for design conflict, material authority/risk decision, real credential/host
capability need, or scope beyond Batch D.
