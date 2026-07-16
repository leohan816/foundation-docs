# Advisor Validation — WU8-C1 Candidate

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-C1
VALIDATION_ROLE: foundation-advisor
VALIDATION_STATUS: READY_FOR_INDEPENDENT_REVIEW

REPOSITORY: /home/leo/Project/Cosmile
BRANCH: shadow/m4-cosmile-memory
BASE: f26fa5ced7083bb8d0af00bda2a54951923ea22f
CANDIDATE: ad172db403065fc8e498a1e80cdd347034ea7c48
CANDIDATE_PARENT: f26fa5ced7083bb8d0af00bda2a54951923ea22f
ORIGIN_HEAD_AT_VALIDATION: f26fa5ced7083bb8d0af00bda2a54951923ea22f
LOCAL_AHEAD_BEHIND: ahead 1 / behind 0
PUSHED: NO
```

## Reproduced evidence

- Current branch, candidate, and parent exactly match the Worker pointer.
- `git diff-tree --no-commit-id --name-status -r ad172db...` contains exactly
  the four C1 paths authorized by the reviewed Founder Decision and Manifest:
  `app/prisma/schema.prisma`, forward migration, fail-closed down migration,
  and the focused migration test.
- `git diff --check f26fa5c..ad172db` is clean.
- The index and tracked working tree are clean after the candidate commit.
- The six pre-existing Cosmile untracked documentation files remain the only
  untracked files and were not staged or committed.
- No WU8 disposable container remains after the Worker test.
- Foundation, SIASIU, and foundation-control product/control pins were not
  changed by this validation.

## Worker test evidence received

- Focused disposable PostgreSQL migration test: **PASS 28/28**.
- Forward/down/forward, zero-row-loss, deterministic evidence-only backfill,
  generic-row preservation, constraint-negative cases, fail-closed down gate,
  M2 constraint restoration, and post-test cleanup are recorded.
- Prisma schema validation: PASS.
- Existing `m2_ab_migration_rehearsal.dbtest.py`: **SKIP_INFRA** because the
  unchanged script requires host `psycopg2`, which is absent. The new focused
  test reconstructs the exact M2 baseline constraint and verifies restoration,
  but this is not relabeled as a PASS of the skipped existing script.

## Mandatory independent-review focus

The Reviewer must determine whether the honest existing-regression SKIP is
acceptable given the Worker-provided in-scope replacement coverage or is a
blocking `NEEDS_PATCH` finding. The Advisor does not waive or convert the SKIP.
The Reviewer must also reproduce the focused test in a fresh disposable local
environment and verify cleanup before issuing PASS.

```text
PRODUCT_PUSH_BEFORE_REVIEW: NO
INDEPENDENT_REVIEW_REQUIRED: YES
PASS_CLAIMED_BY_ADVISOR: NO
NEXT_ACTOR: foundation-reviewer-fable5
HARD_STOP_FOR_C2: ACTIVE until exact C1 independent PASS + push + upstream equality
```
