# Advisor Instruction Gate

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_PROJECT: CROSS_PROJECT
RISK: HIGH (authenticity, consent, identity, retention, durable-storage policy)
LEO_DECISION_REQUIRED_BEFORE_DISCOVERY: NO
LEO_DECISION_REQUIRED_FOR_GATE_CLOSURE: YES
REQUIRED_ROLES: Advisor, Control, independent Reviewer
PRODUCT_WORKER: NOT_AUTHORIZED
DESIGNER: NOT_REQUIRED; contradiction triggers STOP
IMPLEMENTATION: NOT_AUTHORIZED
```

## Verified entry facts

- The committed Gate Package and prior final audit exist at the exact supplied
  commits; their Git blobs and SHA-256 values were independently recomputed.
- All four product/control repositories match the exact supplied branches and
  HEADs and are upstream-equal.
- Their tracked worktrees are clean; disclosed untracked files predate this
  mission and must remain untouched.
- The foundation-docs mission worktree begins clean and upstream-equal on
  `advisor/foundation-team-role-alignment-20260714`.
- Current role/routing authority is Agent Office `docs/agent/`, not historical
  foundation-docs role material.

## Limits applied

- Product and control repositories are read-only.
- Only this mission's `foundation-docs/advisor/jobs/**` and
  `foundation-docs/runs/shared/**` artifact paths may be written.
- No product Worker or Designer dispatch.
- Control provides evidence but selects no gate option and closes no gate.
- The Advisor integrates evidence but accepts no risk and closes no gate.
- Independent review PASS validates package accuracy/readiness only.
- Every unverified path, owner, platform capability, technology, or operational
  boundary stays explicitly unresolved and fail-closed.

## Completion criteria

One committed and pushed closure-readiness package, independent review PASS
(including same-Reviewer delta-only loop if needed), Advisor final audit,
repository-containment verification, HARD STOP, and a consolidated pointer to
Leo/GPT. U1, U2, and U3 remain OPEN.
