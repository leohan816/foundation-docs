# Advisor handoff — F2 E1 runtime guard and atomicity correction

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
WORKUNIT: `F2_E1_RUNTIME_GUARD_ATOMICITY`  
BASE: Cosmile `bd265a78885121451bbf47576f04f5dad7d4e347`, clean/upstream-equal  
PREDECESSOR: handoff `79` / Worker PASS `80/81` / docs `b7c44134d54fdaf2ff6f1eb27211f061e15a55e9`  
ACTOR: same Cosmile Worker · actual Opus 5/xhigh · `/fable-builder`

## Evidence-grounded findings

1. `importTestCandidateBundle`, `bindTestCandidateSku`, seed, and activate are exported durable entry points but only their orchestrator checks `candidateRuntimeProof`. Direct invocation can skip the required production/Toss/root guard.
2. `seedCandidateSkusInactive` inserts inactive/hidden, but its conflict update does not reset an existing candidate SKU to inactive/hidden before re-binding.
3. `activateCandidateSkus` returns `{ok:false}` after a short update count inside `$transaction`; returning commits the partial update instead of rolling it back.
4. `o1CheckoutStart` catalog-item admission passes candidate proof, but its stale-price revalidation `catalogDecision` call does not, so a valid candidate line with `clientExpectedPrice` fails as `missing_snapshot`.
5. Candidate import returns only newly inserted count. An idempotent replay correctly inserts 0 but the one-shot expects 7, conflating admitted-set cardinality with write count.
6. F1 emits one initial seven-entry manifest; the candidate importer currently accepts multiple no-notice manifests whose flattened set is seven.

## Exact correction

- Every exported candidate durable entry point independently requires `candidateRuntimeProof(env, bundleRoot) === ready` before any Prisma call. Pass `env` and the exact root explicitly; production/flag/Google/Toss/root refusal writes zero.
- Candidate bundle requires exactly one manifest, seven entries, zero notices.
- Return separate category/count fields for `admitted=7` and `inserted=0..7`; idempotent replay remains PASS.
- Conflict-upsert forces the exact candidate SKU inactive/hidden before binding.
- Activation transaction rechecks all seven candidate bindings/snapshot lifecycle/product agreement, then performs the update. Any precheck or updated-count mismatch must **throw inside the transaction**, guaranteeing rollback; no `{ok:false}` return from inside the transaction after mutation.
- Pass the same `testCandidateProof(env, cfg.config.bundleRoot)` into checkout price revalidation.
- Preserve approved lane, overlay values, exact seven/incomplete exclusion, no CommerceOffer, no pending order/reservation/intent/transaction mutation.

## Exact changed-path ceiling (4)

1. `app/src/lib/foundation/snapshotRepository.ts`
2. `app/src/lib/runtime/o1TestCandidateCatalog.ts`
3. `app/src/lib/runtime/o1CommerceRuntime.ts`
4. `app/scripts/o1_test_candidate_catalog.vitest.ts`

## Tests first

Patch exact adversarial oracles first:

- direct candidate repository entry points guard before Prisma;
- existing-row seed forces inactive/hidden;
- activation prechecks seven bindings and throws on either mismatch;
- one-manifest-only;
- idempotent replay distinguishes admitted 7 / inserted 0;
- checkout revalidation carries candidate proof.

Meaningful RED, then implementation, then identical GREEN:

```bash
cd app
./node_modules/.bin/vitest run \
  scripts/o1_test_candidate_catalog.vitest.ts \
  scripts/o1_catalog_price_authority.vitest.ts \
  --config vitest.config.ts
```

No DB/runtime/browser/provider/build/typecheck/full suite. `git diff --check`; exact four-path correction delta from `bd265a7`; schema/package/lock unchanged. Commit once, non-force push, clean/upstream-equal. Write only `83_WORKER_F2_E1_RESULT.md` and `84_WORKER_F2_E1_POINTER.md`, commit/push, return to Advisor, STOP.
