# Memory V3 M2 C — WU5 C-SHADOW-SERVICE Foundation Worker handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU5-SHADOW-SERVICE-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: 3e6abeec04f370dff1844afc429bd39487149c02
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
IMPLEMENTATION_EFFORT: ultracode
FINAL_STATIC_DIFF_SECURITY_EFFORT: max
PRODUCT_TEST_EFFORT: NOT_APPLICABLE — WU5 product tests are forbidden
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Outcome and authority

Implement only reviewed-design WorkUnit 5, `C-SHADOW-SERVICE`: the default-OFF,
one-process ephemeral review-only service and its minimized in-memory audit/metrics
plane, exact flag/reason integration, and the already-authorized canonical product
design/index updates.

This handoff does not start WU6, WU7, or WU8. WU5 owns no test or fixture path and
must run no product test. It authorizes no endpoint, consumer, transport, delivery,
activated intake, durable/current `MemoryCandidate`, `SharedMemoryStore`, real-user
application, approval, reuse, promotion, ranking, safety mutation, DB, production,
live activation, or M3.

## 1. Required direct reads

Before editing, read directly:

- Agent Office `TEAM_OPERATING_MODEL.md`, `roles/worker.md`, `RUN_PROTOCOL.md`, and
  `RESULT_REPORTING_PROTOCOL.md`;
- `/home/leo/Project/FOUNDATION/AGENTS.md` and `CLAUDE.md`;
- `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`;
- `docs/security/ENV_AND_MIGRATION_POLICY.md`;
- `docs/testing/TEST_MEANING_POLICY.md`;
- the existing untracked `docs/FOUNDATION_DOCS_SYNC_POLICY.md` read-only;
- Founder authorization at foundation-docs commit
  `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`;
- documentation allowlist correction at commit
  `36690ec2b0810dc46bb90be9fda4a596d5d17af0`;
- final current implementation-ready design at commit
  `4480b55f43b876499746efe6497b5e2e4eb1931d`, exact SHA-256
  `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`;
- WU5 design PASS at commit
  `38785417440728585f4f9167ea9183347d41d917` and consistency delta PASS at
  `062c1d6391e4f595d5d57e3cc81ec60df3157be0`;
- WU5 Advisor gate at commit
  `afa9479e6e285d7583f0a1c2e9036adc5cd993bc`;
- current canonical product design
  `설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md` and index
  `설계문서/README.md`;
- landed WU1–WU4 commerce-evidence code at the exact product baseline.

Apply `/fable-builder` for contract-to-code mapping and implementation reporting.
The normal tests-before-code step is deliberately **not applicable** here because
the reviewed WU5/WU6 boundary forbids every WU5 test/fixture path and assigns all
executable proof to WU6. Do not create an agent or subagent.

## 2. Exact Foundation product write allowlist

Only these six paths may change:

```text
foundation/shared_memory/commerce_evidence/service.py
foundation/shared_memory/commerce_evidence/audit.py
foundation/feature_flags.py
foundation/shared_memory/reason_codes.py
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
```

Do not create, edit, rename, delete, format, stage, or commit any test or fixture.
Do not modify WU1–WU4 modules, package `__init__.py`, existing API/runtime modules,
dependencies, config, schema/migration, generated files, or the two pre-existing
untracked files.

The documentation paths may record only the reviewed WU5 contract-to-code mapping,
static evidence, version/history/status, and minimal index update required by
`CLAUDE.md`. Add no new policy, architecture, behavior, requirement, or authority.

## 3. Exact foundation-docs output allowlist

Worker may write, but must not stage, commit, or push, only:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_SHADOW_SERVICE_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU5_SHADOW_SERVICE_RESULT_POINTER.md
```

The mirror must be byte-identical to the final product canonical design. Current
pre-WU5 product and mirror SHA-256 are both
`8a813a095dd038d60ac0d2910b9ec16fc5321acf259ad3f992ee07f74033cfed`.
Advisor validates and publishes these three evidence artifacts.

## 4. Exact implementation contract

Implement the final reviewed design sections 11.4–11.8 and 13.5 exactly. The design
is controlling; this summary does not replace it.

### `audit.py`

- exact Python 3.7-compatible `NamedTuple` types, contract literal, field order,
  category constructors, ordered low-cardinality metric labels, and immutable
  response-free records from section 11.4;
- narrow `CommerceEvidenceAuditSink.append(...) -> bool` and
  `CommerceEvidenceMetricsSink.emit_many(...) -> bool` seams;
- instance-scoped `RLock`-protected in-memory defaults only;
- literal `True` is the only success value;
- no payload, raw text, PII, producer/candidate/evidence identifier, credential,
  diagnostic, exception, stack, file, DB, environment, network, provider, or
  external effect.

### `service.py`

- exact `CommerceEvidenceDecisionV1`, `CandidateOutcomeV1`, `_decision_v1`, one
  `CommerceEvidenceShadowService(...)`, and one `.evaluate(...)` surface;
- every section-11.5 dependency and local default exactly, with UNCONFIGURED
  verifiers accepting zero and no default external access;
- one service-owned outer `RLock` and health latch;
- flag-OFF and already-poisoned calls stop before parsing/ID/clock/verifiers/WU4/
  WU3/audit/metrics as the exact path matrix requires;
- allocate one Foundation evaluation ID and one validated UTC time for enabled,
  healthy work; preserve the exact three null-ID paths;
- compose unchanged WU2 validation, WU4 planning/adoption, and WU3 ledger in the
  exact section-11.7 order;
- failed WU4 preparation still enters unchanged WU3 with empty slots and a literal-
  false commit guard so replay/collision gate 9 and lineage gate 10 precede gate 11;
- WU3 commit and audit/metrics are honestly non-atomic: audit/metrics occur after
  WU3; success/replay is released only after both sinks return literal `True`;
- post-accepted/replay assembly/sink/invariant failure returns the exact fail-closed
  projection, preserves every prior ledger item, never calls `ledger.clear()`, and
  poisons the instance until a new in-memory instance/process restart;
- rejection sink failure leaves the selected rejection unchanged and does not
  poison;
- exact decision-ID ownership, category-only response/audit/metric projections,
  candidate-count/adoption invariants, no identifier leakage, and all
  `applied_to_real_user`, `write_live`, `promotion_performed` values fixed false;
- no module singleton, existing API import, endpoint, route, consumer, sender,
  polling, background thread, persistence, store, transport, provider, or runtime
  activation.

### Shared flag and reason integration

- add exactly the four reviewed source literals to `foundation/feature_flags.py`:
  Shadow default `False`; live, intake, and candidate-runtime in `HARD_OFF`;
- preserve existing `get()` behavior, add no setter or environment path;
- update `foundation/shared_memory/reason_codes.py` only with the exact reviewed
  guarded delegation: preserve `_SAFE_DYNAMIC` byte-for-byte, then delegate to the
  landed exact 18-code C guard within the one exception boundary; unknown,
  unhashable, exception-bearing, typo, or service-health values collapse to existing
  `cannot_determine`;
- add no nineteenth C reason or diagnostic channel.

## 5. WU5 static evidence only — no product tests or imports

At `ultracode`, implement only the smallest exact code and documentation delta.
Do not run or create any product test. Do not import/execute the new service modules.

Then switch and visibly verify live effort `max` for one final static/diff/security
audit containing only:

1. `git diff --check` and exact six-path diff inventory;
2. `python3 -B` source reads plus `ast.parse`/`compile(..., 'exec')` of the two new
   modules and two changed Python files, without import, execution, bytecode, or
   repository write;
3. AST/static inspection proving exact types/signatures/fields, four flags, hard-off
   membership, preserved dynamic reason set, 18-code delegation, call ordering, and
   absence of forbidden import/call/name surfaces;
4. static proof that WU1–WU4, all tests/fixtures, existing API/runtime, and unrelated
   dirt are unchanged;
5. byte comparison of the final canonical product design and exact foundation-docs
   mirror;
6. branch, HEAD, diff, staged-path, upstream, and post-work dirt evidence.

If executable behavior must be proved or a test/source path beyond WU5 is needed,
STOP and return to the Advisor. WU6 owns all behavioral oracles.

## 6. Completion, Git, and durable result

Completion requires:

- exact reviewed WU5 contract mapped to the six paths with no blank/Worker choice;
- no WU1–WU4, test/fixture, existing API/runtime, or unrelated dirt change;
- no product test/import/runtime execution;
- static/AST/diff/security evidence passes at max;
- final canonical design and mirror are byte-identical;
- stage only the exact six product paths;
- create a follow-up commit without amend and non-force push only to the exact
  Shadow branch; verify HEAD equals its upstream;
- write truthful result/pointer with actual model, ultracode implementation effort,
  max audit effort, exact commands, paths, hashes, commit/push, skipped tests, and
  all boundaries.

Result must state:

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

## 7. STOP conditions

STOP on runtime/base/branch/upstream/dirt mismatch; any WU1–WU4 or test/fixture edit;
any seventh product path; new policy/version/reason/gate/input; a need to run/import
product code; inability to preserve replay/collision/gate-10 precedence or unrelated
ledger state; non-category output; endpoint/consumer/transport/delivery/intake;
persistence/DB/file/environment/network/provider/secret/PII; current
`MemoryCandidate`, `furef_v2`, store connection, approval/reuse/promotion/ranking/
safety mutation, production/live, WU6–WU8, or M3 need.

Return only the compact pointer to `foundation-advisor` and STOP.
