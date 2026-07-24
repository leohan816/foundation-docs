# M2B Checkout Customer State — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M2B_CHECKOUT_CUSTOMER_STATE`
BASE: `57f5c9459a4ef07ade427e0755af845c95054ec9`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Use the existing Cosmile Worker at Claude Opus 4.8/xhigh in the exact mission worktree. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact inline return.

## Exact path ceiling

1. `app/src/components/commerce/O1TossCheckout.tsx`
2. `app/scripts/o1_checkout_customer_state.vitest.ts` (new)

Do not change cart, route/API, success/fail callback, runtime/repository/auth/payment/provider/economic logic, schema/migration, CSS, page, manifest/lock/config, or any third path.

## Frozen behavior

- Keep `buildTossPaymentRequest`, KRW amount/order binding, sandbox input, official SDK URL, TEST/local layer separation, success/fail URLs, and all server-side authority byte-for-byte unchanged.
- Add an atomic client duplicate-start guard in addition to disabled presentation. One user action can issue at most one start request while the current attempt is active.
- Present truthful phases only: idle `결제하기 (테스트)`; start `주문과 재고를 확인하는 중…`; official SDK/provider handoff `테스트 결제 창을 여는 중…`; deterministic-local handoff retains its explicit non-provider label.
- On checkout-start non-OK/malformed response, missing client key, SDK load/availability failure, or provider-window rejection/throw: clear busy state, render bounded generic Korean `role="alert"` copy, never interpolate or expose `error`, `category`, `reason`, provider body, key, order ID/number, or raw exception.
- Failure guidance must tell the customer to check `/account/orders` before retrying because a durable order/intent may already exist. The order-history link must be keyboard accessible.
- While active, expose `aria-busy` and a polite live status; do not report completion before navigation/provider takeover.
- Do not fabricate `return-confirming` or `unknown`: the current start response has no such outcome. Callback/recovery presentation remains for the later account/order module.

## Tests first

Create one focused adversarial source-contract test proving duplicate-start refusal, exact phase copies, active busy/live semantics, generic bounded failure plus `/account/orders`, raw-value non-rendering, deterministic/local label preservation, and byte-preserved request/economic/provider bindings.

Expected RED: current component uses state-only duplicate protection, one undifferentiated busy label, renders raw start categories/reasons/errors, and provides no recovery guidance.

Run only from `app/`:

`./node_modules/.bin/vitest run scripts/o1_checkout_customer_state.vitest.ts -t "O1 checkout customer state coherence"`

Run once for RED, patch only `O1TossCheckout.tsx`, then run the identical command once for GREEN. No install, generate, build, typecheck, broad test, DB/runtime/browser/provider/network.

## Closure

Inspect exact two-path diff, `git diff --check`, package/lock unchanged, and no new ignored residue. Preserve the existing ignored worktree-local `node_modules`. One truthful additive commit and non-force push; clean/upstream-equal. Return <=60 lines inline and STOP before M3.

If truthful phase/recovery display requires an API/backend or economic contract change, return `HOLD`.

RETURN_TO: `foundation-advisor`
STOP.
