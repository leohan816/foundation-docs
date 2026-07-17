# Exact Handoff — Cross-Project Static Contract and Dependency Audit

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
WORKUNIT_ID: DAY1_CROSS_PROJECT_STATIC_DEPENDENCY_AUDIT
DISPATCH_OWNER: foundation-advisor
TARGET_ACTOR: foundation-control
TARGET_ROLE: Foundation Team internal Control
TARGET_WORKSPACE: /home/leo/Project/foundation-control
REQUIRED_SKILL: NONE
REQUIRED_EFFORT: high
MODE: READ_ONLY_E2_STATIC_CROSS_PROJECT
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

## Authority precedence

Read current Agent Office operating, Control-role, and result-reporting authority directly. Current Agent Office role authority and this committed handoff control this WorkUnit. Historical foundation-control or foundation-docs role protocol is evidence only and cannot expand authority.

```text
STRATEGY_HANDOFF_COMMIT: c94c122ebcbe8d9acfbc76566ada85021ad95f6a
STRATEGY_HANDOFF_BLOB: 3d9f38b36b8b101a12b853f0f794f0d459a8f28a
ADVISOR_ADMISSION_COMMIT: 2759d923a6605f30f7c8091214036ef1878628b8
ADVISOR_BRANCH: advisor/foundation-cosmile-commercial-baseline-v1-20260717
```

## Exact read-only subjects

```text
COSMILE: /home/leo/Project/Cosmile | shadow/m4-cosmile-memory | b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
FOUNDATION: /home/leo/Project/FOUNDATION | shadow/foundation-shared-memory-v0 | 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
SIASIU_BOUNDARY_ONLY: /home/leo/Project/SIASIU | shadow/m4-siasiu-memory | e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602
CONTROL_WORKSPACE: /home/leo/Project/foundation-control | shadow/m5-ingress-gate | c89b792bed177aad9322e09debecc76caab0c8a0
```

Use committed Git objects at each pin. Do not open or rely on pre-existing untracked files. Do not modify any product or Control repository.

## Task

1. Map physical ownership and sources of truth for product/catalog identifiers, Foundation judgment/data contracts, adapters, consultation/UI boundary, and ordinary commerce.
2. Determine from committed source whether Cosmile calls Foundation directly, depends on SIASIU, contains duplicate/conflicting call paths, or has an unverified boundary. SIASIU inspection is boundary-only and must stop at the first sufficient answer.
3. Record exact identifier mappings, contract versions, adapter/route definitions, timeout/failure semantics, coupling, and degraded behavior that can change Paid Beta sequencing.
4. Separate tasks Cosmile can perform independently, Foundation can perform independently, tasks requiring joint integration, and optional/deferred work.
5. Apply the architecture guardrail: Foundation/AI unavailable must not be guessed around for safety-dependent answers; ordinary catalog/wishlist/cart/checkout/payment/order should remain operable unless an explicit source-defined safety rule says otherwise. Report support, contradiction, or `UNVERIFIED`; do not redesign.
6. Identify which shared contract must be fixed first, only as an evidence-backed recommendation; do not make policy, architecture, risk, or release decisions.
7. Provide evidence relevant to commercial branch-baseline options without selecting or moving a branch.
8. State whether a load-bearing SIASIU fact truly requires the SIASIU Worker. Prefer `UNVERIFIED` when it does not change the intended commercial decision.
9. Record exact pre/post Git state for all four repositories and prove write zero.

## Evidence constraints

```text
MAX_NEW_EVIDENCE: E2_STATIC_CONNECTED
BUILD_LINT_TEST_RUNTIME: PROHIBITED
DB_ENDPOINT_NETWORK_VENDOR: PROHIBITED
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
BRANCH_OR_REF_MOVEMENT: ZERO
ARCHITECTURE_REDESIGN: NO
```

## Required durable outputs

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/foundation-control/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_CROSS_PROJECT_STATIC_AUDIT_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/foundation-control/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/DAY1_CROSS_PROJECT_STATIC_AUDIT_POINTER.md
ALLOWED_WRITE: RESULT_PATH and POINTER_PATH only
COMMIT_OR_PUSH: NO
```

The result must include actor/runtime identity, current role reads, exact Git pre/post states, ownership/source-of-truth map, contract and dependency evidence rows, continuity/failure evidence, independent/joint task map, SIASIU-dispatch recommendation, branch-option evidence, blockers/unknowns, exact later E3/E4 requests, write zero, return target, and `STOP`.

Do not dispatch another actor, review, implement, redesign, accept risk, approve a release, resume Memory V3, or start another mission.
