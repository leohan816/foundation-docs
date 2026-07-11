# Agent Office Worker Rework Result - Exact Advisor Evidence Immutability

Status: `PATH_EXACT_HISTORY_FALSE_POSITIVE_PATCHED_TESTED_AND_PUSHED__RETURN_TO_ADVISOR`

This is factual Worker-Rework evidence for the exact scope authorized by
`16_WORKER_REWORK_HANDOFF_PROMPT.md` and
`16_AO_WU_21_REHEARSAL_REWORK_BRIEF.md`. It is not an independent review,
rehearsal resumption, risk acceptance, Advisor acceptance, or final approval.

## 1. Identity and Git state

- Mission ID: `AGENT_OFFICE_M01_EXACT_ADVISOR_DELIVERY_ACTIVATION`
- Governed mission:
  `AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE`
- Work scope: `AO-WU-21_REHEARSAL_CODE_DEFECT_REWORK`
- Actor: `Agent Office Worker-Rework`
- Target project: `Agent Office exact Advisor evidence immutability`
- Target repository: `/home/leo/Project/agent-office`
- Target branch/upstream:
  `shadow/agent-office-m01` / `origin/shadow/agent-office-m01`
- Starting target commit:
  `889a29b3e75da086a32ac76909a0ce9f4848ddfa`
- Resulting target commit:
  `73157613345ad3046e45b99b145f5400c8dc5428`
- Commit subject: `fix(evidence): keep immutability history path-exact`
- Target push: non-force, successful
- Target HEAD/upstream after push: exact equality, left/right `0/0`
- Target worktree after push: clean
- Existing session: same `agent-office` Worker session
- Model/effort requested: `Codex 5.6 SOL Ultra`
- Required skill: none
- New agent/sub-agent/delegation/temporary session: none
- Result generated at UTC: `2026-07-11T15:45:34Z`
- Result file:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m01_exact_advisor_delivery_activation/WORKER_REWORK_RESULT.md`
- Pointer file:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/18_WORKER_REWORK_RESULT_POINTER.md`

The exact handoff, rework brief, repository instructions, run/result protocols,
current implementation/tests, and the actual Git reproduction were read
directly. No execution was based on chat memory.

## 2. Reproduced defect

The read-only reproduction against the committed rehearsal evidence matched the
brief:

```text
git log --format=%H --follow -- <exact second-message 03_DECISION.json>
  d086978445ffcee944abc829b8bb705d290ec398
  5e71e4f664502d45055611f58589db7480424142

git log --format=%H -- <same exact path>
  d086978445ffcee944abc829b8bb705d290ec398
```

`--follow` applied rename/copy similarity across two distinct message
directories. Exact-path history correctly showed that the newer decision path
was added once.

## 3. Exact patch

`NodeExactGitAuthorityReader.pathHistory` changed only this argv:

```text
before: git log --format=%H --follow -- <relativePath>
after:  git log --format=%H -- <relativePath>
```

No observer logic, schema, authority role, evidence path derivation, current
blob/hash verification, dirty-path check, ancestry check, checkpoint freezing,
one-add count, stage ordering, rewrite/removal rejection, or fail-closed error
code changed.

The existing as-built documentation already says exact relative-path history and
one immutable addition. Removing `--follow` makes the implementation conform to
that wording, so no documentation patch was necessary.

## 4. Exact changed files

Commit `73157613345ad3046e45b99b145f5400c8dc5428` changes exactly two files:

1. `src/adapters/gateways/tmux-advisor/exact-authority.ts`
2. `tests/integration/exact-advisor-delivery.test.ts`

Commit size: 79 insertions and 2 deletions.

No configuration, dependency, lockfile, UI, browser route, runtime composition,
delivery control, evidence schema, canonical document, database, migration,
credential, authority material, readiness lease, capability, or unrelated file
changed.

## 5. Regression evidence

The new integration regression creates a disposable local Git repository with
two distinct message UUID directories containing byte-identical
`03_DECISION.json` files added in separate commits.

It proves all three required outcomes:

1. raw `git log --follow` returns two commits, reproducing the false positive;
2. the patched `NodeExactGitAuthorityReader.pathHistory` returns one distinct
   addition commit for each exact path; and
3. a later real rewrite of the second exact path returns two commits, preserving
   the existing `history.length !== 1` rejection gate.

The fixture uses fixed `/usr/bin/git`, no shell, a bounded environment, and an
automatically removed temporary repository. Existing tests continue to cover
accepted-evidence rewrite/removal, dirty path, non-ancestry, wrong ordering,
wrong correlation/scope/hash/time, and zero durable append on rejection.

## 6. Verification evidence

All displayed command output was constrained to ASCII.

### Focused gate

Command:

```text
LC_ALL=C npm run typecheck
LC_ALL=C npm run lint
LC_ALL=C npx vitest run --maxWorkers=1 \
  tests/integration/exact-advisor-delivery.test.ts \
  tests/integration/decision-authority-evidence.test.ts
```

Result:

- strict TypeScript: pass;
- ESLint: pass;
- focused suites: 2 files, 46/46 tests pass.

### Full repository gate

Command: `LC_ALL=C npm run check`

Result:

- ESLint: pass;
- strict TypeScript: pass;
- full sequential Vitest: 56 files, 296/296 tests pass;
- core TypeScript build: pass;
- production dashboard build: pass.

### Diff and publication gate

- `git diff --check`: pass.
- staged diff check: pass.
- staged paths before commit: exactly the two authorized files.
- non-force push: pass.
- resulting target HEAD equals upstream, left/right `0/0`.
- resulting target worktree: clean.

Playwright, runtime smoke, dependency audit, and visual updates were not run:
the brief required focused evidence tests plus the complete lint/typecheck/test/
build gate, and this patch changes no UI, dependency, runtime composition, or
visual surface.

## 7. Forbidden and excluded action evidence

- Real Agent Office server/private run: not started.
- AO-WU-21 rehearsal: not performed or resumed.
- Actual `/usr/bin/tmux` command/input/mutation: none.
- Readiness lease, activation descriptor, delivery capability, credential,
  proof, secret, key, or token: none created or modified.
- Browser dispatch or transport field: none.
- Foundation Advisor or transport-registry mutation: none.
- Database/schema/migration, public/remote/private-network/prod/live access:
  none.
- Hermes, Worker/Reviewer route, arbitrary product command surface: none.
- Protected branch/main merge or push, force push, destructive Git: none.
- Self-review verdict, risk acceptance, final approval, or automatic next
  mission: none.

Only read-only Git history was inspected in the committed foundation-docs
repository. The regression invoked `/usr/bin/git` only inside its disposable
temporary repository. No runtime process or tmux transport was invoked.

## 8. Preserved foundation-docs unrelated state

The following pre-existing foundation-docs paths remain untouched and excluded
from staging:

- modified `advisor/_system/AGENTS.md`;
- modified `advisor/_system/README.md`;
- modified `advisor/jobs/20260709_v3_11c2_worker_brief/06_WORKER_RUN_PROMPT.md`;
- untracked `advisor/jobs/20260709_reviewer_selection_protocol/`; and
- untracked `advisor/jobs/20260709_role_result_storage_protocol/`.

Only this result and the exact sequential pointer are published by this Worker
rework run.

## 9. Remaining gate and routing

- Advisor must inspect this result and route any required same-reviewer delta
  review or separately authorized rehearsal continuation.
- This Worker does not issue a review verdict and does not resume AO-WU-21.
- No known implementation limitation remains inside the exact `--follow`
  false-positive patch scope; broader mission/rehearsal status remains Advisor
  authority.

```text
RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
STOP_AFTER_POINTER: true
```
