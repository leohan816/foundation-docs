# Independent Reviewer Handoff — Integrated O1 Golden Commerce Implementation

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: final integrated Foundation snapshot lane plus Cosmile WU-0 through WU-G
REVIEW_PASS: INTEGRATED_IMPLEMENTATION_REVIEW
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Exact final subjects

```text
FOUNDATION_REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_BRANCH: implementation/cosmile-o1-foundation-snapshot-v1-20260717
FOUNDATION_BASE: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
FOUNDATION_FINAL_REVIEWED_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a
FOUNDATION_EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-foundation-snapshot-v1-20260717
FOUNDATION_EXPECTED_AHEAD_BEHIND: 0_0
FOUNDATION_EXPECTED_STATE: CLEAN

COSMILE_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
COSMILE_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
COSMILE_BASE: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
COSMILE_FINAL_REVIEWED_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
COSMILE_EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
COSMILE_EXPECTED_AHEAD_BEHIND: 0_0
COSMILE_EXPECTED_STATE: CLEAN

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
FINAL_DESIGN_POINTER_COMMIT: 876af525eae30ee6d489c6786259a457929d7900
```

Before review, re-read the current Agent Office Team Operating Model and Reviewer role, both
repositories' current rules, and `/fable-sentinel`. Live-verify session, Fable 5, max effort,
independence, exact CWD, synchronization OFF, no overlapping review, every repository pin, clean
state, ancestry and upstream equality. Worker and earlier Reviewer artifacts are evidence inputs,
not substitutes for this integrated determination.

Do not patch, stage, commit, push, dispatch, request credentials, accept risk, start Controlled Live,
or begin another mission.

## Reviewed gate chain

The final subject must contain this exact ordered Cosmile ancestry after the pinned base:

```text
c559e7cd132e7b837dc38d01395f790499abb70d WU-0
70b8b155f447ca3dd19bfecf64506df7cdfef41b WU-A candidate
2b8efdcc484d211a7cc6957c3d632a073afefbe4 WU-A correction 1
e1dc39e6e0179c095e47695594b6ea3fec57d006 WU-A final PASS
84370e8624c6e908da183a84b38551a6a9441527 WU-C candidate
3ea1b211b6111678add9f0e2814c289ed96adca4 WU-C final PASS
21012d0 WU-D candidate
2733bfd61e407389c3336eba2e655ad081d4cdb5 WU-D final PASS
d17a092 WU-B candidate
e1cfc4a WU-B correction 1
b344889428971f6baa7208ea3e76858de0c9fc8b WU-B final PASS
d1f21e0fdd51034eef025212729125cee91576dd WU-E PASS
c6e793d3459bc16c520bd09dbe739bf4306bdb40 WU-F PASS
63fdd2d507357861aec582b980006baa7d7045a4 WU-G PASS
```

Resolve abbreviated commits directly and fail if they do not uniquely match the final chain. Verify
that the final Foundation subject contains only its two reviewed commits after the pinned base.

The closing independent review artifacts are pinned by these foundation-docs commits:

```text
FOUNDATION_SNAPSHOT_FINAL_DELTA_REVIEW: d44f56df6dd206318c2ae9194ebf5105c17d9914
COSMILE_WU0_REVIEW: 3cb1a1d10195f830cbbca53f2523880b12a4e3f0
COSMILE_WUA_FINAL_DELTA_REVIEW: dcc6a0fbd9e0714cda64c4eb0163c6ff23e25c09
COSMILE_WUC_FINAL_DELTA_REVIEW: 58202ed7103defb9a983c1b7d46c265f826f8b30
COSMILE_WUD_FINAL_DELTA_REVIEW: 3bdc1d5d2d6ecb21050745de77be8f38ad01a580
COSMILE_WUB_FINAL_DELTA_REVIEW: 36a30f2055adb4a2ed0d5928ec228be0e46f43b8
COSMILE_WUE_REVIEW: 4f5ac0f0556ce75ebcf183e14172bcb744d80ad4
COSMILE_WUF_REVIEW: dc4ebaf508be56bf2da5a1a2ff856939a00b6798
COSMILE_WUG_REVIEW: e3dd2cf0cfe398c65527dbbe806b3025fa60aa7c
```

Verify every final product head is bound to a PASS closing review, every correction is additive,
and no reviewed history was amended, rebased, squashed, force-pushed or bypassed.

## Frozen scope and integrated determinations

### 1. Repository and write containment

- Foundation base-to-head must contain exactly its seven reviewed snapshot/export paths.
- Cosmile base-to-head must contain exactly the cumulative WU-0 through WU-G implementation,
  tests, migrations, bounded connector paths, environment example, and required design/index paths
  authorized by the per-WU handoffs and scope ledger.
- No SIASIU, foundation-control, canonical vault, production configuration, unrelated cleanup,
  recommendation, US/USD, B2B2C, Memory V3, Foundation AI, or other program change.
- Verify every existing-path modification is load-bearing to an approved weak seam or required
  documentation rule; identify any unexplained path as blocking.

### 2. Cross-repository Foundation snapshot boundary

- Foundation remains canonical for product identity/content, brand, ingredient, claim, warning,
  safety and provenance; Foundation exports only a deterministic, versioned, approved, checksum-
  bound, non-production local file bundle.
- Cosmile imports and verifies a local copy, persists a single lineage head and authoritative KRW
  price, rejects mismatch/unknown/stale/unapproved/ambiguous input, and never performs synchronous
  Foundation I/O on catalog, cart, checkout, payment, order, fulfillment or refund paths.
- Foundation outage must not stop ordinary commerce. No production transport, acknowledgement
  service, endpoint, network, DB write, Memory or AI lane exists.

### 3. Identity, payment and webhook truth

- Google OIDC is the only first-rehearsal provider behind a provider-neutral owner seam, default
  OFF, production-forced OFF, credential-gated, with guest checkout and Kakao/Apple deferred.
- General Toss payment webhooks are untrusted notifications until the server-side query result is
  exactly bound to order, amount KRW, payment key and internal state. No nonexistent general-payment
  signature is invented. Signature verification is limited to event classes for which official
  documentation defines it.
- Direct Toss V2 is preserved. Provider/network/credential ownership is injected or script-gated;
  no live provider, PortOne switch, payment widget, public route activation or real transaction.
- Payment/refund truth, durable idempotency, replay protection, timeout/unknown HOLD and recovery
  are coherent with downstream order and inventory state.

### 4. Inventory, price, order and operator invariants

- Cosmile is authoritative for reservation, commit, release, policy-based restoration and one
  KRW price. Oversell is default-deny and last-item concurrency has one winner.
- Refund never auto-restores sellable inventory. WU-G must leave committed inventory HOLD.
- Order history, opaque public order numbers, record-only shipment/tracking, reconciliation,
  recovery and audit evidence remain bounded and category-safe.
- Sensitive refunds, stock adjustment and recovery require fail-closed step-up. Runtime defaults
  deny all; WU-F/G grants are explicit, bounded, single-use test verdicts only, not a real auth
  mechanism.

### 5. Golden Order and Golden Reversal evidence

- WU-F composes the reviewed WU-A through WU-E chain and proves a bounded non-production Golden
  Order with deterministic local evidence; its official provider layer is honestly
  `NOT_RUN_CREDENTIAL_GATE`.
- WU-G begins from a separate captured order/payment, exercises the actual full-refund and order-
  finalization contracts, proves one economic effect, replay zero second effect, inventory HOLD and
  category-only evidence; it is not a pre-capture void. Its official provider layer is also
  honestly `NOT_RUN_CREDENTIAL_GATE`.
- Review the previously noted harness/repository mirrors as an integrated semantic-drift risk.
  PASS only if their current fidelity is directly verified and their script-only/test-only nature
  is explicit; do not silently credit them as runtime repository execution.

### 6. Defaults, leakage and claim ceiling

- All runtime/provider activation flags remain OFF by default. No live step-up, Google or Toss
  credential, real customer PII, public sale, production DB, provider contract/KYC, Controlled
  Live, Paid Beta or Public Launch is implemented or evidenced.
- No secret, auth header, payment key, raw order number, internal/provider ID, step-up freshness,
  raw PII, provider body, SQL, filesystem secret path or sensitive digest appears in committed
  examples, evidence, response DTOs, audit/metric categories, errors, or output. Synthetic
  executable fixtures are not durable evidence and must be identified as such.
- The maximum acceptable claim is exactly:

```text
REVIEWED_NON_PRODUCTION_GOLDEN_COMMERCE_IMPLEMENTATION_WITH_SANDBOX_WALKING_SKELETON_EVIDENCE
```

Interpret `SANDBOX_WALKING_SKELETON_EVIDENCE` as deterministic non-production composition plus
disposable synthetic PostgreSQL evidence. It does not mean official Google or Toss provider
execution, merchant eligibility, live identity/payment, production readiness, Controlled Live or
Paid Beta. If that interpretation is incompatible with the reviewed authority/design, return a
blocking finding instead of broadening the claim.

## Direct reproduction

After inspecting the exact commands and relevant effective environment names without revealing
values, reproduce at minimum:

```text
# Foundation
python3 -m pytest foundation/tests/test_cosmile_commerce_snapshot.py

# Cosmile
cd app
npx vitest run
npx vitest run scripts/o1_golden_order.vitest.ts
npx vitest run scripts/o1_golden_reversal.vitest.ts
npx vitest run scripts/o1_golden_order.sandbox.vitest.ts scripts/o1_golden_reversal.sandbox.vitest.ts
```

The sandbox commands may run only with every credential/provider gate provably closed and must
make zero network calls. Use existing dependencies only; no install or Prisma generation. Record
pre/post Git state and remove only attributable temporary symlinks/caches. Do not rerun disposable
database scripts unless direct inspection identifies a reason to distrust the already independently
reproduced per-WU cleanup evidence; if rerun, apply the same no-pull/no-host-port/tmpfs/synthetic-only
blocking cleanup rules.

`tsc`/build and generated-client execution may remain honestly unverified only where the pinned
pre-WU-0 generated-client boundary makes them unsafe or misleading. Classify the release impact;
do not infer PASS.

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

Do not PASS if authority, ancestry, review-chain, cross-repository snapshot, identity/payment,
inventory/order, Golden evidence, default-off, leakage, containment, test, residual-limit, claim-
ceiling or hard-stop evidence is contradicted, materially incomplete, or asserted only by an
artifact label. Every finding requires stable ID, severity, exact path/line or artifact pointer,
proof, impact and smallest in-scope correction boundary.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/100_INTEGRATED_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/100_INTEGRATED_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not patch, stage, commit, push, dispatch, request
credentials, start Controlled Live, or begin another mission.
