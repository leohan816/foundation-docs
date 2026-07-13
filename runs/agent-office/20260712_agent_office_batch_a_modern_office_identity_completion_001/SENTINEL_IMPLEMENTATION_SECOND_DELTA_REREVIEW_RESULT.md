# Sentinel Implementation Second Delta Re-Review — Agent Office Batch A

Review pass: `IMPLEMENTATION_REVIEW`

Verdict: `NEEDS_PATCH`

Actor: Independent `Sentinel-ReReview`

Session: same existing independent `foundation-reviewer-sol` role session

Model / effort: actual `gpt-5.6-sol`, `xhigh`

Return to: Advisor

This is a bounded, independent, read-only implementation/visual/accessibility
delta re-review. It is not a candidate patch, risk acceptance, Founder approval,
merge/deploy authorization, or permission to start Batch B.

## 1. Runtime, independence, target, and provenance

The actual Reviewer runtime was verified before review rather than copied from a
report:

- current Codex process `711307` command line is
  `codex -m gpt-5.6-sol -c model_reasoning_effort=xhigh ...`;
- that process started on 2026-07-12 and its current working directory is
  `/home/leo/Project/foundation-reviewer`;
- this same conversation contains the preceding independent 07L Sentinel review,
  its durable result, and its two published result/pointer commits. No role change,
  new session, temporary session, agent, sub-agent, or delegated context occurred.

Exact reviewed target:

- repository: `/home/leo/Project/agent-office-batch-a-001`;
- branch: `batch-a/modern-office-identity-001`;
- before: `1187b9ae37077f22e697680bf531f9e475f005bf`;
- after: `fcd55a2df04aa14284fceaab12c653492edf22f2`;
- the candidate has exactly one parent, the stated before commit;
- exact delta: 10 files, 134 insertions, 30 deletions;
- local HEAD, configured upstream, remote-tracking ref, and direct
  `git ls-remote` all resolve to the exact after commit;
- `git diff --check 1187b9a..fcd55a2` passes;
- review began and ended with a clean target worktree.

The exact 07M handoff, canonical V2 role protocol, `/fable-sentinel` delta,
provenance, classification, and contract references, target entry/run/result
rules, Founder intake/brief and exact 17-item authorization, contract section
2.7, Advisor validations 58/59, Worker third-rework result/pointer and 09M
handoff, prior Sentinel result, the exact commit diff, every changed source/test/
document/baseline, and the load-bearing unchanged semantic mirror, drawer,
renderer, CSP, validator, Channy, and production-composition paths were read
directly. Worker and Advisor summaries were treated as claims until reproduced.

No Agent Office source, test, media, configuration, or Git state was patched.

## 2. Delta closure summary

| Finding | Status | Severity | Direct conclusion |
|---|---|---:|---|
| A3-1 Team first layer | `CLOSED` | — | `advisorTeam` now comes directly from its existing fact envelope and is present, with full Team value/provenance, in every production label's DOM/accessibility name and every desktop/mobile roster row. |
| A3-2 Office-first compact labels | `PARTIAL__BLOCKING` | MEDIUM | The normal 1440x900 candidate is materially Office-first and readable, but 200-percent text again produces a 31.42-percent wall of cards, and the new coverage gate trivially passes after seven of eight desktop labels are hidden. |
| A3-2 as-built/report exactness | `PARTIAL__BLOCKING` | LOW | The changed contract/design/Worker narrative says every full source name remains in the accessible label name, but four compact facts have no source in that name. The roster/drawer remain complete, so this is a narrow contract/report mismatch, not lost product data. |
| Affected I2/security/authority regression boundary | `PRESERVED` | — | I2-1, I2-3, I2-4, the 17-field drawer, strict CSP/lazy Pixi/nonblank proof, static/reduced/mobile paths, auth/authority, and Batch B exclusion remain green and unchanged. |

Any blocking partial prevents `PASS`. The remaining defects are routine and
patchable inside the already authorized A3 source/test/as-built scope, so `FAIL`
is not warranted.

## 3. A3-1 — CLOSED

### Source and contract closure

- `src/ui/pixel/living-office-actor-overlay.tsx:48-60` adds
  `['advisorTeam', 'Team']` as the first mutable compact fact after the separately
  rendered role/stable display name. `OrganizationCompactSummary` at lines
  303-316 reads `organizationFact(facts, key)` and renders that envelope's
  `value` and `source`; it derives nothing from project, session, pod, position,
  proximity, or prior state.
- `actorLabelAccessibleName` at lines 525-535 announces the complete Team value
  and its full `PIXEL_ACTOR_FACT_SOURCE_LABELS` value.
- The unchanged production roster at
  `src/ui/pixel/living-office-semantic-mirror.tsx:72-94` iterates the same compact
  field list and renders complete Team value plus full source name for every
  visible production actor. This is the accepted mobile equivalent.
- Contract section 2.7 at
  `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:149-153`
  now names `advisorTeam` after `stableDisplayName`, keeps it explicitly mutable
  and distinct from stable identity, admits only a Team id or `UNASSIGNED`, and
  adds no authority or inference rule.

### Direct production reproduction

The fresh authenticated 1440x900 probe found exactly eight visible production
labels. Every label contained all nine first-layer DOM fields, including Team.
The two actual Team values were `FOUNDATION_ADVISOR_TEAM` and
`VIBENEWS_ADVISOR_TEAM`; every Team source was `REG`, backed by full accessible
name and roster text `VERIFIED REGISTRY`. Every accessible label name carried the
complete, unellipsised Team value and full source name.

At 390x844 the on-canvas labels were intentionally absent and the full-page
mobile semantic equivalent contained exactly eight roster rows. Every row
contained the complete Team value, `VERIFIED REGISTRY`, and all seven mapped
compact facts (plus its separate role and stable name), with no horizontal page
overflow.

The supplied current-candidate images were verified and inspected directly:

- desktop, 1440x900, 300099 bytes, SHA-256
  `4eb4be325659825884cee5073e6d30e0585893fdb4cbe8e3d102869c9b4ae721`;
- mobile, 390x844, 104691 bytes, SHA-256
  `93e0e3694fa5fb95a25611f34169644b4b0e0c5ddcc7c2c8b083f19dbd2aa626`.

The focused two-file UI run passed 8/8. The unit expectation at
`tests/ui/actor-summary.test.tsx:111-130` requires the Team field/source and the
accessible Team phrase. The production E2E requires a visible Team field on the
desktop label and eight Team roster fields on desktop and mobile
(`tests/e2e/living-pixel-office.spec.ts:51-55,111-118`). Removing Team from the
shared compact list fails both the unit label assertion and the roster count.

Existing projector tests in the reproduced 631-test suite still cover fail-closed
`advisorTeam=UNASSIGNED`; the compact renderer consumes the resulting envelope
without a separate inference path.

## 4. A3-2 — normal-scale implementation materially closes the pixel defect

The candidate's actual normal desktop pixels are a clear improvement and are
not rejected merely because the test defect below exists.

- `COMPACT_SOURCE_LABELS` at
  `living-office-actor-overlay.tsx:37-46` is a total typed mapping:
  `VERIFIED_REGISTRY→REG`, `VERIFIED_MISSION_ARTIFACT→ART`,
  `CANONICAL_FIXTURE→FIX`, `SYNTHETIC_FIXTURE→SYN`, and
  `UNVERIFIED→UNV`. The indication is text, not color.
- CSS at `src/ui/pixel/living-office.css:457-521` renders a translucent fixed
  208px, two-column card. Fresh computed values were 208x80.59px, 10.24px
  minimum fact/source text, and `rgba(255,252,246,0.82)` background.
- All eight normal-scale labels were visible, each had nine summary fields,
  there were zero label-label intersections, and every displaced label had a
  connector under the existing association rule.
- An exact union-area probe over the actual 1436x558 production viewport measured
  16.7366-percent coverage. Direct inspection shows actors, desks, pods, lounge,
  paths, brick floor, and symbolic work surfaces as the dominant signal; the
  labels are compact annotations rather than the previous wall.
- The before snapshot was independently materialized from `git archive` in a
  disposable `/tmp` directory without changing the target repo. Its real strict-
  CSP authenticated surface rendered eight 196x143.125px cards and the exact
  test's 4px sampling measured 28.0780-percent coverage. Its pixels visibly form
  the rejected card wall. The disposable copy and captures were removed after
  inspection.
- Full untruncated values and full source names remain immediately reachable in
  the ordinary DOM roster and 17-field drawer. Ellipsis is confined to the dense
  visual card and creates no hover-only fact.
- Mobile shows no canvas cards and its full-page roster exposes every actor and
  Team/fact/source. Forced colors, reduced/static, keyboard/focus, drawer, strict
  CSP, and screen-reader routes reproduced green.

Thus the reported normal-scale 28.1→16.8-percent calibration is accurate.

## 5. A3-2 remaining blocker 1 — 200-percent Office-first composition is not closed

At 200-percent root text, all eight cards remain present and non-overlapping,
minimum fact/source text grows to 20.48px, connectors remain associated, and the
roster remains complete. Those are real improvements over the 07L failure.

However each fixed-width card grows from 80.59px to 151.28px tall. Their exact
union over the same production viewport grows to **31.4159 percent** — greater
than the rejected before candidate's 28.0780-percent normal-scale composition.
Direct inspection of the fresh unmasked 200-percent image shows the cards again
forming the primary wall across actors and work surfaces; the short two-column
cells visibly reduce most values to fragments such as `Te…`, `Pr…`, `AI…`, and
`Mo…`. Complete truth remains in the roster, so this is not data loss, but it is
not the claimed Office-first 200-percent equivalent.

The browser suite cannot catch this. It calls `assertOfficeIsPrimary` only before
text scaling (`tests/e2e/living-pixel-office.spec.ts:44-55`). After setting the
root to 200 percent, lines 62-69 check horizontal overflow, font size/containment,
pairwise label overlap, roster count, and Axe, but do not repeat Office coverage,
critical-surface occlusion, connector/actor association, or per-actor Team.

Required routine closure: preserve the accepted information-equivalent route at
200-percent while keeping the Office primary (for example, a bounded desktop
roster-equivalent presentation at that accessibility state), and run the same
meaningful Office/actor/Team/association assertions after text scaling. Do not
hide facts without the accepted equivalent or weaken the 10px/source contract.

## 6. A3-2 remaining blocker 2 — the coverage gate has a trivial false pass

`assertOfficeIsPrimary` at
`tests/e2e/living-pixel-office.spec.ts:254-284` measures a union over the real
production viewport, but it requires only `coverage > 0` and `coverage <= 22`.
It never requires the visible label count to equal the eight visible production
actors or the overlay's existing `data-actor-label-count`.

The coupled tests have the same cardinality hole:

- `assertReadableProductionLabels` requires only at least one visible label
  (line 246);
- `assertNoProductionLabelOverlap` requires only a count greater than zero
  (lines 287-301);
- the Team check tests `.first()` rather than all eight labels (line 54);
- `assertActorConnectors` requires only at least one non-hidden label
  (lines 304-329); and
- roster count eight is independent of desktop card visibility.

A direct negative challenge set `hidden=true` on labels 2 through 8 after the
authentic candidate loaded, leaving the first label and complete roster intact.
Re-evaluating the exact predicates produced:

- visible production labels: 1 of 8;
- coverage: 2.0921 percent (`>0` and `<=22`);
- label overlaps: none;
- visible label minimum font: 10.24px;
- displaced-without-connector failures: 0;
- first Team field: visible; and
- roster/Team rows: 8.

Therefore the new A3 test set accepts the exact forbidden shortcut “hide seven
desktop actors/facts.” This is a concrete false pass, not a hypothetical style
preference, and directly contradicts 09M's prohibition on hidden desktop facts/
actors and 07M's requirement that the gate resist trivial false pass.

Required routine closure: bind every desktop visual predicate to the exact visible
production actor set; require one visible, in-viewport label with all nine fields
for every visible actor; prove the coverage helper rejects a missing/hidden label;
and retain the complete roster as an additional equivalent, not a substitute for
missing desktop cards. The threshold alone must remain insufficient.

## 7. A3-2 contract/report exactness mismatch

The changed contract at
`docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:150`, the
changed design text at
`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:414-415`,
the candidate commit message, and Worker result all claim that the complete
source label for every compact fact remains in the accessible label name.

Actual `actorLabelAccessibleName` at
`src/ui/pixel/living-office-actor-overlay.tsx:525-535` includes a full source for
Team, session process, and AI identity, but omits the source for model, effort,
AI runtime, and operational state. The fresh accessible name reproduced exactly
that split. The ordinary accessible roster and drawer do contain the complete
sources, so the 07M requirement for an immediately reachable roster/drawer/
accessibility path is operationally satisfied; the changed literal as-built
claim is still false.

Required routine closure: either make the accessible label name match the new
contract/report claim and test all sources, or narrow the as-built wording to the
actual complete roster/drawer path. Do not claim code behavior that is absent.

## 8. Affected regression boundaries

The delta does not modify input validation, renderer lifecycle/backend truth,
production scene/frame projector/clock/Channy/HUD, semantic mirror, shared
nonblank-canvas helper, CSP/server/auth/runtime/transport, package/lockfile,
TypeScript/Playwright configuration, prototype entry/fixtures, or any Batch B
path.

Independent reproduction:

| Command / evidence | Result |
|---|---|
| `npm test -- --run tests/ui/actor-summary.test.tsx tests/ui/pixel-actor-overlay.test.tsx` | PASS: 2 files, 8 tests. |
| `npm run check` | PASS: lint/typecheck clean; Vitest 93 files / 631 tests; core/dashboard production build succeeds. |
| focused CD-3 boundary | PASS: 1 file / 6 tests. |
| `npx playwright test --config playwright.batch-a-living-office.config.ts` | PASS: 3/3 under strict CSP; 17-field drawer, backend, Channy parity, mobile/static/Axe gates green, while the A3 false-pass/200-percent holes above remain. |
| `npx playwright test --config playwright.composed.config.ts` | PASS: 3/3; selection p95 16.9ms, zero long tasks, 377 DOM nodes, 84 SVG elements, zero pending cues. |
| `npx playwright test --config playwright.pixel-prototype.config.ts` | PASS: 20/20; 600 active frames, 0.5ms p95, zero long tasks, zero retained canvas/root. |
| `npx playwright test` | PASS: 43 passed / 23 skipped. |
| `npm run build && node scripts/local-office-rehearsal.mjs` | PASS: one Office chunk, five Pixi chunks, Pixi-free eager entry, shell/assets 200, fail-closed 503 `AUTH_PROVIDER_UNAVAILABLE`, listener rebind and writer-lock release true. |
| current/base direct authenticated pixel probe | Current 100%: 8 labels, 10.24px, 16.7366%, no overlaps; current 200%: 8 labels, 20.48px, 31.4159%; exact base: 8 labels, 28.0780%. |
| hidden-label negative challenge | FAILS THE CONTRACT / PASSES CURRENT PREDICATES: 1/8 visible, 2.0921% coverage, no reported overlap/connector failure. |

I2-1 remains technically closed: backend/HUD/source files are byte-unchanged in
the delta and the authenticated and reduced/static E2E states agree. I2-3 remains
closed: the validator is byte-unchanged and all 631 tests, including hostile
pre-assembly cases, pass. I2-4 remains closed: the projector/clock/scene/semantic
paths are unchanged, the authenticated test observes multiple bounded Channy
semantic states, and the prototype stays 20/20. The production drawer still
renders exactly 17 sourced/status rows and restores invoker focus.

The two authorized Living Office baselines are the only changed PNGs. Both old
files were 291472 bytes with SHA-256
`3bcc969a1b4cb48bd133481643af19e4414651fabfb9e247294638cd77ba30dd`;
both current files are 259193 bytes with SHA-256
`b0eb0aeca60a58e6c31a6a9fd341993ec4310e4c53bf80a70c258da9b82240fd`.
Prototype and technical/spatial baselines are unchanged by Git.

No delta match exists for Grok, an excluded-session artifact, suppression,
`eslint-disable`, `@ts-ignore`, `@ts-expect-error`, skip/only, dependency,
lockfile, CSP, config, auth, command/dispatch, DB/schema/migration, secret,
remote/public/live/production, authority expansion, or Batch B. No force push or
protected/main target action was found.

One review evidence command attempted to call the absent `file` utility after
already reproducing the supplied SHA-256 values; it exited 127. Dimensions were
verified by direct image inspection/browser viewport and remaining hashes/stats
were rerun successfully. One disposable-base setup command initially rebuilt the
current target because its working directory was not switched; the base build
was then executed in the isolated archive directory and the calibration was
reproduced. Neither event is a candidate failure or source change.

## 9. Worker/Advisor report accuracy

Accurate and independently reproduced:

- exact base/candidate/parent, fast-forward push, clean/upstream equality;
- 10 changed files, 134 insertions, 30 deletions, and allowed path scope;
- A3-1 Team source/label/accessibility/roster propagation;
- normal-scale two-column/translucent/10.24px card rendering;
- base 28.1-percent failure and candidate 16.8-percent success;
- 631/631, CD-3 6/6, Living Office 3/3, composed 3/3, prototype
  20/20, demo 43/23, build, and rehearsal totals;
- exactly two changed authorized baseline images; and
- no source/config/security/authority/Grok/suppression expansion.

Inaccurate or overstated:

1. A3-2 is reported completely closed, but the current test accepts seven hidden
   desktop labels and actual 200-percent coverage is 31.42 percent.
2. The coverage gate is described as strong Office/occlusion proof. It is a real
   viewport-union measurement, but it has no actor/label cardinality invariant,
   no negative missing-label proof, no critical-surface measurement, and is not
   rerun at 200 percent.
3. Worker/as-built text says complete source names remain in the accessible label
   name for every compact fact. Four fact sources are absent there; they remain
   complete only through the roster/drawer path.

Advisor 59 correctly left the compact/full-detail split and abbreviations for
independent judgment. At normal scale that split is acceptable; the blocking
issues are the 200-percent composition and empirical false-pass gate.

## 10. Scope, cleanup, rollback, and verdict rationale

Every changed path is inside 09M's exact A3-1/A3-2 source/test/two-baseline/four-
document scope. Generated `test-results-batch-a-living-office/` and
`test-results-composed/`, the disposable base archive, and review-only captures
were removed. No listener remains on port 4317. Final target worktree is clean,
and local/upstream/direct remote remain the exact candidate.

Whole-batch rollback remains return/revert to
`ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`; this delta adds no DB, migration,
secret, external, or live state.

`NEEDS_PATCH` is required. A3-1 is closed and the normal candidate finally makes
the Office primary. A3-2 cannot pass while the mandatory gate has a demonstrated
seven-label hiding false pass, its 200-percent state re-creates a larger card wall
than the rejected normal-scale base, and its as-built accessibility claim exceeds
actual code. All three corrections are narrow and routine within Batch A.

Return to Advisor for an exact Worker patch and same existing Sentinel re-review.
Do not accept risk, grant Founder approval, merge/deploy, or start Batch B.

Excluded from this bounded review: unrelated prior-PASS axes, candidate patching,
risk acceptance, real credentials/secrets/private-run delivery, DB/schema/
migration, remote/public/production/live action, tmux input, agents/sub-agents,
protected branch/main, final approval, and Batch B-E.

RETURN_TO: Advisor

PROPOSED_NEXT_ACTOR: Advisor

STOP
