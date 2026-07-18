# Handoff 122: PERSONAL Slack FIFO Thread Routing

## Authority

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Implementation base: `07b6a6cb617e935227f97a4fb07f18cecd5f7a77`
- Worker: `agent-office-opus`, current verified profile, `/fable-builder`
- Reviewer: same independent `agent-office-reviewer`

## Confirmed live defect

A second valid Leo message received while the first answer is pending enters the
PERSONAL in-memory FIFO but is not delivered after the first result completes.
`resetForNextLeoRoot()` clears the legacy `lastIntakeId`, and `deliverPending()`
checks that scalar before consulting the PERSONAL FIFO. The queued message is
therefore inaccessible even though the direct PERSONAL queue owns its routing
correlation.

## Exact patch

Change only:

- `src/runtime/as1-slack-pilot/composition.ts`
- `tests/integration/as1-slack-live-composition.test.ts`

For `PERSONAL_LEO_ONLY` only, make direct delivery consult its actual FIFO before
the legacy `lastIntakeId` gate. An empty PERSONAL FIFO must return a benign
`AWAITING` result. Keep the non-PERSONAL path unchanged.

Modify only the existing test named:

`handles two sequential PERSONAL_LEO_ONLY messages with same-thread replies and dedupe`

Enqueue both inputs before answer 1: one new top-level message and one reply
carrying a different existing `thread_ts`. Answer them in FIFO order and prove
that each `RESULT [COMPLETED]` is posted to its own exact expected Slack thread.
Preserve the already-reviewed fixed `npm --prefix` Advisor answer command and
its assertion.

## Validation

- Run only the existing integration test filtered by the exact test name above.
- ESLint only the two changed files.
- Exact-range `git diff --check` from the implementation base.
- Confirm `src/application/slack-pilot/outbox.ts` has zero diff.
- Preserve the two pre-existing untracked R2 artifacts unstaged and unchanged.

Commit once and non-force push. Do not add or change any other source, test,
file, service, socket, database, Git-evidence path, grant/root behavior,
documentation, design, framework, routing, target, profile, Foundation or
Strategy behavior. Do not run a full test file, broad test, typecheck, or build.
Timebox: 10-15 minutes. Return one committed candidate or one concrete code
blocker.
