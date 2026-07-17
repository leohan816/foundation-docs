# AS1 Phase B R2 Recovery F01 Patch 2 Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `PHASE_B_R2_RECOVERY_F01_PATCH_2`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Dispatch profile

- `SELECTED_MODEL`: Opus 4.8 (1M)
- `SELECTED_MODE`: Claude Code Worker
- `SELECTED_EFFORT`: max
- `WHY_NOT_LOWER`: this patch closes a cross-await mutual-exclusion defect in
  durable Slack status recovery and reconciliation
- `WHY_NOT_HIGHER`: the independent review identified exact methods, side
  effects, and tests in a two-code-path correction; the live Claude Code
  runtime exposes `max` as its highest applicable effort and `max` is sufficient
- `ESCALATION_TRIGGER`: return `HOLD` if the correction requires a store/schema,
  framework, accepted-design amendment, or weakening of the quarantine latch

Verify the actual process, model, effort, skill, workspace, branch, clean HEAD,
and upstream equality directly before editing. Do not infer them from the
session name and do not delegate.

## Exact coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact patch parent: `5911a5bad0b3eb617556929fa9a06040bd533905`
- accepted R2 design: `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`
- independent review result commit: `d8f3f1ace95b97adfa7e4e0757f03869d9d48b74`
- independent verdict: `NEEDS_PATCH`

Read result 97 and pointer 97 directly before implementation. This is a
same-Worker routine correction. F02 remains an activation-blocking HOLD and is
not part of this patch.

## Exact allowlist

Only these two existing code/test paths may change:

1. `src/application/slack-pilot/outbox.ts`
2. `tests/integration/as1-slack-outbound.test.ts`

Only these two new evidence paths may be added:

3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT.md`
4. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F01_PATCH_2_RESULT_POINTER.txt`

Do not edit the previous Worker result/pointer. No CLI, composition, lifecycle,
writer-lock, setup, accepted-design, descriptor, store/schema, package, secret,
Registry, framework, service, UI, VibeNews, or external-project path may change.

## Required correction

Close only finding `F01-R1` from result 97.

1. Route the status-ordering guard and the exact current outbox phase through
   every `REQUEST_STARTED` resume and reconciliation path.
2. Recheck status ordering immediately before each durable reconciliation or
   resume side effect, including:
   - the interrupted-request latch;
   - the interrupted-request `MANUAL_RECONCILIATION_REQUIRED` phase write;
   - the shared reconciliation latch; and
   - the shared reconciliation `MANUAL_RECONCILIATION_REQUIRED` phase write.
3. On refusal, preserve the exact prior outbox phase, perform no later outbox
   phase write or Web call, and return the fixed fail-closed outcome already
   established by the accepted design. Do not substitute another status.
4. Update every reconciliation call site with the truthful current phase. The
   request-hash mismatch is pre-start; control failures, malformed/ambiguous
   responses, and exhausted attempts occur after `REQUEST_STARTED`.
5. Explicitly reconcile the `STORE_QUARANTINED` catch/latch with the same
   per-side-effect contract. Preserve the existing mandatory B08 fail-closed
   quarantine behavior. Prove that quarantine cannot lead to a status-journal
   phase write, Web call, or later progression behind a disqualifying sibling.
   If the accepted status-ordering and mandatory quarantine-latch invariants
   cannot both be preserved in these two paths, return `HOLD` rather than
   weakening either one.
6. Preserve accepted-evidence outbound behavior (`statusGuard === null`), exact
   target derivation, deterministic IDs, bounded retries, no-blind-resend,
   one-use authority, and all existing redaction and failure behavior.

Do not refactor the outbox generally. Add no new abstraction beyond what is
needed to make the phase and guard explicit at the identified boundaries.

## Required adversarial tests

Add focused tests that introduce a disqualifying sibling after an earlier
check but before each previously uncovered side effect. At minimum prove:

1. `REQUEST_STARTED` recovery refuses before its latch when the sibling appears
   at that boundary, preserves `REQUEST_STARTED`, and performs no phase write or
   Web call.
2. A sibling appearing after the recovery latch but before the manual phase
   write prevents that write and preserves `REQUEST_STARTED`.
3. Shared reconciliation refuses before its latch for at least one malformed or
   ambiguous response path and preserves `REQUEST_STARTED`.
4. A sibling appearing after the reconciliation latch but before the manual
   phase write prevents that write and preserves `REQUEST_STARTED`.
5. The pre-start request-hash mismatch uses `PREPARED` truthfully on refusal.
6. The quarantine path remains fail closed and cannot write an outbox phase,
   call Slack, or continue progression behind a sibling.
7. Existing normal success, terminal replay, retry, and accepted-evidence tests
   remain passing.

Use deterministic injected test seams already present in the outbox fixtures.
No real Slack, root, secret, tmux, process, or owner operation is authorized.

## Focused gates

Run only:

```bash
npx vitest run --maxWorkers=1 tests/integration/as1-slack-outbound.test.ts
npx tsc --noEmit -p tsconfig.json
npx eslint src/application/slack-pilot/outbox.ts tests/integration/as1-slack-outbound.test.ts
npm run build:core
git diff --check 5911a5bad0b3eb617556929fa9a06040bd533905..HEAD
```

Also verify the exact four-path final scope, unchanged disabled descriptor, no
old-root or secret path introduction, and no change to F02 files. Do not rerun
Living Office, browser/visual, broad product, full AS1, or unrelated suites.

## Evidence and Git return

The new result must report the exact source/test changes, every command and
outcome, test totals, failures/retries, F01 disposition, explicit unchanged F02
HOLD, exact commits, result SHA-256, Git status, upstream equality, and the
continued prohibition on activation.

Use explicit staging and non-force push only. Produce:

1. one source/test patch commit;
2. one new result commit; and
3. one new pointer commit.

Return the new pointer to `agent-office-advisor` and STOP. Do not self-review,
touch either real state root, access secrets, connect Slack, activate the
descriptor, start an owner, observe/mutate a live destination, signal a process,
send tmux delivery input, or begin another mission.
