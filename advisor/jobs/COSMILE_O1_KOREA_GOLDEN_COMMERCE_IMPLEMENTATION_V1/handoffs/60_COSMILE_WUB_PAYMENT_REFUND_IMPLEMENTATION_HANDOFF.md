# Cosmile Worker Handoff — WU-B Direct Toss V2 Payment/Refund Truth Lane

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact starting state and governing decisions

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_BASE_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_UPSTREAM_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_AHEAD_BEHIND: 0_0
EXPECTED_WORKTREE_STATE: CLEAN

WU0_SCHEMA_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
WUA_REVIEWED_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
WUC_REVIEWED_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
WUC_REVIEW_COMMIT: 58202ed7103defb9a983c1b7d46c265f826f8b30
WUD_REVIEWED_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
WUD_REVIEW_COMMIT: 3bdc1d5d2d6ecb21050745de77be8f38ad01a580

REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
INDEPENDENT_DESIGN_REVIEW_VERDICT: PASS

PSP_DECISION: DIRECT_TOSS_PAYMENTS_V2
PORTONE_SWITCH: NOT_AUTHORIZED
GENERAL_PAYMENT_WEBHOOK_TRUST: UNTRUSTED_NOTIFICATION_UNTIL_SERVER_SIDE_QUERY_VERIFICATION
GENERAL_PAYMENT_WEBHOOK_SIGNATURE: NOT_DOCUMENTED_FOR_PAYMENT_STATUS_CHANGED_DO_NOT_INVENT
FULL_CAPTURED_SANDBOX_REFUND_ONLY: YES
PARTIAL_REFUND: NOT_AUTHORIZED
RUNTIME_ACTIVATION: NO
```

Before editing, live-verify the same Worker/session/model/effort/skill/workspace and every Git pin. Read the current
Agent Office Worker rules, Cosmile `AGENTS.md`, `CLAUDE.md`, `app/CLAUDE.md`, security/secret and env/migration
guardrails, `app/docs/testing/TEST_MEANING_POLICY.md`, the committed Founder decision closure, the reviewed design,
official-provider research, WU-0 schema/migration, and the reviewed WU-C contract. Stop on mismatch, tracked drift,
an unlisted-path requirement, a need to select product/refund/Legal policy, provider infeasibility, or material scope
expansion. Preserve all reviewed history; no amend, rebase, squash, force-push, or rewrite.

## Exact WU-B boundary

Implement the smallest non-production, **library/repository-only** Toss V2 payment/refund truth lane on the already
reviewed WU-0 `PaymentIntent`, `PaymentTransaction`, `Refund`, `WebhookEventInbox`, `ReconciliationTask`, and
`Order.orderNo` substrate and the reviewed WU-C payment-proof boundary.

This WorkUnit does **not** connect checkout, routes, UI, order lifecycle, inventory commit/release, operator console,
or a running provider process. WU-E owns order/inventory/operator integration; WU-F and WU-G own credential-gated
sandbox walking-skeleton execution. WU-B must leave a precise, testable port and durable truth lane for those later
authorized WorkUnits without activating them.

### 1. Closed contracts and provider port

- Define bounded, discriminated inputs/outcomes for intent creation, provider confirmation/query, capture recording,
  webhook notification ingestion/verification, full captured-payment refund, and reconciliation-required states.
- Currency is exactly `KRW`; money is a positive bounded integer in minor units; no floating-point money.
- All identifiers and idempotency keys are non-empty and bounded to 256 Unicode code points before repository,
  provider-path, header, or persistence use. Do not normalize, truncate, rewrite, or log them.
- Model only Toss states required to interpret the official general-payment lifecycle. Unknown, malformed,
  unsupported, partial-cancel, out-of-order, timeout, and provider-error states fail closed into bounded categories;
  no permissive default success.
- Implement a direct Toss V2 adapter over an injected authenticated HTTP transport. The adapter owns exact method,
  relative endpoint, JSON body, `Idempotency-Key`, response parsing, and closed error mapping. The injected transport
  owns credential custody and actual network I/O; WU-B neither reads a secret nor executes a provider call.
- Internal typed adapter/repository values may carry the bounded synthetic/opaque payment reference required for
  exact binding. Never place an authorization header, secret, credential, raw provider response, real payment
  reference, or full payload in a customer/public/category-safe outcome, exception, log, mission report, or evidence
  artifact. Test fixtures use synthetic opaque references only.

### 2. Intent and capture truth

- Intent creation is server-authoritative and bound to one existing internal Order plus its opaque `orderNo`, exact
  authoritative total, `KRW`, and one internal idempotency key.
- Require an active WU-C reservation for the order before making the intent action-required. Do not charge when the
  availability boundary is absent, released, expired, committed incompatibly, or otherwise unverified.
- Exact replay with the same idempotency key and same bound tuple returns the existing intent; conflicting reuse
  fails closed and writes nothing.
- Toss confirmation/query results establish money truth only after exact comparison of:
  `{internal orderId/orderNo, expected amount, KRW, paymentKey, provider status, current internal intent state}`.
- Browser/client return, redirect parameters, timer, or caller labels never establish capture truth.
- A verified successful capture creates at most one immutable succeeded `PaymentTransaction(type=capture)` for the
  order, binds the provider transaction reference once, and advances only the payment intent truth. Replays are
  zero-effect; conflicts, mismatches, and state regressions fail closed.
- WU-B must **not** commit/release inventory, confirm the Order, append order history, emit commerce events, or tell a
  customer the order is complete. A verified capture returns a bounded `captured_pending_order_commit` category for
  WU-E. Internal failure after provider capture returns/records `captured_internal_pending` and opens or reuses a
  category-only reconciliation task; it never retries a charge or reports conclusive failure.
- Conclusively non-captured provider truth may produce the structured WU-C proof category later consumed by WU-E;
  unknown/timeout/confirming truth never releases inventory and never allows a second payment attempt.

### 3. General-payment webhook boundary

- Support only the official general-payment notification class needed for the frozen payment lifecycle (currently
  `PAYMENT_STATUS_CHANGED`). Reject/contain all other event classes in WU-B.
- The general-payment notification is **untrusted**. Its body may be parsed only to obtain a bounded lookup hint and
  to compute an idempotent digest/fingerprint; it must never directly mutate money, order, inventory, or refund truth.
- Bound raw-body size before parsing. Persist only provider category, deterministic event fingerprint/digest,
  bounded event type, received state, and category-safe processing state. Never persist or emit the raw body.
- Do not invent a signature header for `PAYMENT_STATUS_CHANGED`. Signature verification is required only for an
  event class whose current official Toss documentation defines a signature header; no such additional event class
  is authorized here. An unexpected signature header does not make a general-payment notification trusted.
- After idempotent inbox recording, query Toss server-side through the injected authenticated transport and verify the
  exact internal binding `{orderNo, amount, KRW, paymentKey, current state}` before recording capture/non-capture
  truth. Duplicate notification → `duplicate_ignored`; malformed/unknown/mismatch/out-of-order → quarantined or
  reconciliation-required with zero irreversible effect.
- If the official general-payment webhook has no stable event ID, derive the inbox key deterministically from the
  bounded raw notification bytes/category using a documented versioned digest scheme; do not invent an authoritative
  provider event identity. Digest collision or conflicting replay fails closed.

### 4. Full captured-payment sandbox refund contract

- Refund eligibility in WU-B is structural only: one exact **server-verified succeeded full capture**, exact order,
  exact `KRW` amount, no existing active refund, and an authorization-verdict port that is fail closed by default.
  WU-E will supply the operator step-up verdict; WU-B does not invent operator identity or policy.
- Implement only full captured-payment cancellation/refund through the direct Toss adapter. Do not send a partial
  amount; verify the provider result represents a complete reversal (including zero remaining balance or the exact
  current official equivalent) before persisting success.
- Use a separate internal refund idempotency key and Toss `Idempotency-Key`. Exact replay is zero-effect; conflicting
  reuse, multiple active refunds, partial result, wrong order/capture/amount/currency/paymentKey, unknown status, or
  provider timeout stays confirming/failed-closed and opens/reuses bounded reconciliation evidence.
- A provider-confirmed full reversal creates/reuses immutable refund transaction truth and advances the Refund record
  only after exact verification. WU-B does not update Order status/history, emit customer success, or restore stock.
- Inventory disposition remains `HOLD`; no refund/return/cancellation automatically restores sellable inventory.

### 5. Restart, missing-event, and evidence behavior

- Durable state, unique keys, monotonic transitions, and exact replay must make restart safe without in-memory truth.
- Provide bounded queries/decisions for intents/refunds stuck in confirming or captured-internal-pending states so
  WU-E can open/reuse reconciliation work. Do not add a timer, scheduler, worker, route, or polling process.
- All repository/provider errors map to closed categories without SQL, stack, payload, IDs, PII, or credentials.
- Evidence and tests use only synthetic opaque references and reports contain categories/status/counts, never raw
  provider payloads, real identifiers, raw digest values, secrets, or customer data.

## Exact allowed product paths

Only these eight new WU-B paths may be created:

- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/tossV2.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/service.ts`
- `app/src/lib/payment/webhook.ts`
- `app/scripts/o1_payment_contract.vitest.ts`
- `app/scripts/o1_toss_v2_adapter.vitest.ts`
- `app/scripts/o1_payment_repository.dbtest.py`

No existing product path may change. No schema, migration, Prisma model, generated client, package, lockfile, env,
route, endpoint, page, component, checkout, cart, order, inventory, auth, Foundation, SIASIU, control, documentation,
timer, scheduler, process launcher, or deployment path may change. If a safe implementation requires another path,
schema change, provider commitment, secret mechanism, actual endpoint, runtime activation, or broad refactor, stop and
return exact evidence.

## Required verification

Use already-present dependencies only. No install, image pull, external network, provider call, secret, credential,
real/shared DB, customer data, real PII, real payment, route/runtime activation, Prisma generation, or build that
would require generation.

### Focused pure/adapter tests

Prove positive and adjacent-negative behavior for:

- identifier/idempotency/amount/KRW bounds and every closed result category;
- intent exact replay versus conflicting key reuse;
- official Toss confirm/query/full-cancel request method, path, body, and idempotency header over a fake transport;
- exact response binding to orderNo, amount, KRW, paymentKey, status, and internal state;
- unknown/malformed/timeout/provider-error/partial-cancel/out-of-order failure directions;
- general payment webhook is never trusted directly, uses no invented signature, is raw-size bounded, stores no raw
  payload, and requires server query verification;
- full captured refund only, exact replay, second-refund prevention, authorization-verdict default deny, and inventory
  `HOLD` with zero restoration;
- no secret/raw payload/PII/identifier leakage in outcomes/errors/fixtures.

### Disposable PostgreSQL rehearsal

Use the same already-proven isolated disposable local PostgreSQL pattern: local image already present, no pull,
tmpfs, no host port, synthetic rows/credentials only. Apply the committed WU-0 migration and mirror the WU-B
repository transactions to prove:

- intent idempotency and conflicting-replay zero write;
- one succeeded capture per order under concurrent/replayed attempts;
- unique provider transaction and internal idempotency enforcement;
- inbox fingerprint replay and conflicting/malformed notification containment;
- monotonic intent/inbox/refund transitions and out-of-order no-regression;
- one active full refund per capture, exact full-amount/currency/capture binding, no partial refund;
- captured-internal-pending and refund-confirming reconciliation task reuse without raw details;
- restart/replay from durable truth and zero duplicate effect;
- no Order/inventory/history/customer/event mutation by WU-B.

Record process/container identity, creation method, local containment, synthetic-only confirmation, exact commands,
bounded counts/categories, shutdown, data removal, transient credential removal, post-cleanup process/container check,
and pre/post Git state. Cleanup failure is blocking; do not touch unrelated containers or resources.

Run and record:

- both focused WU-B Vitest files;
- the focused WU-B disposable PostgreSQL rehearsal;
- the reviewed WU-C contract/concurrency regressions required by the payment-proof boundary;
- the WU-0 migration regression;
- the full safe Vitest suite;
- exact no-route/no-endpoint/no-network/no-secret and eight-path containment proof.

Classify test meaning per repository policy. Typecheck/build may remain honestly unrun only if the unchanged
pre-WU-0 generated Prisma client makes them unsafe without forbidden generation; record the residual compile/runtime
unknown and do not convert it into PASS evidence.

## Credential gate

Do not request a Leo credential action for WU-B code or offline review. If an actual Toss sandbox call becomes
necessary before WU-F/WU-G, stop only the credential-dependent check, continue all other authorized work, and return
a single minimal console/env checklist through the Advisor without secret values. Never accept a secret in chat.

## Commit, evidence, and stop

Create one candidate commit on exact base `2733bfd61e407389c3336eba2e655ad081d4cdb5`. Do not push before independent
implementation review PASS. Do not begin WU-E/F/G.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/60_COSMILE_WUB_PAYMENT_REFUND_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/60_COSMILE_WUB_PAYMENT_REFUND_POINTER.md`

The result must include exact candidate head/base/diff, all eight path dispositions, provider-contract mapping,
truth/transition tables, webhook trust proof, refund/inventory-HOLD proof, commands/counts/test meaning, PostgreSQL
cleanup, credential-dependent limits, residual unknowns, and confirmation that checkout/order/inventory/runtime and
actual provider network remain unconnected. Return to `foundation-advisor` and STOP. Do not dispatch Reviewer or
start another WorkUnit.
