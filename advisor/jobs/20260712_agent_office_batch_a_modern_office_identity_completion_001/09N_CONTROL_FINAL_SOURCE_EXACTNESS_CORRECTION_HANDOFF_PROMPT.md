TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: existing Foundation Control session
Do not paste into: Advisor, Worker, Reviewer, or GPT strategy session
Return result to: Advisor

# Control Final Source-Exactness Correction

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target: `/home/leo/Project/agent-office-batch-a-001`

Candidate: `d65716c27e258e5cfc332a8b68a58583697ffca8`

Read directly:

1. full `SENTINEL_FINAL_DESIGN_DELTA_REREVIEW_RESULT.md`;
2. `44_ADVISOR_SENTINEL_FINAL_DESIGN_REVIEW_VALIDATION.md`;
3. the current four canonical docs;
4. exact source cited below.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Exact Patch

Patch only the three accepted findings. Do not redesign or broaden scope.

### 1. Camera And Pod-Team Contract

- Remove `DEFAULT_CAMERA = { mode: 'FIT_ALL', ... }` everywhere.
- Use actual source vocabulary: production camera override is `null`; initial
  camera is computed by
  `fullOfficeCamera(layout, viewport.width, viewport.height, selectedPodId)` and
  yields a complete `PixelCameraState` with `mode='FULL_OFFICE'`.
- Do not invent a second camera enum or untyped mapping.
- `CommittedPodConfig.advisorTeamId` must be non-sentinel `AdvisorTeam`, not
  `AdvisorTeamValue`. A renderable responsible Advisor must have the same
  non-sentinel Team. Preserve `UNASSIGNED` only as the actor-level fail-closed
  assignment state; it can never define a renderable pod lane.
- Update tests/gates named in the design to enforce both rules.

Evidence:

- `src/ui/pixel/contracts.ts:249-255`;
- `src/ui/pixel/camera.ts:9-24`;
- `src/application/organization/types.ts:35-39`.

### 2. Complete Raw LivingOffice Parser Contract

Keep the raw parser separate from the seven-field wrapper. Define the first
boundary literally and fail closed on unknown/missing/invalid fields:

- raw top-level exact keys:
  `schemaVersion`, `projectionRevision`, `evaluatedAt`, `frame`;
- `projectionRevision`: non-negative safe integer and exactly equal to the
  enclosing `RuntimeProjectionSnapshot.revision` already parsed at the same
  boundary;
- `evaluatedAt`: canonical UTC matching existing `isCanonicalUtc`, exactly
  `YYYY-MM-DDTHH:mm:ss.sssZ`, parseable, and round-tripping through
  `toISOString()`;
- frame exact keys: `actors`, `diagnostics`, both arrays;
- actor exact keys: `roleInstanceId`, the sixteen fact envelopes (`role`,
  `project`, `stableDisplayName`, `advisorTeam`, `reportsToAdvisor`,
  `assignedBy`, `returnsResultTo`, `sessionName`, `sessionProcess`,
  `aiIdentity`, `model`, `effort`, `aiRuntimeState`, `operationalState`,
  `mission`, `workUnit`), and `canReceiveWork`;
- `roleInstanceId`: non-blank string; duplicates fail closed/drop all according
  to the already-closed duplicate contract;
- every fact envelope exact keys:
  `value`, `source`, `status`, `evidenceTimestamp`; validate each value against
  its field vocabulary/sentinel, source against `PixelActorFactSource`, status
  against `OrganizationFactStatus`, and timestamp as null or canonical UTC;
- diagnostic exact keys: `code`, `roleInstanceId`, `detail`; validate `code`
  against all current `OrganizationDiagnosticCode` values, role ID as null or
  non-blank string, and detail as non-blank string;
- `canReceiveWork` is boolean and must be false whenever `advisorTeam.value` is
  `UNASSIGNED`; do not infer true from other fields.

Name the exact parser helper(s), the call from `parseProjection`, the fallback,
and the literal focused test path. Remove the false claim that existing section
3.1 already listed this nested contract; add the contract under a distinct raw
presentation subsection.

Evidence:

- `src/runtime/projection.ts:54-59,94-108,203-216`;
- `src/ui/runtime/client.ts:519-549,606-613`;
- `src/application/organization/types.ts:19-39,149-189`;
- `src/ui/pixel/contracts.ts:8-13,26-40`.

### 3. Exact Vite Eager Facade

- Keep the one exact Vite 8.1.4/Rolldown 1.1.5 `write:false` invocation.
- Identify the eager root by exact absolute `index.html` facade path resolved
  from the configured root, and require `isEntry=true`.
- Assert `src/ui/main.tsx` exists in that eager chunk's `.modules`; do not call
  it the facade.
- Retain the future production Office dynamic root by exact absolute
  `production-pixel-office-chunk.tsx` `facadeModuleId`, plus all current
  `.modules`, `imports`, `dynamicImports`, `.code`, marker, gzip, and
  fixture-isolation rules.

Evidence: current `index.html`, `src/ui/main.tsx`, `vite.config.ts`, and the
Sentinel's reproduced build output in its final result.

## Preserve And Result

Preserve every closed PRC item, all stale-text corrections, WU-02/03/04,
U1-U3/S3/R2/T3, and all accepted boundaries. No implementation/source/test/
config/package/media change. Patch at most the same four canonical docs.
Commit/push the bounded docs, update only the exact Control result and pointer,
return to Advisor, and STOP. The same Sentinel re-reviews the exact delta.

