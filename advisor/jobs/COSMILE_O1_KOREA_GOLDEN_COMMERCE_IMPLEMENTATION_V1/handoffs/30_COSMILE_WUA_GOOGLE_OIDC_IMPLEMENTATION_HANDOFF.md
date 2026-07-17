# Cosmile Worker Handoff — WU-A Google OIDC Identity Seam

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-A
ACTOR: cosmile Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
ROLE: Cosmile repository-owner Worker
RETURN_TO: foundation-advisor
```

## Admission and exact base

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_BASE_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_AHEAD_BEHIND: 0/0
EXPECTED_WORKTREE: CLEAN
WU0_REVIEW_EVIDENCE_COMMIT: 3cb1a1d10195f830cbbca53f2523880b12a4e3f0
WU0_REVIEW_RESULT_BLOB: 7391b5f3444923bccf7d2ce3a709d17726462634
WU0_REVIEW_RESULT_SHA256: 6a22d72b6cf2744fb37a4a58c65301f9390d663b493bb46fa34fa562b5c48519
WU0_REVIEW_VERDICT: PASS
```

Before editing, verify every pin, current Agent Office Worker authority, repository rules,
`app/CLAUDE.md`, security/env/testing policies, live actor/session/model/max-effort/CWD/skill,
synchronization OFF, and zero conflicting work. Stop on mismatch. Preserve the reviewed WU-0
commit and all pre-existing behavior outside this handoff.

## Founder-frozen scope

- Google OIDC is the only first-rehearsal customer identity provider.
- Preserve a provider-neutral OIDC/domain boundary so a later approved provider can replace the
  adapter without changing commerce ownership.
- Kakao, Apple, additional identity providers, and guest checkout are deferred.
- Existing guest browse/cart/wishlist ownership may remain for pre-login continuity; an
  unauthenticated guest must not be treated as an authenticated checkout customer.
- No real customer PII, real account, provider console action, credential, token, network call,
  production activation, or public exposure is authorized.
- Use only approved isolated synthetic identities in tests.
- Do not request or accept secret values in chat or evidence.

## Exact allowed product paths

```text
app/.env.example
app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md
app/docs/FEATURE_INDEX.md
app/src/lib/auth/contracts.ts
app/src/lib/auth/googleOidc.ts
app/src/lib/auth/repository.ts
app/src/lib/auth/session.ts
app/src/lib/shopper.ts
app/src/lib/mergeGuest.ts
app/src/lib/slice/flags.ts
app/src/app/api/auth/google/start/route.ts
app/src/app/api/auth/google/callback/route.ts
app/src/app/api/auth/logout/route.ts
app/src/app/api/auth/mock-login/route.ts
app/src/app/api/auth/mock-logout/route.ts
app/src/app/api/events/route.ts
app/src/components/AuthToggle.tsx
app/src/app/account/page.tsx
app/scripts/o1_google_oidc_contract.vitest.ts
```

No other path may change. If a necessary path is missing, return the exact necessity to the
Advisor before editing it. Do not add or install a dependency, touch lockfiles, generate Prisma
artifacts, change WU-0 schema/migration, or use a real network/provider/database.

## Required implementation

Implement the smallest bounded Google-first identity replacement behind the existing `Owner` and
`getShopper` seam:

1. **Provider-neutral contracts.** Define a verified OIDC principal using immutable `(issuer,
   subject)` and no email/name identity key. Define closed error categories and injected ports for
   discovery/JWKS/token exchange, persistence, clock, randomness, and hashing where needed for
   deterministic tests.
2. **Google adapter.** Pin official Google issuer/endpoints; generate authorization requests with
   state, nonce, and PKCE S256; exchange an authorization code server-side; cryptographically
   verify an RS256 ID token with the selected `kid`; validate algorithm, signature, issuer,
   audience, expiry/not-before/issued-at bounds, nonce, and authorized-party semantics. Reject
   unknown algorithms/keys/claims fail closed. Never trust client claims, email, name, callback
   query identity, or an access token as identity truth.
3. **Session boundary.** Use a high-entropy opaque cookie token and persist only its SHA-256 digest
   in the WU-0 `CustomerSession` table. Resolve only active, unexpired, unrevoked sessions and active
   customers. Cookie is HttpOnly, SameSite=Lax, scoped, bounded-expiry, and Secure when applicable.
   Raw tokens, authorization codes, ID/access tokens, subjects, and cookies must never be logged or
   emitted in evidence.
4. **Identity persistence.** Idempotently bind one `(issuer,subject)` to one `CustomerAccount`,
   refusing collisions or state ambiguity. Use the existing Prisma boundary without requiring a
   generated WU-0 client at test time; persistence must remain transactionally coherent. No PII
   profile storage is authorized.
5. **Routes and flow.** Add start/callback/logout route handlers. All routes are non-production and
   default OFF via one server-side O1 Google flag. Missing config, disabled flag, invalid state/
   nonce/PKCE/token/signature/claims, persistence failure, or provider failure returns a bounded
   category and creates no authenticated session. Do not leak provider/error payloads.
6. **Existing seam correction.** When the O1 Google flag is ON, `getShopper` derives authenticated
   ownership only from the verified session; no session means guest/unauthenticated, never
   `MOCK_USER`. Guest cart/wishlist merges into the exact verified internal customer after login,
   then consumes the guest id. The event route derives owner from `getShopper`, not
   `getMockCurrentUser`.
7. **Legacy containment.** Preserve current mock behavior only when the O1 Google flag is OFF. When
   the flag is ON, the existing mock-login/mock-logout routes must fail closed and the account UI
   must use Google start/logout only. Do not configure or implement any second provider.
8. **Configuration.** Add key names and safe descriptions only to `.env.example`: enable flag,
   Google client ID/client secret, redirect URI, and bounded session lifetime if needed. No values,
   placeholders resembling secrets, production defaults, or public client-secret exposure.
9. **Documentation.** Update the existing implementation design and feature index for WU-A,
   explicitly stating default OFF, credential-gated runtime evidence, Google-only first rehearsal,
   provider-neutral seam, no real PII, and no production claim.

Use built-in platform cryptography and existing dependencies only. Do not hand-roll a permissive
JWT parser: signature verification and every required claim check must be explicit, bounded, and
fail closed.

## Required tests and evidence

Add focused Vitest contract tests with synthetic keys, identities, cookies, time, persistence, and
injected provider responses only. At minimum prove:

- PKCE/state/nonce generation and one-time state consumption;
- valid synthetic Google-shaped RS256 token acceptance;
- algorithm confusion, bad signature, unknown key, issuer, audience, azp, nonce, expired,
  not-yet-valid, stale/future-issued token rejection;
- missing/disabled configuration rejects before network or persistence;
- no token/code/subject/PII appears in public errors or audit evidence;
- idempotent `(issuer,subject)` binding and collision/default-deny behavior;
- raw session token is never persisted and invalid/expired/revoked/suspended sessions reject;
- flag OFF preserves current mock owner behavior; flag ON with no verified session never yields
  `MOCK_USER`; mock auth routes are unavailable while Google mode is ON;
- guest merge targets only the verified internal customer and cannot be selected by client input;
- duplicate callback/session issuance is bounded and does not create duplicate identity effects.

Use `/home/leo/Project/Cosmile/app/node_modules` only as the already-present dependency source; do
not install or update dependencies. Run exact focused tests and safe relevant auth/shopper/cart/
wishlist/event regressions that exist. Build/lint may run only after pre-inspecting scripts and
expected write paths; remove only attributable `.next`/cache artifacts and prove pre/post tracked
state is unchanged except the exact allowlist. If a safe gate cannot run, report `NOT_RUN` with the
exact reason.

Credential-dependent Google console/runtime evidence is expected to remain BLOCKED. Return one
minimal Leo checklist containing only user-owned actions and environment-variable names; never
request values or manufacture runtime PASS.

## Commit and result discipline

- Create one intentional WU-A candidate commit on the exact mission branch; no amend, rebase,
  squash, force-push, history rewrite, or push before independent review.
- Record exact base/candidate/diff, allowed-vs-actual paths, tests, skips, cleanup, credential-gated
  limits, no-secret/no-PII evidence, and residual unknowns.
- Do not start WU-B/C/D/E/F/G, dispatch Reviewer, or infer PASS.

Write only these foundation-docs evidence files, leaving them uncommitted for Advisor publication:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/30_COSMILE_WUA_GOOGLE_OIDC_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/30_COSMILE_WUA_GOOGLE_OIDC_POINTER.md`

Return the pointer to `foundation-advisor` and STOP.
