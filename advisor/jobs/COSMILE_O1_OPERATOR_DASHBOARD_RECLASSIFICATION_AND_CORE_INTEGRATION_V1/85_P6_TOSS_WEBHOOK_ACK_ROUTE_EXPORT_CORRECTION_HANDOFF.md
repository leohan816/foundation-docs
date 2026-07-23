# P6 Toss Webhook ACK Route Export Correction — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
WORK_UNIT: `P6_TOSS_WEBHOOK_ACK_ROUTE_EXPORT_CORRECTION`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `9ab17169a293c82fda98184345128b96f46212ce`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return.

Only the first build failure admitted by result 84 is in scope. No sweep or other defect may be used.

## Exact three-path ceiling

1. new `app/src/lib/payment/webhookAck.ts`
2. `app/src/app/api/o1/webhooks/toss/route.ts`
3. `app/scripts/o1_browser_runtime_contract.vitest.ts`

## Tests first and implementation

First change only the test import so `webhookAckHttpStatus` comes from `@/lib/payment/webhookAck`, not from the route. Run exactly the existing named test `maps every reachable outcome kind to exactly its frozen status`; require RED because the pure module does not yet exist.

Then move, byte-for-byte and without reinterpretation, the route's `ACK_DECIDED_200` constant, its full ACK contract comments, and `webhookAckHttpStatus` into the new pure non-route module. Import only `webhookAckHttpStatus` in the route and remove its non-handler export. Preserve the POST handler, outcome mapping, fail-closed unknown `503`, provider retry semantics, response body, and every payment/security/economic boundary.

Using the mission-authorized temporary dependency symlink and `--cache=false`, run exactly this command for RED and identically for GREEN:

```bash
./node_modules/.bin/vitest run scripts/o1_browser_runtime_contract.vitest.ts \
  --config vitest.config.ts --reporter=verbose --cache=false \
  -t 'maps every reachable outcome kind to exactly its frozen status'
```

No other path, test, build, typecheck, lint, install, generate, DB, provider, runtime, browser, sweep, or economic action. Remove the temporary symlink; prove constant/function/comments byte identity, canonical hashes unchanged, three-path containment, and zero residue. One additive truthful-attribution commit, non-force push, clean/upstream-equal. Write only result `86_P6_TOSS_WEBHOOK_ACK_ROUTE_EXPORT_CORRECTION_RESULT.md`, return to Advisor, and STOP before P6.
