# Cosmile Independent Assessment — V3 Package 1A Frozen Unknowns U-01..U-09

Actor: Cosmile Worker · Mode: `DISCOVERY_ONLY_READ_ONLY` (blind first pass) · Date: 2026-07-10 · Return to: Advisor.

Register verified before start: freeze commit `fab82c45f7e92ed2652dc6de9db55532fabb661b` (ancestor of origin/main), blob `0eac3e290269c5154029d79864b99c9235807013`, SHA-256 `dab0ffa15452db860d3ba6f71b58401d4447e81b811c22c3c4a87a379f26e0cb` — all exact matches; register unedited.

Evidence base: Cosmile repo `shadow/m4-cosmile-memory` @ `e4ed6680fee2a2e55117fb406cae8714e3680465` (clean non-doc worktree). Evidence classes used: **[CODE]** current code, **[SCHEMA]** Prisma schema/migration, **[DESIGN]** current canonical design, **[HIST]** historical report, **[TEST]** test evidence, **[UNVERIFIED]** runtime/prod state not verifiable from repo. No DB, secret, env value, production, or live model was accessed. No Advisor / Foundation Worker / Fable5 first-pass assessment was read (independence maintained).

Perspective note: I am the Cosmile Worker who implemented V3-11C2/D-O1 in this repo; assessments below rely on fresh re-verification of current files, not memory.

---

## U-01 FEEDBACK INPUT REALITY

**COSMILE_POSITION:** The register's current-path absence is confirmed and slightly understated: Cosmile today has **zero** post-purchase feedback input of any kind (no route, no UI control, no model writer), and the only raw-text entry (consultation) is structurally pre-/non-purchase — it carries no order/OrderItem context at all, so consultation text cannot currently even be *linked* to a purchase, let alone validated as post-use outcome evidence. The realistic first product surface, if Leo ever selects one, is the existing order-detail line-item list (each OrderItem already rendered with product identity), because it is the only place where explicit user-selected OrderItem linkage is naturally available; this is a feasibility observation, not a policy selection.

**DIRECT_EVIDENCE:**
- [CODE] No feedback/review/rating/survey/return route: `find src/app/api -type d` matches none (only `console/foundation/context-preview` matches the pattern by accident of the word "preview"). Full route inventory re-confirmed.
- [CODE] Order UI has no feedback control: `grep -riE "review|rating|feedback|survey|후기|별점|만족" src/app/orders/` → none.
- [CODE] `RecOutcomeFeedback` has **no writer**: only the type definition `src/types/recOutcome.ts:31` and a prohibition comment `src/lib/recOutcomeEventService.ts:2`; no `prisma.recOutcomeFeedback` call anywhere in `src/`.
- [CODE] Consultation raw-text entry: `src/components/slice/ConsultationInputBar.tsx` → `src/app/api/slice/consult-foundation/route.ts:34` (`body?.message`) → `src/adapters/cosmileSemanticAdapter.ts:37` (`raw_text: maskPii(...)`). No `orderItem`/`OrderItem` token anywhere in the consultation flow (`grep` over consult route, slice components, `consultationMeta` → none).
- [CODE] Consultation meta routes accept **no raw text field at all**: `meta/start/route.ts` ("대화 원문 받는 필드 없음 — source(화이트리스트)만"), `meta/mention/route.ts:7` ("productId만(원문 ❌)"), `meta/end` stores `intentTypes` whitelist.
- [SCHEMA] `RecOutcomeFeedback` table exists with CHECKs (migration `20260706120000_v3_11b.../migration.sql:50-63`) — a sink with no source.
- [CODE] Order detail renders per-OrderItem lines with product identity: `src/app/orders/[orderId]/page.tsx:33-39` (`order.items.map`, `productNameSnapshot`, link to `/products/{productId}`).

**FACTS:** Input path today = none. Consultation text is order-context-free by construction. The schema sink exists; the DB CHECKs (semanticLabel 10-value, severity, certainty) are enforced but unreachable.
**ASSUMPTIONS:** That the order-detail page would remain the natural explicit-linkage anchor under any future design (surface exists today; its suitability for feedback UX is untested).
**MISSING_EVIDENCE:** Founder-selected mode/timing; any evidence users would submit any signal type (no analytics exist on hypothetical prompts); an approved provenance rule; evidence distinguishing consultation intent (pre-purchase) from outcome (post-use) — nothing in the repo can supply this.
**RESOLUTION_TYPE:** EVIDENCE_RESOLVABLE (path absence — already resolved here) + LEO_PRODUCT_DECISION_REQUIRED (mode/timing) + EXPERIMENT_REQUIRED (submission behavior).
**CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION:** Path absence: yes (done). User behavior/value: no.
**REQUIRES_EXPERIMENT:** Yes — completion rate, signal quality, selection bias.
**REQUIRES_LEGAL_OR_POLICY_REVIEW:** Not for path reality; yes downstream (see U-03/U-05).
**REQUIRES_LEO_PRODUCT_DECISION:** Yes — input mode, timing, and whether consultation follow-up is ever a product feature.
**SAFE_DEFAULT:** Agree with register: collect nothing, write no `RecOutcomeFeedback`, never treat consultation text as outcome evidence. Additionally: do not add *any* free-text field to order surfaces before U-03/U-05 lineage decisions, because Cosmile's generic event ingestion already persists free text (see U-05 fact 4) and a feedback text box would multiply that surface.
**REVERSIBILITY:** High now (nothing collected). Note the schema sink is already deployed shape — changing the input model later may force migration/backfill of an empty-but-live table (cheap) or a shape rewrite (moderate).
**COST_IF_WRONG:** Register list confirmed; from the commerce side the dominant cost is trust damage from a low-quality prompt UX plus rework of order-page UI and the C2-adjacent contract.
**CONFIDENCE:** HIGH on absence (directly enumerated); LOW on future behavior.

## U-02 SEMANTIC CLASSIFICATION RELIABILITY

**COSMILE_POSITION:** From the commerce side the register is correct, and one Cosmile-specific constraint should be explicit: Cosmile is constitutionally barred from performing the semantic classification itself (meaning belongs to Foundation), so *any* reliability plan that quietly lands a classifier in Cosmile route code violates the active boundary. Cosmile's role is limited to transporting structured labels and enforcing deterministic DB/typed constraints — which already exist and are the only currently proven layer.
**DIRECT_EVIDENCE:**
- [CODE] Boundary: `src/adapters/cosmileSemanticAdapter.ts:2-3` ("Cosmile은 raw text 의미를 최종 확정하지 않는다"); app constitution `app/CLAUDE.md` (no fine-tuning/ML classifier in Cosmile).
- [SCHEMA] Ten-label + nullable severity/certainty enforced by DB CHECK (`migration.sql:59-61`); typed enums `src/types/recOutcome.ts:24-29`, `src/lib/adverse.ts` (severity/certainty canonical import).
- [TEST] Enum/CHECK behavior proven by fixtures (`scripts/v3_11.vitest.ts`, `scripts/v3_11b_db_integration.dbtest.py` DB2a-DB2f); nothing tests mixed/sarcastic/multilingual real input — confirmed by reading the test files' scope.
**FACTS:** The only reliability currently provable in Cosmile is "invalid labels cannot be stored." Mixed-statement representation ("stinging but effective") has no representation today: one required `semanticLabel` + optional adverse fields *can* encode adverse+positive only if the label choice rule exists — no such rule exists anywhere in Cosmile.
**ASSUMPTIONS:** Multi-axis representation likely needs additive schema (e.g., separate positive/adverse axes) — flagged as possible future migration, not designed here.
**MISSING_EVIDENCE:** Everything the register lists; nothing in Cosmile can substitute.
**RESOLUTION_TYPE:** EVIDENCE_RESOLVABLE (capability inventory) + EXPERIMENT_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE.
**CAN_RESOLVE_WITH_TECHNICAL_VERIFICATION:** Only the storage-constraint layer (already verified).
**REQUIRES_EXPERIMENT:** Yes (calibration corpus; outside Cosmile scope to build).
**REQUIRES_LEGAL_OR_POLICY_REVIEW:** Indirectly (adverse-report handling touches health-adjacent claims).
**REQUIRES_LEO_PRODUCT_DECISION:** Yes (input mode precedes any corpus design).
**SAFE_DEFAULT:** Agree with register; add: single-label writes that force a mixed statement into one optimistic label must be rejected at the contract level, not resolved by Cosmile-side keyword logic (heuristic prohibition is an active repo rule).
**REVERSIBILITY:** Medium (labels observation-only + versioned); the DB CHECK set makes label-set changes a migration, not a config change.
**COST_IF_WRONG:** Register list; commerce-specific addition: a wrong optimistic label attached to a purchase line poisons exactly the summary-row (`RecOutcomeEvent`)-adjacent learning the C2 design protects.
**CONFIDENCE:** HIGH that Cosmile-side proof stops at storage constraints.

## U-03 RETENTION / ERASURE / DATA LINEAGE

**COSMILE_POSITION:** Confirmed unresolved, and the Cosmile-side lineage is wider than the register's list: any feedback lineage must also cover `CommerceEvent.propertiesJson` (free-form JSON, persisted), the M4 memory-governance overlay columns (present in schema on `CommerceEvent`/`Order` but explicitly **NOT migrated** — a schema/DB drift trap for any lineage inventory), and `ConsentRecord`, which exists as a table with **no runtime writer**, meaning no consent state could even be recorded today.
**DIRECT_EVIDENCE:**
- [SCHEMA] `CommerceEvent` governance overlay columns with "NOT migrated·WATCH-2" annotation (`prisma/schema.prisma` model CommerceEvent, memory* columns); same overlay on `Order`.
- [SCHEMA+CODE] `ConsentRecord` model (`schema.prisma:881`, states pending/granted/revoked/expired) — `grep -rn consentRecord src/` → **no writer**.
- [CODE] Deletion/erasure surfaces: none in runtime (`grep -riE "erasure|tombstone|memoryDeleted" src/` → only pure-logic `memoryCandidate.ts`); tombstone/must-not-reappear/`canPromote(consent)` exist as **unwired pure functions** (`src/lib/memoryCandidate.ts:15-38`).
- [CODE] Foundation-facing outbox rows persist with status `pending` and no flush worker (`src/lib/foundationSignalMapper.ts:56`), so any future feedback-derived signal would sit in a Cosmile table that deletion must also cover.
- [DESIGN] R-2 unresolved and a hard blocker before flag-ON/operational use (`COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`).
**FACTS:** No end-to-end deletion path exists or is designed; the derivative set already identifiable in Cosmile alone = {RecOutcomeFeedback, RecOutcomeEvent, MemoryFactCandidate, CommerceEvent(+propertiesJson), FoundationSignalOutbox rows, ConsentRecord}, plus logs/backups [UNVERIFIED].
**ASSUMPTIONS:** Backup/log deletion capability is a deployment property — cannot be assessed from repo.
**MISSING_EVIDENCE:** Register list + the un-migrated overlay reconciliation + jurisdiction/legal basis (not derivable from repo).
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (lineage inventory — partially produced above) + LEGAL_OR_POLICY_REVIEW_REQUIRED (yes) + LEO_PRODUCT_DECISION_REQUIRED (yes: promises, tombstone semantics) + IRREDUCIBLE_BEFORE_LIVE_USE (yes). Technical verification alone: no. Experiment: not primarily.
**SAFE_DEFAULT:** Agree with register; add: do not migrate/populate the M4 overlay columns as a side effect of any feedback work — they are governance columns whose semantics belong to the unresolved policy.
**REVERSIBILITY:** High while writes disabled; the un-migrated overlay is itself a latent irreversibility trap (populating it before policy exists creates data whose meaning was never decided).
**COST_IF_WRONG:** Register list confirmed.
**CONFIDENCE:** HIGH that lineage is incomplete; the Cosmile-side derivative inventory above is directly evidenced.

## U-04 GUEST-TO-LOGIN IDENTITY SAFETY

**COSMILE_POSITION:** Two facts materially sharpen the register. (1) **Commerce-level guest-to-login linking already happens today**: on mock-login, `mergeCurrentGuestIntoUser` merges the guest cart+wishlist into the user and writes a `cart_merged` CommerceEvent that intentionally records **both** guestId and userId ("guestId↔userId 링크 보존") — so "no linking" as a Package 1 default must either carve out or explicitly supersede an existing, running linking behavior; the linkage join already exists in event data. (2) **Current auth is a single hardcoded mock user**: every "logged-in" action in the current runtime is `MOCK_USER.id`; there is no real multi-user login, so no current runtime evidence can validate stitching safety, false-link rates, or shared-device behavior — those require real auth first.
**DIRECT_EVIDENCE:**
- [CODE] `src/lib/mergeGuest.ts:8-20` (merge + `cart_merged` event with both ids, guest events preserved); invoked from `src/app/api/auth/mock-login/route.ts:4` and `src/app/api/cart/merge-guest-cart/route.ts:2`.
- [CODE] `src/lib/shopper.ts:14-16`: logged-in ⇒ constant `MOCK_USER.id`; guest ⇒ `cosmile_gid` cookie.
- [CODE] Guest id = random 16-byte hex, httpOnly, minted by mock-logout (`src/app/api/auth/mock-logout/route.ts:12`) — device/browser-scoped, shared-device users share it until logout re-mints.
- [CODE] C2 writer strict XOR: both-or-neither identity ⇒ `xor_violation`, no write (`src/lib/recOutcomeEventService.ts` + TC5/6); DB XOR CHECK (`migration.sql:42`).
- [SCHEMA+CODE] `SubjectRefMap.allowLink` default `false` (`schema.prisma:899`) with **no runtime consumer** (`grep -rn allowLink src/` → none) — the pre-consent gate exists only as data shape.
- [CODE] Separate HMAC mints for subjectRef vs anonymousRef (`src/lib/ids.ts:30-45`), no cross-derivation.
**FACTS:** Memory-layer stitching: none (register correct). Commerce-layer linking: already live at login (cart/wishlist/event). Identity realism: mock-single-user.
**ASSUMPTIONS:** The httpOnly random gid is not guessable; shared-device risk is real (same gid until logout re-mint) — [UNVERIFIED] beyond code reading.
**MISSING_EVIDENCE:** Register list + a decision on whether the existing `cart_merged` guest↔user join row is itself in scope of the stitching policy (it is a persisted identity link usable for later joins).
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (mechanics — documented here) + LEGAL_OR_POLICY_REVIEW_REQUIRED (yes) + LEO_PRODUCT_DECISION_REQUIRED (yes) + IRREDUCIBLE_BEFORE_LIVE_USE (yes, for automatic linkage). Experiment: yes (wrong-account recovery), only after real auth exists.
**SAFE_DEFAULT:** Agree with register (no stitch/re-key/infer; XOR ambiguity ⇒ no learning write — already enforced in C2), with one sharpening: freeze the *scope* of the existing cart-merge link (commerce convenience only; never a memory/feedback join key) until the policy decision, and treat the mock-auth reality as a blocker on any identity-evidence claim.
**REVERSIBILITY:** High for no-linking; the `cart_merged` both-id rows are already persisted — reversing that precedent later means an event-data policy decision, not just a code change.
**COST_IF_WRONG:** Register list confirmed; shared-device misattribution of health-adjacent feedback is the worst case.
**CONFIDENCE:** HIGH on mechanics (directly read); HIGH that automatic safe linkage is unproven; the mock-auth fact makes any near-term identity pilot unrepresentative.

## U-05 RAW-TEXT NON-PERSISTENCE REALITY

**COSMILE_POSITION:** Register correct on the Foundation-side unknowns; the Cosmile side adds three directly-evidenced facts. (1) Cosmile's own consultation persistence is deliberately hash/whitelist-only **and unwired**: `ConversationMessage` stores `contentHash` (keyed HMAC, "원문 미저장") and has no writer; meta routes accept no raw-text field. (2) Cosmile masking is narrow: `maskPii` covers email + one KR phone pattern + 1000-char cap only (`cosmileSemanticAdapter.ts:13-17`) — names, addresses, order numbers, health details pass through to Foundation transport. (3) **A live Cosmile-side free-text persistence surface exists today**: `POST /api/events` forwards client-supplied `properties` into persisted `CommerceEvent.propertiesJson` with only the `SENSITIVE_KEYS` scrub — and that list (`src/types/commerceEvent.ts:61-64`) does **not** include generic free-text keys (`message`, `query`, `note`, `text`), so arbitrary client free text can persist in Cosmile today regardless of Foundation-side guarantees.
**DIRECT_EVIDENCE:**
- [CODE] `/api/events` route body (whitelist eventType, server-derived user, `properties` passed through) `src/app/api/events/route.ts:23-33`; sanitize = `SENSITIVE_KEYS` only (`src/lib/commerceEventService.ts:11-13,51`).
- [CODE] `SENSITIVE_KEYS` exact contents `src/types/commerceEvent.ts:61-64` (password/token/apiKey/cardNumber/cvv/phone/email/address/shippingAddress/paymentId/rawHealthNote/rawSkinConditionNote — no message/query/text).
- [CODE] `maskPii` scope `src/adapters/cosmileSemanticAdapter.ts:13-17`; transport claim "raw_text는 Foundation이 durable 저장 안 함(서버 불변식)" is a **comment**, not Cosmile-verifiable ([UNVERIFIED] beyond repo).
- [SCHEMA+CODE] `ConversationMessage.contentHash` design + no writer (model at `schema.prisma:750`; `grep` → none).
**FACTS:** As above. Foundation/provider/infra retention: [UNVERIFIED] from this repo, by design of the mission.
**ASSUMPTIONS:** None converted to fact; the "no durable store" server invariant is treated as a claim requiring Foundation-side/deployment evidence.
**MISSING_EVIDENCE:** Register list + a decision covering the Cosmile-side `/api/events` ingestion surface in any raw-text lineage policy (see Addendum A-C3).
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (surface inventory — Cosmile portion produced here) + LEGAL_OR_POLICY_REVIEW_REQUIRED (yes) + IRREDUCIBLE_BEFORE_LIVE_USE (yes). Technical verification: partial (repo surfaces yes; deployment/provider no). Experiment: synthetic canary only.
**REQUIRES_LEO_PRODUCT_DECISION:** Indirect (what non-persistence promise the product makes).
**SAFE_DEFAULT:** Agree with register; add Cosmile-side: close or policy-cover the `/api/events` free-text pass-through before any feedback feature increases free-text volume (a Phase-4-style server-side value-scan was already identified in event-tracking work as the fix path — not implemented, not authorized here).
**REVERSIBILITY:** Medium before live feedback; text already persisted via `/api/events` would need lineage cleanup.
**COST_IF_WRONG:** Register list; PII/security incident is the dominant Cosmile-side risk.
**CONFIDENCE:** HIGH on Cosmile repo surfaces (directly enumerated); LOW end-to-end (out of repo scope).

## U-06 PRODUCT VALUE / LEARNING VALUE

**COSMILE_POSITION:** Register confirmed, with commerce-side precision: the only outcome data Cosmile can produce today is the C2 **organic** purchase summary (recommendationId=null, attributionMode=organic, flag OFF) — by DB CHECK R-K2 it is *structurally impossible* to present it as recommendation performance, which is the correct guard. Instrumentation primitives for a future pilot partially exist (`CommerceEvent.environment` + `isTest` for cohort separation; event whitelist; server-derived identity), but no baseline KPI, no exposure/impression denominators for feedback prompts, and — decisively — the single-mock-user auth makes any current sample non-representative (selection bias cannot even be measured when every login is the same user).
**DIRECT_EVIDENCE:**
- [CODE+SCHEMA] R-K2 CHECK (`migration.sql:43`) + organic-only writer (`recOutcomeEventService.ts`), flag default OFF (`:11,53`).
- [SCHEMA] `CommerceEvent.environment` default development + `isTest` exclusion flag (model CommerceEvent).
- [CODE] No KPI/baseline/uplift/stop-threshold artifact anywhere in `src/` or `scripts/` (checked analytics scripts inventory; they aggregate events, none defines a recommendation baseline).
- [CODE] Mock single-user auth (`shopper.ts:15`) — see U-04.
**FACTS/ASSUMPTIONS/MISSING_EVIDENCE:** As register; nothing in repo supplies value evidence.
**RESOLUTION_TYPE / flags:** EXPERIMENT_REQUIRED (primary) + LEO_PRODUCT_DECISION_REQUIRED (value hypothesis) + IRREDUCIBLE_BEFORE_LIVE_USE. Technical verification alone: no. Legal review: no (for value itself).
**SAFE_DEFAULT:** Agree; add: any pilot instrumentation must ride the existing CommerceEvent whitelist path (typed event + isTest/environment separation), not a new side channel.
**REVERSIBILITY:** High for observation-only; the moment labels touch ranking or memory promotion it drops to low (promotion gates in `memoryCandidate.ts` are pure logic today — keeping them unwired is the reversibility guarantee).
**COST_IF_WRONG:** Register list confirmed; low-value investment is the most probable cost.
**CONFIDENCE:** HIGH that value is unproven; HIGH that current runtime cannot host a representative pilot (mock auth).

## U-07 FOUNDATION SIGNAL WHITELIST OWNERSHIP AND VERSIONING

**COSMILE_POSITION:** Register confirmed with a sharpened producer-side fact: the current draft mapper hard-codes exactly the consent assumption the register worries about — "MVP: userId 있으면 user_consented 가정(실제는 consent 확인 필요)" (`foundationSignalMapper.ts:30-31`) — while `ConsentRecord` (the table that could hold real consent) has **no writer**. So today the producer's privacy field is an assumption with no data behind it. Outbox rows are write-only (`status: "pending"`, no flush worker), which is what keeps this safe.
**DIRECT_EVIDENCE:** [CODE] `src/lib/foundationSignalMapper.ts:30-31,56`; single referencing module (`grep -l foundationSignalOutbox src` → mapper only); [SCHEMA+CODE] `ConsentRecord` no writer; [DESIGN] R-1 gate unresolved (`COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`); [CODE] contract doc exists in repo (`설계자료/COSMILE_Foundation_Signal_Contract.md` referenced from app CLAUDE.md) — a document, not an owned versioned contract.
**FACTS:** Producer reality = draft mapper, subset coverage, assumed consent, dead-letter-free pending queue, no consumer.
**MISSING_EVIDENCE:** Register list; ownership/approval model is not derivable from repo.
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (producer reality — documented here) + LEO_PRODUCT_DECISION_REQUIRED (ownership). Experiment: no. Legal: consent-enforcement authority yes.
**SAFE_DEFAULT:** Agree (no expansion, no flush); add: the consent-assumption line must be treated as a known defect to be replaced by real `ConsentRecord` state under whatever contract is chosen — never carried into a flush implementation.
**REVERSIBILITY:** High (pending rows only, no consumer).
**COST_IF_WRONG:** Register list confirmed.
**CONFIDENCE:** HIGH.

## U-08 FEEDBACK PROVENANCE, ORDER-ITEM LINKAGE, AND CONTRACT SHAPE

**COSMILE_POSITION:** Register confirmed; Cosmile's actual identity surfaces make explicit linkage feasible and inference unnecessary: the order-detail page already renders per-OrderItem rows (id-addressable), so a future explicit "which item is this about" selection is a natural UI capability — while **no** current path could legitimately infer an OrderItem (consultation has zero order context; sessions are meta-only whitelists). Trace anchors that already exist and could carry provenance additively: `CommerceEvent.id` (+orderId/canonicalProductId/sessionId columns), `RecOutcomeEvent.orderItemId` (unique summary row), `FoundationSignalOutbox.sourceEventId`. The current `RecOutcomeFeedback` shape has **no** source/provenance fields at all (only feedbackId/orderItemId/recommendationId/semantic/adverse/createdAt) — narrower than the historical V3-04 proposal, so trusting it would currently rest entirely on the unbuilt writer's discipline.
**DIRECT_EVIDENCE:** [SCHEMA] `RecOutcomeFeedback` field set (`schema.prisma:862-871`); [HIST] V3-04 wider proposal (register-cited; matches `types/recOutcome.ts` comments); [CODE] order-detail OrderItem rendering (`orders/[orderId]/page.tsx:33-39`); consultation zero-order-context (U-01 evidence); [SCHEMA] anchors: CommerceEvent columns, `RecOutcomeEvent_orderItemId_key` (D-O1), outbox `sourceEventId` (`schema.prisma` model FoundationSignalOutbox).
**FACTS/ASSUMPTIONS:** As above; assumption that provenance can be additive (new columns/table) without disturbing the C2 summary-row invariant — consistent with the approved summary/event split direction, but not designed here.
**MISSING_EVIDENCE:** Register list (selection/authorization UX, dedup identity, correction linkage, cardinality, source-type decisions).
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (surfaces mapped here) + LEO_PRODUCT_DECISION_REQUIRED (source types, UX) + EXPERIMENT_REQUIRED (selection behavior). Legal: no (directly).
**SAFE_DEFAULT:** Agree: no writes; reject ambiguous linkage; never infer OrderItem from recency/session — and note the repo's own anti-heuristic rule independently forbids the recency-inference shortcut.
**REVERSIBILITY:** High pre-write; provenance added later to already-written rows is reconstruction, i.e., effectively lost.
**COST_IF_WRONG:** Register list confirmed; wrong-line attribution is identity/data corruption in the exact table D-O1 just hardened.
**CONFIDENCE:** HIGH (schema/UI surfaces directly read).

## U-09 SAFETY RESPONSE, LEARNING, AND CORRECTION BOUNDARY

**COSMILE_POSITION:** Register confirmed. Commerce-side boundaries that already exist and should anchor any future policy: (1) consultation surface enforcement is fail-closed and suppression-first (block/safety ⇒ products/CTA/recommendations forced to zero — `consultationRiskGate.ts`, `cosmileResponseAdapter` suppression), so an adverse *feedback* response could reuse the same deterministic-gate pattern *for display suppression only* without Cosmile ever judging causality; (2) durable-learning gates already require consent and forbid anonymous promotion (`memoryCandidate.ts:36-38` `canPromote`) and enforce tombstone/must-not-reappear pre-checks (`:15-26`) — but all of it is unwired pure logic, so no learning action can occur today; (3) there is no correction/retraction path anywhere (no route, no service), consistent with the register.
**DIRECT_EVIDENCE:** [CODE] `src/lib/foundation/consultationRiskGate.ts:11-36`; `src/adapters/cosmileResponseAdapter.ts` (enforceResponseSuppression); `src/lib/memoryCandidate.ts:15-38`; correction path: `grep -riE "retract|correction|withdraw" src/` → none.
**FACTS:** Immediate-response machinery (suppression) exists for consultation only; learning machinery exists as gated pure logic only; feedback semantic contract absent (U-02).
**ASSUMPTIONS:** The consultation suppression pattern generalizes to feedback display handling — plausible, undesigned.
**MISSING_EVIDENCE:** Register list (product-approved immediate behavior, human-review ownership, correction propagation, calibration).
**RESOLUTION_TYPE / flags:** EVIDENCE_RESOLVABLE (boundary inventory — done) + EXPERIMENT_REQUIRED + LEGAL_OR_POLICY_REVIEW_REQUIRED + LEO_PRODUCT_DECISION_REQUIRED + IRREDUCIBLE_BEFORE_LIVE_USE — all as register.
**SAFE_DEFAULT:** Agree; commerce-side sharpening: adverse feedback may at most trigger conservative, non-diagnostic display behavior via the existing deterministic-suppression pattern (Foundation-decided, Cosmile-displayed); zero learning writes; contradictions never auto-erase a safety state (matches `must_not_reappear` semantics already encoded in the unwired gate).
**REVERSIBILITY / COST_IF_WRONG / CONFIDENCE:** As register (medium/low; full cost list; HIGH separation-needed, LOW final workflow).

---

## Files read (Cosmile evidence set, all at `e4ed668`)
`src/lib/shopper.ts` · `src/lib/mergeGuest.ts` · `src/lib/ids.ts` · `src/lib/recOutcomeEventService.ts` · `src/lib/commerceEventService.ts` · `src/lib/foundationSignalMapper.ts` · `src/lib/memoryCandidate.ts` · `src/lib/foundation/consultationRiskGate.ts` · `src/adapters/cosmileSemanticAdapter.ts` · `src/app/api/events/route.ts` · `src/app/api/auth/mock-login|mock-logout/route.ts` · `src/app/api/cart/merge-guest-cart/route.ts` · `src/app/api/consultation/meta/{start,mention,end}/route.ts` · `src/app/api/slice/consult-foundation/route.ts` · `src/app/orders/[orderId]/page.tsx` · `src/types/recOutcome.ts` · `src/types/commerceEvent.ts` · `prisma/schema.prisma` (CommerceEvent/ConsentRecord/ConversationMessage/RecOutcome*/SubjectRefMap) · `prisma/migrations/20260706120000_v3_11b_.../migration.sql` · route/dir inventories via `find`/`grep` (full `src/app/api` enumeration). Register + this job's handoff/brief. Canonical design `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` [DESIGN].

## Files not read (independence + scope)
`ADVISOR_INDEPENDENT_ASSESSMENT.md` · anything under `runs/foundation/...` or `runs/shared/...` for this mission · any `ACTOR_COMPARISON_MATRIX.md` / `FOUNDER_DECISION_PACKAGE.md` / `FOUNDER_ACCEPTANCE_SHEET.md` · Foundation Worker / Fable5 first-pass outputs · any DB, secret, env value, production/live system, or live model. **Independence maintained; no prohibited file was opened.**

## Addenda after freeze (new unknowns, with source and reason)
- **A-C1 (source: `src/lib/mergeGuest.ts:8-20`, `mock-login/route.ts`; discovered 2026-07-10 during U-04 evidence):** Commerce-layer guest-to-login linking already exists and persists a guestId↔userId join (`cart_merged` event). Unknown: does the Package 1 "no linking" default carve out, freeze, or supersede this existing behavior, and is the persisted join row itself allowed as a future memory/feedback join key? (Register U-04 treats linking as future-only.)
- **A-C2 (source: `src/lib/shopper.ts:15`, `src/lib/mockUser.ts`; discovered during U-04/U-06):** Current auth is a single hardcoded mock user with no real multi-user login. Unknown: what auth milestone is prerequisite before any pilot's identity, selection-bias, or attribution evidence can be considered representative?
- **A-C3 (source: `src/app/api/events/route.ts:23-33` + `src/types/commerceEvent.ts:61-64`; discovered during U-05):** Cosmile-side free-text persistence surface — client-posted `properties` persists into `CommerceEvent.propertiesJson` with only a fixed sensitive-key scrub (no generic free-text keys blocked). Unknown: must the raw-text lineage/non-persistence policy explicitly cover this existing Cosmile ingestion surface, and does it require server-side value-scanning before any feedback feature increases free-text volume?

## Input-path reality table
| Path | Exists | Raw text | Order/OrderItem link | Persisted where | Evidence |
|---|---|---|---|---|---|
| Review/rating/survey/return route or UI | **No** | — | — | — | route inventory + order-page grep (none) |
| `RecOutcomeFeedback` writer | **No** (schema sink only) | — | schema requires orderItemId | — | no `prisma.recOutcomeFeedback` in src |
| Consultation chat | Yes | Yes (maskPii→Foundation transport) | **None** | Cosmile: not persisted (no ConversationMessage writer); Foundation: [UNVERIFIED] | consult route:34, adapter:37; grep OrderItem→none |
| Consultation meta | Yes | **No field accepts text** | productId mentions only | ConsultationSessionMeta (whitelist fields) | meta routes |
| Generic event ingestion `/api/events` | Yes | **Free text can pass via `properties`** | optional orderId/product fields | `CommerceEvent.propertiesJson` | events route + SENSITIVE_KEYS |
| C2 purchase outcome | Yes (flag OFF) | No | orderItemId (unique) | `RecOutcomeEvent` | recOutcomeEventService |

## Identity / shared-device risk table
| Mechanic | Current state | Risk note | Evidence |
|---|---|---|---|
| Logged-in identity | Single hardcoded `MOCK_USER.id` | No real multi-user evidence possible | shopper.ts:15 |
| Guest identity | Random 16B-hex httpOnly cookie, minted at logout | Shared device shares gid until re-mint; browser-scoped | mock-logout:12 |
| Guest→login linking | **Live**: cart+wishlist merge + `cart_merged` both-id event | Existing linking precedent; join row persisted | mergeGuest.ts |
| Memory-layer stitching | None; `SubjectRefMap.allowLink=false`, no consumer | Gate is data-shape only | schema:899, src grep |
| Outcome-write ambiguity | Strict XOR ⇒ `xor_violation`, no write | Guest+login dual context produces silence, not misattribution | C2 service + DB CHECK |
| Ref derivation | Separate HMAC mints (subj/anon), no cross-derivation | No implicit re-key path | ids.ts:30-45 |

## Provenance gap table
| Needed for trustable feedback | Exists today | Gap |
|---|---|---|
| Explicit user OrderItem selection UX | Surface exists (order-detail line rows), control absent | UX + authorization flow undecided |
| Source-event identity / dedup key | `CommerceEvent.id`, outbox `sourceEventId` exist as anchors | No feedback source/dedup fields in `RecOutcomeFeedback` |
| Feedback provenance fields (source type, sourceRef, contentHash, subject) | **Absent** from current schema (narrower than V3-04 historical) | Additive contract undecided |
| Correction/retraction linkage | **Absent** (no route/service) | Undesigned |
| Consultation→order linkage | **Impossible today** (zero order context in flow) | Would require explicit new context passing — policy first |

## Pilot / instrumentation evidence limits
- Cohort separation primitives exist (`CommerceEvent.environment`, `isTest`), event whitelist + server-derived identity exist — a typed observation pipeline is feasible without new infrastructure.
- **Hard limits now:** single-mock-user auth (no representative identity/selection-bias data — A-C2); no impression/prompt-exposure denominators (no feedback UI exists to instrument); organic-only C2 outcomes are structurally non-attributable to recommendations (R-K2) so no recommendation-uplift baseline can be derived from them; consultation events measure consultation, not purchase outcome.
- Consequently a "pilot" on the current runtime can measure at most UI mechanics, never value or bias — matching the register's LOW confidence on pilot sizing.

## Future affected repo-local surfaces (inventory only — no implementation instruction)
`src/app/orders/[orderId]/page.tsx` and order-history UI (any explicit linkage UX) · a future feedback route under `src/app/api/` (none exists) · `src/types/recOutcome.ts` + `prisma/schema.prisma` `RecOutcomeFeedback` (provenance additions would be schema work) · `src/lib/commerceEventService.ts` + `/api/events` (free-text policy, server-side value scan) · `src/lib/foundationSignalMapper.ts` + outbox (consent reality, whitelist contract) · `src/lib/memoryCandidate.ts` wiring (promotion gates) · `ConsentRecord` writer (absent today) · `src/lib/mergeGuest.ts` (linking-policy carve-out) · consultation meta/`ConversationMessage` (only if consultation-follow-up ever becomes a product decision).

`RETURN_TO: Advisor`
