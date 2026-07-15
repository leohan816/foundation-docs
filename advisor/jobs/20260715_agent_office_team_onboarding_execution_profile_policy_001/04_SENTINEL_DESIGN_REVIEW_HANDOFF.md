# Independent Sentinel Design Review Handoff

MISSION_ID: `AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`

REVIEW_PASS: `DESIGN_REVIEW`

TARGET_ACTOR: `Agent Office Reviewer`

TARGET_SESSION: `agent-office-reviewer`

## Execution profile record

- `TASK_COMPLEXITY`: `HIGH`
- `RISK_LEVEL`: `LEVEL_3_AUTHORITY_ADJACENT`
- `FAILURE_COST`: `HIGH__FALSE_READINESS_OR_INVALID_ACTOR_DISPATCH`
- `REVERSIBILITY`: `REVERSIBLE_DESIGN_ONLY_CANDIDATE`
- `CONTEXT_REQUIREMENT`: `LARGE__FIVE_FILE_DELTA_PLUS_LOAD_BEARING_REGISTRY`
- `SELECTED_MODEL`: `gpt-5.6-sol`
- `SELECTED_MODE`: `INDEPENDENT_SENTINEL_DESIGN_REVIEW`
- `SELECTED_EFFORT`: `max`
- `REQUIRED_SKILL`: `/fable-sentinel`
- `WHY_NOT_LOWER`: xhigh is likely insufficient for independent cross-contract
  verification across immutable identity, readiness acceptance, Team
  aggregation, lifecycle, per-Actor capability selection, and Reviewer
  independence in a 1,620-line canonical package.
- `WHY_NOT_HIGHER`: max is sufficient for a bounded documentation/contract
  review; no verified higher capability is required.
- `ESCALATION_TRIGGER`: unresolved material identity/authority conflict,
  second-registry requirement, or risk requiring Leo/GPT acceptance.

## Frozen review coordinates

- repository: `/home/leo/Project/agent-office`
- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_TEAM_ONBOARDING_AND_EXECUTION_PROFILE_POLICY_001`
- base: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- candidate: `24e5bc1b52f617648742162376c07e747a2f31e0`
- package commit: `d9a95cf101fca93f3c721e7d751bcd5d7a2c661a`
- Designer result: `53dc551def13d203f63224fb17f2e93e9a1c9d1c`
- Designer result SHA-256:
  `01628532d629e7ac543357b6849a0720af232f4b0acd63a8df7b951d9a4c8504`
- Designer pointer SHA-256:
  `7cda6c40d6a485ba339e0c60e2bd4224724cb11d467d8ac24f7cc9da9e5c28ae`

## Required reads

1. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and its
   `contract-review.md`, `provenance-review.md`, and
   `review-classification.md` references;
2. repository `AGENTS.md`, `CLAUDE.md`, `docs/agent/TEAM_OPERATING_MODEL.md`,
   all five role documents, `RUN_PROTOCOL.md`, and
   `RESULT_REPORTING_PROTOCOL.md`;
3. actual base-to-candidate diff before reading Designer summaries;
4. all five candidate files;
5. load-bearing existing organization `types.ts`, `registry.ts`, `evidence.ts`,
   `projector.ts`, and `organization-registry.test.ts`;
6. committed Advisor intake, scenario addendum, and design validation.

## Review questions

Return findings first, with exact file/line references. Independently determine:

1. whether this is one additive extension of the existing registry rather than
   a second Actor/capability/readiness truth;
2. whether all existing immutable identities/evidence joins remain preservable;
3. whether readiness acceptance, invalidation, staleness, targeted reload,
   pending-to-active transition, and Team aggregation are exact and fail closed;
4. whether optional roles, multiple Workers, responsible Advisor inclusion, and
   required-Actor rules are deterministic without role synthesis;
5. whether per-Actor capability declarations, lowest-sufficient selection,
   operational retry, demonstrated capability escalation, self-override
   rejection, and Reviewer sufficiency are computable without name inference;
6. whether new-Actor nomination/registration/onboarding/activation remains
   reviewed and non-dispatchable until complete;
7. whether the one-instruction entrypoint and project pointer contract are
   implementable without transport activation or cross-project edits;
8. whether FVS-01 through FVS-12 have correct, non-gameable expected outcomes;
9. whether the nineteen-path implementation plan is sufficient, minimal, and
   internally consistent with forbidden paths and proportional tests; and
10. whether AS1, Slack, tmux delivery, secrets, external projects, and live
    rollout remain frozen.

Inspect actual product files before trusting the Designer result. Do not perform
implementation, patch the candidate, change the product branch, dispatch an
Actor, accept risk, or grant final approval.

## Proportionate checks

- exact commit/ancestry/path/hash/clean/upstream proofs;
- full relevant diff and line-addressed contract comparison;
- deterministic schema/algorithm walkthroughs and adversarial examples;
- Markdown/path/fence/secret-shape/diff checks as useful;
- no product tests, Living Office, AS1, broad E2E, server, or runtime execution
  unless a concrete candidate claim requires one.

## Durable output

Write only:

- `runs/agent-office/20260715_agent_office_team_onboarding_execution_profile_policy_001/SENTINEL_DESIGN_REVIEW_RESULT.md`
- `advisor/jobs/20260715_agent_office_team_onboarding_execution_profile_policy_001/05_SENTINEL_DESIGN_REVIEW_RESULT_POINTER.md`

in the governance worktree/branch. Commit result and pointer separately,
non-force push, and verify clean/upstream equality.

VERDICT: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`

`PASS_WITH_RISK` and `FAIL` stop and return through Advisor. `NEEDS_PATCH`
returns exact bounded findings to the same Designer. A `PASS` must contain no
unresolved design defect or risk acceptance.

RETURN_TO: `agent-office-advisor`

STOP
