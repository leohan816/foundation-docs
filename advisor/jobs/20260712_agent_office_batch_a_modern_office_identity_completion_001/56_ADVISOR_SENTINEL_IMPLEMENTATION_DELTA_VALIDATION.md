# Advisor Validation — Sentinel Implementation Delta Re-Review

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Date: `2026-07-13`

## Decision

`ACCEPT_NEEDS_PATCH__ROUTE_ROUTINE_SECOND_WORKER_REWORK`

The independent same-session Sentinel verdict `NEEDS_PATCH` is accepted in
full. SIR-3 is closed. The remaining SIR-1/SIR-2/SIR-4/SIR-5 findings are
directly evidenced, technically patchable within the already approved Batch A
scope, reversible, and require no new Founder product/risk decision.

## Evidence Read Directly

- Sentinel result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/SENTINEL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`
- Result commit:
  `fd2743dcff02de3937936005a2c0872fcee3cd60`
- Pointer commit:
  `1d367fbfd6ca8d867ac6a0f26c4ca4231dc30e35`
- Reviewed candidate:
  `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Target branch was clean and local/upstream/direct-remote equal at review end.
- Reviewer directly reproduced 619/619 unit tests, CD-3 6/6, Living Office
  3/3, composed 3/3, prototype 20/20, demo 43 passed/23 skipped, production
  build, strict-CSP runtime, browser pixels, hostile inputs, and loopback
  rehearsal after restoring the production build.

## Accepted Findings

### I2-1 — Public renderer state split (SIR-1 partial, medium)

The child host truthfully exposes `PENDING`, but the parent authenticated HUD
initializes to and displays `WEBGL` before `onInit`. The public UI can disagree
for up to the bounded initialization timeout. The parent/HUD must remain
pending/unknown until the child reports success and must expose fallback
truthfully on failure.

### I2-2 — Label readability, reflow, and actor tracking (SIR-2 partial, high)

Contrast and Axe are repaired, but actual pixels fail the product contract:

- normal desktop cards use sub-10-pixel text and can be far from their actor;
- mobile shows only four of eight labels and cards occupy 32.3% of the stage;
- 200-percent text spills from fixed cards and occludes cards, actors, desks,
  symbolic surfaces, and the Office;
- no connector explains distant placement.

The patch must preserve truthful first-layer facts while making normal desktop,
mobile, and 200-percent/reduced/static presentation readable, associated with
the actor, and non-occluding. Axe alone is not closure evidence.

### I2-3 — Incomplete pre-assembly validation (SIR-4 partial, medium)

No-throw behavior and original hostile cases are fixed, but invalid committed
defaults, malformed selection shapes, extra selection keys, wrong selected ID
types, cross-pod duplicate actor membership, and some Advisor membership
conflicts can still return `ok:true` or rely on assembly rather than the exact
pre-assembly contract. The accepted default/order and selection rules must be
validated exactly while preserving valid-string unknown-pod fallback.

### I2-4 — Channy pixel/semantic parity and production copy (SIR-5 regression, medium)

The pure projector has eight correct non-operational states and the canvas
moves, but the semantic mirror remains `STOP` because parent frame state is not
updated for meaningful Channy state changes. The authenticated UI also retains
`Prototype status`, `TOUR RUNNING`, and `Accessible synthetic fixture mirror`
copy that is false for continuous fixture-free production. Mobile/full-office
pixels do not make Channy recognizable enough while labels dominate.

## Why Control Is Not Reinvoked

This is a routine implementation patch under the already accepted Control
design. The governing contracts already require:

- truth-preserving renderer and UNKNOWN/pending state;
- readable, actor-associated compact labels with mobile/200-percent semantic
  equivalence;
- exact no-throw pre-assembly validation;
- visual/semantic parity and non-operational Channy;
- production, not prototype/fixture, product language.

No architecture, authority, security boundary, schema, dependency, product
policy, or Batch A/B boundary is being selected. Reopening Control would add
process without resolving a new unknown. If implementation reveals a genuine
contract conflict, the Worker must stop and return that exact conflict.

## Patch Route

- Same Worker: `agent-office-opus`
- Verified expected model/effort before dispatch: Opus 4.8, Ultracode
- Required skill: `/fable-builder`
- Base: `74d586660c8fc55c04bcaca6f7442cd14218eb33`
- Same branch: `batch-a/modern-office-identity-001`
- Scope: I2-1 through I2-4 only, tests/evidence/as-built docs coupled to them
- Reviewer after patch: same `foundation-reviewer-sol`, `/fable-sentinel`,
  GPT-5.6 SOL xhigh

`PASS_WITH_RISK`, new product/authority/security scope, or unresolved contract
conflict returns to Leo/GPT. Routine `NEEDS_PATCH` remains in the same bounded
Worker/Sentinel loop. Batch B remains not started and unauthorized.
