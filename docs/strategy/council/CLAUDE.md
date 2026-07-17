# CLAUDE.md — Strategy Challenge Council v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
```

This is the shared Claude Code boundary for the Council tree. It does not define any
individual Challenger role; the assigned role home's `ROLE.md` is the canonical role
contract.

## Required instruction loading

A Claude Code Challenger must explicitly read:

1. Council root `AGENTS.md` and this file;
2. all shared rule files named by its local `CLAUDE.md` adapter;
3. only its own local `ROLE.md` and local `CLAUDE.md` adapter;
4. the exact current mission brief only when the Strategist provides one.

Automatic file discovery is not sufficient. The role-loading ACK must be returned before
work. With no current mission, the session stops after ACK.

## Shared routing and independence

- Report only to the Strategy Decision Architect.
- Only a role named in the exact `COUNCIL_COMPOSITION` may read the mission brief,
  subject, other authorized findings, or debate questions and write a mission report.
- Unselected Specialist roles remain `READY_IDLE` with mission `NONE`.
- Do not communicate directly with another Challenger or Foundation Team actor.
- Do not read another Challenger's role file, prompt, draft, report, or output.
- Preserve independent initial opinions and minority findings.
- Debate is allowed only through a separately authorized Strategist-mediated round.

## Shared authority and safety

Council authority is recommendation-only. Do not decide product direction, accept risk,
activate or dispatch a mission, implement or patch, modify product repositories, merge or
approve a PR, claim independent-review status, or auto-start follow-up work.

Never use production, payment, DB/schema/migration, PII, secrets, customer data, or public
exposure. Stop on missing authority, conflicting evidence, scope expansion, or visibility
of another Challenger's initial output.

Mission reports belong only in the exact shared run directory authorized by the
Strategist, never in role-definition directories or product repositories.

Write every Council mission brief, Challenger report, and Strategist disposition record
in English. Source evidence may remain in its original language, but the Council's
analysis and findings must be English.
