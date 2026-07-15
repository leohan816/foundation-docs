# Advisor B08 Matrix Scope Clarification

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

APPLIES_TO:
`36_ADVISOR_IMPLEMENTATION_PATCH_HANDOFF_V5.md`

## Directly observed inconsistency

The production AS1 service calls `insertDedupe()` with
`preAckClass: PREACK_PENDING`, and the durable writer creates the three decision
fields as null. The existing dedupe parser accepts the full transport-state
enum even though no production update path advances or populates this dedupe
record. The independent Reviewer therefore correctly reproduced an impossible
`MATERIALIZED`/all-null row being accepted.

One existing test in
`tests/security/as1-slack-authority-lifecycle.test.ts` directly calls the store
with `preAckClass: PREACK_ROOT_BOUND`. That value is incidental to the test's
actual purpose, which is exact envelope/event dedupe and divergent-byte
quarantine. It is not production-writer evidence and must not force the durable
parser or input contract to accept a state production cannot create.

## Narrow authorization

Add exactly this one path to the V5 allowed test paths:

- `tests/security/as1-slack-authority-lifecycle.test.ts`

The Worker may change only the incidental dedupe `preAckClass` fixtures in that
test to the canonical production value `PREACK_PENDING`, while preserving the
same dedupe and divergent-byte assertions.

If direct source inspection remains consistent with the facts above, the
Worker must encode the narrow production contract rather than preserve the
stale fixture:

- narrow the production dedupe input/class contract to the only canonical
  writer state;
- accept only the exact state/field combination that canonical production code
  can persist;
- reject `MATERIALIZED`, terminal, populated-field, or other impossible rows as
  `STORE_QUARANTINED`;
- keep transport-journal progression as the canonical post-dedupe state
  machine; do not invent a dedupe update path or second schema.

This clarification does not authorize changes to test intent, unrelated
fixtures, the frozen design, transport states, package files, authority,
registry, runtime composition, or any other file. It tightens B08; it does not
expand product behavior.
