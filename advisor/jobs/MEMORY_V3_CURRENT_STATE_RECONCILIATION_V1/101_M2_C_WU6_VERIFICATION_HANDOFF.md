# Memory V3 M2 C — WU6 verification Foundation Worker handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU6-VERIFICATION-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: 90d62984e5330c8b985dc6c2f18edf241909d7ed
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
TEST_IMPLEMENTATION_AND_EXECUTION_EFFORT: max
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Outcome and authority

Implement and execute only reviewed-design WorkUnit 6, `C-VERIFICATION`: the
dedicated synthetic fixture and exact service, audit, containment, malicious-input,
concurrency, rollback, serialization, and regression oracles required by final
design section 13.5. This is a test-only WorkUnit. It may not change product source,
design documents, existing tests, dependencies, configuration, schema/migration,
runtime, or any path outside the four-path allowlist.

This handoff does not start WU7 or WU8. It authorizes no endpoint, consumer,
transport, delivery, activated intake, durable/current `MemoryCandidate`,
`SharedMemoryStore`, real-user application, approval, reuse, promotion, ranking,
safety mutation, DB, production, live activation, or M3.

## 1. Required direct reads

Before editing, read directly:

- Agent Office `TEAM_OPERATING_MODEL.md`, `roles/worker.md`, `RUN_PROTOCOL.md`, and
  `RESULT_REPORTING_PROTOCOL.md`;
- `/home/leo/Project/FOUNDATION/AGENTS.md`, `CLAUDE.md`, and
  `docs/testing/TEST_MEANING_POLICY.md`;
- `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md` and
  `docs/security/ENV_AND_MIGRATION_POLICY.md`;
- Founder authorization `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`;
- final current implementation-ready design at foundation-docs commit
  `4480b55f43b876499746efe6497b5e2e4eb1931d`, exact SHA-256
  `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`,
  especially sections 11.1-11.8 and 13.5;
- final same-Reviewer design delta PASS
  `062c1d6391e4f595d5d57e3cc81ec60df3157be0`;
- WU5 product result `90d62984e5330c8b985dc6c2f18edf241909d7ed`;
- WU5 Worker evidence `a937dfe60bb5f2fff78fb0e5c2a8efaac8199157`;
- WU5 Advisor evidence gate `ff5f68121d4791ff610402e7e0aa14b8a75f0e1c`;
- all WU1-WU5 commerce-evidence source and existing tests at the exact baseline.

Apply `/fable-builder` to map each test to a reviewed contract/risk and to produce
truthful result evidence. Do not create an agent or subagent. Verify and visibly
confirm live effort `max` before writing or running tests.

## 2. Exact Foundation write allowlist

Only these four paths may be created or changed:

```text
foundation/shared_memory/tests/test_commerce_evidence_service.py
foundation/shared_memory/tests/test_commerce_evidence_audit.py
foundation/shared_memory/tests/test_commerce_evidence_containment.py
foundation/shared_memory/tests/fixtures/commerce_evidence_service_v1_cases.json
```

Do not edit any product source, WU1-WU5 module, package `__init__.py`, existing test,
design document, dependency, runner, snapshot, generated file, lockfile, config,
schema/migration, feature flag, or unrelated dirt. Do not weaken or skip an existing
assertion. The fixture must be wholly synthetic, contain no real identifier, PII,
secret, credential, raw text, provider data, or customer/order data, and use only
reviewed v1 literals.

## 3. Exact foundation-docs output allowlist

Worker may write, but must not stage, commit, or push, only:

```text
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU6_VERIFICATION_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU6_VERIFICATION_RESULT_POINTER.md
```

Advisor validates and publishes those two evidence artifacts.

## 4. Required ten-oracle proof

All ten reviewed section-13.5 groups must have deterministic injected-fake tests.
A blank group, skipped test, xfail, weakened assertion, or unclassified failure is a
STOP, not Worker discretion.

1. Exact type fields/order, literals, signatures, constructor guards, and Python
   3.7-compatible syntax from sections 11.4-11.6.
2. Flag-OFF and already-poisoned paths call none of parse, ID, clock, verifier,
   WU4, WU3, audit, or metrics as applicable; the three future flags stay hard off;
   the Shadow flag is re-read in the WU3 commit guard.
3. Default UNCONFIGURED verifiers accept zero; every malformed/exceptional clock,
   factory, flag, sink, or truthy-non-`True` result follows its exact fail-closed
   projection.
4. Existing shared dynamic reason codes remain accepted; exactly 18 C codes
   delegate; unknown, unhashable, exception-bearing, typo values collapse to
   `cannot_determine` with no text leakage.
5. Every section-11.8 row, including adverse-policy rejection, collision,
   correction, retraction, exact replay, and unexpected exception, asserts exact
   response/audit/metric fields and call counts.
6. Decision-ID allocation/ownership matches section 11.7; producer, candidate, and
   evidence identifiers appear in no public/audit/metric serialization.
7. Audit allowlist and metric names/ordered labels are exact; accepted/replay is
   not released until both sinks return literal `True`.
8. Rejection sink failure preserves the selected rejection. Accepted/replay
   sink/invariant failure poisons the instance, returns only `cannot_determine`,
   never calls `ledger.clear()`, and preserves an unrelated prior accepted ledger
   snapshot byte-for-byte.
9. WU4 preparation failure still permits exact replay/collision and gate-10
   precedence through hard-false submit; accepted 0/1/2-slot adoption and lifecycle
   outcomes match landed WU3/WU4 exactly.
10. Static containment and legacy regressions prove zero endpoint/network/provider/
    DB/file/env/secret/transport/store/approval/reuse/promotion/ranking/safety
    mutation and unchanged existing shared-memory/subject-ref behavior.

Every important test must name its protected contract, protected risk, and
`MEANINGFUL_PASS` or precise failure classification per Test Meaning Policy.

## 5. Safe test commands and order

All tests run locally with `python3 -B`, synthetic/in-memory fakes only, no network,
DB, Docker, provider, secret, environment mutation, file persistence, snapshot
update, or persistent feature-flag activation. Capture Git status before and after
each stage and require no path outside the four-path allowlist plus the two known
pre-existing untracked files.

Run in this order:

```text
python3 -B -m unittest \
  foundation.shared_memory.tests.test_commerce_evidence_service \
  foundation.shared_memory.tests.test_commerce_evidence_audit \
  foundation.shared_memory.tests.test_commerce_evidence_containment

python3 -B -m unittest discover \
  -s foundation/shared_memory/tests \
  -p 'test_commerce_evidence_*.py'

python3 -B -m unittest \
  foundation.shared_memory.tests.test_shared_memory_v0 \
  foundation.shared_memory.tests.test_subject_ref_v2_hard_gate
```

Also run `git diff --check`, validate the JSON fixture, compile all new tests
without bytecode, and perform static forbidden-surface/leak scans. Do not run a
broader repository suite unless an observed dependency makes it necessary and the
command is proven equally isolated; report that need to the Advisor before scope
expansion.

## 6. Failure discipline

Before changing any test after a failure, classify it under Test Meaning Policy:

```text
REAL_BUG_FOUND
CONTRACT_DRIFT_FOUND
WEAK_TEST_FOUND
MEANINGFUL_FAILURE_KEEP
REQUIRES_ARCHITECTURE_DECISION
```

If a failure requires any WU1-WU5 product-source change, do not patch source in this
WorkUnit. Preserve the meaningful failing oracle, write the exact failure/evidence,
return `NEEDS_SOURCE_PATCH` to the Advisor, and STOP. The Advisor will issue a
separate bounded same-Worker patch handoff and route the resulting delta to the same
independent Reviewer. Do not alter expected values merely to obtain green tests.

## 7. Completion, Git, and durable result

Completion requires:

- every ten-oracle group mapped to named tests with no blank or skipped group;
- fixture synthetic/minimized and JSON-valid;
- dedicated tests, all commerce-evidence tests, and the two load-bearing regression
  modules pass at live `max` effort;
- exact four-path diff, `git diff --check` clean, no product-source/existing-test/
  design/dependency/config/unrelated-dirt change;
- stage only the four allowlist paths;
- create a follow-up commit without amend and non-force push only to the exact
  Shadow branch; verify HEAD equals upstream;
- write truthful result/pointer with actual model/effort, exact commands/counts,
  test-meaning classifications, failures/skips, paths, hashes, commit/push, Git
  before/after, and all forbidden access/status fields.

Result must state:

```text
PRODUCT_REPO_WRITE_STATUS: WU6_FOUR_TEST_FIXTURE_PATHS_ONLY
PRODUCT_SOURCE_CHANGE: ZERO
EXISTING_TEST_CHANGE: ZERO
TEST_EFFORT: max
TEN_ORACLE_GROUPS_COVERED: 10/10
SKIPPED_OR_XFAIL: ZERO
DB_DOCKER_NETWORK_PROVIDER_SECRET_ENV_ACCESS: ZERO
PERSISTENT_FLAG_CHANGE: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
CURRENT_MEMORYCANDIDATE_OR_STORE_WRITE: ZERO
APPLIED_TO_REAL_USER: ALWAYS_FALSE
WRITE_LIVE: ALWAYS_FALSE
PROMOTION_PERFORMED: ALWAYS_FALSE
WU7_OR_WU8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 8. STOP conditions

STOP on runtime/base/branch/upstream/dirt mismatch; inability to set/verify live
`max`; any fifth product path; any WU1-WU5 source, existing test, design, dependency,
config, schema/migration, or flag edit; new policy/version/reason/gate/input; real
identifier/PII/secret/raw text fixture; test requiring DB/Docker/network/provider/
environment mutation/persistence; meaningful failure requiring source correction;
endpoint/consumer/transport/delivery/intake; current `MemoryCandidate`, `furef_v2`,
store connection, approval/reuse/promotion/ranking/safety mutation; production/live;
WU7-WU8; or M3 need.

Return only the compact pointer to `foundation-advisor` and STOP.
