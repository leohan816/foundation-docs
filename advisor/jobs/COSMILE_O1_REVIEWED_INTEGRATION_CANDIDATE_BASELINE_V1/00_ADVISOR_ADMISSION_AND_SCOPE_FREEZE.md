# Advisor Admission and Scope Freeze

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DATE: `2026-07-24`

## Exact subject

- Product head: `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`
- Integration branch: `integration/cosmile-o1-reviewed-candidate-baseline-v1-20260724`
- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`
- Docs base: `856a43e5ae58bc21f5fbe8b05d9f945a777d5319`
- Docs branch: `advisor/cosmile-o1-reviewed-integration-candidate-baseline-v1-20260724`
- Both branches were created and non-force pushed clean/upstream-equal. The product branch contains no commit or code change beyond the exact subject head.

## Verified ancestry and evidence pins

| Layer | Product pin | Final evidence pin |
|---|---|---|
| Browser Golden Commerce/runtime | `94693d26cec3c2e9ac830e9d2c2f6235dcf4c011` | `d61aae109bf3089a9f3d017483d9cb79af55d721` |
| Commerce-spine legacy/mock isolation | `02bb064cf24da568dc83be53afb8afe1e984acea` | `3f4f7407c823db47b302de07dd83ad7511528a1c` |
| Toss notification/retry/reconciliation substrate | `2faf7497448541d1bb42f3fcdb6141214f8c5608` | `f66228fae2e75bcd0255e063e5bcd6d146040040` |
| Runtime verification preserved HOLD evidence | `824b41751238390b8baf54a3be68ee82a4d5823f` | `b99d4519ccb7a8144be3d08c3073d0b2e7770717` |
| Query observability + terminal non-capture closure | `92331e755323d9b4d750a3da0b721df36197f588` | `16a759029ae44a5b8fc0adf302989a9cc38b5b6b` |
| Customer cancellation/support queue | `1e2475a02b9210e382efde7740777684d0cb4dba` | `a6219c12e69c86d01ede2d4f2262cd74eb54a684` |
| Independent operator Console core | `33e0d857d887fbe993fc27a25477528a8b5425ba` | `c4150d89cca4f910e69fb4b26bdee9d62673a5e2` |
| Prisma generate-first baseline | `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80` | `856a43e5ae58bc21f5fbe8b05d9f945a777d5319` |

Every named product pin is an ancestor of the subject. The runtime-verification HOLD is not rewritten as PASS; its provider uncertainty was later closed by the separately reviewed query-observability mission.

## Exact missing evidence and command ceiling

No product path is authorized to change. Run only:

1. one worktree-local normal `npm ci --no-audit --no-fund` from the unchanged lockfile;
2. one network-isolated `npm run test:focused -- --cache=false`, which must visibly run `prisma:generate` first and then the complete current Vitest inventory.

Reuse the same-head Prisma mission typecheck and non-production build evidence; do not repeat either. No schema/migration/lockfile/dependency/UI/runtime/provider/DB action, feature work, lint, separate test, retry, or correction is authorized.

The normal install may access only lockfile-pinned npm registry artifacts and official Prisma `6.19.3` engine provisioning. The test/generation gate is network-isolated. Canonical `/home/leo/Project/Cosmile/app/node_modules` remains read-only and unused.

On first gate failure, preserve the exact result and return to Advisor before any correction. Always remove mission dependencies/cache/build residue and prove product Git remains the exact clean/upstream-equal head.

## Review admission

Independent review is required after a stable evidence candidate. Provisional tier:
`NORMAL_COMPLEX_BOUNDED`, `Claude Opus 4.8/max`, `/fable-sentinel`, exact zero-product-delta branch plus this mission's integration evidence only. No Fable 5 trigger is present.
