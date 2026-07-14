# Independent F01 Design Delta Review Handoff

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

TARGET_SESSION: `agent-office-reviewer`

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

REVIEW_CLASS: `LEVEL_3_SECURITY_TRANSPORT_DESIGN_DELTA_REVIEW`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

EFFORT: `xhigh`

EFFORT_RATIONALE: The same Reviewer is rechecking one bounded contract finding
in a documentation-only patch. `xhigh` is proportionate; implementation and
live-security review remains a later `max` gate.

## Frozen inputs

- Target worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Target branch: `feature/as1-multi-team-slack-pilot-001`
- Initial design-review verdict:
  `8cfe192b7bfba3fe2c93d01232aec314878cec99`
- Prior reviewed head:
  `ce250c05218cc6d9cc4f2f3b0c43b678b95ec776`
- F01 package commit:
  `0d217149c609c827e99fcc1324e247a809c13ff4`
- F01 result commit:
  `fa9e7eccd22df07cce78c8a2349a31125314ecd9`
- Frozen delta-review head:
  `86c7edb3f5cee26171fcb80c0704c46962d15be6`

## Required reads and execution

1. Read the Sentinel skill and only its relevant review, evidence,
   classification, and escalation sections.
2. Read the initial verdict, the F01 Designer brief/handoff, this delta brief,
   and this handoff.
3. Inspect the actual five-path delta and the complete three-document F01
   contract patch. Read only affected surrounding/load-bearing code or design
   sections needed to establish correctness.
4. Reproduce every gate in `09_DESIGN_DELTA_REVIEW_BRIEF.md` with delta-first
   checks. Preserve the previous Reviewer's unaffected accepted findings.
5. Verify the Designer result and pointer against actual Git evidence.

## Independence and output

Do not modify the target branch, patch design, implement source, access secrets,
connect Slack, send tmux input, dispatch another actor, accept risk, or grant
final approval. Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/11_DESIGN_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/11_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Commit and non-force push those two evidence files to the checked-out governance
branch. Return one explicit verdict to `agent-office-advisor` and STOP.
