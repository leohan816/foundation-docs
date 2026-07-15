# Minimal Team Onboarding Manual - Designer Patch Handoff

MISSION_ID: `AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`

ASSIGNED_ACTOR: `agent-office-designer`

RETURN_TO: `agent-office-advisor`

## Dispatch profile

```text
TASK_COMPLEXITY: LOW_DOCUMENTATION_CORRECTION
RISK_LEVEL: LEVEL_1_AUTHORITY_WORDING
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: bounded documentation patch
SELECTED_EFFORT: xhigh
REQUIRED_SKILL: NONE; exact handoff and Designer role apply
WHY_NOT_LOWER: the one sentence distinguishes Leo/GPT authority from subordinate handoffs
WHY_NOT_HIGHER: max is unnecessary for one closed finding in one Markdown file
ESCALATION_TRIGGER: any need to change a second product path or alter the authority chain
```

## Frozen coordinates

- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`
- branch: `feature/minimal-team-onboarding-manual-001`
- patch base: `7482d166021014153952fe857aa2db02cdffc20b`
- independent verdict: `NEEDS_PATCH`
- preserved verdict commit: `19078dcd6d5189c3860eb1933d9b314e9e389a08`
- exact finding pointer:
  `advisor/jobs/20260715_agent_office_minimal_team_onboarding_manual_001/03_SENTINEL_DOCUMENTATION_REVIEW_RESULT_POINTER.md`

## Authorized correction

Modify exactly `docs/agent/roles/README.md` and no other path.

Replace the common invariant that currently says every role starts only from
an exact committed handoff. State the role-specific authority split clearly:

- the responsible Advisor starts only from the current Leo/GPT mission or
  decision;
- each subordinate starts only from an exact committed Advisor handoff;
- unclear authority still fails closed.

Do not change any other reviewed content, role mapping, optional-role rule,
acknowledgement, profile policy, Registry, runtime, AS1, or external project.

## Validation and result

Run only `git diff --check`, exact one-path scope validation, and a focused
term check proving both authority inputs are explicit. Commit the one-file
patch once, non-force push, leave the product worktree clean and
upstream-equal, return the exact commit and checks to `agent-office-advisor`,
and STOP. Do not self-review or issue a verdict.
