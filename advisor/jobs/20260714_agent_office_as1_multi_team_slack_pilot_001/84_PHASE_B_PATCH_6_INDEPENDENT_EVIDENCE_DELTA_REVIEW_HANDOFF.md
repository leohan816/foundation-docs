# AS1 Phase B Patch 6 Independent Evidence Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: independent Agent Office Reviewer (`agent-office-reviewer`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

## Exact review subject

- Product worktree (strictly read-only):
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Patch 6 evidence baseline: `2507cc7f15e677c781c026881ca721a2d4d3e5ae`
- Initial Patch 6 evidence head: `30aee203f54954c717025c30506fa201ee6f1ad0`
- Final candidate after Advisor-validation correction:
  `0c013f0c88dea2b85941f61dec4088d76aa8fca5`
- Frozen implementation source candidate:
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- Prior verdict to close: review 82, `NEEDS_PATCH`, F06-E1 only
- Review 82 governance commit:
  `59f488c3e24d4673db87e863aa3efc392fed43a0`
- Worker briefs: 83/83A plus Advisor correction 83B
- Governance HEAD: `68fe43acd32029e44e6d1e9bcc913c1ce56db548`

## Review scope

Inspect source-first only as needed to establish immutable lineage, then inspect
the exact evidence delta `2507cc7..0c013f0`:

1. corrected Patch 5 result;
2. corrected Patch 5 pointer;
3. Patch 6 result;
4. Patch 6 pointer.

Verify:

- the invalid object is absent from exactly the two corrected Patch 5 artifacts;
- the verified Patch 4 object resolves and is the exact review-79 source;
- corrected Patch 5 result SHA-256 matches its pointer;
- Patch 6 audit artifacts quote the invalid before-value truthfully rather than
  claiming it disappeared from all artifacts;
- final Patch 6 result SHA-256 matches its pointer and `RESULT_COMMIT` is
  `eb1009237768fd13c6a2824ec5f5cd055a971b54`;
- exact commit parents, four-path scope, clean/upstream-equal state, descriptor
  byte identity, and frozen source candidate;
- no prior Patch 1-4 evidence, source, test, setup, config, descriptor,
  governance, or external project changed.

Review only F06-E1 and the Advisor-validation wording correction. Preserve
review 82's accepted F01-A/F01-B/F02-F05 and gate results absent a concrete
regression. Do not rerun Vitest, typecheck, build, lint, broad scans, Living
Office, or unrelated suites.

## Reviewer profile

- `TASK_COMPLEXITY`: low
- `RISK_LEVEL`: evidence integrity
- `SELECTED_MODEL`: GPT-5.6 SOL
- `SELECTED_EFFORT`: current independent Reviewer profile
- `REQUIRED_SKILL`: `/fable-sentinel`
- `WHY_NOT_LOWER`: independent lineage and hash verification must remain exact
- `WHY_NOT_HIGHER`: no code or authority design remains open
- `ESCALATION_TRIGGER`: a new material evidence, identity, or authority conflict

The Reviewer must not edit, stage, commit, or push the product branch.

## Authorized output

Write only these uncommitted governance files:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/85_PHASE_B_PATCH_6_INDEPENDENT_EVIDENCE_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/85_PHASE_B_PATCH_6_INDEPENDENT_EVIDENCE_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
Do not access secrets, connect Slack, initialize owner state, observe/mutate a
live delivery destination, signal a process, activate the descriptor, patch the
candidate, delegate, or start another mission. Return to
`agent-office-advisor` and STOP.
