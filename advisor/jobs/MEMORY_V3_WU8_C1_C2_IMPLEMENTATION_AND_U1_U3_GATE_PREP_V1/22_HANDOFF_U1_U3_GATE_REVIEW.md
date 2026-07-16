# Handoff — Independent Review of U1–U3 Gate Package

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-U1-U3-GATE-PACKAGE-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Independent Reviewer
REVIEW_PASS: FULL_GATE_PACKAGE_REVIEW
EXPECTED_MODEL_FAMILY: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
EXPECTED_WORKSPACE: /home/leo/Project/FOUNDATION
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

SUBJECT_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md
SUBJECT_COMMIT: a30aa663ee978253ac4918bbda7e34856a35be04
SUBJECT_BLOB: bdd7d175a7ba4791f4378f9554d511d8b5403b35
SUBJECT_SHA256: 8c036ffa960cae614ae0adc94627d32b617f9de918e26839bbee8c281567e3c3
SUBJECT_PATHS:
- advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md

CONTROL_EVIDENCE_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_RESULT.md
CONTROL_EVIDENCE_COMMIT: 1efef80ccd957d750ed530f846ab09c09546ab72
DESIGN_FILE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b
DESIGN_SHA256: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
EXECUTION_MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e

CURRENT_ROLE_AUTHORITY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/reviewer.md

REVIEW_CRITERIA:
- factual accuracy against the pinned Control evidence, source pins, Founder record, and reviewed design;
- U1, U2, and U3 each include verified facts, one exact unresolved question, no more than three concrete options, an Advisor recommendation, implementation and safety/privacy consequences, deferred scope, and required decision owners;
- option quality is decision-ready without selecting an option or accepting risk;
- infrastructure, consent, backend, schema, migration, and repository paths are not invented;
- every unresolved path or mechanism is explicit and fail-closed;
- exact blocked/unlocked WorkUnit dependencies are accurate;
- Gate Package PASS is clearly limited to package quality and does not close U1/U2/U3;
- U1/U2/U3 remain OPEN and all excluded implementation authority remains NOT_AUTHORIZED.

WRITE_SCOPE:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_POINTER.md

FORBIDDEN:
- modifying the Gate Package, Control result, design, or any product/control repository;
- staging, committing, pushing, implementation, option selection, risk acceptance, gate closure, or actor dispatch;
- DB, network, secret, credential, migration, runtime, or test execution;
- new agent, sub-agent, substitute Reviewer, or overlapping review.

VERDICTS: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
CORRECTION_LIMIT: maximum 2 bounded document-only cycles by foundation-advisor
DELTA_RULE: same Reviewer reviews only the declared old-subject to new-subject delta
STOP_AFTER_RETURN: true
```

Read every referenced file directly and review the committed subject rather than
Advisor prose. Apply `/fable-sentinel`, write only the declared result and
pointer, return to `foundation-advisor`, and STOP.
