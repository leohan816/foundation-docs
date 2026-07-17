# Cosmile Worker Handoff — WU-A Correction Cycle 2

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-A-CORRECTION-2
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
OLD_CORRECTION_CANDIDATE: 2b8efdcc484d211a7cc6957c3d632a073afefbe4
EXPECTED_PARENT: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_UPSTREAM_BEHIND_AHEAD: 0/2
IMPLEMENTATION_PUSHED: NO

DELTA_REVIEW_COMMIT: aaf58ae9ad55c40a4da317f25c793021944fde2d
DELTA_REVIEW_BLOB: e2bfb55da4554d907a13456252aa3aeef27c5b0b
DELTA_REVIEW_SHA256: b1a7fbbdb4bb3a4104205d635a170de6aa1d974b28eb231fa2eb80e2b3cffa80
DELTA_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
CLOSED_FINDING: WUA-F1
PARTIAL_FINDING: WUA-F2
ONLY_REQUIRED_FINDING: WUA-F2b
```

Verify every pin and the same live actor/session/model/effort/workspace/skill before any edit. Stop
on mismatch. Preserve both reviewed candidate commits and add one correction commit; do not amend,
rebase, squash, reset, force-push, or rewrite reviewed history.

## Exact correction scope

Correct only `WUA-F2b` in the existing WU-A contract-test file. No product behavior or runtime code
change is authorized in this cycle. Do not correct residual observations R1–R7.

### WUA-F2b — prove the product timeout signal offline

Add bounded, deterministic offline tests which prove the already-implemented timeout rather than
simulating an unrelated network throw:

- the stubbed `fetch` must assert or record that it receives an actual `AbortSignal`;
- a hanging stubbed fetch must never resolve on its own and must reject only when that received
  signal fires;
- use Vitest fake timers to advance through the product's existing 10-second timeout (or an
  equivalently bounded deterministic method), proving the product timer and product signal end the
  hang;
- prove token exchange maps the resulting abort to the existing `provider_unavailable` category;
- prove JWKS retrieval rejects fail-closed on the same product-driven abort;
- include an adjacent fast-success test which receives the same signal and completes before timeout;
- restore timers and `globalThis.fetch` after each test so no suite contamination remains;
- no real waiting, network, Google account, credential, token, PII, provider call, or new dependency.

The tests must fail if `signal: controller.signal` or the product timeout arming is removed. Keep all
existing 55 focused tests and the full safe suite passing without weakening any oracle.

## Exact allowed product path

Only this one path may change:

- `app/scripts/o1_google_oidc_contract.vitest.ts`

Do not modify `googleOidc.ts`, session/callback/config/docs, schema, migration, generated Prisma
client, dependency/lockfile, UI, WU-0, or any later WorkUnit. The cosmetic R7 comment is explicitly
not part of this correction.

## Verification and commit discipline

Use only the original repository's already-present dependencies through the same temporary
gitignored symlink if needed. No install, `prisma generate`, `.next`, external network, provider,
credential, real/shared DB, customer identity, PII, payment, production, or live access.

Run and record:

- the focused WU-A contract suite;
- the full safe Vitest suite;
- proof that the new hang tests are driven by the received product `AbortSignal` and fake time;
- timer/fetch restoration and no open-handle or suite-contamination evidence;
- pre/post Git state, the exact one-file delta, no-secret/no-PII evidence, and symlink cleanup.

Create one additive correction commit on top of `OLD_CORRECTION_CANDIDATE`. Do not push before the
same Reviewer returns delta PASS. Do not begin WU-B/C/D/E/F/G.

## Durable result and stop

Write only these foundation-docs artifacts for Advisor publication:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/34_COSMILE_WUA_CORRECTION_2_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/34_COSMILE_WUA_CORRECTION_2_POINTER.md`

The result must identify the new candidate HEAD, the exact
`2b8efdcc484d211a7cc6957c3d632a073afefbe4..<new-candidate>` delta, exact test counts, and retain
R1–R7 as non-blocking observations. Return to `foundation-advisor` and STOP.
