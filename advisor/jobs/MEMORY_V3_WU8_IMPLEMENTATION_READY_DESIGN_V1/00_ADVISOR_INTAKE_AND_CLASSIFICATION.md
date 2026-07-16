# Advisor Intake and Classification — Memory V3 WU8 Design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
MISSION_TYPE: DESIGN_AND_INDEPENDENT_DESIGN_REVIEW_ONLY
RESPONSIBLE_ADVISOR: foundation-advisor

INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_PROJECT: CROSS_PROJECT_FOUNDATION_COSMILE_INGRESS_BOUNDARY
RISK: HIGH
REQUIRED_ROLES: Control / Designer / Independent Reviewer
WORKER_REQUIRED: NO
LEO_DECISION_REQUIRED_BEFORE_THIS_DESIGN: NO

AUTHORIZED_AUTHORITY_FILE: advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/11_FOUNDER_WU8_DIRECTION_DECISION.md
AUTHORIZED_AUTHORITY_COMMIT: 25ec350584fc2df0a9ae77a1bb5192dbaa36630a
AUTHORIZED_AUTHORITY_BLOB: 868300fdb61b064e123179f1f1708ffe2ae6f6e1
AUTHORIZED_AUTHORITY_SHA256: f3d83dbd716761649bd5bb81569a27038354e191e93a4213192e77718a3af00f
```

## Goal

Prepare the minimum coherent WU8 implementation-ready design that implements the
Founder-selected directions D8-1-A, D8-2-A, D8-3-B (design direction only), D8-4-A,
and D8-5-A on paper, obtain an independent design-review verdict, complete only bounded
design-artifact corrections through the same author and same Reviewer, perform the
Advisor final audit, return to Leo/GPT, and keep HARD STOP active.

## Known facts and fixed decisions

- Infrastructure/gateway owns authentication; the concrete mechanism remains
  Security-gated and unimplemented.
- Cosmile remains the current-consent authority. Foundation verifies current consent at
  intake and every later transition and fails closed when unavailable or unverifiable.
- The delivery design direction is a bounded non-prod outbox-to-ingress pipeline using
  at-least-once delivery, idempotent Foundation commit, per-root ordering, bounded retry,
  category-only dead letter, backpressure, rollback, and kill switch.
- WU8 stops at durable accepted-evidence records and review-only candidate drafts.
- There is no current `MemoryCandidate` or `SharedMemoryStore` bridge.
- Adverse policy remains `UNCONFIGURED`; skin/other adverse evidence remains rejected.
- Guest and anonymous cross-service evidence remains forbidden.

## Scope boundary

Allowed writes are restricted to this mission's artifacts under
`foundation-docs/advisor/jobs/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/**` and
`foundation-docs/runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/**` on the
existing non-protected branch `advisor/foundation-team-role-alignment-20260714`.

FOUNDATION, Cosmile, SIASIU, and foundation-control are read-only. No source, product
document, schema, migration, configuration, flag, runtime, DB, network, secret,
credential, sender, consumer, endpoint, broker, delivery, activated intake, current or
durable candidate runtime, production/live, Full Package 1B, or M3 action is authorized.

## Completion criteria

1. Control returns a bounded cross-project contract/ownership artifact.
2. Designer returns one implementation-ready WU8 design whose exact work units, paths,
   interfaces, states, invariants, transaction boundaries, tests, rollback, kill switch,
   STOP conditions, and excluded authority are explicit.
3. An independent Reviewer returns `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.
4. Any correction is design-artifact-only, performed by the same author, and reviewed by
   the same Reviewer using a delta-only pass.
5. Advisor final audit and final pointer are pushed; HARD STOP remains active.

```text
IMPLEMENTATION_AUTHORIZED: NO
DESIGN_AUTHORIZED: YES
INDEPENDENT_DESIGN_REVIEW_AUTHORIZED: YES
HARD_STOP: ACTIVE
RETURN_TO: Leo/GPT
```
