# M2 A/B — Cosmile Worker IR-F3-R1 Single-File Patch Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-FOCUS-PATCH-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: cosmile Worker
TARGET_SESSION: cosmile
TARGET_WINDOW_ID: @1
TARGET_PANE_ID: %1
ROLE: Worker
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_REPOSITORY: /home/leo/Project/Cosmile
TARGET_BRANCH: shadow/m4-cosmile-memory
PATCH_BASE: 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
DELTA_REVIEW_EVIDENCE_COMMIT: 37c9e194d79ed3e4c1ce1e54a74e61f32bde4d03
DELTA_REVIEW_VERDICT: NEEDS_PATCH
ONLY_FINDING: IR-F3-R1

REQUIRED_SKILL: /fable-builder
IMPLEMENTATION_AND_FINAL_AUDIT_EFFORT: max
PRODUCT_COMMIT_PERMISSION: YES
PRODUCT_PUSH_PERMISSION: YES — non-force exact shadow branch only
FOUNDATION_DOCS_COMMIT_PUSH: FORBIDDEN — Advisor publishes evidence
BRANCH_CREATE_SWITCH_MERGE: FORBIDDEN
REAL_DB_SECRET_ENV_NETWORK_PRODUCTION: FORBIDDEN
C_IMPLEMENTATION_FOUNDATION_INTAKE_DELIVERY: FORBIDDEN
STOP_AFTER_RETURN: true
```

## 1. Exact patch

Patch only `IR-F3-R1` from the committed delta-review result at
`37c9e194d79ed3e4c1ce1e54a74e61f32bde4d03`.

Current failure:

- dismissing the final visible recommendation computes the correct heading
  fallback;
- `setDismissed` re-renders through the `visible.length === 0` early return;
- that branch unmounts `recHeadingRef` before the queued
  `requestAnimationFrame` callback;
- focus therefore falls to the document body.

Required result:

- the final empty-state render must mount a focusable target that the existing
  rAF can focus after state update;
- preserve the `role=status` announcement;
- do not alter multi-card next/previous focus behavior, recommendation events,
  dismiss semantics, or any other UI behavior.

## 2. Direct reads and preflight

Read current Agent Office Worker authority, Cosmile rules, `/fable-builder`,
the committed delta-review result/pointer at `37c9e194…`, and the current source
at `68cee5d` directly. Verify same Worker/session/conversation, Opus actual
model, max effort, workspace, branch, HEAD/upstream, and the six preserved
untracked docs. Do not fetch. Stop on any tracked dirt or mismatch.

## 3. Exact allowlist

Only these paths may change:

```text
app/src/components/slice/ConsultFoundationResult.tsx
app/scripts/m2_ab_feedback_state.vitest.ts
```

The test path is permission only. Prefer the smallest useful oracle. Do not
touch the pure helper if its already-passing single-card→fallback behavior does
not need a change.

## 4. Delta verification

1. Add or record a failing implementation-inspection oracle showing the
   empty-state target is not focusable/mounted at the patch base.
2. Make the minimum component patch.
3. Verify the empty-state target is still mounted, has a ref and
   `tabIndex={-1}`, preserves `role=status`, and is the target focused by the
   existing rAF path.
4. Run only:

```text
npx vitest run scripts/m2_ab_feedback_state.vitest.ts
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
node scripts/m2_ab_no_transport.mjs
npx tsc --noEmit
git diff --check 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd..HEAD
```

Classify the seven known unrelated type errors honestly. Do not run build, DB,
browser, network, secret, environment, or dependency installation. This is a
single-edge delta, not a full rerun.

## 5. Commit, evidence, return

- Explicitly stage only changed allowlist paths.
- Make one follow-up commit; do not amend `68cee5d`.
- Non-force push only to `origin shadow/m4-cosmile-memory`; verify local
  tracking ref without fetch.
- Write only these new foundation-docs files, without staging/commit/push:

```text
runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_FOCUS_PATCH_RESULT.md
runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_COSMILE_FOCUS_PATCH_RESULT_POINTER.md
```

Record actual model/effort/skill, old/new head, exact path delta, red/green or
inspection evidence, safe tests, honest exclusions, push status, and zero
forbidden access. Return the pointer to `foundation-advisor` and STOP. Do not
dispatch Reviewer or begin C.
