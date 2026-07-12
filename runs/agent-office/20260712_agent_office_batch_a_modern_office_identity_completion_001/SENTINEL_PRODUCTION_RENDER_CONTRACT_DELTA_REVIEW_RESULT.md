# Sentinel Narrow Design Review — Production Render Contract

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_PRODUCTION_RENDER_CONTRACT_DELTA`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: separate existing `foundation-reviewer-sol` role session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is a read-only design/source-consistency review of the exact documentation
delta. It is not implementation, implementation review, risk acceptance, final
approval, or permission to resume the Worker.

## 1. Exact candidate and evidence inspected

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `9caff0e5edbcd0d29f0fd38c0835b9399c85b838`
- After: `2e0dddfcd8131206f63780c7613bc7d1a03f496d`
- After/upstream at review: equal (`0 0`); target worktree clean.
- Exact delta: four canonical Batch A documentation paths, `+69/-25`.
- `git diff --check 9caff0e..2e0dddf`: clean.
- Non-documentation delta: zero. Parent implementation commits were not
  attributed to this Control documentation commit.

Read directly:

1. `34_ADVISOR_CONTROL_PRODUCTION_RENDER_SCOPE_VALIDATION.md`;
2. `35_ADVISOR_PRODUCTION_RENDER_CONTRACT_REVALIDATION.md`, as challenge/routing
   claims rather than proof;
3. the complete exact four-file diff and all four current canonical Batch A
   documents;
4. current runtime projection/client/app source, organization
   types/projector/registry/evidence fixture, pixel contracts/world layout,
   prototype and renderer call-chain modules, Vite configuration, and both
   bundle-boundary tests; and
5. prior accepted design/PASS evidence only for regression context.

Direct commands included commit-fixed `git show`, `git diff --stat/--numstat/
--name-status/--check`, source `rg`, import scans, branch/upstream checks, and
non-documentation-delta checks. No tests were required or run for this docs-only
delta; no test result is claimed.

## 2. Mandatory challenge results

| # | Challenge | Verdict | Result |
|---|---|---|---|
| 1 | Production input uses real facts and correct authority labels | `NOT_CLOSED` | The shape of `LivingOfficePresentationV1`/`OrganizationFrame` is now reported accurately, but `advisorTeam` is falsely labeled RT operational truth and several claimed committed-registry presentation fields do not exist. |
| 2 | Identity/binding/layout do not become second work truth | `REGRESSION` | The proposal sources progress denominators from a new committed “WU-plan config,” creating a second WorkUnit/gate truth beside the runtime mission projection. |
| 3 | `advisorTeam` provenance is accurate | `NOT_CLOSED` | Actual projector code derives it from `OrganizationRegistryRow.advisorTeam` with registry provenance; its presence in the RT envelope does not make RT its authority. |
| 4 | Cue creation uses available exact evidence or safely emits none | `NOT_CLOSED` | The proposed input contains no accepted-evidence delta list, while diagnostics lack nearly every required `PixelCueInput` field. Diagnostics are nevertheless proposed as cues. |
| 5 | Each invalid state uses its owned sentinel | `REGRESSION` | Both invalid `operationalState` and invalid `aiRuntimeState` are mapped to domain `UNKNOWN_OR_STALE`; the required sentinels are respectively `UNKNOWN` and `AI_RUNTIME_UNKNOWN`. |
| 6 | Committed layout construction is exact and non-inferential | `NOT_CLOSED` | `CommittedOfficeLayoutConfigV1` is named but not defined sufficiently to construct pod/project identity, membership, responsible Advisor, labels, all counts, blocker state, selected pod, and deterministic defaults. |
| 7 | Parser validates the actual untrusted boundary before render | `NOT_CLOSED` | A parser signature is named, but no exact caller/invocation point connects it to `client.ts:parseProjection`, whose current `livingOffice` path remains an unchecked cast. Nested key/assignment/numeric behavior is incomplete. |
| 8 | Separate production chain is complete and fixture/prototype-type free | `NOT_CLOSED` | The Pixi chain is directionally separated, but active text both edits and does not edit `frame-projector.ts`; production DOM overlay/mirror components still require `PixelPrototypeProjection` with no exact signature correction. |
| 9 | Shared extraction preserves the prototype without editing its entry | `PARTIAL__BLOCKING` | Extraction is feasible and `prototype-entry.tsx` stays excluded, but contradictory `frame-projector.ts` instructions and missing DOM-prop adaptation prevent a deterministic preservation patch. |
| 10 | CD-3 is implementable against actual Vite output/manifest | `PARTIAL__BLOCKING` | Reference-edge/vendor-split direction is correct, but actual Vite config emits no manifest and a Vite manifest alone does not expose Rollup module IDs. The evidence source/config needed to classify Pixi chunks is unnamed. |
| 11 | Prior contracts and boundaries remain preserved | `REGRESSION` | Product/security/authority/accessibility/fallback/Channy/rollback/no-Grok/excluded-session/Batch boundaries otherwise remain, but S3 is weakened by committed work-plan progress truth and field sentinel ownership is contradicted. |
| 12 | Docs-only; no hidden product/authority/implementation approval | `CLOSED` | The exact delta is documentation-only, remains pending independent/Advisor gates, and grants no implementation or final approval. |

## 3. Blocking findings

### PRC-1 — `advisorTeam` and stable presentation fields have false source attribution

[contract/source authority]
`2e0dddf:docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:69`
labels actor `advisorTeam` as “RT operational truth.” Actual current source does
the opposite:

- `src/application/organization/projector.ts:181-183` computes `advisorTeam`
  from `registryRow.advisorTeam` through `normalizeAdvisorTeam`;
- `src/application/organization/types.ts:75-91` declares `advisorTeam` in
  `OrganizationRegistryRow`; and
- the companion contract at after lines 130-134 and 157-163 keeps organization
  bindings in committed source (A), while RT alone owns mission/WorkUnit/
  activity/operational state.

The `OrganizationFrameActor` envelope carries a registry-derived fact; transport
inside `LivingOfficePresentationV1` does not transfer authority to RT.

The next row, after line 70, also says `presentationPodId` and
`responsibleAdvisorRoleInstanceId` come from current `registry.ts`. Neither is a
field of `OrganizationRegistryRow`; `roleCategory` likewise needs a closed map
from `OrganizationRole`, not a claim of direct presence. Different Workers can
invent different pod/responsible-Advisor/category mappings.

Required patch: give every render field its actual owner and exact mapping.
Keep `advisorTeam` as the (A) registry organizational binding carried through
the projected envelope; keep mission/WorkUnit/operational state RT-owned. Define
closed mappings for any presentation-only fields not literally present.

### PRC-2 — committed WU-plan progress creates a second work-truth model

[S3 regression]
After line 78 sources `completedWorkUnits`, `totalWorkUnits`, and
`completedGates` from “committed WU-plan config ⋈ RT `workUnit`.” A committed
WorkUnit/gate denominator is operational mission structure, not visual layout.
It can diverge from the existing runtime manifest/projection, violating the
canonical S3 rule that RT is the sole mission/WorkUnit/activity/operational
truth.

The row also omits required `PixelPodInput.totalGates` and does not define which
RT state proves completion. Absence→0 does not resolve disagreement between two
WorkUnit lists.

Required patch: derive operational progress solely from an existing RT-owned
projection/manifest surface explicitly added to the production input, or render
the exact fail-closed progress sentinel/zero without adding a committed WorkUnit
catalog. `CommittedOfficeLayoutConfigV1` must contain presentation configuration,
not a second operational plan.

### PRC-3 — cues cannot be constructed from the proposed input

[calculability/authority]
The proposed exact input at after line 65 is only
`{ schemaVersion, operational, committedLayout, viewport, selection }`.
`LivingOfficePresentationV1.frame` contains actors and
`OrganizationDiagnostic[]`; there is no raw accepted-event/evidence delta list.

Actual `OrganizationDiagnostic` (`src/application/organization/types.ts:149-161`)
contains only `{ code, roleInstanceId, detail }`. Actual `PixelCueInput`
(`src/ui/pixel/contracts.ts:183-199`) additionally requires `cueId`, a valid cue
`kind`, `sourceEventId`, origin, revision, accepted/freshness/conflict,
selectedPodId, workUnitId, source/target anchors, duration, and mission sequence.
None can be recovered from a diagnostic.

After lines 73 and 94 nevertheless propose mapping diagnostics plus
accepted-evidence deltas into cues and surfacing stale/conflict diagnostics as
cues. This permits an error diagnostic to masquerade as delivery/work/review and
requires invented IDs, anchors, kinds, and sequences.

Required patch: when exact accepted structured cue input is unavailable, emit
`cues=[]`. If cues are required in this batch, add one exact existing accepted
cue contract to `LivingOfficeProductionRenderInputV1` and define a total
field-for-field mapping. Diagnostics may suppress/render diagnostics; they must
not create work/routing/review motion.

### PRC-4 — parser sentinel and collision rules contradict owned contracts

[enum/identity regression]
After line 93 assigns invalid `operationalState` and `aiRuntimeState` the same
`UNKNOWN_OR_STALE` value. Actual contracts are disjoint:

- `PixelOperationalState` sentinel is `UNKNOWN`
  (`src/ui/pixel/contracts.ts:26-40`, organization types line 66); and
- AI runtime sentinel is `AI_RUNTIME_UNKNOWN`
  (`src/application/organization/types.ts:55-63`).

`UNKNOWN_OR_STALE` is an `ObservableProjectionName` input to the R2 display map,
not a member of either output field. The proposed parser would either violate
its TypeScript type or cause another implementation-specific coercion.

After line 91 also keeps the first duplicate actor and drops later actors. At an
untrusted boundary this makes the selected identity depend on array order and
weakens the existing registry duplicate rule, which drops every duplicate ID
(`src/application/organization/registry.ts:58-80`).

Required patch: normalize each invalid enum to its owned sentinel; reject/drop
all rows for a duplicated actor ID or hard-fail the presentation deterministically;
do not use first-wins for an untrusted identity collision.

### PRC-5 — `CommittedOfficeLayoutConfigV1` is a name, not a complete contract

[implementation readiness]
The design says one pod per Advisor Team lane and calls
`createPixelWorldLayout(pods)`, but never defines the complete committed config
schema or deterministic construction. Actual `PixelPodInput`
(`src/ui/pixel/contracts.ts:110-125`) requires:

- pod and Advisor-Team IDs plus one responsible Advisor;
- all eight `PixelProjectIdentity` fields;
- mission/current-WorkUnit/current-actor labels;
- operational state;
- four WorkUnit/gate counts;
- blocker summary; and
- exact actor membership.

Current registry rows do not contain pod IDs, project color/glyph/pattern,
responsible-Advisor field, selected-pod order, or count policy. “First committed
pod” is not deterministic until the config's canonical ordering is defined.
`createPixelWorldLayout` is pure and deterministic only *after* complete pods
exist; it sorts by `projectIdentity.projectId` and then creates rects/anchors
(`world-layout.ts:16-58,69-90`). It cannot supply missing pod authority.

Required patch: write the exact `CommittedOfficeLayoutConfigV1` interface,
canonical construction file/export, ordering, project identities, membership,
responsible Advisor resolution, selected default, and every required pod field.
Missing/multiple assignments must fail to `UNASSIGNED`/fallback, never infer from
visual proximity. Keep operational fields outside this visual config.

### PRC-6 — parser is not attached to the actual untrusted boundary

[runtime validation]
Current `src/ui/runtime/client.ts:288-320` reads `/api/v1/projection` JSON and
calls `parseProjection`. That parser validates selected outer fields then returns
`value as unknown as RuntimeProjectionSnapshot` at lines 519-549; it does not
validate `livingOffice` at all.

The candidate names `parseLivingOfficeProductionRenderInput(raw: unknown)` and
says only “the caller selects” fallback. No active paragraph names whether
`client.ts:parseProjection`, `runtime-app.tsx`, the lazy chunk, or the renderer
boundary calls it, nor the exact point at which untrusted `livingOffice` bytes
are rejected before state/render. A type added to `contracts.ts` is not runtime
validation.

Nested exact-key checks, fact-envelope shapes/status/source, duplicate pod IDs,
actor-to-pod membership conflicts, responsible-Advisor uniqueness, selection
existence, anchor resolvability, numeric bounds, and literal committed defaults
are also not total. “Invalid numerics → committed defaults” leaves those values
undefined, and a monotonic clock can validly start at zero despite the proposed
`>0` rule.

Required patch: name the exact untrusted-boundary caller and data flow. Validate
the raw `livingOffice` subtree before it enters client state, compose it with the
committed config, validate the complete render input again before the lazy
renderer, and specify nested exact keys/invariants plus literal fallback values.
No render path may consume the current cast as proof.

### PRC-7 — production/prototype extraction contract contradicts itself and omits DOM adaptation

[call-chain consistency]
After line 60 and WorkUnit line 34 require a bounded edit to
`frame-projector.ts` so it imports extracted `frame-core.ts`. After line 87 says
under the same active PR-2 contract: “Not edited: `prototype-entry.tsx`,
`frame-projector.ts`, `fixtures/prototype-*`.” Both cannot be followed.

The new Pixi call chain itself avoids the prototype projector by design, but the
production Office also requires the accepted actor overlay and semantic mirror.
Actual `living-office-actor-overlay.tsx:20,83` and
`living-office-semantic-mirror.tsx:2-6` require
`PixelPrototypeProjection`. The design globally forbids production use of that
type but does not name the exact prop/interface extraction or the prototype-
compatible adapter needed to keep both components working. Only
`pixel-world-scene.tsx` and `renderer-boundary.tsx` are listed as edited for the
shared extraction at after line 87.

Required patch: resolve whether `frame-projector.ts` is edited (the shared-core
split requires yes) while preserving its public prototype behavior. Define the
fixture-free structural props used by actor overlay/semantic mirror/HUD in
production and how the prototype passes its existing projection without editing
`prototype-entry.tsx`. Keep the production graph free of prototype types and
fixtures by source construction, not assertion.

### PRC-8 — CD-3 evidence and test scope are not yet exact

[bundle proof/scope]
The graph/reference-edge approach correctly allows vendor splitting and is
stronger than the old whole-build string assertion. Two exact gaps remain:

1. actual `vite.config.ts:39-42` does not emit a manifest, while after §10 says
   to parse one; the test/config override that enables it is not named; and
2. Vite's manifest reference edges do not by themselves identify every Rollup
   module ID inside a chunk. To prove a chunk contains `@pixi`/`pixi.js` without
   falling back to package-name string searches, the test must also use an exact
   module source such as the Vite JS API's Rollup `OutputChunk.modules` map (or a
   named equivalent), then traverse `imports`/`dynamicImports` edges.

WorkUnit line 35 also authorizes the runtime-validation test in
`tests/contract/organization-registry.test.ts` “or an exact sibling.” No sibling
path is named in the otherwise closed allowlist, recreating an unnamed path
class.

Required patch: specify the exact Vite test build options/output artifacts and
graph traversal used for module classification and reference edges. Either fix
the runtime-validator test to the already-listed organization-registry path or
name one literal new test path everywhere; remove “or an exact sibling.”

## 4. Preserved items and scope

The candidate correctly recognizes the real `LivingOfficePresentationV1` and
`OrganizationFrame` shapes, separates a proposed production Pixi chain from the
existing prototype chain, keeps `prototype-entry.tsx` and prototype fixtures
excluded from editing, replaces one-physical-file Pixi assumptions with graph
reasoning, and keeps the exact delta documentation-only.

No changed line introduces authentication, delivery, command execution,
transport, DB/schema/migration, secret, remote/public/live, protected-branch,
Grok, excluded-session, or Batch B–E authority. Office-first, secondary views,
accessibility, fallback, Channy, rollback, and actor-overlay landing ownership
remain stated. U1–U3 and T3 text are unchanged.

However, the committed WU-plan progress source violates S3's one-work-truth
rule, and the wrong state sentinels contradict the accepted R2/AI-runtime output
contracts. Those are regressions inside the reviewed delta, not risks that may
be silently carried.

## 5. Verdict rationale, exclusions, and routing

`NEEDS_PATCH` is required because the candidate still permits divergent or
invalid implementations at the source-authority, cue, sentinel, layout,
validation-boundary, renderer-chain, and bundle-proof layers. The defects are
technical documentation-contract issues patchable inside the approved four-doc
scope; they do not require a new Founder product, authority, or risk decision.

Excluded: implementation, target source/test/config/package/media changes,
dependency installation, server/browser execution, DB/schema/migration,
credentials/secrets, remote/public/live access, tmux input, protected branch/
main, Batch B–E, risk acceptance, final approval, and Worker resumption.

Advisor should return PRC-1 through PRC-8 to the same Control session and route
the exact corrected delta back to this same independent Sentinel session.
Sentinel did not patch Agent Office, authorize implementation, accept risk, or
grant final approval.

`RETURN_TO: Advisor`

`STOP`
