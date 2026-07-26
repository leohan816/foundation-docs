# Worker result — M2 CUSTOMERS

OUTCOME: `STOP` — the frozen read contract is not satisfiable on the current schema without an identity decision the handoff forbids me to make. **Zero product paths touched**; no test written, no command run beyond read-only inspection.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M2_CUSTOMERS`
ACTOR: existing `cosmile:claude.0` Worker · Opus 5/xhigh · `/fable-builder` (`implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`).
HANDOFF: docs `fe27d02c4572fa277e3c7cbd025f3136d427918c`, blob `ace72d0e1f52b909535ab45a624a026b9812d8f0`, SHA256 `824c401218c40231cdb6da74b892d5de44aff96639e7d8754a353b3b6d7a2cd3` — verified byte-exact.
PRODUCT: `9bd0c7785ff49850010b021c75d765cd45a6a166`, verified clean and upstream-equal at entry and unchanged at return (delta `0`).

## The blocking gap

The frozen row shape requires, **per customer**, an `orderCount` and a nullable latest O1 tuple `{ orderId, orderNo, dbStatus }`. That requires an association from `CustomerAccount` to `Order`. The schema declares none:

- `model CustomerAccount` (schema line 1104) has exactly three scalars — `id`, `status`, `createdAt` — and exactly two relations, `identities AuthIdentity[]` and `sessions CustomerSession[]`.
- The only `CustomerAccount` relation targets in the whole schema are lines 1118 and 1130: `AuthIdentity.customer` and `CustomerSession.customer`. There is no third.
- `model Order` declares no customer field at all. Its only `customer` occurrence is a comment on `serviceRequest`. Its subject-ish columns are `userId` (nullable, no FK, no relation attribute, `@@index([userId])` only), `guestId`, and the hashed `memorySubjectRef`.
- No join model carries both. The only `customerId` columns in the schema are the two on `AuthIdentity` and `CustomerSession`.

So the only existing path from a `CustomerAccount` to anything order-shaped runs through `AuthIdentity` — which this same contract explicitly forbids reading. Contract §"Frozen read contract" is therefore internally unsatisfiable as written.

## Why I did not pick a linkage

Treating `Order.userId` as a `CustomerAccount.id` is the obvious-looking bridge and I am declining it deliberately. It is undeclared (no FK, no relation, no CHECK), nullable, and of unstated provenance — it may denote a legacy user rather than a customer account. Adopting it would be exactly the "new identity decision" and "customer identity/authority conflation" the hard boundaries name as STOP conditions, and a wrong guess would silently attribute one person's orders to another account on an operator surface. The handoff's own STOP list — "needed schema/FK/PII field/new identity decision" — covers this precisely, so the decision belongs to the Advisor and Designer, not to me.

## Options for the Advisor (no recommendation is a decision)

1. **Declare the linkage canonically.** Confirm the intended `Order` → `CustomerAccount` association and land it as a schema relation in a separately authorized migration module. M2 then re-dispatches unchanged.
2. **Narrow the frozen row shape.** Drop `orderCount` and the latest-O1 tuple for this module, shipping `/dashboard/customers` with only `accountStatus` and `joinedAt` from `CustomerAccount` — truthful, needs no new linkage, and keeps the accepted table grammar with two fewer columns.
3. **Authorize the identity path explicitly.** If `AuthIdentity` is in fact the sanctioned bridge, that requires lifting the no-`AuthIdentity` clause and an explicit PII/identity disposition — a Leo/GPT-level decision, not an Advisor-local one.

Nothing else in the module is blocked: the capability catalog change, the nav row, the page grammar, the pure service bounds and the four test updates are all executable the moment the row shape is settled.

## State and effects

No file created or modified in any of the nine ceiling paths. No test authored, no RED or GREEN run, no commit, push, stage or branch change. Effects `0` — no DB read or write, grant, seed, identity value, schema, migration, runtime, browser, provider, economic or public-preview action; the listening preview was untouched. Inspection was read-only: the pinned handoff, `capability.ts`, `operator_authority_contract.vitest.ts`, and the Prisma schema's `Order`/`CustomerAccount` definitions. No agent/sub-agent/delegation, self-review, risk acceptance or approval.

These two result files are written but **not committed or pushed**, since the dispatch ties the single commit/push to PASS.

RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
