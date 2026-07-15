# M2 A/B Control — B1 Founder-Authority Delta Correction

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-CONTROL-B1-DELTA-CORRECTION
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
ROLE: Control
MODE: RESULT_ARTIFACT_DELTA_CORRECTION_ONLY
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

REQUIRED_SKILL: /fable-builder
REQUIRED_MODEL_EFFORT: Opus 4.8 (1M) / high

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT_POINTER.md

FORBIDDEN: every product/control write, tests, DB, secret/env, network, fetch,
branch change, commit, push, new actor/subagent, broad re-analysis, C design, or
implementation.
```

Correct only the B1 treatment contradicted by the already-fixed Founder constraint
4 in `24_M2_FOUNDER_D1_D3_DECISION.md`:

- The presence of a pre-existing Cosmile-local `MemoryFactCandidate` schema/model
  is a current fact, not an unresolved authority question.
- For this authorized A/B scope, Founder constraint 4 is decisive: Cosmile must
  create neither `MemoryFactCandidate` nor an adverse candidate.
- Therefore all A/B candidate-model writers and all calls to candidate creation or
  promotion are explicitly forbidden and must remain zero.
- Do not destructively remove or re-key the pre-existing legacy/local model in this
  mission; leave it untouched and classify it as outside the A/B write scope.
- Future C design may describe Foundation ownership, but no C runtime authority is
  created here.
- Remove claims that a new Designer/Founder decision is required for B1. Mark B1
  `RESOLVED_BY_FOUNDER_F4_FOR_A_B`.

Update only the affected B1 passages, Designer criterion, return summary, and
pointer. Do not alter other facts, classifications, clauses, paths, or evidence.
Re-read the delta and confirm the two files are the only modified paths. Return
the compact corrected pointer and STOP.
