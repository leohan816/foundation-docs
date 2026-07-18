# WU-G — Cosmile Captured-Payment Golden Reversal Harness and Evidence

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-G
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
REQUIRED_HEAD: c6e793d3459bc16c520bd09dbe739bf4306bdb40
REQUIRED_UPSTREAM_HEAD: c6e793d3459bc16c520bd09dbe739bf4306bdb40
REQUIRED_AHEAD_BEHIND: 0/0
REQUIRED_TRACKED_STATE: CLEAN
WU_F_REVIEW_COMMIT: dc4ebaf508be56bf2da5a1a2ff856939a00b6798
WU_F_REVIEW_VERDICT: PASS
```

This is the exact independently reviewed and pushed WU-F PASS head. Re-read the current Agent Office
Worker role, Cosmile `AGENTS.md`/`CLAUDE.md`, the committed mission package/scope ledger, reviewed design,
Founder decisions, and final reviewed WU-B/WU-E/WU-F evidence. Verify the Foundation snapshot lane remains
clean and upstream-equal at `73ff00361d9fa88ab57c17858210c1e080dfde1a`; do not modify Foundation.

STOP for any branch, HEAD, upstream, tracked-state, model/effort/skill, authority, review, or design mismatch.
Preserve pre-existing untracked files untouched.

## 2. Exact write allowlist

Create only these new files:

```text
app/scripts/o1_golden_reversal_harness.ts
app/scripts/o1_golden_reversal.vitest.ts
app/scripts/o1_golden_reversal.dbtest.py
app/scripts/o1_golden_reversal.sandbox.vitest.ts
```

No existing file may change, including WU-F files. No route, page, UI, component, package, lockfile,
schema, migration, generated client, environment file, provider configuration, Foundation file, or unrelated
path. If the reviewed reversal cannot be composed from existing WU-B/WU-E/WU-F contracts without another
path or semantic change, STOP and return exact evidence; do not repair or expand a prior WorkUnit.

## 3. Frozen WU-G implementation boundary

Implement the narrowest script-only non-production Golden Reversal harness by composing, not redefining:

- a **separate** WU-F Golden Order on a fresh synthetic world and distinct payment key;
- WU-B `refundFullCapture` with the existing full-only Toss cancel adapter, exact durable capture binding,
  idempotency, server response verification, and reconciliation behavior;
- WU-E `finalizeRefundToOrder` with its exact durable-refund re-read, order projection, committed-inventory
  hold, operator step-up boundary, history, audit, and customer/operator projection;
- WU-F's reviewed script-only Toss transport in official-sandbox mode without modifying it.

The arrows below are scenario coverage for this selected WU-G harness, not a universal commerce ordering rule.
The harness may own bounded orchestration/test state and category-safe evidence DTOs only. It must not create
a competing money, inventory, refund, order, identity, catalog, audit, shipment, operator, or provider truth.

### 3.1 Two honest evidence layers

```text
DETERMINISTIC_LOCAL_COMPOSITION
OFFICIAL_PROVIDER_SANDBOX_EXECUTION
```

The deterministic layer is mandatory and credential-free. The official layer is credential-gated and must
remain `NOT_RUN_CREDENTIAL_GATE` unless every gate is actually proven. A fake, pre-capture void, dashboard,
redirect, webhook body, or locally fabricated provider response is never captured-payment sandbox refund proof.

### 3.2 Golden Reversal state composition

Prove in one distinct run:

1. create a fresh, separate Golden Order through the final reviewed WU-F composition and reach one verified
   succeeded capture, paid order, committed reservation, and paid history;
2. bind the reversal to that exact order, capture transaction, payment key, full captured amount, and KRW;
3. require explicit TEST/HARNESS-only step-up authorization bound to action, operator role/ref, order scope,
   reason category, and one-use freshness. The runtime default remains unconfigured/deny-all;
4. call WU-B full refund exactly once. The provider effect must be Toss V2 full cancel only; no `cancelAmount`,
   partial refund, pre-capture void, alternate provider, retry loop, or client/webhook money truth;
5. credit durable refund truth only after the existing WU-B adapter verifies `CANCELED`, zero balance, exact
   payment key, and a distinct nonblank cancel transaction reference. Timeout, partial/incomplete, missing ref,
   mismatch, unknown/error, or provider-success/internal-write failure must HOLD/reconcile and not fabricate success;
6. use a separately bound TEST/HARNESS-only step-up authorization for WU-E order finalization when the existing
   single-use verifier contract requires a second privileged transition. Do not reuse consumed freshness;
7. WU-E must re-read exact durable full-refund truth before projecting one refunded order/history/audit outcome;
8. customer and operator projections must agree on `ORDER_REFUNDED` / refunded state;
9. inventory remains committed/HOLD. No reservation release, stock increment, sellable restoration, return receipt,
   or restock inference is permitted;
10. replaying the same refund request and finalization produces zero second provider refund, refund transaction,
    order/history/audit, inventory, or reconciliation effect;
11. every attempted deterministic reversal is reconciled to a bounded terminal or explicit HOLD category.

Do not claim that the absence of a live step-up mechanism is resolved. Test-only explicit grants represent
already-decided bounded test verdicts only; they are not MFA, OIDC, session currentness, dual approval, credential,
or production authorization.

### 3.3 Direct Toss sandbox boundary

Official-provider mode must reuse the reviewed WU-F `o1_toss_sandbox_transport.ts` exactly. It must not add a
transport, sender, route, widget, arbitrary URL/method/header/body, credential store, provider fallback, or network
mechanism. It may read a distinct test reversal payment key only from the local environment boundary.

The official run must use a fresh payment key for a separate captured Toss sandbox payment. It must never use a
pre-capture void as Golden Reversal evidence. If a separate captured test payment cannot be obtained within the
approved local console/environment process, record `NOT_RUN_CREDENTIAL_GATE`; do not manufacture or reuse evidence.

No secret value may be requested or accepted in chat, printed, serialized, committed, snapshotted, or recorded in
evidence. No provider body/error, payment key, order number, idempotency key, refund reference, auth header, identity
claim, raw PII, SQL, digest, or filesystem credential path may escape.

### 3.4 Evidence ceiling and categories

The result may serialize only evidence layer/mode, bounded status categories/counts/booleans/timestamps, state
agreement, exact-zero replay-effect counts, inventory disposition `HOLD`, and the flags:

```text
NOT_LIVE_SALE_EVIDENCE
REAL_PAYMENT: NO
REAL_CUSTOMER_PII: NO
PRODUCTION: NO
PARTIAL_REFUND: NO
AUTO_STOCK_RESTORATION: NO
```

Even an official sandbox PASS proves one bounded captured-payment refund walking skeleton only. It does not prove
live payment, merchant eligibility, production, legal/returns policy, Controlled Live, Paid Beta, public sale,
general reliability, or operational safety.

## 4. Required tests and safety

Add strong positive and adjacent-negative coverage for:

- separate captured order required; no refund against absent/failed/mismatched/partial capture;
- full-only amount/KRW/paymentKey/order/capture binding;
- default-unconfigured step-up denial, wrong role/action/scope/reason/freshness, and consumed-freshness replay;
- complete `CANCELED`/zero-balance/distinct-cancel-ref verification;
- partial/incomplete/missing-ref/wrong-key/wrong-amount/unknown/timeout/provider error;
- provider-refund success plus internal record/finalization failure -> explicit reconciliation/HOLD, never false failure
  that could invite a second refund and never false completion;
- exact durable refund re-read before WU-E finalization;
- repeated request/finalization -> zero second provider/economic/internal effect;
- inventory committed before and after refund; no release/restoration;
- one refund history/audit and coherent customer/operator refunded projections;
- restart/replay from durable in-memory rows without a second provider call;
- evidence/error serialization against identifier/credential/provider/raw-PII leakage.

Run only with dependencies already present:

```text
cd app
npx vitest run scripts/o1_golden_reversal.vitest.ts
python3 scripts/o1_golden_reversal.dbtest.py
npx vitest run
```

The DB test must use the same already-local, disposable PostgreSQL containment pattern as reviewed WU-F: no pull,
no host/public port, tmpfs/no shared volume, synthetic rows/credentials only, exact committed migrations, blocking
`finally` cleanup and post-removal absence. It must prove captured order -> full durable refund -> order refund,
replay zero effect, inventory committed/HOLD, and representative failure/reconciliation branches. Record the same
generated-client/TypeScript-versus-SQL-twin boundary honestly.

Credential-gated command:

```text
cd app
npx vitest run scripts/o1_golden_reversal.sandbox.vitest.ts
```

Run only in its default fail-closed/no-network state unless every one-shot/test-secret/separate-test-payment-key/
synthetic-identity/no-live/no-PII/local-non-production precondition is proven. Otherwise record
`NOT_RUN_CREDENTIAL_GATE`; do not request or print secrets. No install, Prisma generation, real/shared/target DB,
production/live key/payment, provider commitment, customer data, public exposure, vendor contact, or unrelated network.

## 5. Candidate, evidence, and return discipline

Create one additive local candidate commit on exact reviewed WU-F base `c6e793d3459bc16c520bd09dbe739bf4306bdb40`.
Do not amend, rebase, squash, force-push, or push before independent review. The candidate must contain exactly the
four allowlisted new paths.

Write Worker-authored evidence only to:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/90_COSMILE_WUG_RESULT.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/90_COSMILE_WUG_POINTER.md
```

Include exact parent/candidate SHA, path/numstat ledger, commands/counts/status, disposable database identity and
cleanup, state/reconciliation/inventory/replay matrices, step-up and leak containment, credential-gate status,
official-sandbox evidence status, claim ceiling, product-repository status, and residual unknowns. State explicitly
that Controlled Live, Paid Beta, public sale, and any next WorkUnit did not start.

Return to `foundation-advisor` and STOP. Do not dispatch the Reviewer, push, request secrets, start integrated
review, or begin any later mission.

## 6. Immediate stop conditions

STOP and return exact evidence if any of the following is required:

- path outside the four-file allowlist or semantic modification to WU-B/WU-E/WU-F;
- route/UI/widget/new product runtime, generalized refund/return system, broad checkout-spine rewrite, or second truth;
- schema/migration/package/lockfile/generated-client/configuration change;
- Foundation, SIASIU, or foundation-control write;
- real/shared/target DB, live key/mode/payment, real identity/PII, provider commitment, public exposure, or production;
- new arbitrary network/origin/endpoint/provider/transport, webhook-trust shortcut, credential persistence, or leak;
- PortOne, partial refund, void-as-reversal, automatic stock restoration, courier, recommendation/AI/Memory work;
- inability to reach honest deterministic WU-G evidence inside the reviewed boundary.
