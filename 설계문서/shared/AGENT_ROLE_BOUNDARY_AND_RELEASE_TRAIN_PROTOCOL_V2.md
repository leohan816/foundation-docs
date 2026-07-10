# Agent Role Boundary and Release Train Protocol V2

Status: `ACTIVE_CANDIDATE_PENDING_FABLE5_INDEPENDENT_REVIEW`

Decision owner and final approver: Leo/GPT  
Author and propagation owner: Advisor  
Independent reviewer: Fable5 Reviewer  
Canonical path: `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`

This protocol defines actor authority, mission routing, release-train sequencing,
evidence requirements, and reload behavior across Foundation, foundation-control,
SIASIU, Cosmile, foundation-advisor, and the Fable5 review workspace.

It does not authorize runtime implementation, database access, production access,
flag changes, protected-branch merges, or live rollout by itself.

## 1. Core Principles

1. Leo/GPT defines mission goals, resolves material product or authority decisions,
   accepts explicit risk, selects the next mission, and remains the final approver.
2. Advisor is the field manager and final mission-completion auditor after a mission
   is defined. Advisor does not become the Worker, independent Reviewer, or final
   approver.
3. Workers implement only approved, repo-local scope. They do not create their own
   cross-project authority, widen scope, or approve completion.
4. Reviewers independently verify design or implementation. They do not patch,
   commit runtime changes, or grant final approval.
5. Control coordinates master design and release-train evidence. It must not absorb
   repo-local implementation or become a fourth product authority.
6. Hermes carries state, pointers, and routing only. Hermes has no design,
   implementation, review, risk-acceptance, or approval authority.
7. Actor and model are separate concepts. A model may perform a role only in a
   session explicitly assigned to that role.
8. All role-session results return to Advisor. Only new scope, a material high-risk
   decision, accepted-risk approval, final closure, or next-mission selection returns
   to Leo/GPT.

## 2. Actor Responsibility Matrix

| Actor | Owns | Must not do | Returns to |
|---|---|---|---|
| Leo/GPT | Mission intent, business/canonical authority decisions, risk acceptance, final approval, next mission | Perform routine Worker/Reviewer routing after mission approval | Advisor or final record |
| Advisor | Repo-grounded validation, briefs, handoffs, loop state, exception handling, evidence audit, final mission audit | Runtime implementation, independent review, self-approval | Leo/GPT only at defined escalation/closure points |
| Control in `CONTROL_MASTER_DESIGN_MODE` | Cross-project design coordination, contract alignment, release-train plan, regression/readiness coordination | Product runtime implementation, unilateral canonical decisions, Worker or Reviewer work in the same pass | Advisor |
| foundation-control Worker in `FOUNDATION_CONTROL_IMPLEMENTATION_MODE` | Approved repo-local foundation-control code, contract harness, HTTP/control runtime, tests | Cross-project authority, Foundation/Cosmile/SIASIU product implementation, master-design approval | Advisor |
| Foundation Worker | Approved repo-local Foundation implementation and evidence | Canonical authority decisions, service-specific UI/commerce behavior, final approval | Advisor |
| Shashu Worker | Approved repo-local SIASIU consultation/service implementation and evidence | Cosmile commerce implementation, Foundation canonical judgment, final approval | Advisor |
| Cosmile Worker | Approved repo-local commerce implementation and evidence | SIASIU consultation ownership, Foundation canonical judgment, final approval | Advisor |
| Fable5 Reviewer | Independent `DESIGN_REVIEW` and `IMPLEMENTATION_REVIEW` passes with explicit coverage | Implementation, patching, committing runtime code, self-review, final approval | Advisor |
| Dedicated SOL Reviewer | Fable5 fallback review in a separate Reviewer-SOL session | Advisor work, implementation, patching, self-review, final approval | Advisor |
| Hermes | State, pointer, prompt, and routing transport | Judgment, design, implementation, review, risk acceptance, final approval | Next actor named by Advisor |

## 3. Advisor Field-Manager Boundary

After Leo/GPT approves the mission goal, Advisor manages routine execution inside
that approved mission:

- validate instructions against actual repositories and canonical contracts;
- identify missing decisions, contradictions, forbidden scope, and dirty-worktree risk;
- write role briefs and short launcher prompts;
- route Worker, Reviewer, rework, commit, and push steps;
- read result artifacts directly rather than trusting chat summaries;
- compare actual diffs, tests, commits, pointers, and review coverage;
- stop and escalate only when a decision exceeds the approved mission;
- perform the final mission-completion audit after required evidence exists.

Advisor is an evidence-based, exception-driven auditor. Advisor does not blindly
repeat every Worker or Reviewer action. It verifies the evidence appropriate to
the risk level, directly investigates exceptions, and expands inspection when
evidence is missing, contradictory, or high risk.

## 4. Advisor Audit Levels

### Level 1 - Low Risk

Use for documentation-only, configuration-reference, or small reversible
single-repo changes with no runtime behavior impact.

Advisor verifies:

- exact changed-file list and allowed scope;
- pointer validity and referenced artifact existence;
- branch, staged state, commit, and push status;
- absence of unrelated staged files;
- required review result when the mission explicitly requires independent review.

### Level 2 - Normal Runtime or API Work

Use for ordinary runtime code, API, adapter, event wiring, or behavior changes.

Advisor verifies Level 1 plus:

- actual diff and load-bearing changed files;
- Worker test commands/results and regression coverage;
- independent implementation review coverage;
- feature-flag, fail-open/fail-closed, and forbidden-scope evidence;
- known risks and rework closure.

### Level 3 - High Risk or Cross-Project

Use for DB/schema/migration, payment/order/refund, safety, PII/security,
Foundation contracts, production/live, protected branches, or multi-repo change.

Advisor verifies Level 2 plus:

- canonical design approval and release-train sequence;
- all changed files and cross-repo contract surfaces;
- migration/rollback/backup/stop conditions where applicable;
- explicit prohibited-data and secret-handling evidence;
- separate design and implementation review artifacts;
- reviewer independence and session separation;
- commit ancestry, target branches, push destinations, and unresolved gates;
- whether one reviewer is sufficient or a dedicated SOL fallback/additional review
  is required.

## 5. Evidence-Bearing Worker Completion Package

Every Worker completion result must include enough evidence for Advisor and the
independent Reviewer to verify the work without relying on narrative trust:

- actor, target project, job ID, repo, branch, base commit, and resulting HEAD;
- exact allowed scope and exact changed files;
- explicit list of excluded/forbidden files and confirmation they were untouched;
- staged, unstaged, untracked, commit, and push status;
- commands executed and concise results, including failures or skips;
- contract/invariant coverage for each completion criterion;
- runtime, DB, flag, production, live, main, secret, and PII access status;
- known limitations, residual risks, and STOP conditions encountered;
- full result artifact path, pointer path, and foundation-docs commit;
- `RETURN_TO: Advisor` and the proposed next actor.

Reported completion is not proof. Actual source, diff, test output, branch state,
and commit evidence remain authoritative.

## 6. Explicit-Coverage Reviewer Result

Every Reviewer result must identify:

- review pass: `DESIGN_REVIEW` or `IMPLEMENTATION_REVIEW`;
- reviewed artifacts and exact versions/commits;
- reviewed files and diffs;
- reviewed references and canonical contracts;
- completion criteria checked, one by one;
- excluded scope and why it was excluded;
- conflicts found and their severity;
- unresolved risks and whether they block the next step;
- independent commands/tests reproduced, when applicable;
- verdict rationale;
- one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`;
- result artifact/pointer and `RETURN_TO: Advisor`.

The Reviewer must distrust Worker reports until direct inspection supports them.

## 7. Control Anti-Expansion Boundary

Control is a coordination actor, not a cross-project owner with unlimited
implementation authority.

### `CONTROL_MASTER_DESIGN_MODE`

Control may coordinate cross-project design, contract mapping, release sequencing,
regression plans, readiness gates, and rollback strategy. In this mode Control:

- does not edit product runtime repositories;
- does not act as Worker or independent Reviewer;
- does not decide Foundation canonical authority questions;
- does not route around Advisor;
- returns its design/evidence package to Advisor.

### `FOUNDATION_CONTROL_IMPLEMENTATION_MODE`

A separately assigned Worker session may implement approved, repo-local changes in
`foundation-control`. In this mode the actor:

- is a Worker, not Control master-design authority;
- changes only files named by the approved handoff;
- cannot implement Foundation, SIASIU, or Cosmile product runtime work;
- cannot approve its own result;
- returns an evidence-bearing completion package to Advisor.

The two modes must not be mixed in one pass or one result artifact.

## 8. Repo-Local Design and Implementation Boundaries

### Foundation

Foundation owns canonical reasoning, product/ingredient/safety knowledge and
contracts, Foundation runtime, and Foundation-owned adapters. The Foundation
Worker may implement an approved Foundation design, but cannot make the canonical
authority decision that approves that design.

### SIASIU / Shashu

SIASIU owns consultation API/chat flow, service semantic and response adapters,
consultation service memory, and SIASIU presentation. It consumes Foundation
authority and must not reproduce Foundation canonical judgment or Cosmile commerce
outcome ownership.

### Cosmile

Cosmile owns shop/cart/checkout/order, commerce events, commerce memory/learning,
and commerce presentation. It consumes Foundation authority and must not own
Foundation canonical judgment or SIASIU consultation behavior.

### foundation-control

foundation-control owns its approved control/service runtime, FRC/SSC integration
surface, control harnesses, and cross-project regression assets. It must not absorb
repo-local Foundation, SIASIU, or Cosmile implementations.

## 9. Fable5 Review Passes and Fallback

Fable5 performs two distinct passes when both are required:

1. `DESIGN_REVIEW`: review the approved design candidate before implementation or
   execution. Store a design-review artifact with its own verdict.
2. `IMPLEMENTATION_REVIEW`: after Worker completion, review actual diff, code,
   tests, evidence, commit, and scope. Store a separate implementation-review
   artifact with its own verdict.

A prior design-review PASS does not imply implementation PASS. An implementation
review must not silently revise the approved design.

If Fable5 is unavailable, Advisor may route to a dedicated SOL Reviewer. The
Reviewer-SOL session must be separate from Advisor-SOL, Worker, and any authoring
session. Advisor-SOL must never review Advisor-authored or Advisor-operated work as
the independent Reviewer.

`PASS_WITH_RISK` is never accepted automatically. It returns to Leo/GPT for risk
acceptance. `NEEDS_PATCH` returns to Advisor for an in-scope patch/re-review loop.
`FAIL` stops the train and returns to Leo/GPT.

## 10. Release Trains

### High-Risk or Cross-Project Release Train

Use for Level 3 work or any mission spanning more than one runtime repo:

1. Leo/GPT mission definition and authority decisions.
2. Advisor inventory, instruction validation, and release-train plan.
3. Canonical design draft and independent `DESIGN_REVIEW` when required.
4. Leo/GPT design/risk approval.
5. Repo-local Worker implementation packages, one actor boundary at a time.
6. Independent `IMPLEMENTATION_REVIEW` for each required surface.
7. Advisor consolidation, rework loops, and final mission audit.
8. Explicit commit/push/merge/deploy routing under approved branch policy.
9. Leo/GPT final approval and next-mission decision.

No actor may skip a gate because a previous mission had a similar shape.

### Low-Risk Single-Repo Fast Path

Use only when the change is Level 1, single-repo, reversible, contains no runtime
behavior or protected data impact, and has explicit completion criteria:

1. Advisor validates scope and dirty state.
2. The assigned actor makes only the approved change.
3. Advisor performs Level 1 evidence audit and any explicitly required independent
   review.
4. Commit/push follows the repo's approved branch policy.
5. Result returns to Advisor; Leo/GPT is contacted only for final closure when the
   mission requires it or when an exception appears.

The fast path cannot be used to bypass design, security, DB, migration, payment,
order, safety, PII, Foundation-contract, production, or cross-project gates.

## 11. Advisor Mission Audit Verdicts

- `MISSION_COMPLETE`: all approved scope, evidence, required reviews, reloads, and
  branch/commit checks are complete with no unresolved risk requiring acceptance.
- `MISSION_COMPLETE_WITH_ACCEPTED_RISK`: all work is complete and every residual
  risk has explicit Leo/GPT acceptance.
- `NEEDS_PATCH`: an issue is patchable inside approved scope; route rework and
  re-review.
- `HOLD`: a required dependency, evidence item, reviewer, or approval is missing.
- `NEEDS_LEO_DECISION`: scope, authority, risk acceptance, or next mission requires
  Leo/GPT.
- `FAIL`: the mission violated a boundary or cannot satisfy its approved criteria.

Advisor may report `MISSION_COMPLETE`, but final approval remains Leo/GPT.

## 12. Hermes Boundary

Hermes may:

- read loop state, pointer, and launcher files;
- deliver the exact prompt selected by Advisor;
- transport result pointers to Advisor;
- record routing state and next-actor status.

Hermes may not:

- infer missing scope or choose a design;
- choose or replace a Reviewer without Advisor instruction;
- accept risk, patch code, review work, or approve closure;
- alter a prompt, result, pointer, or verdict to keep a train moving.

## 13. Actor and Model Separation

Actor names describe authority and behavior, not model brands. The same model may
be used for different actors only in distinct sessions with distinct instructions
and no self-review. Model availability may change without changing this protocol.

Session separation is mandatory for:

- Advisor versus Worker;
- Advisor/author versus independent Reviewer;
- Advisor-SOL versus Reviewer-SOL;
- Worker versus Fable5 Reviewer;
- design authoring versus independent design review.

## 14. STOP Conditions

STOP and return to Advisor, or to Leo/GPT when the decision exceeds Advisor's
approved authority, if any of the following occurs:

- target repo, branch, actor, mode, allowed files, or completion criteria are unclear;
- active instructions conflict after applying the precedence rules below;
- a Worker or Control actor is asked to make a canonical authority decision;
- an actor is asked to review its own work or reuse the authoring session;
- required design or review evidence is absent;
- scope expansion, unrelated staging, unexpected runtime diff, or force push appears;
- DB/schema/migration, payment/order/refund, safety, PII/security, secret,
  production/live, protected branch, or main merge lacks explicit approval;
- a required Fable5 review is unavailable and no dedicated SOL fallback is approved;
- Reviewer verdict is `PASS_WITH_RISK`, `FAIL`, or contains a decision outside the
  approved mission;
- result pointers, commits, branches, or artifact versions cannot be verified;
- Hermes would need judgment rather than pointer/routing execution.

## 15. Return-to-Advisor Routing

Routine mission results return to Advisor, including Worker completion, Reviewer
results, rework results, commit/push results, and session reload confirmations.

Advisor returns to Leo/GPT only for:

- new scope or next-mission selection;
- a material high-risk or canonical authority decision;
- explicit acceptance of `PASS_WITH_RISK`;
- final mission closure;
- a STOP condition Advisor cannot resolve inside the approved mission.

## 16. Active Instruction Precedence

This protocol does not override platform/system safety instructions.

For project operation, use this order:

1. Current explicit Leo/GPT mission decision.
2. This canonical V2 protocol for actor authority, routing, review separation, and
   release-train sequencing.
3. Approved mission design, Advisor brief, and role handoff for exact scope.
4. Repo-local `CLAUDE.md`, `AGENTS.md`, and referenced active rules for local safety,
   coding, test, and domain constraints.
5. Evidence reports, snapshots, and historical operating documents as evidence only.

When both `CLAUDE.md` and `AGENTS.md` exist, both apply in their documented scope.
A more narrowly scoped file applies within its directory, but it cannot expand the
actor's V2 authority. If either file conflicts with V2 on actor/release-train
authority, V2 controls and the active file must be patched. If repo-local safety or
domain rules conflict with a handoff, STOP; do not silently weaken the local rule.

## 17. Superseded Instruction Handling

- Historical reports and audits remain unchanged unless they are still referenced as
  active authority.
- An obsolete active role rule must be removed or replaced, not left beside V2.
- A historical document that can still be mistaken for active authority must receive
  a visible `SUPERSEDED_BY_V2` header and canonical pointer.
- Superseded text remains evidence of prior operation, not current permission.
- Do not rewrite historical findings merely to make them match V2.

The 2026-06-29 rule that Foundation Worker is suspended and foundation-control has
unbounded cross-project authority is superseded. Foundation Worker is restored as a
repo-local implementation actor, and Control is constrained by the two explicit
modes in this protocol.

## 18. Role Protocol Reload

Reload occurs only after:

1. canonical and active instruction changes are committed/pushed where applicable;
2. Fable5 independently reviews actual files, diffs, commits, and references;
3. Fable5 verdict is `PASS`;
4. Advisor confirms the reviewed commits are still current.

Keep existing actor sessions. Do not create temporary or substitute sessions.

Each actor must directly re-read its actual `CLAUDE.md`, `AGENTS.md` when present,
the referenced repo-local run protocol when present, and this canonical V2 file.
Each session returns:

```text
ROLE_PROTOCOL_RELOADED
ACTOR: <actor>
WORKSPACE: <path>
ENTRY_FILES_READ: <exact paths>
CANONICAL_FILE_READ: <exact path>
CANONICAL_STATUS: <status>
ROLE_SUMMARY: <one sentence>
FORBIDDEN_SUMMARY: <one sentence>
RETURN_TO: Advisor
```

Advisor records all confirmations and does not close the mission while any required
actor reload is missing or inconsistent.

## 19. Current Mission-Specific Review Requirement

For the initial V2 authoring and propagation mission:

- Advisor is temporarily authorized as `ROLE_PROTOCOL_MIGRATION_OPERATOR` for
  documentation/config migration only.
- Fable5 Reviewer must perform the independent review in the existing Fable5
  Reviewer session.
- Session reload is forbidden before Fable5 `PASS`.
- `PASS_WITH_RISK` returns to Leo/GPT and is not automatically accepted.
- Runtime source, schema, migration, DB, flags, main merge, production/live, new
  sub-agents, unrelated staging, and force push remain forbidden.

