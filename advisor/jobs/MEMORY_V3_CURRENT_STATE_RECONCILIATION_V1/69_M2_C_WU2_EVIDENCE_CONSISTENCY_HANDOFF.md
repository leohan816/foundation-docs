# M2 C WU2 — Worker evidence consistency correction

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU2-EVIDENCE-CONSISTENCY-CORRECTION-001
ACTOR_ID: foundation
SESSION: foundation @3 / %3
ROLE: Foundation Worker — same WU2 author
PRODUCT_HEAD: c42c69b42fed3428f3d15b834b193bb8c79c7ef5
PRODUCT_WRITE: FORBIDDEN
EFFORT: max (current live)
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

Correct only stale WU2 evidence prose left from the intermediate `a573446` state.
The final product at `c42c69b` is correct and must not be changed.

Allowed files only:

```text
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU2_VERIFIER_VALIDATOR_RESULT_POINTER.md
```

Required corrections:

1. Result §5 must describe the final Gate 1 numeric/other leaf behavior, not the
   superseded G4/field-specific behavior.
2. Result §6.1 may preserve the historical first test-input correction, but must
   explicitly state that its `product_ref=int -> missing_product_ref` intermediate
   conclusion was superseded by Advisor Finding A and the final oracle is Gate 1
   `invalid_normalization`.
3. Result §7 must state numeric wrong types fail at Gate 1, while literal booleans
   reach their field-specific rules.
4. Result §10 question 4 must ask/record the final Gate 1 behavior for `0`/`1`, not
   the superseded field-specific expectation.
5. Pointer `TEST_INPUT_CORRECTION` must remove the stale
   `product_ref=int -> missing_product_ref` final claim and state the final
   correction to Gate 1 `invalid_normalization`.
6. Search both files for any other unqualified stale statement that contradicts
   final §15 / `c42c69b`; correct only such prose. Preserve historical facts when
   clearly labeled as intermediate and superseded.

After editing, read both files completely enough to verify no contradiction
remains. Run `rg` for `product_ref=int`, `field-specific`, `전역 scalar sweep`,
`G4 재계산`, and `0/1`. Do not run product tests, modify product files, stage,
commit, or push foundation-docs. Do not alter the design mirror.

No WU3–WU8, Reviewer dispatch, product write, DB/network/provider/secret/env,
runtime, new agent/subagent, or next work. Return the pointer and STOP.
