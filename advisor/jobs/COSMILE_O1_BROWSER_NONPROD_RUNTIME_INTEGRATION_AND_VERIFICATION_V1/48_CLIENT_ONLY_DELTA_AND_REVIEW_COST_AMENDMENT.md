# Strategy Amendment — Client-Only Delta and Cost-Proportional Review

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
SOURCE: Leo via foundation-strategy-sol
APPLIES_TO: 47_PREVIEW_SUCCESS_TRANSITION_DELTA_HANDOFF.md
DELTA_ONLY_VERIFICATION: REQUIRED
INDEPENDENT_REVIEWER_DISPATCHED: NO
FULL_REPOSITORY_OR_FULL_SUITE_EXECUTION: PROHIBITED
```

This amendment narrows the active Worker correction boundary.

## Exact changed-path boundary

```text
EXACT_CHANGED_PATHS_ALLOWED:
- app/src/app/preview/page.tsx
- app/scripts/o1_browser_runtime_contract.vitest.ts

MUST_REMAIN_BYTE_IDENTICAL:
- app/src/app/api/preview/access/route.ts
- app/src/lib/auth/o1PreviewAccess.ts
- app/src/middleware.ts
```

The Worker may continue diagnosis by reading the five paths authorized in handoff 47, but it
must not edit the API route, cookie/token library, or middleware. If cookie issuance,
middleware validation, secret comparison, or another security contract must change, STOP
before correction and return the exact need, affected contract, and bounded review-cost
proposal to the Advisor for routing through Strategy to Leo.

## Exact changed behavior and contracts

```text
EXACT_CHANGED_BEHAVIOR:
- client success must not clear the field or claim completion before navigation is committed;
- an incomplete/bounced navigation must expose a safe visible category-only state;
- the protected key remains only in the live form and is never logged, stored, or returned.

DIRECTLY_AFFECTED_CONTRACTS:
- preview client response handling;
- form reset timing;
- protected navigation/refresh behavior;
- safe visible error state after an incomplete transition.
```

## Focused verification and review route

- Run only filtered tests for the client success/reset/navigation/error contracts actually
  changed.
- At most one safe isolated synthetic browser reproduction remains permitted under handoff
  47.
- Do not run the full suite, full build, unrelated typecheck/lint, or previously evidenced
  tests.
- If the final delta is client-only and the three security files are byte-identical, do not
  dispatch Fable 5 or any substitute Reviewer for this correction.
- The Advisor validates the exact diff, focused evidence, containment, and security-file blob
  equality. Leo's browser acceptance is the runtime checkpoint.
- Preserve the client-only delta for one later bounded final independent mission review.

Google and Toss remain blocked until `PREVIEW_UNLOCK_CONFIRMED`.

