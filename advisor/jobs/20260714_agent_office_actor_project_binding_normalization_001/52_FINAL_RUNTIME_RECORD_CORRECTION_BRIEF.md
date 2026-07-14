# Final Runtime Normalization Record Correction Brief

## Advisor Finding

The role-entry delta passed independent re-review. During final audit, direct
current-state evidence exposed one stale statement in the canonical migration
record:

`docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md` says no tmux session was
created, modified, or dispatched by this mission. That was true of the initial
documentation Worker delta, but it is false for the completed mission: the
Advisor later normalized live actor paths, recreated/rebound affected existing
actor sessions, and routed the authorized Worker/Reviewer patch loops.

## Exact Route

- Same Worker/session: `agent-office-opus`.
- Required skill: `/fable-builder`; read
  `/home/leo/Project/skill/fable-builder/SKILL.md`.
- Repository/branch: `/home/leo/Project/agent-office`,
  `shadow/agent-office-m1-2-spatial-office`.
- Exact base: `79beb962054428398b061248512f0253b2af6f94`.
- Allowed repository file only:
  `docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md`.
- Result file only:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/FINAL_RUNTIME_RECORD_WORKER_RESULT.md`.

## Required Correction

1. Scope the old “no tmux action” statement to the initial documentation Worker
   delta instead of the whole mission.
2. Record the final observed runtime bindings accurately:
   - `agent-office-advisor`, `agent-office-designer`, `agent-office-opus`,
     `agent-office-reviewer`, and preserved `agent-office-sol` run from
     `/home/leo/Project/agent-office`;
   - `foundation-advisor` and `foundation-designer` idle/default at
     `/home/leo/Project/FOUNDATION`;
   - `foundation-control` remains unchanged at
     `/home/leo/Project/foundation-control`;
   - `foundation`, `siasiu`, and `cosmile` remain in their canonical project
     folders.
3. Record that the accidental top-level role folders
   `agent-office-advisor`, `agent-office-reviewer`, `foundation-advisor`, and
   `foundation-designer` were removed after preservation checks.
4. Distinguish actor-runtime normalization and authorized tmux routing from
   product/runtime capability changes: no Agent Office product behavior,
   transport authority, Slack/AS1, DB/schema, secret, remote, production, or
   public action was implemented or activated.
5. Preserve the explicit unchanged machine-registry binding and mandatory
   separate config-only pre-AS1 gate.

## Forbidden and Checks

- No other file, product test, product/runtime source, registry/config, Slack,
  AS1, transport, tmux input, folder action, or another repository change.
- No broad review; no main/protected merge; no force push.
- Verify exact one-file diff, `git diff --check`, final HEAD/upstream equality,
  and unrelated Grok paths untouched.
- Report every check/skip, final commit, rollback, and the still-deferred
  machine-registry gate honestly.

Commit and non-force push the authorized branch. Write the result, return it to
`agent-office-advisor`, and stop without dispatching the Reviewer.
