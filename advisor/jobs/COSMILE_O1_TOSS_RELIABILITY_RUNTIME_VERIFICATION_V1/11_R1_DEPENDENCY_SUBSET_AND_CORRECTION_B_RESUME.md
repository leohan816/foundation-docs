# FOUNDATION ADVISOR ADDENDUM — R1 DEPENDENCY SUBSET AND CORRECTION B RESUME

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
AUTHORITY: STRATEGY_APPROVE_R1_DEPENDENCY_SUBSET_AND_RESUME_CORRECTION_B
PRODUCT_BASE: 2faf7497448541d1bb42f3fcdb6141214f8c5608
PARENT_HANDOFF_COMMIT: fd76bc95f7532f55e8c2a3f30fe6e0f541c041ee
R1_DB_RUNTIME_PROVIDER: BLOCKED
```

## Frozen dependency subset

- CWD: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/app`
- `package.json` SHA-256: `a486716043eda96a51fe0ef1817c023dd81588ebf1b2e61f8e43d0ed20ae66c4`
- `package-lock.json` SHA-256: `36dfa1a40fc8c10a3283e3871f248bf52e9add41bee16b624911a10d7ed8ab79`
- Lock format: npm lockfile v3; root `app@0.1.0`; Node `v24.18.0`; npm `11.16.0`.
- Registry boundary: `https://registry.npmjs.org/` only; `.npmrc` absent at worktree app, worktree root, and `/home/leo`.
- Root lifecycle scripts: none. Six locked dependencies declare install scripts; all lifecycle scripts remain suppressed. If the focused test requires one, STOP rather than enabling it.
- Real local artifact: worktree `app/node_modules` only; it must not be a symlink and must remain ignored/untracked.
- Cache: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/runtime/npm-cache` only, owner-only; remove after install evidence.
- Exact install command, once:
  `npm ci --ignore-scripts --no-audit --no-fund --prefer-offline --progress=false --loglevel=error --registry=https://registry.npmjs.org/ --cache /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/runtime/npm-cache`
- No shared-tree read/write/symlink/copy, credential, DB, runtime, provider, build, typecheck, Prisma generate, manifest/lock/config/source write, or broad test.
- Failure cleanup: remove only the new worktree `app/node_modules` and mission-local npm cache; preserve the unaccepted 122-line test delta; return HOLD.
- Success checks: package/lock hashes unchanged; `app/node_modules` is a real ignored local directory; no other tracked/untracked artifact; remove mission-local npm cache; preserve local `node_modules` only for Correction B.

## Worker resume after dependency PASS

- Same Cosmile Worker, Opus 4.8/xhigh, exact CWD, fresh context, pane isolated; `/fable-builder` with the same parent-handoff references.
- The existing 122-line test delta remains `UNACCEPTED` until the exact named RED executes and fails for the missing frozen behavior.
- Run only the existing named RED filter; if valid, patch only `app/src/lib/payment/webhook.ts` and `app/src/lib/runtime/o1CommerceRuntime.ts`; run the identical named GREEN filter.
- Audit only the parent handoff's exact three product paths, commit/non-force-push once, compact return, STOP.
- No Reviewer unless the actual delta changes tier. No DB/runtime/provider R1.
