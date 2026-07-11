# Agent Office Worker LocalBootstrap Private-Run Gate Result

Status: `LOCALBOOTSTRAP_CODE_TEST_DOCS_RUNBOOK_IMPLEMENTED_TESTED_AND_PUSHED__REAL_CREDENTIAL_AND_PRIVATE_RUN_NOT_PERFORMED__RETURN_TO_ADVISOR`

This is factual Worker implementation evidence for the exact scope authorized by
`06_WORKER_HANDOFF_PROMPT.md` and `02_WORKER_BRIEF.md`. It implements the
LocalBootstrap code/test/documentation gate only. It is not a Fable5 verdict,
Advisor acceptance, risk acceptance, private-run result, Leo/GPT final approval,
or mission closure.

## 1. Identity and Git State

- MISSION_ID: `AGENT_OFFICE_M01_LOCALBOOTSTRAP_PRIVATE_RUN_GATE`
- GOVERNED_MISSION_ID:
  `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- ACTOR: `Agent Office Worker`
- TARGET_PROJECT: `Agent Office M01 LocalBootstrap private-run gate`
- TARGET_REPO: `/home/leo/Project/agent-office`
- TARGET_APP_ROOT: `/home/leo/Project/agent-office`
- TARGET_BRANCH: `shadow/agent-office-m01`
- TARGET_UPSTREAM: `origin/shadow/agent-office-m01`
- STARTING_TARGET_HEAD: `abff45c9925962be29be535685e3efbccd587528`
- IMPLEMENTATION_TEST_COMMIT: `2623922877bd52dc7f5b6c6cd45fae755e5ff228`
- CANONICAL_DOCS_RUNBOOK_COMMIT: `9c403da5662aeedc28a8c677c37a134aaa44dce3`
- RESULTING_TARGET_HEAD: `9c403da5662aeedc28a8c677c37a134aaa44dce3`
- TARGET_PUSH_STATUS: `PUSHED_NON_FORCE__HEAD_EQUALS_UPSTREAM__LEFT_RIGHT_0_0`
- TARGET_TRACKED_STAGED_UNTRACKED_STATUS: `CLEAN`
- EXISTING_SESSION: same active `agent-office` Worker session/context
- MODEL_EFFORT: `Codex 5.6 Sol Ultra`
- REQUIRED_SKILL: `none`
- NEW_AGENT_SUBAGENT_DELEGATION_STATUS: `NONE`
- NEW_TEMPORARY_SESSION_STATUS: `NONE`
- RESULT_GENERATED_AT_UTC: `2026-07-11T11:14:49Z`
- RESULT_FILE:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_localbootstrap_private_run_gate/WORKER_RESULT.md`
- POINTER_FILE:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/11_WORKER_RESULT_POINTER.md`
- FOUNDATION_DOCS_RESULT_COMMIT: recorded by the separately committed pointer
  after this result-only commit is pushed.

The exact committed handoff, Worker brief, repository instructions, run protocol,
result-reporting protocol, current code/tests, actual canonical manifest, and all
seven canonical documents were read directly. No work was executed from memory.
No unrelated target or foundation-docs path was staged.

## 2. Exact Authorized Implementation

### 2.1 Production provider and proof channel

`src/server/auth/local-bootstrap.ts` implements a production
`LocalBootstrapAuthenticationProvider` behind the existing authentication port:

- 32 bytes of Node cryptographic randomness produce one 43-character base64url
  proof; caller-selected low-entropy values cannot create authority;
- retained provider state contains a random salt and SHA-256 verifier, never the
  recoverable proof;
- default proof and session lifetimes are 15 minutes;
- the proof is written only to the explicit absolute path as a bounded exclusive
  no-follow regular `0600` file;
- the parent must be canonical, owner/UID controlled, group/other inaccessible,
  and owner writable/executable; the reviewed runbook fixes it to `0700`;
- file owner, mode, size, device and inode are verified, file and directory are
  synced, and exact identity is rechecked before removal;
- pre-existing regular/symlink/special output, symlinked or insecure directory,
  changed mode, stale crash output, replay, expiry and restart fail closed without
  overwrite or resurrection; and
- success consumes/removes the proof before creating a session; shutdown and
  expiry remove an exact pending file where safely owned.

No proof is written to stdout/stderr, URL/query, argv, environment, logs, audit
payload, state artifact, source, static output, PWA cache, browser storage, or
committed evidence.

### 2.2 Trusted configuration and production composition

- Deployment schema v2 is the only production selector for exact
  `LOCAL_BOOTSTRAP` / `ENABLED_LOCAL_BOOTSTRAP`.
- The mode is fixed to one bind and Host at `127.0.0.1:4317`; CORS, proxy trust,
  TLS and HSTS remain false. The committed v1 default remains
  `NONE_READ_ONLY`/mutation disabled.
- Deployment and operational config loaders require absolute owner-controlled
  no-follow bounded regular files with group/other write bits clear; exact
  `0400`/`0600` acceptance and `0620`/`0602`/`0666` rejection are tested.
- Production LocalBootstrap requires the actual current canonical M01 manifest
  under the sibling `foundation-docs` root, with matching project/root/Git source,
  path, repository, commit, bytes and clean path verification. Fixture or
  alternate-root authority rejects before proof creation or listener bind.
- Proof parent, application, state, static and every canonical observed root must
  be isolated.
- Production constructs the provider, opaque browser-session registry and
  authentication exchange only for trusted v2 config. Authentication startup
  runs before bind and cleanup is ordered with listener/SSE/store shutdown.
- LocalBootstrap rejects a usable Advisor gateway capability or injected tmux
  delivery port before bind. `TmuxAdvisorGateway` remains capability-less and
  port-less, so durable messages project `MANUAL_FALLBACK_REQUIRED` and no real
  input is sent.
- Readiness reports `LOCAL_BOOTSTRAP`, `ENABLED_LOCAL_BOOTSTRAP`, and
  `MUTATION_READY` only when the exact session provider is configured; delivery
  readiness remains independent/manual.

### 2.3 HTTP, session and UI lifecycle

- `POST /api/v1/auth/local-bootstrap/exchange` requires an exact loopback peer,
  Host and explicit Origin, same-origin Fetch Metadata, JSON content type, no
  query/fragment, a strict 1024-byte body containing only the proof, and the
  dedicated 5-attempt/15-minute rate policy.
- Exchange rotates/revokes a prior browser session and returns only redacted
  authenticated status/expiry plus a host-only `HttpOnly`, `SameSite=Strict`
  cookie. Local capabilities are fixed to `viewer` and `leo_input`.
- `POST /api/v1/auth/logout` requires the session, `viewer`, CSRF, JSON `{}` and
  mutation rate control; it revokes provider/browser sessions, closes SSE and
  clears the cookie. Invalid/expired session responses also clear the cookie.
- The production runtime UI distinguishes `LOGIN_REQUIRED`,
  `LOCAL_BOOTSTRAP_AUTHENTICATED`, `LOCAL_BOOTSTRAP_ENABLED`, `LOGGED_OUT`, and
  `MANUAL_FALLBACK_REQUIRED`.
- The Korean proof form is labelled, password-style, exact-shape, and clears the
  local proof value before awaiting exchange. It has no remember/identity/target
  control. Logout removes protected scene and mutation access.
- Static-only PWA rules remain. Browser canary tests prove proof absence from URL,
  request URLs, local/session storage, IndexedDB and cache bodies.

### 2.4 Canonical manifest and presentation

The production composition test reads the actual committed foundation-docs
manifest bytes and current Git HEAD, then verifies the operational projection.
The canonical instance is manifest version 2 with denominator 15; AO-WU-01
through AO-WU-13 are `COMPLETED`, AO-WU-14 is `WAITING_LEO`, and AO-WU-15 is
`WAITING_DEPENDENCY`. Repository fixture fallback is explicitly rejected.

Three composed baselines now show LocalBootstrap authenticated/mutation badges,
manual delivery and Logout at desktop, mobile and reduced motion. They were
directly inspected. The configured Chromium runtime produces a transient black
frame when Playwright force-disables animations on the normal desktop page;
desktop capture therefore uses `animations: allow` only after the test proves
zero structured motion/route cues. Reduced-motion behavior remains independently
enforced and inspected. No cross-runtime visual portability claim is made.

### 2.5 Canonical documentation and runbook

README and all seven canonical documents record exact as-built paths, commit,
tests, manifest-v2 truth, limitations and gates. The new non-secret
`docs/operations/LOCAL_BOOTSTRAP_PRIVATE_RUN_PREPARATION.md` records only future
owner-only paths/config/state preparation, fixed port 4317, actual manifest
requirements, credential non-disclosure, stale-file recovery, SSH-forward
compatibility boundary, evidence and shutdown rules. It explicitly requires
Fable5 code/security `PASS` and Advisor authority and does not create or reveal a
credential.

## 3. Exact Target Changed Files

### Implementation/test/baseline commit

Commit `2623922877bd52dc7f5b6c6cd45fae755e5ff228` changed exactly 28 files:

1. `playwright.composed.config.ts`
2. `scripts/e2e-composed-runtime-server.mjs`
3. `src/operations/readiness/index.ts`
4. `src/runtime/cli.ts`
5. `src/runtime/composition-core.ts`
6. `src/runtime/composition.ts`
7. `src/runtime/test-composition.ts`
8. `src/server/application.ts`
9. `src/server/auth/index.ts`
10. `src/server/auth/local-bootstrap.ts`
11. `src/server/config.ts`
12. `src/server/http/server.ts`
13. `src/ui/pwa/runtime-boundary.tsx`
14. `src/ui/runtime/client.ts`
15. `src/ui/runtime/runtime-app.tsx`
16. `src/ui/styles.css`
17. `tests/acceptance/batch-gates.test.ts`
18. `tests/e2e-composed/application-office-scene.spec.ts`
19. `tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-desktop-1440x900.png`
20. `tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-mobile-390x844.png`
21. `tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-reduced-motion-1440x900.png`
22. `tests/helpers/operational-runtime.ts`
23. `tests/helpers/server-fixture.ts`
24. `tests/integration/observation-coordinator.test.ts`
25. `tests/integration/runtime-composition.test.ts`
26. `tests/security/local-bootstrap-http.test.ts`
27. `tests/security/local-bootstrap-provider.test.ts`
28. `tests/security/private-network-disabled.test.ts`

Commit size: 1,940 insertions and 98 deletions.

### Canonical docs/runbook commit

Commit `9c403da5662aeedc28a8c677c37a134aaa44dce3` changed exactly 9 files:

1. `README.md`
2. `docs/FEATURE_INDEX.md`
3. `docs/architecture/AGENT_OFFICE_MASTER_DESIGN.md`
4. `docs/contracts/AGENT_OFFICE_DOMAIN_EVENT_CONTRACT.md`
5. `docs/integration/AGENT_OFFICE_GATEWAY_MULTI_HOST_DESIGN.md`
6. `docs/operations/AGENT_OFFICE_OPERATIONS_RECOVERY.md`
7. `docs/operations/LOCAL_BOOTSTRAP_PRIVATE_RUN_PREPARATION.md`
8. `docs/security/AGENT_OFFICE_SECURITY_AUTHORITY_MODEL.md`
9. `docs/ui/AGENT_OFFICE_UI_ANIMATION_MAPPING.md`

Commit size: 651 insertions and 184 deletions.

No dependency, lockfile, committed deployment default, database, migration,
fixture manifest, real credential, Fable5/Advisor artifact, target main/protected
branch, or unrelated file was changed.

## 4. Verification Evidence

### 4.1 Focused security/config/composition tests

Final focused runs passed, including:

- provider, HTTP, private config and production composition: 33/33;
- provider, HTTP and production composition after authority/origin hardening:
  26/26;
- actual-canonical production composition alone: 13/13; and
- superseded acceptance/canonical-manifest observation assertions: 25/25.

Coverage includes entropy/verifier/single-use/expiry/restart/replay; owner/mode/
symlink/special/pre-existing/bounds; non-disclosure; config owner/modes; exact
loopback request controls; login/cookie/CSRF/capability/logout/rotation/expiry/
revocation/SSE; actual manifest/no fixture; and no delivery activation.

### 4.2 Complete non-browser gate

Final command: `npm run check`

- ESLint: pass.
- Strict TypeScript typecheck: pass.
- Full sequential Vitest suite: 55 files, 255/255 tests pass.
- Core TypeScript build: pass.
- Production dashboard build: pass.

### 4.3 Complete browser gate

Final command: `npm run test:e2e`

- explicit demo/PWA suite: 18/18 pass sequentially;
- composed LocalBootstrap suite: 3/3 pass sequentially;
- total: 21/21 pass;
- all three composed PNG paths changed, were directly inspected, and contain no
  unverified structured cue.

### 4.4 Runtime smoke, dependency and hygiene gates

- `npm run smoke:runtime`: pass using a disposable initialized state root and the
  committed default no-provider branch. Exact relevant result: bind
  `127.0.0.1`, shell/asset/status 200, `AUTH_BLOCKED`,
  `UNAVAILABLE_READ_ONLY`, mutation `DISABLED`, delivery
  `MANUAL_FALLBACK_REQUIRED`, protected projection
  `503 AUTH_PROVIDER_UNAVAILABLE`, `listenerRebind=true`,
  `writerLockReleased=true`, explicit manifest source, no fixture fallback.
- `npm run audit:dependencies`: pass, zero vulnerabilities.
- `git diff --check`: pass before both target commits and after final gates.
- Credential-pattern scan: no private key, certificate, cloud key, GitHub token,
  or API-key pattern. The only exact 43-character literals are the named `A` and
  `B` synthetic test proofs; one non-secret build ID also matches that character
  shape.
- Post-run listener/process check: no listener is bound to port 4317 and no
  composed E2E or compiled runtime CLI process remains.
- Target repository after push: clean, HEAD equals upstream, left/right `0 0`.

### 4.5 Development-time failed diagnostics and closure

All failures were closed before commit:

1. Early lint found optional-chain and browser-Storage spread rules; the exact
   code was corrected, then lint/typecheck passed.
2. Initial focused tests exposed a circular provider-inspection assertion, Node
   fetch normalization of a Fetch Metadata header, and stale manifest-version
   input. The test inspection became non-serializing, normalized-header behavior
   moved to the direct network-policy assertion, and manifest version was aligned
   with the actual canonical version 2. Focused reruns passed.
3. The first complete check after implementation reported 9 stale assertions:
   the old Batch E acceptance gate forbade the now-authorized provider, and
   observation tests hard-coded canonical manifest v1/Fable5 active state. Only
   those superseded assertions were updated to LocalBootstrap and the actual v2
   Advisor work unit. The complete rerun passed 255/255.
4. An explicit all-snapshot rewrite showed a transient black normal-desktop frame
   when Playwright forced animations disabled. Direct normal/disabled captures
   reproduced the runtime behavior. The desktop expectation now allows
   animations only after proving zero motion/route cues; reduced motion remains a
   separate test. Stable full-scene baselines were regenerated, inspected, and
   the complete 21/21 browser run passed.
5. `jq` and `file` were unavailable for two read-only diagnostics; Node JSON
   parsing, `stat`, SHA-256, browser assertions and direct image inspection
   supplied the required evidence. No required gate was skipped.

## 5. Completion Criteria

| Criterion | Evidence | Status |
|---|---|---|
| Production LocalBootstrap behind existing port | `src/server/auth/local-bootstrap.ts`; provider/composition tests | Complete |
| High entropy, verifier-only, single use, expiry/restart/replay | Provider implementation and focused tests | Complete |
| Owner-only bounded no-follow delivery outside Git | File/dir/identity checks, hostile-output tests, root isolation | Complete |
| No credential disclosure | Cross-surface provider/HTTP/composition/browser scans | Complete |
| Exact trusted LocalBootstrap config | Deployment v2 plus owner/mode tests | Complete |
| Exact loopback exchange/session/logout controls | HTTP/session/SSE tests | Complete |
| Actual current canonical manifest, no fixture fallback | Production composition and coordinator tests | Complete |
| Port 4317 and SSH-forward-compatible shape | Config enforcement and non-secret runbook | Complete |
| Real Advisor delivery stays unavailable/manual | Capability/port rejection and message manual fallback | Complete |
| Responsive login/logout/PWA/accessibility | 21/21 browser tests and direct baseline inspection | Complete |
| Seven canonical docs, README and runbook | Commit `9c403da5662aeedc28a8c677c37a134aaa44dce3` | Complete |
| Real credential/private run prohibited in Worker pass | No real value created/accessed; no server left running | Complete |

## 6. Divergence, Limitations and Preserved Boundaries

### Divergence classification

- `CODE_DEFECT`: missing production provider/config/exchange/logout/composition/
  login and exact canonical authority were implemented at the code commit.
- `DOCUMENTATION_STALE`: future-provider/no-provider/manifest-v1/AO-WU-14 wording
  was corrected across all seven canonical documents and README.
- `DEFERRED_WITH_GATE`: real credential creation, actual port-4317 private run,
  any separately approved SSH-forward operation, and Advisor private-run evidence
  require Fable5 code/security `PASS` plus explicit Advisor authority.
- `DESIGN_DEFECT`: none encountered.
- `NEEDS_LEO_GPT_DECISION`: none newly introduced; this gate was explicitly
  approved. Final mission approval remains external.

### Known limitations and residual risks

- The real credential path and browser entry were not exercised with a real
  value; all evidence is synthetic until independent review authorizes AO-WU-14.
- Sessions and pending verifier state are process-local by design; restart revokes
  all sessions and never recovers a proof.
- A crash can leave an ambiguous owner-only proof file. Startup refuses to
  overwrite it; the reviewed runbook requires authorized local removal without
  display or reuse.
- Exact loopback HTTP intentionally uses a host-only HttpOnly/Strict cookie
  without `Secure`; this exception is never reusable for private-network mode.
- Browser/font/locale determinism is supported only under the configured local
  Playwright runtime; cross-host portability is not claimed.
- Default smoke validates the production no-provider branch and cleanup. The
  production LocalBootstrap branch is covered by disposable composition and
  browser tests, not a real process/credential run.
- LocalBootstrap grants no `advisor_operator`; durable messages remain manual and
  all real tmux delivery/capability authority remains disabled.

### Forbidden/excluded status

No DB, schema/migration, secret, real credential, environment secret, PII,
customer data, remote host, Tailscale/private/public exposure, proxy, TLS/HSTS
claim, production/live deployment, real tmux input/delivery, Hermes
implementation, arbitrary terminal execution surface, browser Worker/Reviewer
dispatch, target main/protected branch checkout/merge/push, force push,
self-review, risk acceptance, final approval, or automatic next mission was
accessed, added, or performed.

No agent, sub-agent, delegated context, new session, or temporary session was
created. Tests used only disposable loopback listeners/roots, deterministic
read-only adapters and synthetic credentials, and cleaned them. No STOP condition
requiring broader authority was encountered.

## 7. Push and Foundation-Docs Evidence

- Target implementation/test commit pushed non-force:
  `2623922877bd52dc7f5b6c6cd45fae755e5ff228`.
- Target canonical docs/runbook commit pushed non-force:
  `9c403da5662aeedc28a8c677c37a134aaa44dce3`.
- Target branch/upstream equality verified after fetch: left/right `0 0`.
- Foundation-docs starting HEAD/upstream:
  `8ff5569eb913554b890479aee219b6d9310e734a`, left/right `0 0`.
- Pre-existing unrelated foundation-docs modifications and untracked job
  directories were preserved and excluded from exact result/pointer staging.
- The result-only foundation-docs commit is identified in the separately
  committed pointer. Foundation-docs main changes are limited to the exact
  authorized result and pointer artifacts and are pushed non-force.

## 8. Review and Return Boundary

This result reports factual criterion satisfaction only. It does not issue an
independent security/review verdict or authorize the real private run.

RETURN_TO: `Advisor`

PROPOSED_NEXT_ACTOR: `Advisor`

Return through `11_WORKER_RESULT_POINTER.md` and stop.
