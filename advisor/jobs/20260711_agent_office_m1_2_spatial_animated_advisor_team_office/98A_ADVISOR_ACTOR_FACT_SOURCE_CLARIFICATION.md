# Advisor Actor Fact Source Clarification

Status: `BINDING_IN_SCOPE_EVIDENCE_CLARIFICATION`

This clarification does not change product scope. It applies the Founder rule
that unknown actor metadata must remain `UNKNOWN` and must not be inferred.

## Session names

The following session names were directly verified in the active transport
registry for this mission and may be used as explicit structured prototype
facts:

- Foundation Advisor: `foundation-advisor`
- Control: `foundation-control`
- Foundation Worker: `foundation`
- Cosmile Worker: `cosmile`
- SIASIU Worker: `siasiu`
- Agent Office Worker: `agent-office`
- Fable5 Reviewer: `reviewer-fable5`
- VibeNews Advisor: `VibeNews-advisor`
- VibeNews Worker: `VibeNews`
- VibeNews Designer: `VibeNews-designer`

Do not invent alternate labels such as `control`, `foundation-worker`,
`cosmile-worker`, `siasiu-worker`, or `vibenews-worker` as session facts. Any
actor not covered by verified registry evidence must use `UNKNOWN`.

## Model names

The current mission directly proves only:

- Agent Office Worker: `Codex 5.6 SOL`
- Fable5 Reviewer: `Fable5`

All other actor model values must be `UNKNOWN` unless an existing canonical
artifact directly read by the Worker proves the exact current model for that
role instance. Do not apply `Codex 5.6 SOL` across Workers by convention.

## Synthetic operational facts

Role, project, Advisor Team, and reports-to relationships may use the canonical
Single Advisor Team fixture. Mission, WorkUnit, state, and freshness values must
remain explicitly marked as synthetic fixture data where they are not live
projection facts. The UI and detail drawer must not present synthetic values as
verified current operations.

Add tests proving that null, absent, and unverified fields render `UNKNOWN` and
that no renderer-side fallback manufactures a model or session value.
