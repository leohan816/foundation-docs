# AS1 Phase B Worker Patch 2 Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_2`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Exact authority and candidate

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Current clean/upstream-equal HEAD and Patch 2 parent:
  `cf657632165d85ed4b4f43eb67404c98b70a5b58`
- Patch 1 source candidate: `187c7152`
- Independent Patch 1 review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/69_PHASE_B_PATCH_1_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Review result commit: `4724ace`
- Exact verdict: `NEEDS_PATCH`

Read result 69 directly. Close every remaining F01-F06 defect. Do not accept a
finding as deferred live evidence or risk. Preserve every positive closure and
the reviewed private Leo-only design.

## Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 transport/process/authority
- `FAILURE_COST`: high
- `REVERSIBILITY`: isolated default-disabled feature branch
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: max
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: Patch 1 passed 371 tests while leaving source-level
  authority, incident-gating, and recovery defects; source-first repair needs
  max
- `WHY_NOT_HIGHER`: result 69 is exact and bounded; no demonstrated max
  capability limitation exists
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` only for a demonstrated
  max limitation or an unavoidable design/path conflict

Do not silently change profile.

## Exact path lock

Only these implementation paths may change:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `src/runtime/as1-slack-pilot/composition.ts`
3. `src/operations/readiness/as1-slack-control.ts`
4. `src/adapters/gateways/slack-pilot/exact-transport.ts`
5. `src/persistence/file-store/writer-lock.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
7. `tests/integration/as1-slack-live-composition.test.ts`
8. `tests/integration/as1-slack-exact-transport.test.ts`
9. `tests/operations/as1-slack-lifecycle.test.ts`

The following new paths are authorized only for Patch 2 evidence:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2_WORKER_RESULT_POINTER.txt`

All other paths, including package/lock files, descriptor, Registry, schema,
database, service/UI, external projects, prior evidence, and AS1 Phase A, are
forbidden. If exact closure requires another path or a design change, return the
concrete blocker before editing it.

## Required closure

### F01: owner and incident admission

- Install SIGINT, SIGTERM, and SIGUSR2 at the true immediate post-lock-acquire
  boundary before lock-owned initialization or any other side effect.
- SIGUSR2 must synchronously close every incident admission gate and take
  priority over an earlier clean signal; durable kill then completes through the
  bounded owner path.
- Remove broad delivery/evidence catches. Only typed benign `AWAITING` outcomes
  may continue. Every unexpected error, manual-reconciliation result, provenance
  rejection, store error, tmux observation error, evidence contradiction, or
  outbound failure must latch/terminate under a stable redacted outcome.
- Add ordered race/error tests that fail on `187c7152`.

### F02: independently bound authority and rollback

- Bind receive/delivery provenance to independently trusted construction-bound
  frozen snapshot commits. Never derive the ancestry authority solely from the
  candidate artifact field being judged.
- Compare the receive grant's frozen global-control and selected-profile-latch
  hashes with exact parsed pre-transition records.
- Put the first durable authority transition inside the legal rollback/global-
  kill envelope.
- Add the missing fixed-root/env/cwd, snapshot mismatch, aliasing, provenance,
  transition-persistence, Web, and Socket ordered negatives without real I/O.

### F03: provisional delivery and lease acceptance

- Keep pointer-delivery grant and readiness lease provisional until complete
  provenance/binding/expiry/live-actionability acceptance succeeds.
- Only then retain each `(firstAddCommit, blobSha256)` pair and reuse it on every
  later delivery/evidence observation; divergence must latch.
- Evidence requires already-proven accepted delivery authority and lease; no
  first-observation fallback.
- Add delivery/lease order, rewrite, deletion, dirty, and evidence-gating tests.

### F04: exact pointer lifetime and buffer recovery

- Never treat the current attempt's new `PREPARED` write as proof that a
  pre-existing same-name buffer is authorized residue.
- Use a genuinely pre-existing durable recovery fact tied to this delivery, or
  take the conservative option and fail every unexpected pre-existing buffer to
  manual reconciliation without deletion.
- Put the retained pointer descriptor in a complete `try/finally` lifetime so
  thrown control/observation/provenance paths cannot leak it.
- Add true prior-residue, unexpected-buffer, thrown-control, and
  thrown-observation tests.

### F05: exact bounded lifecycle proof

- Strictly decode and identity-bind the durable killed control record with
  no-follow/type/owner/mode/size/UTF-8/canonical/exact-schema/state-root checks.
- Apply one monotonic deadline before and after every post-signal await,
  including lock removal and durable-kill proof.
- Implement stable reviewed outcomes including already-engaged and persistence
  failure, without leaking raw errors.
- Add deterministic deadline, replacement, malformed/extra-key, already-
  engaged, persistence-failure, and incident-gate timing tests. No real signal.

### F06: truthful proof and operator text

- After source repair, make the setup document and new Patch 2 result state only
  proven behavior. Separate any non-owner npm convenience form from the one
  authorized direct owner argv, or remove the ambiguous form.
- Make `status` prose match its actual generic observer projection unless exact
  state observation is truly implemented inside this patch.
- Correct incident outcome prose to exact implemented mappings.
- Preserve truthful `OWNER_SETUP_COMPLETE`, default-disabled descriptor, one
  selected client, fixed state root, zero-operand observers, and live-disabled
  restart.

## Required validation

Run the three changed focused test files first, then the exact five focused
files and exact 19 AS1 files only, all with `--maxWorkers=1`. Run typecheck, core
build, changed-file ESLint, `git diff --check`, exact path-lock verification,
descriptor byte identity, and narrow secret/command/dynamic-target/unsafe-Git
scans. Prove key new tests fail on `187c7152` before passing on Patch 2 without
leaving mutations.

Record every failed/retried command honestly. Do not run Living Office, visual,
broad product, or unrelated suites.

## Preserved boundaries

Do not read owner secrets, connect Slack, initialize the real owner root,
activate the descriptor, create live grants/leases/capabilities, signal a real
process, mutate live tmux, add a framework, database, Registry/schema, UI,
systemd, HA, VibeNews, external-project change, simultaneous profiles, or any
new mission.

Commit bounded source/tests/docs, freeze one Patch 2 source candidate, add the
new result and pointer in evidence-only commits, non-force push only this
feature branch, return the pointer to `agent-office-advisor`, and STOP. Do not
self-review.
