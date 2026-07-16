# M2 C — WU6 C-VERIFICATION Foundation Worker result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU6-VERIFICATION-001
ROLE: Foundation Worker
ACTOR_ID: foundation (session foundation @3 %3; same implementation actor as WU1-WU5)
REQUIRED_SKILL_APPLIED: /fable-builder
ACTUAL_MODEL: Opus 4.8 (claude-opus-4-8) — verified live (not inferred from session name)
TEST_EFFORT: max (live, user-set and verified this turn)
RESULT_STATUS: STOP — CONTRACT_DRIFT_FOUND. The four WU6 test/fixture paths are written and pass
  in isolation (75/75) with the two regression modules green (41/41), but the full commerce-evidence
  discover suite has exactly ONE pre-existing failure introduced by landed WU5, in an existing WU1
  test outside the WU6 allowlist. Completion criterion "all commerce-evidence tests pass" is NOT met.
  No product source, no existing test, and no design was changed. No commit or push was made.
CLASSIFICATION: CONTRACT_DRIFT_FOUND → NEEDS_EXISTING_TEST_PATCH (Advisor-routed; not Worker discretion)
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 1. Outcome

Implemented the four WU6 test/fixture paths and ran the exact reviewed test sequence at live `max`.
All ten reviewed §13.5 oracle groups are covered by named deterministic-injected-fake tests, and the
three dedicated WU6 suites pass 75/75 in isolation, proving the landed WU5 service/audit/flag/reason
behavior against §11.1-§11.8. However, the mandated stage-2 discover run
(`test_commerce_evidence_*.py`) surfaces exactly one pre-existing failure — an existing WU1 test that
regression-pinned the pre-WU5 shared-guard behavior which the reviewed WU5 §11.6 delegation
deliberately superseded. This failure is outside the WU6 four-path allowlist and cannot be resolved
without either a forbidden existing-test edit or a forbidden (and design-contradicting) WU5 source
revert. Per the failure discipline, the meaningful failing oracle is preserved and returned to the
Advisor; nothing was committed.

## 2. Anchors verified directly (DO_NOT_EXECUTE_FROM_MEMORY honored)

| Anchor | Commit | Verify |
|---|---|---|
| Final implementation-ready design | `4480b55` | SHA-256 `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9` = handoff pin (MATCH) |
| Final same-Reviewer design delta PASS | `062c1d6` | present; ancestor |
| WU5 product result / Worker evidence / Advisor gate | `90d6298` / `a937dfe` / `ff5f681` | present; ancestors |
| Founder authorization | `c96caef` | present; ancestor |
| Landed WU1-WU5 source + existing tests | Foundation `90d6298` | read directly |

Read directly: reviewed design §11.1-§11.8 and §13.5; landed `service.py`/`audit.py`/`ledger.py`/
`candidates.py`/`validator.py`/`verifiers.py`/`gate.py`/`feature_flags.py`/`reason_codes.py`; existing
`test_commerce_evidence_*` and the WU1 golden fixture.

## 3. WU6 files written (four-path allowlist; held UNCOMMITTED pending drift resolution)

```text
foundation/shared_memory/tests/test_commerce_evidence_service.py       (new)
foundation/shared_memory/tests/test_commerce_evidence_audit.py         (new)
foundation/shared_memory/tests/test_commerce_evidence_containment.py   (new)
foundation/shared_memory/tests/fixtures/commerce_evidence_service_v1_cases.json  (new, wholly synthetic)
```

No product source, WU1-WU5 module, package `__init__.py`, existing test, design document, dependency,
runner, config, schema/migration, or feature flag was created or edited. `git status` shows only these
four untracked WU6 paths plus the two known pre-existing untracked files. HEAD remains `90d6298`
(no commit made). The fixture is synthetic and contains no real identifier, PII, secret, credential,
raw text, provider, or customer/order data; only reviewed v1 literals; `idempotency_key`/`source_hash`
are `UNSEALED` placeholders that the test recomputes via landed `hash_v1` before evaluation.

## 4. Ten-oracle coverage (all groups named; dedicated suites 75/75 in isolation)

| # | §13.5 group | Tests | Result (isolation) |
|---|---|---|---|
| 1 | types/fields/literals/signatures/guards/Python 3.7 | audit `TestAuditTypesAndLiterals`; service `TestServiceTypes`; containment `TestPython37Compat` | PASS |
| 2 | flag-OFF/poisoned short-circuit call-counts; 3 flags hard-off; shadow re-read in commit guard | service `TestFlagAndPoisonShortCircuit`; containment `TestFeatureFlags` | PASS |
| 3 | UNCONFIGURED accept-zero; malformed clock/factory/flag/sink fail-closed | service `TestFailClosedDefaults` | PASS |
| 4 | dynamic reason preserved; exactly 18 C delegate; unknown/unhashable/exception/typo → cannot_determine | containment `TestSharedReasonDelegation` | PASS |
| 5 | every §11.8 row response/audit/metric fields + counts | service `TestPathMatrix` | PASS |
| 6 | decision-ID ownership §11.7; no producer/candidate/evidence id in serialization | service `TestDecisionIdOwnershipAndNoLeak` | PASS |
| 7 | audit allowlist; metric names/ordered labels; success only after both sinks literal True | audit `TestBuildMetrics`/`TestSinks`; service `TestSinkHonestyAndPoison` | PASS |
| 8 | rejection sink failure preserved; accepted/replay failure poisons, no `ledger.clear()`, prior snapshot preserved byte-for-byte | service `TestSinkHonestyAndPoison` | PASS |
| 9 | WU4 failure permits replay/collision/gate-10 precedence; 0/1/2 adoption/lifecycle | service `TestWU4FailureGateOrder`; `TestPathMatrix` | PASS |
| 10 | static containment; legacy API no-C-import; existing shared-memory/subject-ref behavior | containment `TestStaticContainment`/`TestFeatureFlags`; regression suites | PASS |

Every important test names its protected contract and risk in its docstring; each is `MEANINGFUL_PASS`
in isolation. The landed WU5 code is confirmed correct at runtime on all characterized §11.8 rows
(disabled, accepted root/correction/retraction, exact replay with current eligibility, collision,
skin/other, WU4-failure unseen/replay, sink-failure poison with preserved unrelated prior).

## 5. Exact test run (live max, python3 -B, synthetic/in-memory only)

```text
STAGE 1  service + audit + containment dedicated suites ................. 75/75  rc 0
STAGE 2  discover test_commerce_evidence_*.py ......................... 307/308  rc 1  (1 FAILURE)
STAGE 3  test_shared_memory_v0 + test_subject_ref_v2_hard_gate ......... 41/41   rc 0
git diff --check ........................................................ clean
JSON fixture validity .................................................. valid
compile new tests (no bytecode) ........................................ OK x3
```

No network, DB, Docker, provider, secret, environment mutation, file persistence, snapshot update, or
persistent feature-flag activation occurred. Zero skips, zero xfail in the WU6 suites.

## 6. The blocking failure — exact evidence and classification

```text
FAIL: test_commerce_evidence_reason_codes.TestSharedGuardNotBroadened.test_shared_guard_not_broadened
AssertionError: 'unsupported_schema_version' != 'cannot_determine'
```

- The failing test is an **existing WU1 test** (`foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py`),
  last changed at WU1 commit `5b9d08a`, unchanged since — it is NOT in the WU6 four-path allowlist.
- Its own comment states the intent: *"공유 guard 위임 배선은 WU5 — 본 테스트는 공유 guard가 지금도 18코드를
  collapse함(=미확장)을 회귀 고정"* ("the shared-guard delegation wiring is WU5 — this test regression-pins
  that the shared guard STILL collapses the 18 codes = not-yet-extended"). Its assertion is, for each of the
  18 pinned C codes: `SHARED_RC.code(code) == "cannot_determine"`.
- Landed **WU5 §11.6** (commit `90d6298`, +12 lines to `foundation/shared_memory/reason_codes.py`) wired the
  reviewed delegation: `code()` now delegates unknown-to-`_SAFE_DYNAMIC` values to the dedicated 18-code C
  guard. So `SHARED_RC.code("unsupported_schema_version")` now returns `"unsupported_schema_version"`
  (delegated), not `"cannot_determine"`.
- The failure reproduces at the WU5 baseline `90d6298` with all WU6 files stashed away, so it is a pure
  WU5↔WU1-test drift, independent of the WU6 additions. It was latent because WU5 forbade running product
  tests; WU6's mandated discover run is what surfaces it. Exactly one such failure exists (bounded).

**Test Meaning Policy classification: CONTRACT_DRIFT_FOUND.** The existing WU1 test protects the pre-WU5
contract ("shared guard not yet broadened"); the reviewed WU5 §11.6 delegation deliberately supersedes it.
The WU5 product source is correct per the reviewed design — this is NOT `REAL_BUG_FOUND` and must not be
"fixed" by reverting WU5 source. It is also not `WEAK_TEST_FOUND` — the WU1 test was a meaningful,
intentional pre-WU5 pin. Resolution requires updating that existing WU1 test to the post-WU5 delegation
contract, which is outside the WU6 allowlist and explicitly forbidden to this Worker.

## 7. Why this is a STOP, not a Worker fix

The only two ways to make stage-2 discover green both violate the handoff:

1. Edit the existing WU1 test `test_shared_guard_not_broadened` — forbidden ("Do not edit any existing
   test. Do not weaken or skip an existing assertion."), and outside the four-path allowlist.
2. Revert the WU5 delegation in `reason_codes.py` — forbidden product-source change, and it would
   contradict the reviewed §11.6 design.

Per handoff §6/§8, the Worker preserves the meaningful failing oracle, records the exact failure, does
not patch source or existing tests, and returns to the Advisor. No commit or push was made.

## 8. Recommended bounded resolution (Advisor-owned)

A minimal, bounded same-Worker patch handoff that adds `test_commerce_evidence_reason_codes.py` to an
allowlist and updates only `TestSharedGuardNotBroadened` (and its module docstring line) to the reviewed
post-WU5 contract:

- assert the 18 C codes now **delegate** through the shared guard: `SHARED_RC.code(code) == code`;
- keep a negative control: a non-C, non-`_SAFE_DYNAMIC` value (and an unhashable/None value) still
  returns `"cannot_determine"`;
- preserve every other existing assertion in the file (`TestExact18Set`, dynamic-set unchanged, etc.).

Then re-run WU6 (stage-2 discover green), commit the four WU6 files together with that single existing-test
update, and route the delta to the same independent Reviewer. This Worker made no such change here.

## 9. Status block

```text
PRODUCT_REPO_WRITE_STATUS: WU6_FOUR_TEST_FIXTURE_PATHS_WRITTEN_UNCOMMITTED
PRODUCT_SOURCE_CHANGE: ZERO
EXISTING_TEST_CHANGE: ZERO
TEST_EFFORT: max
TEN_ORACLE_GROUPS_COVERED: 10/10 (dedicated suites 75/75 in isolation)
FULL_DISCOVER_SUITE_GREEN: NO — 1 pre-existing WU5↔WU1-test drift (test_shared_guard_not_broadened)
BLOCKING_CLASSIFICATION: CONTRACT_DRIFT_FOUND → NEEDS_EXISTING_TEST_PATCH
COMMIT_OR_PUSH: NONE (completion gate not met)
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

## 10. Boundaries and next

Four WU6 test/fixture files written and isolation-verified (75/75) but held UNCOMMITTED; no product
source / existing test / design / dependency / config / flag change; HEAD unchanged at `90d6298`; no
reviewer dispatch; no new agent/subagent; two pre-existing untracked files byte-untouched. Result and
pointer are written UNSTAGED in the foundation-docs worktree (nothing staged/committed/pushed there);
Advisor publishes.

NEXT: foundation-advisor issues a bounded same-Worker patch handoff to update the single drifted existing
WU1 test to the reviewed post-WU5 §11.6 delegation contract (per §8), after which WU6 completes and routes
to the same independent Reviewer. This Worker starts no later WorkUnit and made no product-source or
existing-test change.

```text
RETURN_TO: foundation-advisor
STOP
```
