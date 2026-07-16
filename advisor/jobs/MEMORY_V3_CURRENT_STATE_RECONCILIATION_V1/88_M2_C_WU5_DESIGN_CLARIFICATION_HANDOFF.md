# M2 C WU5 — bounded implementation-design clarification handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-DESIGN-CLARIFICATION-001
ROLE: Foundation Designer
ACTOR_ID: foundation-designer
SESSION: foundation-designer
WINDOW_PANE: @29 / %29
TARGET_PRODUCT_REPOSITORY: /home/leo/Project/FOUNDATION
PRODUCT_REPOSITORY_MODE: READ_ONLY
TARGET_FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
TARGET_FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
DESIGN_SUBJECT_BASELINE: b96bfe4970420730707c2b289c8589998e3b9821
REQUIRED_SKILL: /fable-builder
EFFORT: high
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Purpose and authority

Produce a narrow same-Designer implementation-ready clarification for reviewed-
design section 17 WorkUnit 5, `C-SHADOW-SERVICE`. This is a design-artifact patch
only. It grants no product write, WU5 implementation, WU6 verification, WU7 review,
delivery, activated intake, durable runtime, real DB, production, or WU8/M3 work.

Preserve Founder authorization `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`,
the independently reviewed C design, the independently reviewed WU4 clarification,
and landed WU1–WU4 behavior. Add no new product, privacy, identity, consent, safety,
legal, retention, storage, transport, or activation policy. If any question below
requires such a decision or a WU1–WU4 product edit, return `DESIGN_NOT_READY` and
STOP.

## 1. Required reads

Read directly:

- Agent Office operating model and Designer role;
- Founder authorization and documentation allowlist correction;
- current implementation-ready design and its independent PASS evidence;
- WU4 clarification and its two PASS review artifacts;
- WU4 Advisor evidence gate `87_M2_C_WU4_ADVISOR_EVIDENCE_GATE.md`;
- landed WU1–WU4 Foundation modules and the current
  `foundation/feature_flags.py` and `foundation/shared_memory/reason_codes.py`,
  with the Foundation product repository read-only;
- Foundation `AGENTS.md`, `CLAUDE.md`, security, testing, and docs-sync rules.

Apply `/fable-builder` contract mapping. Do not create an agent/subagent and do not
self-review.

## 2. Exact implementation questions to close

Patch only existing reviewed intent, without broadening it:

1. Define the exact Python 3.7-compatible public/internal types, field order,
   literals, constructors, and function/class signatures for `service.py` and
   `audit.py`, including the exact `CommerceEvidenceDecisionV1` and minimized
   audit/metric record representations.
2. Define every injected dependency and default: ledger, clock, provenance verifier,
   consent verifier, opaque ingress context, Foundation decision/candidate/evidence/
   lineage ID factories, current gate, audit sink, metrics sink, and feature-flag
   reader. Defaults must remain local, deterministic where required, fail closed,
   and must not read environment, secret, DB, file, network, provider, or runtime
   configuration.
3. Specify gate-0 behavior and the exact additive `foundation/feature_flags.py`
   lines. `commerce_evidence_c_shadow` must default false; future live/intake/
   candidate-runtime flags must be hard off; OFF must return before parsing and be
   rechecked immediately before ledger commit. No environment auto-enable path.
4. Specify the exact smallest additive integration in
   `foundation/shared_memory/reason_codes.py`. Preserve every current dynamic code,
   prevent exception/value leaks, introduce no nineteenth C reason code, and define
   how unknown or service-health failures collapse to existing `cannot_determine`.
5. Reconcile the outer `RLock`, WU3 `EphemeralLedger.submit`, commit guard, audit
   append, metrics, and preallocated `candidate_effect_healthy` latch without a WU3
   edit. The existing design says accepted/control audit is part of the ledger
   transaction, while the landed WU3 API has no audit callback. Specify an exact,
   honest sequence and failure semantics. Do not claim rollback/atomicity that the
   landed API cannot provide; any post-ledger failure must preserve unrelated state,
   poison the service instance, and return category-only `cannot_determine`.
6. Define exact decision-ID ownership for disabled, pre-commit rejection, WU3
   rejection/collision, exact replay, accepted, and post-accepted failure paths.
   Only Foundation-issued IDs may appear; no producer-derived ID or identifier echo.
7. Specify exact response/audit/metric projections for every path, including missing
   fields when parsing never occurs, adverse-policy UNCONFIGURED, retraction,
   correction, replay, collision, latch-poisoned, audit failure, and unexpected
   exception. No payload, raw text, PII, producer identifier, candidate ID,
   credential, diagnostic, exception string, or stack may escape.
8. Fix the WU5/WU6 boundary precisely. State the exact WU5 product write allowlist,
   whether WU5 may add any test path (section 17 currently assigns dedicated tests
   and synthetic fixtures to WU6), what non-mutating WU5 checks are sufficient, and
   the exact WU6 tests/fixtures that must later prove WU5. Do not silently move WU6
   authority into WU5.
9. Define exact WU5 STOPs, rollback, containment/static checks, and acceptance map so
   a Foundation Worker can implement without inventing architecture or policy.

Do not alter the v1 envelope, 18 C reason codes, hashes, verifier semantics, gates
1–11, WU3 ledger/lineage, WU4 candidate mapping, current shared-memory API, current
`MemoryCandidate`, `SharedMemoryStore`, or WorkUnit order. No endpoint, consumer,
transport, delivery, persistence, current candidate materialization, approval,
reuse, promotion, ranking, safety mutation, or real-user application.

## 3. Exact foundation-docs write allowlist

Only these four files may change:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

Patch the main design only where needed for coherent WU5 implementation detail,
traceability, tests, and section-17 boundary. Update its pointer status to
`READY_FOR_DELTA_DESIGN_REVIEW`. New result/pointer must list the exact delta and
unresolved STOPs. Do not stage, commit, or push; Advisor publishes after validation.

## 4. Product repository prohibitions

Foundation, SIASIU, Cosmile, and foundation-control are read-only. Do not modify or
stage source, tests, canonical product design docs, schema, migration, config, flags,
fixtures, runtime, or Git state. Do not run product tests. No DB, file-backed state,
network/provider, secret, environment, delivery, intake, current candidate/store,
approval, reuse, promotion, ranking, or safety mutation.

## 5. Completion and return

Completion requires exact, internally consistent answers to all nine questions;
no new Founder decision; no implementation-critical blank; only the four declared
foundation-docs paths changed; all product repositories untouched; and a durable
result/pointer returned to the Advisor for independent delta-only design review.

Return only the compact pointer and STOP. WU5 implementation must not start.
