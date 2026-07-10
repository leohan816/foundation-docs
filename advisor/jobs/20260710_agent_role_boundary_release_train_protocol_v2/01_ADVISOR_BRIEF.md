# Advisor Brief - Agent Role Boundary and Release Train Protocol V2

Decision: `PROCEED_WITH_LIMITS`

## Repo-Grounded Inventory

| Workspace | Active entry files | Detailed role reference | Branch at intake | Existing dirty state |
|---|---|---|---|---|
| Advisor | `AGENTS.md`, `CLAUDE.md`, `README.md` | local `AGENTS.md`; GitHub mirror exists but already has unrelated tracked edits | not a Git repo | local files only |
| Cosmile | `CLAUDE.md`, `app/CLAUDE.md`, `app/AGENTS.md` | `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` | `shadow/m4-cosmile-memory` | six unrelated untracked `app/docs/*.md` files |
| SIASIU | `CLAUDE.md` | `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` | `shadow/m4-siasiu-memory` | three unrelated untracked `docs/*.md` files |
| foundation-control | `CLAUDE.md` | `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, active pointer to `docs/OPERATING_MODEL_20260629.md` | `shadow/m5-ingress-gate` | unrelated untracked docs and design files |
| Foundation | `CLAUDE.md` | no existing agent run/result protocol | `shadow/foundation-shared-memory-v0` | two unrelated untracked docs/design files |
| foundation-docs | `README.md` | `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md` | `main` | pre-existing tracked/untracked Advisor changes outside this job |
| Fable5 | `fable-sentinel/SKILL.md` | `fable-sentinel/references/review-classification.md` and other review references | `main` | clean |

No root `AGENTS.md` exists in Cosmile, SIASIU, foundation-control, Foundation,
foundation-docs, or skill. `Cosmile/app/AGENTS.md` exists and is scoped to the
application directory. No `.claude/rules` files were found in the target
workspaces; Foundation and foundation-control contain only scheduled-task lock
files under `.claude/`.

## Load-Bearing Conflicts

1. Active 2026-06-29 instructions suspend the Foundation Worker.
2. Active foundation-control instructions claim unbounded cross-project authority.
3. Control master-design and foundation-control implementation modes are not
   separated.
4. Current Fable5 instructions do not require separate design and implementation
   pass artifacts under the new V2 terminology.
5. Existing run protocols identify Advisor as controller but do not define the
   evidence-based exception audit levels or release-train fast/high-risk split.
6. Foundation has no active agent run/result reference.

## Limits

- The foundation-advisor workspace is not a Git repository; local entry changes
  cannot receive a repository commit.
- The existing foundation-docs Advisor mirror files are already modified by older,
  unrelated protocol work. This mission will not stage those pre-existing diffs.
  The canonical V2 file and the actual local Advisor entry files are the review
  targets for Advisor propagation.
- Session reload remains blocked until Fable5 returns `PASS`.

## Completion Criteria for Propagation Phase

- Canonical V2 contains all 23 required subjects.
- Every actual actor entry/reference points to V2 with a short local role boundary.
- Obsolete active Control/Foundation suspension rules are replaced or visibly
  superseded.
- No runtime source file changes.
- Repo-specific staged sets contain only protocol migration files.
- All commits/pushes and exclusions are recorded for Fable5 review.

