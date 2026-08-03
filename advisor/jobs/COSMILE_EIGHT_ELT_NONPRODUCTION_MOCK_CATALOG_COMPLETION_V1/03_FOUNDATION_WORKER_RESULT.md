# 03 — Foundation Worker result: eight-product development data and versioned delivery

Status: `COMPLETE` · MISSION `COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1` / F1 · `RETURN_TO: foundation-advisor`

## Anchors (all live-verified before any edit)

| Field | Value |
|---|---|
| Actor / model / effort | Foundation Worker · **claude-opus-5** · **xhigh** |
| Handoff | `02_FOUNDATION_WORKER_HANDOFF.md` · sha256 `39efda5ddc32bedad1e325b1e5aa6b47faed8867c3f1e1ba7cdc43c961acdf96` · blob `1a1e238c…` tracked at docs `954c3a9108a35a215e0a7a6091bea846bbcdd824` |
| Foundation worktree | `.worktrees/FOUNDATION/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1` |
| Foundation branch / base → commit | `implementation/cosmile-eight-elt-development-data-v1-20260803` · `966db208…` (clean) → **`edbc1dac29a57de370eecb6e01da751e066b4549`** |
| Vault worktree | `.worktrees/foundation-vault/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1` |
| Vault branch / base → commit | `nonproduction/cosmile-eight-elt-development-data-v1-20260803` · `70c39e0e…` (clean) → **`bea31119bf2cc45d5b98154ab4924beb1db6a074`** |
| Binding note | pane root was the **predecessor** worktree; every command/edit used absolute paths or `git -C` against the two mission worktrees only |

## RED → GREEN (identical focused command, run from the Foundation mission worktree)

`python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate`

- **RED (test modified first):** `43 tests = 28 PASS + 4 FAIL + 11 ERROR`. It proves both required gaps:
  base **emits seven and excludes the eighth** (`Tuples differ`, `KeyError: 'elt-serum-triplecapsule-01'`),
  the **closed development overlay contract is absent** (`DEVELOPMENT_CONTENT_GROUP` missing ×10),
  and `price_krw` is not refused outside the group (×1).
- **GREEN:** **43/43 PASS, 0 skipped** (22 pure + vault-touch read-only). Ran once for the gate, re-run once after the design-doc edit; both OK.
- `git diff --check` clean in **both** repos.

## Changed paths

**Foundation (exactly the 4-path ceiling)** — 452 insertions / 60 deletions:
1. `foundation/cosmile/commerce_snapshot/contract.py` — closed `development_test_overlay` group; candidate-only gate; dev commerce keys location-locked.
2. `foundation/cosmile/commerce_snapshot/vault_candidate.py` — canonical-first overlay builder; all eight identities; allow-list + `ingredients.yaml`/overlay.
3. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py` — 31 → 43 cases.
4. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md` — v0.4.

**Vault (exactly the 8-file ceiling)** — 8 additions, **0 canonical files touched** (verified by name-diff base→HEAD): one `development_test_overlay.yaml` under each of the eight `products/elt/…` directories.

## Bundle evidence (owner-only `0700` temp dir, deleted after collection)

`manifest 1` · `snapshots 8` · `verify ok` · `8 distinct product dirs` · `8 distinct content sha256` ·
eighth identity present · eighth `record_status=incomplete` · gate value set `{NOT_RECORDED}` · **any PASS gate: False** ·
commerce table exact match (8/8) · approval `{TEST_ONLY_CANDIDATE}` · `NOT_LIVE_SALE_EVIDENCE` · `non_production` all true · temp bundle deleted: True.

## Fill rule actually applied (structured only — no keyword matching, §0.4)

A canonical value wins iff structurally present and non-empty **and**, where the record carries a structured completeness flag, that flag is `true`.

- `manufacturer`, `responsible_seller` — canonically absent in all eight → fallback applied ×8.
- `ingredients`, `cautions` — applied to the eighth only (`data_status.ingredients_included: false`; no `cautions`).
- `spec` — **never applied**; canonical wins for all eight.

## Declared judgments (Advisor decisions, not silently taken)

1. **`spec` of the eighth is `'확인 필요'`** — a non-empty canonical value. Classifying it as "unknown" would require interpreting the string (forbidden heuristic), and substituting a volume would create exactly the *plausible regulatory claim* the handoff bans. So the canonical value is carried through. A synthetic `spec` is present in every overlay file, so applying it later is a rule change, not a code change. **If you want it applied, say so and I will HOLD-free patch just that rule.**
2. **Test expectation changed from seven to eight** — required by the handoff ("emits all eight distinct identities"). This supersedes the v0.3 "active only" contract; the 7-active + 1-incomplete profile guard is retained.
3. **`.git` detection fixed** — `require_clean_vault` used `isdir`, but a git worktree's `.git` is a file, so the builder could not run against the mission vault at all. One-line compat fix, made during RED so the count claim could actually be proven.
4. **`ALLOWED_PRODUCT_FILES` extended** to `ingredients.yaml` + the overlay file. The sales-terms file remains absent from the list, so it stays structurally unopenable.

## Not proven / not done

- No commercial, display, rights, MFDS, imagery, safety or human-review approval exists — all six gates remain `NOT_RECORDED`. The overlay values are development-synthetic mock data and are **not** sale, regulatory, or safety claims.
- Source-document integrity still unverified (`source_checksum: pending` carried verbatim).
- The v0.2 broad suite (68) was **not** re-run (prior handoff's standing "no broad suite" limit); only the focused suite was executed.
- No filesystem/network/DB/provider runtime, no schema/migration, no ninth product, no canonical overwrite, no Vault `main` write, no artifact outside the two mission worktrees, no Cosmile install. **Cosmile F2 not started.**
