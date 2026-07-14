# Intake: Actor and Project Structure Normalization

```text
MISSION_ID: AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001
DECISION: PROCEED_WITH_LIMITS
DESIGN_AUTHORITY: Exact Founder normalization decision
DESIGN_PASS: DESIGN_PASS_SKIPPED_FOUNDER_CONTRACT_IS_COMPLETE
SLACK_IMPLEMENTATION: FORBIDDEN
PRODUCT_BEHAVIOR_CHANGE: FORBIDDEN
VALIDATION: DELTA_ONLY
```

The mission corrects project, actor, tmux, role-document, and worktree identity.
It does not authorize a new registry, a new role system, product behavior, visual
work, runtime discovery, Slack, DB, secrets, or public/production operations.

## Direct Evidence

- Canonical projects are the existing `agent-office`, `FOUNDATION`, `SIASIU`,
  `Cosmile`, `VibeNews`, `foundation-control`, and `foundation-docs` folders.
- AS0 identifies `src/application/organization/` at reviewed commit `58a484b`
  as the canonical actor/Team registry model; it is absent from current
  `ac8ba75` and must be reconciled, not duplicated.
- No accepted common role-document directory exists in the current Agent Office
  checkout, so the Founder fallback `agent-office/docs/roles/` applies.
- No accepted `.agent-office/` project overlay exists in the four target roots,
  so one minimal overlay per project applies.
- The four accidental role folders contain no remaining files after their exact
  content was preserved at foundation-docs commit `076f0f4`; only empty
  directories remain.
- `foundation-control` is a legitimate pre-existing workspace and is untouched.

## Safe Defaults

- Unknown model/effort/runtime facts remain unknown and require live
  pre-dispatch verification.
- Agent Office exact delivery remains `HOLD__LOCATOR_REBIND_REQUIRED`.
- Actor/session creation does not authorize dispatch or a mission.
- Foundation Designer binds to the exact mission target; idle binding is
  `FOUNDATION` only.
