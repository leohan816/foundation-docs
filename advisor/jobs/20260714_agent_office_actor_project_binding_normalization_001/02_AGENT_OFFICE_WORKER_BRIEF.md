# Bounded Actor/Project Binding Worker Brief

## Authority And Supersession

This brief incorporates `FOUNDER_SCOPE_AND_TIMEBOX_CORRECTION` and supersedes
the broader implementation scope previously published in this file.

- One implementation Worker only: `agent-office-opus`
- One independent Reviewer only: selected after the Worker result
- Target: 60 minutes
- Hard stop: 120 minutes
- Slack implementation: forbidden

Artifacts `03` through `11` in this job are historical pre-correction planning
only. Do not execute their separate Worker or multi-Reviewer routes.

## Target

- Primary repo: `/home/leo/Project/agent-office`
- Primary branch/base: `shadow/agent-office-m1-2-spatial-office` at
  `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
- Narrow project-instruction targets:
  `/home/leo/Project/FOUNDATION`, `/home/leo/Project/SIASIU`, and
  `/home/leo/Project/Cosmile`
- Worker: `agent-office-opus`
- Required skill: `/fable-builder`

This mission-specific handoff authorizes one Worker to make the listed narrow
documentation/configuration changes across the four canonical repositories. It
does not create permanent cross-repository implementation authority.

## Required Work Only

1. Read the useful preserved role material at foundation-docs commit `076f0f4`
   under `advisor/_system/roles/`. Deduplicate it into the existing Agent Office
   canonical agent-document system under `docs/agent/` (use a focused
   `docs/agent/roles/` subdirectory if needed). Do not copy the large preserved
   files verbatim and do not create another role system.
2. Reconcile the existing reviewed organization registry semantics from commit
   `58a484b` into the current Agent Office source only as required to represent:
   - `agent-office-advisor` -> Agent Office Team / `agent-office`;
   - `foundation-advisor` -> Foundation Team / `FOUNDATION`, `SIASIU`, `Cosmile`;
   - `foundation-designer` -> Foundation Team member reporting to
     `foundation-advisor`;
   - `foundation-control` -> Foundation Team internal Control member reporting
     to `foundation-advisor`.
3. Preserve the authority invariant:
   Leo/GPT -> responsible Advisor -> subordinate actor -> responsible Advisor ->
   Leo/GPT. Reviewer judgment remains independent, but assignment and result
   routing remain inside the Advisor-led Mission.
4. Add only concise, non-contradictory pointers to the canonical role and actor
   sources in the root `AGENTS.md` and `CLAUDE.md` files for `agent-office`,
   `FOUNDATION`, `SIASIU`, and `Cosmile`. Create a missing root `AGENTS.md` only
   when needed for this exact reference. Preserve all existing project rules.
5. Write one concise migration/authority record in Agent Office documentation.
   It must record the canonical project folders, actor/tmux/workspace separation,
   responsible-Advisor rule, final intended tmux bindings, and the fact that
   Slack implementation did not start.
6. Commit and non-force push each repository changed by this bounded mission.
   Do not stage or alter pre-existing unrelated dirty files.

## Allowed Files

Agent Office:

- `docs/agent/roles/**`
- one concise migration/authority record under `docs/agent/`
- root `AGENTS.md`
- root `CLAUDE.md`
- existing organization registry source files, only if required
- one focused contract test required to encode the four bindings

FOUNDATION, SIASIU, and Cosmile:

- root `AGENTS.md`
- root `CLAUDE.md`

Do not create `.agent-office/` overlays, a new organization schema, a second
registry, broad Team fixtures, VibeNews changes, template collections, or
FEATURE_INDEX churn unless an already-existing canonical reference would
otherwise be broken.

## Forbidden

- product, Living Office, browser, visual, performance, or full test suites;
- broad history or dependency research;
- Slack implementation;
- Control or Designer dispatch;
- multiple Workers or multiple Reviewers;
- runtime behavior, authentication, delivery, DB, secret, remote, production,
  or command-authority changes;
- unrelated instruction rewrites;
- touching the failed Grok pilot or excluded historical Worker session;
- touching `foundation-control` source/workspace;
- self-review or final approval.

## Targeted Validation

- focused registry contract validation for the four bindings and Advisor chain;
- targeted stale-path search for the four accidental top-level role paths;
- root `AGENTS.md` / `CLAUDE.md` role-reference consistency;
- `git diff --check`, `git status`, commit and upstream equality in changed repos;
- final top-level folder and tmux binding evidence supplied by Advisor after the
  Worker returns (the Worker must not manipulate tmux sessions or remove the
  Advisor's live directory).

## Result Contract

Report exact files, concise diff, every command and failure, focused test counts,
commits/pushes/upstream state, unrelated dirty files preserved, remaining
unknowns, and rollback. If a real contradiction prevents completion by the hard
stop, preserve work and return the exact blocker. Do not expand scope.
