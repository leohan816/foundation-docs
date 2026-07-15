# M2 A/B — Independent IR-F3-R1 Final Delta Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-COSMILE-FOCUS-DELTA-REVIEW-001
REVIEW_PASS: DELTA_REVIEW (same-Reviewer, IR-F3-R1 only)
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
IR-F3-R1: CLOSED
A/B IMPLEMENTATION REVIEW GATE: CLOSED (all findings closed; subject to honest exclusions + deferred non-blocking IR-N1..N5/INFO1)
```

## 0. Live runtime and independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window=@5 pane=%5` — matches handoff.
- Workspace: `/home/leo/Project/Cosmile`. Effort: `max`. Skill: `/fable-sentinel`
  (delta-review reference applied).
- **ACTUAL_MODEL: Opus 4.8 (1M context)** — recorded exactly; unchanged from the earlier
  mid-mission switch (Fable 5 credits exhausted); same Actor/session/conversation; role ≠
  model brand.
- Independence: same independent Reviewer that raised IR-F3-R1; authored no candidate; my
  prior delta review is committed unmodified at `37c9e194…` (NEEDS_PATCH, IR-F3-R1). Read-only;
  no patch/dispatch/commit/product write. Reviewer writes only the two ALLOWED files.

## 1. Ancestry and delta (verified)

- Cosmile `shadow/m4-cosmile-memory`; HEAD == `f26fa5ced7083bb8d0af00bda2a54951923ea22f`;
  tree clean except the six pre-existing untracked docs.
- `git merge-base --is-ancestor 68cee5d f26fa5c` → yes; single commit `f26fa5c`
  ("fix(m2-ab): IR-F3-R1 — keep last-card dismiss focus on a mounted empty-state target").
- `git diff --name-status 68cee5d..f26fa5c` = **exactly the two declared paths**
  (`ConsultFoundationResult.tsx`, `m2_ab_feedback_state.vitest.ts`), +28/−1. No other file,
  no schema/route/service/consent/dependency/env change; IR-F1/IR-F2 code untouched (not
  reopened).
- Worker focus-patch evidence read at foundation-docs `f64321d5`; claims re-checked against
  source below, not trusted as prose.

## 2. IR-F3-R1 closure against the handoff §3 criteria

Fix (`ConsultFoundationResult.tsx:115`), before = `git show 68cee5d:…`, after = `f26fa5c`:
the `visible.length === 0` empty-state changed from
`<div className="…" role="status">추천이 모두 숨겨졌어요.</div>` to
`<div ref={recHeadingRef} tabIndex={-1} className="… outline-none" role="status">…</div>`.

1. **Empty final-card state mounts the same fallback ref the rAF uses, focusable** — PASS.
   The dismiss handler's rAF focuses `recHeadingRef.current` when `nextFocusAfterDismiss`
   returns `"__rec_heading__"` (the last-card case); the empty-state now carries
   `ref={recHeadingRef}` and `tabIndex={-1}`, so on the last dismiss React mounts this div,
   attaches `recHeadingRef`, and the queued rAF focuses it instead of `null` — no leak to
   `document.body`.
2. **`role=status` remains** — PASS (retained on the same element; the AT announcement is
   preserved).
3. **React commit precedes rAF** — PASS. `setDismissed` triggers a synchronous commit of the
   empty-state (ref attached) before the browser runs the queued `requestAnimationFrame`
   callback; standard ordering makes `recHeadingRef.current` populated when the rAF fires.
4. **Empty and non-empty branches mutually exclusive** — PASS. The `visible.length === 0`
   path `return`s early, so the main (non-empty) return — which also binds `recHeadingRef`
   on its heading (`:152`) — never renders in the same pass; `recHeadingRef` is attached to
   exactly one mounted element at any render, never two.
5. **Multi-card next/previous focus, emission, dismiss, all other code unchanged** — PASS.
   The component diff is only the single empty-state line; `nextFocusAfterDismiss`, the card
   refs, the rAF handler, click/save/cart emission, and the main return are byte-unchanged.
6. **Inspection oracle fails at 68cee5d, passes at f26fa5c, no weakened assertions** — PASS.
   The new static render-path oracle in `m2_ab_feedback_state.vitest.ts` reads the component
   source, matches the empty-state tag, and asserts it contains `ref={recHeadingRef}`,
   `tabIndex={-1}`, and `role="status"`. Verified against the old blob: `68cee5d`'s
   empty-state contained only `role="status"` (no `ref`/`tabIndex`), so the two new
   assertions **fail at old**; they **pass at new**. Additive only — the prior
   `nextFocusAfterDismiss` pure assertions (first→next, middle→next, last→previous,
   single→heading, unknown→heading) are unchanged.

## 3. Reproductions (authorized safe set, flags unset A/B=unset) and honest limitation

- `npx vitest run scripts/m2_ab_feedback_state.vitest.ts` → **21/21 PASS** (was 18; +3 for
  the IR-F3-R1 oracle).
- `npx vitest run m2_ab_commerce_evidence + m2_ab_feedback_state` → **57/57 PASS** (was 54;
  +3; IR-F1/F2 oracles still green).
- `node scripts/m2_ab_no_transport.mjs` → **PASS** (exit 0).
- `npx tsc --noEmit` → 0 errors in changed/allowlist files (only the 7 pre-existing
  `foundation-memory-deanon.vitest.ts` errors remain, unmodified, not in the delta).
- `git diff --check 68cee5d..f26fa5c` → clean.
- Honest limitation (unchanged from prior): rendered focus behavior is not executed (no
  browser test lib — design §12.8). IR-F3-R1 is verified by static render-path inspection
  (the fallback ref/tabIndex/role are mounted on the empty-state) plus the pure
  `nextFocusAfterDismiss` logic. Build (`.env.local` autoload) and ephemeral DB rehearsal
  remain honest exclusions, never PASS.

## 4. Regression / scope / reward-hacking sweep

- Zero regression: one-line component change confined to the empty-state element; no behavior
  outside the last-card focus path is altered; 57/57 with all prior assertions intact.
- Scope: exactly the two declared paths; IR-F1/IR-F2 and the rest of the A/B implementation
  were not reopened or modified.
- No reward-hacking: no `.skip/.only/.todo`; the oracle is additive and genuinely
  fails-at-old / passes-at-new; it protects the exact contract (the rAF focus target must be
  a mounted focusable element). Its static-source nature is the handoff-accepted mechanism
  given no browser lib, and its own comment records the static-vs-rendered limitation.

## 5. Verdict rationale and gate status

IR-F3-R1 — the last-visible-card dismiss focus leak — is fixed exactly as the prior review
required and as the handoff §3 criteria demand: the empty-state now mounts the same
`recHeadingRef` the rAF focuses, keeps `role=status`, and the branches remain mutually
exclusive, so keyboard focus lands on the mounted status element rather than `document.body`.
The change is minimal, introduces no regression, holds scope to the two declared files, and is
protected by a fails-at-old/passes-at-new inspection oracle without weakening prior
assertions. This is `PASS` (the sole remaining finding is closed) — not `NEEDS_PATCH` (nothing
unmet), not `PASS_WITH_RISK` (no residual needing risk acceptance beyond the already-recorded
honest exclusions), not `FAIL`.

With IR-F1 and IR-F2 closed in the prior delta review and IR-F3 (including IR-F3-R1) now
closed, the **A/B implementation review gate is CLOSED**, subject to:

- the already-recorded honest exclusions — production `npm run build` (NOT_RUN_SAFETY_UNPROVEN),
  ephemeral DB forward/down/forward apply (SKIP_INFRA_UNAVAILABLE), and rendered browser a11y
  behavior (not executed; static + pure verification only);
- deferred non-blocking findings IR-N1..N5 and IR-INFO1, which remain open for a future
  authorized pass and do not block this gate.

This Reviewer PASS is not final approval and authorizes nothing further: C implementation,
Foundation intake, outbox consumer/delivery, network, real-DB/migration apply, feature-flag
activation, production/live, and Package 1B all remain HARD-STOPPED under the mission's staged
order and require separate Leo/GPT approval via the Advisor.

```text
VERDICT: PASS
IR-F3-R1: CLOSED
A/B_IMPLEMENTATION_REVIEW_GATE: CLOSED (IR-F1/F2/F3 all closed)
SUBJECT_TO: honest exclusions (build NOT_RUN, DB rehearsal SKIP, browser a11y not executed) + deferred non-blocking IR-N1..N5/INFO1
REGRESSIONS_INTRODUCED: 0
SCOPE: exactly the 2 declared paths
REPRODUCED: vitest 21/21 + 57/57, scanner PASS, tsc 0-in-allowlist, git diff --check clean; oracle fails-at-68cee5d / passes-at-f26fa5c
PRODUCT_REPO_WRITE_STATUS: ZERO (Cosmile HEAD unchanged at f26fa5c; only pre-existing untracked docs)
SECRET_ENV_PII_ACCESS: ZERO
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: max  ·  SKILL: /fable-sentinel
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
FINAL_APPROVAL: remains Leo/GPT via foundation-advisor (this PASS is not final approval)
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
