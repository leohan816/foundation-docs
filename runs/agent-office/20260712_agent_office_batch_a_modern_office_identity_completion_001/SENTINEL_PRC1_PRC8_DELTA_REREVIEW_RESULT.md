# Sentinel Delta Re-Review — PRC-1 Through PRC-8

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_PRC1_PRC8_DELTA_REREVIEW`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel re-review

Session: separate existing `foundation-reviewer-sol` role session

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is an independent read-only design-delta re-review. It is not
implementation, implementation review, risk acceptance, final approval, or
permission to resume the Worker.

## 1. Exact candidate and evidence inspected

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Before: `2e0dddfcd8131206f63780c7613bc7d1a03f496d`
- After: `e8531a306a28b4f2858a49b32cc2b3c1bfb4ce6d`
- After/upstream at review: equal (`0 0`); target worktree clean.
- Exact delta: four canonical documentation paths, `+95/-36`.
- `git diff --check 2e0dddf..e8531a3`: clean.
- Non-documentation delta: zero. No implementation commit or test result is
  attributed to this documentation-only candidate.

Read directly:

1. the prior independent
   `SENTINEL_PRODUCTION_RENDER_CONTRACT_DELTA_REVIEW_RESULT.md`;
2. Advisor validations `37_ADVISOR_SENTINEL_PRODUCTION_RENDER_REVIEW_VALIDATION.md`
   and `38_ADVISOR_CONTROL_PRC1_PRC8_VALIDATION.md`, with the latter treated as
   challenge/routing claims rather than proof;
3. the exact commit-fixed four-file delta and all four current canonical docs;
4. current organization types, registry, evidence/projector, runtime projection,
   client parser, pixel contracts/layout/camera/clock/projector, prototype entry
   and renderer chain, actor overlay, semantic mirror, HUD, Vite configuration,
   and both named bundle-boundary tests; and
5. the installed Vite 8.1.4 and Rolldown 1.1.5 type contracts used by the
   proposed JS-API bundle proof.

Direct checks included commit-fixed `git show`, `git diff --stat/--name-status/
--check`, branch/upstream/worktree checks, exact source/type/import scans, and
closed-path scans. No runtime/source patch was made and no test was run; the
review target is a docs-only design contract, and the current tests still encode
the pre-implementation behavior.

## 2. PRC closure matrix

| Finding | Verdict | Direct result |
|---|---|---|
| PRC-1 — per-field source and authority | `PARTIAL__BLOCKING` | `advisorTeam` is correctly restored to (A)-registry authority, but `aiRuntimeState` is falsely assigned to (B) alone. Actual source composes RT work/wait/failure with (B) process/ready/error evidence. |
| PRC-2 — no second WorkUnit/gate/progress truth | `CLOSED` | The committed WorkUnit/gate catalog is removed; all four pod counts are literal display-only `0`, blocker summary is `null`, and no completion is asserted. |
| PRC-3 — cues calculable or exactly empty | `CLOSED` | Batch A now requires `cues=[]`; diagnostics may suppress/render diagnostics only and cannot create operational motion. |
| PRC-4 — owned sentinels and duplicate identity | `CLOSED` | Invalid operational and AI-runtime values use `UNKNOWN` and `AI_RUNTIME_UNKNOWN`; duplicated actor IDs are drop-all or deterministic hard failure, never first-wins. |
| PRC-5 — complete deterministic committed layout | `PARTIAL__BLOCKING` | A named interface/source and several mappings were added, but project selection, current-actor priority, responsible-Advisor validity, selection failure, and literal viewport/clock defaults remain non-total or contradictory. |
| PRC-6 — raw boundary then composed-input validation | `PARTIAL__BLOCKING` | Both caller locations are named, but the first-boundary rule references `operational.schemaVersion` inside the raw `LivingOfficePresentationV1`; the wrapper's exact-key list also omits the clock that the next rule validates and promises defaults absent from §3.1. |
| PRC-7 — production/prototype chains and structural DOM props | `PARTIAL__BLOCKING` | The `frame-projector.ts` edit contradiction and production/prototype graph split are corrected, but `LivingOfficeStructuralProjection` is only described as an unspecified subset rather than given an exact structural interface/fields and exact production composition. |
| PRC-8 — exact Vite proof and literal test/scope | `PARTIAL__BLOCKING` | The validator test path and closed file enumeration are literal. The build proof still names/captures `RollupOutput`, while this repository's Vite 8.1.4 API returns `RolldownOutput`; it also leaves `write` as two alternatives rather than one exact invocation. |

## 3. Blocking findings

### PRC-1 — `aiRuntimeState` authority remains false

[contract/source authority]
The corrected table at
`docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:72`
says `aiRuntimeState` comes from “(B) local attestation” and labels its authority
as committed (B). Actual source computes it from all of:

- (B)-derived `sessionProcess`, `ai_ready`, and `ai_error`; and
- (RT) active-work, waiting, and `FAILED` observables
  (`src/application/organization/projector.ts:128-150,185-202`).

The companion contract itself states the correct composition at lines 85-93 and
130-134. Identity/model/effort attestations listed by the new table row are not
inputs to `computeAiRuntimeState`. A Worker following the table can omit RT
failure/work/wait, display `AI_READY` while RT is failed/working, and attach the
wrong provenance.

Required correction: label `aiRuntimeState` as a projector-computed value from
the exact RT + (B) arbitration already defined in contract §2.3.2, including its
per-result provenance rule. Do not label it B-only.

### PRC-5 — the layout contract is still not total

[calculability/authority]
The new companion-contract §3.1 is useful but leaves several implementation-
deciding values unresolved:

1. `CommittedPodConfig.projectKey` is declared to index
   `projectIdentityByProject` (lines 178,185), while construction instead selects
   `projectIdentityByProject[registryRow.project]` “for the pod's project”
   (line 195). A pod can contain multiple registry actors/projects, and no row or
   conflict rule chooses “the pod's project.” `projectKey` is therefore either
   unused or contradicted.
2. `currentActorRoleInstanceId` uses a “fixed priority order” (line 198), but the
   order over all `PixelOperationalState` values is never enumerated. Two Workers
   can select different current actors and therefore different mission,
   WorkUnit, and pod operational labels.
3. A responsible Advisor is accepted when its string is merely non-empty
   (lines 184,194). The contract does not require that it resolve to exactly one
   registry actor whose role is `ADVISOR`, whose Team matches the pod, and whose
   membership is valid. On null/invalid/multiple it writes `UNASSIGNED` into
   `PixelPodInput.responsibleAdvisorRoleInstanceId`, whose actual type is an
   unrestricted required string (`src/ui/pixel/contracts.ts:110-124`), while
   still discussing the pod as rendered. That produces an authority-looking
   role ID instead of making the pod non-renderable/fallback.
4. Delta line 105 promises literal viewport/clock defaults “named in §3.1,” but
   §3.1 contains no viewport, clock, or camera default. Invalid selection likewise
   becomes `UNASSIGNED`, which is not a defined pod ID, without one exact fallback
   outcome.

Required correction: use one project key rule, enumerate the complete current-
actor priority, validate the responsible Advisor against role/Team/membership and
make an invalid pod non-renderable/fallback, and define literal selection,
viewport, clock, and camera defaults at the contract location that claims them.

### PRC-6 — raw and wrapper validation are still conflated

[untrusted-boundary validation]
The actual raw type is:

`LivingOfficePresentationV1 = { schemaVersion, projectionRevision, evaluatedAt,
frame }` (`src/runtime/projection.ts:54-59`).

The first-boundary rule at delta line 98 nevertheless requires
`operational.schemaVersion` while claiming to validate the raw `livingOffice`
subtree in `client.ts:parseProjection`. `operational` exists only in the later
`LivingOfficeProductionRenderInputV1` wrapper. This is the exact shape conflation
Advisor 38 asked Sentinel to challenge.

The second-boundary exact-key set at lines 100-106 is
`{schemaVersion, operational, committedLayout, viewport, selection}` but then
validates a clock and `cues`; neither is defined in that key set. The clock's
promised literal defaults do not exist in companion §3.1. An implementation can
therefore reject every valid raw presentation, skip a required value, or add an
undeclared key and still claim conformance.

Required correction: define a raw parser against the four literal
`LivingOfficePresentationV1` keys and nested frame/envelope keys, then separately
define the complete wrapper interface and its parser with every clock/cue/default
field present exactly once. Preserve “before client state” and “before renderer
mount” as two distinct gates.

### PRC-7 — the structural production DOM contract is named but not defined

[call-chain/interface completeness]
The candidate now consistently edits `frame-projector.ts`, preserves
`prototype-entry.tsx`, and separates the prototype and production projector
graphs. Actual current source also confirms that only actor overlay and semantic
mirror are prototype-projection-typed, while HUD already consumes a frame/backend
structure.

However, delta line 95 does not write the promised
`LivingOfficeStructuralProjection` interface. It calls it a subset containing
“pod/actor identity, labels, selection,” although the actual two components read
only `projection.pods` (`living-office-actor-overlay.tsx:154` and
`living-office-semantic-mirror.tsx:32-40`); selection comes from `frame`. It also
does not name the exact production component that passes that structure to both
DOM consumers. The missing literal shape can produce another broad pseudo-
projection or an accidental prototype-type edge.

Required correction: write the exact interface (including exact field types),
name the production composition caller for overlay/mirror/HUD, and state the
prototype structural-compatibility proof against that literal interface.

### PRC-8 — the proposed JS-API artifact does not match this repository's Vite

[test-contract implementability]
The single validator path
`tests/contract/production-render-input.test.ts` is now literal, and the source/
test list is closed. The module-classification direction is also sound.

But the installed toolchain is Vite `8.1.4` with Rolldown `1.1.5`. Its actual
`build()` signature returns `RolldownOutput | RolldownOutput[] | RolldownWatcher`,
and the chunks are Rolldown `OutputChunk`s with `modules`, `imports`, and
`dynamicImports` (`node_modules/vite/dist/node/index.d.ts:2337`; installed
Rolldown declarations). Delta line 230 instead requires capture of a
`RollupOutput`, and says `write` may target a temp directory “or” be `false`.
Those are different artifact flows, not one exact test invocation.

Required correction: name Vite 8/Rolldown's actual return type, select one exact
`build({ build: { write, manifest, outDir } })` invocation and output branch,
identify the eager and production roots by exact `facadeModuleId`/entry evidence,
then traverse the returned chunks' `imports`/`dynamicImports` and classify their
`modules` IDs. A committed manifest is unnecessary if the returned output is the
proof source; do not claim a Rollup result that this installed API does not return.

## 4. Advisor 38 six-question answers

1. **`aiRuntimeState` authority accurate? — No.** The table says B-only; actual
   projector/contract uses RT work/wait/failure + B process/ready/error.
2. **First validation matches raw `LivingOfficePresentationV1`? — No.** It asks
   for `operational.schemaVersion`, a wrapper path absent from the raw object.
3. **Current-actor order and pod/project sources total? — No.** The priority is
   unnamed, and `projectKey` conflicts with ambiguous `registryRow.project`.
4. **Invalid responsible Advisor makes the pod non-renderable/fallback? — No.**
   The design substitutes the authority-looking string `UNASSIGNED` and only
   says the pod cannot receive work; it does not validate a matching Advisor row
   or require non-render/fallback.
5. **Vite proof exact and heuristic-free? — No.** Module/edge evidence is the
   right direction, but the candidate names Rollup rather than the installed
   Vite/Rolldown result and leaves two output modes.
6. **All paths literal and no active historical contradiction? — Path closure is
   yes; contract closure is no.** The test and source paths are enumerated and the
   old `frame-projector.ts` “not edited” sentence is removed. Active PRC closure
   claims nevertheless contradict the current raw shape/toolchain and the
   companion contract's own `aiRuntimeState` composition.

## 5. Closed and preserved boundaries

- PRC-2, PRC-3, and PRC-4 are genuinely closed: there is no committed WorkUnit/
  gate catalog, cues are exactly empty, diagnostics do not create motion, owned
  sentinels are correct, and actor duplicates are not first-wins.
- WU-02/03/04 and the actor-overlay/detail-panel split remain intact. U1/U2
  evidence arbitration, U3 literal documentation paths, R2 total non-elevating
  operational mapping, and T3's canonical-current-rule/superseded-history
  separation are not weakened by this delta.
- S3's RT-only mission/WorkUnit/activity/operational truth and no-store-back rule
  are preserved; the remaining `aiRuntimeState` defect is a per-field composition
  and provenance contradiction, not a new second WorkUnit truth.
- Product and accessibility boundaries remain: Office-first authenticated
  presentation, secondary-view reachability, keyboard/focus/static semantic
  parity, responsive/reduced-motion/contrast gates, and the exact DOM-static → M1
  fallback chain.
- Security/authority/delivery/PWA/Channy/rollback boundaries remain unchanged:
  no terminal/private content, no new command/delivery/tmux/Hermes authority,
  Channy remains non-operational with `authorityRole: none`, and rollback remains
  presentation-only.
- No DB/schema/migration, secret/credential/environment, remote/public/live,
  protected-branch/main, Grok/excluded-session, or Batch B–E authority was added.
  The candidate remains docs-only and pending independent/Advisor gates.

## 6. Verdict rationale and routing

`NEEDS_PATCH` is required. The candidate closes three findings and materially
advances the others, but still permits mutually incompatible implementations at
the field-authority, layout, raw-validation, structural-props, and build-evidence
boundaries. These are technical documentation-contract defects patchable within
the already approved four-document scope; they do not require a new Founder
product, authority, security, or risk decision.

Excluded: implementation, Agent Office source/test/config/package/media edits,
dependency installation, server/browser execution, DB/schema/migration,
credentials/secrets, remote/public/live access, tmux input, protected branch or
main, risk acceptance, final approval, and Worker resumption.

Advisor should route the exact blocking corrections to the same Control session
and return the resulting exact docs delta to this same independent Sentinel
session. Sentinel did not patch Agent Office, authorize implementation, accept
risk, grant final approval, or resume the Worker.

`RETURN_TO: Advisor`

`STOP`
