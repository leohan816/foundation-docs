# 70 — Targeted Cross-project Contract Analysis (Phase 6 · Control)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID:  O1-P6-CONTROL-TARGETED-CONTRACT
ACTOR:        foundation-control
ROLE:         Foundation Team internal Control (targeted support only)
MODE:         TARGETED_READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
EFFORT:       max (user-selected; not reduced)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M context) — session-reported, not self-asserted as proof
WORKSPACE:    /home/leo/Project/foundation-control  (live-verified: pwd)
STATUS:       COMPLETE — analysis only · zero product/control-repo writes · READY_FOR_ADVISOR_INTEGRATION
RETURN_TO:    foundation-advisor
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9   (mission authority; verified ancestor of worktree HEAD)
EVIDENCE_COMMIT:  c8f16404602cece33a66fcb261998bd7efe6f1c8   (four evidence files; verified byte-identical at HEAD)
HANDOFF_COMMIT:   45656f5db664457bb5ff6e98e7e59782cff318ff   (verified ancestor of worktree HEAD)
IMPLEMENTATION_AUTHORIZED:          NO
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
NO_NEW_AGENT_OR_SUBAGENT:           TRUE
```

> **What this is.** One independent Control validation of the *cross-project contract* between Foundation
> (canonical product authority) and Cosmile (commerce authority) for the Korea/KRW O1 Golden Order and a
> separate captured-payment Golden Reversal. It answers only the seven exact material questions in the
> committed handoff `70_CONTROL_TARGETED_CONTRACT_HANDOFF.md`.
>
> **What this is not.** It does **not** author or replace the Foundation Worker's pending Phase 5 bounded
> snapshot-delivery design; does **not** redesign the Designer experience (`40_`) or the Cosmile
> repository-local technical design (`60_`); does **not** select a provider, Legal/MFDS/rights/refund/tax
> policy, schema, migration, or production topology; and writes **no** product/control repository code,
> schema, test, or runtime. Every dependency on the not-yet-produced Foundation delivery design is marked
> `UNRESOLVED_PENDING_FOUNDATION_WORKER`. Any exact path/technology not proven from current evidence is
> `PATH_STATUS: UNRESOLVED`, never inferred.

---

## 0. Live verification (done before analysis; not from memory)

| Check | Result |
|---|---|
| Control role | Foundation Team internal Control, *targeted support only* — mission `§5 Control`, `§6 Phase 6`; `foundation-control/CLAUDE.md §2.5` (`CONTROL_MASTER_DESIGN_MODE`, anti-expansion). Read as authority; CLAUDE.md read as subordinate historical/context evidence per handoff. |
| Workspace | `pwd` = `/home/leo/Project/foundation-control` — matches `WORKSPACE`. |
| Model / effort | Session-reported `claude-opus-4-8[1m]`, effort max (user-selected). Reported, not independently attestable from inside the process; not used as evidence of anything but self-report. |
| Return target | `foundation-advisor` (mission `§4` command path; Agent Office `AGENTS.md` routing). Control returns to Advisor; final approval remains Leo/GPT. |
| Pinned repo states | FOUNDATION `33570b9` (`shadow/foundation-shared-memory-v0`) · SIASIU `e1830b4` (`shadow/m4-siasiu-memory`) · Cosmile `b8b61d7` (`shadow/m4-cosmile-memory`) · foundation-control `c89b792` (`shadow/m5-ingress-gate`). |
| foundation-docs worktree | `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1`, branch `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717`, HEAD `cb01c11`. |
| Commit lineage | `HANDOFF_COMMIT 45656f5`, `AUTHORITY_COMMIT 24b94ef`, `EVIDENCE_COMMIT c8f1640` — all verified **ancestors** of worktree HEAD `cb01c11` (`git merge-base --is-ancestor`). |
| Evidence provenance | The four evidence files below verified **byte-identical** between `EVIDENCE_COMMIT c8f16404` and worktree HEAD (empty `git diff`). Working-tree copies read faithfully represent the pinned evidence. |

**Inputs read directly (not from memory):** mission authority KO+EN
(`docs/strategy/20260717_COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_MISSION_KO_EN.md` @ `24b94ef`);
Agent Office `advisor/_system/AGENTS.md`; `foundation-control/CLAUDE.md` (subordinate context); and the four
pinned evidence files: `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md`, `20_COSMILE_AS_BUILT_AND_REUSE.md`,
`40_DESIGNER_EXPERIENCE_DESIGN.md`, `60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md`.

**Pending-role note (binding on this analysis).** Mission `§5`/handoff: the Foundation Worker Phase 5 bounded
snapshot-delivery design was **not produced** (the approved Fable 5 runtime rejected dispatch before work
began; corroborated by `10_ §14` "Phase 5 delivery design: NOT produced"). Control does not fill that gap.
The **delivery form** (Q-D1) and the **correction/withdrawal signaling mechanism** (Q-D3) are therefore
`UNRESOLVED_PENDING_FOUNDATION_WORKER` throughout; only the *Cosmile consumption/containment side* and the
*cross-project invariants* are validated here.

---

## 1. Legend — per-element attributes and STATUS vocabulary

Each contract element (CE-n) carries the nine handoff attributes: **OWNER** (who is accountable) ·
**SOURCE_OF_TRUTH** (authoritative store) · **CONSUMER** · **VERSION_OR_ID** · **FAILURE_BEHAVIOR** ·
**CORRECTION_BEHAVIOR** · **EVIDENCE** (pinned source) · **STATUS** · **REQUIRED_DECISION_OWNER** (only where
unresolved).

STATUS values used:

- `VALIDATED` — Control confirms the candidate contract element is coherent, boundary-correct, and supported by pinned evidence.
- `VALIDATED_WITH_CONDITION` — confirmed, but only if a stated invariant/condition is held at build time.
- `UNRESOLVED_PENDING_FOUNDATION_WORKER` — cannot be closed until the Foundation Worker delivery design exists.
- `PENDING_LEO_DECISION` — a Founder scope/policy choice gates closure.
- `PENDING_EXTERNAL_CONFIRMATION` — Legal / provider / MFDS / vendor confirmation gates closure.
- `PATH_STATUS: UNRESOLVED` — exact path/technology not proven from current evidence; not inferred.

---

## 2. Q1 — `foundation_product_id ↔ cosmile_sku_id` contract

**Cardinality (Control finding).** The binding is **one Foundation product → zero-or-many Cosmile SKUs**,
keyed and made unique on the commerce side. Proven by the pad case: one `foundation_product_id`
`elt-pad-vitayouth-01` carries two Foundation-side variant descriptors (`-40` 40매/100g, `-80` 80매/200g)
in `offers.yaml`, while the representative serum is 1→1 (`10_ §10`, `§11`; `60_ §11`). The join is therefore
**directional**: each `cosmile_sku_id` resolves to exactly one `(foundation_product_id [, foundation_variant_key])`;
a `foundation_product_id` may back several `cosmile_sku_id`s or none. The mission's `<->` notation is a binding
relation, **not** a 1:1 identity — a build that assumes 1:1 would be wrong for variant products.

**CE-1 — Product↔SKU binding record (`SkuBinding`)**
- OWNER: Cosmile (commerce). SOURCE_OF_TRUTH: Cosmile DB (Postgres/Prisma).
- CONSUMER: Cosmile catalog/PDP/checkout/order; operator snapshot panel.
- VERSION_OR_ID: `{ cosmile_sku_id (Cosmile-assigned, unique), foundation_product_id, foundation_variant_key? (nullable; e.g. "40"|"80"), foundation_snapshot{…CE-2}, bound_at }` (shape from `10_ §11`, adopted `60_ §11`).
- FAILURE_BEHAVIOR: missing/invalid binding ⇒ affected SKU not exposed / not addable; ordinary commerce for other SKUs unaffected (affected-item containment).
- CORRECTION_BEHAVIOR: rebinding to a new snapshot updates catalog/PDP only; **existing order lines never rewrite** (CE-4).
- EVIDENCE: `10_ §11`; `60_ §10.1` (`SkuBinding @@unique(cosmileSkuId)`), `§11`.
- STATUS: `VALIDATED_WITH_CONDITION` — Control affirms Cosmile-ownership and the unique-on-`cosmile_sku_id` key. Condition INV-B1: the binding stores an **immutable snapshot pin**, not a "latest" pointer (see CE-2), so Foundation is never a synchronous dependency.
- REQUIRED_DECISION_OWNER: none for the record shape (Cosmile owns it); its **delivery/refresh** trigger is CE-9.

**CE-2 — Snapshot version anchor (`FoundationProductSnapshot` pin)**
- OWNER: Foundation (canonical facts) for the *content*; Cosmile for the *stored pin copy*.
- SOURCE_OF_TRUTH: `leohan816/foundation-vault` git objects (checkout `/home/leo/data/vaults/SIASIU_COSMILE_VAULT`, HEAD `70c39e0…`, clean) (`10_ §2`, `§3`).
- CONSUMER: Cosmile snapshot-consumption adapter; order-line binding.
- VERSION_OR_ID: `{ vault_commit, product_tree_hash, data_version, formula_version }` (object-level, available now — `10_ §11`; accepted as the pin by `60_ §11` answering Q-D2).
- FAILURE_BEHAVIOR: pin mismatch on revalidation ⇒ treat as stale/corrected (CE-9 lifecycle), never silent display of divergent content.
- CORRECTION_BEHAVIOR: a new approved snapshot mints a new pin; the prior pin remains valid for historical order lines.
- EVIDENCE: `10_ §3` (per-product tree hashes), `§11`, `§12 Q-D2`; `60_ §10.1`, `§11`.
- STATUS: `VALIDATED_WITH_CONDITION`.
  - **Control finding INV-B2 (material):** `product_tree_hash` (per-product git tree) must be the **primary change detector**, not `data_version`/`formula_version` alone. Evidence: the serum's package renewal + display-name change (2026-02-23) kept `formula_version: 1` and `data_version: 1.0.0` unchanged (`10_ §5`, U6). Relying on the version integers to detect "content changed" would miss real corrections; the git tree hash is the reliable signal.
  - **Control finding INV-B3:** pin on **git object identity (commit+tree hash)**, which is independent of the vault checkout directory. The vault has a pending physical path rename (`SIASIU_COSMILE_VAULT → FOUNDATION_DATA`, `10_ §2`); an object-identity pin is rename-stable, so the binding contract survives that migration. A path-based pin would break — do not use one.
- REQUIRED_DECISION_OWNER: Foundation Worker confirms the anchor set is delivered with each snapshot (Q-D2); Q-D1 delivery form is `UNRESOLVED_PENDING_FOUNDATION_WORKER`.

**CE-3 — Foundation variant descriptor → Cosmile SKU (variant identity)**
- OWNER: Foundation owns the descriptor (`foundation_variant_key` from `offers.yaml` sub-SKU); Cosmile owns the authoritative sellable SKU.
- SOURCE_OF_TRUTH: Foundation `offers.yaml` for the descriptor; Cosmile DB for `cosmile_sku_id`.
- CONSUMER: Cosmile catalog/checkout; per-SKU price/stock.
- VERSION_OR_ID: `(foundation_product_id, foundation_variant_key)` → `cosmile_sku_id`.
- FAILURE_BEHAVIOR: a variant whose source field is `UNVERIFIED` must **not** be displayed as confirmed. Concrete: pad `-40` volume is a known source error (`10_ §9`, `40_ §1.1`) — the snapshot/display gate must carry per-field verification status and suppress unverified variant fields.
- CORRECTION_BEHAVIOR: variant descriptor correction updates catalog only; historical order lines immutable (CE-4).
- EVIDENCE: `10_ §5`, `§10` (pad boundary), `§11`; `40_ §1.1`; `60_ §5 RC-4`, `§11`.
- STATUS: `VALIDATED_WITH_CONDITION` (per-field verification-status gating is the condition). REQUIRED_DECISION_OWNER: Foundation Worker (verification-status field on delivery) + Leo (whether pad boundary SKU is in O1 scope).

**Which side owns each field (Q1 field-ownership ledger).**

| Field | OWNER / SOURCE_OF_TRUTH | Cosmile access |
|---|---|---|
| `foundation_product_id`, `brand_id` | Foundation (immutable; rename-safe via `name_history`) | reference (join key) |
| canonical name (ko/en; zh null for ELT), spec, gated claims, cautions, ingredient info | Foundation | display (gated) |
| suitability verdict | Foundation decision service | display-only, fail-closed |
| snapshot pin `{vault_commit, product_tree_hash, data_version, formula_version}` | Foundation content / Cosmile-stored copy | reference |
| `foundation_variant_key` descriptor | Foundation (`offers.yaml`) | reference (non-authoritative) |
| `cosmile_sku_id` | Cosmile | own |
| KRW price, stock, sales state | Cosmile | own |
| `bound_at`, binding lifecycle | Cosmile | own |

**Control note on Foundation-side price fields (material, Q1↔Q6).** Foundation `offers.yaml` *does* carry dated
KRW figures (serum 34,000/30,000 @ 2026-06-25) **and** explicitly defers operational values to Cosmile
("Cosmile 운영확정 / Cosmile commerce에서 채움") (`10_ §11`). The contract must state these Foundation figures
are **NON-AUTHORITATIVE dated reference**, never wired as price authority. A future implementer reading
`offers.yaml` price into the charged price would violate the ownership boundary (this is the latent failure
mode behind C1/RC-4; see CE-5).

**Q1 acknowledgement / replay / idempotency.** Binding acknowledgement to Foundation is **not required for
O1** (the binding is Cosmile-owned and stored; Foundation is not in the commerce path). Replay/idempotency of
the binding is served by `SkuBinding @@unique(cosmileSkuId)` and by the immutable per-order-line snapshot ref
(CE-4). The *delivery* acknowledgement (does Cosmile confirm receipt of a snapshot to Foundation?) is
`UNRESOLVED_PENDING_FOUNDATION_WORKER`; Control does **not** invent a Foundation delivery/ack path.
`PATH_STATUS: UNRESOLVED` for delivery-form and ack-channel.

---

## 3. Q2 — Canonical vs commerce ownership at catalog / cart-checkout / historical order-line

Ownership is already encoded machine-readably in Cosmile `app/src/types/ontology.ts`
(`ONTOLOGY_BOUNDARY`, `cosmileAccess ∈ {reference, display, forbidden}`) and held in code (`20_ §2`, `§12`;
`60_ §0`). Control validates the split at each boundary.

**3.1 Catalog boundary.**
- Foundation may be referenced/displayed for: canonical product identity/content, brand, ingredient, claim,
  warning, safety, provenance, and the **suitability verdict** (display-only). Cosmile owns sellable SKU, KRW
  price, stock, and sales state. STATUS `VALIDATED`.
- **Foundation snapshot fields Cosmile MAY reference/display** (gated): canonical name (ko/en; zh null for
  ELT — `10_ §5`), spec, claims that passed the content/MFDS/rights gate, cautions, gated ingredient info,
  snapshot version/status, and suitability verdict. (`40_ §4.1`, `§10.1 C03`; `60_ §11`.)
- **Cosmile commercial fields Foundation must NEVER own:** `cosmile_sku_id`, KRW price, stock/inventory,
  sales state, cart, order, payment, fulfillment, shipment, tracking, cancellation, return, refund, customer
  identity/session, consent, reconciliation/incident. (`ontology.ts` `own`; mission `§8`; `60_ §0`.) STATUS `VALIDATED`.
- **Catalog data-source caveat (as-built).** The catalog is presently a **hardcoded 28-product mock** behind
  the `foundationProductClient` seam (8 ELT displayed, 20 `skin1004`/理肤天使 hidden) — it is *not yet* wired
  to the Foundation snapshot (`20_ §2`, `§8`; `60_ §5 RC-4`). The ownership boundary is correct in design;
  the *source swap* to a Foundation snapshot is gated on CE-9 (delivery) → `UNRESOLVED_PENDING_FOUNDATION_WORKER`.

**CE-5 — Price authority (single source).**
- OWNER/SOURCE_OF_TRUTH: Cosmile server (`lib/sku.ts resolveUnitPrice`; offer > sku > default > fallback).
- CONSUMER: PDP display **and** checkout charge (must be the *same* authority).
- FAILURE_BEHAVIOR: on revalidation price change ⇒ `CHECKOUT_REVIEW + price_reconfirmation_required`; no payment until reconfirmed (`40_ §10.1 C06/C10`).
- CORRECTION_BEHAVIOR: single authority means displayed = charged by construction.
- EVIDENCE: `20_ §3.1(1)`, `§6 C1`, `§10 RC-4`; `60_ §5 RC-4`, `§6.2`. As-built defect: PDP reads mock `view.price` while checkout charges `resolveUnitPrice` → *displayed ≠ charged* risk (F1).
- STATUS: `VALIDATED_WITH_CONDITION` — the C1 unification (PDP onto `resolveUnitPrice`) is mandatory before any real KRW exposure. REQUIRED_DECISION_OWNER: none (Cosmile-internal correction; no Foundation dependency).

**3.2 Cart / checkout boundary.**
- Cosmile is fully server-authoritative for price (CE-5) and availability (CE-6); coupon re-validated at order
  creation. Foundation is **not** a synchronous dependency for cart/checkout/payment/order/fulfillment/refund
  (mission `§8`; `40_ §0.1`; `60_ §0`). Suitability is a *separate, display-only* module — a product remains
  ordinarily purchasable while suitability is `UNKNOWN` (`40_ §2.5`, `§10.1 C04`). STATUS `VALIDATED`.

**CE-4 — Immutable historical order-line snapshot binding.**
- OWNER/SOURCE_OF_TRUTH: Cosmile DB `OrderItem` (line snapshot + `foundationSnapshotRef`).
- CONSUMER: order history, operator timeline, refund/reconciliation.
- VERSION_OR_ID: each `OrderItem` records the exact `{product/SKU/price/policy/snapshot}` version it was sold under.
- FAILURE_BEHAVIOR / CORRECTION_BEHAVIOR: later catalog correction/withdrawal (CE-9) **must not rewrite** the historical order line; order history shows the exact as-sold snapshot even after the current product is corrected/withdrawn (`40_ §8`, `§12`, `§17(7)`; `60_ §11`).
- EVIDENCE: `40_ §8`, `§10.1 C16`, `§12`; `60_ §10.2` (`OrderItem.foundationSnapshotRef`), `§11`.
- STATUS: `VALIDATED` — this is a **core cross-system invariant** (INV-7 below). Control affirms it without qualification.

**Control note (as-built order-line):** `Order.id` is `cuid`, not the mandated customer-facing UUID order
number (C2). The candidate contract adds an opaque `order_no` (UUID/ULID) `@unique` while keeping internal
`id=cuid` (`20_ §6 C2`; `60_ §10.2`). Non-material to *ownership* (both opaque, Cosmile-owned); the
UUID-vs-ULID choice is `PENDING_LEO_DECISION` (Q7 CF-6).

---

## 4. Q3 — Correction / supersession / withdrawal / stale / missing / Foundation-unavailable

The Designer (`40_ §12`) and Cosmile Worker (`60_ §11`) publish the same snapshot-lifecycle projection.
Control validates it and confirms the two governing invariants.

| Snapshot condition | Catalog/PDP | Cart/checkout | Existing order | Control verdict |
|---|---|---|---|---|
| `CURRENT_APPROVED` | display gated fields | revalidate local binding | retain exact line snapshot | `VALIDATED` |
| Foundation runtime down, local snapshot approved | ordinary commerce continues; suitability `UNKNOWN` | continues from local truth | unaffected | `VALIDATED` — **INV-async** |
| `STALE_LAST_APPROVED` | last-approved only if policy permits, else affected-item HOLD | require current local decision | historical retained | `VALIDATED_WITH_CONDITION` — stale threshold = Leo |
| `MISSING_INITIAL` | affected product not exposed | cannot add/pay affected line | history preserved | `VALIDATED` |
| `CORRECTED/SUPERSEDED` | new approved snapshot | cart highlights change + reconfirm | **historical order unchanged** | `VALIDATED` — **INV-immutable** |
| `WITHDRAWN` | listing unavailable | block affected line | history/support/refund remain usable | `VALIDATED` — affected-item containment |

**INV-async (Foundation is not a synchronous commerce dependency).** Ordinary commerce (catalog, cart,
checkout, payment, order, fulfillment, refund) must continue when the Foundation runtime is unavailable; only
suitability degrades to `UNKNOWN` (never a guess). Corroborated in code: `/api/slice/consult-foundation`
fails closed to `products=0` with **no mock fallback** (`20_ §3.1(8)`), and the catalog page has **no
synchronous Foundation request** (`40_ §4.1(1)`, `§10.1 C01`). STATUS `VALIDATED`. **Control flag (SPOF-1):**
any implementation that makes catalog availability or the checkout money path *synchronously* call Foundation
would violate this invariant and convert Foundation into a commerce SPOF — prohibited.

**INV-immutable (historical order lines never rewrite).** Restated from CE-4; applies across CORRECTED /
SUPERSEDED / WITHDRAWN. STATUS `VALIDATED`.

**Control finding (material) — connection status ≠ canonical product status.** A Foundation *infrastructure
outage alone* never converts a locally-approved snapshot to `WITHDRAWN`; conversely a *received withdrawal*
cannot be ignored merely because commerce must stay available — only the affected product is contained
(`40_ §12` closing paragraph). These are two distinct signals and must not be conflated. Control affirms this
as a required semantic separation and notes it is the crux the Foundation delivery design (CE-9) must make
mechanically distinguishable.

**CE-9 — Correction / supersession / withdrawal signaling (delivery).**
- OWNER: Foundation Worker (delivery design) for the *signal*; Cosmile for *consumption/containment*.
- SOURCE_OF_TRUTH: Foundation vault `status` field + git history are the **only** mechanisms that exist today; there is **no event/notification mechanism** (`10_ §12 Q-D3`).
- CONSUMER: Cosmile snapshot-consumption adapter (cadence-based / pulled refresh — never synchronous).
- VERSION_OR_ID: snapshot pin (CE-2) diff between refreshes; git tree hash is the reliable change detector (INV-B2).
- FAILURE_BEHAVIOR: on Foundation unavailability, Cosmile continues from the last approved local snapshot (INV-async); on received withdrawal, contain only the affected SKU.
- CORRECTION_BEHAVIOR: pulled refresh mints a new pin; historical lines immutable.
- EVIDENCE: `10_ §12 Q-D3`; `60_ §11` (Cosmile consumes; delivery is Foundation Worker's); `40_ §12`.
- STATUS: **`UNRESOLVED_PENDING_FOUNDATION_WORKER`**. `PATH_STATUS: UNRESOLVED` — cadence, transport, and signal encoding are not proven; Control does **not** invent them.
- REQUIRED_DECISION_OWNER: Foundation Worker (mechanism) + Leo (stale-validity threshold + approval owner, Q-D4).

---

## 5. Q4 — Commerce state authority + transaction/compensation boundaries + invariants

All money/inventory truth is **Cosmile-owned**; Foundation has **no role in the transaction spine** (boundary
held — `20_ §12`, `60_ §7`). Control validates the state authorities and extracts the cross-system invariants
**without designing repository-local code**.

**State authorities (Cosmile).**

| Domain | Authoritative store (candidate) | Not authoritative |
|---|---|---|
| Payment/capture | `PaymentTransaction` (immutable authorize/capture/cancel/refund rows) + `PaymentIntent` | redirect / webhook payload / timer / client |
| Inventory | `InventoryReservation` (reserve→commit→release) + default-deny oversell CHECK | `CommerceSku.stock` alone (display-compatible input) |
| Order lifecycle | `Order` projection over money+inventory truth; `OrderStatusHistory` append-only | `Order.status` label as sole truth |
| Refund | `Refund` (one active per capture) | operator click / webhook alone |
| Webhook events | `WebhookEventInbox` (`providerEventId @unique`) then pull-verify | webhook as direct money mutation |

Evidence: `60_ §6`, `§7`, `§9`, `§10.1`; `40_ §11`, `§13`. As-built baseline: payment/inventory/refund are
mock/absent today (`20_ §3.1(2,3,6,7)`, `§5`); `refunded` is an **unreachable orphan** `Order.status`
(`20_ §3.1(7)`, WATCH-C; `60_ §5 F5`) — the contract makes it reachable **only** via the `Refund` machine,
never as a bare label.

**Cross-system invariants (Control-identified; design-agnostic).**

- **INV-1 — Charge only after availability secured.** No `PaymentIntent` capture before an `InventoryReservation(reserved)` is held; last-item contention resolves to exactly one winner, the loser returns to cart with no charge (`60_ §7.1`; `40_ §10.1 C11`). STATUS `VALIDATED`.
- **INV-2 — Money truth is server-confirmed, never inferred.** Every return/webhook triggers a server **pull-verify** binding expected `{order_no, amount, currency=KRW, paymentKey/txn, internal state}` before any transition (`60_ §9`; `40_ §2.1`, `§13.1`). STATUS `VALIDATED`.
- **INV-3 — Exactly one capture per order; exactly one active refund per capture.** Partial-unique `WHERE type='capture' AND status='succeeded'`; `Refund` one-active partial-unique; provider + internal idempotency keys (`60_ §7.3`, `§10.1`). STATUS `VALIDATED`.
- **INV-4 — Reservation transitions are payment-truth-gated.** `committed` only on verified capture; `released` only when payment is *conclusively* non-captured (never release on `unknown` — that would risk oversell if it in fact captured) (`60_ §6.1`, `§7.2`). STATUS `VALIDATED`.
- **INV-5 — Duplicate/replayed webhook ⇒ zero second effect.** `WebhookEventInbox providerEventId @unique` ⇒ `DUPLICATE_IGNORED` (`60_ §7.2`, `§9`; `40_ §11`, `§16.2(8)`). STATUS `VALIDATED`.
- **INV-6 — Post-capture internal failure is contained, never re-charged.** Keep captured truth, open reconciliation, operator resumes bind; customer never told "failed" (`60_ §7.2`; `40_ §10.1 C15`, `§11`). STATUS `VALIDATED`.
- **INV-7 — `Order.status` is a projection; authority = money/inventory truth tables** (`PaymentTransaction`, `InventoryReservation`) (`60_ §6`). STATUS `VALIDATED`.
- **INV-8 — Refund requires a real captured payment.** A pre-approval void does **not** qualify as the Golden Reversal (`60_ §7.3`; `40_ §5`). STATUS `VALIDATED`.
- **INV-9 — Inventory disposition on refund is independent.** Item stays `HOLD` (no auto-restock) unless an approved return/restock policy supplies a disposition (`60_ §7.3`; `40_ §5.7`, `§16.3(5)`). STATUS `VALIDATED_WITH_CONDITION` (policy = Leo/ops).
- **INV-10 — DB-level invariants live in raw SQL, not app-only checks.** Unique/partial-unique/CHECK/FK carried in migration SQL (Prisma cannot express them), consistent with existing `RecOutcomeEvent`/`LongTermMemoryFact`/`CommerceEvidenceRecord`/`FoundationSignalOutbox` (`20_ §7`; `60_ §10.3`). STATUS `VALIDATED`.

**Operator recovery.** Reconciliation (`open→in_progress→resolved`) and Incident (`open→contained→recovering→closed`)
are Cosmile operator-owned, category/count/timestamp-only, gated by real console RBAC + audit reason
(`60_ §6.1`, `§12`; `40_ §9`). STATUS `VALIDATED`. All of Q4 is Cosmile-owned — **no Foundation dependency in
the money path** (independently confirmed against `ontology.ts` and the mock/absent PSP as-built).

---

## 6. Q5 — Cross-repo dependencies · ack/evidence · fail-closed · SPOFs · minimum safe sequence

**6.1 Cross-repository dependencies.**

| ID | Dependency | Direction | Coupling | STATUS |
|---|---|---|---|---|
| D1 | Cosmile catalog snapshot ← Foundation vault product tree | Foundation → Cosmile | **async / pulled** (never synchronous) | delivery `UNRESOLVED_PENDING_FOUNDATION_WORKER` (CE-9) |
| D2 | Cosmile suitability display ← Foundation decision service (`127.0.0.1:8731`, `api_live=false`) | Foundation → Cosmile | runtime seam, **display-only, fail-closed**, off the money path | `VALIDATED` (boundary held) |
| D3 | Foundation signal intake ← Cosmile `FoundationSignalOutbox` | Cosmile → Foundation | **producer-only, no sender**, consent-gated opaque `furef_…` | out of O1 scope; `VALIDATED` (no raw identity egress) |
| D4 | Correction/withdrawal signaling ← Foundation | Foundation → Cosmile | async | `UNRESOLVED_PENDING_FOUNDATION_WORKER` (CE-9) |

Evidence: `20_ §2`, `§3.1(8,9)`, `§8`; `60_ §4.1`, `§11`; `10_ §11`, `§12`.

**6.2 Acknowledgement / evidence responsibilities.**
- **Foundation Worker owns (not yet produced):** snapshot delivery form (Q-D1), version-anchor confirmation
  (Q-D2), correction/withdrawal signaling cadence (Q-D3), review-gate flip owner (Q-D4), rights-gate record
  location (Q-D7), `sales_status` enum normalization owner (Q-D8). → `UNRESOLVED_PENDING_FOUNDATION_WORKER`.
- **Cosmile owns:** binding storage, snapshot consumption/containment, order-line snapshot immutability, the
  entire commerce state + reconciliation, and the sandbox Golden Order / Golden Reversal evidence.
- **Evidence discipline (both sides, Control-affirmed):** boolean / count / status / category + masked refs
  only. No raw secret, hash, PII, customer/order/payment/provider ID, `trace_id`, full payload, or env/DB dump
  (`60_ §12`, `§13`; `40_ §16.4`; `foundation-control/CLAUDE.md` security pointer). STATUS `VALIDATED`.

**6.3 Fail-closed points (Control-affirmed).**

| ID | Fail-closed behavior | Evidence |
|---|---|---|
| FC-1 | Foundation consult failure ⇒ `products=0`, no mock fallback, no fabricated recommendation | `20_ §3.1(8)`; `60_ §2 F8` |
| FC-2 | Suitability unavailable/absent ⇒ `UNKNOWN`, never guessed | `40_ §0.1`, `§2.5` |
| FC-3 | `FoundationSignalOutbox` ⇒ consent-fail-closed (`userId ≠ consent`), producer-only | `20_ §3.1(9)` |
| FC-4 | Payment unknown ⇒ `PAYMENT_CONFIRMING`, no repay; refund unknown ⇒ `REFUND_CONFIRMING`, no second refund | `40_ §11`, `§14`; `60_ §7.2` |
| FC-5 | Inventory oversell guard is **default-deny** (`reserved+committed ≤ stock`) | `60_ §10.1`, `§7.1` |
| FC-6 | `purchaseBackend()==="real"` throws (slice) | `20_ §3.1(11)`; `60_ §5 RC-2` |
| FC-7 | rec/evidence/memory/slice flags default-OFF **and** `NODE_ENV==="production"` unconditionally OFF | `20_ §3.1(10)`; `60_ §2 F10` |
| FC-8 | rights/MFDS/imagery unresolved ⇒ restricted text-only fixture + `NOT_LIVE_SALE_EVIDENCE`, HOLD public exposure | `40_ §1.2`, `§16.1`; `60_ §13` |

**6.4 Single points of failure (Control-identified).**

- **SPOF-1 (contract-prohibited if built wrong):** making catalog/checkout synchronously depend on Foundation
  would turn Foundation into a commerce SPOF. The contract forbids this (INV-async); flag any such build as a
  boundary violation.
- **SPOF-2 (inherent, external):** a single PSP (provisionally Toss V2) is the sole boundary for capture +
  refund; PSP availability gates both Golden runs. Mitigated by server-verify + idempotency + reconciliation;
  vendor eligibility is `PENDING_EXTERNAL_CONFIRMATION` (`60_ §9`, `§16`; `40_ §18.3`).
- **SPOF-3 (inherent):** Postgres is the single commerce system-of-record (standard DB SPOF; out of O1 design
  scope — noted, not designed).
- **SPOF-4 (external, mitigated):** a single customer identity provider (provisionally Kakao OIDC); a login
  outage blocks *new* sessions, but mid-flow orders recover from order history (`provider_unavailable` is a
  designed state — `40_ §7.1`; `60_ §8`).
- **SPOF-5 (process, active):** the **absent Foundation Worker delivery design** blocks closure of CE-9 (D1/D4)
  and thus of the catalog source-swap. This is the top process risk for finalizing the contract.

**6.5 Minimum safe integration sequence (contract-level; not repo code).** Control validates the
`60_ §14` WU ordering *at the contract layer* and separates the Foundation-blocked path from the
Cosmile-only spine:

1. **S0 — single price authority (C1).** Unify PDP onto `resolveUnitPrice`. Pure Cosmile; **no Foundation dep**; unblocks displayed=charged. (`VALIDATED`)
2. **S1 — additive schema baseline + disposable up/down test on ephemeral Postgres** (WU-0). No shared/protected DB write. (`VALIDATED`)
3. **S2 — inventory reservation + default-deny oversell guard** (WU-C). Cosmile-only. (`VALIDATED`)
4. **S3 — real customer identity behind `Owner` seam** (WU-A). Cosmile + external provider gate. (`PENDING_EXTERNAL_CONFIRMATION`)
5. **S4 — PSP payment: intent/transaction/refund + webhook inbox + server-verify** (WU-B). *After* S2's reservation contract; external vendor gate. (`PENDING_EXTERNAL_CONFIRMATION`)
6. **S5 — order lifecycle + `order_no` + status history + reconciliation/incident** (WU-E). (`VALIDATED_WITH_CONDITION` — order_no scheme = Leo)
7. **Sx — catalog source-swap + snapshot-consumption tables** (WU-D). **Runs in parallel structurally but is gated by CE-9** → cannot complete until the Foundation Worker delivery design exists. (`UNRESOLVED_PENDING_FOUNDATION_WORKER`)
8. **S6/S7 — Golden Order then separate Golden Reversal sandbox evidence** (WU-F/G), under the `SANDBOX_WALKING_SKELETON_EVIDENCE` ceiling, no auto-progression. (`VALIDATED`)

Control-validated critical path: **S0/S1 → S2 → S4 → S5 → S6/S7**; the Foundation-dependent Sx is a **separable
track** that must not gate the Cosmile commerce spine (consistent with INV-async). This separation is the
concrete safeguard that keeps the pending Foundation Worker design from blocking all of O1.

---

## 7. Q6 — Conflict reconciliation + consolidated register

**7.1 Material-conflict reconciliation.**

| Item | Reconciliation |
|---|---|
| **Prisma model count 34 (`20_`) vs 45 (`60_`)** | **Non-material** (handoff directive). `20_ §1` counted "34 models"; `60_ §1` re-counted `grep '^model '` = 45 at the same HEAD `b8b61d7`. The structural inventory (commerce spine + console + M4 memory/rec/evidence + signal outbox) is identical in both. Changes **no** contract conclusion. Flagged for Advisor reconciliation only. |
| **`EVIDENCE_COMMIT` differs across sibling docs** (`40_`=`d16ab0b`, `60_`=`b632529`, this handoff=`c8f16404`) | Non-material: these are successive snapshots of the same mission tree. Control verified the four evidence files byte-identical between the handoff-pinned `c8f16404` and worktree HEAD `cb01c11`; same content read. |
| **Order id `cuid` vs mandated UUID order number** (C2) | Not a conflict — a correction: add opaque `order_no` (UUID/ULID), keep internal `id=cuid`. Ownership unaffected. UUID-vs-ULID = Leo (CF-6). |
| **Dual price authority** (PDP mock vs checkout DB) | Real as-built defect (F1/RC-4/C1); candidate contract unifies on `resolveUnitPrice`. Consistent across `20_`/`60_`. Resolved by CE-5. |
| **Foundation `offers.yaml` carries KRW price AND defers to Cosmile** | Reconciled: Foundation figures are **dated non-authoritative reference**; Cosmile is price authority (CE-5 Control note). The contract must state this explicitly to prevent a mis-wire. |
| **`sales_status` enum drift** (`on_sale`\|`active`\|`unknown`) in Foundation records | Real normalization gap (`10_ §11`, Q-D8). Owner unresolved (CF-3). |

**7.2 Consolidated register (facts / candidate contract / assumptions / unknowns / owners / Leo decisions).**

- **FACTS (pinned).** Canonical source = `leohan816/foundation-vault` @ `70c39e0` (`10_ §2-3`). 28 records: 8 ELT
  sale-candidates (7 active, 1 incomplete) + 20 `skin1004`=理肤天使 `BLOCKED` by canonical brand identity
  (`10_ §6`, `§9`). `product_id` immutable + rename-safe (`10_ §5`). Pad = 1 product → 2 variant SKUs
  (`10_ §10`). Cosmile: Next.js/Prisma/Postgres; catalog = hardcoded mock behind `foundationProductClient`;
  server-authoritative price/coupon; payment/inventory/auth mock; `refunded` unreachable; console auth real;
  Foundation verdict display-only fail-closed; signal outbox producer-only (`20_` throughout). Foundation
  delivery design **not produced** (`10_ §14`).
- **CANDIDATE CONTRACT (Control-validated).** CE-1…CE-5, CE-9 + INV-1…INV-10, INV-async, INV-immutable, INV-B1…B3.
  Binding owned/stored by Cosmile; snapshot pin = `{vault_commit, product_tree_hash, data_version, formula_version}`;
  order-line snapshot immutable; Foundation never synchronous for commerce; money/inventory truth in dedicated
  Cosmile tables with raw-SQL invariants.
- **ASSUMPTIONS (to confirm; do not block analysis).** Runtime store is Postgres via `DATABASE_URL` (name only);
  `dev.db`/legacy SQLite vestigial (`20_ A1`, `60_ A1`). Korea/KRW, quantity-one, full-capture/full-refund,
  synthetic customer, non-live sandbox (`40_ A1`; `60_ A2`). Existing cart/repricing/console/audit reused, not
  rewritten (`60_ A3`). Env-override for vault path unset in the verification shell only (`10_ A1`).
- **UNKNOWNS (resolve before build).** Foundation delivery form/cadence (Q-D1/Q-D3); runtime `DATABASE_URL`
  target (secret); multi-user isolation under real auth (U2); MFDS report numbers / independent verification
  (U1); pad `-40` volume (U4); mask true ingredient list (U2, `10_`); triplecapsule completeness (U3);
  `productPitch`/`humanCopy` copy provenance (WATCH-B) must never assert a suitability/efficacy/safety verdict.
- **REQUIRED OWNERS.** Foundation Worker: CE-9 delivery, Q-D2/Q-D4/Q-D7/Q-D8. Legal/external:
  commercial-use-rights R1–R6, MFDS obligations, PSP/identity eligibility, courier/support SLAs. Cosmile
  Worker: repo-local implementation (post-approval). Advisor: integration, routing, model/count reconciliation.
- **LEO DECISIONS.** Scope freeze; representative/boundary SKU set; `order_no` UUID-vs-ULID; stale-snapshot
  threshold + approval owner; guest checkout; operator step-up/dual approval; final provider selection;
  acceptance of rights/MFDS posture for any exposure.

---

## 8. Q7 — Bounded later ownership / migration decisions to carry forward

Listed only; **not started**, and explicitly **not broadened** into Memory V3, SIASIU AI, recommendation UI,
production, or a general architecture redesign (all remain excluded — mission `§2`, `§19`; `60_ §15`).

| ID | Carry-forward (bounded) | Owner | Blocking? |
|---|---|---|---|
| CF-1 | Foundation Worker Phase 5 **bounded snapshot-delivery design** (delivery form Q-D1, correction/withdrawal signaling Q-D3, version-anchor confirm Q-D2, review-gate flip Q-D4) | Foundation Worker | **Yes** — gates CE-9, D1/D4, catalog source-swap (Sx) |
| CF-2 | Commercial-use-rights **gate record** location + owner (R1–R6; where recorded so the §10 expansion rule checks it mechanically, Q-D7) | Legal/Leo + Foundation record | Yes for public exposure |
| CF-3 | `sales_status` enum **normalization owner** (Foundation record fix vs Cosmile mapping layer, Q-D8) | Foundation Worker / Cosmile | No (design-time) |
| CF-4 | **Migration ownership** — additive binding/snapshot/payment/inventory/refund tables (Cosmile), disposable up/down test on ephemeral Postgres, no shared/protected DB write until separately authorized; `order_no` idempotent backfill; mock-user rows disposable | Cosmile Worker (post-approval) | No |
| CF-5 | **Stale-snapshot validity threshold** + approval owner | Leo | No (policy) |
| CF-6 | `order_no` scheme **UUID vs ULID** | Leo | No |
| CF-7 | **Imagery pipeline** ownership (no canonical binary assets exist; outside Foundation canonical scope, Q-D6) | TBD (Leo to assign) | Yes for image display |
| CF-8 | **Locale scope** ko-only for Korea launch (en/zh exist, not commerce-reviewed, Q-D5) | Leo | No |

---

## 9. Control verdict, boundary attestation, and return

**Verdict.** The candidate cross-project contract in `10_`/`40_`/`60_` is **coherent and boundary-correct** for
the O1 Korea/KRW rehearsal, subject to the conditions and invariants above. The single decisive open
dependency is the **Foundation Worker bounded snapshot-delivery design (CE-9 / CF-1)**, which Control does not
and must not author. The Cosmile commerce spine (identity/inventory/payment/order/refund/reconciliation) is
Cosmile-owned end-to-end with Foundation off the money path, and can proceed as a **separable track** that must
not be gated by, and must not synchronously depend on, Foundation.

```text
Q1_PRODUCT_SKU_CONTRACT:            VALIDATED_WITH_CONDITION (1→N cardinality; snapshot-pin binding; INV-B1/B2/B3)
Q2_CANONICAL_VS_COMMERCE_OWNERSHIP: VALIDATED (order-line immutability = core invariant; Foundation price fields non-authoritative)
Q3_CORRECTION_WITHDRAWAL_BEHAVIOR:  VALIDATED (consumption side); DELIVERY = UNRESOLVED_PENDING_FOUNDATION_WORKER
Q4_STATE_AND_TRANSACTION_BOUNDARY:  VALIDATED (INV-1..INV-10; Foundation absent from money path)
Q5_DEPENDENCIES_FAILCLOSED_SPOF_SEQ: VALIDATED (D1/D4 pending Foundation Worker; SPOF-1 prohibition affirmed)
Q6_CONFLICT_RECONCILIATION:         DONE (34-vs-45 non-material; register separated)
Q7_BOUNDED_CARRYFORWARD:            LISTED (CF-1..CF-8; none started; no scope broadening)
FOUNDATION_WORKER_DEPENDENCY:       UNRESOLVED_PENDING_FOUNDATION_WORKER (CE-9 / D1 / D4 / CF-1)
PRISMA_MODEL_COUNT_34_VS_45:        NON_MATERIAL (no contract conclusion changed)
CONTROL_REPLACED_PENDING_DESIGN:    NO
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
IMPLEMENTATION_STARTED:             NO
NO_NEW_AGENT_OR_SUBAGENT:           TRUE
RISK_ACCEPTED:                      NONE
PROVIDER_OR_LEGAL_DECISION_MADE:    NONE
RETURN_TO:                          foundation-advisor
STOP
```

**Zero-write / no-action attestation.** No product or control repository file, code, schema, migration, DB,
runtime, test, endpoint, secret, PII, provider, or network action was performed. All inputs were read
first-hand at pinned/verified objects; no sub-agent, delegated context, or dispatch was used. Durable output =
exactly this result file and its pointer at the two handoff-named paths in the foundation-docs mission run
(commit/push not in this handoff's scope — left to the Advisor, per the sibling `10_/20_/40_/60_` precedent).
Foundation `33570b9`, SIASIU `e1830b4`, Cosmile `b8b61d7`, foundation-control `c89b792` — read-only; unchanged.

**Return.** To `foundation-advisor` for Phase 7 integration. Final approval remains Leo/GPT. **STOP.**
