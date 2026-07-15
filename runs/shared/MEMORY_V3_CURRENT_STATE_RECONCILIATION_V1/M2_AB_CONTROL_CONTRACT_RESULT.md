# M2 A/B — Foundation Control Cross-Project Contract Analysis

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-CONTROL-CONTRACT-ANALYSIS
ROLE: Control (subordinate architecture/contract coordinator)
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor
ACTUAL_MODEL: Opus 4.8 (1M context)
EFFORT: high
REQUIRED_SKILL_APPLIED: /fable-builder (anchor-first · contract→code mapping · proved/not-proved reporting; READ-ONLY analysis, no implementation)

RESULT_TYPE: CONTRACT_ANALYSIS_ONLY
  - This is NOT a reviewed design, NOT an implementation-ready design, and NOT implementation authority.
  - It is Control contract analysis input for a later Designer A/B implementation-ready design + independent design review.
  - No product/Control file was changed. No test/DB/secret/network/branch/commit/push.
```

## 0. Anchors, runtime, and Git evidence

**Live runtime (verified this pass):** actor/session `foundation-control`; workspace `/home/leo/Project/foundation-control`; model Opus 4.8 (1M); effort high; skill `/fable-builder` loaded. Matches handoff `26_M2_AB_CONTROL_CONTRACT_HANDOFF.md` requirements. No mismatch → no HOLD on runtime grounds.

**Git baselines (no fetch, read-only):**

| Workspace | Branch | HEAD (pre == post) | Dirt |
|---|---|---|---|
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | tracked-dirty=0; untracked=33 default porcelain (35 with `--untracked-files=all`), pre-existing/unchanged |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `f6417004d9157766b2b23d4d0870ade7f0c7fe96` | unchanged |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` | unchanged |
| Cosmile | `shadow/m4-cosmile-memory` | `6e44aa40ffb2960573839a01424761dc5e98d610` | unchanged (all source/schema evidence read at this HEAD) |
| foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` | `877c358b6231eaefd13bcef779c926ff63ac7a6c` | only the two ALLOWED_WRITE files added |

**Founder-decision anchors (read directly this pass):** `24_M2_FOUNDER_D1_D3_DECISION.md` (D1-A / D2-A / D3-A fixed) and `22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md` (verified-facts + recommended envelope shape + rejection-reason set). Role authority: `agent-office/docs/agent/roles/control.md` (read this pass) + `TEAM_OPERATING_MODEL.md` and Cosmile `AGENTS.md`/`CLAUDE.md` (read at M1 baseline). Cosmile security: `app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md` + `ENV_AND_MIGRATION_POLICY.md` (read this pass).

**Evidence discipline:** every normative clause below is tagged `[F#]` (Founder-fixed decision) or `[SRC file:line]` (direct source). Where a Founder rule conflicts with current code, it is recorded as `IMPL_DELTA` — code is not changed and the Founder decision is not reinterpreted.

---

## 1. Current code/schema truth and contradictions (evidence)

All paths under `Cosmile/app` at HEAD `6e44aa40`.

| # | Current fact | Evidence | Contract consequence |
|---|---|---|---|
| T1 | `RecommendationEvent.sessionId` is **NON-NULL** in schema and in both migrations. | `prisma/schema.prisma:834` (`sessionId String`); `prisma/migrations/00000000000000_init_postgres/migration.sql:683` and `.../20260706120000_v3_11b_learning_commerce_memory/migration.sql:11` (`"sessionId" TEXT NOT NULL`). TS type also non-null: `src/types/recommendationEvent.ts:18` (`session_id: string`). | **IMPL_DELTA-1** vs `[F: sessionId nullable]`. |
| T2 | The **only** runtime callsite mints `recommendationId` at **add-to-cart**, not at presentation, and passes `sessionId: null`. | `src/app/api/cart/items/route.ts:48-52` (`eventType:"recommendation_added_to_cart"`, `sessionId:null`); mint at `src/lib/recommendationEventService.ts:57` (`recommendationId()`). | **IMPL_DELTA-2** vs `[F: mint at first presentation]`; also the null write would violate the non-null column if the flag were ON (a latent fail-closed contradiction). |
| T3 | Feature is **flag-OFF / shadow-inert**; write path never runs by default. | `src/lib/recommendationEventService.ts:9,41-42` (`COSMILE_REC_EVENT_ENABLED`, default OFF, early return); no `.env` activation found. | The contradictions T1/T2 are currently latent, not live. |
| T4 | Pure `lastTouchAttribution` exists, is deterministic, ISO-safe, and has **no runtime caller**. | `src/lib/attribution.ts:13-37`; epoch parse with throw on non-ISO `:17-22`; returns `direct` / `session` / `organic`. | Attribution rule matches `[F: direct/session/organic]`; wiring is deferred. |
| T5 | Paid-outcome writer records **organic** outcomes with `recommendationId=null`; keyed by `orderItemId` (raw, Cosmile-local) with DB-level unique idempotency. | `src/lib/recOutcomeEventService.ts:47,76`, called from `src/app/api/checkout/mock-complete/route.ts:37`; `schema.prisma:846` (`recommendationId String?`), `:851` (`orderItemId`), `:858` (`@@unique([orderItemId])`). | Confirms the missing view→click→cart→purchase thread; `orderItemId` is internal-only and must not become the cross-service reference (see §4/§6). |
| T6 | Satisfaction/adverse enums are **closed and single-sourced** (F1/F2 already closed at M1-11A). | `src/types/recOutcome.ts:24-29` (`SEMANTIC_LABELS` 10 values incl. `usage_question_safety`, `adverse_skin_reaction`/`adverse_other` split); `:4` imports `AdverseSeverity`/`AdverseCertainty` from `lib/adverse` (no inline re-decl). | Envelope §6/§7 can reference these as the versioned normalization target. |
| T7 | `FoundationSignalOutbox` is a **pre-existing, write-only** producer with no consumer. | `schema.prisma:195-216` (status `pending·sent·failed·blocked·skipped`; `idempotencyKey @unique`; `privacyLevel`); producer `src/lib/foundationSignalMapper.ts:26,44-58`; called from `src/lib/commerceEventService.ts:58`. No sender/flush/intake client in `src/`. | Bounds §9 (contained outbox). |
| T8 | Outbox consent is **inferred from `userId`** — not a real consent check. | `src/lib/foundationSignalMapper.ts:30-31` (`privacyLevel = input.userId ? "user_consented" : "anonymous"`). | **IMPL_DELTA-3** vs `[F: login/userId never implies consent]`. |
| T9 | Outbox has **no purchase-item reference, no retention/expiry, no correction lineage**. | `schema.prisma:195-216` has no `orderId`/`orderItemId`/`expiresAt`/`retention`/`supersedes` columns. | §6/§8/§10 additive needs. |
| T10 | `ConsentRecord` and `SubjectRefMap.allowLink` exist but have **no runtime writer**. | `schema.prisma:881-893` (`state pending·granted·revoked·expired`), `:895-902` (`allowLink Boolean @default(false)`). | §8 must define the writers/state machine (design only). |
| T11 | A **service-local candidate gate** exists (`canCreateCandidate` / `canPromote`) and blocks `anon_v3_` from the memory layer and blocks promotion without consent. | `src/lib/memoryCandidate.ts:16-40` (`isMemorySubjectKeyAllowed` blocks `anon_v3_` `:21,31`; `canPromote` needs consent + non-anonymous `:36-39`). | Relevant to the boundary tension B1 (§2). |
| T12 | Two distinct outbound contracts coexist. | Existing reaction-signal contract v1.0 `Cosmile/설계자료/COSMILE_Foundation_Signal_Contract.md` (CommerceEvent-derived) **≠** the new `cosmile.commerce_evidence.v1` envelope from `[F/D2-A]`. | §3/§6 must keep them separate; the evidence envelope is the M2 A/B target, not the v1.0 signal. |

**Contradictions summary:** IMPL_DELTA-1 (sessionId non-null vs Founder nullable), IMPL_DELTA-2 (mint at cart vs at presentation), IMPL_DELTA-3 (consent-by-userId vs Founder consent separation). All three are latent behind flag-OFF; none is live.

---

## 2. Ownership matrix (Cosmile / Foundation / deferred)

| Concern | Owner | Authority | Evidence / basis |
|---|---|---|---|
| Recommendation lifecycle evidence (`RecommendationEvent`) | **Cosmile** | canonical for lifecycle | `[F2]`; `schema.prisma:829` |
| General operational/analytics ledger (`CommerceEvent`) | **Cosmile** | remains general ledger | `[F2]`; `commerceEventService.ts:29` |
| Closed-choice → evidence-envelope normalization (versioned, deterministic) | **Cosmile** | sole owner | `[F/D2-A]`; §6 |
| Satisfaction/adverse axes (separate) | **Cosmile** produces; safety semantics stay MAX | `[F10]`, `[F11]`; `recOutcome.ts:24-38` |
| Contained write-only outbox (producer only) | **Cosmile** | producer only, no consumer | `[F9]`; `foundationSignalMapper.ts` |
| Consent ledger + identity-link gate | **Cosmile** (service-local) | writers to be designed | `[F7]`,`[F8]`; `schema.prisma:881,895` |
| Evidence-envelope **eligibility validation** (accept/reject) | **Foundation** | validate only; not memory | `[F5]`; deferred to **C** |
| `MemoryFactCandidate` / adverse-candidate **creation** | **Foundation** | only under future C | `[F4]`,`[F6]` |
| Automatic memory promotion / reuse / ranking / safety mutation | **NONE (deferred/forbidden)** | HARD STOP | `[F]` global exclusions |
| Outbox consumer / flush / network delivery / Foundation intake | **DEFERRED (C, not authorized)** | HARD STOP before any | `[F]`; §9 |

**Boundary B1 — `RESOLVED_BY_FOUNDER_F4_FOR_A_B`:** Cosmile's schema contains a pre-existing **service-local** `MemoryFactCandidate` (`schema.prisma:777`) and `LongTermMemoryFact` (`:796`) plus candidate-gate logic (`memoryCandidate.ts`) from prior V3-11B design. That presence is a **current fact, not an unresolved authority question.** For this authorized A/B scope, Founder constraint `[F4]` is **decisive**: Cosmile must create neither `MemoryFactCandidate` nor an adverse candidate. Therefore **all A/B candidate-model writers and all calls to candidate creation or promotion are explicitly forbidden and must remain ZERO.** The pre-existing legacy/local model must **not** be destructively removed or re-keyed in this mission — it is left untouched and classified as **outside the A/B write scope**. Future **C** design may describe Foundation ownership of candidate creation `[F6]`, but no C runtime authority is created here. No new Designer/Founder decision is required for B1.

---

## 3. Canonical event taxonomy and producer-time mapping

**Two planes, one producer boundary, one idempotency key (`[F2]`, D1-A):**

- **General ledger plane** — `CommerceEvent` keeps all operational/analytics events (`commerceEventService.ts:29`). Product-card-only events remain here.
- **Recommendation-evidence plane** — `RecommendationEvent` receives only recommendation-lifecycle events, mapped at the **same producer moment** (dual-record, never reconstructed later from `CommerceEvent` history).

| Lifecycle stage | RecommendationEvent `eventType` | Current status | Target (A/B design) |
|---|---|---|---|
| creation / **presentation** | `recommendation_shown` | defined `types/recommendationEvent.ts:5`, **not emitted** | **ID origin** — mint `recommendationId` here (fixes IMPL_DELTA-2) |
| view | (product-card view via `CommerceEvent`) | ledger only | map to lifecycle only if it is a recommendation surface |
| click | `recommendation_clicked` | defined, not wired | propagate existing `recommendationId` |
| save | `recommendation_saved` | defined, not wired | propagate |
| dismiss | `recommendation_dismissed` | defined, not wired | propagate |
| cart | `recommendation_added_to_cart` | **only wired stage** (`cart/items/route.ts:48`) | propagate (stop minting here) |
| purchase | `RecOutcomeEvent` (order-item grain) | wired, organic-only, `recommendationId=null` (`recOutcomeEventService.ts`) | carry propagated `recommendationId` when present |

**Attribution rule (D1-A, already implemented as a pure function `attribution.ts`):** propagated `recommendationId` → `direct`; same-session match without the ID → `session` with `recommendationId=null`; otherwise → `organic`/`unattributed` with `recommendationId=null`. `unknown` also maps to `recommendationId=null` (`recOutcome.ts:6,11`).

---

## 4. Identity, sessionId, and purchase-item reference rules

- **`recommendationId`** `[F1]`: minted at first actual presentation; propagated through view/click/save/dismiss/cart and, when available, purchase evidence. Format is service-local opaque (`rec_v3_`+ULID, `schema.prisma:830`).
- **`sessionId`** `[F1]`: **nullable**, Cosmile-local **opaque** session reference; never a cross-service user identifier. → requires additive nullable correction of `schema.prisma:834` + both migrations (IMPL_DELTA-1). Absence must be explicit `null`, not a fabricated session.
- **subject / anonymous identity** `[SRC memoryCandidate.ts:21,31]`,`[F8]`: `subject_ref` XOR `anonymous_ref`; `anon_v3_` (commerce plane) must not enter the memory subject-key plane directly; identity linking OFF by default (`SubjectRefMap.allowLink=false`, `schema.prisma:899`).
- **purchase-item reference** `[F/D2-A recommendation]`: the cross-service envelope must carry a **random service-local opaque `purchase_item_ref`** — **not** the raw DB `orderItemId`. Cosmile's internal `RecOutcomeEvent.orderItemId` (`schema.prisma:851`) stays internal; it must be **mapped**, not exposed. (Security guardrail §2 forbids `order_id`/raw ids in Foundation-bound payloads.)

---

## 5. Deterministic idempotency and duplicate-aggregation prevention

- **One producer-time idempotency key** per recorded evidence; dual-recording uses the same deterministic key so the ledger and the recommendation plane cannot double-count `[F: no duplicate aggregation]`.
- Existing deterministic patterns to **reuse, not reinvent** (fable-builder core #4): outbox `idempotencyKey = cosmile_<eventId>_to_foundation_v1` (`foundationSignalMapper.ts:32`, `@unique` `schema.prisma:200`); purchase-outcome hard idempotency `@@unique([orderItemId])` (`schema.prisma:858`).
- **Idempotency-key inputs (design target):** `{ source_service, source_event_id, evidence_type, normalizer_version }` → stable opaque key; retries collapse (existing catch-on-duplicate `foundationSignalMapper.ts:59-61` is the containment precedent). No time-window aggregation; no reconstruction from history `[D1-A]`.

---

## 6. Versioned closed-choice normalization + minimal commerce-evidence envelope

**Owner: Cosmile** `[F3]`,`[F/D2-A]`. Deterministic, versioned table from closed UI controls → the envelope below. No raw text, embeddings, LLM, external provider, automatic candidate, ranking, or safety mutation `[F/D2-A]`.

Envelope `cosmile.commerce_evidence.v1` (design shape, from `22_...:187-233`; **distinct** from the v1.0 reaction-signal contract, T12):

```text
schema_version: cosmile.commerce_evidence.v1
evidence_id            (opaque immutable)
evidence_type          purchase_feedback | correction | retraction
source                 { service, environment: local|shadow, source_event_id, idempotency_key, occurred_at }
actor                  { subject_ref XOR anonymous_ref, identity_state, identity_link_allowed=false }
purchase               { purchase_item_ref (opaque, §4), product_ref, sku_ref?, purchase_state: paid }
feedback               { satisfaction: satisfied|neutral|dissatisfied|null,
                         adverse_type: skin_reaction|other|usage_safety|null,
                         adverse_severity: low|moderate|severe|null,
                         adverse_certainty: reported (repeated/verified require separate evidence) }
consent                { purpose, state: granted|revoked|expired|missing, notice_version, captured_at }
privacy                { raw_text_stored:false, contains_pii:false, retention_class }
lineage                { root_evidence_id, supersedes_evidence_id?, retracts_evidence_id?, normalizer_version, source_hash }
```

Normalization rules: satisfaction and adverse are separate axes and may not overwrite each other `[F10]`; no inference of `repeated`/`verified` from one report; **missing/contradictory/unmapped → fail closed with a reason code**. The satisfaction/adverse vocabularies are the already-closed `SEMANTIC_LABELS` (10) and `AdverseSeverity`/`AdverseCertainty` (`recOutcome.ts:24-38`) — reuse, do not redefine.

---

## 7. Satisfaction vs adverse axes and fail-closed invalid combinations

- Independent axes `[F10]`: satisfaction (`satisfied|neutral|dissatisfied|null`) and adverse (`adverse_type` + `adverse_severity` + `adverse_certainty`). **Satisfaction can never reduce adverse severity or safety handling** — safety is MAX / fail-closed (Constitution; `[F10]`,`[F11]`).
- Adverse response is limited to **pre-approved static guidance** (stop use, contact a healthcare provider); no diagnosis, no generated medical advice, no external regulatory reporting in M2 `[F11]`.
- **Fail-closed reject conditions** (envelope-invalid), stable reason codes `[F/D2-A `22_...:255-274`]`:
  `unsupported_schema_version · environment_not_allowed · invalid_identity_xor · identity_link_forbidden · consent_missing · consent_revoked · consent_expired · privacy_scope_exceeded · raw_text_or_pii_present · missing_purchase_item_ref · missing_product_ref · duplicate_evidence · invalid_normalization · adverse_fields_inconsistent · lineage_broken · provenance_untrusted · evidence_retracted · retention_expired`.
- Unknown/inconsistent adverse severity → fail closed to **human safety review** `[F/D3-A]`. These are the **Foundation-side** accept/reject semantics for the later **C** contract; A/B only produces the envelope and its Cosmile-local fail-closed normalization.

---

## 8. Consent, identity linking, lineage, correction/retraction, retention

- **Purpose-separated consent** `[F7]`,`[F/D3-A]`: two versioned purposes — `same_service_purchase_feedback` (Cosmile-local capture) and `cross_service_commerce_evidence` (eligibility to enter the contained outbox). Both start `missing/pending`; **login/`userId` never grants consent** (fixes IMPL_DELTA-3). Revocation immediately blocks new enqueue and makes non-required evidence ineligible.
- **Identity linking OFF by default** `[F8]`: `allowLink=false` (`schema.prisma:899`); link only after explicit user action + versioned identity-link consent. Cart/account merge is **not** evidence-link consent. Guest/anonymous evidence cannot enter the cross-service outbox in this pilot; any exception needs a **new** Founder decision.
- **Correction = append-only** `[F9]`,`[F/D3-A]`: new envelope with `supersedes_evidence_id`; never silent overwrite/destructive re-key.
- **Retraction** `[F9]`: retraction record + **minimal tombstone** (replay prevention); invalidates root + descendants for processing; never triggers memory/ranking/safety change. Reuse the existing tombstone/`must_not_reappear` gate precedent (`memoryCandidate.ts:25-26`).
- **Non-prod retention representation (design inputs only, not activated)** `[F12]`,`[F/D3-A]`: contained outbox pending/blocked ≤30d; non-adverse structured feedback ≤90d; minimal consent/idempotency/lineage/tombstone metadata ≤180d (no content, no raw identity). **Adverse → separate `adverse_regulatory_hold` class; the short TTL must not be applied and the hold period must not be implemented/activated until jurisdiction + legal role are confirmed.** Erasure/revocation removes evidence from eligibility immediately; any legally retained record stays isolated from memory/ranking and stores only what the legal purpose requires. (Security §2/§4: evidence = boolean/count/status; no PII/raw ids.)

---

## 9. Contained write-only outbox boundary

- **Producer only** `[F9]`,`[SRC foundationSignalMapper.ts:26,44-58]`: enqueue to `FoundationSignalOutbox`, status `pending`. **No consumer, no flush, no retry transport, no network, no Foundation intake.** Non-runtime smoke scripts that count/delete rows are test setup, not delivery consumers.
- **Flags OFF** — both `COSMILE_REC_EVENT_ENABLED` (`recommendationEventService.ts:9`) and the outbox path stay inert; outbox containment is independent of both flags (write-only queue with no consumer).
- **A/B corrections to the outbox model (additive):** add opaque `purchase_item_ref`, retention/expiry fields, and correction/lineage columns (§8), and replace the `userId`⇒consent inference with a real consent-state read (IMPL_DELTA-3). No consumer/sender may be added in A/B (HARD STOP `[F]`).

---

## 10. Additive local/non-prod/shadow schema + migration needs (A/B only)

Design-only; **no execution** (`DB_ACCESS: NO`, `TEST_EXECUTION: NO`). All changes **additive** and reversible:

1. `RecommendationEvent.sessionId` → **nullable** (schema `:834` + `init_postgres:683` + `v3_11b:11`). Additive/nullable relaxation (IMPL_DELTA-1). No historical backfill implied `[D1-A]`.
2. New evidence-envelope persistence (`cosmile.commerce_evidence.v1`, §6) as additive tables/columns; closed-enum CHECKs enforced in migration SQL (existing pattern, e.g. `schema.prisma:783,814-820`), not Prisma enums.
3. Consent-ledger writers + identity-link gate state (§8) — additive writers over existing `ConsentRecord`/`SubjectRefMap` (`:881,895`).
4. Outbox additive columns (§9): `purchase_item_ref`, retention/expiry, lineage.
5. **Rollback/rehearsal constraints** (`ENV_AND_MIGRATION_POLICY.md`): ephemeral local/shadow DB rehearsal + rollback verification only; secrets fail-closed when absent; no `.env`/secret creation, no prod DB, no rotation. Identity secrets are service-owned assets — migrations must preserve opaque-ref continuity (no re-key).

---

## 11. Explicit exclusions and STOP conditions

Preserved verbatim from `[F]` global exclusions: `NO_REAL_TARGET_DB · NO_PRODUCTION_OR_LIVE_ACTIVATION · NO_MAIN_OR_PROTECTED_BRANCH_MERGE · NO_SECRET_ACTIVATION · NO_PERSISTENT_FEATURE_FLAG_ACTIVATION · NO_OUTBOX_CONSUMER_OR_DELIVERY · NO_FOUNDATION_INTAKE · NO_C_RUNTIME_CONNECTION · NO_AUTOMATIC_MEMORY_PROMOTION · NO_RANKING_OR_SAFETY_MUTATION · NO_FULL_PACKAGE_1B_AUTHORITY`. **HARD STOP** applies before every C implementation, delivery, Foundation intake, candidate runtime connection, outbox consumer, or network path `[F]`.

---

## 12. Traceability — each Founder constraint → contract clause + evidence

| Founder constraint (`24_...`) | Contract clause | Evidence |
|---|---|---|
| F1 sessionId nullable/opaque; recommendationId at presentation, propagated | §3, §4, IMPL_DELTA-1/2 | `schema.prisma:834`; `cart/items/route.ts:48-52`; `attribution.ts` |
| F2 CommerceEvent=ledger; RecommendationEvent=canonical; producer-time idempotency | §3, §5 | `schema.prisma:829`; `commerceEventService.ts:29`; `foundationSignalMapper.ts:32` |
| F3 Cosmile owns versioned normalization | §6 | `recOutcome.ts:24-38` |
| F4 Cosmile must not create MemoryFactCandidate/adverse candidate | §2 (B1 RESOLVED_BY_FOUNDER_F4_FOR_A_B) | `schema.prisma:777`; `memoryCandidate.ts` |
| F5 Foundation validates eligibility only (future C) | §2, §7, §14 | `[F5]` deferred |
| F6 Foundation may own candidate creation (future C) | §2, §14 | `[F6]` deferred |
| F7 feedback vs cross-service consent separate; userId≠consent | §8, IMPL_DELTA-3 | `foundationSignalMapper.ts:30-31` |
| F8 identity linking OFF by default | §4, §8 | `schema.prisma:899` |
| F9 append-only correction; retraction+tombstone; no silent overwrite | §8, §9 | `memoryCandidate.ts:25-26` |
| F10 satisfaction/adverse independent; satisfaction can't lower safety | §7 | `recOutcome.ts:24-38` |
| F11 adverse=static guidance; no diagnosis/report | §7 | `[F11]` |
| F12 retention non-prod design inputs; adverse hold gated on legal | §8, §10 | `[F12]` |

---

## 13. Designer acceptance inputs + objective design-review criteria

**Designer inputs (from this analysis):** ownership matrix (§2), event taxonomy + producer-time mapping (§3), identity/sessionId/purchase-item rules (§4), idempotency inputs (§5), envelope v1 + closed-choice normalization (§6), axis separation + reject reasons (§7), consent/lineage/retention (§8), outbox containment (§9), additive migration + rollback constraints (§10), exclusions (§11).

**Objective design-review pass criteria:**
1. Every envelope field has a determined source, name, format, nullability, and propagation — no "connected in prose only."
2. IMPL_DELTA-1/2/3 each have an additive, reversible remediation with no historical backfill and no flag activation.
3. `purchase_item_ref` is opaque and mapped; raw `orderItemId`/`orderId` never appears in any Foundation-bound payload.
4. Satisfaction can never lower adverse severity/safety; unknown/contradictory adverse fails closed to human review.
5. Consent is purpose-separated; `userId`/login never implies consent; identity link default OFF requires explicit action + versioned consent.
6. Correction append-only; retraction leaves a minimal tombstone; no silent overwrite/re-key.
7. Outbox stays producer-only (no consumer/flush/retry/network/intake); flags OFF; additive-only schema; rollback rehearsal defined.
8. Adverse retention held behind jurisdiction/legal confirmation; no `adverse_regulatory_hold` period implemented.
9. B1 enforced per `[F4]` (`RESOLVED_BY_FOUNDER_F4_FOR_A_B`): **zero** Cosmile candidate-model writers and **zero** candidate creation/promotion calls in A/B; the pre-existing local model is left untouched and outside the A/B write scope.

---

## 14. C-boundary preview only (no C design, no C runtime authority)

For the later, separately-authorized **C** contract (Foundation side) the accept/reject surface must:

- **Accept only** a structurally + policy-valid `cosmile.commerce_evidence.v1` envelope, where `ACCEPT_FOR_ELIGIBILITY_REVIEW` means **only** structural/policy validity — **not** intake activation, candidate creation, promotion, reuse, ranking, or safety mutation `[F5]`.
- **Reject** using the stable reason set (§7) for unsupported version/environment, invalid identity XOR, invalid/missing/expired/revoked consent, retracted/expired evidence, duplicate idempotency, missing purchase-item/product ref, invalid normalization, raw text/PII, broken lineage/provenance, identity-link request, or inconsistent adverse fields.
- Reserve `MemoryFactCandidate`/adverse-candidate **creation** to Foundation `[F6]`, only from validated evidence, only after C design review + a **new** Founder approval.

**This work unit writes no C implementation design and grants no C runtime authority.** C implementation/delivery = `NOT_AUTHORIZED` `[24_...]`.

---

## 15. Assertions (zero-write / zero-side-effect)

```text
PRODUCT_REPO_WRITE = ZERO (FOUNDATION/SIASIU/Cosmile HEADs unchanged, tracked-dirty=0)
CONTROL_REPO_WRITE = ZERO (foundation-control HEAD c89b792 unchanged; untracked 33/35 pre-existing)
FOUNDATION_DOCS_WRITE = only the 2 ALLOWED_WRITE files (result + pointer)
DB_QUERY = ZERO · SECRET/ENV_ACCESS = ZERO · NETWORK/PROVIDER = ZERO · FETCH = ZERO
BRANCH_CREATE/SWITCH/MERGE = ZERO · COMMIT = ZERO · PUSH = ZERO
TEST_EXECUTION = NOT_RUN (TEST_EXECUTION: NO) · SAFETY_UNPROVEN by test (analysis only)
NEW_AGENT/SUBAGENT = ZERO · FOUNDER_DECISION_MADE = ZERO (B1 surfaced only)
PII / RAW_IDENTIFIER / SECRET / PAYLOAD_SAMPLE / REAL_DB_EVIDENCE in this result = ZERO
```

## 16. Return

```text
RESULT_TYPE: CONTRACT_ANALYSIS_ONLY (not reviewed design, not implementation authority)
IMPL_DELTAS: 3 (sessionId non-null; mint-at-cart; consent-by-userId) — all latent behind flag-OFF, recorded not fixed
B1: RESOLVED_BY_FOUNDER_F4_FOR_A_B — Cosmile candidate/adverse-candidate creation and all candidate creation/promotion calls forbidden in A/B (writers must remain ZERO); pre-existing local model left untouched, outside A/B write scope; no new Designer/Founder decision required
NEXT_ROUTE: foundation-advisor → Designer A/B implementation-ready design → independent A/B design review
NOT_AUTHORIZED: A/B implementation, C design/impl, Package 1B, Foundation intake, outbox consumer, flag/live activation
RETURN_TO: foundation-advisor
STOP
```
