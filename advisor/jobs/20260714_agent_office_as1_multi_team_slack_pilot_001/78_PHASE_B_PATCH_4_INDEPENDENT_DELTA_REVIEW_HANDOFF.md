# AS1 Phase B Patch 4 Independent Delta Review Handoff

## Assignment

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Reviewer: same independent `agent-office-reviewer`
- Model / effort: GPT-5.6 SOL / max
- Required Sentinel instructions:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review mode: source-first, read-only, exact Patch 4 delta review

Max remains the lowest sufficient profile because the remaining review covers a
previously CRITICAL incident-priority defect, durable process-incarnation proof,
and fail-closed cleanup around Slack and exact-tmux authority. Do not change
profile, delegate, implement, patch, or accept risk.

## Exact subject

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Prior independently reviewed source candidate:
  `d0e7ebc091f4882dbe25060812b6cb0329fb32e3`
- Patch 4 clean/upstream-equal baseline, source-equivalent to that candidate:
  `cb6085b30007b51b491a89059c16cc85bb8bc038`
- Patch 4 source candidate:
  `0ab4782a79133111513fb11bc9ef62c197ed08da`
- Patch 4 result commit:
  `ecaa00fce59edee41ebe7f4856cc22474cd102ec`
- Product evidence HEAD:
  `3165e7470e7e69658aaa1b627d7cd47767478043`
- Product evidence HEAD was independently observed clean, pushed, and
  upstream-equal before this dispatch.

Read directly:

- review result
  `76_PHASE_B_PATCH_3_INDEPENDENT_DELTA_REVIEW_RESULT.md`;
- Worker brief `77_PHASE_B_WORKER_PATCH_4_BRIEF.md`;
- product Patch 4 result and pointer;
- actual source delta `cb6085b..0ab4782` and load-bearing surrounding source;
- canonical Phase B design/security/setup only where the delta depends on it.

Inspect source before relying on Worker or Advisor summaries.

## Scope lock

The source candidate may change exactly these six paths relative to `cb6085b`:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `src/runtime/as1-slack-pilot/composition.ts`
3. `src/operations/readiness/as1-slack-control.ts`
4. `tests/integration/as1-slack-live-composition.test.ts`
5. `tests/operations/as1-slack-lifecycle.test.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`

The result and pointer are the only later evidence paths. Verify no descriptor,
package, Registry, schema/database, framework, UI, service, VibeNews, external
project, prior-evidence, secret, or authority-surface change.

## Review order

1. Inspect the actual Patch 4 source delta first.
2. Re-review only open F01, F05, and dependent F06 from result 76.
3. Confirm accepted F02-F04 have no concrete source regression; do not reopen
   them from general concern.
4. Reproduce the bounded relevant gates once.
5. Verify the Patch 4 Worker result and return one explicit verdict.

## Required closure checks

### F01 - incident domination and truthful cleanup

- The synchronous incident gate is checked before and after every load-bearing
  await in startup, receive observation, delivery, evidence, outbound, clean
  cleanup, and error cleanup.
- Supplied startup, transport, evidence, and outbox collaborators cannot hide an
  internal await followed by a later Git, durable-store, Web, Socket, tmux, or
  outbound side effect after admission closes.
- Confirm live inbound envelope processing is also fail closed through the
  existing `controlProfileControlPort` -> `ownedClean()` incident-gate path;
  registration of a callback must not create an unguarded mutation path.
- A pending incident routes exactly once through durable incident kill and
  dominates every later non-incident terminal.
- `engageGlobalKill` commits in-memory latch state only after persistence.
  Disconnect, drain, fallback-kill, and WriterLock-release ambiguity can never
  become `DISABLED_CLEAN`, `STOPPED_CLEAN`, or an unproved
  `DISABLED_LATCHED`.
- Inspect the release-failure behavior directly: retained ownership plus
  fallback kill must be truthful and must not silently create concurrent-owner
  authority.
- Ordered synthetic tests prove zero later side effects rather than only an
  eventual terminal result.

### F05 - retained object and current fixed-leaf proof

- The retained no-follow descriptor is safely fstat-validated before and after
  the read; identity and mutation metadata remain stable.
- The current fixed leaf is independently reopened `O_NOFOLLOW`, safely
  fstat-validated, and device/inode-correlated to the retained object before
  accepting the exact canonical killed bytes.
- Both descriptors remain retained through acceptance, close deterministically,
  and any close ambiguity fails closed.
- Unlink/replacement, same-size tamper, metadata change, symlink, malformed,
  noncanonical, and deadline cases remain rejected without late acceptance.

### F06 - proof and operator truth

- Setup text states only behavior proved by source and tests.
- Patch 4 evidence explicitly supersedes inaccurate Patch 3 closure and
  `165/165` claims without editing prior evidence.
- Independently verify the reported totals (`98`, `180`, `404`), failures,
  adversarial baseline disclosure, correction attempts, descriptor identity,
  and no-live-I/O attestations.
- Preserve `OWNER_SETUP_COMPLETE`, generic status, local-vs-owner argv
  separation, one selected client/profile, fixed state root, zero-operand
  observer verbs, live-disabled restart, and the byte-unchanged default-disabled
  descriptor.

## Bounded reproduction

Run only:

- the two changed focused test files;
- the exact five-file Phase B suite;
- the established AS1 19-file suite once with `--maxWorkers=1`;
- read-only typecheck and core build;
- ESLint over the exact five changed TypeScript paths;
- `git diff --check`;
- exact scope/lineage/descriptor/prior-evidence checks and narrow
  secret/dynamic-target/unsafe-Git scans.

Do not rerun the full product, Living Office, visual, or unrelated suites. Do
not repeat every baseline adversarial run when source inspection and the exact
new test are sufficient. Do not install dependencies, access owner secrets,
connect Slack, initialize owner state, observe or mutate a live pilot tmux
destination, send a real signal, or activate the descriptor.

## Independence and output

The product worktree is read-only. Do not patch, stage, commit, push, or alter
it. Do not delegate.

Write only:

- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/79_PHASE_B_PATCH_4_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/79_PHASE_B_PATCH_4_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `NEEDS_PATCH`, `FAIL`, or
`PASS_WITH_RISK`. A risk may not be silently accepted. Return both paths to
`agent-office-advisor` and STOP.
