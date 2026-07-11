# AO12-C Worker Brief

Status: `READY_FOR_EXISTING_AGENT_OFFICE_WORKER`

Actor/model: **Agent Office Worker - GPT-5.6 SOL Ultra**

Target:

- repo: `/home/leo/Project/agent-office`
- branch: `shadow/agent-office-m1-2-spatial-office`
- exact base: `4b751c6af5b7a1091251273776af3ee8cf1af316`
- batch: `AO12-C`
- WorkUnits: `AO12-IWU-09..11`

## Objective

Implement the frozen, evidence-backed spatial presentation layer on top of the
accepted static AO12-B fixture. A cue remains a disposable UI projection, never
evidence, authority, transport, acknowledgement, verdict, or mission state.
Only a new accepted structured `LIVE_DELTA` may create task-signifying motion.

AO12-C remains synthetic test/demo-only. Authenticated application projection
wiring and production selection belong exclusively to AO12-D.

## Exact Allowed Paths

New or changed AO12-C implementation:

- `src/ui/spatial/cue-projector.ts`
- `src/ui/spatial/cue-reducer.ts`
- `src/ui/spatial/spatial-routes.tsx`
- `src/ui/spatial/actor-zone.tsx`
- `src/ui/spatial/lounge.tsx`
- `src/ui/spatial/channy-presentation.tsx`
- `src/ui/spatial/spatial-office.tsx`
- `src/ui/spatial/team-pod.tsx`
- `src/ui/spatial/fixtures.ts`
- `src/ui/spatial/spatial-office.css`
- `src/ui/demo-entry.tsx`, only for an explicit synthetic spatial-motion fixture
  selector; default M1 demo and production entry must remain unchanged.

New proof:

- `tests/ui/spatial-cue-mapping.test.ts`
- `tests/ui/spatial-cue-precedence.test.ts`
- `tests/ui/spatial-routes.component.test.tsx`
- `tests/ui/spatial-channy-presentation.test.tsx`
- `tests/e2e/spatial-office-motion.spec.ts`
- `tests/e2e/spatial-office-accessibility.spec.ts`
- `tests/performance/spatial-office-budget.test.ts`
- new baseline files only below exact new AO12-C baseline directories created
  by those two E2E specs.

Mechanical as-built status and traceability only:

- `docs/FEATURE_INDEX.md`
- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
- `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
- `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`

No other path is allowed. If a required implementation cannot fit this exact
allowlist, STOP and return the path and reason to Advisor.

## AO12-IWU-09 Cue Projector and Reducer

- Implement the exact `agent-office.spatial-cue.v1` envelope and deterministic
  canonical-JSON SHA-256 `cueId` from the frozen contract.
- Enqueue only from a strictly newer `LIVE_DELTA` with new accepted source IDs,
  current/connected evidence, exact state/activity correspondence, one valid
  assignment, one responsible Advisor Team, and required verified evidence.
- Initial snapshot, reload, cursor reset, tab resume, Pod selection,
  orientation change, and non-selected Pod updates queue nothing and never
  replay.
- Implement every frozen structured mapping: Leo/GPT handoff, dispatch,
  reading, working, testing, writing result, review handoff/review/verdict,
  blocked, `WAITING_LEO`, result return, patch return, completion
  acknowledgement, recovery, and verified-idle relocation.
- Apply exact suppression, precedence, deterministic tie-break, three-cue cap,
  one-route cap, one-cue-per-actor cap, coalescing, overflow-to-accessible-log,
  bounded seen-set, conflict reset, and no-delayed-replay behavior.
- Terminal/model/process-shaped prose and timestamps alone must not affect cue
  output. Completion/cancellation must call no adapter and append no event.

## AO12-IWU-10 Routes, Poses, Lounge, and Channy

- Resolve semantic zone endpoints only. Hidden, paged, missing, or ambiguous
  endpoints use immediate static timeline equivalence, never auto-scroll or
  focus movement.
- Permit at most one route actor/document pair; cue duration is 150-1200ms;
  animate transform/opacity only. No layout/camera/focus animation, sound,
  flash, shake, parallax, or perpetual task loop.
- Operational state always overrides ambient presentation.
- Verified-idle presentation is allowed only for current, connected, exact
  `IDLE` evidence and may not imply availability, assignment, shared context,
  communication, collaboration, approval, review, delivery, or progress.
- Implement one global Channy presentation only within the approved
  `NON_OPERATIONAL_AMBIENT_COMPANION_AND_STRUCTURED_STATUS_REFLECTOR` boundary.
  It may be neutral ambient, briefly follow an already accepted route, or
  reflect accepted `WAITING_LEO`, `BLOCKED`, stale/offline, completion, and
  routing state. It cannot inspect sessions, infer state, create evidence,
  dispatch, carry commands, approve, repair, or replace primary status UI.
- Reduced-motion, motion-off, and static tiers must expose the exact same facts,
  focus order, live-region policy, and activity log without movement.

## AO12-IWU-11 Accessibility, Visual, and Performance Proof

- Prove desktop/tablet/mobile/320px/200%-text/short-landscape containment;
  wide desktop keeps all Team Pods spatially recognizable, while mobile uses
  the frozen focused navigation model.
- Directly inspect every new AO12-C baseline, including full-motion,
  restrained/static, reduced-motion, forced-colors, mobile, and 200% text.
- Prove no essential information is motion-only; no overlap, horizontal loss,
  hidden critical content, actor clone, or delayed replay; 44px controls,
  keyboard/focus/live-region behavior, and WCAG 2.2 A/AA automated checks.
- Use the exact synthetic benchmark fixture: 12 Pods, 64 assignments, 200
  WorkUnits, long Korean/English labels, six alerts, and a three-cue burst.
- Record reference host/browser/build, fixture hash, sample count, percentile
  method, p95 reducer and Pod-switch times, active-frame work, long tasks,
  incremental gzip size, DOM/SVG counts, heap method/growth, and unmount/logout
  retained listeners/observers/animations.
- Classify honestly as `FULL`, `RESTRAINED`, or `STATIC`. A missed hard target
  cannot be reported as passed; `FULL` is blocked unless every required
  benchmark passes. Do not remove accessible semantics to meet a budget.

## Preservation and Rollback

- Keep the six existing M1 baselines and six AO12-B baselines byte-identical.
- Keep package/lockfile and dependencies unchanged.
- Keep M1 event bytes, state/activity mapping, precedence, accepted IDs, route
  semantics, authentication, exact Advisor delivery, authority, gateway,
  transport, and production selection unchanged.
- Rollback is removal/disablement of the AO12-C cue layer while retaining the
  reviewed AO12-B static fixture. If needed, the unchanged M1 adapter remains
  the final static fallback. There is no durable event/data rollback.

## Forbidden

- No AO12-D production/authenticated projection integration, runtime
  composition, server/application projection, compatibility selector, or final
  closure work.
- No runtime authority, transport, exact delivery, authentication, browser
  Worker/Reviewer dispatch, arbitrary shell capability, DB, schema, migration,
  secret, remote/public/prod/live, Tailscale, Hermes, external asset, package,
  dependency, lockfile, persistent server, main merge, force push, new session,
  agent, sub-agent, delegated context, self-review, risk acceptance, final
  approval, or next mission.
- No animation from terminal prose, timestamps alone, proximity, stale data, or
  unverified fixture text. No Channy operational behavior.

## Required Checks

1. focused cue mapping, precedence, route, Channy, accessibility, and benchmark
   suites;
2. full sequential `npm test`;
3. `npm run lint`, `npm run typecheck`, and `npm run build`;
4. current product-name gate and exact SIASIU spelling;
5. AO12-C motion/accessibility Playwright specs and full default/composed E2E;
6. direct inspection of every new PNG and exact configured runtime/locale note;
7. exact benchmark report with honest tier classification;
8. source-boundary scan proving no process/network/write/dispatch/adapter import
   in the cue and spatial presentation modules;
9. axe, keyboard, focus, live-region, 44px, reduced/static, forced-color,
   320px, 200%-text, mobile/tablet, suppression, no-replay, no-clone proof;
10. M1 and AO12-B baseline SHA-256 equality;
11. package/lockfile equality, dependency audit, exact changed/staged allowlist,
    upstream equality, and `git diff --check`;
12. no persistent Vite/Playwright/Chromium process after tests.

## Completion and Evidence

- Commit and non-force push the exact batch to the current branch.
- Target result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_C_RESULT.md`
- Pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/41_WORKER_AO12_C_RESULT_POINTER.md`
- Commit/push only those exact Foundation Docs result/pointer files.
- Return an ASCII-only pointer to Advisor and STOP. Do not invoke Fable5 or
  start AO12-D.
