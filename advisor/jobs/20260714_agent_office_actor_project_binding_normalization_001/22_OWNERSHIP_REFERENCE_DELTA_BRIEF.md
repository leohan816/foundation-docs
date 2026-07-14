# Ownership And Reference Delta Rework Brief

## Target

- Same Worker/session: `agent-office-opus`
- Same Agent Office branch/worktree:
  `normalization/actor-project-binding-001` at
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
- Current Agent Office candidate: `b6fd321b27b0bb76d1ea935bb7ab977924fdf5ba`
- Current project commits: FOUNDATION `b85aba4`, SIASIU `98d4b4c`, Cosmile
  `4e5a934`
- VibeNews docs-only worktree:
  `/home/leo/Project/.worktrees/VibeNews/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
  on `normalization/actor-project-binding-001` at base `7864e530`

This is a narrow routine patch. Reuse all accepted documentation and change only
the exact ownership/reference findings below.

## Exact Findings To Patch

1. **Current authority ownership.** Agent Office `docs/agent/` owns current
   Team, Actor, role, authority, default routine, onboarding, dispatch, and
   tmux/runtime-binding rules. `foundation-docs` is evidence, history, audit,
   migration, and pointer storage only. Remove language that makes
   `foundation-docs/.../SESSION_REGISTRY.md` current role/runtime authority.
   Historical evidence/result pointers into foundation-docs remain valid.
2. **Workspace paths.** In `ACTOR_PROJECT_BINDING_MIGRATION.md`, replace every
   accidental role-folder workspace with canonical bindings:
   - `agent-office-advisor`, `agent-office-designer`, and
     `agent-office-reviewer` -> `/home/leo/Project/agent-office` or an authorized
     Agent Office mission worktree;
   - `foundation-advisor` -> the exact mission target among `FOUNDATION`,
     `SIASIU`, and `Cosmile` (idle/default `FOUNDATION`);
   - `foundation-designer` -> the exact active Foundation-Team project/worktree;
   - preserve `foundation-control` at `/home/leo/Project/foundation-control`.
3. **Advisor instruction gate.** Add the mandatory pre-execution classification
   `PROCEED | PROCEED_WITH_LIMITS | NEEDS_DECISION | HOLD | FAIL` to the Team
   operating model and Advisor role. An Advisor must return evidence and a safe
   correction instead of blindly executing an invalid instruction.
4. **Visible machine-registry deferral.** State that existing machine registry
   actor/Team bindings remain unchanged. A separate minimal config-only delta is
   mandatory before AS1 Slack Pilot. Do not perform that delta or start AS1.
5. **Project roots.** In Agent Office, FOUNDATION, SIASIU, and Cosmile root
   instructions, replace the foundation-docs session-registry authority pointer
   with the Agent Office Team operating model/runtime-binding-rule pointer.
   Preserve foundation-docs references used only for historical evidence,
   result storage, or pre-existing product protocols.
6. **SIASIU current role name.** Change only the current role line `Shashu Worker`
   in SIASIU `CLAUDE.md` to `SIASIU Worker`. Do not rewrite clearly historical
   citations or historical filenames in this task.
7. **VibeNews minimal connection.** Add concise root `AGENTS.md`/`CLAUDE.md`
   language stating:
   - responsible Advisor: `VibeNews-advisor`;
   - shared Agent Office `TEAM_OPERATING_MODEL.md` and role definitions are the
     cross-project default;
   - existing VibeNews `docs/agent/ROLE_INDEX.md` and protocols remain the
     stricter project-specific overlay;
   - Designer/Worker/Reviewer route only through the VibeNews Advisor.
   Do not rewrite VibeNews protocol files.
8. Rewrite the durable Worker result to include these delta commits, the final
   ownership model, and the visible machine-registry/pre-AS1 limitation.

## Forbidden And Validation

- No source, tests, fixtures, schema, machine registry, product, Slack, or tmux
  changes.
- No product tests, broad audits, or instruction rewrites outside the exact
  lines above.
- Run only targeted link/reference/name/stale-path checks and `git diff --check`.
- Commit and non-force push each exact docs-only branch. Preserve unrelated
  dirty files.
