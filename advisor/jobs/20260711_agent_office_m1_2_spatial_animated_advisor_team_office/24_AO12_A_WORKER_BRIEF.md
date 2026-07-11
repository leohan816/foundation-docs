# AO12-A Worker Brief

Status: `READY_FOR_EXISTING_AGENT_OFFICE_WORKER`

Actor/model: **Agent Office Worker — GPT-5.6 SOL Ultra**

Target:

- repo: `/home/leo/Project/agent-office`
- branch: `shadow/agent-office-m1-2-spatial-office`
- exact base: `b7d8cdb21183bf909a13b902cffc95bf15c68dd9`
- batch: `AO12-A`
- WorkUnits: `AO12-IWU-01..04`

## Objective

Implement the frozen M1.2 projection contracts, M1 fixed-station compatibility,
Team Pod projection, Single Advisor Team fail-closed resolver, and exact current
`SIASIU` naming correction. Do not select or mount the new spatial UI in the
production/private projection yet.

## Allowed Agent Office Paths

New implementation and tests:

- `src/application/spatial-office/types.ts`
- `src/application/spatial-office/validation.ts`
- `src/application/spatial-office/m1-fixed-station-adapter.ts`
- `src/application/spatial-office/projector.ts`
- `src/application/spatial-office/fixtures.ts`
- `src/application/spatial-office/assignment-resolver.ts`
- `tests/contract/spatial-office-projection.test.ts`
- `tests/contract/siasiu-current-name.test.ts`
- `tests/ui/m1-spatial-adapter.test.ts`
- `tests/ui/spatial-office-projector.test.ts`
- `tests/ui/spatial-assignment.test.ts`
- `scripts/check-current-product-name.mjs`

Exact naming-only compatibility edits:

- `src/runtime/operational-config.ts`
- `src/ui/scene/types.ts`
- `tests/integration/exact-advisor-delivery.test.ts`

Mechanical frozen-status/traceability updates only, without changing reviewed
product intent:

- `docs/FEATURE_INDEX.md`
- `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
- `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
- `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`

No other path is allowed. If a necessary path is missing, STOP and return it to
Advisor instead of broadening scope.

## Required Invariants

- Validate exact `agent-office.spatial-office-projection.v1` data.
- Reject unknown versions/fields, duplicate IDs, inconsistent refs, unsafe
  path/target-shaped data, raw locators/credentials/private transport/terminal
  content, and inferred mission-board facts.
- Preserve deterministic canonical serialization.
- Preserve the exact eight M1 stations, state/activity precedence, route phases,
  duration caps, accepted IDs, deduplication, and mobile pagination.
- Unknown spatial versions fall back to static unchanged M1.
- Projector keeps all registered Team Pods in one shared-floor projection and
  uses stable `projectId` selection, never activity/timestamp inference.
- Every active actor resolves to exactly one responsible Advisor Team and one
  compatible `roleInstanceId`; missing/multiple/conflicting values produce
  `UNASSIGNED`, block work receipt, and suppress task motion.
- Preserve exact Foundation/conditional VibeNews Team membership and Reviewer
  independence. Agent Office remains a Foundation Team member.
- One active actor or Advisor instance is never cloned.
- Remove current product `Shashu`/`샤슈`/`SHASHU`/`shashu` tokens from source,
  UI, fixtures, labels, locale strings, tests, and baselines. Do not retain a
  raw forbidden token in a negative fixture or scanner source. Explicitly
  marked historical documentation is outside the current-product scan.
- Naming correction changes no actor ID, authority, assignment, transport,
  event, state, or baseline pixels.

## Forbidden

- No AO12-B/C/D UI, characters, Channy visuals, motion, production projection
  selection, runtime activation, server exposure, or asset creation/import.
- No auth, exact Advisor delivery, gateway, transport, DB, schema, migration,
  secret, credential, environment value, public/remote/prod/live, Hermes,
  browser role dispatch, arbitrary shell, dependency, lockfile, or package
  change.
- No existing visual baseline update. A changed baseline is a STOP condition.
- No new session, agent, sub-agent, delegated context, Designer, self-review,
  risk acceptance, final approval, main push/merge, force push, or next batch.

## Required Checks

Run and report:

1. focused new contract/adapter/projector/assignment/name tests;
2. `node scripts/check-current-product-name.mjs`;
3. `npm run lint`;
4. `npm run typecheck`;
5. `npm test`;
6. `npm run build`;
7. `npm run test:e2e` using only existing loopback test configuration;
8. `npm run audit:dependencies`;
9. source-boundary scan proving no process/network/write/dispatch dependency in
   `src/application/spatial-office/`;
10. SHA-256 comparison proving all six pre-existing visual baseline files are
    byte-identical to base `b7d8cdb`;
11. current-product forbidden-name scan with zero hits outside explicitly marked
    historical documentation;
12. exact changed/staged path audit and `git diff --check`.

Do not update snapshots. Do not start a persistent server. Playwright may use
only its existing loopback test server and must terminate it.

## Completion and Evidence

- Commit and non-force push the exact batch to the current branch.
- Target result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_A_RESULT.md`
- Pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/25_WORKER_AO12_A_RESULT_POINTER.md`
- Commit/push only those exact Foundation Docs result/pointer files.
- Return ASCII-only pointer to Advisor and STOP. Do not invoke Fable5 or AO12-B.
