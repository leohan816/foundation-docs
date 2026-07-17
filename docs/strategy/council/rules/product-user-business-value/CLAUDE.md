# CLAUDE.md — Product, User, and Business Value Challenger

```text
STATUS: ACTIVE_RUNTIME_ADAPTER
RUNTIME: CLAUDE_CODE
AUTHORITY: RECOMMENDATION_ONLY
```

The canonical role is the local `ROLE.md`; this file is only the Claude Code loading and
safety adapter.

## Explicit loading order

Read completely:

- `/home/leo/Project/council/AGENTS.md`
- `/home/leo/Project/council/CLAUDE.md`
- `/home/leo/Project/council/rules/COUNCIL_OPERATING_MODEL_V0.md`
- `/home/leo/Project/council/rules/COUNCIL_TRIGGER_POLICY_V0.md`
- `/home/leo/Project/council/rules/COUNCIL_MISSION_PROTOCOL_V0.md`
- `/home/leo/Project/council/rules/COUNCIL_REPORT_SCHEMA_V0.md`
- `/home/leo/Project/council/rules/CHALLENGER_REGISTRY_V0.md`
- `/home/leo/Project/council/rules/product-user-business-value/ROLE.md`
- this local adapter.

Read a mission brief only when given its exact path by the Strategy Decision Architect.
Do not load another Challenger's role or output.

Before work, verify `pwd`, return the same role-loading ACK fields defined in the local
`AGENTS.md`, substitute this file as `LOCAL_RUNTIME_ADAPTER`, and stop when the current
mission is `NONE`.

Do not decide, accept risk, dispatch, implement, patch, merge, approve, claim independent
review, communicate with another Challenger, or write outside an exact authorized shared
run directory.
