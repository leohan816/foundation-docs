# Designer Handoff

TARGET_ACTOR: `Agent Office Designer`

TARGET_SESSION: `agent-office-designer`

MISSION_ID: `AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`

DESIGN_PASS: `PRODUCT_SYSTEM_AND_CONTRACT_DESIGN`

## Frozen target

- repository: `/home/leo/Project/agent-office`
- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`
- branch: `feature/team-onboarding-execution-profile-policy-001`
- base: `50124a1ea720e162e906c04c6f6fb2591c4974b8`

## Required reads

Read directly, in this order:

1. repository `AGENTS.md` and `CLAUDE.md`;
2. `docs/agent/TEAM_OPERATING_MODEL.md`;
3. `docs/agent/roles/README.md` and all five role documents;
4. `docs/agent/RUN_PROTOCOL.md` and
   `docs/agent/RESULT_REPORTING_PROTOCOL.md`;
5. `src/application/organization/types.ts`;
6. `src/application/organization/registry.ts`;
7. `src/application/organization/evidence.ts` and `projector.ts`;
8. `tests/contract/organization-registry.test.ts`;
9. this handoff and `00_INTAKE.md` / `01_ADVISOR_BRIEF.md` in the governance
   worktree.

Historical evidence and AS1 are read-only context and not design authority for
this mission.

## Design objective

Produce a directly implementable canonical design delta for one-instruction
Team onboarding and per-dispatch execution profile selection. Reuse the current
role authority and Organization Registry. Do not redesign accepted identity or
Team foundations.

The design must settle:

1. exact existing components reused and smallest source/doc delta;
2. actor-specific execution-capability representation inside the existing
   registry, including model, mode, effort, and skill values without global
   assumptions;
3. immutable `PROTOCOL_READY` evidence schema joined by `roleInstanceId`;
4. deterministic `TEAM_READY` aggregation, required-actor rules, optional roles,
   conflicts, stale commit/version behavior, and fail-closed diagnostics;
5. responsible-Advisor entrypoint and Team actor resolution;
6. role-specific onboarding/reload handoff contract;
7. understanding validation and bounded read-only rehearsal;
8. targeted re-onboarding after misunderstanding or staleness;
9. new-Actor nomination, reviewed registration, non-dispatchable pending state,
   onboarding, and activation flow;
10. profile selection record and decision algorithm using lowest sufficient
    capability, operational retry, capability escalation, reviewer sufficiency,
    and self-override rejection;
11. central project entry-pointer contract with no cross-project edits;
12. exact implementation WorkUnits, dependencies, allowed/forbidden paths,
    tests, rollback, and completion gates;
13. all twelve Founder validation scenarios with expected outcomes;
14. explicit confirmation that AS1, Slack, live tmux delivery, Foundation,
    SIASIU, Cosmile, and VibeNews remain unchanged.

## Design requirements

- `PROTOCOL_READY` must contain exactly the Founder-required fields and a
  versioned schema discriminator.
- `FILES_READ` must be exact normalized repository paths, not a boolean.
- current canonical protocol commit/version must be explicit input, not inferred
  from wall-clock age.
- a stale or conflicting Actor is not ready and receives only a targeted reload
  handoff.
- `TEAM_READY` requires the responsible Advisor and every currently registered,
  Team-assigned, dispatch-relevant Actor to be ready; it must not require a role
  category that has no registered Actor.
- a Team with zero Control is valid.
- a Reviewer must demonstrate independent review authority and a sufficiently
  capable declared profile.
- profile records must include all Founder fields, including complexity, risk,
  failure cost, reversibility, context, why-not-lower/higher, and escalation.
- current runtime profile observation is evidence of the current selection, not
  proof of every capability the Actor supports.
- no terminal prose parsing, arbitrary command path, secret, DB, remote access,
  or transport activation may appear.

## Allowed design paths

Create or modify only:

- `docs/architecture/AGENT_OFFICE_TEAM_ONBOARDING_EXECUTION_PROFILE_DESIGN.md`
- `docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md`
- `docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md`
- `artifacts/team-onboarding-execution-profile-policy/DESIGNER_RESULT.md`
- `artifacts/team-onboarding-execution-profile-policy/DESIGNER_RESULT_POINTER.txt`

Do not edit runtime source, tests, existing canonical role docs, registry,
package files, AS1 paths, or another repository.

## Evidence and Git contract

- inspect actual current files before designing;
- report confirmed facts, assumptions, and remaining unknowns separately;
- run only document/path/diff checks appropriate to this design pass;
- stage explicit allowed paths;
- commit the canonical design package, then the result, then the pointer as
  separate commits;
- non-force push only
  `feature/team-onboarding-execution-profile-policy-001`;
- return exact commits, hashes, changed files, failures, limitations, clean
  status, and upstream equality to `agent-office-advisor`;
- do not self-review, dispatch another actor, accept risk, or start
  implementation.

RESULT_CONTRACT: `DESIGN_READY_FOR_INDEPENDENT_REVIEW | DESIGN_BLOCKED`

RETURN_RESULT_TO: `agent-office-advisor`

STOP
