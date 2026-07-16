# M2 C — WorkUnit 1 Contract Freeze Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU1-CONTRACT-FREEZE-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation Worker
TARGET_SESSION: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE: Worker
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: FOUNDATION
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: f6417004d9157766b2b23d4d0870ade7f0c7fe96
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
EXPECTED_UPSTREAM: origin/shadow/foundation-shared-memory-v0

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FOUNDER_AUTHORIZATION_COMMIT: c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2
DOCUMENT_ALLOWLIST_CORRECTION_COMMIT: 36690ec2b0810dc46bb90be9fda4a596d5d17af0
REVIEWED_DESIGN_COMMIT: 7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117
INDEPENDENT_DESIGN_REVIEW_COMMIT: 920359eb03971540dae405dc836cc00f398e4ff1
DESIGN_REVIEW_VERDICT: PASS

ACTUAL_MODEL_REQUIRED_AT_DISPATCH: live verified; do not infer from session name
IMPLEMENTATION_EFFORT: ultracode
TEST_AND_DIFF_AUDIT_EFFORT: max for WU1 final verification
REQUIRED_SKILL: /fable-builder

PRODUCT_COMMIT_PERMISSION: YES
PRODUCT_PUSH_PERMISSION: YES — non-force push only to exact shadow upstream
FOUNDATION_DOCS_COMMIT_PERMISSION: NO — Advisor publishes evidence
BRANCH_CREATE_SWITCH_MERGE_PERMISSION: NO
REAL_DB_NETWORK_SECRET_ENV_PROD_LIVE: FORBIDDEN
WORK_UNIT_2_TO_8: NOT_AUTHORIZED_BY_THIS_HANDOFF
```

## 1. Exact outcome

Implement only reviewed-design section 17 WorkUnit 1, `C-CONTRACT-FREEZE`:

- the exact `cosmile.commerce_evidence.v1` pure data contract;
- the exact immutable 18-code guarded C reason set;
- byte-compatible v1 idempotency and source-hash helpers, including the pinned
  JavaScript `undefined` sentinel serialization behavior;
- synthetic golden fixture and WU1-only tests;
- the required canonical Foundation module design document and its existing
  design index entry, without changing the reviewed policy or architecture;
- a byte-identical mirror of that canonical design document in the unambiguous
  existing foundation-docs Foundation mirror directory.

This WorkUnit does not validate, accept, ingest, store, deliver, normalize,
interpret, or create candidate drafts. It creates no verifier, validator,
ledger, lineage engine, service, audit runtime, endpoint, transport, feature flag,
database, migration, provider, or live import.

## 2. Required direct reads

Read directly before any write:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/worker.md`
3. `/home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md`
4. `/home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md`
5. `/home/leo/Project/FOUNDATION/AGENTS.md`
6. `/home/leo/Project/FOUNDATION/CLAUDE.md`
7. `/home/leo/Project/FOUNDATION/HANDOFF.md`
8. `/home/leo/Project/FOUNDATION/TODO.md`
9. `/home/leo/Project/FOUNDATION/설계문서/README.md`
10. `/home/leo/Project/FOUNDATION/docs/FOUNDATION_DOCS_SYNC_POLICY.md`
11. Founder authorization and documentation correction at their exact commits.
12. Designer result and pointer at `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117`
    plus the independent PASS result/pointer at
    `920359eb03971540dae405dc836cc00f398e4ff1`.
13. The pinned Cosmile producer source at product commit
    `f26fa5ced7083bb8d0af00bda2a54951923ea22f`, read-only, only where the
    reviewed design points to the exact v1 contract/hash behavior. Do not modify
    Cosmile and do not fetch.
14. `/home/leo/Project/skill/fable-builder/SKILL.md` and routed references:
    `contract-to-code-mapping.md`, `test-design-before-code.md`,
    `implementation-execution.md`, `implementation-report-template.md`.

Agent Office is current role authority. foundation-docs role material is evidence,
not current runtime authority. Execute from the pinned files, not session memory.

## 3. Live preflight and preserved dirt

Before writing, verify and record:

```text
ACTOR: foundation Worker
SESSION: foundation / @3 / %3
ACTUAL_MODEL: live value
EFFORT: ultracode
WORKSPACE: /home/leo/Project/FOUNDATION
ROLE: Worker
REQUIRED_SKILL: /fable-builder loaded
INDEPENDENCE: separate from foundation-advisor and future Reviewer
BRANCH: shadow/foundation-shared-memory-v0
HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96
ORIGIN: git@github.com:leohan816/foundation.git
UPSTREAM: origin/shadow/foundation-shared-memory-v0 at the same baseline
```

The exact baseline porcelain hash is:

```text
4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2
```

These two pre-existing untracked files are unrelated and must remain byte-untouched,
unstaged, and uncommitted:

```text
docs/FOUNDATION_DOCS_SYNC_POLICY.md
설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html
```

The first untracked file must be read as the existing sync policy but must not be
staged or committed. Stop on any tracked dirt, overlapping change, branch/HEAD/
origin/upstream mismatch, or additional unexplained preflight dirt.

## 4. Exact Foundation write allowlist

Touch no Foundation path outside this list:

```text
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
foundation/shared_memory/commerce_evidence/__init__.py
foundation/shared_memory/commerce_evidence/contract.py
foundation/shared_memory/commerce_evidence/reason_codes.py
foundation/shared_memory/commerce_evidence/hash_v1.py
foundation/shared_memory/tests/fixtures/commerce_evidence_v1_golden.json
foundation/shared_memory/tests/test_commerce_evidence_contract.py
foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py
foundation/shared_memory/tests/test_commerce_evidence_hash_v1.py
```

The module design document is canonical in Foundation. It must codify the already
reviewed C design without inventing policy, architecture, behavior, scope, or
authority; include version/date/change history and exact design/review/authorization
anchors. Add only the minimal native index entry to `설계문서/README.md`.

Do not add a dependency or touch a package manifest, lockfile, runtime API, shared
reason guard, feature flags, existing test, schema, migration, config, environment,
or generated file.

## 5. Exact foundation-docs write allowlist

The Worker may write only these evidence/mirror paths and must not stage, commit,
amend, or push foundation-docs:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU1_CONTRACT_FREEZE_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU1_CONTRACT_FREEZE_RESULT_POINTER.md
```

The mirror must be byte-identical to the final product design document. Record both
SHA-256 values. `설계문서/README.md` is a local product index and is not mirrored.
Advisor independently audits and publishes these paths after return.

## 6. Required sequence

1. Complete the live/runtime/Git preflight and load `/fable-builder`.
2. Pin and directly inspect the exact reviewed design, independent PASS review,
   Founder authorization, and documentation correction.
3. Create the canonical module design document before code. Include a complete
   contract-to-code/test mapping for WU1 only; a blank or ambiguous mapping is STOP.
4. Write the WU1 tests and fixture before implementation. Record the old-head/new-
   module expected failure honestly; do not weaken or skip an oracle.
5. Implement the smallest pure-Python contract/reason/hash diff. Preserve exact
   field keys, types/nullability/vocabularies, timestamp representation, regexes,
   reason-code set, delimiter-free idempotency formula, sorted custom serializer,
   array-order retention, and literal `undefined` sentinel behavior fixed by the
   reviewed design. Do not implement validation gate order in WU1.
6. Test the pure WU1 surface. Add explicit positive and adjacent-negative set/
   serialization cases suitable for WU1; the later requirement for all 18 positive
   failure triggers belongs to validator verification WU2/WU6, not this contract-only
   WorkUnit.
7. Switch live effort to `max` before the final WU1 tests, changed-path audit,
   privacy/static scan, mirror equality check, and staging review. Record live proof.
8. Confirm no raw text, PII, producer identifiers, credentials, payload examples
   derived from real data, environment access, network/provider/database code, or
   existing runtime import appears. Synthetic identifiers must be visibly synthetic.
9. Explicitly stage only Foundation allowlist paths, inspect cached names and full
   cached diff, commit on the exact shadow branch, non-force push only to the exact
   upstream, and verify the remote-tracking branch contains the commit.
10. Write only the declared foundation-docs result, pointer, and byte-identical
    mirror. Return the compact pointer to Advisor and STOP. Do not start WU2 and do
    not dispatch Reviewer.

## 7. Safe checks

Only run checks whose command/source inspection proves no real DB, network,
provider, secret, environment mutation, snapshot/fixture regeneration, or source
mutation. WU1 final checks should include at minimum:

```text
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_contract
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_reason_codes
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_hash_v1
```

Also run path-scoped static searches for forbidden imports/tokens and inspect the
full staged diff. Do not run product migrations or a database harness. Do not count
static search as a behavior test. If safety cannot be proved, record
`NOT_RUN_SAFETY_UNPROVEN` and STOP if a mandatory WU1 gate remains unproved.

## 8. Completion criteria

- Exact reviewed v1 contract constants/types and synthetic fixture exist with no
  permissive alias/coercion or policy interpretation.
- Exact 18 C reason strings are present once in the dedicated immutable set;
  shared guarded delegation is deferred to WU5.
- Idempotency and source-hash outputs reproduce the pinned producer bytes,
  including delimiter-free concatenation and the JS `undefined` token.
- Tests fail meaningfully before implementation and pass after it; WU1 contract,
  code, and test mapping has no blank cell.
- No validator/verifier/ledger/lineage/candidate/service/audit/flag/API/runtime
  connection or forbidden dependency exists.
- Canonical design document and byte-identical mirror exist; README receives only
  the minimal index addition.
- Only allowlisted Foundation paths are committed and pushed; unrelated dirt is
  byte-untouched and unstaged.
- Durable result/pointer truthfully identifies proof, non-proof, residual risk,
  product commit/push, mirror equality, and the next gate as Advisor—not WU2.

## 9. STOP conditions

Stop and return evidence for any:

- live Actor/session/model/effort/workspace/branch/HEAD/origin/upstream mismatch;
- v1 field, reason, algorithm, or reviewed-design ambiguity;
- need to touch outside either exact allowlist or to change a dependency;
- actual/possible secret, PII, raw text, real order/user identifier, provider,
  network, DB, migration, endpoint, transport, consumer, runtime import, flag,
  current candidate, store, approval/reuse/promotion/ranking/safety mutation;
- unrelated dirty-file collision, authentication/approval prompt, push/ancestry
  verification failure, or failing mandatory test that cannot be fixed inside WU1;
- need to infer policy, delivery, intake, durability, legal retention, identity,
  credential, production, WorkUnit 2–8, Full Package 1B, or M3 authority.

WorkUnit 8 is always forbidden. No later WorkUnit starts automatically.

## 10. Result contract

Write the result and pointer at the exact declared paths using the Agent Office
result protocol and fable-builder implementation-report template. Include:

- runtime/Git preflight and before/after dirt;
- exact pinned commits and files read;
- WU1 contract-to-code-test manifest;
- initial failing and final passing test evidence;
- full commands and exit codes by test/static/diff layer;
- changed/staged/committed/unstaged/untracked path lists;
- product commit, push, upstream containment verification;
- canonical/mirror hashes and byte-equality result;
- what was proved, not proved, and deferred;
- at least three Reviewer attack questions;
- rollback as removal of still-unimported WU1 package plus docs in a reviewed
  forward change; no history rewrite;
- the following exact boundaries:

```text
PRODUCT_REPO_WRITE_STATUS: WU1_ALLOWLIST_ONLY
REAL_DB_ACCESS: ZERO
NETWORK_PROVIDER_ACCESS: ZERO
SECRET_ENV_PII_ACCESS: ZERO
PRODUCTION_LIVE_ACCESS: ZERO
FEATURE_FLAG_CHANGE_OR_ACTIVATION: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
VALIDATOR_VERIFIER_LEDGER_CANDIDATE_SERVICE: ZERO
CURRENT_MEMORY_OR_SHARED_MEMORY_STORE_CONNECTION: ZERO
WORK_UNIT_2_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RETURN: true
```

Return only the pointer block and STOP.
