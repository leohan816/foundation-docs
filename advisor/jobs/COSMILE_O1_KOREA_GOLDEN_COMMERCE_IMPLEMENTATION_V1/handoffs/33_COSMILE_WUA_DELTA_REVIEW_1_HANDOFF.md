# Independent Reviewer Handoff — Cosmile WU-A Delta Review 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: COSMILE-WUA-DELTA-REVIEW-1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_DELTA_REVIEW
ACTOR: foundation-reviewer-fable5
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: same Independent Foundation Reviewer
RETURN_TO: foundation-advisor
```

## Same-Reviewer serialized gate

Use the same `foundation-reviewer-fable5` Reviewer identity that issued WUA-F1/WUA-F2. Immediately
before dispatch, live-verify session/pane, Fable 5, max effort, exact Cosmile worktree CWD,
`/fable-sentinel`, independence, synchronization OFF, idle/readiness, and no overlapping review.
Stop on any mismatch. Do not repeat the full WU-A review; review only the declared correction delta
plus the adjacent invariants necessary to rule out regression.

## Exact pinned delta

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_CANDIDATE: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
NEW_CANDIDATE_HEAD: 2b8efdcc484d211a7cc6957c3d632a073afefbe4
EXPECTED_PARENT: 70b8b155f447ca3dd19bfecf64506df7cdfef41b
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_AHEAD_BEHIND: 2/0
IMPLEMENTATION_PUSHED: NO

ORIGINAL_REVIEW_COMMIT: bf9358fdfdaee64b2babe6ad5f2981fc4f83852c
ORIGINAL_REVIEW_BLOB: 79b97758cd8e05c6428c216d11eaf6e5643b2b19
ORIGINAL_REVIEW_SHA256: a611b9e5e28ee0a24aa0d311423e49c9a3f548a5316f4b5fc5a65a172ec9f70f
ORIGINAL_VERDICT: PASS_WITH_CORRECTIONS
FINDINGS_UNDER_REVIEW: WUA-F1, WUA-F2

CORRECTION_EVIDENCE_COMMIT: b1ce10a341f180d3d106a9d8ab9c4a6ab67f0fc7
CORRECTION_RESULT_BLOB: 4d13282df613a5418dc6b45d675d29a6d630d0f7
CORRECTION_RESULT_SHA256: fa12c1086cb07599acfdacdf7bf0b0ea8be6e0c08d1050775a9b08f0958d52d9
```

Verify every Git and byte pin directly. Review only
`OLD_REVIEWED_CANDIDATE..NEW_CANDIDATE_HEAD` and confirm it contains exactly one additive correction
commit over the previously reviewed subject.

## Required delta determinations

### WUA-F1 closure

Verify that:

- `COSMILE_SESSION_TTL_SECONDS` is no longer inert;
- parsing is pure and accepts only positive integer semantics;
- absent/empty/non-integer/non-finite/zero/negative values use the existing 8-hour default;
- positive values clamp to `[60, 28_800]` and cannot extend past 8 hours;
- the callback resolves the TTL exactly once and passes that identical value to both persisted
  session expiry and cookie `maxAge`;
- `.env.example` remains values-empty and accurately describes the real behavior;
- positive plus adjacent-negative tests prove all bounds without weakening prior tests.

### WUA-F2 closure

Verify that:

- both concrete fetches use one explicit timeout no greater than 10 seconds;
- the timeout signal actually reaches both fetch calls and timer cleanup cannot disable the bound
  before body completion;
- response size is capped at no more than 256 KiB by numeric `content-length` pre-check and by a
  streaming/post-read byte count, including absent/lying/malformed headers;
- any stream cancellation or body-read failure remains closed and does not leak a provider error;
- token exchange validates top-level shape and a bounded non-empty `id_token`;
- JWKS validates a bounded non-empty keys array and required primitive JWK fields before the existing
  verifier consumes it;
- non-OK, fetch throw/abort, declared oversize, undeclared oversize, malformed JSON, invalid shape,
  and malformed JWK cases map only to the existing closed behavior, with no escaping provider body;
- offline stubbed-fetch tests prove the timeout signal/bounds rather than merely simulating an
  unrelated throw, and use no network, credential, Google account, provider, PII, DB, or install.

### Containment and regression

Verify exactly five changed paths and no change to R1–R6, schema/migration, Prisma artifacts,
dependency/lockfile, repository/shopper/merge/events/UI, WU-0, or later WUs. Independently reproduce
the 55/55 focused and 235/235 full safe suites with the same temporary gitignored dependency symlink,
then remove it and prove pre/post Git cleanliness. Do not run build/tsc, `prisma generate`, provider,
real/shared DB, network, credential, PII, payment, production, or live behavior.

## Verdict and routing

Return exactly one:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

`PASS` closes WUA-F1 and WUA-F2 for the authorized non-production claim ceiling. Any new required
correction must be a named finding inside the five correction paths and returns through Advisor to
the same Worker; do not patch. `HOLD`/`FAIL` must state the exact blocker. Residual observations R1–R6
remain non-blocking unless the delta itself regressed one of them.

## Output and stop

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/33_COSMILE_WUA_DELTA_REVIEW_1.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/33_COSMILE_WUA_DELTA_REVIEW_1_POINTER.md`

Do not patch, stage, commit, push, dispatch, request credentials, or begin WU-B/C/D/E/F/G. Return
to `foundation-advisor` and STOP.
