# 08 - Sentinel Design Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`

REVIEW_PASS: `DESIGN_PATCH_01_DELTA_REVIEW`

ASSIGNED_ACTOR: `Agent Office Reviewer / independent Sentinel`

SESSION: `agent-office-reviewer`

REQUIRED_SKILL: `/fable-sentinel`

RETURN_TO: `agent-office-advisor`

## Frozen coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`
- product branch: `feature/team-onboarding-execution-profile-policy-001`
- exact delta base: `24e5bc1b52f617648742162376c07e747a2f31e0`
- exact delta candidate: `7fbaec6f593aff9422075e3c5f033bfbc0d7abaa`
- original review result commit:
  `6f7935015c0f344601b24174e212e95b0694adb3`
- Designer patch commit: `f7ae36100f13c715ef943a9a5e882c76a53cf7a8`
- Designer result commit: `4babefaf6ddf598e6b496304c9dd8a0f1b819475`
- Advisor patch validation:
  `advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001/07_ADVISOR_DESIGN_PATCH_VALIDATION.md`

## Review profile

```text
TASK_COMPLEXITY: HIGH_BOUNDED_ADVERSARIAL_CONTRACT_DELTA
RISK_LEVEL: LEVEL_2_GOVERNANCE_REVIEW_INDEPENDENCE_AND_EVIDENCE_LINEAGE
FAILURE_COST: UNSAFE_IMPLEMENTATION_HANDOFF
REVERSIBILITY: FULLY_REVERSIBLE_DOCUMENT_ONLY_CANDIDATE
CONTEXT_REQUIREMENT: ORIGINAL_FINDINGS_PLUS_EXACT_P1_P5_DELTA_AND_LOAD_BEARING_TYPES
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: independent Sentinel design delta review
SELECTED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
WHY_NOT_LOWER: five adversarial defects survived the initial pass and the correction adds exact lifecycle, retry-lineage, catalog, and independent-review contracts that require the same high-capability Reviewer
WHY_NOT_HIGHER: no verified profile above max is required for this bounded delta review
ESCALATION_TRIGGER: only a new material identity/authority conflict, second Registry, baseline change, frozen-surface change, or Leo-owned risk
```

## Review order and scope

1. Verify live Reviewer independence, model/effort, required skill, exact Git
   coordinates, clean states, and candidate ancestry.
2. Inspect the actual `24e5bc1..7fbaec6` delta before reading the Designer patch
   result or Advisor summary.
3. Review P1-P5 exactly:
   - P1: the two typed UI consumers are in WU-02 and the exact 21-path
     allowlist without optional/default/inference weakening;
   - P2: diagnostic and planner schemas are exact and total, remediable versus
     no-handoff states are deterministic, and invalid Advisor authority never
     authors a handoff;
   - P3: attempts, outcomes, replay/dedupe, one-retry cardinality, escalation
     trigger, and original-catalog binding form a complete immutable chain;
   - P4: review dispatch cannot be caller-disabled or emptied and authoritative
     reviewed scope is complete, independent, and source-bound;
   - P5: `NONE` has one normalized empty-set meaning with consistent positive,
     negative, and mixed-token tests.
4. Verify the patch did not regress the accepted one-Registry,
   immutable-`roleInstanceId`, optional-role, new-Actor lifecycle, fail-closed,
   no-transport, no-AS1, and external-project boundaries.
5. Reproduce proportionate static/path/hash/contract checks only. Do not run
   product, Living Office, AS1, Slack, browser, server, or broad test suites.
6. Read the Designer result only after the direct delta inspection, then verify
   its factual claims against direct evidence.

## Independence and write scope

Do not patch the product candidate or change its branch. Do not implement,
dispatch another Actor, accept risk, or grant final approval.

You may create only these two governance artifacts in the governance worktree:

1. `runs/agent-office/20260715_agent_office_team_onboarding_execution_profile_policy_001/SENTINEL_DESIGN_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001/09_SENTINEL_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Commit and non-force push the result and pointer separately. Leave product and
governance worktrees clean and upstream-equal.

## Verdict contract

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Any unresolved defect is not `PASS`. `PASS_WITH_RISK` requires Leo/GPT risk
acceptance and must stop. A clean `PASS` authorizes only Advisor design audit
and exact Worker handoff preparation, not implementation by the Reviewer.
