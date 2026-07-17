# Scope, Write Ownership, and Review Ledger

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
STATE: ADMITTED_PENDING_INITIAL_DISPATCH
```

## Frozen scope

- Market Korea; currency KRW; ELT eight-product source set only.
- Representative `elt-serum-vitayouth-01`; boundary `elt-pad-vitayouth-01-80`.
- Google OIDC only for first rehearsal, behind provider-neutral boundary.
- Direct Toss Payments V2 sandbox, with general-payment webhook pull verification rather than a
  nonexistent signature.
- Cosmile owns commercial state. Foundation owns canonical product facts and exports an
  asynchronous deterministic non-production file bundle.
- Existing Cosmile commerce spine is preserved. Replacement authority is limited to identity,
  payment/refund, inventory, and catalog/single-price seams.

## Repository ownership

| Repository | Authorized writer | Scope |
|---|---|---|
| FOUNDATION implementation worktree | Foundation Worker only | snapshot contract/export/file-bundle module, focused tests, required module design doc/index |
| Cosmile implementation worktree | Cosmile Worker only | exact WU handoff paths for WU-0 through WU-G |
| foundation-docs implementation worktree | Advisor publication; Workers write only named result/pointer files | job, handoff, evidence, review, audit, pointer |
| canonical vault | nobody | read-only source; no data/gate/approval mutation |
| foundation-control | nobody | read-only targeted Control only if later dispatched |
| SIASIU | nobody | excluded |

## Initial write locks

```text
LOCK FOUNDATION-SNAPSHOT-1:
OWNER: foundation Worker
WORKTREE: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BASE: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
STATUS: RESERVED

LOCK COSMILE-WU0-1:
OWNER: cosmile Worker
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BASE: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
STATUS: RESERVED

REVIEWER_LOCK:
OWNER: foundation-reviewer-fable5
MODE: SERIALIZED_ONE_SUBJECT_AT_A_TIME
STATUS: IDLE_UNTIL_CANDIDATE
```

## Candidate discipline

- Workers commit only their exact changed paths on isolated branches.
- Candidate commits are not final approval and are not pushed before the applicable independent
  review PASS.
- No amend/rebase/squash/force push after a reviewed candidate.
- A correction appends a bounded commit. Re-review is delta-only from old reviewed candidate to
  new candidate, by the same Reviewer.
- After review PASS, Advisor validates exact diff, ancestry, tests, containment, then routes push
  and the next dependency-gated handoff.

## Scope ledger fields for every later WorkUnit

```text
WORKUNIT:
BASE_HEAD:
CANDIDATE_HEAD:
ALLOWED_PATHS:
ACTUAL_CHANGED_PATHS:
NECESSITY_FOR_ANY_CONNECTOR_PATH:
TEST_COMMANDS:
TEST_RESULTS:
REVIEW_SUBJECT:
REVIEW_VERDICT:
CORRECTION_HEADS:
PUSH_STATUS:
NEXT_GATE:
```
