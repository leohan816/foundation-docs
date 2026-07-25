# COSMILE Console / Dashboard / Lab / Operator Authority — Integrated Design Contract

```text
MISSION: COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1
PRODUCT_PIN: 3dc5129b573237a85f34bfa65a329a299d31fef2
STATUS: DESIGN CANDIDATE — INDEPENDENT REVIEW REQUIRED
PRODUCT_IMPLEMENTATION_AUTHORITY: NONE
```

## 1. Evidence precedence and corrections

1. Direct source at the product pin is primary.
2. `22_DESIGNER_SURFACE_MAPPING.md` is the final row universe for current surfaces.
3. `21_DESIGNER_IA_CONTRACT.md` is the IA/truth-presentation contract.
4. `31_CONTROL_OPERATOR_AUTHORITY_CONTRACT.md` supplies verified current security behavior and do-not-weaken gates.
5. This file resolves contradictions and freezes the target design; it does not authorize implementation.

Corrections:

- Current `/console/**/page.tsx` count is **12**, including root `/console`; Worker count 11 omitted the root.
- Current preview categorical counts are ConsoleUser=1, ConsoleSession=2, ConsoleAuditLog=2. Worker `ConsoleSession=0` is stale/unsupported.
- `/console/login` is intentionally unauthenticated; current protected pages call `requireConsoleUser`, while the shared layout is not an auth boundary.
- `22_` individual row dispositions are authoritative. Its §8 range phrase “M01–M19” does not override M03=`LAB`; canonical Main rows are only those whose table disposition is `MN`.
- Preview counts/zeroes are synthetic non-production evidence only.

## 2. Frozen space and route contract

| Space | Permanent operator question | Contract | Current state |
|---|---|---|---|
| `/console` | 무엇을 대화로 요청했고 어떤 검토 산출물이 생겼는가? | Korean-first conversation/control workspace. Plans, artifacts and approvals stay truthfully labeled. | `PARTIAL_V0_MOCK`; no live AI/service control |
| `/dashboard` | 지금 사람이 확인하거나 제한적으로 처리해야 할 운영 사실은 무엇인가? | Operational visibility and only existing evidence-bounded actions. | namespace absent; current O1 surfaces sit under `/console` |
| `/lab` | 어떤 후보가 어떤 증거와 승격 관문을 충족했는가? | Read-only promotion-candidate registry. | namespace absent |

Candidate route placement, not implementation:

```text
/console
/console/c/[id]
/console/jobs

/dashboard
/dashboard/requests
/dashboard/requests/[orderId]
/dashboard/fulfillment
/dashboard/finance
/dashboard/activity
/dashboard/settings

/lab
/lab/[capabilityId]
```

No `/dashboard/inventory` until an aggregate inventory-risk read exists. No `/dashboard/customers` because the safe projection excludes customer/PII. No analytics Main route. Existing wrong-namespace/legacy paths are transition or retirement candidates only and cannot be deleted before parity/evidence review.

## 3. Canonical classification registry

The canonical row universe is the 106 directly mapped rows in `22_`:

| Disposition | Rows | Meaning |
|---|---:|---|
| `MAIN_NOW` | 26 | evidence-eligible minimum operational capability/action |
| `MAIN_LATER` | 27 | truthful later Console/settings capability; no current-live implication |
| `LAB` | 31 | read-only evidence/promotion candidate only |
| `RETIRE_CANDIDATE` | 22 | preserve until replacement mapping/parity; no immediate deletion |

Release timing:

| Timing | Rows |
|---|---:|
| Paid Beta blocker | 19 |
| Controlled Live blocker | 13 |
| Required soon after beta | 9 |
| Optional growth | 27 |
| Deferred program | 38 |

These are surface/action rows, not unique product-feature counts. Row-level source, truth, authority and treatment remain in `22_`.

Main is limited to: action-required requests, order facts, fulfillment waiting, order-level committed/HOLD inventory fact, reconciliation counts/HOLD, existing bounded support/shipment/full-TEST-refund/recovery surfaces, and recent sensitive-action evidence only when a closed safe read exists. Missing aggregate inventory and recent-activity reads render `UNAVAILABLE`, never zero.

## 4. Dashboard datum contract

Every datum must provide:

1. one operator question;
2. exact system-of-record/read contract;
3. confirmed-zero vs unavailable/not-configured/not-collected/stale/synthetic/unverified state;
4. required capability and step-up status;
5. permitted and prohibited action;
6. loading/empty/denied/error/HOLD/recovery presentation.

The closed vocabulary in `21_` §3 is frozen. `SYNTHETIC` and `UNVERIFIED` are additive badges. Failed/unavailable reads never become zero. Unknown state/action categories become HOLD. No raw PII, provider payload/key, secret, internal identifier or fabricated KPI is displayed.

## 5. Canonical OperatorPrincipal

The permanent authority root is a provider-neutral internal `OperatorPrincipal`, distinct from:

- `CustomerAccount`/shopper session;
- customer `AuthIdentity`;
- a Console session token;
- a source-defined capability.

An OperatorPrincipal represents one human operator and may bind approved authentication credentials. A Console credential/session may authenticate that human but **does not itself grant an O1 capability**. Customer identity is never an operator credential or grant source. The current customer-derived Google-sub operator is a non-production compatibility boundary to preserve until a separately reviewed migration; it is not the permanent principal model.

Required principal states are `active | suspended | revoked`; all other/unknown states deny. Display name/email/session ID are never authority keys.

## 6. Capability catalog and runtime grants

The source-owned catalog is a closed definition registry. Initial catalog definitions, bounded to current evidence, are:

```text
console.workspace.read
console.workspace.request_mock
dashboard.operations.read
orders.read
service_requests.read
service_requests.support_acknowledge
fulfillment.read
shipment.record
inventory_hold.read
reconciliation.read
reconciliation.recover
refund.full_execute
audit.sensitive_read
settings.boundary_read
```

`console.workspace.request_mock` remains non-live. Catalog membership does not grant authority.

A runtime grant is a separate persistent authorization fact containing, conceptually: principal, exact capability, optional closed scope, grant source, granted-by principal, reason category, activation time, optional expiry, state `active|suspended|revoked|expired`, and revocation evidence. This is a contract, not a schema proposal.

Evaluation is default-deny and requires all of:

1. valid operator session bound to one active OperatorPrincipal;
2. active, unexpired, unrevoked exact capability grant;
3. exact scope match where scoped;
4. action-bound step-up when the command requires it;
5. server command-bound enforcement and transactional audit.

Git/source defines catalog entries only. It never creates a principal, grant, session, step-up freshness or runtime authority.

## 7. Step-up, nonce, revocation and audit

- Preserve issuer/immutable-subject structural validation, email-never-a-key and default-deny.
- Sensitive refund, stock-adjustment and recovery authority requires action/scope/role/reason-bound, single-use, expiring freshness plus the exact grant. A secret alone is insufficient.
- Replay, stale, missing, mismatched, already-consumed or restart-lost freshness denies with zero economic effect.
- Current in-process nonce is fail-closed on restart but is not multi-instance/durable evidence; durability is a Controlled Live blocker.
- Principal suspension/revocation or grant revocation must be effective before the next command evaluation and invalidate relevant active sessions/freshness.
- Sensitive action audit must be transactional/fail-closed and attribute the OperatorPrincipal, role/capability, action, closed scope, reason category and outcome without secret/PII/provider payload. Current missing operator-subject attribution is a Controlled Live blocker.
- Legacy best-effort Console audit cannot replace or weaken the O1 economic audit.

## 8. Command enforcement and current compatibility rule

The current O1 command boundary remains authoritative until a separately reviewed implementation replaces it:

- runtime flag;
- exact allowlisted operator resolution;
- exact capability-equivalent action check;
- sensitive-action nonce/step-up consumed before provider/mutation;
- closed outcomes;
- idempotency/replay protection;
- full refund only, no inventory restoration;
- count-only reconciliation;
- transactional audit.

Screen access never substitutes for command authority. A valid Console owner session that lacks the current O1 boundary must remain denied rather than bypassed.

## 9. Lab and retirement contract

Lab fields: capability ID/name, current source, truth class, disposition/timing, data state, authority owner, evidence commit and unresolved risk. Gates are `PASS_EVIDENCED | FAIL | HOLD | NOT_APPLICABLE`.

Lab may inspect/filter/copy an evidence reference/navigate only. It cannot approve, promote, invoke a dry-run, execute AI, call an O1 command or mutate orders/payments/inventory/customers.

Retire candidates remain present until replacement parity, authority review and rollback evidence exist. No redirect/deletion is authorized by this design mission.

## 10. Implementation gates retained for a later mission

1. Independent design review PASS.
2. Exact route/file/schema proposal returned before product write; this mission authorizes none.
3. OperatorPrincipal persistence and Console credential binding design.
4. Capability catalog and runtime grant persistence/revocation design.
5. Durable freshness and operator-subject audit attribution.
6. Exact screen/read/command capability matrix.
7. Legacy bypass and transition mapping with no command-authority weakening.
8. Korean-font visual validation, mobile/accessibility verification and truthful state tests.
9. No Golden Commerce/storefront economic or customer-ownership semantic change.

HARD STOP before implementation.
