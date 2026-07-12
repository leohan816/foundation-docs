# Advisor Revalidation - Production Render Contract

## Verdict

`READY_FOR_NARROW_INDEPENDENT_SENTINEL__NOT_YET_ACCEPTED`

Candidate `2e0dddf` materially closes the three structural defects in Advisor
validation 34 and is ready for independent docs/source-consistency review. This
is not final Advisor design acceptance and does not resume the Worker.

## Verified Closures

- **PR-1 structural closure:** the document now accurately states that
  `LivingOfficePresentationV1` contains only the version/revision/time and an
  `OrganizationFrame`, while that frame contains only actors and diagnostics.
  It defines a separate versioned production render input and distinguishes
  runtime work truth from committed presentation configuration.
- **PR-2 structural closure:** the production call chain is separately named
  from lazy entry through production scene/projector/core. The prototype chain
  remains named and isolated; all new/edited paths are literal.
- **PR-3 structural closure:** an explicit runtime parser is required; output
  frame schema is no longer misrepresented as input validation; hard failures
  select a fallback rather than rendering or throwing.
- **PR-4 closure:** CD-3 proof is defined by static import boundaries, manifest
  reference edges, module-graph traversal, and built marker exclusion. Legitimate
  vendor chunk splitting is not treated as failure.
- exact candidate commit changes the same four canonical docs only; target is
  clean and upstream-equal; Control implemented no code.

## Mandatory Sentinel Challenge Points

The independent Sentinel must not treat the structural closure summary as proof.
It must resolve these load-bearing questions from actual code and contract text:

1. `advisorTeam` currently originates from the committed registry and is merely
   carried inside `OrganizationFrameActor`; confirm the source/authority table
   does not falsely reclassify it as runtime operational truth.
2. `LivingOfficePresentationV1` exposes no raw accepted-evidence delta list.
   Confirm cue construction uses only fields actually present in the composed
   input, never invents dispatch/review/work activity from diagnostics, and has a
   total deterministic mapping with exact IDs/anchors/sequences or safely emits
   no cue.
3. Confirm invalid `operationalState` and invalid `aiRuntimeState` each fail to
   their own actual sentinels (`UNKNOWN` and `AI_RUNTIME_UNKNOWN`) rather than the
   unrelated domain `UNKNOWN_OR_STALE` observable name.
4. Confirm `CommittedOfficeLayoutConfigV1` has a named deterministic construction
   source sufficient for pod identity, project identity, membership, progress,
   anchors/layout, selected Pod, and counts without prototype fixture reuse or
   authority inference.
5. Confirm the parser is invoked at the actual untrusted runtime boundary before
   lazy rendering and that TypeScript types/casts are never accepted as proof.
6. Confirm prototype behavior can remain unchanged after shared draw/backend
   extraction, with no production import edge to prototype projector/fixtures.
7. Confirm the CD-3 test specification can be implemented against the actual
   Vite output/manifest without package-name-string or one-file assumptions.
8. Confirm all added files remain necessary and bounded; no hidden Batch B-E,
   security, authority, authentication, delivery, or command expansion exists.

Any contradiction is `NEEDS_PATCH`, not a risk to silently carry. A clean `PASS`
returns to Advisor for final design acceptance and exact Worker resume handoff.

## Reviewer Routing Decision

- target actor: Sentinel
- selected reviewer: Codex GPT-5.6 SOL Sentinel
- target session: `foundation-reviewer-sol`
- required skill: `/fable-sentinel`
- review level: Level 2 design/source-consistency delta
- effort: xhigh; no Level 3 security/authority scope is introduced
- not selected: Fable5/Opus secondary session, because the registered primary SOL
  reviewer is available and has preserved independence on this design train
- return result to: Advisor
- status: `READY_TO_USE`

