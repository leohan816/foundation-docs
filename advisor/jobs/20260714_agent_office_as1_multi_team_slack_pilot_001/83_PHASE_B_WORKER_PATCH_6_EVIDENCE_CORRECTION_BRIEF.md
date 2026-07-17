# AS1 Phase B Worker Patch 6 Evidence Correction Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_6_EVIDENCE_ONLY`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Exact authority

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact clean/upstream-equal evidence baseline:
  `2507cc7f15e677c781c026881ca721a2d4d3e5ae`
- Frozen Patch 5 source candidate (must remain unchanged):
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- Exact independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/82_PHASE_B_PATCH_5_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Review governance commit:
  `59f488c3e24d4673db87e863aa3efc392fed43a0`
- Review result / pointer SHA-256:
  `89bfe7d9297d3c6bb31cb51f96c9cef8726155d6a89bedabef912cc80245fffd` /
  `cfb4b12ae4343ccd66c88086bb8c1d9b50bac0e3e7510602c5f557fac60d0d4d`
- Verdict: `NEEDS_PATCH`

Read result 82 directly. This is a clerical evidence-integrity correction only.
The implementation and all bounded gates are already independently accepted.

## Execution profile

- `TASK_COMPLEXITY`: low
- `RISK_LEVEL`: evidence integrity for a security-sensitive release gate
- `FAILURE_COST`: medium; a false lineage claim blocks activation
- `REVERSIBILITY`: isolated evidence-only commits
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: current authorized Worker profile
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: the same Worker must preserve exact commit/hash choreography
  and accurately report the correction on the active reviewed train
- `WHY_NOT_HIGHER`: no reasoning or implementation expansion is authorized
- `ESCALATION_TRIGGER`: stop only if the stated baseline, real Patch 4 object, or
  exact two-file discrepancy cannot be verified

Do not silently change profile or delegate.

## Exact path lock

Only these existing files may change:

1. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_5_WORKER_RESULT.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_5_WORKER_RESULT_POINTER.txt`

Only these new files may be added:

3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_6_WORKER_RESULT.md`
4. `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_6_WORKER_RESULT_POINTER.txt`

No source, test, setup doc, config, descriptor, package, Registry, schema,
database, prior Patch 1-4 evidence, governance file, or external project may
change.

## Exact correction

1. In both Patch 5 evidence artifacts replace only the invalid object:
   `0ab4782a79333113511513fb11bc9ef62c197ed08da`
   with the verified Patch 4 source:
   `0ab4782a79133111513fb11bc9ef62c197ed08da`.
2. Verify the corrected object resolves and is an ancestor of the Patch 5
   baseline/candidate lineage.
3. Recompute the corrected Patch 5 result SHA-256 and update only its hash field
   in the Patch 5 pointer. Verify the pointer's remaining immutable fields.
4. Freeze the two-file correction in one evidence-correction commit.
5. Add a concise Patch 6 Worker result and pointer in separate evidence-only
   commits. Record exact old/new values, hashes, commits, path scope, commands,
   failures, rollback, and clean/upstream-equal status.

## Proportionate validation

- `git cat-file -e` for the real object and explicit non-resolution of the
  invalid object;
- exact occurrence checks before and after;
- SHA-256 linkage from corrected Patch 5 result to its pointer;
- `git diff --check`;
- exact four-path scope and commit-parent checks;
- default-disabled descriptor byte identity;
- clean/upstream-equal branch after non-force push.

Do not rerun source tests, typecheck, build, lint, broad scans, Living Office,
or unrelated suites. Do not access secrets, initialize owner state, connect
Slack, observe or mutate a live destination, signal processes, or activate the
descriptor.

## Result and stop

Commit and non-force push the authorized branch. Return the Patch 6 pointer to
`agent-office-advisor` and STOP. Do not self-review or start a live pilot.
