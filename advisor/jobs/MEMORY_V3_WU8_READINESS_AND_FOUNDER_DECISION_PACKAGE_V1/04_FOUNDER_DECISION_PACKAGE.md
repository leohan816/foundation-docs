# Founder Decision Package — Memory V3 WU8 Readiness

```text
MISSION_ID: MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1
MISSION_TYPE: READ_ONLY_DECISION_PREPARATION
PACKAGE_AUTHOR: foundation-advisor
PACKAGE_STATUS: READY_FOR_INDEPENDENT_REVIEW
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS

WU8_IMPLEMENTATION: NOT_AUTHORIZED_NOT_STARTED
DELIVERY: NOT_AUTHORIZED_NOT_STARTED
ACTIVATED_FOUNDATION_INTAKE: NOT_AUTHORIZED_NOT_STARTED
DURABLE_CURRENT_CANDIDATE_RUNTIME: NOT_AUTHORIZED_NOT_STARTED
HARD_STOP: ACTIVE
```

## 1. What Leo/GPT is deciding

This package asks for five bounded product/architecture directions needed before a
future WU8 design can be authorized. Selecting an option authorizes only the recorded
direction for a later design mission unless Leo/GPT explicitly grants more authority.
It does not authorize implementation, delivery, intake activation, durable candidates,
or real-user behavior.

Current pinned baselines:

| Repository | Branch | Pinned HEAD | Verified state |
|---|---|---|---|
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` | C Shadow WU1–WU7 independently reviewed PASS; activation flags OFF/HARD_OFF |
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ced7083bb8d0af00bda2a54951923ea22f` | A/B evidence producer plane independently reviewed; outbox remains producer-only |

No repository-owner Worker or Designer was needed for this package. Control reproduced
every load-bearing fact from pinned Git source; the requested output is a decision
package, not an implementation-ready design.

## 2. D8-1 — Authenticity and ingress authority

### Verified current facts

- Foundation can validate the declared service/environment and recompute the exact
  unkeyed v1 `source_hash`. That proves integrity consistency, not sender authenticity.
- The landed `CommerceEvidenceProvenanceVerifier` is an injected seam whose default is
  `UNCONFIGURED`; only a verified binding may continue. Default execution accepts zero.
- Neither repository contains an authorized credential, signature implementation,
  endpoint, transport, or active ingress component.

### Exact unresolved question

Which boundary owns sender authentication, and what authenticated context must be bound
to `source_hash` and `idempotency_key` before Foundation may trust a Cosmile envelope?

### Options

**D8-1-A — Infrastructure/gateway-owned authentication (recommended).** A separately
approved ingress/gateway authenticates the Cosmile workload using a Security-approved
mechanism and passes only an opaque, digest-bound attestation verdict to Foundation.
Foundation product logic owns no raw credential and remains fail-closed when the adapter
is absent or the binding fails.

**D8-1-B — Foundation intake-adapter-owned authentication.** A Foundation-owned boundary
adapter verifies the Security-selected credential and produces the same narrow verdict.
Credentials still remain outside core commerce-evidence logic, but Foundation owns more
security-sensitive integration and operational failure modes.

**D8-1-C — Defer all ingress choice.** Keep the verifier `UNCONFIGURED` and keep delivery
and intake unavailable. This is safe but produces no WU8 implementation-ready direction.

### Advisor recommendation and consequences

Recommend **D8-1-A** as the future ownership direction. It minimizes product credential
authority and preserves the existing verifier seam. The exact mTLS/workload-identity/
signed-token mechanism, credential lifecycle, rotation, and incident response remain a
Security design decision. Until that design is independently reviewed, the verifier
must remain `UNCONFIGURED` and intake must accept nothing.

```text
IMPLEMENTATION_CONSEQUENCE: future gateway/ingress contract plus digest-bound attestation adapter; no current code
PRIVACY_SECURITY_SAFETY: prevents unkeyed source_hash from being mistaken for authentication
DEFERRED: concrete credential/protocol, key custody, rotation, production topology
DECISION_OWNER: Leo/GPT selects ownership direction; Security approval required before design closure and implementation
```

## 3. D8-2 — Current consent, revocation, and erasure propagation

### Verified current facts

- Cosmile remains the consent authority. Feedback-storage consent and
  `cross_service_commerce_evidence` consent are separate; login or `userId` is never
  consent.
- The envelope contains a consent snapshot, but cannot prove that it is still the latest
  effective state after queueing.
- Cosmile appends a local revoked-consent record, but the current implementation enqueues
  no revocation/erasure signal. Immediate cross-system propagation is not proved.
- Foundation's current-effective-consent verifier defaults `UNCONFIGURED` and fails
  closed. Foundation is not a consent ledger.

### Exact unresolved question

How does Foundation verify current consent at intake and later transitions, how do
revocation/expiry/correction/erasure states reach the boundary, and what happens when the
Cosmile consent authority is unavailable?

### Options

**D8-2-A — Authoritative verification at every transition (recommended minimum).** A
future adapter verifies current state with Cosmile at intake and every later eligible
transition. Unavailable, unknown, stale, purpose-mismatched, revoked, or expired returns
a fail-closed rejection. No candidate runtime is permitted without another current
verification.

**D8-2-B — Ordered consent lifecycle signals.** Cosmile produces separate versioned,
idempotent revocation/expiry/erasure control records; Foundation maintains a durable
current-state projection. This adds a new producer and delivery surface and therefore
requires separate design and authority.

**D8-2-C — Hybrid verification plus lifecycle signals.** Use D8-2-A as the authoritative
decision and D8-2-B to reduce propagation latency and trigger eligibility removal. This
is the strongest eventual activation model and the largest scope.

### Advisor recommendation and consequences

Recommend **D8-2-A** for the minimum future WU8 design and record **D8-2-C** as the
required target before any durable candidate runtime or real-user use. Authority
unavailable always means reject/hold; never use the envelope snapshot as proof of current
consent. Retraction currently removes eligibility but does not prove completion of legal
erasure.

```text
IMPLEMENTATION_CONSEQUENCE: future current-consent adapter; B/C additionally require ordered control records and durable projection
PRIVACY_SECURITY_SAFETY: prevents stale or revoked consent from being treated as current; availability fails closed
DEFERRED: propagation SLA, erasure-completion protocol, durable consent projection
DECISION_OWNER: Leo/GPT selects architecture; Security/privacy input required; Legal required for erasure semantics
```

## 4. D8-3 — Delivery, retry, ordering, and durability

### Verified current facts

- Cosmile has a contained transactional producer outbox but no sender, consumer, flush,
  retry transport, polling worker, or actual Foundation delivery.
- Foundation has no active receiver. Its landed Shadow ledger proves only one-process,
  in-memory `RLock` semantics; it is not restart-safe or multi-process durable.
- Contract-level replay, correction, retraction, collision, lineage, idempotency, and
  first-writer behavior are specified and tested. Out-of-order lineage currently rejects
  rather than buffers.

### Exact unresolved question

Which non-production delivery pattern should a future WU8 design target, and which
durable state and operational rules are mandatory for retry, replay, ordering,
dead-letter handling, idempotency, and backpressure?

### Options

**D8-3-A — Continue synthetic in-process Shadow only.** No delivery or durable state.
Safe and already proven, but does not advance WU8 delivery readiness.

**D8-3-B — Bounded non-prod outbox-to-ingress pipeline (recommended).** A future Cosmile
repo-owner Worker implements an explicitly authorized sender/poller and a Foundation
repo-owner Worker implements an authenticated intake adapter. Use at-least-once delivery,
Foundation-side idempotent commit, deterministic per-root lineage ordering, bounded retry
with jitter, a category-only dead-letter record, explicit queue/backpressure limits, and
a durable receipt/lineage/tombstone/candidate-slot/audit store with the reviewed six
uniqueness constraints.

**D8-3-C — Managed durable broker.** Use a broker with consumer groups, dead-letter,
backpressure, and replay. This may improve operations but introduces infrastructure and
security choices not justified for the first bounded non-prod stage.

### Advisor recommendation and consequences

Recommend **D8-3-B as a design direction only**. The future design must specify backend,
transaction boundaries, uniqueness constraints, forward/down rehearsal, rollback,
retention/deletion, rate and byte limits, poison-message isolation, observability, and
kill switch. No sender, consumer, endpoint, broker, durable DB, migration, or network is
authorized by selecting this option.

```text
IMPLEMENTATION_CONSEQUENCE: separate Cosmile delivery and Foundation intake/storage work units after reviewed design and new authority
PRIVACY_SECURITY_SAFETY: durable state must not resurrect retracted/expired evidence or leak payloads in DLQ/logs
DEFERRED: concrete backend/broker, production SLA, capacity, deployment, live activation
DECISION_OWNER: Leo/GPT selects pattern; Foundation architecture and Security review required before implementation
```

## 5. D8-4 — Foundation candidate bridge

### Verified current facts

- The boundary is already explicit:
  `accepted evidence ≠ eligibility ≠ review-only draft ≠ approval ≠ reuse ≠ runtime application`.
- Current Foundation `MemoryCandidate` requires `furef_v2`, but the approved commerce
  envelope intentionally carries no service-local furef.
- Current Foundation retention values cannot represent `adverse_regulatory_hold` with an
  unconfigured duration.
- WU1–WU7 therefore use separate Foundation-owned, review-only DTOs and never materialize
  current `MemoryCandidate`, write `SharedMemoryStore`, approve, reuse, promote, or apply.

### Exact unresolved question

Should future WU8 stop at durable evidence/review records, or should a later separate
contract revision create an exact, non-lossy bridge to a current/future candidate type?

### Options

**D8-4-A — Keep the bridge separate (recommended).** WU8 may design durable accepted-
evidence and review-only draft records, but it must not create current `MemoryCandidate`
or write `SharedMemoryStore`. Candidate materialization remains a later mission after an
exact contract decision.

**D8-4-B — Design an additive candidate contract revision later.** Introduce an exact
Foundation-owned candidate version or adapter that does not require a fabricated furef
and can represent the required retention semantics. Independently review it before any
materialization authority.

The following is not a safe selectable option: synthesizing `furef_v2` from
`subject_ref`, destructive re-keying, or coercing adverse retention into an existing
enum. Those actions are prohibited because they corrupt identity or retention meaning.

### Advisor recommendation and consequences

Recommend **D8-4-A** for WU8 and defer **D8-4-B** to a separate Foundation contract
mission. This preserves all six states and keeps current runtime, approval, reuse,
promotion, ranking, and safety mutation outside WU8.

```text
IMPLEMENTATION_CONSEQUENCE: WU8 design ends at durable review records; no current candidate/store connection
PRIVACY_SECURITY_SAFETY: avoids fabricated identity lineage and lossy retention mapping
DEFERRED: additive candidate contract, approval workflow integration, reuse/runtime application
DECISION_OWNER: Leo/GPT can select separation; Foundation architecture review required for any later additive contract
```

## 6. D8-5 — Adverse and identity boundaries

### Verified current facts

- Skin-reaction/other adverse evidence is rejected while jurisdiction, legal role,
  retention duration, and erasure exception remain `UNCONFIGURED`; accepted evidence,
  eligibility, and drafts remain zero.
- Satisfaction cannot lower adverse classification or handling. Static pre-approved
  guidance is the ceiling; diagnosis, generated medical advice, and external reporting
  remain excluded.
- Guest/anonymous cross-service evidence is rejected by default. The current envelope is
  identified-only with opaque subject reference, null anonymous reference, and identity
  linking OFF.
- Current evidence shows no necessity for a guest exception, so this package presents no
  guest-enablement option.

### Exact unresolved question

Should the conservative adverse/identity boundary remain closed, or should identified
skin/other adverse evidence become eligible only after explicit jurisdiction/legal-role/
retention/erasure policy is supplied?

### Options

**D8-5-A — Keep adverse policy unconfigured and guest forbidden (recommended).** Continue
rejecting skin/other at intake and keep all guest/anonymous cross-service evidence out.

**D8-5-B — Permit identified adverse evidence only after Legal policy.** A later mission
may define jurisdiction, legal role, exact retention class/duration, erasure exception,
static response, and audit/reporting boundary. Guest remains forbidden. This option
cannot be implemented or activated until Legal explicitly approves those values.

### Advisor recommendation and consequences

Recommend **D8-5-A**. Leo/GPT may select the conservative default now without a legal
conclusion. Selecting D8-5-B is conditional and remains blocked on Legal/privacy input;
it does not authorize the policy or code. A guest exception may be raised only if later
evidence demonstrates a concrete need and then requires a new Founder decision.

```text
IMPLEMENTATION_CONSEQUENCE: A preserves current zero-accept behavior; B requires separate legal-policy and retention/erasure design
PRIVACY_SECURITY_SAFETY: avoids ungrounded legal retention and anonymous cross-service linkage
DEFERRED: jurisdiction, legal role, duration, erasure exception, any evidenced guest exception
DECISION_OWNER: Leo/GPT can keep A; Legal/privacy approval required for B; Security required for any identity exception
```

## 7. Recommended Founder selection set

The Advisor recommends this coherent, conservative direction:

```text
D8-1: D8-1-A  infrastructure/gateway-owned authentication; concrete mechanism Security-gated
D8-2: D8-2-A  current-authority verification at every transition; D8-2-C deferred activation target
D8-3: D8-3-B  bounded non-prod pipeline as DESIGN DIRECTION ONLY
D8-4: D8-4-A  no current MemoryCandidate/SharedMemoryStore bridge in WU8
D8-5: D8-5-A  adverse UNCONFIGURED and guest forbidden
```

These selections would authorize, at most, preparation of a separately committed WU8
design handoff after Leo/GPT explicitly states that design authority. They do not
authorize implementation.

## 8. Minimum coherent WU8 design scope after decisions

If Leo/GPT later authorizes WU8 design using the recommended directions, the minimum
coherent design package should contain only:

1. a transport-neutral delivery contract with sender/receiver ownership, at-least-once
   semantics, retry/dead-letter/backpressure rules, per-root ordering, and payload limits;
2. a Security-owned ingress-attestation contract and a narrow Foundation verifier
   adapter boundary, with raw credentials excluded from Foundation core;
3. a Cosmile-authoritative current-consent adapter contract with fail-closed availability
   and explicit revocation/expiry/erasure semantics;
4. a durable evidence-decision state model for receipts, lineage, corrections,
   retractions, tombstones, idempotency, review-only draft slots, and category-only audit;
5. rollback, kill switch, non-prod rehearsal, containment tests, and independent design
   review criteria;
6. an explicit stop at accepted evidence and review-only drafts—no current candidate
   materialization or runtime application.

Adverse policy enablement, guest identity exceptions, current-candidate contract changes,
production topology, and live activation remain outside this minimum scope.

## 9. Exact authority boundaries

| Boundary | Meaning | Current authority | Required next gate |
|---|---|---|---|
| Delivery design | Paper contract for sender/receiver, durable state, retry/order/DLQ/idempotency/backpressure | NOT_AUTHORIZED until explicit Founder design approval | Control/Designer as selected by Advisor, then independent design review |
| Delivery implementation | Actual Cosmile sender plus Foundation receiver/storage/migration | NOT_AUTHORIZED | New Founder implementation authority after reviewed design; each repo-owner Worker; independent reviews |
| Activated intake | Turning on real evidence consumption and validator execution | NOT_AUTHORIZED; Foundation intake flag HARD_OFF | Separate activation approval after authenticity, current consent, durability, rollback, and security gates pass |
| Durable candidate runtime | Current/future candidate materialization, store write, approval/reuse/promotion/application | NOT_AUTHORIZED; candidate-runtime flag HARD_OFF | Separate candidate-contract decision, reviewed design, implementation review, and Founder approval |

No boundary automatically unlocks the next one.

## 10. Proposed execution sequence

```text
reviewed Founder Decision Package (this mission)
-> Leo/GPT selects D8-1..D8-5, with Security/Legal input where required
-> HARD STOP
-> only if explicitly authorized: Control cross-project WU8 design contract
-> only if needed: Designer implementation-ready design
-> independent design review
-> HARD STOP
-> only with new explicit authority: repo-local delivery implementation
-> independent implementation review and bounded same-Worker/same-Reviewer delta loops
-> HARD STOP before activated intake
-> separate activation decision
-> HARD STOP before any durable/current candidate runtime
```

## 11. Decisions safe to defer and activation blockers

Safe to defer while the system stays OFF/HARD_OFF:

- the concrete credential/protocol and key lifecycle;
- a revocation/erasure propagation channel and SLA;
- broker/backend vendor, production capacity, and production topology;
- additive current-candidate contract work;
- adverse jurisdiction/legal role/duration/erasure exception;
- any guest exception, for which no current need is proved.

They are not safe to defer past their named gates:

- authenticity and current consent must be resolved before any intake implementation or
  activation;
- durable ordering/idempotency/retraction state must be resolved before restart-safe or
  multi-process delivery;
- legal adverse policy must be resolved before accepting skin/other evidence;
- the candidate contract must be resolved before current candidate materialization.

## 12. Evidence and unknown register

Primary durable evidence:

- exact mission handoff: commit `d1e0272208c50818e2c6f40fb7af77d21ecf4de2`,
  blob `e0d50940e5eacdc8a100204b78f63d231f4f8b2c`;
- Control read-only analysis: commit `ec81b5490030f27c36d1ce69c8eb1f774babb91d`,
  result SHA-256 `44ad1e61576fdf8bc8392629071589f19d875e47a336e4dee12b8e1b60b5967f`;
- final C design subject/corrections: commits `7cbcb8d9…` and `4480b55f…`;
- final C design delta review PASS: `062c1d6391e4f595d5d57e3cc81ec60df3157be0`;
- Foundation C WU7 implementation review PASS: `0d28bc0d8bcb72bc6712f075cbf5a86ba630a051`;
- Foundation C Advisor final audit: `941fe428578f74289c70aa21d7b1cfd6227ab04c`;
- Cosmile A/B final head: `f26fa5ced7083bb8d0af00bda2a54951923ea22f`.

Explicit unresolved unknowns:

```text
U1: Security-approved authenticity mechanism and trust owner
U2: current-consent adapter and revocation/erasure propagation guarantee
U3: durable backend, ordering, retry, DLQ, and backpressure design
U4: exact non-lossy current/future candidate contract
U5: adverse jurisdiction, legal role, duration, and erasure exception
U6: whether a future guest exception is ever needed (current evidence: NO)
```

No Worker verification is blocking. No Designer artifact is required before Leo/GPT
selects directions. Independent package review is required before this package is
returned as a reviewed decision basis.

## 13. Explicit non-authorization and return state

```text
CURRENT_SCOPE_AUTOMATICALLY_AUTHORIZED: NONE
FOUNDER_OPTIONS_SELECTED_BY_THIS_ARTIFACT: NONE
RISK_ACCEPTED_BY_ADVISOR: NONE

PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
DB_NETWORK_SECRET_CREDENTIAL_FLAG_RUNTIME_ACCESS_OR_CHANGE: ZERO
IMPLEMENTATION_STARTED: NO
DELIVERY_STARTED: NO
ACTIVATED_INTAKE_STARTED: NO
DURABLE_CURRENT_CANDIDATE_RUNTIME_STARTED: NO

WU8_IMPLEMENTATION: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
M3: NOT_AUTHORIZED
HARD_STOP: ACTIVE

NEXT: independent Foundation Reviewer
RETURN_AFTER_REVIEW: foundation-advisor
FINAL_RETURN: Leo/GPT
STOP
```
