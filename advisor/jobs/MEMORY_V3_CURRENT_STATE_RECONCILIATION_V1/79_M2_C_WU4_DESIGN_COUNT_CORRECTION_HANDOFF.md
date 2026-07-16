# Memory V3 M2 C WU4 — bounded clarification count correction

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-DESIGN-COUNT-CORRECTION-001
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
ROLE: Foundation Designer
ROLE_MODE: BOUNDED_DESIGN_ARTIFACT_CORRECTION
RESPONSIBLE_ADVISOR: foundation-advisor
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
FINDING_ID: DR-W4-F1
FINDING_SOURCE_COMMIT: b0a22b8408b6a5a4fada2812a44607a39f4f6926
FINDING_VERDICT: PASS_WITH_NON_BLOCKING_FINDING
REQUESTED_EFFORT: medium
REQUIRED_SKILL: /fable-builder
PRODUCT_WRITE_AUTHORITY: NONE
COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Exact correction

In only this file:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md
```

change this phrase:

```text
the exact seven-key temporary policy projection
```

to:

```text
the exact eight-key temporary policy projection
```

The authoritative §10.3 dictionary already has eight keys. Do not alter the dictionary, the implementation-ready design, its pointer, policy, architecture, APIs, tests, WorkUnits, authority, or any product file.

Then recompute the corrected clarification result SHA-256 and update only `RESULT_SHA256` in:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

## Exact write scope

Exactly these two foundation-docs paths may change:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT.md
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_DESIGN_CLARIFICATION_RESULT_POINTER.md
```

Do not touch the Reviewer PASS result or pointer. Do not stage, commit, or push. Foundation, SIASIU, Cosmile, and foundation-control remain read-only.

## Verification and return

Verify:

```text
- exactly two declared paths changed;
- the old seven-key phrase is absent;
- the new eight-key phrase occurs exactly once;
- the pointer result SHA equals the corrected result file SHA-256;
- the patched implementation-ready design SHA remains 3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66;
- Foundation remains at de63c8fedaa27e470e44359cad1c2940bdc0a866 with its pre-existing dirty-state fingerprint unchanged;
- no product test, product write, stage, commit, or push occurred.
```

Return only the updated clarification pointer to `foundation-advisor` and STOP. The same independent Reviewer will re-review only this two-path delta.
