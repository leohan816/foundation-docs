# Worker result — M5 E1 diagnostic

OUTCOME: all four failures named. Diagnostic only; no file changed, no correction, no second run, no M5 commit.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · ACTOR `cosmile:claude.0` · Opus 5/xhigh · `/fable-builder`.
HANDOFF: docs `8e4885dfad2c881ea277213e5d9e5d134a15da9c`, blob `a6f032cbcea00b624cfd8dec25f4d660bec5bb9a`, SHA256 `cdb83fd7941f013cab72817a8a23b7c6a79e85d13ea8554e72df246074812301` — verified.
BASE: product `2ccde154618f1bf31f48727ad33d4964495dc763`, nine-path uncommitted M5 delta preserved. Grant PASS docs `612507b` unaffected.

## Counts

Exit `1`. Test Files 3 failed | 1 passed (4). Tests **4 failed | 75 passed (79)**, 0 skipped — identical to the held first-GREEN figure. Per file: `o1_core_dashboard_reads` 11 tests/1 failed · `o1_core_dashboard_payments` 14 tests/1 failed · `o1_dashboard_reads` 48 tests/2 failed · `o1_core_dashboard_shell` passed.

## The four failures

**1 — `scripts/o1_core_dashboard_payments.vitest.ts:258:17`**
Suite: `M5 — Dashboard home payments tile` › `reads the same service once and shows a truthful row-count state with no action queue entry`
Assertion: `expect(src).toContain('import { readPaymentRefunds')`
Token: `import { readPaymentRefunds` · Expected: contained · Received: the comment-stripped `dashboard/page.tsx` source.

**2 — `scripts/o1_core_dashboard_reads.vitest.ts:240:65`**
Suite: `M4 — boundary: no authority, control, mutation, provider or fabricated value is introduced` › `neither read surface introduces customer authority, direct data access, a control surface or economic display`
Assertion: `expect(src, "src/app/dashboard/page.tsx must not introduce: prisma").not.toContain(token)`
Token: `prisma` · Expected: absent · Received: the `dashboard/page.tsx` source.

**3 — `scripts/o1_dashboard_reads.vitest.ts:120:69`**
Suite: `M3A — Dashboard root: per-card capability + same principal, read order, card ceiling, D04/D07 wording` › `root shows ONLY D01, D03, D05, D07 (no D02, no D04, no D06)`
Assertion: `expect(has(P.root, id)).toBe(false)` inside the loop over `["D02", "D04", "D06"]`
Expected `false`, received `true`. The failing message does not name which of the three ids matched, and I did not infer it.

**4 — `scripts/o1_dashboard_reads.vitest.ts:124:40`**
Suite: same as 3 › `D07 shows the exact UNAVAILABLE wording, never a numeric zero`
Assertion: `expect(has(P.root, "집계 조회 계약 없음")).toBe(false)`
Token: `집계 조회 계약 없음` · Expected `false`, received `true`. The preceding assertion on `UNAVAILABLE · 조회 계약 없음` passed.

## Output-handling disclosure

The command ran once, unmodified. To keep the report readable I filtered the printed received-source dump lines (`^\s*+`) and capped display at 140 lines. Every failure header, suite/test name, assertion, token, expected/received category and file:line above was captured in full; only the echoed source bodies were elided. No other filter, and no truncation of failure identification.

## No-change confirmation

No source, test or docs file was created, edited or deleted during this diagnostic; no correction was applied. The nine-path M5 delta and the preserved RED evidence are untouched. No new read of product source, no second run, no DB, runtime, provider, browser or economic action, and no M5 commit or push. Only `190`/`191` were written.

RETURN_TO: foundation-advisor
STOP
