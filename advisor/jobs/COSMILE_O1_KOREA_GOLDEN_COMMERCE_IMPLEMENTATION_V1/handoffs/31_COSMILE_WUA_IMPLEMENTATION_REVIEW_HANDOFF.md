# Independent Reviewer Handoff — Cosmile WU-A Candidate

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: COSMILE-WUA-FULL-REVIEW-1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_FULL_REVIEW
ACTOR: foundation-reviewer-fable5
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: Independent Foundation Reviewer
RETURN_TO: foundation-advisor
```

## Serialized runtime gate

Immediately before dispatch, verify and record the exact Reviewer session/pane, Fable 5, max
effort, exact Cosmile candidate worktree CWD, `/fable-sentinel`, current Reviewer role authority,
independence from the Worker/Advisor, synchronization OFF, idle/readiness, and no overlapping
review. Stop without reviewing on any mismatch. This is a new full review subject; do not reuse a
prior verdict or perform an overlapping review.

## Exact pinned subject

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
DECLARED_BASE: c559e7cd132e7b837dc38d01395f790499abb70d
CANDIDATE_HEAD: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_AHEAD_BEHIND: 1/0
IMPLEMENTATION_PUSHED: NO

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
EVIDENCE_COMMIT: 023c25988fe20aab1a4b0780f41280ae23fc3e91
RESULT_BLOB: 940f3834b774fca8bc2b086760370d3dfb5a0d7b
RESULT_SHA256: f26cc183d02f6f11b8803958c233192bb5562eb4e5a7344058d6e19684200dfa
POINTER_BLOB: 4ac6b85ade9e2639028db4743f3be9bf3d8ea1e7
POINTER_SHA256: da1824a467a54c6161e1d26010cd22419f928709cf3b2d29547297096ee17499
```

Verify every Git and byte pin directly. Review only `DECLARED_BASE..CANDIDATE_HEAD`, while reading
the pre-existing seam code needed to validate integration claims. Do not push the candidate.

## Authority and sources

Read the current Agent Office operating model, Reviewer role, run/result protocols, Cosmile root
and app rules, the committed implementation mission/job package, the committed WU-A handoff at
`7b02b53ccd7672eed15e1924dd82ce3f888f7bfa`, and the pinned independently reviewed O1 design.

WU-A authorizes only the Google-first, provider-neutral customer-identity seam on the reviewed WU-0
schema. It is default OFF, non-production, credential-gated, and must not activate Google, use real
PII, generate the Prisma client, modify schema/migrations/dependencies, start another provider, or
begin any later WU.

## Required full review

Directly inspect the complete 19-path candidate and independently rerun only safe, local evidence
needed to determine:

1. exact allowlist containment, clean ancestry, WU-0 base integrity, no schema/migration/lockfile/
   generated-client drift, no secret/PII/provider call, and no runtime activation;
2. provider-neutral contract quality and Google-only first-rehearsal containment;
3. authorization request correctness: pinned endpoints, OIDC scopes, PKCE S256, state, nonce,
   redirect binding, transaction-cookie lifetime and cookie attributes, and no open redirect;
4. ID-token parser/verifier correctness and fail-closed ordering for malformed JWT, `alg=none`,
   HS256/algorithm confusion, key selection, RS256 signature, issuer, audience/`azp`, nonce,
   `exp`, `nbf`, `iat`, subject, clock skew, and unknown/multiple-key cases;
5. JWKS/token-exchange runtime adapters: configuration-before-network, bounded input/output,
   timeout/failure behavior, status/content handling, no provider-payload leakage, and whether any
   unbounded fetch or response parsing violates the reviewed failure contract;
6. one-time state handling and replay resistance, including deletion/consumption timing on callback
   failure and constant-time comparison where applicable;
7. opaque session-token handling: randomness, hash-only persistence, cookie attributes, expiry,
   revocation, suspended-customer handling, and absence of raw token logging/evidence;
8. `(issuer, subject)` identity binding: idempotency, collision default-deny, transaction/race
   behavior against the WU-0 unique constraint, and whether the concrete Prisma repository preserves
   the pure contract rather than relying on an unsafe re-read or unchecked cast;
9. `getShopper`, events, mock routes, account UI, and guest merge: flag ON must never yield
   `MOCK_USER`; the merge target must be only the server-verified customer; client input must not
   select identity; flag OFF must preserve the pre-existing mock path;
10. callback/logout/start route behavior, error categories, response/log containment, session
    issuance order, partial-failure behavior, and whether a provider or persistence failure can leave
    an authenticated or incorrectly merged state;
11. production-forced-OFF and missing-config fail-closed behavior, env-example values empty, and no
    actual Google credential or account required by any test;
12. test quality: every security acceptance path has adjacent-negative coverage; no oracle,
    expectation, fixture, or existing regression was weakened; 35/35 focused and the full safe suite
    can be independently reproduced without install/network/provider/real DB;
13. honest claim ceiling: source plus provider-independent synthetic evidence only. Live Google,
    route HTTP, real Prisma runtime, concurrency, build/tsc, and credentialed E2E remain unproven
    unless independently demonstrated within authority.

The Reviewer may recreate the same temporary gitignored symlink to the original repository's
already-present `app/node_modules` solely to run Vitest, then must remove it and prove cleanup.
No dependency install, `prisma generate`, `.next`, external network, provider, credential, real/shared
DB, customer identity, PII, payment, production, or live access is allowed. Capture pre/post Git state.

## Verdict and correction routing

Return exactly one:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

For `PASS_WITH_CORRECTIONS`, assign bounded finding IDs, exact affected allowlist paths, the violated
invariant, and required positive plus adjacent-negative evidence. The same Cosmile Worker owns any
bounded correction; this same Reviewer later reviews only the declared old-candidate to new-candidate
delta. Do not patch, stage, commit, push, accept risk, select credentials, or expand scope.

`HOLD` or `FAIL` must identify the exact authority, security, scope, or feasibility blocker.

## Output and stop

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/31_COSMILE_WUA_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/31_COSMILE_WUA_IMPLEMENTATION_REVIEW_POINTER.md`

Do not alter product code, patch evidence, commit, push, dispatch, request credentials, or begin
WU-B/C/D/E/F/G. Return to `foundation-advisor` and STOP.
