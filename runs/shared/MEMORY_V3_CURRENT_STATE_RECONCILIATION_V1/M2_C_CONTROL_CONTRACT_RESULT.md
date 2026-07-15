# M2 C — Foundation Control Cross-Project Contract Analysis (Foundation intake + candidate boundary)

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-CONTROL-CONTRACT-ANALYSIS-001
ROLE: Control (subordinate architecture/contract coordinator)
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_DESIGN
RESPONSIBLE_ADVISOR: foundation-advisor · RETURN_TO: foundation-advisor
HANDOFF: 50_M2_C_CONTROL_CONTRACT_HANDOFF.md @ 561fec6eda79f5594972ddb20b5a01ac3bccf464

RESULT_TYPE: CONTRACT_ANALYSIS_INPUT_ONLY
  - NOT reviewed design · NOT implementation-ready design · NOT implementation authority.
  - Describes a FUTURE, separately-approved Foundation intake + candidate-creation boundary.
  - Grants NO runtime, delivery, intake, DB, migration, feature-flag, or implementation authority.
```

## 0. Live runtime, skill, and Git evidence

**Live runtime (verified):** actor/session `foundation-control`; workspace `/home/leo/Project/foundation-control`; window `@4` pane `%4`; model **Opus 4.8 (1M context)**; effort **high**; skill **`/fable-builder`** loaded (anchor-first · contract→code mapping · proved/not-proved), applied in READ-ONLY design mode. Matches handoff → no runtime HOLD.

**Pinned heads (no fetch, read-only), pre==post:**

| Workspace | Branch | HEAD | Pre-write porcelain sha256[:16] | Post |
|---|---|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | `c89b792b` | `2aa3ce93db703c50` | unchanged |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `f6417004` | `4b1f8fb568419969` | unchanged |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45` | (not modified) | unchanged |
| Cosmile | `shadow/m4-cosmile-memory` | `f26fa5ce` (A/B impl head) | `90210e452ce5bbef` | unchanged |
| foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` | `289a522` | only the 2 ALLOWED_WRITE files | — |

**Files read directly this pass (evidence, not prose):** Role/authority — `agent-office/docs/agent/roles/control.md`, `foundation-control/CLAUDE.md`, Cosmile `app/docs/security/{SECURITY_AND_SECRET_GUARDRAILS,ENV_AND_MIGRATION_POLICY}.md` (this pass + M1/M2-AB baseline). Founder — `24_M2_FOUNDER_D1_D3_DECISION.md`, `22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md`. Cosmile A/B @ `f26fa5c` — `src/types/commerceEvidence.ts`, `src/lib/{commerceEvidenceNormalizer,commerceEvidenceService,foundationSignalMapper,ids,purchaseFeedbackState}.ts`, `prisma/schema.prisma` (evidence/consent/tombstone models + migrations), `scripts/m2_ab_no_transport.mjs`, A/B commit range `6e44aa40..f26fa5c`. Foundation @ `f6417004` — `foundation/shared_memory/{gate,contract,api,reason_codes}.py`, `foundation/_core/{learning_approval_workflow,reuse_gate}.py`, module inventory of `shared_memory/` and `_core/`. Prior M1/M2-AB Control results/pointers. **Not re-derived from memory.**

**Discipline tag:** every normative clause is tagged `[F#]` (Founder-fixed, `24_...`), `[COS file:line]` (Cosmile pinned source), or `[FND file:line]` (Foundation pinned source). Proposed **future C** behavior is labeled `(C-FUTURE)`; current implementation is labeled `(NOW)`.

---

## 1. Current truth at pinned heads (proved / not-proved)

### 1a. Cosmile A/B producer side (NOW, @ `f26fa5c`) — this is exactly what C must accept

| # | Proved fact | Evidence |
|---|---|---|
| CP1 | The wire contract C accepts is the closed envelope `cosmile.commerce_evidence.v1` (single-source enums, no free text, no external provider, no candidate). | `[COS types/commerceEvidence.ts:1-105]` (`SCHEMA_VERSION` :4; envelope :58-105) |
| CP2 | The 18 Foundation-C rejection codes already exist as a **reserved, not-consumed** constant on the producer side. | `[COS commerceEvidence.ts:47-53]` (`FOUNDATION_C_REASON_CODES`, "보존만·A/B 미구현·소비 금지") |
| CP3 | Envelope is **identified-only** for cross-service: `actor.subject_ref` required, `anonymous_ref:null`, `identity_state:"identified"`, `identity_link_allowed:false`; guest is rejected. | `[COS commerceEvidence.ts:69-74]`; `[COS commerceEvidenceService.ts:102]` (`guest_cross_service_forbidden`) |
| CP4 | Cross-service enqueue requires **per-evidence election + a granted `cross_service_commerce_evidence` consent snapshot**; `userId` is never consent (M2-AB IMPL_DELTA-3 is **fixed**). | `[COS commerceEvidenceService.ts:103-106]`; `[COS foundationSignalMapper.ts:23-47]` (R7: explicit granted snapshot or 0 rows) |
| CP5 | `purchase_item_ref` is an opaque `pir_v1_`+ULID; raw `orderItemId` is **internal FK only, forbidden in envelope/outbox/API result**. | `[COS ids.ts:41-44]`; `[COS schema.prisma:898]` (`orderItemId … envelope/outbox/API 결과 금지 §5.12`) |
| CP6 | Deterministic normalization: adverse computed first and **never reads satisfaction** (F9); `unknown` severity → stored null + human-review + **not** outbox-eligible; `severe` → human-review but outbox-eligible. | `[COS commerceEvidenceNormalizer.ts:36-77]` |
| CP7 | Deterministic idempotency key = `sha256("cosmile.commerce_evidence.v1"+sourceEventId+evidenceType+normalizerVersion)`; `source_hash` = canonical-JSON sha256 with self excluded (secret-free, provenance/idempotency only). | `[COS ids.ts:70-82]`; `[COS commerceEvidenceService.ts:116,142-143]` |
| CP8 | Lineage: append-only correction (`supersedes_evidence_id`, `@unique`), retraction (`retracts_evidence_id`, `@unique`) + minimal tombstone with no content/identity/order/consent copy; retraction blocks all pending root-lineage outbox rows. | `[COS commerceEvidenceService.ts:65-73,383-396]`; `[COS schema.prisma:919-920,936-944]` |
| CP9 | Retention: adverse (`skin_reaction`/`other`) → `adverse_regulatory_hold`, `retentionState:duration_unconfigured`, `retentionExpiresAt:null` (held, **not** TTL-purged); non-adverse → `feedback_non_adverse_90d` + 30-day outbox-queue expiry. | `[COS commerceEvidenceNormalizer.ts:79-82]`; `[COS commerceEvidenceService.ts:192-193,376-377]` |
| CP10 | Containment is statically enforced: transport/consumer tokens = 0 in the four server services; candidate tokens = 0 in A/B files; flags default OFF + production fail-closed; envelope raw-text capture = 0. | `[COS scripts/m2_ab_no_transport.mjs:17-79]`; B flag `[COS commerceEvidenceService.ts:19-22]` (`COSMILE_COMMERCE_EVIDENCE_ENABLED`, prod always false) |

### 1b. Foundation side (NOW, @ `f6417004`) — what C connects to

| # | Proved fact | Evidence |
|---|---|---|
| FP1 | **No commerce-evidence intake exists.** No Foundation receiver/consumer/endpoint for `cosmile.commerce_evidence.v1`. (proved-absent by grep of `foundation/**`.) | grep for `commerce_evidence`/`outbox` receiver → none |
| FP2 | The shared-memory boundary is **flag-OFF inert**; every API response stamps `applied_to_real_user=false`, `write_live=false`; `memory_db_created` is always False. | `[FND api.py:16-21,31-32,36-87]`; `[FND contract.py:35,38-48]` (FLAG `shared_memory_v0_shadow` default OFF) |
| FP3 | Existing fail-closed gate priority: raw/PII default-deny → invariant violation → cross-subject isolation → deleted/expired reuse → invalid kind → sensitive+no-consent → high-sensitivity reconfirm → session_only → allow (**shadow write only**). | `[FND gate.py:40-95]` |
| FP4 | The Foundation candidate object is the **17-field `MemoryCandidate`** (`memory_kind` ∈ preference/concern/reaction/decision_history/**outcome_feedback**/safety_note); `SOURCE_SERVICES=(cosmile,siasiu)`. This is **not** the Cosmile envelope. | `[FND contract.py:10-33]` |
| FP5 | **No automatic promotion.** `candidate→review_required→reviewed→approved_for_reuse` requires `reviewed_by` + invariants + no raw/teacher text; store refuses `memory.db`/`ssbrain.sqlite`. | `[FND learning_approval_workflow.py:40-57,88-92]` |
| FP6 | Reuse gate: "저장됐다고 재사용하지 않는다" — candidate/reviewed not auto-reusable; only `approved_for_reuse`+; privacy/customer/internal/raw/high-risk blocked; missing `source_ref`/`reviewed_by` blocked. | `[FND reuse_gate.py:24-72]` |
| FP7 | Dynamic reason-code sites are enum-guarded: only a small `_SAFE_DYNAMIC` category set passes; anything else collapses to `cannot_determine` (leak prevention). | `[FND reason_codes.py:9-27]` |

### 1c. Contradictions / legacy / not-proved

- **Reason-taxonomy gap (C-FUTURE).** `[FND reason_codes.py]` `_SAFE_DYNAMIC` does **not** contain the 18 `FOUNDATION_C_REASON_CODES` `[COS commerceEvidence.ts:48-53]`. If C reuses the enum-guard path verbatim, all C rejection codes would collapse to `cannot_determine`. → C must extend the Foundation reason taxonomy (additive) or route C codes through a dedicated guarded set. **Recorded as an implementation delta, not resolved here.**
- **Envelope↔candidate shape mismatch (C-FUTURE, expected).** `commerce_evidence.v1` (evidence) ≠ `MemoryCandidate` (memory). C is the bridge: validate envelope → (if accepted) construct a Foundation-owned `MemoryCandidate`. No current code performs this mapping.
- **`ingest_event_signal` is not the C intake.** `[FND api.py:42-45]` accepts a shared-memory-v0 event signal ("memory 아님"), not the commerce-evidence envelope. Not-proved that it can validate the envelope; C must not overload it silently.
- **SIASIU non-participation (proved for A/B).** No SIASIU file is on the producer or Foundation-C path; `SOURCE_SERVICES` includes `siasiu` only for the separate SIASIU→candidate proposal path `[FND api.py:48-53]`. No shared-contract dependency forces SIASIU into C. → **SIASIU has no C role** unless a later evidence-backed shared-contract need is shown.

---

## 2. Ownership and trust boundary

| Concern | Owner | Authority | Basis |
|---|---|---|---|
| Closed-choice normalization + `commerce_evidence.v1` envelope | **Cosmile (producer)** | sole | `[F3]`; CP1/CP6 |
| Contained write-only outbox (producer only) | **Cosmile** | producer only; no consumer | `[F9]`; CP10 |
| Transport / consumer / flush / network delivery | **DEFERRED — unowned** | none created by C | `[F]`; CP10 |
| Envelope **eligibility validation** (accept/reject) | **Foundation (C-FUTURE)** | validate only; not memory | `[F5]`; §5 |
| Foundation-owned `MemoryFactCandidate`/adverse-candidate **creation from accepted evidence** | **Foundation (C-FUTURE)** | only from accepted evidence; no auto-promotion | `[F6]`; FP4/FP5 |
| Cosmile candidate creation | **FORBIDDEN** | zero (RESOLVED_BY_FOUNDER_F4) | `[F4]`; M2-AB B1 |
| Promotion / reuse / ranking / safety mutation | **NONE (deferred/forbidden)** | HARD STOP | `[F]`; FP5/FP6 |
| SIASIU | **NO C ROLE** | explicit non-participation | §1c |

**Trust boundary statement (C-FUTURE):** the Foundation intake trusts **nothing** by default. `ACCEPT_FOR_ELIGIBILITY_REVIEW` means only that the envelope is structurally + policy-valid; it is **not** intake activation, candidate creation, promotion, reuse, ranking, or safety mutation `[F5]`. Acceptance, candidate-eligibility, and candidate-creation are **three separate outcomes** (§9).

---

## 3. Versioned evidence schema Foundation would require (C-FUTURE)

C accepts exactly the pinned `commerce_evidence.v1` envelope `[COS commerceEvidence.ts:58-105]`. Minimum required, optional, and forbidden:

- **Required:** `schema_version` (exact `cosmile.commerce_evidence.v1`); `evidence_id` (`cevi_v1_`); `evidence_type` ∈ {purchase_feedback, correction, retraction}; `source.{service=cosmile, environment∈{local,shadow}, source_event_id, idempotency_key, occurred_at}`; `actor.{subject_ref, anonymous_ref:null, identity_state:"identified", identity_link_allowed:false}`; `purchase.{purchase_item_ref (opaque), product_ref, purchase_state:"paid"}`; `consent.{purpose:"cross_service_commerce_evidence", state:"granted", notice_version, captured_at}`; `privacy.{raw_text_stored:false, contains_pii:false, retention_class}`; `lineage.{root_evidence_id, normalizer_version, source_hash}`.
- **Optional/nullable:** `purchase.sku_ref`; `feedback.satisfaction`; `feedback.adverse_type/adverse_severity/adverse_certainty` (closed-choice, may be null); `lineage.supersedes_evidence_id` (correction only), `lineage.retracts_evidence_id` (retraction only).
- **Forbidden (reject on presence):** raw free text; any `orderItemId`/`orderId`/`payment`/contact/PII; `contains_pii:true`; `raw_text_stored:true`; `anonymous_ref` non-null (cross-service); embeddings/LLM/external-provider fields; a Cosmile-declared candidate/promotion field.
- **Closed-choice rules:** satisfaction ∈ {satisfied,neutral,dissatisfied,null}; adverse_type ∈ {skin_reaction,other,usage_safety,null}; adverse_severity ∈ {low,moderate,severe,null} (input `unknown` → stored null and not outbox-eligible, CP6); adverse_certainty ∈ {reported,null} in A/B.
- **Satisfaction/adverse independence:** two axes; satisfaction may never lower adverse severity/handling `[F10]`; adverse-first computation is a producer invariant C relies on but must **re-verify** structurally (CP6).
- **Purchase-item opacity:** accept only `purchase_item_ref` (`pir_v1_`); reject any raw order/line identifier `[F/D2-A]`; CP5.
- **Nullable Cosmile-local `sessionId`:** the envelope carries no `sessionId`; `RecommendationEvent.sessionId` remains nullable/opaque and Cosmile-local `[F1]` (M2-AB IMPL_DELTA-1) — C must never require or read it.
- **Version negotiation:** exact-match `schema_version` + `normalizer_version`; unknown/unsupported → `unsupported_schema_version` (§5). No implicit upgrade; a new envelope version requires a new C contract revision.

---

## 4. Ingress authenticity without inventing transport (C-FUTURE)

- **Provenance/source attestation:** intake must require `source.service=cosmile`, allowed `environment`, and a verifiable `source_hash` recomputation (canonical-JSON, self-excluded, CP7). A future authenticity binding (e.g., a service-scoped attestation over `source_hash`+`idempotency_key`) is a **contract requirement**, but its credential/mechanism is a genuinely new security decision (§13) — **do not** design a credential, key, protocol, or endpoint here.
- **Replay/idempotency inputs:** `{source.service, source_event_id, evidence_type, normalizer_version}` (the producer key, CP7); duplicate key → `duplicate_evidence`, non-destructive (first wins).
- **Duplicate handling:** idempotent no-op accept-receipt; never double-create a candidate.
- **Fail closed when authenticity cannot be established:** unresolvable provenance/hash/version/attestation → reject with the appropriate code and create **nothing**. `applied_to_real_user=false`, `write_live=false` always.
- **Explicitly not designed/authorized:** consumer, network protocol, credential, live endpoint, flush, retry transport. Cosmile containment (CP10) must remain intact; C adds no consumer.

---

## 5. Accept/reject boundary — deterministic order + versioned taxonomy (C-FUTURE)

**Deterministic validation order (fail-closed, first failing gate wins; conservative-first, mirroring `[FND gate.py:59-95]`):**

1. schema/version (`unsupported_schema_version`, `environment_not_allowed`)
2. privacy/raw/PII default-deny (`raw_text_or_pii_present`, `privacy_scope_exceeded`) — reuse `[FND gate.py:40-55]` discipline
3. identity XOR + linking (`invalid_identity_xor`, `identity_link_forbidden`)
4. provenance/authenticity (`provenance_untrusted`) — §4
5. consent (`consent_missing`, `consent_revoked`, `consent_expired`)
6. reference completeness (`missing_purchase_item_ref`, `missing_product_ref`)
7. normalization/adverse consistency (`invalid_normalization`, `adverse_fields_inconsistent`)
8. lineage (`lineage_broken`, `evidence_retracted`)
9. duplication (`duplicate_evidence`)
10. retention/erasure (`retention_expired`)
11. policy eligibility → accept-for-review vs reject.

**Stable, versioned rejection taxonomy** = the 18 reserved codes already pinned on the producer side `[COS commerceEvidence.ts:48-53]`:
`unsupported_schema_version · environment_not_allowed · invalid_identity_xor · identity_link_forbidden · consent_missing · consent_revoked · consent_expired · privacy_scope_exceeded · raw_text_or_pii_present · missing_purchase_item_ref · missing_product_ref · duplicate_evidence · invalid_normalization · adverse_fields_inconsistent · lineage_broken · provenance_untrusted · evidence_retracted · retention_expired`.
**Implementation delta (§13/§1c):** these must be added to the Foundation reason enum-guard `_SAFE_DYNAMIC` set (or a dedicated C set) or they collapse to `cannot_determine` `[FND reason_codes.py]`. Reason codes must stay **category-level** (no value/identifier/field leak) per `[FND reason_codes.py:26-27]`.

---

## 6. Consent boundary (C-FUTURE)

- Feedback-storage consent (`same_service_purchase_feedback`) and cross-service evidence-use consent (`cross_service_commerce_evidence`) are **separate purposes** `[F7]`; C validates only the cross-service purpose on the envelope `[COS commerceEvidence.ts:87-92]`.
- **Login/`userId` is never consent** `[F7]` — already enforced producer-side (CP4).
- Fail closed on: `revoked`, `expired`, `missing`, purpose mismatch, notice-version mismatch. Effective consent = latest-`captured_at` append-only winner `[COS commerceEvidenceService.ts:44-54]`; observed expiry respected (no automatic TTL).
- C must confirm the envelope's `consent` block against provenance (§4) but must not itself store or broker consent; the consent ledger is Cosmile service-local `[FND api.py]` (Foundation is not a consent store).

## 7. Identity boundary (C-FUTURE)

- Identity linking **default OFF** `[F8]`; `identity_link_allowed:false` in every envelope `[COS commerceEvidence.ts:73]`. C rejects any envelope requesting a link (`identity_link_forbidden`).
- `subject_ref`/`anonymous_ref` remain **opaque** (`subj_v2_`/`anon_v3_`) `[COS ids.ts:84-100]`; Foundation **validates** subject-ref format/PII-freedom, does **not** mint or link `[FND api.py:34-39]`.
- **No destructive re-key; no silent retroactive linking** `[F8]`,`[F9]`. Anonymous evidence cannot enter the cross-service plane (guest rejected, CP3); a later exception is a new Founder decision (§13).

## 8. Lineage and lifecycle (C-FUTURE)

- **Append-only correction** (new evidence with `supersedes_evidence_id`); **retraction** + minimal tombstone (replay guard, no content/identity copy) `[COS schema.prisma:919-920,936-944]`; supersession is a single-successor graph (`@unique`).
- **Late/out-of-order evidence:** validated on `source_hash`/lineage, not arrival order; a correction whose target is not the current leaf → `lineage_broken`/`correction_target_not_current` (producer analog CP8).
- **Erasure boundary:** retraction/erasure removes evidence from candidate eligibility immediately; any legally retained record stays isolated from memory/ranking and stores only the minimal metadata `[F12]`,`[F/D3-A]`.
- **Non-prod retention representation only** `[F12]`: adverse → `adverse_regulatory_hold` with `retentionState:duration_unconfigured`; the hold **period must not be implemented or activated** until jurisdiction + legal role are confirmed (CP9). C represents the class; it does not set a duration.

## 9. Candidate boundary (C-FUTURE)

- **Only Foundation** may create a Foundation-owned `MemoryFactCandidate`/adverse candidate, and **only from accepted evidence** `[F6]`,`[FND contract.py:10-33]`. Cosmile candidate creation stays zero (RESOLVED_BY_FOUNDER_F4, M2-AB B1).
- **Three separate outcomes:** (a) envelope **accepted-for-review** (structural/policy valid), (b) candidate **eligible** (maps to a `MemoryCandidate` shape + passes `[FND gate.py]` — raw/PII deny, invariants, isolation, sensitivity/consent), (c) candidate **created** as `status=candidate` → `review_required` (no auto-approval `[FND learning_approval_workflow.py:40-57]`).
- **Mapping (C-FUTURE):** satisfaction → `memory_kind=outcome_feedback`; adverse → `memory_kind=safety_note`/`reaction` (sensitive, human-review; `severe`/`unknown` fail closed to human safety review). `created_from=feedback`/`commerce_event`; `raw_text_stored=false`; invariants `applied_to_real_user=false`,`write_live=false`.
- **Forbidden:** direct durable promotion, reuse, ranking mutation, safety downgrade; **satisfaction may never lower adverse severity/handling** `[F10]`. Reuse stays gated (`[FND reuse_gate.py]` — candidate not auto-reusable).

## 10. Response contract (data contract only, not delivery) (C-FUTURE)

- Minimal shapes: `RECEIPT{received:true, idempotency_key, decision_id}`; `ACCEPT{decision:accept_for_eligibility_review, decision_id, reason_codes:[], lineage_pointer:{root_evidence_id}, audit_correlation_id, candidate_outcome:{eligible:bool, created:bool, candidate_status?}}`; `REJECT{decision:reject, decision_id, reason_codes:[…category-level…]}`.
- Always stamp `applied_to_real_user=false`, `write_live=false` `[FND api.py:16-17]`.
- **No PII/raw-payload echo:** never return raw envelope, `subject_ref`/`purchase_item_ref` values, hashes, or payload; reason codes category-level only `[FND reason_codes.py]`. `decision_id`/`audit_correlation_id` are opaque.
- This is a data contract; **no transport/delivery is designed** (§4).

## 11. Rollback, kill switch, activation sequence (C-FUTURE)

- **Default OFF** (mirror `[FND contract.py:38-39]` flag pattern + `[COS commerceEvidenceService.ts:19-22]` production-always-false); shadow verification first; `memory_db_created=false` invariant `[FND api.py:31-32]`.
- **Version compatibility gate** before any activation; **fail-closed rollback** = revert to no-intake (envelopes remain queued in Cosmile's contained outbox, never consumed).
- **Evidence-replay constraints:** idempotency + tombstone prevent double-create on replay (§4/§8).
- **Metrics/audit gates:** accept/reject counts, candidate-eligible/created counts, zero-promotion assertion — all category-level.
- **HARD STOP:** a **new explicit Founder approval** is required before any consumer, delivery, intake activation, or candidate runtime connection `[F]`. C creates none of these.

## 12. Threat and misuse analysis (C-FUTURE)

| Threat | C mitigation (contract-level) |
|---|---|
| Forged provenance | `source.service` + `source_hash` recompute + (deferred) attestation §4; unverifiable → `provenance_untrusted`, create nothing |
| Consent laundering (userId⇒consent) | reject unless granted `cross_service_commerce_evidence` snapshot; `[F7]`, CP4 |
| Identity confusion / silent linking | `identity_link_forbidden`; opaque XOR; no re-key `[F8]`, §7 |
| Replay | idempotency key + tombstone; idempotent receipt §4/§8 |
| Correction/retraction evasion | append-only + single-successor `@unique` + tombstone replay guard §8 |
| Adverse-signal suppression | adverse-first normalization (satisfaction can't mask); `severe`/`unknown` → human review `[F10]`, CP6 |
| Cross-tenant leakage | cross-subject isolation `[FND gate.py:70-71]`; category-level reason codes `[FND reason_codes.py]` |
| Retention bypass | `retention_expired` reject; adverse hold isolated, duration unconfigured §8 |
| Unsupported version / downgrade | exact-match version negotiation; `unsupported_schema_version`; no implicit upgrade §3 |

## 13. Open decisions and residual risks

**Genuinely new decisions (must NOT be silently resolved):**
- **[FOUNDER/LEGAL]** `adverse_regulatory_hold` jurisdiction + legal role + retention duration — remains unimplemented/unactivated `[F12]`.
- **[SECURITY]** ingress authenticity mechanism/credential for source attestation (§4) — no credential/protocol designed here.
- **[FOUNDER]** any future exception allowing anonymous/guest evidence into the cross-service plane (§7).
- **[FOUNDER]** C implementation, delivery, intake activation, candidate runtime connection — all `NOT_AUTHORIZED` `[F]`.

**Implementation deltas (detail, not new policy):**
- Extend Foundation reason enum-guard with the 18 C codes (§5/§1c) `[FND reason_codes.py]`.
- Build the envelope→`MemoryCandidate` mapping (§9); do not overload `ingest_event_signal` (§1c).

## 14. Traceability (Founder constraint / pinned source → clause)

| Source | Clause |
|---|---|
| `[F3]` Cosmile owns normalization/envelope | §2, §3 · `[COS commerceEvidence.ts]` |
| `[F4]` no Cosmile candidate | §2, §9 · M2-AB B1 |
| `[F5]` Foundation validates eligibility only | §2, §5, §9 |
| `[F6]` Foundation owns candidate creation from accepted evidence | §9 · `[FND contract.py]` |
| `[F7]` separate consents; userId≠consent | §6 · CP4 |
| `[F8]` identity link default OFF | §7 · `[COS commerceEvidence.ts:73]` |
| `[F9]` append-only correction/retraction+tombstone | §8 · `[COS schema.prisma:936-944]` |
| `[F10]` satisfaction/adverse independent; safety not lowered | §3, §9, §12 · CP6 |
| `[F11]` adverse=static guidance; no diagnosis/report | §9 (human-review only) |
| `[F12]` retention non-prod; adverse hold gated on legal | §8, §11, §13 |
| No-transport/producer-only | §4, §11 · `[COS m2_ab_no_transport.mjs]` |
| No auto-promotion | §9 · `[FND learning_approval_workflow.py]`, `[FND reuse_gate.py]` |

## 15. Designer inputs + objective review criteria (C-FUTURE, no implementation/activation)

**Designer must turn into an implementation-ready C design:** the accept/reject state machine (§5) with the 18-code taxonomy; the envelope→`MemoryCandidate` mapping (§9) reusing `[FND gate.py]`/`learning_approval_workflow.py`; the provenance/replay contract (§4) without designing a credential; the response data contract (§10); rollback/kill-switch/activation sequence (§11); and the reason-guard extension (§1c/§5).

**Objective design-review pass criteria:**
1. C accepts exactly `commerce_evidence.v1`; every field has determined validation, nullability, and reject code; unknown version → `unsupported_schema_version`.
2. Validation order is deterministic and fail-closed; first failing gate wins; all reason codes category-level (no leak).
3. `userId`/login never implies consent; revoked/expired/missing/purpose/version mismatch fail closed.
4. Identity link default OFF; guest rejected cross-service; opaque refs; no re-key/silent linking.
5. Append-only correction; single-successor supersession; retraction tombstone + replay block; late evidence validated by hash/lineage not arrival.
6. Adverse-first: satisfaction can never lower severity/handling; `severe`/`unknown` → human safety review; adverse hold isolated, duration unconfigured.
7. Candidate creation only from accepted evidence, Foundation-owned, `status=candidate→review_required`, **zero** auto-promotion/reuse/ranking/safety mutation; zero Cosmile candidate writers.
8. No consumer/transport/credential/endpoint designed or activated; Cosmile containment (CP10) intact; flags OFF; `applied_to_real_user=false`/`write_live=false`; `memory_db_created=false`.
9. Every new Founder/legal/security decision (§13) is surfaced, not resolved.

---

## 16. Assertions and STOP state

```text
PRODUCT_REPO_WRITE = ZERO (FOUNDATION f6417004 · SIASIU e1830b45 · Cosmile f26fa5c HEADs + porcelain unchanged)
CONTROL_REPO_WRITE = ZERO (foundation-control c89b792 unchanged; porcelain sha256[:16] 2aa3ce93db703c50 pre==post)
FOUNDATION_DOCS_WRITE = only the 2 ALLOWED_WRITE files (result + pointer); NOT committed/pushed (Advisor publishes)
DB / SECRET / ENV / NETWORK / PROVIDER / TEST / FETCH / BRANCH = ZERO
NEW_AGENT_OR_SUBAGENT = ZERO · FOUNDER_DECISION_MADE = ZERO (open decisions surfaced only)
C_IMPLEMENTATION / DELIVERY / INTAKE_ACTIVATION / CANDIDATE_RUNTIME = NOT_AUTHORIZED, NONE_STARTED
PII / RAW_IDENTIFIER / SECRET / PAYLOAD_SAMPLE / REAL_DB_EVIDENCE in this result = ZERO

RESULT_TYPE: CONTRACT_ANALYSIS_INPUT_ONLY (not reviewed design, not implementation authority)
NEXT_ROUTE: foundation-advisor → Designer C implementation-ready design → independent C design review → HARD STOP → Leo/GPT
RETURN_TO: foundation-advisor
STOP
```
