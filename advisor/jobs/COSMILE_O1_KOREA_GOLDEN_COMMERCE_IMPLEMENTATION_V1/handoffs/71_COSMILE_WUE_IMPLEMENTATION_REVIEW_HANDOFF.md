# Independent Reviewer Handoff — Cosmile WU-E Implementation

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-E order lifecycle, recovery, record-only fulfillment, and operator-control candidate
REVIEW_PASS: IMPLEMENTATION_REVIEW
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Exact pins and independence

```text
PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_BASE_HEAD: b344889428971f6baa7208ea3e76858de0c9fc8b
CANDIDATE_HEAD: d1f21e0fdd51034eef025212729125cee91576dd
CANDIDATE_EXPECTED_PARENT: b344889428971f6baa7208ea3e76858de0c9fc8b
CANDIDATE_PUSH_STATUS: NOT_PUSHED
EXPECTED_UPSTREAM_HEAD: b344889428971f6baa7208ea3e76858de0c9fc8b
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
WORKER_EVIDENCE_COMMIT: cf717af032ced5b22102d906be97bcec76732fdf
WORKER_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/70_COSMILE_WUE_RESULT.md
WORKER_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/70_COSMILE_WUE_POINTER.md
IMPLEMENTATION_HANDOFF_COMMIT: 3384952a09011234c10f8cbb19fd5877a685f48a
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
```

Before review, live-verify session/model/effort/skill/CWD/independence, pane synchronization OFF,
no overlapping review, all Git pins, clean product state, and exact unpushed ancestry. Read the
current Agent Office Reviewer role and Cosmile repository rules. Treat the Worker report and test
names as claims, not proof. Do not patch, stage, commit, push, dispatch, select policy, or accept risk.

## Exact candidate path boundary

The base-to-candidate diff must contain exactly these nine allowlisted paths:

- `app/prisma/schema.prisma`
- `app/prisma/migrations/20260718060000_o1_order_lifecycle_record_only/migration.sql`
- `app/prisma/migrations/20260718060000_o1_order_lifecycle_record_only/down.sql`
- `app/src/lib/order/contracts.ts`
- `app/src/lib/order/repository.ts`
- `app/src/lib/order/service.ts`
- `app/src/lib/order/stepUp.ts`
- `app/scripts/o1_order_lifecycle.vitest.ts`
- `app/scripts/o1_order_lifecycle.dbtest.py`

No route, page, component, existing payment/inventory/auth/snapshot path, package, lockfile,
generated client, configuration, endpoint, network, provider, courier, Foundation, SIASIU, control,
or unrelated path may change. The Prisma schema change must be additive only.

## Founder-frozen boundary

- WU-E composes the already-reviewed WU-0/WU-A/WU-B/WU-C/WU-D substrate; it must not redefine
  money, refund, inventory, identity, catalog, Foundation, or audit truth.
- Only one additive record-only shipment projection is permitted. No address, name, phone, raw PII,
  provider payload, credential, courier integration, route, UI, worker, timer, or activation.
- Atomic captured-order bind may consume only already-durable WU-B capture truth. It must never
  cause a provider effect, re-charge, infer payment truth, or report false success.
- Full refund projection may occur only after a complete durable WU-B full-refund record and exact
  step-up authorization. Inventory remains committed; automatic sellable-stock restoration is
  forbidden.
- The runtime step-up verifier defaults UNCONFIGURED and deny-all. No MFA/OIDC/session/credential
  mechanism may be implemented or implied. An explicit verifier may exist only as clearly test-only
  harness code.
- Guest checkout remains deferred. Customer ownership must not newly trust `guestId`.
- Fulfillment is record-only and only for a fully bound coherent paid order. Tracking is opaque and
  operator-recorded; no externally verified delivery claim.
- WU-F/G, provider sandbox execution, Controlled Live, Paid Beta, public sale, Foundation AI,
  SIASIU AI, and Memory V3 remain outside this subject.

## Required direct determinations

### A. Schema and migration correctness

Verify directly:

- the Prisma relation and raw SQL are mutually consistent and additive;
- closed shipment states, one record per order, bounded nonblank carrier/tracking fields, FK behavior,
  and the shipped/delivered tracking requirement are enforced by SQL rather than comments alone;
- forward/down/forward is safe, idempotent where claimed, and touches no WU-0 object;
- no PII, provider identifier, address, courier endpoint, or competing truth table is introduced;
- the disposable rehearsal actually applies the exact committed WU-0 and candidate migrations,
  proves constraint identity, and cannot hide an unsafe reverse.

### B. Captured-order bind — load-bearing transaction

Attack the production repository code and its SQL twin for:

- exact order, positive non-null lines, captured intent, exactly one succeeded capture, same order,
  exact amount, KRW, and immutable captured payment binding;
- exact bidirectional reservation coverage by aggregate SKU, including duplicate order-line SKUs;
- extra SKU, missing/under/over coverage, released/expired/committed contaminant, null SKU, and
  non-positive quantity;
- per-order concurrency, lock ordering, replay, partial failure, zero-row transition, duplicate paid
  history, duplicate capture, multiple intents/captures, and already incompatible order state;
- the first commit changes only the exact reserved set to committed and does not release expired
  reservations after verified provider effect;
- captured-but-incoherent paths open/reuse bounded reconciliation and never re-charge or report a
  conclusive payment failure;
- exact replay is zero-write idempotent only when paid state, paidAt, one paid history, capture/intent
  binding, and exact committed coverage are all coherent;
- audit failure rolls back the entire sensitive transaction.

Determine whether `repository.ts` itself is faithful and executable against the pinned schema.
The plpgsql rehearsal is independent evidence, not automatic proof that the TypeScript repository
contains the same queries or transaction behavior.

### C. Refund, authorization, and recovery

Verify:

- full durable succeeded capture plus exact full `Refund.status='refunded'` binding is re-read under
  the order lock before internal order finalization;
- amount, currency, capture, refund idempotency key, order, and current state all bind exactly;
- incomplete/partial/malformed/mismatched or incoherent inventory state HOLDs/reconciles and never
  becomes a false `refunded` result;
- exact replay is zero-write idempotent while a false-coherent refunded state does not pass;
- all reservations remain committed and no sellable stock is restored;
- normal capture bind cannot accept a caller-supplied operator identity and writes only category-safe
  system audit evidence;
- refund and recovery require exact action/role/operator/scope/reason/freshness binding, malformed
  requests fail before authorization, freshness replay is denied, and the runtime default denies all;
- the WU-B `AuthorizationVerdictPort` adapter cannot weaken the step-up boundary;
- reconciliation opens/reuses deterministically and resolution is not fabricated.

### D. Fulfillment and safe projections

Verify:

- pending -> preparing -> shipped -> delivered is the only legal forward sequence;
- equality replay is zero-write idempotent; skips, regressions, and unknown states fail closed;
- fulfillment requires the complete paid/capture/intent/history/committed-inventory coherence, not
  merely `Order.status='paid'`;
- tracking is nonblank and bounded, is carried forward correctly, and is returned to a customer only
  for shipped/delivered projections;
- customer order access trusts only the injected verified authenticated `userId`; guest-owned and
  wrong-owner rows fail closed;
- operator projection is owner/admin gated and responses contain only bounded categories/counts;
- no paymentKey, capture/intent/refund/internal provider reference, raw owner ID, SKU ID, secret,
  credential, raw PII, SQL, or sensitive payload leaks through results, errors, audit metadata,
  fixtures, or evidence;
- audit failure rolls back shipment/history mutation.

### E. Error containment and adjacent negatives

Inspect every error/throw/catch mapping. Unexpected repository, ID, clock, audit, Prisma, or
transaction failures must never become success/idempotent or leak raw detail. Check invalid and
whitespace-only identifiers/categories/scopes, overlong fields, unknown enum values, duplicate IDs,
and database constraint failures. Confirm test-only failure hooks and explicit-grant verifiers cannot
be mistaken for configured runtime mechanisms.

### F. Tests, runtime parity, safety, and honest claim ceiling

Reproduce, when direct preflight proves safety:

```text
cd app
npx vitest run scripts/o1_order_lifecycle.vitest.ts
npx vitest run
python3 scripts/o1_order_lifecycle.dbtest.py
python3 scripts/o1_payment_repository.dbtest.py
python3 scripts/o1_inventory_concurrency.dbtest.py
python3 scripts/o1_golden_commerce_migration.dbtest.py
```

Inspect commands before execution. No install, Prisma generation, image pull, external network,
shared/real/target DB, provider, credential, customer data, PII, real payment, endpoint, route, or
activation. Record pre/post Git state, already-local image proof, container identity, socket/port
containment, cleanup, and exact counts. Cleanup is blocking and must leave no container, symlink,
generated file, or cache residue attributable to the review.

Inspect the focused and full test assertions, not only counts. Determine whether the in-memory fake
and plpgsql twin materially match the actual TypeScript repository. Typecheck/build may remain
honestly unrun only if the pinned generated-Prisma-client boundary makes it unsafe; explicitly decide
whether that leaves a blocking implementation defect, an in-scope correction, or a bounded residual
unknown. Do not credit WU-F/G, credentialed sandbox, checkout route, provider network, UI, or
end-to-end evidence that was not executed.

## Verdict contract

Current Agent Office role verdicts:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

Mission-facing deterministic mapping:

```text
PASS -> PASS
NEEDS_PATCH -> PASS_WITH_CORRECTIONS
PASS_WITH_RISK -> HOLD
FAIL -> FAIL
```

Do not return PASS if a load-bearing capture bind, refund, authorization, exact coverage,
concurrency, reconciliation, fulfillment, ownership, leakage, audit rollback, cleanup, or runtime
repository invariant is unconnected, contradicted, or only asserted by a twin/test name. For every
finding provide a stable ID, severity, exact file/line, reproduction or proof, impact, and the
smallest in-scope correction boundary. Separate observations from blocking findings and state
whether the candidate may be pushed.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/71_COSMILE_WUE_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/71_COSMILE_WUE_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not dispatch the Worker, patch anything, push the
candidate, or begin WU-F/G.
