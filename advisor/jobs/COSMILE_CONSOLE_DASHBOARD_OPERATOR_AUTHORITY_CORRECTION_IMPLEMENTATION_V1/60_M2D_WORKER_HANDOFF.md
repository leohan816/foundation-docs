# 60 — M2D Worker Handoff: Transactional Operator Audit Attribution

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M2D
BASE: 43ad9de61b9a972ca174faabc135044435a85a62
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCES: implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return
DB: one disposable loopback/tmpfs PostgreSQL with synthetic data only
PROVIDER_ECONOMIC_RUNTIME_EFFECT: 0
RESULT: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/61_M2D_WORKER_RESULT.md
POINTER: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/62_M2D_WORKER_POINTER.md
STOP_AFTER: M2D result
```

## Exact five-path ceiling

1. `app/src/lib/order/repository.ts`
2. `app/src/lib/order/serviceRequestContracts.ts`
3. `app/src/lib/order/serviceRequestService.ts`
4. `app/src/lib/order/serviceRequestRepository.ts`
5. `app/scripts/operator_audit_attribution.dbtest.py`

No sixth path. Do not edit schema/migration, order contracts, operator authority substrate, routes, UI, runtime, auth/session, package/lock/config, existing tests or preview.

## Exact mapping

Use the existing nullable `ConsoleAuditLog.operatorPrincipalId` only as transactional attribution. It grants no authority and changes no command outcome.

- Extend both transactional audit helpers to insert `operatorPrincipalId` in the same existing audit row and transaction.
- `orderRepository.bindCapturedOrder`: `actorRole === "system"` writes NULL; an already-step-up-authorized operator recovery writes existing `input.actorRef`.
- `orderRepository.finalizeRefund` and `recordFulfillmentTransition`: write existing `input.actorRef`.
- Customer pre-capture cancellation, paid-unshipped request and shipped-support request: write NULL.
- Shipped-support acknowledgement and paid-cancellation settlement: add `actorRef` to their repository port inputs, forward `input.operator.operatorRef` in the service, and write that value.
- Paid-cancellation admission remains read-only and unchanged.
- Keep `ConsoleAuditLog.userId`, actorRole/action/target/meta, history, mutation, idempotency, reconciliation, inventory and economic semantics unchanged.
- Unknown principal FK/audit failure must fail closed and roll back the coupled mutation. Idempotent/read-only outcomes add no audit row.

No customer/AuthIdentity/ConsoleUser id may populate `operatorPrincipalId`; no principal lookup or grant decision is added here.

## Tests first and one focused command

1. Add only `operator_audit_attribution.dbtest.py`.
2. Run only `python3 scripts/operator_audit_attribution.dbtest.py`; require meaningful RED because the five source mappings/column inserts are absent. Infrastructure SKIP is not RED or PASS.
3. Change only the four source paths.
4. Run the identical command; require GREEN.

The test must use the already-local PostgreSQL image only, loopback/tmpfs, committed migrations in lexical order, synthetic rows, and unconditional teardown. It must prove by counts/booleans/categories:

- all six operator audit dispositions carry the exact existing principal ref: operator captured-bind recovery, refund finalization, fulfillment transition, support acknowledgement, paid-cancellation completed settlement and recovery-HOLD settlement;
- system capture bind and all three customer dispositions keep attribution NULL;
- unknown principal/audit failure rolls back a representative coupled mutation;
- idempotent/read-only paths write zero audit rows;
- the four source paths contain the exact forwarding/null mapping and no customer/session authority mapping.

Output no identifiers, hashes, amounts, raw rows/errors, secrets or PII. No provider/network, real DB, Prisma generate, typecheck, build, Vitest/full suite, app/runtime start or public preview action.

Finish with `git diff --check`, exact five-path containment, package/lock unchanged, container/port cleanup, one truthful commit and non-force push, compact result/pointer in this job directory, then STOP. Do not start M3.
