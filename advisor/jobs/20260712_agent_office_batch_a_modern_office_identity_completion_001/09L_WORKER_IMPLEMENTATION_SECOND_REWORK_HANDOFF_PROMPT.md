TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing `agent-office-opus` Worker session
Do not paste into: Advisor, Control, Reviewer, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A — Second Implementation Rework

Use `/fable-builder` in the existing `agent-office-opus` session.

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Mode: bounded routine implementation rework. No redesign, review, risk
acceptance, Founder approval, or Batch B-E work. Use no agent, sub-agent,
delegated context, or temporary session.

## Exact Base

- Repository/worktree: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Required clean base: `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Prior Sentinel result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`
- Advisor validation:
  `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/56_ADVISOR_SENTINEL_IMPLEMENTATION_DELTA_VALIDATION.md`

Read those exact artifacts and current accepted Batch A design/contracts. Do
not execute from memory. Before editing verify clean HEAD/upstream, exact model
and effort, `/fable-builder`, no concurrent writer, no Grok reuse, and no input
to the excluded historical `agent-office` session.

## Required Patch I2-1 — One Truthful Renderer State

1. The authenticated parent/HUD must not initialize or visibly advertise
   `WEBGL`/`CANVAS` before successful child `onInit`.
2. Use an explicit pending/unknown presentation until success; use the actual
   fallback state/reason after failure or timeout.
3. Host DOM status, HUD badge, semantic mirror, and accessible text must agree.
4. Add composed/authenticated tests for delayed/unresolved initialization,
   successful initialization, and failure/fallback. Do not weaken strict CSP,
   lazy Pixi isolation, timeout, context-loss, Canvas-subset, or M1 fallback.

## Required Patch I2-2 — Readable, Associated Actor Labels

Preserve every required truthful first-layer fact and the 17-field drawer, but
repair the visual presentation rather than hiding facts or lowering checks.

Required outcomes:

1. Normal desktop text is readable; no actor-label fact/source text may remain
   at the sub-10-pixel sizes reproduced by Sentinel.
2. Card descendants must not overflow their card. Cards must not overlap each
   other, actors, or critical symbolic work surfaces unacceptably.
3. A displaced label must remain visibly associated with its actor, for example
   by a connector or an equally clear deterministic mechanism.
4. Mobile must expose an equivalent truthful first layer for every actor that
   remains visually present. A bounded selected-Pod/focus presentation is
   allowed only if it follows the already accepted responsive Team-Pod rules
   and does not silently hide visible actors or facts.
5. At 200-percent text, content must reflow or use the accepted semantic/static
   equivalent without spilling, overlap, severe word fragmentation, or Office
   occlusion. Do not claim closure from Axe or horizontal overflow alone.
6. Office world remains primary; labels and technical details remain secondary.
7. Keyboard, drawer focus restoration, reduced-motion, static, forced-colors,
   screen-reader meaning, and no-color-only meaning remain intact.

Add deterministic browser assertions for content containment, actual computed
font sizes, label/actor association distance or connector presence, mobile
coverage, 200-percent reflow, and overlap/occlusion. Generate fresh unmasked
desktop, mobile, and 200-percent visual evidence and inspect it directly.

## Required Patch I2-3 — Exact Total Pre-Assembly Validation

Before assembly, validate the complete accepted input contract:

1. committed pod ordering and `selectedDefaultPodId` existence/canonical-first
   invariant;
2. exact selection object shape and keys;
3. selected ID type/shape;
4. cross-pod actor membership uniqueness;
5. responsible Advisor membership and every existing accepted Team invariant;
6. existing exact layout/identity/role-map checks.

Malformed selection records, arrays, extra keys, wrong selected ID types,
invalid committed defaults, and membership conflicts must return deterministic
fail-closed results and never throw. Preserve the documented behavior for a
well-formed but unknown selectedPodId string: fall back to the valid committed
default. Add direct parser-level hostile tests for every case.

## Required Patch I2-4 — Channy Composition Parity and Honest Production Copy

1. Propagate every meaningful composed Channy state change to the semantic
   consumer so canvas and text agree throughout all eight production states.
2. Do not create a 30fps React update or excessive live-region announcement
   stream; update semantic state only at a bounded meaningful transition.
3. Add authenticated composition tests proving all eight states, pixel/semantic
   agreement, continuous motion, and `authorityRole: none`.
4. Replace false authenticated copy such as `Prototype status`, `TOUR RUNNING`,
   and `Accessible synthetic fixture mirror` with accurate continuous
   fixture-free production wording. Do not change the actual prototype route.
5. Make the accepted original pixel Bedlington recognizable in directly
   inspected desktop and mobile evidence without turning it into an operational
   actor or allowing it to displace required operational information.
6. Preserve all no-command/no-inference/no-watchdog/non-operational boundaries.

## Allowed Source Scope

Only as needed for I2-1 through I2-4:

- `src/ui/pixel/production-pixel-world-scene.tsx`
- `src/ui/pixel/pixel-render-host.tsx`
- `src/ui/pixel/living-office-hud.tsx`
- `src/ui/pixel/living-office-actor-overlay.tsx`
- `src/ui/pixel/living-office-semantic-mirror.tsx`
- `src/ui/pixel/channy-sprite.tsx`
- `src/ui/pixel/living-office.css`
- `src/application/organization/production-render-input.ts`
- directly coupled existing unit/contract/E2E test files and the two already
  authorized Batch A baseline directories;
- the same four Batch A as-built docs changed by the prior rework.

If another source path is genuinely required, stop before editing it and return
the exact technical scope conflict to Advisor. Do not silently broaden scope.

## Forbidden

- package/lock/dependency/TypeScript/Playwright config/CSP weakening;
- `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, skip, mask, threshold-only
  evidence weakening, hidden facts, or stale media reuse;
- prototype entry/fixture behavior changes;
- auth, command, browser dispatch, DB/schema, secret, remote/public/prod,
  Hermes, PWA authority, or Batch B-E work;
- Grok pilot code; excluded historical `agent-office` input;
- agents/sub-agents; self-review; risk acceptance; force push; main/protected
  branch action; final approval.

## Required Gates and Evidence

At minimum rerun and report honestly:

- focused I2-1/I2-2/I2-3/I2-4 tests;
- `npm run check` with exact file/test totals;
- CD-3 6/6;
- authenticated Living Office E2E;
- composed E2E;
- prototype E2E load-bearing/full suite because shared renderer/visual code is
  touched;
- demo E2E;
- production build followed by loopback rehearsal;
- desktop/mobile/200-percent/reduced/static/forced-colors accessibility and
  direct unmasked visual evidence;
- Channy state/parity/motion evidence;
- `git diff --check`, forbidden-path/suppression checks, clean worktree,
  non-force push, local/upstream equality, rollback.

Record every failed command and its resolution. Do not misreport line/reporter
attachments as durable artifacts; preserve exact inspectable local paths and
hashes for current visual evidence.

## Result Contract

Write the long result to:

`/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_SECOND_REWORK_RESULT.md`

Write the pointer to:

`/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/16_WORKER_SECOND_REWORK_RESULT_POINTER.md`

Commit and non-force push the authorized candidate branch. Commit and push only
the exact foundation-docs result/pointer files with explicit path staging.
Preserve unrelated foundation-docs dirt. Return the pointer to Advisor and
STOP. Independent same-session Sentinel re-review remains external.
