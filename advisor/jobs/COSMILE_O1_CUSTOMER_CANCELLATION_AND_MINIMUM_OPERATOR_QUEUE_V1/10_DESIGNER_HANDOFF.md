# Advisor Handoff — Bounded Cancellation and Operator Queue Experience Design

```text
MISSION_ID: COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
PHASE: TARGETED_DESIGN_AND_AS_BUILT_FREEZE_INPUT
INSTRUCTION_GATE: PROCEED_WITH_LIMITS
RESPONSIBLE_ADVISOR: foundation-advisor
ACTOR: foundation-designer
SESSION: foundation-designer:0.0
MODEL: gpt-5.6-sol
EFFORT: max
RETURN_TO: foundation-advisor

PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
PRODUCT_BRANCH: implementation/cosmile-o1-cancellation-operator-queue-v1-20260721
PRODUCT_BASE: 92331e755323d9b4d750a3da0b721df36197f588
PRODUCT_UPSTREAM: origin/implementation/cosmile-o1-cancellation-operator-queue-v1-20260721
DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
DOCS_BRANCH: advisor/cosmile-o1-cancellation-operator-queue-v1-20260721

AUTHORITY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/roles/designer.md
- PRODUCT_REPOSITORY/AGENTS.md
- PRODUCT_REPOSITORY/CLAUDE.md
- this exact committed handoff

SKILL: /frontend-design
SKILL_REQUIREMENTS:
- use the two-pass visual/interaction plan;
- preserve the existing subject-specific token/layout system;
- cover mobile, keyboard, screen-reader, focus, reduced-motion, and truthful blocked/recovery states;
- critique only the bounded proposed change against the existing UI; no redesign.

OBJECTIVE:
Perform a short repository-local as-built inspection and define the smallest implementable customer cancellation and minimum operator-queue experience. The Advisor will use this artifact to freeze state transitions, paths, invariants, modules, and acceptance tests before code writes.

READ_ONLY_INSPECTION_SCOPE:
- current O1 customer order history/detail surfaces;
- current O1 operator order/list/detail and protected step-up surfaces;
- current order, payment/refund, inventory reservation, shipment, reconciliation, audit, identity, and authorization contracts needed to ground the experience;
- existing focused tests/evidence only as needed to identify truthful states and reusable components.
Do not perform broad repository inventory, runtime, build, test, DB, schema, migration, credential, provider, browser, or network action.

FOUNDER-FROZEN EXPERIENCE:
1. Pre-capture: customer cancellation safely closes the pending internal intent and releases only its matching active reservation; no provider refund or duplicate economic effect.
2. Paid and unshipped: customer creates a request; an allowlisted operator with fresh protected step-up processes exactly one full TEST refund; order/refund state remains truthful; inventory stays committed/HOLD and is never automatically restored.
3. Shipped: customer creates return/support request only; no automatic cancellation, refund, stock restoration, or courier action.
4. Customer order/history shows eligibility, one bounded action, request state, refusal/recovery state, and final state.
5. Existing operator/console structure receives the smallest actionable cancellation/return-support queue backed only by O1 state.
6. Ownership, authorization, replay, audit, and reconciliation fail closed; legacy/mock/admin paths never bypass O1 truth.

REQUIRED DESIGN CONTENT:
- current reusable screens/components/routes and exact evidence paths;
- state/eligibility matrix for pre-capture, paid-unshipped, shipped, already-requested, terminal, and reconciliation/HOLD cases;
- customer action/copy/state projection, including pending, accepted, refused, completed, unavailable, and recovery states;
- minimum operator queue fields, filters limited to actionable state, detail/actions, step-up placement, replay response, and safe error recovery;
- mobile-first customer behavior and web-first/mobile-usable operator behavior;
- accessibility/reduced-motion/focus/live-region requirements;
- exact candidate implementation paths, ordered modules, collision boundaries, and tests-first acceptance matrix;
- whether the current schema can represent the frozen scope; if not, the smallest additive information required, stated as a proposal only;
- explicit exclusions, unknowns, and STOP conditions.

DESIGN_GUARDS:
- reuse existing storefront, order-detail, and operator-console patterns;
- no visual system, dashboard, storefront, navigation, popup, or general UX redesign;
- no code implementation, schema/migration write, runtime, provider, secret, DB, or product-data action;
- no customer automatic refund, partial refund, full return lifecycle, exchange, courier integration, live/production/PII, AI, or unrelated feature;
- do not redefine existing payment/order/refund/inventory semantics;
- no Actor dispatch, sub-agent, self-review, or next mission.

EXACT WRITE PATHS ONLY:
1. PRODUCT_REPOSITORY/설계자료/COSMILE_O1_고객취소_최소운영큐_설계서.md
2. DOCS_REPOSITORY/설계문서/cosmile/COSMILE_O1_고객취소_최소운영큐_설계서.md
3. DOCS_REPOSITORY/runs/shared/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1/20_DESIGNER_RESULT.md
4. DOCS_REPOSITORY/runs/shared/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1/21_DESIGNER_POINTER.md

WRITE_RULES:
- source design document first; version/date/change history inside;
- docs mirror must be byte-identical to the source document;
- no other file;
- explicit-path commits and non-force pushes in both approved branches;
- product source/runtime remains unchanged;
- result <=80 lines and follows Agent Office minimal-reporting protocol.

COMPLETION:
Return the exact product/docs commits, four-path result index, as-built findings, proposed path/module/test freeze, schema disposition, limitations, and Git/upstream state to foundation-advisor, then STOP. Do not approve your own design.
```
