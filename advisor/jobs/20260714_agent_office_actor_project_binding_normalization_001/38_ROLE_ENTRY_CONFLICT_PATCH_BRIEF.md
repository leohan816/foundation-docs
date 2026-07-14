# Agent Office Root Role-Entry Conflict Patch Brief

## Advisor Gate

```text
MISSION: AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001
VERDICT: PROCEED_WITH_LIMITS
DEFECT: Agent Office root AGENTS.md and CLAUDE.md assign every repository actor
        to the Worker role, while the accepted operating model allows the
        Advisor, Designer, Worker, and independent Reviewer to use the same
        canonical repository.
DISCOVERY_EVIDENCE: The live agent-office-advisor session resumed at
                    /home/leo/Project/agent-office and read the root files as
                    mandatory instructions.
PATCH_CLASS: narrow documentation-only role-entry correction
```

This is a bounded correction inside the existing normalization mission. It is
not a new mission and does not reopen already accepted project-reference work.

## Actor and Runtime

- Worker: existing `agent-office-opus` session only.
- Required skill: `/fable-builder`; read and apply
  `/home/leo/Project/skill/fable-builder/SKILL.md` directly.
- Repository: `/home/leo/Project/agent-office`.
- Branch: `shadow/agent-office-m1-2-spatial-office`.
- Exact base: `2c91b7462b5dad8f10b3d8954ca4c20d9d518592`.
- Verify the actual session, model, effort, workspace, readiness, branch, HEAD,
  and upstream immediately before work. Do not infer them from the session name.

## Allowed Files

Only:

- `/home/leo/Project/agent-office/AGENTS.md`
- `/home/leo/Project/agent-office/CLAUDE.md`
- result artifact:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_PATCH_WORKER_RESULT.md`

## Required Correction

1. Make both root entry documents role-neutral. They apply to every authorized
   actor operating in the Agent Office repository, not only the Worker.
2. State that the active actor and role come from an exact committed Advisor
   handoff plus verified runtime/actor binding. A session name alone is not
   actor, role, model, effort, or authority evidence.
3. Require the actor to read its matching role document under
   `docs/agent/roles/` and fail closed if the handoff, runtime binding, and role
   document disagree.
4. Preserve the Agent Office Team reporting path and the Advisor-led routine.
5. Preserve role separation:
   - Advisor routes and audits but does not implement or self-review;
   - Designer designs only within an exact handoff and does not implement;
   - Worker implements only an exact handoff and returns evidence;
   - Reviewer remains independent/read-only and never patches;
   - Leo/GPT retains material decisions, risk acceptance, and final approval.
6. Keep Worker-specific execution, Git, result, and STOP rules applicable to a
   Worker assignment. Do not weaken or delete them merely to make the entry
   documents role-neutral.
7. Keep all existing database, secret, production, public exposure, protected
   branch, browser-direct dispatch, arbitrary command, self-review, scope, and
   next-mission prohibitions.
8. Keep current common authority in `docs/agent/`; keep `foundation-docs` as
   evidence/history/result/pointer storage only.

## Forbidden

- Product source, tests, fixtures, package/config files, runtime behavior, or
  machine registry changes.
- Slack/AS1, transport, tmux input, server start, DB/schema, secret, remote,
  production, or public actions.
- Changes to another repository or to `docs/agent/**`.
- Broad review or product test replay.
- Touching, staging, removing, or incorporating the pre-existing untracked
  `.grok/`, `grok-max`, `grokx`, or `grokx-max` paths.
- Main/protected-branch merge, force push, self-review, or Reviewer dispatch.

The intentionally deferred machine-registry actor/Team reconciliation remains
mandatory as a separate minimal config-only delta before AS1 Slack Pilot. Do
not claim or perform it here.

## Targeted Checks

- Inspect the exact diff for only the two allowed repository files.
- Verify both files no longer assign every actor to Worker.
- Verify both require exact handoff plus verified binding and matching role doc.
- Verify the Worker boundaries and common safety/authority boundaries remain.
- `git diff --check` for the exact patch.
- Targeted text consistency search only; no product tests.
- Commit with explicit paths and non-force push the authorized branch.
- Verify local HEAD equals upstream and unrelated untracked paths remain
  untouched.

## Result Contract

Write the exact result file named above with:

- verified session/model/effort/workspace;
- base and final commit;
- exact changed files and diff summary;
- targeted checks and every failure/skip;
- preservation of role and safety boundaries;
- explicit machine-registry deferral;
- Git status and upstream equality;
- unrelated-path preservation;
- rollback command;
- result SHA-256 and pointer to `agent-office-advisor`.

Return the result to `agent-office-advisor` and stop. Do not dispatch the
Reviewer or begin another work unit.
