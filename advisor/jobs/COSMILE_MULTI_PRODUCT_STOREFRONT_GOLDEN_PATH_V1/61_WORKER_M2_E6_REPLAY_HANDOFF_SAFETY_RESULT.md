# M2 E6 REPLAY HANDOFF SAFETY CORRECTION — WORKER RESULT

Status: **PASS**

- Correction doc verified: docs `14998f71`, blob `e1023313`, sha256 `590cee9a`.
- Candidate `da0f5dad…` clean/upstream-equal → result commit `4dd56c12c72a4e6921295ab26910fbc8abff2526`, non-force pushed, clean/upstream-equal.
- E7 not started.

## The Advisor finding was correct, and RED reproduced both defects before any source change

1. **Replay handed the browser a second successful start.** `idempotent_existing` returned `ready`, so the client's provider-opening branch could run twice. Sequential replay returned `ready`/`ready`; concurrent replay returned two `ready`.
2. **The delimiter-joined canonical form was genuinely ambiguous.** RED showed sku `adv|x` + product `y` and sku `adv` + product `x|y` deriving the *identical* number `O1-28B077A91DE63FD5C373`, and an order seeded with one tuple being **adopted** as an exact replay of the other (`ready`, not a conflict). This was a live collision, not a theoretical one.

## Correction

- New `pending_replay` outcome: same internal `orderId`/`orderNo`/`amount`/`intentId`, and deliberately **no** `clientKey` and **no** `layer`. A case asserts its key set is exactly `{kind, orderId, orderNo, amount, intentId}`, so the provider-opening materials exist only on the single `ready`.
- `action_required` → `ready` exactly once; `idempotent_existing` → `pending_replay`.
- Route maps it explicitly: `case "pending_replay": 409 {error:"checkout_already_pending"}` — never through `default`. Asserted category-only: no `ok:`, `orderId`, `orderNo`, `intentId`, `clientKey`, or `evidenceLayer` in that branch. No client file touched.
- Canonical JSON replaces delimiter joining in **both** the order-number signature and the replay line comparison: sorted arrays of `JSON.stringify([...])` tuples, so every `|`, comma and newline is escaped and each tuple has exactly one encoding. Signature inputs and the opaque `O1-` + 20 uppercase hex shape are unchanged.

Payment and inventory economics are untouched — the change refuses a *response*, not a lane. Reserve still receives the same tuple; the intent still uses the same `o1ik_${orderId}` key.

## Tests-first evidence

Command, identical both runs:

`cd app && ./node_modules/.bin/vitest run scripts/o1_checkout_start_idempotency.vitest.ts --config vitest.config.ts -t "checkout-start idempotent order boundary"`

- **RED** (tests only): `5 failed | 4 passed (9)`, exit `1` — second `ready`, two concurrent `ready`, missing route branch, derived-number collision, ambiguous adoption.
- **GREEN** (identical, once): `9 passed (9)`, exit `0`.

Sequential and concurrent replay each produce exactly one `ready` and one `pending_replay`, converging on one order, one active reservation, one intent, one distinct idempotency key, zero provider call. The race remains real: `createAttempts 2`, `uniqueViolations 1`. All prior mismatch (12 shapes), effect-count and production-binding assertions are retained; nothing was weakened or removed.

## Containment

- Exactly the three ceiling paths: `o1CommerceRuntime.ts` (+37/−…), `api/o1/checkout/start/route.ts` (+5), `o1_checkout_start_idempotency.vitest.ts` (+116/−…). Total 133 insertions, 25 deletions.
- `git diff --check` exit `0`; package/lock/schema unchanged (0 entries).
- No DB, browser, provider, runtime, checkout, refund, cleanup, build, typecheck, install or legacy-row action. The two preserved legacy pending orders and holds were never queried.

## Not proven here

- The route mapping is proven by a source-contract oracle over `route.ts` (the suite is pure; importing the route would pull the Next server runtime and Prisma). It proves the branch exists, its status, its exact category payload, and the absence of every provider-opening field — not an executed HTTP response.
- No typecheck, build, DB or live request was authorized. Other suites importing `startO1Checkout` were not re-run; its named export and 3-argument shape are unchanged, but `O1CheckoutStartOutcome` gained a variant, so any exhaustive `switch` elsewhere over that union would now need the new case. I did not survey other call sites — only the one route consumes this outcome inside the ceiling.
- Derived order numbers change with the new encoding. No derived number is persisted anywhere (the two legacy rows carry random numbers), so nothing existing is invalidated.
