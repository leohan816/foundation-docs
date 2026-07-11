# Worker Brief - Implement LocalBootstrap Authentication Safely

## Actor and target

- Actor: existing Agent Office Worker only
- Model: Codex 5.6 Sol Ultra
- Repository: `../agent-office`
- Branch: `shadow/agent-office-m01`
- Base: `abff45c9925962be29be535685e3efbccd587528`
- Return: Advisor

## Exact task

Implement the reviewed LocalBootstrap design boundary so a later Advisor pass can
perform a genuinely authenticated loopback-only private run without committing,
logging, or transporting a credential through tmux/chat.

## Required behavior

### Provider and proof

- Implement a production `LocalBootstrapAuthenticationProvider` behind the
  existing `AuthenticationProvider` port.
- Generate a cryptographically strong, single-use proof using Node cryptographic
  APIs. Never accept caller-selected low-entropy proof material.
- Retain only a verifier in provider state; never retain the recoverable proof in
  application state after secure delivery.
- Deliver the initial proof only through an explicitly selected owner-only local
  file/channel outside Git. Use no stdout/stderr, URL, query, argv secret,
  environment value, log, trace, audit payload, browser storage, or source file.
- Credential output must be no-follow, regular, owner-controlled, bounded, and
  mode 0600 in an owner-only directory. Existing ambiguous/stale/symlink/insecure
  output must fail closed; do not overwrite it silently.
- Consume once. Failed/replayed proof, expiry, restart, and successful exchange
  must have explicit fail-closed behavior. Recovery must never resurrect a proof.

### HTTP and session lifecycle

- Add a narrowly scoped loopback LocalBootstrap exchange route and login UI.
- The proof must be submitted in a bounded JSON body over the loopback origin,
  never in a URL. Apply exact Origin/Host/Fetch Metadata/content-type/body/rate
  controls appropriate to an unauthenticated bootstrap route.
- On success, establish/rotate the existing server-side browser session and use
  an `HttpOnly`, `SameSite=Strict`, host-only loopback cookie.
- Add logout/revocation behavior that closes SSE and removes mutation access.
- Expiry and provider revocation must fail closed and clear the browser session.
- Do not store proof/session tokens in localStorage, IndexedDB, service worker,
  URL, or client logs.

### Trusted startup and config

- Extend trusted deployment/startup configuration with an exact
  `LOCAL_BOOTSTRAP` mode and mutation enablement. No request, feature flag, or
  environment variable may select it.
- All trusted config files controlling auth, roots, source registrations, and
  capabilities must reject group/other writable permissions.
- Startup selects LocalBootstrap only from an explicit absolute owner-controlled
  config path and a separate absolute owner-controlled proof-delivery path.
- Missing, invalid, insecure, or conflicting material must leave the service
  `AUTH_BLOCKED / READ_ONLY` or fail startup before binding; document which.
- Keep bind addresses loopback-only and Host/origin allowlists exact.

### Projection and private-run preparation

- Preserve the operational observation coordinator and require the actual latest
  canonical mission manifest source. No fixture fallback.
- Add a non-secret preparation/runbook path for Advisor to create runtime config,
  state, and proof-delivery locations outside Git after review.
- The future real run must use port 4317 and remain compatible with an SSH local
  forward using the same local and remote port.
- Keep `TmuxAdvisorGateway` delivery non-operational: no injected delivery port,
  no usable real capability, manual fallback visible, no tmux input.

### UI and PWA

- Add a restrained login/proof exchange state to the production runtime UI.
- Preserve Korean operational labels, mobile containment, reduced motion,
  accessibility, PWA caching exclusions, and fail-closed status visibility.
- The UI must distinguish login/authentication from Advisor delivery readiness.

## Tests required

- provider entropy/verifier/single-use/expiry/restart/replay tests;
- owner, mode 0600, symlink, special-file, pre-existing, bounded-output tests;
- proof non-disclosure canary scans across stdout/stderr, audit, response, URL,
  static assets, service worker, state artifacts, and committed files;
- deployment/auth config owner and mode tests including 0400/0600 acceptance and
  representative group/other writable rejection;
- exact loopback Host/Origin/Fetch Metadata/content-type/rate/body controls;
- login, cookie, CSRF, capability, logout, rotation, expiry, revocation, SSE close;
- production composition with LocalBootstrap selected only by trusted config;
- missing/invalid config remains `AUTH_BLOCKED / READ_ONLY` or startup-failed as
  specified;
- real delivery remains unavailable/manual and no delivery port is called;
- actual-manifest projection with no fixture fallback;
- desktop, mobile, reduced-motion, PWA/offline/update/recovery browser tests;
- full lint, strict typecheck, unit/integration/security/recovery/e2e/build/audit,
  `git diff --check`, and secret-pattern scan.

Run build and browser suites serially or use isolated output directories. Do not
repeat the known overlapping-build harness collision.

## Canonical documentation

Update the seven Agent Office canonical documents and `README.md` to exact
as-built truth. Classify every gap as code defect, design defect,
documentation stale, deferred with gate, or needs Leo/GPT decision. Do not
rewrite design to excuse a defect.

## Real credential prohibition in Worker pass

This Worker pass must not create the real AO-WU-14 credential or leave a server
running. Tests may use isolated synthetic canaries only and must clean them. The
actual credential/private run occurs only after Fable5 code/security `PASS`.

## Git and evidence

- Commit/push only to `shadow/agent-office-m01`, non-force.
- Write result to
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_localbootstrap_private_run_gate/WORKER_RESULT.md`.
- Write pointer to
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/11_WORKER_RESULT_POINTER.md`.
- Commit/push only those exact result artifacts to foundation-docs after target
  commits are pushed.
- Terminal summary and pointer block must be ASCII-only; never include proof,
  cookie, CSRF, session, host credential, or environment value.

## STOP conditions

Stop for any need to expose publicly, use Tailscale/remote hosts, access a DB,
activate real tmux delivery, add arbitrary terminal execution, inspect unrelated
secrets, modify main/protected branches, weaken reviewed boundaries, or make a
new product/security authority decision.
