# Memory V3 M2 C WU6 — bounded existing-test contract correction handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU6-DRIFT-CORRECTION-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
WINDOW_PANE: @3 / %3
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: 90d62984e5330c8b985dc6c2f18edf241909d7ed
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
REQUIRED_SKILL: /fable-builder
TEST_CORRECTION_AND_EXECUTION_EFFORT: max
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 0. Exact authority

Founder selected Option A in response to
`MEMORY_V3-M2-C-WU6-DRIFT-001`. The response and Advisor ACK are committed at
foundation-docs `d058e08989011f2b808b3e4c017168485d837cd6`.

Correct only the stale pre-WU5 test contract in:

```text
foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py
```

Purpose: align `TestSharedGuardNotBroadened` with the already authorized, reviewed,
and landed WU5 section-11.6 shared-reason delegation. This is a test-only correction.
It authorizes no product behavior, source/runtime code, policy, schema, API,
dependency, configuration, transport, delivery, intake, storage, DB, network,
secret, activation, WU7 implementation, or WU8.

## 1. Required reads and preflight

Read directly the Agent Office Worker/run/reporting rules, Foundation `AGENTS.md`,
`CLAUDE.md`, Test Meaning Policy, security/env policies, final design
`4480b55f43b876499746efe6497b5e2e4eb1931d` (SHA-256
`6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`),
WU5 product head `90d6298`, WU6 STOP evidence `4552b89`, Founder decision request
`a0a7bc6`, response/ACK `d058e08`, and the existing failing test directly.

Apply `/fable-builder`. Verify live model/effort/workspace/Git and confirm effort
`max`. Do not create an agent/subagent or dispatch a Reviewer.

The four already-written WU6 files are approved but frozen byte-for-byte for this
correction:

```text
1e5291973037636cf571967b66a6c667e22159811119c63f5af6dd1f03c2d5bc  foundation/shared_memory/tests/test_commerce_evidence_service.py
725d15eced682872788fedade19c1abb903a7ad47723c8259ac35186832dba3e  foundation/shared_memory/tests/test_commerce_evidence_audit.py
79110cf872b74d33b735d034f6c6162139c9156b92a698284b3f35bfc7cf2384  foundation/shared_memory/tests/test_commerce_evidence_containment.py
08f5eebeefa990b4ce6765cbf6e009efee0ef84c35dbc9050be707bae0388f10  foundation/shared_memory/tests/fixtures/commerce_evidence_service_v1_cases.json
```

If any hash differs before correction, STOP. Do not reconstruct or change those
files under this handoff.

## 2. Exact correction

Within `test_commerce_evidence_reason_codes.py` only:

- update `TestSharedGuardNotBroadened.test_shared_guard_not_broadened` and only its
  directly associated explanatory module/class/method comment or docstring;
- assert each exact member of the pinned 18-code C set now delegates unchanged via
  `SHARED_RC.code(code) == code`;
- retain adjacent negative controls proving non-C, unhashable, `None`, typo, and
  unknown inputs collapse to literal `cannot_determine` without text leakage;
- preserve `_PINNED_18`, `TestExact18Set`, the shared `_SAFE_DYNAMIC` equality test,
  every unrelated assertion, import, and test meaning;
- do not skip, xfail, delete, weaken, or rename the protected test.

No other path may be edited. The four frozen WU6 paths may be staged and committed
after all tests pass, but must remain byte-identical to the hashes above.

## 3. Required max-effort test sequence

Run with `python3 -B`, synthetic/in-memory only:

```text
python3 -B -m unittest \
  foundation.shared_memory.tests.test_commerce_evidence_reason_codes.TestSharedGuardNotBroadened.test_shared_guard_not_broadened

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

Also require JSON validity, Python compile without bytecode, frozen WU6 hashes,
`git diff --check`, exact five-path diff/staging, and no unrelated dirt change.
Zero skips/xfail. Any failure must be classified before action; any need for product
source or a sixth path is STOP and return to the Advisor.

## 4. Git and result

Only after every gate is green:

- stage exactly the four frozen WU6 paths plus
  `foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py`;
- verify cached diff and hashes;
- create one follow-up commit without amend;
- non-force push only to `shadow/foundation-shared-memory-v0`;
- verify HEAD equals upstream;
- write, but do not stage/commit/push, only:

```text
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU6_CONTRACT_DRIFT_CORRECTION_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU6_CONTRACT_DRIFT_CORRECTION_RESULT_POINTER.md
```

Report actual model/max effort, exact commands/counts, five paths, frozen hashes,
commit/push, before/after status, test-meaning classification, and all forbidden
access/status fields. Return to `foundation-advisor` and STOP. Do not start WU7.

```text
WU7_STARTED: NO
WU8_AUTHORIZED: NO
PRODUCT_SOURCE_CHANGE: ZERO
DELIVERY_OR_INTAKE: ZERO
DB_NETWORK_SECRET_RUNTIME_ACTIVATION: ZERO
```
