# Dispatch and Boundary Ledger

## Phase 1/2 dispatch

```text
DISPATCH_COMMIT: 38336864996861f6f73af72dc825e8ac30558d08
FOUNDATION_ACTOR: foundation
FOUNDATION_MODEL: claude-fable-5[1m]
FOUNDATION_EFFORT: max
FOUNDATION_HANDOFF: handoffs/10_FOUNDATION_FACT_VERIFICATION_HANDOFF.md
COSMILE_ACTOR: cosmile
COSMILE_MODEL: claude-opus-4-8[1m]
COSMILE_EFFORT: max
COSMILE_HANDOFF: handoffs/11_COSMILE_AS_BUILT_HANDOFF.md
SYNCHRONIZE_PANES: OFF
PRODUCT_WRITE_AUTHORITY: NONE
```

## Cosmile subordinate-dispatch deviation and containment

During the initial read-only investigation, the Cosmile Worker announced and started
two background Explore tasks without Advisor routing:

- `Map catalog/PDP/identity surfaces`
- `Map cart/checkout/order/payment`

This conflicts with the current Team Operating Model's Advisor-only subordinate actor
routing. The Advisor interrupted the Worker immediately, issued a boundary correction,
and required the existing Worker to continue personally. The Worker acknowledged the
correction and stopped both tasks.

```text
BACKGROUND_TASKS_STOPPED: YES
BACKGROUND_RESULTS_ACCEPTED_OR_USED: NO
NEW_PRODUCT_WRITES: NO
MISSION_SCOPE_EXPANDED: NO
ACTOR_MODEL_OR_ROLE_CHANGED: NO
REMEDIATION: SAME_COSMILE_WORKER_CONTINUES_PERSONALLY_AT_MAX
REVIEWER_VISIBILITY_REQUIRED: YES
```

No evidence produced by those stopped tasks may be used in the integrated candidate.
The Cosmile result must state that its accepted evidence was reproduced by the main
Cosmile Worker after containment.

## Designer session recovery

Before Phase 4 dispatch, clearing the long-lived `foundation-designer` Codex thread
returned it to its process-configured `medium` effort and a subsequent interrupt ended
the tmux session. No mission handoff had been accepted and no artifact or repository was
modified. Under the mission's transient-session recovery permission, the Advisor
recreated the exact `foundation-designer` tmux identity, resumed the same Codex thread,
kept the approved `gpt-5.6-sol` model and `/home/leo/Project/FOUNDATION` workspace, and
set effort to the user-approved `max` value.

```text
OLD_SESSION: foundation-designer window @29 pane %29
RECOVERED_SESSION: foundation-designer window @47 pane %47
THREAD_ID: 019f5fa3-a4d3-7540-9dd3-7b335f856772
ACTUAL_MODEL: gpt-5.6-sol
ACTUAL_EFFORT: max
ROLE_SUBSTITUTION: NO
MODEL_SUBSTITUTION: NO
WORKSPACE_CHANGE: NO
PRE_DISPATCH_PRODUCT_OR_ARTIFACT_WRITE: NO
PHASE_4_DISPATCH: ACCEPTED_AFTER_RECOVERY
```

The first Phase 4 handoff accidentally expanded the short evidence commit `d16ab0b`
to a nonexistent full SHA. The Designer correctly refused to consume the working-tree
files as pinned evidence. The Advisor resolved the actual object directly with
`git rev-parse d16ab0b`, corrected only the handoff pin to
`d16ab0bd3a4033666eb774ebb4e92c7d8d0c6470`, committed the correction, and resumed the
same Designer. No uncommitted evidence was used.

## Phase 5 role-owned design dispatch

The independently authored Phase 4 experience design was fixed and pushed at
`b632529f2907e19f92f27770eac4208d60d4cb7d`. The Advisor then committed the two exact
Phase 5 handoffs at `d24c03b0414d070682d39f84aff07613b4da7c57` and live-verified the
existing Worker sessions immediately before dispatch.

```text
FOUNDATION_ACTOR: foundation
FOUNDATION_SESSION: foundation window @3 pane %3
FOUNDATION_MODEL_SELECTION: Fable 5
FOUNDATION_EFFORT: max
FOUNDATION_WORKSPACE: /home/leo/Project/FOUNDATION
FOUNDATION_SKILL_REQUIRED: /fable-builder
FOUNDATION_HANDOFF: handoffs/50_FOUNDATION_SNAPSHOT_DESIGN_HANDOFF.md

COSMILE_ACTOR: cosmile
COSMILE_SESSION: cosmile window @1 pane %1
COSMILE_MODEL_SELECTION: Opus 4.8 (1M context)
COSMILE_EFFORT: max
COSMILE_WORKSPACE: /home/leo/Project/Cosmile
COSMILE_SKILL_REQUIRED: /fable-builder
COSMILE_HANDOFF: handoffs/60_COSMILE_TECHNICAL_DESIGN_HANDOFF.md

SYNCHRONIZE_PANES: OFF
PRODUCT_WRITE_AUTHORITY: NONE
IMPLEMENTATION_AUTHORITY: NONE
SUBAGENT_AUTHORITY: NONE
```

The Cosmile dispatch was accepted and `/fable-builder` loaded. The Foundation dispatch
and one bounded retry were rejected before work began with `Usage credits are required
for this model.` The Advisor did not substitute Opus or another model, lower effort,
change workspace, or route the Foundation-owned design to another actor. The same
Fable 5 / max Foundation session remains the sole approved recovery target.

```text
FOUNDATION_PHASE_5_WORK_STARTED: NO
FOUNDATION_RESULT_WRITTEN: NO
FOUNDATION_PRODUCT_WRITE: NO
MODEL_SUBSTITUTION: NO
RECOVERY_STATE: PENDING_SAME_SESSION_SAME_MODEL_RETRY
COSMILE_PHASE_5_WORK_STARTED: YES
```
