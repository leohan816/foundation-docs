# Worker Sentinel Finding Patch Handoff

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

PATCH_CLASS: `ROUTINE_NARROW_SENTINEL_FINDING_CLOSURE`

REVIEW_RESULT_COMMIT: `8003544a422f3aa2dd0fdcc090f991de6bbfa939`

BASE_CANDIDATE: `9a7e9444208b613752dc4ab42e23b3cc70cc1516`

TARGET_WORKER: `agent-office-opus`

TARGET_WORKTREE:
`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

REQUIRED_SKILL: `/fable-builder`

## Accepted Reviewer Findings

Read the exact independent result and close only its two findings:

`advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/08_SENTINEL_REVIEW_RESULT.md`

### F01 — HIGH — registry cells are not validated as complete values

`assertRegistry` uses a start-anchored backtick extractor and accepts both
suffix-contaminated identity/location cells and a row truncated after the
process column. This contradicts the required exact structural authority fence.

### F02 — LOW — stale legacy pane token remains in a test title

The test title at the current exact-delivery integration surface says
`paste-to-%9`, while the assertions correctly require `%26`.

## Exact Required Patch

1. Replace the shared loose registry-cell extractor with explicit validation:
   - session, observed session ID, observed window ID, observed pane ID, and
     workspace cells must each be the complete exact Markdown code cell and
     contain no prefix or suffix;
   - index cells must be the complete exact decimal value `0`;
   - the Actor label must be exactly `Agent Office Advisor`;
   - the row must have the complete canonical 11-column table shape, including
     both role-evidence and dispatch-status cells, rather than accepting a row
     truncated after the process column;
   - the process cell must identify exactly the `codex` command and may retain
     only the explicitly validated current registry command/version observation
     annotation shape. It must not accept `` `codex`JUNK `` or arbitrary suffix
     contamination.

2. Continue requiring exactly one matching current Advisor row. Preserve the
   exact current destination `agent-office-advisor/$26/@26/%26`, indexes `0/0`,
   and workspace `/home/leo/Project/agent-office`.

3. Add targeted negative tests for:
   - suffix contamination on each authority-bearing identity/location cell;
   - suffix contamination on the process command token;
   - a row truncated after the process column;
   - a row with an unexpected extra structural column.

4. Retain a positive test using the actual current canonical registry row,
   including its accepted process observation annotation. Preserve the existing
   fabricated-label, duplicate-row, and wrong-pane negative cases.

5. Rename the stale `paste-to-%9` test title to `%26`. Confirm that remaining
   legacy physical-target tokens are confined to classified historical-negative
   fixtures or immutable evidence references.

6. Correct the durable Worker result so it no longer overstates the prior
   malformed-row closure. Record the exact patch, every command/result, and the
   updated search classification. Refresh the pointer for the new candidate.

## Allowed Files

- `src/adapters/gateways/tmux-advisor/exact-authority.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `artifacts/pre-as1-physical-transport-identity-migration/WORKER_RESULT.md`
- `artifacts/pre-as1-physical-transport-identity-migration/WORKER_RESULT_POINTER.txt`

Request an Advisor scope correction before touching any other path.

## Targeted Gates Only

- the exact-delivery integration test file;
- TypeScript typecheck;
- ESLint on the two changed TypeScript/test paths;
- `git diff --check` from `9a7e9444208b613752dc4ab42e23b3cc70cc1516`;
- targeted legacy physical-target search over the changed active source/test
  surface, with intentional historical-negative fixtures explicitly classified.

Do not rerun broad product, UI, Living Office, Slack, VibeNews, dependency, or
unrelated security suites. Do not edit governance or historical evidence. Do
not merge, activate transport, send tmux input to Advisor, start Slack/AS1,
modify another worktree/session, or begin another mission.

Commit and non-force push the same candidate branch. Return the patched result
to `agent-office-advisor` and STOP for exact same-Reviewer delta re-review.
