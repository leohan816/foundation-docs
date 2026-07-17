# Cosmile Worker Handoff — Phase 5 Repository-local Technical Design

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P5-COSMILE-REPOSITORY-TECHNICAL-DESIGN
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
MODE: NON_EXECUTABLE_REPOSITORY_LOCAL_TECHNICAL_DESIGN_ONLY
EFFORT: max (user-selected; do not reduce)
WORKSPACE: /home/leo/Project/Cosmile
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9
EVIDENCE_COMMIT: b632529f2907e19f92f27770eac4208d60d4cb7d
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN_POINTER.md
RETURN_TO: foundation-advisor
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_REPOSITORY_WRITE: ZERO
NO_NEW_AGENT_OR_SUBAGENT: TRUE
```

Read the complete bilingual mission authority, current Agent Office Worker role, Cosmile
`AGENTS.md` and `CLAUDE.md`, and these exact evidence files from `EVIDENCE_COMMIT`:

- `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md`
- `20_COSMILE_AS_BUILT_AND_REUSE.md`
- `30_OFFICIAL_PROVIDER_RESEARCH.md`
- `40_DESIGNER_EXPERIENCE_DESIGN.md`

Use the following Advisor candidate boundary as an input, subject to later targeted Control
validation: Foundation owns canonical product facts and gated approved snapshots; Cosmile owns
sellable SKU, KRW price, stock, sales state, customer, cart, order, payment, fulfillment,
shipment, tracking, cancellation and refund; the required binding is
`foundation_product_id <-> cosmile_sku_id`; ordinary commerce must not synchronously depend on
Foundation; corrected/withdrawn snapshots affect the relevant listing while historical order
lines remain immutable.

Reinspect the exact Cosmile repository at the pinned branch/HEAD only as needed. Produce a
non-executable, repository-local technical design that covers:

- frontend/backend/operations separation and reuse of existing server-authoritative cart,
  repricing, order-history, RBAC/audit and Foundation-display seams;
- exact API/service/adapter boundaries and exact repository/file-level future write ownership;
- bounded handling of the four proven replacement candidates only: customer identity, PSP,
  inventory control and catalog/single-price authority; for each, preserve exact evidence,
  failed invariant, impact, bounded alternative, migration consequence and why repair is
  insufficient;
- order, payment, inventory, fulfillment, shipment, cancellation, return, refund,
  reconciliation and incident state models mapped to the Designer experience contract;
- safe last-item concurrency and transaction/compensation order without charging before the
  approved availability boundary is secured;
- provider-neutral customer-auth adapter with the provisional direct Kakao OIDC option and
  unresolved eligibility/consent/account-recovery gates;
- PSP adapter with direct Toss Payments V2 provisional recommendation and PortOne V2
  alternative, including server verification, expected order/amount/KRW binding, webhook as
  notification rather than sole truth, idempotency, replay/out-of-order handling and recovery;
- database schema and migration plan as design only, including persistent order/payment/refund/
  inventory/reconciliation truth, unique constraints, compatibility, backfill, rollback and
  disposable-test strategy;
- Foundation local snapshot/mapping consumption boundary, version/correction/withdrawal/stale
  behavior and exact order-line product/SKU/price/policy/snapshot binding;
- authorization, privacy, secret/PII minimization, audit and incident invariants;
- separate Golden Order and captured-payment Golden Reversal acceptance evidence under the
  `SANDBOX_WALKING_SKELETON_EVIDENCE` ceiling;
- implementation WorkUnits, dependencies, safe parallelization, estimates, external calendar
  gates, rollback/HOLD conditions and a reviewed-scope proposal that remains non-executable.

Do not redefine the Designer's customer/operator experience or Foundation canonical ownership.
Do not select a final provider, Legal/rights/MFDS/refund/return/tax/fulfillment policy, merchant
eligibility, production topology, credential mechanism, or live activation. Do not propose a
general rewrite. Do not write product code, schema, migration, tests or repository documents;
do not run build/test/runtime/DB/endpoint/provider/transaction; do not dispatch another actor or
subagent.

Write only the exact result and pointer paths. Report SHA-256, verify zero product/DB/runtime
changes, return to foundation-advisor, and STOP.
