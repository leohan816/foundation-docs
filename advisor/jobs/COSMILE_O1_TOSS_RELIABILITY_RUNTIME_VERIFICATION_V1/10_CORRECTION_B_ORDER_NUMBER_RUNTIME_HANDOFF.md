# FOUNDATION ADVISOR HANDOFF — CORRECTION B

```text
MISSION_ID: COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
MODULE: CORRECTION_B_ORDER_NUMBER_RUNTIME_LOOKUP
FROM: foundation-advisor
TO: cosmile
BASE_HEAD: 2faf7497448541d1bb42f3fcdb6141214f8c5608
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1
BRANCH: verification/cosmile-o1-toss-reliability-runtime-v1-20260720
PRODUCT_WRITE: AUTHORIZED_ONLY_FOR_EXACT_THREE_PATHS
R1_R2_R3_R4: BLOCKED_DURING_THIS_MODULE
```

## Binding and skill gate

- Live binding must be Cosmile Worker, Opus 4.8, effort max, exact worktree/CWD above, isolated pane, current Agent Office authority.
- Load `/fable-builder` and read only `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only for the compact result.
- If any binding, skill, authority, or path condition differs: STOP and return categorically.

## Exact path ceiling

1. `app/src/lib/payment/webhook.ts`
2. `app/src/lib/runtime/o1CommerceRuntime.ts`
3. `app/scripts/o1_browser_runtime_contract.vitest.ts`

No other product path may change.

## Exact additive correction

1. Preserve the current payment-key query when the durable intent has a valid `providerIntentRef`.
2. In `inspectWebhookProvider`, when `providerIntentRef` is null/unclaimed but the durable intent has an eligible status and valid durable `{orderNo, expectedAmount, KRW}` binding, call the existing `queryPaymentByOrderNo` adapter.
3. Bind the returned provider view fail-closed to the durable order number, exact positive KRW amount, currency, and—when already claimed—the exact payment key. A mismatched/malformed/non-conclusive/failed lookup remains the existing closed outcome. The notification never creates economic truth.
4. Extend only the deterministic local substitute transport with the bounded `GET /v1/payments/orders/{orderNo}` response shape needed to exercise the same lookup. It remains explicitly local/provider-shaped evidence, opens no socket, and creates no new payment semantics.
5. Preserve all capture, refund, order, inventory, webhook ACK, lease, replay, authorization, and reconciliation behavior.

## Tests-first delta-only verification

- Add one or more focused named cases in the exact test file first.
- Required focused proof: unclaimed durable intent selects merchant-order lookup; claimed intent still selects payment-key lookup; exact order/amount/KRW binding passes; mismatch and missing lookup fail closed; deterministic local order lookup returns the same bounded parsed shape; zero economic effect.
- Run only the exact new named case/filter for RED, then the same exact case/filter for GREEN.
- The worktree has no dependency installation authority. For these focused tests only, the existing shared Cosmile Vitest toolchain may be used read-only with `NODE_PATH=/home/leo/Project/Cosmile/app/node_modules` and `/home/leo/Project/Cosmile/app/node_modules/.bin/vitest`; do not write, generate, install, copy, symlink, or clean anything in the shared tree. Use a no-cache mode if supported. If resolution fails or any shared/worktree dependency artifact would be created, STOP without an alternative.
- No DB, runtime, provider/network call, install, generate, build, typecheck, full file, full suite, unrelated test, or Reviewer.

## Commit, evidence, and stop

- Inspect exact base-to-candidate diff and prove only the three paths changed.
- Remove only attributable temporary test artifacts; verify shared toolchain unchanged categorically and product Git clean except the intended delta.
- One additive product commit and non-force push to the mission branch; set upstream if needed.
- Return a compact evidence index: skill/references, RED command/result, GREEN command/result, exact changed paths, behavior/economic effects, side effects/cleanup, commit/upstream/Git state, risks/STOPs.
- STOP. Do not begin R1 or dispatch any actor.
