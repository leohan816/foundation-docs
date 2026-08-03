# Foundation Worker handoff — eight-product development data and versioned delivery

MISSION_ID: COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1 / F1
ACTOR: existing Foundation Worker (`foundation:claude.0`)
MODEL/EFFORT: actual Claude Opus 5 / xhigh, live-verified before dispatch
SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`
RETURN_TO: foundation-advisor; STOP before Cosmile F2

## Repositories and bases

- Foundation repo/worktree: `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`
- Foundation branch/base: `implementation/cosmile-eight-elt-development-data-v1-20260803` @ `966db20822b7accb36c33dedb01ffba51a9bef68`
- Vault repo/worktree: `/home/leo/Project/.worktrees/foundation-vault/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`
- Vault branch/base: `nonproduction/cosmile-eight-elt-development-data-v1-20260803` @ `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`
- Both bases must be clean. No main/protected merge or force push.

## Exact Foundation code/doc ceiling

1. `foundation/cosmile/commerce_snapshot/contract.py`
2. `foundation/cosmile/commerce_snapshot/vault_candidate.py`
3. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py`
4. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`

## Exact Vault write ceiling

Add exactly one `development_test_overlay.yaml` under each of these existing directories, and touch no canonical file:

1. `products/elt/elt-cream-vitayouth-01/`
2. `products/elt/elt-cream-vpdrn-01/`
3. `products/elt/elt-mask-vitayouth-01/`
4. `products/elt/elt-pad-vitayouth-01/`
5. `products/elt/elt-serum-triplecapsule-01/`
6. `products/elt/elt-serum-vitayouth-01/`
7. `products/elt/elt-serum-vpdrn-01/`
8. `products/elt/elt-sunscreen-vitayouth-01/`

## Frozen overlay contract

Each file is a distinct product record with exact top-level keys: `schema_version`, `foundation_product_id`, `environment`, `status`, `replaceable`, `commerce`, `synthetic_fallbacks`, `field_provenance`.

- `schema_version: cosmile-development-test-product-1.0`
- `environment: development_test`; `status: DEVELOPMENT_SYNTHETIC`; `replaceable: true`
- Product ID must equal the directory/core ID.
- `commerce` carries exact integer `price_krw` and `stock_quantity`:
  - cream-vitayouth `24000/64`
  - cream-vpdrn `31000/72`
  - mask-vitayouth `18000/80`
  - pad-vitayouth `27000/60`
  - serum-triplecapsule `34000/75`
  - serum-vitayouth `30000/90`
  - serum-vpdrn `37000/56`
  - sunscreen-vitayouth `22000/84`
- `synthetic_fallbacks` has deterministic product-distinct values only for `spec`, `manufacturer`, `responsible_seller`, `ingredients`, `cautions`. Known canonical values always win; fallback fills only missing/incomplete fields. Use clearly development-synthetic values, not plausible regulatory claims.
- `field_provenance` marks every fallback key `DEVELOPMENT_SYNTHETIC`; commerce keys `COSMILE_DEVELOPMENT_SYNTHETIC`. No production/legal/regulatory/rights/safety claim.

## Versioned delivery behavior

- Keep `fsnap-1.0`, `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, `TEST_ONLY_CANDIDATE`, and all six gates exactly `NOT_RECORDED`.
- Add one optional closed `development_test_overlay` content group, permitted only on `TEST_ONLY_CANDIDATE` snapshots. An approved/draft/production-like lane carrying it must fail closed.
- Existing excluded commerce keys remain excluded everywhere else. Exact `price_krw`/`stock_quantity` are accepted only inside the validated development group.
- Builder reads canonical core/locale/ingredients first, overlays missing values only, emits all eight distinct identities, and keeps the canonical eighth `record_status=incomplete` visible in provenance while development status is separate.
- Existing normal publish, approved delivery, correction, rights/safety gates and seven known canonical values remain unchanged.
- No filesystem/network/DB/provider runtime, no Vault main write, no artifact outside the two worktrees.

## Tests first and exact gate

1. Modify only the named Foundation test first. RED must prove the base emits seven/excludes eighth and lacks the closed development overlay contract.
2. Run only from Foundation worktree:
   `python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate`
   against the exact Vault mission worktree through a test-only environment/path parameter; do not mutate either repo during execution.
3. Implement code + eight overlay files + design doc.
4. Run the identical focused command once for GREEN and `git diff --check` in both repos.
5. Produce one versioned bundle in an owner-only temporary directory, verify exactly one manifest/eight snapshots, all eight distinct IDs, the eighth identity, exact commerce table and no PASS gate; delete the temporary bundle after count/category evidence. No Foundation vault canonical/main write.

## STOP

Return HOLD before schema/migration, ninth product, canonical-file overwrite, invented approval, broader Foundation capability, network/DB/provider/economic action, extra code/data path or weakening existing commercial-lane denial.

## Completion

- Commit and non-force push exact Foundation and Vault branches separately; truthful attribution only.
- Write only these result paths in the mission docs worktree and commit/non-force-push them:
  - `03_FOUNDATION_WORKER_RESULT.md`
  - `04_FOUNDATION_WORKER_RESULT_POINTER.md`
- Report actual model/effort, exact changed paths, RED/GREEN meaning, bundle counts, Git/upstream state, `RETURN_TO: foundation-advisor`, then STOP before Cosmile.

