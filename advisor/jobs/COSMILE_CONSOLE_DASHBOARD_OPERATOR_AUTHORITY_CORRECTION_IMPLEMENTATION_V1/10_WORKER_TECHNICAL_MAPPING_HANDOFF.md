# Worker Handoff — P0 Read-only Technical Mapping

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
PHASE: P0_TECHNICAL_MAPPING
ACTOR: existing Cosmile Worker
MODE: READ_ONLY
PRODUCT_WRITE/TEST/BUILD/DB/RUNTIME/PROVIDER: PROHIBITED
RETURN_TO: foundation-advisor
```

## Binding and authority

- Work only in `/home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`.
- Verify branch `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`, HEAD `3dc5129b573237a85f34bfa65a329a299d31fef2`, clean state, and no upstream divergence.
- Read current Agent Office rules, repository `AGENTS.md`/`CLAUDE.md`, app rules, security/env/migration policy, and test-meaning policy.
- Load `/home/leo/Project/skill/fable-builder/SKILL.md` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`. Load `implementation-report-template` only for the compact return.
- Current Agent Office authority overrides historical foundation-docs role text.

## Canonical contract

Read the exact reviewed design package at:

`/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1/advisor/jobs/COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1/`

Required files: `40_ADVISOR_INTEGRATED_DESIGN_CONTRACT.md`, `51_INDEPENDENT_DESIGN_REVIEW.md`, `60_ADVISOR_FINAL_AUDIT.md`, `61_FINAL_POINTER.md`, `31_CONTROL_OPERATOR_AUTHORITY_CONTRACT.md`, `21_DESIGNER_IA_CONTRACT.md`, and only the row-level portions of `22_DESIGNER_SURFACE_MAPPING.md` needed to anchor the implementation.

## Exact output

Inspect direct source only as needed and return one smallest executable proposal:

1. A contract-to-code table for M1–M5. Every row must name the approved contract, current load-bearing symbol/path, proposed exact symbol/path, focused test, failure category, and preserved invariant.
2. Exact module sequence and exact path ceiling per module. Do not use wildcard ceilings.
3. Minimum schema decision. If schema is required, list exact additive models/fields/enums/FKs/indexes, migration/down behavior, no-backfill consequence, deletion behavior, and why no smaller reuse is safe. No schema write.
4. Exact provider-neutral `OperatorPrincipal` and Console credential binding. Console authentication must not mint a capability; customer identity/session must never become operator authority.
5. Exact source capability catalog, persistent runtime grant lifecycle/scope/revocation, default-deny evaluation, screen-read guards, and command-bound checks.
6. Exact preservation of current O1 allowlist/step-up/nonce/idempotency/refund/HOLD/reconciliation/audit semantics, including how operator-principal attribution is added without exposing PII or provider values.
7. Exact route/component transition: `/console` mock conversation truth, `/dashboard` reviewed Main Now only, `/lab` read-only registry only, and safe handling of current wrong-namespace routes without deletion or duplicate permanent consoles.
8. Exact tests-first focused commands per module, one disposable PostgreSQL migration/DB boundary if needed, final typecheck/build/focused integration/browser evidence, cleanup, and rollback.
9. Exact stop conditions or unresolved contract contradictions. Do not silently choose a weaker authority model.

## Prohibited

No product/config/schema/migration/test edit; no test/build/typecheck/generate/install; no DB/container/runtime/browser/provider/preview action; no secrets/PII/identifiers; no broad inventory; no Designer/Control/Reviewer dispatch; no implementation.

## Durable return

Author only these mission result files under the matching foundation-docs job directory:

- `11_WORKER_TECHNICAL_MAPPING.md`
- `12_WORKER_TECHNICAL_MAPPING_RESULT.md` (maximum 80 lines)
- `13_WORKER_TECHNICAL_MAPPING_POINTER.md`

Report exact changed docs paths, product changed paths `NONE`, Git state, material blockers, and `RETURN_TO: foundation-advisor`; then STOP.
