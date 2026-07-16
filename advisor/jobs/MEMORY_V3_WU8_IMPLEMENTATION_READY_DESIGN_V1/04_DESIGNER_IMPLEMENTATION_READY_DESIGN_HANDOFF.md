# Designer Handoff — Memory V3 WU8 Implementation-Ready Design

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-DESIGNER-001
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
ROLE: Designer
ROLE_MODE: IMPLEMENTATION_READY_CROSS_PROJECT_DESIGN_ONLY
RESPONSIBLE_ADVISOR: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/FOUNDATION
FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6

COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f

FOUNDATION_CONTROL_REPOSITORY: /home/leo/Project/foundation-control
FOUNDATION_CONTROL_BRANCH: shadow/m5-ingress-gate
FOUNDATION_CONTROL_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0

FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
CONTROL_CONTRACT_COMMIT: 80dfbe00dd2235a12fea2f168d07ed930e0cc1c3
DESIGN_AUTHORITY_CLARIFICATION_COMMIT: 47eaf97c235f5de86dc4e06cd58238619cc55409

REQUIRED_SKILL: /fable-builder
MODEL_EFFORT: high
```

## Required reads

Read every source directly; do not execute from memory:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/designer.md`
3. `/home/leo/Project/FOUNDATION/AGENTS.md`
4. `/home/leo/Project/FOUNDATION/CLAUDE.md`
5. `/home/leo/Project/Cosmile/AGENTS.md`
6. `/home/leo/Project/Cosmile/CLAUDE.md`
7. `advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/11_FOUNDER_WU8_DIRECTION_DECISION.md` at `25ec350584fc2df0a9ae77a1bb5192dbaa36630a`
8. `advisor/jobs/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/03_FOUNDER_DESIGN_AUTHORITY_CLARIFICATION.md` at `47eaf97c235f5de86dc4e06cd58238619cc55409`
9. `runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/CONTROL_SELECTED_DIRECTION_CONTRACT_RESULT.md` at `80dfbe00dd2235a12fea2f168d07ed930e0cc1c3`
10. `advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/04_FOUNDER_DECISION_PACKAGE.md` at `bd4b3c985a386e704b27538dbe45093442101167`
11. `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md` at `4480b55`
12. `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT.md` at `0d28bc0`
13. The exact pinned FOUNDATION and Cosmile source/contracts necessary to ground every
    proposed interface, logical schema, future file path, flag, transaction, and test seam.

## Goal

Produce the minimum coherent, independently reviewable WU8 implementation-ready design for
the five Founder-selected directions. A future repository-owner Worker must be able to
implement a later explicitly authorized WorkUnit without inventing product policy, field
meaning, ownership, failure behavior, privacy behavior, transaction semantics, or tests.

This is design only. No implementation, execution, access, activation, rehearsal, or product-
repository write is authorized.

## Fixed design directions

```text
D8-1: D8-1-A
D8-2: D8-2-A
D8-3: D8-3-B_DESIGN_DIRECTION_ONLY
D8-4: D8-4-A
D8-5: D8-5-A
```

Preserve exactly:

- infrastructure/gateway-owned authentication;
- concrete authenticity mechanism remains Security-gated and unselected;
- Cosmile remains current-consent authority;
- current consent is verified at intake and every later transition;
- unavailable or unverifiable consent fails closed;
- bounded non-prod outbox-to-ingress pipeline as a design direction only;
- at-least-once delivery, idempotent Foundation commit, per-root ordering, bounded retry,
  category-only dead letter, backpressure, rollback, and kill switch;
- WU8 ends at durable accepted-evidence records and review-only candidate drafts;
- no current `MemoryCandidate` or `SharedMemoryStore` bridge;
- adverse policy remains `UNCONFIGURED`; skin/other adverse evidence remains rejected;
- guest/anonymous cross-service evidence remains forbidden.

## Required design package

The result must be one coherent design, not disconnected options. It must distinguish
verified current fact, fixed Founder direction, proposed future design, unresolved external
gate, and forbidden scope.

At minimum include:

1. **Authority and pinned baselines.** Exact decision/clarification/Control commits,
   product branches/HEADs, current landed C boundaries, and zero-write assertions.
2. **System spaces and ownership.** Cosmile outbox/producer, future Cosmile sender,
   infrastructure/gateway, Cosmile current-consent authority, future Foundation ingress,
   durable accepted-evidence state, review-only drafts, and explicitly deferred candidate
   runtime. No actor may absorb another owner's authority.
3. **Application and logical message contracts.** Exact versioned envelope carrier,
   authenticated-ingress principal contract, opaque digest-bound attestation/verdict
   interface, current-consent request/verdict interface, delivery acknowledgement and safe
   error categories, correction/retraction/replay/lineage handling, and strict minimization.
4. **Authentication gate.** Define required principal bindings, verdict states, failure
   states, and Security approval evidence. Do not select or invent mTLS, signing keys,
   tokens, certificates, credential custody, rotation policy, or any concrete mechanism.
   State that this portion is not Security-authentication implementation-ready.
5. **Delivery semantics.** Exact at-least-once state machine; idempotent Foundation commit;
   per-root ordering; bounded retry and exhaustion; poison input; category-only dead letter;
   queue/rate/byte backpressure; acknowledgement timing; crash/restart boundaries; no
   exactly-once claim; no silent drop or infinite retry.
6. **Durable data model and logical schema.** Implementation-ready entities, fields,
   nullability, enums, indexes/uniqueness, foreign-key or lineage constraints, tombstones,
   review-only draft slots, consent/provenance evidence categories, minimized audit, and
   retention/cleanup classifications. Preserve the six existing uniqueness constraints.
   Do not include raw text, credentials, PII, raw identifiers, full payloads, or diagnostic
   leakage in storage, DLQ, audit, metrics, or responses.
7. **Transactions and concurrency.** Exact atomic boundary, first-writer behavior,
   replay/collision/correction/retraction races, verifier placement outside transactions,
   post-commit audit failure handling, isolation requirements, and rollback semantics.
8. **Schema and migration plan.** Exact additive future schema/migration sequence,
   compatibility/empty-state gates, forward/down plan, rollback, cleanup, and evidence
   requirements. Name future repository paths and responsible repo-local Worker. Do not
   create/apply/rehearse a schema or migration, connect to a DB, or claim a real DB result.
   If repository evidence cannot justify one concrete future path or technology, mark the
   exact architecture decision gate instead of inventing it.
9. **Local/non-prod topology design.** Exact future components, logical boundaries,
   process ownership, OFF/HARD_OFF configuration, containment, and shutdown behavior.
   No endpoint, broker, sender, consumer, provider, network, DB, or flag is created or run.
10. **Consent/revocation/erasure boundary.** Verify current consent at intake and every
    later transition; unavailable/unverifiable fails closed. D8-2-C lifecycle propagation
    and complete legal erasure remain deferred unless explicitly necessary to express the
    D8-2-A adapter boundary. Do not turn a snapshot into current authority.
11. **Candidate and safety boundary.** Stop at durable accepted-evidence records and
    review-only `CommerceOutcomeCandidateV1` / `CommerceAdverseCandidateV1` drafts. No current
    candidate materialization/store write/approval/reuse/promotion/ranking/safety mutation.
    Adverse UNCONFIGURED and guest forbidden must yield zero accepted evidence/drafts.
12. **Rollback and kill switch.** Default OFF plus activation-class HARD_OFF gates,
    verifier/policy UNCONFIGURED behavior, queue containment, safe rollback ordering,
    forward/down restrictions, and evidence proving no unauthorized transition.
13. **Future test and verification plan.** Unit, property, malicious-input, serialization,
    retry, ordering, crash/restart, multi-process concurrency, idempotency, collision,
    correction/retraction, consent-unavailable, provenance-unconfigured, adverse/guest,
    migration forward/down, rollback, observability minimization, and regression gates.
    Design tests only; run none.
14. **Threat/privacy analysis.** Spoofing, replay, consent staleness, lineage races,
    payload/identifier leakage, DLQ/log leaks, erasure gaps, cross-tenant identity, poison
    queues, resource exhaustion, unsafe rollback, and fail-open activation.
15. **Exact future WorkUnits.** Ordered, dependency-gated, repo-owner-specific WorkUnits
    with exact future allowed paths, actions, tests, stop conditions, rollback, evidence,
    required skill, and suggested effort. Control/Designer never implement. No WorkUnit is
    authorized by this design or review.
16. **Traceability and honest limits.** Map each selected direction and every required
    invariant to design sections, future paths, tests, review checks, and unresolved gates.
    Explicitly identify what is and is not implementation-ready.

## Allowed actions and writes

Read-only inspection of FOUNDATION, Cosmile, foundation-control, and committed
foundation-docs evidence. Write only:

```text
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_RESULT.md
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/WU8_IMPLEMENTATION_READY_DESIGN_POINTER.md
```

Do not modify product repositories or their design documents. Do not stage, commit, push,
fetch, switch branches, run product tests/builds, access DB/network/secrets/env, apply or
rehearse schema/migrations, change flags, create runtime components, or dispatch another
actor. The Advisor validates and publishes the result.

## Completion and STOP

Return `DESIGN_READY_FOR_INDEPENDENT_REVIEW` only if the design contains no hidden Founder,
Security, Legal, identity, retention, backend, or product decision in an allegedly executable
WorkUnit. Otherwise return `DESIGN_NOT_READY` with the exact blocker.

```text
WU8_IMPLEMENTATION: NOT_AUTHORIZED
DELIVERY_OR_INTAKE_IMPLEMENTATION: NOT_AUTHORIZED
DB_SCHEMA_MIGRATION_IMPLEMENTATION_OR_REHEARSAL: NOT_AUTHORIZED
SECURITY_AUTHENTICATION_IMPLEMENTATION_READINESS: NOT_AUTHORIZED
PRODUCT_REPOSITORY_WRITE: ZERO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
