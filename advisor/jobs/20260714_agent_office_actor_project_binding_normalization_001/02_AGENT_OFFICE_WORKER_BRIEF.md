# Documentation-Only Actor/Project Binding Worker Brief

## Authority

This is role and relationship normalization only. It is not product coding,
runtime implementation, or registry-schema work.

- One documentation Worker: `agent-office-opus`
- One independent documentation Reviewer after the Worker result
- Target: 60 minutes; hard stop: 120 minutes
- Required skill: `/fable-builder`
- Slack implementation: forbidden

## Workspaces

- Agent Office mission worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001`
- Branch/base: `normalization/actor-project-binding-001` at `58a484b`
- Narrow root-instruction targets:
  `/home/leo/Project/FOUNDATION`, `/home/leo/Project/SIASIU`, and
  `/home/leo/Project/Cosmile`

## Canonical Documentation Model

Use the existing Agent Office `docs/agent/` system as the one common source.

1. Create or update `docs/agent/TEAM_OPERATING_MODEL.md` with:
   - the default operating routine:
     Leo/GPT -> responsible Advisor -> selected Control/Designer/Worker/Reviewer
     -> responsible Advisor -> Leo/GPT;
   - the rule that every active actor belongs to one responsible Advisor Team;
   - the distinction among project folder, actor identity, role, tmux runtime,
     and temporary mission worktree;
   - subordinate no-self-assignment/no-scope-expansion/no-dispatch rules;
   - independent Reviewer judgment with Advisor-routed assignment/result;
   - a concise new-project onboarding checklist that creates relationships
     without creating role-named folders;
   - mandatory role-read and live-runtime verification before dispatch.
2. Create concise, deduplicated common role documents under
   `docs/agent/roles/` for Advisor, Designer, Worker, Reviewer, and Control.
   Derive useful constraints from foundation-docs commit `076f0f4`; do not copy
   its large files or templates verbatim. Each role document must define
   responsibilities, authority, prohibitions, accepted inputs, required outputs,
   reports-to/result routing, evidence, dispatch prerequisites, and completion.
3. Record the two current Team relationships in the common operating model:
   - Agent Office Team: `agent-office-advisor` with the assigned Agent Office
     Designer, Worker, and independent Reviewer for `agent-office`.
   - Foundation Team: `foundation-advisor` with `foundation-designer`,
     `foundation-control`, `foundation`, `siasiu`, `cosmile`, and the assigned
     independent Foundation Reviewer across `FOUNDATION`, `SIASIU`, `Cosmile`.
   Foundation Control is an internal Control actor, not a Team leader. Use
   `SIASIU` only.
4. Minimally update Agent Office `docs/agent/RUN_PROTOCOL.md` only as needed to
   require direct reading of `TEAM_OPERATING_MODEL.md` and the actor's matching
   role document before work.
5. Add concise consistent mandatory-read references to root `AGENTS.md` and
   `CLAUDE.md` in Agent Office, FOUNDATION, SIASIU, and Cosmile. Preserve all
   existing project-specific rules. A project root contains only its responsible
   Advisor, participating roles, reporting path, project constraints, and
   pointers to the common Agent Office documents and runtime session registry.
6. Write one concise migration/authority record under `docs/agent/` describing
   the accidental role-folder cleanup, canonical locations, Team bindings,
   intended tmux paths, and the fact that no Slack or product implementation ran.
7. Commit and non-force push each changed repository without staging unrelated
   dirty files.

## Forbidden

- any `src/**`, `tests/**`, fixture, product, runtime, schema, or registry-code
  change;
- product/Living Office/browser/visual/full tests;
- new role or organization system outside `docs/agent/`;
- duplicating full common role definitions into project roots;
- `.agent-office/` overlays, template collections, FEATURE_INDEX churn;
- Slack, delivery, authentication, DB, secret, remote, production, or command
  authority changes;
- Control/Designer dispatch, multiple Workers, multiple Reviewers;
- changes to the `foundation-control` workspace;
- self-review or final approval.

## Targeted Validation

- no source/test/product file changes;
- exact common-document links resolve;
- each project root `AGENTS.md` and `CLAUDE.md` agrees on responsible Advisor,
  routine, and role source;
- stale-path search for the four accidental role folders;
- official `SIASIU` naming;
- `git diff --check`, status, exact commits, pushes, and upstream equality;
- Advisor performs final tmux path and top-level folder validation.

## Result

Return exact files, concise diff, link/reference checks, all command outcomes,
commits/pushes/upstream state, preserved unrelated files, known limits, and
rollback. Stop at the hard limit on a real contradiction; never broaden scope.
