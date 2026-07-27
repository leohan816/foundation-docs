# Advisor handoff — F2 E5 type-contract correction

VERDICT: `PROCEED_WITH_LIMITS` · exact compile-derived correction only.

## Preserved RED

Handoff 107 first typecheck, docs `a02e108`, exit `2`, exactly:

1. `snapshotRepository.ts`: `heads.map` callback parameter implicitly `any`
   because the deliberately untyped transaction client erases the generic.
2. `o1CommerceRuntime.ts`: checkout collaborator `createIntent.currency`
   widens the reviewed `CreateIntentInput.currency` literal `"KRW"` to
   `string`.

Prisma generate passed. Build/runtime/browser were not run. Runtime and DB are
unchanged; seven candidates remain admitted.

## Exact two-path correction

1. `app/src/lib/foundation/snapshotRepository.ts`
2. `app/src/lib/runtime/o1CommerceRuntime.ts`

- Give only the `heads.map` callback its already-declared row type
  `{ id: string; sha: string }`.
- Narrow only the checkout collaborator `createIntent` input currency from
  `string` to literal `"KRW"` so it matches the existing reviewed payment
  contract. Do not change order-record/order-create DB projections or another
  currency field.

No logic, SQL, runtime, provider, economics, idempotency, candidate, overlay,
lineage, error, schema, migration, package, lock, test, or configuration
change.

The preserved typecheck is the meaningful RED. Apply the two type-only edits,
then run exactly once:

`cd app && ./node_modules/.bin/tsc --noEmit --incremental false`

Require exit 0. No Prisma generate repeat, test, build, runtime stop/restart,
browser, DB, provider, checkout, order, payment, or refund.

Audit exact two-path delta and `git diff --check`; schema/package/lock
unchanged. Commit once, non-force push, clean/upstream-equal. Write only:

- `111_WORKER_F2_E5_TYPE_CONTRACT_CORRECTION_RESULT.md`
- `112_WORKER_F2_E5_TYPE_CONTRACT_CORRECTION_POINTER.md`

Commit/push those docs and STOP before build/runtime/browser. First failure
HOLD; no additional correction.
