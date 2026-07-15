# Minimal Team Onboarding Manual - Sentinel Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`

ASSIGNED_ACTOR: `agent-office-reviewer`

ROLE: `SAME_INDEPENDENT_SENTINEL_REVIEWER`

RETURN_TO: `agent-office-advisor`

## Dispatch profile

```text
TASK_COMPLEXITY: LOW_SINGLE_FINDING_DELTA_REVIEW
RISK_LEVEL: LEVEL_1_AUTHORITY_WORDING
SELECTED_MODEL: gpt-5.6-sol
SELECTED_MODE: independent Sentinel delta review
SELECTED_EFFORT: xhigh
REQUIRED_SKILL: /fable-sentinel; if unavailable, apply /home/leo/Project/skill/fable-sentinel/SKILL.md directly
WHY_NOT_LOWER: the corrected sentence is an authority-entry invariant
WHY_NOT_HIGHER: max is unnecessary for one line-level correction with frozen prior evidence
ESCALATION_TRIGGER: P1 remains open, another contract drifts, or scope exceeds one path
```

## Frozen coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_MINIMAL_TEAM_ONBOARDING_MANUAL_001`
- branch: `feature/minimal-team-onboarding-manual-001`
- mission baseline: `50124a1ea720e162e906c04c6f6fb2591c4974b8`
- reviewed candidate: `7482d166021014153952fe857aa2db02cdffc20b`
- patch candidate: `1059c458a5d63fe628fc3fc13429555a0417196a`
- prior verdict evidence commit:
  `19078dcd6d5189c3860eb1933d9b314e9e389a08`
- prior finding: P1, conflicting Advisor-versus-subordinate entry authority in
  `docs/agent/roles/README.md`.

AS1 remains frozen at
`0dfb4398be2ecd9295b35a94e3b461e25dad6f7c` and
`OWNER_SETUP_REQUIRED`.

## Exact delta review

Apply the same Sentinel protocol from the initial review. If the slash alias is
not available, read the direct skill source named above. Reuse the frozen
initial-review evidence; do not repeat the full review.

Inspect the actual `7482d16...1059c45` delta and verify:

1. exactly one product path changed: `docs/agent/roles/README.md`;
2. the responsible Advisor starts only from the current Leo/GPT mission or
   decision;
3. each subordinate starts only from an exact committed Advisor handoff;
4. unclear authority still fails closed;
5. no other reviewed text or previously satisfied criterion regressed;
6. the product worktree is clean and upstream-equal at the patch candidate;
7. AS1 remains unchanged.

Run only narrow read-only Git, line, and state checks needed for this delta.
Do not run product tests, builds, broad review, runtime work, Slack, Registry,
or external-project checks already proven and unaffected.

## Result contract

Write exactly these two uncommitted governance result files:

1. `runs/agent-office/20260715_agent_office_minimal_team_onboarding_manual_001/SENTINEL_DOCUMENTATION_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260715_agent_office_minimal_team_onboarding_manual_001/06_SENTINEL_DOCUMENTATION_DELTA_REVIEW_RESULT_POINTER.md`

Return one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
Do not modify the product candidate, stage, commit, or push. Leave exactly the
two authorized new result files untracked for Advisor preservation, return the
verdict to `agent-office-advisor`, and STOP.
