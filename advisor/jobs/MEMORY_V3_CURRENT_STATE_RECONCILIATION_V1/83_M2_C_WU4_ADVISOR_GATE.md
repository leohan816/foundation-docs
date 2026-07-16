# M2 C WU4 — Advisor start gate

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-WU4-CANDIDATE-DRAFTS-001
ADVISOR: foundation-advisor
GATE_VERDICT: PASS_TO_EXACT_WORKER_HANDOFF
PRODUCT_REPOSITORY: /home/leo/Project/FOUNDATION
PRODUCT_BRANCH: shadow/foundation-shared-memory-v0
PRODUCT_BASE_HEAD: de63c8fedaa27e470e44359cad1c2940bdc0a866
PRODUCT_HEAD_EQUALS_UPSTREAM: YES
PRODUCT_DIRT_FINGERPRINT: 4b1f8fb5684199691bfbafc427bc6ad85ba8d9a577b007693eadb901acf7a0f2
ORIGINAL_WU4_DESIGN_REVIEW: PASS
COUNT_CORRECTION_DELTA_REVIEW: PASS
FINDING_DR-W4-F1: CLOSED
WORK_UNIT_5_TO_8_STARTED: NO
WORK_UNIT_8_AUTHORITY: NOT_AUTHORIZED
```

## Gate evidence

- WU1–WU3 passed Advisor gates; WU3 product head is the exact current base.
- The WU4 implementation-ready clarification was reviewed by the independent
  `foundation-reviewer-fable5` at `claude-fable-5 / max`; verdict `PASS` at
  foundation-docs commit `b0a22b8408b6a5a4fada2812a44607a39f4f6926`.
- The only non-blocking count finding was corrected by the same Designer at
  `f225607a86288e6857d2753bd349927f67469ba6` and delta-only re-reviewed by
  the same Reviewer; verdict `PASS`, finding closed, evidence commit
  `c285ebdb429af83ca10bc51e6a0a82f7fa612738`.
- The corrected clarification SHA-256 is
  `f9b9ad15d16daf6dd6edb97621ec3ef4f43efa6173d636d4c6898e5d831f0a2f`;
  the implementation-ready design SHA-256 remains
  `3d04f6f927b763efd977c23ec44b210fd8dbbedfa637e5144c3d932b53cbeb66`.
- Foundation is on the exact authorized non-protected branch and the two
  pre-existing unrelated untracked files remain the entire dirt baseline.
- The Founder documentation allowlist correction at
  `36690ec2b0810dc46bb90be9fda4a596d5d17af0` permits only the canonical C
  design document and its existing index in addition to WU4 code/test paths.

## Boundary

WU4 may start only through the separate exact Foundation Worker handoff. It may
implement the pure candidate plan/adoption boundary and its dedicated tests, plus
the required canonical design/index sync. It must not implement WU5 service,
audit, flags, orchestration, poison latch, or any WU6–WU8 behavior.

```text
WU4_STATUS: ELIGIBLE_BY_EXACT_WORKER_HANDOFF
WU5_TO_WU8: NOT_STARTED
DELIVERY_OR_INTAKE: NOT_AUTHORIZED
DURABLE_OR_CURRENT_MEMORY_RUNTIME: NOT_AUTHORIZED
REAL_USER_APPLICATION_APPROVAL_REUSE_PROMOTION_RANKING_SAFETY_MUTATION: NOT_AUTHORIZED
REAL_DB_NETWORK_SECRET_PRODUCTION_M3: NOT_AUTHORIZED
NEXT_ACTOR: foundation Worker
```
