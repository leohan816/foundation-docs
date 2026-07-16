# M2 C — WU4 C-CANDIDATE-DRAFTS Foundation Worker handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-CANDIDATE-DRAFTS-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: de63c8fedaa27e470e44359cad1c2940bdc0a866
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
IMPLEMENTATION_EFFORT: ultracode
FINAL_TEST_AND_DIFF_EFFORT: max
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Outcome and authority

Implement only reviewed-design WorkUnit 4, `C-CANDIDATE-DRAFTS`: two immutable
Foundation-owned review-only DTOs, a pure pre-ledger candidate plan, a pure
accepted-result adoption function, the read-only current-gate projection, and the
dedicated WU4 test suite.

WU1–WU3 and the WU4 design clarification passed their required gates. This handoff
does not start WU5 or later. It authorizes no service orchestration, public response,
audit/metrics, feature flag, poison latch, endpoint, delivery, activated intake,
durability, database, current `MemoryCandidate`, `SharedMemoryStore`, approval,
reuse, promotion, ranking, safety mutation, or real-user behavior.

## 1. Required reads

Read directly before editing:

- Agent Office common operating model, Worker role, run protocol, and result protocol;
- `/home/leo/Project/FOUNDATION/AGENTS.md`, `CLAUDE.md`;
- `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`;
- `docs/security/ENV_AND_MIGRATION_POLICY.md`;
- `docs/testing/TEST_MEANING_POLICY.md`;
- Founder authorization at commit `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`;
- documentation allowlist correction at commit `36690ec2b0810dc46bb90be9fda4a596d5d17af0`;
- implementation-ready design at commit `954963841af166edf3f9b86ecbcc323945f94ff9`,
  final design SHA-256 `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66`;
- corrected WU4 clarification at commit `f225607a86288e6857d2753bd349927f67469ba6`,
  SHA-256 `f9b9ad15d16daf6dd6edb97621ec3ef4f43efa6173d636d4c6898e5d831f0a2f`;
- independent WU4 design PASS commits `b0a22b8408b6a5a4fada2812a44607a39f4f6926`
  and `c285ebdb429af83ca10bc51e6a0a82f7fa612738`;
- WU3 Advisor gate predecessor evidence in `74_M2_C_WU3_ADVISOR_GATE.md`;
- current canonical product design
  `설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md`;
- landed WU1–WU3 commerce-evidence modules and tests at the exact product base.

Apply `/fable-builder`, write tests before code, keep every change inside the exact
allowlist, and report file-first. Do not create an agent or subagent.

## 2. Exact Foundation product write allowlist

Only these four paths may change:

```text
foundation/shared_memory/commerce_evidence/candidates.py
foundation/shared_memory/tests/test_commerce_evidence_candidates.py
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
```

The two documentation paths are authorized only to record the already-reviewed WU4
contract-to-code/test mapping, version/date/history, and minimal index status. Add no
new policy, architecture, behavior, requirement, or authority.

Do not modify WU1–WU3 modules/tests/package init, WU5 service/audit/flag paths,
shared Foundation code, dependencies, config, schema, migration, generated files,
or the two pre-existing unrelated untracked files.

## 3. Exact foundation-docs write allowlist

Worker may write, but must not stage, commit, or push, only:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_CANDIDATE_DRAFTS_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_CANDIDATE_DRAFTS_RESULT_POINTER.md
```

The mirror must be byte-identical to the final product canonical document. Advisor
publishes these evidence artifacts after validation.

## 4. Exact implementation boundary

Create only `candidates.py` with:

```text
CANDIDATE_CONTRACT_VERSION = "foundation.commerce_evidence_candidate.v1"

CommerceOutcomeCandidateV1
CommerceAdverseCandidateV1
CandidateDraftSeedV1
CandidateDraftPlanV1
CandidateAdoptionV1

plan_candidate_drafts_v1(...)
adopt_candidate_drafts_v1(...)
```

The five immutable types, field order, Python 3.7-compatible annotations, literals,
nullable fields, regexes, and lifecycle categories must match reviewed design §10.1
and §10.5 exactly. Do not subclass or materialize current `MemoryCandidate`.

The planner:

- accepts only a genuine accepted `ValidationResultV1` with `VERIFIED`, `GRANTED`,
  and `feedback_non_adverse_90d`;
- maps deterministic slots in outcome-then-adverse order;
- permits only `usage_safety` adverse construction; skin/other fails closed as
  `privacy_scope_exceeded` with zero state and zero factory calls;
- uses exact injected candidate/evidence ID factories and regexes;
- computes the exact eight-key compact sorted-ASCII candidate hash projection;
- emits exact `.sssZ` occurred-at plus 90-day retention for constructible drafts;
- calls the current gate read-only with exactly the eight-key temporary dictionary
  and exact contexts from reviewed design §10.3;
- accepts only outcome `allow/[allow_shadow_write]` and usage-safety adverse
  `block/[high_sensitivity_reconfirmation_required]` as reviewed policy evidence;
- returns category-only `cannot_determine` with zero slots/seeds for malformed,
  contradictory, exception, invalid-ID, duplicate-ID, timestamp/hash/gate/factory,
  or unexpected input;
- performs no I/O, ledger mutation, service call, store write, or producer response.

The adopter:

- accepts only a planned result and valid WU3 decision/lineage references;
- binds exact fixed literals into final immutable DTOs in seed order;
- performs no factory, parsing, hash, policy, I/O, lookup, or mutation;
- returns an internal adoption only, never a public service decision.

WU4 must not call `EphemeralLedger.submit` or implement the WU5 outer lock,
replay-preserving hard-false submit, response/audit assembly, or poison latch. Its
tests may model those reviewed boundaries using landed WU3, but `service.py` and
all WU3 files remain untouched.

## 5. Tests before code

Write `test_commerce_evidence_candidates.py` before `candidates.py` and record the
honest module-absent failure. Then implement the smallest code that satisfies all
fourteen reviewed-design §13.4 oracles:

1. exact contract literal, DTO fields, annotations, validators, and booleans;
2. exact slot order and satisfaction/usage-safety combinations;
3. exact eight-key golden hashes with explicit null absent axes;
4. exact UTC millisecond +90-day behavior over calendar boundaries;
5. root/correction/retraction lifecycle and zero-factory retraction;
6. skin/other fail-closed and satisfaction cannot suppress adverse blocking;
7. deterministic factory order and total category-only failure handling;
8. exact eight-key current-gate spy shape and exact allowed result pairs;
9. replay/collision/lineage/hard-false ordering modeled against unchanged WU3;
10. accepted-only adoption and zero adoption for reject/collision/replay;
11. count/state mismatch fails closed;
12. modeled post-accepted failure preserves unrelated WU3 state and never calls
    `ledger.clear()`; do not implement the WU5 latch;
13. no DTO/plan/adoption or producer/subject/product/SKU value in simulated public output;
14. AST/static proof of no store/API/service/audit/flag/learning/approval/reuse/
    ranking/safety/file/DB/environment/network/provider/transport/secret/current
    `MemoryCandidate` import or call.

Use synthetic fixtures and in-memory objects only. Never use real data, DB, SQLite,
Docker, filesystem state, network, provider, secret, environment, or clock reads.

## 6. Effort and delta verification

1. Set and verify live effort `ultracode` for test mapping and implementation.
2. During implementation run only the dedicated WU4 candidate suite.
3. Switch and verify live effort `max` for the final test, malicious-input,
   containment, serialization, diff, Git, and mirror audit.
4. At max, run the WU4 candidate suite plus only these load-bearing unchanged
   dependency/regression suites once:

```text
foundation/shared_memory/tests/test_commerce_evidence_validator.py
foundation/shared_memory/tests/test_commerce_evidence_ledger.py
foundation/shared_memory/tests/test_shared_memory_v0.py
foundation/shared_memory/tests/test_subject_ref_v2_hard_gate.py
```

Do not rerun unrelated WU1 contract/hash/reason/verifier suites because those paths
are unchanged. Treat warnings as errors. If a required proof needs a broader test
or code path, STOP and return to Advisor instead of expanding scope.

## 7. Completion, Git, and result

Completion requires:

- all fourteen WU4 oracles pass;
- all declared max-effort delta/regression suites pass;
- product diff contains exactly the four allowlisted paths;
- WU1–WU3 and WU5+ code/tests remain byte-unchanged;
- canonical design and foundation-docs mirror are byte-identical;
- the two pre-existing unrelated untracked files remain untouched and unstaged;
- stage only the exact four product paths;
- create a follow-up commit without amend and non-force push only to the exact
  shadow branch; verify HEAD equals its upstream;
- write truthful durable result/pointer with actual model, implementation effort,
  test effort, commands, counts, failures/skips, diff, commit/push, and boundaries.

Result must state:

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

## 8. STOP conditions

Stop on any runtime/base/dirt mismatch; required WU1–WU3 or service edit; current
`MemoryCandidate`, `furef_v2`, retention enum, store writer, skin/other acceptance,
adverse-hold invention, new reason/version/input field, public response, service,
audit, flag, latch, persistence, delivery, intake, DB, file, environment, network,
provider, secret, real data, unlisted path, or WU5–WU8 need.

Return only the compact pointer to `foundation-advisor` and STOP.
