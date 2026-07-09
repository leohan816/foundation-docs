# 01 Advisor Brief - Next Action Routing Rule Patch

## Verdict

`NEXT_ACTION_ROUTING_RULE_READY`

## Instruction Validation

Decision: `PROCEED`

This is an Advisor operating-rule patch. It does not require runtime repository edits, implementation work, schema changes, DB writes, or role-session execution.

## Executive Summary

Advisor final responses must now include a `NEXT ACTION ROUTING` block. The block makes the next handoff path explicit for Leo/GPT by naming the next actor, target session, exact prompt file, Leo action, result return path, wrong sessions, and status.

The current V3-11C2 loop state was updated with a concrete routing block that points Leo/GPT to the Worker handoff prompt and states that it must be pasted into a separate Worker session.

## Files Updated

Local Advisor cockpit:

- `./AGENTS.md`
- `./README.md`

Foundation-docs Advisor files:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md`
- `../foundation-docs/advisor/jobs/20260709_next_action_routing_rule_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_next_action_routing_rule_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_next_action_routing_rule_patch/index.md`

## Rule Added

Every Advisor final response must include:

```text
## NEXT ACTION ROUTING

- Target actor:
  Advisor | Worker | Sentinel | Service Reviewer | Leo/GPT | STOP

- Target session:
  Same Advisor session | Separate Worker session | Separate Sentinel session | Separate Service Reviewer session | GPT strategy session

- Prompt/file to use:
  <exact advisor file path>

- Leo action:
  <what Leo should do now>

- Return result to:
  Advisor | Leo/GPT

- Do not send to:
  <wrong sessions>

- Status:
  READY_TO_USE | WAIT_FOR_WORKER_RESULT | WAIT_FOR_SENTINEL_RESULT | BLOCKED | NEEDS_LEO_DECISION
```

## Routing Rules Added

1. If the next actor is Worker, state clearly: paste this into a separate Worker session.
2. If the next actor is Sentinel, state clearly: do not use until Worker result has returned to Advisor.
3. If the next actor is Service Reviewer, state clearly when it should be used.
4. If no role session should be started, state `STOP` / `NEEDS_LEO_DECISION`.
5. If multiple actors exist, list them separately.
6. Always include the exact file path of the handoff prompt.
7. Always state where the result must be returned.

## V3-11C2 Loop-State Update

`../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/10_LOOP_STATE.md` now includes:

- Target actor: `Worker`
- Target session: `Separate Worker session`
- Prompt/file to use: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_HANDOFF_PROMPT.md`
- Return result to: `Advisor`
- Status: `READY_TO_USE`

## Scope Check

- No runtime code was modified.
- No schema or migrations were modified.
- No DB write was performed.
- No prod/live/main/secret access was performed.
- No Worker, Sentinel, or Service Reviewer role was executed.

## Recommended Next Step

Use the V3-11C2 Worker handoff prompt in a separate Worker session.
