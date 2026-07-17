# 20 — COSMILE AS-BUILT AND REUSE ASSESSMENT

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID:  O1-P1-COSMILE-AS-BUILT
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODE:         READ_ONLY_FACT_VERIFICATION_AND_REUSE_ASSESSMENT
RETURN_TO:    foundation-advisor
STATUS:       COMPLETE · read-only · zero product-repo writes
IMPLEMENTATION_AUTHORIZED: NO   ·  MISSION_SCOPE_FREEZE: ACTIVE
```

> Scope discipline. This is a **fact/reuse assessment only**. It does **not** contain the Phase 5
> repository-local technical design, does **not** redesign customer/operator experience, and proposes
> **no full rewrite**. No build/lint/test/smoke/runtime/DB/endpoint/secret/provider action was taken.
> All inspection was **read-only source + Git-object** reading performed **personally in this Worker
> session** (no subagent/Explore delegation — per the 2026-07-17 Advisor boundary correction).

---

## 0. Evidence pins (authority anchor)

| Pin | Value |
|---|---|
| Product workspace | `/home/leo/Project/Cosmile` |
| Pinned branch | `shadow/m4-cosmile-memory` — **verified match** |
| Pinned HEAD | `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6` — **verified match** (re-verified pre-write) |
| Product-repo working tree | exactly **6** pre-existing untracked files, unchanged (listed §11.4); zero tracked change |
| Authority commit (manifest) | `24b94ef6a0673a6fa350a3e21a83ca22506afde9` |
| Authority blob / sha256 (manifest) | `a60241b9…` / `3e1fefa792a7b15aa83ed5068d5dcdc80158372f9283501a058ca42d0f29ac56` |
| Output worktree branch | `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717` |
| Result path | `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/20_COSMILE_AS_BUILT_AND_REUSE.md` |

**Governing authority read (bilingual, committed):** root `CLAUDE.md` (§0.5 Foundation↔Cosmile boundary,
§1 Semantic/Policy-gate), `app/CLAUDE.md` (Ontology Boundary, NON-NEGOTIABLE Foundation boundary,
security & testing-meaning rules), `ARCHITECTURE_CONSTITUTION.md`, `app/src/types/ontology.ts`
(machine-readable `ONTOLOGY_BOUNDARY`), `01_EXECUTION_MANIFEST.md`, `handoffs/11_COSMILE_AS_BUILT_HANDOFF.md`.
Agent Office Worker rule confirmed in both `app/CLAUDE.md` ("Agent Role Boundary V2 … RETURN_TO: Advisor")
and root `AGENTS.md`.

---

## 1. Stack & top-level as-built

The repo has moved **well past** the "Python stdlib `http.server` + SQLite MVP" described in the root
`CLAUDE.md` §4. Current as-built:

- **Framework:** Next.js `16.2.9` (App Router, RSC), React `19.2.4`, TypeScript `5` (`app/package.json`).
- **ORM / DB:** Prisma `^6.19.3`, datasource **`provider = "postgresql"`** (`app/prisma/schema.prisma:10`,
  `migration_lock.toml` = `postgresql`). A legacy SQLite `dev.db` and `prisma/migrations_legacy_sqlite/`
  (3 migrations) remain on disk — **superseded** by the Postgres baseline.
- **Dependencies (whole runtime):** `@prisma/client`, `next`, `prisma`, `react`, `react-dom`, `ulid`
  only. **No payment SDK, no auth/OAuth SDK, no shipping/courier SDK, no queue/worker, no HTTP client
  lib** — strong corroboration that payment / real auth / shipping / real signal-transport are **absent
  by design**, not merely stubbed behind a library.
- **Surface counts (verified):** 75 API route handlers (`src/app/api/**/route.ts`), 27 page routes,
  ~70 `src/lib/*` modules, 10 `src/types/*`, 3 mock data modules, 34 Prisma models.
- **AI / Foundation:** real HTTP seam to a Foundation dev/shadow service at `http://127.0.0.1:8731`
  (`src/adapters/foundationClient.ts:5`), `api_live=false`, plus a **retired** mock bridge (§9).

---

## 2. System of record (as-built)

**Cosmile-owned commerce system of record = the Postgres database via Prisma** (34 models). Grouped:

- **Event/learning ledger (own):** `CommerceEvent` (AX event memory), `ProductSalesDaily`,
  `LearningInsight`, `Deal`, `Campaign`.
- **Transaction (own):** `Cart`/`CartItem`, `Order`/`OrderItem`, `Coupon`/`CouponRedemption`,
  `CommerceSku`/`CommerceOffer`, `GroupBuyCampaign`/`GroupBuyTeam`/`GroupBuyParticipant`,
  `Wishlist`, `AlertSubscription`/`AlertEvent`, `ConsultationSessionMeta`.
- **Admin/ops v2 (own):** `ProductListingConfig`, `CommercePromotionPage`, `CommerceContentBlock`.
- **Operator console (own):** `ConsoleUser`/`ConsoleSession`/`ConsoleConversation`/`ConsoleMessage`/
  `ConsoleAttachment`/`ConsoleArtifact`/`ConsoleJob`/`ConsoleAuditLog`.
- **Foundation signalling (own, producer-only):** `FoundationSignalOutbox` (+ WU8 evidence-delivery
  durability columns).
- **M4 memory / recommendation / evidence (own, service-local, flag-gated):** `ConversationSession`,
  `ConversationMessage`, `EpisodeSummary`, `MemoryFactCandidate`, `LongTermMemoryFact`,
  `CustomerProfile`, `ConsentRecord`, `SubjectRefMap`, `RecommendationEvent`, `RecOutcomeEvent`,
  `RecOutcomeFeedback`, `CommerceEvidenceRecord`, `CommerceEvidenceTombstone`.

**Foundation-owned (Cosmile references only, never writes/derives):** canonical product/brand/
ingredient/claim/evidence, **suitability verdict**, customer meaning-memory, personalization
(`ontology.ts:38-71`; `cosmileAccess` = `reference`/`display`/`forbidden`).

**Catalog product/brand data is NOT yet a system of record** — it is served from **hardcoded mock**
(`src/data/mockFoundationProducts.ts` = 28 products; `mockBrands.ts`; `mockCommerce.ts`) behind the
`foundationProductClient` seam (§9). Only `fbrand_elt` (8 ELT products) are **displayed**;
the other 20 (`理肤天使`) are data-preserved but hidden (`foundationProductClient.ts:17-20`).

---

## 3. Facts / Assumptions / Unknowns

### 3.1 Facts (directly evidenced)
1. **Checkout re-computes price server-side; never trusts client.** `validateCartForCheckout` calls
   `resolveUnitPrice(productId, skuId, offerId)` and re-derives every line price/snapshot
   (`checkout.ts:27-63`, `sku.ts:47-74`). Coupon is re-validated at order creation (`checkout.ts:74-86`).
2. **Payment is mock.** `completeMockOrder` flips `status→paid`, clears the cart, and explicitly does
   **not** decrement inventory (`checkout.ts:124-137`, "실재고 차감 ❌"). Group-buy payment identical
   (`groupBuy.ts:104-136`, "실재고/결제 ❌"). No PSP dependency exists.
3. **Inventory is display-only.** `CommerceSku.stock` = "★표시용(실차감 ❌)" (`schema.prisma:590`);
   checkout only *reads* stock for a sold-out guard (`checkout.ts:38`), never reserves/decrements.
4. **Customer identity/auth is mock.** Single hardcoded `MOCK_USER = demo_user_001` (`mockUser.ts:9-14`);
   `getShopper()` defaults to logged-in mock user, or guest via `cosmile_guest`/`cosmile_gid` cookies
   (`shopper.ts:12-17`). `mockUser.ts:1` = "Day 3에 실제 세션으로 교체" (not done). `api/auth/mock-login`,
   `mock-logout` only.
5. **Per-owner isolation is enforced where it exists.** Orders read `ownerMatches`/owner-scoped `where`
   (`api/orders/[orderId]/route.ts:9`, `api/orders/route.ts:7`); cart/wishlist/alert/coupon all
   owner-scoped. *Structurally correct but untested across multiple real users* (all logins resolve to
   the same mock user — see Unknowns).
6. **Shipment / tracking / real refund/return are unimplemented — self-declared.**
   `app/src/app/console/settings/page.tsx:18` → *"Shipping / Refund: 실배송/송장·환불/반품 미구현. TODO."*
   `createPendingOrder` hard-codes `shippingTotal = 0` (`checkout.ts:66`). No shipment/tracking model or route.
7. **Cancellation/refund = admin status-label transition only.** `PATCH api/admin/orders/[orderId]/status`
   changes `status` and nothing else ("★status만 · 금액/snapshot 불변", `route.ts:20`), gated by
   `requireConsoleAdminWrite` + `canTransitionOrder` + audit. **`refunded` is unreachable:**
   `ORDER_TRANSITIONS` (`adminWrite.ts:41-47`) offers `pending→cancelled`, `paid→[fulfilled,cancelled]`
   only — **no transition targets `refunded`**, though the Zod enum accepts it (`status/route.ts:7`).
   No money reversal, no inventory restoration.
8. **Foundation verdict is displayed, never generated (boundary held).**
   `consultationRiskGate.ts:3-9` reads only Foundation response *fields* (decisionType/evidenceMode/
   safetyGateResult), explicitly "사용자 원문을 읽지 않는다 → caller-side intent/risk classifier가 아니다";
   fail-closed: recommend only if `grounded ∧ pass`. PDP defers suitability to Foundation
   ("🔒 판단은 Foundation이 · 표시만 Cosmile", `products/[id]/page.tsx:133,192`). The `/api/slice/consult-foundation`
   path calls the real Foundation contract and, on failure, returns **explicit error with products=0,
   no mock fallback, no fabricated recommendation** (`consult-foundation/route.ts:80-89`).
9. **Foundation signalling is producer-only (no sender).** `foundationSignalMapper.ts` enqueues to
   `FoundationSignalOutbox` with `status:"pending"` and "실 발신 0(producer-only)" (`:78`); whitelisted
   event→signal only; **fail-closed on explicit granted consent — `userId ≠ consent`** (`:44-47`).
   `FoundationSignalOutbox` schema: "idempotent · consent · 직접발신 ❌" (`schema.prisma:197`).
10. **Recommendation-lifecycle, commerce-evidence, and memory layers are flag-OFF, production-forced-OFF,
    additive, and fail-closed.** `COSMILE_REC_EVENT_ENABLED` (`recommendationEventService.ts:9-12`),
    `COSMILE_COMMERCE_EVIDENCE_ENABLED` (`commerceEvidenceService.ts:19-22`),
    `NEXT_PUBLIC_COSMILE_VERTICAL_SLICE_ENABLED` (`slice/flags.ts:5-7`) — all default OFF and
    `NODE_ENV==="production"` unconditionally OFF. WU8 evidence-delivery columns are pure durable
    representation with "consumer/sender/delivery 없음" (`schema.prisma:230-231`).
11. **Vertical slice purchase path is separate and in-memory.** `slice/container.ts` binds
    `InMemoryOrderRepo` + `MockPurchaseAdapter` + shadow signal/memory; `purchaseBackend()==="real"`
    **throws** (fail-closed, `container.ts:19-22`). This is a **second, shadow** order path distinct from
    the Prisma `/api/checkout` path.
12. **Operator console auth is real (contrast to customer mock).** `ConsoleUser.passwordHash` = scrypt,
    session `tokenHash`, RBAC `owner|admin|editor|viewer` (`schema.prisma:255-279`); admin writes gated by
    `requireConsoleAdminWrite` (owner/admin only) + canonical `writeAdminAudit` before/after
    (`adminWrite.ts:5-38`).
13. **Testing is script-based, not a conventional suite.** `vitest.config.ts` includes only
    `scripts/**/*.vitest.ts`; the sole npm test script is `test:memory` (one file). Coverage is
    concentrated in `scripts/` as `*.vitest.ts` (pure-function: memory de-anon, M2 evidence/feedback/
    rec-lifecycle, v3_11 rec events, WU8 delivery contract/property), `*.mjs` eval/smoke harnesses
    (`smoke-commerce.mjs` 63 KB, `mock-commerce-scenario-100.mjs`, `vertical-slice-v0-loop100.mjs`), and
    `*.dbtest.py` migration rehearsals (m2_ab, v3_11b, wu8). The **commerce transaction spine
    (cart/checkout/order/coupon) is exercised only by `.mjs` scenario scripts**, not by unit/integration
    tests in CI form.
14. **DB migrations:** 5 active Postgres migrations — `00000000000000_init_postgres` (baseline, 1136 lines),
    `20260706120000_v3_11b_learning_commerce_memory`, `20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique`,
    `20260715120000_m2_ab_recommendation_feedback_evidence`, `20260716090000_wu8_commerce_evidence_delivery`
    (each with `down.sql`). Raw-SQL invariants (partial-unique, CHECK, FK) are carried in migration SQL
    because Prisma cannot express them (`schema.prisma:214,824,863,904`).

### 3.2 Assumptions (reasonable, not proven here)
- A1. The running app uses a Postgres instance via `DATABASE_URL` (env key confirmed present by **name
  only**); `dev.db`/`migrations_legacy_sqlite/` are vestigial and not the live store. *Not opened — secret.*
- A2. `ensureSkusSeeded`/`ensureCouponsSeeded`/seed routes are dev/demo bootstrap; the DB commerce data
  (`CommerceSku`/`Offer`/`Coupon`) is currently **seeded from the mock catalog** (`sku.ts:77-142`),
  i.e. not an independent commercial catalog.
- A3. The Foundation dev/shadow endpoint (`127.0.0.1:8731`) is a separate-team service; its contract is
  the authority (`foundationClient.ts` echoes FRC fields verbatim, `write_performed`/`api_live` observed).
- A4. Korea/KRW is the golden-path target (mission title + `currency "KRW"` defaults throughout).

### 3.3 Unknowns (must be resolved before design/build; none block this read-only assessment)
- U1. **Runtime `DATABASE_URL` target** (which Postgres, migration state on it) — not inspected (secret).
- U2. **Multi-user isolation under real auth** — untestable while all logins map to `demo_user_001`;
  the owner-scoping code is present but not proven across distinct customers.
- U3. **Whether any `.mjs`/`.dbtest.py` script references `dev.db`** at runtime — not traced; keeps the
  SQLite artifact’s DEAD classification at "DEAD pending confirmation" (U-marked in matrix).
- U4. **Foundation availability / real contract** for verdict *and* evidence *intake* at launch — the
  outbox has no consumer and the bridge can be `disabled`; the receiving side is out of this repo.
- U5. **`productPitch`/`humanCopy`/`AiVoicePitch` copy provenance** — generates "맞는 이유"(why-it-fits)
  merchandising text from Foundation product data; needs boundary verification it stays commerce-copy and
  never asserts a suitability/safety verdict (see §12 WATCH-B). Not fully traced this pass.

---

## 4. Surface-by-surface authority & state

Each row: **authority** (who is source of record) · **state** (real / mock / partial / absent) · evidence.

| # | Surface | Authority (as-built) | State | Key evidence |
|---|---|---|---|---|
| 1 | **Catalog** | Foundation (referenced) via mock client | **MOCK** data behind real seam | `foundationProductClient.ts:22-46`; 28 products, 8 displayed (`fbrand_elt`) |
| 2 | **PDP** | Cosmile render of Foundation ref + commerce overlay; verdict deferred to Foundation | **PARTIAL** (real render, mock data, verdict unwired) | `products/[id]/page.tsx:33-49,133,191-192` (AI button no handler; "Day 8 연결") |
| 3 | **Cart** | Cosmile DB (`Cart`/`CartItem`), owner-scoped | **REUSABLE** (server-authoritative) | `cart.ts:7-102`; snapshot price + guest→user merge |
| 4 | **Coupon/promotion** | Cosmile DB; server-side validate/price; 1/cart; no stacking | **REUSABLE** on seeded demo data | `coupon.ts:11-86` (atomic apply, limits) |
| 5 | **Identity / auth** | Mock single user + guest cookie; `Owner` seam real | **MOCK** (identity) / REUSABLE (seam) | `mockUser.ts:9`, `shopper.ts:12-27` |
| 6 | **Checkout** | Cosmile server (re-price + re-coupon); mock payment complete | **PARTIAL** (validation real, payment mock) | `checkout.ts:27-137` |
| 7 | **Order** | Cosmile DB `Order`/`OrderItem`, owner-scoped, snapshots | **REUSABLE_WITH_CORRECTION** | `checkout.ts:65-122`; `api/orders/*`; id=`cuid` not "UUID" (§6 note) |
| 8 | **Payment** | none (mock completion) | **MOCK** | `checkout.ts:124-137`; no PSP dep |
| 9 | **Inventory** | Cosmile `CommerceSku.stock` display-only | **MOCK / PARTIAL** (read-only guard) | `schema.prisma:590`; `checkout.ts:38` |
| 10 | **Shipment / tracking** | none | **DEAD / ABSENT** | `console/settings/page.tsx:18`; no model/route |
| 11 | **Cancellation** | Admin status transition (`→cancelled`) | **PARTIAL** (label only) | `adminWrite.ts:41-49`; `status/route.ts` |
| 12 | **Refund** | none reachable (`refunded` orphan status; RecOutcome analytics only) | **PARTIAL / ABSENT** | `adminWrite.ts:41-47` (no `→refunded`); `schema.prisma:890-906` |
| 13 | **Admin (ops v2)** | Console owner/admin, audited | **REUSABLE** | `adminWrite.ts:5-38`; `api/admin/*` (listings/offers/skus/coupons/promotions/content/group-buys/orders) |
| 14 | **Operator console** | Real scrypt auth + RBAC + audit + jobs/approval | **REUSABLE** | `schema.prisma:255-369`; `console/guard.ts`, `adminWrite.ts` |

**Adjacent surfaces (not in the 14 but present):**
- **Group-buy (team deal):** real Prisma state machine + mock payment (`groupBuy.ts`) — **PARTIAL**.
- **Wishlist:** real, owner-scoped, guest→user merge (`wishlist.ts`) — **REUSABLE**.
- **Alerts (price-drop/restock):** real intent capture, `channel:"mock"`, no real send (`alert.ts:36-44`) — **PARTIAL** (capture) / **MOCK** (delivery).
- **Consultation (real Foundation):** `/api/slice/consult-foundation` real HTTP consumer, fail-closed, flag-gated — **PARTIAL** (real seam, slice OFF by default).
- **Consultation metadata:** `ConsultationSessionMeta` stores refs only, no raw content (`schema.prisma:553-573`) — **REUSABLE**.
- **Recommendation lifecycle / commerce evidence / M4 memory:** producer-only, flag-OFF, additive, fail-closed — **PARTIAL** (durable representation present; transport/consumer absent by design).
- **Foundation signal outbox:** producer-only, no sender — **PARTIAL**.
- **Foundation bridge (evidence preview, console-only):** http|disabled, mock retired, failure-isolated — **PARTIAL**.
- **AI voice pitch (TTS):** `AiVoicePitch` + `api/voice/*` + `voice*.ts` + `data/voice_cache/*.mp3` — **UNVERIFIED** depth this pass (integrated TTS w/ cache; real backend key-dependent).
- **Event tracking / analytics:** `CommerceEvent` ledger + `commerceMetrics`/`analytics-report.mjs`; canonical event schema (cev-1.0) — **REUSABLE**.

---

## 5. Reuse matrix (controlled vocabulary only)

Labels: `REUSABLE_UNCHANGED | REUSABLE_WITH_CORRECTION | BOUNDED_REPLACEMENT_CANDIDATE | MOCK | PARTIAL | DEAD | UNVERIFIED`.

| Component (path) | Label | One-line basis |
|---|---|---|
| `lib/cart.ts` (cart CRUD, merge) | **REUSABLE_UNCHANGED** | Server-authoritative, owner-scoped, snapshot pricing, atomic merge |
| `lib/wishlist.ts` | **REUSABLE_UNCHANGED** | Owner-scoped, guest→user merge, no judgment |
| `lib/coupon.ts` | **REUSABLE_UNCHANGED** | Server validate/price, no stacking, limits enforced |
| `lib/sku.ts` `resolveUnitPrice` | **REUSABLE_UNCHANGED** | Deterministic server price (offer>sku>default>fallback) |
| `lib/console/*` (guard/adminWrite/audit/session/password) | **REUSABLE_UNCHANGED** | Real scrypt+RBAC+audit; owner/admin gate |
| `lib/shopper.ts` (`Owner`/`getShopper` seam) | **REUSABLE_WITH_CORRECTION** | Seam sound; identity source must move off mock user |
| `lib/checkout.ts` (order build + re-price) | **REUSABLE_WITH_CORRECTION** | Validation reusable; payment/inventory steps are mock |
| `api/orders/*`, `Order`/`OrderItem` | **REUSABLE_WITH_CORRECTION** | Owner-scoped & snapshotted; `id=cuid` vs stated "UUID"; no refund/ship fields wired |
| `lib/groupBuy.ts` | **REUSABLE_WITH_CORRECTION** | Real orchestration; payment mock; refund path absent |
| `lib/commerceEventService.ts` + event schema | **REUSABLE_UNCHANGED** | Canonical ledger; PII policy; test-covered |
| `adapters/foundationClient.ts` + `foundation/http*` | **REUSABLE_UNCHANGED** | Correct verdict-consumer seam; no fabrication; fail-closed |
| `lib/foundation/consultationRiskGate.ts` | **REUSABLE_UNCHANGED** | Fail-closed verdict consumer; boundary-correct |
| `lib/foundationSignalMapper.ts` + `FoundationSignalOutbox` | **PARTIAL** | Producer-only, consent-gated; no consumer/sender (by design) |
| `lib/recommendationEventService.ts` / `recOutcomeEventService.ts` | **PARTIAL** | Atomic paired producers; flag-OFF shadow; no downstream |
| `lib/commerceEvidenceService.ts` + WU8 delivery state | **PARTIAL** | Durable evidence; flag-OFF; producer-only, no transport |
| M4 memory models + `lib/memoryCandidate.ts` | **PARTIAL** | Additive, flag-OFF, raw-content=0; shadow only |
| `lib/slice/*` (container/ports/mockAdapters) | **PARTIAL** | Real DI seam; `InMemoryOrderRepo`; `real` fail-closed |
| PDP `products/[id]/page.tsx` | **PARTIAL** | Real render; mock data; verdict button unwired ("Day 8") |
| `data/mockFoundationProducts.ts` / `mockBrands.ts` / `mockCommerce.ts` | **MOCK** | Hardcoded 28-product catalog; ELT-only display |
| `lib/mockUser.ts` (`MOCK_USER`) | **MOCK** | Single hardcoded customer; auth placeholder |
| `checkout.completeMockOrder`, `groupBuy.completeGroupBuyOrder` | **MOCK** | Payment = status flip; no money movement |
| `CommerceSku.stock` semantics | **MOCK** | Display-only; no reserve/decrement |
| `lib/alert.ts` delivery (`channel:"mock"`) | **MOCK** | No real email/SMS/kakao/push |
| Shipment / tracking / returns | **DEAD** (absent) | Self-declared unimplemented; no code |
| `Order.status = "refunded"` path | **DEAD** (unreachable) | No transition targets it (`ORDER_TRANSITIONS`) |
| `prisma/migrations_legacy_sqlite/*` | **DEAD** | Superseded by `init_postgres`; provider=postgresql |
| `prisma/dev.db` (SQLite file) | **UNVERIFIED** (DEAD-leaning) | Vestigial; script references not traced (U3) |
| `api/voice/*`, `lib/voice*.ts`, voice cache | **UNVERIFIED** | TTS pitch feature; depth/real-backend not inspected this pass |
| `productPitch.ts` / `humanCopy.ts` / `AiVoicePitch` copy | **UNVERIFIED** | Boundary-sensitive "why-it-fits" copy; provenance not fully traced (WATCH-B) |

---

## 6. System-of-record & write-ownership proposal (observation, not Phase-5 design)

Consistent with `ontology.ts` and `app/CLAUDE.md`, the **existing ownership split is correct and should
be preserved** at design time:

- **Cosmile writes (keep as SoR):** commerce projection (SKU/Offer/listing/content/promotion), events,
  cart, order, coupon, group-buy, wishlist, alert, consultation-*metadata*, deals/campaigns, commerce
  learning, console, and its **service-local** memory (`SubjectRefMap`, `ConsentRecord`, memory facts,
  recommendation/evidence ledgers). Foundation receives only **minimized, consent-gated, opaque-ref**
  signals via the outbox — never raw customer/order identity (`app/CLAUDE.md` security rules;
  `foundationUserRef` opaque `furef_…`; `foundationSignalMapper.ts:53-61` whitelist payload).
- **Foundation writes (Cosmile references/display only):** canonical product/brand/ingredient/claim/
  evidence, **suitability verdict**, meaning-memory, personalization. Cosmile must **not** create these
  (`ontology.ts:40-48` `forbidden`/`display`).
- **Corrections the later design must resolve (bounded, not rewrite):**
  - **C1. Single price authority.** Make PDP read the *same* server price authority as checkout
    (`resolveUnitPrice`) instead of `mockCommerce` (`toCosmileView`), so displayed price = charged price.
  - **C2. Order id / number.** Reconcile `cuid` with the stated "주문번호 = UUID" security rule (opaque
    either way; decide the canonical customer-facing order number for Korea receipts).
  - **C3. Refund/cancellation as a real state + effect**, not a label — including the currently
    **unreachable `refunded`** status and the legally required KR 청약철회/환불 effect (money + inventory
    + evidence). Currently absent.

---

## 7. Migration & persistent-data constraints

- **Provider is Postgres.** Any launch must run the 5 active migrations against a **fresh Postgres**;
  `dev.db` (SQLite) must not be the live store; `migrations_legacy_sqlite/` is history only.
- **Additive-only memory discipline.** Memory/rec/evidence columns were added nullable & additive;
  `schema.prisma:770-773` records they were **not** applied to the legacy SQLite `dev.db`. New migrations
  must remain additive and fail-closed (prior runs include an "ephemeral fresh deploy rehearsal" and a
  "sqlite migration cleanup gate", see `runs/cosmile/*`).
- **Invariants live in raw SQL**, not Prisma: e.g. `RecOutcomeEvent @@unique([orderItemId])` DB-level
  idempotency (`schema.prisma:904`); `LongTermMemoryFact` partial-unique WHERE active (`:863`);
  `CommerceEvidenceRecord @@unique([orderItemId, clientRequestId])` (`:943`); `FoundationSignalOutbox`
  evidence-row CHECK (`:230`). The later design **must not** move these into app-only checks.
- **Consent is append-only ledger** with latest-`capturedAt` winner (`commerceEvidenceService.ts:44-54`);
  cross-service election is **per-evidence** and defaults false (`schema.prisma:927`).
- **Retention** constants are code-fixed for non-production (`commerceEvidenceService.ts:28-32`); real
  retention/TTL is not yet operationalized.

---

## 8. Current mocks & seams (swap points, single-file where noted)

| Seam | Current | Real-swap intent | Where swapped |
|---|---|---|---|
| Catalog read | `foundationProductClient` (mock arrays) | Foundation canonical read | **impl only** (`foundationProductClient.ts:1-2`) |
| Commerce data (price/stock) | `mockCommerce` overlay | Cosmile DB `ProductCommerce` | `toCosmileView` comment `:49` (Day-4 intent) |
| Foundation evidence preview | `foundationBridge` http\|disabled (**mock retired**) | Foundation dev/shadow HTTP | `bridgeMode()` (`foundationBridge.ts:10-17`) |
| Foundation consult verdict | `foundationClient` real HTTP `127.0.0.1:8731`, `api_live=false` | Foundation prod contract | `API_URL` env (`foundationClient.ts:5`) |
| Customer auth/identity | `MOCK_USER` + guest cookie | Real session/OAuth behind `Owner` | `getShopper()` (`shopper.ts:12`) |
| Payment | `completeMockOrder` status flip | PSP adapter | `purchaseBackend`/`container.ts:19-22`; checkout complete |
| Inventory | `stock` display-only | Real reserve/decrement | `checkout.ts:38-41`, `sku.ts` |
| Alert delivery | `channel:"mock"` | Real email/SMS/kakao/push | `alert.ts:22,36-44` |
| Foundation signal transport | outbox producer-only, `status:"pending"` | Consent-gated consumer/sender | `foundationSignalMapper.ts` (+ WU8 delivery columns unused) |
| Slice purchase | `InMemoryOrderRepo` + `MockPurchaseAdapter` | Real backend (throws today) | `container.ts:19-22` |

---

## 9. Provider / operating questions (for Advisor / Founder decision — do not block read-only work)

1. **Postgres / hosting** for KR launch and its migration state (U1).
2. **PSP for KRW** (e.g. Toss Payments / KG이니시스 / NHN KCP / Kakao Pay / Naver Pay) — none integrated;
   drives payment, cancellation, and refund effect. *(See Advisor `30_OFFICIAL_PROVIDER_RESEARCH.md`.)*
3. **Real authentication** (Email + Google/Apple + Kakao/Naver) — none integrated; unblocks U2 isolation.
4. **Shipping/courier + tracking** provider — entirely unbuilt (§4 #10).
5. **Refund/return legal flow** (전자상거래법 청약철회 7-day; 현금영수증/세금계산서/receipt) — unbuilt.
6. **Foundation availability & contract** for verdict *and* evidence *intake* at launch (U4); outbox has
   no consumer.
7. **Catalog authority** — when do real KR products replace the 28-item mock, and who owns commercial
   fields vs Foundation canonical fields.
8. **Notification channels** (Kakao alimtalk/SMS/email/push) for alerts.

---

## 10. Bounded replacement candidates (full detail)

Only items whose **contract fails for a real KR golden-commerce path such that in-place repair is
insufficient** are listed. Each is **bounded to an existing seam** — none implies a rewrite. (Designed
mock placeholders that swap cleanly at a seam are recorded as **MOCK** in §5, *not* here.)

### RC-1 — Customer authentication & identity source
- **Component:** `lib/mockUser.ts` (`MOCK_USER`) + logged-in default in `lib/shopper.ts:15`.
- **Evidence:** single hardcoded `demo_user_001`; `mockUser.ts:1` "Day 3에 실제 세션으로 교체".
- **Failed contract/invariant:** cannot represent distinct real customers; per-owner isolation (present
  in code) is unprovable (U2); no credential/session/consent-subject binding.
- **Impact:** blocks real accounts, order history integrity, consent attribution, `SubjectRefMap` mint
  from a real principal.
- **Bounded alternative:** introduce a real auth/session provider **behind the existing `Owner`/`getShopper`
  seam** — `Owner` type, owner-scoping, and guest→user merge are reusable unchanged.
- **Migration consequence:** `SubjectRefMap`/`ConsentRecord` subjectRef mint must key off the real
  principal; existing rows are mock-user only (dev data).
- **Why repair insufficient:** there is no real credential/session logic to repair — it is a placeholder
  constant; a provider must be *introduced*, not fixed.

### RC-2 — Payment completion
- **Component:** `checkout.completeMockOrder` (`checkout.ts:124-137`) and `groupBuy.completeGroupBuyOrder`
  (`groupBuy.ts:104-136`).
- **Evidence:** status flip to `paid`, cart clear, "실재고 차감 ❌"; no PSP dependency in `package.json`.
- **Failed contract/invariant:** no money movement, no authorization/capture, no payment idempotency
  against a PSP, no reconciliation.
- **Impact:** no real revenue; cancellation/refund cannot reverse funds; group-buy settlement impossible.
- **Bounded alternative:** a PSP gateway adapter bound at the existing `purchaseBackend`/`slice/container`
  seam and invoked from the order-completion step; `createPendingOrder` + server re-pricing are reusable.
- **Migration consequence:** add payment/transaction records + PSP idempotency keys; `Order.status`
  lifecycle extends to real paid/failed/refunded.
- **Why repair insufficient:** the mock performs no payment logic to correct; a real integration must be
  added at the seam.

### RC-3 — Inventory control semantics
- **Component:** `CommerceSku.stock` (display-only, `schema.prisma:590`) as used in `checkout.ts:38-41`.
- **Evidence:** "★표시용(실차감 ❌)"; checkout only reads for a sold-out guard.
- **Failed contract/invariant:** no reservation/decrement/oversell protection; concurrent checkout can
  oversell; group-buy "참여 ≠ 재고예약".
- **Impact:** cannot guarantee availability at scale; refunds cannot restock.
- **Bounded alternative:** an inventory-control component (reserve on checkout-start, commit on payment,
  release on cancel) at the checkout seam; the `stock` field and read-guard are reusable inputs.
- **Migration consequence:** add reservation state (or ledger) and concurrency control; no change to
  catalog display.
- **Why repair insufficient:** the field is intentionally inert; decrement/reservation behavior does not
  exist to repair.

### RC-4 — Catalog / commerce-data authority (single source)
- **Component:** mock catalog (`data/mockFoundationProducts.ts`, `mockCommerce.ts`) behind
  `foundationProductClient` + `toCosmileView`, **and** the resulting dual price authority (PDP=mock,
  checkout=DB).
- **Evidence:** `foundationProductClient.ts:22-66`; `sku.ts:77-142` seeds DB *from* mock; PDP price =
  `view.price` (`products/[id]/page.tsx:85`) while checkout charges `resolveUnitPrice`.
- **Failed contract/invariant:** two price authorities can diverge (displayed ≠ charged); catalog is a
  hardcoded 28-item ELT demo, not a commercial KR catalog.
- **Impact:** price-integrity/consumer-trust risk; cannot launch real assortment.
- **Bounded alternative:** replace the mock catalog source with Foundation canonical read (impl-only swap
  at the client seam) **and** unify PDP onto the checkout price authority (C1).
- **Migration consequence:** stop seeding commerce data from mock; define the commercial catalog load;
  reconcile `CommerceSku`/`Offer` provenance.
- **Why repair insufficient:** the mock arrays are not a maintainable catalog and cannot be "corrected"
  into one; the read source must change.

> **Honest scope note.** Beyond RC-1…RC-4, the remaining gaps (shipment/tracking, real refund flow,
> alert delivery, signal transport) are **absent by design (MOCK/DEAD)**, not mis-built components; they
> are additions at named seams (§8), not replacements. Recording them as replacement candidates would
> overstate what exists. This keeps the assessment truthful.

---

## 11. Source evidence for the later repository-local technical design

The Phase-5 (non-executable) Cosmile design must anchor on these exact sources:

**Contracts / boundary:** `app/CLAUDE.md`, root `CLAUDE.md §0.5`, `ARCHITECTURE_CONSTITUTION.md`,
`app/src/types/ontology.ts`, `app/docs/FOUNDATION_SIASIU_COSMILE_BOUNDARY.md` (referenced), design docs
under `설계자료/COSMILE_*` (e.g. `COSMILE_커머스_인텔리전스_설계서.md`, `COSMILE_Foundation_Signal_Contract.md`,
`COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md`, `COSMILE_SKU_Offer_설계서.md`).
**Schema/invariants:** `app/prisma/schema.prisma` + the 5 active migrations (raw-SQL CHECK/partial-unique).
**Transaction spine:** `lib/checkout.ts`, `lib/sku.ts`, `lib/cart.ts`, `lib/coupon.ts`, `lib/groupBuy.ts`,
`api/checkout/*`, `api/orders/*`, `api/admin/orders/[orderId]/status/route.ts`, `lib/console/adminWrite.ts`.
**Foundation seams:** `adapters/foundationClient.ts`, `adapters/cosmile{Semantic,Response}Adapter.ts`,
`lib/foundationBridge.ts`, `lib/foundation/*`, `lib/foundationSignalMapper.ts`, `api/slice/consult-foundation/route.ts`,
`lib/foundation/consultationRiskGate.ts`.
**Identity/consent/memory:** `lib/shopper.ts`, `lib/mockUser.ts`, `lib/foundation/foundationUserRef.ts`,
`lib/ids.ts`, `lib/memoryCandidate.ts`, `lib/commerceEvidenceService.ts`, `lib/recommendationEventService.ts`.
**Flags/env:** `lib/slice/flags.ts`, `lib/runtimeEnv.ts`; env **key names only**: `DATABASE_URL`,
`COSMILE_SUBJECT_SECRET`, `COSMILE_FUREF_SECRET`, `COSMILE_REC_EVENT_ENABLED` (values never read).
**Test reality:** `app/vitest.config.ts`, `scripts/*.vitest.ts`, `scripts/*.mjs`, `scripts/*.dbtest.py`,
plus prior `runs/cosmile/*` worker/sentinel results.
**Prior art in this mission tree:** Advisor `30_OFFICIAL_PROVIDER_RESEARCH.md` (sibling), Foundation
Worker `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md` (parallel).

---

## 12. Boundary-compliance observations & watch items

- **HELD:** Cosmile displays Foundation verdicts and never generates suitability/safety judgment
  (`consultationRiskGate.ts`, `consult-foundation/route.ts`, `ontology.ts`, PDP deferral). No
  `judge_real`/`claim_check`/ingredient-risk/skin-rule logic found in commerce paths.
- **HELD:** Foundation signalling is consent-fail-closed and producer-only (no raw identity egress).
- **WATCH-A (U3):** `prisma/dev.db` + `migrations_legacy_sqlite/` are vestigial; confirm no script binds
  `dev.db` before treating as fully DEAD.
- **WATCH-B (U5):** `productPitch.ts` / `humanCopy.ts` / `AiVoicePitch` produce persuasive "맞는 이유"
  copy from Foundation product data. It is framed as merchandising and the page defers real suitability
  to Foundation, but the copy-provenance must be verified in design to guarantee it never asserts an
  unverified suitability/efficacy/safety claim (cosmetic-advertising-law surface).
- **WATCH-C:** `Order.status="refunded"` is an orphan enum value (unreachable transition) — do not treat
  its presence as an implemented refund capability.

---

## 13. Zero-write attestation & stop

- **Product repo (`/home/leo/Project/Cosmile`):** HEAD still `b8b61d7…` (re-verified); working tree =
  exactly the **6** pre-existing untracked files, unchanged; **zero tracked or new writes**:
  ```
  ?? app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
  ?? app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
  ?? app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
  ?? app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
  ?? app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
  ?? app/docs/FOUNDATION_DOCS_SYNC_POLICY.md
  ```
- **No** build / lint / test / smoke / runtime / DB connection / schema apply / migration run / secret /
  PII / provider action was performed. Two Explore subagents were launched, then **immediately stopped**
  on the Advisor boundary correction; their partial output was **not used** — every fact above was
  verified first-hand.
- **Durable output** written only to the foundation-docs output worktree
  (`advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717`), at the two exact mission paths.
- **This artifact does not create Phase-5 design, does not redesign experience, and proposes no rewrite.**

**STOP — returning pointer to `foundation-advisor`.**
