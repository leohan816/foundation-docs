POINTER BLOCK
RESULT_WRITTEN
TARGET_PROJECT: cosmile
ROLE_ACTOR: Worker
RESULT_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/151_WORKER_MISSING_ORDER_DETAIL_RUNTIME_DIAGNOSIS.md
POINTER_FILE: ../foundation-docs/advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/152_WORKER_MISSING_ORDER_DETAIL_RUNTIME_DIAGNOSIS_POINTER.md
FOUNDATION_DOCS_COMMIT: 75260e1ad0b4606c3c7d6154d0e3db1fbd098b24 (handoff) — this result committed separately
RUNTIME_REPO: ../Cosmile
RUNTIME_COMMIT_STATUS: unchanged 48939e86cc9c3e9da8cf55659ec247cc91e8e071 (no product change)
RETURN_TO: Advisor
NEXT_ACTOR: Advisor

## Status

**CAUSE PROVEN** — diagnosis only, nothing implemented.

- Handoff `149` at docs `75260e1`; computed sha256 `dfee8c280aaef2c2e2e18908afa07b950afa35cfedd714e16342d63b8a8e9bac`.
- **Exact cause:** `/dashboard/orders` provides **no navigation** to `/dashboard/requests/[orderId]` — that page contains zero `href`/`Link`/`router.`/`요청 상세`/`requests/` occurrences. The detail page, panel, projection and order-line table all exist and are served correctly; `.next/server/app/dashboard/requests` has never been compiled, consistent with the route never being visited.
- **Secondary contributor:** when the detail page is reached directly, `op-order-lines` is the panel's last region — after the summary, the action region, the mobile notice and the message — so it plausibly sits below the initial viewport. Code-order finding, no geometry experiment run.
- Process: PID `2830525`, PGID `2830489`, CWD the mission app, `next-server (v16.2.9)`, categories only — development, Toss TEST, one-shot OFF, local substitute OFF. No env value printed.
- Durable line (one read-only txn, counts/booleans only): 1 paid order, 1 line, title/SKU/quantity/unit/total all present, **arithmetic exact**, historical snapshot ref null.
- Server projection would return `lines` (count 1) and **not** fail closed; the API route returns the whole view, so nothing is dropped in transit. Authenticated response not replayed: `AUTHENTICATED_RESPONSE_UNOBSERVABLE`; no auth weakened.
- Served artifact **contains** the table (`op-order-lines` ×4, `주문 라인` ×6). Zero local and zero public GETs were needed or performed.
- Correction candidates (not implemented): (1) link `/dashboard/orders` rows to `/dashboard/requests/[orderId]` — belongs to the separately approved list-enrichment requirement, left open and not combined; (2) move `op-order-lines` directly after the summary section, ceiling `O1OperatorPanel.tsx` + `o1_operator_request_detail_ui.vitest.ts`, re-anchoring the existing slice-to-EOF oracle rather than weakening it.
- Containment: no product/docs source edit, test, build, restart, cache cleanup, browser, DB mutation, provider, refund, economic action, mock or speculative patch. Read-only within the seven-path ceiling. Docs-only commit.

RETURN_TO: Advisor
