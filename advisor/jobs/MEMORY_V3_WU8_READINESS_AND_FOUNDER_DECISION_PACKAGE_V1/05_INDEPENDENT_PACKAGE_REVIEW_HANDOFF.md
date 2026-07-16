# Independent Review Handoff — WU8 Founder Decision Package

```text
MISSION_ID: MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1
REVIEW_ID: WU8-FOUNDER-DECISION-PACKAGE-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
ROLE: Independent Reviewer (Sentinel)
REVIEW_PASS: DECISION_PACKAGE_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
VERDICT_TARGET_COMMIT: 6f80adf0a62f1750db97251529890e6ad61286a2
VERDICT_TARGET_FILE: advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/04_FOUNDER_DECISION_PACKAGE.md
VERDICT_TARGET_BLOB: aea90c1c4209acb25d0cf2450aa3f27ce5d08924
VERDICT_TARGET_SHA256: 07b3746cc1a0a3f3848f3aa2acbe2751c3228a93266d902df1aa3c4c0be4ec0f

FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f

ACTUAL_MODEL: verify live before work
EFFORT: max — set and verify live before work
REQUIRED_SKILL: /fable-sentinel
```

## Required reads

Read directly:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- exact mission handoff `00_EXACT_MISSION_HANDOFF.md` at
  `d1e0272208c50818e2c6f40fb7af77d21ecf4de2`
- exact package subject at the pinned commit/blob/SHA above
- Control evidence at commit `ec81b5490030f27c36d1ce69c8eb1f774babb91d`:
  `runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/CONTROL_READ_ONLY_ANALYSIS_RESULT.md`
- WU7 implementation review and Advisor C final audit from the prior mission
- pinned Foundation and Cosmile source only as necessary to reproduce load-bearing facts

## Review objective

Independently determine whether the package is a trustworthy, complete, bounded Founder
decision basis. Verify at minimum:

1. D8-1 through D8-5 each contain verified facts, one exact unresolved question, no more
   than three concrete options, an Advisor recommendation, implementation consequence,
   privacy/security/safety consequence, deferred scope, and correct decision owner.
2. Facts match the exact pinned evidence and do not convert `source_hash` into
   authentication, a consent snapshot into current consent, an ephemeral ledger into
   durability, or review-only DTOs into current candidates.
3. Options are materially distinct, feasible as future design directions, and do not
   silently authorize code, credentials, network, DB, flags, delivery, intake, runtime,
   production/live, Full Package 1B, or M3.
4. The package preserves:
   `accepted evidence != eligibility != review-only draft != approval != reuse != runtime application`.
5. D8-4 never fabricates `furef_v2` or coerces adverse retention.
6. D8-5 makes no legal/jurisdiction conclusion and presents no guest exception absent
   evidence of need.
7. Security/Legal/Foundation-architecture decision ownership and fail-closed defaults are
   accurately stated.
8. The minimum design scope, four authority boundaries, execution sequence, safe
   deferrals, activation blockers, and no-auto-authorization statement are complete and
   mutually consistent.
9. Worker and Designer non-use is justified by evidence rather than convenience.
10. Product and Control repositories remain unchanged and HARD STOP remains active.

Do not select Founder options, accept risk, grant implementation authority, or treat a
review verdict as final product approval.

## Allowed writes

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/FOUNDER_DECISION_PACKAGE_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/FOUNDER_DECISION_PACKAGE_REVIEW_RESULT_POINTER.md
```

Do not patch the package or any evidence. Do not stage, commit, or push.

## Verdict and patch loop

Return exactly one of `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL` with evidence.

If `NEEDS_PATCH`, list bounded finding IDs and the minimum artifact-only changes. The
same Advisor will modify only the package, and this same Reviewer/session will perform a
delta-only re-review of the old package commit to the new package commit. Do not patch.

```text
PRODUCT_OR_CONTROL_WRITE: forbidden
DB_NETWORK_SECRET_CREDENTIAL_FLAG_RUNTIME: forbidden
IMPLEMENTATION_OR_DELIVERY: forbidden
NEW_AGENT_SUBAGENT_OR_DISPATCH: forbidden
COMMIT_PUSH: forbidden
WU8_IMPLEMENTATION: NOT_AUTHORIZED
HARD_STOP: ACTIVE
STOP_AFTER_RETURN: true
```
