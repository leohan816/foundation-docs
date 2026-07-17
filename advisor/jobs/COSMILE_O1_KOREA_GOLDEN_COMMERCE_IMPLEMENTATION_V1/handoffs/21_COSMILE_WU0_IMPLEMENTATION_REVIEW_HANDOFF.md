# Independent Reviewer Handoff — Cosmile WU-0 Candidate

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_ID: COSMILE-WU0-FULL-REVIEW-1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_FULL_REVIEW
ACTOR: foundation-reviewer-fable5
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
ROLE: Independent Foundation Reviewer
RETURN_TO: foundation-advisor
```

## Serialized runtime gate

This review starts only after the preceding Foundation snapshot review has returned and the same
Reviewer session is idle. Immediately before dispatch, verify and record session/pane, Fable 5,
max effort, exact CWD, `/fable-sentinel`, Reviewer role authority, independence, synchronization
OFF, and no overlapping review. Stop without reviewing on any mismatch.

## Exact pinned subject

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
DECLARED_BASE: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
CANDIDATE_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_UPSTREAM: UNSET_BEFORE_REVIEW

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
EVIDENCE_COMMIT: a65d9cd9ca43ec2a074c1b9dd7be69b6b898160d
RESULT_BLOB: b9947086e9ce40135d6a46acf91574e2f94f200a
RESULT_SHA256: 3369b08ee077d18263a536f00e9230467caa04c8147d853d6f5fd59758b6f9f7
POINTER_BLOB: 283cbf927a0524d360ba6c84e81e2d6bff0e96e8
POINTER_SHA256: 1ca1cd693f3929af6386276d7e69610d74ff979877a3b1d8aa2fb25bcae3d4fc
```

Verify all Git and byte pins directly. Review only `DECLARED_BASE..CANDIDATE_HEAD`.

## Authority and sources

Read current Agent Office operating model, Reviewer role, run/result protocols, Cosmile root and
app rules, the committed implementation job package, and the pinned reviewed design named by the
WU-0 handoff. This WorkUnit is schema/migration substrate only. It authorizes no auth, payment,
inventory runtime, catalog import, route, UI, provider, flag activation, shared DB, or next WU.

## Required review

Directly inspect the complete candidate and rerun safe local evidence needed to determine:

1. exact six-path containment, base ancestry, clean candidate, additive-only schema posture, and
   absence of runtime/provider/secret/network/shared-DB behavior;
2. Prisma schema and SQL migration correspondence for all 13 entities, relations, nullability,
   field names, indexes, and constraints, despite `prisma validate` being unavailable;
3. compatibility with existing non-production rows, deterministic idempotent `orderNo` backfill,
   uniqueness, zero row loss, and safe repeated forward/down/forward behavior;
4. fail-closed down gate completeness, dependency/drop order, and no silent destructive rollback;
5. correctness and adjacent-negative coverage of unique, partial-unique, CHECK, FK, status,
   currency, hash, and snapshot/SKU binding constraints;
6. whether claims labeled `append-only` are actually enforced to the level required by the
   reviewed design and WU-0 handoff, including arbitrary UPDATE/DELETE behavior, rather than being
   inferred merely from absence of `updatedAt` or sequence uniqueness;
7. that the cross-row oversell guarantee is not falsely claimed by WU-0 and that its explicit WU-C
   dependency remains default-deny and implementation-determinate;
8. disposable PostgreSQL containment, already-local image, no host port, synthetic rows, cleanup,
   counts-only evidence, and truthful labeling of skipped regressions;
9. the Worker report's claims, especially any statement that a skipped regression poses no risk,
   against evidence rather than assumption;
10. no PII, raw token, raw webhook payload, real identifier, credential, provider data, or unsafe
    rollback instruction in schema, scripts, docs, or evidence;
11. honest claim ceiling: schema substrate and disposable migration rehearsal only, not provider,
    application, commercial, sandbox, or production readiness.

The Reviewer may rerun only the focused disposable WU-0 test and already-proven local regressions
whose safety is independently verified. No image pull, dependency install, external network,
shared/real DB, provider, secret, PII, live, or production access. Capture pre/post Git and Docker
state and confirm cleanup. Do not manufacture PASS for unavailable Prisma or psycopg2 paths.

## Verdict and correction routing

Return exactly one:

```text
PASS
PASS_WITH_CORRECTIONS
HOLD
FAIL
```

For `PASS_WITH_CORRECTIONS`, name bounded finding IDs, exact affected paths, the required invariant,
and positive plus adjacent-negative evidence. The same Cosmile Worker owns any bounded correction;
the same Reviewer later reviews only the declared old-candidate to new-candidate delta. Reviewer
must not patch or accept risk. `HOLD`/`FAIL` must identify the exact blocker.

## Output and stop

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/21_COSMILE_WU0_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/21_COSMILE_WU0_IMPLEMENTATION_REVIEW_POINTER.md`

Do not patch, stage, commit, push, select policy, dispatch, begin WU-A/C/D, or alter the disposable
test environment outside its exact attributable lifecycle. Return to `foundation-advisor` and STOP.
