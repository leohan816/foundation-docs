# Advisor Consolidation: Final Dual Review NEEDS_PATCH

Status: `IN_SCOPE_REWORK_REQUIRED`

Mission: `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`

Reviewed target: Agent Office `72c24fe064247c1afe20ff00a5c85ea955cda5cd`

Independent review:

- final as-built design review: `NEEDS_PATCH`
- final implementation review: `NEEDS_PATCH`
- foundation-docs review commit: `f9b7a1d`

Advisor read both review artifacts and the pointer directly. The Reviewer
independently reproduced the two findings first identified in
`41_ADVISOR_BATCH_E_PRE_REVIEW_VALIDATION.md`.

## Accepted findings

### AO-E-R1: integrated private runtime absent

Classification: `CODE_DEFECT` with associated `DOCUMENTATION_STALE` findings
`D-1` and `D-3`.

The current production browser entrypoint is fixture-only. The reviewed Node
server, persistence, projection, SSE, PWA, and communication components do not
have an executable composition root or a production browser client connecting
them. This is patchable without a real credential: the resulting runtime must
start loopback-only and fail closed as `AUTH_BLOCKED`/read-only while no approved
provider exists.

The patch must not invent `NoAuth`, a real credential, a weaker localhost trust
rule, or external/private-network exposure. It must make the actual composition
and browser data path executable and testable, with mutation controls remaining
disabled until an approved provider/session exists.

### AO-E-R2: decision authority evidence dropped

Classification: `CODE_DEFECT` with associated `DOCUMENTATION_STALE` finding
`D-2`.

`authorityRole` is accepted at HTTP input but dropped before the immutable
decision-link artifact and event/projection. The patch must preserve the named
authority and validate its correspondence to immutable authority evidence. A
caller-controlled label is not proof. Missing, unreadable, mismatched, stale, or
unverified evidence must fail closed with a stable error and no durable state
change.

## Leo/GPT rider preserved

The patch does not decide whether AO-WU-14 closes with:

1. a composed loopback runtime verified in explicit `AUTH_BLOCKED`/read-only
   mode plus synthetic authenticated test evidence; or
2. a later separately approved real local-bootstrap provider/secret gate.

That decision remains for Leo/GPT after the technical defects and review loop
are closed. No real provider or secret-handling mission is opened here.

## Advisor routing verdict

`ROUTE_EXACT_IN_SCOPE_REWORK_TO_SAME_AGENT_OFFICE_WORKER`

Then route the exact delta to the same Fable5 Reviewer for separate design and
implementation delta verdicts. Final approval and AO-WU-14 remain blocked.
