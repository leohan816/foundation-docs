# M2 E4 DUPLICATE CHECKOUT — READ-ONLY WORKER HANDOFF

- Verdict: `PROCEED_WITH_LIMITS`. Preserve all current rows; no checkout/Toss/refund/cancel/retry/cleanup.
- Actor/session: existing Cosmile Worker `cosmile:claude.0`, Opus 5/xhigh, `/fable-builder`.
- Product: exact worktree/branch at `e257ae08e7111603c930d54197ba01001a70a354`, clean/upstream-equal.
- Runtime: exact candidate worktree on loopback `:3000`; load its `DATABASE_URL` into a shell variable without printing it.

## Exact read-only ceiling

1. Source evidence only: `app/src/lib/runtime/o1CommerceRuntime.ts` checkout-start block, `app/src/app/api/o1/checkout/start/route.ts`, `app/src/components/commerce/O1TossCheckout.tsx`, and the relevant existing Prisma model blocks.
2. Existing runtime log: count/status only for `POST /api/o1/checkout/start`; no body, cookie, identifier, env value, or unrelated log.
3. One repeatable-read, read-only DB transaction with a bounded timeout. Emit only counts, enum categories, booleans, rank, relative age/gap seconds, and equality relationships.

## Required categorical evidence

- O1 orders by status; ranked creation relationship for the two pending rows; same owner/line/quantity/total/currency booleans only.
- For each rank: payment-intent count/status and provider-ref-null boolean; transaction counts by type/status; succeeded-capture count; refund count.
- Reservation count/status per rank and whether SKU/quantity signatures match.
- Cart counts by status and owner category (customer/guest/ownerless), item counts, merge/active relationship, and relative time against the two orders.
- Compare against preserved pre-attempt evidence `orders/payment/refund = 0`; state whether both rows post-date that checkpoint.
- Decide the first failing boundary and whether provider/economic effects are exactly zero. Do not infer a provider call from an internal intent.

## Return

- No product/docs source edit except:
  - `50_WORKER_M2_E4_DUPLICATE_CHECKOUT_DIAGNOSIS_RESULT.md`
  - `51_WORKER_M2_E4_DUPLICATE_CHECKOUT_DIAGNOSIS_POINTER.md`
- Commit/non-force push only those two docs paths; return `PASS_DIAGNOSIS | HOLD` in <=50 lines; STOP.
