# PERSONAL_LEO_ONLY Direct Spool Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PERSONAL_LEO_ONLY_DIRECT_SPOOL`

STATUS: `SUPERSEDES_HANDOFFS_117_AND_118`

FROM: `agent-office-advisor`

TO: `agent-office-opus`

REPOSITORY: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

BRANCH: `feature/as1-phase-b-live-pilot-001`

REMOTE_BASELINE: `a3f48d09d85bc1882fc99b2f265c4dd8da1f70cf`

SKILL: `/fable-builder`

PROFILE: current verified Opus 4.8 Max Worker profile; no profile change or self-escalation.

## Existing dirty-state treatment

- Preserve the current uncommitted immediate `DELIVERY_CONFIRMED` behavior and its focused
  test as authorized product work.
- Surgically remove only the current uncommitted handoff-118 PERSONAL-result additions
  from `src/application/slack-pilot/outbox.ts`; its final bytes and final diff must equal
  `a3f48d0` exactly.
- Surgically remove only the superseded handoff-118 direct-result method/import additions
  from `composition.ts`, while preserving the immediate `DELIVERY_CONFIRMED` delta.
- Preserve the two pre-existing untracked R2 artifacts unchanged and unstaged.

Do not use reset, checkout, force push, history rewrite, wildcard cleanup, or broad restore.

## Leo product boundary

The legacy Git/evidence/default path is frozen. In `PERSONAL_LEO_ONLY`, bypass all
per-message Git, evidence artifacts/hashes, ACK/INTAKE/RESULT evidence, receive grants,
root limits, evidence outbox/manual reconciliation, and global latching for ordinary
message-local failures. Do not delete, refactor, test, or review the legacy path. Default
and non-personal behavior remains unchanged.

Startup still validates once: trusted Leo identity, secret, fixed workspace/App/channel,
durable-state integrity, and fixed `agent-office-advisor` tmux destination `%26`.

## Required surgical behavior

1. Preserve exact Slack event dedupe and immutable root-thread correlation for chat routing.
2. Queue valid Leo messages sequentially, deliver each to fixed `%26`, and immediately post
   the existing idempotent same-thread `DELIVERY_CONFIRMED` after durable delivery.
3. Add exactly one fixed, contained local-result spool adapter. It is shared by one fixed
   Advisor result action and the foreground owner; it is not a generic IPC framework.
4. The Advisor action accepts only bounded answer text. It derives the sole pending,
   delivered message's request id, source event id, and `thread_ts` internally. It accepts
   no caller-selected intake/request, path, channel, profile, target, command, or authority.
5. Refuse zero/multiple/undelivered/already-terminal pending messages and any startup
   identity/durable-state corruption. Ordinary result or projection failure affects only
   that message.
6. The foreground Gateway consumes one spool result exactly once, posts the bounded answer
   directly through the fixed Slack Web binding to the immutable same thread, records
   consumed or message-local failure, marks that message complete, resets, and continues
   with the next queued Leo message.
7. Leo never reports `sent`; no per-message manual authorization, Git action, evidence
   polling, or response window is used.

## Frozen implementation allowlist

Final product paths:

- `src/runtime/as1-slack-pilot/composition.ts`
- `src/runtime/as1-slack-pilot/cli.ts`
- `src/application/slack-pilot/service.ts`
- `src/adapters/gateways/slack-pilot/personal-result-spool.ts` (the only new adapter)
- `tests/integration/as1-slack-live-composition.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`

Cleanup-only path, final diff required to be zero:

- `src/application/slack-pilot/outbox.ts`

No other path may change. Change fewer final paths when possible.

## Exact focused tests only

- `npx vitest run tests/integration/as1-slack-live-composition.test.ts -t "handles two sequential PERSONAL_LEO_ONLY messages with same-thread replies and dedupe"`
- `npx vitest run tests/operations/as1-slack-lifecycle.test.ts -t "isolates one PERSONAL_LEO_ONLY result failure and accepts the next message"`
- changed-file ESLint for final changed implementation/test paths only;
- exact-range `git diff --check a3f48d09d85bc1882fc99b2f265c4dd8da1f70cf..HEAD` after commit;
- prove `git diff a3f48d09d85bc1882fc99b2f265c4dd8da1f70cf -- src/application/slack-pilot/outbox.ts` is empty.

Use these exact test names. Do not run either whole test file, any full suite, broad lint,
typecheck, build, or unchanged-code test/review.

## Forbidden

No legacy outbox/evidence redesign or review; Git; evidence artifact/hash; receive grant;
root limit; database; versioned evidence schema; new server; generic IPC/workflow framework;
UI; systemd; shell-execution path; dynamic route/profile/target; cleanup phase; design
document; extra test; broad validation; or unrelated file.

## Result and review

Within the remaining 60-minute box, commit and non-force push one complete candidate or
return one concrete code blocker. Return final HEAD, exact paths, and the two filtered-test
results to `agent-office-advisor`. The same independent `agent-office-reviewer` reviews
only final changed hunks and those exact test results. The Worker must not self-review.
