# Minimal Team Onboarding Manual - Independent Documentation Review Handoff

MISSION_ID: `AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`

ASSIGNED_ACTOR: `agent-office-reviewer`

ROLE: `INDEPENDENT_SENTINEL_REVIEWER`

RETURN_TO: `agent-office-advisor`

## Dispatch profile

```text
TASK_COMPLEXITY: LOW_TO_MEDIUM_DOCUMENTATION_REVIEW
RISK_LEVEL: LEVEL_1_WITH_AUTHORITY_WORDING
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: independent Sentinel documentation review
SELECTED_EFFORT: xhigh
REQUIRED_SKILL: /fable-sentinel; if unavailable, apply /home/leo/Project/skill/fable-sentinel/SKILL.md directly
WHY_NOT_LOWER: the two documents govern five roles and the Advisor authority chain
WHY_NOT_HIGHER: max is unnecessary for a closed two-file documentation delta
ESCALATION_TRIGGER: material authority conflict, hidden runtime scope, or unresolved ambiguity
```

## Frozen candidate

- repository: `/home/leo/Project/agent-office`
- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`
- branch: `feature/minimal-team-onboarding-manual-001`
- baseline: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- candidate: `7482d166021014153952fe857aa2db02cdffc20b`
- exact changed paths:
  - `docs/agent/TEAM_OPERATING_MODEL.md`
  - `docs/agent/roles/README.md`

The superseded 21-path design was not implemented. Its active product-tree
delta was removed by cleanup commit
`aac6a29ab2bffc9d43204df76f3922351e918def`; its branch history is historical
evidence only.

AS1 must remain unchanged at
`0dfb4398be2ecd9295b35a94e3b461e25dad6f7c` and
`OWNER_SETUP_REQUIRED`.

## Review order

Invoke `/fable-sentinel`. If that slash alias is not exposed in this runtime,
read and apply `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only the
references it requires for this narrow review; record that fallback explicitly.
This uses the same canonical Sentinel protocol without installing or changing a
skill. Then independently inspect the actual baseline, candidate, two-file
diff, target documents, and five existing role files. Do not trust the Designer
or Advisor summary without direct evidence.

Verify the live runtime directly. The expected binding is the existing
`agent-office-reviewer` session and `%28` pane running `gpt-5.6-sol` at `xhigh`,
but neither the session name nor this statement is evidence. Use live process,
tmux, workspace, and model/effort evidence from the current runtime.

Determine whether the candidate:

1. provides one reusable Advisor onboarding instruction and a coherent minimal
   routine without creating a second governance system;
2. maps Advisor, Designer, optional Control, Worker, and Reviewer to the
   correct existing central role files and entry reads;
3. skips absent roles and does not infer, create, recruit, or substitute
   Actors;
4. uses only Leo-nominated or registered Workers;
5. defines a simple textual acknowledgement containing files read, role,
   responsible Advisor, must-do, must-not-do, and READY or CONFLICT;
6. requires rereading on a new session, role change, or new mission;
7. keeps common role manuals centralized and project entry files short;
8. states the execution-profile rule correctly: xhigh when sufficient, max
   when xhigh is likely insufficient, ultra only when max is insufficient,
   with no silent Actor self-change;
9. preserves the Advisor-led authority chain and Reviewer independence;
10. introduces no Registry/schema, persistent readiness state, database,
    lifecycle, runtime, tmux, Slack, product-code, test, or external-project
    change;
11. has valid Markdown links, no whitespace errors, and exactly the two
    authorized changed paths;
12. leaves AS1 frozen and unchanged.

The Designer's exploratory validation included one malformed `rg` invocation.
Do not treat its claimed checks as evidence; reproduce the narrow checks
directly.

## Allowed review actions

- Read repository and governance evidence.
- Run only Git diff/status, exact path/link/term checks, and other narrow
  read-only documentation checks needed for the verdict.
- Create exactly the two governance result paths below as the required Reviewer
  output. Do not stage, commit, or push them. This bounded result writing is not
  a product or candidate patch. The Advisor will inspect their exact content,
  preserve the verdict without rewriting it, and perform the governance commit.

Do not modify the product candidate, patch documentation, run product tests,
builds, servers, visual suites, broad audits, Slack, tmux delivery, Registry,
or external projects. Do not dispatch another Actor, accept risk, or grant
Founder approval.

## Result contract

Write exactly:

1. `runs/agent-office/20260715_agent_office_minimal_team_onboarding_manual_001/SENTINEL_DOCUMENTATION_REVIEW_RESULT.md`
2. `advisor/jobs/20260715_agent_office_minimal_team_onboarding_manual_001/03_SENTINEL_DOCUMENTATION_REVIEW_RESULT_POINTER.md`

Use one explicit verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
List findings first with exact file/line evidence. If there are no findings,
state that clearly. Record checks run, candidate identity, independence, scope,
unchanged AS1 evidence, the two uncommitted result paths, and the return route.
Do not claim a result commit or push. Leave the product candidate clean and
unchanged; leave exactly the two authorized untracked governance result files
for Advisor preservation, return to `agent-office-advisor`, and STOP.
