# Memory V3 M2 C WU6 — Founder decision request: one existing-test contract drift

```text
REQUEST_ID: MEMORY_V3-M2-C-WU6-DRIFT-001
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
ROLE: Foundation Advisor
ACTOR_ID: foundation-advisor
STATUS: NEEDS_FOUNDER_DECISION
WORK_RESUME_ALLOWED: NO
SAFE_DEFAULT: HOLD_WU6_UNCOMMITTED
WU7_STARTED: NO
WU8_AUTHORIZED: NO
```

## Verified facts

1. WU5 landed the independently reviewed section-11.6 behavior at Foundation
   commit `90d62984e5330c8b985dc6c2f18edf241909d7ed`: the shared reason guard preserves
   its existing `_SAFE_DYNAMIC` set and delegates the exact 18 commerce-evidence
   codes to the dedicated C guard.
2. WU6, at live `max`, wrote only its four authorized synthetic test/fixture paths.
   Its dedicated tests pass 75/75; the two load-bearing regression modules pass
   41/41; JSON/compile/diff gates pass; all ten reviewed oracle groups are covered.
3. The required full commerce-evidence discovery run is 307/308 with exactly one
   failure:

   ```text
   foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py
   TestSharedGuardNotBroadened.test_shared_guard_not_broadened
   expected: shared code("unsupported_schema_version") == "cannot_determine"
   actual:   shared code("unsupported_schema_version") == "unsupported_schema_version"
   ```

4. That existing WU1 test was last changed at `5b9d08a` and explicitly pins the
   pre-WU5 state (“delegation is WU5; until then collapse the 18 codes”). WU5
   deliberately completed that future delegation. The failure reproduces at the
   WU5 baseline with WU6 files removed, so it is not caused by WU6.
5. Classification is `CONTRACT_DRIFT_FOUND`, not `REAL_BUG_FOUND`. Reverting WU5
   source would contradict the reviewed design. Editing the existing WU1 test is
   outside WU6's exact four-path allowlist, so the Worker correctly stopped without
   commit or push.
6. Durable evidence is pushed at foundation-docs commit
   `4552b89b859a85f401e85763a9c6597df08135de`.

## Exact decision

May the Advisor add only this existing Foundation test path to a one-time bounded
WU6 correction allowlist?

```text
/home/leo/Project/FOUNDATION/foundation/shared_memory/tests/test_commerce_evidence_reason_codes.py
```

### Option A — authorize the one-test contract correction (recommended)

- Same Foundation Worker, live `max`.
- Change only `TestSharedGuardNotBroadened` and its directly associated module
  comment/docstring line.
- Assert each exact C reason now delegates unchanged through the shared guard.
- Retain adjacent negatives proving non-C, unhashable, `None`, typo, and unknown
  values still collapse to `cannot_determine` without leakage.
- Preserve `_SAFE_DYNAMIC`, `TestExact18Set`, and every unrelated existing assertion.
- Keep the four uncommitted WU6 files unchanged except for a test-only correction
  if their own rerun exposes a test defect; no product-source change.
- Re-run all three required stages at live `max`; only if all green, commit and
  non-force push the four WU6 files plus this one existing-test path.
- Then route the exact implementation to the same independent Reviewer for WU7.

Impact: aligns one stale pre-WU5 test with the already approved, reviewed, and landed
post-WU5 contract. It adds no product behavior, reason code, runtime, delivery,
intake, persistence, DB, network, or activation authority.

### Option B — keep WU6 on hold

Leave the four WU6 files uncommitted and do not start WU7. WU5 remains pushed but
the bounded C implementation cannot reach independent implementation review or
final closure.

## Advisor recommendation

Select Option A. The exact source behavior is already Founder-authorized and
independently design-reviewed; the sole blocker is an intentionally temporary WU1
test pin whose own comment anticipated the WU5 delegation. The correction is one
existing test path, test-only, reversible, and independently reviewable.

```text
RESPONSE_REQUIRED:
APPROVE_OPTION_A
or
SELECT_OPTION_B

UNTIL_RESPONSE:
WU6_UNCOMMITTED
WU7_NOT_STARTED
WU8_NOT_AUTHORIZED
NO_PRODUCT_SOURCE_CHANGE
STOP
```
