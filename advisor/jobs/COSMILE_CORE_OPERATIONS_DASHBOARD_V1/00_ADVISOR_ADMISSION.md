# 00 — Advisor Admission

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`

```text
VERDICT: PROCEED_WITH_LIMITS
PRODUCT_BASE: 6486019e0968de5671e43521e5cfb40d03b0bdca
PRODUCT_BRANCH: implementation/cosmile-core-operations-dashboard-v1-20260725
PRODUCT_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1
DOCS_BASE: 6bf7cd28d0013810f561bb218daccd3ca785b149
DOCS_BRANCH: advisor/cosmile-core-operations-dashboard-v1-20260725
PUBLIC_RUNTIME: predecessor worktree at product 6486019 on 127.0.0.1:3000 via cosmile.leohan.net
ROLLBACK: predecessor 3dc5129 process evidence and owner-only rollback wrapper present
```

## M0 facts

- Product and docs mission worktrees were created from the exact approved pins; both start clean.
- Public preview remains in the predecessor implementation worktree and was not restarted or mutated.
- Dedicated synthetic PostgreSQL is loopback-only on port 55450; `_prisma_migrations` exists; `OperatorPrincipal` does not.
- Protected Toss TEST store is a regular non-symlink `leo:leo` 0600 file; required key names are SET. Values were not read or copied.
- Existing sessions only: Designer `foundation-designer` = Codex gpt-5.6-sol/max; Worker `cosmile` = Claude Opus 5/xhigh; Reviewer `foundation-reviewer-fable5` = Fable 5/max. Each requires exact mission CWD/input re-verification before dispatch.

## Frozen authority catalog

Read-only initial grants are limited to:

- `dashboard.operations.read`
- `service_requests.read`
- `orders.read`
- `fulfillment.read`
- `reconciliation.read`

No mutation/economic capability is admitted. Catalog definitions never create authority.

## Frozen current read truth

- Request queue: `o1OperatorServiceRequestQueue`
- Recent order/fulfillment projection: `o1OperatorOrderList`
- Reconciliation counts/status: `readO1ReconciliationProjection`
- Request detail/action projection: existing O1 operator panel/read boundary; writes remain excluded
- Audit, aggregate inventory risk, product/customer KPI: no admitted authoritative Dashboard read contract yet; must render `UNAVAILABLE`, `NOT_CONFIGURED`, or `NOT_IMPLEMENTED`, never zero.

## Module stops

No product write before Designer candidate and independent design review. No DB write before the M2 transaction/rollback handoff is frozen. No provider, payment, economic, production/shared DB, real PII, public-release, merge, or next-mission authority.
