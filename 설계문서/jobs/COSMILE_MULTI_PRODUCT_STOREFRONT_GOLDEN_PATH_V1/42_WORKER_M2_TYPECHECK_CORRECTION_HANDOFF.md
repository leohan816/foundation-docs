# M2 TYPECHECK CORRECTION — WORKER HANDOFF

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `f0842bd96e54b6b5b757a390578247d7483a0776`
- Classification: pre-existing test-only TypeScript inference defect; product/runtime behavior unchanged.
- SKILL: `/fable-builder`; applicable references already loaded: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`.

## Exact ceiling

1. `app/scripts/operator_authority_contract.vitest.ts`

## Exact correction

- Preserve the already-captured RED: `npm run typecheck` generated Prisma successfully, then failed only at lines 60/62 because helper `az` inferred its `cap` parameter as literal `"orders.read"`.
- Import/reuse the existing `OperatorCapability` type from `@/lib/operator/capability`.
- Annotate only the helper parameter so every existing catalog capability is accepted by TypeScript; do not change any assertion, capability, authority behavior, product source, schema, or runtime.
- Run exactly one non-incremental direct TypeScript check after the edit: `cd app && ./node_modules/.bin/tsc --noEmit --incremental false`.
- Inspect the exact one-path diff; commit and non-force push only on PASS.
- No Prisma generate, build, Vitest, DB, provider, browser, install, or unrelated command.
- Return compact PASS/HOLD and STOP.
