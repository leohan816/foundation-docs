# 12 Technical Mapping Result (P0, read-only) — CORRECTED per 14/15 — max 80 lines

MISSION `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`. Product pin `3dc5129` (branch `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`, clean, no upstream). Correction handoff 15 verified (blob `36ece8f6`, sha256 `0a5d13fd`, docs `c9461835`). Contract: design pkg 40/31/21/22 + gate 14 + correction 15 + direct source. **No product/test/DB/runtime write.** Detail in `11_`.

## Executable module plan (decisions CLOSED; M1–M5 all executable)
- **M1** Dashboard/Lab IA namespace + neutral shell — NO_SCHEMA, reuse `O1ConsoleQueue/Fulfillment/Finance`+`o1ConsoleView`; ADD `app/src/app/dashboard/**` + `lab/**` + `components/operator/OperatorShell.tsx` + `lib/dashboard/capabilityRegistry.ts`. No `/console/*` delete/redirect.
- **M2** Per-route `requireConsoleUser` hardening (R1) — NO_SCHEMA; layout stays non-boundary; command gates untouched.
- **M3** provider-neutral `OperatorPrincipal` + `OperatorCredentialBinding`; new `resolveOperatorPrincipal` reads principal/binding/grant + independent Google issuer/subject+allowlist eligibility, and **must NOT read customer `AuthIdentity`/session** (removes `o1CommerceRuntime.ts:537-547` from the operator path). Login mints no capability.
- **M4** frozen 14-name `capability.ts` catalog + persisted `CapabilityGrant` + `evaluate.ts` default-deny 5-req (reads principal/binding/grant state per request) wired around existing O1 route gates.
- **M5** additive nullable `operatorPrincipalId?` on the **exact existing `ConsoleAuditLog`** (`schema.prisma:355`, written by `order/repository.ts:31` `writeAuditTx`) + revocation read per request. **In-process nonce UNCHANGED; NO `StepUpFreshness` persistence** (multi-instance durability = Controlled Live residual, 15§5).

## Schema decision
NO_SCHEMA (M1/M2). M3–M5 additive-only: `OperatorPrincipal`(+`enum OperatorState`), `OperatorCredentialBinding`(FKs→OperatorPrincipal/ConsoleUser, `@@unique([kind,subjectRef])`), `CapabilityGrant`(FK, `@@index([operatorPrincipalId,capability,state])`, +`enum GrantState`), and a nullable `operatorPrincipalId String?`+index on **ConsoleAuditLog** (no new audit model, no StepUpFreshness). Forward=create; down=drop; no-backfill (existing audit rows subject-null; clean candidate grants nobody by source/migration, 15§7); deletion=state→`revoked`. No smaller reuse safe (ConsoleUser/Session=password, env allowlist has no lifecycle, `ConsoleAuditLog.userId` is a ConsoleUser FK). **No schema write here.**

## Authority (frozen, not weakened)
INV-0: no Console session, customer session, or source capability alone confers O1 economic authority — requires active `OperatorPrincipal` + exact unrevoked grant + action-bound single-use step-up + default-deny + transactional audit. Independent eligibility = unchanged Google `(issuer,subject)` structural match + env allowlist, evaluated on the **operator credential**, never the customer session. Preserved verbatim: email-never-a-key; unconfigured→deny; in-process single-use nonce before mutation + secret-alone-insufficient + timing-safe; full-only refund `inventoryRestored:false`; count-only reconciliation; transactional fail-closed `ConsoleAuditLog` audit; idempotency. Screen access never substitutes for command authority.

## Capability→endpoint matrix (14-name catalog)
D01 queue=`dashboard.operations.read`+`service_requests.read`; D02 read=`service_requests.read`, support-ack=`service_requests.support_acknowledge`(step-up), refund `/api/o1/operator/orders/[orderId]/refund`=`refund.full_execute`(step-up), shipment=`shipment.record`(step-up); D03 fulfillment=`fulfillment.read`+`orders.read`; D04=`inventory_hold.read`(aggregate UNAVAILABLE); D05 `/api/o1/operator/reconciliation` GET=`reconciliation.read`; D06 POST=`reconciliation.recover`(step-up); D07=`audit.sensitive_read`(no list read yet=UNAVAILABLE); console/settings=`console.workspace.read`/`.request_mock`/`settings.boundary_read`.

## Route transition
`/console`=conversation/mock; `/dashboard`=Main Now (D01,D03,D04,D05,D07 overview; D02,D06 detail) + truth strip + `운영 권한 계약 대기`, missing reads=`UNAVAILABLE` not zero; `/lab`=read-only registry. O1 routes keep flag+independent-allowlist+unchanged step-up but switch operator resolution to `resolveOperatorPrincipal` (customer-only session → deny). Wrong-namespace legacy retained; **no delete/redirect** (only named non-mutating transition = additive `/dashboard`).

## Tests-first + evidence
Per-module RED→GREEN (M1 `o1_dashboard_ia.vitest.ts`; M2 `o1_dashboard_guard.vitest.ts`; M3 `operator_principal.dbtest.py`; M4 `operator_evaluate.vitest.ts`+`operator_capability_grant.dbtest.py`; M5 `operator_audit_attribution.dbtest.py`). One disposable Postgres for M3–M5; **tests insert synthetic principal/binding/grant rows** (no seed/UI/API). Final (impl pin): typecheck+build+integration+browser+Korean-font/mobile/a11y. Rollback=per-module `git revert`; additive migrations down-drop cleanly.

## Residuals / STOP
- Controlled Live residuals (not this mission): durable/multi-instance step-up freshness + real production step-up (in-process nonce kept, production deny-all); D07 recent-activity read; D04 aggregate inventory read.
- STOP only if a frozen choice needs weakening O1 semantics / broader schema / unapproved authority-economic decision — **none found; implementable additively.** No implementation performed.

PRODUCT_CHANGED_PATHS: NONE. RETURN_TO: foundation-advisor. STOP.
