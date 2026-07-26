# M5 E2 oracle correction — exact three tests
MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`; existing `cosmile:claude.0` Opus 5/xhigh; `/fable-builder` test-design-before-code.
BASE: exact nine-path M5 delta at product `2ccde154`; diagnostic docs `6c0be9a`; grant PASS `612507b`.
PATHS: only `app/scripts/o1_core_dashboard_payments.vitest.ts`, `app/scripts/o1_core_dashboard_reads.vitest.ts`, `app/scripts/o1_dashboard_reads.vitest.ts`.
F1: replace the ordering-sensitive `import { readPaymentRefunds` substring oracle with exact canonical module-source presence; retain exact-one-call and grant-order assertions.
F2: replace forbidden bare token `prisma` with precise direct-access tokens `@/lib/prisma` and `prisma.`; retain `PrismaClient`/`$queryRaw` and every authority/mutation/economic/PII ban.
F3: scope D01/D03/D05 and D07 ID assertions to the literal `ACTION_QUEUE` and `EVIDENCE_GAPS` array blocks, excluding comments; D02/D04/D06 remain absent from those blocks.
F4: scope D07 copy assertions to `EVIDENCE_GAPS`; require `UNAVAILABLE · 조회 계약 없음` plus `현재 조회할 수 없음`, forbid `0건` and `집계 조회 계약 없음` inside that block.
ACTION: apply only those oracle corrections, then run the identical four-file GREEN once.
PASS: 79/79, exact nine paths, no source change in this turn; commit/non-force-push product; write compact `193` result and `194` pointer; STOP.
FORBIDDEN: other read/edit/test, assertion weakening, DB/runtime/provider/browser/economic action, capability/schema change.
HOLD: first corrected-GREEN failure; no second run or correction.
RETURN_TO: `foundation-advisor`.
