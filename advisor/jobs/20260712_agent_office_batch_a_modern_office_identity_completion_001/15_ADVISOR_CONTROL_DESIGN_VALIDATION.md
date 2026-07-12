# Advisor Validation - Control Design Delta

Verdict: `NEEDS_IN_SCOPE_CONTROL_DESIGN_PATCH`

Validated candidate: Agent Office design commit
`604dfad537e557191a84f0ecfc000461d86cfca9` and Foundation Docs result
`85bf080`.

The design is grounded, bounded, and implementable in direction, but it is not
ready for independent design review until the following technical precision
defects are patched. None requires a new Founder decision.

## Findings

### CD-1 - Reviewer authority is named incorrectly

The canonical docs hard-code Fable5 and a Fable5 design review. The authorized
primary Reviewer is the independent Sentinel role in `foundation-reviewer-sol`,
currently GPT-5.6 SOL xhigh. Model names must be evidence, not authority.

Required patch: use `independent Sentinel` and the current selected route where
necessary; preserve Fable5 only as a possible secondary/fallback runtime.

### CD-2 - U-2 is already Founder-decided

The Founder authorization explicitly requires the Living Pixel Office to be the
primary real application screen. This is not an unresolved default-vs-opt-in
policy.

Required patch: authenticated/private projection ready means Office-first by
default, without adding a new capability. Missing/invalid presentation degrades
to static semantic Office and then M1. No `surface=` demo parameter is used in
the real app.

### CD-3 - Whole-bundle zero-Pixi gate conflicts with approved integration

The old prototype isolation gate prohibited Pixi anywhere in production output.
Batch A explicitly promotes the reviewed renderer into the real app. A built
lazy pixel chunk must therefore contain Pixi.

Required patch: preserve **eager-shell isolation**, not whole-dist absence. The
main entry/eager shell and non-Office fallback graph must not eagerly import or
execute Pixi. Pixi is allowed only in a separately emitted lazy Office chunk.
Tests must verify chunk separation, fallback independence, and no eager renderer
startup rather than zero Pixi markers across all build output.

### CD-4 - Runtime state and operational state are conflated

The required AI runtime facts are not the existing 14-value workflow animation
enum. `MODEL_UNKNOWN` and `EFFORT_UNKNOWN` are also not work states.

Required patch: define separate fields and closed vocabularies for session
availability/process detection, AI identity, model, effort, and operational work
state. Preserve these required visible values:

`NO_AI_PROCESS`, `AI_PROCESS_DETECTED`, `AI_IDENTITY_UNKNOWN`,
`MODEL_UNKNOWN`, `EFFORT_UNKNOWN`, `AI_READY`, `AI_WORKING`, `AI_WAITING`,
`AI_ERROR`, `SESSION_OFFLINE`, and `UNASSIGNED`.

`AI_WORKING` requires accepted structured work evidence. Attached state,
timestamps, names, positions, proximity, and terminal prose prove none of them.

### CD-5 - Actor detail contract is incomplete

The legacy ten-field drawer does not satisfy the authorized Batch A drawer.
Missing or conflated fields include stable display name, `assignedBy`,
`returnsResultTo`, AI runtime identity, effort, and explicit evidence source.

Required patch: define the complete field contract required by the Founder for
the compact summary and detail drawer. Reuse the existing drawer implementation
where possible but do not freeze the contract to its historical ten fields.

### CD-6 - Session name is not stable actor identity

The design lists `sessionName` among stable identity fields. Stable identity is
the actor/role instance; a session is a current operational binding and may be
replaced under explicit authority without re-keying the actor.

Required patch: `roleInstanceId` is the stable key. Project/display identity and
role are identity attributes. `sessionName`, Team, reports-to, model, effort,
mission, WorkUnit, and state are separately sourced current bindings/facts.

### CD-7 - U-1 and U-4 are technically resolvable now

Required patch:

- U-1 resolves through the separated state fields in CD-4; do not ask Leo to
  choose enum members.
- U-4 uses one committed local/static organization registry under a new exact
  `src/application/organization/` module. Every row carries provenance and an
  evidence timestamp/status. It performs no automatic refresh and no time-only
  freshness inference. Unverified fields stay `UNKNOWN`; invalid assignment is
  `UNASSIGNED`. Changes require a normal reviewed commit.

### CD-8 - Required reads were not completed directly

The Control result states that several mandatory documents were only relied on
by reference. The handoff required direct reads.

Required patch: the same Control session must directly read the listed Agent
Office role protocols, master design, domain/event contracts, animation system,
and implementation plan before finalizing the corrected package. Record exact
direct-read coverage in the rework result.

## Preservation requirements

- Keep the accepted architecture direction and 17-item traceability.
- Do not modify runtime, tests, packages, config, media, auth, transport, DB,
  secrets, remote/public state, or Batch B-E.
- Patch only the four approved Agent Office documentation paths and the Control
  result/pointer.
- Implementation remains unauthorized until clean independent `DESIGN_REVIEW`.

## Post-rework residual check

Control rework commit `6e41006ff14a941403ea08caba024bec48f9b5f9`
closes CD-1 through CD-8 on substance. Two documentation residues must be
corrected before design review:

- **CD-9**: `docs/FEATURE_INDEX.md` still describes the new Batch A identity
  contract as a legacy "ten-field" contract. Replace that row description with
  the complete Batch A summary/detail fact contract.
- **CD-10**: `docs/FEATURE_INDEX.md` and the Control result/pointer still say a
  new Leo/GPT design/risk decision is required after clean design review and
  before Worker implementation. The current Founder authorization already
  grants conditional continuation after clean design review. State that a clean
  independent `DESIGN_REVIEW` plus Advisor acceptance opens the exact Worker
  handoff; only `PASS_WITH_RISK`, a new material decision, or another mandatory
  stop returns to Leo/GPT.
