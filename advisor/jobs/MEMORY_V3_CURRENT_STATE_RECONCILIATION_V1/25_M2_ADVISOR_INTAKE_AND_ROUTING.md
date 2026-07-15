# Memory V3 M2 — Advisor Intake and Routing

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
PHASE: M2_STAGED_EXECUTION
RESPONSIBLE_ADVISOR: foundation-advisor
ROLE_INSTANCE_ID: foundation-advisor-20260714-01
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_PROJECT: CROSS_PROJECT_THEN_COSMILE
RISK: HIGH
LEO_DECISION_REQUIRED: NO_FOR_CURRENT_STAGE

CURRENT_AUTHORITY:
- Leo/GPT FOUNDER_MEMORY_V3_D1_D3_DECISION
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- matching Agent Office role documents
- exact committed Advisor handoffs
- project-local AGENTS.md and CLAUDE.md

CURRENT_ALLOWED_STAGE:
1. Control cross-project contract analysis, no product writes
2. Designer A/B implementation-ready design, no product writes
3. independent A/B design review
4. Cosmile Worker A/B repo-local implementation after design PASS
5. independent implementation review and bounded delta-only patch loops
6. C contract and implementation-ready design
7. independent C design review
8. HARD STOP before C implementation/delivery/intake

FORBIDDEN:
- Control or Designer product-repository changes
- SIASIU or FOUNDATION product implementation
- real target DB connection/query/migration/deployment
- production/live/protected-main work
- persistent feature-flag activation
- outbox consumer, flush, or network delivery
- Foundation intake or C runtime connection
- automatic memory promotion, ranking mutation, or safety mutation
- raw-text feedback, external semantic provider, automatic identity linking
- full Package 1B
- automatic work after the final C design review

EFFORT_PLAN:
- Control contract analysis: Opus 4.8, high
- Designer implementation-ready design: GPT-5.6 SOL, max
- Cosmile implementation: Opus 4.8, ultracode
- safe targeted test re-verification: max
- independent design/implementation/delta review: Fable 5, max

SKILL_PLAN:
- Control, Designer, Worker: /fable-builder
- Independent Reviewer: /fable-sentinel

PATCH_LOOP:
- same author patches only bounded findings
- same Reviewer performs delta-only re-review
- broader review only if the delta touches new load-bearing/security boundaries
```

## Worktree observations at intake

- `foundation-docs` is clean on
  `advisor/foundation-team-role-alignment-20260714` before this intake.
- Cosmile is on `shadow/m4-cosmile-memory` with six pre-existing untracked
  documentation files. They are unrelated user-owned dirt and must remain
  untouched and unstaged.
- Foundation, SIASIU, and foundation-control remain outside the A/B product write
  scope.

## Next action routing

```text
NEXT_ACTOR: foundation-control
ROLE: Control
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
RETURN_TO: foundation-advisor
```
