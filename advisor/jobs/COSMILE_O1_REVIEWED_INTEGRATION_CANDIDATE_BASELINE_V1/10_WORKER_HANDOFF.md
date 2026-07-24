# Worker Handoff — Integration Candidate Evidence

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh
PRODUCT_WRITE: `PROHIBITED`

## Binding and skill

Every command must explicitly bind to:
`/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`.
Verify branch, exact `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`, clean/upstream equality, and zero product delta before action.
Load `/fable-builder`; use `implementation-execution` and `implementation-report-template`. Current Agent Office and repository authority control.

## Exact execution

Use owner-only mission temporary root:
`/home/leo/Project/.mission-tmp/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`.

1. Record canonical package/lock plus `.prisma/client`, `@prisma/client`, and `prisma` targeted baselines with a fixed `LC_ALL=en_US.UTF-8` method. Do not execute, copy, link, or write canonical dependencies.
2. Confirm worktree `app/node_modules`, `.next`, `next-env.d.ts`, and tsbuildinfo are absent.
3. Run exactly one worktree-local `npm ci --no-audit --no-fund` with mission-local `HOME`, `XDG_CACHE_HOME`, and npm cache. Do not change package metadata. Network is limited to lockfile-pinned registry artifacts and official Prisma `6.19.3` engine provisioning.
4. Run exactly once in a `bwrap --unshare-net` boundary:
   `npm run test:focused -- --cache=false`
   with a non-secret closed-loopback `DATABASE_URL`, Prisma autoinstall/checkpoint/update messaging disabled, and telemetry disabled.
5. Require visible `prisma:generate` first, generated client `6.19.3`, and the complete current Vitest gate. Preserve exact pass/fail/skip/file counts and the first actionable failure.
6. Do not run typecheck, build, lint, another test, provider/DB/runtime command, or a retry.
7. Unconditionally remove only worktree dependencies, mission cache/temp, `.next`, `next-env.d.ts`, tsbuildinfo, and test cache. Recompute the fixed-locale canonical baselines and require equality.
8. Verify exact head, clean/upstream equality, no tracked/untracked product residue, and no lingering child process.

On PASS, write only these uncommitted docs files:

- `advisor/jobs/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1/11_WORKER_RESULT.md`
- `advisor/jobs/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1/12_WORKER_POINTER.md`

On failure, write the same paths with the preserved failure and STOP. Do not commit, push, patch, or propose a correction.
Return a compact evidence index to `foundation-advisor` and STOP.
