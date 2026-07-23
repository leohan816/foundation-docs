# P2 Design Correction Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P2_DESIGN_CORRECTION_F1_F2`
ACTOR: existing `foundation-designer`
SESSION: `foundation-designer:codex.0`
MODEL/EFFORT: `gpt-5.6-sol/max`
SKILL: `/frontend-design`
RETURN_TO: `foundation-advisor`

## Pinned state

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/HEAD: `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` / `33bf8162f0725fb514dfb9ac32c29fddb12b9df4`
- Review: docs commit `3edc7a579d19012ed62b01e8d051958b7a1e666b`, result `35_P2_INDEPENDENT_DESIGN_REVIEW_RESULT.md`, verdict `PASS_WITH_CORRECTIONS`.

## Exact product path ceiling

1. `설계자료/COSMILE_O1_독립운영콘솔_통합설계서.md`
2. `설계자료/COSMILE_CONSOLE_IA_V2.md`
3. `설계자료/COSMILE_콘솔_설계서.md`

Write only these three product documentation paths and the exact uncommitted docs result:

`advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/38_P2_DESIGN_CORRECTION_RESULT.md`

No SVG, runtime/source/component/API/test/config/schema/migration/DB/provider/secret/PII change. No rendering or test command is needed.

## F1 exact correction

Resolve dual Console-IA authority without deleting or broadly rewriting historical documents:

- In the new integration design, add one concise authority/relationship block naming both older documents.
- In each older document, add one concise top-level status pointer:
  - `SUPERSEDED_FOR`: permanent operator Console IA, navigation ownership, and reviewed O1 operational-control placement only;
  - `SUPERSEDED_BY`: `COSMILE_O1_독립운영콘솔_통합설계서.md`;
  - `RETAINED_AS`: historical evidence and deferred future-placement context.
- Do not declare unrelated historical details deleted, implemented, or approved.
- Preserve `/o1/operator` and legacy Console routes as transition/retirement evidence; do not approve deletion or redirect.

## F2 exact correction

In the new integration design only:

- replace every “reuse semantics, not the file” implication with a single-source rule;
- require the implementation to import the existing exported `classifyOperatorRequestMode` and `operatorActionSurface`, or extract them and the closed vocabulary verbatim into one shared pure module imported by both old and new surfaces;
- prohibit retyping, copying, or independently recomputing action eligibility/vocabulary in the Console;
- explicitly exclude the legacy dual-action surface from the new order/customer-support detail;
- state that any needed source extraction must preserve current server-side allowlist/step-up/nonce/idempotency/audit behavior and receives focused tests-first verification in a later frozen WorkUnit.

Do not edit the early P3 result; Advisor will integrate the corrected rule into the later technical freeze.

## Checks and return

- Verify exact three-path diff and `git diff --check`.
- Confirm no schema/economic-authority/feature-scope change.
- One additive product commit, non-force push, clean/upstream-equal.
- Compact result within 50 lines with exact commit, paths, checks, and no self-approval.

RETURN_TO: `foundation-advisor`
STOP.
