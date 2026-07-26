# M2 E6 — REPLAY HANDOFF SAFETY CORRECTION

Status: **ACTION_REQUIRED / BLOCKING ADVISOR FINDING**

## Pins

- Product candidate: `da0f5dadeeb17779928a6372c9f7ba3cad85015a`, clean/upstream-equal.
- Worker result: docs `cc7f6a07412103d750bc91d028262577444a519e`, files `58`/`59`.
- Same existing Cosmile Worker, Claude Opus 5/xhigh, same CWD and loaded `/fable-builder` context.

## Exact path ceiling

1. `app/src/lib/runtime/o1CommerceRuntime.ts`
2. `app/src/app/api/o1/checkout/start/route.ts`
3. `app/scripts/o1_checkout_start_idempotency.vitest.ts`

No fourth path.

## Blocking contradiction

The candidate returns `ready` for `idempotent_existing`. The browser therefore receives another successful start and
may open a second provider window. Counting one order/reservation/intent inside checkout-start does not prove zero
downstream economic effect.

Correct behavior:

- a newly created intent (`action_required`) may return `ready` exactly once;
- an existing intent (`idempotent_existing`) returns a distinct `pending_replay` outcome carrying the same internal
  order/orderNo/intent evidence;
- `pending_replay` must never carry `ok:true` or reach the provider-opening client branch;
- the route maps it explicitly to HTTP 409 with category-only
  `{error:"checkout_already_pending"}` and no order/intent/provider identifier;
- the existing client generic failure path then directs the customer to order history without any client-file change.

Sequential and concurrent replay must produce exactly one `ready`; every other response is `pending_replay`. Effects
remain one order, one active reservation, one intent, one idempotency key, and zero provider call inside the test.

## Canonical encoding correction

The current delimiter-joined signature and replay comparison are ambiguous when a bound string contains `|`, comma, or
newline. Replace both with an unambiguous canonical JSON encoding of sorted tuple arrays. Add one adversarial test
proving separator-bearing tuples cannot collide. Do not change the signature inputs or opaque `O1-` shape.

## Tests first

Modify only the existing focused suite before source:

- sequential replay: first `ready`, second `pending_replay`, same order/orderNo/intent;
- concurrent replay: exactly one `ready` and one `pending_replay`;
- route response for `pending_replay`: 409, exact category only, no `ok`, order, intent, or provider value;
- adversarial delimiter/newline tuple pairs derive different order numbers and cannot pass exact replay validation;
- retain all prior mismatch/effect/production-binding assertions.

Run exactly once for RED, then once after the correction for GREEN:

`cd app && ./node_modules/.bin/vitest run scripts/o1_checkout_start_idempotency.vitest.ts --config vitest.config.ts -t "checkout-start idempotent order boundary"`

No other test, DB, browser, runtime, provider, checkout, refund, build, typecheck, install, cleanup, legacy-row query, or
economic action.

## Completion

- Inspect exact three-path diff and `git diff --check`; package/lock/schema unchanged.
- One additive product commit and non-force push; clean/upstream-equal.
- Write only:
  - `61_WORKER_M2_E6_REPLAY_HANDOFF_SAFETY_RESULT.md`
  - `62_WORKER_M2_E6_REPLAY_HANDOFF_SAFETY_POINTER.md`
- Commit/push those two docs, return compact PASS or HOLD, and STOP.

STOP if the browser can receive a second ready start, if a route/client fourth path is needed, if any provider/DB action
is needed, or if the correction changes payment/inventory economics rather than refusing replay.
