# Sentinel Design Review — Agent Office Batch A

Review pass: `DESIGN_REVIEW__AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION`

Verdict: `NEEDS_PATCH`

Actor: independent Sentinel

Session: `foundation-reviewer-sol` (separate from Advisor, Control, and Worker)

Model / effort: GPT-5.6 SOL, `xhigh`

Return to: Advisor

This is an independent pre-implementation design review. It is not an
implementation review, risk acceptance, final approval, or authority to begin
Batch A implementation.

## 1. Exact review anchor and scope

- Target repo: `/home/leo/Project/agent-office-batch-a-001`
- Branch: `batch-a/modern-office-identity-001`
- Base: `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Candidate: `665b2514a0aa78e132556a746f044a16be58be9b`
- Upstream comparison at review: `0 0` against
  `origin/batch-a/modern-office-identity-001`
- Exact diff: four documentation paths, 444 insertions, no runtime/source/test/
  package/config/media path.
- `git diff --check ac8ba75..665b251`: clean.

Reviewed candidate snapshots:

1. `665b251:docs/FEATURE_INDEX.md`
2. `665b251:docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md`
3. `665b251:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md`
4. `665b251:docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md`

Reviewed Foundation Docs evidence directly: `00_INTAKE.md`, corrected
`02_CONTROL_DESIGN_BRIEF.md`, `03_WORKER_BRIEF.md`,
`14_REQUIREMENT_CURRENT_EVIDENCE_MATRIX.md`,
`15_ADVISOR_CONTROL_DESIGN_VALIDATION.md`,
`16_ADVISOR_CONTROL_DESIGN_ACCEPTANCE.md`, the Control result, and its pointer.

Reviewed canonical/reference contracts directly: Agent Office `AGENTS.md`,
`CLAUDE.md`, run/result protocols, M01 master design, M1.2 spatial master design,
domain/event contract, spatial event/animation contract, security/authority model,
living renderer design, pixel sprite/animation system, living renderer
implementation plan, feature index, and the canonical V2 actor/release-train
protocol.

Reviewed load-bearing current source/tests directly, including the production
runtime entry/app/client, runtime and authenticated-spatial projections, spatial
compatibility/types/validation/assignment, WorkUnit/activity/scene state types,
pixel contracts/frame projector/overlay/drawer, Vite composition, production
bundle-boundary tests, PWA scripts, and the relevant UI/security/composition/
performance/E2E paths named by the design.

## 2. Blocking findings

### P1 — Fail-closed field vocabularies are internally contradictory

`665b251:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:40-49`
declares closed field vocabularies, but lines 57-61 then normalize every missing,
blank, malformed, or unverified value to literal `UNKNOWN`.

- `sessionProcess` does not include `UNKNOWN`.
- `aiIdentity` names `AI_IDENTITY_UNKNOWN`, not `UNKNOWN`.
- `model` names `MODEL_UNKNOWN`, not `UNKNOWN`.
- `effort` names `EFFORT_UNKNOWN`, not `UNKNOWN`.
- `aiRuntimeState` does not include an unknown/offline member.
- `<verified AI identity>`, `<mission-proven model>`, and
  `<mission-proven effort>` are placeholders, not closed value sets or validators.
- Only `AI_WORKING` has a positive evidence rule. The document does not define the
  accepted structured evidence and fail-closed result for `AI_READY`,
  `AI_WAITING`, or `AI_ERROR`.

The same conflict is repeated at
`665b251:docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:63-75`.
An Opus Worker cannot choose the field type or the exact visible fallback without
inventing policy. A missing model can validly become either `UNKNOWN` or
`MODEL_UNKNOWN` under different sentences. That is an implementation blocker,
not a residual risk.

Required patch: define the exact type and normalization table for every field,
including malformed/unverified/offline cases and the accepted evidence required
for every non-unknown runtime state. Preserve every required visible sentinel,
but assign exactly one sentinel to each failure case.

### P2 — “Operational work state” does not identify one exact owned vocabulary

The candidate calls `operationalState` a closed vocabulary but supplies only an
`e.g.` list at
`665b251:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:51-52`.
That list mixes concepts from several current contracts and is not equal to any
of them:

- `src/domain/state-machines/work-unit.ts:3-20` owns the 16-value WorkUnit state
  set;
- `src/domain/activity/index.ts:21-41` owns the required observable names plus
  `UNKNOWN_OR_STALE`;
- `src/ui/pixel/contracts.ts:24-38` owns the 14-value
  `PixelOperationalState` set.

For example, the candidate includes `WRITING_RESULT`, `WAITING_ADVISOR`, `HOLD`,
and `REVIEW_PENDING`, while the current pixel operational set instead includes
`TESTING`, `ROUTING / DISPATCH`, `REVIEWING`, `RETURNING_RESULT`, `NEEDS_PATCH`,
`FAILED`, and `CANCELLED`. The existing source deliberately maps between these
layers; they are not interchangeable.

Required patch: name the owning source vocabulary exactly, list its complete set,
and define a total fail-closed mapping from WorkUnit state/activity/accepted cue
to the displayed Batch A operational state. Do not use `e.g.` for a closed enum.

### P3 — Registry mint/merge/provenance contract is incomplete and inconsistent

The shared actor contract at
`665b251:docs/contracts/AGENT_OFFICE_BATCH_A_IDENTITY_ORGANIZATION_CONTRACT.md:21-55`
requires identity, bindings, AI-runtime fields, operational state, and per-field
provenance. The conceptual registry row at lines 63-71 omits
`sessionProcess`, `aiRuntimeState`, `operationalState`, `mission`, and `workUnit`,
and gives the row only one `provenance`, `evidenceTimestamp`, and
`evidenceStatus`. That cannot represent fields sourced independently as the
contract requires.

The document also says the committed registry is the source for actors while its
“registry projection” is derived from the runtime projection, without defining
the mint direction, `roleInstanceId` join, per-field source precedence, or which
runtime-derived values must never be stored in the static registry. The current
runtime projection has no model/effort/session-process fields
(`src/application/spatial-office/authenticated-projection.ts:53-68`), so this gap
cannot be resolved by simple reuse.

Finally, candidate line 55 names lower-camel provenance values such as
`verifiedRegistryFact`, while the inherited current renderer contract uses
`VERIFIED_REGISTRY`, `VERIFIED_MISSION_ARTIFACT`, `CANONICAL_FIXTURE`,
`SYNTHETIC_FIXTURE`, and `UNVERIFIED`
(`src/ui/pixel/contracts.ts:6-19`). No mapping or deliberate replacement is
specified.

Failure scenario: one Worker may store all facts in the registry, another may
overlay runtime facts after projection, and either may stamp a row-level source
onto facts that came from different evidence. Both would appear consistent with
the prose while producing different truth and freshness behavior.

Required patch: provide an exact implementable fact envelope/schema, with
per-field value/source/status/timestamp, exact discriminator spellings, field
ownership, mint -> validate -> join -> project flow, merge precedence, and the
rule separating committed registry facts from accepted runtime/work evidence.
Specify the exact compact-summary subset and complete drawer field order/test
matrix, including `assignedBy`, `returnsResultTo`, and per-field evidence source.

### P4 — Full-integration source scope and gates omit inherited PWA/failure cases

The binding living-office plan conditionally names
`src/pwa/cache-policy.ts`, `public/sw.js`, and
`src/server/http/static-shell.ts` when emitted renderer files require them
(`docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md:633-644`).
It also requires production PWA online/cached/offline cases and chunk/backend/
atlas/parity/failure teardown cases at lines 706-727.

The candidate required source list
(`665b251:docs/architecture/AGENT_OFFICE_BATCH_A_APPLICATION_INTEGRATION_DESIGN_DELTA.md:139-150`)
does not include those conditional PWA/static-shell paths. Its gate list at lines
160-170 and WorkUnit gate list at
`665b251:docs/operations/AGENT_OFFICE_BATCH_A_IMPLEMENTATION_WORKUNIT_PLAN.md:91-101`
do not require the exact first-online, cached reload, offline-after-cache,
offline-before-pixel-cache DOM fallback, both-backend failure, chunk failure,
atlas/hash failure, semantic-divergence, context-loss/restore, or user-static
cases. A generic “pwa green” regression label does not prove the promoted lazy
chunk is safe offline.

Required patch: add the conditional exact PWA/static-shell source subset and the
inherited full-integration scenario matrix, while preserving the narrow
same-origin hashed-asset/cache-version boundary. Replace broad `src/ui/*` scope
with exact paths or an exact handoff rule that cannot silently widen scope.

## 3. Non-blocking provenance conflict

The latest Control pointer correctly routes an independent Sentinel review, but
the Control result header still says
`PENDING_ADVISOR_VALIDATION_AND_FABLE5_DESIGN_REVIEW` at
`CONTROL_DESIGN_RESULT.md:3`. The appended rework and pointer carry the corrected
route. Advisor should treat the header as stale evidence metadata; it is not proof
that CD-1 was consistently corrected.

## 4. Required-question coverage

| # | Review question | Result |
|---|---|---|
| 1 | All 17 Founder items | `NEEDS_PATCH`: all 17 are named/mapped, but items 4, 5, 7, 8, 15, and 17 are not implementation-complete because of P1-P4. No Batch B-E expansion was found. |
| 2 | Office-first runtime/auth composition | `SATISFIED`: default selection remains after authenticated/private projection readiness; login/fail-closed shell behavior is preserved. |
| 3 | Secondary views, communication, evidence, delivery, M1 | `SATISFIED_IN_DESIGN`: all are preserved and keyboard-reachable; Office failure does not delete them. |
| 4 | Eager-shell/lazy-Office isolation | `SATISFIED_IN_DIRECTION`: it correctly replaces obsolete whole-dist zero-Pixi. P4 requires the complete integration failure/PWA proof matrix. |
| 5 | Identity/binding/assignment/runtime/work/provenance separation | `NEEDS_PATCH`: stable `roleInstanceId` versus mutable session/assignment is correct; field types and provenance flow are not. |
| 6 | Fail-closed UNKNOWN/OFFLINE/process/runtime/work values | `NEEDS_PATCH`: P1 and P2. No prohibited name/proximity/timestamp/attached/prose inference path was authorized. |
| 7 | Compact summary and detail drawer | `NEEDS_PATCH`: fields and focus behavior are named, but P1/P3 prevent one exact testable normalization/source contract. |
| 8 | Local/static registry | `NEEDS_PATCH`: one committed registry is the correct boundary, but its fact envelope, join, ownership, and merge rules are incomplete. |
| 9 | Symbolic surfaces and Channy | `SATISFIED`: symbolic-only/private-data prohibitions and `authorityRole: none` are preserved. |
| 10 | Responsive/a11y/static/performance/visual/rehearsal/rollback gates | `NEEDS_PATCH`: core gates are present; inherited PWA and renderer-failure scenarios are missing (P4). |
| 11 | Source scope and WorkUnits | `NEEDS_PATCH`: dependency order is usable, but P3/P4 would force policy/scope invention. |
| 12 | Auth/authority/transport/PWA/security/DB/secret/remote/public/Batch B-E boundaries | `SATISFIED_WITH_P4_CORRECTION_REQUIRED`: no authority or forbidden-system expansion; conditional PWA presentation paths must be scoped exactly. |
| 13 | Documentation-only independent reviewability | `SATISFIED`: candidate diff is four docs only; Sentinel made no target-repo patch. |
| 14 | Corrected continuation authority | `SATISFIED`: a clean review plus Advisor acceptance may open the exact Worker handoff; this `NEEDS_PATCH` instead returns to Advisor for patch and same-session re-review. |

## 5. Excluded scope, checks, and routing

Excluded from this pass: implementation, runtime mutation, test execution as
completion evidence, package/config/media changes, DB/schema/migration, secrets,
live/private/public activation, transport/tmux input, protected branches, Batch
B-E, risk acceptance, final approval, and next-mission selection.

No runtime suite was represented as reproduced because the candidate changes only
documentation. Static Git/diff/reference/source inspection was sufficient to
verify the design claims and expose the contract defects above.

## 6. Verdict rationale and STOP

`NEEDS_PATCH` is required under the V2 review-classification contract. P1-P4 are
documentation-level defects inside the approved Batch A design scope and appear
patchable without a new Founder product or authority decision. They nevertheless
leave the Worker unable to choose exact enum values, evidence ownership, merge
behavior, and required integration gates without inventing policy.

Implementation must not begin from candidate `665b251`. Advisor should route an
in-scope documentation patch and then return the exact patched candidate to this
same Sentinel session for delta re-review. Sentinel grants no final approval.

`RETURN_TO: Advisor`

`STOP`
