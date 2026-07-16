# AS1 Phase B Patch 2 + 2A Independent Delta Review Handoff

## Assignment

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Reviewer: same independent `agent-office-reviewer`
- Model / effort: GPT-5.6 SOL / max
- Required Sentinel instructions:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review mode: source-first, read-only product delta review

Max is the lowest sufficient profile for this dispatch because the candidate
controls external Slack identity, one-use exact tmux mutation authority,
durable kill/lock behavior, provenance, and fail-closed lifecycle transitions.

## Exact subject

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Last independently reviewed product HEAD/base:
  `cf657632165d85ed4b4f43eb67404c98b70a5b58`
- Patch 2 source candidate:
  `bd3f8fc69cd610febb6df32d8c5daa9dc92bfe38`
- Patch 2A source candidate/final review subject:
  `67ec9842b6d7af1b2e1eb3142bfee60f4f6da250`
- Product evidence HEAD:
  `5a23c25c08018c5a7cdb94ffa073a9700cb874f3`
- Product evidence HEAD must be clean, pushed, and upstream-equal.

Read directly:

- prior independent result `69_PHASE_B_PATCH_1_INDEPENDENT_DELTA_REVIEW_RESULT.md`;
- Patch 2 brief `70_PHASE_B_WORKER_PATCH_2_BRIEF.md`;
- Advisor correction `71_PHASE_B_PATCH_2A_ADVISOR_PREFLIGHT_CORRECTION.md`;
- product Patch 2 and Patch 2A Worker results and pointers;
- canonical Phase B design/security/setup documents;
- actual diff `cf657632..67ec9842b6d7af1b2e1eb3142bfee60f4f6da250`
  and load-bearing surrounding source.

## Review order

1. Inspect the actual source delta before relying on Worker reports or totals.
2. Re-evaluate every F01-F06 closure from result 69.
3. Inspect Patch 2A's readiness-lease correction as part of F03.
4. Reproduce only the bounded relevant gates.
5. Verify Worker result accuracy and issue one explicit verdict.

## Required source checks

### F01

- handlers at the true post-lock-acquire boundary;
- SIGUSR2 incident priority and synchronous admission closure;
- no arbitrary error or manual-reconciliation result can be swallowed into an
  unbounded live loop;
- cleanup/latch/termination results do not falsely claim a clean state.

### F02

- provenance snapshots are construction-bound and independent of fields learned
  from the candidate grant;
- exact pre-transition control/latch snapshots are compared before authority
  transition;
- first durable transition is inside a legal rollback/kill envelope;
- fixed root, env, descriptor, cwd, aliasing, provenance, Web, and Socket order
  remain fail closed.

### F03

- delivery grant and readiness lease remain provisional until full acceptance;
- both accepted pairs are retained only after `DELIVERED`;
- the real immediate evidence path requires and re-observes both pairs;
- lease divergence/deletion/dirty/rewrite/unavailability/malformed state cannot
  reach evidence or outbound;
- re-observed lease uses the canonical grant-snapshot assertion plus complete
  immutable shared-field correlation without incorrectly reapplying delivery-
  time expiry at evidence time;
- no first-observation evidence fallback remains.

### F04-F06

- no current-attempt `PREPARED` record authorizes pre-existing buffer deletion;
- retained pointer descriptor closes on every normal/error exit;
- durable killed proof is strict and state-root bound;
- one monotonic deadline bounds every post-signal proof;
- incident outcomes are complete and truthful;
- tests and setup/result prose do not overstate source or synthetic proof.

## Bounded reproduction

- affected live-composition test;
- exact five-file focused Phase B suite (`160/160` claimed);
- full AS1 19-file suite (`381/381` claimed);
- typecheck;
- core build;
- ESLint over exact changed TypeScript paths;
- `git diff --check`;
- exact path/scope, descriptor identity, prior-evidence identity, and narrow
  secret/dynamic-target/unsafe-Git scans.

Do not run Living Office, visual, broad product, or unrelated suites. Do not
access owner secrets, Slack, live tmux input, real process signals, owner state,
or activate the descriptor.

## Independence and output

The product worktree is read-only. Do not patch, stage, commit, push, or alter
it. Do not trust the Worker or Advisor summary without direct evidence. Do not
delegate.

Write only:

- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/73_PHASE_B_PATCH_2_2A_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/73_PHASE_B_PATCH_2_2A_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return exactly one verdict: `PASS`, `NEEDS_PATCH`, `FAIL`, or
`PASS_WITH_RISK`. A risk may not be silently accepted. Return both paths to
`agent-office-advisor` and STOP.
