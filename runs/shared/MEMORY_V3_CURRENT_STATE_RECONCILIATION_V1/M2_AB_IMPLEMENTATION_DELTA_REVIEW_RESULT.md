# M2 A/B — Independent Cosmile Implementation Delta Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-IMPLEMENTATION-DELTA-REVIEW-001
REVIEW_PASS: DELTA_REVIEW (same-Reviewer re-review of IR-F1/IR-F2/IR-F3)
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: NEEDS_PATCH
IR-F1: CLOSED   IR-F2: CLOSED   IR-F3: CLOSED EXCEPT one named sub-criterion (IR-F3-R1)
REGRESSIONS_INTRODUCED: 0   SCOPE: exactly the 8 declared paths
```

## 0. Live runtime, model, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window=@5 pane=%5` — matches handoff.
- Workspace (cwd): `/home/leo/Project/Cosmile`. Effort: `max`. Skill: `/fable-sentinel`
  with `references/delta-review.md` (+ contract/safety/provenance/classification) applied.
- **ACTUAL_MODEL: Opus 4.8 (1M context)** — recorded exactly. The session model remains
  Opus 4.8 from the earlier mid-mission switch (Fable 5 credits exhausted); same Actor/
  session/conversation. Permitted: the Reviewer is a role, not a model brand. The Worker's
  patch also ran as Opus 4.8 and disclosed the same.
- Independence: this session authored none of the reviewed work; it is the same independent
  Reviewer that issued IR-F1/F2/F3 (my prior review is committed unmodified at
  `ada898e0212d2f36381b7609f9c612b53d1fa952` — `git diff ada898e HEAD` on it is empty). No
  self-review (I authored no candidate); read-only; no patch/dispatch/commit/product write.
- Reviewer writes this pass: only the two ALLOWED delta-review result/pointer files.

## 1. Ancestry, delta, and provenance (independently verified)

- Cosmile branch `shadow/m4-cosmile-memory`; HEAD == `NEW_SUBJECT_HEAD`
  `68cee5d46301e360f75d7a7d4c3ac1fd99b0b7dd`; tree clean except the six pre-existing
  untracked `app/docs/*.md` (untouched, unread as evidence).
- `git merge-base --is-ancestor b8f1c575 68cee5d` → yes; single follow-up commit `68cee5d`
  ("fix(m2-ab): patch IR-F1/F2/F3 …"), parent `b8f1c575` (not amended).
- `git diff --name-status b8f1c575..68cee5d` = **exactly the 8 declared paths, no others**
  (2 tests, 2 routes, service, 2 components, pure-state module). No schema/migration/
  dependency/env/design/unrelated-test change. Local `origin/shadow/m4-cosmile-memory` ==
  `68cee5d` (no fetch performed — corroborated from the mirror only, recorded honestly).
- Worker patch evidence read at foundation-docs `10cd22ad`; claims independently re-checked
  against source below (not trusted as prose).

## 2. Reproductions (authorized safe delta set, flags unset A/B=unset) and exclusions

- `npx vitest run m2_ab_commerce_evidence m2_ab_feedback_state` → **54/54 PASS**.
- `npx vitest run` six approved suites → **134/134 PASS** (+12 vs prior 122; regression clean).
- `node scripts/m2_ab_no_transport.mjs` → **PASS** (exit 0).
- `npx tsc --noEmit` → only the 7 pre-existing `foundation-memory-deanon.vitest.ts` errors
  (not in the delta, unmodified); **0 within the changed/allowlist files**.
- `git diff --check b8f1c575..68cee5d` → clean.
- Excluded, never PASS (matches handoff §5 and the Worker's honest labels): `npm run build`
  (NOT_RUN — `.env.local` autoload), ephemeral DB rehearsal (SKIP — no host Postgres),
  `.env`/secrets/network/real-DB (not opened/contacted), browser a11y automation (no
  isolated harness). Live rendered a11y behavior is therefore an honest limitation; the
  IR-F3-R1 defect below is proven by static render-path inspection, not a behavioral claim.

## 3. Per-finding disposition (before = `git show b8f1c575:…`, after = `68cee5d`)

### IR-F1 — actor-scoped consent read → **CLOSED**

- Fix: new pure `consentActorWhere(actor)` returns exactly one non-null predicate
  (`{subjectRef}` xor `{guestRef}`) — never an `OR`, never `undefined`, never `{}`; both-null
  → `{subjectRef:"__no_actor__"}` non-matching sentinel (fail-closed)
  (`commerceEvidenceService.ts:56-63`). Both routes now delegate their `where` to it
  (`feedback/route.ts:27`, `consents/route.ts:18`) — so the tested builder **is** the route
  query (this directly answers the handoff's "helper test not merely reproducing its own
  logic while leaving a different default route query untested"). `resolveEffectiveConsent`
  unchanged, now fed a correctly-scoped row set.
- Edge safety: the `__no_actor__` path is unreachable from either call site (submit enforces
  identity XOR at `:235-236`; revoke requires `userId`), so it is pure defense; a guest
  scopes to its own `{guestRef}` with no cross-guest collision.
- Test oracle is meaningful (not self-reproducing): asserts the predicate shape (single key,
  no `OR`/`undefined`/`guestRef` for identified), cross-actor non-match, **and** drives
  `submitPurchaseFeedback` end-to-end — store holds actor B's granted cross + actor A's
  same-service; A resolves no cross grant → fresh A grant appended (subjectRef=A) and
  envelope `captured_at=now`, never B's historic; **and** `revokeCrossServiceConsent` returns
  `already_not_granted` with zero appends when only B holds a grant. My original coverage gap
  (no end-to-end submit/revoke, no cross-actor fixture) is closed.

### IR-F2 — envelope consent provenance → **CLOSED**

- Fix (`commerceEvidenceService.ts:343-356`): `freshGrant = crossGrantRow != null`; a fresh
  grant uses `now` + the current notice constant, a pre-existing grant uses
  `effectiveCross.row.capturedAt` / `noticeVersion`.
- Edge safety (handoff §4): the pre-existing path (`crossGrantRow == null` with
  `grantEstablished === true`) is reachable only when `effectiveCross.state === "granted"`,
  which `resolveEffectiveConsent` returns only for a non-expired granted latest row —
  revoked/expired/missing all route to the fresh-append branch, so no revoked/expired
  timestamp can leak into a granted envelope. The `?? now` / `?? constant` fallback is
  unreachable on that path (the granted row is always present), so it cannot silently
  synthesize provenance on a path that claims an existing grant.
- Test oracle is a precise accept+reject pair: pre-existing grant → `grantRow==null` and
  envelope `captured_at`/`notice_version` == the historic row values (and `!= now`); fresh
  grant → `grantRow!=null` and `captured_at==now`, notice == current constant.

### IR-F3 — feedback UI contract + accessibility → **CLOSED EXCEPT IR-F3-R1**

Closed (verified in `PurchaseFeedbackPanel.tsx`): reviewed modal/bottom-sheet dialog with
`role=dialog`/`aria-modal`/`aria-labelledby`/`aria-describedby`/`aria-busy` (`:191`); heading
focused on open via effect + `tabIndex=-1` (`:153,197`); Tab focus trap with first/last wrap
(`:162-172`); Escape close blocked while busy + discard confirm when dirty (`:155-163`); close
restores focus to the still-mounted trigger via rAF (`:74-77`); `fieldset`/`legend` native
radio groups (`:251-264`); responsive sheet↔dialog (`items-end … min-[480px]:items-center`,
`max-h-[78dvh]`, independent body scroll, sticky title/action, safe-area padding, `:189-245`);
persistent `role=alert` adverse guidance base + severe/unknown (`:233-237`); correction and
retraction entry points with the exact §3.4 `RETRACTION_CONFIRM` + explicit ack
(`:113-120,205-211`); no raw-text field, no new consent purpose (radios/checkboxes only). The
pure `nextFocusAfterDismiss` (first→next, middle→next, last→previous, single→heading,
unknown→heading) is correct and unit-tested. Correction/retraction are executable by the
service (action=correct/retract reach `submitPurchaseFeedback`'s lineage path); flags stay
OFF and the server B-flag independently gates writes. The Worker's honest scope note
(cross-session pre-population would need a new server GET, deferred, out of allowlist) is a
reasonable limitation, not a named closure criterion.

Not closed — **IR-F3-R1** (handoff §4 named this exact edge). See §4.

## 4. Remaining finding

### IR-F3-R1 — last-card recommendation dismiss loses keyboard focus (blocking, narrow)

```text
TYPE: accessibility focus management (design §6) — the last-visible-card render path
SEVERITY: low (keyboard focus only, single edge, A flag OFF; role=status still announces)
PINNED:
  app/src/components/slice/ConsultFoundationResult.tsx:115 — `if (visible.length === 0)
    return <div … role="status">추천이 모두 숨겨졌어요.</div>;` (no ref, no tabIndex → not focusable)
  vs :131-134 — rAF focuses recHeadingRef when target === "__rec_heading__"
  vs :152 — recHeadingRef exists ONLY in the non-empty main return
FAILED SCENARIO: dismissing the final visible recommendation card →
  nextFocusAfterDismiss([lastId], lastId, "__rec_heading__") returns "__rec_heading__"
  (correct) → setDismissed re-renders to the visible.length===0 branch (:115), which
  UNMOUNTS the recHeadingRef heading → the queued requestAnimationFrame runs with
  recHeadingRef.current === null → focus falls to document.body. This is precisely the
  handoff's IR-F3 criterion "state update and early return must not unmount the intended
  focus target before requestAnimationFrame runs" / "restore focus to a still-mounted
  fallback heading/status when the last card is removed" — unmet for the last-card case
  (the multi-card next/previous cases are correct; only the terminal case fails).
REQUIRED PATCH: make the last-card fallback a still-mounted focusable element — e.g. give the
  :115 empty-state div a ref + tabIndex={-1} and focus it in the rAF when target resolves to
  the heading and visible has emptied; or keep the heading mounted above the empty-state so
  recHeadingRef survives. Preserve the role=status announcement.
ALLOWED PATCH PATHS: app/src/components/slice/ConsultFoundationResult.tsx
  (app/src/lib/purchaseFeedbackState.ts only if the fallback sentinel changes)
REQUIRED DELTA TEST: pure nextFocusAfterDismiss already covers single-card→heading; add an
  implementation-inspection assertion that the empty-card render path mounts a focusable
  heading/status target (rendered focus behavior is not executable without a browser lib —
  inspect statically).
```

Non-blocking IR-N1..N5 / IR-INFO1 from the original review were intentionally deferred by the
Worker (correct — they were not in this bounded patch scope) and remain open for a future
authorized pass.

## 5. Regression / scope / reward-hacking sweep over the delta

- Scope: exactly the 8 declared paths; no schema/migration/dependency/env/design/unrelated
  edit; historical migrations and forbidden models untouched (unchanged from base).
- No regression introduced: the two routes only replace the broadening OR with the scoped
  predicate; the service IR-F2 change only affects the pre-existing-grant envelope branch;
  ConsultFoundationResult changes are confined to refs + the dismiss handler (its
  generic/canonical emission and REV-F2 client-suppression logic are untouched); the
  PurchaseFeedbackPanel rewrite preserves the submit body contract and adds correct/retract.
  All prior 122 tests still pass within the 134.
- Reward-hacking: no `.skip/.only/.todo/xit`; assertion density grew (commerce_evidence and
  feedback_state); the new tests are accept+reject oracles (e.g. "captured_at must NOT equal
  now for a pre-existing grant", "revoke of a foreign-only grant → already_not_granted"),
  which genuinely protect IR-F1/F2. Not oracle-weakening.
- Prior PASSed axes (migration, containment, mutation-boundary, attribution, normalization)
  were not re-audited (delta discipline); the six-suite regression confirms they stay green.

## 6. Verdict rationale

The two substantive findings are fully and rigorously closed: IR-F1 (the consent-scoping
bypass) is fixed at the exact route query with a meaningful cross-actor behavioral oracle, and
IR-F2 (envelope consent provenance) is fixed with edge-safe handling of revoked/expired/missing
rows and a precise accept/reject test. IR-F3 is substantially implemented as the reviewed
modal/dialog with correct focus/trap/Escape/restoration, native radio groups, responsive
layout, adverse alert, and correction/retraction — but one handoff-named closure criterion,
the last-visible-card dismiss-focus fallback, is demonstrably unmet because the empty-state
early return unmounts the heading before the rAF focus call. Per delta-review discipline, one
NOT_CLOSED on a named criterion keeps the verdict at `NEEDS_PATCH`; the fix is a bounded,
single-file, same-Worker change. This is not `PASS` (a named criterion is unmet and a clean
PASS would green-wash the exact edge the handoff flagged), not `PASS_WITH_RISK` (a trivially
patchable keyboard-focus edge does not warrant Leo/GPT risk acceptance), and not `FAIL` (no
boundary breach; two of three findings are closed and the third is one narrow edge from done).

```text
VERDICT: NEEDS_PATCH
IR-F1: CLOSED
IR-F2: CLOSED
IR-F3: CLOSED except IR-F3-R1 (last-card dismiss focus fallback unmounts)
REMAINING_FINDING: IR-F3-R1 (blocking, narrow, bounded single-file patch)
NON_BLOCKING_DEFERRED: IR-N1..N5, IR-INFO1 (correctly out of this bounded scope)
REGRESSIONS_INTRODUCED: 0
SCOPE: exactly the 8 declared paths
REPRODUCED: vitest 54/54 + 134/134, scanner PASS, tsc 0-in-allowlist, git diff --check clean
EXCLUDED (never PASS): npm run build, ephemeral DB rehearsal, browser a11y automation
PRODUCT_REPO_WRITE_STATUS: ZERO (Cosmile HEAD unchanged at 68cee5d; only pre-existing untracked docs)
SECRET_ENV_PII_ACCESS: ZERO
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: max  ·  SKILL: /fable-sentinel
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
