# Handoff — Reviewer Artifact Path Alignment

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
TASK_ID: WU8-U1-U3-GATE-REVIEW-PATH-ALIGNMENT-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Same Independent Reviewer — own-artifact path alignment only
MODEL: Fable 5
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

The completed full Gate Package review was written and committed at these dispatch-declared paths:

```text
SOURCE_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_RESULT.md
SOURCE_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_POINTER.md
SOURCE_COMMIT: 95e7238da9b274aeba137aad88e1c0a4bd2f6d2d
SOURCE_RESULT_SHA256: be0aac4395f08175ea58dc770198a911c2d7a728d14f379b4fa9a5776abdb488
VERDICT: NEEDS_PATCH
FINDING: GP-1
```

The independently reviewed Execution Manifest pre-declared these canonical full-review paths:

```text
TARGET_RESULT: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_RESULT.md
TARGET_POINTER: runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_REVIEW_POINTER.md
MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e
```

Perform only this administrative alignment:

1. Read both source artifacts directly from `SOURCE_COMMIT`.
2. Write byte-identical copies to `TARGET_RESULT` and `TARGET_POINTER`.
3. Verify source and target SHA-256 equality for each file.
4. Do not change the verdict, finding, prose, subject, or any product/control file.
5. Do not perform or claim a new review; this only aligns the same Reviewer's own completed artifacts with the
   Manifest-declared canonical paths.
6. Do not stage, commit, push, dispatch, patch the Gate Package, select an option, accept risk, or close a gate.

Return the source/target SHA-256 values and `PATH_ALIGNMENT: PASS | FAIL` to `foundation-advisor`, then STOP.
