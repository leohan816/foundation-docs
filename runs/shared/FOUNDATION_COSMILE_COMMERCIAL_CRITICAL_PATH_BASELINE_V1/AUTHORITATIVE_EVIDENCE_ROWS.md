# Authoritative Evidence Rows

This is the single reconciled row set projected into P1–P4. Detailed path-level
evidence remains in the three actor-owned results published at foundation-docs commit
`6cf253c9e04890ac7b512a5bbb7a48b07af807f8`.

## Common row values

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
EVIDENCE_CEILING: E2
E3_GENERATED: NO
E4_GENERATED: NO
ESTIMATE_BASIS: static source only; low confidence unless stated otherwise
COSMILE_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
SIASIU_HEAD: e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602
FOUNDATION_CONTROL_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0
```

## Cosmile rows

| Row | Capability / observed paths | Current implementation and status | Paid Beta / Public Launch impact | Owner, follow-up, estimate |
|---|---|---|---|---|
| C-01 | Catalog/PDP — `lib/foundationProductClient.ts`, mock product/commerce data | In-memory mock arrays; no canonical catalog DB. `MOCK` | Blocks sale of real SKUs; public catalog source required | Foundation catalog + Cosmile commerce fields; 5–12 wd; LOW |
| C-02 | Customer identity — `lib/shopper.ts`, mock auth routes | Default mock user; guest cookie/random ID; no real auth. `MOCK` | Hard Paid Beta/Public blocker | Cosmile + Founder auth-provider decision; 5–12 wd plus provider calendar; LOW |
| C-03 | Cart — Prisma Cart/CartItem, `lib/cart.ts`, cart APIs | Ownership-scoped DB cart, price snapshot, coupons. `IMPLEMENTED_STATIC` | Usable spine; depends on C-01/C-02 for real use | Cosmile; 1–3 wd regression/integration; MEDIUM |
| C-04 | Checkout/order creation — `lib/checkout.ts`, `/api/checkout/start` | DB pending order and reprice checks against mock catalog. `PARTIAL` | Blocks reliable real-money amount/source-of-truth | Cosmile; bind C-01/C-05; 3–7 wd; LOW |
| C-05 | Payment — mock-complete route/container | Status flip only; no PSP, webhook, idempotency, reconciliation. `MOCK` | Hard real-money blocker | Cosmile + Founder/vendor; 10–20 wd plus KYC; LOW |
| C-06 | Customer orders — order read APIs/pages | Ownership-scoped history/detail; no customer cancel/return. `PARTIAL` | Manual beta workaround possible only with approved operator process; public self-service gap | Cosmile + Legal/operations; 3–8 wd; LOW |
| C-07 | Inventory — `CommerceSku.stock` only | Display-only; no reserve/deduct/restore or locking. `MISSING` | Blocks real-stock consistency and creates oversell risk | Cosmile + inventory owner; 8–15 wd; LOW |
| C-08 | Shipment/tracking — order status label only | No shipment, carrier, or tracking model. `MISSING` | Blocks physical-goods beta absent explicit manual system of record | Cosmile + fulfillment owner/vendor; 5–12 wd plus vendor; LOW |
| C-09 | Cancellation/refund — admin status transition | Label transition; no payment reversal, coupon/stock restoration; refunded unreachable. `PARTIAL` | Hard once real payment is enabled | Cosmile + PSP/operations/Legal; 5–12 wd; LOW |
| C-10 | Admin/operator — console session/guard/audit/password | DB sessions, roles, scrypt; no rate limit/lockout; user-miss timing gap. `IMPLEMENTED_STATIC` | Small trusted beta conditional on security review; public hardening needed | Cosmile + Security; 3–7 wd; MEDIUM |
| C-11 | Foundation AI boundary — bridge/risk gate/slice | HTTP boundary, fail-closed gate, production OFF; ordinary commerce independent. `SOURCE_ONLY/SHADOW` | Not a blocker for O1; conditional blocker for O2 | Foundation + Cosmile joint; see F/X rows; LOW |

All Cosmile rows use source actor `cosmile` and source result
`runs/cosmile/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_COSMILE_STATIC_AUDIT_RESULT.md`
(SHA-256 `6a0ffed806a1af91ece6712ef30032bb65a8840280e5bee493ab04fce5d96ded`).

## Foundation rows

| Row | Capability / observed paths | Current implementation and status | Paid Beta / Public Launch impact | Owner, follow-up, estimate |
|---|---|---|---|---|
| F-01 | Canonical data read — `foundation_core/*` | External-vault path contract and deterministic parsing; content/availability not verified; missing data silently empty. `IMPLEMENTED_STATIC` | No O1 blocker; O2 prerequisite and availability risk | Foundation; E3 availability/health; 1–3 wd plus data discovery; MEDIUM |
| F-02 | Trust Core judgment — `foundation/_core/*`, guards | Deterministic 16-gate engine with static no-write invariants. `IMPLEMENTED_STATIC/SHADOW` | No O1 blocker; O2 needs execution/consumption evidence | Foundation; 1–3 wd evidence/exception envelope; MEDIUM |
| F-03 | In-process Core API — `foundation/api/*` | Seven-method dispatch and fail-closed response; no wire surface. `IMPLEMENTED_STATIC` | O2 cannot consume it across process/repo as-is | Foundation; service-boundary decision; 3–8 wd exclusive of ownership migration; LOW |
| F-04 | Cosmile adapter/display DTO — `foundation/cosmile/*` | Flag-gated adapters and deterministic fallback; default OFF; no repo-local adapter tests. `SHADOW` | No O1 blocker; O2 requires tests and consumer verification | Foundation + Cosmile; 2–5 wd; LOW |
| F-05 | Evidence-mode judgment | Module exists but is not wired; conflict check inert; exposed surfaces accept caller assertion. `PARTIAL` | Conditional O2/Public blocker for grounded claims | Foundation; 3–8 wd after design decision; LOW |
| F-06 | Retrieval/search | Design only in Foundation; current implementation described as SIASIU-side, not audited. `MISSING/UNVERIFIED` | Conditional O2/Public blocker | Foundation + Founder ownership decision; 5–15 wd; LOW |
| F-07 | SIASIU reference boundary | Reference types/invariants, no runtime import dependency. `IMPLEMENTED_STATIC` | Confirms no SIASIU dependency for O1 | Foundation; no beta work; HIGH for static claim |
| F-08 | Memory V3 shadow lane | WU1–WU7 reviewed at this head; WU8 C1/C2 in Cosmile; gates/runtime later work open and paused. `SHADOW/DEFERRED` | Explicit no-build; no O1 blocker | Foundation Team only after new Founder authority; deferred |
| F-09 | Security phase framework | Default deny/hold and phase scaffolding; not a production certification. `SOURCE_ONLY/SHADOW` | O1 unaffected while AI hidden; O2 requires scoped security evidence | Foundation + Security; 3–8 wd discovery; LOW |
| F-10 | Canonical product/brand/ingredient/claim data | No committed canonical datasets in this repo; external vault only. `UNVERIFIED` | O2 data readiness unresolved | Foundation/data owner; 2–5 wd discovery before estimates; LOW |
| F-11 | Deployment/monitoring/wire runtime | No Foundation HTTP server, deployment, or monitoring surface in this repo. `MISSING` | No O1 blocker; hard O2/Public AI blocker | Foundation + platform/ops; 8–20 wd plus environment; LOW |
| F-12 | Product-ID binding | No Cosmile SKU/product-ref to Foundation product-ID mapper. `MISSING` | Conditional O2/Public product-specific judgment blocker | Foundation + Cosmile; 2–5 wd after contract decision; LOW |

All Foundation rows use source actor `foundation` and source result
`runs/foundation/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_FOUNDATION_STATIC_AUDIT_RESULT.md`
(SHA-256 `aa3556e9a012fc3628bf910a291da43c2bbbae5f5749e140aeea4df559d4735e`).

## Cross-project and ownership rows

| Row | Current physical/runtime fact | Canonical owner / future actor | Classification and release impact | Required later decision |
|---|---|---|---|---|
| X-01 | `foundation-control/foundation_http_service`: live commerce-facing `/v1/consult_contract`, self-contained and does not import FOUNDATION | Foundation / `foundation` | Current provider in legacy location; conditional O2 blocker, not O1 | P0: select canonical owner/location of live judgment and safety core |
| X-02 | SSC/FRC contract implementation in Control service; Cosmile mirrors types | Foundation / `foundation` with Control coordination | Current provider; load-bearing only if AI shown | P0: designate contract-of-record and compatibility governance |
| X-03 | `COSMILE_FOUNDATION_HTTP_CONTRACT_V0.json` describes old judge endpoint/3s timeout | Foundation / `foundation` | `DEAD_OR_OBSOLETE` documentation truth; can misdirect implementation | P0: supersede with canonical consult-contract specification |
| X-04 | Two stacks: live self-contained service vs Foundation-repo-backed test/eval harness | Foundation / `foundation` | Ownership/runtime contradiction; O2 decision blocker | P0: decide intended commercial provider before any migration |
| X-05 | Secondary judge/chat/recommend endpoints and Cosmile debug Path B | Foundation / `foundation` | Legacy/quarantined, not positively dead; public containment unknown | P1: retirement and production-unreachability verification |
| X-06 | Ingress gate in Control is shadow/inert with noted scrub gap | Foundation / `foundation` | `SHADOW`; no O1 work and no activation authority | P1: separate reviewed activation train only if later needed |
| X-07 | Control `foundation_consultation`, `caller_intake`, `cosmile_loop` | Foundation decision + service/Cosmile application split | Reference/evaluation harness, not live provider | P1/P2: clarify reusable contracts vs obsolete duplication |
| X-08 | Ordinary commerce is locally operable without Foundation; AI failure is fail-closed/hidden | Cosmile commerce + Foundation AI | Supports O1 resilience; no single-point-of-failure requirement for AI | Preserve separation in future design |

All X rows use source actor `foundation-control` and source result
`runs/foundation-control/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_CROSS_PROJECT_STATIC_AUDIT_RESULT.md`
(SHA-256 `e7f723d0b117ea7fcad7f2337a7d7ee14709852577402e71e64e2f206e33c541`).

## Unknown and assumption ledger

- Actual vendor contracts, KYC timing, production domains, fulfillment ownership,
  legal readiness, and staffing are `UNVERIFIED`; they require named external or
  Founder/operations confirmation.
- No real DB, customer data, vendor API, build, test, smoke, or runtime was used.
- Estimates are planning ranges, not commitments. Workdays are additive effort;
  elapsed time assumes parallel work and may be dominated by external approvals.
- Foundation AI is optional for the recommended O1 beta shape. Selecting O2 would
  materially change the blocker set and estimates.
