# 00 Intake - Next Action Routing Rule Patch

## Job

`20260709_next_action_routing_rule_patch`

## Leo/GPT Instruction Summary

Add a mandatory `NEXT ACTION ROUTING` block to all future Advisor final reports so Leo/GPT can immediately identify the next actor, target session, exact handoff file, Leo action, return path, wrong sessions, and status.

## Goal

- Update Advisor operating rules with the required final-response routing format.
- Mirror the rule under `foundation-docs/advisor/_system/`.
- Update current V3-11C2 loop state with a concrete routing block.
- Publish the updated Advisor rules and artifacts to foundation-docs.

## Non-Goals

- Do not implement V3-11C2.
- Do not act as Worker, Sentinel, or Service Reviewer.
- Do not modify runtime repositories.
- Do not start any role session.

## Required Routing Format

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

## Forbidden Actions

- Runtime repo edits.
- Implementation.
- Worker execution.
- Sentinel execution.
- Service Reviewer execution.
- Schema or migration edits.
- DB writes.
- prod/live/main/secret access.

## Initial Assumptions

- Current V3-11C2 next actor is Worker.
- Existing V3-11C2 Worker handoff prompt already has a valid target header and does not require content changes for this patch.
- Foundation-docs Advisor changes may be committed and pushed if staged files remain under `foundation-docs/advisor/` and runtime repo changes are zero.
