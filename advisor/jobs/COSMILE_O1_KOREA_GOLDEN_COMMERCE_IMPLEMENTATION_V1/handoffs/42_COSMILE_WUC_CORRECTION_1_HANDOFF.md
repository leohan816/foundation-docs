# Cosmile Worker Handoff — WU-C Correction Cycle 1 (WUC-F1)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-C-CORRECTION-1
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact starting state and finding

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_HEAD: 84370e8624c6e908da183a84b38551a6a9441527
EXPECTED_PARENT: e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_UPSTREAM_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

REVIEW_ARTIFACT_COMMIT: c68410a68fa0ec844c6653bf766ccba2e232f5b2
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
REQUIRED_FINDING: WUC-F1
SEVERITY: LOW
```

Before editing, live-verify the same Worker/session/model/effort/skill/workspace and every Git pin. Read the
committed 41_ review result at `c68410a68fa0ec844c6653bf766ccba2e232f5b2`, current Agent Office and
repository rules, the original 40_ handoff, and the testing meaning policy. Stop on mismatch, drift, or any
need outside this bounded correction. Preserve reviewed history: no amend/rebase/squash/force-push.

## Authorized correction only

Close exactly WUC-F1:

- define one deterministic maximum identifier length of **256 Unicode code points** for WU-C service inputs;
- apply the bound, before any repository call, to `orderId` and `skuId` in reservation input and
  `reservationId` in every transition input;
- preserve the existing non-empty/trimmed requirement and all existing categories;
- an identifier exceeding the cap must return existing closed category `invalid_input` and perform zero
  repository write;
- add positive boundary proof that a 256-code-point identifier is accepted by validation;
- add adjacent-negative proof that a 257-code-point `orderId` or `skuId` returns `invalid_input` with zero
  writes;
- add adjacent-negative proof that a 257-code-point transition `reservationId` returns `invalid_input` with
  zero writes;
- do not change database column types, schema, migration, SQL, repository locking, transition truth,
  restoration behavior, result vocabulary, or any existing oracle except as strictly required to add these
  boundary assertions.

Use code-point length, not UTF-16 code-unit length, so the declared boundary is deterministic for non-ASCII
input. Do not introduce normalization, identifier rewriting, hashing, truncation, logging, or a second policy.

## Exact allowed product paths

Only these two existing paths may change:

- `app/src/lib/inventory/service.ts`
- `app/scripts/o1_inventory_contract.vitest.ts`

All other product paths must remain byte-unchanged. Do not modify contracts, repository SQL, concurrency test,
schema/migrations, dependencies, lockfiles, routes, checkout/payment/order/runtime, or documentation.

## Required verification

Run and record:

- focused `o1_inventory_contract.vitest.ts`, including the new boundary tests;
- the full safe Vitest suite;
- pre/post Git status and exact two-path diff;
- proof that the original WU-C concurrency/repository paths are byte-unchanged;
- proof that no route/checkout/payment/runtime is connected and no secret/PII/network/DB/provider access
  occurred.

The PostgreSQL concurrency and migration rehearsals need not be rerun because neither SQL nor either dbtest
changes; record this as an evidence-preserving targeted correction, not as new DB evidence. Use already-present
dependencies only through the same temporary symlink pattern and remove it with cleanup evidence. No install,
Prisma generation, build, real DB, provider, network, credential, PII, production, or live access.

## Commit, evidence, and stop

Create one new additive correction commit on top of `84370e8624c6e908da183a84b38551a6a9441527`.
Do not push before same-Reviewer delta PASS. Do not begin WU-B/D/E/F/G.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/42_COSMILE_WUC_CORRECTION_1_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/42_COSMILE_WUC_CORRECTION_1_POINTER.md`

The result must identify WUC-F1, old and new heads, exact diff, new test cases/counts, preserved evidence, and
zero unrelated change. Return to `foundation-advisor` and STOP. Do not dispatch the Reviewer.
