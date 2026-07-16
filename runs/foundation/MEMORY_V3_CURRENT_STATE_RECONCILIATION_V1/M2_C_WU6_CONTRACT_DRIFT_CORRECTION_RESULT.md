# M2 C — WU6 bounded existing-test contract correction result

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU6-DRIFT-CORRECTION-001
ROLE: Foundation Worker
ACTOR_ID: foundation (session foundation @3 %3; same implementation actor as WU1-WU6)
REQUIRED_SKILL_APPLIED: /fable-builder
ACTUAL_MODEL: Opus 4.8 (claude-opus-4-8) — verified live (not inferred from session name)
TEST_CORRECTION_AND_EXECUTION_EFFORT: max (live, verified)
RESULT_STATUS: COMPLETE — the one stale WU1 test contract is aligned to landed WU5 §11.6; the four
  frozen WU6 files committed byte-identical alongside it; full discover suite now 308/308; non-force
  pushed; HEAD == upstream. Zero product-source change.
FOUNDER_AUTHORITY: Option A selected in response to MEMORY_V3-M2-C-WU6-DRIFT-001 (response/ACK d058e08)
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 1. Outcome

Corrected only the stale pre-WU5 contract in the existing WU1 test
`test_commerce_evidence_reason_codes.py::TestSharedGuardNotBroadened` so it asserts the reviewed,
authorized, and landed WU5 §11.6 shared-reason delegation, and committed it together with the four
already-approved (frozen) WU6 test/fixture files. This resolves the single CONTRACT_DRIFT that WU6
verification surfaced. No product source, runtime, design, policy, schema, API, dependency, or
configuration was changed. The full commerce-evidence discover suite is now green.

## 2. Preflight (DO_NOT_EXECUTE_FROM_MEMORY honored)

- Live model Opus 4.8, effort max, session foundation @3 %3, cwd /home/leo/Project/FOUNDATION.
- Git: branch `shadow/foundation-shared-memory-v0`, HEAD == baseline `90d6298`, origin
  `git@github.com:leohan816/foundation.git`, only the two known pre-existing untracked files present.
- Anchors verified as ancestors: Founder response/ACK `d058e08`, WU6 STOP evidence `4552b89`, Founder
  decision request `a0a7bc6`, final design `4480b55` (SHA-256
  `6e9842a3665251fc54ed66f5f12ca51b948869029b2e02105dd24d8e752406a9`), WU5 head `90d6298`.
- The four frozen WU6 files matched the handoff SHA-256 values byte-for-byte **before** correction:

```text
1e5291973037636cf571967b66a6c667e22159811119c63f5af6dd1f03c2d5bc  test_commerce_evidence_service.py
725d15eced682872788fedade19c1abb903a7ad47723c8259ac35186832dba3e  test_commerce_evidence_audit.py
79110cf872b74d33b735d034f6c6162139c9156b92a698284b3f35bfc7cf2384  test_commerce_evidence_containment.py
08f5eebeefa990b4ce6765cbf6e009efee0ef84c35dbc9050be707bae0388f10  fixtures/commerce_evidence_service_v1_cases.json
```

They remained byte-identical (same hashes) after the correction and at commit.

## 3. Exact correction (one path; two authorized regions only)

`foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py`:

- **module docstring line** — updated the one directly-associated explanatory line from "the shared
  guard still collapses the 18 codes (=not extended)" to "shared-guard delegation = WU5 §11.6 (landed
  90d6298); this file pins the 18-code C set literal + the shared guard delegating those 18 codes
  unchanged (not collapse; existing dynamic codes unchanged)."
- **`TestSharedGuardNotBroadened.test_shared_guard_not_broadened`** — the loop now asserts each of the
  18 `_PINNED_18` codes delegates unchanged: `SHARED_RC.code(code) == code`; an adjacent negative
  control proves non-C / typo / unknown / `None` / unhashable (`list`) / exception-bearing (`__hash__`
  raising) inputs still collapse to literal `cannot_determine` with no exception-text leak. The class
  and method names are retained (continuity), and the comment records the contract change.

Preserved byte-for-byte / untouched: `_PINNED_18`, `TestExact18Set`, `TestGuardedLookup`
(including `test_guard_negative` and `test_fallback_literal_matches_shared_guard_fallback`), all
imports, and every unrelated assertion. The protected test was not skipped, xfail'd, deleted,
weakened, or renamed. `git diff` on the file shows exactly the two authorized hunks (docstring line +
the one method).

## 4. Required max-effort test sequence (python3 -B, synthetic/in-memory only)

```text
1  reason_codes.TestSharedGuardNotBroadened.test_shared_guard_not_broadened .... 1/1    rc 0
2  service + audit + containment (dedicated WU6) .............................. 75/75   rc 0
3  discover test_commerce_evidence_*.py ...................................... 308/308  rc 0   (was 307/308)
4  test_shared_memory_v0 + test_subject_ref_v2_hard_gate ...................... 41/41   rc 0
   git diff --check ......................................................... clean
   JSON fixture validity .................................................... valid
   compile reason_codes test (no bytecode) .................................. OK
   frozen WU6 hashes ........................................................ unchanged (4/4 match)
```

Zero skips, zero xfail, zero failures. No network, DB, Docker, provider, secret, environment
mutation, file persistence, snapshot update, or persistent feature-flag activation occurred.

## 5. Test Meaning classification

**CONTRACT_DRIFT_FOUND → resolved by Founder-authorized Option A.** The existing WU1 test protected a
pre-WU5 invariant ("shared guard not yet broadened") that the reviewed WU5 §11.6 delegation
deliberately superseded. The correction re-points the protected test to the current contract (18-code
delegation) while strengthening its negative controls; it does not weaken any assertion or hide a
risk. The protected risk — that non-C / malformed / exception-bearing inputs never leak through the
shared guard — remains fully asserted. Post-correction, the test is `MEANINGFUL_PASS`.

## 6. Git

- Base `90d6298` (== handoff baseline == prior upstream).
- Staged exactly five paths (four frozen WU6 + the corrected existing test); one follow-up commit,
  no amend: HEAD `33570b9d7db79c991bb216b6a2dc80880ba1f2d6` (5 files, +1408/-3, 4 created).
- `git diff --name-only 90d6298 33570b9` = exactly those five paths; all are tests/fixtures
  (PRODUCT_SOURCE_CHANGE ZERO). No existing-non-target test, design, dependency, config, or unrelated
  dirt changed. The two pre-existing untracked files remain untracked and untouched.
- Non-force push `90d6298..33570b9` → `origin/shadow/foundation-shared-memory-v0`; HEAD == upstream,
  0/0 ahead/behind; remote-contains TRUE.

## 7. Status block

```text
WU7_STARTED: NO
WU8_AUTHORIZED: NO
PRODUCT_SOURCE_CHANGE: ZERO
DELIVERY_OR_INTAKE: ZERO
DB_NETWORK_SECRET_RUNTIME_ACTIVATION: ZERO
CORRECTION_PATHS: 1 (existing test) + 4 frozen WU6 committed = 5 staged
FROZEN_WU6_HASHES: UNCHANGED (4/4 match)
TEN_ORACLE_GROUPS: 10/10 (75/75 dedicated) · DISCOVER 308/308 · REGRESSION 41/41
SKIPPED_OR_XFAIL: ZERO
SELF_REVIEW: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## 8. Boundaries and next

Result and pointer are written UNSTAGED in the foundation-docs worktree; nothing staged/committed/
pushed there (Advisor publishes). No reviewer dispatch; no new agent/subagent; two pre-existing
untracked files byte-untouched. One skill note: `/fable-builder` applied (anchor-first, frozen-hash
gate, minimal authorized diff, tests-green-before-commit, honest reporting).

NEXT: WU6 verification is now complete and green end-to-end (service/audit/containment oracles + the
aligned reason-guard test). foundation-advisor may route the WU6 evidence to the independent
Foundation Reviewer (WU7) under a separate handoff. This Worker starts no later WorkUnit and changed
no product source.

```text
RETURN_TO: foundation-advisor
STOP
```
