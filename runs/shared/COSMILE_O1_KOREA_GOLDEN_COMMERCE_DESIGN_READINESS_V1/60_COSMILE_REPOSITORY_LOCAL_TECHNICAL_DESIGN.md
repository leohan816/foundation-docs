# 60 — Cosmile Repository-local Technical Design (Phase 5)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID:  O1-P5-COSMILE-REPOSITORY-TECHNICAL-DESIGN
ACTOR:        cosmile (Cosmile repository-owner Worker)
ROLE:         Cosmile repository-owner Worker (Foundation Team; Advisor = foundation-advisor)
MODE:         NON_EXECUTABLE_REPOSITORY_LOCAL_TECHNICAL_DESIGN_ONLY
EFFORT:       max (user-selected; not reduced)
SKILL:        /fable-builder (loaded; anchor-first / mapping-before-code / declare-deviation / proven-vs-not-proven discipline applied to a DESIGN deliverable)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M context) — live-verified
STATUS:       COMPLETE — design only · zero product/DB/runtime changes · READY_FOR_INDEPENDENT_DESIGN_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_AUTHORIZED: NO   ·   PRODUCT_REPOSITORY_WRITE: ZERO   ·   NO_NEW_AGENT_OR_SUBAGENT: TRUE
```

> **What this is.** One coherent, non-executable technical design **inside the Cosmile repository boundary**
> for a Korea/KRW sandbox Golden Order and a separate captured-payment Golden Reversal. It maps the
> Designer experience contract (`40_…`) onto Cosmile-owned commerce architecture, state machines, adapters,
> a design-only schema/migration plan, security invariants, sandbox acceptance evidence, and bounded
> implementation WorkUnits.
>
> **What this is not.** It does **not** redefine the Designer's customer/operator experience or Foundation
> canonical ownership; does **not** finally select any provider, Legal/MFDS/refund/return/tax/fulfillment
> policy, merchant eligibility, production topology, credential mechanism, or live activation; proposes **no
> general rewrite**; and writes **no** product code, schema, migration, test, or product-repository document.
> Every change below is bounded to an **existing seam** and remains a proposal pending Leo's scope freeze and
> a new exact Advisor handoff.

---

## 0. Authority boundary and design posture

| Truth domain | Owner (unchanged) | Cosmile design consequence |
|---|---|---|
| product identity/content, brand, ingredient, claim, evidence, safety, provenance, **suitability verdict**, customer meaning-memory, personalization | Foundation | Cosmile **references/displays** a versioned local snapshot only; never authors or repairs canonical facts (`ontology.ts` `reference`/`display`/`forbidden`) |
| sellable SKU, KRW price, stock, sales state, customer identity (service-local), cart, order, payment, fulfillment, shipment, tracking, cancellation, return, refund, reconciliation | Cosmile | all commercial availability and money/stock effects are **server-authoritative in Cosmile** |
| customer experience contract (screens, states, copy, recovery) | Designer (`40_…`) | this design **consumes** it as a fixed input and maps internal state → experience state; it does not re-decide it |
| PSP capture/refund truth · identity-provider truth | future approved PSP · future approved identity provider | browser return / webhook alone is **never** final truth; server confirmation controls state |
| Legal, rights, MFDS, privacy, tax/accounting, fulfillment, refund policy | Leo + named external authorities | UI/back end **consume a versioned decision**; this design does not choose the decision |

**Non-negotiable held throughout** (root `CLAUDE.md §0.5`; `app/CLAUDE.md`; `app/src/types/ontology.ts`
`ONTOLOGY_BOUNDARY`; `ARCHITECTURE_CONSTITUTION.md`): Cosmile shows and sells; it does not judge suitability,
grade evidence, check claims, score ingredient risk, or run skin-type rules. No such logic is introduced by
any item in this design. Foundation is **not** a synchronous dependency for catalog, cart, checkout, payment,
order, fulfillment, or refund; a Foundation outage never disables unrelated ordinary commerce, and absent
suitability is `UNKNOWN`, never a guess.

**Advisor candidate cross-project contract (input; subject to later targeted Control validation).** Foundation
owns canonical product facts and gated approved snapshots; Cosmile owns sellable SKU / KRW price / stock /
sales state / customer / cart / order / payment / fulfillment / shipment / tracking / cancellation / refund;
required binding `foundation_product_id <-> cosmile_sku_id`; ordinary commerce must not synchronously depend
on Foundation; corrected/withdrawn snapshots affect the relevant listing while **historical order lines
remain immutable**. This design is built to that contract and flags where Control must confirm it (§11, §16).

---

## 1. Anchors and evidence pins

All inputs were read directly at pinned objects — not from memory. Where a working-tree read was used, it was
verified byte-identical to the pinned commit.

| Object | Pin (verified this session) |
|---|---|
| Mission authority (KO+EN) | `docs/strategy/20260717_COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_MISSION_KO_EN.md` @ `AUTHORITY_COMMIT 24b94ef6a0673a6fa350a3e21a83ca22506afde9`; sha256 `3e1fefa792a7b15aa83ed5068d5dcdc80158372f9283501a058ca42d0f29ac56` (== hash recorded by Foundation Worker `20_`) |
| Committed handoff | `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/handoffs/60_COSMILE_TECHNICAL_DESIGN_HANDOFF.md` @ dispatch HEAD `d24c03b0414d070682d39f84aff07613b4da7c57` |
| Evidence commit | `EVIDENCE_COMMIT b632529f2907e19f92f27770eac4208d60d4cb7d` (ancestor of dispatch HEAD; verified). Evidence files byte-identical at HEAD. |
| `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md` | sha256 `f94476c438a89d3499b41029cbb956d5c05d9cf0b8607c664f32b9ae6ed796e7` (== Designer-published) |
| `20_COSMILE_AS_BUILT_AND_REUSE.md` | sha256 `62332fb804f0b9c6ea2352d24d4d900cb61f6e74ec790f9553d43fdf73db8fc4` (== Designer-published) |
| `30_OFFICIAL_PROVIDER_RESEARCH.md` | sha256 `4ccc16eede943b1d5a1f1def6ab15fd2dc09d0df98f356b5c4156550d27ca9d1` (== Designer-published) |
| `40_DESIGNER_EXPERIENCE_DESIGN.md` | sha256 `011d973247b7474b11f62f7d8a957eb4df0fa36e2b876ee6843c4eaad763dc43` (computed this session) |
| Cosmile product workspace | `/home/leo/Project/Cosmile`, branch `shadow/m4-cosmile-memory`, HEAD `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` — re-verified unchanged pre- and post-authoring; working tree = exactly the 6 pre-existing untracked docs |
| Output worktree | `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1`, branch `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717` |
| Governance | Agent Office `TEAM_OPERATING_MODEL.md`, `roles/worker.md`; Cosmile `AGENTS.md`, root `CLAUDE.md`, `app/CLAUDE.md` |

**First-hand code anchors verified this session** (not transcribed): `app/src/lib/checkout.ts` (server
re-price + `completeMockOrder` + `shippingTotal=0`), `app/src/lib/console/adminWrite.ts` `ORDER_TRANSITIONS`
(`refunded` unreachable; `paid→[fulfilled,cancelled]` only), `app/src/types/ontology.ts` `ONTOLOGY_BOUNDARY`,
`app/src/lib/slice/flags.ts` (production fail-closed), `app/prisma/schema.prisma` (models `Order`, `OrderItem`,
`CommerceSku`, `CommerceOffer`, `Coupon`, `CouponRedemption`, `FoundationSignalOutbox`, `ConsoleUser`), the 5
active Postgres migrations. Model-block count by first-hand `grep '^model '` at pinned HEAD = **45** (evidence
`20_` stated "34"; non-material count discrepancy noted for Advisor reconciliation — the structural inventory is
unchanged: commerce spine + console + M4 memory/rec/evidence durability + signal outbox).

---

## 2. Facts / Assumptions / Unknowns (Cosmile-repo-local, design layer)

**Facts (first-hand or pinned-evidence).**
- F1. Checkout is server-authoritative on **price and coupon** (`checkout.ts:27-63,74-86`; `sku.ts resolveUnitPrice`), but reads **stock/salesStatus from the mock catalog view** (`toCosmileView`) — so *price authority (DB) and availability authority (mock catalog) differ today* (a form of the RC-4/C1 split).
- F2. Payment is a status flip with no money movement and **no inventory decrement** (`checkout.ts:124-137`, "실재고 차감 ❌"); no PSP dependency exists in `app/package.json`.
- F3. `CommerceSku.stock` is display-only (`schema.prisma:590`); checkout only *reads* it for a sold-out guard; no reservation/decrement anywhere.
- F4. Customer identity is a single hardcoded `MOCK_USER = demo_user_001` behind a **sound `Owner`/`getShopper` seam** (`mockUser.ts`, `shopper.ts`); owner-scoping exists but is unprovable across distinct real customers.
- F5. `refunded` is an **orphan** `Order.status`: nothing in `ORDER_TRANSITIONS` targets it, and `paid` has no refund transition (`adminWrite.ts:41-47`). Cancellation/refund today = status label only, no money/inventory effect.
- F6. Shipment/tracking/return are **absent** (self-declared `console/settings/page.tsx:18`); `Order` has no payment/PSP, shipment, or refund-truth columns; `Order.id` is `cuid` (mandated customer-facing order number = UUID is unmet — C2).
- F7. Operator console identity is **real** (scrypt + session + RBAC `owner|admin|editor|viewer` + audit before/after irreversible writes) — reusable unchanged (`schema.prisma:255-279`, `console/adminWrite.ts`).
- F8. Foundation verdict is **display-only, fail-closed**; `/api/slice/consult-foundation` returns `products=0` with no mock fallback on failure (`consultationRiskGate.ts`, `consult-foundation/route.ts`). Boundary held.
- F9. `FoundationSignalOutbox` is **producer-only** (no sender), consent-fail-closed, idempotent; WU8 evidence-delivery columns are pure durable representation, delivery flag OFF (`schema.prisma:198-249`).
- F10. Rec-lifecycle / commerce-evidence / M4 memory layers are additive, flag-OFF, **production-forced-OFF** (`slice/flags.ts`), fail-closed; DB invariants live in **raw SQL** in migrations (partial-unique, CHECK, `@@unique`) because Prisma cannot express them.
- F11. Provider research (`30_`) verified from official docs: direct Kakao OIDC and direct Toss Payments V2 are documented and test-capable; **official docs prove interface, not merchant eligibility**.

**Assumptions (reasonable; must be confirmed, do not block this design).**
- A1. Runtime store is Postgres via `DATABASE_URL` (name-only; not opened — secret). `dev.db`/`migrations_legacy_sqlite/` are vestigial.
- A2. Korea/KRW, single representative SKU, quantity-one, full-capture, full-refund, synthetic customer, non-live sandbox (inherits Designer A1).
- A3. Existing server-authoritative cart/repricing, owner-scoped order history, console RBAC/audit, and Foundation display boundary are **reused, not rewritten** (inherits Designer A2).
- A4. The Foundation bounded-delivery design (snapshot form, correction/withdrawal signaling) is authored by the **Foundation Worker**; this design consumes its *consumption boundary* and marks the delivery contract as an external input (Q-D1…Q-D8 in `10_`).

**Unknowns carried (Cosmile-technical; resolve before build, not before design).**
- U1. Runtime `DATABASE_URL` target and its migration state (secret; not inspected).
- U2. Multi-user isolation under real auth (untestable while all logins map to one mock user).
- U3. Whether any `.mjs`/`.dbtest.py` binds `dev.db` at runtime (keeps SQLite artifact DEAD-pending).
- U4. Foundation availability/contract for verdict *and* evidence *intake* at launch (outbox has no consumer).
- U5. `productPitch.ts`/`humanCopy.ts`/`AiVoicePitch` copy provenance must be verified to remain merchandising copy that never asserts a suitability/efficacy/safety verdict (WATCH-B, cosmetic-advertising surface).

---

## 3. Frontend / backend / operations separation and reuse (Output 8, 10)

Three planes, each with a clear authority. The design **keeps the reusable spine and adds at named seams**.

### 3.1 Plane separation

| Plane | Responsibility | Reuse posture |
|---|---|---|
| **Frontend (RSC/App Router)** | render server-authoritative *read projections*; single-submit *commands*; never derive paid/refunded/shipped/eligible from URL/webhook/timer/client cache (Designer §13.1) | reuse PDP/cart/checkout/order-history surfaces; add pending/confirming/recovery states from the Designer state vocabulary (§6) |
| **Backend (Next.js route handlers + `lib/*` services + Prisma/Postgres)** | server-authoritative price/coupon/stock/order/payment/refund/inventory truth; idempotent commands; adapters to external providers | reuse `cart`/`coupon`/`sku`/`checkout`(validation)/`orders`/`console` services; add `auth`/`payment`/`inventory`/`refund`/`reconciliation`/`snapshot` services |
| **Operations (console)** | reconciliation queue, payment/refund/inventory/fulfillment/snapshot/incident panels; owner/admin-gated irreversible actions + audit reason (Designer §9) | reuse `ConsoleUser`/RBAC/`adminWrite`/`ConsoleAuditLog`; add panels bound to the new state machines |

### 3.2 Reusable spine (do not rebuild)

| Component (path) | Label | Design use |
|---|---|---|
| `lib/cart.ts`, `lib/wishlist.ts` | REUSABLE_UNCHANGED | owner-scoped persistence, guest→user merge, snapshot pricing |
| `lib/coupon.ts` | REUSABLE_UNCHANGED | server validate/price, no stacking, limits — re-validated at order creation |
| `lib/sku.ts` `resolveUnitPrice` | REUSABLE_UNCHANGED | **the single price authority** to unify PDP onto (C1) |
| `lib/checkout.ts` validation | REUSABLE_WITH_CORRECTION | re-price/re-coupon kept; payment/inventory steps become real at the seam |
| `api/orders/*`, `Order`/`OrderItem` | REUSABLE_WITH_CORRECTION | owner-scoped + line snapshots kept; add `order_no`, lifecycle, payment/refund/shipment refs |
| `lib/console/*` (guard/adminWrite/audit/session/password) | REUSABLE_UNCHANGED | real auth + RBAC + audit for all operator irreversible actions |
| `adapters/foundationClient.ts`, `lib/foundation/consultationRiskGate.ts` | REUSABLE_UNCHANGED | fail-closed verdict *consumer* seam; no fabrication |
| `lib/commerceEventService.ts` + event schema (cev-1.0) | REUSABLE_UNCHANGED | canonical AX event ledger for every state transition |
| `lib/foundationSignalMapper.ts` + `FoundationSignalOutbox` | PARTIAL (keep) | producer-only, consent-gated; unchanged by O1 |
| `lib/shopper.ts` `Owner`/`getShopper` | REUSABLE_WITH_CORRECTION | seam sound; identity *source* moves off mock (RC-1) |

---

## 4. Exact API / service / adapter boundaries and future write-ownership (Output 8, 11)

### 4.1 Adapter boundaries (external-facing seams)

- **Customer-auth adapter** `lib/auth/*` (new): provider-neutral OIDC port; produces a verified internal principal; feeds `getShopper()`. Operator auth stays a **separate hardened boundary** (`lib/console/*`) — never unified with customer social login.
- **PSP adapter** `lib/payment/*` (new): port with operations `createIntent`, `confirmCapture`, `getStatus`, `cancelOrRefund`; bound at the existing `purchaseBackend()`/`slice/container` seam and invoked from the order-completion step. `foundationClient`-style shape: the adapter echoes provider truth; the domain never trusts client/webhook.
- **Foundation snapshot-consumption adapter** `lib/foundation/snapshot*` (new): reads an **approved local snapshot** (copy/export/read-only per Foundation Worker Q-D1); Cosmile-side only, authoring canonical facts remains forbidden.
- **Webhook ingress** `app/api/webhooks/psp/route.ts` (new): verifies/records raw event to an inbox, then triggers a **server-side pull-verify**; it never mutates money state directly.

### 4.2 Future repository/file write-ownership (proposal; the implementation allowlist a later handoff would name)

| Area | Files/dirs that **own writes** (future) | Posture |
|---|---|---|
| Customer identity/session | `lib/auth/*` (new), `lib/shopper.ts` (correct source) | ADD at seam (RC-1) |
| Payment | `lib/payment/*` (new), `app/api/webhooks/psp/route.ts` (new), `lib/checkout.ts` completion (correct) | ADD at seam (RC-2) |
| Inventory control | `lib/inventory/*` (new), `lib/checkout.ts` reserve step (correct) | ADD at seam (RC-3) |
| Refund/cancellation effect | `lib/refund/*` (new), `app/api/admin/orders/[orderId]/*` (extend), `lib/console/adminWrite.ts` transitions (correct) | ADD + correct (RC-2/F5) |
| Catalog/single-price authority | `lib/foundationProductClient.ts` (swap source), PDP `products/[id]/page.tsx` (read `resolveUnitPrice`) | CORRECT (RC-4/C1) |
| Snapshot consumption | `lib/foundation/snapshot*` (new), `lib/sku.ts` binding read | ADD (Cosmile side of §11) |
| Reconciliation/incident | `lib/reconciliation/*` (new), console panels | ADD |
| Schema | `app/prisma/schema.prisma` + new migration dirs | ADD (additive, §10) |
| **Unchanged (must NOT be rewritten)** | `lib/cart.ts`, `lib/coupon.ts`, `lib/sku.ts` core, `lib/console/*`, `adapters/foundationClient.ts`, `lib/foundation/consultationRiskGate.ts`, `lib/commerceEventService.ts`, `lib/foundationSignalMapper.ts`, `ontology.ts` | REUSE |

**Ownership invariant.** Every new write path lands in a Cosmile-owned entity per `ONTOLOGY_BOUNDARY`
(`order`/`refund`/`cart`/`product_commerce` = `own`). No new path writes a Foundation `reference`/`display`
entity or a SIASIU `forbidden` entity. `canCosmileOwn()` is the design-time gate.

---

## 5. The four bounded replacement candidates (Output 8; handoff bullet 3)

Only components whose contract fails a real KR golden-commerce path such that **in-place repair is
insufficient**. Each is **bounded to an existing seam — none is a rewrite.** (Absent-by-design gaps such as
shipment/tracking are *additions*, recorded in §6/§10, not replacements — recording them here would overstate
what exists.)

### RC-1 — Customer authentication & identity source
- **Component / evidence:** `lib/mockUser.ts` `MOCK_USER` + logged-in default `shopper.ts:15`; single `demo_user_001`; comment "Day 3에 실제 세션으로 교체" (`20_ §10`, F4).
- **Failed invariant:** cannot represent distinct real customers; per-owner isolation unprovable (U2); no credential/session/consent-subject binding to a real principal.
- **Impact:** blocks real accounts, order-history integrity, consent attribution, `SubjectRefMap` mint from a real principal.
- **Bounded alternative:** introduce a provider-neutral OIDC adapter **behind the existing `Owner`/`getShopper` seam** (§8); `Owner`, owner-scoping, and guest→user merge are reused unchanged.
- **Migration consequence:** `SubjectRefMap`/`ConsentRecord` mint keys off the real principal; existing rows are mock-user dev data (backfill = none; treat as disposable dev data, §10).
- **Why repair insufficient:** there is no credential/session logic to repair — a placeholder constant; a provider must be *introduced*.

### RC-2 — Payment completion (and the refund/cancellation effect)
- **Component / evidence:** `checkout.completeMockOrder` (`checkout.ts:124-137`), `groupBuy.completeGroupBuyOrder`; status flip, no PSP dep; plus the unreachable `refunded` transition (F5).
- **Failed invariant:** no money movement, authorization/capture, PSP idempotency, or reconciliation; no reversible refund with money+inventory effect.
- **Impact:** no real revenue; cancellation/refund cannot reverse funds; Golden Reversal impossible.
- **Bounded alternative:** PSP adapter at the `purchaseBackend`/`slice/container` seam invoked from order completion; `createPendingOrder` + server re-pricing are reused (§9). Refund becomes a real state machine (§6) replacing the label-only transition.
- **Migration consequence:** add `PaymentIntent`/`PaymentTransaction`/`Refund`/`WebhookEventInbox`; extend `Order` lifecycle and status history (§10).
- **Why repair insufficient:** the mock performs no payment logic to correct; integration must be added.

### RC-3 — Inventory control semantics
- **Component / evidence:** `CommerceSku.stock` display-only (`schema.prisma:590`), read-only sold-out guard (`checkout.ts:38`) (F3).
- **Failed invariant:** no reservation/decrement/oversell protection; concurrent checkout can oversell; "참여 ≠ 재고예약".
- **Impact:** cannot guarantee availability (last-item), cannot restock on refund.
- **Bounded alternative:** an inventory-control service (reserve at checkout-start, commit at capture, release at cancel/timeout) at the checkout seam; `stock` and the read-guard become inputs (§6, §7).
- **Migration consequence:** add `InventoryReservation` + a default-deny oversell guard (raw-SQL invariant); no change to catalog display.
- **Why repair insufficient:** the field is intentionally inert; reservation behavior does not exist to repair.

### RC-4 — Catalog / commerce-data authority (single source of price)
- **Component / evidence:** mock catalog behind `foundationProductClient` + `toCosmileView`; DB seeded *from* mock (`sku.ts:77-142`); PDP price = mock `view.price` while checkout charges `resolveUnitPrice` (F1) → **displayed ≠ charged** risk.
- **Failed invariant:** two price authorities can diverge; catalog is a hardcoded 28-item demo, not a commercial KR catalog.
- **Impact:** price-integrity / consumer-trust risk; cannot launch a real assortment.
- **Bounded alternative:** (a) unify PDP onto the checkout price authority (`resolveUnitPrice`) — C1; (b) replace the mock catalog *read source* with the approved Foundation snapshot at the client seam (§11). Impl-only swap; the seam already exists.
- **Migration consequence:** stop seeding commerce data from mock; define commercial catalog load; reconcile `CommerceSku`/`Offer` provenance to the snapshot binding.
- **Why repair insufficient:** the mock arrays are not a maintainable catalog and cannot be "corrected" into one; the read source must change.

---

## 6. Commerce state model mapped to the Designer experience contract (Output 8; handoff bullet 4)

The Cosmile authoritative state lives in **money/inventory truth tables**, not in a single `Order.status`
label. Each internal machine projects into the Designer experience vocabulary (`40_ §3`). Labels below are
**design proposals**, not a fixed DB enum, and never a transaction order.

### 6.1 Internal machines (Cosmile-owned)

- **PaymentIntent:** `created → action_required → authorizing → captured` · `→ failed` · `→ expired`.
- **PaymentTransaction (immutable rows):** `authorize | capture | cancel | refund`, each carrying provider ref + provider status + idempotency key.
- **InventoryReservation:** `reserved → committed` · `reserved → released|expired`. `committed` only on verified capture; `released` only when payment is conclusively **non-captured**.
- **Order (extended lifecycle):** `pending → awaiting_payment → confirmed(paid+captured) → fulfilling → shipped → delivered`; plus `cancelled`, and a **reachable** `refunded` (money+internal reconciled). `Order.status` is a *projection*; money truth = `PaymentTransaction`.
- **Refund:** `requested → confirming(provider_sent) → provider_confirmed → refunded(reconciled)` · `→ failed`.
- **Fulfillment/Shipment (record-only in O1):** `pending → preparing → shipped → delivered`; no courier integration, no fabricated tracking.
- **Reconciliation task:** `open → in_progress → resolved`. **Incident:** `open → contained → recovering → closed`.

### 6.2 Internal → experience-state projection (the contract the frontend consumes)

| Internal condition | Designer experience state (`40_ §3`) | Customer copy source (`40_ §14`) |
|---|---|---|
| snapshot current + gates pass + reservation available | `AVAILABLE` | catalog/PDP |
| cart re-priced/revalidated | `CHECKOUT_REVIEW` | checkout review |
| price changed on revalidation | `CHECKOUT_REVIEW` + `price_reconfirmation_required` | "가격이 변경되어…" |
| reservation lost before capture | `ACTION_REQUIRED` (return to cart) | "재고가 변경되어 결제를 시작하지 않았습니다" |
| PaymentIntent action_required | `PAYMENT_ACTION_REQUIRED` | payment handoff |
| return/webhook received, not server-verified | `PAYMENT_CONFIRMING` | "결제 결과를 확인하고 있습니다. 다시 결제하지 마세요." |
| capture verified + reservation committed + order bound | `ORDER_CONFIRMED` | "주문이 확인되었습니다" |
| capture verified, internal bind/update failed | `PAYMENT_CONFIRMING`→ contained; operator `CAPTURED_INTERNAL_PENDING` | "결제는 확인되었으며 주문 확정 중입니다." |
| confirmed, no shipment record | `FULFILLMENT_PENDING` | "배송 준비 상태를 확인 중입니다." |
| verified shipment record | `SHIPPED` / `DELIVERED` | verified tracking only |
| cancellation requested, not effected | `CANCELLATION_REQUESTED` | "취소 요청을 받았습니다…" |
| refund requested / provider sent / internal lag | `REFUND_CONFIRMING` | "환불 처리 상태를 확인하고 있습니다." / "환불은 확인되었으며 주문 상태를 업데이트…" |
| provider refund + internal reconciled | `REFUNDED` | refund summary (no posting-time promise) |
| reversible surface down | `TEMPORARILY_UNAVAILABLE` | last verified state + retry |
| gate/policy/incident cannot safely continue | `HOLD` | safe explanation + support ref |

Every state response carries: customer-safe state, last-verified update time, refresh-safety, whether a new
irreversible action is allowed, one next action, and a support reference (Designer §3). The **experience
vocabulary is the Designer's**; this table only binds Cosmile's authoritative state to it.

---

## 7. Transaction/compensation order, last-item concurrency, idempotency (Output 15; handoff bullet 5)

**Governing rule (Designer §2.1, §17.5):** never charge before the approved availability boundary is secured;
money truth is server-confirmed, never inferred.

### 7.1 Golden Order — safe ordering

1. **CHECKOUT_REVIEW:** re-price (`resolveUnitPrice`), re-validate coupon, read availability. *(reuse)*
2. **Secure availability (the boundary):** create `InventoryReservation(reserved)` with TTL via a **default-deny atomic guard** so `reserved+committed ≤ stock` can never be violated (raw-SQL CHECK / conditional update — §10). Last-item contention resolves deterministically: exactly one reservation wins; the loser returns to cart with no charge (`C11`).
3. **Create one `PaymentIntent`** bound to expected `{order_no, amount, currency=KRW}` with a client-supplied idempotency key; repeated submits reuse the same intent (single-submit, Designer §13.2).
4. **Provider handoff;** customer completes the official sandbox flow.
5. **Merchant-initiated capture (money moves here):** on return/webhook, the server **pull-verifies** provider state and **re-checks the reservation is still valid**, then calls `confirmCapture`. If the reservation is lost, do **not** capture; return to cart; no charge.
6. **Commit (one DB transaction, idempotent):** reservation `reserved→committed`, `Order→confirmed`, write `PaymentTransaction(capture)`, append `OrderStatusHistory`, emit `CommerceEvent`, lazily mint `purchaseItemRef`. Uniqueness guarantees **one capture per order**.
7. **Fulfillment-pending record only** (no fabricated shipment).

### 7.2 Compensation / failure edges

| Edge | Compensation | Never |
|---|---|---|
| provider conclusively non-captured | release reservation; `PAYMENT_ACTION_REQUIRED` retry if safe | release before provider state is conclusive (would risk oversell if it actually captured) |
| timeout / unknown | `PAYMENT_CONFIRMING`; poll+verify; reservation held | immediate re-charge |
| capture verified, step-6 internal fails | keep captured truth; open reconciliation; operator resumes bind (`O05`) | re-charge; tell customer "failed" |
| duplicate/replayed webhook | inbox `providerEventId @unique` → `DUPLICATE_IGNORED` | second order/charge/stock effect |
| out-of-order event | monotonic guard; quarantine/reconcile | state regression |
| missing event past threshold | reconciliation detector scans `confirming` intents → verify | silent drop |
| restart mid-flow | recover from durable truth + order history (`C25`) | reset to initial |

### 7.3 Golden Reversal — safe ordering

Start from a server-confirmed **captured** payment (a pre-approval void does not qualify, Designer §5).
`Refund.requested` → authorized operator initiates **one** full refund with an idempotency key →
`REFUND_CONFIRMING` → **pull-verify** provider refund → `provider_confirmed` → internal order update →
`refunded(reconciled)`. Duplicate request → **no second refund** (`Refund` idempotency + one-active-refund
partial-unique). Inventory disposition is **independent** and stays `HOLD` unless an approved return/restock
policy supplies a disposition (Designer §5.7).

---

## 8. Customer-auth adapter and provider options (Output 13; handoff bullet 6)

- **Shape:** provider-neutral **OIDC port** at `lib/auth/*`, producing a verified principal consumed by `getShopper()`. Stable binding is **immutable `(issuer, subject)` → internal customer id**; email/name are display claims, **never** identity keys (`30_ A`).
- **Provisional default:** **direct Kakao OIDC** — Korea-fit, standards-based, one fewer intermediary (`30_`). Keep the adapter OIDC-shaped so a later approved broker (Cognito/Auth0, `30_ B/C`) can replace it without touching the commerce domain. **This is not selection** — Leo approves after eligibility/consent gates.
- **Verify:** issuer, audience, signature, expiry, `nonce`, PKCE (`30_ A`). Request **minimum claims**.
- **Separation:** operator/admin identity stays a distinct hardened boundary (`lib/console/*`), not equated to customer social login.
- **Unresolved gates (carried, not decided):** Kakao app eligibility, consent items, review requirements, non-production account setup, data-retention duties; provider unlink/revocation, local session termination, **account collision, and account recovery** need explicit state + operator handling; whether a second login method precedes Paid Beta.
- **Login states (map to Designer §7.1):** `redirecting → provider_action → callback_verifying → session_active`; plus `session_expired`, `account_collision/manual_recovery`, `provider_unavailable`, `HOLD`. Callback copy discloses no token/signature detail; recovery preserves the guest cart and returns to the originating safe screen; session expiry during PSP redirect never loses the order (recovered from order history).

---

## 9. PSP adapter and provider options (Output 14; handoff bullet 7)

- **Shape:** PSP port `lib/payment/*` = `createIntent`, `confirmCapture`, `getStatus`, `cancelOrRefund`; bound at `purchaseBackend`/`slice/container`; invoked from checkout completion (§7).
- **Provisional default:** **direct Toss Payments V2** — one boundary is simplest for a single KRW card-payment + captured-refund rehearsal; official docs cover test keys, KRW, approval, cancellation, idempotency, webhook retry (`30_ A`). **Alternative:** **PortOne V2** over an underlying PG — choose only if Leo values near-term multi-PG portability enough to accept the extra orchestration/reconciliation boundary (`30_ B`). **Neither is finally selected.**
- **Server verification (mandatory):** on every return/webhook, retrieve provider state via the authenticated server API and **bind expected `{merchant order_no, amount, KRW currency, paymentKey/txn, current internal state}`** before any commerce transition (`30_ A`).
- **Webhook = untrusted notification, not sole truth:** Toss `PAYMENT_STATUS_CHANGED` has **no documented signature** and retries up to 7×; IP allowlisting is defense-in-depth only (`30_ A`). Therefore: record raw event to `WebhookEventInbox` (idempotent on `providerEventId`), then **pull-verify**; never mutate money state from the webhook payload alone.
- **Idempotency / replay / out-of-order / recovery:** unique provider + internal idempotency keys; persist raw-event digest + category-safe audit; duplicate → `DUPLICATE_IGNORED`; out-of-order → monotonic guard; missing → reconciliation detector; restart → resume from durable truth (§7.2).
- **Golden Reversal:** cancellation/refund of an **approved/captured** sandbox payment; a pre-approval void alone does not close it (`30_ A`; Designer §5).

---

## 10. Database schema and migration plan — design only (Output 12; handoff bullet 8)

**Design only. No DDL is authored, applied, or run here.** All additions follow the repo's proven discipline:
**additive + nullable**, invariants in **raw SQL**, `up.sql` + `down.sql` per migration, disposable-test on an
ephemeral Postgres (`*.dbtest.py` rehearsal pattern), legacy SQLite untouched.

### 10.1 New persistent truth (proposed entities; Cosmile-owned)

| Entity | Purpose | Key invariant (raw SQL) |
|---|---|---|
| `CustomerAccount`, `AuthIdentity`, `CustomerSession` | real customer identity behind `Owner` seam (RC-1) | `AuthIdentity @@unique(issuer, subject)`; session `tokenHash @unique` |
| `PaymentIntent` | one intent per checkout attempt (RC-2) | `idempotencyKey @unique`; `expectedAmount/currency` bound |
| `PaymentTransaction` | immutable authorize/capture/cancel/refund rows (RC-2) | `providerTxnRef @unique`; **one succeeded capture per order** (partial-unique WHERE type='capture' AND status='succeeded') |
| `Refund` | reversal truth (RC-2/F5) | `idempotencyKey @unique`; **one active refund per capture** (partial-unique) |
| `InventoryReservation` | reserve/commit/release (RC-3) | default-deny oversell CHECK: `reserved+committed ≤ stock` |
| `WebhookEventInbox` | untrusted event ledger (§9) | `providerEventId @unique` (replay idempotency) |
| `OrderStatusHistory` | auditable lifecycle timeline | append-only |
| `ReconciliationTask`, `Incident` | operator recovery (Designer §9) | category-only; no PII/secret columns |
| `FoundationProductSnapshot`, `SkuBinding` | approved local snapshot + `foundation_product_id ↔ cosmile_sku_id` (§11) | binding `@@unique(cosmileSkuId)`; snapshot pinned by `{vaultCommit, productTreeHash, dataVersion, formulaVersion}` |

### 10.2 Extensions to existing tables (additive)

- `Order`: add `order_no` (opaque UUID/ULID public reference, `@unique`) resolving **C2**; keep `id=cuid` internal. Add nullable refs to payment/refund/fulfillment/snapshot (or via relations). Extend lifecycle projection; the **money truth stays in `PaymentTransaction`**, not `Order.status`.
- `OrderItem`: already carries line snapshots + `purchaseItemRef @unique`; add nullable `foundationSnapshotRef` so **each order line is immutably bound to the snapshot it was sold under** (§11), independent of later catalog correction.
- `CommerceSku`: no schema change to `stock` semantics; reservation lives in `InventoryReservation` (keeps `stock` display-compatible; the oversell guard reads both).
- `adminWrite.ts` `ORDER_TRANSITIONS`: correct so `refunded` is **reachable** only via the `Refund` machine (not a bare label), and cancellation carries a real effect — closing F5.

### 10.3 Compatibility, backfill, rollback, disposable-test

- **Additive-only:** no destructive change to `Cart`/`Order`/`OrderItem`/`Coupon`/`CommerceSku`; the mock path keeps working with new features **flag-OFF** (mirrors `slice/flags.ts` production-forced-OFF).
- **Backfill:** `Order.order_no` minted for existing rows in a data migration (idempotent); mock-user identity rows are disposable dev data (no production backfill).
- **Rollback:** every migration ships `down.sql` dropping new tables/columns; because additions are nullable/flagged, rollback restores the prior working mock path.
- **Disposable-test:** rehearse each migration up+down on an **ephemeral fresh Postgres** (existing `*.dbtest.py` + "ephemeral fresh deploy rehearsal" precedent, `20_ §7`) before any shared-DB proposal. **No shared/protected DB write is proposed by this design** — schema application is a later, separately authorized step.
- **Invariant placement:** unique/partial-unique/CHECK live in migration SQL (Prisma cannot express them), consistent with `RecOutcomeEvent`/`LongTermMemoryFact`/`CommerceEvidenceRecord`/`FoundationSignalOutbox` (`20_ §7`); the design must not move them into app-only checks.

---

## 11. Foundation local snapshot / mapping consumption boundary (Output 9; handoff bullet 9)

Cosmile consumes an **approved, versioned local snapshot**; it does not synchronously call Foundation for
commerce and does not author canonical facts.

- **Binding:** `SkuBinding{ cosmile_sku_id, foundation_product_id, foundation_variant_key?, foundation_snapshot{ vault_commit, product_tree_hash, data_version, formula_version }, bound_at }` — the shape proposed by the Foundation Worker (`10_ §11`), **owned/stored by Cosmile**.
- **Version anchor (Cosmile-side answer to Q-D2):** `{vault_commit + product_tree_hash + data_version + formula_version}` is accepted as the snapshot pin (object-level, already available).
- **Order-line binding:** each `OrderItem` records the snapshot it was sold under (`foundationSnapshotRef`, §10.2). **Historical order lines never rewrite** when the catalog is later corrected/withdrawn (Advisor contract; Designer §8, §12).
- **Snapshot lifecycle behavior** (Cosmile projection; consumes Foundation delivery, maps to Designer §12):

| Snapshot condition | Catalog/PDP | Cart/checkout | Existing order | Operator |
|---|---|---|---|---|
| `CURRENT_APPROVED` | display gated fields | revalidate local binding | retain exact line snapshot | normal |
| Foundation runtime down, local snapshot approved | **ordinary commerce continues**; suitability `UNKNOWN` | continues from local truth | unaffected | outage visible; no synchronous fallback |
| `STALE_LAST_APPROVED` | last-approved only if policy permits, else affected-item HOLD | require current local decision | historical retained | warning + age/version; **stale threshold = Leo decision** |
| `MISSING_INITIAL` | affected product not exposed | cannot add/pay affected line | history preserved | mapping/snapshot task |
| `CORRECTED/SUPERSEDED` | new approved snapshot | cart highlights change + reconfirm | **historical order unchanged** | diff/version/effective time |
| `WITHDRAWN` | listing unavailable | block affected line | history/support/refund remain usable | affected inventory/listings contained |

- **Correction/withdrawal signaling (Q-D3):** today only `status` + git history exist; Cosmile consumes a **cadence-based / pulled** snapshot refresh (never a synchronous runtime dependency). The exact delivery mechanism is the **Foundation Worker's** bounded-delivery design; Cosmile owns only the consumption/containment side. **Control must validate** the binding and unavailability contract (§16).
- **Deferred to owners (not decided here):** review-gate flip (Q-D4), locale scope ko-only (Q-D5), imagery pipeline (Q-D6), rights-gate record location (Q-D7), `sales_status` enum normalization owner (Q-D8), and **commercial-use-rights R1–R6** — all remain external gates; no public sale/display beyond an approved minimal internal fixture until each is recorded.

---

## 12. Security, privacy, audit, incident invariants (Output 17; handoff bullet 10)

Inherits `app/CLAUDE.md` security rules and `docs/security/*`. Cosmile-technical invariants:

- **Price/stock server-authoritative:** the client price is never trusted; checkout re-derives price (`resolveUnitPrice`) and re-checks availability (reservation) — extend, don't weaken.
- **Opaque customer-facing order number:** `order_no` (UUID/ULID) distinct from internal `id`; customers read **only their own** orders (`where userId`/owner-scope), preserved from the existing pattern.
- **Money/refund truth is server-confirmed:** never inferred from redirect/webhook/timer/client (Designer §13.1); webhook payloads are untrusted (§9).
- **Secret/PII minimization:** OIDC minimum claims; Foundation receives only minimized, consent-gated, **opaque-ref** signals (`furef_…`), never raw customer/order identity (`foundationSignalMapper` unchanged). Verification/evidence output is **boolean/count/status/category only** — no raw secrets, hashes, PII, customer/order/payment/provider IDs, or full payloads (`app/CLAUDE.md`).
- **Consent purpose-separation:** login, storefront privacy/terms, order/payment, marketing, and Foundation-consultation consent are distinct purposes, unbundled, unselected by default; refusal of consultation/marketing does not block ordinary commerce unless an approved Legal rule requires it (Designer §7.3).
- **Operator irreversible actions:** owner/admin only, require an **audit reason** + `writeAdminAudit` before/after; viewer/editor gain no refund/order/stock/incident mutation authority (reuse `console/adminWrite.ts`); step-up/dual-approval for refund/stock correction is a **Leo decision**.
- **Incident containment:** category/count/timestamps/containment only; affected-item containment blocks only the affected SKU; unrelated commerce, history, support, and refunds stay usable (Designer §11).

---

## 13. Sandbox acceptance — Golden Order and separate Golden Reversal (Output 18; handoff bullet 11)

Under the **`SANDBOX_WALKING_SKELETON_EVIDENCE`** ceiling; **no automatic progression**.

- **Declared environment:** official provider **sandbox/test** only; live mode impossible; synthetic customer + authorized sandbox operator; representative `elt-serum-vitayouth-01` with a pinned snapshot + Cosmile SKU binding, Cosmile-authoritative KRW test price/stock. If rights/MFDS/imagery are unresolved, use a **restricted text-only internal fixture** and record `NOT_LIVE_SALE_EVIDENCE` (Designer §16.1).
- **Golden Order (run GO-1):** sign-in + guest-merge → PDP (no fabricated image/suitability) → add qty 1 → checkout revalidates price/stock/consent + **reserves** → one sandbox payment intent → provider capture → **server-verify + bind order/amount/KRW** → commit order+inventory → `ORDER_CONFIRMED` in customer history + matching operator timeline → fulfillment-pending record only → **replay the same confirmation once → `DUPLICATE_IGNORED`, zero second effect** (Designer §16.2).
- **Golden Reversal (separate run GR-1):** distinct order with a **confirmed captured** payment → operator full refund → `REFUND_CONFIRMING` → provider sandbox reversal once → **server-verify** → internal update → close only when provider refund + order history + audit + operator views agree; **repeat request → zero second refund**; inventory stays `HOLD` unless approved policy supplies a disposition (Designer §16.3).
- **Evidence package (category/status/count/time + masked refs only):** per-state screen captures, declared env/mode, product/snapshot/SKU/price/policy versions, ordered category-only timeline, provider dashboard/API status with keys/refs/PII masked, one-capture/one-refund idempotency proof, inventory before/after/disposition, explicit no-live/no-rights/no-MFDS/no-shipping/no-load/no-production claims (Designer §16.4). Proves **one** synthetic KRW path + **one** captured reversal; proves nothing about production/eligibility/compliance/rights/scale; never auto-unlocks implementation or a next mission.

---

## 14. Implementation WorkUnits, parallelization, estimates, gates (Output 19, 20, 23; handoff bullet 12)

**Non-executable proposal.** No WorkUnit is authorized; each starts only from a future exact Advisor handoff
after Leo's scope freeze.

| WU | Scope | Depends on | Parallel? | Est. (design-level, ±) | Confidence |
|---|---|---|---|---|---|
| **WU-0** | additive schema baseline + disposable-test (up/down on ephemeral PG) | — | first | 2–3 d | med-high |
| **WU-A** | customer OIDC adapter + account/session/identity (RC-1) behind `Owner` seam | WU-0; Leo identity decision; Kakao eligibility | ∥ with C, D | 4–6 d | med (external gates) |
| **WU-B** | PSP payment: intent/transaction/refund + Toss adapter + server-verify + webhook inbox (RC-2) | WU-0, WU-C contract; Leo PSP decision; merchant/test-channel | after C contract | 6–9 d | med (external gates) |
| **WU-C** | inventory control: reserve/commit/release + oversell guard (RC-3) | WU-0 | ∥ with A, D | 3–5 d | high |
| **WU-D** | catalog/single-price unification (C1) + snapshot-consumption tables (RC-4/§11) | WU-0; Foundation bounded-delivery design | ∥ with A, C | 3–5 d | med (Foundation dep) |
| **WU-E** | order lifecycle + `order_no` + status history + reconciliation/incident + console panels | A–D contracts | after A–D | 5–8 d | med |
| **WU-F** | Golden Order sandbox harness + evidence | A, B, C, E | late | 2–4 d | med |
| **WU-G** | Golden Reversal sandbox harness + evidence | B (capture), refund, E | last | 2–3 d | med |

- **Safe parallelization:** WU-0 first (unblocks all); then **A ∥ C ∥ D**; **B** after C's reservation contract; **E** after A–D contracts; **F/G** last. Critical path ≈ **WU-0 → WU-C → WU-B → WU-E → WU-F/G**.
- **Rough aggregate:** ~4–6 focused engineering weeks of *implementation* (design-level estimate, **not a commitment**), dominated by payment correctness + reconciliation, and **gated** by external calendar items below.
- **External calendar gates (non-engineering; can dominate wall-clock):** PSP merchant eligibility + test-channel provisioning; Kakao app review/eligibility + consent items; Legal/MFDS/rights/refund-policy decisions; Postgres/hosting + migration-state confirmation. **Official docs prove interface, not approval** (`30_`).
- **Rollback / HOLD conditions:** any live credential/mode, real PII, real payment method, unapproved public exposure, missing capture/refund capability, unresolved oversell risk, Foundation snapshot-authority ambiguity, or a role/ownership/boundary conflict → **HOLD, no transaction** (Designer §16.1; mission §11).

---

## 15. Reviewed implementation-scope proposal — non-executable (Output 25)

For the narrow O1 rehearsal only, pending Leo's explicit scope freeze and a new exact Advisor handoff:

- **In scope:** WU-0…WU-G above; four bounded replacements at named seams; additive schema; Toss V2 + Kakao OIDC **as provisional adapters** (selection deferred); one representative SKU (`elt-serum-vitayouth-01`); pad-80 boundary only if product↔SKU cardinality is exercised; sunscreen only if Leo affirms the MFDS/Legal boundary need.
- **Explicitly out of scope (unchanged exclusions):** Foundation AI, SIASIU AI, Memory V3, retrieval redesign, recommendation UI, B2B2C, influencer, advanced dashboard, AI pricing/CRM, US/USD implementation, Public Launch, **full rewrite**. Real shipping/courier is **record-only** in O1 (no integration).
- **Grants no authority:** review of this design authorizes nothing; implementation requires Leo's freeze + a new handoff (mission §Phase 10, Designer §19).

---

## 16. Unresolved decisions and external confirmations (Output 21, 22)

**Cosmile-technical decisions for Leo (concise; no silent selection):**
1. **Customer identity** — direct Kakao OIDC (recommended, adapter-shaped) vs brokered OIDC vs later multi-method; confirm eligibility/consent first.
2. **PSP** — direct Toss V2 (recommended for one narrow KRW path) vs PortOne V2 + PG; vendor confirmation required.
3. **Guest checkout** — allow vs require login vs conditional (O1 uses one synthetic logged-in account).
4. **Order-number scheme** — UUID vs ULID for `order_no` (both opaque; ULID sorts by time).
5. **Operator control** — keep owner/admin baseline vs add step-up/dual approval for refund/stock correction.
6. **Stale-snapshot threshold + approval owner** — outage alone continues last-approved; explicit withdrawal contains the SKU.

**External confirmations required (not Cosmile's to decide):** merchant/legal entity + signatory; PSP/PG eligibility + KYC + test channel + fees + settlement + refund limits + supported methods; Kakao app eligibility + consent + review; customer data-processing / cross-border / retention / privacy-notice language; commercial-use-rights R1–R6; MFDS functional display obligations + report numbers; product copy/image rights; courier/tracking + notification channel + support SLA + named reconciliation/incident owners; Postgres/hosting + migration state.

**Targeted Control validation requested (Advisor to route, mission §Phase 6):** `foundation_product_id ↔ cosmile_sku_id` contract; canonical vs commerce ownership at the order line; Foundation-unavailability behavior; transaction/compensation boundary; the "historical order line immutable under snapshot correction" invariant.

---

## 17. Explicit No-Build record and zero-write attestation (Output 26)

- **No** product-repository file, code, schema, migration, DB, runtime, test, endpoint, secret, provider account, transaction, KYC, contract, merchant activation, or live flag was created, applied, or run.
- **No** repository-local architecture was *implemented*; every table/adapter/state machine above is **design only**.
- **No** provider was finally selected; **no** Legal/MFDS/rights/refund/tax/fulfillment/identity/topology/credential/live decision was made; **no** risk accepted; **no** general rewrite proposed.
- **No** agent/subagent/delegated context was used; all reads were first-hand.
- **Cosmile product repo** `/home/leo/Project/Cosmile`: HEAD `b8b61d746e…` re-verified unchanged; working tree = exactly the 6 pre-existing untracked docs; **zero tracked or new writes**.
- **Durable output** = exactly this result file + its pointer at the handoff-named paths in the foundation-docs mission run (commit/push **not** in this handoff's scope — left to the Advisor, per the sibling `10_/20_/40_` precedent).

```text
FRONTEND_BACKEND_OPS_SEPARATION: DONE (§3)
API_SERVICE_ADAPTER_BOUNDARIES_AND_WRITE_OWNERSHIP: DONE (§4)
FOUR_BOUNDED_REPLACEMENTS_ONLY: DONE (§5 RC-1..RC-4; no rewrite)
COMMERCE_STATE_MODEL_MAPPED_TO_EXPERIENCE: DONE (§6)
SAFE_CONCURRENCY_AND_COMPENSATION_ORDER: DONE (§7; charge only after availability secured)
CUSTOMER_AUTH_ADAPTER_PROVIDER_NEUTRAL: DONE (§8; Kakao OIDC provisional)
PSP_ADAPTER_TOSS_V2_PROVISIONAL_PORTONE_ALT: DONE (§9; webhook=notification, server-verify, idempotent)
DB_AND_MIGRATION_PLAN_DESIGN_ONLY: DONE (§10; additive, unique constraints, backfill, rollback, disposable-test)
FOUNDATION_SNAPSHOT_CONSUMPTION_BOUNDARY: DONE (§11; order-line immutable; async not synchronous)
SECURITY_PRIVACY_AUDIT_INCIDENT_INVARIANTS: DONE (§12)
SANDBOX_GOLDEN_ORDER_AND_REVERSAL_ACCEPTANCE: DONE (§13; ceiling; no auto-progression)
IMPLEMENTATION_WORKUNITS_AND_SCOPE_PROPOSAL: DONE (§14-15; non-executable)
REPRESENTATIVE_SKU: elt-serum-vitayouth-01
BOUNDARY_SKUS: elt-pad-vitayouth-01 (80-count) · elt-sunscreen-vitayouth-01 (conditional)
AUTHENTICATION_RECOMMENDATION: DIRECT_KAKAO_OIDC_PROVISIONAL_PENDING_LEO_AND_PROVIDER_GATES
PSP_RECOMMENDATION: DIRECT_TOSS_PAYMENTS_V2_PROVISIONAL_PENDING_LEO_AND_VENDOR_GATES
INVENTORY_AUTHORITY_RECOMMENDATION: COSMILE_RESERVATION_WITH_DEFAULT_DENY_OVERSELL_GUARD
FULFILLMENT_RECOMMENDATION: RECORD_ONLY_IN_O1 (no courier integration)
LEO_SCOPE_FREEZE_REQUIRED: YES
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
NO_NEW_AGENT_OR_SUBAGENT: TRUE
IMPLEMENTATION_AUTHORIZED: NO
RETURN_TO: foundation-advisor
STOP
```
