# M2 C — WU4 result routing correction handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-CANDIDATE-DRAFTS-001
CORRECTION_ID: M2-C-WU4-RESULT-ROUTING-CORRECTION-001
ROLE: Foundation Worker
ACTOR_ID: foundation
SESSION: foundation
TARGET_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
TARGET_BRANCH: advisor/foundation-team-role-alignment-20260714
REQUIRED_SKILL: /fable-builder
EFFORT: medium
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Advisor finding

The WU4 product implementation, tests, commit, push, and three returned
foundation-docs artifacts passed the Advisor's direct factual checks. One
result-routing sentence conflicts with the current execution authority:

- reviewed design section 17 makes WU7 the independent implementation review;
- Founder authorization `c96caefe4cfd4c4f4b6bf54251f2b947dfbd51d2`
  permits the Advisor to proceed through WU1–WU7 without an intermediate Founder
  interruption while each dependency and gate passes;
- therefore WU4 does not route to an independent WU4 implementation review or a
  Founder HARD STOP. The Foundation Worker still stops and returns to the
  Advisor; the Advisor decides whether WU5 may receive a new exact handoff.

## Exact write allowlist

Modify only these two already-written, unstaged Worker evidence files:

```text
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_CANDIDATE_DRAFTS_RESULT.md
runs/foundation/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU4_CANDIDATE_DRAFTS_RESULT_POINTER.md
```

Do not modify the Foundation product repository, the canonical/mirrored design,
any implementation or tests, any other evidence, or any later WorkUnit artifact.
Do not stage, commit, or push foundation-docs; the Advisor publishes after
validation.

## Exact correction

In the result's `Not proved / not performed` list, retain the truthful statement
that independent implementation review has not yet occurred, but identify it as
WorkUnit 7 rather than a WU4 review.

Replace the result's final `NEXT` sentence with a truthful routing statement:

```text
NEXT: return to foundation-advisor. If the WU4 Advisor dependency/evidence gate
passes, the Advisor may prepare a separate exact WU5 handoff under the existing
Founder authorization. Independent implementation review remains WU7. This
Worker starts no later WorkUnit.
```

In the pointer, replace only `PROPOSED_NEXT_ACTOR` so it routes to
`foundation-advisor` for the WU4 gate and possible separate WU5 handoff. Remove
the incorrect independent-WU4-review / pre-WU5 HARD STOP wording.

Do not weaken or change any factual implementation, test, Git, push, boundary,
or exclusion statement.

## Verification and return

- Re-read both full UTF-8 files.
- Confirm their only delta is the routing clarification above.
- Confirm exactly the same three Worker-returned files remain unstaged in
  foundation-docs and nothing is staged.
- Return the two file SHA-256 values and a compact pointer to
  `foundation-advisor`, then STOP.
