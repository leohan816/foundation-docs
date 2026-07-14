# Independent Sentinel Review Handoff

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

REVIEW_PASS: `IMPLEMENTATION_SECURITY_AUTHORITY_REVIEW`

TARGET_REVIEWER: `agent-office-reviewer`

BASELINE: `88c6cbd757ed205eb1aadd68d8ea7629865d5765`

FIRST_CANDIDATE: `b523b5cf0277badb093c6d1046d71ff3f414446c`

CANDIDATE: `9a7e9444208b613752dc4ab42e23b3cc70cc1516`

TARGET_WORKTREE:
`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

GOVERNANCE_WORKTREE:
`/home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

## Mandatory Entry

1. Verify candidate and baseline exactly; do not review mutable summaries.
2. Read current Agent Office Reviewer authority from:
   - `docs/agent/TEAM_OPERATING_MODEL.md`
   - `docs/agent/roles/reviewer.md`
   - `docs/agent/RUN_PROTOCOL.md`
   - `docs/agent/RESULT_REPORTING_PROTOCOL.md`
3. Directly hash-verify and load:
   `/home/leo/Project/skill/fable-sentinel/SKILL.md`
   expected SHA-256:
   `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
4. Load only the Sentinel contract/provenance/classification references needed
   for this review. If the skill's historical role pointer conflicts with the
   current Agent Office role documents, current Agent Office authority controls
   and the conflict must be reported.

## Review Order

1. Inspect the actual baseline-to-candidate diff and the narrower
   first-candidate-to-candidate patch before reading the Worker conclusion.
2. Verify exact physical destination and current live-observation correspondence.
3. Verify the real canonical session-registry row is structurally accepted and
   fabricated, duplicate, malformed, old, or caller-selected targets fail closed.
4. Verify activation v1 and the historical 20260711 readiness/evidence path
   cannot authorize the current route.
5. Verify v2 requires the exact current 01A Git artifact path, exact hash/current
   upstream bytes, and its current-destination and prohibition semantics.
6. Verify historical activation/evidence artifacts alone are insufficient,
   remain unmodified, and cannot resolve or fall back to the old destination.
7. Verify authority subject, decision/intake/ACK lineage, one-use capability,
   two-preflight behavior, kill switch, manual fallback, and journal behavior
   were not weakened.
8. Verify no VibeNews, Slack/AS1, transport activation, tmux input, DB, secret,
   remote/public/production, dependency, or unrelated product change.
9. Verify Worker result accuracy and the clean/upstream-equal candidate state.

## Targeted Reproduction

- `npx vitest run --maxWorkers=1` for exactly:
  - `tests/integration/exact-advisor-delivery.test.ts`
  - `tests/integration/decision-authority-evidence.test.ts`
  - `tests/integration/advisor-inbox.test.ts`
  - `tests/recovery/advisor-message-crash-consistency.test.ts`
- `npm run typecheck`
- focused ESLint on the six changed source/test paths
- `git diff --check` for the exact baseline/candidate
- targeted active physical-target search
- read-only live tmux observation of `agent-office-advisor`; no tmux input

Do not run broad product, UI, visual, Living Office, Slack, VibeNews, dependency,
or unrelated security suites.

## Output

Write only:

- `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/08_SENTINEL_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/08_SENTINEL_REVIEW_RESULT_POINTER.md`

inside the governance worktree. Do not commit, push, patch product source, alter
the candidate branch, or send tmux input to the Advisor.

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
List findings first with exact file/line evidence. Return to
`agent-office-advisor` and STOP.
