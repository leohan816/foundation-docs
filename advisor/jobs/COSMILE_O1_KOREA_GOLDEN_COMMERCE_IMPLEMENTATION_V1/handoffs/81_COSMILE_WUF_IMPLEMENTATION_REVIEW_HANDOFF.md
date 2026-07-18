# Independent Reviewer Handoff — Cosmile WU-F Golden Order

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-F Golden Order script-only non-production candidate
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
OLD_REVIEWED_BASE_HEAD: d1f21e0fdd51034eef025212729125cee91576dd
CANDIDATE_HEAD: c6e793d3459bc16c520bd09dbe739bf4306bdb40
CANDIDATE_EXPECTED_PARENT: d1f21e0fdd51034eef025212729125cee91576dd
CANDIDATE_PUSH_STATUS: NOT_PUSHED
EXPECTED_UPSTREAM_HEAD: d1f21e0fdd51034eef025212729125cee91576dd
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FOUNDATION_SNAPSHOT_WORKTREE: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_SNAPSHOT_BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
FOUNDATION_SNAPSHOT_REVIEWED_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
WORKER_EVIDENCE_COMMIT: 6e5d3c4d772a680d36d7f7c7b671b9dfdd29f7b5
WORKER_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/80_COSMILE_WUF_RESULT.md
WORKER_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/80_COSMILE_WUF_POINTER.md
IMPLEMENTATION_HANDOFF_COMMIT: 4be4ed237d3d6e5e944600524b035ca3fd3eb68a
ADMISSION_CLARIFICATION_COMMIT: db46466373ddbfea2704c8029966c70a6ae5702f
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
```

Before review, live-verify session/model/effort/skill/CWD/independence, pane synchronization OFF,
no overlapping review, every Git pin, clean product state, exact unpushed ancestry, and the untouched
Foundation snapshot lane. Read the current Agent Office Reviewer role and Cosmile repository rules.
Treat Worker evidence and test names as claims, not proof. Do not patch, stage, commit, push, dispatch,
select policy, accept risk, or begin WU-G.

## Exact candidate path boundary

The base-to-candidate diff must contain exactly five additive files:

- `app/scripts/o1_golden_order_harness.ts`
- `app/scripts/o1_toss_sandbox_transport.ts`
- `app/scripts/o1_golden_order.vitest.ts`
- `app/scripts/o1_golden_order.dbtest.py`
- `app/scripts/o1_golden_order.sandbox.vitest.ts`

No existing file, route, UI, component, package, lockfile, schema, migration, generated client,
configuration, product/provider runtime, Foundation, SIASIU, control, or unrelated path may change.

## Founder-frozen boundary

- This subject is a script-only, non-production Golden Order harness. It composes final reviewed WU-A
  through WU-E contracts and ports; it must not redefine identity, catalog, price, inventory, money,
  order, refund, audit, shipment, or Foundation truth.
- Korea/KRW and representative SKU `elt-serum-vitayouth-01` only. Synthetic identities/data only.
- The Foundation input is the deterministic reviewed local bundle. No network transport or new service.
- Deterministic local composition is mandatory. Official Toss sandbox execution is a distinct,
  credential-gated evidence layer and may honestly remain `NOT_RUN_CREDENTIAL_GATE`.
- No real payment, live credentials, customer PII, public sale, Controlled Live, Paid Beta, production,
  non-ELT product, guest checkout, Kakao/Apple, courier, recommendation, Foundation/SIASIU AI, or Memory V3.
- WU-G is outside this review and must not have started.

## Required direct determinations

### A. Composition fidelity and single-truth discipline

Inspect imports and every repository/port implementation. Determine directly whether the harness invokes
the reviewed WU-A identity gate, WU-D snapshot/catalog and single authoritative KRW price, WU-C reserve,
WU-B intent/capture exact comparison, and WU-E captured-order bind/projections without weakening or
reimplementing their semantics. Verify the in-memory world is only bounded orchestration/test state and
does not become a competing product truth model. Test-only helpers must be unmistakably non-runtime.

Attack ordering and fail-closed behavior: verified principal before customer action; snapshot/binding and
server price before reservation; reservation before provider call; exact order/orderNo/amount/currency/
paymentKey comparison before capture credit; durable capture before WU-E bind; one paid order/history/
inventory commit; coherent customer/operator projections; pending record-only fulfillment; replay with
zero second provider, capture, order, inventory, history, or audit effect.

### B. Negative, concurrency, restart, and webhook boundaries

Verify strong positive and adjacent-negative assertions for auth absent/unverified/guest, snapshot invalid,
missing/stale/withdrawn/unapproved/gate/binding/SKU/price failures, price/currency/quantity mismatch,
provider timeout/error/malformed/unknown/binding mismatch, captured-internal-pending, last-item concurrency,
restart/replay, and state regression. The loser in last-item concurrency must make zero provider call.

General-payment webhook input remains an untrusted notification. No state may be credited from the body
alone; only the existing WU-B query-and-exact-binding path may create money truth. Do not require a signature
for event classes where official Toss documentation defines none.

### C. Script-only Toss transport containment

Inspect the concrete transport, not only its tests. Verify:

- exact origin `https://api.tosspayments.com` and only existing WU-B relative `/v1/payments/*` paths;
- no path traversal, alternate origin, arbitrary method/header/body/url, redirect following, polling,
  retry loop, scheduler, runtime export, provider switch, or PortOne path;
- one-shot explicit sandbox gate, test-key-only admission, recognizable live-mode rejection, and no
  network-capable transport object when configuration is incomplete;
- Basic authorization exists only in memory, deterministic idempotency is byte-preserved, timeout and
  response cap are bounded, JSON handling is strict, and raw provider errors/bodies never leak;
- no secret, auth header, credential, paymentKey, raw order number, idempotency key, provider reference,
  digest/source hash, identity claim, raw PII, SQL, or filesystem credential path appears in response,
  stdout/stderr, exception, snapshot, fixture intended as durable evidence, or foundation-docs evidence.

Distinguish necessary synthetic inputs inside executable tests from leaked durable evidence. Any apparent
conflict with the handoff's fixture-leak wording must be resolved explicitly rather than silently ignored.

### D. Evidence layers and honest claim ceiling

Confirm the deterministic fake is never described as official provider sandbox proof. Verify the sandbox
test is fail-closed by default, requires every explicit flag/test-credential/synthetic-identity/test-payment-
key/no-live/no-PII gate, and performs no network call when any gate is absent. Official provider evidence
must remain `NOT_RUN_CREDENTIAL_GATE` unless all gates were actually satisfied; no manufactured proof.

The serializable result must be category-safe and carry `NOT_LIVE_SALE_EVIDENCE`, `REAL_PAYMENT: NO`,
`REAL_CUSTOMER_PII: NO`, and `PRODUCTION: NO`. It must not claim commercial sellability, live payment,
end-to-end provider completion, Controlled Live, Paid Beta, or production readiness.

### E. Disposable PostgreSQL proof and parity limits

Inspect the dbtest implementation and rerun only after safety preflight. Verify already-local image proof,
no pull, no host/public port, tmpfs/no shared volume, synthetic rows, transient test credentials, exact
committed WU-0 and WU-E migrations, blocking `finally` cleanup, and post-removal absence. Verify the SQL
twin actually proves reservation -> intent/claim/capture -> paid bind, exact bindings, concurrency/replay,
one history/audit/commit, and no false second effect.

Decide explicitly whether the documented generated-Prisma-client/no-host-port boundary and split between
TypeScript composition evidence and SQL-twin evidence is an honest bounded residual or a blocking parity
defect. Do not credit the twin as proof of TypeScript repository execution.

### F. Direct test reproduction and containment

When direct preflight proves safety, reproduce:

```text
cd app
npx vitest run scripts/o1_golden_order.vitest.ts
python3 scripts/o1_golden_order.dbtest.py
npx vitest run
npx vitest run scripts/o1_golden_order.sandbox.vitest.ts
```

The last command must run only in its default fail-closed, no-credential/no-network state; do not attempt
official provider execution. Inspect commands before running. No install, Prisma generation, image pull,
external network, shared/real/target DB, provider contact, credential, customer data, PII, real payment,
endpoint, route, product activation, or unrelated write. Record exact counts, pre/post Git state, container
identity, port/socket containment, cleanup, and any attributable temporary symlink/cache. Cleanup failure is
blocking. `tsc`/build may remain honestly unrun only if the pinned generated-client boundary makes it unsafe;
state whether this is blocking, correctable, or a bounded residual unknown.

## Verdict contract

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

Mission-facing mapping:

```text
PASS -> PASS
NEEDS_PATCH -> PASS_WITH_CORRECTIONS
PASS_WITH_RISK -> HOLD
FAIL -> FAIL
```

Do not return PASS if a load-bearing ordering, exact binding, default-deny inventory, replay/concurrency,
query-verified money truth, single-truth composition, transport containment, evidence separation, leakage,
database cleanup, or honest claim-ceiling invariant is unconnected, contradicted, or asserted only by a
test name. For every finding provide stable ID, severity, exact file/line, direct proof/reproduction, impact,
and the smallest in-scope correction boundary. Separate observations from blocking findings and state whether
the candidate may be pushed.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/81_COSMILE_WUF_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/81_COSMILE_WUF_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not dispatch the Worker, patch, stage, commit, push, request
credentials, or begin WU-G.
