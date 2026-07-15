# M2 A/B — Same-Reviewer IR-F3-R1 Final Delta Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-FOCUS-DELTA-REVIEW-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer (Sentinel)
REVIEW_PASS: DELTA_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

PRODUCT_REPOSITORY: /home/leo/Project/Cosmile
PRODUCT_BRANCH: shadow/m4-cosmile-memory
PREVIOUS_SUBJECT_HEAD: 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd
NEW_SUBJECT_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
PREVIOUS_DELTA_REVIEW_EVIDENCE_COMMIT: 37c9e194d79ed3e4c1ce1e54a74e61f32bde4d03
WORKER_FOCUS_PATCH_EVIDENCE_COMMIT: f64321d5cd467e04985bdf8cfe5a9087ec6554e5
ONLY_FINDING: IR-F3-R1

ACTUAL_MODEL: verify live and record exactly
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
DELTA_ONLY: true
PRODUCT_WRITE_COMMIT_PUSH: FORBIDDEN
FOUNDATION_DOCS_COMMIT_PUSH: FORBIDDEN — Advisor publishes Reviewer artifacts
REAL_DB_SECRET_ENV_NETWORK_PRODUCTION: FORBIDDEN
C_IMPLEMENTATION_FOUNDATION_INTAKE_DELIVERY: FORBIDDEN
STOP_AFTER_RETURN: true
```

## 1. Objective

As the same Reviewer, inspect only `68cee5d..f26fa5c` plus the minimum
load-bearing focus context. Decide whether `IR-F3-R1` is closed. Do not reopen
IR-F1/IR-F2 or the full A/B implementation; they were closed in the prior delta
review. Do not patch, commit, push, dispatch, accept risk, or begin C.

## 2. Required direct reads

- Current Agent Office Reviewer authority, Cosmile rules, and
  `/fable-sentinel` delta-review instructions.
- Prior delta-review result/pointer at foundation-docs commit
  `37c9e194d79ed3e4c1ce1e54a74e61f32bde4d03`.
- Worker focus-patch result/pointer at foundation-docs commit
  `f64321d5cd467e04985bdf8cfe5a9087ec6554e5`.
- Exact two-file product delta and current load-bearing render/focus context at
  `f26fa5ced7083bb8d0af00bda2a54951923ea22f`.

## 3. Exact delta and closure criteria

The delta must contain only:

```text
app/src/components/slice/ConsultFoundationResult.tsx
app/scripts/m2_ab_feedback_state.vitest.ts
```

Verify:

1. the empty final-card state mounts the same fallback ref used by the queued
   rAF and is programmatically focusable;
2. `role=status` remains;
3. React's commit occurs before rAF, making the ref available on the normal
   state-update path;
4. empty and non-empty render branches are mutually exclusive, so the same ref
   is never attached to two mounted elements;
5. multi-card next/previous focus, event emission, dismiss behavior, and all
   other code are unchanged;
6. the implementation-inspection oracle fails at `68cee5d` and passes at
   `f26fa5c` without weakening existing assertions.

## 4. Safe checks

Run only:

```text
npx vitest run scripts/m2_ab_feedback_state.vitest.ts
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
node scripts/m2_ab_no_transport.mjs
npx tsc --noEmit
git diff --check 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd..f26fa5ced7083bb8d0af00bda2a54951923ea22f
```

No browser/build/DB/network/environment/secret/dependency operation. Record
static-vs-rendered limitations honestly.

## 5. Output

Write only:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_FOCUS_DELTA_REVIEW_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_FOCUS_DELTA_REVIEW_RESULT_POINTER.md
```

Return `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`, with direct evidence.
If PASS, state explicitly that IR-F3-R1 is closed and A/B implementation review
gate is closed subject to the already-recorded honest build/DB/browser
exclusions and deferred non-blocking IR-N1..N5/INFO1. Return the pointer to
`foundation-advisor` and STOP.
