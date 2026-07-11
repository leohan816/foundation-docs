# Agent Office M1.2 Worker AO12-C Result

Status: `AO12_C_IMPLEMENTED_TESTED_AND_PUSHED__PENDING_FOCUSED_FABLE5_EVENT_TRUTH_ACCESSIBILITY_PERFORMANCE_REVIEW_AND_ADVISOR_ACCEPTANCE__AO12_D_NOT_AUTHORIZED__RETURN_TO_ADVISOR`

This is factual Worker evidence for `AO12-IWU-09..11` under
`40_AO12_C_WORKER_HANDOFF_PROMPT.md`. It is not a Fable5 review, risk
acceptance, Advisor acceptance, AO12-D authorization, production activation,
final approval, or mission closure.

## 1. Identity and Git state

- Mission ID: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Batch: `AO12-C`
- WorkUnits: `AO12-IWU-09`, `AO12-IWU-10`, and `AO12-IWU-11`
- Actor: `Agent Office Worker`
- Target project: `Agent Office M1.2 AO12-C evidence-backed spatial motion`
- Target repository: `/home/leo/Project/agent-office`
- Existing session: `agent-office`; no new or temporary session was created
- Requested model/effort: `GPT-5.6 SOL / Ultra`
- Required skill: none
- New agent, sub-agent, delegated context, Designer, substitute Worker,
  Reviewer invocation, or temporary session: none
- Target branch/upstream:
  `shadow/agent-office-m1-2-spatial-office` /
  `origin/shadow/agent-office-m1-2-spatial-office`
- Exact starting base and commit parent:
  `4b751c6af5b7a1091251273776af3ee8cf1af316`
- Resulting target commit:
  `f9d0533437c0cf9efa7be76650ad79f0cb0d9353`
- Commit subject: `feat(ui): add evidence-backed spatial motion`
- Commit time: `2026-07-11T22:56:52Z`
- Push: non-force, successful
- Target HEAD/upstream after push: exact equality, left/right `0/0`
- Target worktree after push: clean, including untracked paths
- Result generated at UTC: `2026-07-11T22:58:06Z`
- Foundation Docs publication base observed before result creation:
  `9ef89faea6b51facb1b1941d57db010a76d1befe`, equal to upstream `0/0`
- Result file:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_C_RESULT.md`
- Pointer file:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/41_WORKER_AO12_C_RESULT_POINTER.md`

The exact committed handoff and Worker brief, Advisor AO12-B acceptance,
corrected focused AO12-B Fable5 `PASS`, frozen manifest/design, chained
Leo/GPT decision, actual base `4b751c6`, repository rules, current source and
tests, package/lock files, all six M1 baselines, and all six AO12-B baselines
were read directly. Work was not executed from chat memory, terminal prose,
another project, or another role context.

## 2. Exact committed target delta

Commit `f9d0533437c0cf9efa7be76650ad79f0cb0d9353` changes exactly these 30
authorized Agent Office paths.

### AO12-IWU-09 pure cue projector/reducer

1. `src/ui/spatial/cue-projector.ts`
2. `src/ui/spatial/cue-reducer.ts`
3. `tests/ui/spatial-cue-mapping.test.ts`
4. `tests/ui/spatial-cue-precedence.test.ts`

### AO12-IWU-10 bounded presentation

5. `src/ui/spatial/spatial-routes.tsx`
6. `src/ui/spatial/actor-zone.tsx`
7. `src/ui/spatial/lounge.tsx`
8. `src/ui/spatial/channy-presentation.tsx`
9. `src/ui/spatial/spatial-office.tsx`
10. `src/ui/spatial/team-pod.tsx`
11. `src/ui/spatial/fixtures.ts`
12. `src/ui/spatial/spatial-office.css`
13. `src/ui/demo-entry.tsx`
14. `tests/ui/spatial-routes.component.test.tsx`
15. `tests/ui/spatial-channy-presentation.test.tsx`

### AO12-IWU-11 accessibility, visual, and measured performance proof

16. `tests/e2e/spatial-office-motion.spec.ts`
17. `tests/e2e/spatial-office-accessibility.spec.ts`
18. `tests/performance/spatial-office-budget.test.ts`
19. `tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-full-desktop-1440x900.png`
20. `tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-restrained-desktop-1440x900.png`
21. `tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-reduced-static-1440x900.png`
22. `tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-tablet-1024x768.png`
23. `tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-mobile-static-390x844.png`
24. `tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-forced-colors-1440x900.png`
25. `tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-text-200-percent-390x844.png`

### Mechanical canonical as-built status and traceability

26. `docs/FEATURE_INDEX.md`
27. `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
28. `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
29. `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
30. `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`

Committed diff:

```text
files=30
insertions=4035
deletions=106
canonical_docs=5
source_ts_tsx_css=11
test_sources=7
new_ao12_c_baselines=7
package=0
lockfile=0
config=0
dependency=0
production_runtime_selection=0
existing_baseline_updates=0
```

The exact changed and staged allowlist checks passed with 30 expected paths
and zero unexpected paths. No path outside the handoff allowlist was changed,
staged, or committed.

## 3. AO12-IWU-09 outcome

The cue layer implements the exact `agent-office.spatial-cue.v1` candidate
contract as pure browser code:

- all 16 structured cue kinds and source-fact mappings;
- canonical JSON-array SHA-256 `cueId` generation, verified byte-for-byte
  against Node SHA-256 in tests;
- strict `LIVE_DELTA` and strictly newer projection-revision gates;
- accepted UUIDv7 source membership in the exact mission set;
- exact `stateSourceEventId`, derived `requiredObservableName`, activity source,
  state/activity, assignment, source-boundary, responsible Advisor status,
  responsible Advisor Team/role, freshness, connection, and evidence gates;
- explicit fail-closed diagnostics for stale/offline/unknown/conflict/error,
  unselected Pod, source, assignment, Advisor, critical-alert, evidence,
  expiry, and source-correspondence defects;
- read-only recovery gating and verified terminal-assignment-end idle input;
- exact precedence, deterministic mission-sequence/source tie-breaks, maximum
  three cues, one route, one cue per actor, same-WorkUnit coalescing,
  overflow-to-accessible-log, and bounded seen sets;
- initial/reload/reset/resume/selection/orientation suppression with current
  candidate/source IDs marked seen and no delayed replay;
- duplicate-revision idempotency, conflicting duplicate reset, and required
  verified full-snapshot recovery; and
- presentation-only completion/cancellation with no event, adapter, write, or
  domain-state mutation.

The focused mapping matrix includes valid output for every cue and an invalid
source/evidence case for every cue. Terminal, model, process, prose, proximity,
and timestamp-shaped extra properties do not affect output.

## 4. AO12-IWU-10 outcome

The explicit synthetic surface adds bounded presentation only:

- semantic route resolution returns motion only for one exact visible,
  unambiguous source and target; missing, hidden, ambiguous, or static-tier
  endpoints render immediate static timeline equivalence;
- the integrated route inventory is derived from the actually selected Pod,
  its rendered semantic zones, and its displayed canonical actors rather than
  trusting a cue to declare an endpoint visible;
- at most one actor/document route pair uses Web Animations with only
  `transform` and `opacity`, 150-1200ms bounded durations, one iteration, and
  explicit cancel/unmount cleanup;
- operational cues override ambient presentation and retain state, WorkUnit,
  actor, static-equivalent, and activity-log text independently of motion;
- verified idle requires exact current, connected, verified `IDLE` evidence,
  displays at most one actor, and explicitly disclaims availability,
  assignment, shared context, communication, collaboration, approval, and
  progress;
- one global Channy remains a non-actor with no authority, assignment,
  command, control, or event subscription. Its fixed safe precedence is
  stale/offline static, `BLOCKED`, `WAITING_LEO`, completion, accepted-route
  follow, then neutral ambient;
- full, restrained, reduced-motion, motion-off, mobile, and static modes keep
  the same primary facts and structured log; and
- selection, orientation, hidden-tab, timer, media-query, visibility, and
  animation cleanup leaves no retained cue animation or listener.

The surface is selected only from the existing synthetic test-demo build by
exact `surface=spatial-motion`. Default test-demo `/`, explicit
`surface=spatial-static`, the authenticated composed surface, and the
production runtime entry remain unchanged. The screenshot-only `freeze`
parameter fixes a deterministic diagnostic frame; it creates no authority or
runtime state and does not disable the separately tested real selection and
orientation cancellation paths.

## 5. AO12-IWU-11 accessibility and responsive proof

The final browser matrix proves:

- wide desktop keeps all Team Pods spatially recognizable;
- tablet keeps both Team areas visible and contained;
- mobile uses one focused Team detail with explicit Team navigation and no
  miniature route layer;
- 320px, 390x844, 768x1024, 1024x768, 844x390, and 200% root-text cases have
  no horizontal page loss;
- visible controls meet 44x44 pixels, roving focus and keyboard selection
  remain intact, focus is not moved by route presentation, and live regions
  remain independent;
- WCAG 2.2 A/AA axe automation reports zero violations;
- forced colors retains exact state text, shapes, route facts, log facts, and
  visible focus;
- reduced motion and motion off create zero animation objects while exposing
  the same structured facts and activity log;
- all essential meaning remains after decorative SVG/aria-hidden content is
  removed; and
- browser requests remain loopback-only and no actor clone, delayed replay,
  hidden critical fact, perpetual task motion, or external request occurs.

No manual screen-reader certification or cross-host/browser/font portability
claim is made.

## 6. Verification evidence

### Focused and full gates

- Focused cue/precedence/route/Channy/performance suite: 5 files, 76 tests,
  pass.
- Full sequential `npm test`: 70 files, 418 tests, pass.
- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: core TypeScript and production dashboard Vite builds, pass.
- Current-product name scanner: 256 files scanned with exact `SIASIU`, pass.
- Exact AO12-C Playwright specs: 15/15 Chromium cases, pass.
- Full default-demo Playwright: 43/43 Chromium cases, pass.
- Full authenticated composed Playwright: 3/3 Chromium cases, pass.
- `npm run audit:dependencies`: zero vulnerabilities, pass.
- Production-output exclusion scan: cue schema, selector, and cue markers
  absent from `dist/dashboard`, pass.
- Spatial source-boundary scan: no observation, process, network, write,
  dispatch, adapter, gateway, transport, persistence, or browser-storage
  capability, pass.
- Package/lockfile equality to exact base: pass.
- Existing six M1 and six AO12-B baseline equality to exact base: pass.
- `git diff --check`: pass before staging and on the exact staged delta.
- Exact changed/staged allowlist: 30 paths, unexpected paths 0, pass.
- Agent Office commit parent, exact branch, non-force push, upstream equality,
  clean worktree, and no persistent Vite/Playwright/Chromium process: pass.

No required check was skipped. No failed final check was waived, retried with
weaker criteria, snapshot-laundered, or reclassified.

### Configured runtime

```text
host: linux-x64
node: 24.18.0
playwright: 1.61.1
browser: configured Playwright Chromium
viewport: 1440x900 for benchmark
playwright workers: 1
server: disposable 127.0.0.1:4173 only
process locale: ko_KR.UTF-8
browser locale: ko-KR
timezone: UTC
font/runtime: playwright.config.ts configured local cache when present
production build: Vite 8.1.4, 1791 modules
```

The configured server and browser processes stopped after each run. No visual
determinism claim is made outside this configured runtime.

## 7. Exact performance evidence

Fixture descriptor and method:

```text
schema: agent-office.ao12-c-benchmark.v1
fixture_sha256: sha256:6fc7fe9aee1811575c99b4c6b9972626053f26e645827b16e77c2363b4f201cf
pods: 12
assignments: 64
work_units: 200
labels: long Korean/English
open_alerts: 6
burst_cues: 3
percentile: nearest-rank, sorted, ceil(0.95*n)-1
classification: FULL on configured reference runtime only
```

Final dedicated reducer/design-load report:

```text
warmups: 20
reducer_samples: 200
reducer_p95_ms: 0.252
jsdom_pod_switch_diagnostic_samples: 20
jsdom_pod_switch_diagnostic_p95_ms: 70.018
active_frame_diagnostic_samples: 240
active_frame_diagnostic_p95_ms: 0.005
incremental_production_javascript_bytes: 0
six_source_module_gzip_diagnostic_bytes: 12314
design_load_dom_nodes: 1324
design_load_svg_elements: 224
jsdom_heap_method: process allocation diagnostic, no forced GC, not retained heap
jsdom_heap_allocation_delta_bytes: 61338696
retained_animations_after_unmount: 0
```

The jsdom allocation delta is recorded as a non-retained diagnostic and is not
used for the retained-heap gate. The hard retained-heap measurement uses CDP
garbage collection before and after 20 browser selection cycles.

Final focused configured-browser report:

```text
scripted_duration_ms: 10000
frame_samples: 600
long_task_observer_supported: true
active_frame_p95_ms: 0.40000009536743164
max_long_task_ms: 0
long_task_count: 0
browser_dom_nodes: 599
browser_svg_elements: 180
desktop_switch_samples: 30
desktop_switch_p95_ms: 47.10000014305115
constrained_profile: Chromium CDP 4x CPU throttling
constrained_switch_samples: 20
constrained_switch_p95_ms: 65.79999995231628
heap_cycles: 20
heap_method: Chromium CDP collectGarbage plus Runtime.getHeapUsage
retained_heap_growth_bytes: 192692
```

The later full default-demo regression repeated the benchmark and recorded
600 frames, supported long-task observation, 0.40000009536743164ms active-frame
p95, zero long tasks, 599/180 browser DOM/SVG elements, 51.40000009536743ms
desktop switch p95, 68.10000014305115ms constrained switch p95, and 197548
bytes retained-heap growth. Both runs satisfy every configured-reference hard
target. The canonical as-built docs record the later complete-regression
values.

`FULL` is an honest configured-reference classification only. A future miss or
different runtime must block `FULL` or select a reviewed lower tier; accessible
semantics may not be removed to meet a budget.

## 8. Package, lockfile, and baseline preservation

Package and lockfile remain byte-identical to base `4b751c6`:

```text
dac88fec3e9a2c5ff57923626de21d29dfd3b5ca1b466f815ab42efcfa73a2e3  package.json
fcb946aeb785b12f80176372874e5fed3f892fd4fed628384ff578d3f4d696d4  package-lock.json
```

All six M1 baselines remain byte-identical:

```text
e81bf40789ca01343e8ded76989933c702ba528c1a84c1d575136e83f719ecd8  tests/e2e/baselines/office-scene.spec.ts/office-desktop-1440x900.png
d3d4979ae383b2a1e6be0f83535a06d634ca47d1c3c7ffbf4b95b227cfbaff10  tests/e2e/baselines/office-scene.spec.ts/office-mobile-390x844.png
10946f414c2f9c76945ecfeee4852f087769ddc5588fac10e5c7555234310cb6  tests/e2e/baselines/office-scene.spec.ts/office-reduced-motion-1440x900.png
c1a867a887aed0610fd9e718e665f1cd6897849beaec281424d81c38a17ad990  tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-desktop-1440x900.png
20c500e05bec9803c487de60f889da8e360f545da89fb0b3f9b28419da48e2cb  tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-mobile-390x844.png
b4e18a70c927b87dcfedd74a0e9c6e581b45fd15682f3f442d4330b16f3a3231  tests/e2e-composed/baselines/application-office-scene.spec.ts/application-office-reduced-motion-1440x900.png
```

All six AO12-B baselines remain byte-identical:

```text
dc6d9f6c27db2a6a19748b3d4458af57ac2125ef55ae16068145f044c15dac41  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-desktop-1440x900.png
f92d7cdce598e475780919e6bf6dea7200d73735042cf27017f04da03f8ae7e3  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-forced-colors-1440x900.png
30785ee5dc77b02fc3b7ca270713aded572dbfcda23b7380a4f45c77e0071d23  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-mobile-390x844.png
dc6d9f6c27db2a6a19748b3d4458af57ac2125ef55ae16068145f044c15dac41  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-reduced-motion-1440x900.png
8f04a08303280ddff61d992e00bf68ffbe0935d6d128221193ae7ba29a9da852  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-tablet-1024x768.png
a667a3b7de849f2d4dd8245142ada4f9459e85363c6f343c9cffa0c7447aba54  tests/e2e/baselines/spatial-office-static.spec.ts/spatial-static-text-200-percent-390x844.png
```

No package, dependency, lockfile, existing baseline, Playwright config, runtime
config, or production entry changed.

## 9. New visual evidence and direct inspection

Only the seven authorized new PNG paths exist under the two exact AO12-C
baseline directories:

```text
02e74582d53ac570a6ff30f7a6f68ce738409dbbc530951a57282ab74d5fb321  tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-full-desktop-1440x900.png
a2c7fb601d6600a5121f55c0610d9396b4369d4180f501beff024357dd374c78  tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-restrained-desktop-1440x900.png
14d08b3958c1cd90ddd9c611650fa1f58f32d007c67abe410a9f586f81a7df93  tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-reduced-static-1440x900.png
6f912b4c50fb50df3109f1621f13bd5ef51471417402fa03af4b408874f8ab62  tests/e2e/baselines/spatial-office-motion.spec.ts/spatial-motion-tablet-1024x768.png
63aa22e1a816a3f68cf069914bdf21708b4940f8445297f61cc8c5e103488850  tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-mobile-static-390x844.png
ef9f1790665743dceec1a8728ac067457fbc0ab4d3aede7d261a47b00e1ce918  tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-forced-colors-1440x900.png
f73f2f0ca728f462935621adc5df642db13499207ef1c0261285dd9cc1cd6727  tests/e2e/baselines/spatial-office-accessibility.spec.ts/spatial-motion-text-200-percent-390x844.png
```

Every image was directly opened and inspected after final generation:

- full desktop: three operational cue panels, one route actor/document pair,
  three accessible log entries, verified idle, and Channy `WAITING_LEO`
  reflection are distinct and legible;
- restrained desktop: one operational cue and one route remain while all three
  structured log entries preserve the full facts;
- reduced/static desktop: three static operational facts, static origin/target
  route text, log, and Channy reflection remain with no route motion;
- tablet: both Team areas remain recognizable with no clipping or overlap;
- mobile static: one focused Pod, no miniature route layer, complete timeline
  and log, and no horizontal loss;
- forced colors: system outlines, state shapes, route/static facts, focus, and
  log meaning remain visible; and
- 200% text mobile: labels and identifiers wrap without horizontal loss,
  hidden critical fact, overlap, or motion-only meaning.

No actor clone, delayed replay, unreadable critical fact, or accepted essential
meaning hidden behind decoration was found. All final screenshot comparisons
used exact bytes with `maxDiffPixelRatio: 0`; no snapshot update occurred in
the final verification train.

## 10. Iterative corrections before final gates

- The first direct browser accessibility pass exposed invalid list semantics
  from putting `role=log` directly on the ordered list. The log role was moved
  to a wrapper while the ordered list semantics remained intact; axe and the
  full browser matrix then passed.
- Full-page screenshot capture temporarily changed viewport orientation, which
  correctly exercised product cue cancellation and removed the frozen cue from
  the image. The synthetic screenshot-only freeze path was constrained to keep
  the deterministic diagnostic frame during capture; the real non-frozen
  orientation path still clears cues and is directly tested.
- Exact-diff auditing tightened fail-closed activity-source correlation,
  read-only recovery, responsible Advisor status/cardinality, state-source
  provenance, required observable matching, and actual rendered semantic-route
  endpoint inventory. Regression cases were added before the complete train.

All final gates passed. No failure was waived, skipped, snapshot-laundered, or
reclassified. No existing snapshot changed.

## 11. Forbidden and excluded action evidence

- AO12-D authenticated/production projection integration, runtime composition,
  compatibility selection, asset work, and another mission: not started.
- Production runtime/config, auth, authority, exact delivery, gateway,
  transport, DB, schema/migration, secret, credential, private/public network,
  server composition, Hermes, and real tmux input: unchanged.
- External/generated/purchased/imported/commissioned assets, external font,
  package, dependency, and lockfile changes: none.
- Real or persistent server, remotely reachable listener, production/live use,
  browser role dispatch, arbitrary terminal endpoint, or external-system
  mutation: none.
- New agent, sub-agent, delegated context, Designer, Reviewer invocation,
  substitute role, or temporary session: none.
- Self-review verdict, risk acceptance, Advisor acceptance, final approval,
  main/protected Agent Office push, merge, force push, destructive Git, or
  automatic next mission: none.

Database access, schema/migration work, secrets/environment values, credentials,
PII, production/live systems, public exposure, and forbidden systems were not
accessed or changed.

## 12. Residual gates and limitations

- AO12-C requires focused Fable5 event-truth/accessibility/performance review
  and Advisor acceptance.
- AO12-D remains `NOT_STARTED_NOT_AUTHORIZED`; this result does not dispatch or
  authorize it.
- The cue and spatial-motion layer remains explicit synthetic test-demo only
  and is absent from the production build selection boundary.
- `FULL` is measured only for the configured local browser/font/runtime; no
  cross-runtime portability claim is made.
- Manual screen-reader certification, authenticated production projection,
  production asset replacement, and later closure work remain separate gates.

No STOP condition was encountered during the exact AO12-C scope.

## 13. Preserved Foundation Docs unrelated state

The following pre-existing Foundation Docs paths remained untouched and are
excluded from result/pointer staging:

- modified `advisor/_system/AGENTS.md`;
- modified `advisor/_system/README.md`;
- modified
  `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
- untracked `advisor/jobs/20260709_reviewer_selection_protocol/`; and
- untracked `advisor/jobs/20260709_role_result_storage_protocol/`.

Only this result and its exact pointer are authorized Foundation Docs artifacts.
The immutable result commit is recorded in the pointer because a result file
cannot contain its own commit hash.

## 14. Routing

Advisor must validate exact Agent Office commit
`f9d0533437c0cf9efa7be76650ad79f0cb0d9353` and this durable evidence, then
decide the already-declared focused AO12-C review route. This Worker does not
invoke Fable5, accept AO12-C, or start AO12-D.

```text
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
AO12_C_STATUS: IMPLEMENTED_AND_PUSHED__PENDING_FOCUSED_FABLE5_EVENT_TRUTH_ACCESSIBILITY_PERFORMANCE_REVIEW_AND_ADVISOR_ACCEPTANCE
AO12_D_STATUS: NOT_STARTED_NOT_AUTHORIZED
STOP_AFTER_POINTER: true
```
