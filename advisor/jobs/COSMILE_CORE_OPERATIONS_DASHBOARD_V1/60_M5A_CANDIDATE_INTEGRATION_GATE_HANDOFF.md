# M5A Candidate Integration Gate — Worker Handoff

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M5A_CANDIDATE_INTEGRATION_GATE`
ACTOR: existing Cosmile Worker
MODEL/EFFORT: `claude-opus-5/xhigh`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`; `implementation-report-template` only at return

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch: `implementation/cosmile-core-operations-dashboard-v1-20260725`
- Candidate HEAD: `c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`
- M4 evidence: docs `39f53a35367332f1f919faad1f18ce53aeae1472`
- Public port-3000 runtime remains untouched.

## Product write ceiling

`NONE`. No source, test, fixture, schema, migration, config, manifest or lock edit. This gate admits or rejects the existing candidate.

## Preflight

Verify exact clean/upstream-equal HEAD and unchanged `app/package.json` / `app/package-lock.json`. `app/node_modules` must be the existing real ignored worktree-local directory from M3: not a symlink and not resolved outside this worktree. No install, copy, symlink or dependency command.

## Exact one-time command inventory

Run in `app/` and preserve the first actionable failure:

1. One local Prisma client generation:

   `DATABASE_URL=postgresql://127.0.0.1:1/o1_build_validation CHECKPOINT_DISABLE=1 PRISMA_GENERATE_SKIP_AUTOINSTALL=1 ./node_modules/.bin/prisma generate --schema prisma/schema.prisma`

   This closed-loopback value is synthetic/non-secret and must not be persisted or connected. STOP on install/download/network/DB attempt, tracked change, or output outside ignored local dependency artifacts.

2. One focused integration test gate:

   `./node_modules/.bin/vitest run scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_dashboard_reads.vitest.ts scripts/o1_storefront_navigation.vitest.ts`

3. One non-incremental typecheck:

   `DATABASE_URL=postgresql://127.0.0.1:1/o1_build_validation ./node_modules/.bin/tsc --noEmit --incremental false`

4. Only if typecheck passes, one non-production build:

   `DATABASE_URL=postgresql://127.0.0.1:1/o1_build_validation NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next build`

No repetition. No full Vitest gate, lint, DB, browser, app start, provider, Google, public-host or economic action.

## Evidence and completion

- Record categorical exit/result and exact test counts only; never output environment values beyond the literal synthetic value above.
- Verify package/lock bytes unchanged, product tracked delta none, HEAD/upstream unchanged.
- Remove only mission-created `*.tsbuildinfo`; preserve `.next` and local generated client for the independently reviewed browser-acceptance stage if all gates pass.
- On first failure, STOP with that exact category and do not diagnose or correct.
- Write only compact result/pointer under the existing docs job; no product commit or push.
- STOP before Reviewer, Google identity capture, DB migration/provisioning, public runtime switch and browser acceptance.
