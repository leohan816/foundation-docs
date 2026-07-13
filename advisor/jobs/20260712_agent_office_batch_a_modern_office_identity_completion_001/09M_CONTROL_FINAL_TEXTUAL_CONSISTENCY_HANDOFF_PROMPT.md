TARGET_ACTOR: Control-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: existing Foundation Control session
Do not paste into: Advisor, Worker, Reviewer, or GPT strategy session
Return result to: Advisor

# Control Final Textual Consistency Patch

Mode: `CONTROL_MASTER_DESIGN_MODE`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target: `/home/leo/Project/agent-office-batch-a-001`

Candidate: `8c5d0c25c8b91fbe2bf47ac25dde46494c4a982c`

Read directly:

1. `41_ADVISOR_CONTROL_FINAL_FIVE_DIFF_VALIDATION.md`;
2. the exact five stale locations it cites;
3. the current canonical rules in delta section 2.3 and contract sections 3.1
   and 3.1.1.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Exact Patch

Patch only stale text. Do not redesign or broaden scope.

1. Make every literal summary of `LivingOfficeProductionRenderInputV1` include
   exactly `schemaVersion`, `operational`, `committedLayout`, `viewport`,
   `logicalTimeMs`, `selection`, and always-empty `cues`.
2. Replace every presentation-pod statement that maps an invalid responsible
   Advisor to `UNASSIGNED` with the canonical rule: omit that pod with a
   diagnostic; if no valid pod remains, fall back to `M1_FIXED_STATIONS`.
   Actor-level `advisorTeam=UNASSIGNED` remains valid and must not be changed.
3. Make every project-identity lookup use only
   `CommittedPodConfig.projectKey`; remove registry-project key wording from the
   presentation-layout contract.
4. Correct the `CommittedOfficeLayoutConfigV1` TypeScript comments so
   `projectIdentityByProject` is keyed by `CommittedPodConfig.projectKey`, and a
   null/empty/unresolvable responsible Advisor causes pod omission, never a
   role-instance `UNASSIGNED` value.
5. Run a focused consistency grep over the four canonical docs and report all
   remaining matches for the stale phrases. Preserve legitimate actor-level
   `UNASSIGNED` rules.

## Preserve And Result

Preserve all substantive PRC-1..PRC-8 rules, all accepted boundaries, and all
source/test/config state. Four canonical docs maximum; edit fewer if sufficient.
No implementation. Commit and non-force push the canonical docs, update only the
exact Control result and pointer, return to Advisor, and STOP.

