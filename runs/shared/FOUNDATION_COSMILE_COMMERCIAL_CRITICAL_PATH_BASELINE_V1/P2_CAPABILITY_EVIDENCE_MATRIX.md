# P2 — Capability Evidence Matrix

The normative row set is `AUTHORITATIVE_EVIDENCE_ROWS.md`. This view groups those
rows by release meaning without changing their status or E2 evidence ceiling.

## Cosmile commercial spine

| Area | Row(s) | State | Release interpretation |
|---|---|---|---|
| Product discovery/detail | C-01 | MOCK | Real sellable catalog and price/stock source absent |
| Identity | C-02 | MOCK | No real customer authentication or durable account boundary |
| Cart | C-03 | IMPLEMENTED_STATIC | Useful DB-backed spine, not runtime-verified |
| Checkout/order | C-04, C-06 | PARTIAL | DB order path exists but amounts originate from mock catalog; self-service incomplete |
| Payment | C-05 | MOCK | Cannot take real money |
| Inventory | C-07 | MISSING | No reserve/deduct/restore or concurrency invariant |
| Fulfillment | C-08 | MISSING | No shipment/tracking record |
| Cancellation/refund | C-09 | PARTIAL | Status label only; no economic reversal |
| Operator/admin | C-10 | IMPLEMENTED_STATIC | Core controls exist; brute-force/timing hardening gap |
| AI consultation | C-11 | SOURCE_ONLY/SHADOW | Default-OFF/fail-closed; ordinary commerce remains independent |

## Foundation commercial core

| Area | Row(s) | State | Release interpretation |
|---|---|---|---|
| Canonical data access | F-01, F-10 | IMPLEMENTED_STATIC + UNVERIFIED DATA | Reader exists; actual canonical data availability/quality not established |
| Judgment/safety | F-02 | IMPLEMENTED_STATIC/SHADOW | Deterministic static engine; no mission runtime evidence |
| API/adapters | F-03, F-04 | IMPLEMENTED_STATIC/SHADOW | In-process/default-OFF only; no live cross-service boundary in Foundation repo |
| Evidence grounding | F-05 | PARTIAL | Module not wired; caller assertion remains a material AI-on risk |
| Retrieval | F-06 | MISSING/UNVERIFIED | No Foundation implementation; SIASIU location is only a boundary claim |
| SIASIU reference | F-07 | IMPLEMENTED_STATIC | No current SIASIU dependency for commerce-first beta |
| Memory | F-08 | SHADOW/DEFERRED | Paused at reviewed pre-runtime boundary; no auto-resume |
| Security phase | F-09 | SOURCE_ONLY/SHADOW | Framework, not certification |
| Service/deployment | F-11 | MISSING | Hard blocker only if Foundation AI must be shown |
| Product identity binding | F-12 | MISSING | Required for product-specific AI joins, not O1 commerce |

## Cross-project contracts, ownership, and degraded behavior

| Area | Row(s) | Current truth | Decision impact |
|---|---|---|---|
| Commerce-facing Foundation provider | X-01, X-04 | Live provider is self-contained code in `foundation-control`; Foundation-importing stack is eval-only | P0 ownership/provider decision before AI-on implementation |
| Contract truth | X-02, X-03 | SSC/FRC source works statically, but old HTTP V0 document is stale | P0 contract-of-record decision |
| Legacy paths | X-05, X-07 | Secondary/debug and evaluation paths exist; not proven dead | Later containment/retirement decision |
| Shadow ingress | X-06 | Default-OFF/inert; known scrub-gap note | Not a current beta dependency; no activation authority |
| Resilience | X-08 | AI failure closes/hides while ordinary commerce remains local | Supports recommended commerce-first option |

## Physical location versus current authority

| Question | Answer |
|---|---|
| Where is the current commerce-facing judgment runtime physically located? | `foundation-control/foundation_http_service` |
| What currently provides that runtime? | The self-contained foundation-control service stack |
| Who canonically owns Foundation product judgment/safety? | Foundation |
| Who performs future Foundation implementation? | `foundation` Worker in the Foundation-owned repository, only under new explicit authority |
| Does historical Control implementation grant Control current Worker authority? | No |
| Is any migration/patch/deprecation authorized here? | No |

## Evidence limitations

No row is runtime-, end-to-end-, production-, vendor-, or legal-verified. No positive
`READY` claim is made for the commercial release. Absent or external facts remain
`UNVERIFIED`; this audit does not fill them by inference.
