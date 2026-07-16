# AS1 Phase B Worker Patch 3 Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_3`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Exact authority and frozen candidate

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Current clean/upstream-equal product HEAD:
  `5a23c25c08018c5a7cdb94ffa073a9700cb874f3`
- Frozen Patch 2A source candidate:
  `67ec9842b6d7af1b2e1eb3142bfee60f4f6da250`
- Exact independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/73_PHASE_B_PATCH_2_2A_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Review-result commit: `3476222`
- Review-result SHA-256:
  `5c62bfc70b0bc7e88449c89dadce73bf518a33d408a5f56e51cc2e9e1fba5d95`
- Exact verdict: `NEEDS_PATCH`

Read result 73 directly. Close only its open F01, F05, and dependent F06
findings. Preserve the accepted F02-F04 behavior and the private Leo-only,
one-profile-at-a-time design. This is a same-scope patch, not a redesign.

## Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 lifecycle/process/transport
- `FAILURE_COST`: high
- `REVERSIBILITY`: isolated default-disabled feature branch
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: max
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: the prior candidate passed 381 tests while retaining a
  source-level incident race and unbounded proof awaits; source-first repair
  requires max
- `WHY_NOT_HIGHER`: result 73 gives exact bounded defects and no demonstrated
  max capability limitation exists
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` only for a demonstrated
  max limitation or an unavoidable path/design conflict

Do not silently change profile.

## Exact path lock

Only these existing implementation paths may change:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `src/runtime/as1-slack-pilot/composition.ts`
3. `src/operations/readiness/as1-slack-control.ts`
4. `tests/integration/as1-slack-live-composition.test.ts`
5. `tests/operations/as1-slack-lifecycle.test.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`

Only these new evidence paths may be added:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_3_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_3_WORKER_RESULT_POINTER.txt`

All other paths are forbidden, including package/lock files, descriptor,
Registry, schema/database, service/UI, VibeNews, external projects, Phase A,
and prior immutable evidence. If exact closure requires another path or a
material contract redesign, stop with the concrete blocker before editing it.

## Required closure

### F01 — incident priority and truthful cleanup

- A pending `SIGUSR2` incident must dominate before startup, after every awaited
  boundary, before beginning another side effect, and before selecting or
  returning any non-incident terminal result.
- Route one pending incident exactly once through the durable incident-kill
  path. A clean signal, divergence, expiry, delivery result, or thrown error
  must never mask it.
- Cover incidents arriving during control initialization, startup, receive
  observation, delivery, evidence/outbound, delay, and error handling with
  ordered deferred-promise tests. No real signal or live transport is allowed.
- Cleanup must not swallow profile-latch, fallback global-kill, Socket
  disconnect, or WriterLock-release ambiguity and then claim
  `DISABLED_CLEAN`. Return a stable redacted fail-closed outcome that truthfully
  distinguishes proven clean/latched state from unproved cleanup.
- Add injected persistence, disconnect, fallback-kill, and lock-release failure
  cases. Do not expose raw errors.

### F05 — exact durable-kill identity and enforced deadline

- Open the fixed control leaf no-follow and use the retained descriptor for the
  read and `fstat` proof. Validate the retained object itself: regular file,
  expected owner, owner-only mode, safe link count, bounded size, fatal UTF-8,
  strict exact-schema/correlation, and state-root binding.
- Accept `KILLED` only when the exact bytes equal the canonical serialization of
  the strictly parsed record plus exactly one terminal LF. Reject reordered,
  pretty-printed, whitespace-extended, multi-object, replaced, or otherwise
  noncanonical proof.
- Enforce one monotonic post-signal deadline with actual deadline races around
  every post-signal await, including polling delay, lock-removal observation,
  and durable-kill proof. A never-resolving collaborator must return the stable
  timeout outcome within the bound; late success must not be accepted.
- Add deterministic JSON-equivalent noncanonical, retained-object replacement,
  and never-resolving lock/durable-proof tests. No live owner or real signal.

### F06 — proof and operator-text truth

- Correct setup wording to the exact post-lock-acquire handler boundary and the
  behavior actually proven after F01/F05 close.
- The new Patch 3 result must explicitly supersede inaccurate Patch 2 claims;
  do not modify prior immutable result files.
- Preserve truthful `OWNER_SETUP_COMPLETE`, default-disabled descriptor, one
  selected client, fixed root, zero-operand observer verbs, generic `status`,
  and live-disabled restart wording.

## Required validation

1. Run the two changed focused test files first.
2. Run the exact established five-file Phase B suite with `--maxWorkers=1`.
3. Run the exact established 19-file AS1 suite with `--maxWorkers=1`.
4. Run typecheck, core build, ESLint only over changed TypeScript files,
   `git diff --check`, exact path-lock verification, descriptor byte identity,
   and narrow secret/dynamic-target/unsafe-Git scans.
5. Prove the key new adversarial tests fail on source candidate `67ec9842`
   before passing on Patch 3, without leaving mutations.

Record every failed or retried command honestly. Do not run Living Office,
visual, broad product, or unrelated suites.

## Result and stop contract

Commit the bounded source/tests/docs first and freeze one Patch 3 source
candidate. Then add the new result and pointer in evidence-only commits and
non-force push this feature branch. The result must state exact commits, changed
paths, diff, every command/result, adversarial pre-fix proof, descriptor hash,
scope scans, failures/retries, runtime identity, no-secret/no-live-I/O/no-real-
signal attestations, rollback, Git cleanliness/upstream equality, and remaining
limitations.

Return the pointer to `agent-office-advisor` and STOP. Do not self-review, start
Slack, initialize owner state, access secrets, signal processes, mutate live
tmux, activate the descriptor, or start another mission.
