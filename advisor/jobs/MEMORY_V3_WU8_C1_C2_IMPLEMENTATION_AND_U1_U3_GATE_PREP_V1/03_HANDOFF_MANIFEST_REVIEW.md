# Handoff — Independent Review of Advisor Execution Manifest

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-C1-C2-EXECUTION-MANIFEST-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Independent Reviewer
REVIEW_PASS: FULL_MANIFEST_REVIEW
EXPECTED_MODEL_FAMILY: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
EXPECTED_WORKSPACE: /home/leo/Project/FOUNDATION
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

FOUNDER_DECISION_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/00_FOUNDER_DECISION_RECORD.md
FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
FOUNDER_DECISION_BLOB: a5dcf52601ce78fbfda3ce425e54714707f74ad0
FOUNDER_DECISION_SHA256: 0373798359fde9703e38857371f399816b32bb62f41647983359f5502db406cf

SUBJECT_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_ADVISOR_EXECUTION_MANIFEST.md
SUBJECT_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e
SUBJECT_BLOB: e63a21da3626a42817cc893c517934f60ed3bf32
SUBJECT_SHA256: b667bc0d3c05b7b38170877ba8cd695646aafbb98f9efb0d2dfa929bb76b6383
SUBJECT_PATHS:
- advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_ADVISOR_EXECUTION_MANIFEST.md

DESIGN_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
DESIGN_DELTA_REVIEW_COMMIT: 5ea5469dec56768270fdb8c3eb8e1cf51bdacb49

CURRENT_ROLE_AUTHORITY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/reviewer.md

REVIEW_CRITERIA:
- faithful, non-expansive translation of the Founder record;
- exact C1/C2 paths, semantics, tests, rollback, dependency and stop gates;
- complete repository/runtime preflights and preservation inventory;
- exact Worker/Control/Reviewer separation and serialized review scheduling;
- safe C1 ephemeral PostgreSQL and mandatory cleanup evidence;
- unique durable result/pointer paths and exact-path staging;
- two-cycle correction ceiling and same-Reviewer delta rules;
- complete U1/U2/U3 decision-package requirements and path truth;
- strict exclusions, final containment audit, and HARD STOP.

WRITE_SCOPE:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_EXECUTION_MANIFEST_REVIEW_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/01_EXECUTION_MANIFEST_REVIEW_POINTER.md

FORBIDDEN:
- patching or modifying the Manifest or any product/control repository;
- staging, committing, or pushing;
- policy selection, risk acceptance, scope expansion, or actor dispatch;
- DB, network, secret, credential, migration, runtime, or test execution;
- new agent, sub-agent, substitute Reviewer, or overlapping review.

VERDICTS: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
STOP_AFTER_RETURN: true
```

Read every referenced file directly. Verify the actual committed subject rather
than trusting Advisor prose. Apply `/fable-sentinel`, write only the declared
result and pointer, return a compact pointer to `foundation-advisor`, and STOP.
