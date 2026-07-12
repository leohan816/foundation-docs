TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 Foundation Control 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Control Rework - Batch A Implementation Scope Gap

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target repository: `/home/leo/Project/agent-office-batch-a-001`

Target branch: `batch-a/modern-office-identity-001`

Current accepted design commit: `381b41184994da161db3f5e80f0952f82450925e`

Required starting reads:

1. `29_ADVISOR_WORKER_SCOPE_EXCEPTION_VALIDATION.md` in this Advisor job;
2. `28_ADVISOR_FINAL_DESIGN_ACCEPTANCE.md`;
3. the four current canonical Batch A design documents;
4. actual `src/ui/pixel/living-office-actor-overlay.tsx`;
5. actual `src/ui/pixel/living-office-detail-drawer.tsx`;
6. actual `src/ui/pixel/actor-sprite.tsx`;
7. actual `src/ui/pixel/prototype-entry.tsx` only as read-only composition evidence;
8. actual `tests/ui/pixel-actor-overlay.test.tsx` and
   `tests/ui/pixel-world-semantic-parity.test.tsx`.

Do not execute from memory.

## Exact Task

Patch only the same four canonical Batch A documentation paths:

1. `docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`
2. `docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`
3. `docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`
4. `docs/FEATURE_INDEX.md`

Make the existing implementation landing sites explicit and deterministic:

- add `src/ui/pixel/living-office-actor-overlay.tsx` to the closed source list;
- add `tests/ui/pixel-actor-overlay.test.tsx` and
  `tests/ui/pixel-world-semantic-parity.test.tsx` to the closed test list;
- state that BA-WU-03 compact actor labels and BA-WU-04 actor-specific complete
  17-field drawer land in `living-office-actor-overlay.tsx`;
- preserve `living-office-detail-drawer.tsx` as the frame/evidence technical
  drawer, unless you can show a bounded, non-duplicating composition change in
  the design text without adding another path;
- correct WU-03/WU-04 source and test rows and all affected traceability;
- record this as a closed scope-correction item, not a new product decision.

The corrected design must not authorize wildcard paths or editing
`prototype-entry.tsx`. It must not redesign the accepted architecture.

## Preserve Exactly

- U1-U3, S3, R2, and T3 closures;
- Office-first shell and secondary-view reachability;
- one runtime work-truth projection and fail-closed evidence arbitration;
- eager-shell Pixi isolation and prototype-fixture exclusion;
- complete accessibility, semantic/static, reduced-motion, and M1 fallback;
- authentication, delivery, authority, security, kill-switch, and cue clearing;
- Channy non-operational boundary;
- no Grok reuse and excluded historical Agent Office session untouched;
- rollback and all Batch B-E exclusions.

## Forbidden

Do not implement, edit source/tests/config/assets/media/scripts, run a server,
invoke Worker/Reviewer, use agents/sub-agents, access DB/secrets/env/prod/live,
expand authority, enter Batch B-E, self-review, accept risk, or grant approval.

## Result

Commit and non-force push the exact four-doc correction. Update the existing
Control result and pointer only:

- `../foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/CONTROL_DESIGN_RESULT.md`
- `../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/11_CONTROL_DESIGN_RESULT_POINTER.md`

Return the exact commits and pointer to Advisor and STOP. The same independent
SOL Sentinel must review the narrow docs-only delta before Worker resume.
