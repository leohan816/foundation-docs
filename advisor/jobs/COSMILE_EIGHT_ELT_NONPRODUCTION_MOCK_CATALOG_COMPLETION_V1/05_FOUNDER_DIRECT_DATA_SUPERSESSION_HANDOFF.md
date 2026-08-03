# Foundation F1 correction — direct eight-product development data

MISSION_ID: `COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1 / F1-C1`

ACTOR: existing Foundation Worker `foundation:claude.0`, actual Opus 5 / xhigh, `/fable-builder`; return to foundation-advisor and STOP before Cosmile.

## Supersession and exact pins

- This handoff supersedes the overlay design/results in `02`–`04` only. Do not rewrite history.
- Foundation worktree/branch: `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`, current `edbc1dac29a57de370eecb6e01da751e066b4549`, base `966db20822b7accb36c33dedb01ffba51a9bef68`.
- Vault worktree/branch: `/home/leo/Project/.worktrees/foundation-vault/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`, current `bea31119bf2cc45d5b98154ab4924beb1db6a074`, base `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`.
- Both current heads are clean/upstream-equal. Bind every command/edit explicitly because the pane root is a predecessor worktree.

## First correction actions

1. Additively revert Foundation commit `edbc1dac29a57de370eecb6e01da751e066b4549` without history rewrite. This restores all four Foundation paths to the pre-mission base before the smaller generic delta.
2. In Vault, delete exactly the eight tracked `development_test_overlay.yaml` files from `bea31119`; retain the commit in ancestry.
3. No Cosmile edit, provider/DB/runtime action, schema/migration, ninth product, Foundation main/Vault main mutation, force push or merge.

## Exact Foundation ceiling after the revert

1. `foundation/cosmile/commerce_snapshot/contract.py`
2. `foundation/cosmile/commerce_snapshot/vault_candidate.py`
3. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py`
4. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`

The new delta must be smaller than the abandoned overlay implementation and contain no overlay schema/group/status/fallback path. A minimal ordinary `commerce` content group is permitted only because the versioned dataset must carry direct `offers.yaml` values; it must remain `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, `TEST_ONLY_CANDIDATE`, six gates `NOT_RECORDED`, and fail closed outside that candidate approval. Do not weaken any normal approved-delivery, rights, safety or production boundary.

`vault_candidate.py` may generically read only `core.yaml`, `locales/ko.yaml`, `coverage.yaml`, `ingredients.yaml`, and `offers.yaml`; no overlay file. Remove the hard-coded 7-active/1-incomplete delivery profile. Enumerate data-driven active ELT directories, require each delivered record complete, and emit the current exact eight from Vault. Product add/delete/change must remain data-driven: no product-ID branches or hard-coded product table in Foundation code.

Ordinary snapshot content must carry, from the direct files only: distinct identity/name/category; spec/volume; manufacturer/responsible seller; ingredient records; Korean cautions; direct KRW price and stock; provenance/tree/version pins. No synthetic generation in code and no approval/legal/rights/safety claim.

## Exact Vault ceiling

For exactly these eight directories only, delete `development_test_overlay.yaml` and modify only existing `core.yaml`, `ingredients.yaml`, `locales/ko.yaml`, `offers.yaml` as actually needed:

- `elt-cream-vitayouth-01`
- `elt-cream-vpdrn-01`
- `elt-mask-vitayouth-01`
- `elt-pad-vitayouth-01`
- `elt-serum-triplecapsule-01`
- `elt-serum-vitayouth-01`
- `elt-serum-vpdrn-01`
- `elt-sunscreen-vitayouth-01`

Preserve each ID, canonical names, category and every usable known value. Directly complete missing development data deterministically. All eight become complete/active for this branch. Existing complete ingredient/caution/spec data stays; complete only missing/incomplete fields. The eighth gets a deterministic development spec/volume, complete ordered ingredients and Korean cautions. Add distinct deterministic manufacturer and responsible-seller values where absent.

Write commerce directly in each existing `offers.yaml`: KRW, active/in-stock, integer price and stock quantity. Exact table:

| product suffix | price KRW | stock |
|---|---:|---:|
| cream-vitayouth | 24000 | 64 |
| cream-vpdrn | 31000 | 72 |
| mask-vitayouth | 18000 | 80 |
| pad-vitayouth | 27000 | 60 |
| serum-triplecapsule | 34000 | 75 |
| serum-vitayouth | 30000 | 90 |
| serum-vpdrn | 37000 | 56 |
| sunscreen-vitayouth | 22000 | 84 |

The isolated branch is the development boundary. Do not create customer warning badges or a separate overlay/provenance architecture, and do not claim the direct values are production/legal/regulatory truth.

## Tests-first gate

1. After the additive revert/deletions and before new implementation, patch only the named Foundation test. RED must prove the pre-base builder cannot deliver the direct completed eight-record dataset/ordinary commerce.
2. Run only `python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate` from the Foundation mission worktree against the exact Vault mission worktree.
3. Implement only the frozen Foundation/Vault paths, then run the identical command once for GREEN plus `git diff --check` in both repos.
4. Focused assertions: no overlay files/group/tokens; exactly eight active/complete distinct IDs and names; exact eight price/stock pairs; direct ingredients/spec/manufacturer/seller/cautions present; no hard-coded product IDs/table in Foundation implementation; candidate/non-live/six-NOT_RECORDED boundary; ordinary lane fail-closed; clean generic versioned bundle manifest 1/snapshots 8; temp bundle deleted.
5. Preserve the meaningful prior result as superseded evidence; never normalize it away.

## Completion

- Commit and non-force push additive Foundation and Vault correction commits; both clean/upstream-equal.
- Write only `06_FOUNDATION_DIRECT_DATA_CORRECTION_RESULT.md` and `07_FOUNDATION_DIRECT_DATA_CORRECTION_POINTER.md` in this mission docs worktree, commit/non-force push, then STOP before Cosmile F2.
- Return actual model/effort, exact changed paths, RED/GREEN, eight-record bundle counts, prior-overlay deletion, commit pins and `RETURN_TO: foundation-advisor`.

