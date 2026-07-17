# POINTER — 60 COSMILE REPOSITORY-LOCAL TECHNICAL DESIGN (Phase 5)

```text
MISSION_ID:  COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
WORKUNIT_ID: O1-P5-COSMILE-REPOSITORY-TECHNICAL-DESIGN
ACTOR:       cosmile (repository-owner Worker)  ·  MODE: NON_EXECUTABLE_REPOSITORY_LOCAL_TECHNICAL_DESIGN_ONLY
RETURN_TO:   foundation-advisor
RESULT:      runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md
RESULT_SHA256: 05095cfdc700f7f37b03d9ff2174ea3a049a1ef086ff395416e15fc0f6ea984b
RESULT_SIZE: 489 lines / 51121 bytes
AUTHORITY_COMMIT: 24b94ef6a0673a6fa350a3e21a83ca22506afde9  ·  EVIDENCE_COMMIT: b632529f2907e19f92f27770eac4208d60d4cb7d  ·  HANDOFF_HEAD: d24c03b0414d070682d39f84aff07613b4da7c57
PIN:         Cosmile branch shadow/m4-cosmile-memory @ b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6 (verified pre+post)
PRODUCT_WRITES: 0  ·  DB_CHANGES: 0  ·  RUNTIME/PROVIDER/TXN: 0  ·  SUBAGENTS: 0  ·  IMPLEMENTATION_AUTHORIZED: NO
```

## RESULT SUMMARY
Non-executable, repository-local **Phase 5 technical design** for the Korea/KRW sandbox Golden Order and a
separate captured-payment Golden Reversal, anchored to pinned evidence (`10_/20_/30_/40_`, all SHA-256
cross-checked — `10/20/30` match Designer-published hashes; authority file matches the Foundation Worker's
recorded hash) and to first-hand Cosmile code at HEAD `b8b61d7`. It **maps** the Designer experience contract
onto Cosmile-owned architecture and **does not** redefine experience or Foundation canonical ownership, select
a final provider/policy/topology/credential/live activation, propose a rewrite, or touch product code/DB.

Covers all handoff bullets: (1) frontend/backend/operations separation reusing the server-authoritative
cart / `resolveUnitPrice` / owner-scoped order-history / console RBAC-audit / Foundation verdict-display
seams; (2) exact API/service/adapter boundaries + future file-level write-ownership (all landing in Cosmile
`own` ontology entities); (3) the **four** bounded replacements only — RC-1 customer identity, RC-2 payment
(+ real refund replacing the unreachable `refunded` label), RC-3 inventory control, RC-4 catalog/single-price
authority — each with exact evidence, failed invariant, impact, seam-bounded alternative, migration
consequence, and why-repair-insufficient; (4) order/payment/inventory/fulfillment/shipment/cancellation/
return/refund/reconciliation/incident state machines projected into the Designer experience-state vocabulary;
(5) **charge only after the availability boundary is secured** — reserve → intent → provider capture →
server-verify → commit, with compensation on every failure edge and last-item concurrency via a default-deny
oversell guard; (6) provider-neutral OIDC customer-auth adapter, direct Kakao OIDC provisional, with
eligibility/consent/collision/recovery gates open; (7) PSP adapter, direct Toss Payments V2 provisional (PortOne
V2 alternative), webhook-as-notification + mandatory server pull-verify + expected order/amount/KRW binding +
idempotency + replay/out-of-order/missing/recovery; (8) design-only schema/migration plan (new payment/refund/
inventory/reconciliation/identity/snapshot truth, unique+partial-unique+CHECK invariants in raw SQL, additive/
nullable, `order_no` UUID/ULID resolving C2, backfill, `down.sql` rollback, disposable ephemeral-PG test); (9)
Foundation local snapshot consumption boundary (async not synchronous; snapshot pin = vault_commit+tree_hash+
data_version+formula_version; **order lines immutable** under later correction/withdrawal); (10) authorization/
privacy/secret-PII-minimization/audit/incident invariants; (11) separate Golden Order (GO-1) and captured
Golden Reversal (GR-1) acceptance under the `SANDBOX_WALKING_SKELETON_EVIDENCE` ceiling, no auto-progression;
(12) WU-0…WU-G implementation WorkUnits with dependencies, safe parallelization, design-level estimates,
external calendar gates, and rollback/HOLD conditions, plus a reviewed **non-executable** scope proposal.

## NEXT ACTION ROUTING
- **foundation-advisor:** integrate `60_…` as the Cosmile Worker Phase-5 output alongside Designer `40_…`,
  Foundation Worker `10_…`, and provider research `30_…`; route to the **Independent Reviewer** (Phase 8).
- **Targeted Control (Phase 6) requested:** validate `foundation_product_id ↔ cosmile_sku_id`, canonical-vs-
  commerce ownership at the order line, Foundation-unavailability behavior, transaction/compensation boundary,
  and the "historical order line immutable under snapshot correction" invariant.
- **Leo decisions carried (no silent selection):** identity provider, PSP, guest checkout, `order_no` scheme,
  operator step-up/dual-approval, stale-snapshot threshold/owner — plus all external confirmations (merchant/
  KYC/test-channel, Kakao eligibility/consent, Legal/MFDS/rights R1–R6, courier/support/SLA, Postgres/hosting).
- **No STOP/early-return condition triggered** — canonical sources verified, no prohibited access used, no
  DB/secret/PII/transaction/provider action, no Korea/KRW/O1 reversal, no rewrite-only path, no role/ownership
  conflict.

## POINTER BLOCK
- Result: `…/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md` (sha256 `05095cfd…984b`, 489 lines / 51121 bytes)
- Pointer: `…/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN_POINTER.md` (this file)
- Output worktree branch: `advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717`
- Commit/push **not** in this handoff's scope — left to the Advisor (sibling `10_/20_/40_` precedent).
- Cosmile product repo: HEAD `b8b61d746e…` unchanged; 0 tracked changes; six pre-existing untracked docs preserved.

**STOP — returned to foundation-advisor.**
