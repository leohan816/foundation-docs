# M5-E1 Typecheck Correction — Worker Handoff

- BASE: `d7ede8536b0fae7fb9976e836be0c1618839ee10`
- ACTOR: existing Cosmile Claude Worker, Opus 4.8/xhigh, `/fable-builder`
- RED: preserved M5 typecheck exit `2`; exactly three errors in the two paths below
- EXACT_PATHS:
  1. `app/src/app/dashboard/page.tsx`
  2. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

## Exact correction

1. In `dashboard/page.tsx`, import the closed `OperatorCapability` type and narrow only the private `authorizeCapability` helper parameter from `string` to that union. Do not change a capability literal, authorization call, read, state, or UI.
2. In the existing DB test only:
   - update the two pure service-port expected calls to include the already-forwarded `actorRef`;
   - add one synthetic active `OperatorPrincipal` fixture after the committed migration chain;
   - pass that same synthetic principal ref to only the direct `acknowledgeShippedSupport` and `settlePaidCancellation` repository calls that now require it.
3. No product repository/service/contract/schema/migration behavior change.

## Verification and containment

- Apply the two-path correction directly; the typecheck failure is the meaningful RED.
- Run exactly once: `cd app && NEXT_TELEMETRY_DISABLED=1 DATABASE_URL=postgresql://127.0.0.1:1/cosmile_console_candidate npm run typecheck`.
- If PASS, run exactly once the existing focused disposable-DB file:
  `cd app && ./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts`.
  Use one owner-only mission-local background log/status/PID boundary only if the foreground cap would truncate it; poll the same process, never duplicate, then delete the boundary.
- Require PASS, not SKIP. Verify disposable container/port/temp absence, exact two-path diff, package/lock/schema unchanged, and `git diff --check`.
- Commit once with truthful Claude attribution, non-force push, clean/upstream-equal, compact return, STOP.
- First new failure: cleanup and HOLD. No rerun, broad test, build/browser, third path, provider/economic/runtime/preview effect, or M5 continuation.
