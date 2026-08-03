# 07 — Pointer: Foundation F1-C1 direct eight-product development data

| Field | Value |
|---|---|
| Result artifact | `advisor/jobs/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1/06_FOUNDATION_DIRECT_DATA_CORRECTION_RESULT.md` |
| Handoff executed | `05_FOUNDER_DIRECT_DATA_SUPERSESSION_HANDOFF.md` · sha256 `a8721036…5b6fec` · blob `9de9a5cc…` · docs **`848f591`** (verified) |
| Supersedes | `02`–`04` overlay design/results only — no history rewritten |
| Actual model / effort | **claude-opus-5 / xhigh** |
| Foundation repo/branch | `foundation` · `implementation/cosmile-eight-elt-development-data-v1-20260803` |
| Foundation commits | revert `3a90a6f` (restores 4 paths to base `966db208`) → **`8a838b0f929afe69987737fb5fc431b6537ae647`** |
| Vault repo/branch | `foundation-vault` · `nonproduction/cosmile-eight-elt-development-data-v1-20260803` |
| Vault commits | overlay delete `fae0605` → records completed **`f561f448e3728293509c9a7e20634af356d4c826`**; `bea31119` retained in ancestry |
| Prior-overlay deletion | 8 `development_test_overlay.yaml` removed; **0 remain**; no overlay group/token in any module source |
| Changed paths | Foundation 4 (ceiling) · Vault: 8 dirs × existing `core`/`ingredients`/`locales/ko`/`offers` only — no file created |
| Delta size | 378 insertions vs abandoned overlay 452 — **smaller**, as required |
| RED → GREEN | `24 = 10 PASS + 3 FAIL + 11 ERROR` (no ordinary commerce group, no candidate-only gate, hard-coded profile present) → **24/24 PASS, 0 skipped** |
| Bundle counts | manifest **1** · snapshots **8** · 8 distinct IDs/names · exact 8 price/stock pairs · gates `{NOT_RECORDED}`, no `PASS` · owner-only temp dir deleted |
| Git/upstream state | both worktrees clean · both branches upstream-equal · non-force · no `main`/protected merge |
| Open decision for Advisor/Founder | eighth record's ingredient list was completed against its own canonical "억지 INCI 생성 ❌" statement, per 05_; official ingredient table still not obtained — see result §"Declared concern" |
| Hard stops respected | no Cosmile edit, provider/DB/runtime, schema/migration, ninth product, Foundation-main/Vault-main mutation, force push or merge |
| `RETURN_TO` | `foundation-advisor` |
| Next actor | `foundation-advisor` (review of `8a838b0` + `f561f448`, ingredient-completion decision, then Cosmile F2 routing) |
| Worker state | **STOPPED before Cosmile F2** — awaiting a new exact handoff |
