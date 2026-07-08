# 01 Advisor Brief - Cosmile/SIASIU Code Structure Map

## Final Verdict

`CODE_STRUCTURE_MAP_READY_WITH_LIMITS`

Instruction validation result for this job: `PROCEED_WITH_LIMITS`.

Reason: the relevant code structure and Foundation boundary are mapped well enough for future Advisor planning, and this audit stayed read-only for runtime repos. Limits remain because V3-11C2 still needs Leo/GPT decisions before a Worker brief can be safely issued.

## Executive Summary

- Cosmile is a Next.js commerce service. It owns storefront, price, stock, cart, checkout, order, admin sales fields, commerce events, and commerce learning. It must not own product meaning, ingredient judgment, skin concern reasoning, or consultation flow.
- SIASIU is the consultation service layer. Current `/api/chat` runtime routes through a Foundation-only adapter by default, with legacy `brain.chat` only behind an explicit dev gate.
- Foundation is the canonical decision/safety/evidence/product/contract authority. `/v1/consult_contract` is the SSC/FRC contract endpoint.
- V3-11C2 is structurally tied to Cosmile checkout/order-item outcomes, not SIASIU consultation and not Foundation semantic extraction.
- V3-11C2 can be scoped as organic/unattributed behavioral outcome capture without V3-11D semantic labels, because `RecOutcomeEvent` is order behavior. It must not touch `RecOutcomeFeedback` semantic extraction or raw-text classification.
- The current code has `RecOutcomeEvent` schema and type/attribution helpers, but no runtime `trackRecOutcomeEvent` service, no feature flag, and no checkout/admin route wiring.
- V3-11D remains HOLD because the feedback input source and Foundation semantic output fields are absent.

## Method

Pass 1 inventoried repo/app structure, role files, package scripts, Prisma schema/migrations, route files, service files, SIASIU adapters, service memory modules, and Foundation contract modules.

Pass 2 deep-checked only load-bearing files that determine current behavior and future V3-11C2 scope.

No tests were run. Test-backed statements below mean test files or prior Advisor/report evidence exist, not that tests were rerun in this job.

## Files Checked

Advisor and prior artifacts:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_skill_role_boundary_delta_audit/01_ADVISOR_BRIEF.md`

Cosmile:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/app/CLAUDE.md`
- `../Cosmile/app/AGENTS.md`
- `../Cosmile/app/package.json`
- `../Cosmile/app/prisma/schema.prisma`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `../Cosmile/app/src/app/api/cart/items/route.ts`
- `../Cosmile/app/src/app/api/checkout/start/route.ts`
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts`
- `../Cosmile/app/src/app/api/admin/orders/[orderId]/status/route.ts`
- `../Cosmile/app/src/app/api/orders/route.ts`
- `../Cosmile/app/src/app/api/orders/[orderId]/route.ts`
- `../Cosmile/app/src/app/api/slice/consult-foundation/route.ts`
- `../Cosmile/app/src/lib/cart.ts`
- `../Cosmile/app/src/lib/checkout.ts`
- `../Cosmile/app/src/lib/shopper.ts`
- `../Cosmile/app/src/lib/ids.ts`
- `../Cosmile/app/src/lib/memoryCandidate.ts`
- `../Cosmile/app/src/lib/adverse.ts`
- `../Cosmile/app/src/lib/attribution.ts`
- `../Cosmile/app/src/lib/recommendationEventService.ts`
- `../Cosmile/app/src/lib/commerceEventService.ts`
- `../Cosmile/app/src/lib/foundation/foundationUserRef.ts`
- `../Cosmile/app/src/lib/foundation/consultationRiskGate.ts`
- `../Cosmile/app/src/adapters/foundationClient.ts`
- `../Cosmile/app/src/adapters/cosmileSemanticAdapter.ts`
- `../Cosmile/app/src/adapters/cosmileResponseAdapter.ts`
- `../Cosmile/app/src/types/recOutcome.ts`
- `../Cosmile/app/scripts/v3_11.vitest.ts`
- `../Cosmile/app/scripts/v3_11b_db_integration.dbtest.py`
- `../Cosmile/app/scripts/v3_11c_rec_event.vitest.ts`

SIASIU:

- `../SIASIU/CLAUDE.md`
- `../SIASIU/app/server.py`
- `../SIASIU/app/adapters/consult_via_foundation.py`
- `../SIASIU/app/adapters/foundation_client.py`
- `../SIASIU/app/adapters/siasiu_semantic_adapter.py`
- `../SIASIU/app/adapters/siasiu_response_adapter.py`
- `../SIASIU/app/adapters/provider_flag.py`
- `../SIASIU/app/adapters/dual_helpers.py`
- `../SIASIU/app/service_memory/canonical.py`
- `../SIASIU/app/service_memory/shadow_wiring.py`
- `../SIASIU/app/service_memory/hard_reject.py`
- SIASIU adapter/service-memory tests were inventoried by search, not rerun.

Foundation boundary:

- `../foundation-control/CLAUDE.md`
- `../foundation-control/ARCHITECTURE_CONSTITUTION.md`
- `../foundation-control/docs/ARCHITECTURE_MAP_DUAL_SERVICE_ADAPTER_20260702.md`
- `../foundation-control/foundation_http_service/contracts.py`
- `../foundation-control/foundation_http_service/core.py`
- `../foundation-control/foundation_http_service/server.py`

## Cosmile Structure Map

### Repo and App Shape

- Root contains planning/docs plus `app/` as the current Next.js app.
- `app/package.json` scripts include `dev`, `build`, `start`, `lint`, commerce smoke/scenario scripts, analytics scripts, and `test:memory`. There is no dedicated V3-11C2 script in `package.json`.
- Runtime app stack: Next `16.2.9`, React `19.2.4`, Prisma `6.19.3`, Vitest `4.1.9`, ULID `3.0.2`.
- Prisma schema is `../Cosmile/app/prisma/schema.prisma`.
- Migrations are under `../Cosmile/app/prisma/migrations/`; V3-11B schema additions are in `20260706120000_v3_11b_learning_commerce_memory/migration.sql`.

### Role Files

- Root `CLAUDE.md` defines Cosmile as a Foundation-based commerce shell and says Cosmile displays/sells but does not judge suitability; Foundation owns product/ingredient/safety/evidence/customer memory/personalization verdicts.
- `app/CLAUDE.md` is the more current app-local boundary: Foundation owns meaning/judgment, SIASIU owns consultation/explanation, Cosmile owns commerce projection, orders, sales state, commerce events, and sales learning.
- `app/AGENTS.md` exists but is Next.js operational guidance, not cross-repo boundary guidance.
- `.claude/rules` was not found.

### Commerce and Checkout Files

| Area | Current file | Current behavior |
|---|---|---|
| Cart add route | `src/app/api/cart/items/route.ts` | Adds cart item, emits `cart_add` CommerceEvent, then calls `trackRecommendationEvent` as flag-OFF shadow. |
| Checkout start | `src/app/api/checkout/start/route.ts` | Validates cart, creates pending order, emits `checkout_start` and optional `coupon_used`. |
| Checkout core | `src/lib/checkout.ts` | `createPendingOrder` copies cart lines into `OrderItem`; `completeMockOrder` marks paid, includes items, clears cart, returns `justPaid`. |
| Mock complete route | `src/app/api/checkout/mock-complete/route.ts` | On `justPaid`, emits `purchase_complete` CommerceEvent only. |
| Admin order status | `src/app/api/admin/orders/[orderId]/status/route.ts` | Updates order status only; emits `admin_order_status_changed`. No line-level refund source. |
| Order read routes | `src/app/api/orders/route.ts`, `src/app/api/orders/[orderId]/route.ts` | Read orders with items for current shopper. |
| Cart helper | `src/lib/cart.ts` | Active cart/item CRUD and guest-cart merge. No recommendationId persistence. |
| Shopper helper | `src/lib/shopper.ts` | Mock user vs guest cookie owner identity. |

### V3 Memory and Learning Files

| Area | Current file | Current behavior |
|---|---|---|
| IDs | `src/lib/ids.ts` | Generates `rec_v3_` recommendation IDs, `subj_v2_`, and `anon_v3_`. No RecOutcomeEvent ID helper exists. |
| Recommendation emit | `src/lib/recommendationEventService.ts` | Flag `COSMILE_REC_EVENT_ENABLED`, default OFF. Uses `ids.ts`, fail-open, observable result. |
| Commerce event emit | `src/lib/commerceEventService.ts` | Writes `CommerceEvent`, sanitizes PII/raw text keys, best-effort. |
| Memory candidate rules | `src/lib/memoryCandidate.ts` | Pure memory candidate/promotion guard logic; anonymous refs are not allowed directly in memory layer. |
| Adverse matrix | `src/lib/adverse.ts` | Pure severity/certainty/matrix logic. |
| Attribution pure helper | `src/lib/attribution.ts` | Last-touch pure logic over supplied RecommendationEvents. Not wired to checkout. |
| RecOutcome types | `src/types/recOutcome.ts` | Defines `RecOutcomeEvent`, attribution modes, and semantic feedback labels. |

### Current Schema Facts Relevant to V3-11C2

- `CartItem` fields are cart/product/sku/offer/quantity/price only; no `recommendationId`.
- `OrderItem` fields are order/product/sku/offer/quantity/price/snapshots only; no `recommendationId`.
- `RecommendationEvent.sessionId` is non-null in Prisma schema.
- `RecOutcomeEvent` exists with nullable `recommendationId`, `attributionMode`, subject/anonymous XOR fields, `orderId`, `orderItemId`, product fields, refund fields, and indexes on `orderItemId` and `recommendationId`.
- There is no unique index on `RecOutcomeEvent.orderItemId` in the Prisma model.
- The V3-11B SQL migration enforces RecOutcomeEvent attribution mode, XOR, organic/unattributed/unknown null recommendationId rule, and FK to `OrderItem`.

### Foundation Adapter Files

| Area | Current file | Current behavior |
|---|---|---|
| Foundation client | `src/adapters/foundationClient.ts` | Calls `POST /v1/consult_contract`; local FRC type includes strategy, safety gate, product flags, refs, evidence, trace. |
| Semantic adapter | `src/adapters/cosmileSemanticAdapter.ts` | Builds SSC with raw text, product refs, service context, commerce context; masks PII; does not finalize meaning. |
| Response adapter | `src/adapters/cosmileResponseAdapter.ts` | Consumes FRC and suppresses products/recommendations/CTA when Foundation or service backstop says safety. |
| Foundation consult route | `src/app/api/slice/consult-foundation/route.ts` | Builds SSC, calls Foundation, records Foundation decision best-effort, returns suppressed surface. Foundation failure returns 502 and product list empty. |
| Foundation user ref | `src/lib/foundation/foundationUserRef.ts` | Generates opaque `furef_v2_`; production missing secret or subject fail-closes. |
| Consultation risk gate | `src/lib/foundation/consultationRiskGate.ts` | Consumes Foundation response fields conservatively; does not classify user raw text. |

## Cosmile V3-11C2 Touch Map

### Likely Files if Leo/GPT Later Approves V3-11C2

These are future Worker candidate files, not authorized edits in this job:

- `../Cosmile/app/src/lib/ids.ts` or a new local helper for RecOutcomeEvent IDs, depending on D-O1.
- New `../Cosmile/app/src/lib/recOutcomeEventService.ts` or equivalent service for flag-gated `RecOutcomeEvent` writes.
- `../Cosmile/app/src/app/api/checkout/mock-complete/route.ts` as the likely initial hook after `completeMockOrder` returns `justPaid` and `order.items`.
- Possibly `../Cosmile/app/src/lib/checkout.ts` only if the service needs a clearer order/item return shape; prefer avoiding this unless required.
- `../Cosmile/app/scripts/...` for provider-independent tests and optional DB-shape tests.
- `../Cosmile/app/prisma/schema.prisma` only if Leo/GPT chooses schema-level idempotency such as a unique index. Otherwise it should stay out of scope for organic MVI.

### Areas V3-11C2 Should Not Touch Without Separate Approval

- SIASIU code.
- foundation-control code.
- Foundation contract/FRC fields.
- `RecOutcomeFeedback` semantic extraction path.
- raw text semantic classification in Cosmile.
- product/ingredient/safety/reasoning judgment.
- price/stock/product suitability logic.
- schema/migrations unless D-O1 explicitly chooses a schema change.
- prod/live/main/secret.
- V3-11D implementation.

## SIASIU Structure Map

### Consultation Runtime Flow

Current `/api/chat` flow:

1. `../SIASIU/app/server.py` handles `POST /api/chat`.
2. Default provider is `foundation_contract`.
3. Server calls `adapters/consult_via_foundation.py::consult`.
4. `consult_via_foundation` calls `siasiu_semantic_adapter.build_ssc`.
5. `foundation_client.call_foundation_contract` posts to `/v1/consult_contract`.
6. `siasiu_response_adapter.render` turns FRC into SIASIU consultation response.
7. Foundation unavailable returns 502-style fail-closed payload with no `brain.chat`, no mock, no fake success, no product/CTA/recommendation permission.

Legacy `brain.chat` is still present but only reachable through `SIASIU_DEV_LEGACY_CONSULT=1` plus `SIASIU_CONSULTATION_PROVIDER=legacy`.

### SIASIU Adapter Boundary

| File | Role |
|---|---|
| `app/adapters/consult_via_foundation.py` | Orchestrates raw text -> SSC -> Foundation -> FRC -> response, fail-closed on Foundation absence. |
| `app/adapters/foundation_client.py` | Thin stdlib HTTP client; imports no foundation-control code; calls `/v1/consult_contract`. |
| `app/adapters/siasiu_semantic_adapter.py` | Builds SIASIU SSC. Sends opaque `foundation_user_ref`, not raw user id. |
| `app/adapters/siasiu_response_adapter.py` | Renders SIASIU voice while enforcing FRC product/recommendation/safety constraints. |
| `app/adapters/provider_flag.py` | Default provider is Foundation contract; legacy is explicit dev-only. Generates `furef_v2_` and prod fail-closes if secret absent. |
| `app/adapters/dual_helpers.py` | SSC helpers, response suppression, and service safety backstop for escalation only. |

### SIASIU Service Memory Boundary

| File | Role |
|---|---|
| `app/service_memory/canonical.py` | Defines canonical logical memory contract and builds minimized request-scoped `memory_context` with `raw_text_stored=False`. |
| `app/service_memory/shadow_wiring.py` | Flag-OFF default shadow memory_context wiring; sends refs/hashes/safety flags, not raw text or PII. |
| `app/service_memory/hard_reject.py` | Simulation-only deterministic memory reuse gate. Not activated in live user path. |

### Boundary to Cosmile

SIASIU consultation memory and response flow must not be mixed directly into Cosmile commerce outcome wiring. The common boundary is Foundation contract and shared logical memory concepts, not shared service runtime code.

For V3-11C2, SIASIU is not an implementation target unless Leo/GPT later defines a cross-service behavioral outcome product. Current V3-11C2 is Cosmile order behavior.

## Foundation Boundary

### Authority

Foundation is the common decision core and service-facing contract owner. It owns:

- SSC/FRC contract validation and output shape.
- Decision, safety, evidence, product rail, and reasoning outputs.
- Safety fail-closed and raise-only policy behavior.

Services own:

- Input packaging.
- Service data.
- Service voice and UI/CTA expression.
- Commerce actions in Cosmile.
- Consultation surface expression in SIASIU.

### Contract Files

| File | Current role |
|---|---|
| `foundation_http_service/server.py` | Exposes `POST /v1/consult_contract`; logs only trace/decision and keeps dev/shadow/write-0 invariant. |
| `foundation_http_service/core.py` | `consult_contract` validates SSC, maps semantic fields to override if present, calls shared consult core, builds FRC, asserts invariants. |
| `foundation_http_service/contracts.py` | Defines SSC/FRC enums, validates SSC, builds FRC, asserts FRC invariants. |
| `ARCHITECTURE_CONSTITUTION.md` | Foundation role summary: common brain, contract owner, decision/safety/evidence owner. |
| `docs/ARCHITECTURE_MAP_DUAL_SERVICE_ADAPTER_20260702.md` | Evidence map for SIASIU/Cosmile -> Foundation contract integration; explicitly states it is a map, not contract source-of-truth. |

### FRC Fields Present

Current FRC output includes:

- `contract_version`
- `trace_id`
- `final_strategy`
- `decision_type`
- `safety_gate_result`
- `final_severity_class`
- `severity_class_basis`
- `policy_rule_applied`
- `products_allowed`
- `recommendation_allowed`
- `product_candidates`
- `suppression_reason`
- `forbidden_expressions`
- `answer_substance`
- `evidence`
- `repair_or_verify_result`
- `trace`

### FRC Fields Not Present for V3-11D

The inspected Foundation FRC build path does not output:

- `semantic_label`
- `adverse_severity`
- `adverse_certainty`

Foundation does have related safety/severity fields such as `final_severity_class` and `severity_class_basis`, but these are not the same as the V3-11D RecOutcomeFeedback semantic output contract.

## Why V3-11D Is HOLD

V3-11D service-side semantic signal extraction needs:

- G-D1: a post-order feedback input source.
- G-D2: Foundation semantic output contract fields for `semantic_label`, `adverse_severity`, and `adverse_certainty`.

Current code-backed findings:

- Cosmile has no inspected post-order review/rating/feedback route that supplies a stable feedback input source.
- Foundation FRC lacks the target semantic output fields.
- Cosmile Foundation client type also lacks those semantic output fields.
- Therefore V3-11D remains `HOLD`.

## Why V3-11C2 Can Be Semantic-Free

`RecOutcomeEvent` is behavioral order outcome data: order/item/product outcome and attribution mode. It is not the semantic feedback table.

A narrow organic MVI can record paid order-item outcomes as:

- `recommendationId = null`
- `attributionMode = "organic"`
- subject or anonymous ref based on checkout owner
- order/item/product/sku refs

This does not require Foundation semantic labels and must not infer satisfaction/adverse/repurchase meaning from raw text. Semantic feedback remains V3-11D or later.

## Current V3-11C2 Blockers and Limits

- No runtime `trackRecOutcomeEvent` service exists.
- No `COSMILE_REC_OUTCOME_ENABLED` or equivalent flag was found.
- No checkout/admin route wiring emits `RecOutcomeEvent`.
- `CartItem` and `OrderItem` do not carry `recommendationId`.
- Direct attribution is unavailable without rec_id threading.
- Session attribution is unavailable while sessionId is not populated.
- Refund outcome is limited because the admin route is order-level status only and has no line-level refund source.
- Reorder/repurchase route was not found.
- RecOutcomeEvent ID generation is undecided.
- Idempotency is undecided: code-level existing-check vs schema-level unique index.
- Schema-level idempotency would require schema/migration scope and separate approval.
- Prod/live/main/secret remain hard stops.

## V3-11C2 Leo/GPT Decisions Needed Before Worker Brief

1. D-O1: choose RecOutcomeEvent ID and idempotency approach.
2. Confirm whether initial scope is organic checkout MVI only.
3. Confirm that no schema/migration changes are allowed for the initial MVI unless D-O1 explicitly chooses unique index.
4. Confirm whether the hook is only `mock-complete` on `justPaid`, not checkout-start and not admin status.
5. Confirm whether refund/reorder/direct/session attribution are explicitly out of scope for the first implementation.
6. Confirm feature flag name and default OFF behavior.
7. Confirm required evidence: provider-independent service tests, checkout route behavior tests or script evidence, optional non-prod DB insert evidence, and runtime repo diff inspection.

## Service Review Need

V3-11C2 should require service review because it changes commerce behavior and order-learning semantics:

- It writes behavioral outcome data from paid orders.
- It affects the meaning of commerce memory, attribution, and later analytics.
- It touches checkout/order completion flow, even if fail-open and flag-gated.
- It must avoid creating false direct attribution, false refund semantics, or semantic feedback claims.

## Sentinel Review Checklist Candidates

Future technical review should verify:

- Separate Reviewer session, read-only.
- Diff is limited to approved Cosmile files.
- No SIASIU/foundation-control/skill/foundation-advisor changes.
- No prod/live/main/secret access.
- No schema/migration changes unless approved.
- Feature flag defaults OFF.
- Checkout user flow is not broken if outcome write fails.
- `RecOutcomeEvent` write is idempotent per approved D-O1.
- Organic mode has `recommendationId=null`.
- SubjectRef/anonymousRef XOR is preserved.
- Anonymous ref does not enter memory layer.
- No raw text, PII, order/customer raw IDs, payment IDs, or secret values are logged or copied into evidence.
- No semantic labels/adverse certainty are inferred.
- Existing `purchase_complete` CommerceEvent remains intact.
- Tests inspect actual service behavior and do not weaken assertions.

## Source-of-Truth Map

| Layer | Source |
|---|---|
| Runtime behavior | Actual code in `../Cosmile`, `../SIASIU`, `../foundation-control` |
| Foundation semantic/reasoning/safety/product authority | Foundation contracts/code and canonical architecture/contract docs |
| Evidence/report archive | `../foundation-docs/docs/reports/control/**` |
| Advisor archive | `../foundation-docs/advisor/jobs/**` |
| Current task instruction | Leo/GPT instruction for this job |

Rules:

- `foundation-docs` is not runtime source-of-truth.
- Runtime behavior must be verified in actual repo code.
- Foundation canonical docs/contracts own reasoning/product/ingredient/safety authority.
- Cosmile and SIASIU are service/runtime layers.
- If code and report conflict, report the conflict and prefer runtime code for current behavior.

## Advisor System Findings

- Runtime repos were not modified.
- Writes were limited to `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/**`.
- No Worker brief was created.
- No implementation instruction was created.
- Source-of-truth layers were kept separate.
- Uncertain or undecided V3-11C2 items were marked as decisions needed.
- `../skill` was not read in this job, consistent with the current allowed scope.

## What Should Not Be Done Next

- Do not start V3-11C2 implementation from this audit alone.
- Do not create a Worker brief until Leo/GPT decisions above are answered.
- Do not implement V3-11D while G-D1 and G-D2 remain unresolved.
- Do not add raw-text semantic classification in Cosmile to bypass Foundation.
- Do not touch SIASIU for Cosmile-only RecOutcomeEvent wiring.
- Do not turn on RecommendationEvent or RecOutcomeEvent flags for prod/live.
- Do not add schema/migration changes without explicit approval.

## V3-11C2 Worker Brief Readiness

`NOT_READY_NEEDS_LEO_DECISION`

This structure map is ready as input for a future brief, but the Worker brief itself should wait for Leo/GPT decisions on D-O1, organic MVI scope, flag name/default, hook point, and no-schema vs schema-approved idempotency.

## Exactly One Next Action

Leo/GPT should make the V3-11C2 D-O1/scope decision package: RecOutcomeEvent ID and idempotency approach, organic-MVI-only scope, feature flag name/default OFF, hook point, and explicit exclusions for direct/session/refund/reorder/semantic feedback.
