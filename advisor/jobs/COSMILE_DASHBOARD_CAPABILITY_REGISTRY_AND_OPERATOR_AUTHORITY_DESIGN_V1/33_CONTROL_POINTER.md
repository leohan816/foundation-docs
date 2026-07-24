# 33 — Control Pointer (O1 Operator Authority Contract)

```text
MISSION: COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1
ACTOR: Foundation Control · RETURN_TO foundation-advisor · PROPOSED_NEXT_ACTOR: Advisor
STATUS: COMPLETE — documentation-only · READY_FOR_ADVISOR_INTEGRATION
HANDOFF: 30_CONTROL_AUTHORITY_HANDOFF.md (docs commit 59b97137e671547d947ff4a92e5b05e2798751cf; blob fddbc75b27ef8fb878a02f088e0b3b7854231029; sha256 651636d2dc99330f44cc1a6e665e4702b2e120f7827ff3cd8ce19360f5900645 — VERIFIED)
```

## Deliverables (this mission directory)
```text
RESULT:  31_CONTROL_OPERATOR_AUTHORITY_CONTRACT.md  sha256 64eae3d61b3550bbd093a2cc36e92ed8ba065a0e52c1f9cfeb31a8a4c7f132bd
RESULT:  32_CONTROL_RESULT.md (36 lines, ceiling 80)  sha256 7b4c20669f431e02bf12e426f6e543df099788d9fe9ab1e6875c78bfa9cf655e
POINTER: 33_CONTROL_POINTER.md (this file)
DIR:     advisor/jobs/COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1/
```

## Evidence pins
```text
PRODUCT: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1 @ 3dc5129b573237a85f34bfa65a329a299d31fef2 (clean, unchanged, read-only)
DOCS:    /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
INPUTS:  00, 11, 12, 14 + Strategy 30_STRATEGY_CONSOLE_DASHBOARD_AUTHORITY_CONFLICT_EN.md
SOURCE:  auth/{o1Operator,googleOidc}.ts · order/stepUp.ts · console/{session,permission,guard,adminWrite}.ts · runtime/o1CommerceRuntime.ts:537-547 · api/o1/operator/{reconciliation,orders/[orderId]/refund}/route.ts · order/repository.ts · prisma/schema.prisma (first-hand)
```

## Headline
```text
DELIVERED:  frozen 7-part operator-authority contract (C1–C7) + INV-0 + System A/B mapping + do-not-weaken list
INV-0:      a Console login (or a customer session, or a source-defined capability) must NOT mint O1 economic authority — currently TRUE at the command layer; the fix must keep it true
CORE:       R3 = identity/plane split (System A gates screens, System B gates data/actions), NOT an economic hole; System B (allowlist + single-use step-up + full-only refund/no-inventory-restore + transactional fail-closed audit) is intact and must be preserved
UNRESOLVED: UD1–UD7 Founder decisions (canonical OperatorPrincipal, ConsoleUser→capability mapping, catalog granularity, durable grant lifecycle+revocation, durable freshness+prod step-up, operator-subject audit attribution, per-route screen-guard) — preserved, NOT decided
```

## Compliance
```text
PRODUCT_OR_CONTROL_REPO_WRITE: ZERO   SCHEMA/MIGRATION/CODE_PROPOSED: NONE   SECURITY_WEAKENED: NONE
CANONICAL_POLICY_DECIDED: NONE (STOP-preserved as UD1–UD7)   PROVIDER/NETWORK/DB/ENV/AUTH/PREVIEW ACTION: NONE
COMMIT/PUSH: NONE (left to Advisor)   SUBAGENT/DISPATCH: NONE
RETURN_TO: foundation-advisor   STOP
```
