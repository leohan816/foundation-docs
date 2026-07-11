# Agent Office M01 Batch E Implementation Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor

## Mode

`IMPLEMENTATION_BATCH_E__PRIVATE_WEB_SECURITY_PWA_RECOVERY`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same session/context. No new session, agent, sub-agent, delegated context,
or temporary context. Read all active repo instructions, the seven canonical
Agent Office documents, `38_ADVISOR_BATCH_D_FINAL_VALIDATION.md`, current code,
tests, manifest, and Git state directly.

Batches A-D are accepted. Implement Batch E only. Independent review and final
approval remain pending.

## Objective

Complete the M01 local private web boundary, responsive PWA shell, authenticated
and capability-authorized server interfaces, SSE projection updates, HTTP
security controls, recovery/backup/restore implementation, private deployment
configuration, failure recovery, and end-to-end evidence without using a real
secret or exposing the service beyond loopback.

## Server and Network Boundary

- Default and only active M01 mode in this batch: `LOOPBACK_PRIVATE`.
- Bind only explicit `127.0.0.1` and/or `[::1]`; reject wildcard, non-loopback
  peers, unapproved Host, forwarding headers, proxy identity, and non-same-origin
  requests.
- No CORS. No public/private-network/Tailscale exposure. No TLS/HSTS claim.
- Implement the typed server composition boundary and exact closed API allowlist
  from the canonical security design. There is no terminal/shell/exec/command/
  dispatch/worker/reviewer/generic-path or generic-target route.
- Browser mutation may call only the typed Batch D Advisor application ports.
  It may never invoke a Worker or Reviewer or choose a role/session/pane/command.

## Authentication, Session, and HTTP Security

- Implement `AuthenticationProvider` and server-side session/capability contracts.
- Implement a deterministic `TestAuthenticationProvider` for tests only with a
  build/runtime guard that prevents non-test startup.
- Do not implement, generate, inspect, log, or activate a real local-bootstrap,
  OIDC, Tailscale, token, password, key, or credential. Without an approved real
  provider, mutation endpoints fail closed and the loopback service may expose
  only its explicitly approved read-only/local status surface.
- Sessions are opaque, server-side, revocable, expiring, rotated, and host-only
  cookie-backed with `HttpOnly`, `SameSite=Strict`, and `Path=/`. Test credentials
  and canaries are synthetic only.
- Every mutation requires exact Host/Origin, Fetch Metadata, JSON content type,
  synchronizer CSRF header, capability, requestId, route schema, size bound, and
  rate limit. GET/SSE/service worker/background sync never mutate.
- Implement CSP/no-inline-no-eval, frame/object/nosniff/referrer/permissions and
  no-store rules. Never emit secrets, paths, stack traces, message bodies, raw
  artifacts, terminal text, process argv, environment, or auth/CSRF values.

## Closed HTTP and SSE Contract

Implement only canonical read/status routes and these candidate mutations:

```text
POST /api/v1/advisor/messages
POST /api/v1/advisor/messages/:id/ack
POST /api/v1/advisor/intakes
POST /api/v1/decisions
POST /api/v1/alerts/:id/ack
POST /api/v1/delivery/disable
```

Any route whose underlying application command is not safely implementable from
current evidence must return a typed fail-closed response; do not invent product
authority. HTTP persistence success means only the Batch D `PERSISTED` receipt.
Delivery, acknowledgement, intake, decision, resume, and close remain separate.

SSE is read-only, same-origin and authenticated, bounded to two concurrent
connections per session, heartbeat/revocation aware, cursor/reconnect safe, and
contains projection notification IDs/revisions only. It carries no body, secret,
raw artifact, terminal data, or mutation.

## Rate and Resource Bounds

Implement the reviewed candidate constants:

- bootstrap test exchange: 5 attempts / 15 minutes / peer plus bounded lockout;
- Advisor message: 10/minute, burst 5, 60/hour per authenticated subject;
- other mutations: 30/minute per subject;
- reads: 120/minute per subject;
- SSE: 2 concurrent per session and 6 attempts/minute;
- 16 KiB message body, 32 KiB total mutation body, bounded timeout/cancellation.

Return bounded `429` and redacted audit evidence. In-memory limits are acceptable
only for this single-instance loopback M01; do not imply multi-host safety.

## PWA and Responsive UI

- Add a valid installable web manifest, owned local icons/assets, service worker,
  install/update/offline/reconnect UX, and visible loopback/read-only/auth/
  kill-switch/manual-fallback status.
- Cache only versioned static shell assets. Never cache API, SSE, auth, message,
  artifact, alert-detail, or decision data. No offline/background mutation queue.
- Logout/session expiry/capability reduction clears in-memory sensitive state and
  returns to auth/read-only state. Provide visible service-worker update and
  unregister/recovery behavior.
- Preserve current desktop/mobile UI and scene baselines unless a reviewed,
  evidence-backed change is required. Verify 1440/1024/390/320, landscape,
  200-percent text, keyboard, reduced motion, installability, and WCAG A/AA.

## Recovery, Backup, Rollback, and Operations

- Implement local owner-controlled complete-checkpoint backup manifests, atomic
  complete marker, hashes/modes/schema/source sequence, and incomplete-backup
  rejection using disposable fixtures only.
- Implement isolated restore verification: path/mode/hash/schema/tamper checks,
  replay/projection equivalence, idempotency, and explicit stopped-service
  selection contract. Never overwrite a current root in tests.
- Implement compatible-build rollback evidence and fail closed for a build that
  cannot read the on-disk schema. No destructive downgrade or auto restore.
- Implement startup readiness/quarantine/read-only behavior, storage failure,
  stale state, SSE degradation, service-worker recovery, app delivery disable,
  external kill-switch/manual fallback visibility, and evidence-bearing recovery
  result generation.
- No off-host/cloud backup, encryption-key handling, schedule, retention policy,
  actual deployment, chmod of unrelated files, or real state-root operation.

## Required Tests and Direct Evidence

Add and run tests covering at minimum:

- loopback/non-loopback bind and peer/Host/proxy fail-closed behavior;
- missing/invalid/test auth, session fixation/rotation/expiry/revocation/capability;
- Origin/Referer/Fetch Metadata/CSRF/CORS/content-type/cookie/security headers;
- exact route allowlist and rejection of target/command/path/Worker/Reviewer;
- rate/size/timeout/Unicode/control/Markdown/XSS/CSP/redaction;
- POST idempotency through restart and exact persistence-only receipt;
- SSE auth/concurrency/cursor/reconnect/heartbeat/revocation/no-sensitive-data;
- PWA install/update/offline/no-background-write and cache inspection;
- backup completeness, isolated restore, tamper/path/mode/hash/schema rejection,
  replay/projection equivalence, rollback compatibility, and recovery result;
- complete A-D regression, responsive/visual/accessibility behavior, and absence
  of DB, real secret/provider, network exposure, Hermes implementation, generic
  terminal, browser role dispatch, public/prod/live, and automatic next mission.

Use synthetic credentials/canaries and disposable owner-only roots only. Bind
test servers only to loopback and stop them after tests.

Run sequentially: lint, strict typecheck, all Vitest, both builds, all Playwright,
PWA/security/recovery E2E, dependency audit, `git diff --check`, source/boundary
scans, and a local loopback smoke test. Directly inspect desktop and mobile UI.

## Canonical As-Built Documentation

Update exactly the materially affected canonical Agent Office documents so they
describe the reviewed implementation, not an aspiration. For every critical
requirement keep:

```text
DESIGN_REQUIREMENT -> IMPLEMENTATION_PATH -> TEST_PATH -> CURRENT_EVIDENCE -> STATUS -> DEFERRED_GATE
```

Keep real auth/private-network/public deployment, external secrets, multi-host
limits, off-host backups, Hermes, DB, and production explicitly deferred.

## Git and Result

Commit code/config/tests/assets first and materially affected canonical docs
second. Push `shadow/agent-office-m01` non-force; no main push/merge.

Publish one complete evidence-bearing Worker implementation result covering
Batches A-E and one pointer:

- result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_FINAL_IMPLEMENTATION_RESULT.md`
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/40_WORKER_FINAL_IMPLEMENTATION_RESULT_POINTER.md`

Commit/push only those exact foundation-docs files serially. Return pointer to
Advisor and STOP. Do not invoke Reviewer yourself.

## Forbidden

No real secret/provider/credential, external/private-network/public bind or
exposure, Tailscale, TLS/HSTS claim, DB, customer data, production/live, browser
Worker/Reviewer dispatch, arbitrary terminal/tmux/process command, real tmux
input, synchronized/wildcard pane, Hermes implementation, off-host backup,
automatic approval, independent review, final approval, new context, main or
protected branch, force push, unrelated staging, or automatic next mission.

STOP for any need to use a real credential, expose beyond loopback, choose new
product authority, weaken security, alter current transport authority, or exceed
Batch E.
