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
