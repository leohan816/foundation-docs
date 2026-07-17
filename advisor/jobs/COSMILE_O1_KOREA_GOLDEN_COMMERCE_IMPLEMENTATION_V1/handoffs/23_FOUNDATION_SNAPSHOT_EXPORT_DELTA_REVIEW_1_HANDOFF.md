# Independent Reviewer Handoff — Foundation Snapshot Export Delta Review 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: FOUNDATION-O1-SNAPSHOT-EXPORT-DELTA-REVIEW-1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_DELTA_REVIEW
ACTOR: foundation-reviewer-fable5
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: same Independent Foundation Reviewer that performed the full review
RETURN_TO: foundation-advisor
```

## Serialization, binding, and independence gate

This delta review must not overlap the Cosmile WU-0 review or any other Reviewer subject. The
Advisor may dispatch it only after the current WU-0 review has ended and the same Reviewer session
is idle. Immediately before dispatch, independently verify and record the exact actor/session,
pane, live model, max effort, exact Foundation worktree CWD, `/fable-sentinel` load, current
Reviewer role authority, synchronization OFF, idle/readiness, and independence from the Worker
and Advisor. Stop without reviewing if any binding fails.

## Exact pinned delta subject

```text
REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
OLD_REVIEWED_CANDIDATE: 99885ded9927de092d660fe09ef3418891bb1291
NEW_CANDIDATE: 73ff00361d9fa88ab57c17858210c1e080dfde1a
EXPECTED_NEW_PARENT: 99885ded9927de092d660fe09ef3418891bb1291
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: UNSET_BEFORE_REVIEW

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FULL_REVIEW_COMMIT: dcaad81ede70540e249cbba55ace891b89af02dd
FULL_REVIEW_RESULT_BLOB: c8d84ae3de4d63cae282636e6ba65ac1a830348f
FULL_REVIEW_RESULT_SHA256: 279b4efe6fdf6772e14238e0c21eb9fe1cc002951c272e5cf26a35226b6515ef
CORRECTION_EVIDENCE_COMMIT: 33292f98feec2aacb71b192937d4bd737c3a8f89
CORRECTION_RESULT_BLOB: 093fb2c7e471b3c4cfd8a9af34f3c04d91fce909
CORRECTION_RESULT_SHA256: 24320f1c358f7f55002ea16be9d4c98f6af8b7f5abaa2eccb217695d2b78f95d
CORRECTION_POINTER_BLOB: d795a4c18a2f63cbd9ceabfb0c7998b41d5ab39d
CORRECTION_POINTER_SHA256: 29541d6a7b7d5dc5e6fec48f9a8efae426b514f3c7721b8f5c76b16c744057d1
```

Verify all pins directly from Git. Review only the exact
`OLD_REVIEWED_CANDIDATE..NEW_CANDIDATE` delta and regression impact. Do not reopen optional
observations O1–O5 or conduct another full review unless the delta itself proves a material scope
or contract conflict.

## Exact findings to close

Determine independently whether the delta fully and correctly closes only:

- `SNAP-R1`: intra-batch byte-identical duplicate, identity/hash conflict, second snapshot for one
  product, all-or-nothing refusal, and legitimate multi-product behavior;
- `SNAP-R2`: fail-closed handling for unexpected, nested, and symlink snapshot directories/files
  without breaking legitimate multi-product verification;
- `SNAP-R3`: manifest-entry approval status/scope equality with the hash-anchored snapshot document,
  while untampered initial/correction/withdrawal bundles remain valid.

## Required delta review

1. Confirm the new candidate is exactly one additive commit whose parent is the old reviewed
   candidate and whose changed paths are limited to:
   - `foundation/cosmile/commerce_snapshot/exporter.py`
   - `foundation/cosmile/commerce_snapshot/file_bundle.py`
   - `foundation/tests/test_cosmile_commerce_snapshot.py`
   - `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`
2. Inspect every changed line and ensure there is no unrelated behavior, oracle weakening,
   authority expansion, vault access, transport, endpoint, DB, network, concurrency, durability,
   runtime, AI, Memory, SIASIU, secret, PII, or real-ELT behavior.
3. Reproduce the load-bearing focused tests and safe regressions with `python3 -B`, synthetic
   fixtures, and local temporary directories only. Capture pre/post Git state and do not install
   dependencies or access network, DB, provider, secret, live, or production resources.
4. Verify the correction evidence claims, including failing-first provenance where it is
   independently inspectable, 68 focused tests, no modification of pre-existing test oracles,
   and no cache/bytecode residue.
5. Verify documentation describes the corrected behavior without expanding the approved
   non-production local-file-bundle claim ceiling.

## Verdict and correction routing

Return exactly one:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

`PASS` closes SNAP-R1/R2/R3 for this exact candidate only. `PASS_WITH_CORRECTIONS` must identify
new bounded finding IDs and exact paths; any second correction returns through the Advisor to the
same Foundation Worker, then to this same Reviewer for another declared delta-only review.
Reviewer must not patch, stage, commit, push, accept risk, select policy, dispatch another actor,
or begin another WorkUnit.

## Output and stop

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/23_FOUNDATION_SNAPSHOT_EXPORT_DELTA_REVIEW_1.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/23_FOUNDATION_SNAPSHOT_EXPORT_DELTA_REVIEW_1_POINTER.md`

Return the pointer to `foundation-advisor` and STOP.
