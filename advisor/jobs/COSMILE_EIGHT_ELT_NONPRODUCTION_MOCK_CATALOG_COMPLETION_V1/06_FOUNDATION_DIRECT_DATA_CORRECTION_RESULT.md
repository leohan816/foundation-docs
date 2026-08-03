# 06 — Foundation Worker result: direct eight-product development data (F1-C1)

Status: `COMPLETE` · MISSION `COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1 / F1-C1` · `RETURN_TO: foundation-advisor`

## Anchors (verified before any edit)

| Field | Value |
|---|---|
| Actor / model / effort | Foundation Worker `foundation:claude.0` · **claude-opus-5** · **xhigh** |
| Handoff | `05_FOUNDER_DIRECT_DATA_SUPERSESSION_HANDOFF.md` · sha256 `a872103658a49092146e66e9d8efb984fe5fb3b3af228e1ae4a50598875b6fec` · blob `9de9a5cc…` tracked at docs **`848f591`** |
| Foundation | `implementation/cosmile-eight-elt-development-data-v1-20260803` · from `edbc1dac` → **`8a838b0f929afe69987737fb5fc431b6537ae647`** |
| Vault | `nonproduction/cosmile-eight-elt-development-data-v1-20260803` · from `bea31119` → **`f561f448e3728293509c9a7e20634af356d4c826`** |
| Binding | pane root is a predecessor worktree; every command/edit used absolute paths or `git -C` against the two mission worktrees only |

## Correction actions (no history rewrite)

1. **Foundation `edbc1dac` additively reverted** → commit `3a90a6f`. Verified: all four Foundation paths became byte-identical to base `966db208` (empty diff vs base).
2. **Vault: eight `development_test_overlay.yaml` deleted** → commit `fae0605`. `bea31119` remains in ancestry as superseded evidence; 0 overlay files remain.
3. Vault records completed directly → commit `f561f448`.

## RED → GREEN (identical command, run from the Foundation mission worktree)

`python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate`

- **RED (test patched first, after revert/deletions):** `24 tests = 10 PASS + 3 FAIL + 11 ERROR`. Proves the pre-base builder cannot deliver the direct dataset: `unknown_content_group: commerce`, no candidate-only commerce gate, and the hard-coded `EXPECTED_ACTIVE_COUNT` profile still present.
- **GREEN: 24/24 PASS, 0 skipped.** `git diff --check` clean in **both** repos.

## Changed paths

**Foundation — exactly the 4-path ceiling**, `378 insertions / 364 deletions` (**smaller than the abandoned overlay's 452**, as required; contains no overlay schema/group/status/fallback path):
`contract.py` · `vault_candidate.py` · `test_cosmile_commerce_snapshot_candidate.py` · `설계문서/…설계서.md` (v0.5).

**Vault — exactly the 8 named directories**, only existing `core.yaml` / `ingredients.yaml` / `locales/ko.yaml` / `offers.yaml` modified; no file created, no other directory touched.

## What the data now is

- All eight `active` and complete; IDs, canonical names and categories preserved unchanged.
- Distinct deterministic `manufacturer` / `responsible_seller` added to all eight (previously absent in every record).
- `offers.yaml`: `KRW`, `sales_status: active`, `stock_status: in_stock`, integer `sale_price`/`list_price` and `stock_quantity` — the exact 05_ table, 8/8 verified.
- Eighth (`elt-serum-triplecapsule-01`): `incomplete` → `active`, deterministic development spec `30ml`, ordered ingredient list completed (canonical entries 1–8 and every note preserved verbatim; added entries all `mapping_status: needs_review`), Korean cautions added.
- Every superseded original statement is retained inline as a provenance comment (clean-not-compress).

## Foundation behaviour

- Minimal ordinary `commerce` group (exact 5 keys, KRW, integer price/stock, active/in_stock), permitted **only** on `TEST_ONLY_CANDIDATE`; all five other lanes fail closed. Excluded commerce keys remain refused at any depth outside that one validated group.
- Product list is **data-driven**: the 7-active/1-incomplete profile and every product-ID branch are gone — a static test asserts no `elt-…` literal or product table exists in the implementation.
- Every delivered record must be complete or the build fails closed. Commerce values are carried straight from `offers.yaml`; the code generates no product value.
- Bundle: manifest **1**, snapshots **8**, 8 distinct IDs and names, exact commerce table, gates `{NOT_RECORDED}` with no `PASS`, owner-only `0700` temp dir deleted after collection.

## Declared concern (Advisor/Founder decision, stated not buried)

The eighth record's canonical `ingredients.yaml` explicitly said **"억지 INCI 생성 ❌"** and **"공식 전성분표 미제공"**. Completing its ingredient list was directly instructed by 05_, so I did it — but **the official ingredient table is still not obtained**. The added entries are development-scope only, all marked `needs_review`, and the original refusal statement is preserved in the file. These values are not regulatory, safety or sales truth. If that trade is not wanted, reverting just that file is a one-commit change.

## Not proven / not done

- No commercial, display, rights, MFDS, safety or human-review approval exists — six gates remain `NOT_RECORDED`; `non_production=true` and `NOT_LIVE_SALE_EVIDENCE` intact.
- `source_checksum: pending` still carried verbatim, unverified.
- The v0.2 broad suite (68) was not re-run (standing "focused only" limit).
- No Cosmile edit, provider/DB/runtime action, schema/migration, ninth product, Foundation-main/Vault-main mutation, force push or merge. **Cosmile F2 not started.**
