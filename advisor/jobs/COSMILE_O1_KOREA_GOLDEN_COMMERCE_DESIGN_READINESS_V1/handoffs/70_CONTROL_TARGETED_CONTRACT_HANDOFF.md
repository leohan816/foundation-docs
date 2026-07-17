# Control Handoff — Phase 6 Targeted Cross-project Contract Analysis

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P6-CONTROL-TARGETED-CONTRACT
ACTOR: foundation-control
ROLE: Foundation Team internal Control
MODE: TARGETED_READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
EFFORT: max (user-selected; do not reduce)
WORKSPACE: /home/leo/Project/foundation-control
REQUIRED_SKILL: NONE (Control must not load a product-implementation skill)
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9
EVIDENCE_COMMIT: c8f16404602cece33a66fcb261998bd7efe6f1c8
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/70_TARGETED_CROSS_PROJECT_CONTRACT_ANALYSIS_POINTER.md
RETURN_TO: foundation-advisor
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_OR_CONTROL_REPOSITORY_WRITE: ZERO
NO_NEW_AGENT_OR_SUBAGENT: TRUE
```

Read the complete bilingual mission authority, current Agent Office Control role, current
`foundation-control/CLAUDE.md` only as project-local historical/context evidence subordinate to
Agent Office authority, and these exact evidence files from `EVIDENCE_COMMIT`:

- `10_FOUNDATION_PRODUCT_FACTS_AND_ELIGIBILITY.md`
- `20_COSMILE_AS_BUILT_AND_REUSE.md`
- `40_DESIGNER_EXPERIENCE_DESIGN.md`
- `60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md`

The Foundation Worker Phase 5 bounded snapshot-delivery design is not yet available because the
approved Fable 5 runtime rejected dispatch before work began. Do not replace, infer, or author that
role-owned design. Mark any dependency on it explicitly `UNRESOLVED_PENDING_FOUNDATION_WORKER`.

Answer only these material cross-project questions:

1. Define the candidate `foundation_product_id <-> cosmile_sku_id` contract, including mapping
   cardinality, variant identity, snapshot/version pins, approval/gate categories, acknowledgement,
   replay/idempotency and which side owns each field. Do not invent Foundation delivery paths.
2. Validate canonical ownership versus commerce ownership at catalog, cart/checkout and immutable
   historical order-line boundaries. State exactly which Foundation snapshot fields Cosmile may
   reference/display and which Cosmile commercial fields Foundation must never own.
3. Validate correction, supersession, withdrawal, stale-last-approved, missing-initial and
   Foundation-unavailable behavior. Ordinary commerce must not synchronously depend on Foundation;
   only affected listings may be contained and historical orders must not be rewritten.
4. Validate commerce state authority and transaction/compensation boundaries for inventory
   reservation, PSP capture/server verification, order confirmation, refund, reconciliation and
   operator recovery. Identify cross-system invariants without designing repository-local code.
5. Identify exact cross-repository dependencies, acknowledgement/evidence responsibilities,
   fail-closed points, possible single points of failure and the minimum safe integration sequence.
6. Reconcile any material conflict among the four inputs. Separate facts, candidate contract,
   assumptions, unknowns, required owners and Leo decisions. Treat the 34-vs-45 Prisma model-count
   discrepancy as non-material unless it changes a contract conclusion.
7. List only the bounded later ownership/migration decisions this mission must carry forward. Do
   not start them and do not broaden into Memory V3, SIASIU, recommendation, production or a general
   architecture redesign.

For every proposed contract element include: `OWNER`, `SOURCE_OF_TRUTH`, `CONSUMER`, `VERSION_OR_ID`,
`FAILURE_BEHAVIOR`, `CORRECTION_BEHAVIOR`, `EVIDENCE`, `STATUS`, and `REQUIRED_DECISION_OWNER` where
unresolved. Exact path or technology not proven from current evidence must be `PATH_STATUS:
UNRESOLVED` rather than inferred.

Do not implement, patch, test, run, contact a provider, access DB/endpoint/secret/PII, select
product policy, accept risk, dispatch another actor, or modify Foundation, Cosmile, SIASIU or
foundation-control. Write only the exact result and pointer paths, report SHA-256, return to
foundation-advisor, and STOP.
