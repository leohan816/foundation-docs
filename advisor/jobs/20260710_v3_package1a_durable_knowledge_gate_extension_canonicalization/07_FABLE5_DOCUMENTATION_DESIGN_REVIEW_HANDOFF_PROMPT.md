TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: same existing independent Fable5 Reviewer session, never Advisor or authoring session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260710_v3_package1a_durable_knowledge_gate_extension_canonicalization
DO_NOT_PASTE_INTO: Advisor session or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target reviewer session

# Fable5 Documentation Design Review Handoff

Model and effort: `<Fable5:Max>`

Review pass: `DESIGN_REVIEW`

Review level: `LEVEL_3`

Required skill: `/fable-sentinel`

## Mission

Independently review the V3 Package 1A durable-knowledge canonicalization package. This is documentation/authority review only. Do not patch canonical files and do not authorize Package 1B.

## Required Direct Reads

Canonical package:

- `../foundation-docs/설계문서/shared/v3/V3_CANONICAL_INDEX.md`
- `../foundation-docs/설계문서/shared/v3/V3_UNKNOWN_DECISION_GATE_REGISTER.md`
- `../foundation-docs/설계문서/shared/v3/V3_FOUNDER_DECISION_LEDGER.md`
- `../foundation-docs/설계문서/shared/v3/V3_EXTENSION_ROADMAP.md`
- `../foundation-docs/설계문서/shared/v3/V3_MISSION_ENTRY_EXIT_CHECKLIST.md`
- `../foundation-docs/설계문서/shared/v3/V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md`
- `../foundation-docs/설계문서/cosmile/COSMILE_FEATURE_INDEX.md`

Package 1A source evidence:

- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ADVISOR_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/foundation/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDATION_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- `../foundation-docs/runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ACTOR_COMPARISON_MATRIX.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_DECISION_PACKAGE.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/28_FOUNDER_DECISION_RECORD.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/25_ADVISOR_FINAL_MISSION_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/29_PACKAGE1A_DECISION_CLOSURE_RECORD.md`
- `../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/30_FINAL_DECISION_CLOSURE_POINTER.md`

Authority and prior V3 state:

- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_00_INDEX_AND_EXECUTIVE_SUMMARY_20260706.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11_risk_gate_register_audit/01_ADVISOR_BRIEF.md`

Read the actual git diff and exact published commit. Do not trust Advisor summaries.

## Required Coverage

Answer each item explicitly:

1. Are U-01 through U-09 preserved with required fields and correct states?
2. Are A-C1/A-C2/A-C3, ADD-01 through ADD-09, and Foundation evidence freshness preserved? Is original ADD-03 visibly superseded rather than erased?
3. Are all confirmed facts bounded to evidence, with deployed/runtime/DB/provider states left unverified where required?
4. Are D1 through D5-ii exact, with no expansion or hidden Package 1B design?
5. Are all eight acceptance scenarios and modifications preserved?
6. Are E-1 through E-6, residual legal/policy/operations/identity/provider/pilot gates, and global safe defaults visible?
7. Are extension points genuinely additive, backward-compatible, and protected from destructive re-key, silent overwrite, or historical reinterpretation?
8. Does the entry/exit checklist prevent a future Worker handoff from bypassing unresolved unknowns or missing design review?
9. Does the Level A/B/C protocol prevent downgrade of identity, PII/privacy, safety, DB/migration, payment/order/refund, cross-repo contract, memory/learning, irreversible transformation, and production/live risks?
10. Is `V3_CANONICAL_INDEX.md` easy to find from `COSMILE_FEATURE_INDEX.md`, with historical V3 reports correctly treated as evidence-only on conflict?
11. Is Package 1B still `NOT_STARTED_NOT_APPROVED` and is Control still forbidden?
12. Is the actual diff documentation-only and limited to declared files, with unrelated dirty files excluded?

## Forbidden

- Patch or rewrite canonical files.
- Invoke Control or any Worker.
- Create a new session, sub-agent, or delegated model context.
- Access DB, secrets, env values, production/live, or external models.
- Design Package 1B or choose new product/legal policy.
- Modify runtime/schema/API/migration files.
- Grant final approval.

## Result Storage

Write the full result to:

`../foundation-docs/runs/shared/20260710_v3_package1a_durable_knowledge_gate_extension_canonicalization/FABLE5_DOCUMENTATION_DESIGN_REVIEW_RESULT.md`

Write the pointer to:

`../foundation-docs/advisor/jobs/20260710_v3_package1a_durable_knowledge_gate_extension_canonicalization/12_FABLE5_RESULT_POINTER.md`

Commit and push only those result/pointer files to foundation-docs. Do not stage unrelated files.

Use one verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Terminal output must be ASCII-only. Markdown result files may preserve normal UTF-8 paths and source language.

Return the pointer to Advisor and STOP.
