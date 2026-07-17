# 30 — Cosmile WU-A Result (Google OIDC customer-identity seam)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-A
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session as WU-0, dispatcher-confirmed; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (loaded before product work; anchor / mapping-before-code / test-before-code / declare-don't-deviate / proven-vs-not-proven)
HANDOFF:      advisor/jobs/.../handoffs/30_COSMILE_WUA_GOOGLE_OIDC_IMPLEMENTATION_HANDOFF.md @ 7b02b53ccd7672eed15e1924dd82ce3f888f7bfa (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one local candidate commit · focused 35/35 + suite 215/215 · READY_FOR_INDEPENDENT_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before product work (all first-hand, local-only — no network)

| Gate | Required | Observed | Result |
|---|---|---|---|
| Committed handoff | `30_…@7b02b53c` | foundation-docs HEAD == `7b02b53c`; handoff committed there ("authorize Cosmile WU-A Google OIDC seam"); working-tree == committed blob | ✅ |
| Repository / branch | exact worktree + `implementation/cosmile-o1-korea-golden-commerce-v1-20260717` | exact | ✅ |
| EXPECTED_BASE_HEAD | `c559e7c…` (reviewed WU-0) | `c559e7c…` | ✅ |
| EXPECTED_UPSTREAM / ahead-behind | `origin/…` at `0/0` | upstream present, `0/0`, HEAD==origin==`c559e7c` | ✅ |
| Worktree clean | CLEAN | clean pre-work | ✅ |
| WU-0 review evidence | commit `3cb1a1d`, blob `7391b5f3`, sha256 `6a22d72b…`, VERDICT PASS | all match exactly; "publish Cosmile WU-0 independent review PASS"; BLOCKING_FINDINGS 0 | ✅ |
| Sync OFF | — | no hook / no sync env; foundation-docs not committed by this session | ✅ |
| Model / Effort | Opus 4.8 (1M) / max | model verified; effort accepted PASS (same session as WU-0) — default `xhigh` not-introspectable | ✅ / ⚠️ recorded |

## 1. 구현 범위 (scope delivered)

The smallest bounded Google-first customer-identity replacement behind the existing `Owner`/`getShopper` seam,
using the WU-0 `CustomerAccount`/`AuthIdentity`/`CustomerSession` tables. **Additive, default OFF** via one
server-side flag; **provider-neutral** boundary; **credential-gated** — no real Google call, account, secret,
token, PII, or network is exercised. Kakao/Apple/second-provider/guest-checkout deferred (unchanged). Delivered
handoff items §1–§9 (contracts, adapter+verify, session, persistence, routes, seam correction, legacy
containment, config, docs).

## 2. 수정 파일 (candidate commit `70b8b155f447ca3dd19bfecf64506df7cdfef41b`, 19 files, +1141/-20)

**Pure core (unit-tested; node:crypto + injected ports only):** `src/lib/auth/contracts.ts` (principal, closed
error codes, ports), `src/lib/auth/googleOidc.ts` (pinned endpoints, PKCE S256, fail-closed RS256 verify,
constant-time state, + runtime fetch adapters never called by tests), `src/lib/auth/session.ts` (opaque token,
SHA-256 hash-only, resolve predicate, idempotent bind/collision, `ownerForGoogleMode`, `mockAuthAvailable`).
**Runtime edge:** `src/lib/auth/repository.ts` (Prisma `IdentityStore`/`SessionStore` on WU-0 tables),
`src/app/api/auth/google/start|callback/route.ts`, `src/app/api/auth/logout/route.ts`. **Seam corrections:**
`src/lib/shopper.ts` (flag-gated session resolution; dynamic Prisma import; never MOCK_USER when ON),
`src/lib/mergeGuest.ts` (`targetUserId` = server-verified customer), `src/lib/slice/flags.ts`
(`o1GoogleAuthEnabled`), `src/app/api/events/route.ts` (owner via `getShopper`),
`src/app/api/auth/mock-login|mock-logout/route.ts` (fail-closed when Google ON). **UI:**
`src/components/AuthToggle.tsx`, `src/app/account/page.tsx` (no real name/PII when ON). **Config/docs:**
`app/.env.example` (key names only, empty), `app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md`
(§A + mapping), `app/docs/FEATURE_INDEX.md`. **Test:** `scripts/o1_google_oidc_contract.vitest.ts`.

## 3. 수정하지 않은 파일 (diff-scope declaration)

Staged set = **exactly the 19 allowed paths** (`git diff --cached --name-only | wc -l = 6`… = **19**; nothing
else modified/untracked). No dependency, lockfile, `node_modules`, Prisma schema/migration/artifact, `.next`, or
any non-allowlist file changed. WU-0 schema is untouched.

## 4. 계약 매핑 (contract-to-code mapping)

Full table in `app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md §A7` — every handoff
requirement (§1–§9) has a code landing + a named test case (or a declared structural/runtime placement). No
blank rows.

## 5. 계약 이탈 / placement declarations (no silent deviation)

None changes a contract value/owner/invariant (design §A8):
1. **Route orchestration + Prisma repository are not unit-tested here** (import `next/*`/`@prisma/client`,
   unavailable in the worktree); they are thin and delegate to the tested pure core; runtime evidence is
   **credential-gated BLOCKED**.
2. **Guest-merge no-client-input** is structural (callback passes the verified `customerId`; no request-derived
   target path).
3. **Token exchange + JWKS fetch** are injected ports; the concrete `fetch` runs only at credential-gated runtime.
4. `getShopper` flag-ON DB wiring is runtime-only; the pure decisions (`ownerForGoogleMode`, `resolveSession`)
   are tested.
5. **events-route attribution delta**: guest events now attribute to `anonymousId` (was always the mock user);
   the flag-OFF logged-in default still attributes to `MOCK_USER` — the handoff-required `getShopper` derivation.

## 6. 테스트 결과 (labeled per TEST_MEANING_POLICY)

- **pure (provider-independent):** `scripts/o1_google_oidc_contract.vitest.ts` = **35 passed / 0 failed**.
  Reproduce: `cd app && <orig>/node_modules/.bin/vitest run scripts/o1_google_oidc_contract.vitest.ts`. Every
  crypto/claim check is a **bidirectional oracle** (accept the valid synthetic RS256 token; reject each of
  alg-none, HS256, tampered-sig, unknown-kid, wrong-key, iss, aud, azp, nonce, expired, nbf-future, iat-future,
  iat-stale, malformed, missing-sub); plus PKCE S256 / one-time constant-time state, config_missing pre-network,
  session hash-only + expired/revoked/suspended/unknown rejection, idempotent bind + collision default-deny,
  flag default-OFF, and `ownerForGoogleMode` never yielding `demo_user_001`.
- **regression (existing vitest suite):** full `vitest run` = **215 passed / 0 failed** (11 files: my 35 + 180
  pre-existing). The seam changes (shopper/events/mergeGuest) caused **no** regression.
- **db-touch / integration:** none authored (WU-A adds no schema; runtime DB path is credential-gated).
- **build / lint / tsc:** **NOT_RUN** — the worktree has no `node_modules`; a full typecheck/build would require
  regenerating the Prisma client for the WU-0 models (`prisma generate` is forbidden by the handoff) and
  `next build` would emit a non-gitignored `.next`. Vitest runs against the original repo's already-present
  `node_modules` and transpiles (esbuild) the exercised pure modules, which pass at runtime.
- **test-diff oracle changes:** none (no existing test/expectation/fixture weakened, skipped, or changed; one
  new test file added). One **code** fix arose from a test: the `alg=none` token (empty signature) was fixed to
  be rejected at the **algorithm gate** (`alg_unsupported`) rather than as `token_malformed`, strengthening
  algorithm-confusion defense — the test's expectation was the correct security contract.

## 7. 무엇을 증명했는가 (proven)

The Google ID-token verifier is **fail-closed across the full attack matrix** and yields only `(issuer,subject)`;
**PKCE S256 + one-time constant-time state**; the session persists **only a SHA-256 digest** and resolves only
active/unexpired/unrevoked sessions for active customers; `(issuer,subject)` binding is **idempotent** with
**collision default-deny**; the flag is **default OFF**; the Google-mode owner derivation **never yields
`MOCK_USER`**; mock routes are gated to flag-OFF; config is rejected **before any network/persistence**; and no
subject/token/PII appears in error values. The full pre-existing suite still passes (no regression).

## 8. 무엇을 증명하지 않았는가 (NOT proven — credential-gated / runtime)

- **Live Google flow, token exchange, JWKS fetch, real capture of a real Google account** — BLOCKED (no
  credentials/network by design). The concrete fetch adapters and Prisma repository run only at credential-gated
  runtime; their end-to-end behavior is unproven here.
- **Route HTTP behavior, cookie emission on redirect, DB transactional bind under real concurrency** — runtime;
  covered structurally by the tested pure logic + the WU-0 `AuthIdentity @@unique(issuer,subject)` backstop.
- **tsc/build/lint** did not run (§6).
- `getShopper` flag-ON DB resolution requires the WU-0-inclusive generated Prisma client (a deploy step).

## 9. 남은 risk

- Runtime auth is inert until Leo supplies credentials + enables the flag + regenerates the Prisma client
  (WU-0 models). Until then routes fail closed (`flag_disabled`/`config_missing`).
- The concrete `createGoogleTokenExchangePort`/`createGoogleJwksPort` and the route orchestration are the
  primary un-unit-tested surface; a runtime integration pass (credential-gated) is the natural next evidence.

## 10. 다음 검수 질문 (for the independent Reviewer — attack surface)

1. Does `verifyIdToken` reject **every** algorithm-confusion / claim-tamper variant, and does the alg gate fire
   before any signature use (alg=none with empty sig ⇒ `alg_unsupported`)?
2. Is the raw session token **never** persisted or logged (only its SHA-256 hex), and does `resolveSession`
   reject expired/revoked/suspended/unknown in pure code?
3. Is `(issuer,subject)` binding idempotent and collision-default-deny, and does the concrete repo's
   unique-violation re-read preserve idempotency under the WU-0 `@@unique` backstop?
4. When the flag is ON, can any path yield `MOCK_USER` (getShopper / events / merge)? Are mock routes truly
   fail-closed? (Expect: no MOCK_USER; mock routes 404.)
5. Is the guest-merge target strictly the server-verified `customerId` with no client-input path?
6. Do routes leak any provider/error payload, token, code, or subject in responses/logs? (Expect: closed codes
   only.) Is `.env.example` values-free and is there any secret/PII anywhere in the diff? (Expect: none.)
7. Is the diff strictly additive/flag-gated so flag-OFF behavior is byte-for-byte the prior mock path?

## 11. rollback

Revert the single local candidate commit `70b8b155f447ca3dd19bfecf64506df7cdfef41b` (19 files return to base
`c559e7c…`). No DB/runtime state was created; nothing was pushed.

## 12. Runtime-safety / evidence record (handoff-required)

```text
PRE_GIT:  branch implementation/cosmile-o1-korea-golden-commerce-v1-20260717 @ c559e7cd132e... (clean; upstream 0/0)
POST_GIT: same branch @ 70b8b155f447ca3dd19bfecf64506df7cdfef41b (clean; +1 ahead / 0 behind; NOT pushed)
DIFF:     19 files, +1141 / -20  == exactly the handoff allowlist (verified name-for-name)
TESTS:    focused 35/35 (pure) · full vitest suite 215/215 (no regression) · build/lint/tsc NOT_RUN (reason §6)
DEP_SOURCE: original repo /home/leo/Project/Cosmile/app/node_modules via a gitignored symlink for the vitest run only; symlink REMOVED after; no install/update, no lockfile touch, no prisma generate
CLEANUP:  node_modules symlink removed (absent) · no .next created · no stray artifact · tracked state == allowlist only
SECRETS/PII: none — .env.example keys empty; 0 real Google/private-key signatures; only synthetic test dummies (client-123.apps.googleusercontent.com, unused-in-verify); no email/phone PII
NETWORK/PROVIDER/REAL_DB/SECRET/PII: NONE exercised (credential-gated; flag OFF)
```

```text
PRODUCT_CODE_CHANGED: YES (additive, default-OFF, credential-gated identity seam)
DEPENDENCY/LOCKFILE/PRISMA_ARTIFACT/WU0_SCHEMA_CHANGED: NO
IMPLEMENTATION_PUSHED: NO
FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/NETWORK/PROVIDER/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```

## 13. Minimal Leo credential checklist (user-owned actions + env-var NAMES only — never values)

Runtime Google evidence remains **BLOCKED** until Leo (owner actions only):
1. Create/confirm a Google Cloud **OAuth 2.0 Web** client (non-production) → obtains a client id + client secret.
2. Register the authorized redirect URI equal to `COSMILE_GOOGLE_REDIRECT_URI` (the callback route).
3. Provide, via the deploy env (never in chat/logs/evidence), values for the **names**:
   `COSMILE_O1_GOOGLE_AUTH_ENABLED` (=`true`, non-production), `COSMILE_GOOGLE_CLIENT_ID`,
   `COSMILE_GOOGLE_CLIENT_SECRET`, `COSMILE_GOOGLE_REDIRECT_URI`, and optionally `COSMILE_SESSION_TTL_SECONDS`.
4. Regenerate the Prisma client against the WU-0-inclusive schema (deploy step) so `repository.ts` resolves the
   `CustomerAccount`/`AuthIdentity`/`CustomerSession` models.
5. Never paste secret values anywhere; evidence stays boolean/count/status/category only.
