# Exact Handoff — Read-Only U1–U3 Control Analysis

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-0-CONTROL-ANALYSIS
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
TARGET_WINDOW: @4
TARGET_PANE: %4
ROLE: Control
MODE: READ_ONLY_CROSS_PROJECT_ANALYSIS
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: high
REQUIRED_SKILL: /fable-builder
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

CONTROL_REPOSITORY: /home/leo/Project/foundation-control
CONTROL_BRANCH: shadow/m5-ingress-gate
CONTROL_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f
SIASIU_HEAD: e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602

FOUNDER_DECISION_COMMIT: 691a2d065f5857f7d44d8e23588f2f760204bc47
EXECUTION_MANIFEST_COMMIT: 006ef9108f4acba3a2302e6be91ca02c4a8c978e
MANIFEST_REVIEW_COMMIT: e6db6fdafde5da6a3800e2b523b93d03f4864796
ACTIVATION_COMMIT: 3033b532a487eb57622b9afe3f66de6c1c1601c6
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b

REQUIRED_READS:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/control.md
- the committed Founder Decision Record, reviewed Execution Manifest, Activation Record, and pinned WU8 design
- only directly relevant current source/contracts/docs in the four pinned repositories

ALLOWED_WRITES:
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_RESULT.md
- runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_CONTROL_POINTER.md

PRODUCT_OR_CONTROL_REPOSITORY_WRITE: FORBIDDEN
COMMIT_OR_PUSH: FORBIDDEN
DB_NETWORK_SECRET_RUNTIME_TEST: FORBIDDEN

GOAL:
Return verified, decision-ready read-only evidence and no more than three
concrete options per gate for U1 authenticity, U2 current consent, and U3
Foundation durable backend, without selecting an option or inventing a path.

U1_REQUIRED:
- current authenticity facts and infrastructure/gateway ownership;
- at most three Security-reviewable mechanism options;
- workload/service principal, environment, digest/source-hash, idempotency,
  freshness/replay, custody, rotation, revocation, incident/failure implications;
- Security and Founder decision owners;
- exact blocked/unlocked WorkUnits and fail-closed default.

U2_REQUIRED:
- current consent facts and Cosmile as current-consent authority;
- at most three adapter/transport options;
- request/closed-verdict contracts and unavailable/stale/unknown/mismatch/
  revoked/expired/erasure behavior;
- intake and every-later-transition re-verification;
- envelope snapshot never current authority;
- privacy/Security/Legal/Founder owners;
- exact blocked/unlocked WorkUnits and fail-closed default.

U3_REQUIRED:
- current Foundation architecture facts;
- at most three architecture-grounded backend options;
- logical receipt, accepted evidence, lineage head, tombstone, review-only draft
  slot, category-only audit, exact transaction boundary, and six uniqueness sets;
- multi-process/restart/crash/replay/retention/cleanup/migration/rollback and
  technology/operational tradeoffs;
- Foundation architecture and Founder owners;
- verified paths only, exact blocked/unlocked WorkUnits, and fail-closed default.

PATH_TRUTH_FOR_UNVERIFIED_ITEMS:
PATH_STATUS: UNRESOLVED
REQUIRED_OWNER:
REQUIRED_DISCOVERY:
DEPENDENT_WORKUNITS: BLOCKED

FORBIDDEN:
- product/control file modification or staging;
- selecting U1/U2/U3, closing a gate, accepting risk, implementing, designing
  outside decision options, or claiming dependent authority;
- inventing a path, owner, mechanism, technology, protocol, provider, adapter,
  backend, schema, migration, deployment, or approval;
- dispatch, new agent/sub-agent, next WorkUnit, or direct Worker contact.

PRESERVE_CONTROL_STATUS_SHA256: b1b3b6962d0a0a17f98379b566f00d5208adbb7eef395d4887cdf0b5fbe7c050
RESULT_REQUIREMENTS:
- facts cite exact repository commit/path/line or committed evidence;
- options clearly separate verified capability from missing authority;
- U1/U2/U3 remain OPEN;
- product/control pre/post branches, HEADs, tracked status, and preserved
  untracked fingerprints match;
- write only result and pointer; RETURN_TO foundation-advisor; STOP.

DO_NOT_EXECUTE_FROM_MEMORY: true
READ_REFERENCED_FILES_DIRECTLY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
STOP_AFTER_RETURN: true
```
