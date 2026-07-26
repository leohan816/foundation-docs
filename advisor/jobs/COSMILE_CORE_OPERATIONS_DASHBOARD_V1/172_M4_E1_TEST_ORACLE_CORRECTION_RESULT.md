# Worker result — M4 E1 test-oracle correction

OUTCOME: `HOLD` — the corrected GREEN still fails by one assertion (**1 failed / 54 passed / 1 skipped (56)**, 1 of 4 suites). Handoff `171` makes any failure a HOLD with no diagnosis or rerun. Not committed, not pushed.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M4_INVENTORY_HOLD_E1`
ACTOR: same `cosmile:claude.0` Worker · Opus 5/xHigh · `/fable-builder`.
HANDOFF: docs `2f20e3a659d9f8c7e288213d8baf6078633a1002`, blob `fa4181a21fff05f7b0786ec568488d0f8d6066b0`, SHA256 `0466cd4a474074ddfdae536750b84c418eaf5137a546874db9bb1b405f70e674` — verified.
BASE: product `33ff6a7a841affb8d4c984beb4b251e416e38286` plus the preserved eight-path M4 delta from `168/169`.

## Corrections applied — three test paths only

1. **Comment-stripped scanning.** The inventory suite now derives `pageCode` (comment lines removed) and uses it for the gate-order/`before` chain, the one-call counts, the no-mock screen and the prohibited-claim screen, so a negating implementation comment can no longer decide those verdicts.
2. **Header constants pinned.** The three visible labels are asserted as exact constants (`BASELINE_LABEL`/`RESERVED_LABEL`/`COMMITTED_LABEL`), and their placement is pinned as `>{LABEL}</th>` inside the header row rather than requiring literal Korean text inside the JSX block. `상품` and `SKU` remain literal, and the five-header count is unchanged.
3. **Gap block isolated.** In both the reads and inventory suites the D04 absence and retired-copy checks are scoped to the `EVIDENCE_GAPS` array slice, leaving the generic closed-state legend and the D07 pin untouched.
4. **Stale shell comment corrected.** The inert-row comment no longer claims Inventory lacks a read contract; it records that Inventory gained its own read surface in M4 and that `결제·환불` is the last inert priority.

All five product sources are byte-unchanged from the HOLD delta. `inventory.read` was not added and `capability.ts` was not edited. Every authority, same-principal, real-catalog, bounds, malformed/missing/over-capacity fail-closed, no-mock/no-write/no-derived-sellable, stable-table, nav-total and no-home-read assertion is preserved; none was weakened or deleted.

## Remaining failure — what I hold

The single failure is in a `home must not gain: <token>` loop that scans `dashboard/page.tsx`. **The specific token is not in the evidence I hold**, and I did not rerun, add a reporter, or inspect further.

One structural observation, offered as fact rather than diagnosis: that loop is the one remaining check in this set that still scans **raw** home source. The authorized correction #1 changed the scanning basis for the inventory page's gate-order and claim checks; this home loop was not among the five classified defects, so I left its basis unchanged — and `dashboard/page.tsx` does now carry an M4 explanatory comment above `EVIDENCE_GAPS`. Whether that comment supplies the failing token is exactly what I have not verified.

## Delta and state

Still exactly the original eight ceiling paths, all uncommitted: three test files corrected this round; `inventoryRead.ts`, `inventoryReadRepository.ts`, `dashboard/inventory/page.tsx`, `dashboard/page.tsx` and `OperatorShell.tsx` unchanged since the HOLD. No ninth path. `git diff --check` and a status inspection belong to the PASS path and were not run, so state is asserted from the edit record.

Also still open from `168`: `app/scripts/o1_dashboard_reads.vitest.ts` is outside this ceiling and the frozen command, and it still asserts `D04` and the retired copy in `dashboard/page.tsx`. It needs a separate authorized re-base.

## Effects

`0` — no diagnostic run, DB execution or write, grant, schema, migration, provider, economic, runtime, browser or public-preview action; no install, generate, build, typecheck, broad suite or Reviewer. No commit, push, stage or branch change. M5 remains blocked.

## To resume

Authorize either extending the comment-stripped basis to the `home must not gain` loops in both suites, or one run that names the failing token so a single targeted correction can be made. Either sits inside the existing eight paths and needs no contract or ceiling change.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
