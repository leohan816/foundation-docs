# Independent Delta Review Handoff — Preview Input/Hydration Fix

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
REVIEW_TYPE: INDEPENDENT_IMPLEMENTATION_DELTA_REVIEW
FROM: foundation-advisor
TO: foundation-reviewer-fable5
PATCH_AUTHORITY: NONE
RETURN_TO: foundation-advisor
```

## Exact subject

```text
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
OLD_REVIEWED_HEAD: d5c762fcf4029f7027daad02a18ffae43e62e5ab
NEW_CANDIDATE_HEAD: 62c468e9906acac0a6f61a9ca4f7108e790c4d06
REVIEW_DELTA: git diff d5c762fcf4029f7027daad02a18ffae43e62e5ab..62c468e9906acac0a6f61a9ca4f7108e790c4d06
PUSHED: NO
EXPECTED_CHANGED_PATHS: app/src/app/preview/page.tsx; app/scripts/o1_browser_runtime_contract.vitest.ts
```

Read current Agent Office Reviewer authority and load `/fable-sentinel`. Verify the live
Fable 5 family runtime, max effort, independent session, exact workspace, no overlapping
review, pane synchronization OFF, and no patch authority before acting.

Read from this handoff's exact committed foundation-docs snapshot:

- `37_LEO_PREVIEW_UNLOCK_FAILURE.md`
- `38_PREVIEW_UNLOCK_DIAGNOSIS_HANDOFF.md`
- `39_LEO_PREVIEW_FAILURE_AFTER_POPUP_DISMISSAL.md`
- `40_PREVIEW_INPUT_HYDRATION_CORRECTION_DIRECTION.md`
- `runs/shared/.../33_PREVIEW_UNLOCK_DIAGNOSIS_RESULT.md`
- `runs/shared/.../33_PREVIEW_UNLOCK_DIAGNOSIS_POINTER.md`

## Required checks

1. Delta is exactly additive from the reviewed head and limited to the two declared
   allowlisted paths; no schema, migration, dependency, configuration, layout, popup,
   endpoint semantic, or unrelated change.
2. The correction addresses the exact observed defect: a visually populated DOM password
   field with stale React state must not leave Continue disabled or serialize an empty copy.
3. The submitted value is read only from the actual named form field at submit time; it is
   not retained in React state, local storage, URL, logs, evidence, or a second data path.
4. Continue is disabled only while a request is in flight; duplicate submission protection
   remains intact; empty input fails closed at submit time.
5. Successful unlock clears the form; server-side constant-time verification, httpOnly
   cookie, preview restriction, production refusal, and secret non-disclosure are unchanged.
6. Focused regression tests are meaningful and cannot pass while the stale-state predicate
   is reintroduced.
7. Independently rerun the focused contract suite, typecheck, changed-path lint, full Vitest
   suite, and non-production build. Use no real identity, Google/Toss call, secret value,
   PII, trace, video, HAR, or screenshot.
8. If useful, reproduce the DOM-only population behavior with a placeholder only. Do not
   prolong review for the separately open denied-message rendering observation unless it
   exposes a blocking regression in the correction.
9. Confirm product worktree containment, no diagnostic residue, unchanged tunnel hostname,
   and Google/Toss still blocked.

Return `PASS`, `NEEDS_PATCH`, `PASS_WITH_RISK`, or `FAIL`. Do not patch, stage, commit, push,
dispatch, accept risk, or begin Google/Toss.

## Result paths

```text
TEMP_RESULT: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/34_PREVIEW_HYDRATION_FIX_DELTA_REVIEW.md
TEMP_POINTER: /home/leo/Project/.mission-tmp/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/reviewer/34_PREVIEW_HYDRATION_FIX_DELTA_REVIEW_POINTER.md
```

```text
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
