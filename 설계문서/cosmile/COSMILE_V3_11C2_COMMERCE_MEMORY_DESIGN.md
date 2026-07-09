# COSMILE V3-11C2 Commerce Memory Design

Date: 2026-07-09

Status: `DRAFT_PENDING_FABLE5_DESIGN_REVIEW`

Canonical location:

`../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`

## Purpose

This document records the canonical design draft for V3-11C2 Commerce Memory, `RecOutcomeEvent`, future commerce outcome event history, and the Cosmile/Foundation signal boundary.

This document is a design record only. It does not authorize implementation, runtime repository edits, DB access, query execution, migration execution, `COSMILE_REC_OUTCOME_ENABLED` flag ON, main merge, production exposure, or operational use.

## Review Status

Required design gate before Phase 2A execution or further implementation:

1. Advisor Design Draft
2. Fable5 Design Review
3. Advisor Review Consolidation
4. Leo/GPT Final Design Approval
5. Only then: Phase 2A execution consideration or Worker implementation

Codex/SOL design review is not part of the current required gate because Codex 5.6 SOL reviewer is unavailable. If Codex/SOL becomes available later, it remains a retrospective review candidate before production/main merge, flag ON, persistent migration rehearsal, or operational use.

## Evidence Links

This draft is based on the following Advisor evidence and decision artifacts:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_commerce_memory_schema_design_review/01_SCHEMA_DESIGN_REVIEW.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_readonly_preflight_approval_package/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase2a_approval_fields_options/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/01_DESIGN_DOC_REVIEW_GATE_PROPOSAL.md`

## Official Design Decisions

Leo/GPT approved these decisions for the current design draft:

1. `RecOutcomeEvent` is not an append-only event log.
2. `RecOutcomeEvent` is one purchase outcome summary/current row per `OrderItem`.
3. `@@unique([orderItemId])` is the hard invariant for the current table.
4. One paid `OrderItem` can produce at most one purchase outcome summary row.
5. Future refund/cancel/reorder/attribution-change history will not be stored as multiple `RecOutcomeEvent` rows.
6. Future lifecycle history should use a separate additive event log table.
7. Raw commerce evidence remains in Cosmile.
8. Foundation receives only refined/whitelisted signals.
9. Foundation does not own raw order/payment/customer data.
10. Traceability is maintained through `CommerceEvent.id`, `FoundationSignalOutbox.sourceEventId`, future `sourceCommerceEventId`, or a dedicated trace id.
11. Event log table implementation is not yet approved.
12. Phase 2A is read-only only and does not approve Phase 2B migration rehearsal.

## Current Model Roles

### `Order`

`Order` represents checkout/order state. It owns order-level status such as pending, paid, fulfilled, cancelled, or refunded, and it groups line items under a single checkout/order.

For V3-11C2, `Order` is not the line-level purchase outcome identity. It provides order context for the line-level `OrderItem` and `RecOutcomeEvent` relationship.

### `OrderItem`

`OrderItem` is the line-level purchase unit. The current V3-11C2 purchase outcome invariant is anchored to `OrderItem`, not only to the parent `Order`.

The approved invariant is:

`one paid OrderItem can produce at most one purchase outcome summary row`

This is why `RecOutcomeEvent.orderItemId` is the unique idempotency boundary.

### `RecommendationEvent`

`RecommendationEvent` records recommendation-side events and keeps `recommendationId` as the recommendation event identity.

The current V3-11C2 scope is organic checkout MVI only. It does not prove direct/session attribution. Therefore current V3-11C2 purchase outcome rows use:

- `recommendationId = null`
- `attributionMode = organic`

### `RecOutcomeEvent`

Despite the table name, current `RecOutcomeEvent` is a purchase outcome summary/current row.

It is not an append-only event log because:

- `orderItemId` is unique;
- the current implementation writes at most one organic outcome per paid order item;
- duplicate writes are treated as idempotent skips;
- the table does not contain an event sequence model, event type model, or append-only lifecycle model;
- refund/cancel/reorder/attribution-change history is not represented as multiple rows in this table.

The name `RecOutcomeEvent` is a known naming/role mismatch. The design authority for this table is this document's summary-row invariant, not the word "Event" in the table name.

## Hard Invariants

### Summary Row Invariant

`RecOutcomeEvent` is the current purchase outcome summary row for an `OrderItem`.

Hard invariant:

```text
For the current table, one paid OrderItem can produce at most one RecOutcomeEvent purchase outcome summary row.
```

DB enforcement:

```prisma
@@unique([orderItemId])
```

Implementation implication:

- code-level existing-check is a fast-path duplicate skip;
- DB-level uniqueness is the hard race-condition guard;
- DB unique conflict should be treated as duplicate/idempotent skip and fail-open for checkout;
- checkout must not fail because duplicate outcome learning failed.

### Organic MVI Attribution Invariant

V3-11C2 Organic checkout MVI writes only organic outcomes.

Current meaning:

- `recommendationId = null`
- `attributionMode = organic`

This must not be presented as recommendation-driven conversion attribution.

### Flag Invariant

`COSMILE_REC_OUTCOME_ENABLED` remains default OFF until separate approval.

This design document does not authorize:

- flag ON;
- live/prod exposure;
- main merge;
- operational use;
- production DB migration.

## Future Event Log Direction

Future commerce outcome lifecycle history should be modeled as a separate additive event log table, not as multiple `RecOutcomeEvent` rows.

Future lifecycle events may include:

- purchase;
- refund;
- cancel;
- reorder;
- attribution change;
- future direct/session attribution events.

The future event log table is not designed or approved in this document. A separate architecture mission is required before implementation.

### Expected Future Event Log Responsibilities

A future additive event log should own lifecycle history and append-only evidence. It should likely include:

- event type or lifecycle type;
- `orderId`;
- `orderItemId`;
- `productId`;
- optional `skuId`;
- source commerce event pointer;
- attribution snapshot;
- idempotency key per source event;
- event effective time and creation time;
- non-sensitive traceability fields.

The exact table name, schema, idempotency model, and projection rules are not approved yet.

### Summary/Event Split

Approved direction:

- `RecOutcomeEvent` remains the fast current summary row.
- A future event log records lifecycle history.
- A future projection rule may update or derive the current summary from event history, but that projection rule is not approved yet.

This split avoids replacing the already verified summary-row invariant while preserving a path to future lifecycle history.

## Raw Commerce Evidence Boundary

Raw commerce evidence remains in Cosmile.

Examples of raw or sensitive commerce data that Foundation must not own:

- raw order rows;
- raw payment records;
- raw customer identifiers;
- contact details;
- addresses;
- emails;
- phone numbers;
- payment IDs;
- line-level price/margin details unless explicitly refined and approved;
- raw checkout payloads;
- credential-bearing URLs or secrets.

Cosmile may keep raw evidence internally for audit, debugging, commerce logic, and traceability, subject to its own privacy and data handling rules.

## Foundation Signal Boundary

Foundation receives refined/whitelisted signals only.

Allowed direction:

- sanitized signal type;
- approved canonical product/brand references;
- approved channel/locale/country fields;
- non-sensitive source pointer or trace id when approved;
- aggregate or derived signal fields that do not expose raw customer/order/payment data.

Foundation must not become the owner of raw Cosmile commerce evidence. Foundation should reason from refined signals and canonical product/ingredient/safety authority, not from raw checkout/payment/customer payloads.

## Traceability Model

Traceability should remain possible without transferring raw commerce evidence ownership to Foundation.

Approved traceability mechanisms:

- `CommerceEvent.id`
- `FoundationSignalOutbox.sourceEventId`
- future `sourceCommerceEventId`
- future dedicated trace id

Traceability pointers should be non-sensitive and should not expose raw customer/order/payment details in Foundation-facing payloads or reports.

## Phase 2A Boundary

Phase 2A remains not approved for execution by this document.

If Leo/GPT later approves Phase 2A, its purpose must be limited to read-only verification of the current summary-row invariant against an explicitly approved target DB.

Permitted Phase 2A purpose after separate approval:

- confirm the exact approved target DB identity;
- inspect whether duplicate `RecOutcomeEvent.orderItemId` blockers exist;
- inspect whether D-O1 unique-index migration state is compatible;
- report counts/status only;
- avoid row dumps and raw IDs.

Phase 2A must not:

- write to DB;
- run migration deploy;
- run DDL;
- run DML;
- create event log table;
- modify runtime repo;
- turn flag ON;
- inspect or print secrets;
- print raw `DATABASE_URL`;
- access prod/live/customer-facing DB;
- broaden into refund/cancel/reorder/direct/session attribution.

## Phase 2B Boundary

Phase 2B migration rehearsal remains not approved.

Before Phase 2B can be considered, the following must exist:

- Leo/GPT approval after Phase 2A result and review;
- exact target DB identity;
- backup/rollback plan;
- deploy procedure;
- explicit migration command boundary;
- reviewer route;
- secret masking policy;
- stop conditions.

## Out Of Scope

This design document does not approve:

- event log table creation;
- refund/cancel/reorder implementation;
- direct attribution implementation;
- session attribution implementation;
- Foundation semantic feedback;
- V3-11D service-side semantic extraction;
- SIASIU changes;
- foundation-control changes;
- schema changes beyond already approved D-O1;
- DB access;
- DB migration execution;
- flag ON;
- production rollout.

## Design Risks And Limits

### Naming Risk

`RecOutcomeEvent` sounds like an append-only event table, but it is currently a summary/current row. Future briefs must explicitly state this invariant to avoid misuse.

### Future Event Log Not Designed Yet

Refund/cancel/reorder/attribution-change lifecycle history is intentionally deferred. It must be designed before implementation.

### Attribution Limits

Direct/session attribution is not proven by the current organic MVI. Current organic rows must not be interpreted as recommendation-driven outcomes.

### Phase 2A Target Unknown

Phase 2A still needs a separately approved target DB identity, read-only access method, secret masking path, and review route.

## Fable5 Design Review Draft Prompt

This prompt is prepared for later use. Do not route it to Fable5 until Leo/GPT explicitly authorizes Fable5 design review.

```text
TARGET_ACTOR: Fable5 Design Reviewer
TARGET_SESSION: separate Fable5 review session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target reviewer session

Fable5 Design Reviewer 확인.

이 작업은 설계검수입니다.
구현 작업이 아닙니다.
DB 접속, query 실행, migration 실행, runtime repo 수정, Worker handoff 작성은 금지입니다.

Required skill/role:
/fable-sentinel if available, but use it as design review only.

Read:
- ../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md
- ../foundation-docs/advisor/jobs/20260709_v3_11c2_design_doc_review_gate_setup/01_DESIGN_DOC_REVIEW_GATE_PROPOSAL.md
- Relevant linked Advisor evidence if needed

Review focus:
- 설계문서가 Leo/GPT business decision을 정확히 반영했는가
- RecOutcomeEvent summary/current row 해석이 타당한가
- future event log를 separate additive table로 두는 방향이 안전한가
- raw commerce evidence는 Cosmile에 남기고 Foundation에는 refined signal만 보내는 boundary가 명확한가
- 개인정보/결제/주문 raw data가 Foundation signal에 섞이지 않도록 설계되어 있는가
- Phase 2A가 read-only invariant check로 충분히 좁혀져 있는가
- 나중에 refund/cancel/reorder/direct/session attribution이 들어와도 현재 구조를 갈아엎지 않아도 되는가
- unknowns / blindspots / hidden assumptions가 남아 있는가
- 설계문서가 구현으로 넘어갈 만큼 명확한가

Do not:
- implement
- patch files
- access DB
- run queries
- run migrations
- inspect secrets
- print raw DATABASE_URL
- approve final release

Return verdict exactly one of:
- PASS
- PASS_WITH_RISK
- NEEDS_PATCH
- FAIL

Return result to Advisor with:
## RESULT SUMMARY
## FINDINGS
## REVIEWER VERDICT
## NEXT ACTION ROUTING
## POINTER BLOCK
```

## Next Required Decision

Current next actor:

`Leo/GPT`

Required decision:

`REVIEW_CANONICAL_DESIGN_DRAFT_BEFORE_FABLE5_ROUTING`

Leo/GPT should review this draft and decide whether Advisor may route the Fable5 Design Review prompt.

Until then, Advisor must not send this to Fable5, Worker, Sentinel, Service Reviewer, or Cosmile.

