# Final Runtime Binding Observation

Mission: `AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`

Observation time: `2026-07-14T13:01:42Z` / `2026-07-14T22:01:42+0900`.

This is a read-only Advisor observation. It records pane paths and process names;
it does not infer actor authority, model, effort, readiness, or work state from a
session or process name.

## Exact tmux observation

Command format:

```bash
tmux list-panes -a -F '#{session_name}|#{session_id}|#{window_id}|#{pane_id}|#{pane_current_path}|#{pane_current_command}|dead=#{pane_dead}'
```

Relevant output after restoring the existing `foundation-advisor` actor runtime
by resuming its existing Codex thread in the canonical workspace:

```text
agent-office-advisor|$26|@26|%26|/home/leo/Project/agent-office|codex|dead=0
agent-office-designer|$24|@24|%24|/home/leo/Project/agent-office|codex|dead=0
agent-office-opus|$16|@16|%16|/home/leo/Project/agent-office|claude|dead=0
agent-office-reviewer|$25|@25|%25|/home/leo/Project/agent-office|codex|dead=0
agent-office-sol|$13|@13|%13|/home/leo/Project/agent-office|codex|dead=0
cosmile|$1|@1|%1|/home/leo/Project/Cosmile|claude|dead=0
foundation|$3|@3|%3|/home/leo/Project/FOUNDATION|claude|dead=0
foundation-advisor|$27|@27|%27|/home/leo/Project/FOUNDATION|codex|dead=0
foundation-control|$4|@4|%4|/home/leo/Project/foundation-control|claude|dead=0
foundation-designer|$23|@23|%23|/home/leo/Project/FOUNDATION|codex|dead=0
foundation-reviewer-fable5|$5|@5|%5|/home/leo/Project/foundation-control|claude|dead=0
siasiu|$0|@0|%0|/home/leo/Project/SIASIU|claude|dead=0
```

The earlier final-audit observation found `foundation-advisor` absent. The
Advisor recreated only its tmux container at the already registered session name
and resumed existing Codex thread `019f5fa3-9e15-7793-a6a3-22e550eca1ec` from
`/home/leo/Project/FOUNDATION`. This was actor-runtime restoration, not creation
of a new Actor or project and not a mission dispatch.

## Folder state and preservation source

Direct path checks at the same observation point returned:

```text
agent-office-advisor|ABSENT
agent-office-reviewer|ABSENT
foundation-advisor|ABSENT
foundation-designer|ABSENT
```

The durable pre-removal preservation source is foundation-docs commit
`076f0f4f7594ada02759f76c8239877dc99a100c`, which preserves the useful role
instructions, README content, and templates under
`advisor/_system/roles/{agent-office-advisor,agent-office-designer,agent-office-reviewer,foundation-advisor,foundation-designer}/`.
The mission intake records that the accidental folders were empty after that
exact-content preservation:
`advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/00_INTAKE.md`.

## Boundaries

- No product/runtime source or machine registry was changed by this observation.
- No Slack/AS1, transport activation, DB/schema, secret, remote, production, or
  public action occurred.
- Existing machine-registry actor/Team bindings remain unchanged; the separate
  minimal config-only pre-AS1 delta remains mandatory.
