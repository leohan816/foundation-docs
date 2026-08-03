# Cosmile Worker handoff — consume direct Foundation eight-product dataset

MISSION_ID: `COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1 / F2`

ACTOR: existing `cosmile:claude.0`; actual Claude Opus 5 / xhigh; `/fable-builder`; return to foundation-advisor.

## Binding and frozen upstream

- Cosmile worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`
- branch/base: `implementation/cosmile-eight-elt-nonproduction-mock-catalog-completion-v1-20260803` @ `82fb922b64a38d563db91cc87736a229fa5558dc`
- Foundation code/data pins: `8a838b0f929afe69987737fb5fc431b6537ae647` / `f561f448e3728293509c9a7e20634af356d4c826`; Advisor gate `08`.
- Bind every command/edit explicitly to this worktree because the pane root is a predecessor. Verify branch/base and the exact preserved four-path uncommitted delta before editing.

## Supersession and preserved RED evidence

- `01`/`01A` are superseded where they define a Cosmile-owned hard-coded product/price/stock overlay or special eighth status. Foundation now delivers all eight direct values through the ordinary versioned dataset.
- Preserve the useful intent of the three uncommitted test deltas, but rewrite their hard-coded eight-ID/price/stock oracles to the data-driven bundle contract below.
- The four-line uncommitted source change in `o1TestCandidateCatalog.ts` is stale hard-coded overlay implementation; restore only that source file to base before the new RED. Do not reset the three test files.
- Preserve the prior `7 failed / 38 passed / 2 skipped` as superseded RED evidence. The new meaningful RED must prove base Cosmile rejects Foundation's ordinary `commerce` group and/or still depends on the local frozen overlay.

## Exact six-path ceiling

1. `app/src/lib/foundation/snapshotContract.ts`
2. `app/src/lib/foundation/snapshotRepository.ts`
3. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
4. `app/scripts/o1_test_candidate_catalog.vitest.ts`
5. `app/scripts/o1_test_candidate_catalog_setup.vitest.ts`
6. `app/scripts/o1_multi_product_storefront.vitest.ts`

No `o1CommerceRuntime.ts`, screen/page/component, schema/migration/config/manifest/lock, Foundation file, DB/runtime/provider/economic path. If a seventh path is demonstrably required, HOLD before edit.

## Frozen direct-data contract

1. Bring Cosmile `snapshotContract.ts` into exact parity for Foundation's minimal ordinary `content.commerce` group: exact keys `currency`, `price`, `stock_quantity`, `sales_status`, `stock_status`; KRW; nonnegative integers; active/in_stock; permitted only with `TEST_ONLY_CANDIDATE`. All other commerce-key exclusion, nonproduction/evidence/gates and approved-lane denial remain unchanged.
2. Product set and commerce rows come only from the internally verified single initial bundle manifest/documents. Remove the static `TEST_CANDIDATE_PRODUCT_IDS` and `TEST_CANDIDATE_OVERLAY` business table from implementation; no ELT product-ID/price/stock literal may remain in the three source paths.
3. Derive each Cosmile SKU deterministically from the verified Foundation product ID under the existing `o1tc_` namespace. Price/stock come from that document's validated `content.commerce`; display/detail content stays Foundation-owned.
4. Keep every durable entry point fail closed independently. Import must internally build/verify the plan. Seed/bind/activate must rederive the expected rows/set from the same configured bundle root and compare/act on that exact set; no caller-provided foreign/subset/extra/tampered row becomes authority.
5. The runtime root proof, Google-only/nonproduction/Toss-TEST gates, `missing_initial` lifecycle, idempotent replay, inactive/hidden seed, atomic all-set activation, predecessor rule and zero-CommerceOffer behavior stay intact. No new write path or economic effect.
6. Generic add/delete/change behavior: production code has no product ID/count/table branch. The current pinned Foundation bundle provides exactly eight; focused integration fixtures and later isolated bundle evidence assert current count 8 and no ninth. A changed future versioned dataset is data/config work, not source branching.
7. All eight use the unchanged shared catalog/detail/wishlist/cart/checkout-preflight path. No product-specific UI/status/warning badge and no duplicated commerce logic.

## Tests first and exact gate

1. Revise only the three existing test deltas first, restore the one stale source file, then run RED from `app/`:
   `npx vitest run --config vitest.config.ts scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_test_candidate_catalog_setup.vitest.ts scripts/o1_multi_product_storefront.vitest.ts`
2. Tests must prove: candidate-only commerce parity; bundle-derived distinct rows; exact current fixture 8/no ninth; no hard-coded product values in source; tampered/subset/extra/duplicate refusal at every durable boundary; production/non-TEST/root mismatch refusal before Prisma/fs writes; generic screens unchanged and no ID/count branch.
3. Implement only the three source paths, then run the identical command once for GREEN and `git diff --check` on the exact six paths.
4. One temporary ignored `app/node_modules` symlink to the unchanged reviewed candidate dependency directory is allowed only under the already-approved containment; remove immediately after the focused gate and prove target unchanged/no cache/process residue. No install/generate/copy.

## Completion

- Commit/non-force push the exact six-path candidate only; clean/upstream-equal.
- Write only `10_COSMILE_F2_WORKER_RESULT.md` and `11_COSMILE_F2_WORKER_POINTER.md` in the mission docs worktree, commit/non-force push, then STOP before runtime/DB/provider/browser action.
- Return actual model/effort, paths, RED/GREEN, containment, commit and `RETURN_TO: foundation-advisor`.

HOLD before schema/migration, DB/provider/economic action, ninth product, payment/auth/dashboard/Console/Lab change, product-specific branch, broad rewrite or any path expansion.

