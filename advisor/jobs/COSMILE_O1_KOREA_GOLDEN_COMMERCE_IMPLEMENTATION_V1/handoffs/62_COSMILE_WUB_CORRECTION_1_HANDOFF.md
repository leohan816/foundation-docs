# Cosmile Worker Correction Handoff — WU-B Correction 1

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-1
ACTOR: cosmile
ROLE: same Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact correction base

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_CANDIDATE_HEAD: d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
EXPECTED_HEAD: d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01
EXPECTED_UPSTREAM_HEAD: 2733bfd61e407389c3336eba2e655ad081d4cdb5
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FULL_REVIEW_COMMIT: cce4bb50e2ae9f4d81e05ae19ef736b896f5f9f8
FULL_REVIEW_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md
FULL_REVIEW_VERDICT: NEEDS_PATCH
REVIEWER_FINDING: WUB-F1
ADVISOR_ADJACENT_FINDINGS: WUB-AF1, WUB-AF2, WUB-AF3
CANDIDATE_PUSH_STATUS: WITHHELD
```

Live-verify the same Worker runtime, model, max effort, `/fable-builder`, exact CWD, Git state,
current Agent Office Worker role, and all pins before editing. This is one bounded correction cycle,
not a redesign. Preserve reviewed history; add one correction commit without amend, rebase, squash,
force-push, or push. Do not start WU-E/F/G.

## Exact path boundary

Corrections may touch only the same eight WU-B paths:

- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/tossV2.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/service.ts`
- `app/src/lib/payment/webhook.ts`
- `app/scripts/o1_payment_contract.vitest.ts`
- `app/scripts/o1_toss_v2_adapter.vitest.ts`
- `app/scripts/o1_payment_repository.dbtest.py`

No schema, migration, generated client, package, route, checkout, order, inventory, catalog, auth,
Foundation, SIASIU, control, runtime, provider, credential, or unrelated path may change.

## Required findings

### WUB-F1 — durable stuck-state recovery (Reviewer, LOW)

Close the exact full-review finding:

- ambiguous confirm outcomes (`timeout`, provider error, unsupported status, malformed/unknown as
  appropriate) and post-2xx tuple/amount disagreement must not leave an `authorizing` intent with
  no durable recovery evidence;
- open or reuse category-only `capture_confirming` reconciliation on every ambiguous/post-effect
  confirmation state where conclusive non-capture is not proven;
- provide a bounded, restart-safe repository query/decision surface for stuck payment intents and
  refunds so WU-E can prepare recovery without a timer, route, scheduler, or in-memory truth;
- queries must be bounded by a validated limit and caller-supplied cutoff, return only the minimum
  internal fields needed to open/reuse order-scoped tasks, include only the exact eligible states,
  and map failures to closed categories;
- a pure service decision may turn internal candidate rows into category/count-only results while
  opening/reusing tasks. No IDs, SQL, payload, hash, or provider detail may leave the internal port;
- prove positive and adjacent negative: task on timeout/provider error/post-2xx mismatch; no task
  on clean DONE or conclusive ABORTED/EXPIRED; exact stuck states included; fresh/terminal/unrelated
  states excluded; limit/cutoff bounds fail closed; repository failure never produces false work.

### WUB-AF1 — deterministic provider idempotency and true replay zero-effect (Advisor, load-bearing)

The current public inputs accept caller-supplied provider idempotency keys that are not durably
bound to the internal intent/refund. A replay can therefore reuse the same internal record while
changing the Toss `Idempotency-Key`. Correct this without schema change:

- derive each Toss confirm/refund idempotency key deterministically and versionedly from the
  already durable internal operation key (capture internal idempotency key for confirm; Refund
  internal idempotency key for full reversal), or establish an equally strong deterministic
  binding using only the existing eight paths;
- do not trust a caller to choose or change the provider idempotency key across retries;
- keep the internal and provider boundary concepts distinct even if the provider key is a
  deterministic derivative; validate the resulting key within Toss bounds and never log/emit it;
- an exact replay after a durably captured intent must return the existing verified capture proof
  without another provider request. Add a closed repository claim result for this state rather
  than treating `captured` as a fresh provider-call claim;
- an `authorizing` retry may contact Toss only for the same bound paymentKey and the same
  deterministically derived provider idempotency key;
- refund retry from `requested`/`confirming` must likewise reuse the same deterministic provider
  key; caller variation must be structurally impossible;
- prove provider call counts and exact header stability across retries, including adjacent
  different internal-key cases.

### WUB-AF2 — repository capture must enforce the claimed paymentKey (Advisor, load-bearing)

`recordVerifiedCapture` currently rechecks status/order/orderNo/amount/KRW but does not directly
require `PaymentIntent.providerIntentRef === input.providerTxnRef` before inserting capture truth.
Close the repository boundary itself:

- load `providerIntentRef` with the intent row;
- require the exact previously claimed paymentKey before any capture insert or idempotent result;
- reject null/different provider references with zero write;
- mirror this invariant in the disposable PostgreSQL test functions;
- add positive and adjacent-negative tests, including direct repository attempts that bypass the
  pure service and try to record with a different/unclaimed reference.

### WUB-AF3 — webhook pull-verification must bind durable current intent state (Advisor, load-bearing)

The current `serverVerifyWebhook` compares provider truth only to caller-supplied orderNo/amount/
paymentKey. The Founder-frozen contract also requires current internal state. Correct the pure port:

- require the minimum internal intent/order identity needed for verification;
- read the durable PaymentIntent/Order binding through the repository, including the bound
  `providerIntentRef`;
- require exact internal orderId/orderNo/amount/KRW/paymentKey and an explicitly allowed current
  intent state before marking an inbox row verified;
- stale, missing, wrong-state, unclaimed, or mismatched internal truth must remain unresolved or
  quarantined/reconciliation-required with zero money/order/inventory/refund effect;
- a repository read/transition failure must never be claimed verified;
- retain the notification's untrusted status and digest-only/raw-free persistence;
- add positive and adjacent-negative tests for every internal binding/state direction and prove
  that the verification result is reported only when the inbox terminal state actually persists.

## Regression and evidence requirements

Re-run and record:

- both focused WU-B Vitest files;
- full safe Vitest suite;
- WU-B disposable PostgreSQL rehearsal;
- WU-C concurrency regression;
- WU-0 migration regression;
- exact eight-path containment, no route/network/secret/provider/runtime proof;
- pre/post Git state and blocking cleanup evidence.

Do not install, generate Prisma, pull an image, use external network, read a secret, contact Toss,
use a real/shared DB, or activate a route/runtime. Preserve all existing passing oracles; tests may
be strengthened or expanded only to prove these exact findings.

Create one additive correction commit on `d17a0926...`, do not push, and write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/62_COSMILE_WUB_CORRECTION_1_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/62_COSMILE_WUB_CORRECTION_1_POINTER.md`

Return to `foundation-advisor` and STOP. The same Reviewer will perform a delta-only re-review.
