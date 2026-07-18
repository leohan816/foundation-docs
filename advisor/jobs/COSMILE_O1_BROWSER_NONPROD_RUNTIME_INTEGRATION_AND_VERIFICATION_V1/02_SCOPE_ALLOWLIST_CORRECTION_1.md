# Scope Allowlist Correction 1 — Predecessor Typecheck Defects

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
CORRECTION_ID: O1BR-ALLOWLIST-CORRECTION-1
ISSUED_BY: foundation-advisor
AUTHORITY_EFFECT: NARROW_NON_EXPANSIVE_TYPECHECK_CORRECTION
PRODUCT_BEHAVIOR_EXPANSION: NO
SCHEMA_OR_MIGRATION_AUTHORITY: NO
FOUNDATION_WRITE_AUTHORITY: NO
```

## Direct evidence

At the exact reviewed predecessor and mission start HEAD
`63fdd2d507357861aec582b980006baa7d7045a4`, before any mission product
edit, the Worker recorded:

```text
npx vitest run: PASS — 22 files, 529 passed, 2 skipped
npx tsc --noEmit --pretty false: FAIL — 19 errors in 7 files
mission-introduced errors: 0
```

The Advisor independently reproduced the same 19 diagnostics. The errors are
pre-existing TypeScript strictness/interface defects. Two affected files are
runtime repository lanes required by the authorized composition; the other
five are already-reviewed tests or harnesses included by the repository
TypeScript project and therefore block the required typecheck and Next build.

This mission already authorizes bounded build/type/runtime corrections directly
necessary for the approved browser flow. This record freezes the exact paths
and limits of that authority; it does not broaden product scope.

## Added exact allowed paths

Only the following paths are added to the product write allowlist:

- `app/scripts/foundation-memory-deanon.vitest.ts`
- `app/scripts/o1_payment_contract.vitest.ts`
- `app/scripts/o1_order_lifecycle.vitest.ts`
- `app/src/lib/foundation/snapshotRepository.ts`
- `app/src/lib/payment/repository.ts`
- `app/scripts/o1_golden_reversal_harness.ts`
- `app/scripts/o1_golden_order.vitest.ts`

## Exact authorized correction

The same Cosmile Worker may make the smallest behavior-preserving type-only
changes needed to clear only these 19 baseline diagnostics:

- explicit null narrowing/assertions where the test already proves presence;
- literal-discriminant narrowing without changing returned categories;
- readonly-compatible test typing;
- import correction to the already canonical type owner;
- inclusion of existing required `IntentRow` fields in repository/test result
  projections without changing persisted values or state transitions;
- removal of unsafe direct structural casts only through an `unknown` bridge or
  a more precise test type, without weakening runtime validation.

## Prohibited by this correction

- no new behavior, state, outcome, field, contract, or policy;
- no schema or migration change;
- no Memory V3 behavior change;
- no weakening of null, unknown-state, payment, inventory, provenance, or
  authorization checks;
- no test deletion, skip, expectation weakening, or coverage reduction;
- no refactor or cleanup beyond the exact diagnostic sites;
- no modification outside the original allowlist plus the seven paths above;
- no amendment, rebase, squash, force-push, or reviewed-history rewrite.

## Required evidence and review

The Worker must record:

- the original 19-error baseline;
- the exact old/new diff for these seven files;
- `npx tsc --noEmit --pretty false` result;
- focused tests covering every modified file;
- full authorized test/build results;
- a statement that runtime behavior and persisted semantics are unchanged.

The independent Reviewer must review these seven-file corrections as part of
the pinned implementation candidate and explicitly verify that they are
type-only, behavior-preserving, and within this correction.

```text
ADVISOR_VERDICT: PROCEED_WITH_LIMITS
WORKER: same Cosmile Worker
REVIEWER: same independent Reviewer selected for the implementation candidate
HARD_STOP_BEFORE_CONTROLLED_LIVE: ACTIVE
```
