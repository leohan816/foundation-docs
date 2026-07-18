# PERSONAL_LEO_ONLY Direct Result Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PERSONAL_LEO_ONLY_DIRECT_RESULT`

STATUS: `SUPERSEDES_HANDOFF_117`

FROM: `agent-office-advisor`

TO: `agent-office-opus`

REPOSITORY: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

BRANCH: `feature/as1-phase-b-live-pilot-001`

REMOTE_BASELINE: `a3f48d09d85bc1882fc99b2f265c4dd8da1f70cf`

AUTHORIZED_EXISTING_DIRTY_DELTA: the current uncommitted Behavior-1 changes in
`composition.ts` and `as1-slack-live-composition.test.ts`; preserve and include them in the
final candidate. Preserve the two pre-existing untracked R2 artifacts unchanged and
unstaged.

SKILL: `/fable-builder`

PROFILE: current verified Opus 4.8 Max Worker profile; no profile change or self-escalation.

## Leo product decision

For `PERSONAL_LEO_ONLY`, per-message Git evidence, commits, pushes, and provenance checks
are removed from the answer hot path. Trusted startup validation, fixed
Leo/workspace/App/channel/`%26` destination, internal one-message authority, sequential
processing, idempotent same-thread statuses, and message-local failure isolation remain.
Default and non-personal modes remain unchanged.

## Required behavior

1. Preserve the authorized Behavior-1 delta: after durable exact transport success,
   immediately and idempotently post the existing same-thread `DELIVERY_CONFIRMED`; later
   processing must not duplicate it.
2. Add one fixed local Advisor result action available only in `PERSONAL_LEO_ONLY`. Its only
   caller value is bounded answer text.
3. Derive the sole current delivered intake, profile, root/thread, channel, and authority
   internally from the fixed `leo-v1` durable state. Accept no caller-selected intake,
   repository, path, branch, channel, profile, tmux target, command, or authority.
4. Refuse zero or multiple candidate intakes, an undelivered intake, any global/profile
   latch, or an already-terminal intake.
5. Atomically record exactly one message-local result using the existing file-store
   ownership and idempotence boundaries. The foreground owner projects that bounded answer
   through the existing profile-bound same-thread outbox and then resets for the next Leo
   message.
6. A result or projection failure is local to that message unless it proves credential,
   identity, fixed destination, or durable-state corruption. No Git artifact, commit, push,
   or provenance operation occurs in this personal result path.
7. Add one narrow PERSONAL-result send surface to the existing outbox. It is callable only
   from the composition's `PERSONAL_LEO_ONLY` path after the composition derives the sole
   intake. Its only external value is bounded answer text. The outbox derives the
   deterministic identity and immutable root/channel/thread, renders `RESULT [COMPLETED]`,
   and reuses the existing `runOutbox` idempotence, retry, and reconciliation machinery.
   Existing branded/default `send` and fixed `sendStatus` behavior remain unchanged.

## Frozen implementation allowlist

- `src/runtime/as1-slack-pilot/composition.ts`
- `src/runtime/as1-slack-pilot/cli.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/application/slack-pilot/outbox.ts`
- `tests/integration/as1-slack-live-composition.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`

Change fewer paths when possible. No path outside this list may change.

## Exact focused validation only

- `npx vitest run tests/integration/as1-slack-live-composition.test.ts -t "posts DELIVERY_CONFIRMED immediately and idempotently after durable transport"`
- `npx vitest run tests/operations/as1-slack-lifecycle.test.ts -t "publishes one fixed PERSONAL_LEO_ONLY local Advisor result and resets for next message"`
- changed-file ESLint for changed allowlisted files only;
- exact-range `git diff --check a3f48d09d85bc1882fc99b2f265c4dd8da1f70cf..HEAD` after commit.

Use these exact names for the two tests. Do not run either whole test file, a full suite,
broad lint, typecheck, build, or unchanged-surface checks.

## Forbidden

No direct Web-post bypass; per-message Git evidence or provenance; design document; new
phase; generic IPC, workflow, or Git framework; database; Registry; UI; systemd;
shell-execution path; routing/profile/target/default-mode change; extra test; broad
validation; or unrelated file.

## Result and review

Within 60 minutes, commit and non-force push one complete candidate containing both
behaviors, or return one concrete blocker without another partial commit. Return the final
HEAD, exact paths, and exact filtered-test evidence to `agent-office-advisor`. The same
independent `agent-office-reviewer` reviews only `a3f48d0..final` and the two named tests.
The Worker must not self-review.
