# Phase 4 — Korea Golden Commerce experience design

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P4-DESIGNER-EXPERIENCE
ACTOR: foundation-designer
ROLE: Foundation Team Designer
MODE: IMPLEMENTATION_READY_EXPERIENCE_DESIGN_ONLY
STATUS: READY_FOR_INDEPENDENT_DESIGN_REVIEW
EVIDENCE_COMMIT: d16ab0bd3a4033666eb774ebb4e92c7d8d0c6470
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9
HANDOFF_CORRECTION_COMMIT: 43fe3b835a754fe52765ad668f9a49b498f7c784
IMPLEMENTATION_AUTHORIZED: NO
```

## 0. Outcome and authority boundary

This is one coherent, implementation-ready **experience contract** for a Korea/KRW
Golden Order and a separate captured-payment Golden Reversal. It defines what customers
and operators must see, which actions are safe in each state, how uncertainty and recovery
are represented, and what product-experience information the future frontend and backend
must exchange. It does not select repository architecture, schema, migration, provider,
Legal policy, commercial rights, or production operating policy.

The design is review-ready, not build-authorized. Current evidence supports an internal,
text-first sandbox rehearsal design around `elt-serum-vitayouth-01`; it does **not** prove
that the product may be sold, that its source copy or images may be reused commercially,
that MFDS display obligations are satisfied, or that any identity/PSP provider will approve
Cosmile. Those gates remain visible throughout this design.

### 0.1 Non-transferable ownership

| Truth | Owner | Experience consequence |
|---|---|---|
| product identity/content, brand, ingredients, claims, warnings, safety, provenance | Foundation | Cosmile displays only an approved, versioned local snapshot; never invents or repairs facts |
| sellable SKU, KRW price, stock, sales state, cart, order, payment, fulfillment, shipment, cancellation, return, refund | Cosmile | all commercial availability and money/stock actions are server-authoritative in Cosmile |
| customer identity | future approved customer identity boundary | email is not a stable identity key; customer login is separate from operator login |
| operator identity and authorization | Cosmile operator boundary | irreversible actions require authorized operator state and an audit reason |
| PSP payment/capture/refund truth | future approved PSP | browser return or webhook alone is not final truth; server confirmation controls display |
| Legal, rights, MFDS, privacy, tax/accounting policy | Leo plus named external authorities | UI consumes a versioned decision; Designer does not choose the decision |

Foundation is not a synchronous dependency for catalog, cart, checkout, payment, order,
fulfillment, or refund. A Foundation outage must not disable unrelated ordinary commerce.
Foundation suitability is separately fail-closed: unavailable or absent suitability means
`UNKNOWN`, never a guessed recommendation or safety judgment.

## 1. Evidence consumed and product scope

All mission evidence was read from exact Git objects, not the working tree:

| Evidence | SHA-256 | Design use |
|---|---|---|
| `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md` | `f94476c438a89d3499b41029cbb956d5c05d9cf0b8607c664f32b9ae6ed796e7` | canonical source, ELT set, eligibility, rights/MFDS/imagery gates, representative/boundary products |
| `20_COSMILE_AS_BUILT_AND_REUSE.md` | `62332fb804f0b9c6ea2352d24d4d900cb61f6e74ec790f9553d43fdf73db8fc4` | current screens/seams, reusable cart/order/console behavior, missing auth/payment/inventory/shipment/refund |
| `30_OFFICIAL_PROVIDER_RESEARCH.md` | `4ccc16eede943b1d5a1f1def6ab15fd2dc09d0df98f356b5c4156550d27ca9d1` | provisional identity/PSP capabilities and unresolved provider gates |

### 1.1 Product use is deliberately narrow

| Product | Experience role | Current limit |
|---|---|---|
| `elt-serum-vitayouth-01` (비타유스 토닝 세럼, 50ml) | representative one-SKU Golden Order and separate Golden Reversal | design-usable only; rights, human review, checksum, MFDS report number, current price/stock, and imagery remain unresolved |
| `elt-pad-vitayouth-01` | boundary design for one product to multiple sellable SKUs | use the 80-count variant only as a candidate; the 40-count volume is `UNVERIFIED` and must not be displayed as confirmed |
| `elt-sunscreen-vitayouth-01` | conditional compliance/display boundary | include only if Leo retains it after MFDS/Legal review; no different shipment/refund mechanics are proven |

`elt-mask-vitayouth-01` remains `UNVERIFIED`, `elt-serum-triplecapsule-01` remains
`INCOMPLETE`, and all 20 `skin1004` / 理肤天使 records remain `BLOCKED` by canonical
brand identity. Nothing in this design changes those classifications.

### 1.2 Global gates carried into every screen

- Commercial sale authorization and content-reuse rights R1–R6: unresolved.
- Human review, source checksum, MFDS verification/report numbers, functional-cosmetics
  display obligations, and clinical-claim republication: unresolved.
- Product imagery: no canonical binary assets and no proven commercial image rights.
- Final customer identity provider, consent items, app eligibility, and recovery policy:
  unresolved; direct Kakao OIDC is provisional only.
- Final PSP, merchant entity, contract/KYC, test channel, methods, fees, settlement,
  refund limitations, and data-processing terms: unresolved; direct Toss V2 is provisional only.
- Courier/tracking, notification channel, support ownership/SLA, return/refund rules,
  inventory disposition, tax/receipt behavior, and incident ownership: unresolved.

Until a gate is cleared, an internal sandbox may use a neutral non-product placeholder and
the minimum verified text needed to identify the test item. It must not resemble a public
store launch or claim commercial, regulatory, provider, or Legal readiness.

## 2. Experience principles and invariant language

1. **Money truth before optimism.** “결제 완료” appears only after server-confirmed PSP
   capture and a bound internal order. A redirect, spinner, or webhook receipt is not proof.
2. **Unknown is a state.** Timeout, missing event, provider outage, and internal update lag
   produce a named pending/unknown state with recovery—not a fabricated success or failure.
3. **No duplicate irreversible action.** While payment/refund truth is unknown, the UI
   disables a second payment/refund and offers status refresh plus support.
4. **Order history is the recovery home.** Closing the browser, losing a mobile redirect,
   session expiry, or process restart must not strand the customer on a transient page.
5. **Commercial and suitability truth are separate.** A product may remain ordinarily
   purchasable while a Foundation suitability check is unavailable. No “recommended for you”
   copy appears without a current Foundation verdict.
6. **Affected-item containment.** Missing/withdrawn canonical product state blocks or hides
   only the affected SKU; existing orders, refunds, support, and unrelated commerce remain usable.
7. **Customer copy describes observed state.** Avoid “곧”, “즉시”, “확정”, or refund-arrival
   promises unless a later approved policy/provider contract supplies the exact commitment.
8. **Operator detail is protected.** Customer screens never expose provider payloads,
   signatures, internal exceptions, raw IDs, secrets, or other customers’ information.

## 3. Experience-state vocabulary (not a database enum)

The future Cosmile technical design maps its authoritative state model into this stable
experience projection. These labels do not prescribe tables or transaction order.

| Experience state | Customer meaning | Customer action | Operator meaning |
|---|---|---|---|
| `AVAILABLE` | facts, price, and sellability may be shown | add to cart | all current commercial gates pass |
| `CHECKOUT_REVIEW` | cart was re-priced/revalidated | confirm or edit | no money action yet |
| `PAYMENT_ACTION_REQUIRED` | provider step is required | continue once | payment intent exists, not captured |
| `PAYMENT_CONFIRMING` | result is not yet authoritative | wait, refresh, open order history | do not permit another charge |
| `ORDER_CONFIRMED` | capture and internal order are bound | view order | payment/order/inventory effects reconciled for this milestone |
| `FULFILLMENT_PENDING` | order accepted; shipment not yet created | view status/support | fulfillment owner now holds the handoff |
| `SHIPPED` | verified tracking record exists | open verified tracking | courier reference and handoff recorded |
| `DELIVERED` | delivery status is recorded | request support/return if policy allows | delivery evidence recorded |
| `CANCELLATION_REQUESTED` | request received, not completed | view status | eligibility/effect pending |
| `RETURN_REQUESTED` | return request received, not refund proof | follow approved instructions | return authorization/inspection pending |
| `REFUND_CONFIRMING` | reversal is in progress or internally reconciling | wait, refresh, support | no duplicate reversal allowed |
| `REFUNDED` | provider refund is confirmed and internal order is reconciled | view refund summary | money/order state consistent; inventory disposition may remain separate |
| `ACTION_REQUIRED` | customer input or an approved retry is safe | perform the named action | prior attempt is conclusively non-captured/non-refunded |
| `TEMPORARILY_UNAVAILABLE` | a reversible service/surface is unavailable | use unaffected commerce or retry later | no irreversible action |
| `HOLD` | the system cannot safely continue | view safe explanation/support reference | named gate/incident requires authorized resolution |

Every state response must include: customer-safe state, last update time, whether refresh
is safe, whether a new irreversible action is allowed, one next action, and a support
reference when manual handoff is possible. Durations and escalation thresholds are
configuration/policy inputs; this design does not invent them.

## 4. Customer journey A — discovery through Golden Order

### 4.1 Discovery and product detail

1. Customer opens the ELT catalog. Only locally projected, commercially eligible products
   appear. No synchronous Foundation request gates the page.
2. The representative card shows canonical Korean name/spec from the pinned snapshot and
   KRW price/stock from Cosmile. Foundation’s dated offer is not current price authority.
3. If no rights-cleared image exists, the card uses a neutral “상품 이미지 준비 중” panel
   with product name; it never fabricates a product likeness.
4. PDP separates:
   - canonical product facts and snapshot status;
   - Cosmile price, SKU, availability, delivery/return-policy links;
   - claims/cautions that passed the approved content/MFDS/rights gates;
   - a distinct suitability module.
5. Suitability states are `VERIFIED_RESULT`, `NOT_REQUESTED`, or `UNAVAILABLE/UNKNOWN`.
   The latter copy is: **“개인 적합성 확인을 지금 사용할 수 없습니다. 상품 정보와 일반
   구매는 계속 이용할 수 있습니다.”** It never becomes positive/negative advice.

### 4.2 Cart, identity, and checkout review

6. Guest may browse and use the existing cart seam. Whether guest checkout is permitted is
   a Leo/Legal/PSP decision; the Golden path uses a synthetic logged-in sandbox customer.
7. Login redirects through the later approved identity adapter. The return page displays
   `로그인 확인 중` until the server session is established; URL claims are not trusted.
8. Guest-to-user cart merge runs once. The confirmation reports kept, combined, removed,
   and changed quantities. No item silently disappears; a stock/price conflict returns to cart.
9. Checkout displays server-revalidated line price, discount, shipping charge or
   `배송비 확인 필요`, total KRW, product/SKU, quantity, seller/legal links, and required
   consent checkboxes supplied by approved policy. No checkbox is preselected.
10. If any price changed, the changed line and old/new totals are announced and explicit
    reconfirmation is required. If stock is unavailable, payment cannot start.

### 4.3 Payment and confirmation

11. A single “결제하기” activation creates/reuses one payment intent. The button becomes
    unavailable while the action is pending; repeated taps do not create another charge.
12. The customer is handed to the approved provider’s official test flow. On mobile, the
    return route can recover after app switching, browser closure, or session renewal.
13. On return, the screen always says **“결제 결과 확인 중”** until Cosmile confirms the
    provider state and binds expected order, amount, KRW currency, and payment reference.
14. Conclusive failure shows safe reason category and `다시 결제` only when a new attempt
    is safe. Timeout/unknown shows refresh/order-history/support; it never offers immediate repayment.
15. Only after capture plus internal order/inventory reconciliation does the customer see
    **“주문이 확인되었습니다”**, public order reference, exact paid total, item/SKU snapshot,
    time, next fulfillment state, and links to order history/support.

### 4.4 Fulfillment continuity

16. Order detail is the durable home. It shows a chronological customer-safe timeline:
    order received → payment confirmed → fulfillment preparing → shipped → delivered.
17. Shipment/tracking appears only after a verified record exists. Without one, copy is
    **“배송 준비 상태를 확인 중입니다”**—never a fake tracking number or guessed courier.
18. Delayed/missing shipment events retain the last verified state and support reference;
    the operator receives a missing-event/reconciliation task.

## 5. Customer journey B — separate captured-payment Golden Reversal

Golden Reversal is a second rehearsal with a distinct order/run reference. It starts from
a server-confirmed **captured** sandbox payment; a pre-approval void does not qualify.

1. Customer opens the captured order and requests cancellation/refund through the state-
   appropriate action. The screen first explains that a request is not yet completion.
2. The backend returns one policy projection: `ELIGIBLE`, `INELIGIBLE_WITH_APPROVED_REASON`,
   `MANUAL_REVIEW`, or `POLICY_UNAVAILABLE`. The UI does not decide Korean withdrawal,
   opened-cosmetic, shipping-fee, damage, partial-refund, or timing rules.
3. For the sandbox Golden Reversal, an authorized operator uses the approved full-refund
   path for the captured test order. The customer sees `환불 처리 중`.
4. Provider refund/cancel truth is confirmed through the authenticated server boundary.
   A webhook/redirect alone does not close the reversal.
5. Once provider refund is confirmed but internal update is pending, customer copy is:
   **“환불은 확인되었으며 주문 상태를 업데이트하고 있습니다.”** The refund button
   remains disabled; the operator sees a high-attention reconciliation item.
6. `REFUNDED` is displayed only after money and internal order state agree. The summary
   shows refunded amount/currency, status time, safe payment-method label, and policy text
   without promising bank/card posting time unless the provider contract supplies it.
7. Inventory disposition is independent. Until an approved return/restock policy and any
   inspection are complete, the item remains `재고 처리 보류` and is not silently made sellable.

## 6. Cancellation, return, refund, shipment, and support model

| Stage | Customer experience | Required handoff | Never claim |
|---|---|---|---|
| before payment capture | cancel checkout/order attempt; show no charge only after provider/internal confirmation | checkout → payment operations if state unknown | “취소 완료” from client state alone |
| captured, not fulfilled | submit cancellation; show requested/pending until fund reversal and order reconcile | customer support → payment operations | that status-label change refunded money |
| fulfillment started/shipped | cancellation may become return/manual review according to approved policy | support → fulfillment/courier → Legal policy if ambiguous | automatic eligibility or free return |
| delivered | show policy-derived return window/action or manual review | support → returns operations | an invented seven-day outcome, exception, or fee |
| return in transit | show verified carrier scan only | courier → returns operations | delivery/receipt without evidence |
| return received | show inspection pending/result category | returns → inventory operations | automatic restock |
| refund pending | status refresh and support; no duplicate action | payment operations → PSP boundary | success from webhook or operator click |
| refund complete | refund summary; inventory may still be HOLD | payment ops → accounting/reconciliation | settlement/tax closure not evidenced |

The baseline support surface is authenticated order detail plus a support reference. Email,
Kakao Alimtalk, SMS, push, phone, response SLA, courier label, and return address are not
selected. If no approved channel exists, the UI must say support configuration is unavailable
and preserve the request in order history; it must not show fictional contact information.

## 7. Login, session, guest-to-user, consent, and privacy touchpoints

### 7.1 Customer identity

- The design is provider-neutral OIDC at the experience boundary. Direct Kakao OIDC is the
  provisional O1 recommendation only; Leo/provider eligibility must select it.
- Stable account binding is issuer+subject to an internal customer identity. Email/name are
  display claims, never identity keys.
- Login states: `redirecting`, `provider_action`, `callback_verifying`, `session_active`,
  `session_expired`, `account_collision/manual_recovery`, `provider_unavailable`, `HOLD`.
- Callback error copy does not disclose token/signature detail. Recovery preserves the guest
  cart and returns to the originating safe screen.
- Session expiry during PSP redirect does not lose the order. After re-authentication, the
  server-owned order/payment status is recovered from order history.

### 7.2 Guest-to-user

- Merge is explicit, idempotent, and owner-scoped. The customer receives a merge summary.
- Price/stock are revalidated after merge. Conflicts never silently prefer stale guest data.
- The choice to allow guest checkout, account linking across providers, or account merge is
  an unresolved Founder/identity policy decision. Golden evidence uses one synthetic account.

### 7.3 Consent/privacy

- Login consent, storefront privacy/terms, order/payment consent, marketing consent, and
  Foundation consultation consent are distinct purposes and must not be bundled or inferred.
- Optional consent is unselected by default; refusal of consultation/marketing does not block
  ordinary commerce unless an approved Legal rule specifically requires otherwise.
- Request minimum provider claims. Customer/operator screens and evidence packages mask PII,
  provider references, tokens, addresses, and contact data.
- Customer support may see only role-authorized order information. Audit views never expose
  secrets, full provider payloads, or another customer’s order.

## 8. Customer order history and recovery home

Order history is available only to the authenticated owner and contains:

- public order reference, order time, total KRW, safe item snapshot, and current experience state;
- latest verified timeline event and `마지막 확인` time;
- one safe next action: pay, refresh, request cancellation/return, view tracking, or support;
- persistent anomaly copy for payment/refund/internal reconciliation without duplicate action;
- exact historical product/SKU/price/policy/snapshot display for the order, even if the
  current catalog product is corrected or withdrawn.

After restart, redirect loss, or provider delay, the customer returns here. A transient
confirmation page must never be the sole evidence of purchase or refund.

## 9. Operator journey and authorization

The existing console identity/RBAC/audit boundary is reused. Current owner/admin write
authorization is preserved; viewer/editor do not gain refund, order, stock, or incident
mutation authority through this design. Any expanded role or dual-approval policy requires
Leo’s decision.

### 9.1 Operator workspace

1. **Reconciliation queue:** category, age, amount/currency, safe order reference, current
   payment/order/inventory/fulfillment projections, owner, and next permitted action.
2. **Order timeline:** customer-safe events plus protected operator categories; provider and
   internal events remain distinguishable and timestamped.
3. **Payment/refund panel:** confirmed provider status, internal state, idempotency outcome,
   last verification, and whether retry is safe. No raw secret/signature/payload.
4. **Inventory panel:** availability/reservation/commit/release/disposition projection and
   conflict reason; manual stock correction requires authorized reason and audit.
5. **Fulfillment/return panel:** verified shipment/tracking/return/inspection events only.
6. **Canonical snapshot panel:** Foundation product ID, bound Cosmile SKU, snapshot version,
   current/stale/missing/withdrawn/corrected category, rights/MFDS/imagery gates, and affected listings.
7. **Incident panel:** safe correlation reference, category, first/last observed time, affected
   count, containment, owner, recovery evidence, and closure state.

### 9.2 Named handoffs

| From | To | Trigger | Required evidence |
|---|---|---|---|
| customer | customer support | status unknown, policy/manual review, inaccessible flow | support ref + authenticated order context |
| support | payment operations | captured/unknown/refund discrepancy | safe order/payment category, amount/currency, last provider confirmation |
| support | fulfillment/returns | shipment, delivery, return, inspection issue | order item, verified tracking/return state |
| payment operations | approved PSP boundary | provider confirmation/refund/reconciliation | authorized server request; no customer-provided truth |
| fulfillment | courier boundary | create/track/return shipment | approved address/label policy and verified carrier ref |
| returns | inventory operations | received/inspected item | disposition category and audit reason |
| catalog operations | Foundation snapshot owner | missing/stale/corrected/withdrawn product facts | product ID + snapshot/version category, no commerce mutation request |
| operator | Legal/privacy/tax authority | policy or data decision absent | exact question and bounded affected state |
| any operations owner | incident owner | threshold breach, mismatch, repeated failure | category/count/timestamps/containment; no PII or secrets |

Numeric thresholds, shifts, SLAs, named humans, and provider escalation contacts are operating
decisions still required. The UI consumes them; it does not invent them.

### 9.3 End-to-end operator journey

**Golden Order:** catalog operations verifies the representative binding and gate categories;
the sandbox operator confirms environment/identity/price/stock preflight; payment operations
watches one intent move from action-required to provider-confirmed capture; order operations
verifies the capture is bound to one internal order; inventory operations verifies the approved
effect; customer support confirms order-history visibility; fulfillment accepts the order with
no fabricated shipment; reconciliation closes only when all displayed projections agree.

**Separate Golden Reversal:** support opens the distinct captured order; the policy projection
returns an approved sandbox test path; an authorized payment operator initiates one full reversal;
the customer and operator remain in refund-confirming until provider truth is verified; order
operations resumes any failed internal update without sending a second reversal; inventory keeps
the item on disposition HOLD unless an approved test policy says otherwise; reconciliation closes
only after provider refund, order history, audit, and operator views agree. Any mismatch hands to
the incident owner with the original support/order reference and containment intact.

## 10. Screen/state/action map

### 10.1 Customer surfaces

| ID / surface | Trigger or state | Truthful display | Allowed action | Backend experience requirement |
|---|---|---|---|---|
| C01 Catalog | current approved local snapshot | canonical name/spec; Cosmile price/stock; rights-cleared image or neutral placeholder | open PDP | no synchronous Foundation dependency |
| C02 Catalog item HOLD | rights/MFDS/human-review/missing/withdrawn gate | item hidden or “현재 구매할 수 없음” on direct link | other products | affected SKU only; no reason leakage |
| C03 PDP | available | canonical facts/cautions separated from commerce terms and suitability | add to cart | return snapshot+commercial gate categories |
| C04 Suitability unavailable | Foundation runtime/verdict unavailable | “개인 적합성 확인을 지금 사용할 수 없습니다…” | ordinary buy/browse; retry consultation | no fallback or guessed verdict |
| C05 Cart | stable | items, server display prices, stock status | edit/checkout | owner-scoped persistent cart |
| C06 Cart changed | price/stock/snapshot correction | explicit changed line and before/after | accept/edit | no payment until reconfirmed |
| C07 Login redirect | auth required/selected | provider handoff and return explanation | continue/cancel | preserve safe return target and guest cart |
| C08 Login callback pending | callback received | “로그인 확인 중” | wait/recover | server verifies session; URL is not identity proof |
| C09 Guest merge | session established | kept/combined/removed/conflicted summary | continue/edit | idempotent merge; re-price/re-stock |
| C10 Checkout review | all preconditions current | exact SKU, quantity, KRW totals, policy links/consents | pay once/edit | server-authoritative price/coupon/stock |
| C11 Last-stock conflict | reservation/revalidation fails | “재고가 변경되어 결제를 시작하지 않았습니다” | return to cart | no PSP action; cart preserved |
| C12 Payment handoff | intent ready | amount/order summary and provider transition | continue once/cancel | one idempotent intent |
| C13 Payment return pending | redirect/unknown/webhook delay | “결제 결과 확인 중”; last check time | refresh/history/support | server confirms provider; no repay |
| C14 Payment failure | confirmed non-capture | safe failure category | retry with a new safe attempt/edit | prove prior attempt non-captured |
| C15 Captured/internal pending | PSP captured; order bind/update failed | “결제는 확인되었으며 주문 확정 중입니다” | history/support | no second charge; reconciliation incident |
| C16 Order confirmed | capture+order+inventory milestone reconciled | public order ref, paid total, item snapshot, next status | order detail | durable order history |
| C17 Fulfillment pending | no shipment yet | last verified fulfillment state | refresh/support/cancel if policy permits | no fake tracking |
| C18 Shipped | verified shipment | carrier label + masked tracking + last update | verified tracking/support | carrier record is authoritative for display |
| C19 Shipment event missing | expected event absent/delayed | last verified status + “확인 중” | support | operator missing-event queue |
| C20 Cancellation request | request accepted | request time and “완료 아님” | view status | policy/effect projection |
| C21 Return request | policy allows/manual review | instructions or review pending | follow verified instruction | no invented label/address/window |
| C22 Refund confirming | reversal sent/unknown/internal lag | refunded amount target, last check, no duplicate CTA | refresh/support | idempotent refund and provider confirmation |
| C23 Refund confirmed/internal pending | provider success; order update failed | “환불은 확인되었으며 주문 상태를 업데이트…” | history/support | no second refund; incident queue |
| C24 Refunded | provider+internal reconciled | amount/currency/time/method label; posting caveat | summary/support | inventory disposition may remain HOLD |
| C25 Restart/session recovery | process/browser/session loss | recovered latest state from history | one safe next action | state is durable; transient page not authority |
| C26 HOLD | gate/policy/incident cannot safely continue | safe explanation and support ref | unaffected commerce/support | no irreversible action |

### 10.2 Operator surfaces

| ID / surface | Trigger | Operator display | Allowed action | Guard |
|---|---|---|---|---|
| O01 Reconciliation queue | any cross-system mismatch | category, age, amount, state triplet, owner | open/assign/acknowledge | authorized console session |
| O02 Payment detail | pending/failed/captured | provider-confirmed vs internal state, last query, retry safety | verify/retry only if contract says safe | owner/admin + idempotency + audit reason |
| O03 Duplicate event | same provider event/attempt replay | `DUPLICATE_IGNORED`, original effect reference | inspect only | zero repeated customer/order effect |
| O04 Missing/delayed event | expected event threshold reached | last known provider state, detection time | query/reconcile/escalate | threshold configured by operations |
| O05 Captured/order failure | capture exists, order not confirmed | `CAPTURED_INTERNAL_PENDING`, customer containment | resume internal bind or approved compensation | never re-charge; audited |
| O06 Last-stock conflict | competing reservation | winner/loser category, no PII | release/reconcile according to approved policy | no manual oversell concealment |
| O07 Refund request | eligible/manual review | policy version, amount, fulfillment/return state | approve/deny/request evidence if authorized | no Designer-invented policy |
| O08 Refund/internal failure | provider refund confirmed, update failed | `REFUNDED_INTERNAL_PENDING` | resume internal update/reconcile | never send second refund |
| O09 Inventory disposition | cancel/return/refund | reserved/committed/release/HOLD/inspection category | apply approved disposition | reason + authorization + audit |
| O10 Shipment/return | record/event missing | last verified carrier state | reconcile/escalate | no fabricated tracking |
| O11 Snapshot operations | stale/missing/corrected/withdrawn | affected SKU/listing/order count, snapshot pin, gates | contain listing, accept approved snapshot | cannot edit Foundation facts |
| O12 Access denied | insufficient role/session | requested capability and safe denial | re-auth/request authorized owner | no privilege escalation |
| O13 Incident | repeated/systemic mismatch | impact counts/categories/timeline/containment | assign/contain/recover/close | named incident owner required |
| O14 Recovery | restart/retry succeeds | original incident, recovered states, evidence time | close after reconciliation | closure is auditable, not delete/history rewrite |

## 11. Required exception and recovery behavior

| Scenario | Customer result | Operator result | Forbidden response |
|---|---|---|---|
| success | order/refund terminal summary only after reconciliation | closed matching state | early success |
| pending | last verified state, update time, safe refresh | owned queue item if overdue | indefinite spinner without recovery |
| conclusive failure | safe category and retry only if non-effect proven | failure evidence + attempt history | leaking provider diagnostic |
| timeout | `PAYMENT_CONFIRMING` / `REFUND_CONFIRMING` | verify provider before action | immediate second charge/refund |
| delayed provider event | pending; order history remains home | missing-event detector/query | treating delay as failure/success |
| missing provider event | last verified truth and support | reconciliation queue | silent drop |
| duplicate/replayed event | no duplicate message/effect | `DUPLICATE_IGNORED` audit | duplicate order, inventory, refund |
| out-of-order event | retain monotonic verified state | quarantine/reconcile event | state regression |
| last-stock conflict before payment | return to cart; no charge | conflict evidence | starting payment anyway |
| payment success/internal order failure | captured, order confirming; no repayment | high-attention captured-unbound recovery | telling customer payment failed |
| refund success/internal update failure | refund confirmed, internal update pending; no repeat | high-attention recovery | second refund or “not refunded” |
| restart recovery | recover from order history | resume idempotent work from durable truth | reset to initial state |
| Foundation unavailable | ordinary commerce from approved local projection; suitability unknown | outage category, no catalog-wide shutdown | guessed suitability |
| HOLD | affected action contained; safe support ref | owner/gate/reason visible | bypass or silent manual mutation |

## 12. Foundation snapshot lifecycle experience

This is a local experience projection; the Foundation Worker owns the later bounded delivery
design. Connection status and canonical product status must not be conflated.

| Snapshot condition | Catalog/PDP | Cart/checkout | Existing order | Operator |
|---|---|---|---|---|
| `CURRENT_APPROVED` | display gated fields | revalidate local binding | retain exact order-line snapshot | normal |
| Foundation runtime unavailable, local snapshot still approved | ordinary commerce continues; suitability `UNKNOWN` | continues from local commerce truth | unaffected | outage visible; no synchronous fallback |
| `STALE_LAST_APPROVED` | show last approved content only if approved commercial policy still permits; otherwise affected item HOLD | require current local commercial decision | historical snapshot retained | warning, age/version, owner; stale threshold remains Leo decision |
| `MISSING_INITIAL` | affected product not exposed | cannot add/pay affected line | none or historical order remains visible | mapping/snapshot task |
| `CORRECTED/SUPERSEDED` | new display uses newly approved snapshot | cart highlights change and reconfirms | historical order does not rewrite | diff/version/effective time |
| `WITHDRAWN` | affected listing unavailable | checkout blocks affected line | history, support, cancellation/return/refund remain usable | affected inventory/listings contained; reason category |
| rights/MFDS/imagery gate unresolved | no public sale/display beyond approved minimal fallback | HOLD affected SKU | historical/legal service remains | exact external gate shown |

The infrastructure outage alone never changes a locally approved snapshot to withdrawn.
Conversely, a locally received withdrawal cannot be ignored merely because ordinary commerce
must remain available; only that product is contained.

## 13. Product-experience frontend/backend interaction requirements

These are semantic requirements, not repository paths, APIs, schemas, or migration choices.

### 13.1 Read projection

Each customer screen needs one server-authoritative projection containing:

- public order/product/SKU references suitable for that customer;
- canonical snapshot category/version and commercial gate category;
- current KRW line prices, discounts, shipping, total, and `price_reconfirmation_required`;
- inventory/sellability projection and whether checkout action is permitted;
- customer-safe experience state, last verified update, next action, refresh safety, and
  whether a new irreversible action is allowed;
- policy version/category for cancellation/return/refund without internal Legal notes;
- support reference; and
- explicit suitability status/result provenance separate from commerce.

The frontend must not derive paid/refunded/shipped/eligible from URL parameters, button clicks,
webhooks, elapsed time, client cache, or Foundation product facts.

### 13.2 Commands

- Every payment, cancellation, return, refund, stock correction, and operator recovery action
  is single-submit and idempotent from the experience perspective.
- Command response is one of `accepted_pending`, `completed`, `rejected_safe`, `unknown_recoverable`,
  or `HOLD`, with the durable resource/support reference. HTTP success alone is not business success.
- Retrying is shown only when the backend explicitly states it cannot repeat an irreversible effect.
- Operator mutation requires authenticated capability, reason, target version, and audit result.
- Customer and operator refresh are read-only and safe at any time.

### 13.3 Event/pending behavior

The backend supplies last-known authoritative time and next recommended check; the frontend may
refresh/poll within a later approved operational policy, stops while hidden/backgrounded, and
always offers order-history recovery. It never invents a timeout-to-failure rule. Duplicate or
out-of-order events do not regress the displayed state or repeat notifications.

## 14. Customer copy truthfulness

| Condition | Required Korean copy | Avoid |
|---|---|---|
| payment unknown | `결제 결과를 확인하고 있습니다. 다시 결제하지 마세요.` | `결제 실패` |
| captured/internal pending | `결제는 확인되었으며 주문 확정 중입니다.` | `주문 완료` or `결제 실패` |
| conclusive payment failure | `결제가 완료되지 않았습니다.` + safe retry instruction | raw PSP code/message |
| cancellation pending | `취소 요청을 받았습니다. 완료 여부를 확인 중입니다.` | `취소 완료` |
| refund pending | `환불 처리 상태를 확인하고 있습니다.` | exact arrival date without contract |
| refund confirmed/internal pending | `환불은 확인되었으며 주문 상태를 업데이트하고 있습니다.` | second-refund CTA |
| shipment unknown | `배송 준비 상태를 확인 중입니다.` | fake tracking/courier |
| suitability unavailable | `개인 적합성 확인을 지금 사용할 수 없습니다. 상품 정보와 일반 구매는 계속 이용할 수 있습니다.` | any inferred recommendation/safety claim |
| product withdrawn | `이 상품은 현재 판매하지 않습니다.` | exposing internal/legal reason |
| policy unavailable | `요청 가능 여부를 확인 중입니다. 지원 번호를 보관해 주세요.` | invented denial/approval |

## 15. Accessibility and mobile behavior

- Target WCAG 2.2 AA for these designed surfaces. Status is text plus icon, never color alone.
- Page title, main heading, error summary, and current step are programmatically exposed.
- Pending changes use polite live announcements; confirmed payment/refund failure and changed
  total use assertive announcements once, without repeated polling noise.
- Focus moves to the result/error heading after callback, price change, stock conflict, or
  form error. All actions work by keyboard with visible focus and at least 44×44 CSS-pixel targets.
- Payment/refund buttons expose disabled/busy state and do not disappear while pending.
- Timelines are ordered lists with text equivalents; provider logos/images have meaningful
  labels or are decorative. The neutral product placeholder conveys “image unavailable”.
- Korean copy must reflow at 200% zoom and narrow mobile width; totals and state never rely on
  side-by-side comparison alone. Reduced-motion removes spinner rotation and uses static status.
- Mobile redirect return restores context from the server reference, not browser memory. A lost
  tab/session routes through re-authentication to order history without issuing another payment.
- Offline/network loss displays last verified time, read-only order reference, and a retry that
  only refreshes state; irreversible actions remain unavailable while outcome is unknown.

## 16. Demonstration script and observable evidence

### 16.1 Preflight — mandatory HOLD gates

The future rehearsal owner records, without exposing secrets/PII:

1. declared official sandbox/test environment and build/design version; live mode is impossible;
2. synthetic customer and authorized sandbox operator identities;
3. representative Foundation product/snapshot pin and Cosmile SKU binding;
4. Cosmile-authoritative KRW test price and inventory;
5. rights/MFDS/imagery disposition. If unresolved, use a restricted text-only internal fixture
   and record `NOT_LIVE_SALE_EVIDENCE`; never assert commercial clearance;
6. approved identity/PSP test configuration by category/status only;
7. order/payment/refund/inventory/reconciliation views empty or at known baseline; and
8. hard stop, rollback, and incident owner confirmed.

Any accidental live credential/mode, real customer, real payment method, unapproved public
exposure, or missing capture/refund capability produces `HOLD` and no transaction.

### 16.2 Golden Order — run GO-1

1. Sign in as the synthetic customer; capture session-active and guest-merge outcome.
2. Open representative catalog/PDP; capture product ID, snapshot version, SKU, no fabricated
   image/suitability, and server KRW price/stock.
3. Add quantity 1; checkout revalidates price/stock/consent and records exact line snapshot.
4. Initiate one provider sandbox payment; capture internal attempt reference and expected KRW amount.
5. Complete provider sandbox approval/capture. On return, show `PAYMENT_CONFIRMING` first.
6. Confirm provider state server-side, bind capture to order, commit approved inventory effect,
   then show `ORDER_CONFIRMED` in customer history and matching operator timeline.
7. Record a fulfillment-pending record only; do not fabricate real shipment/tracking.
8. Replay the same notification/confirmation input once in the approved test harness and prove
   `DUPLICATE_IGNORED` with zero second order/charge/stock effect.

### 16.3 Captured-payment Golden Reversal — separate run GR-1

1. Use a distinct sandbox order with a confirmed captured payment; record that this is not a void.
2. Submit the configured sandbox cancellation/refund request through an authorized operator.
3. Display `REFUND_CONFIRMING`; call the approved provider sandbox full-reversal path once.
4. Confirm provider refund state server-side; update the internal order and customer history.
5. Keep inventory disposition at `HOLD` unless the approved test policy explicitly supplies a
   safe disposition; do not auto-restock by assumption.
6. Repeat the same reversal request/idempotency input and prove zero second refund.
7. Close only when provider refund, internal order, customer history, audit, and operator
   reconciliation agree. Keep fulfillment/tax/accounting limitations explicit.

### 16.4 Evidence package

Permitted evidence is category/status/count/time and masked sandbox references:

- screen captures of each customer state and operator reconciliation state;
- declared environment/mode, product/snapshot/SKU/price/policy version, and run references;
- ordered category-only state timeline with timestamps;
- provider sandbox dashboard/API status evidence with keys, full payment refs, and PII masked;
- idempotency evidence showing one capture/one refund and duplicate inputs causing zero effect;
- inventory before/after/disposition category;
- restart/recovery and missing-event probe results if separately authorized; and
- explicit no-live/no-rights/no-MFDS/no-shipping/no-load/no-production claims.

`SANDBOX_WALKING_SKELETON_EVIDENCE` proves only one synthetic Korea/KRW path in an official
test environment and one captured sandbox reversal. It does not prove production readiness,
merchant eligibility, legal compliance, commercial rights, broad catalog correctness, real
shipping, customer support, accounting/tax closure, availability, security certification,
performance, or Public Launch readiness. It never auto-unlocks implementation or a next mission.

## 17. Acceptance criteria for later implementation review

An independent reviewer must be able to verify:

1. every customer state in §10 has exact trigger, copy, action, recovery home, and safe unknown behavior;
2. payment/refund success is server-confirmed and never inferred from redirect/webhook/client state;
3. duplicate, delayed, missing, out-of-order, timeout, restart, captured/order failure, and
   refunded/internal failure cases cannot repeat irreversible effects;
4. customer history and operator reconciliation show consistent durable truth after recovery;
5. last-stock conflict cannot charge the customer before availability is secured, and a
   post-capture anomaly is contained/reconciled rather than mislabeled;
6. Foundation outage leaves unrelated commerce available and never fabricates suitability;
7. missing/withdrawn/corrected snapshots affect only the correct product and preserve historical orders;
8. guest merge is owner-scoped, explicit, idempotent, and loss-visible;
9. owner/admin authorization, audit reason, and protected detail apply to irreversible operator actions;
10. accessibility/mobile/offline behaviors in §15 are demonstrated;
11. rights/MFDS/imagery/provider/Legal/identity/operating gates remain unresolved unless direct
    approved evidence closes them; and
12. Golden Order and Golden Reversal are separate, official-sandbox, category-evidenced runs under the ceiling.

## 18. Assumptions, unknowns, and decisions for Leo

### 18.1 Explicit design assumptions

- A1: the rehearsal is Korea/KRW, non-live, synthetic-customer, quantity-one, full-capture,
  full-refund, single representative SKU.
- A2: existing server-authoritative cart/repricing, owner-scoped order history, operator
  console/RBAC/audit, and Foundation display boundary are reused rather than rewritten.
- A3: order history is available after authentication and is the durable customer recovery surface.
- A4: the sandbox may use a restricted text-only product fixture while commercial rights/image
  gates are unresolved; this is not a public storefront or live-sale approval.
- A5: no time/SLA, return eligibility, fee, restock, partial refund, or notification promise
  is made until an approved policy supplies it.

### 18.2 Known unknowns carried forward

- Foundation snapshot delivery/cadence, approval owner, stale threshold, correction/withdrawal
  signaling, rights-gate record, and sales-status normalization.
- Pad 40-count volume, sunscreen inclusion, MFDS report numbers/display wording, product copy/image rights.
- Final identity/PSP, account collision/recovery, guest checkout, provider consent/review,
  merchant/KYC/test channel, webhook/network/secret operations.
- Cancellation/withdrawal/return/refund policy, opened/damaged cosmetics treatment, fees,
  inventory disposition, partial refunds, accounting/tax/receipt behavior.
- Shipping/courier/tracking, notifications, support channel/SLA, named reconciliation and incident owners.
- Production Postgres/migration state and all repository-local technical choices (Phase 5 owner).

### 18.3 Decisions required from Leo (concise options, no silent selection)

| Decision | Options framed by current evidence | Designer recommendation |
|---|---|---|
| customer identity | direct Kakao OIDC; brokered OIDC; later multi-method | direct Kakao OIDC for narrow O1, adapter-shaped; confirm eligibility/consent first |
| guest checkout | allow; require login; conditional | use logged-in synthetic O1; decide before customer build |
| PSP | direct Toss V2; PortOne V2 + PG | direct Toss V2 for one narrow KRW path; vendor confirmation required |
| product exposure | representative only; +pad boundary; +conditional sunscreen | serum for both golden runs; pad 80-count boundary; sunscreen only after MFDS/Legal need is affirmed |
| commercial gates | rights/MFDS/imagery/human-review owner and evidence | no public exposure until each is explicitly recorded |
| cancellation/return/refund | policy owner, eligibility, fees, timing, partials, inventory disposition | choose policy before build; unknown routes to manual review/HOLD |
| fulfillment/support | courier/tracking/notification/support/incident owners and SLAs | select minimum named operating owners before rehearsal |
| stale snapshot | validity threshold and approval owner | outage alone continues last approved projection; explicit withdrawal contains affected SKU |
| operator control | existing owner/admin; optional step-up/dual approval | preserve owner/admin baseline; decide step-up/dual control for refund/stock correction |

## 19. No-build and scope boundaries

- No product repository file, code, schema, migration, DB, runtime, test, endpoint, secret,
  provider account, transaction, KYC, contract, merchant activation, or live flag was touched.
- No repository-local backend architecture, API route, database model, transaction order, job,
  queue, adapter implementation, or file allowlist is selected here; those belong to Phase 5.
- No Legal, rights, MFDS, privacy, tax/accounting, inventory, shipping, refund, provider, or
  identity risk is accepted.
- Foundation ownership is unchanged; Foundation AI, SIASIU AI, Memory V3, recommendation UI,
  B2B2C, influencer, advanced dashboard, AI pricing/CRM, US/USD implementation, Public Launch,
  and broad rewrite remain excluded.
- Review of this artifact grants no implementation authority. A later reviewed scope still
  requires Leo’s explicit freeze and a new exact Advisor handoff.

## 20. Requirement traceability and return

| Handoff requirement | Design sections |
|---|---|
| complete customer/operator journeys | §§4–9 |
| success/pending/failure/timeout/delayed/missing/duplicate/stock/internal failures/restart/HOLD | §§10–11 |
| cancellation/return/refund/shipment/tracking/support/reconciliation/incident | §§6, 9–11 |
| login/session/guest/history/operator auth/consent/privacy | §§7–9 |
| Foundation stale/missing/withdrawn and ordinary commerce | §12 |
| frontend/backend experience requirements | §13 |
| Golden Order and separate captured Golden Reversal evidence | §16 |
| accessibility/mobile/copy/audit/recovery | §§9, 14–16 |
| facts/assumptions/unknowns/Leo decisions/no-build | §§1, 18–19 |

```text
DESIGNER_EXPERIENCE_DESIGN_COMPLETE: YES
STATUS: READY_FOR_INDEPENDENT_DESIGN_REVIEW
REPRESENTATIVE_SKU: elt-serum-vitayouth-01
BOUNDARY_SKUS: elt-pad-vitayouth-01 (80-count candidate; 40-count UNVERIFIED) · elt-sunscreen-vitayouth-01 (CONDITIONAL)
AUTHENTICATION_RECOMMENDATION: DIRECT_KAKAO_OIDC_PROVISIONAL_PENDING_LEO_AND_PROVIDER_GATES
PSP_RECOMMENDATION: DIRECT_TOSS_PAYMENTS_V2_PROVISIONAL_PENDING_LEO_AND_VENDOR_GATES
COMMERCIAL_RIGHTS_MFDS_IMAGERY: UNRESOLVED_HOLD_FOR_PUBLIC_EXPOSURE
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
SCOPE_EXPANSION_REQUESTED: NO
RETURN_TO: foundation-advisor
STOP
```
