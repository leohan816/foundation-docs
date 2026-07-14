# Advisor Cleanup Brief

## Objective

Inventory current Agent Office workspaces, stop stale synthetic Agent Office
runtime activity, remove only generated temporary roots proven to be disposable,
and verify that Git snapshots and accepted A-1R evidence remain unchanged.

## Allowed

- read-only Git and filesystem inventory;
- process and loopback-listener inventory;
- graceful termination of the stale synthetic Agent Office E2E server;
- removal of exact `/tmp/agent-office-e2e-composed-*` and
  `/tmp/agent-office-e2e-bootstrap-proof-*` roots after proving their generator,
  disposal contract, and absence of live references;
- Advisor governance records under this job path.

## Preserved

- all five Agent Office worktrees and their local/remote branches;
- candidate `99beac3e07138e11dadd839c6016cc9f2e08b5ba`;
- canonical modular-system source, manifest, exports, and proof images;
- rejected and superseded visual snapshots;
- ignored product artifacts, build outputs, dependencies, and test outputs;
- pre-existing untracked `.grok/`, `grok-max`, `grokx`, and `grokx-max`, which
  prior canonical intake explicitly excluded and required to remain untouched;
- all tmux sessions and their parent AI processes;
- unrelated Cosmile listener on port `3000`.

## Forbidden

- branch or worktree removal;
- deletion or modification of accepted evidence;
- source edits, implementation, full validation, or Reviewer dispatch;
- session input, session termination, or model changes;
- cleanup of unknown user-local content;
- Slack implementation or any next product mission.

## Completion Criteria

1. A-1R accepted candidate and evidence hashes remain unchanged.
2. All Agent Office worktree heads equal their upstreams.
3. No tracked Agent Office diff is introduced.
4. Loopback port `4317` has zero listeners after graceful shutdown.
5. Exact synthetic temporary root count is zero.
6. Unrelated port `3000` and its Cosmile process remain untouched.
7. Slack implementation remains unstarted.
