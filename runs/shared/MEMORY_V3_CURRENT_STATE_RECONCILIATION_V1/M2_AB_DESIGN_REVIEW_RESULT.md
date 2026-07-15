# M2 A/B — Independent Design Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-INDEPENDENT-DESIGN-REVIEW
REVIEW_ID: M2-AB-DESIGN-REVIEW-001
REVIEW_PASS: DESIGN_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: NEEDS_PATCH
BLOCKING_FINDINGS: 3 (REV-F1 = mandatory ruling R-Q2 correction; REV-F2; REV-F3)
NON_BLOCKING_FINDINGS: 6 (REV-N1..N5 one-line design pins; REV-N6 Control-record note)
R-Q1_RULING: PERMITTED_WITHIN_AUTHORITY_WITH_BINDING_PRECONDITIONS (no patch)
R-Q2_RULING: IMPROPER_NARROWING_OF_AUTHORIZED_B_SCOPE (bounded correction = REV-F1)
```

## 0. Live runtime verification (verified this pass, not from session name)

- tmux: `session=foundation-reviewer-fable5 window=@5 pane=%5` (tmux display-message,
  this pass) — matches handoff TARGET_SESSION/WINDOW/PANE.
- Workspace: `/home/leo/Project/Cosmile` (cwd verified). Model: `claude-fable-5`
  (live system identity). Effort: `max` (session `/effort max` confirmation).
  Skill: `/fable-sentinel` loaded this session before review work; references
  contract-review / safety-review / provenance-review / review-classification /
  delta-review present and applied.
- Independence: this session authored nothing in this mission; it is distinct from
  `foundation-designer` (design records tmux `$29 / %29`), `foundation-advisor`,
  `foundation-control` (workspace `/home/leo/Project/foundation-control` per
  Control result §0), and the Cosmile Worker session. Read-only for the reviewed
  work; no patch, no dispatch, no product write.
- Reviewer writes: only the two ALLOWED_WRITE files (this result + pointer).
  COMMIT/PUSH: none (COMMIT_PERMISSION: NO). TEST_EXECUTION / DB / SECRET / ENV /
  NETWORK / PROVIDER / BRANCH ops / new agent or subagent: none.

## 1. Subject and provenance verification (reported ≠ actual applied)

- foundation-docs worktree: branch `advisor/foundation-team-role-alignment-20260714`
  (matches handoff), HEAD at review time `3858cc17a7b4450ea993c6b2088f3e29c8045391`,
  tracked-clean before this write.
- Subject commit `35cc5591456566ccdb02324974956b0c5ec7ce3a`
  ("design: specify Memory V3 Cosmile A-B scope", 2026-07-15):
  - `git merge-base --is-ancestor 35cc5591 HEAD` → yes;
  - `git merge-base --is-ancestor 5624ec76 35cc5591` (SUBJECT_BASE) → yes;
  - `git show --stat` → exactly the two declared paths, +1351/+53 lines:
    `runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT.md`
    and `..._POINTER.md`;
  - `git diff 35cc5591 HEAD -- runs/cosmile/MEMORY_V3.../` → empty, so worktree
    copies are byte-identical to the pinned subject; line references below cite the
    pinned content.
- Control input commit `73889c86f5170cfe20718a237dff989d52960c9f` → exactly
  `runs/shared/.../M2_AB_CONTROL_CONTRACT_RESULT.md` (+263) and pointer (+53);
  worktree-identical to pin (empty diff).
- Cosmile baseline: branch `shadow/m4-cosmile-memory`, HEAD
  `6e44aa40ffb2960573839a01424761dc5e98d610` = handoff COSMILE_BASELINE_HEAD =
  design TARGET_HEAD_VERIFIED. Working tree contains only the six pre-existing
  untracked `app/docs/*.md` files named at Advisor intake; no new dirt.
- Designer identity/model/effort/skill: design headers declare
  `foundation-designer`, `gpt-5.6-sol / max`, `/fable-builder` — consistent with
  handoff 30 (ACTUAL_MODEL_REQUIRED gpt-5.6-sol, max) and intake 25 EFFORT_PLAN.
  The Designer's live session state at authoring time is **reported, not
  reproduced** (cannot be re-observed after the fact); all record-level checks are
  consistent.
- Zero product-repo write claim: corroborated — Cosmile HEAD unchanged at
  `6e44aa40`, tracked-dirty 0, subject commit touches only the two declared
  foundation-docs files. PRODUCT_REPO_WRITE_STATUS: ZERO holds.

## 2. Sources read directly (no execution from memory)

Handoff/authority chain: `32_M2_AB_DESIGN_REVIEW_HANDOFF.md`;
`22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md`; `24_M2_FOUNDER_D1_D3_DECISION.md`;
`25_M2_ADVISOR_INTAKE_AND_ROUTING.md`; `30_M2_AB_DESIGNER_HANDOFF.md`;
Control result + pointer @73889c86; Designer result + pointer @35cc5591;
agent-office `TEAM_OPERATING_MODEL.md` + `roles/reviewer.md`;
V2 protocol (superseded-historical, read as evidence); Cosmile `AGENTS.md`,
`CLAUDE.md`, `app/AGENTS.md`, `app/CLAUDE.md`,
`app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`,
`app/docs/security/ENV_AND_MIGRATION_POLICY.md`,
`app/docs/testing/TEST_MEANING_POLICY.md`,
`docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`;
fable-sentinel SKILL.md + all five references.

Cosmile source verified read-only at HEAD `6e44aa40` (paths under `app/`):
`prisma/schema.prisma` (models CommerceEvent :15, FoundationSignalOutbox :195,
Wishlist/Cart/CartItem/Order/OrderItem :340–452, MemoryFactCandidate :777,
LongTermMemoryFact :796, RecommendationEvent :829, RecOutcomeEvent :844,
RecOutcomeFeedback :862, ConsentRecord :881, SubjectRefMap :895);
`prisma/migrations/*` (all three + preflight comments);
`src/lib/{recommendationEventService,recOutcomeEventService,foundationSignalMapper,
commerceEventService,attribution,memoryCandidate,ids,cart,checkout,mergeGuest}.ts`;
`src/lib/slice/consultFoundationView.ts`; `src/lib/events/emitClientEvent.ts`;
`src/types/{commerceEvent,recommendationEvent,recOutcome}.ts`;
`src/app/api/{events,cart/items,wishlist/toggle,checkout/mock-complete}/route.ts`;
`src/app/consult/page.tsx`; `src/app/orders/[orderId]/page.tsx`;
`src/components/slice/{ConsultFoundationResult,ConsultationMessageList}.tsx`;
`src/components/product/{AddToCartButton,WishlistButton}.tsx` (fetch targets);
`src/app/globals.css` (tokens); allowlist existence sweep (§3 check 7);
grep sweeps for flags, FK references, event-name whitelist.

## 3. Required independent checks (handoff §"Required independent checks", one by one)

**Check 1 — subject/ancestry/paths/identity/zero-write:** PASS. Evidence in §1.

**Check 2 — Space/Behavior/Information/Technology completeness vs A/B scope and
actual source:** PASS with the patch items below. Surface inventory (design §2.1)
verified against source: `/consult` renders `ConsultationChatShell` →
`ConsultationMessageList.tsx:63` → `ConsultFoundationResult`; the view mapper
`consultFoundationView.ts:50` gates on `mode==="commerce" && showProductCards`
and **drops `showRecommendation`** exactly as design R4 claims (type declares it
at :13, mapper never reads it). `/orders/[orderId]/page.tsx` has paid lines and
no feedback control (R9 verified). `/slice` + debug path exist. Visual tokens
verified: `globals.css:5` `--accent:#f2622a; --accent2:#d94f1c`, `:25` `.device{
width:390px; height:844px }`; `#f3eee7` used by consult page. Logo file exists
(pixel dimensions not reproduced — no image tooling authorized; non-load-bearing).

**Check 3 — presentation surfaces, first-presentation mint, lifecycle propagation,
plane division, deterministic duplicate prevention implementable without policy
choices:** MOSTLY PASS; two determinate gaps = REV-F2 (client ledger emission
contract absent → duplicate `product_card_view`/`product_card_click` ledger rows)
and REV-N2 (dual-recording atomicity unstated). Verified current truth: mint at
cart with fresh ID per call (`recommendationEventService.ts:57` + only caller
`cart/items/route.ts:48-56`, `sessionId:null` at :52) — design R2/R5 claims exact.
`recommendationId` is the row PK (`schema.prisma:830`) — R3 exact (see R-Q1).
Producer keys (§5.2) are fully determined: exact hash inputs, prefixes, and the
three uniqueness constraints; duplicate collapse decidable. Attribution matches
Founder D1-A (verified against `attribution.ts:13-37`, `ATTRIBUTION_MODES` in
`types/recOutcome.ts:6`).

**Check 4 — purchased-line feedback, axes, normalization, consent, identity,
correction, retraction, lineage, provenance, retention representation, static
adverse guidance:** PASS except REV-F1 (adverse enqueue scope — mandated ruling
R-Q2) and REV-F3 (returning-user consent checkbox semantics). Closed vocabularies
(§4.1) are single-sourced and match the Founder D2-A envelope exactly
(`22_...:211-215`); severity values match the existing `AdverseSeverity` enum
(schema :867, `types/recOutcome.ts:4`); certainty locked to `reported` per
Founder. Normalization table §5.4 is total over the input space including unknown
tokens (fail-closed `invalid_normalization`) and enforces axis independence with
raise-only/MAX merge (F9/F10). Append-only lineage + single-successor + single
retraction + tombstone (§5.7) satisfy F8 with no silent overwrite or re-key.
Retention-class representation (§5.8) keeps `adverse_regulatory_hold` with
`retentionExpiresAt=null; retentionState=duration_unconfigured` — F11/F12 honored
(no duration implemented). Static adverse guidance is constant strings (§4.2), no
provider call — F10/F11 honored.

**Check 5 — envelope/outbox producer-only, fail-closed, flag-OFF, no-network,
no-consumer, no Foundation intake:** PASS. Outbox reuse with evidence-only
columns and conditional constraints (§5.9) verified additive against
`schema.prisma:195-216` (legacy identity columns are nullable, so
`canonicalUserId/anonymousId = null` evidence rows are representable; new columns
absent today). Consent-inference removal (R7) verified against
`foundationSignalMapper.ts:31` (`userId ? "user_consented" : "anonymous"`).
Mapper hardening adds no sender/consumer/flush/retry/timer (§5.9); §8.5 static
containment checks pin it. Flags: `COSMILE_REC_EVENT_ENABLED`
(`recommendationEventService.ts:9`, default OFF) and `COSMILE_REC_OUTCOME_ENABLED`
(`recOutcomeEventService.ts:11`, default OFF) are real and named correctly in §11;
`COSMILE_COMMERCE_EVIDENCE_ENABLED` does not yet exist (new, default OFF,
production-false). HARD STOP list (§12) preserves every Founder exclusion.

**Check 6 — zero candidate/adverse-candidate creation, zero promotion, zero
ranking/safety mutation:** PASS. §5.12 pins `candidate_id: not minted / no A/B
column / zero calls`; §7 forbids touching `memoryCandidate.ts`,
`MemoryFactCandidate`, `LongTermMemoryFact`; §8.5 requires zero static references
in the diff. Verified current gate exists untouched (`memoryCandidate.ts:16-40`).
Retraction/satisfaction never trigger memory/ranking/safety changes (§3.4, §5.13).
Consistent with Founder F4/B1 `RESOLVED_BY_FOUNDER_F4_FOR_A_B`.

**Check 7 — Worker file allowlist exact and sufficient; schema/product code
assigned only to Cosmile Worker:** PASS. Existence sweep: all 25 listed
existing paths exist at `6e44aa40`; all 8 "missing" paths are exactly the new
files the design creates (`types/commerceEvidence.ts`, normalizer, feedback
state, client context, evidence service, present route, evidence-events route
parents, `PurchaseFeedbackPanel.tsx`, new scripts). Sufficiency probes: guest-
merge context drop lands in `lib/cart.ts` `mergeGuestCart` (:66-97 — merge
re-creates rows copying only named fields, so new recommendation columns default
null; file allowlisted); wishlist save lands in `api/wishlist/toggle/route.ts`
(allowlisted; `WishlistButton.tsx:41` posts there; `lib/wishlist.ts` needs no
change); PDP cart CTA posts to `api/cart/items` (`AddToCartButton.tsx:30`,
allowlisted); consult page needs no change (shell/list/result + view mapper own
the flow); `/api/events` route untouched (all mapped ledger event names already
in `COMMERCE_EVENT_TYPES` — `types/commerceEvent.ts:15-18` includes
`ai_recommendation_ignored`, `recommendation_view`, `product_card_view/click`);
REV-F2's fix is implementable inside allowlisted `ConsultFoundationResult.tsx`.
Ownership: §9 assigns every product file to the Cosmile Worker; Control/Designer
wrote no product file (verified §1).

**Check 8 — migration, rollback, ephemeral rehearsal, test matrix safe/reversible,
no real-DB authority:** PASS (R-Q1 ruling covers the one non-additive item).
Single new migration + down.sql, historical migrations untouched; zero-row
preflight with HOLD; forward/down/forward rehearsal on a disposable Postgres;
down.sql fail-closed on any data; flags OFF; "Infra unavailable is SKIP, never
PASS" (§8.4) — consistent with ENV_AND_MIGRATION_POLICY (no prod DB, fail-closed
secrets, no rotation) and TEST_MEANING_POLICY (failure classification before
change, §8 preamble). Verified no FK anywhere references `RecommendationEvent`
(grep over schema + migrations → none), so the PK correction breaks no
relation. Note: `RecommendationEvent` exists only in the v3_11b migration; see
REV-N6 for Control's mis-anchor (does not affect the design's plan, which alters
only `RecommendationEvent` via the new migration).

**Check 9 — accessibility/error/loading/blocked behavior and traceability
implementation-ready:** PASS. §6 fixes native controls, fieldset/legend, focus
in/out targets, focus trap + Escape semantics, aria-busy/aria-live/role=alert,
reduced-motion budget (≤180 ms, exceptions named), 200 % zoom and no fixed
heights; §4.3 pins UNKNOWN-never-success and exact user copy for every non-happy
state; §10 maps requirement→section→file→test including Founder-constraint rows
F1–F12. Honest limitation recorded (§0, §12.3): no rendered-runtime visual
verification — implementation review must inspect 390×844 / keyboard / zoom.

**Check 10 — policy invention, contradictions, omitted edges, stale sources,
overbreadth, Founder-choice items:** Findings below. Scope is not overbroad:
recommendation-lifecycle work is inside the Founder-fixed D1-A implementation
consequence ("Recommendation creation/presentation must become the ID origin",
`22_...:89-99`), and consultation-surface CTAs are the fixed lifecycle's cart/save
stages, flag-gated (REV-N5 pins the flags-OFF baseline). No SIASIU/Foundation
ownership crossed; Cosmile displays and records, judges nothing (Constitution
respected — Foundation surface flags are consumed, never produced).

## 4. Mandatory ruling R-Q1 — ADDITIVE_SCHEMA_AUTHORITY

**Ruling: PERMITTED_WITHIN_AUTHORITY_WITH_BINDING_PRECONDITIONS. No patch.**

Question: may A/B replace `RecommendationEvent.recommendationId` as primary key
with a new `eventId` PK (design R3, §5.10 change 2), given "additive" schema
authority?

Evidence:

1. Current truth (verified): `schema.prisma:830` `recommendationId String @id`;
   PK also in `v3_11b/migration.sql` (`RecommendationEvent_pkey`). **No FK in any
   model or migration references RecommendationEvent** (grep → zero), so the PK
   change breaks no relation. The table's only writer is flag-OFF
   (`recommendationEventService.ts:41-42`), so every legitimate A/B environment
   has zero rows; the design makes that a hard precondition (any row → HOLD,
   design :122-124, :849, §5.10 preconditions) with a zero-row-preconditioned
   down.sql and forward/down/forward rehearsal.
2. Founder-fixed F1/F2 (`24_...:25-32`) require one `recommendationId` minted at
   first presentation and **propagated through view, click, save, dismiss, cart,
   purchase**, with `RecommendationEvent` canonical for that lifecycle. With
   `recommendationId` as PK the named canonical table can hold at most one row
   per ID — the Founder-fixed lifecycle is structurally unrepresentable. The PK
   correction is therefore mandated by the Founder decision itself, not designer
   preference.
3. The authority chain already interprets the accepted "additive schema…
   complexity" risk (`24_...:61`) as *no destructive data operation / no drop /
   reversible*, not *no constraint modification*: the same Founder decision
   orders the `sessionId` NOT NULL → nullable relaxation, which Control §10.1
   classifies as "Additive/nullable relaxation". An empty-table PK correction
   with fail-closed preconditions is the same class: data loss impossible
   (zero rows proven first), reversible (rehearsed down.sql), historical
   migrations untouched.
4. Narrowest-alternative comparison (mandated): leaving the table untouched and
   adding a dedicated lifecycle-event table would (a) move the canonical
   lifecycle out of the model the Founder names canonical (F2), (b) create a
   second recommendation-evidence store beside a still-wired legacy writer
   (`cart/items/route.ts:48`) — precisely the duplicate-aggregation surface F2
   forbids — and (c) still require altering the old table (sessionId NOT NULL and
   the stranded writer), so it is not lower-risk; it is less Founder-faithful at
   equal or higher complexity. The design's own precedent split is coherent:
   R8 leaves `RecOutcomeFeedback` untouched because a **new** contract
   (CommerceEvidenceRecord) exists for feedback, while F2 pins the lifecycle to
   the **existing** named table, which therefore must be corrected in place.

Binding preconditions (already in the design; must survive verbatim into the
Worker handoff): zero-row preflight assert + HOLD on any row; no historical
migration edits; disposable-DB-only rehearsal; fail-closed down.sql; no real
target DB. With these, the change is safely reversible and within authority.

## 5. Mandatory ruling R-Q2 — ADVERSE_SAFE_ENQUEUE_SCOPE

**Ruling: IMPROPER_NARROWING of the authorized B scope. Bounded design
correction required → REV-F1 (this is the NEEDS_PATCH driver).**

What the design does: all `skin_reaction`/`other` adverse evidence is blocked
from the contained outbox while the hold duration is unset — §3.3 flow :319
("adverse hold duration unset -> LOCAL_HOLD_ONLY"), §5.4 rows 2-3 :608-609
("local hold only; blocked with retention_hold_unconfigured until legal duration
is fixed"), §5.8 row 4 :733 ("Cross-service enqueue is blocked with
retention_hold_unconfigured"), §4.3 label :474, §12.4.

Why that exceeds the Designer's lane:

1. The authorized B scope **includes** "structured adverse feedback and safe
   enqueue to that contained producer-only outbox" (handoff 32 :92-94; designer
   handoff 30 :78-81). The Founder chose D3-A over D3-C, and D3-C — the rejected
   option — is the one defined by deferring adverse capture/enqueue
   (`22_...:451-465`: "cannot complete the intended B adverse plane"). The design
   reproduces D3-C's cross-service deferral for the adverse plane's last stage
   without a Founder decision authorizing it.
2. F12 (`24_...:53-55`) gates only the `adverse_regulatory_hold` **period**
   ("the actual … period must not be implemented or activated"), and D3-A adds
   "do not apply the short feedback TTL" plus "no external report/delivery"
   (`22_...:397-413`). Enqueue to the same-database, consumer-less, producer-only
   queue is not delivery (the design itself proves no delivery exists, §5.9), and
   carrying `privacy.retention_class=adverse_regulatory_hold` on an envelope is
   retention-class **representation**, which the design already performs on the
   local record with `retentionExpiresAt=null; retentionState=
   duration_unconfigured` (§5.7, §5.8). The design conflates the unset duration
   with an enqueue prohibition — converting F12's duration gate into an
   evidence-class scope cut. That is a product-policy decision the Founder did
   not make, against the completion gate "no policy invention" (30 :102, :142).
3. Internal contract drift caused by the narrowing: the outbox envelope spec
   defines the adverse fields as outbox content (§5.3 :575-577) and §5.9 requires
   `evidenceRetentionClass` on outbox rows, yet §5.4/§5.8 make skin/other adverse
   rows unreachable — dead contract surface plus an asymmetry (`usage_safety`,
   also an adverse_type, does enqueue, §5.4 row 5).
4. The real collision the design was avoiding (correctly identified, wrongly
   resolved): §5.8 row 1 gives **every** "new outbox pending/blocked row"
   `queueExpiresAt=createdAt+30d` (universal rule) while D3-A forbids short TTLs
   on adverse reports — two universal rules, same object, opposite effects. The
   fail-closed resolution chosen (keep adverse out of the queue) narrows Founder
   scope; the faithful resolution exempts adverse rows from the short queue TTL.

**Exact bounded contract change (Designer-owned, document-level; no production
retention period is invented):**

1. §3.3 / §5.4 rows 2-3: identified + cross-service-consented + valid
   `skin_reaction`/`other` evidence with selected severity (low/moderate/severe,
   certainty=reported) passes the same consent/identity gates as other evidence
   and becomes outbox-eligible. `severe` additionally keeps the local
   `human_safety_review_required` state (raise-only flag per Founder "flag
   potentially serious events for a human regulatory-obligation assessment"); the
   flag does not alter enqueue eligibility because no delivery exists. Unknown
   severity remains fail-closed to human review with no outbox (unchanged,
   Founder-fixed).
2. §5.8 / §5.9: outbox rows with `evidenceRetentionClass=adverse_regulatory_hold`
   are exempt from the 30-day queue expiry — `queueExpiresAt=null`,
   `retentionState=duration_unconfigured`; the `outbox_pending_30d` class applies
   only to non-adverse evidence rows. No purge, no duration, no activation.
3. §4.3 / §5.5: replace the adverse "hold — cross-service blocked" label with an
   honest queued-not-sent label; remove `retention_hold_unconfigured` from the
   enqueue path (delete the code or mark it unused).
4. §8: update the §8.1/§8.4 retention/outbox assertions to match (adverse rows
   enqueue with hold class and null queue expiry; revocation/retraction still
   blocks pending rows in lineage — §3.4 already covers this; adverse never
   receives a short TTL anywhere, local or queue).

If the Advisor/Founder instead prefers the stricter variant (severe rows held
locally until an explicit human release step), that adds a release state machine
the Founder text does not require and must go back as a one-bit Founder/Advisor
choice — the patch above is the reading that changes nothing else in the Founder
record. The Reviewer does not choose beyond stating the faithful default.

## 6. Findings

### Blocking (patch before Worker dispatch)

**REV-F1 [authority/contract] — adverse safe-enqueue narrowing + 30d TTL
collision.** Design :319, :608-609, :733, :474 ↔ 32 :92-94, 22 :397-413/:451-465,
24 :53-55 — details and exact bounded correction in §5 above. Failure scenario:
Worker implements a B pilot whose adverse plane never exercises the envelope→
enqueue path the Founder authorized; C-era contract inherits an unauthorized
evidence-class carve-out; alternatively a naive future unblock applies the 30d
queue TTL to adverse rows, violating F12/D3-A.

**REV-F2 [contract gap → duplicate aggregation] — client ledger emission for
canonical cards is left double-writing.** Design §3.1 :243-268 / §5.1 :487-497
(server writes mapped `product_card_view` at presentation and mapped
`product_card_click` at click) ↔ `ConsultFoundationResult.tsx:24-33` (client
useEffect emits `recommendation_view` + per-card `product_card_view` via
`/api/events` on render) and `:41-44` (`product_card_click` on click) →
`commerceEventService` ledger write. The design nowhere instructs suppressing or
replacing the existing client-direct emission for canonical recommendation
cards, and §8's only dual-count assertion covers response-level
`recommendation_view` (:1072). Failure scenario: Worker keeps the existing
emitter (nothing says remove it) → every canonical card reveal/click lands twice
in CommerceEvent (client row without `producerEventKey` + server mapped row with
it); ledger aggregation double-counts; Founder F2 "prevent duplicate
aggregation" is violated in the general ledger plane and `producerEventKey`
cannot dedupe rows that lack it. Bounded patch: one client-emission contract
table in §5.1 — canonical cards: server-mapped rows only, client-direct view/
click emission removed (fix lands in allowlisted `ConsultFoundationResult.tsx`);
generic cards/containers: existing client emission unchanged; pin whether
`recommendation_view` fires for generic (showRecommendation=false) containers
(recommended: no — event name claims a recommendation; R4's honesty rationale) —
plus matching §8.1/§8.3 assertions ("canonical card render posts no direct
/api/events product_card_view/click"; "generic container emission unchanged").

**REV-F3 [consent indeterminacy] — returning-granted-user checkbox semantics and
revocation surface undefined.** Design §3.5 :371-391 (durable append-only purpose
states; grant = "explicit unchecked-to-checked user action"; revoke = "append new
record") ↔ §2.3 :197-199 + §8.3 :1140 ("Both controls start unchecked",
"cross-service checkbox never prechecked") ↔ §3.3 :317 ("cross-service consent
absent -> LOCAL_ONLY"). For a user whose durable `cross_service_commerce_evidence`
purpose-state is `granted` from a prior submission and who now submits with the
never-prechecked box unchecked, two readings produce different stored rows:
(a) durable state governs → evidence enqueues although the visible control was
unchecked (UI misrepresents effect; violates the design's own truthful-labels
principle §4.3); (b) unchecked = local-only this time → the checkbox is a
per-evidence election, "consent absent" conflates purpose-state with election,
and no surface grants/revokes the durable state independently. Additionally no
A/B journey defines where consent **revocation** happens (the
`commerce-evidence/consents` route is allowlisted but §2/§3 design no revocation
surface; §3.4 retraction ≠ consent revocation). Failure scenario: two Workers
implement opposite outbox behavior for identical input on an F7-load-bearing
path; consent evidence in the envelope (`consent.state=granted`) may contradict
what the user saw at submit time. Bounded patch: pin the checkbox semantics
(recommended, consistent with §4.3 truthfulness: checked ⇒ record grant if not
currently granted + evidence eligible; unchecked ⇒ this evidence stays local-only
without creating a revocation), restate §3.3's "absent" accordingly, and add one
line locating durable revocation in A/B (consents route + minimal account
surface, or explicitly "revocation exercised via API/tests only in A/B" if that
is the intent — state it either way).

### Non-blocking (fold into the same Designer patch; one-liners)

**REV-N1 [naming pin]** §3.2 :271 "nullable sessionId" and §5.2 :512 propagation
row say `sessionId`; §5.10 change 3 :813 names the DDL column
`recommendationSessionId`. Same concept, two names — pin `recommendationSessionId`
(schema plan) in §3.2/§5.2 prose to prevent a split implementation.

**REV-N2 [atomicity line]** §5.1 dual recording never states whether the paired
ledger+lifecycle writes are one DB transaction or best-effort with
`producerEventKey`-keyed repair, and whether a lifecycle write failure may block
the underlying cart/wishlist action (current code is deliberately fail-open —
`recommendationEventService.ts:3`, `commerceEventService.ts:27`). One sentence
decides it; recommend: single transaction per stage pair for the canonical plane,
cart/wishlist mutation never blocked by ledger-only writes.

**REV-N3 [adversarial edge]** `clientRequestId` is globally unique
(§5.10 item 5) and "duplicate clientRequestId returns prior status" (§8.2 :1128).
A different shopper replaying someone else's `pf_req_v1_` UUID passes no owner
gate (generic not-found first, §8.2 :1125-1126) but the global DB unique still
rejects the insert with an undefined response class. Scope the unique per owner
or order line (e.g. `(orderItemId, clientRequestId)`) or define the cross-owner
collision response code.

**REV-N4 [edge intent]** `Order.status` includes `refunded` (schema :411); the
§3.3 gate (paidAt non-null; pending/cancelled blocked) leaves refunded lines
feedback-eligible with `purchase_state=paid`. Deterministic as written and
safety-positive (adverse reporting on refunded items stays possible) — add one
sentence stating this is intended, so the Worker doesn't "fix" it.

**REV-N5 [flags-OFF baseline pin]** §2.2 "Generic cards use the same visual
card" + §3.1 NOT_ELIGIBLE → "ledger-only generic cards": pin that generic/
flags-OFF rendering keeps the current read-only card (no cart/wishlist/dismiss
CTAs — today's surface is deliberately CTA-free, `ConsultFoundationResult.tsx:8-10`)
and that all new consult-surface CTAs exist only on canonical cards under the A
flag. Otherwise a Worker could ship un-flag-gated cart CTAs on the consultation
surface, changing flags-OFF behavior outside every kill switch (§11 gates server
writes only).

**REV-N6 [Control record note — not a Designer defect]** Control result T1
(@73889c86, §1 row T1) anchors `RecommendationEvent.sessionId NOT NULL` to
`init_postgres/migration.sql:683` **and** `v3_11b:11`. Actual: init:683 is
`ConversationSession.sessionId` — the NOT NULL **primary key of a different
table** (init :681-694); `RecommendationEvent` does not exist in the init
migration at all (grep → zero). Only `v3_11b:11` is correct. The design did not
inherit the mis-anchor (R1 carries no file:line; §5.10 alters only
`RecommendationEvent` in a new migration and forbids historical edits), so no
contamination path exists — but the Advisor should note it on the Control record
so no future handoff instructs "fix both migrations", which would touch
ConversationSession's PK.

### Observations (no action)

- Control §6 note "reuse SEMANTIC_LABELS (10)" conflicts with the Founder D2-A
  envelope (3-value satisfaction, 3-value adverse_type, `22_...:211-215`). The
  design correctly followed the Founder envelope and left the legacy
  `semanticLabel` vocabulary untouched in `RecOutcomeFeedback` (R8). Correct
  precedence; recorded so the divergence is not later read as designer drift.
- All ten §1.2 R-claims and the §2.1 surface inventory were verified true against
  source at `6e44aa40` (R1 `schema.prisma:834`+`v3_11b:11`; R2/R5
  `cart/items/route.ts:48-56` + `recommendationEventService.ts:57`; R3 :830; R4
  `consultFoundationView.ts:50`; R6 `recOutcomeEventService.ts:81` + mock-complete
  :39; R7 `foundationSignalMapper.ts:31`; R8 schema :862-871; R9 orders page; R10
  schema :195-216).
- Design §0 visual sub-claims "full-screen below 480 px" and logo "633×217" were
  not independently reproduced (no browser/image tooling authorized);
  non-load-bearing for the contract.

## 7. Required patches (summary for the delta loop)

Designer-owned, document-level, all inside `M2_AB_DESIGN_RESULT.md`:

1. **REV-F1** — apply the exact bounded adverse-enqueue correction in §5 (ruling
   R-Q2): §3.3/§5.4/§5.8/§5.9/§4.3/§5.5/§8 as specified.
2. **REV-F2** — add the client-emission contract table + two test assertions.
3. **REV-F3** — pin consent-checkbox semantics + revocation location.
4. **REV-N1..N5** — five one-line pins as stated.

Same author patches; same Reviewer performs delta-only re-review
(REV-IDs above are stable). No product file changes; no re-review of unchanged
sections required unless the patch touches new load-bearing boundaries.

## 8. Authority conflicts

- **R-Q1**: raised by handoff, resolved **PERMITTED** with binding preconditions
  (§4). No conflict remains.
- **R-Q2**: resolved **IMPROPER_NARROWING** → REV-F1 patch; after the patch the
  design matches the Founder record with no residual authority tension.
- Control-vs-Founder vocabulary tension (SEMANTIC_LABELS) — resolved by the
  design in the Founder's favor; recorded above.
- No boundary breach found: no Foundation judgment in Cosmile, no SIASIU
  ownership, no candidate/promotion path, no consumer/network/intake, no C
  implementation, no Package 1B surface.

## 9. Residual risks (post-patch; carried to implementation review)

1. Design §12.1-12.8 remain valid as written (empty-table precondition; no
   authoritative session mint so `session` attribution is fixture-proven only;
   rendered-UI verification deferred to implementation review at 390×844/keyboard/
   200 % zoom; `adverse_regulatory_hold` duration + legal erasure obligations
   unresolved and gated; retention cleanup not scheduled; shared physical outbox
   with conditional constraints load-bearing; legacy generic signal enqueue
   becomes fail-closed — regression tests must prove CommerceEvent recording
   remains intact, per §8.6 and `commerceEventService.ts:58` call order; no
   browser test library — pure state module + visual inspection).
2. Reviewer addition: after REV-F1, adverse outbox rows retained with
   `queueExpiresAt=null` accumulate until a legal decision — same retention
   posture as the local record (no worse), but the implementation review should
   confirm the count stays test-only in rehearsal environments.
3. Reviewer addition: Designer live-runtime state is record-verified only (§1);
   any future claim requiring it should rely on the committed artifacts.

None of these blocks the patched design from Worker dispatch; all are already
represented as gates, deferred decisions, or implementation-review duties.

## 10. Excluded scope and why

- C contract/implementation design quality beyond its A/B boundary surface —
  not in this review's authority (C design review is a later gated step).
- Foundation/SIASIU repositories — outside A/B product scope (read nothing
  beyond the mission record; no cross-repo claims made by the design require it).
- Test execution, DB rehearsal, build, rendered-UI inspection — TEST_EXECUTION:
  NO / DB_ACCESS: NO in the handoff; the design's test matrix was reviewed as a
  contract, not run.
- The six pre-existing untracked Cosmile doc files — user-owned dirt, untouched,
  not used as authority (matches intake and design §0).

## 11. Verdict rationale

Per review-classification: every defect found is repairable by bounded document
edits (DESIGN_NEEDS_PATCH class); none is a safety-weakening path (the one
safety-adjacent defect, REV-F1, errs in the over-restrictive direction while
misallocating authority), no source-of-truth contamination reaches the design
(REV-N6 contained), primary join keys are fully determined (formats, nullability,
mint points, propagation — §5.2/§5.11/§5.12 verified against source), and no
same-concept heterogeneous enum survives (closed sets single-sourced; Founder
envelope precedence applied). The design is otherwise exceptionally
implementation-ready: R1-R10 all verified true, the allowlist is exact and
sufficient, the migration plan is reversible and fail-closed, containment
invariants are pinned and testable. `PASS` is precluded because the mandated
R-Q2 ruling itself requires a contract change plus two determinate-gap patches;
`PASS_WITH_RISK` is wrong because nothing here needs risk acceptance — only
bounded correction; `FAIL` is unwarranted because no boundary, authority, or
safety premise is broken and no redesign is needed.

```text
VERDICT: NEEDS_PATCH
BLOCKING_FINDINGS: REV-F1 (R-Q2 adverse-enqueue correction), REV-F2 (client
  ledger emission contract), REV-F3 (consent checkbox semantics + revocation
  surface)
NON_BLOCKING_FINDINGS: REV-N1 (recommendationSessionId naming), REV-N2
  (dual-recording atomicity line), REV-N3 (clientRequestId collision scope),
  REV-N4 (refunded-line intent line), REV-N5 (flags-OFF generic-card baseline),
  REV-N6 (Control T1 mis-anchor — Control record note, no design change)
AUTHORITY_CONFLICTS: R-Q1 resolved PERMITTED_WITH_BINDING_PRECONDITIONS;
  R-Q2 resolved IMPROPER_NARROWING -> REV-F1; SEMANTIC_LABELS tension resolved
  by Founder precedence (no action)
REQUIRED_PATCHES: REV-F1, REV-F2, REV-F3 (blocking) + REV-N1..N5 one-line pins;
  Designer-owned, document-level, delta re-review by this Reviewer
RESIDUAL_RISKS: design §12.1-12.8 carried forward + adverse-outbox accumulation
  note + record-only Designer runtime verification (§9)
PRODUCT_REPO_WRITE_STATUS: ZERO
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
