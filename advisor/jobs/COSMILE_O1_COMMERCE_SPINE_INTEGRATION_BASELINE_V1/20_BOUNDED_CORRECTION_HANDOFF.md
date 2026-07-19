# Advisor Bounded Correction Handoff

```text
MISSION_ID: COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
ACTOR: Cosmile Worker
SESSION: cosmile:0.0
CORRECTION_CLASS: O1_LEGACY_LANE_ISOLATION_AND_BASELINE_GATE
START_HEAD: 94693d26cec3c2e9ac830e9d2c2f6235dcf4c011
MODEL: Opus 4.8
EFFORT: max
DELTA_ONLY_VERIFICATION: REQUIRED
```

This is a bounded continuation of the Founder-authorized integration-baseline
mission. It resolves only the dependency-provisioning blocker and findings F-1,
F-2, and F-3 in the Worker result committed at
`fd54ad87137d879caa15d6bdc31dcaa514427d81`.

## Advisor contract resolution

The correction must fail closed using the conservative union of two existing,
repository-grounded facts:

1. an order number in the exact O1 namespace minted by `mintOrderNo()`
   (`O1-` plus the existing bounded suffix); or
2. at least one `PaymentIntent` structurally bound to the order.

This is not semantic guessing. The namespace is an exact deterministic protocol
marker already used by the reviewed O1 operator queries, while `PaymentIntent`
is the structural money-ownership record. The union covers both pre-intent O1
orders and intent-backed O1 orders. Do not use the runtime flag alone to classify
a persisted order.

Additional lane rule: while the O1 runtime is enabled, legacy checkout start and
mock completion must be unavailable globally. When O1 is disabled, genuine
legacy behavior remains available, except that any persisted O1-owned order must
remain protected by the order-level union above.

## Exact allowed product paths

- `app/src/lib/runtime/o1LegacyLaneIsolation.ts` (new, pure decision module);
- `app/src/lib/checkout.ts`;
- `app/src/app/api/checkout/start/route.ts`;
- `app/src/app/api/checkout/mock-complete/route.ts`;
- `app/src/app/api/admin/orders/[orderId]/status/route.ts`;
- `app/scripts/o1_legacy_lane_isolation.vitest.ts` (new focused test);
- `app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md` (minimum
  version/history/invariant update required by repository rules).

No other product path is authorized. If another path is materially required,
stop before editing and return the exact need.

## Isolated dependency provisioning

The Advisor authorizes an attributable, ignored dependency copy inside the
mission worktree only:

```text
SOURCE:
/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1/app/node_modules
DESTINATION:
/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/app/node_modules
METHOD: cp -a --reflink=auto
```

Before copying, reverify byte-identical `package.json`, `package-lock.json`, and
`prisma/schema.prisma` between the source sibling and target. Do not use the root
Cosmile dependency tree. Do not install, fetch, or contact a package registry.
The destination must remain ignored and mission-attributable. Keep it for the
independent review; Advisor will authorize final cleanup later.

## Tests-first correction sequence

1. Capture clean pre-state.
2. Add only the focused test first and run only:
   `npx vitest run scripts/o1_legacy_lane_isolation.vitest.ts`.
   Record the expected failing cases before implementation.
3. Implement the smallest correction inside the exact paths.
4. Rerun only that focused test until PASS.
5. Prove route wiring, not merely the pure predicate:
   - O1-enabled legacy checkout start is refused before order creation;
   - O1-enabled mock completion is refused;
   - a persisted O1-owned order is refused even with the runtime flag OFF;
   - legacy behavior remains allowed when O1 is OFF and no O1 marker exists;
   - legacy admin status mutation refuses O1-owned orders before update;
   - no payment, refund, inventory, history, reconciliation, provider, or DB
     economic effect occurs in these tests.
6. After the focused correction passes, run the mission's still-unexecuted
   complete candidate gate exactly once on the corrected candidate:
   - `npx prisma generate`;
   - `npx tsc --noEmit`;
   - `npm run build`;
   - `npx vitest run` (the repository-defined 25-file suite).
7. This is the one authorized complete gate, not a rerun. Do not repeat any full
   command after a small fix. If a gate fails, interpret it and return exact
   evidence. Do not fix unrelated failures.
8. If an additional correction is required inside the same seven paths, use only
   the focused test and the materially affected check; never rerun the full suite.
9. Inspect final diff, stage only exact allowed product paths, commit additively,
   push the mission branch non-force, and verify upstream equality.

## Required behavior and response

- Customer mock and console-admin legacy paths must not mutate O1 money truth.
- No status-based shortcut, runtime-flag-only order classification, permissive
  fallback, or order-not-found information leak.
- Preserve O1 payment/refund/inventory/reconciliation behavior unchanged.
- Preserve legacy behavior only outside the O1 lane as defined above.
- Return stable categorical error responses without internal identifiers.

## Strict exclusions

No schema/migration, DB runtime, provider, secret, credential, PII, production,
public exposure, payment/refund execution, broad rewrite, storefront work,
unrelated type-debt cleanup, test weakening, full-suite repetition, Reviewer
dispatch, merge, force push, or next mission.

## Result paths

Worker authors only; Advisor publishes:

```text
FOUNDATION_DOCS_WORKTREE:
/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1
RESULT_PATH:
runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/30_WORKER_CORRECTION_RESULT.md
POINTER_PATH:
runs/cosmile/COSMILE_O1_COMMERCE_SPINE_INTEGRATION_BASELINE_V1/31_WORKER_CORRECTION_POINTER.md
RETURN_TO: foundation-advisor
STOP_AFTER_RESULT: YES
```
