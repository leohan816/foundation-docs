# 77 — M3A-E2 Worker Handoff: Dashboard Read Import Correction

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
MODULE: M3A-E2
BASE: `f496add`
CLASSIFICATION: SMALL compile-boundary correction
ACTOR: existing Cosmile Claude Worker · Opus 4.8/xhigh
SKILL: `/fable-builder` · test-design-before-code only; implementation report template at return

## Proven export map

- `o1OperatorServiceRequestQueue` and `o1OperatorOrderList` are exported only by `@/lib/runtime/o1CommerceRuntime`.
- `readO1ReconciliationProjection` is exported only by `@/lib/runtime/o1ReliabilityRuntime`.
- The M3A pages currently import those symbols from nonexistent/wrong order-layer modules.

## Exact path ceiling

1. `app/src/app/dashboard/page.tsx`
2. `app/src/app/dashboard/requests/page.tsx`
3. `app/src/app/dashboard/fulfillment/page.tsx`
4. `app/src/app/dashboard/finance/page.tsx`
5. `app/scripts/o1_dashboard_reads.vitest.ts`

No sixth path.

## Tests first

- Add focused assertions to the existing test proving each affected page imports each read symbol from its exact canonical runtime module and contains neither `@/lib/order/o1CommerceRuntime` nor the queue import from `@/lib/order/serviceRequestRepository`.
- Run exactly `./node_modules/.bin/vitest run scripts/o1_dashboard_reads.vitest.ts`; preserve RED.
- Change only the four pages' import declarations/specifiers. Do not change call sites, ordering, rendering, authority or behavior.
- Run the identical command and require GREEN.

No build/typecheck/generate/full suite/DB/provider/runtime/browser/M3B. Inspect the five-path diff and prove product changes are import-only. One truthful Claude commit without co-author trailer, non-force push, clean/upstream-equal. Write only `78_M3A_E2_WORKER_RESULT.md` and `79_M3A_E2_WORKER_POINTER.md`; return and STOP.
