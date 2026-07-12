TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 Foundation Control 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Control Rework - Production Input And Renderer Contract Correction

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target repository: `/home/leo/Project/agent-office-batch-a-001`

Target branch: `batch-a/modern-office-identity-001`

Candidate to correct: `9caff0e5edbcd0d29f0fd38c0835b9399c85b838`

Read directly:

1. `34_ADVISOR_CONTROL_PRODUCTION_RENDER_SCOPE_VALIDATION.md`;
2. the four current canonical Batch A documents;
3. `src/runtime/projection.ts` and `src/ui/runtime/client.ts`;
4. `src/application/organization/types.ts` and `projector.ts`;
5. `src/ui/pixel/contracts.ts`;
6. `src/ui/pixel/pixel-world-chunk.tsx`, `renderer-boundary.tsx`,
   `pixel-world-scene.tsx`, and `frame-projector.ts`;
7. actual Vite config and the two bundle-boundary tests.

Use no agents, sub-agents, or delegated contexts. Do not execute from memory.

## Exact Task

Patch only the same four canonical Batch A documentation paths. Close PR-1,
PR-2, and PR-3 from the Advisor validation.

The correction must be implementation-deterministic:

1. Replace the false claim that current `livingOffice` already supplies pods,
   layout, cues, selection, and clock. Define an exact versioned production
   presentation contract and deterministic source for every required frame
   input. Distinguish runtime operational truth from committed visual layout
   configuration. No synthetic prototype fixture reuse or inferred authority.
2. Define the exact production renderer call chain from lazy shell import to
   production projector. Name each edited/new source and test path. Ensure the
   production graph has no import edge to `frame-projector.ts` or
   `fixtures/prototype-*`, while the prototype path remains functional and
   isolated. Resolve the current `PixelPrototypeProjection` prop/type coupling.
3. Define an exact runtime parser/validator for
   `agent-office.living-office-presentation.v1` (or a clearly versioned
   superseding production contract), including schema, required fields,
   duplicate actor IDs, invalid/multiple/missing Advisor assignment,
   stale/conflicting diagnostics, invalid values, and fallback. Type assertions
   are not runtime validation.
4. Define CD-3 tests in terms of eager/fallback versus lazy Office module graphs
   and manifest/import evidence, not a fragile assumption that Pixi package
   strings occupy exactly one physical output file. Preserve static import scans
   and built-output prototype-marker exclusion.
5. Preserve existing WU-02/WU-03/WU-04 implementation, accepted U1-U3/S3/R2/T3,
   actor-overlay correction, all accessibility/security/authority/fallback/
   Channy/rollback rules, no Grok reuse, excluded session, and Batch B-E hold.

If a new exact source/test path is necessary, add it literally to the closed
scope and WorkUnit plan. No wildcard. Do not ask the Worker to invent the
contract.

## Forbidden

No source/test/config/assets/media/script implementation. No server, Worker,
Reviewer, agents, DB, secrets, env values, remote/public/prod, authority change,
Batch B-E, self-review, risk acceptance, or final approval.

## Result

Commit and non-force push only the four design documents. Update only the exact
Control result and pointer in foundation-docs. Return exact commits to Advisor
and STOP. Advisor will revalidate before independent Sentinel review.

