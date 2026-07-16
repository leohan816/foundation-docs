# M2 C — WU3 C-EPHEMERAL-LEDGER Foundation Worker handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU3-EPHEMERAL-LEDGER-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: c42c69b42fed3428f3d15b834b193bb8c79c7ef5
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
IMPLEMENTATION_EFFORT: ultracode
FINAL_TEST_AND_DIFF_EFFORT: max
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Outcome and authority

Implement only reviewed-design WorkUnit 3, `C-EPHEMERAL-LEDGER`: pure lineage
rules plus an instance-scoped, one-process, in-memory `RLock` reference ledger for
gates 9–11. WU1 and WU2 passed their Advisor gates; WU2 evidence is published at
foundation-docs `6632261ac8d1731b03d87acd95e79df32ba7e435`.

This handoff does not start WU4 or later. It does not authorize candidate DTOs,
service orchestration, audit/metrics, feature flags, endpoints, delivery, intake,
durability, database, or runtime use.

## 1. Required reads

Read directly:

- Agent Office common/Worker/Run/Result rules;
- `/home/leo/Project/FOUNDATION/AGENTS.md`, `CLAUDE.md`, and applicable local rules;
- Founder authorization `c96caef...` and documentation correction `36690ec...`;
- reviewed design `7cbcb8d9...`, especially §§3, 5.1 gates 9–11, 7, 9,
  12.1, 12.2, 13, 14, 15, 16, and 17 WorkUnit 3;
- independent design review PASS `920359eb...`, especially C-R4/C-R7;
- canonical product design
  `설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md`;
- WU1/WU2 code and tests at the exact product base;
- WU2 Advisor gate `71_M2_C_WU2_ADVISOR_GATE.md`.

Apply `/fable-builder` contract-to-code mapping, tests-before-code, narrow
implementation, and file-first result reporting. No new agent/subagent.

## 2. Exact product write allowlist

Only these six Foundation paths may change:

```text
foundation/shared_memory/commerce_evidence/ledger.py
foundation/shared_memory/commerce_evidence/lineage.py
foundation/shared_memory/tests/test_commerce_evidence_ledger.py
foundation/shared_memory/tests/test_commerce_evidence_lineage.py
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
```

Do not modify WU1/WU2 modules/tests/fixture/package init, shared Foundation code,
feature flags, API/store/reason guards, dependencies, config, schema, migration, or
the two pre-existing untracked intake files.

The canonical design may add only the reviewed WU3 contract-to-code-test mapping,
implementation notes, version/history, and exact rollback evidence. README receives
only its minimal version/status update. Add no new policy or architecture.

## 3. foundation-docs write allowlist

Worker may write but must not stage/commit/push only:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU3_EPHEMERAL_LEDGER_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU3_EPHEMERAL_LEDGER_RESULT_POINTER.md
```

The mirror must be byte-identical to the final product canonical document. Advisor
publishes the three artifacts and gate after audit.

## 4. WU3 boundary model

### 4.1 Inputs and outputs

WU3 receives only a WU2-validated synthetic envelope plus WU2 category statuses
and an injected commit guard. It must not call WU2 verifiers, normalize input, or
re-run gates 1–8. Tests may use existing WU1 golden envelopes and WU2 fake
VERIFIED/GRANTED validation to prepare accepted synthetic input.

Define only narrow internal WU3 result/state categories. This is not the future
`CommerceEvidenceDecisionV1` service response. Never return producer evidence,
source-event, idempotency, actor, purchase, product, SKU, consent, or hash values.

### 4.2 Candidate boundary

WU3 does not create candidate DTOs. It may receive only the exact generic slot
categories `outcome` and `adverse` as synthetic transaction effect requests and
atomically reserve `(source_service, evidence_id, candidate_slot)` once. It may
return only created slot categories/counts to tests. No candidate ID, content,
mapping, current MemoryCandidate, `furef_v2`, approval, reuse, store write, rank,
safety mutation, or service response. WU4 owns candidate DTO mapping.

### 4.3 Kill-switch seam

WU5 owns the source feature flag. WU3 must not import or modify feature flags.
Instead accept a narrow injected, side-effect-free `commit_guard()` seam and call
it under the ledger lock immediately before committing. A false/exception/invalid
result fails closed as `cannot_determine`, commits zero state, and creates zero
slots. No permissive default is allowed; the default/unconfigured guard must block.

## 5. `lineage.py` exact rules

Implement pure, immutable/category-only lineage planning/validation, with no global
state and no persistence.

### Root (`purchase_feedback`)

- `root_evidence_id == evidence_id`;
- `supersedes_evidence_id is None` and `retracts_evidence_id is None`;
- no active root exists for the same authenticated source service + purchase item;
- a tombstoned purchase lineage returns `evidence_retracted`;
- otherwise invalid/mismatched state returns `lineage_broken`.

### Correction

- root exists and is not tombstoned;
- `root_evidence_id` references that root;
- `supersedes_evidence_id` equals the exact current leaf;
- `retracts_evidence_id is None`;
- subject, purchase-item, product, and SKU identity equal the root (including null
  versus non-null SKU; no re-key or guessed SKU transition);
- the target has no existing successor;
- success advances the sole current leaf; predecessor lifecycle category becomes
  `superseded` atomically.

### Retraction

- root exists and is not tombstoned;
- `root_evidence_id` references that root;
- `retracts_evidence_id` equals the exact current leaf;
- `supersedes_evidence_id is None`;
- subject, purchase-item, product, and SKU equal the root;
- the target has no successor;
- success creates no slot, tombstones the root, marks lineage eligibility `revoked`,
  and records lifecycle category `blocked` atomically.

Tombstone/evidence-retracted wins over ordinary lineage-broken where the reviewed
design specifies it. Parent must already exist; do not buffer or infer by arrival
time. Arrival order never overrides the lock/current-leaf rule.

## 6. `ledger.py` exact gates 9–11

Use one instance-scoped `threading.RLock`. No module/global mutable ledger. No
file, SQLite, DB, Docker, network, environment, provider, secret, clock read, or
`SharedMemoryStore`.

### Gate 9 — replay and collision

Primary identity:

```text
(source.service, source.source_event_id)
```

Enforce inside the atomic operation:

1. unique source-event identity;
2. unique `(source_service, evidence_id)`;
3. unique `(source_service, idempotency_key)`;
4. one successor target across correction/retraction;
5. unique `(source_service, evidence_id, candidate_slot)` for `outcome|adverse`;
6. one tombstone per `(source_service, root_evidence_id)` plus replay block for the
   same source/purchase lineage.

Fingerprint exactly:

```text
"sha256:" + sha256(UTF8(json.dumps(
  {"envelope": exact_validated_envelope_projection,
   "provenance_status": category,
   "consent_status": category},
  sort_keys=True, separators=(",", ":"), ensure_ascii=True
))).hexdigest()
```

An exact committed primary replay with matching fingerprint returns the original
Foundation decision ID/lineage pointer and current effective category with
`replayed=True`, creates zero effects, and does not re-run mutable lineage. A
primary collision, or new primary reusing evidence ID/idempotency key, returns
`duplicate_evidence` and commits zero state. Matching source hash alone is never
replay identity/authentication.

### Gate 10 — lineage/current state

Apply the pure lineage rules above under the same lock. Competing correction or
retraction writers follow reviewed-design §7.4 exactly:

- two corrections: first wins, loser `lineage_broken`;
- correction first then old-target retraction: loser `lineage_broken`;
- retraction first then correction: loser `evidence_retracted`;
- two distinct retractions: first wins, later `evidence_retracted`;
- exact retry of any committed event: exact replay, same IDs, zero new effects.

### Gate 11 — atomic commit

Under the same lock:

1. recheck the injected commit guard;
2. recheck every uniqueness and lineage condition;
3. allocate/adopt a Foundation decision ID and one lineage pointer per root;
4. append one receipt/node;
5. append generic slot reservations or lifecycle categories only;
6. commit all or none.

Use exact opaque patterns:

```text
decision_id:     ^fcei_dec_v1_[0-9a-f]{32}$
lineage_pointer: ^fcei_lin_v1_[0-9a-f]{32}$
```

Allocate with injectable factories defaulting to `uuid.uuid4().hex`. Never derive
them from producer values. Tests inject deterministic factories. Exact replay
returns stored IDs. Pre-commit rejection may have an evaluation decision ID but
must reserve no untrusted producer identity.

Implement commit by copy-on-write or explicit rollback so an injected failure at
each mutation boundary leaves every receipt/index/root/leaf/tombstone/slot/effect
count unchanged. Unexpected exceptions collapse to `cannot_determine` with no
exception text and no partial state.

## 7. Instance inspection and cleanup boundary

Expose only low-cardinality/category-only test inspection such as counts and
effective-state categories. Do not expose identifier-keyed maps or payloads. A
`clear()`/new-instance operation may prove restart/rollback semantics; it must erase
all in-memory state. Do not claim restart-safe, multi-process, file, or durable
behavior. Do not invent adverse retention duration or a production cleanup policy.

## 8. Tests before code

Write `test_commerce_evidence_lineage.py` and
`test_commerce_evidence_ledger.py` before the two modules and record honest
module-absent failures.

Required test groups:

- root/correction/retraction/out-of-order/wrong-root/wrong-current-leaf;
- subject/purchase/product/SKU cross-root mismatch and no re-key;
- tombstone monotonicity and no resurrection;
- exact replay returns same IDs and zero new slot/effect counts;
- primary/evidence/idempotency collisions;
- target successor uniqueness;
- candidate slot reservation uniqueness only (`outcome|adverse` categories; no DTO);
- correction/retraction lifecycle categories and retraction zero slots;
- all reviewed §7.4 races using barriers/repeated deterministic schedules;
- at least 100 exact replays and repeated thread races with one commit/slot;
- commit guard OFF/exception/non-bool inside lock yields zero state;
- injected failure at every commit mutation boundary rolls back all state;
- instance isolation, `clear()`, and no restart/durability claim;
- response/repr/snapshot contains no producer identifier/hash/payload/exception;
- no file/DB/network/env/provider/secret/store/API/flag/candidate/service import.

Use synthetic fixtures only. No actual DB, `:memory:` SQLite, Docker, network,
provider, secret, environment, clock, file, schema, migration, or generated fixture.

## 9. Effort and delta verification

1. Set/verify live effort `ultracode` for mapping/tests/implementation.
2. Run only WU3 lineage/ledger suites during implementation.
3. Run WU2 validator/verifier suites once as the dependency integration delta;
   WU1 need not rerun because WU3 must not change WU1/WU2 dependencies.
4. Switch/verify live effort `max` before final malicious/concurrency/rollback/
   containment/diff/mirror/staging audit.
5. Do not run unrelated Foundation suites.

## 10. Completion, Git, and result

Completion requires:

- all WU3 tests pass and all exact race/rollback invariants hold;
- diff contains exactly the six allowlisted paths;
- WU1/WU2 files unchanged and WU2 dependency suites pass;
- canonical design/mirror bytes match;
- two pre-existing untracked intake files remain byte-untouched/unstaged;
- explicit staging of only six allowlisted product paths;
- follow-up commit (no amend), non-force push to exact shadow branch, HEAD==upstream;
- durable result/pointer truthfully record proof/non-proof/risks/model/effort.

Result must state:

```text
PRODUCT_REPO_WRITE_STATUS: WU3_ALLOWLIST_ONLY
ONE_PROCESS_EPHEMERAL_ONLY: TRUE
DURABLE_OR_MULTI_PROCESS_CLAIM: ZERO
REAL_DB_FILE_SQLITE_DOCKER_NETWORK_PROVIDER_SECRET_ENV_ACCESS: ZERO
SHARED_MEMORY_STORE_OR_EXISTING_API_WRITE: ZERO
CANDIDATE_DTO_OR_RUNTIME_CREATED: ZERO
FEATURE_FLAG_GATE0_SERVICE_AUDIT_METRICS: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
WORK_UNIT_4_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 11. STOP conditions

Stop for base/runtime mismatch; need for a durable/cross-process backend, product
schema/migration/DB/file/SQLite, actual candidate DTO/content, current memory/store,
feature flag/service/audit/metrics, new policy/ID semantics, product identifier
echo, unlisted path, dependency, real data/network/provider/secret/env, or WU4–WU8.

Return only the compact pointer to `foundation-advisor` and STOP.
