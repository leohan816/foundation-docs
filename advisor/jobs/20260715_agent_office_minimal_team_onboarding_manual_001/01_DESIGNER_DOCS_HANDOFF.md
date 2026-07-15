# Minimal Team Onboarding Manual - Designer Handoff

MISSION_ID: `AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`

ASSIGNED_ACTOR: `agent-office-designer`

RETURN_TO: `agent-office-advisor`

## Dispatch profile

```text
TASK_COMPLEXITY: LOW_TO_MEDIUM_DOCUMENTATION_CONVERGENCE
RISK_LEVEL: LEVEL_1_DOCUMENTATION_ONLY
FAILURE_COST: CONFUSING_OR_DUPLICATED_ROLE_INSTRUCTIONS
REVERSIBILITY: FULLY_REVERSIBLE_TWO_FILE_COMMIT
CONTEXT_REQUIREMENT: EXISTING_TEAM_MODEL_AND_FIVE_ROLE_FILES
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: canonical product documentation
SELECTED_EFFORT: xhigh
REQUIRED_SKILL: NONE; exact handoff and Designer role apply
WHY_NOT_LOWER: the wording governs five roles and must avoid authority or persistence implications
WHY_NOT_HIGHER: max is unnecessary for a two-file documentation convergence with closed requirements
ESCALATION_TRIGGER: only a material authority conflict or a requirement for a third product path
```

## Product coordinates

- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`
- branch: `feature/minimal-team-onboarding-manual-001`
- exact baseline: `50124a1ea720e162e906c04c6f6fb2591c4974b8`

## Allowed product paths

Modify exactly these two existing files:

1. `docs/agent/TEAM_OPERATING_MODEL.md`
2. `docs/agent/roles/README.md`

No other product or project path may change.

## Required content

Update the existing central operating model rather than creating another
manual. It must define:

1. this exact reusable Advisor instruction:
   `Read the canonical Agent Office operating manual, teach the members of your Team their applicable roles, and work through that routine.`
2. Advisor steps: read central model and Advisor role; resolve only currently
   registered Team Actors; tell each existing Actor to read the project-local
   `AGENTS.md`, `CLAUDE.md`, central model, matching role file, and current exact
   handoff; skip roles that do not exist; use only Leo-nominated or registered
   Workers; collect acknowledgements; correct only conflicts; then operate
   through the existing Advisor-led routine.
3. optional roles: the responsible Advisor is required; Designer, Control,
   Worker, and Reviewer are used only when actually registered/assigned. A Team
   without Control simply skips Control.
4. this exact simple acknowledgement shape, with no persistence claim:

```text
FILES_READ:
ROLE:
RESPONSIBLE_ADVISOR:
MUST_DO:
MUST_NOT_DO:
READINESS: READY | CONFLICT
CONFLICTS: NONE | <concise conflict>
```

5. reread rule: on a new session, role change, or new mission, an Actor rereads
   project entry files, the central model, matching role file, and current
   handoff instead of relying on memory.
6. no database or persistent readiness state; the acknowledgement is ordinary
   textual/Markdown mission evidence only.
7. project `AGENTS.md` and `CLAUDE.md` remain short pointers plus project-local
   rules; common role manuals remain centralized under `docs/agent/`.
8. Advisor execution-profile principle exactly:
   `USE THE LOWEST PROFILE THAT IS SUFFICIENT, BUT NEVER USE AN INSUFFICIENT PROFILE TO SAVE COST OR TIME.`
   Include xhigh when sufficient, max when xhigh is likely insufficient, ultra
   only when max is insufficient, no unjustified stronger profile, no forced
   weaker profile, no silent Actor self-change, and explicit new Advisor
   dispatch when the profile changes.

Update `docs/agent/roles/README.md` as the canonical Role Index. For Advisor,
Designer, optional Control, Worker, and Reviewer, list the exact central role
file and required entry reads. Make clear that role absence is skipped and no
common manual is copied into projects.

## Explicit prohibitions

Do not create or modify any Registry/schema, readiness projection/state,
Actor lifecycle, capability database, workflow engine, runtime source, test,
package/configuration, tmux/Slack/AS1 path, external project, project entry
file, or new documentation path. Do not reuse or import the superseded
21-path design text. Do not dispatch another Actor or self-review.

## Validation and result

- Read the two target files and five existing role files before editing.
- Run `git diff --check`, exact two-path scope validation, Markdown link/path
  checks, and concise terminology checks only.
- Do not run product tests, builds, servers, visual suites, or broad audits.
- Commit the two documentation changes once and non-force push the branch.
- Leave the worktree clean and upstream-equal.
- Return exact changed paths, commit, checks, the final one-sentence instruction,
  and the acknowledgement block to Advisor. Do not issue a review verdict.
