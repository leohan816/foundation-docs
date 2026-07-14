# Independent Design Review Handoff

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

REVIEW_CLASS: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_REVIEW`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

EFFORT: `xhigh`

EFFORT_RATIONALE: This gate reviews a frozen documentation/contract package
with no runtime implementation, secret, connection, or live authority. `xhigh`
is proportionate; the implementation/security review will use `max`.

## Frozen inputs

- Target repository:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Target branch: `feature/as1-multi-team-slack-pilot-001`
- Design base: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- Initial design content: `51895eed20787dbf9ffa965fd73701336a323523`
- Advisor preflight package correction:
  `2a01f054d85c8da18d99ec549e1937ebbc964727`
- Frozen evidence head: `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`

The initial and patch Designer result/pointer files are evidence, not authority
or a verdict. Inspect the actual frozen commits and diff directly.

## Required reads

1. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only its relevant
   contract, provenance, classification, and failure-escalation references.
2. This job's `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`,
   `05_DESIGN_REVIEW_BRIEF.md`, and this handoff.
3. All ten files changed from the design base through the frozen evidence head.
4. The load-bearing Exact Delivery v2, Advisor Inbox, organization registry,
   readiness, persistence, and runtime-composition sources named by the design.
5. Current official Slack sources needed to verify manifest, Socket Mode,
   identity, ACK/retry, `bots.info`, and outbound semantics.

## Review execution

- Review the package against every mandatory gate in
  `05_DESIGN_REVIEW_BRIEF.md`.
- Verify the exact final app/bot names are `agent-office-advisor` and
  `foundation-advisor` and are not treated as routing authority.
- Parse both frozen manifests with local Python/PyYAML and verify exact scopes,
  events, disabled surfaces, and distinct identities.
- Verify the ten-key environment template and no-secret state.
- Inspect the exact base-to-package and preflight-patch diffs, ancestry,
  clean/upstream-equal state, and Designer report accuracy, including all failed
  or unavailable commands and the overlapping-range false duplicate premise.
- Determine whether the closed-profile design can actually be implemented
  without weakening Exact Delivery v2, creating standing authority, or relying
  on an SDK behavior that prevents persist-before-ACK or no-blind-resend.
- Run only design/static checks. Do not run product, Living Office, browser,
  broad unit, live network, Slack, tmux mutation, or unrelated suites.

## Independence and output

Do not patch the target candidate, modify its branch, implement source, access
secrets, connect Slack, dispatch another actor, accept risk, or grant final
approval. Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/07_DESIGN_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/07_DESIGN_REVIEW_RESULT_POINTER.md`

Commit and non-force push those two evidence files to the already checked-out
governance branch. Return exactly one verdict: `PASS`, `PASS_WITH_RISK`,
`NEEDS_PATCH`, or `FAIL`, plus precise findings and evidence. Return to
`agent-office-advisor` and STOP.
