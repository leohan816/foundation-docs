# Foundation Worker handoff — TEST_ONLY_CANDIDATE snapshot export

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
MODULE: `F1_FOUNDATION_TEST_ONLY_CANDIDATE_EXPORT`
DECISION: `PROCEED_WITH_LIMITS`

## Exact anchors

- Foundation worktree: `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Branch: `implementation/cosmile-multi-product-test-candidate-v1-20260726`
- Clean base: `73ff00361d9fa88ab57c17858210c1e080dfde1a`
- Read-only canonical vault: `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`
- Vault pin: clean/upstream-equal `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`
- Existing contract: `fsnap-1.0`, `NOT_LIVE_SALE_EVIDENCE`, reviewed Foundation exporter at base.
- Leo authority: seven `active` ELT candidates may be exported for isolated non-production rehearsal; one `incomplete` record remains excluded. No commercial display/right/safety/human-review approval is granted.

Read current Agent Office Worker role, Foundation `AGENTS.md`/`CLAUDE.md`, run/result protocols, and `/fable-builder` with only `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load report-template only at completion. Current Agent Office authority overrides historical role text.

## Frozen contract-to-code mapping

| Contract | Landing | Focused proof |
|---|---|---|
| Explicit non-commercial state | `contract.py`: `TEST_ONLY_CANDIDATE` approval token distinct from `APPROVED_FOR_COMMERCE_DISPLAY` | normal `publish` rejects it; existing approved lane remains unchanged |
| Honest unreviewed gates | candidate builder emits all six existing categories as exact `NOT_RECORDED`; candidate exporter rejects any `PASS` | adversarial test mutates each gate to `PASS` and receives zero delivery |
| Real canonical identity/content | new `vault_candidate.py` reads explicit vault root, requires clean pinned Git tree, exact directory/core product match, `active`, Korean `display.short_name`, version/formula/source checksum; content contains only real `identity` + `provenance` | fixture proves byte-preserved name/pins and no legacy/mock/fabricated product |
| Incomplete exclusion | builder enumerates exact ELT candidates and exports only `active`; requires 7 active + 1 incomplete for this mission profile | exact 7 entries; incomplete absent |
| Async versioned delivery | separate `publish_test_candidates` feeds existing write-once `file_bundle`; bundle remains `NOT_LIVE_SALE_EVIDENCE` + `non_production=true` | deterministic replay/verify, no endpoint/network/DB |
| Commerce-value separation | existing excluded-key walk remains load-bearing; builder never reads `offers.yaml` and never emits price/stock/status/rights claims | static/source fixture and recursive excluded-key rejection |

No mapping row may remain blank. Any need to infer rights, approval, gate PASS, product content, or a value absent from the canonical files is `HOLD`.

## Exact path ceiling

1. `foundation/cosmile/commerce_snapshot/contract.py`
2. `foundation/cosmile/commerce_snapshot/exporter.py`
3. `foundation/cosmile/commerce_snapshot/vault_candidate.py` (new)
4. `foundation/cosmile/commerce_snapshot/__init__.py`
5. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py` (new)
6. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`

Read-only inputs are limited to those paths, existing `file_bundle.py`, and the eight ELT directories' `core.yaml`, `locales/ko.yaml`, and `coverage.yaml`. Do not read `offers.yaml`, raw files, claims, ingredients, secrets, or another repository.

## Tests first

1. Add only the new focused test and run:
   `python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate`
2. Preserve meaningful RED proving the missing candidate token/export/builder.
3. Implement only the five code/design paths above.
4. Run the identical command once; require GREEN.
5. Run no existing broad suite. Static assertions inside the focused test must prove normal approved `publish` remains distinct, candidate gate PASS is refused, price/stock keys remain excluded, no vault writes occur, and no production/live activation exists in Foundation.

## Behavior and effect ceiling

- `TEST_ONLY_CANDIDATE` is not commercial approval and never passes the existing normal `publish`.
- Gate values remain `NOT_RECORDED`; never synthesize `PASS`.
- Snapshot content is real identity/provenance only. No price, stock, sales status, imagery, claim, assessment, or rights assertion.
- No vault write, schema/migration, DB, network, endpoint, runtime, provider, browser, payment/refund, pending-order/HOLD, or economic effect.
- No bundle is installed into Cosmile in this WorkUnit.

## Completion

Inspect exact six-path diff and `git diff --check`. Commit once and non-force push; require clean/upstream-equal. Write only:

- `66_FOUNDATION_TEST_ONLY_CANDIDATE_RESULT.md` (≤80 lines)
- `67_FOUNDATION_TEST_ONLY_CANDIDATE_POINTER.md`

Commit/push only those two docs paths, return compact RED/GREEN, changed paths, product/docs commits, vault write count `0`, and `RETURN_TO: foundation-advisor`; STOP before Cosmile.
