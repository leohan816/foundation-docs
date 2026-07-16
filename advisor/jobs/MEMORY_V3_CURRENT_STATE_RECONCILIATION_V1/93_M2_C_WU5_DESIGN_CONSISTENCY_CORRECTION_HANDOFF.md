# Memory V3 M2 C WU5 — bounded design consistency correction handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-DESIGN-CONSISTENCY-CORRECTION-001
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
ROLE: Foundation Designer
ROLE_MODE: BOUNDED_DESIGN_CORRECTION
RESPONSIBLE_ADVISOR: foundation-advisor
FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_MODE: READ_ONLY
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: 3e6abeec04f370dff1844afc429bd39487149c02
FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
DESIGN_SUBJECT_COMMIT: 826bafdc30b9f8ec15104c3b9ca72ab5a4053456
DESIGN_REVIEW_COMMIT: 38785417440728585f4f9167ea9183347d41d917
DESIGN_REVIEW_VERDICT: PASS
REQUIRED_SKILL: /fable-builder
MODEL_EFFORT: high
PRODUCT_WRITE_TEST_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Purpose

Correct only the three internal documentation consistency observations recorded by
the same independent Reviewer in:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DELTA_DESIGN_REVIEW_RESULT.md
```

The PASS verdict remains the baseline. This correction adds no policy, behavior,
architecture, API, path, implementation authority, WorkUnit, test authority, or
product change. It makes older sketch/inventory text agree with the already reviewed
controlling WU5/WU6 specifications.

## Exact corrections

### DR-W5-F1 — decision-ID annotation

In section 11.1, replace only the stale `decision_id` annotation so it agrees with
the exact three-null-path rule already stated in section 11.1 prose, section 11.7's
ownership table, and section 11.8:

```text
flag-disabled
already-poisoned
decision-ID-factory-failure
```

Do not change the controlling rule, field type, status, response shape, or any other
decision-ID semantics.

### DR-W5-N2 — historical transaction sketch

Narrowly update section 7.3 so it no longer says the audit append is inside WU3's
ledger transaction or that an audit failure rolls back WU3. Preserve the already
reviewed behavior from sections 11.2 and 11.7 exactly:

```text
- WU3 commits only its ledger decision/lineage/candidate-slot effects;
- minimized audit/metrics occur after WU3 returns;
- success/replay is not released until both sinks return literal True;
- a post-accepted/replay sink failure poisons the service without clearing or
  rolling back prior ledger state;
- rejection sink failure leaves the rejection unchanged.
```

Do not invent an audit callback, rollback mechanism, durable recovery, endpoint,
transport, or new transaction boundary.

### DR-W5-N3 — future fixture inventory

Add the already-authorized WU6 synthetic fixture path to section 12.1's inventory:

```text
foundation/shared_memory/tests/fixtures/commerce_evidence_service_v1_cases.json
```

Its responsibility and prohibited coupling must agree with section 13.5: synthetic
service/audit/containment cases only; no real identifier, PII, secret, provider,
network, DB, or runtime activation. Do not add any other path or WU5 test authority.

## Allowed writes

Write only these four foundation-docs paths:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CONSISTENCY_CORRECTION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CONSISTENCY_CORRECTION_RESULT_POINTER.md
```

Update both affected SHA-256 pointers after the design and correction result are
final. Do not stage, commit, or push. Do not modify either Reviewer result.

## Required verification

- Read the current authority, original WU5 design delta, and Reviewer result directly.
- Verify actual live model/effort/session/workspace before writing.
- Verify only the four declared foundation-docs paths changed.
- Verify UTF-8 and `git diff --check`.
- Verify Foundation remains read-only at the exact branch/HEAD and its known dirt is
  unchanged.
- Record exact before/after design SHA-256 values and the three corrected finding IDs.
- Record product write/test, DB, secret, env, network, provider, stage, commit, and
  push as zero.

## STOP conditions

STOP without writing if any correction requires new product policy, runtime
behavior, implementation authority, a product file, a fourth design issue, or any
path outside the four-path output allowlist. WU5 implementation, WU6–WU8, delivery,
intake, durable/current candidate runtime, real-user application, approval/reuse/
promotion, ranking, safety mutation, real DB, production/live, and M3 remain
unauthorized in this correction.

Return the compact pointer to `foundation-advisor` and STOP.
