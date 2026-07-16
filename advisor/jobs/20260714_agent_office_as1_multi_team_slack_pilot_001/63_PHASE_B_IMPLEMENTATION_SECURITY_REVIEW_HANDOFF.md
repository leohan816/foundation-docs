# AS1 Phase B Independent Implementation and Security Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

REVIEW_CLASS: `PRIVATE_LEO_ONLY_PHASE_B_IMPLEMENTATION_SECURITY`

TASK_COMPLEXITY: `HIGH`

RISK_LEVEL: `HIGH`

FAILURE_COST: `HIGH`

REVERSIBILITY: `HIGH` -- the candidate is isolated, committed, and not live.

CONTEXT_REQUIREMENT: `CHANGED_AND_LOAD_BEARING_PATHS`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_MODE: `Sentinel`

SELECTED_EFFORT: `max`

WHY_NOT_LOWER: This candidate composes Slack ingress, immutable mission intake,
one-use authority, exact tmux delivery, retained process ownership, and signal
lifecycle. A missed identity, ordering, retry, or mutation defect could deliver
to the wrong process or create standing authority.

WHY_NOT_HIGHER: The implementation is confined to 14 reviewed paths, has an
exact reviewed design and synthetic boundary tests, and max has not shown a
capability limitation on this candidate.

ESCALATION_TRIGGER: Any residual authority ambiguity, wrong-process or
cross-Team delivery possibility, pre-authority mutation, secret disclosure,
unbounded command surface, live-only risk that cannot be closed by the same
Worker, or need to broaden the reviewed 14-path contract.

## Exact candidate and lineage

- Read-only product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Reviewed design/source parent:
  `c4b1f5772d4a5094c86cebd949390bdd3115889b`
- Frozen implementation source candidate:
  `317d82ec3b76ae22e20ddea25f6d33e6e16c1934`
- Worker result commit:
  `0668e5e9a9d28e7b004d8f045a80d4f919d2f69d`
- Current result-pointer HEAD:
  `86100634daacba444ae78f59d93de1ce7c213ff1`
- Upstream at dispatch: exact `86100634daacba444ae78f59d93de1ce7c213ff1`
  with ahead/behind `0/0`; worktree clean.
- Frozen Phase A baseline:
  `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Independent design PASS governance commit:
  `9ae1414add97d38f9765b9112198f642bd1b30bb`
- Exact Worker handoff governance commit:
  `624192e7c9e234b35a38a6784877756288c81647`
- Worker continuation/profile record:
  `b6c7d1d40ff3daf373f21a9f73269faea4e3ec81`

Review the source delta `c4b1f57..317d82e`; treat the later two commits only as
Worker evidence. Do not trust the Worker summary or test totals without direct
inspection and reproduction.

Worker evidence:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT_POINTER.txt`

## Exact changed-path lock

The source candidate must contain exactly these 14 paths:

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

Confirm no package, lockfile, configuration, Registry, schema/database, service,
UI, VibeNews, external product, generic framework, or simultaneous-profile
surface entered the source candidate. The default-disabled descriptor must be
byte-unchanged.

## Review order

### 1. Actual code and authority flow

Inspect the complete source diff and load-bearing surrounding contracts before
using test totals as a success signal. Trace one exact flow:

Slack envelope -> identity checks -> durable intake -> exact one-use grant and
lease -> fixed Advisor profile -> pinned pointer bytes -> three complete tmux
observations -> paste boundary -> evidence authority -> same-thread projection.

Confirm Slack input cannot select Team, Actor, session, pane, workspace, model,
effort, command, file path, signal, or fallback. Confirm one profile only, no
cross-Team fallback, no historical `foundation-advisor` physical destination,
and no Worker/Reviewer direct dispatch.

### 2. Security-critical implementation

Independently inspect and attack the following:

- startup ordering: capability probe before state-root/secret/network mutation;
- fixed state-root and exact-key secret parsing; no `source`, `eval`, or secret
  output;
- retained writer-lock descriptor and identity-checked release;
- the embedded bridge literal is exactly 17,983 bytes with SHA-256
  `557e32a2ab54beea3b3ec8ce1a68bb69a7f3b756db4e3b007d18a452f7a22d75`;
- verified interpreter object and inherited-FD execution; no mutable-path or
  numeric-PID signal fallback;
- zero-operand clean stop and incident kill; no caller-controlled PID, signal,
  path, command, profile, or reason;
- socket authenticated quarantine, one-use receive arm, zero pre-arm parse/ACK,
  one held raw frame maximum, and second-frame latch;
- fixed-root, no-fetch, read-only Git artifact observation and divergence rules;
- pointer no-follow/private/single-link/canonical-plus-one-LF/hash/content-address
  seal and no reopen;
- two full precommit plus one full post-load 15-field observations;
- authority remains unconsumed on every precommit failure, while any
  `PASTE_STARTED` uncertainty is no-retry/manual-reconciliation;
- incident gate closes synchronously before durable kill persistence;
- frozen grant hashes never become or absorb the current live predicate;
- clean shutdown releases socket, gates, writer lock, and profile ownership.

Do not signal a live process, read owner secrets, connect Slack, mutate tmux, or
activate the pilot while reviewing.

### 3. Worker-report accuracy and tests

Reproduce at minimum:

- `npm run typecheck`
- `npm run build:core`
- changed-path `eslint` for the exact 14 paths
- focused five-file Vitest suite with `--maxWorkers=1`
- all 18 AS1 Slack test files if locally available without network access
- `git diff --check c4b1f57..317d82e`
- exact changed-path and default-disabled-descriptor checks
- narrow secret, forbidden-command, dynamic-target, and unsafe-Git scans

Verify the reported `123` focused and `339` AS1 regression totals directly.
Record every failure, retry, environment issue, and any discrepancy in the
Worker result. Do not run Living Office, visual, broad product E2E, or unrelated
test suites.

## Required finding treatment

Give particular attention to the Worker-declared deviations and not-proven
limits. Decide whether each is acceptable as an exact implementation of the
reviewed design or requires the same Worker to patch it. Absence of a live
rehearsal is not itself a defect at this review stage, but the code and synthetic
gates must leave that rehearsal fail-closed and bounded.

Findings must lead the result, ordered by severity with exact file/line evidence.
Do not patch or implement. Do not convert an unresolved defect into
`PASS_WITH_RISK` merely to continue.

## Verdict contract

Return exactly one:

- `PASS`
- `NEEDS_PATCH`
- `PASS_WITH_RISK`
- `FAIL`

`NEEDS_PATCH` returns to the same `agent-office-opus` Worker and this same
Reviewer performs delta re-review. `PASS_WITH_RISK` or `FAIL` is a Founder stop.
Reviewer PASS does not activate Slack or grant final approval.

## Output and prohibitions

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/64_PHASE_B_IMPLEMENTATION_SECURITY_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/64_PHASE_B_IMPLEMENTATION_SECURITY_REVIEW_RESULT_POINTER.md`

Write them in the governance worktree. Do not stage, commit, or push; the
Advisor will verify and persist the exact outputs. Do not modify the product
candidate, secrets, owner state, Slack, tmux, external projects, or runtime.
Return the exact verdict and paths to `agent-office-advisor`, then STOP.
