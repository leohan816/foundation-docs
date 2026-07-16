# WU8 Selected-Direction Cross-Project Contract Constraint Package (Control)

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-CONTROL-001
ROLE: Control (subordinate architecture/contract coordinator)
MODE: READ_ONLY_SELECTED_DIRECTION_CONTRACT_ANALYSIS
RESPONSIBLE_ADVISOR: foundation-advisor · RETURN_TO: foundation-advisor

RESULT_TYPE: CROSS_PROJECT_CONTRACT_COORDINATION_INPUT_ONLY
  - Encodes the 5 Founder-selected directions into ownership + interface + invariant constraints.
  - NOT the implementation-ready design (Designer owns that) · NOT policy selection · NOT implementation.
  - Transport-neutral: selects NO DB, broker, provider, endpoint, credential, migration, or topology.
  - Grants NO delivery, intake, candidate-runtime, DB, flag, or implementation authority.
  - IMPLEMENTATION = NOT_AUTHORIZED · HARD STOP remains ACTIVE.
```

## 0. Live runtime, skill, pinned Git evidence

**Live runtime (verified this pass):** actor/session `foundation-control`; workspace
`/home/leo/Project/foundation-control`; window `@4` pane `%4`; model **Opus 4.8 (1M
context)** `claude-opus-4-8[1m]` (verified live, not from session name); effort **high**;
skill **`/fable-builder`** loaded, applied in READ-ONLY contract-coordination mode. Matches
handoff → no runtime HOLD.

**Pinned heads (read-only, no fetch/switch), pre==post:**

| Workspace | Branch | HEAD | Pre porcelain sha256[:16] | Post |
|---|---|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | `c89b792b` | `b1b3b6962d0a0a17` | unchanged |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `33570b9d` | `4b1f8fb568419969` | unchanged |
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ce` | `90210e452ce5bbef` | unchanged |
| foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` | — | only the 2 declared write files | — |

All three product/control heads equal the handoff pins exactly → no HEAD-mismatch STOP.

**Read directly this pass (evidence, not memory):** Agent Office `TEAM_OPERATING_MODEL.md`,
`roles/control.md`; the exact Control handoff `01_…`; Founder direction decision
`11_FOUNDER_WU8_DIRECTION_DECISION.md`; Advisor `04_FOUNDER_DECISION_PACKAGE.md`; my prior
`CONTROL_READ_ONLY_ANALYSIS_RESULT.md`; the full C implementation-ready design
`M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md`. Pinned landed source re-verified this pass via
`git show`: FOUNDATION @`33570b9` — `commerce_evidence/verifiers.py`, `ledger.py`,
`shared_memory/contract.py`, `feature_flags.py`; Cosmile @`f26fa5c` —
`commerceEvidenceService.ts`, `foundationSignalMapper.ts`, `types/commerceEvidence.ts`.

**Discipline tag:** `[FACT@<head> …]` = source fact reproduced at that pinned head;
`[DIR D8-x-y]` = Founder-selected direction (`11_…`); `[C§n]` = reviewed C
implementation-ready design constraint (final design `4480b55`, subject-pin `7cbcb8d`);
`[CTRL]` = Control-derived cross-project constraint (traces only to FACT/DIR/C — introduces
**no** new policy); `[GATE Uk]` = unresolved Security/Legal gate. Nothing here selects a
credential, backend, or endpoint.

---

## 1. Anchors — the five selected directions this package encodes

`[DIR]` from `11_FOUNDER_WU8_DIRECTION_DECISION.md` (design authorized; implementation NOT):

| Item | Selected | Meaning for this package |
|---|---|---|
| D8-1 | **D8-1-A** | Infrastructure/gateway owns sender authentication; Foundation core holds no raw credential; concrete mechanism stays **Security-gated**. |
| D8-2 | **D8-2-A** | Cosmile remains current-consent authority; Foundation verifies current consent **at intake and every later transition**; unavailable/unverifiable → fail closed. (D8-2-C hybrid = deferred activation target, out of WU8 minimum scope.) |
| D8-3 | **D8-3-B, DESIGN DIRECTION ONLY** | Bounded non-prod outbox→ingress pipeline is a **design target**; at-least-once / idempotent commit / per-root ordering / bounded retry / category-only DLQ / backpressure / rollback / kill switch must be **designed**, not built. |
| D8-4 | **D8-4-A** | WU8 stops at durable accepted-evidence + review-only draft records; **no** current-`MemoryCandidate` and **no** `SharedMemoryStore` bridge. |
| D8-5 | **D8-5-A** | Adverse policy stays `UNCONFIGURED` (skin_reaction/other rejected); guest/anonymous cross-service forbidden. |

This package is contract coordination for a *future* Designer mission. It authorizes nothing.

---

## 2. Cross-project ownership map

Five owners; each cell states owned / not-owned and the pinned basis. Producer plane and
in-process validator/ledger/candidate DTOs already exist and are independently reviewed; the
**delivery, gateway-attestation, and consent-adapter planes are new and design-only.**

| # | Owner | Owns | Does NOT own | Basis |
|---|---|---|---|---|
| O1 | **Cosmile producer / outbox** | Closed-choice normalization, `cosmile.commerce_evidence.v1` envelope, append-only correction/retraction+tombstone, purpose-specific consent ledger, contained `FoundationSignalOutbox` queue rows | Any sender/consumer/flush/retry/HTTP/Foundation-client/timer/cron/queue-worker; candidate creation | `[FACT@f26fa5c foundationSignalMapper.ts:2]` "실 발신 0(producer-only)"; `[C§2]` |
| O2 | **Infrastructure / gateway (authenticity)** `[DIR D8-1-A]` | Authenticating the Cosmile workload by a Security-approved mechanism; emitting an **opaque, digest-bound attestation verdict** | Envelope content, consent, candidate, business decision; it does not hand Foundation a raw credential | `[DIR D8-1-A]`; `[C§6.1]` |
| O3 | **Cosmile current-consent authority** `[DIR D8-2-A]` | The authoritative current-effective consent state (grant/revoke/expiry/purpose/notice) and answering a verification query | Storing consent inside Foundation; Foundation is not a consent ledger | `[FACT@f26fa5c commerceEvidenceService.ts:410-426]`; `[C§6.2]` |
| O4 | **Foundation ingress / decision / durable-evidence state** | The (design-only) intake adapter surface, the existing fail-closed validator (gates 1–11), decision/receipt/lineage/tombstone/candidate-slot/minimized-audit **durable state** | Sender authentication mechanism; consent authority; current-`MemoryCandidate`/store materialization | `[FACT@33570b9 validator/ledger/service]`; `[C§4–§11]`; `[DIR D8-4-A]` |
| O5 | **Later candidate boundary** | (Deferred) any current/future candidate materialization, approval/reuse/promotion/ranking/safety | Everything — **outside WU8** | `[DIR D8-4-A]`; `[C§10, §17 WU8]` |

`[CTRL]` **Ownership invariant:** raw credentials live only in O2 (gateway) under Security
design; consent truth lives only in O3 (Cosmile); Foundation (O4) trusts nothing by default
and consumes only the two narrow verdicts (§3). No owner may assume another's authority.

---

## 3. Owner-to-owner interfaces (transport-neutral message contracts)

Each interface is a **logical message shape**, not a wire/endpoint/protocol. The Designer
chooses none of transport, DB, or credential from this section.

### I1 — Cosmile outbox (O1) → Foundation ingress (O4): evidence carrier

- **Payload:** exactly one `cosmile.commerce_evidence.v1` envelope, unchanged from the
  reviewed producer contract (identified-only actor, closed enums, no raw text/PII, opaque
  refs, lineage {root, supersedes|retracts, normalizer_version, source_hash}). `[C§4]`
- **Carried alongside (not inside) the envelope:** an opaque ingress context handle passed to
  the gateway verdict path (I2); Foundation never inspects, stores, logs, or echoes it. `[C§6.1]`
- `[CTRL]` The envelope schema is **frozen**; the delivery layer may not add, reshape, or
  enrich fields. A new envelope version is a new reviewed contract, not a delivery concern.

### I2 — Gateway (O2) → Foundation validator (O4): minimized attestation verdict `[DIR D8-1-A]`

Landed seam, **verified this pass** `[FACT@33570b9 verifiers.py:15-22]`:

```text
ProvenanceVerdict(status, source_identity: bool, envelope_digest: bool)
status ∈ {VERIFIED, UNVERIFIED, UNCONFIGURED, ERROR}     # default impl → UNCONFIGURED
CONTINUE iff status == VERIFIED AND source_identity AND envelope_digest   # else provenance_untrusted
```

- `[CTRL]` The gateway authenticates the workload and returns **only** this verdict —
  no credential, key, signature, token, certificate, or diagnostic text crosses into
  Foundation. The `envelope_digest` binding must cover the strict envelope projection
  (incl. product/SKU refs) so it binds them as *source claims*, without asserting catalog
  existence. `[C§6.1]`
- `[GATE U1]` The concrete authentication mechanism (mTLS / workload identity / signed token),
  key custody, rotation, and incident response are **Security-owned and unselected here**.
  Until that Security design is independently reviewed, the verifier stays `UNCONFIGURED` and
  intake accepts nothing. `[DIR D8-1-A]`

### I3 — Foundation (O4) → Cosmile consent authority (O3): current-consent verification `[DIR D8-2-A]`

Landed seam, **verified this pass** `[FACT@33570b9 verifiers.py:46-52]`:

```text
request  : (subject_ref, purpose, notice_version, captured_at, occurred_at, decision_time, opaque_ingress_context)
response : ConsentVerdict(status)
status ∈ {GRANTED, REVOKED, EXPIRED, MISSING, PENDING, MISMATCH, UNKNOWN, UNCONFIGURED, ERROR}
CONTINUE iff status == GRANTED   # REVOKED→consent_revoked · EXPIRED→consent_expired · MISMATCH→privacy_scope_exceeded · else→consent_missing
```

- `[CTRL]` This query is issued at **intake and at every later eligible transition**
  (review, and — when later authorized — reuse). The envelope's own `state:"granted"` snapshot
  is **never** proof of current consent. `[DIR D8-2-A]`,`[C§6.2]`
- `[CTRL]` **Availability = fail-closed:** `UNAVAILABLE/UNKNOWN/PENDING/UNCONFIGURED/ERROR` →
  reject/hold, create/keep nothing. Never degrade to the envelope snapshot. `[DIR D8-2-A]`
- `[GATE U2]` The concrete consent-authority adapter (how O4 reaches O3) and any live
  revocation/erasure propagation guarantee are unselected; the propagation channel is D8-2-C,
  **deferred** past WU8 minimum scope. Legal owns erasure-completion semantics.

### I4 — Foundation (O4) → dead-letter sink: category-only DLQ record

- `[CTRL]`,`[C§11.2] `A dead-lettered message records **category-only** fields
  (decision/status/primary_reason_code/verdict categories/lineage-action category/flag state),
  **never** the envelope, identifiers, hashes, credential, or payload. DLQ inclusion never
  implies acceptance. Poison input (§6) is category-logged and dropped, not retried forever.

### I5 — (Deferred, D8-2-C) Cosmile → Foundation consent-lifecycle signals

- `[CTRL]` Ordered, versioned, idempotent revocation/expiry/erasure control records with a
  durable Foundation current-state projection are the **eventual** target `[DIR D8-2-C]` but are
  **out of WU8 minimum scope**; they add a new producer + delivery surface requiring separate
  design and authority `[C§9.4]`,`[04 §3]`. WU8 relies on I3 pull-verification only.

---

## 4. Required delivery / durability invariants (design targets, `[DIR D8-3-B]`)

The future design MUST specify all of the following; selecting D8-3-B builds none of them.

| # | Invariant | Constraint the design must satisfy | Basis |
|---|---|---|---|
| V1 | **At-least-once delivery** | Sender may deliver an envelope ≥1 time; correctness never depends on exactly-once transport. | `[DIR D8-3-B]` |
| V2 | **Idempotent Foundation commit** | Duplicate/redelivery collapses on the primary replay identity `(source.service, source_event_id)`; exact committed replay returns the stored decision with **zero new effect**; non-exact reuse of evidence_id/idempotency_key → `duplicate_evidence`. | `[FACT@33570b9 ledger.py:89-92,169-173]`; `[C§7]` |
| V3 | **Per-root ordering** | Ordering is enforced **per lineage root**, not globally; correction/retraction must observe the current leaf; out-of-order lineage **rejects (`lineage_broken`), never buffers**. | `[FACT@33570b9 ledger.py:177-189]`; `[C§9.1]` |
| V4 | **Bounded retry** | Finite retry with backoff/jitter; exhausted retry → DLQ (I4), not infinite loop or silent drop. | `[DIR D8-3-B]` |
| V5 | **Category-only dead-letter** | Per I4 — no payload/identifier leak; DLQ ≠ acceptance. | `[C§11.2]` |
| V6 | **Backpressure / limits** | Explicit queue depth, rate, and byte/size limits; overflow sheds fail-closed. Byte/rate policy belongs to the transport layer, not to C validation. | `[C§15]` |
| V7 | **Rollback** | Revert = flags OFF + revert of only the added modules/adapters; queued Cosmile rows remain **pending/blocked, never drained/marked-sent/deleted**; no destructive down-migration because no product schema is selected here. | `[C§14.3]`; `[DIR D8-3-B]` |
| V8 | **Kill switch** | Shadow flag OFF checked before parse **and** re-checked before durable commit; three activation-class flags stay `HARD_OFF`; UNCONFIGURED verifiers / UNCONFIGURED adverse policy are independent kill conditions even when the flag is ON. | `[FACT@33570b9 feature_flags.py:8-17]`; `[C§14.2]` |
| V9 | **Fail-closed default** | Absent gateway verdict, absent consent verdict, absent adverse policy, or OFF flag ⇒ accept nothing, create nothing, `applied_to_real_user=false`, `write_live=false`, `promotion_performed=false`. | `[FACT@33570b9 verifiers.py]`; `[C§18.2]` |

---

## 5. Durable state responsibilities & atomic boundaries (backend-neutral)

`[DIR D8-3-B]` The Foundation side (O4) must hold **durable** state to be restart-safe /
multi-process; the current landed ledger proves only one-process RLock semantics and makes
**zero durability claim** `[FACT@33570b9 ledger.py:2,5,82-95]`. Control fixes the *logical*
contract the durable store must preserve; it selects **no** backend.

- `[CTRL]` **The six uniqueness constraints are mandatory and must be enforced atomically**
  (verified landed as sets today, must become durable constraints):
  1. `(service, source_event_id)` — primary replay identity;
  2. `(service, evidence_id)`;
  3. `(service, idempotency_key)`;
  4. `(service, target_evidence_id)` — across correction **and** retraction successors;
  5. `(service, evidence_id, candidate_slot)` — slot ∈ {outcome, adverse};
  6. one tombstone per `(service, root_evidence_id)` + replay block on the same root lineage.
  `[FACT@33570b9 ledger.py:89-93]`; `[C§7.1]`
- `[CTRL]` **Atomic boundary:** receipt + lineage node + candidate-slot reservation + lifecycle
  effect commit **all-or-none** in one durable transaction; verifier/network calls occur
  **before** the transaction, never inside it. `[C§7.3]`
- `[CTRL]` **First-writer-wins**, exact-replay returns the stored decision/lineage, and the
  minimized audit append is **honestly post-commit** (not part of the atomic transaction) — a
  post-commit sink failure fails closed (poison the instance) without clearing prior state.
  `[C§7.2, §11.7]`
- `[GATE U3]` Concrete backend, migration framework, forward/down rehearsal, empty-table +
  compatibility gates, retention/deletion behavior — a **separate storage design** required
  before any durable/multi-process delivery `[C§12.2]`. Not selected here.

---

## 6. Explicit handling matrix (transport-neutral)

| Situation | Required behavior | Basis |
|---|---|---|
| **Correction** | Append-only; targets current leaf; new node supersedes predecessor drafts atomically; maps only corrected axes; immutable actor/purchase/product. | `[C§9.1-9.2]`; `[FACT@f26fa5c]` |
| **Retraction** | Root tombstone; all root-lineage eligibility → revoked; unapproved drafts → blocked; **zero** candidate; new root on a tombstoned purchase → `evidence_retracted`. | `[C§9.2]`; `[FACT@33570b9 ledger tombstone]` |
| **Replay** | Exact committed replay = stored decision, zero new effect; replay short-circuit occurs **after** privacy/identity/authenticity/current-consent/normalization/retention gates so later revocation/expiry/OFF fails with the current conservative code. | `[C§5.1, §7.2]` |
| **Erasure state** | Retraction removes eligibility but is **not** a complete legal erasure protocol; full erasure is a later separate design; only minimized metadata is ever retained. | `[C§9.4]`; `[GATE U5]` |
| **Lineage** | Root/leaf/successor rules under lock; single-successor `@unique`; late/out-of-order → `lineage_broken` (reject, not buffer). | `[FACT@33570b9 ledger.py:177-189]`; `[C§9.1]` |
| **Collision** | Same source-event with mutated body, or reused evidence_id/idempotency_key → `duplicate_evidence`; first committed writer authoritative. | `[FACT@33570b9 ledger.py:169-173]` |
| **Poison input** | Strict fixed-depth mapping + scalar types + recursive raw/PII scan; malformed → guarded category reject, no payload/field-name/exception text in response/audit; unmapped → `cannot_determine`. | `[C§4.5, §5.2]` |
| **Authority unavailable** (gateway or consent) | Fail closed — reject/hold; never substitute the envelope snapshot; create/keep nothing. | `[DIR D8-1-A, D8-2-A]`; `[C§6]` |
| **Transition-time current-consent** | Re-run I3 verification at intake **and** every later eligible transition; a stored `eligible` is advisory only, never authority. | `[DIR D8-2-A]`; `[C§6.2]` |

---

## 7. The exact WU8 stop boundary `[DIR D8-4-A]`

- `[CTRL]` WU8 **may** design durable **accepted-evidence decision records** and **review-only
  candidate draft** records (the existing Foundation-owned `CommerceOutcomeCandidateV1` /
  `CommerceAdverseCandidateV1`, `status=review_required`). `[C§10]`
- `[CTRL]` WU8 **must NOT** design or connect: current 17-field `MemoryCandidate`
  materialization, `SharedMemoryStore` write, approval, reuse, promotion, ranking, or safety
  mutation. Each stays outside WU8. `[DIR D8-4-A]`; `[C§10.3, §17]`
- **Why the bridge is excluded (verified this pass):** current `MemoryCandidate` **requires
  `furef_v2`** which the envelope omits `[FACT@33570b9 contract.py:11-14]`; and
  `RETENTION_POLICIES=(session, short_ttl, standard_ttl, revocable)` cannot represent
  `adverse_regulatory_hold` `[FACT@33570b9 contract.py:24]`. Synthesizing a furef from
  `subject_ref`, destructive re-key, or coercing retention are **prohibited** (corrupt
  identity/retention meaning). `[C§10.1]`; `[04 §5]`
- `[GATE U4]` Any non-lossy current/future candidate contract is a **separate Foundation
  contract mission** (D8-4-B, deferred), independently reviewed before any materialization.

---

## 8. Adverse & identity fail-closed boundaries `[DIR D8-5-A]`

- `[CTRL]` **Adverse:** while `_ADVERSE_RETENTION_POLICY_STATE == UNCONFIGURED`, skin_reaction/
  other adverse evidence is **rejected** (`privacy_scope_exceeded`) with zero accepted
  evidence/eligibility/draft; usage_safety stays adverse (review-required) under the
  non-adverse 90d class; satisfaction can **never** lower adverse severity/handling; response
  ceiling is pre-approved static guidance (no diagnosis/generated advice/external reporting).
  `[FACT@33570b9]`; `[C§4.4, §10.4]`; `[DIR D8-5-A]`
- `[CTRL]` **Identity:** identified-only XOR (`subject_ref` opaque, `anonymous_ref:null`,
  `identity_state:"identified"`, `identity_link_allowed:false`); guest/anonymous cross-service
  evidence **forbidden** (`guest_cross_service_forbidden`); no mint/link/re-key; no retroactive
  linking. `[FACT@f26fa5c commerceEvidenceService.ts:102,119]`; `[C§8.2]`; `[DIR D8-5-A]`
- `[GATE U5]` Adverse jurisdiction/legal role/retention duration/erasure exception = **Legal**;
  any guest exception (no current need shown) = new Founder decision. Neither is inferable.

---

## 9. Security / Legal decisions still required — and where each becomes a blocking gate

| Gate | Decision | Owner | Becomes BLOCKING at |
|---|---|---|---|
| U1 | Concrete ingress authenticity mechanism + key custody/rotation | Leo/GPT + **Security** | **before any intake implementation or activation** — until then verifier stays UNCONFIGURED |
| U2 | Current-consent adapter + (deferred) revocation/erasure propagation | Leo/GPT + **Security/privacy** | consent adapter blocks **any intake implementation**; propagation guarantee blocks **durable candidate runtime / real-user use** |
| U3 | Durable backend + ordering/idempotency/retraction/migration design | Leo/GPT + **Foundation architecture** | **before restart-safe or multi-process delivery** |
| U4 | Non-lossy current/future candidate contract | Leo/GPT + **Foundation architecture** | **before any current-candidate materialization** |
| U5 | Adverse jurisdiction/legal role/duration/erasure exception | Leo/GPT + **Legal/privacy** | **before accepting any skin/other adverse evidence** |
| U6 | Whether a guest exception is ever needed (current evidence: NO) | Leo/GPT (+Security) | **before any anonymous cross-service evidence** |

`[CTRL]` A design detail may be resolved inside the Designer mission; a **gate** may not — it
requires the named external authority before the dependent step, and design work stops there.

---

## 10. Proposed ordered Designer work-unit map (design only — HARD STOP before implementation)

Only if Leo/GPT explicitly authorizes the WU8 **design** mission. No row authorizes code.

| Order | Design work unit (Designer) | Produces (paper only) | Depends on | Stop condition |
|---:|---|---|---|---|
| D-1 | **Delivery contract** | transport-neutral sender/receiver ownership, at-least-once, per-root ordering, retry, category-only DLQ, backpressure, payload limits (§3 I1/I4, §4) | this package | any need to select a broker/endpoint/DB → STOP |
| D-2 | **Ingress-attestation contract** | Security-owned gateway boundary + narrow Foundation verifier adapter shape; raw credentials excluded from core (§3 I2) | D-1 | any concrete credential/protocol needed → STOP to Security (U1) |
| D-3 | **Current-consent adapter contract** | Cosmile-authoritative verify-at-every-transition, fail-closed availability, revocation/expiry/erasure semantics (§3 I3) | D-1 | erasure-completion semantics needed → STOP to Legal (U2/U5) |
| D-4 | **Durable evidence-decision state model** | receipts, lineage, correction/retraction, tombstone, idempotency, review-only draft slots, category-only audit, six uniqueness constraints, atomic boundary (§5, §6) | D-1..D-3 | concrete backend/migration needed → STOP to architecture (U3) |
| D-5 | **Rollback / kill switch / non-prod rehearsal / containment test / review criteria** | activation-flag OFF/HARD_OFF plan, rollback, containment + independent-review acceptance gates (§4 V7/V8) | D-1..D-4 | any activation step → STOP |
| D-6 | **Explicit stop assertion** | accepted-evidence + review-only drafts only; no candidate materialization/runtime (§7) | D-1..D-5 | any current-`MemoryCandidate`/store bridge → STOP (U4) |
| — | **independent design review → HARD STOP → Leo/GPT** | — | D-1..D-6 | implementation requires **new explicit Founder approval** |

`[CTRL]` Control does not route or dispatch; the Advisor sequences and assigns. Adverse-policy
enablement, guest exceptions, current-candidate contract changes, production topology, and live
activation are **outside** this design map.

---

## 11. Traceability register (verified fact / selected direction / design constraint / gate)

| Class | Item | Evidence / commit |
|---|---|---|
| VERIFIED FACT | furef_v2 required in current MemoryCandidate; retention enum has no adverse hold | `[FACT@33570b9 contract.py:11-14,24]` (this pass) |
| VERIFIED FACT | ProvenanceVerdict/ConsentVerdict verdict enums + bindings; defaults UNCONFIGURED | `[FACT@33570b9 verifiers.py:15-70]` (this pass) |
| VERIFIED FACT | six uniqueness sets, exact_replay/duplicate, one-process RLock, zero durable claim | `[FACT@33570b9 ledger.py:2,82-173]` (this pass) |
| VERIFIED FACT | C flags: shadow OFF + 3 HARD_OFF | `[FACT@33570b9 feature_flags.py:8-17]` (this pass) |
| VERIFIED FACT | Cosmile producer-only (no sender/flush); revoke enqueues nothing; guest forbidden | `[FACT@f26fa5c foundationSignalMapper.ts:2; commerceEvidenceService.ts:102,410-426]` (this + prior pass) |
| SELECTED DIRECTION | D8-1-A / D8-2-A / D8-3-B(design-only) / D8-4-A / D8-5-A | `11_FOUNDER_WU8_DIRECTION_DECISION.md` @ `25ec350` |
| DESIGN CONSTRAINT | verdict continue-rules, gate order, six uniqueness, lineage/replay, candidate DTOs, audit minimization, rollback/kill | C design `4480b55` (subject-pin `7cbcb8d`); WU7 review PASS `0d28bc0` |
| DESIGN CONSTRAINT | Advisor package options/recommendations context | `04_FOUNDER_DECISION_PACKAGE.md` @ `bd4b3c9`; my analysis `ec81b549` |
| UNRESOLVED GATE | U1 auth mechanism · U2 consent adapter/propagation · U3 durable backend · U4 candidate contract · U5 adverse legal · U6 guest | §9; `[04 §12 U1–U6]` |

`[CTRL]` Every constraint above traces to a VERIFIED FACT, a SELECTED DIRECTION, or a reviewed
DESIGN CONSTRAINT. **No new policy, option, credential, backend, or legal conclusion is
introduced by this package.**

---

## 12. Assertions and STOP state

```text
PRODUCT_REPO_WRITE = ZERO (FOUNDATION 33570b9 · Cosmile f26fa5c HEADs + porcelain unchanged; pre==post)
CONTROL_REPO_WRITE = ZERO (foundation-control c89b792 unchanged; porcelain sha256[:16] b1b3b6962d0a0a17 pre==post)
FOUNDATION_DOCS_WRITE = only the 2 declared files (result + pointer); NOT staged/committed/pushed (Advisor publishes)
FETCH / BRANCH_SWITCH / DB / SECRET / ENV / NETWORK / PROVIDER / MIGRATION / FLAG / BUILD / PRODUCT_TEST_RUN = ZERO
CREDENTIAL / BACKEND / BROKER / ENDPOINT / TOPOLOGY SELECTED = ZERO (transport-neutral)
NEW_AGENT_OR_SUBAGENT = ZERO · ACTOR_DISPATCH = ZERO
NEW_POLICY_OR_OPTION_SELECTED = ZERO (encodes the 5 Founder-selected directions only)
IMPLEMENTATION_READY_PRODUCT_DESIGN_CREATED = ZERO (contract-coordination input only; Designer owns the design)
PII / RAW_IDENTIFIER / SECRET / PAYLOAD_SAMPLE / REAL_DB_ROW in this result = ZERO

RESULT_TYPE: CROSS_PROJECT_CONTRACT_COORDINATION_INPUT_ONLY
NEXT_ROUTE: foundation-advisor → (only if Leo/GPT authorizes WU8 design) Designer impl-ready design → independent design review → HARD STOP → Leo/GPT
WU8_IMPLEMENTATION / DELIVERY / INTAKE / CANDIDATE_RUNTIME / M3 / FULL_PACKAGE_1B = NOT_AUTHORIZED
RETURN_TO: foundation-advisor
HARD_STOP: ACTIVE
STOP
```
