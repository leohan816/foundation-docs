# Agent Office Worker Rework Result - Canonical-Manifest-Independent Test Fixture

Status: `TEST_FIXTURE_DECOUPLED_TESTED_AND_PUSHED__RETURN_TO_ADVISOR`

This is factual Worker-Rework evidence for only the scope authorized by
`22_WORKER_MANIFEST_FIXTURE_REWORK_HANDOFF_PROMPT.md`. It is not an independent
review, a canonical lifecycle change, runtime authorization, Advisor acceptance,
or final mission approval.

## 1. Identity and Git state

- Mission ID: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION`
- Governed mission:
  `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Work scope: `OBSERVATION_COORDINATOR_MANIFEST_FIXTURE_REWORK`
- Actor: `Agent Office Worker-Rework`
- Target project: `Agent Office canonical-manifest-independent test fixture`
- Target repository: `/home/leo/Project/agent-office`
- Target branch/upstream:
  `shadow/agent-office-m01` / `origin/shadow/agent-office-m01`
- Starting target commit:
  `73157613345ad3046e45b99b145f5400c8dc5428`
- Resulting target commit:
  `2f663304a88c432f19fe56055641b66e57f18ef2`
- Commit subject: `test(observation): isolate activity fixture state`
- Target push: non-force, successful
- Target HEAD/upstream after push: exact equality, left/right `0/0`
- Target worktree after push: clean
- Existing session: same `agent-office` Worker session
- Model/effort requested: `Codex 5.6 SOL Ultra`
- Required skill: none
- New agent, sub-agent, delegation, or temporary session: none
- Result generated at UTC: `2026-07-11T16:05:27Z`
- Result file:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/WORKER_MANIFEST_FIXTURE_REWORK_RESULT.md`
- Pointer file:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/23_WORKER_MANIFEST_FIXTURE_REWORK_RESULT_POINTER.md`

The exact committed handoff, repository instructions, run/result protocols,
current test fixture, current canonical manifest, and repository state were read
directly. No execution was based on terminal prose or chat memory.

## 2. Required reproduction

The current canonical manifest was observed with the truthful lifecycle state:

```text
AO-WU-21=COMPLETED
AO-WU-15=READY
```

Before the patch, the focused sequential command was run against that manifest:

```text
LC_ALL=C npx vitest run --maxWorkers=1 \
  tests/integration/observation-coordinator.test.ts
```

Result: one file failed, 7 tests failed and 14 passed. All seven
`projects evidence-correct ... activity freshness` cases failed at the first
synthetic `AO-WU-15 WAITING_DEPENDENCY -> READY` event because the projection
had inherited the live manifest's `READY` state.

## 3. Exact test-only correction

The helper `activeAdvisorProjection()` now derives a projection-only synthetic
manifest in which AO-WU-15 explicitly starts with:

```text
status=WAITING_DEPENDENCY
initialState=WAITING_DEPENDENCY
requiredObservableName=WAITING_DEPENDENCY
```

The helper copies the remaining AO-WU-15 identity, dependency, and display
fields, and leaves every other WorkUnit unchanged. Its existing structured
transition and activity event sequence remains unchanged:

```text
WAITING_DEPENDENCY -> READY -> DISPATCHED -> RUNNING -> WORKING
```

This fixture is used only after the coordinator has started from and verified
the real external canonical manifest. Manifest observation, Git verification,
runtime coordinator behavior, and all seven freshness variants remain intact.

## 4. Exact changed path

Commit `2f663304a88c432f19fe56055641b66e57f18ef2` changes exactly:

1. `tests/integration/observation-coordinator.test.ts`

Commit size: 17 insertions and 1 deletion. No source, runtime, configuration,
dependency, lockfile, UI, canonical manifest, authority, transport, credential,
or unrelated path changed.

## 5. Verification evidence

All displayed command output was constrained to ASCII.

### Focused gate

Command:

```text
LC_ALL=C npx vitest run --maxWorkers=1 \
  tests/integration/observation-coordinator.test.ts
```

Result: 1 file and 21/21 tests passed, including all seven activity-freshness
cases.

### Full repository gate

Command: `LC_ALL=C npm run check`

Result:

- ESLint: pass;
- strict TypeScript: pass;
- full sequential Vitest: 56 files and 296/296 tests pass;
- core TypeScript build: pass; and
- production dashboard build: pass.

### Diff and publication gate

- `git diff --check`: pass.
- Staged diff check: pass.
- Staged path before commit: exactly the authorized integration test.
- Non-force push: pass.
- Resulting target HEAD equals upstream, left/right `0/0`.
- Resulting target worktree: clean.

## 6. Preserved boundaries

- Canonical M01 manifest: unchanged and not reverted.
- Runtime/product behavior: unchanged.
- Freshness test matrix: all seven cases preserved.
- Server/private run: not started.
- Actual tmux input or mutation: none.
- Authority, credential, lease, capability, secret, key, or token: none created
  or modified.
- AO-WU-21 rehearsal or another mission: not resumed.
- Database, migration, public/remote/private-network/prod/live access: none.
- Protected branch/main merge or push, force push, or destructive Git: none.
- Self-review verdict, risk acceptance, or final approval: none.

## 7. Preserved foundation-docs unrelated state

The following pre-existing foundation-docs paths remain untouched and excluded
from staging:

- modified `advisor/_system/AGENTS.md`;
- modified `advisor/_system/README.md`;
- modified `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
- untracked `advisor/jobs/20260709_reviewer_selection_protocol/`; and
- untracked `advisor/jobs/20260709_role_result_storage_protocol/`.

Only this result and its exact sequential pointer are published by this run.

## 8. Routing

Advisor must inspect this result and determine any subsequent review or mission
routing. This Worker does not issue a review verdict or resume other work.

```text
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
STOP_AFTER_POINTER: true
```
