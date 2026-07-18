# Independent Reviewer Handoff — Cosmile WU-B Implementation

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-B direct Toss V2 payment/refund truth-lane candidate
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
OLD_REVIEWED_BASE_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
CANDIDATE_HEAD: d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
CANDIDATE_EXPECTED_PARENT: 2733bfd61e407389c3336eba2e655ad081d4cdb5
CANDIDATE_PUSH_STATUS: NOT_PUSHED
EXPECTED_UPSTREAM_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
WORKER_EVIDENCE_COMMIT: bf2d21f
WORKER_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/60_COSMILE_WUB_PAYMENT_REFUND_RESULT.md
WORKER_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/60_COSMILE_WUB_PAYMENT_REFUND_POINTER.md
IMPLEMENTATION_HANDOFF_COMMIT: efffa64217d718f190acae476cfa85a944cfaa1d
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
```

Before review, live-verify session/model/effort/skill/CWD/independence, pane synchronization OFF,
no overlapping review, all Git pins, clean product state, and exact unpushed ancestry. Read the
current Agent Office Reviewer role and repository rules. Treat the Worker report as claims, not
proof. Do not patch, stage, commit, push, dispatch, select policy, or accept risk.

## Exact candidate path boundary

The base-to-candidate diff must contain exactly eight new paths:

- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/tossV2.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/service.ts`
- `app/src/lib/payment/webhook.ts`
- `app/scripts/o1_payment_contract.vitest.ts`
- `app/scripts/o1_toss_v2_adapter.vitest.ts`
- `app/scripts/o1_payment_repository.dbtest.py`

No existing source, test, schema, migration, generated client, dependency, route, page, component,
checkout, order, inventory, catalog, identity, Foundation, SIASIU, or control path may change.

## Founder-frozen truth boundary

- Direct Toss Payments V2 remains the PSP direction; no PortOne switch.
- Confirm must use the documented server API and bind the provider result to the exact internal
  `{intent, orderId, opaque orderNo, positive integer KRW amount, paymentKey, current state}` tuple.
- General-payment webhook notifications are untrusted until an authenticated server-side payment
  query verifies the exact tuple. Do not invent a signature for `PAYMENT_STATUS_CHANGED`.
- A signature may be required only for an event class whose current official Toss documentation
  defines a signature header; no such event class is implemented by this candidate.
- Refund scope is full captured-payment sandbox reversal only; no partial refund or live effect.
- WU-B establishes payment truth only. It must not commit/release inventory, advance the Order,
  expose a route, make network calls, read credentials, or activate runtime.

## Required direct determinations

### A. Adapter and exact provider semantics

Verify against current official Toss V2 documentation and the reviewed design, not comments alone:

- exact confirm `POST /v1/payments/confirm`, body names, and `Idempotency-Key` handling;
- exact query `GET /v1/payments/{paymentKey}` behavior;
- exact full cancel `POST /v1/payments/{paymentKey}/cancel` without `cancelAmount`;
- strict provider Payment parsing, status set, KRW integer bounds, error classification, malformed
  and unknown-state default deny, and no raw response/error/header leakage;
- complete reversal requires unambiguous `CANCELED`, zero balance, exact payment binding, and a
  distinct cancel transaction reference;
- adapter remains pure over an injected transport and cannot itself read a URL or credential or
  perform network I/O.

### B. Capture money-safety and concurrency — load-bearing

Attack at least:

- two paymentKeys racing or replaying against one order;
- multiple idempotency keys and multiple intents for one order;
- wrong orderNo/orderId/amount/currency/paymentKey/state;
- absent, expired, released, or committed inventory reservation at the final pre-effect claim;
- provider effect before durable single-paymentKey claim;
- provider DONE followed by ID/repository/transaction failure;
- duplicate provider effects, duplicate succeeded capture rows, replay tuple weakening, and a
  zero-row intent transition reported as success;
- HTTP error, timeout, malformed, unknown, CANCELED, and PARTIAL_CANCELED at confirm time. Only an
  exact conclusive provider non-capture state may release the WU-C proof boundary; ambiguous cases
  must remain HOLD/reconcile.

Determine whether advisory locks plus WU-0 constraints actually make the production repository
atomic and whether the disposable SQL rehearsal is faithful rather than overstated.

### C. Refund truth, authorization, and recovery

Verify:

- fail-closed authorization; a throw or non-authorized verdict creates no provider effect;
- exact succeeded capture/order/paymentKey/full amount/KRW eligibility and no partial refund;
- one active refund per capture, exact idempotent replay, immutable historical capture, and an
  immutable succeeded refund transaction plus atomic Refund advance;
- provider incomplete/partial/malformed/error/timeout/missing cancel reference and any post-effect
  internal failure are never reported terminally refunded and create/reuse bounded reconciliation;
- injected repository/ID/reconciliation failures never escape raw or become false success;
- WU-B does not restore sellable inventory or advance any Order state.

### D. Webhook distrust, replay, and state monotonicity

Verify:

- raw bytes are bounded before parse and are neither stored nor surfaced;
- unsupported classes, malformed values, oversized input, collisions, and repository failure fail
  closed without money/order/inventory/refund effects;
- exact raw replay is deterministic while legitimate distinct state notifications for one payment
  remain distinct rather than being falsely coalesced;
- stored inbox data is category/digest/state only, with no raw provider payload;
- only server-side query verification of exact `orderNo`, amount, KRW, and paymentKey may mark the
  inbox verified; persistence failure cannot be reported verified;
- received-to-terminal and same-terminal replay are idempotent, while terminal-state regression is
  rejected.

### E. Data model alignment, leakage, and containment

Verify the repository against the exact WU-0 schema/migration at the candidate ancestry:

- field names, nullability, status checks, currency, uniqueness, and partial-unique constraints;
- no semantic drift of WU-C inventory, WU-D catalog, WU-A identity, checkout, order, or legacy
  commerce behavior;
- no secret, credential, raw payload, paymentKey, opaque provider reference, internal ID, SQL,
  customer PII, or sensitive detail appears in public outcomes, exceptions, tests, or evidence;
- the base-to-candidate diff is exactly eight additive files and no generated/cache/symlink residue
  remains.

### F. Tests, safety, and honest claim ceiling

Reproduce, when direct preflight proves safety:

- the two focused WU-B Vitest files;
- the full safe Vitest suite;
- disposable PostgreSQL WU-B repository rehearsal;
- WU-C concurrency regression;
- WU-0 migration regression.

Inspect commands before execution. No install, image pull, external network, real/shared DB,
provider, credential, customer data, PII, real payment, endpoint, or activation. Record pre/post Git
state, container/process identity, socket/port containment, cleanup, and exact counts. Cleanup must
be blocking, leave no container/symlink/generated residue, and must not mask unexpected exceptions.

Typecheck/build may remain honestly unrun if the pinned generated-Prisma-client boundary makes it
unsafe. Determine whether the resulting uncompiled production repository adapter is a blocking
implementation gap, a required in-scope correction, or a bounded residual unknown. Do not credit
provider-sandbox, route, checkout, order, WU-E/F/G, or end-to-end evidence that was not executed.

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

Do not return PASS if a load-bearing capture, refund, webhook, authorization, idempotency,
concurrency, reconciliation, leakage, or cleanup invariant is unconnected, contradicted, or only
asserted in prose. For every finding provide stable ID, severity, exact file/line, reproduction or
proof, impact, and the smallest in-scope correction boundary. Separate observations from blocking
findings and state whether the current candidate may be pushed.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not dispatch the Worker or begin WU-E/F/G.
