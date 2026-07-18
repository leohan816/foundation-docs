# PERSONAL_LEO_ONLY Live Latency Defect Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PERSONAL_LEO_ONLY_LIVE_LATENCY_DEFECT`

FROM: `agent-office-advisor`

TO: `agent-office-opus`

REPOSITORY: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

BRANCH: `feature/as1-phase-b-live-pilot-001`

EXACT_BASELINE: `46d31e8ab7d595b544e392b55f9814891c65ebd2`

SKILL: `/fable-builder`

PROFILE: current verified Opus 4.8 Max Worker profile; no profile change or self-escalation.

## Authorized behavior

1. In `PERSONAL_LEO_ONLY` only, immediately after exact transport has durably returned
   `TRANSPORT_RECORDED` / `DELIVERED`, post the existing same-thread
   `DELIVERY_CONFIRMED` status idempotently. A later accepted Advisor ACK must not post a
   duplicate. Default-mode behavior remains unchanged.
2. Provide one fixed Advisor action for the current pending Agent Office message. The only
   caller value is one bounded result summary. The action derives intake, profile,
   repository, branch, evidence prefix, paths, authority, correlations, IDs, hashes, and
   timestamps from the exact fixed `leo-v1` durable records and the fixed current mission
   governance worktree. It emits the existing exact `ACK -> INTAKE -> result-artifact ->
   RESULT` schemas and performs only the required two provenance commits and non-force
   pushes. It must reject ambiguity, dirty/diverged governance state, a missing durable
   `TRANSPORT_RECORDED` record, latch, or malformed state. No caller-selected intake,
   repository, path, branch, tmux target, profile, or authority is permitted.

## Frozen path allowlist

- `src/runtime/as1-slack-pilot/composition.ts`
- `src/runtime/as1-slack-pilot/cli.ts`
- `tests/integration/as1-slack-live-composition.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`

Change fewer paths when possible. Preserve the two pre-existing untracked R2 artifacts
unstaged. No path outside this allowlist may change.

## Focused validation only

- `npx vitest run tests/integration/as1-slack-live-composition.test.ts -t "posts DELIVERY_CONFIRMED immediately and idempotently after durable transport"`
- `npx vitest run tests/operations/as1-slack-lifecycle.test.ts -t "publishes exact evidence through one fixed Advisor action"`
- changed-file ESLint for changed allowlisted files only;
- exact-range `git diff --check 46d31e8ab7d595b544e392b55f9814891c65ebd2..HEAD`.

The Worker must use these exact names for the two new tests. Do not run either full test
file, any full suite, broad lint, typecheck, build, design review, or unchanged-surface
review.

## Forbidden

No new phase, design document, architecture/security redesign, database, Registry,
framework, UI, systemd, routing/target/profile change, caller-selected authority input,
broad abstraction, or unrelated behavior. Do not restart Slack or touch live secrets.

## Result and review

Commit and non-force push one narrow candidate within 20 minutes. Return the exact commit,
changed paths, and focused evidence to `agent-office-advisor`. The same independent
`agent-office-reviewer` then reviews only this delta and these two behaviors. The Worker
must not self-review.
