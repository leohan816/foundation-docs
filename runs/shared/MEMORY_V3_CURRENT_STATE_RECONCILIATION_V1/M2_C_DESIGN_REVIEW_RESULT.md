# M2 C — Independent Implementation-Ready Design Review Result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-INDEPENDENT-DESIGN-REVIEW-001
REVIEW_ID: M2-C-DESIGN-REVIEW-001
REVIEW_PASS: C_IMPLEMENTATION_READY_DESIGN_REVIEW
ROLE: Independent Reviewer (Sentinel)
ACTUAL_ACTOR: foundation-reviewer-fable5
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

VERDICT: PASS
```

## 0. Live runtime, model, independence (verified this pass)

- tmux (live): `session=foundation-reviewer-fable5 window=@5 pane=%5` — matches handoff.
- Workspace (cwd): `/home/leo/Project/Cosmile`. Effort: `max`. Skill: `/fable-sentinel`
  (contract / safety / provenance / review-classification references applied).
- **ACTUAL_MODEL: Opus 4.8 (1M context)** — recorded exactly; unchanged from the earlier
  mid-mission switch (Fable 5 credits exhausted); same Actor/session/conversation; a Reviewer
  is a role, not a model brand.
- Independence: this session authored none of the reviewed work — not the C design
  (`foundation-designer` `%29`, `gpt-5.6-sol/max`), Control (`foundation-control`), or the
  Advisor. Read-only; no patch/dispatch/commit/product/control write. Reviewer writes only the
  two ALLOWED result/pointer files.

## 1. Subject, provenance, and zero-write verification

- foundation-docs branch `advisor/foundation-team-role-alignment-20260714`, HEAD `aa75d246`;
  subject `7cbcb8d9…` ("docs: add reviewed-subject C implementation design") is an ancestor
  of HEAD; `git show --stat` = exactly the two declared paths (+1256 result, +11 pointer);
  `git diff 7cbcb8d9 HEAD` on them is empty → the worktree copy equals the pin; all citations
  below are to the pinned content.
- Product/control HEADs unchanged and read read-only at their pins: Cosmile
  `f26fa5ced7083bb8d0af00bda2a54951923ea22f`, Foundation `f6417004…`. The design's own
  §19.2/§19.3 pre/post-write porcelain hashes assert zero product/control write; consistent
  with the unchanged HEADs. PRODUCT_REPO_WRITE_STATUS and CONTROL_REPO_WRITE_STATUS = ZERO.
- Designer identity/model/effort/skill are record-declared (`foundation-designer`,
  `gpt-5.6-sol/max`, `/fable-builder`); their live authoring state is reported, not
  reproducible after the fact — all record-level checks are consistent.

## 2. Sources read directly (no execution from memory)

Handoff `54_…`; Founder `24_M2_FOUNDER_D1_D3_DECISION.md` and `22_…DECISION_PACKAGE.md`
(read in prior passes and re-anchored); C Control result `M2_C_CONTROL_CONTRACT_RESULT.md`
@ `c53855c6`; the subject design + pointer @ `7cbcb8d9`; Cosmile `AGENTS.md`/`CLAUDE.md`/
`app/AGENTS.md`/`app/CLAUDE.md`; FOUNDATION `CLAUDE.md`/`AGENTS.md`; and pinned source:
Cosmile `src/types/commerceEvidence.ts`, `src/lib/{commerceEvidenceNormalizer,
commerceEvidenceService,ids}.ts` (verified in the A/B implementation review at this same
`f26fa5c`), and Foundation `foundation/shared_memory/{reason_codes,contract,store,api,
subject_identity}.py` (verified this pass at `f6417004`). fable-sentinel SKILL + references.

## 3. Source-claim verification (stale-source and contract-drift hunt)

Cosmile producer contract (the C input) matches the shipped v1 envelope exactly: the ten
top-level groups and every nested key/enum in design §4.2 equal `commerceEvidence.ts`
`CommerceEvidenceEnvelope` (identified-only outbox projection: `anonymous_ref` null,
`identity_state` identified, `identity_link_allowed` false); the three evidence types, three
consent purposes, two retention classes, and the reserved 18 codes match
`FOUNDATION_C_REASON_CODES`. The §4.3 idempotency formula equals `ids.ts`
`evidenceIdempotencyKey` byte-for-byte (delimiter-free). The §4.3 **`source_hash` sentinel
claim is accurate**: `commerceEvidenceService.ts` builds the hash over
`{...lineage, source_hash: undefined}` and `ids.ts` `canonicalJson` includes the still-present
`source_hash` key whose `JSON.stringify(undefined)` coerces, in string concatenation, to the
literal token `"source_hash":undefined` — so the design's "reproduce the pinned JS behavior +
pin a cross-language golden fixture; a clean canonical algorithm needs a new envelope version,
not a v1 reinterpretation" is the correct, drift-preventing conclusion.

Foundation surface claims verified at `f6417004`: `reason_codes.py` has
`_SAFE_DYNAMIC = frozenset({…})` with `code(c)=c if c in _SAFE_DYNAMIC else "cannot_determine"`
and the 18 C codes are **absent** today (grep 0) — so the additive dedicated-frozenset guard
(§5.2) is truthful and does not broaden `_SAFE_DYNAMIC`; `contract.py` `MemoryCandidate`
requires `furef_v2` (which the envelope omits) — so §10.3 "no mapping; never synthesize" is
grounded; `store.py` has `memory_db_created = False` (invariant) and `ingest_event_signal`
rejecting `memory_candidate!=false`/`interprets_customer!=false` without storing memory — so
"do not overload the legacy signal API" (§12.1) is grounded; `subject_identity.validate_subject_ref`
is validate-not-mint; `api.py` exposes `gate_decision`/`write_approved_memory`/store methods
the design correctly forbids C from calling except the read-only `gate_decision` policy
projection. No stale-source assumption found.

Control alignment (`c53855c6`): the design resolves both Control-flagged open items correctly —
the reason-taxonomy gap (Control §68/§135: the 18 codes would collapse to `cannot_determine`
under `_SAFE_DYNAMIC`) via a dedicated guarded set, and the envelope↔candidate mismatch
(Control §69) via dedicated `CommerceOutcomeCandidateV1`/`CommerceAdverseCandidateV1` DTOs
rather than the unfaithful current `MemoryCandidate`, with a policy-projection-only mapping to
the current `gate_decision`. It honors Control's "don't overload `ingest_event_signal`", "don't
design a credential", category-level responses, and the HARD STOP. No design↔Control drift.

## 4. Required checks (handoff §"Required independent checks", condensed)

1. Subject/paths/ancestry/hash/identity/zero-write — PASS (§1).
2. Every v1 field/type/nullability/invariant/identity/privacy/normalization/consent/lineage/
   retention vs pinned Cosmile source — PASS (§3; §4.2 matches the shipped envelope).
3. Deterministic first-failure gate order → all 18 codes; unknown collapses without becoming an
   oracle/leak — PASS. §5.1 gates 0–11 select one primary; §5.2 maps all 18; single
   `primary_reason_code`, `reason_codes` is `[]`/one; unknown/exception → `cannot_determine`
   via the existing safe guard; runtime/audit never records the offending field/value (§11.2).
4. `source_hash` = integrity only; separate authenticity verifier fails closed — PASS (C-R1).
5. Current consent freshness/revocation not inferable from the snapshot; adapter accepts zero
   when unconfigured; login/subject/historic/userId never substitute — PASS (C-R2).
6. Replay/duplicate/collision/correction/retraction/race/transaction/audit-failure/one-process
   concurrency exact and deterministic with no durability claim — PASS (C-R4; §7, §11.2).
7. Accepted ≠ eligibility ≠ candidate ≠ approval ≠ reuse ≠ runtime; no stage implies the next —
   PASS (§3 six-plane separation; §11.1 `accepted_for_eligibility_review` never says stored/
   approved/reusable/applied).
8. Two draft forms don't pretend to be the current `MemoryCandidate`, don't synthesize `furef`,
   don't write the store, don't bypass adverse/manual review — PASS (C-R5).
9. Satisfaction/adverse independent; severe/unknown conservative; unresolved legal retention
   accepts/creates nothing — PASS (C-R6).
10. Response/audit/metrics/IDs/hashes/lineage minimized; no producer identifier/raw/PII/secret/
    medical/diagnostic leak — PASS (§11.1–§11.3: only Foundation-issued `decision_id`/
    `lineage_pointer`; allowlisted audit categories; low-cardinality metrics).
11. Module plan additive, dedicated, default-OFF, doesn't overload `ingest_event_signal`, no
    transport/endpoint/consumer activation, future-Worker-only after new Founder approval —
    PASS (C-R7; §12).
12. Test/property/malicious/concurrency/containment/rollback/kill-switch/threat/traceability
    sufficient; honestly separates synthetic/ephemeral from real DB/network/runtime — PASS
    (§13 "run none in this mission"; `:memory:` explicitly "not a product adapter"; §15, §16,
    §18 honest limitations).
13. Policy invention / contradiction / missing edge / stale source / overbroad WorkUnit /
    hidden choice — none blocking (see §6 observations; the §1.4 self-flagged comment
    inconsistency is resolved honestly with "source wins").

## 5. Mandatory rulings

```text
C-R1 AUTHENTICITY_AND_SOURCE_HASH — FAILS CLOSED CLEANLY.
  source_hash is unkeyed integrity, recomputed byte-exact incl. the pinned JS-`undefined`
  sentinel (+ golden fixture required); authenticity is a SEPARATE verifier requiring
  VERIFIED with both bindings, default UNCONFIGURED → provenance_untrusted; attacker-
  recomputable hash acknowledged; verifier diagnostic never returned/audited; credential/
  protocol explicitly deferred to Leo/GPT+Security. No policy invented. Evidence: §4.3, §6.1,
  §5.1 gate 4, §5.2, verified against ids.ts/commerceEvidenceService.ts.

C-R2 CURRENT_CONSENT_FRESHNESS_AND_REVOCATION — FAILS CLOSED CLEANLY.
  The v1 snapshot cannot prove latest/unrevoked state (no consent-record-id/expiry/sequence);
  a separate verify_effective adapter is required, default UNCONFIGURED → consent_missing;
  only GRANTED continues; REVOKED/EXPIRED → exact codes; MISMATCH → privacy_scope_exceeded;
  historic/exact-notice-only, no alias; every future reuse re-verifies, unavailable → blocked;
  TOCTOU/immediate-propagation explicitly an activation blocker, not accepted risk. Evidence:
  §6.2, §6.3, §8.1, §5.1 gate 5.

C-R3 EXACT_18_REASON_CODE_TAXONOMY_AND_GUARD — SOUND.
  The 18 equal the pinned producer set (verified); dedicated immutable frozenset +
  commerce_evidence_code() guarded lookup, never mutating _SAFE_DYNAMIC; first-failure single
  primary code avoids a field oracle; unknown/exception/verifier-text collapse to
  cannot_determine; runtime/audit never records offending field/value. Evidence: §5.2, §11,
  verified vs reason_codes.py + commerceEvidence.ts.

C-R4 REPLAY_COLLISION_CORRECTION_RETRACTION_CONCURRENCY — SOUND, NO DURABILITY OVERCLAIM.
  Authoritative identity (source.service, source_event_id) narrower than the hash; six
  uniqueness rules; replay gate precedes mutable lineage so an accepted-correction retry stays
  exact_replay not lineage_broken; §7.4 covers every race (both correction/retraction orders,
  two-retraction, candidate-retry, kill-switch); one RLock, explicitly one-process/ephemeral,
  no cross-process/restart durability claimed; durable backend deferred. Evidence: §5.1 gates
  9–11, §7.

C-R5 FUREF_V2_AND_CURRENT_MEMORYCANDIDATE_BOUNDARY — BOUNDARY PRESERVED.
  Current MemoryCandidate requires furef_v2 (verified) which the envelope omits and whose
  retention enum can't represent an unconfigured adverse hold; C uses dedicated review-only
  DTOs, never synthesizes furef, never writes SharedMemoryStore.ingest/write_approved_memory/
  learning/reuse; §10.3 projects only into gate_decision for policy checks (eligibility
  evidence, not materialization); F4/B1 (Cosmile zero candidates) and F6 (Foundation candidate
  only under future approved C) both preserved. Evidence: §10, verified vs contract.py/api.py.

C-R6 ADVERSE_RETENTION_AND_SAFETY_ASYMMETRY — FAILS CLOSED CLEANLY.
  While adverse_regulatory_hold is UNCONFIGURED a structurally-valid skin/other adverse
  envelope stops at the retention gate (privacy_scope_exceeded) accepting/creating nothing;
  no duration invented; satisfaction+skin/other blocks the whole envelope (adverse-first);
  severe preserved; usage_safety adverse despite null severity; satisfaction never lowers
  adverse; retraction's non-adverse class never downgrades an adverse root (per-node, monotone).
  Evidence: §4.4, §5.1 gate 8, §9.3, §10.2, §10.4.

C-R7 DEFAULT_OFF_NO_TRANSPORT_NO_INTAKE_NO_RUNTIME — SOUND.
  commerce_evidence_c_shadow default false, checked at gate 0 and again inside the commit
  transaction; no endpoint/consumer/sender/flush/network/provider; api.py/ingest_event_signal
  unmodified; dedicated package imported only by its own tests; verifier/adverse UNCONFIGURED
  are independent kill conditions; rollback = flag OFF + remove unimported package, Cosmile
  outbox rows untouched; §13.2 static checks prove zero transport/import. Evidence: §5.1,
  §12, §14.

C-R8 FUTURE_WORKUNIT_AUTHORITY_AND_HARD_STOP — PRESERVED.
  §17 lists 8 WorkUnits ALL NOT_AUTHORIZED, each gated with dependency + stop condition +
  rollback; WU8 (delivery/intake/candidate-runtime) actor = none, "always STOP"; §14.1 "no
  stage automatically unlocks the next"; §18.3 routes every reserved decision to Leo/GPT +
  Security/Legal; the result claims no present implementation authority and states a review
  PASS is not implementation authorization. Evidence: §0, §1.5, §14, §17, §18.
```

For every reserved decision (authenticity credential, consent freshness/propagation, adverse
legal hold, guest/anonymous exception, durable storage, current-candidate bridge) the design
**fails closed cleanly** — an unconfigured verifier, unverifiable snapshot, unconfigured adverse
policy, anonymous actor, or OFF flag accepts nothing and creates nothing — rather than inventing
policy or claiming improper readiness. The implementation-readiness claim is justified in the
correct sense: the C code path is implementable now as inert, fully-determined, fail-closed code;
activation requires the separately-gated decisions.

## 6. Findings

No blocking findings. Non-blocking observations (forward notes for the future — NOT_AUTHORIZED —
implementation review; none require a design patch):

- **IR-C-N1 [code-set economy]** §4.4/§5.2 reuse `privacy_scope_exceeded` for "adverse legal
  policy unconfigured." This is a deliberate, documented fail-closed mapping inside the immutable
  18-code producer set (a 19th code would be envelope-version drift); it is defensible (the
  adverse evidence exceeds the currently-configured retention/privacy scope). Note for the
  implementation review: keep this mapping documented in code + a dedicated test so it is never
  read as an ordinary extra-field rejection.
- **IR-C-N2 [shared-file additive touch]** §12.1 additively edits shared
  `foundation/shared_memory/reason_codes.py` (guarded delegation to the C set) and
  `foundation/feature_flags.py` (new default-`False` flag) beyond the dedicated
  `commerce_evidence/` package. Disclosed and guarded ("preserve all current dynamic codes";
  "default OFF"). The implementation review must confirm byte-compatible fallback when the flag
  is OFF and that `_SAFE_DYNAMIC` is not broadened — the design already requires both.
- **IR-C-N3 [producer/consumer adverse asymmetry — record, not defect]** the shipped A/B producer
  DOES enqueue valid skin/other adverse envelopes into its contained outbox (REV-F1, null queue
  expiry), whereas future Foundation-C would reject them (`privacy_scope_exceeded`) while the
  legal hold is unconfigured. This is the intended conservative asymmetry (producer retains
  contained; Foundation refuses to accept/create until legal clarity) and creates no live
  mismatch because C delivery/intake is entirely deferred. Recorded so it is not later mistaken
  for a contract drift.
- **IR-C-N4 [boundary property to test]** §4.1 `consent.captured_at` later than `occurred_at` →
  `consent_missing`. The producer always satisfies `captured_at ≤ occurred_at` (grant at/before
  feedback; fresh grant equal), so this is a fail-closed guard the real producer meets; include
  the equal/after boundary in the golden-fixture/property tests.

## 7. Verdict rationale

The design is contract-consistent to the implementation layer: every v1 field, enum, format,
idempotency and source-hash algorithm, gate, and reason code is determined and verified against
the pinned Cosmile producer and Foundation surface; the six decision planes never collapse;
candidate drafts are Foundation-owned dedicated DTOs that never write the current store or
synthesize `furef`; satisfaction can never lower adverse; every reserved decision fails closed;
containment is default-OFF with no transport/intake/runtime and no `ingest_event_signal`
overload; and every future WorkUnit is NOT_AUTHORIZED behind a HARD STOP to Leo/GPT. It aligns
with the Founder decision, the C Control contract, and the Foundation ownership boundary, and it
invents no policy for any open decision. Per review-classification this is `DESIGN_APPROVED`
(PASS): a Foundation Worker could implement the bounded, inert, fail-closed C path from this
document without choosing field meaning, safety, consent, identity, lineage, or retention policy.
It is not `NEEDS_PATCH` (no defect requires a design correction; the observations are documented
deliberate choices or forward test notes), not `PASS_WITH_RISK` (no residual needs risk
acceptance — the open items are already fail-closed activation blockers, not accepted risks), and
not `FAIL`.

**This PASS is a design-review verdict only. It is not implementation authorization and is not
final approval.** C implementation, delivery, outbox consumer/intake activation, candidate
runtime connection, real/durable DB, production/live, and Full Package 1B all remain
NOT_AUTHORIZED and HARD-STOPPED, requiring separate Leo/GPT (and, per §18.3, Security/Legal)
approval via the Advisor.

```text
VERDICT: PASS
BLOCKING_FINDINGS: none
NON_BLOCKING_FINDINGS: IR-C-N1 (privacy_scope_exceeded reuse for adverse-unconfigured — documented, keep tested),
  IR-C-N2 (additive shared reason_codes/feature_flags touch — confirm OFF-fallback at impl review),
  IR-C-N3 (producer-enqueues vs consumer-rejects adverse asymmetry — intended, deferred, recorded),
  IR-C-N4 (captured_at≤occurred_at boundary — add to golden/property tests)
AUTHORITY_CONFLICTS: none (aligns with Founder D1-A/D2-A/D3-A, C Control contract, Foundation boundary)
REQUIRED_PATCHES: none
RESIDUAL_RISKS: the design's own §18.2 blockers — authenticity credential/ingress; consent
  freshness + immediate cross-system revocation/erasure propagation; adverse jurisdiction/legal
  role/duration; guest/anonymous exception; one-process-only durability (no multi-process/
  restart); no complete legal-erasure protocol; the pinned v1 source-hash quirk (fixing needs a
  new envelope version). All are fail-closed activation blockers, not accepted risks.
PRODUCT_REPO_WRITE_STATUS: ZERO
CONTROL_REPO_WRITE_STATUS: ZERO
C_IMPLEMENTATION_STARTED: NO
C_DELIVERY_INTAKE_STARTED: NO
CANDIDATE_RUNTIME_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: max  ·  SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
