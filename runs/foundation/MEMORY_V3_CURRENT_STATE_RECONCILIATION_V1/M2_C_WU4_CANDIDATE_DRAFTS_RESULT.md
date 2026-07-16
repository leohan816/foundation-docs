# M2 C — WU4 C-CANDIDATE-DRAFTS Foundation Worker result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-CANDIDATE-DRAFTS-001
ROLE: Foundation Worker
ACTOR_ID: foundation (session foundation @3 %3; same implementation actor as WU1-WU3)
REQUIRED_SKILL_APPLIED: /fable-builder
ACTUAL_MODEL: Opus 4.8 (1M context) — safeguard runtime switch (Fable 5 unavailable) still in
  effect; a Worker is a role, not a model brand. Disclosed, not concealed.
IMPLEMENTATION_EFFORT: ultracode (live, verified) for contract map + tests + candidates.py
FINAL_TEST_AND_DIFF_EFFORT: max (live, verified via /effort) for the re-run + containment/diff/mirror audit
RESULT_STATUS: COMPLETE — all 14 §13.4 oracles pass; declared max-effort delta/regression suites pass;
  diff = exactly the four allowlist paths; non-force pushed; HEAD == upstream.
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 1. Outcome

Implemented reviewed-design WorkUnit 4 (`C-CANDIDATE-DRAFTS`) exactly and only: two immutable
Foundation-owned review-only candidate DTOs, a pure pre-ledger candidate plan, a pure
accepted-result adoption function, the read-only current-gate projection, and the dedicated WU4
test suite. `EphemeralLedger.submit` is not called; no WU5 orchestration, service, audit, flag,
poison latch, current candidate/store write, approval, reuse, promotion, ranking, safety
mutation, durability, DB, network, provider, secret, or env access exists.

## 2. Anchors verified directly before writing (DO_NOT_EXECUTE_FROM_MEMORY honored)

| Anchor | Commit | Verify |
|---|---|---|
| Implementation-ready design (impl body) | `9549638` | `runs/shared/…/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md` SHA-256 `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66` = handoff pin (MATCH) |
| Corrected WU4 clarification | `f225607` | SHA-256 `f9b9ad15d16daf6dd6edb97621ec3ef4f43efa6173d636d4c6898e5d831f0a2f` = handoff pin (MATCH) |
| WU4 gate / freeze | `0b67d0c` | present; ancestor of docs HEAD |
| Independent WU4 design PASS | `b0a22b8`, `c285ebd` | present; ancestors |
| Founder authorization | `c96caefe4…` | WU1-7 bounded shadow only; WU8 forbidden |
| Landed WU1-WU3 product base | Foundation `de63c8f` | contract/validator/gate/ledger/lineage/reason_codes read directly |

Read directly at pinned head: reviewed design §10.1 (DTO fields/literals/regex/invariants),
§10.2 (slot mapping), §10.3 (17-field mapping + exact 8-key gate projection + accepted result
pairs), §10.5 (two-phase pure plan/adoption API + WU5 boundary), §13.4 (14 oracles + STOPs).
Landed types imported (not retyped): `ValidationResultV1`/`STATUS_ACCEPTED` (validator),
`gate_decision` (shared Memory Gate), `commerce_evidence_code` (C reason guard), contract
constants/regex. `RETENTION_CLASS_NON_ADVERSE == "feedback_non_adverse_90d"` and
`MEMORY_KINDS ⊇ {outcome_feedback, safety_note}` confirmed so the gate projections resolve to
the exact reviewed pairs.

## 3. Product write allowlist (exactly four; nothing else)

```text
foundation/shared_memory/commerce_evidence/candidates.py            (new)
foundation/shared_memory/tests/test_commerce_evidence_candidates.py (new)
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md               (modified: +§11, v0.4)
설계문서/README.md                                                  (modified: index v0.4 line)
```

`git diff --name-only de63c8f 3e6abee` = exactly those four. WU1-WU3 modules/tests, the package
`__init__.py`, WU5+ paths, shared Foundation code, dependencies, config, schema, and migrations
are byte-unchanged. The two pre-existing unrelated untracked files
(`docs/FOUNDATION_DOCS_SYNC_POLICY.md`, `설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html`)
remain untracked, untouched, and unstaged.

## 4. `candidates.py` — what landed

- `CANDIDATE_CONTRACT_VERSION = "foundation.commerce_evidence_candidate.v1"` (DTO + hash marker
  only; not product/transport/storage/retention/runtime policy). A one-character change changes
  the content hash.
- `CommerceOutcomeCandidateV1` (19 fields) and `CommerceAdverseCandidateV1` (23 fields):
  immutable `NamedTuple` review-only DTOs; do not subclass or materialize the current 17-field
  candidate contract (furef_v2 absent, retention enum unfit). Adverse constructible value is
  only `usage_safety`; `usage_safety` severity is null.
- `CandidateDraftSeedV1` (internal, 17 fields), `CandidateDraftPlanV1` (planned|rejected),
  `CandidateAdoptionV1` (internal effect, not the public decision).
- `plan_candidate_drafts_v1(validated_envelope, *, validation_result, candidate_id_factory,
  evidence_ref_factory, current_gate=gate_decision)`:
  - accepts only a genuine accepted `ValidationResultV1` (status
    `accepted_for_eligibility_review`, provenance `VERIFIED`, consent `GRANTED`, retention
    `feedback_non_adverse_90d`); a well-formed rejection returns its already-guarded primary
    category with zero state; a non-`ValidationResultV1`/contradictory-accepted/mapper/gate/
    hash/timestamp/factory/duplicate-ID/unexpected error collapses to category-only
    `cannot_determine` with zero slots/seeds and no exception text;
  - lifecycle: `purchase_feedback → create_current`, `correction → supersede_predecessor`,
    `retraction → revoke_lineage` (zero slots/seeds, zero factory calls);
  - slots outcome-then-adverse: outcome ⟺ satisfaction≠null; adverse ⟺ `usage_safety`;
    skin/other (with or without satisfaction) → `privacy_scope_exceeded`, zero state, zero
    factory calls; satisfaction never suppresses this;
  - 8-key sorted-ASCII content hash (contract_version, memory_kind, product_ref, sku_ref,
    satisfaction, adverse_type, adverse_severity, adverse_certainty) with explicit null
    absent-axis per slot; excludes subject/purchase/decision/lineage/candidate/evidence IDs;
  - `occurred_at + 90 days` millisecond-UTC `.sssZ` retention (no datetime/epoch/retention enum);
  - read-only current-gate projection: exactly the 8-key temp dict + `consent_record=None`,
    `subject_context={"subject_ref": …}`, `memory_state={}`; accepts only outcome
    `allow/[allow_shadow_write]` and usage-safety adverse
    `block/[high_sensitivity_reconfirmation_required]`; any other result → `cannot_determine`;
  - factory order per slot candidate-then-evidence, outcome then adverse; format + in-plan
    uniqueness enforced; no I/O, no ledger submit, no store write, no producer response.
- `adopt_candidate_drafts_v1(plan, *, decision_id, lineage_pointer)`: binds only a `planned`
  plan plus WU3-issued `^fcei_dec_v1_…$`/`^fcei_lin_v1_…$` into final DTOs in seed order;
  performs no factory/parse/hash/gate/I/O/lookup/policy/mutation and holds no ledger reference;
  non-planned plan, invalid refs, or a corrupt seed → empty adoption (fail-closed). A retraction
  adopts `()` while keeping `revoke_lineage`.

## 5. Tests before code — honest failure then green

- Pre-implementation: `test_commerce_evidence_candidates.py` written first; run rc=1 with
  `ImportError: cannot import name 'candidates'` (module absent) — recorded honest failure.
- After implementation, all suites at **max**, warnings-as-errors (`python3 -W error -m unittest`),
  exit codes unmasked:

```text
WU4  test_commerce_evidence_candidates   63 / 63   rc 0
     test_commerce_evidence_validator     57 / 57   rc 0   (declared delta)
     test_commerce_evidence_ledger        45 / 45   rc 0   (declared delta)
     test_shared_memory_v0                41 / 41   rc 0   (unittest and direct-script forms)
     test_subject_ref_v2_hard_gate        21 / 21   rc 0   (unittest and direct-script forms)
     TOTAL                               227 / 227  rc 0   0 fail · 0 error · 0 skip
```

Unrelated unchanged WU1 contract/hash/reason/verifier suites were **not** rerun (those paths are
byte-unchanged; delta basis recorded), per handoff §6.

All 14 §13.4 oracles are covered (design §11.6 mapping, no blank cell): contract literal;
DTO `_fields`/annotations + adopter construction refusal; slot order; 8-key golden content
hashes (hardcoded golden + independent recomputation, null-axis, cross-slot non-contamination,
ID-independence); +90d retention over month/year/leap boundaries with no retention enum;
lifecycle create/supersede/revoke with zero-factory retraction; skin/other fail-closed with
zero factory; factory order + total category-only fail-closed; spy current-gate exact 8-key
shape and allowed pairs with alternate-result rejection; replay/collision/lineage/hard-false
order modeled against unchanged WU3; accepted-only adoption with reject/replay discard and
count/state-mismatch fail-closed model; post-accepted containment (adopter has no ledger
reference, snapshot byte-equal, no clear); no-producer-echo in a simulated public decision;
AST/static containment.

## 6. Max-effort containment / diff / mirror audit

- Independent AST scan of `candidates.py`: imports = `{__future__, hashlib, json, re, uuid,
  datetime, typing, foundation.shared_memory.gate, .contract, .reason_codes, .validator}`;
  zero forbidden-import hits; zero forbidden call/token hits
  (no store/API/service/audit/flag/learning/approval/reuse/ranking/DB/SQLite/socket/requests/
  urllib/http/subprocess/os.environ/`ledger.`/`.clear()`/current-candidate/store tokens).
- Adversarial spot-check (nested/list abuse, wrong evidence_type, missing actor, non-dict
  envelope, unknown adverse value): every case → `rejected`/`cannot_determine`, zero slots/seeds,
  and zero leak of synthetic product/sku/subject values into the plan repr (category-only).
- Git: starting base `de63c8f` (== handoff baseline == prior upstream); resulting HEAD
  `3e6abee` (4 files, +1370/-3); non-force push `de63c8f..3e6abee`; HEAD == upstream, 0/0
  ahead/behind; remote-contains TRUE.
- Mirror `설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md` byte-identical to the
  canonical product document: sha256 `8a813a095dd038d60ac0d2910b9ec16fc5321acf259ad3f992ee07f74033cfed`
  both sides, `cmp` PASS. Result and pointer artifacts are left **unstaged** in the foundation-docs
  worktree; Advisor owns publication.

## 7. Proved vs not proved

Proved: exact contract literal; full DTO field order/annotations/literals; deterministic 0/1/2
slot mapping in outcome-then-adverse order; 8-key golden content hashes with null-axis and
ID-independence; +90d millisecond-UTC retention across calendar boundaries; create/supersede/
revoke lifecycle with zero-factory retraction; skin/other and satisfaction-cannot-suppress
fail-closed with zero factory; factory order and total category-only fail-closed; exact 8-key
read-only current-gate projection with only the two reviewed allowed pairs; WU4-failure cannot
reorder WU3 gates 9-11 (replay/collision/lineage/hard-false modeled against unchanged landed
WU3); accepted-only adoption and post-accepted containment with no `ledger.clear()`; no producer
value in simulated public output; AST/static containment; four-path diff; byte-identical mirror.

Not proved / not performed (out of WU4 scope): WU5 service orchestration, outer lock,
replay-preserving hard-false submit, poison latch, response/audit/metrics assembly, feature
flag; any current-candidate/store materialization, approval, reuse, promotion, ranking, safety
mutation; durability/multi-process/restart; delivery, intake, transport, DB, network, provider,
secret, or environment behavior; the independent implementation review (reviewed-design §17
WorkUnit 7) and its Advisor gate, which have not yet occurred.

## 8. Required status block

```text
PRODUCT_REPO_WRITE_STATUS: WU4_ALLOWLIST_ONLY
CANDIDATE_DTOS: REVIEW_ONLY_EPHEMERAL
CURRENT_MEMORYCANDIDATE_OR_STORE_WRITE: ZERO
SERVICE_AUDIT_FLAG_POISON_LATCH_OR_PUBLIC_RESPONSE: ZERO
REAL_DB_FILE_SQLITE_DOCKER_NETWORK_PROVIDER_SECRET_ENV_ACCESS: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
APPROVAL_REUSE_PROMOTION_RANKING_SAFETY_MUTATION: ZERO
WORK_UNIT_5_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 9. Boundaries and next

WU4_ALLOWLIST_ONLY (4 product paths) · EphemeralLedger.submit NOT called · WU5 outer-lock/
replay-preserving hard-false submit/poison-latch/service/audit/flag NOT implemented (tests only
model those via landed WU3) · current candidate/furef_v2/retention enum/store writer untouched ·
skin/other = privacy_scope_exceeded fail-closed · candidate/adoption = RAM-only review-only (no
approval/reuse/promotion/ranking/safety mutation, no durable storage) · no reviewer dispatch ·
no new agent/subagent · two pre-existing untracked files byte-untouched.

NEXT: return to foundation-advisor. If the WU4 Advisor dependency/evidence gate passes, the
Advisor may prepare a separate exact WU5 handoff under the existing Founder authorization.
Independent implementation review remains WU7. This Worker starts no later WorkUnit.

```text
RETURN_TO: foundation-advisor
STOP
```
