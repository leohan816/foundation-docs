# 12 Technical Mapping Result (P0, read-only) — max 80 lines

MISSION `COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1`. Product pin `3dc5129` (branch `implementation/cosmile-console-dashboard-authority-correction-v1-20260724`, clean, no upstream). Handoff 10 verified (blob `2468cc80`, sha256 `0d5be723`, docs `b6dab88b`). Contract read from design pkg 40/31/21/22/51/60/61 + direct source. **No product/test/build/DB/runtime write.** Full detail in `11_WORKER_TECHNICAL_MAPPING.md`.

## Smallest executable proposal (5 modules; M1–M2 executable now, M3–M5 Founder-blocked)
- **M1** Dashboard/Lab IA namespace + neutral shell extract — NO_SCHEMA, reuse `O1ConsoleQueue/Fulfillment/Finance` + `o1ConsoleView` classifier; ADD `app/src/app/dashboard/{layout,page,requests/page,requests/[orderId]/page,fulfillment,finance,activity,settings}/page.tsx`, `app/src/app/lab/{page,[capabilityId]/page}.tsx`, `components/operator/OperatorShell.tsx`, `lib/dashboard/capabilityRegistry.ts`. **No `/console/*` delete/redirect** (parity).
- **M2** Per-route screen-guard hardening (R1/UD7) — NO_SCHEMA; explicit `requireConsoleUser` in each new page; layout stays non-boundary; command gates untouched.
- **M3** Provider-neutral `OperatorPrincipal` + Console/Google credential binding — schema; INV-0 (login mints no capability; customer identity never operator authority). **BLOCKED UD1/UD2.**
- **M4** Closed 14-name capability catalog + persistent `CapabilityGrant` + default-deny 5-req evaluation + command-bound checks at existing O1 routes. **BLOCKED UD3/UD4.**
- **M5** Durable `StepUpFreshness` + additive operator-subject audit attribution + immediate revocation. **BLOCKED UD5/UD6/UD7.**

## Schema decision
`NO_SCHEMA` for M1/M2. M3–M5 REQUIRE additive-only models `OperatorPrincipal`(+enum state), `OperatorCredentialBinding`, `CapabilityGrant`(+enum state), `StepUpFreshness`, and a nullable `operatorPrincipalId?` on the economic-audit row. Forward=create; down=drop; no-backfill (env-allowlist compatibility persists, existing audit rows stay subject-null); deletion=state→`revoked`, never hard-delete. No smaller reuse safe: ConsoleUser/Session=password identity, env allowlist has no lifecycle/scope/revocation, in-memory nonce non-durable, `ConsoleAuditLog.userId` is a ConsoleUser FK (Google-sub operator un-attributable). **No schema write in this phase.**

## Authority (frozen, not weakened)
INV-0: neither a Console session, a customer session, nor a source-defined capability alone confers O1 economic authority — requires active OperatorPrincipal + exact unrevoked grant + action-bound single-use step-up + default-deny + transactional audit. Screen access never substitutes for command authority. Preserved verbatim: Google `(issuer,subject)` structural match + email-never-a-key; unconfigured→deny; step-up single-use consumed before mutation + secret-alone-insufficient + timing-safe; full-only refund w/ `inventoryRestored:false`; count-only reconciliation; transactional fail-closed audit; idempotency. Operator-principal attribution added additively (subject-ref/category only; no PII/provider/key/target-id).

## Route transition
`/console`=conversation/mock only (`V0 MOCK · 실제 서비스 제어 없음`); `/dashboard`=Main Now (D01,D03,D04,D05,D07 overview; D02,D06 detail) with truth strip + `운영 권한 계약 대기`, missing aggregate inventory / recent-activity = `UNAVAILABLE` not zero; `/lab`=read-only registry (6 gates, no execute/promote/dry-run). Wrong-namespace legacy = transition/retire candidate — no deletion/redirect/duplicate console.

## Tests-first + evidence
Per-module RED→GREEN focused command (M1 `o1_dashboard_ia.vitest.ts`; M2 `o1_dashboard_guard.vitest.ts`; M3 `operator_principal.dbtest.py`; M4 `operator_evaluate.vitest.ts`+`operator_capability_grant.dbtest.py`; M5 `operator_freshness_revocation.dbtest.py`). One disposable Postgres boundary for M3–M5. Final (impl pin): typecheck+build (generate-first)+focused integration+browser+Korean-font/mobile/a11y. Rollback = per-module `git revert`; additive migrations down-drop cleanly.

## Material blockers / STOP
- M3–M5 **STOP** pending Founder UD1–UD7 (canonical principal + customer separation; Console binding w/o login-minting; least-privilege granularity; durable grant lifecycle + immediate revocation; durable/multi-instance freshness + production step-up; durable operator-subject audit; screen-guard hardening w/o command weakening).
- Executable-now floor = M1+M2 (Dashboard shows `권한 계약 대기`; command authority preserved). Authority correction proper returns for UD closure first.
- Do not silently choose a weaker authority model. No implementation performed.

PRODUCT_CHANGED_PATHS: NONE. RETURN_TO: foundation-advisor. STOP.
