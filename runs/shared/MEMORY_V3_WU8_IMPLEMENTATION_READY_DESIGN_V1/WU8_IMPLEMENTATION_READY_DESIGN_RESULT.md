# Memory V3 WU8 implementation-ready cross-project design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-DESIGNER-001
ACTOR_ID: foundation-designer
ROLE: Designer — Advisor-routed product/system design only
RESPONSIBLE_ADVISOR: foundation-advisor
STATUS: DESIGN_READY_FOR_INDEPENDENT_REVIEW
DESIGN_AUTHORITY: DESIGN_ONLY
WU8_IMPLEMENTATION: NOT_AUTHORIZED
DELIVERY_OR_INTAKE_IMPLEMENTATION: NOT_AUTHORIZED
DB_SCHEMA_MIGRATION_IMPLEMENTATION_OR_REHEARSAL: NOT_AUTHORIZED
SECURITY_AUTHENTICATION_IMPLEMENTATION_READINESS: NOT_AUTHORIZED
PRODUCT_REPOSITORY_WRITE: ZERO
```

## 0. Reading key and bounded conclusion

This document uses five labels deliberately:

- **FACT** — verified current repository or committed evidence at the pins below.
- **DIRECTION** — fixed Founder selection; this design does not reopen it.
- **DESIGN** — the one proposed future implementation contract.
- **GATE** — a named external decision/evidence requirement. A dependent WorkUnit is not executable until the gate is closed and separately authorized.
- **FORBIDDEN** — outside WU8 and not an implementation option.

The design is ready for independent design review because it fixes the application contracts,
state machines, logical durable model, transaction behavior, containment limits, test oracles,
and gated future WorkUnits without hiding a Founder, Security, Legal, identity, retention,
backend, or product decision inside an allegedly executable WorkUnit. It does **not** claim
that delivery, intake, authentication, or Foundation durability is ready to implement now.
Security authentication remains explicitly unselected; the consent transport and Foundation
durable backend remain explicit gates.

## 1. Authority, pins, current boundary, and zero-write evidence

### 1.1 Fixed authority

| Anchor | Exact pin | Effect |
|---|---|---|
| Founder WU8 direction | `25ec350584fc2df0a9ae77a1bb5192dbaa36630a` | D8-1-A, D8-2-A, D8-3-B design-only, D8-4-A, D8-5-A |
| design-authority clarification | `47eaf97c235f5de86dc4e06cd58238619cc55409` | permits exact logical topology/schema/migration/WorkUnit design; permits no implementation or auth-mechanism selection |
| Control selected-direction contract | `80dfbe00dd2235a12fea2f168d07ed930e0cc1c3` | owner interfaces, six uniqueness invariants, gates U1–U6, and fail-closed ceiling |
| Founder decision package | `bd4b3c985a386e704b27538dbe45093442101167` | decision context only; the selected direction above wins |
| reviewed C implementation-ready design | `4480b55` | current envelope/gates/lineage/replay/candidate/audit contract |
| WU7 implementation review | `0d28bc0` | `PASS`; confirms current C is bounded, ephemeral, and non-integrated |

### 1.2 Product pins verified read-only

| Repository | Branch | HEAD | Relevant current fact |
|---|---|---|---|
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` | C service exists only as default-OFF, in-process, one-process ephemeral review-only code; no sender, endpoint, DB, durable adapter, or store bridge |
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ced7083bb8d0af00bda2a54951923ea22f` | durable PostgreSQL/Prisma producer and `FoundationSignalOutbox`; evidence carrier exists, but sender/flush/retry/network client is prohibited and absent |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | read-only contract/control evidence; not a product implementation owner |
| foundation-docs | `advisor/foundation-team-role-alignment-20260714` | pre-write `feabcf46a74b8f9dcc6d35335840faae9010a0fc` | historical evidence/result storage; Advisor publishes |

The known pre-existing product worktree dirt was observed and not touched. No product file,
flag, schema, migration, endpoint, process, test, DB, secret, environment, network, commit, or
branch was changed or exercised. Only this result and its pointer are written.

### 1.3 Current landed C boundaries that future work must preserve

- Exact carrier: `cosmile.commerce_evidence.v1`, closed fields and enums, identified actor,
  `anonymous_ref:null`, `identity_link_allowed:false`, local/shadow only, no raw text or PII.
- Gate 0 is `commerce_evidence_c_shadow`, default `False`, checked before parse and immediately
  before commit. `commerce_evidence_c_live`, `commerce_evidence_c_intake`, and
  `commerce_evidence_c_candidate_runtime` remain `HARD_OFF`.
- Gate order 1–11, 18 category reason codes, first-failure-wins, and category-only outputs.
- `ProvenanceVerdict`: continue only on `VERIFIED && source_identity && envelope_digest`.
- `ConsentVerdict`: continue only on `GRANTED`; snapshot `state:"granted"` is not current authority.
- Exact replay occurs after current flag, identity/privacy, provenance, consent, normalization,
  and retention gates and before mutable lineage checks.
- Six uniqueness sets; first committed writer wins; corrections/retractions are append-only;
  a retraction tombstones its root and blocks replay on that purchase lineage.
- Only Foundation-owned review DTOs `CommerceOutcomeCandidateV1` and
  `CommerceAdverseCandidateV1`; no current `MemoryCandidate` or `SharedMemoryStore` write.
- Skin/other adverse evidence fails at the `UNCONFIGURED` retention-policy boundary. The only
  structurally eligible adverse draft type is `usage_safety`, still review-required and blocked
  by the current shared safety gate. Guest cross-service evidence fails before acceptance.
- Accepted/exact-replay responses are released only after post-ledger audit and metrics return
  literal `True`; a post-ledger failure poisons the service instance but preserves all prior
  ledger state. WU8 durability must preserve that semantic without clearing any epoch.

## 2. System spaces and non-transferable ownership

| Space | Owner | Owns | Must not own |
|---|---|---|---|
| P1 Cosmile producer/outbox | Cosmile repo Worker | closed-choice capture, local consent ledger, envelope creation, local evidence/outbox transaction | Foundation validation, gateway authenticity, candidate policy |
| P2 future Cosmile sender | Cosmile repo Worker | leasing eligible outbox rows, per-root scheduling, bounded retry, acknowledgement application, queue containment | authenticating itself, Foundation commit, current-consent policy invention |
| P3 infrastructure/gateway | infrastructure + Security | authenticating the Cosmile workload by a separately approved mechanism and producing a minimized digest-bound verdict | envelope enrichment, consent, business validation, durable evidence |
| P4 Cosmile current-consent authority | Cosmile repo + privacy/Security-approved adapter boundary | current effective grant/revoke/expiry/purpose/notice truth | Foundation storage or candidate decisions |
| P5 future Foundation ingress/orchestrator | Foundation repo Worker | flag-first orchestration, strict validation, verdict consumption, category acknowledgement | auth mechanism, consent truth, sender queue |
| P6 future Foundation durable evidence store | Foundation repo Worker after architecture gate | atomic accepted receipt/lineage/tombstone/draft state and minimized post-commit audit | full envelopes, credentials, raw IDs/text/PII, current candidate runtime |
| P7 review-only drafts | Foundation | durable forms of the two landed DTOs, status `review_required` only | approval, reuse, ranking, promotion, safety mutation, real-user effect |
| P8 current candidate/runtime store | deferred | nothing in WU8 | any bridge from WU8 records |

The gateway verdict and consent verdict are inputs to Foundation; neither transfers the owning
authority. Control and Designer do not implement. Assignment and return remain Advisor-routed.

## 3. Frozen application and logical message contracts

### 3.1 Evidence carrier `CommerceEvidenceCarrierV1`

The application payload is **exactly** the existing `CommerceEvidenceEnvelope` from
`Cosmile/app/src/types/commerceEvidence.ts`, with `schema_version =
"cosmile.commerce_evidence.v1"`. Delivery cannot add, remove, reshape, enrich, normalize, or
reinterpret a field. It carries one envelope and an opaque ingress-context handle outside the
payload. Foundation must never inspect, persist, log, metric-label, or echo that handle.

The carrier byte representation for the transport boundary is UTF-8 JSON. Before send, the
sender parses its stored JSON, proves the exact-key projection, and serializes the same object;
it never recomputes, substitutes, or repairs `source_hash`. Foundation recomputation remains
byte-for-byte pinned to current hash-v1 golden fixtures, including the reviewed Cosmile
JavaScript `undefined` sentinel behavior when `source_hash` is excluded. Changing or cleaning
that algorithm requires a new envelope/hash version and independent review. A structural or
digest mismatch is poison input. The logical maximum is **32 KiB (32,768 UTF-8 bytes)**. This
limit is a reversible non-prod transport containment value, not a C validation rule or new
product-field limit.

Only contract opaque references (`subj_v2_*`, `pir_v1_*`, `cevi_v1_*`, product/SKU opaque
refs), source/idempotency keys, and closed structured feedback cross. Raw customer/order/item
IDs, free text, contact/payment data, credentials, diagnostics, or arbitrary extension maps do
not cross.

### 3.2 Authenticated-ingress principal contract

The application-facing contract is not a credential object. It is the landed minimized seam:

```text
AuthenticatedIngressVerdictV1 := ProvenanceVerdict(
  status: VERIFIED | UNVERIFIED | UNCONFIGURED | ERROR,
  source_identity: bool,
  envelope_digest: bool
)
CONTINUE iff status == VERIFIED
            and source_identity is True
            and envelope_digest is True
```

Before emitting that verdict, the Security-owned gateway must establish all of these bindings:

1. the authenticated workload is authorized as source service `cosmile`;
2. the source environment is exactly `local` or `shadow` and allowed for the receiving non-prod instance;
3. the attested bytes bind the complete strict envelope projection, including service,
   environment, source event, idempotency key, product/SKU refs, consent snapshot, lineage,
   normalizer version, and `source_hash`;
4. the gateway-received digest equals Foundation's recomputed strict-envelope digest;
5. the verdict is bound to this single ingress evaluation and cannot be substituted between
   payloads or tenants; and
6. failure, absence, ambiguity, stale context, or gateway unavailability produces
   `UNVERIFIED`, `UNCONFIGURED`, or `ERROR`, never a permissive default.

The opaque ingress context is usable only as an in-call capability for both verdict adapters;
it is destroyed after the decision. The application stores no gateway principal identifier.

**GATE U1 — not Security-authentication implementation-ready.** Security must separately
select and approve the concrete mechanism, trust boundary, credential custody, issuance,
rotation/revocation, replay/freshness defense, gateway-to-application integrity, failure
mapping, non-prod deployment, incident containment, and independent threat review. This
design deliberately selects no mTLS, key, signing scheme, token, certificate, secret,
credential store, endpoint, or provider. Until U1 evidence is accepted, the default verifier
stays `UNCONFIGURED`, and no intake implementation or activation WorkUnit is executable.

### 3.3 Current-consent request/verdict contract

Foundation calls the current Cosmile authority through the landed semantic seam at intake and
again before **every later eligibility-affecting transition**:

```text
CurrentConsentRequestV1(
  subject_ref,
  purpose,
  notice_version,
  captured_at,
  occurred_at,
  decision_time,
  opaque_ingress_context
)
ConsentVerdict.status :=
  GRANTED | REVOKED | EXPIRED | MISSING | PENDING |
  MISMATCH | UNKNOWN | UNCONFIGURED | ERROR
CONTINUE iff status == GRANTED
```

The authority derives current state from its append-only consent ledger for the exact
`subject_ref` and `cross_service_commerce_evidence` purpose. It must confirm notice compatibility
and that the snapshot was effective at occurrence; it does not return a consent row ID or raw
actor ID. `REVOKED`, `EXPIRED`, and `MISMATCH` retain their landed reason mappings. All other
non-GRANTED values, timeouts, malformed replies, adapter absence, and authority unavailability
map fail closed to `consent_missing`. The envelope snapshot never substitutes for this call.

Transition checks cover initial durable acceptance, review-open, review-decision, any future
reuse/materialization, and any future promotion. WU8 implements only the first transition;
the others are requirements on deferred designs. A failed later check preserves the evidence
receipt for audit/idempotency but atomically moves eligible lineage/drafts to a non-actionable
blocked/revoked state; it creates no new draft or real-user effect.

**GATE U2.** The transport/process by which Foundation reaches Cosmile and its security/privacy
review are unselected. D8-2-C push propagation and complete legal erasure are not smuggled into
this pull contract. Until U2 is approved, the verifier remains `UNCONFIGURED` and intake is not
executable.

### 3.4 Delivery acknowledgement `CommerceEvidenceDeliveryAckV1`

This is a synchronous logical return bound to the caller's one in-flight carrier; it contains
no producer ID, envelope, hash, credential, or diagnostic:

```text
contract_version = "foundation.commerce_evidence_delivery_ack.v1"
outcome = committed | exact_replay | terminal_rejected |
          retryable_unavailable | disabled
primary_reason_code = null | one guarded existing C reason category
retry_disposition = acknowledge | retry | contain
```

Valid combinations are fixed:

| Outcome | Reason | Disposition | Sender final action |
|---|---|---|---|
| `committed` | null | acknowledge | `acknowledged` |
| `exact_replay` | null | acknowledge | `acknowledged` |
| `terminal_rejected` | one guarded C category | acknowledge | `completed_rejected` |
| `retryable_unavailable` | `cannot_determine` only | retry | bounded retry |
| `disabled` | null | contain | `blocked` without deletion |

Malformed/unknown acknowledgement is `retryable_unavailable`; it never acknowledges. A
business rejection is delivery-complete but is not acceptance. Timeout or connection loss has
no acknowledgement and retries. Foundation emits `committed`/`exact_replay` only after its
durable transaction committed and both post-commit minimized sinks returned literal `True`.

Delivery-only safe categories, used only in source queue state and category-only DLQ, are:
`payload_malformed`, `payload_too_large`, `lease_expired`, `authority_unavailable`,
`receiver_unavailable`, `retry_exhausted`, `ancestor_not_committed`, `backpressure`, and
`ack_malformed`. They are not added to the 18 C reason codes and never appear in C decisions.

## 4. Exact delivery state machine and containment

### 4.1 Cosmile source-row state

Each commerce-evidence outbox row has one additive nullable `evidenceDeliveryState`. Non-evidence
signal rows keep it null and are outside this design. The future Cosmile kill switch is exactly
`COSMILE_COMMERCE_EVIDENCE_DELIVERY_ENABLED`; absent, non-`"1"`, or production means false. It is
separate from the producer flag and has no enablement in these WorkUnits.

```text
contained
  -> ready                 only exact True delivery flag + current consent + eligible class
  -> blocked               consent not GRANTED, flag OFF, adverse hold, or backpressure

ready
  -> leased                atomic claim; root has no earlier unfinished row
  -> blocked               flag/consent recheck fails
  -> dead_lettered         poison discovered before a send

leased
  -> acknowledged          committed | exact_replay
  -> completed_rejected    terminal_rejected
  -> retry_wait            retryable/unavailable and attempts remain
  -> blocked               disabled/kill switch/consent no longer GRANTED
  -> dead_lettered         poison or attempt 5 exhausted

retry_wait
  -> leased                due time + lease claim + current flag/consent recheck
  -> blocked               flag/consent no longer permits

leased --process crash/lease expiry--> ready
```

No other transition is valid. Terminal states are `acknowledged`, `completed_rejected`,
`dead_lettered`, and `blocked`. Retraction additionally changes every unfinished row in its
root to `blocked`; an already acknowledged predecessor remains as evidence of what was
accepted and is revoked by the Foundation tombstone.

Generic `FoundationSignalOutbox.status` maps as follows: `pending` for contained/ready/leased/
retry_wait, `sent` for acknowledged, `failed` for completed_rejected/dead_lettered, and
`blocked` for blocked. `sentAt` is non-null only for acknowledged; `errorMessage` remains null.

### 4.2 At-least-once, ordering, retry, and acknowledgement timing

- Delivery is at-least-once. There is no exactly-once claim.
- A claim transaction selects the earliest created unfinished row for a root, locks it, checks
  that no earlier root row is unfinished, sets `leased`, increments `attemptCount`, increments
  `deliveryLeaseVersion`, and sets `leaseExpiresAt = now + 30 seconds`.
- One root has at most one leased row. Global concurrency is **4**; batch claim is at most
  **20**; token-bucket send rate is **10 carriers/second** with burst **20**.
- Corrections/retractions never overtake their predecessor. If Foundation nevertheless sees a
  non-current target, it returns `terminal_rejected/lineage_broken`; it never buffers.
- Maximum attempts are **5**. After failed attempts 1–4, retry delay is respectively
  1, 2, 4, and 8 seconds plus injected uniform jitter in `[0,250]` milliseconds. Attempt 5
  failure becomes category-only dead letter. Tests inject clock/jitter; no sleep is required.
- Retry applies only to no response, `retryable_unavailable`, or malformed acknowledgement.
  A guarded C rejection is final. There is no silent drop and no infinite retry.
- The sender applies an acknowledgement in an atomic compare-and-set requiring the row still
  be `leased` at the recorded lease version. Late acknowledgements after lease expiry do not
  mutate state; redelivery safely resolves as exact replay if the earlier commit succeeded.
- Crash before Foundation commit retries. Crash after commit but before acknowledgement retries
  and gets exact replay. Crash after acknowledgement is harmless because the source transition
  is durable.
- Foundation acknowledgement is after durable accepted-state commit and successful minimized
  post-commit audit/metrics. A post-commit sink failure returns no success, poisons that
  service instance, and preserves every committed receipt. A healthy replacement instance
  handles redelivery as exact replay and may acknowledge only after its replay audit/metrics
  succeed. **No ledger epoch, table, or unrelated prior accepted evidence is cleared.**

### 4.3 Queue, byte, and poison backpressure

The non-prod containment constants are fixed for this design:

| Limit | Value | Fail-closed behavior |
|---|---:|---|
| eligible unfinished evidence rows | 1,000 | new cross-service outbox row is `blocked/backpressure`; local evidence transaction remains truthful |
| strict carrier bytes | 32,768 | `dead_lettered/payload_too_large`, zero send |
| batch claim | 20 | leave excess ready |
| global in-flight | 4 | no additional lease |
| per-root in-flight | 1 | no overtake |
| send rate/burst | 10/s, 20 | defer without incrementing attempts |
| lease | 30 s | expired lease returns to ready |
| attempts | 5 | category-only dead letter on exhaustion |

Malformed JSON, schema mismatch detected at the carrier seam, impossible state combination,
oversize payload, or digest mismatch is poison: zero network attempt, zero Foundation state,
source row terminal dead-lettered, category-only observation. A failed rate/capacity admission
is not deletion. No raw values or exception text enter the queue category fields.

### 4.4 Category-only dead letter

The original Cosmile outbox remains the contained source record under its existing minimized
payload retention; it is not copied into a DLQ. The row may record only the delivery category,
attempt count, and timestamps in addition to existing contract data. Any external or Foundation
DLQ projection is exactly:

```text
contract_version: "foundation.commerce_evidence_dlq.v1"
component: cosmile_sender | foundation_ingress
failure_category: one delivery-safe category
attempt_bucket: zero | one_to_four | exhausted
flag_state: disabled | enabled
time_bucket_utc: minute
count: 1
```

It contains no envelope, source/evidence/subject/purchase/product ID, root, hash, decision ID,
lineage pointer, queue-row ID, opaque context, credential, endpoint, diagnostic, or stack. Its
retention is the same **180-day maximum** as minimized decision audit metadata; legal deletion
may shorten it. DLQ is never evidence acceptance.

## 5. Foundation backend-neutral durable logical schema

**GATE U3:** FOUNDATION contains no verified storage/migration framework for this subsystem.
Accordingly this section fixes the backend-neutral model and constraints, but selects no DB,
ORM, migration tool, serialization engine, file store, or provider. No Foundation schema
WorkUnit is executable until Foundation architecture selects a concrete backend and supplies
forward/down/compatibility/retention evidence.

All timestamps are UTC with millisecond precision. `service` is closed to `cosmile` in v1.
Opaque contract references are not raw product/customer/order identifiers. Foundation never
stores a full envelope; it stores only validated fields required for idempotency, lineage,
review, and retention.

### 5.1 `EvidenceReceiptV1`

| Field | Null | Contract |
|---|---|---|
| `service` | no | `cosmile` |
| `source_event_id` | no | validated `pf_evt_v1_*` |
| `evidence_id` | no | validated `cevi_v1_*` |
| `idempotency_key` | no | validated `cevi_idem_v1_*` |
| `fingerprint` | no | `sha256:` of strict validated envelope + provenance/consent categories, existing algorithm |
| `schema_version` | no | `cosmile.commerce_evidence.v1` |
| `evidence_type` | no | purchase_feedback/correction/retraction |
| `decision_id` | no | Foundation `fcei_dec_v1_*` |
| `lineage_pointer` | no | Foundation `fcei_lin_v1_*` |
| `root_evidence_id` | no | validated opaque evidence ref |
| `target_evidence_id` | yes | exactly supersedes or retracts target; null for root |
| `occurred_at` | no | validated source time |
| `decided_at` | no | injected decision time |
| `provenance_category` | no | `VERIFIED` for accepted receipt |
| `consent_category` | no | `GRANTED` for accepted receipt |
| `retention_class` | no | `feedback_non_adverse_90d` in executable WU8 scope |
| `effective_eligibility` | no | eligible/revoked/expired/ineligible |
| `created_slot_count` | no | 0/1/2 |

Unique indexes enforce `(service,source_event_id)`, `(service,evidence_id)`, and
`(service,idempotency_key)`. Fingerprint is not logged or returned.

### 5.2 `AcceptedEvidenceV1`

One-to-one with receipt, keyed by `(service,evidence_id)`. Its exact typed projection is:

| Field | Null | Contract |
|---|---|---|
| `service`, `evidence_id` | no | composite key and receipt foreign key |
| `subject_ref` | no | validated `subj_v2_*` |
| `purchase_item_ref` | no | validated `pir_v1_*` |
| `product_ref` | no | non-empty opaque source claim |
| `sku_ref` | yes | null or non-empty opaque source claim |
| `satisfaction` | yes | satisfied/neutral/dissatisfied |
| `adverse_type` | yes | only `usage_safety` can occur in accepted WU8 state |
| `adverse_severity` | yes | always null for accepted usage_safety; closed enum defensively constrained |
| `adverse_certainty` | yes | `reported` iff adverse_type non-null |
| `normalizer_version` | no | `cosmile.closed_feedback_normalizer.v1` |
| `content_expires_at` | no | occurred-at plus 90 days |

Retraction stores all four feedback axes null. Outcome/adverse combination checks remain exactly
the landed validator matrix. This entity contains no full envelope, consent row, raw IDs/text/
PII, or arbitrary JSON.

`content_expires_at = occurred_at + 90 days` for all admissible WU8 content, including
`usage_safety`. Skin/other legal-hold content is never accepted while policy is UNCONFIGURED.
At expiry, structured content and drafts become ineligible and are deleted/cryptographically
unavailable by the selected backend procedure; the minimized receipt/tombstone may remain to
the 180-day ceiling to prevent replay from re-creating expired content.

### 5.3 `LineageNodeV1`, `LineageHeadV1`, and successor uniqueness

`LineageNodeV1` keys non-null `(service,evidence_id)` and references its receipt. Its other
non-null fields are `root_evidence_id`, action `root|correction|retraction`, and
`lineage_pointer`; `predecessor_evidence_id` is nullable only for `root`. A unique
partial/functional constraint on
`(service,predecessor_evidence_id)` when non-null enforces exactly one correction **or**
retraction successor across both action types (uniqueness 4).

`LineageHeadV1` is unique on non-null `(service,purchase_item_ref)`. Non-null fields are
`root_evidence_id`, `current_leaf_evidence_id`, `lineage_pointer`, immutable `subject_ref`,
`product_ref`, `tombstoned` boolean, `effective_eligibility`
`eligible|ineligible|revoked|expired`, and monotonic positive `version`; only `sku_ref` is
nullable. Root creation inserts head version 1. Correction advances the leaf/version only when
the target is current and all immutable axes match. Retraction sets tombstoned/revoked and does
not create a new usable leaf.

### 5.4 `LineageTombstoneV1`

Unique `(service,root_evidence_id)` enforces uniqueness 6. Fields are `purchase_item_ref`,
`lineage_pointer`, `reason_code=evidence_retracted`, `created_at`, and `expires_at` (maximum
180 days for WU8 non-adverse content). A second unique constraint on
`(service,purchase_item_ref)` prevents a new root for the tombstoned purchase lineage. It holds
no feedback content. Cleanup must not remove it while any producer row for that lineage can
still be delivered; Cosmile queue content expires no later than 30 days, so the 180-day ceiling
preserves this ordering.

### 5.5 `ReviewDraftV1`

One row per planned slot, unique `(service,evidence_id,candidate_slot)` where slot is
`outcome|adverse` (uniqueness 5). The exact typed fields and nullability are:

| Field group | Null | Contract |
|---|---|---|
| `contract_version`, `candidate_id`, `service`, `evidence_id`, `candidate_slot` | no | candidate v1; candidate_id globally unique; slot closed outcome/adverse |
| `decision_id`, `lineage_pointer`, `evidence_ref`, `content_hash` | no | validated Foundation formats; never logged/returned by delivery |
| `subject_ref`, `source_service`, `product_ref` | no | minimized opaque claims; source_service=cosmile |
| `sku_ref` | yes | null or non-empty opaque claim |
| `satisfaction` | yes | required only for outcome |
| `adverse_type`, `adverse_severity`, `adverse_certainty` | yes | adverse_type/certainty required only for adverse; accepted v1 type usage_safety and severity null |
| `consent_scope`, `retention_expires_at`, `memory_kind`, `sensitivity_level` | no | cross_service; 90-day expiry; closed landed DTO values |
| `safety_handling`, `response_policy` | yes | required only for adverse; exact landed literals |
| `status` | no | review_required/superseded/blocked/expired |
| `raw_text_stored`, `applied_to_real_user`, `write_live` | no | all literal false |
| `created_at`, `updated_at` | no | injected UTC millisecond time; update only on lifecycle block/supersede/expiry |

There is no JSON payload column. Invariants:

- `status = review_required` at creation;
- `raw_text_stored = false`, `applied_to_real_user = false`, `write_live = false`;
- outcome requires satisfaction and forbids adverse fields;
- adverse requires `usage_safety`, nullable severity, `reported`,
  `human_safety_review_required`, and `preapproved_static_guidance_only`;
- retraction creates zero drafts;
- correction atomically marks predecessor unapproved drafts `superseded` and creates only the
  new slots dictated by the corrected axes;
- retraction atomically marks all lineage drafts `blocked`;
- any later status transition first obtains a fresh `GRANTED` consent verdict; otherwise it
  atomically blocks the draft and creates no effect.

This is a durable **review-only draft record**, not current `MemoryCandidate`. It never writes
`SharedMemoryStore`, and cannot be approved, reused, promoted, ranked, or applied by WU8.

### 5.6 `DecisionAuditV1` and metrics

Audit remains post-commit and category-only. It may store decision ID, minute-bucket time,
status, one guarded reason category, provenance/consent categories, retention class,
lineage-action category, candidate-kind categories/count, eligibility category, and feature-
flag category. It stores no producer/subject/purchase/product/evidence/root identifiers,
lineage pointer, hashes, payload, context, credential, exception, or endpoint. Metrics use
only fixed category labels and bounded counts. Maximum retention is 180 days.

### 5.7 The six constraints, explicitly preserved

1. unique `(service, source_event_id)` in receipt;
2. unique `(service, evidence_id)` in receipt;
3. unique `(service, idempotency_key)` in receipt;
4. unique `(service, predecessor/target_evidence_id)` across correction and retraction;
5. unique `(service, evidence_id, candidate_slot)` in review draft;
6. unique `(service, root_evidence_id)` tombstone plus unique purchase-lineage replay block.

All are backend constraints, not read-then-write application guesses.

## 6. Transaction, replay, concurrency, and failure contract

### 6.1 Work outside the durable transaction

Flag gate 0, strict parse/validation, digest recomputation, gateway verdict, current-consent
query, retention evaluation, and pure draft planning occur outside the transaction. No network,
provider, auth, or consent call is made while holding a DB/storage transaction. Their results
are immutable inputs to the commit attempt.

Immediately before transaction commit, the Foundation shadow flag is re-read and must be
literal `True`. The transaction must also confirm that the decision-time consent verdict is
still within the adapter's same-call validity bound defined by U2; if U2 cannot define that
bound, it must perform a second pre-transaction query. The stored envelope snapshot is never
used for this check.

### 6.2 Atomic boundary

One serializable-equivalent transaction performs all or none:

1. acquire/serialize on `(service,purchase_item_ref)` lineage head and the three replay keys;
2. resolve exact replay or collision;
3. validate current leaf, target, immutable axes, tombstone, and successor uniqueness;
4. allocate Foundation decision/lineage IDs (reuse root lineage pointer for successors);
5. insert receipt and minimized accepted evidence;
6. insert lineage node and update/insert lineage head;
7. insert tombstone or reserve the exact review draft slots;
8. supersede/block predecessor/root drafts for correction/retraction;
9. recheck the exact-True commit guard; and
10. commit.

Serializable isolation is preferred. An architecture-selected equivalent is acceptable only
if it proves the same conflicts with atomic unique constraints plus per-lineage locking. A
deadlock/serialization failure is retryable at the transaction layer with a finite internal
attempt budget of **3**; exhaustion returns `retryable_unavailable` and creates no partial state.

### 6.3 First writer, replay, and races

- Same `(service,source_event_id)` plus identical fingerprint returns stored decision and
  current lineage eligibility, with zero insert/update/draft effect.
- Same primary key with mutated fingerprint, or reuse of evidence/idempotency key, returns
  `duplicate_evidence`; first committed writer is authoritative.
- Competing corrections/retractions lock the same head. Exactly one target successor commits;
  losers return `lineage_broken` or `evidence_retracted` based on the committed state.
- A new root racing a tombstone cannot pass the purchase-lineage replay constraint.
- Exact replay still runs current flag/auth/consent/retention gates first. Revocation, expiry,
  unavailability, OFF, or UNCONFIGURED therefore fails with the current conservative result
  instead of leaking stored decision data.
- Factory/draft planning occurs before replay lookup only as pure, injected, side-effect-free
  computation. It cannot make an otherwise exact replay fail: replay/collision and lineage are
  evaluated before the commit guard or adoption of planned drafts, and exact replay ignores
  newly planned slots. A planning failure supplies an empty plan plus hard-false commit guard;
  it still permits gates 9/10 to recognize exact replay, matching the reviewed C contract.

### 6.4 Post-commit audit failure

Audit/metrics are intentionally outside the transaction. Accepted/exact-replay success is not
released unless both sinks return literal `True`. A sink failure:

- does not roll back or delete the durable commit;
- sets a process-local poison latch before serving another request;
- returns no success acknowledgement, so the sender retries;
- preserves all unrelated prior accepted evidence; and
- is recovered only by a healthy replacement process, which exact-replays and audits again.

Clearing an entire service-owned ledger epoch is forbidden because it can erase unrelated
accepted ephemeral evidence. The smallest fail-closed design is the landed poison-latch rule
plus immutable durable transaction: discard only the uncommitted/current response and any
in-memory adopted DTO for this call, preserve all committed rows, block the process, and let
redelivery reconcile. This requires no WU3 policy expansion.

## 7. Additive schema and migration plan

### 7.1 Cosmile — concrete repository-supported path

Cosmile is verified to use Prisma 6.19.3 with PostgreSQL migrations under
`app/prisma/migrations`. The proposed additive migration path is:

```text
app/prisma/schema.prisma
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql
```

Forward sequence, only in a later separately authorized Cosmile WorkUnit:

1. preflight asserts current M2 A/B migration is present; evidence rows satisfy current
   contract; no payload exceeds 32 KiB; and no unknown evidence status exists;
2. add these exact evidence-only columns to `FoundationSignalOutbox` (all null for non-evidence
   rows): `evidenceDeliveryState String?`; `evidenceAttemptCount Int?` (evidence default/backfill
   0); `evidenceNextAttemptAt DateTime?`; `evidenceLeaseExpiresAt DateTime?`;
   `evidenceLeaseVersion Int?` (evidence default/backfill 0);
   `evidenceLastFailureCategory String?`; `evidenceAcknowledgedAt DateTime?`;
   `evidenceCompletedAt DateTime?`; and `evidencePayloadBytes Int?`;
3. backfill evidence rows only: adverse-hold or current blocked -> `blocked`; other pending ->
   `contained`; sent -> `acknowledged`; failed -> `dead_lettered`; calculate byte length;
4. replace only `FSO_evidence_row_chk` with its existing minimization/retention checks plus the
   §4 state/status mapping; constrain state to the eight named states, counts/versions to
   nonnegative integers, byte length to `1..32768`, lease expiry to `leased` only, retry time to
   `retry_wait` only, acknowledgement time to `acknowledged` only, completed time to terminal
   states only, and failure category to the closed delivery list or null; add index
   `(signalType,evidenceDeliveryState,evidenceNextAttemptAt,createdAt)` and per-root index
   `(signalType,rootEvidenceId,createdAt,id)`;
5. validate constraints; keep delivery flag OFF; run only approved migration tests; and
6. produce schema diff, forward/down transcript against disposable non-prod test DB, row counts,
   and zero-data-loss proof for independent review.

Down is allowed only while every evidence delivery state is `contained|blocked`, attempt count
is zero, and no ack/reject/dead-letter transition occurred. Otherwise down aborts fail-closed.
It drops only the additive columns/indexes/checks; it never deletes or rewrites an outbox row.
Rollback after any attempted delivery is logical (flags OFF and code rollback), not destructive
schema down.

### 7.2 Foundation — architecture gate, no invented path

No current Foundation storage/migration framework was found at the pin. Therefore a concrete
backend, schema file, or migration directory cannot be named honestly. **GATE U3** must first
produce an Advisor-approved Foundation storage decision containing backend, transaction/
isolation proof, migration tool/location/naming, retention/deletion mechanism, local non-prod
instance ownership, backup/restore boundary, and forward/down compatibility policy.

After U3, the Foundation repository owner must revise this design's future WorkUnit allowlist
with exact paths before implementation. The logical entities and constraints in §5 are the
acceptance contract; they do not authorize an improvised SQLite/file/in-memory/PostgreSQL/etc.
implementation. Empty-state forward/down rehearsal is required in a disposable non-prod test
environment, but no rehearsal occurred in this mission.

## 8. Local/non-prod topology

```text
Cosmile request transaction
  -> Cosmile PostgreSQL evidence + outbox (P1)
  -> future single-purpose sender process (P2; OFF)
  -> Security-owned gateway boundary (P3; U1)
  -> future Foundation ingress process (P5; OFF/HARD_OFF)
       -> current-consent adapter to Cosmile authority (P4; U2)
       -> pure C gates and draft plan
       -> architecture-selected durable store (P6; U3)
       -> minimized audit/metrics
  -> logical acknowledgement to sender
```

There is no broker in this design. There is also no claim that direct HTTP, a broker, cron,
timer, systemd, container, serverless route, or any other runtime is selected. U1/U2 and the
future operational handoff must choose the actual process/wire topology. The logical sender is
single-purpose; it reads only `cosmile.commerce_evidence` rows and has no access to raw customer,
order, payment, or credential values.

Default containment:

- Cosmile future delivery flag absent/false: sender claims zero rows.
- Foundation `commerce_evidence_c_shadow` false: disabled before parse.
- Foundation live/intake/candidate-runtime flags: remain `HARD_OFF` and have no enable path.
- provenance/consent adapters default `UNCONFIGURED`: accept zero.
- adverse retention policy remains constant `UNCONFIGURED`: skin/other accept zero.
- shutdown stops new leases, waits at most the 30-second lease window, and exits; unfinished
  leases become ready after expiry. It never marks a row sent on shutdown.

## 9. Consent, revocation, retention, and erasure boundary

At source scheduling, Cosmile re-resolves the exact subject/purpose current consent from its own
ledger. Not GRANTED means `blocked`, not send. Foundation independently verifies at intake.
Every later eligibility-affecting transition must repeat the Foundation-to-Cosmile query. Thus a
snapshot is provenance about capture, not current authority.

If consent changes after source lease but before Foundation commit, the Foundation check rejects.
If it changes after commit, the next review transition blocks/revokes the drafts. D8-2-C ordered
lifecycle propagation is the eventual target but deferred; WU8 does not claim prompt push
revocation. Complete legal erasure, erasure acknowledgements, jurisdictional exceptions, and
adverse-hold duration are **GATE U5 / Legal**. Retraction is eligibility revocation and replay
blocking, not proof of complete legal erasure.

Retention classifications in this minimum design:

| Data | Ceiling | Cleanup rule |
|---|---:|---|
| Cosmile unacknowledged non-adverse outbox payload | existing 30 days | expire/contain; never silently mark sent |
| Foundation structured accepted evidence/drafts | 90 days from occurrence | expire and remove content; mark receipt eligibility expired |
| Foundation minimized receipt/tombstone/audit/DLQ | 180 days max | delete after no producer retry can exist; Legal may require shorter |
| skin/other adverse | duration unconfigured | zero Foundation acceptance/draft; no invented cleanup duration |

## 10. Candidate and safety ceiling

WU8 stops at durable accepted-evidence plus review-only drafts. It never constructs current
`MemoryCandidate`, writes `SharedMemoryStore`, uses `furef_v2`, coerces adverse hold into the
current retention enum, approves/reuses/promotes/ranks a draft, mutates safety policy, or applies
anything to a real user. Every result retains:

```text
applied_to_real_user = false
write_live = false
promotion_performed = false
```

Skin/other + `adverse_regulatory_hold` is rejected `privacy_scope_exceeded` while policy is
UNCONFIGURED and creates zero accepted records/drafts. `usage_safety` remains non-hold under the
landed contract, may produce only a high-sensitivity review-required draft, and has no automated
advice or real-user path. Guest/anonymous or identity-linking input is rejected and creates zero.

**GATE U4** is a separately reviewed non-lossy current/future candidate contract. **GATE U5** is
Legal adverse retention/erasure. **GATE U6** is any future guest/identity-link policy. None is an
extension point in WU8.

## 11. Rollback and kill-switch order

Safe rollback is ordered:

1. turn the future Cosmile delivery flag OFF so no new leases occur;
2. keep all queued/unacknowledged rows `pending` or `blocked`; never drain, mark sent, or delete;
3. turn Foundation shadow flag OFF; keep three activation flags HARD_OFF;
4. set/leave provenance and consent adapters UNCONFIGURED;
5. stop sender/ingress processes after leases expire;
6. revert only newly authorized adapter/modules; preserve durable rows and additive schema;
7. use down migration only if its empty/no-attempt gate proves true; otherwise forward-fix.

Rollback never clears a Foundation epoch, drops accepted evidence, removes tombstones, resets
idempotency, reopens a root, or enables a candidate path. Proof consists of flag snapshots,
category/count-only queue and durable-store counts, zero send/commit deltas after OFF, unchanged
product baselines outside allowlists, and independent review.

## 12. Future test design — tests before code, none run here

### 12.1 Cosmile tests

Future exact test files:

```text
app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts
app/scripts/wu8_commerce_evidence_outbox_sender.vitest.ts
app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts
app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py
app/scripts/wu8_commerce_evidence_no_activation.mjs
```

Required oracles: frozen serialization and byte count; no extra fields; queue-depth shedding;
root FIFO with cross-root concurrency; lease CAS/expiry; backoff+jitter/attempt 5; timeout after
commit; exact replay acknowledgement; malformed/unknown ack; poison and oversize; terminal
rejection; retraction blocks unfinished root; current-consent loss before every lease/retry;
adverse-hold/guest zero send; OFF zero claim; no raw values in failure state/log/metric/DLQ;
migration forward/backfill/constraints/down gate; generic signal rows unchanged.

### 12.2 Foundation tests after U1/U2/U3

Future source-level test names (backend-specific migration paths remain U3-gated):

```text
foundation/shared_memory/tests/test_commerce_evidence_delivery_contract.py
foundation/shared_memory/tests/test_commerce_evidence_durable_store_contract.py
foundation/shared_memory/tests/test_commerce_evidence_durable_service.py
foundation/shared_memory/tests/test_commerce_evidence_ingress_containment.py
foundation/shared_memory/tests/test_commerce_evidence_durable_concurrency.py
foundation/shared_memory/tests/test_commerce_evidence_durable_migration.py
```

Required oracles:

- unit/serialization: exact envelope and acknowledgement matrices; guarded categories only;
- property/malicious input: extra keys/types, raw/PII terms, oversized/deep payloads, identity
  crossover, digest substitution, malformed verdicts, no exception/identifier leakage;
- auth: absent/unconfigured/unverified/error/binding false all accept zero; only a Security test
  harness implementing the approved U1 contract can verify success;
- consent: all nine states, unavailability, staleness between stages, snapshot substitution
  attack, and transition-time recheck;
- idempotency/concurrency: 2+ processes racing all three primary identities, exact replay,
  mutated body collision, first-writer, serialization retries bounded to 3;
- lineage: root/correction/retraction ordering, two-successor races, immutable-axis mutation,
  late correction, tombstone/new-root race, replay after revocation/expiry;
- drafts: exact slot counts and immutable DTO values, correction supersede, retraction block,
  skin/other/guest zero state, usage-safety review-only, no candidate/store import;
- crash/restart: before commit, after commit/before ack, after ack, lease expiry, durable replay;
- post-commit sink failure: committed rows preserved, only instance poisoned, no epoch clear,
  replacement exact-replay audit before ack;
- migration: empty forward/down, compatibility, six constraint violations, partial-failure
  rollback, existing rows, retention cleanup/tombstone ordering;
- rollback: flags OFF at both checks, queued rows contained, no destructive down after attempts,
  no real-user/store/promotion effects;
- observability: snapshots inspect only bounded counts/categories; automated denylist for payload,
  all identifiers/hashes/context/credentials/diagnostics in logs, audit, metrics, responses, DLQ.

Existing regression suites remain mandatory: all current Foundation commerce-evidence/shared-
memory tests and Cosmile M2 A/B commerce-evidence/feedback-state/no-transport tests. A future
implementation must first add failing tests, then code, then produce exact command/transcript
evidence under its authorized handoff. This design ran none.

## 13. Threat and privacy analysis

| Threat | Design control | Residual gate |
|---|---|---|
| workload spoofing / cross-tenant principal | Security-owned workload+environment+digest binding; no app credential; UNCONFIGURED default | U1 mechanism/review |
| carrier replay or mutation | at-least-once plus three replay identities/fingerprint; strict source hash; first writer | U1 freshness at gateway |
| stale/revoked consent | Cosmile current authority queried at intake and every later transition; snapshot never authoritative | U2 adapter; D8-2-C deferred |
| consent-authority outage | fail closed; source contained or Foundation rejects; no cache-as-authority | U2 availability design |
| lineage races/out-of-order | per-root sender order, durable head lock, single successor, tombstone replay block | U3 backend proof |
| raw/PII/payload leakage | frozen minimized envelope; strict scan; no Foundation full envelope; category-only output/audit/DLQ | independent malicious-input review |
| identifier leakage through operations | no identifiers/hashes in logs/metrics/audit/DLQ; source row access stays Cosmile-owned | repo-owner access design |
| poison queue | strict byte/schema/digest precheck, immediate category dead letter, finite attempts | operational review |
| resource exhaustion | 32 KiB, depth 1,000, 10/s burst 20, concurrency 4, batch 20, finite retry | values are non-prod only |
| crash ambiguity | durable source lease/CAS and Foundation atomic commit; redelivery exact replay | U3 durability |
| post-commit sink failure | poison only current process; preserve all state; retry/replay audits before ack | durable audit implementation review |
| unsafe rollback | sender OFF first; queued rows preserved; Foundation OFF; no destructive down after attempts | operator authorization |
| adverse/legal misclassification | skin/other policy constant UNCONFIGURED; usage-safety review-only; no invented retention | U5 Legal |
| erasure gap | explicit: retraction is not complete erasure; data ceilings; no false guarantee | U5 Legal + deferred lifecycle design |
| fail-open activation | absent flags false/HARD_OFF; adapters/policy UNCONFIGURED; checks before parse and commit | Leo/GPT activation approval |

## 14. Ordered future WorkUnits — planned, not authorized

Every WorkUnit requires a new Advisor handoff, repo-owner Worker, independent review, clean
subject pin, and explicit Leo/GPT authority. Designer/Control never implement.

### WU8-0 — external gates package (owners: Security, privacy, Foundation architecture)

- Dependencies: this design independently reviewed.
- Allowed product paths: **none**; authority/evidence paths supplied by Advisor.
- Actions: close U1 concrete auth; U2 current-consent adapter; U3 Foundation backend/migration.
- Stop: any missing mechanism owner, threat review, consent failure map, transaction proof,
  migration path, retention cleanup, or non-prod containment.
- Evidence: signed/approved decision records and exact future path allowlists.
- Rollback: not applicable; design decisions only.
- Skill/effort: security/privacy/architecture-specific skills selected by Advisor; `high`.

### WU8-C1 — Cosmile delivery schema only (owner: Cosmile Worker)

- Dependency: independent design review; does not require network activation.
- Exact allowed paths: `app/prisma/schema.prisma`,
  `app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql`,
  `.../down.sql`, `app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py`.
- Actions: implement §7.1 additive columns/checks/indexes/backfill and fail-closed down gate.
- Tests: only the new migration test plus exact existing M2 A/B migration regression authorized
  in that handoff.
- Stop: non-empty incompatible row, oversize current row, unknown state, destructive down,
  generic signal drift, DB/secret permission absent.
- Rollback: down only with zero-attempt gate; otherwise flags remain OFF and forward-fix.
- Evidence: schema diff, disposable forward/down transcript, counts/categories only.
- Required skill/effort: repo migration skill named by Advisor; `high`.

### WU8-C2 — pure Cosmile delivery contracts/state machine (owner: Cosmile Worker)

- Dependency: WU8-C1 reviewed PASS.
- Exact allowed paths: `app/src/types/commerceEvidenceDelivery.ts`,
  `app/src/lib/commerceEvidenceDeliveryState.ts`,
  `app/scripts/wu8_commerce_evidence_delivery_contract.vitest.ts`,
  `app/scripts/wu8_commerce_evidence_delivery_property.vitest.ts`.
- Actions: implement frozen carrier/ack/state/limits as pure types and transitions, no sender or I/O.
- Tests: §12.1 contract/property cases.
- Stop: envelope change, endpoint/provider/credential, timer/network/DB access, permissive unknown.
- Rollback: revert only new modules; schema remains contained.
- Evidence: diff, test transcript, no-transport static scan.
- Required skill/effort: `/fable-builder`; `high`.

### WU8-F1 — Foundation pure durable contracts (owner: Foundation Worker)

- Dependency: U3 approved with exact backend-specific later allowlist. This WorkUnit itself is
  pure and must not implement the backend.
- Exact allowed paths: `foundation/shared_memory/commerce_evidence/delivery_contract.py`,
  `foundation/shared_memory/commerce_evidence/durable_contract.py`,
  `foundation/shared_memory/tests/test_commerce_evidence_delivery_contract.py`,
  `foundation/shared_memory/tests/test_commerce_evidence_durable_store_contract.py`.
- Actions: express §3.4 and §5 as immutable types/protocols/invariant tests; defaults accept zero.
- Stop: backend, route, network, verifier mechanism, schema, current candidate/store import.
- Rollback: revert new files only.
- Evidence: diff/tests/static forbidden-import scan.
- Required skill/effort: `/fable-builder`; `high`.

### WU8-F2 — Foundation durable backend and migration (owner: Foundation Worker)

- Dependencies: U3 approved and WU8-F1 reviewed; **GATED now**.
- Exact allowed paths: supplied only by the U3-approved architecture handoff; none are invented here.
- Actions: implement §5/§6 atomic store, migration, cleanup, and backend contract tests.
- Tests: durable migration, six constraints, multi-process concurrency, crash/restart, retention.
- Stop: path/technology differs from U3, non-serializable behavior, calls inside transaction,
  destructive down, incomplete constraint proof, product data access not authorized.
- Rollback: flags OFF; additive schema retained after any data; forward-fix.
- Evidence: migration transcript, isolation/concurrency proof, category/count snapshots.
- Required skill/effort: U3-selected storage/migration skill; `max`.

### WU8-F3 — approved verdict adapters and ingress orchestration (owners: Foundation + infrastructure)

- Dependencies: U1, U2, U3, WU8-F2 PASS; **GATED now**.
- Provisional Foundation application paths after Advisor confirmation:
  `foundation/shared_memory/commerce_evidence/ingress.py`,
  `foundation/shared_memory/commerce_evidence/service.py`,
  `foundation/shared_memory/commerce_evidence/verifiers.py`,
  `foundation/shared_memory/tests/test_commerce_evidence_durable_service.py`,
  `foundation/shared_memory/tests/test_commerce_evidence_ingress_containment.py`,
  `foundation/shared_memory/tests/test_commerce_evidence_durable_concurrency.py`.
  Infrastructure/gateway paths must come from U1 and are not guessed.
- Actions: bind approved opaque auth/consent adapters, durable service, ack, poison latch, and
  flag checks. No activation or endpoint beyond the approved gateway contract.
- Tests: all Foundation §12.2 cases; approved auth/consent harnesses only.
- Stop: raw credential/principal, snapshot authority, endpoint/provider drift, HARD_OFF change,
  current candidate/store bridge, missing post-commit sink semantics.
- Rollback: flag OFF, adapters UNCONFIGURED, preserve durable state.
- Evidence: contract-to-code table, exact transcripts, minimization scan, independent PASS.
- Required skill/effort: `/fable-builder` plus U1/U2 skills; `max`.

### WU8-C3 — contained sender (owner: Cosmile Worker)

- Dependencies: U1/U2 approved, WU8-C1/C2 and WU8-F3 reviewed PASS; **GATED now**.
- Exact allowed paths: `app/src/lib/commerceEvidenceOutboxSender.ts`,
  `app/scripts/wu8_commerce_evidence_outbox_sender.vitest.ts`,
  `app/scripts/wu8_commerce_evidence_no_activation.mjs`, plus only the U1-approved transport
  adapter path supplied by its handoff.
- Actions: implement §4 lease/order/retry/ack state machine behind absent/false flag. No schedule,
  route, process launcher, deployment, or activation.
- Tests: deterministic retry/order/crash/ack/consent/kill/minimization and all current no-transport regressions.
- Stop: U1 adapter absent, raw credential, unapproved endpoint/provider, flag enable, infinite
  retry, payload log, adverse/guest send, producer contract drift.
- Rollback: delivery flag OFF; leases expire; rows remain pending/blocked; revert new modules.
- Evidence: diff/tests/state traces containing categories/counts only, zero activation proof.
- Required skill/effort: `/fable-builder` plus U1 transport skill; `max`.

### WU8-X1 — bounded non-prod integration rehearsal (cross-project owners)

- Dependencies: every prior implementation review PASS and a new explicit Leo/GPT rehearsal
  authority covering DB/network/test environment; **not authorized by this design**.
- Allowed paths/environment: exact ephemeral non-prod paths supplied by Advisor.
- Actions: prove carrier/auth/consent/durable commit/retry/replay/rollback end to end under flags
  still OFF by default, then one explicitly bounded shadow interval if separately approved.
- Tests: malicious inputs, revocation race, crash boundaries, concurrency, resource limits,
  category-only observability, rollback.
- Stop: any real user/live/prod/protected branch, secret/PII exposure, unknown authority, unsafe rollback.
- Rollback: §11; preserve data and queue.
- Evidence: independent review package; no activation continuation.
- Required skill/effort: Advisor-selected integration/security skills; `max`.

No WorkUnit for current candidate materialization, SharedMemoryStore, adverse policy, guest,
D8-2-C lifecycle propagation, complete erasure, production, or activation is present.

## 15. Contract-to-code and direction traceability

| Invariant/direction | Design section | Future path/owner | Required test/review | Gate |
|---|---|---|---|---|
| D8-1-A gateway auth | §2, §3.2, §13 | U1 infrastructure paths; F3 verifier seam | all non-VERIFIED/binding false accept zero; Security review | U1 |
| D8-2-A current consent | §3.3, §9 | F3 verifier; C3 source check | nine states, outage, snapshot substitution, transition recheck | U2 |
| D8-3-B pipeline | §4, §8, §11 | C1/C2/C3 + F2/F3 | retry/order/crash/backpressure/DLQ/kill/rollback | U1–U3 |
| D8-4-A durable evidence + drafts only | §5, §10 | F1/F2 | exact typed rows, no candidate/store import, false effect flags | U3 |
| D8-5-A adverse UNCONFIGURED | §1.3, §10 | existing validator; F3 regression | skin/other zero record/draft; usage-safety review-only | U5 for change |
| frozen v1 envelope | §3.1 | existing Cosmile type; C2 | exact serialization/extra-key/byte tests | none for pure design |
| six uniqueness constraints | §5.7, §6 | F2 U3-selected paths | constraint and multi-process race tests | U3 |
| exact replay/current gates | §4.2, §6.3 | F3 | post-commit lost ack, revocation/OFF replay, mutated collision | U1–U3 |
| correction/retraction/tombstone | §4, §5.3–5.5, §6 | C3/F2/F3 | FIFO, two-successor race, immutable axes, replay block | U3 |
| category-only observability | §4.4, §5.6 | C2/C3/F3 | automated leakage denylist | U1/U2 paths reviewed |
| post-commit sink failure | §4.2, §6.4 | F3 | poison only instance, preserve all rows, replay audit | U3 |
| rollback/HARD_OFF | §8, §11 | C3/F3 | OFF before parse/commit, zero drain/delete/effect | activation remains forbidden |
| retention/erasure honesty | §5, §9 | F2 cleanup | 90/180 ordering, tombstone outlives retry, erasure disclaimer | U3/U5 |

## 16. Honest readiness statement and STOP

**Implementation-ready now as reviewed design detail:** frozen carrier semantics; logical
acknowledgement; exact contained delivery state/limits; backend-neutral durable entities,
constraints, transaction/race rules; Cosmile additive migration plan; candidate/safety ceiling;
rollback; future tests; dependency-gated WorkUnit order.

**Not implementation-ready:** concrete gateway authentication, any credential/trust lifecycle,
current-consent transport, Foundation durable backend/schema/migration paths, endpoint/broker/
process deployment, lifecycle push/complete erasure, adverse legal policy, guest identity,
current candidate bridge, activation, or production. U1/U2/U3 block delivery/intake; U4/U5/U6
block their respective deferred scopes.

```text
STATUS: DESIGN_READY_FOR_INDEPENDENT_REVIEW
SECURITY_AUTHENTICATION_IMPLEMENTATION_READINESS: NOT_AUTHORIZED
WU8_IMPLEMENTATION: NOT_AUTHORIZED
DELIVERY_OR_INTAKE_IMPLEMENTATION: NOT_AUTHORIZED
DB_SCHEMA_MIGRATION_IMPLEMENTATION_OR_REHEARSAL: NOT_AUTHORIZED
PRODUCT_REPOSITORY_WRITE: ZERO
RETURN_TO: foundation-advisor
STOP
```
