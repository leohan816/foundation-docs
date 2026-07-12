# Agent Office M1.2 Worker AO12-D Rework Result

Status: `AO12_D_A1_PRODUCTION_BUNDLE_FIXTURE_DEFECT_CORRECTED_TESTED_DOCUMENTED_AND_PUSHED__PENDING_ADVISOR_VALIDATION_AND_FABLE5_REVIEW__RETURN_TO_ADVISOR`

This is factual Worker-Rework evidence for only `AO12-D-A1` under
`49_AO12_D_WORKER_REWORK_HANDOFF_PROMPT.md`. It supersedes the original Worker
result only for the production-bundle fixture finding. It is not self-review,
a Fable5 verdict, risk acceptance, Advisor acceptance, Leo/GPT final approval,
another mission, or mission closure.

## 1. Identity and Git state

- Mission ID: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Finding: `AO12-D-A1`
- Classification from Advisor: `CODE_DEFECT`
- Actor: `Agent Office Worker-Rework`
- Target repository: `/home/leo/Project/agent-office`
- Existing session: `agent-office/%13`; no new or temporary session was created
- Requested model/effort: `GPT-5.6 SOL / Ultra`
- Required skill: none
- Agent, sub-agent, delegated context, substitute Worker, Reviewer invocation,
  or temporary session created: none
- Target branch/upstream:
  `shadow/agent-office-m1-2-spatial-office` /
  `origin/shadow/agent-office-m1-2-spatial-office`
- Exact starting commit and resulting commit parent:
  `da5ecc9d1ecd0d331b20724a1f5bfca03d783a10`
- Resulting Agent Office rework commit:
  `48c8dbd9f2c5ecea68c28e85137d75db595ef5f9`
- Commit subject: `fix: exclude spatial fixtures from production bundle`
- Commit time: `2026-07-12T01:12:36Z`
- Push: non-force, successful
- Target HEAD/upstream after push: exact equality
- Target worktree after cleanup: clean
- Result generated at UTC: `2026-07-12T01:13:27Z`
- Foundation Docs publication base before result creation:
  `70036f756d585bb669c59502b30ff1aec9dc2fa6`, equal to upstream
- Result file:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_D_REWORK_RESULT.md`
- Pointer file:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/50_WORKER_AO12_D_REWORK_RESULT_POINTER.md`

The exact committed rework handoff, brief, Advisor validation, original Worker
result/pointer, repository rules/protocols, actual source graph, Vite entry
configuration, current tests/docs, and Git state were read directly. Work was
not executed from chat memory, terminal prose, another role, or another project.

## 2. Reproduction before correction

A fresh `npm run build` at exact starting commit
`da5ecc9d1ecd0d331b20724a1f5bfca03d783a10` transformed 1814 modules and
emitted a 394540-byte production JavaScript asset. Direct fixed-string scans of
that fresh `dist/dashboard` reproduced every Advisor marker:

```text
SYNTHETIC_NON_OPERATIONAL_STATIC: 2
SYNTHETIC_STRUCTURED_EVENT_MOTION: 2
AO12-C synthetic accepted-event motion fixture: 1
ao12-b-static-shared-floor: 1
```

The source cause was reproduced at exact lines in
`src/ui/spatial/spatial-office.tsx`:

- static import of `STATIC_SPATIAL_OFFICE_FIXTURE`; and
- optional `projection` with implicit default
  `STATIC_SPATIAL_OFFICE_FIXTURE.projection`.

The authenticated application already passed an explicit validated projection,
so no false rendered activity was observed. The defect was production bundle
reachability and an inaccurate no-fixture acceptance claim.

## 3. Exact committed rework delta

Commit `48c8dbd9f2c5ecea68c28e85137d75db595ef5f9` changes exactly 11
authorized Agent Office paths:

1. `src/ui/spatial/spatial-office.tsx`
2. `src/ui/demo-entry.tsx`
3. `tests/acceptance/production-spatial-bundle-boundary.test.ts`
4. `tests/performance/spatial-office-budget.test.ts`
5. `tests/ui/spatial-accessibility.test.tsx`
6. `tests/ui/spatial-office.component.test.tsx`
7. `tests/ui/spatial-routes.component.test.tsx`
8. `docs/FEATURE_INDEX.md`
9. `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
10. `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
11. `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`

Committed diff:

```text
files: 11
insertions: 214
deletions: 52
production_ui_source: 2
test_sources: 5
canonical_as_built_docs: 4
package: 0
lockfile: 0
config: 0
auth_session_sse: 0
authority_delivery_transport_gateway: 0
db_network_secret: 0
baseline_png: 0
```

The staged allowlist contained exactly these 11 paths and no unstaged delta.

## 4. AO12-D-A1 correction

`SpatialOffice` no longer imports any fixture and has no implicit projection:

- `projection` is required;
- authenticated composition must pass `surfaceKind=AUTHENTICATED` and an exact
  selection reason;
- synthetic composition must pass `surfaceKind=SYNTHETIC`, a fixture kind, and
  an explicit projection;
- the shared production component contains only the authenticated marker
  literal; exact AO12-B/C fixture markers come only from explicit demo/test
  inputs; and
- the existing authenticated Dashboard call remains explicit and unchanged in
  meaning.

`src/ui/demo-entry.tsx` now explicitly injects static and motion fixture
projection, fixture kind, and synthetic surface kind. Existing static, motion,
accessibility, route-cleanup, and performance tests do the same. Synthetic
fixtures remain demo/test-only, labelled, non-operational, and selected only by
the existing exact `test-demo` entry and URL parameters.

No cue mapping, Team/actor assignment, presentation tier, M1 fallback, auth,
session expiry, SSE, authority, delivery, transport, or visual copy changed.

## 5. Deterministic production-bundle gate

New test
`tests/acceptance/production-spatial-bundle-boundary.test.ts` proves both parts
of the boundary:

1. the production component source contains no fixture import, no static
   fixture identifier, no optional projection, and requires an explicit
   projection; the test-demo entry explicitly injects both fixtures; and
2. a fresh Vite production build is written to an isolated temporary output
   directory, every emitted JavaScript file is read, and all six markers below
   must be absent. The output directory is removed in `finally`.

The gate rejects:

```text
SYNTHETIC_NON_OPERATIONAL_STATIC
SYNTHETIC_STRUCTURED_EVENT_MOTION
AO12-C synthetic accepted-event motion fixture
ao12-b-static-shared-floor
ao12-c-evidence-backed-motion
AO12-B synthetic static shared floor
```

This gate runs in the normal sequential Vitest suite and does not depend on a
pre-existing `dist` directory.

## 6. Verification evidence

### Focused and full tests

- Focused source/bundle/static/motion/authenticated/performance suite:
  6 files, 25 tests, pass.
- Full sequential `npm test`: 77 files, 452 tests, pass.
- Runtime composition including logout, actual expiry, revocation, SSE closure,
  protected projection/cue clearing, restart, and mutation-capability removal:
  1 file, 13 tests, pass.
- Exact SIASIU current-name contract: 1 file, 3 tests, pass.
- `npm run test:e2e:demo`: 43/43 configured Chromium cases, pass without
  snapshot update.
- `npm run test:e2e:composed`: 3/3 configured Chromium cases, pass without
  snapshot update.

### Static gates

- `npm run lint -- --max-warnings=0`: pass.
- `npm run typecheck`: pass.
- `npm run build`: core TypeScript and production Vite dashboard, pass.
- `npm run audit:dependencies`: zero vulnerabilities, pass.
- SIASIU current product source scan over `src`, `tests`, and `scripts`: zero
  forbidden current-name tokens, pass. The four intentional canonical
  historical-registry references remain documentation, as designed.
- Changed UI source capability scan: no adapter, gateway, server, observation,
  transport, persistence, Node process/filesystem/network, fetch, browser
  storage, or send capability, pass.
- Forbidden runtime/config/package path delta: zero, pass.
- Package and lockfile hash equality to the exact parent: pass.
- All 26 committed visual baseline hashes equal exact parent
  `da5ecc9d1ecd0d331b20724a1f5bfca03d783a10`, pass.
- `git diff --check`, staged diff check, exact path count, exact parent,
  non-force push, clean target worktree, and upstream equality: pass.

No required final check was skipped, weakened, waived, or snapshot-laundered.

## 7. Final production bundle evidence

The final fresh production build transforms 1812 modules and emits:

```text
javascript_file: dist/dashboard/assets/index-DawHVtmG.js
javascript_sha256: 50787269a05d02c4ea78ac74332535c6a9d495c2b5cd1f332c980f6a4f7ede86
javascript_bytes: 372449
javascript_gzip_9n_bytes: 110179
css_file: dist/dashboard/assets/index-BLBX314R.css
css_sha256: 07b8a9b9e74916271a72c39e21612e0283aa8dabf595059a4855c0ba6898c03d
css_bytes: 62897
css_gzip_9n_bytes: 12599
```

Against the accepted AO12-C production base, the post-rework gzip deltas are:

```text
javascript: 27102 bytes
css: 4268 bytes
```

Final fixed-string scan results:

```text
SYNTHETIC_NON_OPERATIONAL_STATIC: 0
SYNTHETIC_STRUCTURED_EVENT_MOTION: 0
AO12-C synthetic accepted-event motion fixture: 0
ao12-b-static-shared-floor: 0
ao12-c-evidence-backed-motion: 0
AO12-B synthetic static shared floor: 0
```

The production source graph also contains zero fixture import, zero static
fixture identifier, and zero optional projection declaration.

## 8. Visual and behavioral preservation

No PNG was added, modified, regenerated, or staged. Exact SHA-256 comparison of
all 26 committed PNG paths to the AO12-D parent passed. The full default-demo
and composed screenshot suites passed against the committed bytes, proving the
19 prior M1/AO12-B/AO12-C baselines and seven AO12-D baseline meanings remain
stable.

Final composed browser evidence remains within the reviewed targets:

```text
pod_selection_p95_ms: 16.899999856948853
long_tasks_over_50_ms: 0
dom_nodes: 377
svg_elements: 84
pending_cues: 0
retained_heap_growth_bytes: 302976
```

The configured-runtime `FULL` classification remains unchanged. No portability
claim is made outside the configured local Chromium/font/runtime.

## 9. Diagnostic note

One ad hoc SIASIU regex was initially run over current sources plus canonical
documentation. It returned the four intentional historical forbidden-name
registry lines and exited nonzero. This was not the product naming gate and did
not identify a current product token. The exact contract test passed 3/3, and
the correctly scoped current-product source scan over `src`, `tests`, and
`scripts` returned zero matches. No required failure was reclassified.

## 10. Forbidden and excluded scope

- Authentication, LocalBootstrap, session, CSRF, SSE, authority, exact Advisor
  delivery, transport, gateway, operational config, package/lock, DB, network,
  secret, credential, and product policy: unchanged.
- Production/live operation, public/private/remote exposure, real tmux input,
  Hermes implementation, external asset/font/fetch, and persistent server:
  none.
- Baseline regeneration, visual redesign, cue/assignment/team behavior change,
  next mission, Fable5 invocation, self-review verdict, risk acceptance, final
  approval, main/protected Agent Office push, merge, force push, and destructive
  Git: none.
- Agent, sub-agent, delegated context, substitute role, and temporary session:
  none.

## 11. Known limits and residual gates

- The correction proves only the exact AO12-D-A1 production fixture boundary;
  it does not independently review or accept the broader AO12-D implementation.
- Configured-runtime visual and performance evidence is not a cross-host,
  browser, or font portability claim.
- Existing project-authored placeholders remain non-production artwork.
- Advisor must validate this exact rework commit and evidence before deciding
  whether to route Fable5. Fable5 review and Advisor acceptance remain pending.
- No later mission starts automatically.

No unresolved STOP condition was encountered inside the exact rework scope.

## 12. Preserved Foundation Docs unrelated state

The following pre-existing Foundation Docs paths remained untouched and are
excluded from result/pointer staging:

- modified `advisor/_system/AGENTS.md`;
- modified `advisor/_system/README.md`;
- modified
  `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
- untracked `advisor/jobs/20260709_reviewer_selection_protocol/`; and
- untracked `advisor/jobs/20260709_role_result_storage_protocol/`.

Only this rework result and its exact pointer are authorized Foundation Docs
artifacts. The immutable result commit is recorded in the pointer because a
result file cannot contain its own commit hash.

## 13. Routing

Advisor must validate Agent Office rework commit
`48c8dbd9f2c5ecea68c28e85137d75db595ef5f9`, the zero-marker build evidence,
this result, and the pointer. This Worker does not invoke Fable5, accept AO12-D,
approve risk, or start another mission.

```text
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
AO12_D_A1_STATUS: CORRECTED_TESTED_DOCUMENTED_AND_PUSHED__PENDING_ADVISOR_VALIDATION
FABLE5_REVIEW_STATUS: NOT_ROUTED_BY_WORKER
NEXT_MISSION_STATUS: NOT_STARTED_NOT_AUTHORIZED
STOP_AFTER_POINTER: true
```
