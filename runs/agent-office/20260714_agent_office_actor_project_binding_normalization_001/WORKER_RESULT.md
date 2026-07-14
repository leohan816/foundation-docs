# Agent Office — Documentation-Only Actor/Project Binding Worker Result

`AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
(includes the ownership/reference delta rework, brief `22`)

## Identity

- Mission/job ID: `AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
  (documentation-only role/relationship normalization + ownership/reference
  delta).
- Actor: **Agent Office Worker**, existing session `agent-office-opus`; model
  Opus 4.8 (1M context); skill `/fable-builder`; narrow-documentation effort
  tier (bounded, reversible docs delta).
- Branches (all docs-only, non-`main`):
  - Agent Office worktree
    `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`,
    branch `normalization/actor-project-binding-001`, base `58a484b`.
  - FOUNDATION `shadow/foundation-shared-memory-v0`;
    SIASIU `shadow/m4-siasiu-memory`; Cosmile `shadow/m4-cosmile-memory`.
  - VibeNews docs-only worktree
    `/home/leo/Project/.worktrees/VibeNews/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`,
    branch `normalization/actor-project-binding-001`, base `7864e530`.
- Commits (baseline documentation, then delta):
  - Agent Office: `b6fd321` (baseline) -> `5df16b3` (delta HEAD).
  - FOUNDATION: `b85aba4` -> `e2274bc`.
  - SIASIU: `98d4b4c` -> `afa4d90`.
  - Cosmile: `4e5a934` -> `00abe9a`.
  - VibeNews: `cc7f8cd` (new docs-only commit on base `7864e530`).
- Inputs read directly (delta): `22_OWNERSHIP_REFERENCE_DELTA_BRIEF.md`, and the
  exact current on-disk docs/roots being patched; prior mission inputs
  (`18_DOCUMENTATION_ONLY_CORRECTION.md`, `02_AGENT_OFFICE_WORKER_BRIEF.md`,
  `13`, `16`), `076f0f4` role material, and VibeNews root/`docs/agent/ROLE_INDEX.md`;
  canonical-path availability delta `24_CANONICAL_PATH_AVAILABILITY_DELTA.md`.

## Canonical Checkout Landing (delta 24)

The two reviewed documentation commits were cherry-picked onto the canonical
Agent Office checkout so the referenced path
`/home/leo/Project/agent-office/docs/agent/...` is now visible on the canonical
branch (project-root pointers resolve there):

- Canonical checkout: `/home/leo/Project/agent-office`, branch
  `shadow/agent-office-m1-2-spatial-office`, base `ac8ba75`.
- Cherry-picked docs-only, clean, no conflicts: `b6fd321` -> `9983997`,
  `5df16b3` -> `2c91b74` (final canonical HEAD).
- Non-force fast-forward push `ac8ba75..2c91b74`; local == upstream.
- Diff from `ac8ba75` contains only root `AGENTS.md`/`CLAUDE.md` and
  `docs/agent/**`; content is byte-identical to the reviewed `5df16b3`; no
  source/test/fixture/product/config/package change; the four Grok-related
  untracked paths stayed excluded and uncommitted.
- The temporary `normalization/actor-project-binding-001` branch remains
  **review evidence only**; the canonical shadow branch now carries the landed
  documentation. No VibeNews protected/master merge was performed; machine
  registry and AS1 remain deferred.

## Final Ownership Model

- Agent Office `docs/agent/` is the **current authority** for Team, Actor, role,
  authority, default routine, onboarding, dispatch, and tmux/runtime-binding
  rules (`TEAM_OPERATING_MODEL.md` + `roles/`).
- `foundation-docs` is **evidence, history, audit, migration, and pointer
  storage only** — not current role or runtime authority. The historical
  `foundation-docs/.../SESSION_REGISTRY.md` is retained as evidence; historical
  evidence/result pointers into foundation-docs remain valid.
- Each project root (`agent-office`, `FOUNDATION`, `SIASIU`, `Cosmile`,
  `VibeNews`) points to the Agent Office operating-model runtime-binding rules,
  not to the foundation-docs session registry, while preserving foundation-docs
  references used only for historical evidence, result storage, or pre-existing
  product protocols.
- Canonical workspaces are project repositories or authorized mission worktrees,
  never role-named folders (`agent-office-advisor`/`foundation-advisor`
  directories are not canonical workspaces).

## Exact changed-file list (delta rework)

Agent Office worktree (`5df16b3`, from `b6fd321`):

- `docs/agent/TEAM_OPERATING_MODEL.md` — added "Authority and Ownership"; changed
  onboarding pointer to "runtime-binding rules"; added §9 "Advisor Instruction
  Gate" (`PROCEED | PROCEED_WITH_LIMITS | NEEDS_DECISION | HOLD | FAIL`).
- `docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md` — ownership statement in §2 and
  SESSION_REGISTRY demoted to historical evidence; §4 workspace table rewritten
  to canonical project/worktree bindings; new §6 "Machine Registry Deferral
  (Pre-AS1)"; Rollback renumbered §7.
- `docs/agent/roles/advisor.md` — added the pre-dispatch instruction-gate
  classification requirement.
- `AGENTS.md` — root pointer now names docs/agent as authority for
  runtime-binding rules; foundation-docs marked historical-only.

Project roots (delta):

- FOUNDATION `e2274bc`: `AGENTS.md` — runtime-binding-rule pointer replaces the
  session-registry pointer.
- SIASIU `afa4d90`: `AGENTS.md` — same pointer replacement; `CLAUDE.md` — current
  role line `Shashu Worker` -> `SIASIU Worker` only (historical
  `Shashu Service Adapter` / `Shashu voice/memory` lines preserved).
- Cosmile `00abe9a`: `AGENTS.md` — same pointer replacement.
- VibeNews `cc7f8cd`: `AGENTS.md` + `CLAUDE.md` — concise Team-binding language
  (responsible Advisor `VibeNews-advisor`; shared Agent Office operating model +
  role defs as cross-project default; VibeNews `docs/agent/ROLE_INDEX.md` +
  protocols remain the stricter project-specific overlay;
  Designer/Worker/Reviewer route only through the VibeNews Advisor). VibeNews
  protocol files not rewritten.

## Machine Registry / Pre-AS1 Limitation (visible)

Existing machine registry actor/Team bindings remain **unchanged** by this
mission. A separate, minimal, **config-only** machine-registry delta is
**mandatory before** the AS1 Slack Pilot. This mission did not perform that delta
and did not start AS1; Slack remains forbidden here. (Recorded in
`ACTOR_PROJECT_BINDING_MIGRATION.md` §6.)

## Forbidden / excluded — confirmed untouched

- No `src/**`, `tests/**`, fixture, schema, machine-registry, product, Slack, or
  tmux change in any repo (verified: no `src/`/`tests/`/`fixtures/` in any staged
  set or working change).
- No product/Living Office/browser/visual/full test run; no broad audit; no
  instruction rewrite outside the exact delta lines.
- Aborted untracked `src/application/organization/` files stayed removed; not
  copied or adapted. No new schema/registry/second role system.
- VibeNews `docs/agent/` protocol files (AGENT_ROLE_PROTOCOL, DESIGN_PROTOCOL,
  RUN_PROTOCOL, RESULT_REPORTING_PROTOCOL, ROLE_INDEX, SESSION_RELOAD_PROTOCOL)
  not modified.
- `.grok/`, `grok-max`, `grokx`, `grokx-max` and all pre-existing untracked files
  in every repo: preserved, never staged.

## Commands / checks (delta scope)

- `git status` / staged-name inspection each repo — only exact approved doc paths
  staged; no `src/`/`tests/` staged.
- `git diff --check` (agent-office worktree, FOUNDATION, SIASIU, Cosmile, VibeNews
  worktree) — clean.
- Targeted reference checks — no `runtime session registry` / SESSION_REGISTRY
  authority pointer remains in the four project roots; runtime-binding-rule
  pointer present in each; instruction-gate tokens present in operating model +
  Advisor role; `SIASIU Worker` current role line set; VibeNews changed only
  `AGENTS.md`/`CLAUDE.md`.
- Section-numbering integrity verified (migration §1–§7; operating model §1–§9).
- No typecheck/lint/product tests (no code changed; product tests forbidden).

## Git status (delta)

- Agent Office: HEAD `5df16b3` == `origin/normalization/actor-project-binding-001`
  (ff `b6fd321..5df16b3`); ahead/behind `[0 0]`.
- FOUNDATION: HEAD `e2274bc` == upstream (ff `b85aba4..e2274bc`); `[0 0]`.
- SIASIU: HEAD `afa4d90` == upstream (ff `98d4b4c..afa4d90`); `[0 0]`.
- Cosmile: HEAD `00abe9a` == upstream (ff `4e5a934..00abe9a`); `[0 0]`.
- VibeNews: HEAD `cc7f8cd` == `origin/normalization/actor-project-binding-001`
  (new branch, `-u` set); `[0 0]`.
- Pre-existing untracked dirt in every repo preserved and never staged.

## Security / boundary status

- Database, schema/migration, secret/environment, PII, runtime, public,
  production/live: none accessed or changed.
- Protected branch / `main` merge / `main` push / force push: none. All changed
  branches are non-`main` (`normalization/...`, `shadow/*`); all pushes were
  non-force fast-forwards (VibeNews a new-branch create).
- Agent/sub-agent/delegated context/temporary session/substitute Worker: none.
- Browser dispatch / arbitrary terminal / self-review / independent-review
  verdict / risk acceptance / final approval / next-mission selection: none.
- tmux: no session created, modified, or dispatched; no tmux input sent.

## Known limitations & residual risk

- Root pointers reference the canonical repo path
  `/home/leo/Project/agent-office/docs/agent/...`; those files are now present on
  the canonical checkout branch `shadow/agent-office-m1-2-spatial-office` at
  `2c91b74` and resolve there.
- VibeNews commit `cc7f8cd` remains on its docs-only review branch with no
  protected/master merge, pending review/Founder disposition.
- Foundation Advisor/Designer workspaces are stated as the exact mission target
  (idle/default `FOUNDATION`); the Advisor confirms the live target before any
  dispatch.
- Independent Reviewer verdict, Advisor final audit, and Founder approval remain
  external and pending. This Worker report is evidence for review, not a review.

## STOP conditions encountered

- `foundation-docs` remains on branch `main` with the Advisor's own unrelated
  uncommitted changes. The Worker must not push `main` or disturb unrelated dirt,
  and no exact foundation-docs result path was supplied. This durable result is
  therefore **written uncommitted** at the conventional `runs/` path for the
  Advisor to persist; no foundation-docs commit or push was made by the Worker.

## Durable result & pointer

- Durable result file (this file):
  `foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/WORKER_RESULT.md`
  (uncommitted; see STOP condition).
- foundation-docs commit: **not made by Worker** (foundation-docs on `main`).

## Rollback

Revert the single delta commit on each branch (`5df16b3`, `e2274bc`, `afa4d90`,
`00abe9a`, and `cc7f8cd`) — and, if fully undoing the mission, the baseline
commits `b6fd321`/`b85aba4`/`98d4b4c`/`4e5a934` — to restore the prior state. On
the canonical checkout, revert the two landed commits `2c91b74` and `9983997` to
return `shadow/agent-office-m1-2-spatial-office` to `ac8ba75`. No runtime, data,
or product surface is affected.

RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
