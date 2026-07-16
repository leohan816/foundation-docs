# AS1 Phase B Patch 3 Independent Delta Review Handoff

## Assignment

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Reviewer: same independent `agent-office-reviewer`
- Model / effort: GPT-5.6 SOL / max
- Required Sentinel instructions:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review mode: source-first, read-only, exact Patch 3 delta review

Max remains the lowest sufficient profile because the open findings govern
incident priority, durable kill identity, process deadlines, and truthful
cleanup around external Slack and exact-tmux authority. Do not change profile,
delegate, implement, patch, or accept risk.

## Exact subject

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Prior independently reviewed source candidate:
  `67ec9842b6d7af1b2e1eb3142bfee60f4f6da250`
- Patch 3 starting product HEAD, source-equivalent to the prior candidate:
  `5a23c25c08018c5a7cdb94ffa073a9700cb874f3`
- Patch 3 source candidate:
  `d0e7ebc091f4882dbe25060812b6cb0329fb32e3`
- Patch 3 result commit:
  `c3d3bc34cb3b67cf4065bf0613cb800808216b52`
- Product evidence HEAD:
  `cb6085b30007b51b491a89059c16cc85bb8bc038`
- Product evidence HEAD must be clean, pushed, and upstream-equal.

Read directly:

- review result
  `73_PHASE_B_PATCH_2_2A_INDEPENDENT_DELTA_REVIEW_RESULT.md`;
- Worker brief `74_PHASE_B_WORKER_PATCH_3_BRIEF.md`;
- product Patch 3 result and pointer;
- actual source delta `67ec9842..d0e7ebc` and load-bearing surrounding
  source;
- the canonical Phase B design, security, and setup documents only where the
  delta depends on them.

Do not rely on Worker or Advisor summaries before inspecting the source.

## Scope lock

The source candidate may change exactly these six paths relative to
`5a23c25c`:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `src/runtime/as1-slack-pilot/composition.ts`
3. `src/operations/readiness/as1-slack-control.ts`
4. `tests/integration/as1-slack-live-composition.test.ts`
5. `tests/operations/as1-slack-lifecycle.test.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`

The result and pointer are the only later evidence paths. Verify no descriptor,
package, Registry, schema/database, framework, UI, service, VibeNews, external
project, prior evidence, secret, or authority-surface change.

## Review order

1. Inspect the actual product source delta first.
2. Re-review only open F01, F05, and dependent F06 from result 73.
3. Confirm accepted F02-F04 were not regressed; do not reopen them without a
   concrete source regression.
4. Reproduce the bounded relevant gates once.
5. Verify Patch 3 Worker-result accuracy and return one explicit verdict.

## Required closure checks

### F01 — incident domination and truthful cleanup

- A pending incident dominates before startup and after every awaited boundary,
  before any next side effect or non-incident terminal.
- It routes exactly once through durable incident kill, including incidents
  during control initialization, startup, receive observation, delivery,
  evidence, delay, and error handling.
- Startup revert, profile latch, fallback kill, Socket disconnect, drain, and
  WriterLock release ambiguity cannot be swallowed or reported as a synthesized
  `DISABLED_CLEAN`/`STOPPED_CLEAN`.
- Stable output remains redacted and fail closed.
- Ordered deferred-promise and injected cleanup-failure tests prove the source
  behavior rather than merely the intended control flow.

### F05 — exact durable-kill proof and enforced deadline

- The fixed control leaf is opened no-follow; the retained descriptor itself is
  fstat-validated for regular type, owner, owner-only mode, safe link count, and
  bounded size, then read from that same object.
- Fatal UTF-8, strict schema/correlation, state-root binding, and exact
  `canonicalBytes(record) + one LF` are required before accepting `KILLED`.
- JSON-equivalent noncanonical bytes and retained-object replacement/tampering
  fail closed.
- One monotonic deadline actually races every post-signal await, including
  lock observation, poll delay, and durable-kill proof; already-fired and
  never-resolving cases cannot hang, be starved, or accept late success.
- `STOP_TIMEOUT` / `INCIDENT_KILL_TIMEOUT` remain stable and truthful.

### F06 — proof and operator text

- Setup text states the exact post-lock-acquire handler boundary and only the
  source behavior actually proven.
- Patch 3 result explicitly supersedes inaccurate Patch 2 F01/F05 claims while
  leaving prior evidence immutable.
- Test totals, adversarial baseline failures, failures/retries, descriptor
  identity, and no-live-I/O attestations are accurate.
- Preserve generic `status`, local-vs-owner argv separation,
  `OWNER_SETUP_COMPLETE`, one selected client, fixed root, default-disabled
  descriptor, zero-operand observer verbs, and live-disabled restart.

## Bounded reproduction

Run only:

- the two changed focused test files;
- the exact five-file focused Phase B suite;
- the established AS1 19-file suite once with `--maxWorkers=1`;
- typecheck;
- core build;
- ESLint over the exact changed TypeScript paths;
- `git diff --check`;
- exact scope, lineage, descriptor/prior-evidence identity, and narrow
  secret/dynamic-target/unsafe-Git scans.

Do not run Living Office, visual, broad product, or unrelated suites. Do not
install dependencies, access owner secrets, connect Slack, observe or mutate a
live pilot tmux destination, send a real signal, initialize owner state, or
activate the descriptor.

## Independence and output

The product worktree is read-only. Do not patch, stage, commit, push, or alter
it. Do not delegate.

Write only:

- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/76_PHASE_B_PATCH_3_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/76_PHASE_B_PATCH_3_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `NEEDS_PATCH`, `FAIL`, or
`PASS_WITH_RISK`. A risk may not be silently accepted. Return both paths to
`agent-office-advisor` and STOP.
