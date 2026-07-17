# 30 — Cosmile WU-A Pointer

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1 · WU-A
ACTOR: cosmile (Cosmile repository-owner Worker) · RETURN_TO: foundation-advisor
HANDOFF: 30_COSMILE_WUA_GOOGLE_OIDC_IMPLEMENTATION_HANDOFF.md @ 7b02b53ccd7672eed15e1924dd82ce3f888f7bfa (committed; working-tree == committed, verified)
BASE: reviewed WU-0 c559e7cd132e7b837dc38d01395f790499abb70d (independent review PASS, 0 blocking)
STATUS: COMPLETE — one local candidate commit · 35/35 focused + 215/215 suite · READY_FOR_INDEPENDENT_REVIEW
```

## RESULT SUMMARY

Smallest bounded **Google-first customer-identity seam** behind the existing `Owner`/`getShopper`, on the WU-0
`CustomerAccount`/`AuthIdentity`/`CustomerSession` tables. **Additive, default OFF** via one server-side flag
(`COSMILE_O1_GOOGLE_AUTH_ENABLED`, non-production, production forced OFF), **provider-neutral**, **credential-
gated** (no real Google/network/secret/token/PII). Pure unit-tested core (`node:crypto` + injected ports):
`(issuer,subject)` principal · PKCE S256 · **fail-closed RS256 ID-token verification** (alg-none/HS256/tamper/
kid/iss/aud/azp/nonce/exp/nbf/iat all rejected) · constant-time one-time state · opaque session with **SHA-256
hash-only** persistence + active/unexpired/unrevoked/active-customer resolve · **idempotent (issuer,subject)
bind + collision default-deny** · `getShopper` ON ⇒ verified-session-only (**never `MOCK_USER`**) · mock routes
fail-closed when ON · guest-merge to the server-verified customer. Runtime edge (Prisma repo + routes + UI)
delegates to the tested core. Focused test **35/35**; full vitest suite **215/215** (no regression). Diff =
**exactly the 19 allowlist paths** (+1141/−20), no dep/lockfile/Prisma-artifact/WU-0-schema change. Alg-gate
hardening was a code fix driven by the test (algorithm-confusion caught at the alg gate). No secrets/PII in the
diff (`.env.example` keys empty; only synthetic test dummies).

## NEXT ACTION ROUTING

- **Advisor**: dispatch the independent Reviewer against the declared delta (candidate
  `70b8b155f447ca3dd19bfecf64506df7cdfef41b`, 19 files); attack surface = `30_…RESULT.md §10`.
- **Advisor** publishes the foundation-docs evidence (this Worker left it uncommitted).
- **Leo credential checklist** (owner actions + env-var NAMES only) in `30_…RESULT.md §13` — runtime Google
  evidence remains BLOCKED until credentials + flag + WU-0-inclusive Prisma client are provided.
- No push, no Reviewer dispatch, no WU-B/C/D/E/F/G until review passes.

## POINTER BLOCK

```text
PRODUCT_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
BASE_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
CANDIDATE_COMMIT: 70b8b155f447ca3dd19bfecf64506df7cdfef41b (+1141/-20, 19 files, local only, 1 ahead / 0 behind, NOT pushed)
EVIDENCE (foundation-docs, uncommitted — Advisor publishes):
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/30_COSMILE_WUA_GOOGLE_OIDC_RESULT.md
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/30_COSMILE_WUA_GOOGLE_OIDC_POINTER.md
FOCUSED_TEST: cd app && <orig>/node_modules/.bin/vitest run scripts/o1_google_oidc_contract.vitest.ts  (35/35)
BUILD_LINT_TSC: NOT_RUN (no worktree node_modules; forbidden prisma-generate for WU-0 models / non-ignored .next)
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/NETWORK/PROVIDER/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
