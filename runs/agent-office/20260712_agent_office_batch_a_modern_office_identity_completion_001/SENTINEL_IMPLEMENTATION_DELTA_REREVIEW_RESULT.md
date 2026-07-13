# Sentinel Implementation Delta Re-Review — Agent Office Batch A

Review pass: IMPLEMENTATION_REVIEW

Verdict: NEEDS_PATCH

Actor: Independent Sentinel-ReReview

Session: separate existing foundation-reviewer-sol role session

Model / effort: GPT-5.6 SOL, xhigh

Return to: Advisor

This is an independent read-only implementation, security, accessibility, and
visual delta re-review. It is not a candidate patch, risk acceptance, Founder
approval, merge/deploy authorization, or permission to start Batch B–E.

## 1. Exact target, provenance, and scope

- Target repo: /home/leo/Project/agent-office-batch-a-001
- Branch: batch-a/modern-office-identity-001
- Original Batch A base: ac8ba75d3a128385beaeeac58ae5bf54c03d23f2
- Prior reviewed candidate: 0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760
- Rework candidate: 74d586660c8fc55c04bcaca6f7442cd14218eb33
- Candidate parent: exactly 0b2f923a8456eea9b2b7df5b4cec1ae8c6d26760.
- Candidate is 31 commits after ac8ba75. Both ac8ba75 and 0b2f923 are
  ancestors.
- Rework diff: 34 files, 632 insertions, 78 deletions. git diff --check passed.
- Push evidence at review completion: local HEAD, configured upstream,
  remote-tracking ref, and direct git ls-remote all resolve to
  74d586660c8fc55c04bcaca6f7442cd14218eb33. The single-parent rework is a
  fast-forward from the prior candidate, not a force rewrite.

Directly read and compared:

1. the exact 07L handoff, prior Sentinel implementation result, Worker rework
   result, Advisor validation 55, Advisor finding validation 54, and exact
   Worker rework handoff 09K;
2. the candidate diff 0b2f923..74d5866, changed source/tests/docs/baselines,
   accepted Batch A architecture/identity contract/WorkUnit requirements, and
   load-bearing renderer, clock, overlay, semantic mirror, CSP, PWA, and runtime
   composition code;
3. the provided Advisor HTML report and its unmasked desktop/mobile PNGs, whose
   sizes and SHA-256 values reproduce exactly; and
4. fresh authenticated desktop, mobile, forced/static/Axe, 200-percent text,
   canvas-motion, hostile-input, test, Git, and loopback evidence.

All source references below identify the candidate snapshot 74d5866 unless a
different commit is named. No target source or test was patched.

## 2. Finding closure summary

| Finding | Delta status | Severity | Direct conclusion |
|---|---|---:|---|
| SIR-1 | PARTIAL__BLOCKING | MEDIUM | Strict-CSP Pixi initialization and host DOM status are fixed, but the authenticated HUD still initializes and visibly advertises WEBGL before onInit succeeds. |
| SIR-2 | PARTIAL__BLOCKING | HIGH | Light theme, navigation, contrast, and Axe automation are fixed; actual normal/mobile/200-percent pixels fail readable compact-label, reflow, actor tracking, and Office-first occlusion requirements. |
| SIR-3 | CLOSED | — | The production mask was removed; the real strict-CSP runtime now proves onInit, intrinsic sizing, nonblank rendering, motion, zero page/CSP/renderer errors, and preserves unmasked artifacts. |
| SIR-4 | PARTIAL__BLOCKING | MEDIUM | The original throw and empty role map are fixed, but complete pre-assembly validation is still false: invalid committed defaults, malformed selection shapes, and cross-pod membership conflicts can return ok:true. |
| SIR-5 | REGRESSION | MEDIUM | The pure projector now has eight non-operational states, but composition updates only pixels/label positions; the semantic Channy remains STOP while the canvas moves, and authenticated production retains inaccurate prototype/tour/fixture labels. |

Any PARTIAL__BLOCKING or REGRESSION prevents PASS. The defects remain patchable
inside the already authorized Batch A source/test/product scope, so FAIL is not
warranted.

## 3. SIR-1 — PARTIAL__BLOCKING

### Closed portions

- The server CSP remains unchanged at src/server/security/headers.ts:3-16:
  script-src 'self', with no unsafe-eval token.
- src/ui/pixel/production-pixel-office-chunk.tsx:8-14 imports the installed
  public package-root export pixi.js/unsafe-eval inside the sole production
  lazy entry. The installed export resolves to lib/unsafe-eval/init.mjs, which
  installs static shader/uniform/UBO/particle polyfills and does not execute
  Function/eval. Package and lock files are unchanged.
- CD-3 remains 6/6. The eager graph remains Pixi-free and the compatibility
  registration stays in the production lazy subtree.
- The real strict-CSP authenticated runtime initializes successfully. Fresh
  direct evidence found no pageerror and no CSP/Pixi/WebGL console error;
  desktop intrinsic/client canvas was 1436x558/1436x558 and mobile was
  386x430/386x430.
- PixelRenderHost now gates its own public DOM state on successful onInit:
  src/ui/pixel/pixel-render-host.tsx:158-179 sets initialized only after the
  application exists, while lines 195-198 expose PENDING/PIXEL_INITIALIZING
  before that point.
- Synchronous error-boundary, eight-second unresolved initialization timeout,
  context-loss, requested Canvas-subset, and forced failure paths all select
  DOM_STATIC in source (pixel-render-host.tsx:99-119,141-179,202-217). The shared
  host context-loss/Canvas/static behaviors reproduced in the 20/20 prototype
  suite.

### Remaining blocking closure gap

The claim that backend is never advertised before initialization is not true
for the actual authenticated surface. ProductionPixelWorldScene initializes
its parent backend state to WEBGL before its child host calls onBackend
(src/ui/pixel/production-pixel-world-scene.tsx:39-40), and immediately passes
that state to LivingOfficeHud at lines 55-62. LivingOfficeHud renders the value
as a visible badge (src/ui/pixel/living-office-hud.tsx:27-30). Therefore a slow
or unresolved initialization can show WEBGL for up to the eight-second timeout
while the adjacent host truthfully says PENDING/PIXEL_INITIALIZING.

The focused lifecycle test at tests/ui/pixel-renderer-lifecycle.test.tsx:58-74
only searches the host source text. The authenticated E2E waits for PIXEL_READY
before observing the badge (tests/e2e/living-pixel-office.spec.ts:130-157), so
neither test catches this split-brain public state.

Required closure: make the parent/HUD backend pending or hidden until successful
onInit, and exercise the visible authenticated surface under delayed/unresolved
initialization as well as success/failure. Do not weaken CSP.

## 4. SIR-2 — PARTIAL__BLOCKING

### Closed portions

- The production living-office-surface now owns readable light-office tokens
  and foreground; navigation has responsive, hover, current, and focus-visible
  rules. The prior inherited light-on-light contrast failure is gone.
- Reproduced full-surface Axe returned zero WCAG A/AA findings for ordinary
  desktop, mobile, forced-colors, reduced/static, and the automated 200-percent
  state. Navigation text/focus is readable.
- The contrast patch does not erase the semantic mirror in the ordinary or
  forced-color state.

### Actual-pixel failure that Axe misses

The required manual visual/product check fails. The label implementation fixes
every actor card at 172x78 while packing role, display name, six compact facts,
and source labels into 0.58rem/0.46rem text
(src/ui/pixel/living-office-actor-overlay.tsx:24-35,242-256;
src/ui/pixel/living-office.css:347-444). The placement algorithm avoids
label-label rectangle intersections, but when no nearby slot is open it can
move a card to a distant grid slot (living-office-actor-overlay.tsx:324-399),
with no visible connector to its actor.

Fresh browser measurements and direct pixel inspection:

- Desktop 1440x900: eight visible cards occupy 13.4 percent of the 1436x558
  stage. Main fact text is 9.28 px and source text 7.36 px. Label-label rectangle
  overlap is zero, but all eight cards contain descendants extending beyond the
  fixed card box, and anchor-to-card distance reaches 187 px. The cards cover
  actors, desks, and symbolic work surfaces heavily enough that the Office is
  no longer plainly primary.
- Mobile 390x844: only four of eight actor labels are visible. The four fixed
  cards occupy 32.3 percent of the 386x430 stage, and a card can be 241 px from
  its actor anchor. The unmasked view cannot visually associate all cards to
  actors and does not preserve an equivalent first information layer.
- 200-percent text: the card box remains 172x78 while compact text grows to
  18.56 px and source text to 14.72 px. Every card's contents spill below the
  card and overlap other labels, actors, desks, and the Office. The HUD also
  undergoes severe word fragmentation. This is loss/occlusion at 200-percent
  resize, not a clean WCAG 1.4.4 reflow merely because Axe and horizontal-width
  checks pass.

The provided unmasked PNGs independently show the same normal-scale density.
Their evidence is valid, but it proves a defect rather than acceptable pixels:

- desktop SHA-256 89ae1c403b35a7e421e011fde4d4cead304bd24ed3c070886e99395868e16fe8,
  288734 bytes;
- mobile SHA-256 89c71b95a4710cff0b48fcb7bc823c3b6401cb818c8c214b51868ac76f9dd916,
  147201 bytes.

Required closure: preserve the exact first-layer facts without sub-10-pixel
text, overflow, distant unconnected placement, or Office/actor occlusion;
define an equivalent mobile density/focus behavior; add actual 200-percent
reflow/overlap/content-visibility assertions and directly inspected pixels.
Axe alone is insufficient.

## 5. SIR-3 — CLOSED

- tests/e2e/living-pixel-office.spec.ts contains no canvas mask. It records
  page/console errors from load, requires data-pixel-canvas after onInit,
  PIXEL_READY, WEBGL/CANVAS, non-default intrinsic dimensions, a large
  compositor canvas capture, and differing live frames
  (lines 120-165).
- tests/e2e-composed/application-office-scene.spec.ts likewise removes the
  canvas mask, requires the initialized canvas and PIXEL_READY, checks a
  nonblank capture, and attaches the unmasked full page (lines 453-466).
- The original SIR-1 blank/default-size/false-ready failure cannot satisfy the
  combined onInit attribute, intrinsic-size, PIXEL_READY, no-pageerror, and
  nonblank assertions.
- Reproduced Living Office 3/3 and composed 3/3 without baseline updates.
  Fresh direct pixels and the preserved Advisor report are nonblank. Multiple
  canvas hashes over time differ; actual motion is present.

The SIR-2/SIR-5 product defects visible in those unmasked pixels do not reopen
the old mask defect. They are routed to their own finding closure.

## 6. SIR-4 — PARTIAL__BLOCKING

### Closed portions

- parseLivingOfficeProductionRenderInput now wraps unexpected exceptions and
  returns a deterministic failure instead of throwing
  (src/application/organization/production-render-input.ts:350-355).
- The validator enforces exact layout/pod/identity keys, non-empty pods, unique
  pod IDs, duplicate IDs inside one pod, closed non-sentinel Team values,
  exact/total role-category keys, category vocabulary, identity shape/pattern,
  and finite numeric colors (lines 275-342).
- The former direct reproductions are fixed: missing pods and an empty
  roleCategoryByRole fail closed. The committed hostile table's 21 cases pass
  without throwing (tests/contract/production-render-input.test.ts:204-256).

### Remaining blocking closure gaps

The accepted contract says selectedDefaultPodId MUST equal the first pod in
canonical ascending order (identity contract:174) and an invalid committed
default selects M1 (lines 191-202). Candidate validation checks only that the
default is a nonblank string
(production-render-input.ts:323-342). It does not establish existence,
canonical-first equality, or pod ordering before returning a typed value.

The wrapper selection is also not exact-key/type validated. Lines 381-396 treat
any non-record, array, missing selectedPodId, wrong type, or object with extra
keys as an empty request and silently use the committed default. This differs
from a valid but unknown selectedPodId string, for which fallback to the valid
default is the documented behavior.

Direct built-candidate probes, all no-throw:

| Hostile case | Actual result |
|---|---|
| committed selectedDefaultPodId = pod:vibenews while requested pod:foundation | ok:true |
| committed selectedDefaultPodId = pod:missing while requested pod:foundation | ok:true |
| selection has an unexpected extra key | ok:true |
| selection.selectedPodId = 42 | ok:true |
| selection = [] | ok:true |
| actor agent-office-worker listed in both pods | ok:true |
| duplicate pod ID | ok:false, LAYOUT_INVALID |
| responsible Advisor not a member | ok:false, SELECTION/M1, but only after assembly |

Cross-pod membership is not rejected by validateCommittedLayout; only
same-pod duplicates are checked at lines 306-315. The parser calls
assembleOfficeLayout at lines 376-379 and can return a value whose committed
layout still contains conflicting membership. Assembly later drops the actor,
which is deterministic and conservative, but it does not satisfy Advisor 54 /
09K's explicit requirement to reject duplicate actor membership and invalid
Advisor membership before assembly as a complete validated render input.

The new hostile table does not challenge cross-pod membership, committed
default invariants, selection shape/unknown keys, or malformed selection types.
Its title and the four as-built docs therefore overstate total nested closure.

Required closure: enforce the committed default/order invariant, exact
selection shape, and the exact accepted membership/Advisor pre-assembly policy;
add parser-level hostile tests for each. Preserve the documented valid-string
selection fallback and total no-throw result.

## 7. SIR-5 — REGRESSION

### Closed source-level portions

- presentation-clock.ts:59-123 defines a fixture-free 26-second ambient routine
  whose set is WALK, STOP, SNIFF, SIT, EAT, DRINK, SLEEP, PLAY.
- production-frame-projector.ts derives Channy only from logical time and fixed
  visual anchors and retains authorityRole: none. No operational input,
  command, dispatch, recovery, inference, or prototype fixture import was
  found.
- ProductionPixelWorldScene restarts the shared clock on completion, so canvas
  motion loops. The focused projector test samples the full routine and sees
  all eight states with movement and authorityRole none
  (tests/contract/production-render-input.test.ts:284-310).

### Composition/parity regression

PixelFrameStage calls onFrame only when sceneId changes
(src/ui/pixel/pixel-frame-stage.tsx:59-79). A Channy animation/state change keeps
sceneId living-office, so ProductionPixelWorldScene's frame state remains the
initial frame. Its onVisualFrame callback updates only actor-label positions
(production-pixel-world-scene.tsx:39,47-49,70-72), while the HUD and semantic
mirror consume the stale parent frame (lines 55-62,87).

Direct authenticated sampling across eight live canvas observations found
multiple distinct canvas SHA-256 values, proving production pixels changed,
but every semantic observation remained:

Channy: STOP; non-actor; authorityRole none; no assignment, evidence, command,
notification, or workflow meaning.

LivingOfficeSemanticMirror renders that stale value as the complete text
meaning of the visible pixels
(src/ui/pixel/living-office-semantic-mirror.tsx:14-26,60-71). This is a new
semantic-parity regression created by changing Channy from constant STOP to a
dynamic routine without updating the semantic consumer.

The authenticated product also visibly retains prototype/demo wording:

- aria-label Prototype status and TOUR RUNNING
  (src/ui/pixel/living-office-hud.tsx:27-30), even though the production scene
  comment states this is a continuous ambient surface with no 26-second tour;
- Accessible synthetic fixture mirror
  (living-office-semantic-mirror.tsx:21-24) on the fixture-free authenticated
  production surface.

The production E2E compares two canvas images but never observes Channy's eight
states or semantic parity (tests/e2e/living-pixel-office.spec.ts:159-165). The
unit test exercises the pure projector, not the composed authenticated UI.

In actual normal desktop pixels, the Bedlington silhouette is small at
full-office scale and becomes discernible only on close inspection. In the
390x844 full-surface capture Channy is not recognizably present in the visible
Office field, while large actor cards dominate it. Thus the mandatory mobile
recognizability/equivalence check also fails; existence of the original shared
draw function is not visual proof.

Required closure: update the composed semantic frame on every meaningful
visual state without creating an excessive live-region announcement stream;
assert canvas/semantic Channy state agreement and all eight production states;
replace prototype/tour/fixture copy on the authenticated surface; and provide
directly inspected desktop/mobile motion evidence in which the accepted
Bedlington and its state are recognizable and honest.

## 8. Independent commands and results

All commands ran against 74d5866 without updating snapshots or patching target
source.

| Command / probe | Result |
|---|---|
| npm run check | PASS: lint/typecheck clean; Vitest 93 files / 619 tests; core/dashboard production build pass. |
| focused production-pixel-prototype-boundary Vitest | PASS: 1 file / 6 tests. |
| npx playwright test --config playwright.batch-a-living-office.config.ts | PASS: 3/3. It does not catch manual SIR-2 reflow or SIR-5 semantic parity. |
| npx playwright test --config playwright.composed.config.ts | PASS: 3/3; selection p95 16.9 ms, zero long task, 377 DOM nodes, 84 SVG elements, zero pending cues. |
| npx playwright test --config playwright.pixel-prototype.config.ts | PASS: 20/20; 600 active frames, 0.5 ms p95, zero long tasks, zero retained canvas/root. |
| npx playwright test | PASS: 43 passed / 23 skipped. |
| direct strict-CSP authenticated browser probe | Renderer PASS; product FAIL: correct dimensions/nonblank motion/no renderer error, but label/reflow and stale semantic findings reproduced. |
| direct hostile render-input probe | No throws; partial FAIL as listed in SIR-4. |
| node scripts/local-office-rehearsal.mjs immediately after demo E2E | FAIL: OFFICE_CHUNK_MISSING because demo E2E left the test-demo dashboard in dist. This reviewer command-order precondition is recorded, not hidden. |
| npm run build, then node scripts/local-office-rehearsal.mjs | PASS: one Office chunk, five Pixi chunks, eager Pixi-free, shell/asset 200, projection 503 AUTH_PROVIDER_UNAVAILABLE, listener rebind and writer-lock release true. |

One first version of the review-only browser metrics one-liner failed after
collecting evidence with ReferenceError: text is not defined. The corrected
one-liner was rerun successfully against a fresh synthetic server. This was a
review harness typo, not a candidate failure, and is recorded to satisfy the
failed-command requirement.

Two pre-existing console errors reproduced in successful authenticated runs:
the expected pre-auth protected-resource 401 and the existing login pattern
attribute regexp-v warning. No pageerror and no CSP/Pixi/WebGL error occurred.

## 9. Worker/Advisor report accuracy

Accurate and independently reproduced:

- candidate/base/parent, fast-forward push, local/upstream equality;
- npm run check 93/619, CD-3 6/6, Living Office 3/3, composed 3/3,
  prototype 20/20, demo 43/23, production build, and rehearsal after a
  production build;
- strict CSP unchanged, installed public Pixi polyfill import lazy-isolated,
  actual successful production initialization, nonblank dimensions/motion,
  contrast correction, and unmasked report files/hashes;
- no dependency/lockfile/config/prototype-fixture change, suppression, Grok
  tracked reuse, DB/remote/live/authority/command expansion, or Batch B–E work.

Inaccurate, incomplete, or overstated:

1. Worker and the four as-built docs claim all SIR-1 through SIR-5 closed. The
   visible pre-init HUD backend, 200-percent/mobile label product failure,
   incomplete validator, and dynamic-canvas/stale-semantic regression make that
   false.
2. Full-surface Axe success is accurate but is presented as proof of readable
   200-percent pixels. Axe did not detect the fixed-height card overflow and
   overlap visible in the actual image.
3. The validator report says complete shape/membership/selection validation
   before assembly. Direct hostile cases and source show that membership relies
   on assembly and several invalid selection/default values return ok:true.
4. Continuous production motion is accurate, but it is not evidence of honest
   Channy state meaning: the semantic surface remains STOP and the test never
   checks the eight composed production states.
5. Worker reports untracked .grok/ and grok* in the isolated target. Direct
   baseline review began clean; no such target dirt existed. No Grok artifact is
   tracked, but the status wording again appears copied from an excluded
   checkout rather than this worktree.

Advisor 55 correctly described the dense labels and small Channy as mandatory
review questions rather than accepting them. The independent pixel judgment
answers those questions adversely.

## 10. Scope, security, Git, rollback, and residual evidence limits

- Every 0b2f923..74d5866 changed path is inside Advisor 54/09K's exact allowed
  source/test/new-baseline/four-doc list. Conditional Pixi bridge files were not
  changed.
- package.json, package-lock.json, CSP/security headers, existing Playwright
  configs, tsconfig.build.json, prototype-entry.tsx, prototype fixtures, and
  pre-existing historical baselines are not changed by the rework. The two
  already-authorized new Batch A baseline directories contain the visual
  reconciliation.
- No added eslint-disable, @ts-ignore, @ts-expect-error, test skip, CSP token,
  dependency, or file-wide suppression was found.
- No tracked Grok artifact/string/code path or Grok ref was found. Historical
  non-participation by the excluded agent-office session is asserted by routing
  records and Worker narrative but remains not independently provable from Git.
- No browser-to-Worker/Reviewer dispatch, arbitrary command surface, raw
  terminal/source/credential/private content path, DB/schema/migration,
  secret/credential access, remote/public/production/live action, protected
  branch/main action, force push, or authority expansion was found.
- Whole-batch rollback remains branch deletion/reversion to ac8ba75; there is no
  database, migration, remote, secret, or live state to reverse.
- Review-generated test-results-batch-a-living-office and
  test-results-composed directories were removed after the runs. Final target
  worktree is clean and local HEAD equals upstream/direct remote.

## 11. Verdict rationale and routing

NEEDS_PATCH is required. The primary strict-CSP blank-canvas and contrast bugs
are materially repaired, and the mask defect is closed. However the
authenticated surface still advertises a backend before initialization, its
compact labels fail actual normal/mobile/200-percent product and resize-text
requirements, the validator still accepts invalid committed-layout/selection
states outside the exact contract, and the new Channy motion creates a direct
pixel-to-semantic STOP regression. These are concrete, reproducible, and
patchable within Batch A.

Return to Advisor for an exact patch and same-session Sentinel re-review. Do not
grant Founder final approval, merge/deploy, or start Batch B–E.

Excluded from this re-review: unrelated prior-PASS axes, candidate patching,
risk acceptance, real credentials/secrets, real private-run or live Advisor
delivery, database/schema/migration, remote/public/production deployment,
tmux/session input, agents/sub-agents, protected branch/main, final approval,
and Batch B–E.

RETURN_TO: Advisor

STOP
