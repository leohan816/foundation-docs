# 32 — Control Result (O1 Operator Authority Contract)

```text
MISSION: COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1
ROLE: Foundation Control (targeted authority contract only) · RETURN_TO foundation-advisor
PRODUCT @ 3dc5129b573237a85f34bfa65a329a299d31fef2 (live-verified clean) · DOCS worktree COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
HANDOFF 30_ docs 59b9713 blob fddbc75b sha256 651636d2 — verified match
STATUS: COMPLETE · documentation-only · no product/runtime/DB/env/auth/provider/commit action · no schema/code proposal
```

## Result
Frozen 7-part operator-authority contract in `31_`, built from first-hand source (not the Worker summary): `auth/{o1Operator,googleOidc}.ts`, `order/stepUp.ts`, `console/{session,permission,guard,adminWrite}.ts`, `runtime/o1CommerceRuntime.ts:537-547`, `api/o1/operator/{reconciliation,orders/[orderId]/refund}/route.ts`, `order/repository.ts` audit, `prisma/schema.prisma`.

## Central invariant (INV-0)
O1 economic authority (refund/inventory/recovery) is minted by **none** of: a ConsoleUser session alone, a customer session alone, or a source-defined capability. It requires canonical OperatorPrincipal (allowlisted immutable subject, issuer load-bearing) + action/scope/role/reason-bound single-use step-up + default-deny + transactional audit. **Currently TRUE at the command layer** — the fix must keep it true.

## Findings (present behavior, first-hand)
- **R3 is an identity/plane split, not an economic hole.** Screens gated by System A (`requireConsoleUser`); O1 data/actions gated by System B (`o1OperatorForCustomer` → customer `AuthIdentity(issuer,subject)` vs env allowlist, fail-closed 403). API command routes never consult System A, so a Console login already does not reach refund/recovery.
- **System B is the boundary to preserve:** structural Google-sub match + email-never-a-key (`scope=openid`), default-deny, single-use action-bound step-up (secret-alone-insufficient, timing-safe), full-only refund with NO inventory restore, count-only recovery, and **transactional fail-closed** economic audit (rolls back on audit-write failure).
- **No separate operator principal:** `OperatorContext` is derived from the *customer* session; role fixed `admin`. No operator/capability/grant table in schema.
- **Gaps (deferred persistence):** no grant lifecycle (activation/expiry/suspension/revocation) — B revocation = env+restart; nonce in-memory (restart-dropped, R4); operator **subject** not attributed on the economic audit row (`ConsoleAuditLog.userId` assumes a ConsoleUser). Legacy console audit is best-effort (weaker than the O1 lane).
- **R1** `console/layout.tsx` is not an auth boundary; guards are per-route (Advisor gate C2). **R2** admin VIEW open to any ConsoleUser; writes owner/admin.

## Classification (per handoff)
- SAFE REUSE / PRESERVE: System B authorization + step-up + command enforcement + transactional economic audit; System A human-auth + role-rank + session lifecycle as the Console/screen identity substrate.
- INCOMPATIBILITY: two disjoint identities/planes over one operator surface; operator identity derived from the customer principal; coarse fixed-admin.
- DEFERRED PERSISTENCE: operator principal, capability grants, grant lifecycle, durable step-up freshness, operator-subject audit attribution.

## Unresolved Founder decisions (STOP — not decided)
UD1 canonical OperatorPrincipal + customer/operator separation · UD2 ConsoleUser→O1 capability mapping without minting economic authority · UD3 capability granularity / fixed-admin vs least-privilege · UD4 durable grant lifecycle + immediate revocation before controlled-live · UD5 durable freshness + production step-up timing · UD6 durable operator-subject audit attribution · UD7 per-route screen-guard hardening. IA (Console vs Dashboard) is the Designer's (`20_`).

## Do-not-weaken (frozen)
Google (issuer,subject) structural match · issuer load-bearing · email-never-a-key · default-deny · single-use action/scope/role/reason-bound step-up · secret-alone-insufficient · full-only refund / no inventory restore · count-only recovery · transactional fail-closed audit · idempotency/reconciliation truth.

## Attestation
Read-only source at pinned HEAD (clean, unchanged). No schema/migration/code change proposed, no security property weakened, no canonical policy decided, no dispatch/subagent. RETURN_TO foundation-advisor. STOP.
