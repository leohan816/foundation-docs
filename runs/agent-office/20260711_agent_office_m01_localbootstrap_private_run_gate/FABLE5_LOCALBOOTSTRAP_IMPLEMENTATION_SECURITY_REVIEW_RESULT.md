# FABLE5 LOCALBOOTSTRAP IMPLEMENTATION/SECURITY REVIEW — Agent Office M01 Private-Run Gate

- Actor: **Fable5 Reviewer** (`reviewer-fable5`) · Pass: `IMPLEMENTATION_SECURITY_REVIEW__AGENT_OFFICE_LOCALBOOTSTRAP` · Level 3 · Skill: `/fable-sentinel` · Date: 2026-07-11
- Delta verified from git directly: `abff45c -> 2623922 (feat: add LocalBootstrap private-run gate) -> 9c403da (docs) = HEAD = origin/shadow/agent-office-m01` (37 files, +2591/-282). Worktree note: the single untracked item `test-results-composed/` is an artifact of THIS reviewer's own Playwright run earlier today, not Worker dirt.
- **VERDICT: `PASS`** — activates nothing; no real credential exists after review.

## Verification
- **Full Vitest suite re-run by this reviewer at 9c403da: passed, exit 0** (Advisor-reported aggregate 55 files/255 incl. the new `tests/security/local-bootstrap-provider.test.ts` 229-line suite and `local-bootstrap-http.test.ts`).
- **Provider core (direct source):** `src/server/auth/local-bootstrap.ts:84-87` single-use proof = `randomBytes(LOCAL_BOOTSTRAP_PROOF_BYTES)` (base64url) with fresh 32-byte salt; only the salted `sha256` verifier is retained; comparison via `timingSafeEqual` (`:128`); session/rotation tokens `randomBytes(32)` (`:307`); expiry/single-use/replay/restart/removal covered by the security suite in my passing run.
- **No credential leakage:** greps over `src/server/auth` show no console/stdout writes of the proof; no proof in audit/URL/query paths; no credential/proof committed anywhere in the diff; screenshots show no secret (direct inspection below); env/browser-storage/PWA-cache exclusions covered by existing Batch E suites re-run green.
- **Trusted config:** owner-only/no-follow/regular/bounded/mode-bit rejection reuses the reviewed `operational-config` machinery (`(mode & 0o022) != 0` rejection) — suites green in my run.
- **HTTP boundaries:** loopback/Host/Origin/Fetch-Metadata/CSRF/rate/body suites re-run green; secure cookie/rotation/expiry/logout/revocation/SSE-close covered by the LB HTTP suite; Logout control now visible in the authenticated UI (screenshot).
- **Composition:** canonical manifest projection with no fixture fallback (unchanged from round-2, re-confirmed); fail-closed startup precedes proof creation/listener bind per suite; **no usable Advisor delivery in LB mode** — `composition.ts:78,98,103` injects the typed `TmuxAdvisorGateway` but a delivery port/capability is supplied only when explicitly provided; absent them the UI correctly shows `MANUAL_FALLBACK_REQUIRED` (visible in the inspected baseline).
- **Screenshots:** desktop 1440x900 baseline **directly inspected** — chips `LOOPBACK_PRIVATE / LOCAL_BOOTSTRAP_ENABLED / LOCAL_BOOTSTRAP_AUTHENTICATED / MANUAL_FALLBACK_REQUIRED / ONLINE / SW: READY` + Logout; full 8-station scene; honest `EVIDENCE_UNKNOWN`/`UNKNOWN_OR_STALE`; no secret visible. Mobile and reduced-motion baselines: regenerated in the diff (size-delta verified) and directly inspected by me in the prior round; NOT re-opened this round — recorded as a review limitation, contents otherwise evidenced by the passing visual suites.
- **Git scope:** commit chain contains only the declared gate work + docs; HEAD=origin; no server left running; no credential/state root created by this review.

## Verdict rationale
Every mandated boundary is verified by my own run, direct source reads at exact lines, or direct screenshot inspection, with the two limitations disclosed (mobile/reduced-motion re-inspection; aggregate counts reported). No defect found; external gates (real private run execution, real delivery, transport activation) remain outside this PASS. Per V2: **PASS**.

Return to: **Advisor**.
