# Cosmile Worker Handoff — WU-A Correction Cycle 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-A-CORRECTION-1
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact starting state

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_CANDIDATE: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_AHEAD_BEHIND: 1/0
IMPLEMENTATION_PUSHED: NO

REVIEW_COMMIT: bf9358fdfdaee64b2babe6ad5f2981fc4f83852c
REVIEW_BLOB: 79b97758cd8e05c6428c216d11eaf6e5643b2b19
REVIEW_SHA256: a611b9e5e28ee0a24aa0d311423e49c9a3f548a5316f4b5fc5a65a172ec9f70f
REVIEW_VERDICT: PASS_WITH_CORRECTIONS
REQUIRED_FINDINGS: WUA-F1, WUA-F2
```

Verify every pin and the same live actor/session/model/effort/workspace/skill before any edit. Stop
on mismatch. Preserve the reviewed commit and add one correction commit; do not amend, rebase,
squash, reset, force-push, or rewrite reviewed history.

## Exact correction scope

Correct only the two independently reviewed findings. No residual observation R1–R6 is authorized
for correction in this cycle.

### WUA-F1 — make the documented session TTL real and bounded

The published `COSMILE_SESSION_TTL_SECONDS` key must not be inert. Implement the already-documented
option with one pure parser in `app/src/lib/auth/session.ts` and use the same resolved TTL for both:

- the persisted session expiry passed to `issueSession`; and
- the session cookie `maxAge` in the Google callback.

Required bounded behavior:

- absent or non-integer/non-finite input -> existing 8-hour default;
- positive integer input is bounded to a minimum of 60 seconds and a maximum of the existing
  8-hour default;
- zero or negative input -> existing 8-hour default;
- no value can extend a session beyond 8 hours;
- the resolved value must be applied identically to DB expiry and cookie lifetime.

Keep `.env.example` names-only and make its description match the actual min/max/default behavior.
Do not add another config key.

Required tests: configured positive value reflected in issue expiry and cookie options; absent and
invalid/negative values use the default; sub-minimum clamps to 60; oversized clamps to 8 hours;
the same resolved value is supplied to both callback call sites by direct code inspection.

### WUA-F2 — bound both concrete provider fetches

In `app/src/lib/auth/googleOidc.ts`, add an explicit, shared, deterministic provider request bound
for both JWKS retrieval and token exchange:

- explicit timeout/abort no greater than 10 seconds;
- a response-body byte cap no greater than 256 KiB, enforced before JSON parsing where possible and
  again after reading the body;
- numeric `content-length` above the cap rejects before body read; absent or malformed header must
  not bypass the post-read byte cap;
- malformed JSON, invalid top-level shape, oversized body, timeout/abort, and fetch failure map only
  to the existing closed categories; no provider body/error is returned or logged;
- token exchange success requires a non-empty string `id_token` with an explicit length bound;
- JWKS success requires a bounded `keys` array with strict required primitive fields sufficient for
  the existing verifier; malformed entries fail closed rather than reaching an unchecked cast;
- no external library or dependency change.

Tests must stub `globalThis.fetch` offline and prove, for both adapters where applicable:

- bounded valid success;
- non-OK response closed category;
- abort/timeout/fetch throw closed category;
- declared oversized response rejected without parsing;
- undeclared oversized body rejected after byte count;
- malformed JSON and invalid shape rejected with no throw escaping;
- no real network, Google account, credential, token, PII, or provider call.

## Exact allowed product paths

Only these five already-reviewed WU-A paths may change:

- `app/.env.example`
- `app/src/lib/auth/session.ts`
- `app/src/lib/auth/googleOidc.ts`
- `app/src/app/api/auth/google/callback/route.ts`
- `app/scripts/o1_google_oidc_contract.vitest.ts`

No other product path may change. In particular, do not modify schema, migration, generated Prisma
client, dependency/lockfile, auth repository, shopper/merge/events/UI, WU-0, or any later WorkUnit.

## Verification and commit discipline

Use only the original repository's already-present dependencies through the same temporary
gitignored symlink if needed. No install, `prisma generate`, `.next`, external network, provider,
credential, real/shared DB, customer identity, PII, payment, production, or live access.

Run and record:

- the focused WU-A contract suite;
- the full safe Vitest suite;
- pre/post Git state, exact delta paths, no-secret/no-PII evidence, and symlink cleanup.

Create one additive correction commit on top of `OLD_REVIEWED_CANDIDATE`. Do not push before the same
Reviewer returns delta PASS. Do not begin WU-B/C/D/E/F/G.

## Durable result and stop

Write only these foundation-docs artifacts for Advisor publication:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/32_COSMILE_WUA_CORRECTION_1_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/32_COSMILE_WUA_CORRECTION_1_POINTER.md`

The result must map WUA-F1 and WUA-F2 separately to exact code/tests, identify the new candidate
HEAD, declare the old-to-new delta, and preserve R1–R6 as non-blocking observations rather than
silently changing them. Return to `foundation-advisor` and STOP.
