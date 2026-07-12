TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: 기존 Foundation Control 세션
이 지시문을 붙여넣으면 안 되는 곳: Advisor / Worker / Reviewer / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Control Final Narrow Rework - Five Remaining PRC Corrections

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target: `/home/leo/Project/agent-office-batch-a-001`

Candidate: `e8531a306a28b4f2858a49b32cc2b3c1bfb4ce6d`

Read directly:

1. full `SENTINEL_PRC1_PRC8_DELTA_REREVIEW_RESULT.md`;
2. `40_ADVISOR_SENTINEL_PRC_DELTA_REREVIEW_VALIDATION.md`;
3. exact current four canonical docs;
4. cited current source and installed Vite/Rolldown type declarations.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Exact Patch

Patch only the same four canonical docs. Preserve closed PRC-2/3/4 unchanged.

### 1. aiRuntimeState Authority

Replace B-only attribution with the exact existing arbitration:

- inputs: (B) `sessionProcess`, `ai_ready`, `ai_error` plus RT active work,
  waiting, and failed observable;
- `AI_ERROR`: B error provenance when present, otherwise RT provenance;
- `AI_READY`: B ready provenance;
- `AI_WORKING` / `AI_WAITING`: RT provenance;
- `AI_RUNTIME_UNKNOWN`: fail-closed unverified/sentinel provenance.

Identity/model/effort attestations are not direct aiRuntimeState inputs.

### 2. Total Layout Contract

- `CommittedPodConfig.projectKey` is the sole key into
  `projectIdentityByProject`; remove ambiguous registry-row project selection.
- Enumerate one complete total current-actor priority over every
  `PixelOperationalState`, plus ascending `roleInstanceId` tie-break. Choose a
  conservative deterministic order from existing semantics and state it
  literally; do not leave “fixed priority.”
- A responsible Advisor is valid only if exactly one resolved registry actor has
  role `ADVISOR`, matching Team, and valid pod membership. Otherwise omit the pod
  with diagnostic; if no valid pods remain, fallback `M1_FIXED_STATIONS`. Never
  use `UNASSIGNED` as an authority-looking roleInstanceId.
- Invalid user selection falls to a valid `selectedDefaultPodId`; invalid default
  or no valid pod -> `M1_FIXED_STATIONS`.
- Define literal committed defaults for invalid viewport width/height, logical
  time, and camera mode/override in §3.1. Zero logical time is valid.

### 3. Two Exact Parser Shapes

Define separately:

- raw parser input exact keys: `schemaVersion`, `projectionRevision`,
  `evaluatedAt`, `frame`; `schemaVersion` is directly on raw
  `LivingOfficePresentationV1`, not under `operational`;
- wrapper `LivingOfficeProductionRenderInputV1` exact keys and types, including
  every field actually validated/consumed exactly once (`schemaVersion`,
  `operational`, `committedLayout`, `viewport`, `selection`, clock/logical time,
  and `cues` if retained as an explicit always-empty field).

Keep raw validation before client state and full wrapper validation before lazy
renderer mount. Define literal nested defaults at the contract source.

### 4. Literal Structural DOM Interface

Write the exact TypeScript interface for `LivingOfficeStructuralProjection`
using only fields actually read by overlay and semantic mirror. Based on current
source this must be a literal fixture-free pod projection, not an unspecified
“subset.” Name the exact production component/caller that passes it to actor
overlay and semantic mirror alongside `PixelWorldFrameV1` and passes frame to HUD.
State why `PixelPrototypeProjection` structurally satisfies the exact interface
without editing `prototype-entry.tsx`.

### 5. Exact Vite 8/Rolldown Proof

- Use the installed API names: Vite `8.1.4`, Rolldown `1.1.5`,
  `RolldownOutput`/Rolldown `OutputChunk`.
- Select one invocation only: Vite JS `build()` with `build.write=false` and the
  exact production mode/config/root inputs; no temp-output/manifest alternative.
- Normalize the returned single/array result fail-closed, require non-watcher
  output, identify roots by exact `facadeModuleId`, classify module IDs from each
  returned chunk's `modules`, and traverse `imports`/`dynamicImports`.
- Use returned chunk `code` for marker/gzip checks where needed. Do not rely on a
  committed manifest, package-name output strings, or physical file count.

## Preserve And Result

Preserve WU-02/03/04, U1-U3/S3/R2/T3, all closed PRC items and all accepted
boundaries. No implementation/source/test/config change. Commit/push four docs
only, update exact Control result/pointer only, return to Advisor, and STOP. Same
Sentinel re-reviews the exact delta.

