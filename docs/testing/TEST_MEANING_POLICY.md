# Test Meaning Policy

## 1. Core principle

Tests are not a scoreboard.

The goal of testing is not to collect PASS results.
The goal of testing is to reveal whether the system still protects the contracts, boundaries, and risks it is supposed to protect.

A meaningless 100% pass rate is not quality.
A meaningful failure may be more valuable than a meaningless pass.

## 2. What a test must protect

Every meaningful test should protect at least one of the following:

- a product contract
- a security boundary
- a privacy boundary
- a data consistency rule
- an API contract
- an architectural invariant
- a user-facing behavior
- a regression-prone workflow
- a failure mode that must stay impossible
- an operational safety rule

If a test protects none of these, it may be a weak test.

## 3. Passing tests

A test PASS is meaningful only if we can explain what it proves.

For every important passing test or suite, reports should answer:

1. What contract did this test protect?
2. What risk did this test reduce?
3. What would have failed if the system broke?
4. Is this a meaningful pass, or only an accidental pass?
5. Does this test cover the important path, not just an easy path?

Do not report only numbers.
A report like “all tests passed” is incomplete unless it explains what was actually protected.

## 4. Failing tests

A test failure is not shameful.
A failure is information.

Before fixing a failing test, first answer:

1. What was this test supposed to protect?
2. What exactly failed?
3. What is the difference between expected behavior and actual behavior?
4. What real risk did this failure reveal?
5. Is the code wrong, the test expectation outdated, or the architecture changed?
6. Would hiding this failure create a bigger risk later?
7. What must remain protected after the fix?

Do not remove the failure before understanding it.

## 5. Failure classification

Classify each meaningful test failure before changing code or tests:

- `REAL_BUG_FOUND`
  - The test revealed a real defect in the implementation.

- `CONTRACT_DRIFT_FOUND`
  - The system contract changed, but the test still reflects an older contract.

- `WEAK_TEST_FOUND`
  - The test exists, but does not clearly protect an important contract or risk.

- `MEANINGFUL_FAILURE_KEEP`
  - The failure is currently valuable and should remain visible until the underlying issue is resolved.

- `REQUIRES_ARCHITECTURE_DECISION`
  - The failure cannot be resolved safely without a higher-level design decision.

## 6. Success classification

Classify important passing tests when reporting quality:

- `MEANINGFUL_PASS`
  - The test protects a real contract, boundary, or risk.

- `WEAK_PASS`
  - The test passed, but it protects little or nothing important.

- `ACCIDENTAL_PASS`
  - The test passed because the current implementation happened to match it, not because it proves a real invariant.

- `OBSOLETE_PASS`
  - The test once had value, but no longer matches the current architecture or product contract.

## 7. Forbidden testing behavior

Do not do the following just to make tests pass:

- weaken assertions without explaining the protected contract
- skip or xfail a test without documenting the risk
- update snapshots without explaining what changed and why
- change expected values only to match current output
- delete failing tests because they are inconvenient
- replace a meaningful failing test with a weaker passing test
- add trivial tests that inflate pass counts without protecting real behavior
- report pass counts as quality without explaining test meaning

Passing by avoiding the problem is failure.

## 8. When test expectations may change

Changing a test expectation is allowed only when all are true:

1. The old expectation reflected an old or incorrect contract.
2. The new expectation reflects the current approved contract.
3. The protected risk remains covered.
4. The change does not hide a real bug.
5. The report explains why this is contract correction, not problem avoidance.

## 9. When code should change

Code should change when the test reveals that implementation violates an intended contract, boundary, or risk control.

Before changing code, state:

1. Which contract is currently broken?
2. Which behavior is unsafe or incorrect?
3. Why code is the right place to fix it?
4. Which tests prove the fix?
5. What new regression risk is introduced?

## 10. When to stop and ask

Stop and ask before changing tests or code if:

- the failure touches architecture
- the failure touches security or privacy
- the failure touches identity, auth, memory, payment, customer data, or production data
- the expected behavior is unclear
- fixing the test would require weakening a boundary
- multiple contracts conflict
- the test appears obsolete but no replacement contract is defined

## 11. Reporting format

When reporting test results, use this format:

1. Test or suite name
2. PASS / FAIL
3. Protected contract
4. Protected risk
5. Failure meaning, if any
6. Success meaning, if any
7. Classification
8. Recommended action
9. What must not be hidden

## 12. Final rule

A test is valuable only when it helps us see the truth.

A failure that reveals the truth is useful.
A pass that hides the truth is dangerous.
