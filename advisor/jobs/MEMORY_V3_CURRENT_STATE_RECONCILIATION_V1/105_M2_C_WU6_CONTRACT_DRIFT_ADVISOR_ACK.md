# Memory V3 M2 C WU6 — Advisor ACK of Founder response

```text
REQUEST_ID: MEMORY_V3-M2-C-WU6-DRIFT-001
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
ROLE: Foundation Advisor
ACTOR_ID: foundation-advisor
RESPONSE_RECEIVED: APPROVE_OPTION_A
INTERPRETATION: ONE_EXISTING_TEST_PATH_ONLY
CONFLICT_CHECK: PASS
WORK_RESUME_ALLOWED: YES_WITH_EXACT_LIMITS
WU7_AFTER_GREEN_WU6: AUTHORIZED
WU8: NOT_AUTHORIZED
```

The Advisor interprets the response as authority for the same Foundation Worker to
change only:

```text
foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py
```

The correction is limited to `TestSharedGuardNotBroadened` and its directly
associated explanatory comment/docstring so the test reflects the already landed
WU5 section-11.6 delegation. The 18 C codes must delegate unchanged; adjacent
non-C, unhashable, `None`, typo, and unknown inputs must still collapse to
`cannot_determine`. `_SAFE_DYNAMIC`, `TestExact18Set`, and all unrelated assertions
remain unchanged.

The four uncommitted WU6 test/fixture paths remain within their original allowlist.
No product source, runtime behavior, design, policy, schema, API, dependency,
configuration, transport, delivery, intake, storage, or activation may change.

Only after the relevant test, dedicated WU6 tests, full commerce-evidence suite,
and load-bearing regressions are all green may the Worker commit and non-force push
the four WU6 paths plus this one correction path. The Worker then returns to the
Advisor and stops. WU7 is a separate independent review dispatch. WU8 remains not
authorized.

```text
NEXT: SAME_FOUNDATION_WORKER_BOUNDED_TEST_CORRECTION
RETURN_TO: foundation-advisor
```
