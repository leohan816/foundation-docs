# Worker result — M4 Inventory/HOLD

OUTCOME: `HOLD` — the single GREEN run failed (**5 failed / 50 passed / 1 skipped (56)**, 2 of 4 suites). Handoff `167` makes the first failure a HOLD with no diagnostic or rerun. Not committed, not pushed.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M4_INVENTORY_HOLD`
ACTOR: same `cosmile:claude.0` Worker · Opus 5/xhigh · `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`).
HANDOFF: docs `19cc5384170c91bddb0d41bda29f6a131fac74f7`, blob `7a1d08c364f3a07cc8143c19b8ee7f33c077c114`, SHA256 `bcaf1beeacbaafb3e5c92f6d826eac49bca83540fdb3023c79d8d56766399e20` — verified.
BASE: product `33ff6a7a841affb8d4c984beb4b251e416e38286`, clean and upstream-equal at entry.

## Commands

- RED, exactly the frozen command, once: **3 failed / 38 passed / 1 skipped (42)**, exit 1.
- GREEN, the identical command, once: **5 failed / 50 passed / 1 skipped (56)**, exit 1. No rerun, no diagnostic, no reporter flag.

## Failure evidence held — and one I can name from authorship

The visible failure is in `o1_core_dashboard_reads.vitest.ts` at the assertion banning the stale gap copy `집계 조회 계약 없음` from `dashboard/page.tsx`.

I can name that cause without diagnosis because I wrote the offending line: while retiring the D04 entry I added an explanatory comment that *quotes the retired claim verbatim* — `"집계 조회 계약 없음"은 더 이상 사실이 아니다` — so the source-level ban trips on my own negating comment. That assertion exists in two suites (the reads D04/D07 case and the inventory home case), which plausibly accounts for two of the five failures. **The remaining failures are not identified and I have not inferred them.**

This is the third occurrence of one specific self-inflicted pattern: a source-level token ban colliding with a comment that names the banned token in order to negate it (M3-E1 `매출`, and now `집계 조회 계약 없음` twice over). The durable fix is mine to own — when I write a ban-checked oracle, the implementation comment must describe the prohibition without quoting the string. I flag it here so the Advisor can weigh whether the oracle style or my commenting convention should change.

## Delta — exactly the eight ceiling paths, all uncommitted

`inventoryRead.ts` (new pure service: ≤100 bounded eligible rows, unique identity, one aggregate call with eligible SKUs only, zero reads on empty, **exactly one valid row required per eligible SKU** so a missing row fails closed rather than becoming zero, nonnegative integer quantities, `reserved + committed > stock` rejected as incoherent, and **no arithmetic on any quantity**) · `inventoryReadRepository.ts` (new; one `$queryRaw` over `CommerceSku` left-joined to `InventoryReservation` restricted to `reserved|committed`, SKU set parameterized via `Prisma.join`, returning only SKU id, `stock`, reserved and committed) · `dashboard/inventory/page.tsx` (new; flag → root → `catalog.read` → `inventory_hold.read` all same-principal → one `o1EligibleCatalog` → one bounded aggregate; `표시 기준 재고` baseline with an explicit not-physical note, `확정/HOLD` shown separately, five stable columns, table-body zero panel) · `dashboard/page.tsx` (D04 gap retired, D07 retained, no home read/card/KPI added) · `OperatorShell.tsx` (`재고` becomes a bounded active route) · the three test paths.

No ninth path; the capability catalog was **not** edited — both `catalog.read` and `inventory_hold.read` already exist. Git state is asserted from the edit record: `git diff --check` and a status inspection belong to the PASS path and were not run.

## Disclosed collision outside this ceiling

Retiring D04 was instruction #9 and is truthfulness-driven — Inventory now has a real read surface, so the "aggregate contract absent" claim became false. However `app/scripts/o1_dashboard_reads.vitest.ts` (outside this ceiling and outside the frozen command) still asserts both `D04` and the exact retired copy in `dashboard/page.tsx`. That suite was last green in M5D and will now be stale. It needs an authorized re-base in a later module; I did not touch it.

## Effects

`0` — no schema, migration, DB execution or write, grant, seed, mock row, alternate catalog, warehouse claim, derived available-to-sell value, provider, economic, runtime, browser or public-preview action; no install, generate, build, typecheck, broad suite or Reviewer. No commit, push, stage or branch change. M5 not started.

## To resume

Authorize (a) removing the quoted string from the two explanatory comments I added — in `dashboard/page.tsx` and, if present, the inventory suite — keeping the meaning without naming the banned token, and (b) one run to surface the unidentified failures. Both sit inside the existing eight paths; no contract, boundary or ceiling change is implied. The out-of-ceiling `o1_dashboard_reads.vitest.ts` re-base is a separate decision.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
