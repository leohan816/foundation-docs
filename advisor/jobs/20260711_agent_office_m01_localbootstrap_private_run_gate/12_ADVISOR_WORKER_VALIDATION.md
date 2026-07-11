# Advisor Worker Validation - Agent Office LocalBootstrap Gate

Status: `VALIDATED_READY_FOR_INDEPENDENT_DUAL_REVIEW`

This validation covers the Worker implementation and documentation only. It does
not approve a real credential, start a private run, enable Advisor delivery, or
close Agent Office M01.

## 1. Exact Reviewed State

- Target repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m01`
- Starting commit: `abff45c9925962be29be535685e3efbccd587528`
- Implementation commit:
  `2623922877bd52dc7f5b6c6cd45fae755e5ff228`
- Documentation/runbook commit:
  `9c403da5662aeedc28a8c677c37a134aaa44dce3`
- Local HEAD equals `origin/shadow/agent-office-m01` at `9c403da`.
- Target worktree is clean.
- Diff scope: 37 files, `+2591/-282`; implementation/tests/baselines in the
  first commit and README plus eight canonical/runbook files in the second.
- `git diff --check abff45c..9c403da` passed.

## 2. Direct Code Validation

Advisor directly inspected, among the complete changed set:

- `src/server/auth/local-bootstrap.ts`
- `src/server/auth/index.ts`
- `src/server/config.ts`
- `src/server/network/policy.ts`
- `src/server/http/server.ts`
- `src/runtime/composition.ts`
- `src/runtime/composition-core.ts`
- `src/ui/runtime/client.ts`
- `src/ui/runtime/runtime-app.tsx`
- LocalBootstrap provider, HTTP, composition, PWA, and visual tests
- all seven canonical Agent Office documents and the private-run runbook

Directly reproduced properties include:

- 32 random bytes and a 43-character base64url one-time proof;
- verifier-only retained provider state and fixed 15-minute proof/session bounds;
- exclusive no-follow `0600` proof-file creation in a canonical owner-only
  directory, exact inode/device verification, expiry/success/shutdown removal,
  and stale/symlink/special/insecure-path rejection;
- explicit v2 selector fixed to `127.0.0.1:4317`, exact Host/origin, no CORS,
  no proxy trust, no TLS/HSTS, and group/other-writable config rejection;
- exact Origin, loopback peer, Fetch Metadata, JSON/body, rate, session,
  capability, CSRF, logout, revocation, and SSE-close boundaries;
- no proof payload hash in security audit and no proof in URLs or response data;
- LocalBootstrap grants only `viewer` and `leo_input`;
- actual canonical foundation-docs M01 manifest/root/Git source is required;
- LocalBootstrap rejects a gateway capability or injected delivery port before
  bind, preserving `MANUAL_FALLBACK_REQUIRED`;
- static-only PWA cache rules and browser-storage non-disclosure tests;
- no production credential, config, state root, listener, or real tmux delivery
  was created by the Worker or Advisor validation.

## 3. Advisor Test Reproduction

The Advisor independently ran at `9c403da`:

1. Focused LocalBootstrap provider/HTTP/private-network/composition suite:
   `4 files / 34 tests PASS`.
2. `npm run check`:
   - ESLint PASS;
   - strict TypeScript PASS;
   - Vitest `55 files / 255 tests PASS`;
   - core build PASS;
   - dashboard production build PASS.
3. `npm run test:e2e`:
   - demo/PWA Chromium `18/18 PASS`;
   - composed LocalBootstrap Chromium `3/3 PASS`.
4. `npm audit --audit-level=high`: `0 vulnerabilities`.
5. Direct image inspection:
   - desktop 1440x900 PASS;
   - mobile 390x844 PASS;
   - reduced-motion 1440x900 PASS.

The screenshots visibly distinguish LocalBootstrap authentication/mutation from
`MANUAL_FALLBACK_REQUIRED`. Unknown/stale evidence remains visible and does not
produce invented work activity. No visual PASS is a real credential/private-run
claim.

## 4. Scope and Residual Gates

- Real credential: `NOT_CREATED`
- Real private run: `NOT_STARTED`
- Port 4317 after tests: no listener
- Advisor delivery: `INACTIVE_MANUAL_FALLBACK_REQUIRED`
- Public/Tailscale/remote/prod/DB/Hermes: unchanged and forbidden
- Agent Office runtime/source changed only by the reviewed Worker commits.
- Foundation-docs contains unrelated pre-existing dirty paths; none are part of
  this validation or the review launcher commit.

The UI retains a historical `READ ONLY` presentation phrase while separately
showing `LOCAL_BOOTSTRAP_ENABLED`; the independent reviewer must decide whether
this is accurate projection terminology, documentation/UI ambiguity, or a
defect. Advisor does not pre-classify it.

## 5. Validation Verdict

`READY_FOR_FABLE5_LEVEL3_DESIGN_AND_IMPLEMENTATION_SECURITY_REVIEW`

No real credential or private-run operation may begin until both independent
review verdicts are `PASS` and the Advisor revalidates their exact evidence.
