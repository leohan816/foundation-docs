# Foundation Worker Handoff — Snapshot Export Correction Cycle 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: FOUNDATION-O1-SNAPSHOT-EXPORT-1
CORRECTION_CYCLE: 1
ACTOR: foundation Worker
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
ROLE: same Foundation repository-owner Worker
RETURN_TO: foundation-advisor
```

## Exact correction basis

```text
REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
OLD_REVIEWED_CANDIDATE: 99885ded9927de092d660fe09ef3418891bb1291
EXPECTED_HEAD_AT_DISPATCH: 99885ded9927de092d660fe09ef3418891bb1291
EXPECTED_WORKTREE: CLEAN
EXPECTED_UPSTREAM: UNSET

REVIEW_EVIDENCE_COMMIT: dcaad81ede70540e249cbba55ace891b89af02dd
REVIEW_RESULT_BLOB: c8d84ae3de4d63cae282636e6ba65ac1a830348f
REVIEW_RESULT_SHA256: 279b4efe6fdf6772e14238e0c21eb9fe1cc002951c272e5cf26a35226b6515ef
REVIEW_POINTER_BLOB: 50d050b72b097182170863e84128bac09e2a0db5
REVIEW_POINTER_SHA256: 5a0426c73a173843392263cf62dae6186565364dcfc5d9a176bcdeb9b2ef6a0a
REVIEW_VERDICT: PASS_WITH_CORRECTIONS
```

Verify every pin and reread the complete independent review before editing. Stop on any branch,
HEAD, worktree, role, runtime, or evidence mismatch.

## Exact authorized findings

Correct only these confirmed findings:

### SNAP-R1 — intra-batch guard bypass

In `SnapshotExporter.publish`, make one publish batch enforce the same per-product and
per-identity invariants as separate calls, while preserving all-or-nothing behavior:

- byte-identical repeat in the same batch produces at most one delivery and a bounded
  `DUPLICATE_IGNORED` operational record;
- same identity tuple with different content hash refuses `immutability_violation`;
- a second different snapshot for the same product refuses because correction/supersession is
  required;
- refusal creates no manifest or partial registration and changes no state except the existing
  bounded `REFUSED` ledger record;
- a legitimate multi-distinct-product batch remains accepted in one manifest.

### SNAP-R2 — unexpected/symlink snapshot directories

Make bundle verification fail closed for unexpected directories under `snapshots/`, including
unknown product directories, nested directories, and symlinked directories. Legitimate expected
product directories and multi-product bundles must still verify. Preserve the existing category-
only error surface and all tamper/missing/stray-file behavior.

### SNAP-R3 — manifest entry and snapshot approval consistency

For every expected snapshot, require manifest-entry `approval_status` and `approval_scope` to
equal the hash-anchored snapshot document approval fields. A re-canonicalized forged manifest
entry must fail closed; untampered initial, correction, and withdrawal bundles must remain valid.

## Exact allowed correction paths

```text
foundation/cosmile/commerce_snapshot/exporter.py
foundation/cosmile/commerce_snapshot/file_bundle.py
foundation/tests/test_cosmile_commerce_snapshot.py
설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md
```

Do not touch `contract.py`, `__init__.py`, `설계문서/README.md`, the canonical vault, or any other
path. Do not implement optional observations O1–O5, redesign the contract, or add transport,
endpoint, service, DB, network, concurrency, durability, runtime, AI, Memory, or real-ELT behavior.

## Verification and commit discipline

- Add positive and adjacent-negative tests for every required behavior above.
- Run the focused suite and the same safe local regressions used in the full review.
- Capture exact pre/post Git state and confirm no bytecode/cache artifact.
- Add one new correction commit on top of `99885ded...`; no amend, rebase, squash, reset, force
  push, or history rewrite.
- Do not push before same-Reviewer delta review.
- Report the exact old-reviewed-candidate to new-candidate delta, changed paths, test commands,
  test results, and no-unrelated-change proof.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/22_FOUNDATION_SNAPSHOT_EXPORT_CORRECTION_1_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/22_FOUNDATION_SNAPSHOT_EXPORT_CORRECTION_1_POINTER.md`

Do not commit foundation-docs, dispatch the Reviewer, start another WorkUnit, or infer PASS. Return
the pointer to `foundation-advisor` and STOP.
