# M5-E2 Type-source Correction — Worker Handoff

- BASE: `d7ede8536b0fae7fb9976e836be0c1618839ee10`
- ROUND: bounded correction 2/3
- ACTOR: existing rebound Cosmile Codex fallback, gpt-5.6-sol/xhigh, `/fable-builder`; Claude idle
- PRESERVED_FAILURES:
  - M5 typecheck exit `2`: two required `actorRef` inputs and one capability narrowing
  - M5-E1 typecheck exit `2`: `OperatorCapability` imported from a module that does not export it
- EXACT_PATHS:
  1. `app/src/app/dashboard/page.tsx`
  2. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

## Exact correction

1. `dashboard/page.tsx`: keep `authorizeConsoleOperator` imported from `@/lib/operator/authorize`; separately import `type OperatorCapability` from its canonical exporting module `@/lib/operator/capability`; narrow only the private helper parameter.
2. Existing DB test:
   - add the already-forwarded `actorRef` to both pure service-port expected objects;
   - seed one synthetic active `OperatorPrincipal` after the committed migration chain;
   - use that same synthetic principal ref in only the direct `acknowledgeShippedSupport` and `settlePaidCancellation` calls requiring it.
3. No production repository/service/contract/schema/migration/authority/economic behavior change.

## Exact evidence

- Run corrected typecheck once with the same closed-loopback synthetic `DATABASE_URL`.
- On PASS, run the existing focused disposable-DB file once: `./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts`.
- Require PASS, not SKIP; background the same process only if needed for the foreground cap, with one owner-only temporary boundary removed after capture.
- Verify exact two-path diff, `git diff --check`, package/lock/schema unchanged, no DB/container/port/temp residue.
- Commit once with truthful Codex attribution and no co-author trailer; non-force push; clean/upstream-equal; compact return; STOP.
- First failure: cleanup/HOLD. No rerun, third path, build/browser, M5 continuation, provider/runtime/economic effect.
