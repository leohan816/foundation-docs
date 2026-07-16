# Memory V3 M2 C WU4 — count-correction delta review

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-COUNT-CORRECTION-DELTA-REVIEW-001
REVIEW_ID: M2-C-WU4-COUNT-CORRECTION-DELTA-REVIEW-001
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
SUBJECT_BASE: 4c7f430a3b169d94ac1b179f3af92a630d5819fd
SUBJECT_HEAD: f225607a86288e6857d2753bd349927f67469ba6
PREVIOUS_REVIEW_COMMIT: b0a22b8408b6a5a4fada2812a44607a39f4f6926
FINDING_ID: DR-W4-F1
REQUIRED_SKILL: /fable-sentinel
REQUESTED_EFFORT: max
INDEPENDENCE: same independent Reviewer as previous pass; separate from Advisor, Designer, and Worker
PRODUCT_WRITE_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Required reads

Read the current Agent Office Reviewer authority, FOUNDATION `AGENTS.md` and
`CLAUDE.md`, the previous PASS result at commit `b0a22b8408b6a5a4fada2812a44607a39f4f6926`,
and this handoff directly. Use the minimum load-bearing context only.

## Immutable delta subject

Review only the path-filtered delta from `SUBJECT_BASE` to the full resolved
`SUBJECT_HEAD` for these two paths:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

Verify only that:

1. the old `seven-key` wording is absent and the corrected `eight-key` wording occurs exactly once;
2. the correction matches the authoritative eight-key §10.3 projection and adds no policy, architecture, behavior, API, test, WorkUnit, or authority;
3. the pointer `RESULT_SHA256` equals the corrected clarification result SHA-256;
4. `PATCHED_DESIGN_SHA256` remains `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66`;
5. the delta is exactly the two declared foundation-docs paths and Foundation remains at the exact target HEAD with its pre-existing dirt unchanged;
6. WU8, delivery, intake, durable/current runtime, real-user application, promotion, ranking, safety mutation, real DB, production, and M3 remain unauthorized.

Do not re-review the prior four-path design delta. Do not patch any subject or
product file. Do not run product tests. Do not stage, commit, or push.

Write only:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_COUNT_CORRECTION_DELTA_REVIEW_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_COUNT_CORRECTION_DELTA_REVIEW_RESULT_POINTER.md
```

Return `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`, then return the
compact pointer to `foundation-advisor` and STOP.
