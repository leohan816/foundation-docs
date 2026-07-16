# M2 C — WU5 C-SHADOW-SERVICE Foundation Worker result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-SHADOW-SERVICE-001
ROLE: Foundation Worker
ACTOR_ID: foundation (session foundation @3 %3; same implementation actor as WU1-WU4)
REQUIRED_SKILL_APPLIED: /fable-builder
ACTUAL_MODEL: Opus 4.8 (claude-opus-4-8) — verified live (not inferred from session name);
  same session/actor.
IMPLEMENTATION_EFFORT: ultracode (live, user-set this turn) for §12 map + audit.py + service.py
  + flag/reason edits + doc.
FINAL_STATIC_DIFF_SECURITY_EFFORT: ultracode (live). DECLARED DEVIATION: the handoff directs a
  switch to `max` for the final static/diff/security audit; live effort is user-controlled and
  was set to `ultracode` (xhigh + orchestration) at turn start, so the Worker could not
  self-elevate to `max` mid-turn. The static/AST/diff/security/mirror audit is deterministic
  (script-driven ast.parse/compile + AST inspection) and was executed in full with every check
  green; no result depends on the reasoning tier. Flagged honestly rather than reported as max.
RESULT_STATUS: COMPLETE — reviewed WU5 contract mapped to the six paths; static gates pass;
  non-force pushed; HEAD == upstream. No product test/import/runtime execution.
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 1. Outcome

Implemented reviewed-design WorkUnit 5 (`C-SHADOW-SERVICE`) exactly and only: the default-OFF,
one-process ephemeral review-only `CommerceEvidenceShadowService` and its minimized in-memory
audit/metrics plane, the exact feature-flag and shared-reason integration, and the authorized
canonical product-design/index updates. No endpoint, consumer, transport, delivery, intake,
durable/current `MemoryCandidate`, `SharedMemoryStore`, store write, approval, reuse, promotion,
ranking, safety mutation, DB, production, or live activation exists. Per the reviewed WU5/WU6
boundary, no test or fixture was written and no product code was imported or executed.

## 2. Anchors verified directly before writing (DO_NOT_EXECUTE_FROM_MEMORY honored)

| Anchor | Commit | Verify |
|---|---|---|
| Final implementation-ready design | `4480b55` | SHA-256 `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9` = handoff pin (MATCH) |
| WU5 design PASS / consistency delta PASS | `3878541` / `062c1d6` | present; ancestors of docs HEAD |
| WU5 Advisor gate | `afa9479` | present; ancestor |
| Founder authorization / doc allowlist correction | `c96caef` / `36690ec` | present; ancestors |
| Landed WU1-WU4 product base | Foundation `3e6abee` | validator/candidates/ledger/verifiers/gate/contract/feature_flags/reason_codes read directly |
| Pre-WU5 canonical + mirror design | — | both SHA-256 `8a813a09…4033cfed` (handoff-stated baseline) MATCH |

Read directly at pinned head: reviewed design §11.1 (response), §11.2 (audit), §11.3 (metrics),
§11.4 (Python 3.7 types/constructors), §11.5 (injected deps/defaults), §11.6 (flag + shared
reason), §11.7 (orchestration/audit honesty/decision-ID ownership), §11.8 (path projections),
§13.5 (WU5/WU6 boundary + STOPs). Landed public surfaces composed (not retyped):
`validate_commerce_evidence_v1`/`ValidationResultV1`/`STATUS_ACCEPTED`,
`plan_candidate_drafts_v1`/`adopt_candidate_drafts_v1`/`_default_candidate_id`/`_default_evidence_ref`,
`EphemeralLedger`/`_default_decision_id`/`_default_lineage_pointer`,
`UnconfiguredProvenanceVerifier`/`UnconfiguredConsentVerifier`, `gate_decision`,
shared `reason_codes.code`, `feature_flags.get`.

## 3. Product write allowlist (exactly six; nothing else)

```text
foundation/shared_memory/commerce_evidence/service.py   (new)
foundation/shared_memory/commerce_evidence/audit.py     (new)
foundation/feature_flags.py                             (additive)
foundation/shared_memory/reason_codes.py                (additive)
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md    (modified: +§12, v0.5)
설계문서/README.md                                       (modified: index v0.5 line)
```

`git diff --name-only 3e6abee 90d6298` = exactly those six. WU1-WU4 commerce-evidence modules,
the package `__init__.py`, all tests/fixtures, and existing shared-memory API/runtime
(`api.py`/`store.py`/`gate.py`/`contract.py`/`_factory.py`/`subject_identity.py`/`eval.py`) are
byte-unchanged. `api.py` does not import the C package. The two pre-existing unrelated untracked
files remain untracked, untouched, and unstaged.

## 4. What landed (reviewed §11.4-§11.8)

- `service.py`: `DECISION_CONTRACT_VERSION`; `CandidateOutcomeV1`; `CommerceEvidenceDecisionV1`
  (12 fields, exact order); `_decision_v1` (guards every reason via shared `reason_codes.code`;
  reason array `()` or one guarded primary; stamps contract version and all three invariants
  false; invalid combination → fixed rejected/`cannot_determine` shape);
  `CommerceEvidenceShadowService` (12 injected seams, §11.5 defaults with UNCONFIGURED verifiers
  accepting zero, landed factories reused, `flag_reader=feature_flags.get`; constructor validates
  callability/interfaces with fixed `TypeError` messages only; one outer `RLock` +
  `candidate_effect_healthy` latch); `.evaluate(envelope, *, opaque_ingress_context=None)`.
  Orchestration (§11.7): gate 0 flag exact-`True` (OFF → `disabled`, no parse; poisoned →
  `cannot_determine`, no parse) → one evaluation decision ID + one valid UTC time → WU2 →
  WU4 plan (failed plan still enters unchanged WU3 with `requested_slots=()` and a hard-false
  guard so gate-9 replay/collision and gate-10 lineage precede gate-11) → WU3 `submit` with
  `decision_id_factory=lambda: evaluation_id` → audit append then metrics emit, each requiring
  literal `True` before releasing `accepted`/`exact_replay`. Post-accepted/replay failure
  discards this call's adoption, sets the latch false, returns `cannot_determine`, never calls
  `ledger.clear()`, preserves all prior ledger state; pre-ledger unexpected exceptions do not
  poison. Rejection-path candidate state: `privacy_scope_exceeded` → `blocked`; other WU2
  rejection codes → `not_created` (§11.8). Category-only response; only Foundation IDs returned.
- `audit.py`: `AUDIT_CONTRACT_VERSION`; `SafeEnvelopeCategoriesV1`; `CommerceEvidenceAuditV1`
  (20 allowlisted category fields); `CommerceEvidenceMetricV1`; `safe_envelope_categories_v1`
  (v1-enum-only, else null); `build_audit_v1` (invalid enum/count/type/exception → None, no
  diagnostic); `build_metrics_v1` (six §11.3 names, §11.8 fixed ordered labels, null → literal
  `none`, event counters value 1, invariant/flag gauges value 0); narrow `append`/`emit_many` →
  `bool` seams; instance-scoped `RLock` in-memory defaults with literal-`True`-only success and
  no payload/identifier/file/DB/env/network/provider.
- `feature_flags.py` (additive): `commerce_evidence_c_shadow`=`False` plus
  `commerce_evidence_c_live`/`_intake`/`_candidate_runtime` in `HARD_OFF`; existing
  `FLAGS`/`HARD_OFF`/`get()`/`hard_off_enforced()` byte-unchanged; no setter/env path.
- `reason_codes.py` (additive): `_SAFE_DYNAMIC` preserved byte-for-byte; `code()` delegates to
  the landed 18-code C guard inside one `try/except`; unknown/unhashable/exception/typo/
  service-health → existing `cannot_determine`; no nineteenth C reason.

## 5. Static evidence only — no product tests or imports (reviewed §5 / §13.5)

Executed at live `ultracode`; deterministic:

1. `git diff --check` clean; exact six-path diff inventory confirmed.
2. `python3 -B` `ast.parse` + `compile(src, name, 'exec')` of the two new modules and two changed
   Python files — code objects only, **no import, no execution, no bytecode write, no repo write**:
   service.py (393 lines), audit.py (247), feature_flags.py (18), reason_codes.py (36) — all OK.
3. AST structural proof (no import): `CommerceEvidenceDecisionV1`/`CandidateOutcomeV1` field
   order; `_decision_v1` and `.__init__` (12 seams) and `.evaluate` signatures; contract-version
   literals; `SafeEnvelopeCategoriesV1`/`CommerceEvidenceAuditV1` (20 fields)/`CommerceEvidenceMetricV1`
   fields; sink seams; `threading.RLock` present.
4. AST containment (no forbidden import/attr/name/call): zero socket/ssl/requests/urllib/http/
   subprocess/sqlite/boto/psycopg/os/`api`/`store`/`_factory` imports; zero
   ingest/write_approved_memory/clear/environ/getenv/urlopen/Popen/system/connect/recv/sendall/
   flush attributes; zero `SharedMemoryStore`/`MemoryCandidate` names; zero open/eval/exec calls.
   Import allowlist = only the required composition seams. Orchestration order proven
   validate(206) < plan(214) < submit(226). Poison latch set-`False` present; no `.clear()` in
   service. No module-level service singleton.
5. Integration proof: four flag literals + values; `FLAGS[shadow]=False`; `HARD_OFF +=` the three
   hard-off names; `_SAFE_DYNAMIC` members byte-identical to `HEAD`; shared `code()` imports and
   delegates to `commerce_evidence_code` inside `try/except`.
6. Unchanged proof: WU1-WU4 modules + `__init__`, all tests/fixtures, and existing API/runtime not
   in diff; `api.py` does not import C.
7. Byte comparison: canonical design and foundation-docs mirror identical, sha256
   `438f785fcc11b3db4cbe4ed84b85393de509332787d2b3d64c0dca02e173c7cf`, `cmp` PASS.
8. Git: base `3e6abee` (== handoff baseline == prior upstream); HEAD
   `90d62984e5330c8b985dc6c2f18edf241909d7ed` (6 files, +711/-4); non-force push
   `3e6abee..90d6298`; HEAD == upstream, 0/0; remote-contains TRUE. Post-work porcelain = the two
   pre-existing untracked files only.

## 6. Proved vs not proved

Proved (static, no execution): exact types/field order/signatures/literals; four flags with
default-OFF shadow and hard-off live/intake/candidate-runtime; preserved dynamic reason set with
18-code delegation and `cannot_determine` fallback; flag-first orchestration order and hard-false
WU3 submit on plan failure; poison-latch containment with no `ledger.clear()`; category-only
projections with all three invariants false; containment (no endpoint/network/provider/DB/file/
env/secret/store/legacy-API surface); WU1-WU4/tests/API unchanged; byte-identical mirror;
six-path diff.

Not proved / not performed (assigned to WU6 by §13.5, or out of scope): all executable behavioral
oracles (§13.5 items 1-10) — flag/poison short-circuit call-counts, UNCONFIGURED-accept-zero and
fail-closed projections, exact §11.8 response/audit/metric field and call-count assertions,
decision-ID ownership, success-release-after-both-sinks-True, rejection-vs-accepted sink-failure
poison behavior, replay/collision/gate-10 precedence under WU4 failure, adoption/lifecycle
outcomes, containment/legacy regression via runtime — none run here (no product test or import).
Also not performed: independent WU5 implementation review; any WU6-WU8 or M3 step; delivery,
intake, transport, DB, network, provider, secret, or environment behavior.

## 7. Required status block

```text
PRODUCT_REPO_WRITE_STATUS: WU5_SIX_PATH_ALLOWLIST_ONLY
PRODUCT_TEST_EXECUTION: ZERO_BY_REVIEWED_WU5_WU6_BOUNDARY
PRODUCT_IMPORT_OR_RUNTIME_EXECUTION: ZERO
DEFAULT_SHADOW_FLAG: OFF
LIVE_INTAKE_CANDIDATE_RUNTIME_FLAGS: HARD_OFF
DEFAULT_UNCONFIGURED_ACCEPTED_EVIDENCE: ZERO
DEFAULT_CANDIDATE_DRAFTS: ZERO
APPLIED_TO_REAL_USER: ALWAYS_FALSE
WRITE_LIVE: ALWAYS_FALSE
PROMOTION_PERFORMED: ALWAYS_FALSE
WU1_TO_WU4_CHANGE: ZERO
WU6_TO_WU8_STARTED: NO
DB_FILE_SQLITE_DOCKER_NETWORK_PROVIDER_SECRET_ENV_ACCESS: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
CURRENT_MEMORYCANDIDATE_OR_STORE_WRITE: ZERO
APPROVAL_REUSE_PROMOTION_RANKING_SAFETY_MUTATION: ZERO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 8. Boundaries and next

Result, pointer, and byte-identical mirror are written **unstaged** in the foundation-docs
worktree; nothing staged/committed/pushed there (Advisor publishes). No reviewer dispatch, no new
agent/subagent. One declared deviation only: the final static audit ran at live `ultracode`
(user-set), not `max`, because effort is user-controlled; the audit is deterministic and fully
green.

NEXT: return to foundation-advisor for the WU5 dependency/evidence gate. If it passes, the Advisor
may prepare a separate exact WU6 handoff (all behavioral oracles, tests/fixtures) under the
existing Founder authorization. This Worker starts no later WorkUnit.

```text
RETURN_TO: foundation-advisor
STOP
```
