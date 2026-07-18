# WU-F — Cosmile Golden Order Sandbox Harness and Bounded Evidence

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-F
FROM: foundation-advisor
TO: cosmile
ROLE: Cosmile repository-owner Worker
MODE: BOUNDED_NON_PRODUCTION_IMPLEMENTATION
REQUIRED_SKILL: /fable-builder
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
RETURN_TO: foundation-advisor
```

## 1. Admission and exact reviewed base

Proceed only when all values match immediately before editing:

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
REQUIRED_HEAD: d1f21e0fdd51034eef025212729125cee91576dd
REQUIRED_UPSTREAM_HEAD: d1f21e0fdd51034eef025212729125cee91576dd
REQUIRED_AHEAD_BEHIND: 0/0
REQUIRED_TRACKED_STATE: CLEAN
```

This is the exact WU-E independent-review PASS head. Re-read the current Agent Office Worker role,
Cosmile `AGENTS.md`/`CLAUDE.md`, the committed mission job package and scope ledger, the reviewed design,
and the final reviewed WU-A through WU-E evidence. Verify the Foundation snapshot branch remains at its
reviewed PASS head `73ff00361d9fa88ab57c17858210c1e080dfde1a`; do not modify Foundation.

STOP for any branch, HEAD, upstream, tracked-state, role/model/effort/skill, reviewed-design, or authority
mismatch. Preserve pre-existing untracked files untouched.

## 2. Exact write allowlist

Create only these new files:

```text
app/scripts/o1_golden_order_harness.ts
app/scripts/o1_toss_sandbox_transport.ts
app/scripts/o1_golden_order.vitest.ts
app/scripts/o1_golden_order.dbtest.py
app/scripts/o1_golden_order.sandbox.vitest.ts
```

No existing file may change. No route, page, UI, component, package, lockfile, schema, migration,
generated Prisma client, environment file, provider configuration, Foundation file, or unrelated path.
If the reviewed flow cannot be composed without another path or a semantic change to WU-A–E, STOP and
return exact evidence; do not expand or silently repair a prior WorkUnit.

## 3. Frozen WU-F implementation boundary

Implement the narrowest script-only non-production Golden Order harness by composing—not redefining—the
final reviewed WU-A, WU-B, WU-C, WU-D, and WU-E ports and repositories.

### 3.1 Two honest evidence layers

The harness must distinguish:

```text
DETERMINISTIC_LOCAL_COMPOSITION
OFFICIAL_PROVIDER_SANDBOX_EXECUTION
```

The first is mandatory and credential-free. The second is credential-gated and may be `NOT_RUN_CREDENTIAL_GATE`
until Leo performs the consolidated console/environment checklist. Never convert deterministic fakes, a provider
dashboard screenshot, a redirect, or a webhook body into official sandbox execution proof.

### 3.2 Declared product and environment

- Korea, KRW only.
- Representative SKU exactly `elt-serum-vitayouth-01`.
- Synthetic non-production customer/operator/order only; no real customer PII.
- Foundation input is the final reviewed deterministic local bundle copied from the reviewed Foundation snapshot
  lane and verified by the existing WU-D importer. Never call Foundation over a network.
- If commercial rights, MFDS, imagery, or approval gates are unresolved, the harness must use the restricted
  text-only internal fixture and carry `NOT_LIVE_SALE_EVIDENCE`; it must not claim sellability.
- No non-ELT product, guest checkout, Kakao/Apple, recommendation, Foundation AI, SIASIU AI, Memory V3,
  shipping provider, Controlled Live, Paid Beta, production, or public sale.

### 3.3 Golden Order state composition

Prove in one ordered run:

1. a verified Google/WU-A principal boundary is required before customer execution; deterministic tests use only
   an explicitly synthetic verified principal and must not weaken or bypass WU-A;
2. the WU-D local snapshot/binding passes and Cosmile remains the one authoritative positive-integer KRW price;
3. a one-unit cart/checkout request is server-repriced and revalidated;
4. WU-C establishes one durable reservation with default-deny oversell;
5. WU-B creates/reuses one intent bound to the exact internal order ID, opaque public order number, amount, and KRW;
6. official-provider mode accepts a payment key only from a local environment boundary, calls the direct Toss V2
   sandbox through the script-only transport, and credits capture only after the existing WU-B server-side exact
   comparison;
7. WU-E binds the durable verified capture into one paid order, committed inventory, and one paid history;
8. customer and operator projections agree on `ORDER_CONFIRMED`; record-only fulfillment remains `pending`;
9. replaying the same confirmation produces the reviewed idempotent/duplicate outcome and zero second provider,
   capture, order, inventory, or history effect.

The harness must not create a second money, inventory, catalog, identity, order, audit, or shipment truth model.
It may own only bounded orchestration state and category-safe evidence DTOs.

### 3.4 Script-only Toss sandbox transport

Implement only a concrete `TossTransport` for this sandbox harness:

- exact HTTPS origin `https://api.tosspayments.com` and only the existing WU-B relative `/v1/payments/*` paths;
- server-only test secret supplied by local environment at execution time, never accepted in chat or committed;
- fail closed unless an explicit one-shot sandbox flag is set;
- reject absent/blank credentials and any recognizable live-mode declaration;
- Basic authorization constructed only in memory; never return, log, serialize, snapshot, or expose it;
- POST JSON only where the WU-B adapter requests it; deterministic `Idempotency-Key` preserved byte-for-byte;
- explicit bounded timeout and response byte cap; strict JSON parse; no redirect following to another origin;
- no arbitrary URL, method, header, body, endpoint, provider, client-supplied Authorization, retry loop, polling,
  scheduler, or runtime export;
- response evidence is category/status/count only. No raw payload, paymentKey, order number, idempotency key,
  provider transaction reference, digest, credential, or PII may be emitted.

Do not implement a payment-widget/client checkout, merchant activation, webhook receiver, new route, persistent
credential custody, provider abstraction, production transport, or PortOne fallback.

### 3.5 Webhook and replay boundary

General payment webhook data remains an untrusted notification. WU-F may exercise the existing WU-B inbox and
server-query verification path, but it must not add a signature requirement to event classes for which official
Toss documentation defines none. No state transition may be credited from the notification body alone. Prove
duplicate/replay and binding failures fail closed.

### 3.6 Evidence and leak containment

The harness result must serialize only:

- declared environment/mode and evidence-layer category;
- run status, state categories, bounded counts, booleans, and timestamps;
- product/snapshot/SKU/price/policy version categories with sensitive references masked or omitted;
- one-capture/one-order/one-commit/replay-zero-effect proof;
- explicit `NOT_LIVE_SALE_EVIDENCE`, `REAL_PAYMENT: NO`, `REAL_CUSTOMER_PII: NO`,
  `PRODUCTION: NO`, and credential-gate status.

No raw identifier, payment key, order number, source hash, digest, secret, auth header, token, identity claim,
email/name, provider body/error, SQL, or filesystem credential path may appear in stdout, stderr, exceptions,
fixtures, snapshots, durable evidence, or Git.

## 4. Required tests and safety

Add strong positive and adjacent-negative coverage for:

- exact happy-path state order, server price revalidation, reservation-before-provider, provider-before-internal bind;
- snapshot missing/stale/withdrawn/gate failure and wrong SKU/price/currency/quantity;
- auth absent/unverified and guest denial;
- payment binding mismatch, timeout, malformed/unknown state, duplicate/replay, provider-captured/internal-pending;
- last-item concurrency: one reservation/capture/order wins, loser has zero provider call;
- order/history/inventory/customer/operator projection coherence and pending record-only fulfillment;
- concrete transport flag/config/method/path/origin/timeout/size/redirect/credential-leak containment;
- category-safe serialization and failure/error leak attacks;
- restart/replay from durable rows without a second provider effect.

Run only with dependencies already present:

```text
cd app
npx vitest run scripts/o1_golden_order.vitest.ts
python3 scripts/o1_golden_order.dbtest.py
npx vitest run
```

The DB test must start an already-local disposable PostgreSQL process/container without an image pull, public
port, shared volume, real data, or real credential; apply the exact committed migrations; execute the actual
TypeScript WU-A–E repository composition where technically possible; record any unavoidable generated-client
boundary honestly; and prove blocking cleanup. Inspect effective DB/provider/credential variables without printing
values. Capture pre/post Git state.

The credential-gated command is:

```text
cd app
npx vitest run scripts/o1_golden_order.sandbox.vitest.ts
```

Do not run it unless every explicit sandbox flag, local test credential, synthetic identity, test payment key,
loopback/non-production DB, and no-live/no-PII precondition is proven. If not proven, record the exact command as
`NOT_RUN_CREDENTIAL_GATE`; do not ask for or print secret values.

No dependency installation, Prisma generation, real/shared/target DB, production/live key, real payment method,
provider commitment, customer data, public exposure, vendor contact, or unrelated network call.

## 5. Candidate, evidence, and return discipline

Create one additive local candidate commit on the exact reviewed WU-E base. Do not amend, rebase, squash,
force-push, or push before independent review. The candidate must contain exactly the five allowlisted paths.

Write Worker-authored evidence only to:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/80_COSMILE_WUF_RESULT.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/80_COSMILE_WUF_POINTER.md
```

Include exact parent/candidate SHA, path/numstat ledger, commands/counts/status, database process identity and
cleanup, invariant/state matrix, transport containment proof, credential-gate status, official-sandbox evidence
status, product-repository status, claim ceiling, and residual unknowns. State explicitly that WU-G and Controlled
Live did not start.

Return to `foundation-advisor` and STOP. Do not dispatch the Reviewer, push, begin WU-G, or request secrets.

## 6. Immediate stop conditions

STOP and return exact evidence if any of the following is required:

- path outside the allowlist or semantic modification to WU-A–E;
- route/UI/widget/new product runtime or broad checkout-spine rewrite;
- schema/migration/package/lockfile/generated-client/configuration change;
- Foundation, SIASIU, or foundation-control write;
- real/shared/target DB, live key/mode/payment, real identity/PII, provider commitment, or public exposure;
- arbitrary network/origin/endpoint/provider, webhook-trust shortcut, credential persistence, or secret output;
- PortOne switch, partial refund, stock restoration, courier integration, recommendation/AI/Memory work;
- inability to reach honest deterministic WU-F evidence inside the reviewed boundary.
