# AS1 Phase B Worker Patch 5 Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_PATCH_5`

TARGET_ACTOR: Agent Office Worker (`agent-office-opus`)

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## Exact authority and frozen candidate

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact clean/upstream-equal Patch 5 baseline:
  `3165e7470e7e69658aaa1b627d7cd47767478043`
- Patch 4 source candidate:
  `0ab4782a79133111513fb11bc9ef62c197ed08da`
- Exact independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/79_PHASE_B_PATCH_4_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- Review-result governance commit:
  `d669bdbbae00493ca62051c632210649d36f984b`
- Review-result / pointer SHA-256:
  `f5a2e7a0bb17236ad39db378cfad4624f32d290066c6defa3e8efe2040ee237a` /
  `f3b9689df83b347ee45900fb99bd839e2e20ec4fcca55a647b3afe7453da9772`
- Exact verdict: `NEEDS_PATCH`

Read result 79 directly. Close only F01-A, F01-B, and dependent F06. Preserve
closed F02-F05, the private Leo-only pilot boundary, and the default-disabled
descriptor. This is the same authorized candidate train and one bounded repair,
not a redesign or new framework.

## Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 concurrency / transport authority
- `FAILURE_COST`: high; a stale owner could write concurrently with a new owner
- `REVERSIBILITY`: isolated default-disabled feature branch
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: max
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: green tests missed two source-level async/concurrency authority
  races, including a namespace-lock transition
- `WHY_NOT_HIGHER`: the independent review gives exact bounded defects and no
  demonstrated max capability limitation exists
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` only for a demonstrated
  max limitation or an unavoidable conflict with this exact path lock

Do not silently change profile.

## Exact path lock

Only these existing paths may change:

1. `src/runtime/as1-slack-pilot/composition.ts`
2. `src/operations/readiness/as1-slack-control.ts`
3. `src/persistence/file-store/writer-lock.ts`
4. `tests/integration/as1-slack-live-composition.test.ts`
5. `tests/operations/as1-slack-lifecycle.test.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`

Only these new evidence paths may be added:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_5_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_5_WORKER_RESULT_POINTER.txt`

`src/persistence/file-store/writer-lock.ts` is explicitly authorized because
review 79 proves the load-bearing namespace-unlink sequence lives there and
cannot be closed truthfully from the prior six-path boundary. No other path is
authorized. In particular, do not edit `service.ts`, `cli.ts`, package/lock
files, descriptor, Registry, schema/database, service/UI, VibeNews, external
projects, Phase A, AS1 governance, or immutable earlier evidence. If closure
requires another path or a material design change, stop with the concrete
blocker before editing it.

## Required closure

### F01-A — incident domination inside the actual live inbound callback

- Construction-bind the existing synchronous incident admission guard to the
  actual `As1InboundService` collaborators registered by the live Socket
  callback, not only to outer composition calls.
- Guard the inbound store, control/gate, and Slack ACK continuation immediately
  before invocation and immediately after every returned promise. An incident
  during one await must reject before the service begins its next store,
  transport, ACK, bind/consume, materialization, Slack, or other side effect.
- Keep the existing service contract and source unchanged. Use the existing
  composition guard pattern rather than creating a generic framework.
- Add ordered-deferred tests through the registered Socket callback proving
  zero later effects when the incident arrives during at least:
  receipt persistence, dedupe/open transition, Slack ACK, pre-ACK recovery, and
  result/materialization continuation.
- Prove the incident routes exactly once through the existing durable incident
  path. No real Slack, tmux, process signal, secret, or owner state may be used.

### F01-B — phase-aware WriterLock release and one-writer authority

- Make `WriterLock.release()` and `As1SlackControl.close()` distinguish the
  authoritative namespace outcome from cleanup durability/descriptor-close
  proof. Do not infer retained authority merely because `release()` threw.
- Once this owner successfully unlinks the exact namespace lock, or the fixed
  leaf is otherwise proven absent/not owned, the old control must irrevocably
  cease all authority-bearing mutation even if directory fsync or descriptor
  close later reports ambiguity.
- A post-unlink ambiguity must remain visible as `RELEASE` / cleanup ambiguity,
  must never be reported clean, and must never trigger an old-owner fallback
  kill or any other durable mutation.
- A pre-unlink failure may retain authority only when the same fixed leaf is
  still positively proven to be this exact owner's lock. If ownership is not
  positively proven, fail closed without an authority-bearing fallback write.
- Close retained handles deterministically on every authority-lost/released
  path. Do not leave a FileHandle for garbage-collection cleanup. Do not retry
  an ambiguous release.
- Add deterministic injection tests for failure before unlink and after unlink.
  In the post-unlink test, acquire a second writer at the exact interleaving and
  prove the old control performs zero fallback mutation after that acquisition.
  Preserve one-writer exclusion while the first lock is genuinely retained.
- Preserve the existing writer-lock v1 record/schema and fixed state-root
  contract. Do not add a registry, database, daemon, generic lock framework, or
  new external authority.

### F06 — evidence and operator truth

- Update setup wording only to behavior actually proved after F01 closes.
- Do not modify immutable Patch 1-4 evidence. Patch 5 result must explicitly
  supersede Patch 4's inaccurate complete-closure and retained-ownership claims.
- Report independently observed totals exactly and disclose every failed,
  corrected, retried, warning-producing, or skipped command.
- Preserve truthful owner setup, fixed root, one selected profile/client,
  generic zero-operand observer commands, local-vs-owner argv separation,
  live-disabled restart, and default-disabled descriptor behavior.

## Required validation

1. Run the two changed focused test files first with `--maxWorkers=1`.
2. Run the exact established five-file Phase B suite with `--maxWorkers=1`.
3. Run the established 19-file AS1 suite once with `--maxWorkers=1`.
4. Run typecheck, core build, ESLint only over changed TypeScript files,
   `git diff --check`, exact path-lock verification, descriptor byte identity,
   and narrow secret/dynamic-target/unsafe-Git scans.
5. Prove one new inbound-callback adversarial test and one post-unlink
   concurrent-owner test fail against exact baseline `3165e747` or its Patch 4
   source `0ab4782` before passing on Patch 5, without leaving product mutations.
6. Confirm the prior FileHandle-on-GC warning is absent from the new bounded
   runs. If any warning remains, report it and do not claim closure.

Do not run Living Office, visual, broad product, or unrelated suites.

No secret, Slack/network connection, owner-state initialization, live tmux
observation/input, real process signal, descriptor activation, or live pilot is
authorized during this patch.

## Result and stop contract

Commit the bounded source/tests/docs first and freeze one Patch 5 source
candidate. Then add the result and pointer in separate evidence-only commits
and non-force push the authorized feature branch. The result must state exact
commits, changed paths/diff, every command/result, pre-fix adversarial proof,
actual test totals, absence or presence of warnings, descriptor identity, scope
scans, runtime identity, no-secret/no-live-I/O/no-real-signal attestations,
rollback, Git cleanliness/upstream equality, and any remaining limitation.

Return the pointer to `agent-office-advisor` and STOP. Do not self-review, start
Slack, initialize owner state, access secrets, signal processes, mutate live
tmux, activate the descriptor, delegate, or start another mission.
