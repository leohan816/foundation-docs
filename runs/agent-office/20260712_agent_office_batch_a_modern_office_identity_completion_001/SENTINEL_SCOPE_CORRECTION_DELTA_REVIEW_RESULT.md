# Sentinel Narrow Delta Review — Actor-Overlay Scope Correction

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_ACTOR_OVERLAY_SCOPE_CORRECTION_DELTA`

Verdict: `PASS`

Actor: independent Sentinel re-review

Session: separate existing `foundation-reviewer-sol` role session

Return to: Advisor

This verdict covers only the exact documentation scope correction at the after
commit. It is not implementation, implementation review, risk acceptance, final
approval, or permission from Sentinel to start or complete BA-WU-01..09.

## 1. Exact candidate and evidence inspected

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `381b41184994da161db3f5e80f0952f82450925e`
- After: `453c661c4f4243c77b2f53089ec599561876b06f`
- After/upstream at review: equal (`0 0`); target worktree clean before and
  after inspection.
- Exact delta: the same four canonical design documentation paths, `+21/-10`.
- `git diff --check 381b411..453c661`: clean.
- Non-documentation delta: zero.

Read directly and commit-fixed where applicable:

1. `29_ADVISOR_WORKER_SCOPE_EXCEPTION_VALIDATION.md`;
2. `30_ADVISOR_CONTROL_SCOPE_CORRECTION_VALIDATION.md`, as routing claims rather
   than proof;
3. the complete exact four-file before/after delta and relevant after snapshots;
4. `src/ui/pixel/living-office-actor-overlay.tsx`;
5. `src/ui/pixel/living-office-detail-drawer.tsx`;
6. `src/ui/pixel/actor-sprite.tsx`;
7. `src/ui/pixel/prototype-entry.tsx`, for read-only composition evidence;
8. `tests/ui/pixel-actor-overlay.test.tsx`;
9. `tests/ui/pixel-world-semantic-parity.test.tsx`; and
10. `SENTINEL_DESIGN_FOURTH_DELTA_REREVIEW_RESULT.md` for the preserved U1–U3,
    S3, R2, T3, and boundary baseline.

## 2. Required-question answers

| # | Review question | Answer | Evidence/result |
|---|---|---|---|
| 1 | Is `living-office-actor-overlay.tsx` the actual existing compact-label and actor-dialog host? | `YES` | It owns camera-transformed label placement, renders every visible actor as `living-office-actor-label`, opens `living-office-actor-detail-heading` with `role="dialog"`, traps Tab/Escape, and restores invoker focus (`453c661:...actor-overlay.tsx:48-189,191-349`). |
| 2 | Are the two tests directly coupled to the corrected surfaces? | `YES` | `pixel-actor-overlay.test.tsx` imports the overlay/placement engine and covers labels, placement, camera movement, actor dialog, focus, provenance, and static tier. `pixel-world-semantic-parity.test.tsx` imports the semantic mirror/HUD and the separate `LivingOfficeDetailDrawer`, covering frame/entity correspondence, frame evidence, focus, and content-safety. |
| 3 | Does BA-WU-03/04 use one existing host without reinventing placement? | `YES` | Both WorkUnits now name `living-office-actor-overlay.tsx`; the existing `layoutPixelActorLabels`/imperative `updatePositions` path remains the single label-placement engine. No new component or parallel placement path is proposed. |
| 4 | Is `living-office-detail-drawer.tsx` accurately preserved as the technical panel? | `YES` | Actual fields are frame contract, frame key, projection revision, logical time, cue IDs, route, evidence classification, and fallback; its UI labels itself “Secondary DOM technical panel.” It is not actor-specific. |
| 5 | Is `prototype-entry.tsx` still forbidden for modification? | `YES` | It remains absent from the writable list; §14.4 and WU-03/WU-04 explicitly say it is composition evidence only / do not edit. |
| 6 | Is scope literal and closed with no wildcard authorization? | `YES` | The correction adds one literal source path and two literal test paths. The existing closed enumeration and Advisor-amendment rule remain; wildcard strings appear only in explicit prohibitions/history. |
| 7 | Are prior closures and accepted boundaries preserved? | `YES` | U1–U3/S3/R2/T3 contract text is unchanged except the new §2.7 landing-site note; no changed line weakens the accepted product, security, authority, accessibility, fallback, Channy, rollback, no-Grok, excluded-session, or Batch B–E boundaries. |
| 8 | Does the correction avoid implementation, product/authority change, security risk, and accept-risk residuals? | `YES` | Four docs only; it corrects existing component/test ownership and grants no new behavior, authority, data source, protected content, or external access. No residual risk requires Leo/GPT acceptance. |
| 9 | Can the same Worker resume without inventing component ownership? | `YES` | WU-03 and WU-04 now specify the existing overlay as the exact landing site, distinguish the frame panel, name both coupled tests, and forbid modifying the prototype composer. Component ownership is deterministic. |

## 3. Actual composition and ownership

### Actor overlay

`living-office-actor-overlay.tsx` is the real existing DOM overlay, not a planned
name. It:

- consumes the current `PixelWorldFrameV1`, projection, and viewport;
- uses `cameraTransform` and its own deterministic `layoutPixelActorLabels` to
  place and update actor labels;
- renders role/model/session/state, glyph, ring, and provenance on actor buttons;
- selects by `roleInstanceId` and renders the actor-specific accessible dialog;
- owns Escape, Tab containment, close-button focus, and invoker focus restoration;
  and
- exposes `updatePositions` for visual-frame camera tracking.

The existing dialog currently has the earlier ten synthetic-prototype fields.
That does not contradict the correction: BA-WU-04's implementation task is to
expand this exact existing dialog to the already-approved 17-field contract.
The correction identifies where that change belongs; it does not falsely claim
the 17-field implementation already exists.

### Sprite and prototype composer

`actor-sprite.tsx` is a Pixi graphics drawing function. It draws the actor,
identity pattern, animation props, and status markers; it cannot own accessible
DOM labels or a dialog. Keeping it as a coupled WU-03 visual surface does not
compete with the overlay's explicit DOM ownership.

`prototype-entry.tsx:19-25,194-218,274-281` imports and composes the actor overlay,
technical drawer, HUD, semantic mirror, and pixel chunk. It also forwards visual
frames to the overlay handle. This proves the composition relationship while the
corrected design explicitly keeps the prototype entry read-only.

### Separate technical drawer

`living-office-detail-drawer.tsx` is frame-scoped. It receives a whole frame,
contains no actor selector, and renders frame/evidence diagnostics. The
correction consistently calls it a separate non-duplicating frame/evidence
technical panel. It no longer competes with the actor-specific drawer contract.

## 4. Coupled-test ownership

`tests/ui/pixel-actor-overlay.test.tsx` directly imports
`LivingOfficeActorOverlay`, `layoutPixelActorLabels`, and
`pixelActorLabelPlacementsOverlap`. Its four tests verify deterministic
non-overlap, camera tracking, redundant facts/glyph/ring, actor-dialog facts and
provenance, close focus restoration, DOM-static semantics, and imperative
position updates. It is the direct test owner for BA-WU-03/04 overlay behavior.

`tests/ui/pixel-world-semantic-parity.test.tsx` directly imports
`LivingOfficeHud`, `LivingOfficeSemanticMirror`, and
`LivingOfficeDetailDrawer`. It verifies the exact frame/entity/text
correspondence, the distinct frame-evidence drawer and focus behavior, and the
absence of private locator/credential/terminal-derived content. It is the direct
coupled test for the separate semantic/frame-panel side of the composition.

The corrected WorkUnit plan can extend these existing tests for the approved
17-field and parity acceptance matrices without inventing a new test owner.

### Focused execution attempt

Attempted:

```text
npm exec -- vitest run tests/ui/pixel-actor-overlay.test.tsx tests/ui/pixel-world-semantic-parity.test.tsx
```

Result: not reproduced. The target worktree has no installed project dependency
tree. `npm exec` obtained an isolated Vitest 4 binary, but repository
`vitest.config.ts` could not resolve its own `vitest/config`, causing startup
`ERR_MODULE_NOT_FOUND` before collection. No test pass/fail count is claimed.
The attempt changed no tracked or untracked target-repo file. This environment
limitation does not leave a design uncertainty because source/test coupling is
directly established by commit-fixed imports and assertions; the later Worker
and implementation-review gates still own executable test evidence.

## 5. Closed scope and preservation check

The after design adds exactly:

- writable source: `src/ui/pixel/living-office-actor-overlay.tsx`;
- writable tests: `tests/ui/pixel-actor-overlay.test.tsx` and
  `tests/ui/pixel-world-semantic-parity.test.tsx`; and
- cross-document WU-03/WU-04/§2.7/§14.4/FEATURE_INDEX traceability for those
  existing surfaces.

All three paths exist at the after commit. `prototype-entry.tsx` is not added.
The source and test lists remain literal; no deferred class or wildcard is
introduced.

The exact delta does not alter evidence arbitration, runtime truth ownership,
operational-state projection, historical-rule precedence, Office-first behavior,
secondary-view reachability, eager-shell isolation, authentication, authority,
security, transport, accessibility, semantic/static fallback, Channy,
rollback, no-Grok, excluded-session, or Batch B–E rules. U1–U3, S3, R2, and T3
remain closed, and no regression was found.

## 6. Verdict rationale, exclusions, and routing

`PASS` is warranted because the correction now maps the approved compact-label
and 17-field actor-dialog requirements to the actual single existing DOM host,
accurately separates the frame/evidence panel, names the two direct coupled test
owners, retains a literal closed scope, and creates no regression or residual
risk requiring acceptance.

Excluded: implementation, source/test/config/package/media mutation, server or
browser execution, dependency installation into the repository, DB/schema/
migration, secrets/credentials, remote/public/live access, transport input,
protected branch/main, Batch B–E, implementation review, risk acceptance, final
approval, and next-mission selection.

This `PASS` clears only this narrow independent design-delta review. Advisor must
validate the result and issue any corrected Worker handoff. Sentinel did not
patch Agent Office, authorize implementation independently, accept risk, or
grant final approval.

`RETURN_TO: Advisor`

`STOP`
