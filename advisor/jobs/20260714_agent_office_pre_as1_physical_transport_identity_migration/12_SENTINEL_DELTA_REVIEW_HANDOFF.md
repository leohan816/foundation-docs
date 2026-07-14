# Same-Sentinel Delta Re-review Handoff

MISSION_ID: `AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

REVIEW_CLASS: `IMPLEMENTATION_SECURITY_AUTHORITY_DELTA_REREVIEW`

TARGET_REVIEWER: `agent-office-reviewer`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

TARGET_WORKTREE:
`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

GOVERNANCE_WORKTREE:
`/home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

PATCH_BASE: `9a7e9444208b613752dc4ab42e23b3cc70cc1516`

SOURCE_CANDIDATE: `1a4e1e98a0ea07c3f383da3761792298cd807f29`

EVIDENCE_HEAD: `d240d8992f69327b712c9fa4a1dea97194edd1ae`

PRIOR_REVIEW_RESULT:
`advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/08_SENTINEL_REVIEW_RESULT.md`

ADVISOR_VALIDATION:
`advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/11_ADVISOR_SENTINEL_PATCH_VALIDATION.md`

## Required Entry

1. Load the required Sentinel skill and current Reviewer authority directly.
2. Verify the immutable commits, ancestry, clean worktree, configured upstream,
   and exact same Reviewer process/session identity.
3. Inspect `9a7e944..1a4e1e98` source/test delta before reading the revised Worker
   conclusion. Separately verify that `1a4e1e98..d240d899` is evidence-only.
4. Read the prior F01/F02 result, `09`, `09A`, `09B`, and Advisor validation.

## Delta Review Scope

Determine only whether:

- F01 is closed by complete exact cell and canonical row-shape validation;
- the process cell accepts the real current annotation grammar but rejects
  token contamination, arbitrary semicolon suffixes, and appended text;
- truncation, extra columns, duplicate rows, fabricated labels, and wrong
  locator rows fail closed;
- F02 is closed and no unclassified active legacy physical target remains in
  the changed source/test surface;
- the real current Registry row and live read-only tmux metadata correspond;
- Worker result/pointer now accurately satisfy the active result protocol;
- the evidence-only amendment contains no source/test/config change;
- all previously passed authority, safety, historical-evidence, and forbidden
  scope conclusions remain unaffected by this exact delta.

Do not repeat broad product, UI, Living Office, VibeNews, Slack, dependency,
historical, or unrelated security review.

## Proportionate Independent Gates

- inspect the exact source/test/evidence diffs;
- reproduce the exact-delivery integration test file;
- reproduce TypeScript typecheck;
- focused ESLint on the changed source and test;
- exact diff checks for source and evidence deltas;
- targeted old/current physical-reference classification;
- read-only live destination metadata observation only if needed to refresh the
  prior correspondence result.

Do not send tmux input, exercise delivery, activate transport, start Slack/AS1,
patch the candidate, commit, push, merge, accept risk, or begin another mission.

## Verdict Contract

Return exactly one of:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Write only:

- `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/12_SENTINEL_DELTA_REVIEW_RESULT.md`
- `advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration/12_SENTINEL_DELTA_REVIEW_RESULT_POINTER.md`

inside the governance worktree. Return to `agent-office-advisor` and STOP.
