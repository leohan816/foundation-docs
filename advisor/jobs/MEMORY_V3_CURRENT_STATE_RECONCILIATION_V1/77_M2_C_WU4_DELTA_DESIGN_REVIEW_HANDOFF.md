# Memory V3 M2 C WU4 — independent delta design review handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
REVIEW_ID: M2-C-WU4-DELTA-DESIGN-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer (Sentinel)
ROLE_MODE: DELTA_DESIGN_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
TARGET_PROJECT: FOUNDATION
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
TARGET_HEAD: de63c8fedaa27e470e44359cad1c2940bdc0a866
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 590a72220229169513c3b50eb035d8d706c8a6b1
SUBJECT_HEAD: 954963841af166edf3f9b86ecbcc323945f94ff9
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max
INDEPENDENCE: separate session from Advisor, Designer, and Worker
PRODUCT_WRITE_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Required current authority reads

Read directly before review:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- `/home/leo/Project/FOUNDATION/AGENTS.md`
- `/home/leo/Project/FOUNDATION/CLAUDE.md`
- Founder authorization at foundation-docs commit
  `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`, path
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/58_M2_C_BOUNDED_SHADOW_IMPLEMENTATION_AUTHORIZATION.md`
- original independently reviewed design at commit
  `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117`
- original design review PASS at commit
  `920359eb03971540dae405dc836cc00f398e4ff1`
- WU3 Advisor gate at commit
  `9ba521e6f34d0f35fcf29009c560873fbced3f13`, path
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/74_M2_C_WU3_ADVISOR_GATE.md`

## Immutable delta subject

Review only the delta from `SUBJECT_BASE` to `SUBJECT_HEAD` for these four paths:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

Use ancestry and path-filtered diff. Do not re-review unrelated earlier design text except the smallest load-bearing context needed to judge this delta.

## Mandatory review questions

1. Does the delta close the candidate contract literal, exact DTO fields/types/nullability, hash projection, UTC millisecond expiry, ID factories, lifecycle, and 0/1/2 slot ordering without adding product policy or authority?
2. Are WU4's planner and adopter pure, bounded to `candidates.py` plus its dedicated test, and free of WU3/service/store/runtime mutation?
3. Does the replay-preserving failed-plan path truly preserve the reviewed WU3 gate order: exact replay and collision at gate 9, lineage at gate 10, and a hard-false gate 11 for unseen committable evidence, with zero new state?
4. Does the service-health poison latch preserve unrelated prior ephemeral ledger state, avoid `ledger.clear()`, fail closed after a post-accepted failure, and avoid creating durability, recovery, product-policy, or activation authority?
5. Is the WU4/WU5 boundary exact: WU4 may model but not implement service orchestration; WU5 owns the outer lock, replay-preserving submit path, response/audit assembly, and poison latch?
6. Are all fourteen WU4 test oracles and STOP conditions sufficient and internally consistent, including positive/adjacent-negative coverage, replay under factory/gate failure, and unrelated-state preservation after a post-ledger exception?
7. Are the two visible duplicate lines removed without deleting a required invariant?
8. Do both pointers match the subject files' SHA-256 values and does the delta remain exactly four foundation-docs paths with zero Foundation product change?
9. Does the delta keep WU8, delivery, activated intake, durable/current candidate runtime, real-user application, promotion, ranking, safety mutation, real DB, production, and M3 unauthorized?

Treat these two items as high-attention technical risks, not assumed conclusions:

```text
- failed WU4 preparation must not mask an exact replay;
- post-ledger containment must not erase unrelated prior accepted ephemeral evidence.
```

## Allowed inspection and output

Read-only inspection of the committed foundation-docs subject and the minimum load-bearing WU1–WU3 Foundation code is allowed. Do not run product tests for this design-only delta review unless a specific read-only command is necessary and proven safe first.

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DELTA_DESIGN_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DELTA_DESIGN_REVIEW_RESULT_POINTER.md
```

Do not modify the subject, any product repository, Control workspace, or any other evidence artifact. Do not stage, commit, or push.

## Verdict and return

Return exactly one of:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

If `NEEDS_PATCH`, give bounded finding IDs and exact artifact paths/sections; do not patch. Record the actual live model and effort, never infer them from the session name. Return the compact pointer to `foundation-advisor` and STOP.

