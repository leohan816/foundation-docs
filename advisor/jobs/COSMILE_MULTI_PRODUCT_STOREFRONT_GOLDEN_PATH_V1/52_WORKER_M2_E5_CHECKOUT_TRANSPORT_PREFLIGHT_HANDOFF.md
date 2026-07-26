# M2 E5 CHECKOUT TRANSPORT PREFLIGHT — WORKER HANDOFF

- Base: product `e257ae08e7111603c930d54197ba01001a70a354`, clean/upstream-equal.
- Same `cosmile:claude.0`, Opus 5/xhigh, `/fable-builder` test-design-before-code.
- E4 truth: two equivalent pending orders and two holds; intents/transactions/captures/refunds/provider refs all `0`.
- Exact current failure: sandbox one-shot and local-substitute gates are both OFF, so transport is unavailable; the check currently occurs only after `Order.create` and reservation writes.

## Exact product ceiling

1. `app/scripts/o1_browser_runtime_contract.vitest.ts`
2. `app/src/lib/runtime/o1CommerceRuntime.ts`

## Tests first

1. Add one named focused case proving a structurally ready O1 checkout with no admitted transport returns `intent_rejected/transport_unavailable` before an intentionally unusable catalog line can reach catalog/Prisma.
2. Run only:
   `cd app && ./node_modules/.bin/vitest run scripts/o1_browser_runtime_contract.vitest.ts --config vitest.config.ts -t "checkout transport preflight"`
   Preserve RED and its exit code.
3. Move only `resolveO1Transport(env)` and its unavailable return before the catalog/order/reservation stages; reuse the same resolved transport later. No provider call or new branch.
4. Run the identical named command once; require GREEN.
5. Exact two-path diff, `git diff --check`, package/lock/schema unchanged; additive commit/non-force push.

No active/disposable DB, runtime, browser, provider, checkout, refund, cleanup, build, typecheck, install, schema, economic or existing-row action. Existing two pending orders/holds remain evidence.

## Result

- `53_WORKER_M2_E5_CHECKOUT_TRANSPORT_PREFLIGHT_RESULT.md`
- `54_WORKER_M2_E5_CHECKOUT_TRANSPORT_PREFLIGHT_POINTER.md`
- Commit/push only those docs results after product push; <=50 lines; `RETURN_TO: foundation-advisor`; STOP.
