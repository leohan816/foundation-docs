# 80 — Advisor Integrated Design Candidate

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
PHASE: 7 — ADVISOR_INTEGRATION
AUTHOR: foundation-advisor
STATUS: CANDIDATE_PENDING_INDEPENDENT_DESIGN_REVIEW
MARKET: KOREA
CURRENCY: KRW
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_REPOSITORY_WRITE: ZERO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
RETURN_ROUTE: selected actors -> foundation-advisor -> foundation-strategy-sol -> Leo
```

## 1. Executive outcome and authority boundary

The evidence supports one bounded implementation-ready **design candidate** for a Korean
non-live commerce walking skeleton: one Foundation-backed ELT serum, a server-authoritative
Cosmile commerce spine, one official-provider sandbox payment, and a separate captured-payment
refund rehearsal. It does not support public sale, live payment, production activation, or
commercial/legal readiness.

The correct posture is **reuse the existing Cosmile spine and replace only four proven mock or
split-authority seams**: customer identity source, payment/refund effect, inventory reservation,
and catalog/single-price authority. Foundation remains the canonical product-content owner and
an asynchronous snapshot producer; it is never a synchronous dependency of ordinary commerce or
part of the money path.

This artifact integrates without replacing the role-owned source artifacts. Designer owns the
experience contract, Cosmile Worker owns repository-local technical design, Foundation Worker owns
the bounded snapshot contract, and Control owns the cross-project contract findings. Reviewer has
not yet ruled on this candidate. Nothing below authorizes implementation.

## 2. Immutable evidence index

| Evidence | Role owner | SHA-256 | Use |
|---|---|---|---|
| `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md` | Foundation Worker | `f94476c438a89d3499b41029cbb956d5c05d9cf0b8607c664f32b9ae6ed796e7` | canonical product facts and gates |
| `20_COSMILE_AS_BUILT_AND_REUSE.md` | Cosmile Worker | `62332fb804f0b9c6ea2352d24d4d900cb61f6e74ec790f9553d43fdf73db8fc4` | current code/reuse/mock boundary |
| `30_OFFICIAL_PROVIDER_RESEARCH.md` | Advisor | `4ccc16eede943b1d5a1f1def6ab15fd2dc09d0df98f356b5c4156550d27ca9d1` | official-source auth/PSP options |
| `40_DESIGNER_EXPERIENCE_DESIGN.md` | Designer | `011d973247b7474b11f62f7d8a957eb4df0fa36e2b876ee6843c4eaad763dc43` | customer/operator experience contract |
| `50_FOUNDATION_BOUNDED_SNAPSHOT_DELIVERY_DESIGN.md` | Foundation Worker | `a9148c79454b807a531087993eedb0c52c57a20955d0d158e147f53ac259f10c` | canonical snapshot/delivery design |
| `60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md` | Cosmile Worker | `05095cfdc700f7f37b03d9ff2174ea3a049a1ef086ff395416e15fc0f6ea984b` | repo-local technical design |
| `70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS.md` | Control | `a088a42235b34de0e6bd218943bfdb9460fb440e8dc2e230c28f55b9e8f2c280` | ownership/invariants/dependency analysis |
| `71_CONTROL_FOUNDATION_DELIVERY_DELTA_COMPLETION.md` | Control | `bcdb018b5d159cac921c1922b2a632e74f671d016a124a600e7c4f4b9e26d5dd` | Foundation-delivery reconciliation |

Repository facts remain pinned: Foundation `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`,
Cosmile `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`, canonical vault
`70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`. No actor modified them.

## 3. Facts, assumptions, and unknowns

### Verified facts

- Canonical vault contains 28 relevant records: 8 ELT and 20 `skin1004`/理肤天使.
- ELT eligibility is 6 `USABLE`, 1 mask `UNVERIFIED`, 1 triplecapsule `INCOMPLETE`.
- All 20 `skin1004`/理肤天使 records are `BLOCKED` by canonical brand identity.
- No commercial-use-rights evidence, MFDS report numbers, or canonical binary imagery are
  present. All eight ELT records still require human review; `source_checksum` is pending.
- Cosmile is Next.js/TypeScript/Prisma/Postgres. Its cart, coupon, server repricing, wishlist,
  owner-scoped order history, console auth/RBAC/audit, event ledger, and Foundation fail-closed
  consultation seam are reusable.
- Customer identity, payment, and inventory effects are mock/inert; catalog is a hardcoded mock;
  shipment/tracking/refund effects are absent or unreachable.
- PDP price currently comes from mock view data while checkout charges `resolveUnitPrice`; this
  split authority must be corrected before any real KRW exposure.

### Design assumptions

- O1 is Korea/KRW, synthetic customer, quantity one, full capture, full refund, sandbox only.
- Existing reusable seams remain; no broad rewrite occurs.
- Order history is the durable customer recovery home after authentication.
- Rights/MFDS/imagery-open rehearsal may use a restricted text-only internal fixture labeled
  `NOT_LIVE_SALE_EVIDENCE`; it is not public-sale evidence.
- No SLA, return eligibility, fee, restock, partial-refund, tax, notification, or shipping promise
  exists until the proper owner approves it.

### Unknowns that remain explicit

- final identity/PSP selection and provider eligibility/KYC/test-channel conditions;
- guest checkout, account collision/recovery, consent text and retention;
- refund/return/cancellation/restock/partial-refund/tax policy;
- courier/tracking/notification/support/incident owners and SLAs;
- commercial rights, MFDS evidence, imagery rights, and approval reviewer;
- stale-snapshot threshold, final transport/ack channel, vault backup owner;
- production Postgres/hosting/migration state; no environment or secret was inspected.

## 4. Product eligibility and O1 SKU recommendation

| Product | Candidate use | Status | Reason |
|---|---|---|---|
| `elt-serum-vitayouth-01` | representative SKU for Golden Order and Golden Reversal | `RECOMMENDED` | clean single 50ml product, `USABLE`; still behind global gates |
| `elt-pad-vitayouth-01-80` | mapping/cardinality boundary | `RECOMMENDED_BOUNDARY` | 80매/200g matches the primary/core spec |
| `elt-pad-vitayouth-01-40` | none | `BLOCKED_UNVERIFIED` | volume source is contaminated; no correction may be invented |
| `elt-sunscreen-vitayouth-01` | conditional claims boundary | `CONDITIONAL` | triple-functional/MFDS display materially expands the gate surface |

All public exposure remains blocked until rights, MFDS, imagery, human-review, and other
applicable gates are recorded. Foundation prices are dated non-authoritative references only;
Cosmile owns KRW price, stock, and sales state.

## 5. As-built reuse and bounded replacement matrix

| Capability | Disposition | Integrated requirement |
|---|---|---|
| cart, wishlist, coupon, owner scoping | `REUSE_UNCHANGED` | preserve behavior and tests |
| `resolveUnitPrice` | `REUSE_AS_SINGLE_AUTHORITY` | PDP and checkout use the same server truth |
| checkout validation/order history | `REUSE_WITH_CORRECTION` | add real state effects without replacing validation/history |
| console auth/RBAC/audit | `REUSE_UNCHANGED` | irreversible actions remain owner/admin + reason/audit |
| Foundation consultation/risk seam | `REUSE_UNCHANGED` | display-only, fail closed, no mock fallback |
| customer identity source | `BOUNDED_REPLACEMENT_RC1` | provider-neutral OIDC behind `Owner/getShopper` |
| mock payment/refund effect | `BOUNDED_REPLACEMENT_RC2` | PSP port + durable intent/transaction/refund truth |
| display-only stock | `BOUNDED_REPLACEMENT_RC3` | reservation/commit/release + default-deny oversell guard |
| mock catalog/split price | `BOUNDED_REPLACEMENT_RC4` | approved local snapshot + one price authority |

Shipment/tracking/reconciliation are bounded additions, not fabricated reuse and not evidence
of provider integration.

## 6. Foundation–Cosmile contract

### Ownership

- Foundation owns canonical product identity/content, brand, ingredients, claims, warnings,
  safety content, provenance, source support, and approval/gate facts.
- Cosmile owns sellable SKU, price, stock, sales state, customer/session, cart, order, payment,
  fulfillment, shipment, tracking, cancellation, return, refund, and reconciliation.
- Foundation is outside the money path and never synchronously gates catalog, cart, checkout,
  payment, order, fulfillment, or refund. Approved local snapshots keep ordinary commerce
  operating during Foundation outage; suitability separately becomes `UNKNOWN`.

### Snapshot and binding

Foundation snapshot identity is:

```text
foundation_product_id
+ vault_commit
+ product_tree_hash
+ data_version
+ formula_version
+ snapshot_schema_version
+ snapshot_content_sha256
```

`product_tree_hash` is the primary content-change detector; version fields classify significance.
Manifest sequence orders delivery. A snapshot is immutable; corrections are new snapshots with a
supersedes chain. Catalog-wide cardinality is one Foundation product to `0..N` Cosmile SKUs;
conditioned on a binding existing it is `N>=1`, and each `cosmile_sku_id` maps injectively to one
Foundation product/variant pair. The consumer-side binding is Cosmile-owned and unique on
`cosmile_sku_id`.
Historical order lines retain the exact product/variant/snapshot identity and rendered name/spec;
later correction or withdrawal never rewrites them. Commercial line fields remain Cosmile-owned.

### Lifecycle and containment

`MISSING_INITIAL`, `CURRENT_APPROVED`, `STALE_LAST_APPROVED`, `CORRECTED/SUPERSEDED`, and
`WITHDRAWN` are distinct from infrastructure availability. Outage does not imply withdrawal;
received withdrawal contains the affected SKU only. Correction/withdrawal uses an immutable
sequenced manifest/notice contract. Concrete transport and ack channel remain unresolved and may
not be invented. Delivery-import acknowledgement is optional asynchronous operational evidence,
not a safety gate; binding acknowledgement is not applicable because the binding is Cosmile-owned.
Missing ack never retracts or opens a gate, and idempotent redelivery remains safe without it.

Path truth is three-way: the current Foundation read layer and `source_checksum` field are existing
verified paths; proposed `approval.yaml`, `_rights.yaml`, exporter, and files-first ledger follow
verified repository patterns but do not yet exist; the concrete delivery/ack transport is unresolved.

## 7. Experience contract

The complete experience design remains [40_DESIGNER_EXPERIENCE_DESIGN.md](40_DESIGNER_EXPERIENCE_DESIGN.md).
Its customer/operator state vocabulary is normative for product experience; internal database
labels project into it and do not replace it.

- Customer journey: discovery/PDP -> cart -> identity -> checkout review -> payment action ->
  payment confirming -> order confirmed -> fulfillment visibility -> history/recovery.
- Separate captured-payment reversal: captured order -> authorized operator refund -> provider
  confirmation -> internal reconciliation -> customer/operator agreement.
- Pending/unknown states forbid duplicate irreversible actions and always show the last verified
  truth, safe next action, and support reference.
- Accessibility, mobile behavior, truthful copy, no fabricated image/claim/suitability, and
  operator recovery are acceptance requirements, not polish deferred beyond the design.

## 8. Frontend, backend, operations, and future write ownership

| Plane | Owns | Future write boundary (proposal only) |
|---|---|---|
| Frontend | server-authoritative projections and single-submit commands | existing App Router surfaces plus designed pending/recovery states |
| Cosmile backend | identity, price, inventory, order, payment, refund, snapshot consumption | `lib/auth/*`, `lib/payment/*`, `lib/inventory/*`, `lib/refund/*`, `lib/reconciliation/*`, `lib/foundation/snapshot*`, bounded route extensions |
| Operations | reconciliation, refund/inventory/fulfillment/snapshot/incident action | existing console/RBAC/audit plus bounded panels |
| Foundation | deterministic canonical snapshot/approval/export lane | proven-pattern vault/read-layer paths only after a future approval |

Only the repository-owner Worker may implement its repository. Designer and Control never modify
product repositories. Exact future allowlists require a new Founder-approved implementation handoff.

## 9. Database and migration plan — design only

Cosmile adds nullable/additive truth entities for customer identity/session, payment intent and
immutable transactions, refund, inventory reservation, webhook inbox, order status history,
reconciliation/incident, Foundation product snapshot, and SKU binding. Existing `Order` gains an
opaque public `order_no`; `OrderItem` retains the exact Foundation snapshot reference.

Uniqueness/CHECK/FK invariants belong in raw SQL migrations, including one succeeded capture per
order, one active refund per capture, unique provider event, unique idempotency key, unique
`(issuer,subject)`, and a default-deny oversell invariant. Every later migration must be additive,
ship down/forward-fix evidence, and rehearse only on disposable ephemeral PostgreSQL under separate
authority. No schema or migration is created or applied by this mission.

## 10. Authentication and PSP options

- **Auth recommendation:** direct Kakao OIDC for narrow O1, behind a provider-neutral OIDC port.
  Verify issuer/audience/signature/expiry/nonce/PKCE; immutable identity is `(issuer,subject)`, not
  email/name. Alternative: brokered OIDC if Leo chooses operational portability. Customer and
  operator identity remain separate.
- **PSP recommendation:** direct Toss Payments V2 for one narrow KRW sandbox order/refund path.
  PortOne V2 is the alternative if near-term multi-PG portability justifies another state and
  reconciliation boundary.
- **Webhook rule:** notification only. Persist idempotently, then server-pull-verify and bind the
  expected order number, amount, KRW currency, provider transaction, and internal state before
  transition. The researched generic Toss payment-status webhook has no documented signature;
  IP allowlisting is defense in depth, not money truth.

These are provisional recommendations, not provider selection, eligibility proof, KYC, account
creation, secret handling, contract, or implementation authority.

## 11. Commerce state, concurrency, and reconciliation invariants

1. Availability reservation succeeds before capture; last-item contention yields one winner.
2. Client, redirect, timer, and webhook never establish money truth.
3. One successful capture per order and one active refund per capture.
4. Reservation commits only on verified capture; unknown payment never releases stock or permits
   a second charge.
5. Duplicate/replayed/out-of-order events cause zero duplicate effects or state regression.
6. Capture-success/internal-failure is contained and reconciled; never re-charge or tell the
   customer the payment failed.
7. `Order.status` is a projection; transaction/reservation/refund records are truth.
8. Golden Reversal requires a real captured sandbox payment, not a pre-approval void.
9. Refund inventory disposition remains `HOLD` until an approved return/restock policy exists.
10. Restart/missing-event recovery reads durable state and creates category-safe reconciliation
    work; it does not reset or guess.

## 12. Fulfillment, support, security, privacy, and incident model

O1 fulfillment is record-only: preparing/shipped/delivered may be shown only from verified records;
no courier or tracking integration is implied. Support and operator actions use named state,
category-safe audit, role checks, and explicit reason. Customer-visible history remains available
through recovery.

Server-authoritative price/stock, owner-scoped reads, opaque public order numbers, minimal OIDC
claims, unbundled purpose-specific consent, no raw identity egress to Foundation, masked evidence,
no secrets/PII in logs or fixtures, and affected-item containment are mandatory. Refund/stock
step-up or dual approval remains a Leo decision.

## 13. Sandbox acceptance criteria

Ceiling: `SANDBOX_WALKING_SKELETON_EVIDENCE`; no automatic progression.

**Golden Order:** declared official sandbox/test environment; synthetic signed-in customer;
representative serum; approved or explicitly restricted text-only snapshot; server-repriced cart;
atomic reservation; one payment intent; one verified capture; one order/inventory commit; matching
customer/operator history; replay produces `DUPLICATE_IGNORED` and zero second effect.

**Golden Reversal:** a separate captured order; one authorized full refund; provider verification;
internal reconciliation; repeated request produces zero second refund; inventory stays `HOLD`
without approved disposition.

Evidence is bounded to status/category/count/time and masked references. It proves neither live
payment, merchant eligibility, rights/MFDS compliance, production readiness, load, nor shipping.

## 14. WorkUnits, safe order, estimate, and external calendar

| WU | Scope | Estimate | Gate/dependency |
|---|---|---:|---|
| WU-0 | additive schema design realization + disposable migration rehearsal | 2–3 d | future DB/schema authority |
| WU-A | customer OIDC behind existing Owner seam | 4–6 d | identity decision/provider eligibility |
| WU-B | payment/refund adapter, truth tables, server verification, inbox | 6–9 d | WU-0/C contract, PSP decision/test channel |
| WU-C | reservation/commit/release and oversell guard | 3–5 d | WU-0 |
| WU-D | single price authority and snapshot consumption | 3–5 d | WU-0, reviewed Foundation contract |
| WU-E | order lifecycle, public order number, history, reconciliation/incident | 5–8 d | A–D contracts |
| WU-F | Golden Order sandbox harness/evidence | 2–4 d | A/B/C/E |
| WU-G | captured-payment Golden Reversal harness/evidence | 2–3 d | B/refund/E |

Safe sequence: WU-0 -> A || C || D -> B after C contract -> E -> F -> G. Foundation's
deterministic approval/checksum/export lane is a separable 4–8 engineer-day track; exact delivery
transport requires a prior decision. Aggregate Cosmile estimate is **4–6 focused engineering
weeks**, medium confidence, not a commitment. Provider onboarding, Legal/rights/MFDS/imagery,
operations owners, and infrastructure decisions can dominate elapsed time.

## 15. Founder decisions and recommendations

| Decision | Options | Recommendation | Remains deferred |
|---|---|---|---|
| identity | direct Kakao OIDC; brokered OIDC; later multi-method | direct Kakao OIDC, adapter-shaped | provider approval/consent/account recovery |
| PSP | direct Toss V2; PortOne V2+PG | direct Toss V2 for narrow O1 | eligibility/KYC/fees/settlement/methods |
| product scope | serum only; +pad-80; +sunscreen | serum + pad-80 boundary; sunscreen only if MFDS/Legal need affirmed | pad-40 remains blocked |
| guest checkout | allow; require login; conditional | logged-in synthetic O1; decide before build | public guest behavior |
| public order number | UUID; ULID | ULID if sortable operations value is desired; either remains opaque | final selection |
| snapshot policy | threshold/approval owner/reviewer/transport | Leo owns approval; set threshold and delegated reviewer before build | exact transport/ack channel |
| refund/return | eligibility/fees/timing/partial/restock | approve minimum full-refund rehearsal policy first | live consumer policy |
| operator control | owner/admin; step-up; dual approval | retain baseline plus decide step-up for refund/stock | production control model |

No option is selected by this artifact. Leo's explicit scope freeze and external-owner decisions
are required before any implementation mission.

## 16. External confirmations

Required owners must confirm: merchant entity/signatory; PSP/PG eligibility, KYC, test channel,
fees, settlement and refund constraints; Kakao eligibility/consent/review; privacy/data retention;
commercial-use rights R1–R6; MFDS report/display obligations; product copy and imagery rights;
courier/tracking/notifications/support; tax/accounting/receipt behavior; named reconciliation and
incident owners; Postgres/hosting/migration state; vault persistence/backup. Official docs establish
interfaces, not any of these approvals.

## 17. Rollback, HOLD, expansion, and explicit no-build

- Foundation correction/rollback is forward-only supersession or categorical withdrawal; no
  delivered snapshot or historical line is rewritten.
- Commerce recovery uses idempotent replay, reconciliation, and forward-fix. Unknown money state
  never causes retry charge or stock release.
- HOLD on live credentials/mode, real PII/payment, public exposure without gates, unresolved
  oversell/money truth, rights/MFDS regression, role/repository conflict, or any required broad
  rewrite/scope expansion.
- Excluded: Foundation AI, SIASIU AI, Memory V3, recommendation UI, B2B2C, influencer, advanced
  dashboard, AI pricing/CRM, US/USD, Public Launch, production, and all unrelated work.
- Product code changed: NO. Schema/DB changed: NO. Tests/runtime/transactions executed: NO.
  Provider contacted: NO. Implementation dispatched: NO.

## 18. Required-output traceability and review state

Outputs 1–6 are integrated in §§1–5; Output 7 remains the role-owned `40_`; Output 8 remains
`60_`; Output 9 remains `50_`; Outputs 10–23 are integrated in §§8–17; Output 24 is pending the
independent Reviewer; Output 25 is the non-executable WU proposal in §§14–15; Output 26 is §17;
Output 27 will be produced only after review and Advisor closure.

```text
INDEPENDENT_DESIGN_REVIEW: PENDING
REVIEWED_IMPLEMENTATION_SCOPE_PROPOSAL: PENDING_REVIEW_AND_LEO_APPROVAL
LEO_SCOPE_FREEZE_REQUIRED: YES
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
ADVISOR_IMPLEMENTATION_DISPATCHED: NO
HARD_STOP_AFTER_REVIEWED_DESIGN: ACTIVE
```
