# Advisor Batch E Pre-Review Validation

Status: `PROCEED_TO_INDEPENDENT_REVIEW_WITH_OPEN_CONFORMANCE_FINDINGS`

Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`

Target commits:

- implementation: `e0a11f69fffc9d35d67cc478cbefbb92d93cf528`
- canonical as-built documents: `72c24fe064247c1afe20ff00a5c85ea955cda5cd`
- branch/upstream: `shadow/agent-office-m01` / `origin/shadow/agent-office-m01`

This is an Advisor pre-review validation, not an acceptance, independent review,
or final approval.

## Direct verification completed

- target HEAD equals upstream and the worktree is clean;
- `npm run check`: lint, strict typecheck, 50 Vitest files / 196 tests, core
  build, and dashboard build passed;
- `npm run test:e2e`: 18/18 Chromium tests passed;
- `npm run test:security`: 7 files / 21 tests passed;
- `npm run test:recovery`: 8 files / 20 tests passed;
- `npm run test:pwa`: 2 files / 6 tests passed;
- `npm run audit:dependencies`: 0 vulnerabilities;
- desktop 1440x900, mobile 390x844, and reduced-motion baselines were viewed
  directly and were coherent, nonblank, and free of incoherent overlap;
- the reviewed HTTP code binds only explicit loopback, rejects unapproved Host,
  non-loopback peers, proxy headers, cross-origin mutation evidence, missing
  CSRF, missing capabilities, invalid schema/content type, oversized bodies,
  and unknown routes;
- static serving is allowlisted, owner checked, no-follow, byte bounded, and
  uses restrictive security/cache headers;
- service-worker runtime caching is same-origin GET/static only and excludes
  API, health, auth, artifacts, messages, decisions, and alerts;
- backup/restore uses complete manifests, owner-only paths, hash verification,
  an isolated candidate root, and explicit operator selection;
- no real DB, secret, credential, provider, non-loopback exposure, production,
  live use, Hermes implementation, or browser terminal/Worker/Reviewer dispatch
  was found or exercised.

## Open conformance findings for independent review

### AO-E-R1: production browser composition is still fixture-only

Observed facts:

- `src/ui/main.tsx` imports `CURRENT_DASHBOARD_VIEW_MODEL` and
  `COMMUNICATION_CENTER_FIXTURE` directly;
- the office scene is driven by selectable synthetic fixtures;
- the production browser entrypoint contains no API projection client,
  `EventSource`, authenticated session exchange, or live Advisor message port;
- `communicationActionPort` is not supplied by the production entrypoint;
- `package.json` has Vite `dev` and `preview`, but no executable composition root
  that starts the reviewed Node HTTP server, state/projection application, and
  browser shell together;
- `startAgentOfficeHttpServer` is currently a library/test surface;
- the default runtime truth is intentionally `AUTH_BLOCKED`, read-only, and
  mutation disabled because no approved real authentication provider exists.

Risk:

The code provides tested components and a safe static demonstration, but it does
not yet establish the mission's claimed operational loop: live multi-project
observation, real-time projection, active Advisor communication, acknowledgement,
and work resumption through the private web application. `OFFICE_WEB_APP:
RUNNING_PRIVATE` and `ADVISOR_COMMUNICATION: ACTIVE` cannot be claimed from the
current production entrypoint.

Independent Reviewer must classify this as one of `CODE_DEFECT`, `DESIGN_DEFECT`,
`DOCUMENTATION_STALE`, `DEFERRED_WITH_GATE`, or `NEEDS_LEO_GPT_DECISION`, and
must decide whether M01 can pass while these expected final-state capabilities
remain inactive. A real credential or weaker local trust model must not be
invented during review or patching.

### AO-E-R2: decision authority role is parsed but not durably linked

Observed facts:

- `parseDecision` accepts `authorityRole: 'Leo/GPT' | 'Advisor'`;
- `bindBatchDApplication.recordAdvisorDecision` drops `authorityRole` when it
  calls `AdvisorInboxService.linkDecision`;
- the decision-link command, immutable link artifact, event payload, and
  projection do not preserve this submitted authority-role field;
- the canonical contract says a recorded decision requires an immutable
  decision artifact, authority role, hash, and scope;
- the HTTP route requires `advisor_operator`, so the same browser capability can
  submit either authority label without an application-level correspondence
  check.

Risk:

The implementation records who linked the artifact (`Advisor`) but not the named
authority represented by the HTTP command. That makes the accepted field
non-functional and weakens the evidence required to distinguish an Advisor
routine record from a Leo/GPT decision. The Reviewer must verify whether the
authority is instead proven by an immutable artifact contract; if not, classify
and require a fail-closed fix with regression tests and matching as-built docs.

## Review routing verdict

`PROCEED_TO_FABLE5_DUAL_REVIEW_WITH_FINDINGS`

The findings are concrete enough to require independent classification, but no
Advisor patch or authority decision is made here. Fable5 must perform separate
design-conformance and implementation passes against the actual final tree.

Implementation and final approval remain `NOT_APPROVED`.
