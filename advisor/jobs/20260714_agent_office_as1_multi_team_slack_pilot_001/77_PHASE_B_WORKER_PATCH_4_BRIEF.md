# AS1 Phase B Worker Patch 4 Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_4`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Exact authority and frozen candidate

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact clean/upstream-equal Patch 4 baseline:
  `cb6085b30007b51b491a89059c16cc85bb8bc038`
- Patch 3 source candidate:
  `d0e7ebc091f4882dbe25060812b6cb0329fb32e3`
- Exact independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/76_PHASE_B_PATCH_3_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Review-result governance commit:
  `abeadb50b147d302ed16c3b910266977f2066a41`
- Review-result / pointer SHA-256:
  `1c01a9f3d6c8f35f9a3821255722bffafebdcbf107e8cd0bfc7a0e2b54b35ace` /
  `e2fab08c1694904c54645fd27dd6e46153d96915ff4b9852a4266390c346d87f`
- Exact verdict: `NEEDS_PATCH`

Read result 76 directly. Close only its remaining F01, F05, and dependent F06
findings. Preserve the accepted F02-F04 behavior, all previously closed F05
subcriteria, the private 14-path boundary, and the default-disabled descriptor.
This is one same-scope repair, not a redesign.

## Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 lifecycle/process/transport
- `FAILURE_COST`: high
- `REVERSIBILITY`: isolated default-disabled feature branch
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: max
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: green tests missed source-level incident and retained-object
  races across nested async boundaries; exact source-first repair needs max
- `WHY_NOT_HIGHER`: the independent review identifies bounded defects and no
  demonstrated max capability limitation exists
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

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_4_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_4_WORKER_RESULT_POINTER.txt`

All other paths are forbidden. Do not edit Patch 2/Patch 3 evidence, package or
lock files, descriptor, Registry, schema/database, service/UI, VibeNews,
external projects, Phase A, or AS1 governance. If exact closure requires
another path or a material design change, stop with the concrete blocker before
editing it.

## Required closure

### F01 — incident domination at every load-bearing async boundary

- Introduce one synchronous, construction-bound incident-admission guard that
  can be checked immediately before and immediately after each load-bearing
  await and before the next side effect.
- Apply the guard through `start()`, `deliverPending()`,
  `ingestEvidenceAndProject()`, clean shutdown, and error shutdown. A pending
  incident must dominate every non-incident terminal after cleanup as well.
- Nested startup verification must not hide internal boundaries. Without
  changing forbidden `exact-authority.ts`, guard the supplied provenance, Web,
  and Socket operations so an incident during `assertAccepted`, `authTest`,
  `botsInfo`, or `connect` prevents the next operation.
- Guard all later Git, filesystem, state-store, delivery, evidence, outbound,
  delay, disconnect, profile-latch, fallback-kill, drain, and WriterLock-release
  side effects. Do not merely assert the eventual terminal result.
- Route one incident exactly once through the durable incident-kill path.
  Cleanup ambiguity must stay visible in the stable redacted outcome and must
  never become `DISABLED_CLEAN` or an unproved `DISABLED_LATCHED` result.
- Bring the missing-handler/lock-release path inside the stable owner-result
  boundary; do not discard a release failure and throw a raw error.
- Add deterministic ordered-deferred tests proving zero subsequent side effects
  for incidents inside startup internals, delivery internals, evidence
  internals, clean cleanup, and error cleanup. Inject profile-latch persistence,
  fallback-kill, disconnect, and release failure. No real signal or live I/O.

### F05 — retained object and current fixed-leaf identity

- Keep the accepted no-follow retained-FD, strict schema/correlation, fatal
  UTF-8, canonical-byte-plus-one-LF, and monotonic-deadline behavior.
- After reading the retained descriptor, re-fstat it and prove the relevant
  identity, owner, type, mode, link, size, and mutation metadata remain stable.
- Re-open the fixed control leaf no-follow, inspect that current object, and
  require its device/inode identity and safe metadata to match the retained
  object before accepting `KILLED`. Use retained handles through acceptance and
  close them deterministically.
- Fail closed on unlink, rename/replacement, symlink, same-size mutation, link
  change, metadata change, current-leaf mismatch, parse/correlation mismatch,
  timeout, or close ambiguity. Do not accept stale bytes from an object no
  longer bound to the fixed leaf.
- Add deterministic retained-leaf replacement and same-size tampering race
  tests, plus any narrow metadata mismatch test required to prove the contract.
  Preserve existing canonical/noncanonical and never-resolving deadline tests.

### F06 — evidence and operator truth

- Update setup wording only to behavior actually proved after F01/F05 close.
- Do not modify immutable Patch 3 evidence. The Patch 4 result must explicitly
  supersede its inaccurate closure claims and its `165/165` five-file total.
- Report independently observed test totals exactly; do not assume totals from
  prior runs.
- Preserve truthful `OWNER_SETUP_COMPLETE`, generic `status`, local-vs-owner
  argv separation, one selected client/profile, fixed root, zero-operand
  observer verbs, live-disabled restart, and default-disabled descriptor.

## Required validation

1. Run the two changed focused test files first with `--maxWorkers=1`.
2. Run the exact established five-file Phase B suite with `--maxWorkers=1`.
3. Run the exact established 19-file AS1 suite with `--maxWorkers=1`.
4. Run typecheck, core build, ESLint only over changed TypeScript files,
   `git diff --check`, exact path-lock verification, descriptor byte identity,
   and narrow secret/dynamic-target/unsafe-Git scans.
5. Prove the key new F01/F05 adversarial tests fail against exact Patch 4
   baseline `cb6085b` before passing on the repair, without leaving mutations.
6. Record every failed, hung, retried, or corrected command honestly. Do not
   run Living Office, visual, broad product, or unrelated suites.

No secret, Slack/network connection, owner-state initialization, live tmux
observation/input, real process signal, descriptor activation, or live pilot is
authorized during this patch.

## Result and stop contract

Commit the bounded source/tests/docs first and freeze one Patch 4 source
candidate. Then add the result and pointer in separate evidence-only commits
and non-force push the authorized feature branch. The result must state exact
commits, changed paths, diff, every command/result, pre-fix adversarial proof,
actual test totals, descriptor identity, scope scans, failures/retries, runtime
identity, no-secret/no-live-I/O/no-real-signal attestations, rollback, Git
cleanliness/upstream equality, and any remaining limitation.

Return the pointer to `agent-office-advisor` and STOP. Do not self-review,
start Slack, initialize owner state, access secrets, signal processes, mutate
live tmux, activate the descriptor, or start another mission.
