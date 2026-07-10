# Agent Office M01 Unknown Gate

Status: `PASSED_FOR_CURRENT_SCOPE`

| ID | Question | Current classification | Safe default | Resolution owner |
|---|---|---|---|---|
| AO-U01 | Which application stack fits an empty private repo? | `TECHNICAL_DESIGN_REQUIRED` | proven TypeScript web stack, no novelty | Agent Office Worker, Fable5 review |
| AO-U02 | SSE or WebSocket for real-time projection? | `TECHNICAL_DESIGN_REQUIRED` | SSE unless bidirectional socket need is proven | Agent Office Worker |
| AO-U03 | How is operational state persisted without DB approval? | `TECHNICAL_DESIGN_REQUIRED` | append-only JSONL plus deterministic projections and atomic files | Agent Office Worker |
| AO-U04 | How does browser communication reach Advisor without duplicating authority? | `TECHNICAL_DESIGN_REQUIRED` | immutable inbox artifact plus narrow Advisor gateway interface; no Worker target | Agent Office Worker, Fable5 |
| AO-U05 | What authentication is permitted without secrets? | `OPEN_GATE_FOR_EXTERNAL_USE` | loopback-only development, secure env contract and test doubles; no external exposure | Leo/GPT before deployment |
| AO-U06 | Can private mobile access be exposed now? | `OUT_OF_SCOPE_HOLD` | deployment plan only; no Tailscale/public action | Leo/GPT future mission |
| AO-U07 | Can terminal prose drive state? | `RESOLVED_BY_MISSION` | no; structured manifests/events/evidence only | fixed authority |
| AO-U08 | Can browser dispatch directly to role sessions? | `RESOLVED_BY_MISSION` | forbidden; Advisor-only gateway | fixed authority |
| AO-U09 | Is Hermes implemented now? | `RESOLVED_BY_MISSION` | interface/stub/tests/docs only | fixed authority |
| AO-U10 | How are WorkUnit denominator changes governed? | `RESOLVED_BY_MISSION` | versioned manifest and explicit scope-change event | fixed authority |

## Escalation Triggers

STOP for Leo/GPT if design or implementation requires:

- DB or secret access;
- non-loopback or external exposure;
- real authentication credentials;
- arbitrary browser terminal execution;
- direct browser Worker/Reviewer routing;
- a new session or sub-agent;
- a product scope beyond M01.
