# Foundation Team Execution Model Brief

Status: `ACTIVE_DIRECT_INSTRUCTION`

Mission ID: `FOUNDATION_TEAM_EXECUTION_MODEL_ACK_20260715_01`

## Required mission train

```text
Leo/GPT
-> foundation-advisor intake, unknown gate, risk and scope classification
-> foundation-control only when bounded cross-project contract input is needed
-> foundation-designer design before every implementation
-> independent Reviewer DESIGN_REVIEW
-> foundation-advisor freezes project-specific WorkUnits
-> exact project Worker implementation
-> independent Reviewer IMPLEMENTATION_REVIEW
-> same Worker bounded patch when needed
-> same Reviewer DELTA_REVIEW only
-> foundation-advisor evidence audit
-> Leo/GPT closure, risk acceptance, and next-mission decision
```

No implementation starts without a Designer artifact and independent design
review. A small implementation may receive a compact design; design is not
omitted.

## Role boundaries

- `foundation-control` provides bounded architecture, ownership, contract,
  interface, release-sequence, rollback, and stop-condition input only. Control
  never implements in FOUNDATION, SIASIU, Cosmile, or `foundation-control` and
  never changes into a Worker mode.
- `foundation-designer` owns every pre-implementation design and any design
  correction. Designer does not implement or self-review.
- `foundation` implements only FOUNDATION WorkUnits.
- `siasiu` implements only SIASIU WorkUnits.
- `cosmile` implements only Cosmile WorkUnits.
- the independent Foundation Reviewer performs separate design and
  implementation reviews, never patches, and returns its judgment through the
  Advisor.
- every assignment and result routes through `foundation-advisor`. No
  subordinate contacts or dispatches another subordinate.

## Skill and effort

```text
IMPLEMENTATION_SKILL: /fable-builder
IMPLEMENTATION_EFFORT: ultracode
REVIEW_SKILL: /fable-sentinel
TEST_AND_VERIFICATION_EFFORT: max
OTHER_EFFORT: selected by difficulty, uncertainty, failure cost, and risk
```

Effort is not selected because it is cheap. Test/review breadth and reasoning
effort are separate: a narrow affected test set still uses `max` verification.

## Modification and delta rule

The first design or implementation review checks the complete relevant
candidate. After any reviewed candidate is modified, re-review is always the
delta between the previous reviewed subject and the new subject:

```text
PREVIOUS_SUBJECT_HEAD
-> NEW_SUBJECT_HEAD
-> changed paths and findings
-> affected adjacent behavior introduced by that delta
-> same Reviewer DELTA_REVIEW
```

Do not restart the review from zero and do not re-review unchanged material.
If a modification expands affected paths, those newly affected paths are part
of the delta; the unchanged prior subject remains trusted evidence. Tests after
a modification target the changed and affected surfaces at `max` verification
effort.

## File-first result routing

Every actor writes its own detailed result to the exact `foundation-docs/runs/`
path in the committed handoff, returns only a concise pointer to the Advisor,
and stops. The result records actual scope, exact files/commits, checks, model,
effort, skill, limitations, risk, and Git state. No actor rewrites another
actor's result or verdict. Publication/commit/push follows the actor's current
role and exact handoff; it is never inferred.

## Universal stops

Stop and return to the Advisor on unclear actor/session/repo/branch/worktree,
authority conflict, scope expansion, overlapping dirty state, missing design
PASS, unexpected approval/authentication, DB/schema/migration, secret/PII,
production/live, protected branch, main merge/push, force push, or missing
result evidence.
