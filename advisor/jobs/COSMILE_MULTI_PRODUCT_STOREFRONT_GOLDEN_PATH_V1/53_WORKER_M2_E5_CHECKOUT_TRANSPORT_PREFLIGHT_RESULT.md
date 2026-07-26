# M2 E5 CHECKOUT TRANSPORT PREFLIGHT — WORKER RESULT

Status: **PASS**

- Pins verified before acting: docs `e123413d`, blob `11b20c68`, sha256 `271cbc84`. Base `e257ae08…`, clean/upstream-equal.
- Result commit `e26e1aa18f1d58f1b6354a14b4a46bbd41aa5c97`, non-force pushed; tree clean, upstream-equal.

## Correction

`resolveO1Transport(env)` and its `intent_rejected / transport_unavailable` return moved to an `(a0)` preflight — after the structural refusals (runtime flag, verified owner, non-empty lines) and before the catalog, order and reservation stages. The same resolution is reused unchanged at the intent step. No provider call, no new branch, no changed outcome vocabulary. Source delta is 7 added lines and 2 moved lines.

Why it is safe to move: transport resolution is pure and side-effect free (a credential-gate read plus a memoised local substitute); it performs no provider or network call.

## Tests-first evidence

Command, identical for both runs:

`cd app && ./node_modules/.bin/vitest run scripts/o1_browser_runtime_contract.vitest.ts --config vitest.config.ts -t "checkout transport preflight"`

- **RED** (test added, source untouched): `1 failed | 2 passed | 99 skipped (102)`, exit `1`. Failure was exactly the ordering defect — `expected 'catalog_rejected' to be 'intent_rejected'`, proving the catalog stage ran before the transport check.
- **GREEN** (identical command, run once): `3 passed | 99 skipped (102)`, exit `0`.

The ordering is made observable with a line that cannot survive the catalog stage, so a catalog verdict returning first is a detectable failure. The block also pins that (i) the structural refusals stay ahead of the preflight (`not_enabled`, `not_authenticated`, `empty`), and (ii) with the local substitute admitted, the same unusable line is still judged by the catalog stage — the preflight gates rather than replaces.

## Containment

- Exactly the two ceiling paths: `app/scripts/o1_browser_runtime_contract.vitest.ts` (+55), `app/src/lib/runtime/o1CommerceRuntime.ts` (+8/−2).
- `git diff --check` exit `0`; `package.json`, `package-lock.json`, `prisma/` unchanged (0 entries).
- No DB, runtime, browser, provider, checkout, refund, cleanup, build, typecheck, install, schema or economic action. The two preserved pending orders and two `reserved` holds are untouched.

## Effect on the E4 defect

This removes the durable residue from the transport-unavailable path: a checkout with no admitted transport now returns before `Order.create` and before `wucReserve`, so a retry can no longer accumulate a pending order or an inventory hold.

## Not proven here

- The **duplicate** mechanism itself is unchanged: `startO1Checkout` still has no idempotency against an existing `pending` order with the same owner and line signature, so two attempts that both reach a *ready* transport would still mint two orders. Out of this handoff's scope.
- No typecheck, build or live request was authorized, so the change rests on the focused contract test only.
- Read-only evidence outside the two write paths, zero scope effect: confirmed that this test file already imports from the runtime module (mid-file import convention) and read the exported `LOCAL_SUBSTITUTE_FLAG` name.
