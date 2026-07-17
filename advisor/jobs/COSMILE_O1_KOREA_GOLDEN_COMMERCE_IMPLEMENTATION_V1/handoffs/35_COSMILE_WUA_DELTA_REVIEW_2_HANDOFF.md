# Independent Reviewer Handoff — Cosmile WU-A Delta Review 2

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: COSMILE-WUA-DELTA-REVIEW-2
REVIEW_PASS: IMPLEMENTATION_REVIEW_DELTA_ONLY
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Exact subject and pins

```text
PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_HEAD: 2b8efdcc484d211a7cc6957c3d632a073afefbe4
NEW_CANDIDATE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_PARENT: 2b8efdcc484d211a7cc6957c3d632a073afefbe4
DELTA: 2b8efdcc484d211a7cc6957c3d632a073afefbe4..e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_DELTA_PATH: app/scripts/o1_google_oidc_contract.vitest.ts
EXPECTED_DELTA_STAT: 1 file, +95/-1
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM_BEHIND_AHEAD: 0/3
IMPLEMENTATION_PUSHED: NO

PRIOR_DELTA_REVIEW_COMMIT: aaf58ae9ad55c40a4da317f25c793021944fde2d
PRIOR_DELTA_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
ONLY_OPEN_FINDING: WUA-F2b

CORRECTION_EVIDENCE_COMMIT: 29402bb8c48738f3a1994b9b4d6a284c37616322
CORRECTION_RESULT_BLOB: a29c7e1c793378f8d21f3095df27f1d72f1f947f
CORRECTION_RESULT_SHA256: df9e933a29e5ab7ecb15c3713e4b37d18c4c0cbd5173e4fe12a6eae0134c1082
```

Verify every pin before review. You must be the same independent Reviewer/session that issued the
prior WU-A review and delta review, with Fable 5, max effort, `/fable-sentinel`, exact product CWD,
synchronize-panes OFF, no overlapping review, and no implementation action.

## Review boundary

Review only the declared correction delta and its adjacent invariants. Do not re-open already
closed unrelated WU-A axes unless this delta regresses them.

Determine directly whether:

1. the delta is exactly one test file, additive on the pinned parent, with all product/runtime code
   byte-unchanged;
2. the hanging fetch stub receives an actual product `AbortSignal`, never settles independently,
   and rejects only when that received signal aborts;
3. fake time through the existing 10-second product bound changes the received signal from
   non-aborted to aborted and closes token exchange as `provider_unavailable`;
4. the same product-driven abort closes JWKS fail-closed;
5. the not-before-bound assertion and adjacent fast-success case prove the timer/signal boundary
   without introducing real waits, network, provider, credentials, tokens, PII, or dependencies;
6. timer and fetch restoration prevent cross-test/open-handle contamination;
7. deleting either the product signal wiring or product timeout arming would cause the new tests to
   fail, closing WUA-F2b rather than merely simulating a throw;
8. focused `59/59` and full safe suite `239/239` reproduce offline, with no oracle weakening or
   regression;
9. R1-R7 remain non-blocking and untouched, including the intentionally uncorrected cosmetic R7.

Use only already-present dependencies via the temporary gitignored symlink if needed; remove it
afterward. Do not install, build, generate Prisma, access DB/network/provider/credentials/PII, patch,
stage, commit, push, dispatch, or begin another WorkUnit.

## Verdict and outputs

Return one of:

- `PASS`
- `PASS_WITH_CORRECTIONS` with exact bounded finding(s)
- `HOLD`
- `FAIL`

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/35_COSMILE_WUA_DELTA_REVIEW_2.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/35_COSMILE_WUA_DELTA_REVIEW_2_POINTER.md`

Return to `foundation-advisor` and STOP. Do not push the candidate even on PASS.
