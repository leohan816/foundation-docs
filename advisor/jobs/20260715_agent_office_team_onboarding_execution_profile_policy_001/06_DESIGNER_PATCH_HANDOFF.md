# 06 - Designer Patch Handoff

MISSION_ID: `AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`

PATCH_PASS: `DESIGN_PATCH_01`

RESPONSIBLE_ADVISOR: `agent-office-advisor`

ASSIGNED_ACTOR: `agent-office-designer`

RETURN_TO: `agent-office-advisor`

## Frozen coordinates

- product repository: `/home/leo/Project/agent-office`
- isolated worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`
- branch: `feature/team-onboarding-execution-profile-policy-001`
- exact mission baseline: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- reviewed candidate: `24e5bc1b52f617648742162376c07e747a2f31e0`
- independent review result commit:
  `6f7935015c0f344601b24174e212e95b0694adb3`
- independent review result:
  `runs/agent-office/20260715_agent_office_team_onboarding_execution_profile_policy_001/SENTINEL_DESIGN_REVIEW_RESULT.md`

The reviewed candidate is the only patch base. Do not restart design, rewrite
accepted sections, or implement runtime code.

## Dispatch profile

```text
TASK_COMPLEXITY: HIGH_BOUNDED_CROSS_CONTRACT_PATCH
RISK_LEVEL: LEVEL_2_GOVERNANCE_AND_REVIEW_INDEPENDENCE
FAILURE_COST: UNSAFE_OR_NON_IMPLEMENTABLE_WORKER_HANDOFF
REVERSIBILITY: FULLY_REVERSIBLE_DOCUMENT_ONLY_PATCH
CONTEXT_REQUIREMENT: THREE_DESIGN_DOCUMENTS_PLUS_FIVE_FROZEN_FINDINGS
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: product design / contract design
SELECTED_EFFORT: max
REQUIRED_SKILL: NONE; repository Designer role and exact handoff apply
WHY_NOT_LOWER: the first candidate passed broad coherence checks but five adversarial cross-contract defects survived; this patch must close lifecycle, authority, and immutable-evidence semantics together
WHY_NOT_HIGHER: no profile above max is required for a bounded documentation correction
ESCALATION_TRIGGER: only a material identity/authority conflict, second Registry requirement, baseline change, AS1/external-project change, or Leo-owned risk decision
```

## Exact patch scope

Correct exactly P1-P5 from the independent result.

### P1 - closed implementation paths

- Add `tests/ui/actor-detail-drawer.test.tsx` and
  `tests/ui/actor-summary.test.tsx` to WU-02 and the closed implementation
  allowlist.
- Limit their proposed implementation changes to explicit fixture values for
  all new required `OrganizationRegistryRow` fields and preservation
  assertions.
- Update the exact path count and affected gates. Required fields remain
  required; no optionality, defaults, or inference may be introduced.

### P2 - total diagnostics and onboarding planning

- Define exact `ProtocolReadinessDiagnostic` and planner input/output schemas.
- Define a closed diagnostic/detail-code vocabulary and a total deterministic
  mapping for every blocking state.
- Distinguish remediable onboarding states from lifecycle/authority states for
  which no handoff is lawful.
- A `SUSPENDED` Actor remains required/non-ready but receives no onboarding
  handoff until a separately reviewed reactivation.
- Missing/conflicting Advisor, invalid route, or unresolved authority produces
  an explicit no-handoff blocked result and never attributes a handoff to an
  invalid Advisor.
- Align contract section 8, FVS-12, WU-03, and targeted test requirements.

### P3 - immutable retry and escalation chain

- Define exact schemas and total function contracts for dispatch attempts,
  outcome validation/deduplication, one permitted operational retry, and
  capability escalation.
- Every attempt has immutable identity and attempt number and binds the exact
  selection/profile and triggering accepted outcome evidence.
- Repeated planning, replay, duplicate/conflicting outcomes, and a second retry
  fail closed.
- Capability escalation binds the exact accepted
  `CAPABILITY_INSUFFICIENT` outcome and the original immutable Actor catalog
  snapshot. A profile added after the original selection is ineligible.
- Add exact adversarial tests, including post-selection catalog mutation.

### P4 - non-bypassable Reviewer independence

- Review dispatch is an authoritative closed dispatch kind, not a caller
  boolean waiver.
- Every Reviewer target must satisfy the independent-review contract.
- Define the authoritative source and completeness rules for reviewed Actor
  IDs; reject false, missing, empty, partial, duplicate, or self-overlapping
  review scopes.
- Align FVS-11 and WU-04 tests with these bypass cases.

### P5 - `NONE` semantics

- Treat `['NONE']` as the serialized representation of an empty skill set.
- Normalize it to the empty set before subset comparison.
- A real-skill profile may satisfy a no-skill requirement; a `NONE` profile
  cannot satisfy a real-skill requirement.
- Mixed `NONE` plus real-skill tokens remain invalid.
- Add positive and negative test cases and use the same semantics consistently
  in architecture, contract, and WorkUnit plan.

## Allowed product paths

Modify only:

1. `docs/architecture/AGENT_OFFICE_TEAM_ONBOARDING_EXECUTION_PROFILE_DESIGN.md`
2. `docs/contracts/AGENT_OFFICE_PROTOCOL_READINESS_CONTRACT.md`
3. `docs/operations/AGENT_OFFICE_TEAM_ONBOARDING_WORKUNIT_PLAN.md`

Create only:

4. `artifacts/team-onboarding-execution-profile-policy/DESIGNER_PATCH_01_RESULT.md`
5. `artifacts/team-onboarding-execution-profile-policy/DESIGNER_PATCH_01_RESULT_POINTER.txt`

All other paths are forbidden. In particular, do not modify runtime source,
tests, package/configuration, AS1, Slack, tmux delivery, secrets, external
projects, the baseline, or historical evidence.

## Required result and Git sequence

1. Read the exact independent result before editing.
2. Patch only the five findings and affected cross-references.
3. Run `git diff --check`, exact path-scope checks, and static consistency
   checks proportionate to P1-P5. Do not run product or broad test suites.
4. Commit and non-force push the three-document patch.
5. Write `DESIGNER_PATCH_01_RESULT.md` with a P1-P5 disposition, exact failed
   and successful commands, hashes, changed paths, and no-scope-expansion
   attestations; commit and push it separately.
6. Write the pointer with the patch and result commit identities; commit and
   push it separately.
7. Leave the worktree clean and upstream-equal.
8. Return the exact frozen candidate pointer to Advisor and stop. Do not
   dispatch the Reviewer or Worker.

## Completion gate

This patch is complete only when P1-P5 are explicitly closed without weakening
required fields, fail-closed behavior, Reviewer independence, immutable
evidence lineage, the one-Registry rule, or frozen mission boundaries. The
patched candidate remains unauthorized for implementation until the same
Reviewer returns a clean delta verdict.
