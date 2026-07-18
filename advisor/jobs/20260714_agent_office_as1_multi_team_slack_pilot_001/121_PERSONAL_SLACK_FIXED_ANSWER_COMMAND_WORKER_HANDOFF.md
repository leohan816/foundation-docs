# Handoff 121: PERSONAL Slack Fixed Answer Command

## Authority

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Implementation base: `2c1286ae45d0925186ff5f92863846629d9063e3`
- Worker: `agent-office-opus`, same current profile, `/fable-builder`
- Reviewer: same independent `agent-office-reviewer`

## Confirmed live defect

The reviewed Slack delivery reached fixed Advisor pane `%26`, but the pasted
answer instruction used bare `npm run as1:slack-pilot`. Pane `%26` works from
`/home/leo/Project/agent-office`, whose current checkout does not expose that
script. The same command succeeds from the authorized live-pilot worktree.

## Exact patch

Change only:

- `src/runtime/as1-slack-pilot/composition.ts`
- `tests/integration/as1-slack-live-composition.test.ts`

Replace only the pasted answer command with this fixed, non-caller-selectable
form:

`npm --prefix /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001 run as1:slack-pilot -- answer "<bounded answer text>"`

In the existing named sequential PERSONAL test, assert that the delivered
Advisor text contains this exact fixed command and does not contain the old
bare command. Do not add a test or change any other behavior.

## Validation

- Run only the existing integration test filtered by:
  `handles two sequential PERSONAL_LEO_ONLY messages with same-thread replies and dedupe`
- ESLint only the two changed files.
- Exact-range `git diff --check`.
- Confirm legacy outbox zero-diff and preserve the two R2 untracked artifacts.

Commit once and non-force push. No other source, test, design, documentation,
build, typecheck, suite, framework, routing, target, profile, or authority work.
Timebox: 10 minutes.
