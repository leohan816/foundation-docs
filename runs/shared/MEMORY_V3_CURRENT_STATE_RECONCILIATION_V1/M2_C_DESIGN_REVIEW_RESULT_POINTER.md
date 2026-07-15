# M2 C Design Review Result Pointer

MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-INDEPENDENT-DESIGN-REVIEW-001
REVIEW_ID: M2-C-DESIGN-REVIEW-001
REVIEW_PASS: C_IMPLEMENTATION_READY_DESIGN_REVIEW
ACTOR: foundation-reviewer-fable5
SESSION: foundation-reviewer-fable5 (tmux @5 / %5, live-verified)
ROLE: Independent Reviewer (Sentinel)
RESPONSIBLE_ADVISOR: foundation-advisor

ACTUAL_MODEL: Opus 4.8 (1M context)  # unchanged from mid-mission switch (Fable 5 credits exhausted); same Actor/session; role ≠ model brand
EFFORT: max
REQUIRED_SKILL_APPLIED: /fable-sentinel

SUBJECT_HEAD: 7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117  # ancestor of foundation-docs HEAD; worktree-identical; exactly the two declared paths (+1256/+11)
SUBJECT_PATHS:
- runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
- runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
COSMILE_PINNED_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f (producer envelope; unchanged)
FOUNDATION_PINNED_HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96 (consumer surface; unchanged)
C_CONTROL_CONTRACT_COMMIT: c53855c6e191c24819e98555f83bf12b37e9a127

VERDICT: PASS

SUMMARY: The C (Foundation-side commerce-evidence eligibility-validation) implementation-ready
design is contract-consistent to the implementation layer and implementable without inventing
policy. No blocking findings.

VERIFIED:
- v1 input contract (§4.2) matches the shipped Cosmile envelope exactly (fields/enums/three
  evidence types/three consent purposes/two retention classes/18 reserved codes) at f26fa5c.
- §4.3 idempotency formula and the subtle JS-`undefined` source_hash sentinel are byte-exact
  against ids.ts/commerceEvidenceService.ts; design correctly requires reproducing the pinned
  behavior + a golden fixture (a clean canonical algorithm needs a new envelope version).
- Foundation-side claims verified at f6417004: reason_codes.py _SAFE_DYNAMIC/cannot_determine
  (18 C codes absent today), MemoryCandidate requires furef_v2, store.py memory_db_created=False
  + ingest_event_signal rejects non-false memory_candidate without storing, validate_subject_ref
  is validate-not-mint. No stale-source assumption.
- Aligns with the C Control contract (c53855c6): resolves the reason-taxonomy gap via a dedicated
  guarded frozenset (not mutating _SAFE_DYNAMIC) and the envelope↔candidate mismatch via dedicated
  DTOs (not the unfaithful current MemoryCandidate); no ingest_event_signal overload; no credential
  designed; category-level responses; HARD STOP preserved. No design↔Control drift.

MANDATORY RULINGS (all fail-closed / sound):
- C-R1 authenticity/source_hash: integrity-only hash + separate VERIFIED verifier, default UNCONFIGURED → provenance_untrusted; credential deferred.
- C-R2 consent freshness/revocation: separate verify_effective adapter, default UNCONFIGURED → consent_missing; snapshot never proves freshness; reuse re-verifies; TOCTOU = activation blocker.
- C-R3 18-code taxonomy/guard: exact 18, dedicated immutable set, first-failure single code, unknown → cannot_determine, no field oracle/leak.
- C-R4 replay/collision/correction/retraction/concurrency: (service,source_event_id) identity, six uniqueness rules, replay-before-lineage, all races covered, one-process-only (no durability claim).
- C-R5 furef_v2/MemoryCandidate boundary: dedicated review-only DTOs, never synthesize furef, never write the store; F4/B1 + F6 preserved.
- C-R6 adverse retention/safety asymmetry: unconfigured adverse → privacy_scope_exceeded, accepts/creates nothing, no duration invented; satisfaction never lowers adverse; severe/usage_safety conservative.
- C-R7 default-OFF/no-transport/no-intake/no-runtime: flag default false + double-checked, no endpoint/consumer/network, api.py unmodified, dedicated package, rollback leaves Cosmile outbox untouched.
- C-R8 future-WorkUnit/HARD-STOP: 8 WorkUnits all NOT_AUTHORIZED, no stage auto-unlocks the next, every reserved decision routed to Leo/GPT+Security/Legal.

NON_BLOCKING (forward notes for the future — NOT_AUTHORIZED — implementation review; no design patch):
- IR-C-N1 privacy_scope_exceeded reuse for adverse-unconfigured (documented deliberate fail-closed within the immutable 18-set; keep tested).
- IR-C-N2 additive shared reason_codes.py/feature_flags.py touch (confirm OFF-fallback + _SAFE_DYNAMIC unbroadened at impl review).
- IR-C-N3 producer-enqueues vs consumer-rejects adverse asymmetry (intended, deferred, no live path; recorded).
- IR-C-N4 captured_at ≤ occurred_at boundary (add to golden/property tests).

RESIDUAL_RISKS: the design's §18.2 blockers — authenticity credential/ingress; consent freshness +
immediate cross-system revocation/erasure propagation; adverse jurisdiction/legal role/duration;
guest/anonymous exception; one-process-only durability; no complete legal-erasure protocol; the v1
source-hash quirk (needs a new envelope version to fix). All are fail-closed activation blockers, not accepted risks.

GATE MEANING: PASS is a design-review verdict only — NOT implementation authorization, NOT final
approval. C implementation, delivery, outbox consumer/intake activation, candidate runtime, real/
durable DB, production/live, and Full Package 1B remain NOT_AUTHORIZED and HARD-STOPPED, requiring
separate Leo/GPT (and Security/Legal per §18.3) approval via the Advisor.

RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT_POINTER.md

EVIDENCE:
- product/control repo writes this pass: ZERO (Cosmile f26fa5c and Foundation f6417004 HEADs unchanged; only pre-existing untracked docs)
- subject read at pinned commit; Cosmile+Foundation source verified read-only at their pins; Designer/Control prose distrusted until source-confirmed
- tests/DB/env/secret/network: ZERO (design review; none run) · commit/push: ZERO (Advisor publishes) · new agent/sub-agent: ZERO
- only the two declared Reviewer files were written

PRODUCT_REPO_WRITE_STATUS: ZERO
CONTROL_REPO_WRITE_STATUS: ZERO
C_IMPLEMENTATION_STARTED: NO
C_DELIVERY_INTAKE_STARTED: NO
CANDIDATE_RUNTIME_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
NEXT_ROUTE: foundation-reviewer-fable5 -> foundation-advisor -> HARD STOP -> Leo/GPT (C design gate PASS; C implementation and every downstream step require separate Leo/GPT approval)
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
