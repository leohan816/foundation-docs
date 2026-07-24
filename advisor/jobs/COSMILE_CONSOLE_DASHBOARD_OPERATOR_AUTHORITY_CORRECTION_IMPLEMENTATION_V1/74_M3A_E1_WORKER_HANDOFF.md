# 74 — M3A-E1 Worker Handoff: Operator Authority Import Correction

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
MODULE: M3A-E1
BASE: `4aac190042eb87b88da324b939176742be1b6c8e`
CLASSIFICATION: SMALL compile-boundary correction
ACTOR: existing Cosmile Claude Worker · Opus 4.8/xhigh
SKILL: `/fable-builder` · test-design-before-code only; implementation report template at return

## Proven defect

The six M3A Dashboard pages import nonexistent `@/lib/console/operatorAuthority`. The canonical implementation used by the reviewed O1 API routes is `@/lib/operator/authorize`. M3B product write remains blocked.

## Exact path ceiling

1. `app/src/app/dashboard/page.tsx`
2. `app/src/app/dashboard/requests/page.tsx`
3. `app/src/app/dashboard/fulfillment/page.tsx`
4. `app/src/app/dashboard/finance/page.tsx`
5. `app/src/app/dashboard/activity/page.tsx`
6. `app/src/app/dashboard/settings/page.tsx`
7. `app/scripts/o1_dashboard_reads.vitest.ts`

No eighth path.

## Tests first

- Add one focused assertion to the existing test: every six Dashboard pages import `authorizeConsoleOperator` from exactly `@/lib/operator/authorize`, and none contains `@/lib/console/operatorAuthority`.
- Run exactly `./node_modules/.bin/vitest run scripts/o1_dashboard_reads.vitest.ts` and preserve RED.
- Change only the six import specifiers; no other byte or behavior change.
- Run the identical command and require GREEN.

No build/typecheck/generate/full suite/DB/provider/runtime/browser/M3B. Inspect the seven-path diff and prove the six product changes are import-only. One truthful Claude commit, non-force push, clean/upstream-equal. Write only `75_M3A_E1_WORKER_RESULT.md` and `76_M3A_E1_WORKER_POINTER.md`; return and STOP.
