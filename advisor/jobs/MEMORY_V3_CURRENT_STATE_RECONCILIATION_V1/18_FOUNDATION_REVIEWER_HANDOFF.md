# Foundation Reviewer Handoff — Memory V3 M1 Current-State Audit Review

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M1-INDEPENDENT-CURRENT-STATE-AUDIT-REVIEW
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: INDEPENDENT_REVIEWER
REVIEW_PASS: CURRENT_STATE_AUDIT_REVIEW
REQUIRED_SKILL: /fable-sentinel
REQUIRED_EFFORT: max
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor
```

## Exact committed review subject

```text
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_HEAD: 137b655016a875710695acaae898b160d5029ca8
SUBJECT_BASE: 1cfb63834f36f1cf1f96148c1797add2e319a7e0
VERDICT_TARGET_PATH: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/16_M1_INTEGRATED_BASELINE_CANDIDATE.md
POINTER_PATH: advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/17_M1_INTEGRATED_BASELINE_POINTER.md
```

The candidate integrates these actor-owned evidence files in the same subject
ancestry:

```text
runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/CONTROL_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/FOUNDATION_WORKER_RESULT.md
runs/siasiu/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/SIASIU_WORKER_RESULT.md
runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/COSMILE_WORKER_RESULT.md
```

Evidence commits:

```text
CONTROL_RESULT_CURRENT: 1cfb63834f36f1cf1f96148c1797add2e319a7e0
FOUNDATION_RESULT: 7f69486102a5b6458465d49f34aef6e172d8d264
SIASIU_RESULT: 934f5d092519082dc661eaf781d121b000fe6936
COSMILE_RESULT: 68d52a0805b8e8df74c82a96c04833c015111d77
```

## Required reads

Read these exact current-authority and mission files directly:

```text
/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
/home/leo/Project/agent-office/docs/agent/roles/reviewer.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/00_EXACT_MISSION_HANDOFF_DRAFT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/16_M1_INTEGRATED_BASELINE_CANDIDATE.md
```

Read every actor-owned result and the exact code/schema/history evidence needed to
verify the candidate. Do not trust Advisor or actor prose until direct evidence
supports it.

Project-local authority entry files:

```text
/home/leo/Project/FOUNDATION/AGENTS.md
/home/leo/Project/FOUNDATION/CLAUDE.md
/home/leo/Project/SIASIU/AGENTS.md
/home/leo/Project/SIASIU/CLAUDE.md
/home/leo/Project/Cosmile/AGENTS.md
/home/leo/Project/Cosmile/CLAUDE.md
```

The foundation-control workspace is evidence only for cross-project
contract/history analysis. Its stale historical implementation-mode text does not
expand current Control or Reviewer authority.

## Allowed reads and actions

- Read-only Git, source, schema, migration, tests, and historical evidence
  inspection in FOUNDATION, SIASIU, Cosmile, foundation-control, and the exact
  foundation-docs mission worktree.
- Verify exact branch/HEAD/status without `git fetch`.
- Use `git show`, `git diff`, `git status`, `rg`, and other non-mutating local
  inspection commands.
- If and only if a test's complete safety conditions are independently proven
  before execution, reproduce the smallest relevant read-only test at actual
  `max`. Tests are not mandatory merely to repeat actor execution. Do not run any
  DB-touch or uncertainty-bearing test.
- Write only the Reviewer-owned result and pointer paths below.

## Required review checks

Independently verify:

1. Git baseline accuracy and remote-freshness disclosure.
2. Product repository writes = 0 and foundation-control writes = 0.
3. DB query/connection/migration = 0; feature/config/flag change = 0.
4. Evidence pointer and subject integrity.
5. Every V3-00..V3-12 status classification uses only the allowed statuses and
   keeps `REMAINING_DELTA` separate.
6. `UNKNOWN` is not filled by inference.
7. Repository-owner evidence wins where Control inventory was incomplete.
8. The outbox facts are exact: a pre-existing contained write-only queue exists;
   there is no consumer/delivery; code-authorization provenance remains UNKNOWN.
9. The event/outcome flow, MemoryFactCandidate, safety, product/ingredient,
   analytics, stale/duplicate/superseded, and remaining-delta sections match code
   and evidence.
10. The `sessionId` finding is classified into current behavior, intended
    contract, privacy/attribution impact, and Founder decision rather than guessed.
11. Test execution and non-execution claims meet the mission safety rules.
12. M2, M3, Package 1B, and any next mission were not started or preauthorized.
13. The proposed likely M2 scope is evidence-based and not overstated.

## Review scope boundaries

```text
M1: REVIEW THIS BASELINE ONLY
M2: NOT_AUTHORIZED
M3: NOT_AUTHORIZED
PACKAGE_1B: NOT_AUTHORIZED
NEXT_MISSION: NOT_AUTHORIZED
```

Forbidden:

- Modify the candidate, actor evidence, product/control files, schema, migration,
  fixture, snapshot, seed, config, lockfile, flags, runtime state, or history.
- DB query/connection/migration, secret access, provider/network calls, `git fetch`,
  branch action, commit, push, or risk acceptance.
- Patch a finding, dispatch another actor, contact a Worker, broaden scope, or grant
  final closure.

## Required output

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/FOUNDATION_REVIEWER_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/FOUNDATION_REVIEWER_RESULT_POINTER.md
```

Result must include:

```text
MISSION_ID
REVIEW_ID
ACTOR_ID
ACTUAL_SESSION
ACTUAL_MODEL
EFFORT
WORKSPACE
REQUIRED_SKILL
INDEPENDENCE
REVIEW_PASS
SUBJECT_BASE
VERDICT_TARGET_HEAD
VERDICT_TARGET_PATHS
FILES_READ
DIFF_READ
CANONICAL_REFERENCES_READ
COMPLETION_CRITERIA_CHECKED
EXCLUDED_SCOPE
COMMANDS_EXECUTED
TESTS_REPRODUCED
VERDICT: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
BLOCKING_FINDINGS
NON_BLOCKING_FINDINGS
AUTHORITY_CONFLICTS
RUNTIME_CHANGE_CHECK
DIRTY_FILE_CHECK
REQUIRED_PATCHES
RESIDUAL_RISKS
M2_STARTED: NO
M3_STARTED: NO
PACKAGE_1B_STARTED: NO
NEXT_MISSION_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

Return only a compact pointer block to `foundation-advisor` and STOP. A
`NEEDS_PATCH` verdict must identify exact finding IDs, exact evidence, and the
narrowest affected artifact paths. Do not patch them yourself.
