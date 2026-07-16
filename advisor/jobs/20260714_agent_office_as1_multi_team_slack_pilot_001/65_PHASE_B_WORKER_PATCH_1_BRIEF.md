# AS1 Phase B Worker Patch 1 Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_1`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Exact authority and candidate

Apply one coherent same-scope patch for the independent `NEEDS_PATCH` result.

- Worktree: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Current product HEAD and patch parent:
  `86100634daacba444ae78f59d93de1ce7c213ff1`
- Frozen source candidate under review:
  `317d82ec3b76ae22e20ddea25f6d33e6e16c1934`
- Reviewed design source parent:
  `c4b1f5772d4a5094c86cebd949390bdd3115889b`
- Independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/64_PHASE_B_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`
- Review result commit:
  `ab33f90c3cc24e08c39203fd45084c7a3c9c5b0b`

Read the result directly and close F01 through F06. Do not reinterpret any
finding as accepted risk. Preserve the reviewed Phase B design and every
positive security axis recorded by the Reviewer.

## 2. Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 transport, process-incarnation, and authority ordering
- `FAILURE_COST`: high; a false live owner, wrong target, stale authority, or
  ambiguous stop is unacceptable
- `REVERSIBILITY`: isolated branch with default-disabled descriptor
- `CONTEXT_REQUIREMENT`: reviewed Phase B design, source candidate, and F01-F06
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: max
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: xhigh already produced a candidate whose synthetic suites
  passed while the production boundary and authority order remained incomplete;
  the coupled F01-F05 repair requires max
- `WHY_NOT_HIGHER`: max is sufficient for a bounded patch with exact source
  findings and an unchanged design; no demonstrated max capability limit exists
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` only for a demonstrated
  max capability limit; ordinary implementation or test failures remain with
  this Worker

Do not silently change model, mode, effort, or skill.

## 3. Exact path lock

Only these 14 implementation paths may change:

1. `src/runtime/as1-slack-pilot/composition.ts`
2. `src/runtime/as1-slack-pilot/cli.ts`
3. `src/adapters/gateways/slack-pilot/git-artifact-source.ts`
4. `src/adapters/gateways/slack-pilot/socket-client.ts`
5. `src/adapters/gateways/slack-pilot/exact-transport.ts`
6. `src/application/slack-pilot/inbound-store.ts`
7. `src/operations/readiness/as1-slack-control.ts`
8. `src/persistence/file-store/writer-lock.ts`
9. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
10. `tests/adapters/as1-slack-socket-client.test.ts`
11. `tests/integration/as1-slack-exact-transport.test.ts`
12. `tests/integration/as1-slack-live-composition.test.ts`
13. `tests/integration/as1-slack-git-artifact-source.test.ts`
14. `tests/operations/as1-slack-lifecycle.test.ts`

The following two new paths are authorized only for durable patch evidence:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_1_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_1_WORKER_RESULT_POINTER.txt`

Do not modify the prior Worker result, package files, lockfiles, descriptor,
Registry, schema, database, service definitions, UI, AS1 Phase A evidence, or
any external project. If a finding cannot close inside this lock, return the
exact blocker before changing another path.

## 4. Required repair

### F01: real production owner

- Construct the complete production dependency graph at the fixed production
  entry using the existing real Git, Slack Web/Socket, tmux, authority
  provenance, and evidence provenance adapters.
- Open the composition in foreground-owner mode and retain its writer lock for
  the process lifetime.
- Install `SIGINT`, `SIGTERM`, and `SIGUSR2` handlers immediately after owner
  acquisition. Clean signals must drain; incident kill must durably latch.
- Keep the process foreground and drive only the reviewed bounded grant-expiry,
  Git observation, delivery, evidence, and same-thread-result loop. Do not add
  reconnect, profile rollover, generic scheduling, or a framework.
- Add a production-boundary test using injected local fakes that fails if live
  dependencies are absent, the owner returns immediately, a handler is absent,
  or the bounded loop cannot reach its reviewed terminal state. It must not use
  a real secret, network, tmux input, or process signal.

### F02: authority order and fixed owner inputs

- Enforce the exact construction-bound owner root, reviewed secret path, and
  installed descriptor path. The descriptor must resolve independently of cwd.
- `--env-file` must equal the reviewed secret path; `start` and
  `redacted-check` must not validate one file and use another.
- Before the first durable authority-state transition, prove the receive grant's
  full Git provenance, exclusive expiry, closed profile identity, profile-state
  ref and hash, containment, no-follow realpath, and non-aliasing rules required
  by the accepted design.
- Every later startup failure must drain/revert/latch according to the legal
  reviewed state transition and release ownership without leaving an actionable
  half-started state.
- Add ordered-spy tests for every failure boundary, including wrong root,
  wrong env path, cwd independence, hash/ref mismatch, aliasing, expiry,
  provenance failure, secret mismatch, and Web/Socket failure.

### F03: immutable observation and expiry

- Bind each accepted immutable Git artifact to its internal
  `(firstAddCommit, blobSha256)` pair and use that pair on every later
  re-observation.
- Durably latch deletion, dirty/unpushed change, committed rewrite, ancestry or
  path reuse, and content divergence after acceptance.
- Add bounded receive-grant expiry and Git polling with a fresh trusted clock.
  Exclusive expiry closes receive. It never renews authority, reconnects, or
  switches profile.
- Cover the divergence cases and exclusive-expiry races at composition level.

### F04: exact pointer and recovery

- Retain the no-follow opened pointer handle through the final precommit
  identity proof and close it exactly after that proof on every path.
- Check both grant and lease authority at every fresh-clock observation and
  side-effect boundary.
- Delete a pre-existing tmux buffer only when explicit durable journal recovery
  facts prove it is authorized unpasted residue. Otherwise fail closed.
- Add adversarial tests for retained-handle replacement races, symlink,
  hardlink, owner/type checks, 32,768/32,769-byte boundaries, missing/double LF,
  recovery-authorized deletion, and expiry between observations.

### F05: exact process and lock lifecycle

- Use monotonic whole-operation bounds. Check before spawn and on every
  completion path; late success is failure.
- Strictly decode every bridge result key and value, including exact operation
  equality or the reviewed `UNPARSED` failure value.
- Expose only the fixed construction-bound owner lock and closed operations to
  the production observer boundary. No caller-selected lock path is allowed.
- After signaling, prove exact lock removal within the reviewed bound; for
  incident kill, also prove the durable killed state before reporting success.
- Release the writer lock only when the raw bytes still equal the exact
  canonical-plus-one-LF bytes acquired by this owner.
- Add deterministic inclusive/next-boundary, deadline, result-schema,
  replacement, post-signal, and noncanonical-lock-byte tests. Do not send a
  live signal in this patch.

### F06: truthful tests and owner instructions

- Add load-bearing tests that would fail on source candidate `317d82e` and pass
  only after F01-F05 close, including both fixed profiles sharing the same fixed
  owner root sequentially.
- Correct the setup document so current Phase B commands are singular and
  executable: only `start` and `redacted-check` accept the exact env file;
  `stop`, `incident-kill`, `status`, and live-disabled `restart` are
  zero-operand. Remove or explicitly supersede contradictory Phase A wording.
- State only what source and synthetic tests prove. Live Slack, real signal,
  and real tmux effects remain later sequential-pilot evidence.

## 5. Preserved boundaries

Do not read the owner secret, connect Slack, mutate a live tmux pane, send a
real signal, initialize the real owner state root, activate the descriptor,
create live grants/leases/capabilities, or start either pilot during patching.

Do not add multi-user/workspace behavior, a generic runtime abstraction,
database, schema, Registry change, HTTP ingress, UI, systemd/permanent service,
auto-reconnect, HA, VibeNews, external project changes, dynamic target input,
or simultaneous profile operation.

## 6. Required gates

Run the five focused test files with `--maxWorkers=1`, then the exact 18 AS1
test files only. Also run typecheck, core build, ESLint over changed TypeScript
paths, `git diff --check`, exact 14-path scope verification, descriptor byte
identity, and narrow secret/command/dynamic-target/unsafe-Git scans.

Record every failed command and retry. Environment-only failures must be
identified, not omitted. Do not run Living Office, visual, broad product E2E,
or unrelated suites.

## 7. Commit and result

Use bounded implementation commits, then freeze one source candidate. Add the
new patch result and pointer in evidence-only commits. Stage exact paths and
non-force push only this branch.

The result must map F01-F06 to source and tests, report every gate accurately,
separate synthetic proof from deferred live proof, attest that prior evidence
and the disabled descriptor are unchanged, and include branch/commit/upstream/
rollback data. Return the pointer to `agent-office-advisor` and STOP. Do not
self-review, activate a pilot, or dispatch another Actor.
