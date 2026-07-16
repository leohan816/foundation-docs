# M2 C — WorkUnit 2 Verifier/Validator Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-VERIFIER-VALIDATOR-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation Worker
TARGET_SESSION: foundation
TARGET_WINDOW_ID: @3
TARGET_PANE_ID: %3
ROLE: Worker — same Foundation implementation actor
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: FOUNDATION
TARGET_REPOSITORY: /home/leo/Project/FOUNDATION
TARGET_BRANCH: shadow/foundation-shared-memory-v0
BASELINE_COMMIT: c7653b77900e6613d75fcc0f72577e6bbcb171fd
EXPECTED_ORIGIN: git@github.com:leohan816/foundation.git
EXPECTED_UPSTREAM: origin/shadow/foundation-shared-memory-v0

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
WU1_EVIDENCE_COMMIT: f5c66a83bdea0593faec9f69a6c1aa5d736276d6
WU1_ADVISOR_GATE: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/64_M2_C_WU1_ADVISOR_GATE.md
FOUNDER_AUTHORIZATION_COMMIT: c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2
DOCUMENT_ALLOWLIST_CORRECTION_COMMIT: 36690ec2b0810dc46bb90be9fda4a596d5d17af0
REVIEWED_DESIGN_COMMIT: 7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117
INDEPENDENT_DESIGN_REVIEW_COMMIT: 920359eb03971540dae405dc836cc00f398e4ff1

IMPLEMENTATION_EFFORT: ultracode
FINAL_WU2_TEST_AND_DIFF_EFFORT: max
REQUIRED_SKILL: /fable-builder

PRODUCT_COMMIT_PERMISSION: YES
PRODUCT_PUSH_PERMISSION: YES — non-force exact shadow upstream only
FOUNDATION_DOCS_COMMIT_PERMISSION: NO — Advisor publishes evidence
BRANCH_CREATE_SWITCH_MERGE_PERMISSION: NO
REAL_DB_NETWORK_PROVIDER_SECRET_ENV_PROD_LIVE: FORBIDDEN
WORK_UNIT_3_TO_8: NOT_AUTHORIZED_BY_THIS_HANDOFF
```

## 1. Exact outcome

Implement only reviewed-design section 17 WorkUnit 2,
`C-VERIFIER-VALIDATOR`:

- the exact fail-closed provenance verifier protocol/verdict and default
  `UNCONFIGURED` implementation from reviewed design §6.1;
- the exact fail-closed current-effective-consent verifier protocol/verdict and
  default `UNCONFIGURED` implementation from §6.2;
- a pure, injected-clock Foundation validator for ordered gates 1–8 from §5.1,
  using the WU1 exact contract/hash/reason primitives;
- strict shape/type/value, raw/PII, identity, provenance, consent, purchase,
  closed-normalization, and retention-policy checks fixed by §§4–6 and §8;
- WU2-only synthetic tests covering gate precedence, default rejection, safe
  category-only results, and adjacent negatives;
- the required canonical module design-document update and byte-identical mirror.

Do not implement gate 0/feature-flag orchestration, gates 9–11, replay, ledger,
lineage state, candidates, service response, audit, metrics, endpoint, transport,
database, durable storage, or any runtime importer.

## 2. Required direct reads

Before any write, directly read:

1. current Agent Office operating model, Worker role, RUN and RESULT protocols;
2. current FOUNDATION `AGENTS.md`, `CLAUDE.md`, `HANDOFF.md`, `TODO.md`, design
   index, canonical module design document, and docs sync policy;
3. Founder authorization/correction, reviewed Designer result, independent PASS
   review, WU1 handoff/result/pointer, and Advisor gate at their exact commits;
4. product WU1 commit and correction commit, current WU1 modules/tests/fixture;
5. existing read-only `foundation/shared_memory/subject_identity.py`,
   `foundation/shared_memory/gate.py`, and `reason_codes.py` before reusing a
   validation primitive;
6. `/home/leo/Project/skill/fable-builder/SKILL.md` and routed references
   `contract-to-code-mapping.md`, `test-design-before-code.md`,
   `implementation-execution.md`, `implementation-report-template.md`.

Execute from files, not memory. Agent Office is role authority. No new agent,
sub-agent, delegation, Reviewer dispatch, or later WorkUnit.

## 3. Live preflight and preserved dirt

Verify and record immediately before writing:

```text
ACTOR: foundation Worker
SESSION: foundation / @3 / %3
ACTUAL_MODEL: live value
EFFORT: ultracode
WORKSPACE: /home/leo/Project/FOUNDATION
ROLE: Worker
REQUIRED_SKILL: /fable-builder loaded
BRANCH: shadow/foundation-shared-memory-v0
HEAD: c7653b77900e6613d75fcc0f72577e6bbcb171fd
UPSTREAM_HEAD: c7653b77900e6613d75fcc0f72577e6bbcb171fd
ORIGIN: git@github.com:leohan816/foundation.git
```

Only these two pre-existing untracked files may remain, byte-untouched, unstaged,
and uncommitted:

```text
docs/FOUNDATION_DOCS_SYNC_POLICY.md
설계문서/FOUNDATION_SERVICE_SEMANTIC_ADAPTER_ARCHITECTURE_20260630.html
```

Baseline porcelain hash remains
`4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2`.
Stop on any mismatch or overlapping dirt.

## 4. Exact Foundation write allowlist

Touch no product path outside:

```text
설계문서/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
설계문서/README.md
foundation/shared_memory/commerce_evidence/verifiers.py
foundation/shared_memory/commerce_evidence/validator.py
foundation/shared_memory/tests/test_commerce_evidence_verifiers.py
foundation/shared_memory/tests/test_commerce_evidence_validator.py
```

Do not modify WU1 code, fixture, tests, package `__init__.py`, shared gate/reason
code, feature flags, API, store, subject identity, dependency files, schema,
migration, config, lockfile, or existing tests.

The canonical design document may add only WU2 implementation mapping, exact
module behavior, tests, and change history already fixed by reviewed design. README
may receive only the minimal version/status update. No new policy or architecture.

## 5. Exact foundation-docs write allowlist

Worker may write only and may not stage/commit/push:

```text
설계문서/foundation/FOUNDATION_COMMERCE_EVIDENCE_SHADOW_설계서.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT_POINTER.md
```

The design mirror must be byte-identical to the final product canonical document.
Advisor publishes all three after return.

## 6. Verifier contract requirements

Implement narrow protocols and immutable/category-only verdict types exactly from
reviewed design §6:

### Provenance

```text
verify(schema_version, source_service, source_environment, source_event_id,
       evidence_id, evidence_type, idempotency_key, declared_source_hash,
       recomputed_source_hash, occurred_at, opaque_ingress_context)
```

Only `VERIFIED` with both `source_identity=true` and `envelope_digest=true`
continues. `UNVERIFIED`, `UNCONFIGURED`, `ERROR`, exceptions, invalid return
objects, missing bindings, or diagnostic content all map to
`provenance_untrusted`. Default returns `UNCONFIGURED`. Do not define or read a
credential, key, signature, header, token, certificate, provider, endpoint, env,
network, or consent store.

### Consent

```text
verify_effective(subject_ref, purpose, notice_version, captured_at,
                 occurred_at, decision_time, opaque_ingress_context)
```

Only `GRANTED` continues. `REVOKED` → `consent_revoked`; `EXPIRED` →
`consent_expired`; `MISMATCH` → `privacy_scope_exceeded`; all other statuses,
errors, exceptions, invalid returns, and default `UNCONFIGURED` →
`consent_missing`.

The opaque context is passed through by identity only. The validator must not
inspect, copy, persist, serialize, log, compare, or echo it. Tests use a sentinel
object and verify no result/audit value contains it.

## 7. Validator requirements — gates 1–8 only

Use a pure entry point with an injected UTC decision clock, explicit verifier
objects, and no global mutable state. Return only a small internal WU2 validation
category object—not the future `CommerceEvidenceDecisionV1` service response.
Never return or retain input identifiers, hashes, field names/values, exception
text, verifier diagnostics, or opaque context.

Implement exact first-failure order:

1. base mapping/schema/normalizer/environment/scalar/time-format checks;
2. recursive raw/PII scan before exact-key-set rejection;
3. identified-only identity and link-false checks using Foundation validate-not-
   mint subject validation;
4. source formats, deterministic idempotency/source-hash recomputation, then
   provenance verifier category;
5. exact consent purpose/notice/timestamps/asserted state, then current-effective
   consent verifier category; do not call consent when provenance fails;
6. purchase-item/product/SKU/purchase-state checks;
7. evidence-type and closed satisfaction/adverse table checks, including retraction;
8. retention mapping and injected-clock boundary checks.

Important fixed semantics:

- booleans are not integers; no coercion, alias, trimming, case-folding, default,
  permissive extra field, or implicit version upgrade;
- timestamp is exact `.sssZ`, Gregorian-valid, occurrence not after decision time,
  consent capture not after occurrence; equality is allowed;
- raw/PII category wins over shape expansion and never echoes the trigger;
- subject is `subj_v2_` identified-only, anonymous null, link false; never mint,
  resolve, re-key, or infer identity/consent from login/user existence;
- source hash is integrity only; a matching hash never bypasses provenance;
- consent snapshot `granted` never bypasses the current verifier;
- `purchase_feedback`/`correction` must have at least one valid structured axis;
  `retraction` must have all four feedback fields null;
- satisfaction and adverse remain independent; satisfaction never lowers adverse;
- skin/other adverse with structurally valid severity and `reported` remains
  blocked by the currently `UNCONFIGURED` legal/retention policy and returns
  `privacy_scope_exceeded`; do not add a configured path, duration, jurisdiction,
  legal role, reporting duty, or retention exception;
- `usage_safety` requires null severity and `reported`, remains structured adverse,
  and uses non-adverse 90-day class per pinned producer;
- non-adverse evidence is expired when `occurred_at + 90 days <= decision_time`;
- no receipt/duplicate/lineage/tombstone/candidate/commit behavior is present.

WU2 must provide positive triggers plus adjacent negatives for these fifteen
stateless C codes:

```text
unsupported_schema_version
environment_not_allowed
invalid_identity_xor
identity_link_forbidden
consent_missing
consent_revoked
consent_expired
privacy_scope_exceeded
raw_text_or_pii_present
missing_purchase_item_ref
missing_product_ref
invalid_normalization
adverse_fields_inconsistent
provenance_untrusted
retention_expired
```

The remaining stateful codes `duplicate_evidence`, `lineage_broken`, and
`evidence_retracted` belong to WU3 and must not be fabricated here. WU6 will verify
the consolidated all-18 coverage manifest.

## 8. Test-first and delta verification

1. Update the canonical design document before code with a WU2 contract-to-code-
   test mapping. Any blank/ambiguous mapping is STOP.
2. Write WU2 tests before `verifiers.py`/`validator.py`; record the meaningful
   module-absent failures.
3. Implement the smallest pure diff. Do not modify a test oracle to obtain green.
4. At ultracode, run only the new WU2 verifier/validator suites plus WU1 delta
   suites needed to show no contract/hash drift.
5. Switch live effort to `max` before final WU2 malicious-input/gate-precedence/
   privacy/static/diff/mirror/staging checks. Do not rerun unrelated product suites
   unless the WU2 diff actually touches their dependency; record the delta basis.
6. Static checks must prove zero network/env/credential/endpoint/DB/store/service/
   ledger/candidate/runtime import and zero identifier/PII/diagnostic echo.

Safe expected commands after source inspection proves isolation:

```text
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_verifiers
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_validator
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_contract
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_reason_codes
python3 -m unittest foundation.shared_memory.tests.test_commerce_evidence_hash_v1
```

No DB, SQLite, Docker, network, provider, secret, environment, build, migration,
snapshot refresh, or generated fixture command is authorized in WU2.

## 9. Completion criteria

- Exact verifier interfaces/defaults exist with no credential/protocol selection.
- Default provenance and consent accept zero envelopes; fake VERIFIED/GRANTED are
  injectable only in synthetic tests.
- Gates 1–8 are deterministic, first-failure, category-only, stateless, and cover
  all fixed WU2 fields/invariants and fifteen stateless reason triggers.
- Raw/PII/extra/malicious/type/verifier-exception inputs fail closed without echo.
- Adverse policy UNCONFIGURED accepts zero skin/other evidence; no duration/policy
  is inferred.
- No gates 0 or 9–11, flag, ledger, lineage state, candidate, response/audit,
  service, runtime, transport, DB, provider, or existing behavior change exists.
- WU2 tests fail first and pass after implementation; WU1 delta tests stay green.
- Product diff contains only six allowlisted paths, product commit is non-force
  pushed to exact shadow upstream, unrelated dirt remains untouched.
- Canonical design/mirror bytes match; durable result/pointer truthfully identify
  proof, non-proof, residual risks, and next actor as Advisor.

## 10. STOP conditions

Stop for any runtime/Git mismatch, ambiguous field/gate/policy, need to invent a
credential/consent/retention/identity rule, change a WU1 oracle/fixture, touch an
unlisted path, use real data/DB/network/provider/secret/env, add a dependency,
implement stateful codes/gates 0 or 9–11, or start WU3–WU8.

## 11. Result contract

Use Agent Office/fable-builder result format. Include runtime/Git preflight,
mapping, old-fail/new-pass evidence, fifteen-code positive/adjacent-negative
coverage, gate-precedence matrix, verifier default/exception evidence, changed
paths, static containment, product commit/push, mirror equality, what was and was
not proved, residual risks, attack questions, rollback, and:

```text
PRODUCT_REPO_WRITE_STATUS: WU2_ALLOWLIST_ONLY
REAL_DB_NETWORK_PROVIDER_ACCESS: ZERO
SECRET_ENV_PII_ACCESS: ZERO
PRODUCTION_LIVE_ACCESS: ZERO
FEATURE_FLAG_OR_GATE0: ZERO
LEDGER_LINEAGE_STATE_CANDIDATE_SERVICE: ZERO
DELIVERY_OR_FOUNDATION_INTAKE: ZERO
CURRENT_MEMORY_OR_STORE_CONNECTION: ZERO
ADVERSE_POLICY_CONFIGURED_OR_INFERRED: ZERO
WORK_UNIT_3_TO_8_STARTED: NO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP_AFTER_RETURN: true
```

Return only the pointer and STOP.
