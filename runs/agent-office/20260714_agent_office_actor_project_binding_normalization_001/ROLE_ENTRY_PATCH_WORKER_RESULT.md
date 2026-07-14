# Agent Office Root Role-Entry Conflict Patch — Worker Result

`AGENT_OFFICE_ACTOR_PROJECT_BINDING_NORMALIZATION_001` (brief `38`,
`PROCEED_WITH_LIMITS`)

## Verified runtime

- Actor/session: **Agent Office Worker**, existing session `agent-office-opus`
  (verified live; not inferred from the session name).
- Model / effort: Opus 4.8 (1M context); narrow-documentation effort tier.
- Skill: `/fable-builder` (`/home/leo/Project/skill/fable-builder/SKILL.md`).
- Workspace / repo: `/home/leo/Project/agent-office`.
- Branch: `shadow/agent-office-m1-2-spatial-office`; verified base HEAD
  `2c91b7462b5dad8f10b3d8954ca4c20d9d518592`, upstream-equal (ahead/behind `0/0`)
  before work.

## Defect

Both Agent Office root entry documents asserted every repository actor is the
Worker (`AGENTS.md` "The assigned actor is **Agent Office Worker**"; `CLAUDE.md`
title "Agent Office **Worker** Entry Instructions" and "Act only as **Agent
Office Worker**"). The accepted operating model lets the Advisor, Designer,
Worker, and independent Reviewer share this canonical repository. The live
`agent-office-advisor` session resumed here and read the root files as mandatory
instructions, so a non-Worker actor received a Worker-only identity.

## Change (documentation-only, exactly two files)

- Base: `2c91b74`; final commit: `911a45b`.
- Diff name-only from base: `AGENTS.md`, `CLAUDE.md` (no other path).

`AGENTS.md`:

- Rewrote "Actor and Authority" -> "Actors and Authority": the repository is a
  shared canonical workspace for the Advisor, Designer, Worker, and independent
  Reviewer; the file applies to whichever authorized actor is active, not only
  the Worker.
- Active actor/role come from an exact committed Advisor handoff plus verified
  runtime/actor binding — never the session name; a session name is not actor,
  role, model, effort, or authority evidence. The actor reads its matching role
  document under `docs/agent/roles/` and **fails closed** if the handoff, the
  verified runtime binding, and the role document disagree.
- Explicit role separation (Advisor routes/audits, no implement/self-review;
  Designer designs within handoff, no implement; Worker implements/designs a
  handoff and returns evidence, no self-review/approve; independent Reviewer
  read-only, no patch/commit/approve; Leo/GPT owns material decisions, risk
  acceptance, closure, next mission). All role results return to Advisor.
- Generalized the "Non-Negotiable Boundaries" first bullet from
  "assigned existing **Worker** session / substitute **Workers**" to
  "assigned existing **role** session / substitute **actors**".

`CLAUDE.md`:

- Title: "Agent Office **Worker** Entry Instructions" -> "Agent Office
  **Repository** Entry Instructions".
- Rewrote "Role Summary" to be role-neutral with the same handoff+binding+matching
  role-doc+fail-closed requirement and the same role-separation statement, and
  added a line noting the Worker-specific execution/Git/result/STOP rules below
  apply whenever this session runs a Worker assignment.
- Generalized the fail-closed "substitute **Worker**" bullet to "substitute
  **actor**".

## Preservation of role and safety boundaries

- Worker-specific execution, Git, result, and STOP rules are retained and now
  explicitly scoped to a Worker assignment (not weakened or deleted): `AGENTS.md`
  "Work and Git Rules" and "Exact-Handoff Scope Lock"; `CLAUDE.md` "Fail-Closed
  Rules" and the closed-bootstrap paragraph.
- All prohibitions retained: database/schema/migration, secret/credential/
  environment, production/live, public exposure, protected branch, browser-direct
  Worker/Reviewer dispatch, arbitrary command execution, self-review/independent-
  verdict/risk-acceptance/final-approval, `main` merge/push, force push, staging
  unrelated changes, and next-mission selection.
- Agent Office Team reporting path and Advisor-led routine preserved
  (`agent-office-advisor` responsible; actor -> Advisor -> Leo/GPT).
- Current common authority remains `docs/agent/`; `foundation-docs` remains
  evidence/history/result/pointer storage only (`AGENTS.md` "Team Binding and
  Common Role Docs" unchanged).

## Targeted checks

- `git diff` scope: exactly `AGENTS.md` and `CLAUDE.md`; no `docs/agent/**`, no
  other repository, no product/source/test/fixture/package/config path.
- Text search: no remaining "The assigned actor is **Agent Office Worker**" or
  "Act only as **Agent Office Worker**" identity assertion; both files require
  exact handoff + verified binding + matching role document + fail-closed.
- Boundary search: Worker execution/Git/STOP rules and all safety/authority
  prohibitions still present.
- `git diff --check`: clean.
- No product tests, Living Office tests, or broad review run (forbidden).

## Completeness correction (brief 40)

Direct Advisor inspection of the first patch (`911a45b`) found a residual role
contradiction: both root files still (1) sourced every actor's role/scope from an
exact committed **Advisor handoff**, though the Advisor receives a Leo/GPT mission
or decision, not a handoff from itself; (2) kept `RUN_PROTOCOL.md` and
`RESULT_REPORTING_PROTOCOL.md` mandatory for every role although they are Worker
execution/result protocols; and (3) phrased Worker return/STOP and exact-handoff
language as if identical for the Advisor, Designer, and Reviewer.

Correction (base `911a45b`, final commit `b64ae8c`; same two files):

- Split entry authority: **Advisor entry** = a Leo/GPT mission or decision +
  verified actor/runtime binding + `docs/agent/roles/advisor.md`; **subordinate
  entry** (Designer, Worker, Reviewer, Control) = an exact committed Advisor
  handoff + verified actor/runtime binding + the matching role document. A
  session name proves none of actor, role, model, effort, readiness, or
  authority. Disagreement fails closed to the responsible Advisor, or to Leo/GPT
  when the active actor is the Advisor.
- Common mandatory reads for all roles = the root files, Team operating model,
  matching role document, and current role-appropriate authority input.
  `RUN_PROTOCOL.md` and `RESULT_REPORTING_PROTOCOL.md` are mandatory for Worker
  assignments only (another role reads them only when its exact authority names
  them for read-only audit context).
- Worker execution/Git/result/STOP rules retained fully but explicitly scoped to
  Worker assignments; the Advisor follows `docs/agent/roles/advisor.md`, writes
  the mission audit, and returns to Leo/GPT, and never implements or self-reviews.
- Exact scope-lock language now distinguishes Leo/GPT authority for the Advisor
  from Advisor-handoff authority for subordinates; neither grants work beyond its
  exact mission or handoff.

Added targeted checks (brief 40): whitespace-normalized search confirmed both
files carry the Advisor (Leo/GPT) and subordinate (Advisor-handoff) entry paths,
the Worker-only protocol scoping, and the Advisor→Leo/GPT fail-closed/return
routing; no remaining universal statement makes an Advisor require its own Advisor
handoff, read Worker protocols as a normal prerequisite, or return its result to
itself. `git diff --check` clean; diff scope exactly `AGENTS.md` and `CLAUDE.md`;
the Grok untracked paths were untouched; no product tests. All safety, security,
branch, dispatch, evidence, role-separation, and next-mission boundaries from
`911a45b` are preserved.

## Machine registry / AS1 deferral

Unchanged and not performed here. The intentionally deferred machine-registry
actor/Team reconciliation remains mandatory as a separate minimal config-only
delta before the AS1 Slack Pilot. No AS1/Slack/transport/tmux/server/DB/secret/
remote/production action was taken.

## Git status / upstream

- `shadow/agent-office-m1-2-spatial-office`: first patch `911a45b`
  (`2c91b74..911a45b`) and completeness correction `b64ae8c`
  (`911a45b..b64ae8c`), both non-force fast-forward pushes. Final HEAD `b64ae8c`
  == `origin/shadow/agent-office-m1-2-spatial-office`; ahead/behind `0/0`. Not
  `main`, not protected; no force push, no merge.
- No staged/unstaged residual mission files after either commit.

## Unrelated-path preservation

The pre-existing untracked `.grok/`, `grok-max`, `grokx`, and `grokx-max` paths
were not touched, staged, removed, or incorporated. No other repository or file
was modified.

## STOP condition (foundation-docs)

`foundation-docs` is on branch `main` with the Advisor's own unrelated
uncommitted changes. The Worker must not push `main` or disturb unrelated dirt,
so this result artifact is **written uncommitted** at the exact named path for
the Advisor to persist; no foundation-docs commit or push was made by the Worker.

## Rollback

`git -C /home/leo/Project/agent-office revert b64ae8c 911a45b` (or reset the
branch to `2c91b74`) restores the prior entry documents. No runtime, data, or
product surface is affected.

RETURN_TO: Advisor
PROPOSED_NEXT_ACTOR: Advisor
