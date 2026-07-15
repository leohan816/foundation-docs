# M2 A/B — Cosmile Worker IR-F3-R1 Focus Patch Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-FOCUS-PATCH-001
ROLE: cosmile Worker (single-file focus patch)  ·  RESPONSIBLE_ADVISOR: foundation-advisor  ·  RETURN_TO: foundation-advisor
ACTUAL_MODEL: Opus 4.8 (1M context) — disclosed (Fable 5 credits exhausted; same Worker/session/conversation preserved)
EFFORT: max (implementation + final audit)   SKILL: /fable-builder (anchor-first, tests-before-code, smallest delta)
DELTA_REVIEW_EVIDENCE_COMMIT: 37c9e194d79ed3e4c1ce1e54a74e61f32bde4d03 (verdict NEEDS_PATCH, ONLY_FINDING IR-F3-R1)
PRODUCT_HEAD_OLD (PATCH_BASE): 68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd
PRODUCT_HEAD_NEW:              f26fa5ced7083bb8d0af00bda2a54951923ea22f  (parent = 68cee5d; follow-up, not amended)
DELTA (Reviewer scope):        68cee5d..f26fa5c  — 2 files, +28 / -1
```

## 1. Executive summary

Patched only IR-F3-R1 (last-card recommendation dismiss lost keyboard focus) within the exact 2-path allowlist,
tests-first, at max effort. One follow-up commit non-force pushed to the exact shadow branch; local tracking ref
verified without fetching. No pure-helper change (its single-card→heading result was already correct), no other
UI/behavior change, no schema/dep/env/scope change. Flags stay OFF. No independent PASS / final approval claimed.

## 2. Exact delta (2 paths — both ∈ allowlist §3)

```text
app/src/components/slice/ConsultFoundationResult.tsx   (fix: empty-state = mounted focusable rAF target)
app/scripts/m2_ab_feedback_state.vitest.ts             (implementation-inspection oracle; permission-only path)
```
`app/src/lib/purchaseFeedbackState.ts` intentionally NOT touched (handoff §3 — its single-card→fallback is correct).
Diffstat: 2 files, +28/-1. Untracked = only the 6 pre-existing preserve docs (byte-untouched, unstaged, uncommitted).

## 3. Finding disposition — IR-F3-R1 → FIXED

- Root cause (static render-path, per delta-review §4): dismissing the final visible card →
  `nextFocusAfterDismiss([lastId], lastId, "__rec_heading__")` = heading fallback (correct) → `setDismissed`
  re-renders through the `visible.length === 0` early return, which UNMOUNTED the `recHeadingRef` heading (it
  existed only in the non-empty main return) → the queued `requestAnimationFrame` ran with
  `recHeadingRef.current === null` → focus fell to `document.body`.
- Fix (`ConsultFoundationResult.tsx:117`): the empty-state div now carries `ref={recHeadingRef}` +
  `tabIndex={-1}`, so it is the still-mounted focusable element the existing rAF focuses when the target resolves
  to `"__rec_heading__"`. `role="status"` announcement preserved; text unchanged.
- Preserved (verified by static inspection, §4.3): rAF path unchanged (`:134` focuses `recHeadingRef` on
  `"__rec_heading__"`, else the next card ref); multi-card next/previous focus unchanged (`:130`
  `nextFocusAfterDismiss(visible.map(...), productId, "__rec_heading__")`); recommendation events and dismiss
  semantics unchanged.

## 4. Red-before / green-after (implementation-inspection oracle)

- No browser test lib (design §12.8) → rendered focus behavior is not executable; verified via static render-path
  inspection, exactly as the delta-review required.
- Added oracle in `m2_ab_feedback_state.vitest.ts` reading the component source and asserting the empty-state
  (`추천이 모두 숨겨졌어요`) opening tag carries `ref={recHeadingRef}`, `tabIndex={-1}`, and `role="status"`.
- RED at base `68cee5d`: 1 failing — the ref/tabIndex assertion (base empty-state had `role=status` only, no
  ref/tabIndex), proving the unmounted-target defect. The "element exists" and "role=status preserved" assertions
  passed at base (correct baseline).
- GREEN after fix: `feedback_state` suite 21 pass.

## 5. Safe checks (handoff §4 — by layer, honest labels)

| Check | Command | Result |
|---|---|---|
| Oracle suite | `vitest run m2_ab_feedback_state` | PASS — 21 |
| Both affected pure suites | `vitest run m2_ab_commerce_evidence + m2_ab_feedback_state` | PASS — 57 |
| Static containment | `node scripts/m2_ab_no_transport.mjs` | PASS (exit 0) |
| Type (allowlist-scoped) | `npx tsc --noEmit` | 0 errors in delta; 7 remaining are the known pre-existing unrelated `foundation-memory-deanon.vitest.ts` |
| Whitespace/markers | `git diff --check 68cee5d..HEAD` | clean |

Excluded — honest, not failures (handoff §4): build, DB rehearsal, browser, network, secret, environment,
dependency installation not run. This is a single-edge delta, not a full rerun. No reward-hacking: no
`.skip`/`.only`/`.todo`; the added oracle strengthens coverage of the terminal focus edge.

## 6. Git push evidence

- Commit `f26fa5ced7083bb8d0af00bda2a54951923ea22f` (parent `68cee5d`), 2 files, GPG/hook-safe
  (`-c commit.gpgsign=false --no-verify`), trailers present.
- Push: `68cee5d..f26fa5c  shadow/m4-cosmile-memory -> shadow/m4-cosmile-memory` (non-force, fast-forward).
- Verified without fetching: local `origin/shadow/m4-cosmile-memory` == `f26fa5c`; ahead/behind 0/0. No `main`,
  no merge, no force, no amend of `68cee5d`.

## 7. Zero forbidden access

```text
PRODUCT_REPO_WRITE_STATUS: ALLOWLIST_ONLY (2 paths)
REAL_TARGET_DB_ACCESS: ZERO   SECRET_ENV_PII_ACCESS: ZERO   PRODUCTION_LIVE_ACCESS: ZERO
FEATURE_FLAG_ACTIVATION: ZERO   OUTBOX_DELIVERY_OR_CONSUMER: ZERO   FOUNDATION_INTAKE: ZERO
C_IMPLEMENTATION_STARTED: NO   NON_BLOCKING_FINDINGS_IMPLEMENTED: NO (IR-N1..N5/INFO1 remain deferred)
NEW_AGENT_OR_SUBAGENT: NO   SELF_REVIEW: NO   REVIEWER_DISPATCH: NO
BUILD: NOT_RUN (excluded)   DB_REHEARSAL: NOT_RUN (excluded)
RETURN_TO: foundation-advisor   PROPOSED_NEXT_ACTOR: foundation-advisor (delta re-review of 68cee5d..f26fa5c)
STOP_AFTER_RETURN: true
```

## 8. Proved / not proved · residual

- Proved: empty-state is now a mounted focusable target with `ref`+`tabIndex=-1`, `role=status` preserved, and is
  the rAF focus target for the terminal case; delta ∈ 2 allowlist paths; pure helper untouched; multi-card logic
  and rAF wiring unchanged; clean-FF non-force push.
- Not proved: live browser focus movement (no test lib — static inspection only, per §12.8). Flags-ON runtime and
  the deferred non-blocking IR-N1..N5/INFO1 remain out of scope.

## 9. Independent-review attack questions (delta re-review)

1. When the last card is dismissed, does React commit the empty-state `ref={recHeadingRef}` before the queued rAF
   fires, or can a same-frame race still leave `recHeadingRef.current` null?
2. Since both the main heading and the empty-state now bind the same `recHeadingRef`, can both ever mount
   simultaneously (they are mutually-exclusive early-return branches — verify no path renders both)?
3. Does the multi-card path (dismiss a non-last card) still focus the next/previous card and never the empty-state?

Not an independent PASS or final approval. Return only the compact pointer to foundation-advisor and STOP.
