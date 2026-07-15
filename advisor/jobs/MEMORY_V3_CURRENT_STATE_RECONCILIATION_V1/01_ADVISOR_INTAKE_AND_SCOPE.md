# Advisor Intake and Scope

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
MISSION_TYPE: READ_ONLY_AUDIT
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_PROJECT: CROSS_PROJECT
RESPONSIBLE_ADVISOR: foundation-advisor
ROLE_INSTANCE_ID: foundation-advisor-20260714-01
RISK: HIGH
LEO_DECISION_REQUIRED: NO
M1: AUTHORIZED
M2: NOT_AUTHORIZED
M3: NOT_AUTHORIZED
PACKAGE_1B: NOT_AUTHORIZED
NEXT_MISSION: NOT_AUTHORIZED
```

## Authority and evidence

- Current authority: `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md` and matching role files.
- Exact mission handoff: `00_EXACT_MISSION_HANDOFF_DRAFT.md` at commit `bd75ffffd5f7ceb62685c0cae23a9d738297623c`, blob `6a293dd579578744a03a3ccfcabac8e3016c488a`.
- Product-local rules: each repository's `AGENTS.md` and `CLAUDE.md` (Control has `CLAUDE.md`; no repository `AGENTS.md` was present at intake).
- Historical Foundation V3 records are evidence, not current role authority.
- The implementation modes described in the historical `foundation-control/CLAUDE.md` do not authorize implementation in this mission. Current Control authority is read-only contract/history analysis only.

## Required route

```text
foundation-control -> durable Control result + pointer -> foundation-advisor
foundation Worker -> durable FOUNDATION result + pointer -> foundation-advisor
siasiu Worker -> durable SIASIU result + pointer -> foundation-advisor
cosmile Worker -> durable Cosmile result + pointer -> foundation-advisor
foundation-advisor -> integrated M1 candidate
foundation-reviewer-fable5 -> independent result + pointer -> foundation-advisor
foundation-advisor -> final audit + pointer -> Leo/GPT -> STOP
```

No subordinate may dispatch, negotiate scope with, or return results directly to another subordinate.

## Intake Git baseline

Captured without `git fetch` before dispatch. Existing untracked files are user-owned and must remain unchanged.

| Workspace | Branch | HEAD | Upstream | Ahead/behind | Intake dirt |
|---|---|---|---|---|---|
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `f6417004d9157766b2b23d4d0870ade7f0c7fe96` | `origin/shadow/foundation-shared-memory-v0` | `0/0` from local refs | 2 untracked files |
| SIASIU | `shadow/m4-siasiu-memory` | `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602` | `origin/shadow/m4-siasiu-memory` | `0/0` from local refs | 3 untracked files |
| Cosmile | `shadow/m4-cosmile-memory` | `6e44aa40ffb2960573839a01424761dc5e98d610` | `origin/shadow/m4-cosmile-memory` | `0/0` from local refs | 6 untracked files |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | `origin/shadow/m5-ingress-gate` | `0/0` from local refs | 30 untracked files |
| selected foundation-docs worktree | `advisor/foundation-team-role-alignment-20260714` | `bd75ffffd5f7ceb62685c0cae23a9d738297623c` | none | unknown/not applicable | clean before these mission artifacts |

Remote-tracking freshness is based only on local reflog evidence and is not guaranteed current. No network refresh is authorized.

## Scope and safety

- Product repositories and `foundation-control` are fully read-only.
- The only writes allowed are the exact declared M1 result, pointer, integration, review, and audit paths in this selected foundation-docs worktree.
- No DB connection/query, secret/credential access, provider/network call, fetch, branch operation, source/config/schema/migration/flag change, cleanup, backfill, or production/live access.
- Tests may run only after their safety conditions in the exact mission handoff are proven. Otherwise record `NOT_RUN_SAFETY_UNPROVEN`.
- Actor model, effort, workspace, role, required skill, and independence must be checked live immediately before dispatch.

## Completion criteria

Every V3-00 through V3-12 item is evidence-classified using only the allowed status values; `REMAINING_DELTA` is separate; Git pre/post states prove zero prohibited writes; an independent `/fable-sentinel` review reaches `PASS`, or any accepted risk is explicitly resolved; Advisor final audit returns the reviewed baseline and pointer; all unauthorized missions remain unstarted.

