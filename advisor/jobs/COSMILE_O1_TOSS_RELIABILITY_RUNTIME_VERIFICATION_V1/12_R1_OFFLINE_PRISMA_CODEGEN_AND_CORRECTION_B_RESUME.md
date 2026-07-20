# FOUNDATION ADVISOR ADDENDUM — OFFLINE PRISMA CODEGEN

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
AUTHORITY: STRATEGY_APPROVE_OFFLINE_WORKTREE_PRISMA_GENERATE_AND_RESUME
PRODUCT_BASE: 2faf7497448541d1bb42f3fcdb6141214f8c5608
PARENT_HANDOFF: fd76bc95f7532f55e8c2a3f30fe6e0f541c041ee
DEPENDENCY_ADDENDUM: fe9be48b3cd9865de6a65d00e6c82cd48c7463b3
```

- Repeat exactly the scripts-disabled lockfile `npm ci` frozen at `fe9be48`; package/lock hashes must remain `a4867160…66c4` and `36dfa1a4…ab79`.
- Run exactly one locked worktree CLI command: `./node_modules/.bin/prisma generate --schema prisma/schema.prisma`.
- Network isolation: `bwrap --unshare-net`, read-only `/`, writable bind only for worktree `app/node_modules`, ephemeral `/tmp`; no shared tree.
- Process-only sentinel: `DATABASE_URL=postgresql://o1_codegen:unused@127.0.0.1:1/o1_codegen`; never persist or connect. Set `CHECKPOINT_DISABLE=1` and `PRISMA_HIDE_UPDATE_MESSAGE=1`.
- Allowed generated output: ignored worktree `app/node_modules` only. No tracked/package/lock/config/schema change, DB/migration, provider, runtime, build, typecheck, test beyond the later named Correction B filter, or lifecycle enablement.
- If generate needs network, DB, another writable path, or changes tracked/package metadata: cleanup exact dependency/codegen artifacts and STOP.
- After codegen PASS, same Cosmile Worker Opus 4.8/xhigh and `/fable-builder`: run the existing exact named behavioral RED; only on valid RED patch `webhook.ts` and `o1CommerceRuntime.ts`; run identical GREEN; audit the exact three-path delta; commit/non-force-push once; compact return; STOP.
- No other R1 work and no Reviewer.
