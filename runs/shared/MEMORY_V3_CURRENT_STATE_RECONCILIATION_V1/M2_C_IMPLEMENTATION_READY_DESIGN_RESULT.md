# Memory V3 M2 C — Foundation commerce-evidence boundary implementation-ready design

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-IMPLEMENTATION-READY-DESIGN-001
ROLE: Designer
ROLE_MODE: C_IMPLEMENTATION_READY_DESIGN_ONLY
ACTOR_ID: foundation-designer
SESSION: foundation-designer
WINDOW_PANE: @29 / %29
ACTUAL_CWD: /home/leo/Project/Cosmile
ACTUAL_MODEL_EFFORT: gpt-5.6-sol / max
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor
REQUIRED_SKILL_APPLIED: /fable-builder

RESULT_STATUS: READY_FOR_INDEPENDENT_DESIGN_REVIEW
RESULT_CLASS: DESIGN_REVIEW_SUBJECT_ONLY
IMPLEMENTATION_AUTHORITY: NONE
DELIVERY_OR_INTAKE_AUTHORITY: NONE
CANDIDATE_RUNTIME_AUTHORITY: NONE
HARD_STOP: ACTIVE
```

## 0. Outcome

This design makes the bounded future Foundation C code path implementable without
inventing product, consent, identity, safety, lineage, or retention policy. It does
not authorize that implementation. It defines an exact fail-closed validator,
verifier seams, an ephemeral shadow decision ledger, Foundation-owned candidate
drafts, lifecycle effects, tests, and review gates.

The design is ready for independent design review, not for implementation or
activation. All four reserved decisions remain open:

1. the jurisdiction, legal role, and duration for `adverse_regulatory_hold`;
2. the concrete authenticity credential/attestation and ingress mechanism;
3. any anonymous/guest cross-service exception;
4. C implementation, delivery, intake activation, and candidate runtime.

Their behavior is deterministic now: an unconfigured authenticity verifier, an
unverifiable current consent snapshot, an unconfigured adverse-retention policy,
an anonymous actor, or a disabled flag accepts nothing and creates nothing.

No UI is in scope. The machine-readable status and reason enums below are also the
human-audit-readable and screen-reader-equivalent semantics; no meaning depends on
color, layout, or raw payload display.

## 1. Authority, anchors, and non-authority

### 1.1 Pinned source and evidence

| Space | Branch / evidence | Exact anchor | Design use |
|---|---|---|---|
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ced7083bb8d0af00bda2a54951923ea22f` | Current producer envelope, normalizer, lineage, consent, outbox containment, tests |
| Foundation | `shadow/foundation-shared-memory-v0` | `f6417004d9157766b2b23d4d0870ade7f0c7fe96` | Current candidate/gate/reason/identity/approval/reuse/provenance/safety/flag/API/test seams |
| Control evidence | foundation-docs | `c53855c6e191c24819e98555f83bf12b37e9a127` | Cross-project C contract analysis and Founder decisions |
| Designer handoff | foundation-docs | `2f8c1c7f3382f67e523fe1e19aed7abffce3db11` | Exact work authority and write boundary |
| Foundation docs live worktree | `advisor/foundation-team-role-alignment-20260714` | pre-write `0ef0508f3f2b23c5e79b04009c25f47bc7e2df0d` | Result storage only; Advisor publishes |

The handoff file in the live worktree is byte-identical to its blob at the handoff
commit (`sha256 0ba49e892edb3b80916e8b8a53d546de0063e31c`).

### 1.2 Fixed Founder decisions preserved

- D1-A: `RecommendationEvent.sessionId` remains Cosmile-local, nullable, and absent
  from C. C never requires or reads it.
- D2-A: Cosmile alone normalizes the closed controls and owns the versioned evidence
  envelope. Foundation validates; it does not reinterpret raw input.
- D3-A: feedback storage and cross-service use are separate consent purposes;
  correction/retraction are append-only; identity linking is default OFF; ordinary
  and adverse retention remain distinct.
- Cosmile creates zero memory or adverse candidates. A separately approved future
  Foundation implementation may create Foundation-owned candidates only from
  accepted evidence.
- Satisfaction and adverse are independent. Satisfaction cannot lower adverse
  classification, review, retention, or safety handling.
- No raw text, semantic provider, automatic promotion/reuse/ranking/safety mutation,
  generated medical advice, external reporting, delivery, intake activation, real
  database, production, or live behavior is authorized.
- Full Package 1B remains explicitly `NOT_AUTHORIZED`.

### 1.3 Current facts versus future design

`NOW` at the pinned Foundation head:

- there is no `cosmile.commerce_evidence.v1` intake;
- `shared_memory_v0_shadow` is default OFF and in-process only;
- `SharedMemoryStore` is volatile and asserts `memory_db_created=False`;
- `ingest_event_signal` accepts a different, legacy event-signal shape and explicitly
  does not create memory;
- the 18 C codes are absent from the dynamic Foundation reason guard;
- the 17-field current `MemoryCandidate` requires `furef_v2`;
- candidate approval and reuse are separate, manual-gated workflows, and candidate
  state is not reusable by default.

`FUTURE / NOT AUTHORIZED` in this design:

- a new, dedicated, in-process commerce-evidence service validates and returns a
  data-contract result;
- its shadow reference ledger is ephemeral and transactionally serialized within
  one process;
- it may create dedicated Foundation commerce candidate drafts, never shared-memory
  records, learned records, or runtime decisions;
- no existing endpoint, consumer, outbox flusher, or API route imports it.

### 1.4 Pinned source-to-contract anchors

| Pinned source | Fact carried into this design |
|---|---|
| Cosmile `app/src/types/commerceEvidence.ts` | exact envelope fields/enums, three evidence types, three consent purposes, two retention classes, and the reserved 18 C codes |
| Cosmile `app/src/lib/commerceEvidenceNormalizer.ts` | adverse-first closed table, `reported` certainty, unknown severity local-only, and retention-class mapping |
| Cosmile `app/src/lib/commerceEvidenceService.ts` | identified-only envelope, actual grant provenance copy, current lineage behavior, retraction-null feedback, and producer-only scope |
| Cosmile `app/src/lib/ids.ts` | exact ID regexes, delimiter-free idempotency formula, custom sorted serializer, and unkeyed source hash |
| Cosmile `app/prisma/schema.prisma` and M2 A/B migration | producer uniqueness, append-only records/tombstone, purpose ledger, and outbox containment |
| Cosmile `app/scripts/m2_ab_commerce_evidence.vitest.ts` | current normalization/consent/envelope/lineage/reason test oracles, including historic-notice provenance preservation |
| Cosmile `app/scripts/m2_ab_no_transport.mjs` | current zero-transport/zero-candidate containment oracle |
| Foundation `foundation/shared_memory/{contract,gate,api,store,reason_codes,subject_identity}.py` | current 17-field candidate, gate order, inert API/store, reason guard, and validate-not-mint identity boundary |
| Foundation `foundation/_core/{learning_memory_state,learning_approval_workflow,reuse_gate,source_provenance_adapter}.py` | separate candidate/review/approval/reuse states and provenance constraints |
| Foundation `foundation/_core/{foundation_customer_decision_memory,foundation_safety_guard_layer,foundation_customer_memory_consent_guard,foundation_deleted_expired_memory_guard}.py` | no evidence upgrade/safety override, consent/high-risk checks, and non-reappearance constraints |
| Foundation `foundation/{feature_flags.py,cosmile/cosmile_feature_flags.py}` | default-OFF and hard-OFF integration/live behavior |
| Foundation `foundation/shared_memory/tests/*` | current synthetic-only, no-memory-DB, flag-off, raw/PII, subject-format, and no-live regression anchors |

Source wins over prose. In particular, section 4.3 records the pinned source-hash
sentinel behavior even though an earlier design comment describes the field as
simply excluded.

### 1.5 Hard stop

Independent design review follows this result. After review, the route is a HARD
STOP back to Leo/GPT. A review PASS is not implementation authorization. Every
future WorkUnit in section 17 is explicitly `NOT_AUTHORIZED`.

## 2. System spaces and ownership

| Space | Owner | State | Permitted responsibility | Explicit non-responsibility |
|---|---|---|---|---|
| Closed feedback controls and normalization | Cosmile | NOW | Closed-choice normalization and versioned source evidence | No candidate, interpretation beyond closed table, or Foundation policy |
| `FoundationSignalOutbox` commerce-evidence rows | Cosmile | NOW, contained | Transactional producer-only queue state | No sender, flush, retry transport, consumer, network, or sent-state transition |
| Transport/ingress adapter | Unowned | DEFERRED | None | No endpoint, credential, message bus, polling, or delivery is designed here |
| Commerce-evidence validator | Foundation | FUTURE, NOT AUTHORIZED | Exact v1 structural/policy accept or reject | No raw-input normalization and no consent/identity minting |
| Provenance and consent verifier adapters | Foundation boundary with future approved authority | FUTURE, UNCONFIGURED | Return narrow verified verdicts | No credential/protocol selection and no consent ledger ownership |
| Evidence decision/lineage plane | Foundation | FUTURE, NOT AUTHORIZED | Ephemeral receipts, replay/lineage state, eligibility effects | Not a durable customer-memory database |
| Candidate draft plane | Foundation | FUTURE, NOT AUTHORIZED | Dedicated review-only candidate drafts from accepted evidence | No approval, reuse, ranking, safety mutation, or runtime connection |
| Existing shared-memory event signal path | Foundation | NOW | Legacy signal handling only | Never overloaded as the C intake |
| SIASIU | SIASIU | NON-PARTICIPANT | None | No source, transport, validator, candidate, review, or shared-contract dependency in C |

The absent transport is a security boundary, not an implementation detail to fill in.
An adapter may only be designed after a new decision identifies its authority,
authentication mechanism, and operating environment.

## 3. State separation

Six states must never be collapsed into one boolean:

| Plane | States | Meaning |
|---|---|---|
| Receipt | `not_seen`, `committed`, `exact_replay`, `collision` | Idempotency only |
| Validation | `not_evaluated`, `rejected`, `accepted_for_eligibility_review` | Evidence contract/policy result only |
| Effective eligibility | `not_evaluated`, `eligible`, `ineligible`, `revoked`, `expired` | Current consent, retention, lineage, and safety eligibility |
| Candidate draft | `not_created`, `candidate`, `review_required`, `blocked`, `superseded` | Foundation-owned review subject only |
| Approval | `not_reviewed`, `reviewed`, `approved_for_reuse`, `rejected` | Existing manual workflow domain; C does not advance into approval |
| Reuse/runtime | `not_available`, `blocked`, `allowed_by_separate_gate` | Existing reuse gate domain; C always ends at `not_available`/`blocked` |

An accepted envelope is not automatically eligible. Eligibility does not imply a
candidate. A candidate is not approved. Approval does not bypass reuse. None of
these states activates runtime behavior.

## 4. Exact input contract: `cosmile.commerce_evidence.v1`

### 4.1 Decode and shape rules

The future service receives an already parsed mapping plus separate opaque ingress
context. This design does not define bytes, HTTP, headers, a broker message, or an
endpoint.

The mapping must contain exactly these top-level keys:

```text
schema_version, evidence_id, evidence_type, source, actor, purchase,
feedback, consent, privacy, lineage
```

Each nested mapping must contain exactly the keys shown in section 4.2. Lists are
not accepted in place of mappings. Booleans are not accepted as integers. Unknown
keys are rejected as `privacy_scope_exceeded`, except raw/PII keys or values, which
win earlier as `raw_text_or_pii_present`. Missing fields use the field-specific code
below. There is no permissive coercion, alias, default, trimming, case-folding, or
implicit version upgrade.

Missing or wrong-type groups have these exact primary outcomes: `source` →
`provenance_untrusted`; `actor` → `invalid_identity_xor`; `purchase` →
`missing_purchase_item_ref`; `feedback` → `invalid_normalization`; `consent` →
`consent_missing`; `privacy` → `privacy_scope_exceeded`; `lineage` →
`lineage_broken`. A missing/non-mapping top-level envelope is
`invalid_normalization`; a missing schema field still wins as
`unsupported_schema_version` when a mapping exists.

UTC timestamps use the producer's exact `Date.toISOString()` representation:
`YYYY-MM-DDTHH:mm:ss.sssZ`, valid Gregorian time, with no offset form. Foundation
parses and round-trips the string. `occurred_at` later than the injected decision
clock is `invalid_normalization`; `captured_at` later than `occurred_at` is
`consent_missing`. No clock-skew allowance is invented in C.

### 4.2 Field-by-field validation matrix

| Field | Type and nullability | Source of truth / exact invariant | Primary failure code |
|---|---|---|---|
| `schema_version` | required string | exactly `cosmile.commerce_evidence.v1` | `unsupported_schema_version` |
| `evidence_id` | required string | `^cevi_v1_[0-9A-HJKMNP-TV-Z]{26}$` | `invalid_normalization` |
| `evidence_type` | required string | one of `purchase_feedback`, `correction`, `retraction` | `invalid_normalization` |
| `source` | required mapping, exact keys | `service`, `environment`, `source_event_id`, `idempotency_key`, `occurred_at` only | field-specific; extra key `privacy_scope_exceeded` |
| `source.service` | required string | exactly `cosmile` | `provenance_untrusted` |
| `source.environment` | required string | exactly `local` or `shadow`; no production alias | `environment_not_allowed` |
| `source.source_event_id` | required string | `^pf_evt_v1_[0-9A-HJKMNP-TV-Z]{26}$` | `provenance_untrusted` |
| `source.idempotency_key` | required string | exact deterministic value in 4.3 and `^cevi_idem_v1_[0-9a-f]{64}$` | `provenance_untrusted` |
| `source.occurred_at` | required UTC string | exact producer form; valid; not after decision clock | `invalid_normalization` |
| `actor` | required mapping, exact keys | `subject_ref`, `anonymous_ref`, `identity_state`, `identity_link_allowed` only | field-specific |
| `actor.subject_ref` | required string | `^subj_v2_[0-9a-f]{32}$`; Foundation `validate_subject_ref`; PII-free; opaque only | `invalid_identity_xor` (PII wins as `raw_text_or_pii_present`) |
| `actor.anonymous_ref` | required literal null | cross-service v1 is identified-only | `invalid_identity_xor` |
| `actor.identity_state` | required string | exactly `identified` and consistent with the actor pair | `invalid_identity_xor` |
| `actor.identity_link_allowed` | required boolean | literal `false` | `identity_link_forbidden` when true; missing/wrong type `invalid_identity_xor` |
| `purchase` | required mapping, exact keys | `purchase_item_ref`, `product_ref`, `sku_ref`, `purchase_state` only | field-specific |
| `purchase.purchase_item_ref` | required string | `^pir_v1_[0-9A-HJKMNP-TV-Z]{26}$`; raw order/line IDs forbidden | `missing_purchase_item_ref` |
| `purchase.product_ref` | required non-empty string | authenticated opaque existing product ref; v1 defines no tighter regex | `missing_product_ref` |
| `purchase.sku_ref` | required key; string or null | opaque existing SKU ref; v1 defines no tighter regex; empty string invalid | `invalid_normalization` |
| `purchase.purchase_state` | required string | exactly `paid` | `invalid_normalization` |
| `feedback` | required mapping, exact keys | four closed fields only | field-specific |
| `feedback.satisfaction` | required key; string or null | `satisfied`, `neutral`, `dissatisfied`, or null | `invalid_normalization` |
| `feedback.adverse_type` | required key; string or null | `skin_reaction`, `other`, `usage_safety`, or null | `invalid_normalization` |
| `feedback.adverse_severity` | required key; string or null | `low`, `moderate`, `severe`, or null; conditional rules in 4.4 | `invalid_normalization` for unknown token; `adverse_fields_inconsistent` for bad combination |
| `feedback.adverse_certainty` | required key; string or null | exactly `reported` iff adverse type is non-null; otherwise null | `invalid_normalization` for unknown token; `adverse_fields_inconsistent` for bad combination |
| `consent` | required mapping, exact keys | `purpose`, `state`, `notice_version`, `captured_at` only | `consent_missing` or field-specific |
| `consent.purpose` | required string | exactly `cross_service_commerce_evidence`; same-service/link consent never substitutes | `privacy_scope_exceeded` on mismatch; absent `consent_missing` |
| `consent.state` | required string | envelope must assert `granted`; verifier must confirm current effective state | explicit `revoked` → `consent_revoked`; `expired` → `consent_expired`; missing/pending/unknown → `consent_missing` |
| `consent.notice_version` | required string | exactly `cosmile.cross_service_commerce_evidence.v1`; no historic/current alias | mismatch `privacy_scope_exceeded`; absent `consent_missing` |
| `consent.captured_at` | required UTC string | exact producer form; not after occurrence; verifier binds it to effective snapshot | `consent_missing` |
| `privacy` | required mapping, exact keys | `raw_text_stored`, `contains_pii`, `retention_class` only | field-specific |
| `privacy.raw_text_stored` | required boolean | literal `false` | `raw_text_or_pii_present` |
| `privacy.contains_pii` | required boolean | literal `false`; claim is also independently scanned | `raw_text_or_pii_present` |
| `privacy.retention_class` | required string | exactly `feedback_non_adverse_90d` or `adverse_regulatory_hold`; must match 4.4 | `privacy_scope_exceeded` |
| `lineage` | required mapping, exact keys | six keys below only | `lineage_broken` or field-specific |
| `lineage.root_evidence_id` | required string | evidence-ID format and root/current-ledger rules in section 9 | `lineage_broken` |
| `lineage.supersedes_evidence_id` | required key; string or null | correction only; current leaf; evidence-ID format | `lineage_broken` |
| `lineage.retracts_evidence_id` | required key; string or null | retraction only; current leaf; evidence-ID format | `lineage_broken` or `evidence_retracted` |
| `lineage.normalizer_version` | required string | exactly `cosmile.closed_feedback_normalizer.v1` | `unsupported_schema_version` |
| `lineage.source_hash` | required string | exact v1 recomputation in 4.3; `^cevi_source_v1_[0-9a-f]{64}$` | `provenance_untrusted` |

`product_ref`, `sku_ref`, and consent freshness cannot be independently looked up
from the envelope. A VERIFIED provenance adapter authenticates the entire envelope
digest, including those refs, but does not prove product-catalog existence; the
producer remains their source of truth. The consent adapter confirms current consent.
Foundation must not invent a product/consent database or treat string shape alone as
source authenticity.

### 4.3 Exact idempotency and v1 source-hash algorithms

The idempotency value must equal:

```text
"cevi_idem_v1_" + lowercase_hex_sha256_utf8(
  "cosmile.commerce_evidence.v1"
  + source.source_event_id
  + evidence_type
  + "cosmile.closed_feedback_normalizer.v1"
)
```

There are deliberately no inserted delimiters; a validator must reproduce the
pinned producer expression byte-for-byte rather than redesign it.

The envelope `lineage.source_hash` is unkeyed integrity evidence, never source
authentication. Direct inspection of `f26fa5c` reveals an important v1 behavior:

1. object keys are recursively sorted; array order is retained;
2. the producer replaces `lineage.source_hash` with JavaScript `undefined` before
   calling its custom serializer;
3. that serializer does not omit an undefined object property; string concatenation
   emits the literal token `undefined` after the key;
4. SHA-256 is computed over that producer-specific string and prefixed
   `cevi_source_v1_`.

Therefore the current v1 byte stream is not RFC JSON at that one sentinel and is not
the ordinary “remove the field and canonicalize JSON” algorithm described by the
source comment. A future Foundation v1 validator must reproduce the pinned behavior
and pin a cross-language golden fixture. Silently omitting the field would reject
real current envelopes; silently accepting both algorithms would create a downgrade.
A clean canonical algorithm requires a reviewed future envelope version, not a v1
reinterpretation.

Even a matching hash proves only that the received fields are internally consistent.
An attacker can recompute an unkeyed hash. Only the verifier in section 6 can return
source authenticity.

### 4.4 Closed feedback and retention invariants

For `purchase_feedback` and `correction`:

| Satisfaction | Adverse type | Severity | Certainty | Structurally valid | Retention class | Candidate slots |
|---|---|---|---|---|---|---|
| non-null | null | null | null | yes | `feedback_non_adverse_90d` | `outcome` |
| null | null | null | null | no | — | none |
| any allowed/null | `skin_reaction` or `other` | low/moderate/severe | `reported` | yes | `adverse_regulatory_hold` | `outcome` if satisfaction + `adverse` |
| any allowed/null | `skin_reaction` or `other` | null | `reported` | no | — | none |
| any allowed/null | `usage_safety` | null | `reported` | yes | `feedback_non_adverse_90d` | `outcome` if satisfaction + `adverse` |
| any | null | non-null | any | no | — | none |
| any | `usage_safety` | non-null | any | no | — | none |
| any | non-null | any | null or non-`reported` | no | — | none |

Closed-token failures use `invalid_normalization`; a combination of individually
valid tokens that violates the table uses `adverse_fields_inconsistent`.

For `retraction`, all four feedback fields must be null. Its producer currently
emits `feedback_non_adverse_90d` because the retraction path normalizes to no adverse
fields. Foundation must not use that retraction value to downgrade an earlier
adverse node's legal class. The lineage ledger retains each node's original class;
root-level legal handling is monotone and conservative.

While `adverse_regulatory_hold` policy is `UNCONFIGURED`, a structurally valid
skin/other adverse envelope stops at the retention-policy gate with
`privacy_scope_exceeded`. It is not accepted and creates no outcome or adverse
candidate. This is the required activation block, not a substituted duration.

### 4.5 Forbidden fields and content

Any presence anywhere of raw text, a raw order/customer/payment/contact identifier,
or a candidate/promotion instruction is rejected. The strict shape already rejects
all extras; the raw/PII scan runs first so its category wins. Examples of forbidden
categories (not an allowlist to evade) include:

- `raw_text`, `query`, `body`, `content`, `transcript`, `answer_text`, `reply`,
  `message`, `note`, `order_raw`, `payment_raw`, or free-form feedback;
- `userId`, `guestId`, `orderId`, `orderItemId`, payment/card/contact/address/name
  fields, email/phone/national-ID/card-like values;
- embeddings, model/provider prompts or outputs, semantic labels beyond the closed
  values, diagnosis/advice/reporting content;
- `memory_candidate`, `MemoryFactCandidate`, candidate status, promotion, rank,
  safety override, identity-link target, or a raw Foundation/user reference;
- any extra top-level or nested field, even if its value is null.

The scan follows the current Foundation default-deny discipline: raw/PII key
categories and recognized PII patterns are checked recursively, while fixed enums
and validated opaque refs are not logged. Runtime rejection never records the
offending field name or value.

## 5. Deterministic fail-closed state machine

### 5.1 Ordered gates

One primary outcome is selected. Except for an exact committed replay, the first
failing gate wins and later gates do not run.

| Order | Gate | Success condition | Failure outcome |
|---:|---|---|---|
| 0 | Kill switch | `commerce_evidence_c_shadow` is enabled at entry | `status=disabled`, static control code `feature_flag_off`; do not parse or persist |
| 1 | Version/environment/base decode | mapping, exact schema, exact normalizer, allowed environment, base scalar types | `unsupported_schema_version`, then `environment_not_allowed`, else `invalid_normalization` |
| 2 | Raw/PII/exact key sets | no raw/PII and no shape expansion | `raw_text_or_pii_present` wins over `privacy_scope_exceeded` |
| 3 | Identity | identified-only XOR, valid opaque subject, link false | `invalid_identity_xor`, then `identity_link_forbidden` |
| 4 | Source/integrity/authenticity | source/IDs/idempotency/hash valid and provenance verdict VERIFIED | `provenance_untrusted` |
| 5 | Consent | exact purpose/notice/times and current effective verdict GRANTED | purpose/notice scope first, then `consent_revoked`, `consent_expired`, `consent_missing` |
| 6 | Purchase refs | opaque purchase-item ref and non-empty authenticated product ref | `missing_purchase_item_ref`, then `missing_product_ref` |
| 7 | Closed normalization | tokens and cross-field table valid | `invalid_normalization`, then `adverse_fields_inconsistent` |
| 8 | Retention/policy | non-adverse unexpired; adverse legal policy configured | `retention_expired` or `privacy_scope_exceeded` |
| 9 | Authenticated replay lookup | unseen identity, or exact committed replay | exact replay returns stored receipt without effects; collision `duplicate_evidence` |
| 10 | Lineage/current state | root/leaf/actor/purchase/product and successor rules hold | `evidence_retracted` wins for tombstone; otherwise `lineage_broken` |
| 11 | Atomic decision/candidate commit | flag still enabled; uniqueness and transaction hold | commit receipt/effects once; any unmapped failure rejects as `cannot_determine` with no partial state |

The flag is checked again inside gate 11. Turning it OFF while a request is in flight
prevents the commit. External verifiers run before the transaction; no network or
provider call is allowed inside the decision transaction.

The replay short circuit occurs only after privacy, identity, authenticity, current
consent, normalization, and retention-policy gates. A later revocation, consent
expiry, evidence expiry, kill switch, or adverse-policy disablement therefore fails
with the current conservative code and never re-applies effects. While those gates
still pass, replay precedes mutable lineage evaluation so a retry of a previously
accepted correction remains a replay rather than becoming `lineage_broken` after its
own first write. It returns the original decision ID/current effective eligibility
and performs no candidate or lineage effect again.

### 5.2 Complete 18-code mapping

| Reserved C code | Exact trigger | Candidate/effect |
|---|---|---|
| `unsupported_schema_version` | missing/wrong schema version or normalizer version | none |
| `environment_not_allowed` | missing/wrong/non-local/non-shadow environment | none |
| `invalid_identity_xor` | missing/invalid subject, non-null anonymous ref, non-identified state, root actor mismatch | none |
| `identity_link_forbidden` | link flag true or a link request | none |
| `consent_missing` | absent/pending/unknown consent, invalid time, unconfigured/unknown effective-consent verifier | none |
| `consent_revoked` | envelope or current effective verifier says revoked | none; existing operational eligibility is revoked at next authoritative check |
| `consent_expired` | envelope or current effective verifier says expired | none; existing operational eligibility is expired at next authoritative check |
| `privacy_scope_exceeded` | extra fields, purpose/notice mismatch, bad retention mapping, or unconfigured adverse legal scope | none |
| `raw_text_or_pii_present` | raw/PII key, value pattern, or either privacy boolean true | none |
| `missing_purchase_item_ref` | absent/empty/bad-format purchase-item ref | none |
| `missing_product_ref` | absent/empty/non-string product ref or verifier cannot bind it | none |
| `duplicate_evidence` | replay identity collision, reused evidence ID/idempotency key, or non-exact duplicate | none; first committed writer remains authoritative |
| `invalid_normalization` | invalid evidence ID/type/time/purchase state/token/type, empty non-retraction feedback | none |
| `adverse_fields_inconsistent` | valid closed tokens in a forbidden cross-field combination | none |
| `lineage_broken` | missing/out-of-order parent, wrong root/current leaf, cross-root ref mismatch, branch/race loser | none |
| `provenance_untrusted` | wrong source, bad source IDs/key/hash, verifier UNCONFIGURED/UNVERIFIED/ERROR | none |
| `evidence_retracted` | root/purchase lineage already tombstoned or target already retracted | none; previous eligibility remains revoked |
| `retention_expired` | non-adverse `occurred_at + 90d` is at/before decision clock | none; previous eligibility is expired |

The response contains at most one of these codes as `primary_reason_code`; its
`reason_codes` array is either empty or that one code. This avoids a field-by-field
oracle. Tests may collect internal assertion details, but runtime/audit may not.

The 18 values live in a dedicated immutable Foundation set. Unknown values,
exceptions, verifier text, database errors, or dynamic strings pass through the
existing safe guard and collapse to `cannot_determine`. `cannot_determine` rejects
and creates nothing; it does not hide or replace any mapped primary C failure.

The additive guard API is exact: `COMMERCE_EVIDENCE_V1_CODES` is a `frozenset` of
the 18 values, and `commerce_evidence_code(value)` returns the value only on set
membership, otherwise the existing literal `cannot_determine`. C code never mutates
or broadens the current `_SAFE_DYNAMIC` set at runtime.

## 6. Provenance, authenticity, and consent verification seams

### 6.1 Authenticity protocol

The future validator depends on this narrow protocol, not on a credential type:

```text
CommerceEvidenceProvenanceVerifier.verify(
  schema_version,
  source_service,
  source_environment,
  source_event_id,
  evidence_id,
  evidence_type,
  idempotency_key,
  declared_source_hash,
  recomputed_source_hash,
  occurred_at,
  opaque_ingress_context
) -> ProvenanceVerdict

ProvenanceVerdict.status =
  VERIFIED | UNVERIFIED | UNCONFIGURED | ERROR
ProvenanceVerdict.bindings = {
  source_identity: bool,
  envelope_digest: bool
}
```

Only `VERIFIED` with both bindings true continues. Because the authenticated digest
covers the strict envelope projection, it binds product/SKU values as source claims
without asserting their independent catalog existence. All other statuses,
exceptions, timeouts, missing bindings, or extra diagnostic text become
`provenance_untrusted`. The verifier's diagnostic is neither returned nor audited.
The default implementation is `UNCONFIGURED`.

`opaque_ingress_context` is adapter-owned and never interpreted, stored, logged, or
echoed by the validator. It is not an envelope field. This interface deliberately
does not select a key, signature, token, certificate, message bus, header, endpoint,
or protocol. That selection remains a security decision.

### 6.2 Current-effective consent protocol

The envelope alone proves neither that its snapshot was the latest append-only row
nor that it was not revoked while queued. It has no consent record ID, expiry, or
revocation sequence. Therefore C must not infer freshness from `state=granted`.

```text
CommerceEvidenceConsentVerifier.verify_effective(
  subject_ref,
  purpose,
  notice_version,
  captured_at,
  occurred_at,
  decision_time,
  opaque_ingress_context
) -> ConsentVerdict

ConsentVerdict.status =
  GRANTED | REVOKED | EXPIRED | MISSING | PENDING | MISMATCH |
  UNKNOWN | UNCONFIGURED | ERROR
```

Only `GRANTED` continues. `REVOKED` and `EXPIRED` map to their exact C codes;
everything except `MISMATCH` maps to `consent_missing`; `MISMATCH` maps to
`privacy_scope_exceeded`. The default is `UNCONFIGURED`.

Foundation does not persist or broker consent. A future adapter may only assert a
verdict from an approved authority. Its query/delivery mechanism is out of scope.
Every future review, approval, and reuse attempt must re-run this effective check;
stored `eligible` is advisory, never an authority. If the verifier is unavailable,
reuse is blocked.

### 6.3 Verifier composition and TOCTOU boundary

Both verifiers use the same opaque context but remain logically separate. Source
authenticity runs first. Consent is never queried for an unauthenticated envelope.
The ledger records only status categories and verification time, not credential,
consent row, subject, or verifier detail in the audit plane.

An external consent authority cannot be transactionally locked with the local
ephemeral ledger in this design. Acceptance is true only as of the recorded verifier
time. Runtime use remains forbidden, and any later manual/reuse transition must
re-verify. A live, immediate revocation propagation guarantee is not proved and is an
activation blocker, not a risk accepted by this design.

## 7. Replay, idempotency, and concurrency

### 7.1 Exact identities and uniqueness

The authoritative replay identity is:

```text
(source.service, source.source_event_id)
```

The deterministic `idempotency_key` is a required integrity projection, not the
sole identity. The logical ledger enforces all of these:

1. unique `(source_service, source_event_id)`;
2. unique `(source_service, evidence_id)`;
3. unique `(source_service, idempotency_key)`;
4. unique `(source_service, target_evidence_id)` across both correction and
   retraction successor types;
5. unique `(source_service, evidence_id, candidate_slot)` where slot is `outcome`
   or `adverse`;
6. one tombstone per `(source_service, root_evidence_id)` and a replay block for the
   same authenticated purchase lineage.

The first committed writer wins. The source-event identity is intentionally narrower
than the hash formula: mutating evidence type or normalizer while reusing a source
event is a collision, not a second event.

### 7.2 Replay outcomes

| Observation inside the atomic ledger operation | Result |
|---|---|
| No primary or secondary identity exists | continue to lineage and commit |
| Primary identity exists, fingerprint matches, and all preceding current gates still pass | `exact_replay`; return original decision ID/lineage pointer and current effective state; no new effects |
| Primary identity exists but fingerprint differs | reject `duplicate_evidence` |
| New primary identity reuses evidence ID or idempotency key | reject `duplicate_evidence` |
| Process failed before commit | no receipt exists; retry evaluates normally |
| Process failed after commit but before response | retry finds receipt and returns it while current consent/retention/flag gates still pass; otherwise current conservative rejection, always zero new effects |

Only committed accepted/control decisions participate in exact replay. A rejected
attempt has a stable decision ID for that evaluation and a minimized category audit,
but it does not reserve an untrusted source identity; a corrected later attempt may
be evaluated afresh.

The immutable fingerprint is `sha256:` plus lowercase SHA-256 over UTF-8 Python
`json.dumps` of the exact validated envelope projection and the two verifier status
categories, using `sort_keys=True`, `separators=(",", ":")`, and
`ensure_ascii=True`. It is not returned and is not treated as authentication.

### 7.3 Transaction boundary

Pure decoding, static validation, and verifier calls occur before the transaction.
One ledger transaction then:

1. rechecks the kill switch;
2. checks primary and secondary replay uniqueness;
3. loads and locks root/current-leaf/tombstone logical state;
4. rechecks lineage and retention against the same injected clock;
5. adopts the evaluation's Foundation decision ID and allocates/reuses one opaque
   lineage pointer;
6. appends the evidence decision node;
7. appends candidate draft slots or lifecycle revocation/supersession effects;
8. appends a minimized audit event;
9. commits all or none.

No verifier, network, provider, file, environment lookup, or existing memory store is
called inside the transaction. An exception rolls back every item. No response says
accepted or created until commit succeeds.

The proposed reference driver uses one `threading.RLock` around this operation and is
valid only for one-process local/ephemeral shadow tests. It does not claim
cross-process or restart durability. A durable/multi-process backend requires a new
approved storage design with equivalent unique constraints and transaction semantics.

### 7.4 Required race outcomes

| Concurrent inputs | Winning transaction | Losing transaction |
|---|---|---|
| two exact copies | creates receipt/candidate slots once | exact replay, same IDs, zero effects |
| same source event, mutated body | first writer wins | `duplicate_evidence` |
| two corrections of one leaf | first becomes sole successor/current leaf | `lineage_broken` |
| correction versus retraction of one leaf | correction first: new leaf | old-target retraction `lineage_broken`; it must target the new leaf on a new valid event |
| correction versus retraction of one leaf | retraction first: root tombstone | correction `evidence_retracted` |
| two retractions | first tombstones/deactivates | exact same event replay or distinct event `evidence_retracted` |
| candidate creation retries | unique evidence/slot row once | exact receipt, no second candidate |
| kill switch turns OFF before commit | none | every in-flight commit returns disabled/cannot-determine safely, no state |

## 8. Consent and identity contracts

### 8.1 Purpose/version/state matrix

| Observed consent assertion | Current verifier | C result |
|---|---|---|
| exact cross-service purpose + exact v1 notice + granted | GRANTED | continue |
| `same_service_purchase_feedback` grant | any | `privacy_scope_exceeded` |
| `identity_linking` grant | any | `privacy_scope_exceeded`; it is never consumed |
| missing consent block/required value | any | `consent_missing` |
| exact purpose, wrong/unknown notice | any | `privacy_scope_exceeded` |
| state revoked | any | `consent_revoked` |
| state expired | any | `consent_expired` |
| state pending/unknown | any | `consent_missing` |
| asserted granted | REVOKED | `consent_revoked` |
| asserted granted | EXPIRED | `consent_expired` |
| asserted granted | MISMATCH | `privacy_scope_exceeded` |
| asserted granted | missing/pending/unknown/unconfigured/error | `consent_missing` |

The current producer copies the actual historic grant's notice/capture values. C v1
accepts only the reviewed exact notice string. A historic or future notice therefore
fails closed rather than being treated as an alias. Supporting it requires a reviewed
version policy, not string-prefix matching.

### 8.2 Identity matrix

| Subject | Anonymous | State | Link allowed | Result |
|---|---|---|---|---|
| valid `subj_v2_` | null | identified | false | continue |
| absent/invalid | null | identified | false | `invalid_identity_xor` |
| any | non-null guest ref | any | false | `invalid_identity_xor` (guest C exception remains unapproved) |
| valid subject | null | anonymous/unknown | false | `invalid_identity_xor` |
| otherwise valid | null | identified | true | `identity_link_forbidden` |

Foundation validates the service-minted opaque subject format and PII freedom. It
does not mint, link, resolve, re-key, or map it to a real user. A root's subject is
immutable; a correction/retraction subject mismatch is rejected. No later login or
identity-link consent retroactively changes an accepted lineage.

## 9. Lineage, correction, retraction, erasure, and retention

### 9.1 Lineage rules

| Evidence type | Root | Supersedes | Retracts | Required ledger state |
|---|---|---|---|---|
| `purchase_feedback` | equals own evidence ID | null | null | no existing/tombstoned lineage for the authenticated purchase item |
| `correction` | existing root | exact current leaf | null | root exists, not tombstoned; actor/purchase/product match; target has no successor |
| `retraction` | existing root | null | exact current leaf | root exists, not tombstoned; actor/purchase/product match; target has no successor |

Parent/root arrival is required before correction/retraction. Foundation does not
buffer an orphan or guess by arrival time. Out-of-order evidence is
`lineage_broken`; a future sender may retry only after the parent has a committed
receipt. Arrival time never selects a winner; the locked current-leaf relation does.

Root and every descendant keep immutable actor, purchase-item, and product refs.
`sku_ref` may change only if the authenticated producer record and a future reviewed
contract explicitly permit it; v1 C therefore requires it to match the root when
both are non-null and otherwise rejects `lineage_broken`. This prevents a correction
from moving feedback to another tenant or product.

### 9.2 Candidate effects

- A correction atomically marks every draft created from its direct predecessor
  `superseded`/non-reusable and creates only the slots present in the corrected
  node. It never mutates the predecessor's structured fields.
- A retraction creates no candidate. It atomically tombstones the root, marks all
  root-lineage effective eligibility `revoked`, and transitions unapproved drafts to
  `blocked` and any separately approved reusable state to `deprecated` before reuse.
  In C shadow, no reusable state can exist.
- A retracted or expired candidate is excluded by query, review, audit display, and
  reuse projection; it must not reappear through an exact replay.
- A new root using a tombstoned authenticated purchase item is
  `evidence_retracted`, matching the current producer's no-new-root behavior.

### 9.3 Retention

| Data class | Logical maximum / state | Eligibility effect | Physical behavior in bounded shadow |
|---|---|---|---|
| non-adverse evidence/candidate content | `occurred_at + 90d` | expired at boundary; `retention_expired`; no review/reuse | in-memory and may disappear earlier on restart |
| minimal decision/replay/tombstone audit metadata | `occurred_at + 180d` | replay protection only; never candidate content | in-memory reference driver may disappear earlier |
| adverse skin/other | `adverse_regulatory_hold`, duration unconfigured | intake rejected while unconfigured | no adverse content stored |
| usage-safety structured evidence | non-adverse 90d class per pinned producer | adverse draft review-only; no generated guidance | in-memory only |

Retention is per immutable node. A correction does not shorten an older adverse
node's legal class, and a retraction's current non-adverse class does not downgrade
its root. No “max of labels” is used to infer a legal duration; the unresolved
adverse record remains blocked.

### 9.4 Retraction is not a complete erasure protocol

V1 has a retraction evidence type but no separately authenticated erasure command,
data-subject request, legal-basis result, or deletion receipt. C must not claim that
retraction completes legal erasure. It removes evidence and candidates from
eligibility. Any future physical erasure workflow must be separately designed and
approved, preserve only legally required minimized metadata, and never restore
eligibility.

The current producer also has no delivery path and its consent-revocation function
does not itself deliver a C revocation event. Consequently immediate cross-system
revocation/erasure propagation is not proved. Candidate runtime and delivery remain
blocked; effective consent is rechecked at every allowed future transition.

## 10. Envelope-to-Foundation candidate design

### 10.1 Dedicated future candidate types

Current `MemoryCandidate` cannot faithfully represent this contract: it requires a
service-local `furef_v2` that the approved envelope intentionally omits, and its
retention enum cannot represent an unconfigured adverse hold. C must not fabricate a
furef, derive one from `subject_ref`, or silently coerce retention.

The minimal additive design therefore uses two Foundation-owned, review-only types
inside the dedicated C package:

`CommerceOutcomeCandidateV1` is the future named Foundation fact-candidate form for
the satisfaction axis; `CommerceAdverseCandidateV1` is the future named adverse-
candidate form. Neither name denotes, subclasses, or writes the current
`MemoryCandidate` at the pinned head.

```text
CommerceOutcomeCandidateV1
  candidate_id                 Foundation-internal opaque ID
  decision_id                  Foundation decision reference
  lineage_pointer              Foundation opaque lineage reference
  subject_ref                  validated opaque subject
  source_service               "cosmile"
  product_ref                  authenticated opaque product ref
  sku_ref                      authenticated opaque SKU ref or null
  satisfaction                 satisfied | neutral | dissatisfied
  evidence_ref                 Foundation-internal evidence reference
  content_hash                 hash of normalized candidate projection
  consent_scope                "cross_service"
  retention_expires_at         occurred_at + 90d
  memory_kind                  "outcome_feedback"
  sensitivity_level            "normal"
  status                       "review_required"
  raw_text_stored              false
  applied_to_real_user         false
  write_live                   false

CommerceAdverseCandidateV1
  [same identity/audit/minimization fields]
  adverse_type                 skin_reaction | other | usage_safety
  adverse_severity             low | moderate | severe | null
  adverse_certainty            "reported"
  memory_kind                  reaction (skin/other) | safety_note (usage_safety)
  sensitivity_level            "high"
  safety_handling              "human_safety_review_required"
  response_policy              "preapproved_static_guidance_only"
  status                       "review_required"
```

No raw copy, natural-language claim, diagnosis, advice, report payload, rank, score,
embedding, reusable flag, or user/customer ID exists in either type. Candidate IDs,
content hashes, evidence refs, and lineage pointers are internal and are not returned
to the producer.

Foundation allocates opaque identifiers on the first committed writer with Python
`uuid.uuid4().hex` and these exact patterns:

```text
decision_id      ^fcei_dec_v1_[0-9a-f]{32}$
lineage_pointer  ^fcei_lin_v1_[0-9a-f]{32}$   (one per root)
candidate_id     ^fcei_cand_v1_[0-9a-f]{32}$
evidence_ref     ^fcei_ref_v1_[0-9a-f]{32}$
```

They are stored, never recomputed from producer identifiers, and exact replay returns
the stored decision/lineage IDs. Candidate IDs and evidence refs remain internal.

Candidate `content_hash` is `sha256:` plus lowercase SHA-256 over UTF-8 Python
`json.dumps` with `sort_keys=True`, `separators=(",", ":")`, and
`ensure_ascii=True` for this fixed projection: `contract_version`, `memory_kind`,
`product_ref`, `sku_ref`, `satisfaction`, `adverse_type`, `adverse_severity`, and
`adverse_certainty`. Absent-axis values are explicit JSON null. Subject, purchase,
decision, lineage, and candidate IDs are excluded so this hash is content integrity,
not identity or authentication.

All drafts enter `candidate` and deterministically transition to `review_required`
in the same atomic commit. That transition is not approval. C exposes no method to
mark reviewed or approved and imports no runtime/reuse writer.

### 10.2 Candidate-slot mapping

| Accepted current node | Outcome slot | Adverse slot | Initial handling |
|---|---|---|---|
| satisfaction only | one `outcome_feedback` draft | none | manual review; no reuse |
| satisfaction + skin/other | blocked while adverse legal policy unconfigured | blocked | no envelope acceptance, no draft |
| skin/other only | none | blocked while adverse legal policy unconfigured | no envelope acceptance, no draft |
| satisfaction + usage_safety | one outcome draft | one `safety_note` draft | both review required; adverse cannot be masked |
| usage_safety only | none | one `safety_note` draft | human safety review required |
| correction | slots from corrected node only | slots from corrected node only | predecessor drafts superseded atomically |
| retraction | none | none | entire lineage eligibility revoked |

Two slots from one accepted node are intentional: the Founder fixed satisfaction and
adverse as independent axes. The adverse slot is evaluated first for retention and
safety; its presence can block the entire envelope, while satisfaction can never
remove or lower it.

### 10.3 Mapping to the current 17-field `MemoryCandidate`

| Current field | C projection | Status |
|---|---|---|
| `subject_ref` | actor subject | exact mapping |
| `source_service` | `cosmile` | exact mapping |
| `furef_v2` | no envelope source | **no mapping; never synthesize** |
| `memory_candidate_id` | internal candidate ID | compatible |
| `memory_kind` | `outcome_feedback`, `reaction`, or `safety_note` | compatible |
| `sensitivity_level` | normal outcome; high adverse | compatible, conservative |
| `consent_scope` | cross_service after current verifier | compatible |
| `retention_policy` | 90d/adverse hold | lossy; current enum has no exact duration/hold |
| `raw_text_stored` | false | exact mapping |
| `content_hash` | normalized projection hash | exact mapping |
| `evidence_refs` | one Foundation-internal evidence ref | compatible |
| `created_from` | `feedback` | exact mapping |
| `write_intent` | `candidate_only` | exact mapping |
| `gate_decision` | policy projection only; never `allow_shadow_write` as a write instruction | compatible for review, not materialization |
| `read_scope` | `foundation_only` | compatible |
| `applied_to_real_user` | false | exact invariant |
| `write_live` | false | exact invariant |

Because two required semantics are not exact, direct current `MemoryCandidate`
materialization is blocked. The new candidate DTOs may be projected into the current
`gate_decision` function for raw/PII, isolation, consent, and high-sensitivity policy
checks, but the result is eligibility evidence only. C must never call
`SharedMemoryStore.ingest`, `write_approved_memory`, learning approval, or reuse.

For a high-sensitivity adverse DTO, the current gate's conservative `block` prevents
shared-memory materialization/reuse; it does not erase the separate Foundation-owned
human-review draft. That draft is not memory and cannot affect a user. Conversely,
an outcome projection's `allow_shadow_write` is interpreted only as a policy check;
C still performs no shared-memory write.

Any later bridge to the current contract needs a reviewed additive decision about
furef absence and retention representation and is part of the already-open candidate
runtime gate.

### 10.4 Safety and approval workflow

- Outcome and adverse drafts have evidence contribution zero for truth/safety
  upgrading, consistent with current Foundation customer-memory policy.
- Every adverse draft is high sensitivity, human-review-required, and cannot be
  approved by C. Severity may raise operational review priority in a later approved
  policy, but this design invents no SLA or diagnosis.
- `severe` is preserved. `usage_safety` remains adverse despite null severity.
  Satisfaction never changes either fact.
- The only permitted response-policy marker is
  `preapproved_static_guidance_only`; C generates and returns no guidance text.
- Existing `candidate → review_required → reviewed → approved_for_reuse` semantics
  remain separate. Any review correction is performed by the Designer on a new
  Advisor handoff; runtime candidate review is not this design review.
- Automatic promotion, learned/canonical write, reuse, ranking, personalization,
  safety override, and external reporting are structurally absent.

## 11. Response, audit, and observability contracts

### 11.1 Data-contract response

This is a return object from a future in-process method, not a transport schema.

```text
CommerceEvidenceDecisionV1
  contract_version: "foundation.commerce_evidence_decision.v1"
  status: disabled | rejected | accepted_for_eligibility_review | exact_replay
  decision_id: Foundation opaque ID or null only when disabled before parsing
  primary_reason_code: one safe code or null
  reason_codes: [] or [primary_reason_code]
  lineage_pointer: Foundation opaque pointer or null
  effective_eligibility: not_evaluated | eligible | ineligible | revoked | expired
  candidate_outcome:
    created_count: 0 | 1 | 2
    state: not_created | review_required | blocked | superseded
  replayed: boolean
  applied_to_real_user: false
  write_live: false
  promotion_performed: false
```

Only Foundation-issued `decision_id` and `lineage_pointer` may be returned. The
response never echoes subject, anonymous, evidence, source-event, idempotency,
purchase-item, product, SKU, consent, hash, candidate, credential, payload, or raw
identifier values. A rejected response does not disclose which field or value was
wrong beyond its category code.

`accepted_for_eligibility_review` never says stored as memory, approved, reusable,
or applied. When the accepted event is a retraction, `created_count=0` and effective
eligibility is `revoked`.

After the flag and base mapping-type check, every evaluation receives one decision
ID that is stable for that response and its category audit. A committed exact replay
returns the first writer's stored decision ID. Pre-commit rejection IDs are not
derived from, or reserved against, untrusted producer identifiers. A disabled call
returns null and does not inspect the envelope.

### 11.2 Minimized decision audit

Allowed audit fields only:

```text
decision_id, audit_time, contract_version, schema_version, source_service,
environment, evidence_type, status, primary_reason_code,
provenance_verdict_category, consent_verdict_category, retention_class,
lineage_action_category, candidate_kind_categories, candidate_created_count,
effective_eligibility, feature_flag_state,
applied_to_real_user=false, write_live=false, promotion_performed=false
```

Forbidden audit fields include the full envelope, any source/purchase/actor/product/
consent/hash/credential identifier, offending field name/value, verifier diagnostic,
candidate ID, natural-language note, and exception string/stack containing input.
Unexpected exceptions record only `cannot_determine` plus code location/version.

Accepted/control audit append is part of the ledger transaction. A pre-commit
rejection writes only the allowlisted category record to the volatile audit sink.
If that minimized rejection-audit append fails, the request remains rejected with
its already selected safe code; audit failure can never turn it into acceptance and
no exception text is returned.

Non-adverse decision/replay metadata has the non-production 180-day logical maximum
from `occurred_at`; the in-memory driver may discard it earlier. Rejected adverse
requests store only the category audit above, never adverse evidence content. No
adverse hold duration is inferred for audit content.

### 11.3 Metrics

Permitted low-cardinality counters/gauges:

- `commerce_evidence_decision_total{status,primary_reason_code,schema_version,environment}`;
- `commerce_evidence_verifier_total{verifier,verdict_category}`;
- `commerce_evidence_candidate_total{kind,state}`;
- `commerce_evidence_lineage_total{action,outcome_category}`;
- `commerce_evidence_invariant{applied,write_live,promotion}` with every value zero;
- `commerce_evidence_flag_enabled` with no actor/tenant label.

No metric label contains any identifier, hash, product, subject, candidate, consent
row, or exception. Thresholds and alert destinations are operational policy outside
C; zero-write/promotion invariants are hard review failures.

## 12. Future Foundation module and storage plan — all NOT AUTHORIZED

### 12.1 Minimal additive paths

| Proposed path | Responsibility | Dependencies / prohibited coupling |
|---|---|---|
| `foundation/shared_memory/commerce_evidence/__init__.py` | no-side-effect exports for contracts and pure service | no runtime import |
| `foundation/shared_memory/commerce_evidence/contract.py` | exact envelope/decision/candidate enums, strict key sets, regexes | imports no API/network/provider |
| `foundation/shared_memory/commerce_evidence/reason_codes.py` | immutable 18-code set and guarded lookup | unknown → existing `cannot_determine` |
| `foundation/shared_memory/commerce_evidence/hash_v1.py` | exact producer idempotency and JS-undefined source-hash compatibility | no alternate-v1 acceptance |
| `foundation/shared_memory/commerce_evidence/validator.py` | ordered gates 1–8; pure injected clock/verifiers | reuses `subject_identity.validate_subject_ref` and raw/PII discipline |
| `foundation/shared_memory/commerce_evidence/verifiers.py` | protocols, verdict enums, UNCONFIGURED defaults | no credentials, env reads, network, or consent store |
| `foundation/shared_memory/commerce_evidence/ledger.py` | protocol + locked ephemeral reference ledger; gates 9–11 | no file/DB, no `SharedMemoryStore` |
| `foundation/shared_memory/commerce_evidence/lineage.py` | root/leaf/tombstone/successor rules and lifecycle effects | append-only only |
| `foundation/shared_memory/commerce_evidence/candidates.py` | two dedicated DTOs, slot mapping, current-gate policy projection | no learning/reuse/store writes |
| `foundation/shared_memory/commerce_evidence/service.py` | flag-first in-process orchestration and minimized response | no endpoint, consumer, sender, or legacy signal call |
| `foundation/shared_memory/commerce_evidence/audit.py` | safe audit projection and low-cardinality metrics records | no payload/identifier fields |
| `foundation/shared_memory/reason_codes.py` | additive guarded delegation to the dedicated C set | preserve all current dynamic codes |
| `foundation/feature_flags.py` | add `commerce_evidence_c_shadow=False`; hard-off live/intake/candidate-runtime names | default OFF; no environment activation |
| `foundation/shared_memory/tests/test_commerce_evidence_*.py` | all test categories in section 13 | synthetic only |
| `foundation/shared_memory/tests/fixtures/commerce_evidence_v1_golden.json` | reviewed synthetic cross-language hash fixture | no real identifier/PII/secret |

No modification to `foundation/shared_memory/api.py` is proposed for the bounded
shadow code. In particular, `ingest_event_signal` is not overloaded because it:

- accepts a different legacy signal contract;
- asserts `memory_candidate=false` and `interprets_customer=false`;
- has no consent, lineage, authenticity, or candidate-slot semantics;
- would collapse evidence acceptance and signal receipt and risk regressions for
  both Cosmile and SIASIU paths.

The future service is imported only by its dedicated tests until a separate intake
approval. Existing Foundation behavior and flags remain byte-for-byte fallback when
the new flag is OFF.

### 12.2 Schema/migration decision

No product schema or migration is strictly required for the bounded one-process
ephemeral shadow reference implementation, and Foundation currently has no C storage
backend or migration framework. Therefore this design proposes **no product table,
migration, database file, or real target DB**.

The logical uniqueness/transaction contract in section 7 is nevertheless mandatory.
A later multi-process or durable intake would require a new storage decision and an
additive migration design with, at minimum, receipt, lineage/successor, tombstone,
candidate-slot, and minimized-audit records plus the six uniqueness constraints.
That later design must specify backend, forward/down rehearsal, empty-table and
compatibility gates, deletion/retention behavior, and rollback before any code.

For future test conformance only, an authorized Worker may use Python's in-memory
SQLite connection (`:memory:`) to model the logical unique constraints and rollback;
it must create no file and is not a product adapter. Backend-specific SQL cannot be
copied from that fixture into runtime without a new review.

## 13. Future test and verification design — run none in this mission

### 13.1 Test-first matrix

| Test group / future file | First failing oracle at old head | New passing oracle | Safety assertion |
|---|---|---|---|
| contract/key-set unit tests | C module absent | every field/nullability row in 4.2 covered, extra/missing deterministic | no coercion/alias |
| version/reason tests | 18 codes absent from Foundation guard | exact 18 accepted; unknown/exception → `cannot_determine` | no dynamic leak |
| hash/idempotency golden tests | no C hash implementation | Python matches pinned Cosmile v1 fixture including `undefined` sentinel | no alternate hash accepted |
| property/invariant tests | no C validator | generated closed combinations match 4.4; satisfaction changes never lower adverse output | adverse-first |
| malicious-input tests | no C path | raw keys, PII patterns, extras, nested/list/type abuse reject at ordered gate | response/audit contains no offending token |
| provenance tests | no verifier seam | default/unverified/error reject; only fully bound VERIFIED continues | source hash alone never authenticates |
| consent tests | envelope assertion previously sufficient nowhere | purpose/notice/current-state matrix exact; unconfigured rejects | login/subject never consent |
| identity tests | no C path | subject format, guest rejection, link false, root actor immutability | no mint/re-key/link call |
| lineage tests | no C path | root/correction/retraction/out-of-order/tombstone rules exact | no overwrite/resurrection |
| concurrency tests | no ledger | barriers force every race in 7.4; one receipt/successor/slot | first writer/all-or-none |
| retention tests | no C path | injected clock checks 90d boundary, 180d metadata, adverse unconfigured block | no adverse duration invented |
| candidate mapping tests | no C candidate DTO | 0/1/2 slots exact; correction supersedes; retraction blocks | no current store/reuse call |
| adverse safety tests | no C mapping | severe preserved, usage safety adverse, all adverse review-required | no generated text/diagnosis/report |
| response/audit tests | no C response | only allowed keys/codes; identifier values absent from serialization | no oracle/PII echo |
| containment/static tests | no C files | no network/endpoint/consumer/provider/env/DB tokens; legacy API does not import C | producer containment intact |
| legacy regression | existing behavior | current shared-memory and subject-ref tests unchanged | `ingest_event_signal` semantics unchanged |
| in-memory integration shadow | no service | synthetic envelope → deterministic decision with UNCONFIGURED defaults and fake VERIFIED adapters | applied/write/promotion false |
| ephemeral relational conformance | no C logical fixture | `:memory:` uniqueness, transaction rollback, correction/retraction races | no file/real DB |
| rollback/kill switch | no flag | OFF before/inside commit yields zero state; restart clears reference store | queued producer rows untouched |

Every one of the 18 C codes needs at least one positive trigger test and one adjacent
case that must not trigger it. Every envelope field needs accepted-null/accepted-
value/rejected-shape coverage as applicable. A generated coverage manifest must show
no blank mapping cell before review.

### 13.2 Exact future harness categories

Safe future commands, after a new implementation authorization, are limited to:

```text
python3 -m unittest discover -s foundation/shared_memory/tests \
  -p 'test_commerce_evidence_*.py'

python3 foundation/shared_memory/tests/test_shared_memory_v0.py
python3 foundation/shared_memory/tests/test_subject_ref_v2_hard_gate.py
```

Static checks must use repository-local search to prove:

- zero C imports from existing runtime/API/Cosmile/SIASIU modules;
- zero endpoint, socket, request, broker, consumer, sender, flush, provider, or
  credential implementation in C files;
- zero `SharedMemoryStore.ingest`, learning approval, reuse, ranking, safety mutation,
  database-file, or environment mutation calls;
- exact 18-code set equality with the pinned producer constant;
- every output stamps applied/write/promotion false.

No command is run in this Designer mission. Build, database rehearsal, external
provider, network, secret, environment mutation, and real-data tests remain zero.

### 13.3 Review evidence gates

An implementation review could pass only with all of:

1. old-head fail/new-head pass evidence for every new test group;
2. current Foundation regression tests unchanged and passing;
3. field/reason/traceability manifests complete with no blank cells;
4. deterministic 100-run replay and thread-race results with one commit/slot;
5. no raw/PII/identifier in response, audit, metrics, exceptions, or fixtures;
6. default and production flags OFF; no runtime import or endpoint;
7. provenance and consent defaults demonstrably reject everything;
8. adverse hold default demonstrably rejects skin/other evidence;
9. `applied_to_real_user`, `write_live`, and `promotion_performed` always false;
10. no product migration, DB file, network, secret, transport, delivery, or candidate
    runtime connection.

## 14. Activation, rollback, and kill switch

### 14.1 Stages

```text
this Designer result
-> independent C design review
-> HARD STOP -> Leo/GPT
-> [only if newly authorized] pure contracts/reasons/hash with flag OFF
-> unit/property/malicious tests with UNCONFIGURED verifiers
-> locked in-memory shadow with synthetic fixtures only
-> ephemeral relational conformance (test-only, :memory:)
-> independent implementation review
-> HARD STOP -> Leo/GPT
-> authenticity/consent/storage/delivery decisions (separate)
-> any intake/candidate runtime step (separate new approvals)
```

No stage automatically unlocks the next one.

### 14.2 Kill-switch behavior

- `commerce_evidence_c_shadow` defaults false in source and has no environment
  auto-enable path.
- OFF is checked before payload parsing and again immediately before commit.
- OFF returns a fixed disabled result and writes no receipt, lineage, candidate,
  audit content, or metric other than an optional aggregate flag gauge.
- Verifier UNCONFIGURED/ERROR and adverse policy UNCONFIGURED are independent kill
  conditions even if the code flag is ON.
- A separate hard-off name must guard any future live intake and candidate runtime;
  this design never turns it on.

### 14.3 Rollback

Rollback is flag OFF plus removal of the unimported additive C package in a reviewed
forward change. The reference ledger is volatile; restart clears it. Existing
shared-memory/event-signal behavior remains the fallback. Cosmile outbox rows remain
pending/blocked in Cosmile and are not drained, marked sent, or deleted.

No queued row may be replayed into a later intake until the exact idempotency/hash
compatibility fixture and durable uniqueness behavior are independently proved.
There is no destructive down migration because this bounded design creates no
product schema. Any future durable schema requires its own forward/down plan.

## 15. Threat model

| Threat | Preventive/detective design | Residual/blocker |
|---|---|---|
| forged source | exact source/key/hash + VERIFIED adapter | credential/protocol unresolved; default rejects |
| hash substitution/recomputation | byte-exact recompute plus authenticated binding | unkeyed hash alone is never trusted |
| version/hash downgrade | exact schema/normalizer/hash algorithm; no dual-v1 path | new version needs review |
| consent laundering from login/subject | separate current-effective consent verifier | current envelope alone lacks freshness |
| stale/revoked consent while queued | verifier at intake and every later transition | immediate propagation/runtime remains blocked |
| notice/purpose confusion | exact purpose and notice; no alias/prefix | historic notices reject |
| identity confusion/guest escalation | identified-only XOR, opaque format, link false | guest exception requires Founder decision |
| cross-tenant correction | root actor/purchase/product immutability under lock | no re-key |
| raw/PII smuggling | strict key sets, recursive scan, no echo/log | product/sku are opaque and verifier-bound |
| replay/double candidate | primary + secondary unique identities and candidate slots | multi-process durability needs new backend |
| lineage branch/race | one unified successor key, locked current leaf, first writer | out-of-order rejected, not buffered |
| retraction evasion/new root | root/purchase tombstone and monotone eligibility | no complete erasure transport in v1 |
| retention downgrade | per-node retention; retraction cannot lower adverse root | adverse law unresolved and intake blocked |
| adverse suppression by satisfaction | adverse-first gate, two independent slots, whole-envelope legal block | no generated safety response |
| automatic learning/ranking/safety mutation | dedicated DTO, no store/approval/reuse imports, flags hard OFF | candidate runtime requires new approval |
| reason-code oracle/leak | first-failure single category, guarded set, unknown collapse | aggregate metrics only |
| parser/shape poisoning | exact fixed-depth mappings and scalar types | ingress byte-size policy belongs to future transport |
| denial by duplicate/collision | cheap structural/auth gates, bounded fixed shape, unique lookup | rate limits belong to future transport |
| audit poisoning | allowlisted categories only; no diagnostics/payload | durable audit backend not selected |

## 16. Traceability

| Founder / Control requirement | Design requirement | Proposed module | Future test | Independent review criterion |
|---|---|---|---|---|
| D2-A, Cosmile owns normalization | exact v1 closed table; no reinterpretation | `contract.py`, `validator.py` | contract/property | every field has one outcome |
| Foundation validates only | state separation and accepted-for-review result | `service.py` | integration/response | acceptance is not candidate/runtime |
| Foundation-only candidates | dedicated internal candidate DTOs after acceptance | `candidates.py`, `ledger.py` | mapping/concurrency | zero Cosmile/current-store writer |
| separate consent; userId != consent | exact purpose/notice + current verifier | `verifiers.py`, `validator.py` | consent matrix | no login/subject inference |
| identity linking OFF | identified-only, link false, no mint/re-key | `validator.py` | identity/root isolation | guest/link always reject |
| append-only correction/retraction | single successor, tombstone, monotone effects | `lineage.py`, `ledger.py` | lineage/races | no overwrite/branch/resurrection |
| satisfaction cannot lower adverse | adverse-first gate and independent slots | `validator.py`, `candidates.py` | property/adverse | severity/handling invariant |
| no raw/provider | strict shape/scan; no provider dependencies | `validator.py`, static | malicious/static | zero content/PII/LLM path |
| source hash is not authentication | exact hash plus separate VERIFIED adapter | `hash_v1.py`, `verifiers.py` | golden/provenance | default accepts zero |
| 18 stable category codes | dedicated guarded immutable set | C `reason_codes.py` + guarded delegation | reason set/leak | exact set, unknown safe |
| replay/idempotency | six uniqueness rules, first writer, atomic slots | `ledger.py` | thread/ephemeral relational | no double decision/candidate |
| adverse legal duration open | unconfigured policy rejects entire envelope | `validator.py` | retention/adverse | no duration or candidate invented |
| no automatic promotion/reuse/ranking/safety mutation | review-only DTO and structural no-import rule | `candidates.py`, static | candidate/containment | every runtime invariant false |
| do not overload signal API | separate package/service; no API modification | package boundary | legacy regression/static | `ingest_event_signal` unchanged |
| default OFF/rollback | two flag checks, volatile store, no consumer | `feature_flags.py`, `service.py` | kill/rollback | OFF leaves existing behavior unchanged |
| no identifiers in result/audit | Foundation IDs only in response; audit allowlist | `audit.py`, `service.py` | serialization/malicious | no producer value appears |

## 17. Ordered future WorkUnits — every row NOT_AUTHORIZED

| Order | WorkUnit / actor routed by Advisor | Allowed Foundation paths | Dependency | Stop condition | Rollback/evidence |
|---:|---|---|---|---|---|
| 1 | `C-CONTRACT-FREEZE` / Foundation Worker | C `contract.py`, `reason_codes.py`, `hash_v1.py`, synthetic fixture/tests | new Leo/GPT implementation approval | any v1 source ambiguity or reason mismatch | remove unimported files; exact field/code/hash manifest |
| 2 | `C-VERIFIER-VALIDATOR` / Foundation Worker | C `verifiers.py`, `validator.py`, tests | WU1 reviewed | credential/protocol must be invented; default accepts any input | flag OFF; gate-order and default-reject evidence |
| 3 | `C-EPHEMERAL-LEDGER` / Foundation Worker | C `ledger.py`, `lineage.py`, tests only | WU1–2 reviewed | cross-process/durable behavior requested | remove volatile driver; race/rollback evidence |
| 4 | `C-CANDIDATE-DRAFTS` / Foundation Worker | C `candidates.py`, mapping tests | WU1–3 reviewed | furef fabricated, current memory store/reuse needed, adverse legal policy absent | no candidate import; slot/lifecycle evidence |
| 5 | `C-SHADOW-SERVICE` / Foundation Worker | C `service.py`, `audit.py`; additive guarded reason/flag lines | WU1–4 reviewed | endpoint/consumer/env/network/DB requested | flag OFF; response/audit/static evidence |
| 6 | `C-VERIFICATION` / Foundation Worker | dedicated tests and synthetic fixtures only | WU1–5 | real data/DB/network/secret/provider needed | no product state; full evidence bundle |
| 7 | `C-INDEPENDENT-IMPLEMENTATION-REVIEW` / independent Foundation Reviewer | read-only plus declared review result storage | WU1–6 evidence | any unproved objective gate | verdict to Advisor; no patch by Reviewer |
| 8 | `C-DELIVERY-INTAKE-CANDIDATE-RUNTIME` / none | none | new Founder/security/legal/storage decisions | always STOP under current mission | no action |

If independent design or implementation review requires correction, the Reviewer
returns specific findings to the Advisor. The Advisor routes a bounded patch back to
the Designer (design artifact) or Foundation Worker (future code); the same
independent Reviewer re-reviews the patched exact head. No actor self-reviews or
sends work directly to another subordinate.

## 18. Honest limitations and required decisions

### 18.1 Fully specified and reviewable now

- exact v1 fields, strict shape, nullability, formats, conditional invariants, and
  forbidden categories;
- deterministic gate order and all 18 mapped first-failure reason codes;
- byte-exact current idempotency and source-hash behavior;
- verifier protocols and default-zero acceptance;
- one-process replay/lineage/candidate transaction and race outcomes;
- purpose-specific consent and identified-only identity behavior;
- correction/retraction/tombstone and non-adverse logical retention;
- two Foundation-owned candidate draft types, mapping, and no-runtime lifecycle;
- response/audit/metrics minimization;
- module boundaries, test plan, flags, rollback, threats, traceability, and future
  WorkUnit stops.

### 18.2 Blockers, not downgraded risks

1. **Authenticity:** no credential, attestation, ingress adapter, or authority is
   selected. The default verifier rejects every envelope.
2. **Consent freshness/revocation:** the v1 envelope cannot alone prove latest state.
   No current cross-system revocation/erasure propagation exists. The consent
   verifier defaults unconfigured; candidate runtime is blocked.
3. **Adverse retention:** jurisdiction/legal role/duration are unknown. Skin/other
   adverse evidence is rejected and creates nothing.
4. **Guest:** v1 cross-service guest evidence is rejected; no exception is inferred.
5. **Current candidate contract:** `furef_v2` and exact retention mapping are absent.
   C uses dedicated draft DTOs; current `MemoryCandidate`/store connection is blocked.
6. **Durability/concurrency:** the bounded reference ledger proves one-process
   semantics only. No restart/multi-process durability or product DB exists.
7. **Transport/limits:** no delivery, endpoint, retry, byte limit, rate limit, or
   consumer is designed. Cosmile rows remain contained.
8. **Erasure:** retraction revokes eligibility but is not a complete legal erasure
   protocol.
9. **Manual operations/UI:** no reviewer UI, SLA, alert destination, or static safety
   copy is authorized; status enums are the only operational semantics.
10. **Current v1 hash quirk:** Foundation must reproduce the pinned JS sentinel
    behavior. Fixing it requires a new schema version.

### 18.3 Decision requests before any broader step

| Decision owner | Required decision | Earliest affected step |
|---|---|---|
| Leo/GPT + Security authority | authenticity credential/attestation, ingress authority, and consent-freshness proof | any non-synthetic intake |
| Leo/GPT + Legal/privacy authority | adverse jurisdiction, legal role, data class, duration, erasure exception | any skin/other adverse acceptance |
| Leo/GPT | any guest/anonymous exception | any anonymous evidence |
| Leo/GPT | C implementation authorization | WorkUnit 1 |
| Leo/GPT | delivery/intake activation and candidate runtime, each separately | WorkUnit 8 |
| Foundation architecture under a new reviewed handoff | durable storage/backend and current-candidate bridge semantics | multi-process/durable or runtime step |

## 19. Verification and STOP assertions

### 19.1 Actions performed in this Designer mission

```text
PRODUCT_OR_CANDIDATE_FILE_WRITE: ZERO
FOUNDATION_RUNTIME_WRITE: ZERO
COSMILE_RUNTIME_WRITE: ZERO
TEST_RUN: ZERO
BUILD_RUN: ZERO
DB_OR_MIGRATION_ACTION: ZERO
SECRET_OR_ENV_MUTATION: ZERO
NETWORK_OR_PROVIDER_ACTION: ZERO
COMMIT_OR_PUSH: ZERO
TMUX_ROUTING_OR_CONTROL: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO
SLACK: ZERO
ALLOWED_WRITES: this result + its pointer only
```

### 19.2 Pre-write Git evidence

| Workspace | Branch/head | Porcelain state |
|---|---|---|
| Cosmile | `shadow/m4-cosmile-memory` / `f26fa5c...` | six pre-existing untracked documentation files; sha256 `90210e452ce5bbef5ba271122b55ad1755d4dedd7fca310bd1f08f12291d0939` |
| Foundation | `shadow/foundation-shared-memory-v0` / `f6417004...` | two pre-existing untracked documentation files; sha256 `4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2` |
| foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` / `0ef0508...` | clean; sha256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

### 19.3 Post-write evidence

| Workspace | Post-write evidence |
|---|---|
| Cosmile | HEAD remains `f26fa5ced7083bb8d0af00bda2a54951923ea22f`; porcelain sha256 remains `90210e452ce5bbef5ba271122b55ad1755d4dedd7fca310bd1f08f12291d0939` |
| Foundation | HEAD remains `f6417004d9157766b2b23d4d0870ade7f0c7fe96`; porcelain sha256 remains `4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2` |
| foundation-docs worktree | HEAD remains `0ef0508f3f2b23c5e79b04009c25f47bc7e2df0d`; porcelain contains only the two declared untracked Designer result/pointer paths |

No pre-existing untracked product document was touched. The result and pointer are
uncommitted; Advisor owns publication.

```text
NEXT: independent C design review -> HARD STOP -> Leo/GPT
RETURN_TO: foundation-advisor
STOP
```
