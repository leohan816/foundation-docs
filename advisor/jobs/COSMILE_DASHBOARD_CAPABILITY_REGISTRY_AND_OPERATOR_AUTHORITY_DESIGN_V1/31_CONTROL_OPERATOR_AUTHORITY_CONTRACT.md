# 31 — Control · O1 Operator Authority Contract (frozen)

```text
MISSION:  COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1
ROLE:     Foundation Control (targeted security/authority contract analysis only) · RETURN_TO foundation-advisor
MODE:     documentation-only · no product/runtime/DB/env/auth/provider action · no schema/migration/code proposal
MODEL:    claude-opus-4-8[1m] (session-reported) · effort runtime-default (not exposed; not reconfigured)
PRODUCT:  /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1 @ 3dc5129b573237a85f34bfa65a329a299d31fef2 (live-verified clean)
DOCS:     /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
HANDOFF:  30_CONTROL_AUTHORITY_HANDOFF.md (docs commit 59b9713; blob fddbc75b; sha256 651636d2… — verified match)
```

**Boundary.** This freezes an authority CONTRACT (invariants + system mapping). It proposes no schema, migration, route, or code; it decides no canonical policy that requires Founder risk acceptance (those are preserved unresolved in §5). It weakens nothing in Google-subject matching, O1 step-up, idempotency, audit, refund, inventory, or reconciliation.

## 0. Verified inputs and first-hand source

- Inputs read: `00_ADVISOR_ADMISSION`, `11_WORKER_AS_BUILT_REGISTRY`, `12_WORKER_AS_BUILT_RESULT`, `14_ADVISOR_P1_GATE`, Strategy issue `…/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1/30_STRATEGY_CONSOLE_DASHBOARD_AUTHORITY_CONFLICT_EN.md`.
- First-hand source (read at pinned HEAD; not trusted from the Worker summary): `app/src/lib/auth/{o1Operator,googleOidc}.ts`, `app/src/lib/order/stepUp.ts`, `app/src/lib/console/{session,permission,guard,adminWrite}.ts`, `app/src/lib/runtime/o1CommerceRuntime.ts:526-548`, `app/src/app/api/o1/operator/reconciliation/route.ts`, `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`, `app/src/lib/order/repository.ts` (audit lane), `app/prisma/schema.prisma` (model inventory).

## 1. Central invariant (frozen — the mission's non-negotiable)

**INV-0.** O1 economic authority (refund · inventory/stock adjustment · order recovery) is conferred by **none** of: (a) a `ConsoleUser` password session alone; (b) a customer/shopper session alone; (c) a capability merely defined in source. It requires, together and fail-closed: a canonical **OperatorPrincipal** (allowlisted, structurally-valid immutable subject, issuer load-bearing) **+** an action/scope/role/reason-bound **single-use step-up** **+** default-deny evaluation **+** a durable transactional audit. → *"A Console login must not silently mint O1 economic authority."* This invariant is currently TRUE at the command layer (§2 C6) and must remain so under any Console/Dashboard unification.

## 2. Frozen contract (C1–C7)

**C1 — Canonical OperatorPrincipal + strict customer/operator separation.**
- *Contract:* exactly one canonical OperatorPrincipal governs O1 operator authority; its authority key is the immutable, structurally-validated subject (today Google `(issuer, subject)`; `issuer` load-bearing = `GOOGLE_ISSUER` `googleOidc.ts:20`; `subject` = `/^[0-9]{1,64}$/` `o1Operator.ts:26`; email/display/session-id are never keys — WU-A requests `scope=openid` only `googleOidc.ts:80`). Default deny.
- *Present:* `OperatorContext{operatorRef=subject, role:'admin'}` is **derived from the customer session's** `AuthIdentity` (`o1CommerceRuntime.ts:537-547`). `ConsoleUser` (System A) is a *separate* password identity. Customer/operator separation is therefore **not structurally enforced** — operator authority is layered onto the customer principal, and a *third* identity (ConsoleUser) gates the screens.
- *Classification:* INCOMPATIBILITY (no single OperatorPrincipal; three identity notions over one surface) + FOUNDER DECISION (UD1/UD2).

**C2 — Capability catalog (definitions) vs persistent/runtime grants.**
- *Contract:* capability *definitions* are an enumerated source catalog; a *grant* (which principal holds which capability) is a runtime authority record and is never conferred by the definition.
- *Present:* vocabulary exists in source — `permission.ts:6-27` (`ConsoleAction`+`MIN_RANK`), `order/contracts` `SensitiveAction` = refund|stock_adjustment|order_recovery, `o1ConsoleView` operator action surface (refund→[op-stepup-secret,op-refund], support→[op-support-ack]). The only O1 operator "grant" = env allowlist `COSMILE_O1_OPERATOR_SUB_ALLOWLIST` `o1Operator.ts:19` → fixed role `'admin'` `:65` (no per-capability grant). System A grants = `ConsoleUser.role` via `can(role,action)` `permission.ts:29` + `V0_DISABLED_ACTIONS=[execute,publish]` `:34`.
- *Classification:* PARTIAL PRESENT (catalog exists; grant is coarse binary) + FOUNDER DECISION (UD3 catalog granularity; fixed-admin vs least-privilege).

**C3 — Grant source, activation, expiry, suspension/revocation, fail-closed evaluation.**
- *Contract:* every grant has an explicit source, activation, expiry/validity, and suspension/revocation path; evaluation is fail-closed (deny unless an active, unexpired, unrevoked grant matches).
- *Present:* B grant source = server-only env allowlist (exact match; default-deny on unconfigured/malformed/issuer-mismatch `o1Operator.ts:57-63`). **No** activation/expiry/suspension/revocation record for B — revocation = edit env + process restart (coarse, non-immediate). A session (`session.ts`) does have TTL 24h + `active` flag + logout `deleteMany` revoke. Fail-closed evaluation is PRESENT and strong.
- *Classification:* FAIL-CLOSED EVAL = SAFE REUSE (preserve) · grant lifecycle for B = DEFERRED PERSISTENCE + FOUNDER DECISION (UD4). A durable grant model must not relax default-deny.

**C4 — Action-bound step-up: nonce single-use / expiry / replay / freshness / restart.**
- *Contract:* sensitive actions require an action-, scope-, role-, reason-bound, single-use, server-verified step-up; the step-up secret alone is **not** authority (also requires an allowlisted operator and an exact grant match); freshness is single-use (replay denied); restart drops outstanding freshness (fail-closed).
- *Present:* exactly this — `makeO1StepUpVerifier` (`o1Operator.ts:125-140`: unconfigured→deny `:127`, wrong/absent secret→deny `:128-129`, `timingSafeEqual` `:91-96`) building the reviewed `makeTestOnlyExplicitStepUpVerifier` (`stepUp.ts:41-70`: validate-all-bounded-fields-before-match `:46-47`, match every bound field `:51-60`, single-use `:65-66`); default runtime = `unconfiguredStepUpVerifier` deny-all `stepUp.ts:21`. Refund route consumes the nonce **before** any provider/mutation `refund/route.ts:30` and builds dual provider+finalize verifiers `:43-52`.
- *Classification:* SAFE REUSE / **PRESERVE — DO NOT WEAKEN**. Only gap: freshness nonce is in-process (`o1Operator.ts:72`, bounded 256), restart-dropped (fail-closed direction) and not durable across instances (R4) = DEFERRED PERSISTENCE (UD5). Production step-up (MFA/route) is an acknowledged later WorkUnit; until then production must remain deny-all.

**C5 — Audit: subject / actor / action / scope / outcome evidence.**
- *Contract:* every sensitive operator action yields a durable, fail-closed audit recording actor (operator **subject**), actor role, action, scope (order/SKU), reason category, and outcome — category/count only; no secret/PII/provider-ref/payload.
- *Present:* O1 economic lane audit is **transactional & fail-closed** — if the audit write fails, the whole mutation **rolls back** (`order/repository.ts:8,29-31`; actions `order.bind_captured`/`refund_finalize`/`fulfillment_transition` `:181,232,276`); `OrderStatusHistory.actorType ∈ system|customer|operator` (`schema.prisma:1180`). Legacy console audit (`adminWrite.writeAdminAudit` `:22-37`) is **best-effort (swallows failure)**.
- *Gap (present behavior):* the O1 economic audit records `actorRole`+`reasonCategory` but **not the operator subject** (`ConsoleAuditLog.userId` is a `ConsoleUser` FK, left null for a Google-sub operator) — so "which operator" is not durably attributed on the economic audit row.
- *Classification:* transactional O1 audit = SAFE REUSE / **PRESERVE** (do not downgrade to the best-effort console pattern) · operator-subject attribution = DEFERRED PERSISTENCE + FOUNDER DECISION (UD6).

**C6 — Command-bound enforcement for reviewed O1 read + sensitive write.**
- *Contract:* every O1 command is enforced at the server boundary by (1) runtime flag gate, (2) allowlisted-operator resolution (fail-closed 403), (3) for sensitive writes single-use freshness consumed before any provider/mutation + exact step-up verdict, (4) closed-category outcomes only, (5) idempotency/replay + economic truth preserved (one refund; **no** inventory restore; count-only recovery). **Screen/view authority never substitutes for command authority.**
- *Present:* exactly this at the API routes — reconciliation `route.ts:24-27,39-42,60-89`, refund `route.ts:18-21,30,43-52,57-89` (full-only, `inventoryRestored:false` `:61`; reservation stays committed/HOLD `:7-8`). Reads are count-only/opaque. Enforcement is System B only (no `requireConsoleUser` on these routes).
- *Incompatibility (R3 core):* the **screen** plane (`/console/*` pages) is gated by System A `requireConsoleUser` (`guard.ts:5`) while the **command** plane is gated by System B — two disjoint authority planes over one surface (owner Console login sees "이 계정에는 O1 운영 권한이 없습니다"). Also R1: `console/layout.tsx` is not an authorization boundary; guards are per-route (Advisor gate C2).
- *Classification:* command-bound enforcement = SAFE REUSE / **PRESERVE — authoritative for all data/actions; must not be bypassed by screen-level (A) authority** · plane unification = FOUNDER DECISION (UD1/UD2) · per-route screen-guard hardening (R1) = repair without weakening command gates (UD7).

**C7 — Git/source registry defines capabilities but never grants runtime authority.**
- *Contract:* source may declare the capability catalog (action vocabulary, allowlist ENV *name*, step-up action set) but confers **no** runtime authority. Runtime authority = server-only env allowlist *value* + verified live identity + active session/grant + step-up secret + single-use freshness. Defining/committing a capability never grants it; removing an allowlist entry / rotating the secret / restart (dropping nonces) revokes at runtime.
- *Present:* PRESENT and correct — allowlist and step-up secret are env `o1Operator.ts:19-20` (not source-committed values); nonce is runtime in-memory `:72`; ConsoleUser/session are DB. Source holds only definitions and structural validators.
- *Classification:* PRESENT / **PRESERVE as an explicit invariant**. No Founder decision required.

## 3. Authority systems A and B — mapping

| Aspect | System A — ConsoleUser session (password) | System B — O1 operator (Google-sub allowlist + step-up) |
|---|---|---|
| Identity | `ConsoleUser` row + `cosmile_console_session` cookie (`session.ts:5,18-45`) | `OperatorContext` from customer `AuthIdentity(issuer,subject)` vs env allowlist (`o1CommerceRuntime.ts:537-547`, `o1Operator.ts:52-66`) |
| Roles/caps | owner>admin>editor>viewer, `can()` + owner/admin write; execute/publish v0-disabled | fixed `role:'admin'`; sensitive set refund/stock_adjustment/order_recovery |
| Gates | `/console` screens + legacy console APIs | O1 operator **data/actions** (finance/orders/fulfillment/reconciliation/refund/support/shipment) |
| Lifecycle | TTL 24h + `active` + logout revoke | env allowlist (no activation/expiry/revocation record); nonce in-memory single-use, restart-dropped |
| Audit | best-effort (swallows failure) `adminWrite.ts:22-37` | transactional fail-closed `order/repository.ts:8` (rolls back on audit failure) |
| Present truth | CURRENT_O1 (screen auth) | CURRENT_O1 (economic auth) |
| Safe reuse | human-operator auth + role-rank + owner/admin gate + session lifecycle → **Console identity / screen substrate** | authorization decision + step-up + command enforcement + economic audit → **O1 capability/enforcement layer to PRESERVE** |
| Incompatibility | not keyed to the operator subject; alone must never authorize O1 economic actions; weaker audit | operator identity derived from the **customer** session; coarse fixed-admin; no grant lifecycle / durable freshness / subject attribution |
| Deferred persistence | ConsoleUser→O1 capability mapping (none) | operator principal, capability grants, grant lifecycle, durable freshness, operator-subject audit |

## 4. Preserve — do not weaken (frozen)

Google `(issuer,subject)` structural matching + issuer load-bearing + email-never-a-key (`o1Operator.ts:26,58,60-63`; `googleOidc.ts:20,80`) · default-deny / unconfigured→deny (`o1Operator.ts:57`, `stepUp.ts:21`) · action/scope/role/reason-bound single-use step-up + secret-alone-insufficient + timing-safe compare (`o1Operator.ts:91-140`, `stepUp.ts:41-70`) · single-use freshness consumed before provider/mutation (`refund/route.ts:30`) · full-only refund with **no inventory restore** + count-only recovery (`refund/route.ts:7-8,61`; reconciliation `route.ts:77-89`) · transactional fail-closed economic audit (`order/repository.ts:8`) · idempotency/reconciliation truth. No unification may make a ConsoleUser or customer session sufficient for any of these.

## 5. Unresolved Founder decisions (STOP — canonical policy / risk acceptance; not decided here)

- **UD1** Canonical OperatorPrincipal identity: provider-neutral Console operator identity (Strategy recommendation) vs the Google-sub operator promoted to a first-class operator principal — and how it is **structurally separated from the customer identity**. (risk acceptance)
- **UD2** Whether/how `ConsoleUser` (A) maps to O1 operator capabilities — binding both planes to one principal **without** making a Console login sufficient for O1 economic actions.
- **UD3** Capability catalog granularity; whether O1 operator moves from fixed-`admin` to a least-privilege capability set.
- **UD4** Durable grant lifecycle (activation/expiry/suspension/revocation) + **immediate revocation** before any controlled-live (today env+restart only).
- **UD5** Durable step-up freshness (restart/multi-instance) and timing of a real production step-up (MFA/route); until then production remains deny-all.
- **UD6** Durable operator-**subject** attribution on economic audit (current `ConsoleAuditLog.userId` assumes a `ConsoleUser`; a Google-sub operator is unattributed by subject).
- **UD7** Screen-guard hardening (per-route `requireConsoleUser`; layout is not an auth boundary — R1) repaired without weakening command gates.

These are IA/authority-model choices for Leo/GPT (Designer owns the Console/Dashboard IA in `20_`). Control does not decide them.

## 6. Attestation

No product/runtime/DB/env/auth/preview write, test, build, provider/network action, commit, or push. Source inspected read-only at pinned `3dc5129b…` (clean, unchanged). No schema/migration/code change proposed; no security property weakened; no canonical policy decided. Durable output = this file + `32_CONTROL_RESULT.md` + `33_CONTROL_POINTER.md` in this mission directory. RETURN_TO foundation-advisor. STOP.
