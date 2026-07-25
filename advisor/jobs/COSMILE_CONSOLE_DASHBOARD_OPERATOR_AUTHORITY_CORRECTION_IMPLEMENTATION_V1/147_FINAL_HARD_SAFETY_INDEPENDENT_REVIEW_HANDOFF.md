# 147 — Final Hard/Safety Independent Review Handoff

MISSION: `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`

## Review admission

- `REVIEW_NEEDED: YES`
- `REVIEW_TIER: HARD_IMPORTANT_SAFETY`
- `MODEL: Fable 5`
- `EFFORT: max`
- `WHY_SELECTED:` cumulative candidate changes provider-neutral operator identity, capability grants/revocation, additive authority schema, sensitive O1 route enforcement, transactional audit attribution, and refund/recovery-facing surfaces.
- `SKILL:` `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Required references only: `delta-review`, `safety-review`, `provenance-review`, `contract-review`, `review-classification`.

Advisor must live-verify the existing independent Reviewer session, Fable 5/max, exact product CWD, idle/empty input, role, independence, and skill before dispatch. Do not clear, restart, exit, replace, or add a session.

## Exact subject

- Product repository/worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`
- Branch: `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`
- Base: `3dc5129b573237a85f34bfa65a329a299d31fef2`
- Candidate: `6486019e0968de5671e43521e5cfb40d03b0bdca`
- Exact product delta: `git diff --find-renames 3dc5129b573237a85f34bfa65a329a299d31fef2..6486019e0968de5671e43521e5cfb40d03b0bdca --`
- Expected: 16 commits, 59 changed paths, candidate clean/upstream-equal.
- Product writes by Reviewer: prohibited.

Design authority:

- `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- Integrated contract `40_ADVISOR_INTEGRATED_DESIGN_CONTRACT.md`
- Design review `51_INDEPENDENT_DESIGN_REVIEW.md` (`PASS_WITH_RISK`, blockers 0)
- Final design audit/pointer `60_ADVISOR_FINAL_AUDIT.md`, `61_FINAL_POINTER.md`

Implementation evidence in this job:

- Admission/freeze: `00_ADVISOR_ADMISSION.md`, `16_ADVISOR_EXECUTION_FREEZE.md`
- Module gates: `33`, `43`, `53`, `66`, `79A`, `83`, `93`, `103`, `113A`, `119A`
- Final candidate gate: `121_M5_FINAL_GATE_RESULT.md`
- Lab correction: `139`, `142`, `145`

## Exact review questions

1. Does `OperatorPrincipal` remain structurally separate from customer identity/account/session and Console authentication?
2. Are capability definitions non-authoritative while runtime grants are explicit default-deny, scoped, lifecycle/revocation aware, and enforced at command boundaries?
3. Do sensitive refund/shipment/support/reconciliation routes preserve allowlist/session, action-bound single-use step-up/nonce, audit, idempotency, and fail-closed behavior?
4. Is audit attribution transactional for real sensitive effects while idempotent replay/read-only paths produce no second audit/economic effect?
5. Is the authority migration minimum additive and reversible/fail-closed, with no destructive change, backfill, or Golden Commerce semantic change?
6. Do Dashboard reads distinguish unavailable from confirmed zero and expose only reviewed O1-backed operations?
7. Are predecessor `/o1/operator` and Console operational surfaces truthful transition/read-only paths without a legacy/mock/admin bypass?
8. Is `/lab` a read-only 31-candidate registry with no Lab-local execution/mutation/promotion/approval control?
9. Do focused tests and final evidence meaningfully cover authorization, revocation, replay, audit, DB migration/repository behavior, build, and Lab presentation without weakening assertions?
10. Are product Git state, provenance/deviations, non-production claim ceiling, and residual Controlled-Live risks honest?

## Evidence ceiling

Read-only exact candidate delta and minimum load-bearing context only. No test, build, browser, runtime, DB, provider, network, mutation, patch, commit, or push. Do not broaden into unrelated repository audit.

Write only:

- `148_FINAL_HARD_SAFETY_INDEPENDENT_REVIEW.md`
- `149_FINAL_HARD_SAFETY_REVIEW_POINTER.md`

Maximum 100 lines total. Return `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, exact blocking findings only, residual risks, actual model/effort/skill, reviewed range, and Git state. `STOP`.
