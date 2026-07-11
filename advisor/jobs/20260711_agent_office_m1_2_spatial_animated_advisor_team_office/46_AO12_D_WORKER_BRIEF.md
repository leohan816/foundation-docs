# AO12-D Worker Brief - Authenticated Spatial Integration And Closure

## Exact Task

Implement the final approved serial batch AO12-D (`AO12-IWU-12..14`) in the
existing Agent Office Worker session using GPT-5.6 SOL Ultra. Start from exact
commit `f9d0533437c0cf9efa7be76650ad79f0cb0d9353` on
`shadow/agent-office-m1-2-spatial-office`.

This batch integrates the reviewed spatial read model into the existing
authenticated loopback application, proves degradation and presentation-only
rollback to unchanged M1, updates as-built canonical documentation, and returns
the final Worker evidence package. It does not authorize final acceptance.

## Required Reads

Read the chained Leo/GPT decision, frozen M1.2 design, cue contract, identity
contract, WorkUnit plan, AO12-C acceptance, Fable5 AO12-C result, active M1
architecture/security/contracts, repository instructions, and actual current
runtime/server/UI/test code. Do not implement from summaries.

## Required Implementation

### AO12-IWU-12 - Additive Authenticated Spatial Projection

- Extend `agent-office.redacted-projection.v1` additively with a versioned
  spatial presentation field while retaining `sceneRoles` unchanged.
- Build the spatial projection only from verified manifest, event, evidence,
  observation, project registration, assignment, and Advisor responsibility
  inputs already accepted by the application authority boundary.
- Never use synthetic demo fixtures in the authenticated application.
- Never include raw pane/session locators, filesystem paths, credentials,
  transport targets, terminal prose, request bodies, or inferred assignments.
- Fail closed for missing/multiple Advisor assignment, source conflict,
  stale/offline/conflict/critical state, invalid schema, and invalid provenance.
- Integrate accepted structured live deltas only when source correspondence,
  revision, and evidence gates pass. Snapshot/reload/login/resume must not replay
  a cue.
- Satisfy the AO12-C expiry carry-forward gate: authenticated cue input must
  contain canonical domain-validated UTC timestamps, or be rejected before the
  cue projector. Add malformed-format negative tests.
- Logout, revocation, expiry, failed refresh, or client stop must clear the
  protected spatial projection and pending presentation cues.
- Keep Inbox, Alerts, Evidence, manual fallback, and exact Advisor delivery
  semantics unchanged.

### AO12-IWU-13 - Selection, Degradation, And Rollback

- Implement an explicit presentation selector with `FULL`, `RESTRAINED`,
  `STATIC`, and unchanged `M1_FIXED_STATIONS` fallback behavior.
- Unknown/invalid/absent spatial schema selects the verified M1 adapter or
  static semantic fallback without ledger, manifest, artifact, authority,
  transport, configuration, or session mutation.
- Reduced motion always receives equivalent STATIC facts and zero task motion.
- Stale/offline/conflict/critical evidence suppresses task motion without hiding
  status, blocker, alerts, evidence, or Team assignment truth.
- A performance miss may lower presentation tier but must not weaken source,
  authority, security, accessibility, or redaction gates.
- Selection and rollback are presentation-only, deterministic, auditable in
  tests, require no data migration, and create no process-side effect.
- Preserve all existing M1 composed tests and all M1/AO12-B/AO12-C committed
  baseline bytes. Add new AO12-D baselines rather than rewriting old evidence.

### AO12-IWU-14 - As-Built Evidence And Closure Package

- Update the five canonical M1.2 documents and `docs/FEATURE_INDEX.md` from the
  actual implementation only.
- Record the exact requirement -> implementation -> test -> evidence -> status
  -> deferred gate traceability.
- Record current implemented scope, rollback, degradation tiers, bundle and
  runtime measurements, security/authority non-change, known limitations, and
  all prohibited future scope.
- Do not rewrite design to excuse a code defect.

## Allowed Change Boundary

Expected bounded paths are:

- `src/application/spatial-office/**` only for production input/selection
  adapters or validation required by AO12-D;
- `src/runtime/projection.ts`;
- `src/server/application.ts`;
- `src/ui/runtime/client.ts`;
- `src/ui/runtime/runtime-app.tsx`;
- `src/ui/dashboard.tsx` only if required for additive selection;
- `src/ui/spatial/**` only for the AO12-D integration/compatibility selector;
- focused contract, runtime, UI, recovery, security, acceptance, and composed
  E2E tests directly proving AO12-D;
- new AO12-D composed PNG baselines under a dedicated new baseline directory;
- the five M1.2 canonical documents and `docs/FEATURE_INDEX.md`.

Before editing an additional path outside this set, STOP and return the exact
technical need to Advisor. Do not modify `package.json`, lockfile, auth,
gateway, tmux transport, operational configuration, deployment, DB, PWA,
existing baseline bytes, or unrelated M1 canonical documents.

## Required Verification

At minimum:

1. focused projection/client/compatibility/rollback/security tests;
2. full sequential Vitest suite;
3. lint and strict typecheck;
4. production build and exact production gzip delta from the AO12-C base;
5. full default-demo and composed Playwright suites;
6. authenticated spatial composed cases at wide desktop, tablet, mobile,
   320px, 200% text, reduced motion, forced colors, stale, offline, conflict,
   critical, unknown schema, logout, expiry/revocation, restart, and M1 fallback;
7. axe WCAG 2.2 A/AA, keyboard, focus, 44px, and screen-reader semantics;
8. direct visual inspection of every new AO12-D baseline;
9. AO12-C browser performance gates on the authenticated selected path, plus
   teardown and no-retained-cue proof;
10. source-boundary and production-bundle scans;
11. all M1/AO12-B/AO12-C baseline blob hashes unchanged;
12. current SIASIU naming gate and dependency audit;
13. Git diff/staged/commit/push/upstream equality; and
14. no persistent service or browser process left running.

Use only synthetic non-sensitive test data. No actual secret, DB, customer,
remote/public/prod/live, real tmux delivery, or external asset access.

## Completion Evidence

Worker result:

`../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_D_RESULT.md`

Pointer:

`../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/47_WORKER_AO12_D_RESULT_POINTER.md`

Return exact paths, diff, test counts, visual list, performance/bundle values,
baseline hashes, security/authority boundary evidence, rollback proof, known
limitations, Agent Office commit, Foundation Docs result/pointer commits, and
upstream equality. Worker must not self-review or claim final approval.

## Stop Conditions

STOP for any new product decision, M1 incompatibility, unvalidated input that
cannot fail closed, authentication/authority/transport change, public/remote
need, DB/schema/migration, secret/privilege prompt, external asset/dependency,
protected branch, destructive Git action, inability to roll back, or material
scope expansion.

AO12-D is the last implementation batch. Do not start another mission.
