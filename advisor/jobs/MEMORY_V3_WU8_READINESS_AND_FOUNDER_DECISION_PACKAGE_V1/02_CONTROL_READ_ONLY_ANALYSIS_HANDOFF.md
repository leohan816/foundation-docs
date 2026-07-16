# Foundation Control Read-Only WU8 Readiness Analysis Handoff

```text
MISSION_ID: MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1
WORK_UNIT_ID: WU8-READINESS-CONTROL-ANALYSIS-001
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
ROLE: Control
ROLE_MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/foundation-control
TARGET_BRANCH: shadow/m5-ingress-gate
TARGET_HEAD: c89b792bed177aad9322e09debecc76caab0c8a0

FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6

COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f

FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
HANDOFF_AUTHORITY_COMMIT: d1e0272208c50818e2c6f40fb7af77d21ecf4de2
HANDOFF_AUTHORITY_FILE: advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/00_EXACT_MISSION_HANDOFF.md

ACTUAL_MODEL: verify live before work
EFFORT: high — verify live before work
REQUIRED_SKILL: /fable-builder
```

## Required current-authority reads

Read directly before analysis:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/control.md`
- the exact committed mission handoff above
- Foundation `AGENTS.md` and `CLAUDE.md`
- Cosmile `AGENTS.md` and `CLAUDE.md`

## Required pinned evidence

Use the committed evidence and pinned source directly. At minimum read:

- previous C Control result:
  `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_CONTROL_CONTRACT_RESULT.md`
- final C implementation-ready design and its reviewed corrections:
  `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md`
- independent WU7 implementation review:
  `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_WU7_IMPLEMENTATION_REVIEW_RESULT.md`
- final C Shadow Advisor audit:
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/111_M2_C_WU1_WU7_ADVISOR_FINAL_AUDIT.md`
- final A/B implementation review:
  `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_FOCUS_DELTA_REVIEW_RESULT.md`
- Founder D1–D3 decision:
  `advisor/jobs/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/24_M2_FOUNDER_D1_D3_DECISION.md`

Read pinned Foundation and Cosmile source only as needed to validate load-bearing facts.
Do not use working-tree dirt as authority and do not modify either repository.

## Analysis objective

Produce evidence-backed cross-project input for an Advisor-authored Founder Decision
Package covering exactly:

1. `D8-1` authenticity and ingress authority;
2. `D8-2` current consent, revocation, and erasure propagation;
3. `D8-3` delivery, retry, ordering, durability, dead-letter, idempotency, and
   backpressure requirements;
4. `D8-4` the accepted-evidence to current-Foundation-candidate bridge, including
   `furef_v2` absence and retention mismatch;
5. `D8-5` adverse legal/retention and guest/anonymous identity boundaries.

For each item provide verified facts, the unresolved question, at most three concrete
options, a Control recommendation for Advisor consideration, consequences, deferred
items, and the required decision owner (`Leo`, `Security`, `Legal`, or a combination).

Also provide:

- the minimum coherent future WU8 design scope if the Founder later selects options;
- separate boundaries for delivery design, delivery implementation, activated intake,
  and durable/current candidate runtime;
- a proposed gated execution sequence ending in a HARD STOP before implementation;
- facts that current evidence cannot prove and whether a repository-owner Worker is
  genuinely required for narrow read-only verification.

Do not make Founder policy decisions and do not create an implementation-ready product
design. Do not route or dispatch another actor.

## Allowed actions and writes

Allowed actions are local read-only Git/source/evidence inspection at the exact pinned
commits and writing only these two foundation-docs artifacts:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/CONTROL_READ_ONLY_ANALYSIS_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/CONTROL_READ_ONLY_ANALYSIS_RESULT_POINTER.md
```

Do not stage, commit, or push. The Advisor publishes returned artifacts.

## Strict prohibitions

```text
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: forbidden
WU8_CODE_OR_PRODUCT_DESIGN: forbidden
DB_MIGRATION_DOCKER_NETWORK_PROVIDER_SECRET_CREDENTIAL: forbidden
FEATURE_FLAG_OR_RUNTIME_CHANGE: forbidden
TRANSPORT_CONSUMER_SENDER_ENDPOINT_BROKER_POLLING: forbidden
DELIVERY_OR_ACTIVATED_INTAKE: forbidden
DURABLE_CURRENT_MEMORYCANDIDATE_RUNTIME: forbidden
REAL_USER_APPROVAL_REUSE_PROMOTION_RANKING_SAFETY_MUTATION: forbidden
PRODUCTION_LIVE_FULL_PACKAGE_1B_M3: forbidden
NEW_AGENT_SUBAGENT_OR_ACTOR_DISPATCH: forbidden
```

If a prohibited action or an authority conflict is required, return `HOLD` with exact
evidence. Otherwise write the two declared artifacts, return only the compact pointer to
`foundation-advisor`, and STOP.
