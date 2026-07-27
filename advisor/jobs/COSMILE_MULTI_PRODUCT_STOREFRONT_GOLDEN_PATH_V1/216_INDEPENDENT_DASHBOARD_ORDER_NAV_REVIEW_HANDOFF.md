# 216 — INDEPENDENT DASHBOARD ORDER/NAV DELTA REVIEW

- Classification: `NORMAL_BOUNDED_UI`; existing independent Reviewer only.
- Required live binding: actual `claude-opus-5` / max; `/fable-sentinel`; exact mission CWD; read-only independence.
- Product delta: `b39e914bd65899b1dd05de277124fc9eb0ffc80a..52343f5c6633558ac6ec489b201e5d7746762ab5`.
- Contract/evidence: freeze `206/207`, stale-oracle correction `212/213`, Worker result `214/215`.
- Report actual model/effort/skill. Do not infer from the tmux/session name.

## Exact six-path subject

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/src/lib/operator/capturedSalesSummary.ts`
4. `app/scripts/o1_core_dashboard_orders.vitest.ts`
5. `app/scripts/o1_core_dashboard_reads.vitest.ts`
6. `app/scripts/o1_core_dashboard_payments.vitest.ts`

Inspect the exact diff and only minimum load-bearing context needed to decide:

- visible order number is the primary encoded detail link; title/`외 N건` is secondary and internal `orderId` is never displayed;
- the KST today/7d/30d helper counts only finite KRW captured amounts, excludes future/invalid time, and fails unavailable at the bounded-read ceiling instead of presenting partial totals;
- captured-payment and completed-refund counts link only to the existing truthful destinations, while order count, Recent Orders and each visible recent order number use the frozen routes without extra reads/actions;
- the stale M4 oracle correction removed only five now-legitimate read-display tokens while retaining authority, direct-data-access, command/provider, mutation, identity and privacy prohibitions;
- changed paths are exactly six and no capability/query/route/schema/provider/economic authority or effect was added;
- assess whether the Orders first-column label and the Recent Orders adjacent list link faithfully satisfy the frozen identity/navigation contract.

Preserved Worker evidence: meaningful RED `4 failed / 30 passed`, then the single corrected focused GREEN `54 passed / 54`, exit `0`. Do not rerun tests, build, typecheck, browser, DB, runtime or provider actions.

Write only:

- `218_INDEPENDENT_DASHBOARD_ORDER_NAV_REVIEW.md`
- `219_INDEPENDENT_DASHBOARD_ORDER_NAV_REVIEW_POINTER.md`

Result <=50 lines; verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`; exact findings and residual limits only. Commit/non-force-push docs and `RETURN_TO: foundation-advisor`; STOP.
