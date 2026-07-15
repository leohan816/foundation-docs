# M2 A/B — Same-Reviewer Implementation Delta Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-DELTA-REVIEW-001
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
PREVIOUS_SUBJECT_HEAD: b8f1c57502011dc7656ada91b3655432583be925
NEW_SUBJECT_HEAD: 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd
EXPECTED_ORIGIN: git@github.com:leohan816/Cosmile.git

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
PREVIOUS_REVIEW_EVIDENCE_COMMIT: ada898e0212d2f36381b7609f9c612b53d1fa952
WORKER_PATCH_EVIDENCE_COMMIT: 10cd22ad1a29621a4092f81bea17ee8fdafa7e99
REVIEWED_DESIGN_COMMIT: 9530b221d4430d29bfb545702390ebc9e6606d6a

ACTUAL_MODEL: verify live and record exactly
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
PRODUCT_WRITE_COMMIT_PUSH: FORBIDDEN
FOUNDATION_DOCS_COMMIT_PUSH: FORBIDDEN — Advisor publishes Reviewer artifacts
REAL_DB_SECRET_ENV_NETWORK_PRODUCTION: FORBIDDEN
DELTA_ONLY: true
STOP_AFTER_RETURN: true
```

## 1. Review objective

As the same independent Reviewer that issued `IR-F1`, `IR-F2`, and `IR-F3`,
review only `b8f1c575..68cee5d` plus the minimum load-bearing context needed to
judge those three findings. Do not re-review the full original 39-file
implementation.

Return one of `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`. Do not patch,
commit, push, dispatch, accept risk, or begin C.

## 2. Required direct reads and immutable evidence

1. Current Agent Office operating model and Reviewer role.
2. Cosmile root/app role and product rules named in the previous review.
3. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and the delta,
   contract, safety, provenance, and review-classification references it routes.
4. Previous implementation review result/pointer from foundation-docs commit
   `ada898e0212d2f36381b7609f9c612b53d1fa952`.
5. Worker patch result/pointer from foundation-docs commit
   `10cd22ad1a29621a4092f81bea17ee8fdafa7e99`.
6. The exact product delta and necessary current context at
   `68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd`.

Do not trust Worker or Advisor prose until direct source, diff, test, and Git
evidence confirms it.

## 3. Exact delta paths

The delta must contain exactly these eight paths and no others:

```text
app/scripts/m2_ab_commerce_evidence.vitest.ts
app/scripts/m2_ab_feedback_state.vitest.ts
app/src/app/api/commerce-evidence/consents/route.ts
app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts
app/src/components/feedback/PurchaseFeedbackPanel.tsx
app/src/components/slice/ConsultFoundationResult.tsx
app/src/lib/commerceEvidenceService.ts
app/src/lib/purchaseFeedbackState.ts
```

Verify ancestry, parent, path set, HEAD/tracking ref, tracked-clean state, and
the six preserved untracked docs. No fetch.

## 4. Closure criteria

### IR-F1

- Both Prisma consent reads use one exact non-null Actor predicate; no
  `OR`/`undefined`/empty-object branch can broaden scope.
- Identified and guest paths are distinct and fail closed when identity is
  invalid.
- Tests have a meaningful cross-actor negative oracle and revocation target
  oracle. Confirm the helper test is not merely reproducing its own logic while
  leaving a different default route query untested.

### IR-F2

- A pre-existing effective granted row supplies the envelope's real
  `capturedAt` and `noticeVersion`.
- A new grant uses request time/current notice.
- Latest-row, revoked/expired, and missing-row behavior cannot leak false
  provenance. The fallback must not silently synthesize provenance on a path
  that claims an existing grant.

### IR-F3

- The UI implements the reviewed dialog/bottom-sheet, fieldset/legend native
  radios, open/close focus, focus trap, Escape/busy rules, responsive scroll,
  adverse alert, correction, and retraction without raw text or new policy.
- Correction/retraction requests must be executable by the API/service and
  preserve flags-OFF/server-gated behavior.
- Recommendation dismiss must restore focus to the next card, previous card,
  or a still-mounted fallback heading/status when the last card is removed.
- Inspect the last-visible-card render path explicitly: state update and early
  return must not unmount the intended focus target before
  `requestAnimationFrame` runs.
- Browser/visual behavior not actually reproduced must remain an honest
  limitation; static token presence alone is not a behavioral PASS.

## 5. Safe delta checks

Run only the safe provider-independent delta set, flags unset:

```text
npx vitest run scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
npx vitest run scripts/v3_11.vitest.ts scripts/v3_11c_rec_event.vitest.ts scripts/v3_11c2_rec_outcome.vitest.ts scripts/m2_ab_recommendation_lifecycle.vitest.ts scripts/m2_ab_commerce_evidence.vitest.ts scripts/m2_ab_feedback_state.vitest.ts
node scripts/m2_ab_no_transport.mjs
npx tsc --noEmit
git diff --check b8f1c57502011dc7656ada91b3655432583be925..68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd
```

Classify pre-existing non-delta type failures accurately. Do not run build,
DB rehearsal, network, environment/secret access, dependency installation, or
browser automation unless an already-installed harness is demonstrably
isolated; no such harness is assumed.

## 6. Required output

Write only:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_IMPLEMENTATION_DELTA_REVIEW_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_IMPLEMENTATION_DELTA_REVIEW_RESULT_POINTER.md
```

The result must state actual model/effort/skill, exact delta and paths, each
IR-F1..F3 disposition, reproduced and excluded checks, any remaining finding
with pinned source and required bounded patch, product/docs write status, and
the verdict. Return the pointer to `foundation-advisor` and STOP.
