# Advisor F2 Slice B handoff — bundle-derived durable candidate path

Status: `PROCEED`

## Gate and binding

- Slice A PASS: Cosmile `3ae4513b5e39224dcca04647b2622176c4e0b6d3`, pushed/upstream-equal; exact committed paths `snapshotContract.ts` + `o1_test_candidate_catalog.vitest.ts`; GREEN 35/35.
- Preserved dirty residue is exactly two tests: `o1_multi_product_storefront.vitest.ts`, `o1_test_candidate_catalog_setup.vitest.ts`.
- Same `cosmile:claude.0`, Opus 5/xhigh, mission worktree/branch; no clear/restart/exit/model/actor change.

## Exact five-path Slice B ceiling

1. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
2. `app/src/lib/foundation/snapshotRepository.ts`
3. `app/scripts/o1_test_candidate_catalog.vitest.ts`
4. `app/scripts/o1_test_candidate_catalog_setup.vitest.ts`
5. `app/scripts/o1_multi_product_storefront.vitest.ts`

No other path. `snapshotContract.ts` is frozen at Slice A and must not change.

## Tests first

Rewrite only the three test files into plan-relative/data-driven oracles before source edits. Current Foundation fixture may contain eight distinct generated documents/rows; the source must contain no ELT ID/count/price/stock table. Preserve adversarial cases rather than bulk-deleting them.

RED command (then identical GREEN once):

`npx vitest run --config vitest.config.ts scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_test_candidate_catalog_setup.vitest.ts scripts/o1_multi_product_storefront.vitest.ts`

RED must prove at least one load-bearing base defect: static membership/overlay authority or caller-supplied seed/activation set.

## Frozen source mapping — no further design choice

- Export deterministic `candidateSkuId(productId)` and a pure `buildCandidatePlan(verifiedDocs)` that validates each candidate document, extracts its validated `content.commerce`, derives SKU, rejects empty/duplicate product/SKU rows and returns the exact plan. It generates no product value.
- `decideCandidateAdmission` keeps snapshot/candidate/gate checks but removes local membership authority.
- All set/pair/activation decisions compare against an explicit verified plan, never a module-level table.
- `snapshotRepository.ts` owns bundle-root rederivation: internally `buildImportPlan(root)`, validate one initial manifest/no notices/every candidate doc, derive the plan, and return/use its rows.
- Import outcome may carry the verified rows for the orchestrator. Seed takes no caller overlay and internally rederives. Bind rederives before accepting the requested pair. Activate takes no caller SKU set and internally rederives the exact set. `applyTestCandidateCatalog` iterates only rows returned by verified import and calls the payload-free seed/activate boundaries.
- Each durable entry point independently checks runtime/root proof before filesystem/Prisma, and rejects mismatch/tamper/subset/extra/duplicate before a write.
- Preserve predecessor handling, `missing_initial`, replay idempotency, inactive/hidden seed, single-transaction all-set activation, no CommerceOffer, production/non-TEST/root denial, shared screens and all external O1/UI/payment APIs.
- Current exact-eight/no-ninth evidence belongs to the pinned Foundation bundle and focused fixtures/runtime gate; source product logic remains count/ID/table free.

## Completion

- Identical GREEN once, `git diff --check`, source literal audit, temporary node_modules symlink cleanup/target intact/no cache/process residue.
- Commit/non-force push exact five paths; final branch clean/upstream-equal.
- Write `10_COSMILE_F2_WORKER_RESULT.md` and `11_COSMILE_F2_WORKER_POINTER.md`, commit/push docs, STOP before runtime/DB/provider/browser.

HOLD before a sixth Slice B path, external behavior change, schema/DB/runtime/provider/economic action, weakened denial, or no-delta capacity recurrence.

