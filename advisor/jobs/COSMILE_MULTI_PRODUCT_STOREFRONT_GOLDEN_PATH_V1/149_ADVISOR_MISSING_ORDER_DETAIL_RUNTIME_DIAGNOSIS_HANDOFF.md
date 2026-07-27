# WORKER HANDOFF — MISSING ORDER-DETAIL RUNTIME INTEGRATION DIAGNOSIS

## Decision and stop

- Human gate: **FAIL**. Golden Reversal remains HOLD.
- Product pin: `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, clean/upstream-equal.
- Diagnose only. No product/docs source edit, test, build, restart, cache cleanup, browser mutation, DB mutation, provider/refund/economic action, mock data, or speculative patch.
- Keep the separately approved `/dashboard/orders` list-enrichment requirement open but do not inspect or combine its implementation here.

## Binding

- Same existing Cosmile Worker only; actual Opus 5/xhigh; exact mission CWD.
- Load current Worker rules and `/home/leo/Project/skill/fable-builder/SKILL.md` required references.

## Exact source-read ceiling

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/app/dashboard/requests/[orderId]/page.tsx`
3. `app/src/components/commerce/O1OperatorPanel.tsx`
4. `app/src/app/api/o1/operator/orders/[orderId]/route.ts`
5. `app/src/lib/runtime/o1CommerceRuntime.ts`
6. `app/src/lib/order/service.ts`
7. `app/src/lib/order/repository.ts`

No eighth source path.

## Exact bounded evidence

1. Process: prove port-3000 PID/process group, CWD, command/build mode, current worktree HEAD/clean/upstream, and safe flag categories only (`development`, TEST, one-shot OFF, local substitute OFF). Never print env values beyond these categories.
2. Route: prove which source route renders the paid-row `요청 상세` URL and whether it mounts `O1OperatorPanel`.
3. Durable line: using the runtime DB boundary internally and one read-only transaction only, select the sole paid order categorically and report counts/booleans only:
   - line count;
   - title-present, SKU-present;
   - quantity/unit/total present and arithmetic exact.
   Never print any ID, title, SKU, subject, cookie, secret, or provider reference.
4. Server projection: from the exact repository/service composition, determine whether that paid order would return `lines` or fail closed, including line count and arithmetic/category only. Do not invoke a mutation or bypass authority. If a direct authorized API response cannot be inspected without obtaining/replaying a secret, say `AUTHENTICATED_RESPONSE_UNOBSERVABLE`; do not weaken auth.
5. Rendered code: inspect current `.next/dev` and the single public/local detail-page response/chunk only as necessary to determine whether `op-order-lines` / `주문 라인` is in the currently served client artifact. Use the paid order id internally only; do not print or persist it. At most one local and one public GET of that detail page, no browser.
6. Visibility: determine whether the table is absent from the served artifact, conditionally suppressed, or rendered below/after another region so it is outside the initial human viewport. Inspect the exact JSX order and CSS only; no geometry experiment.

## Return

Write compact:

- `151_WORKER_MISSING_ORDER_DETAIL_RUNTIME_DIAGNOSIS.md`
- `152_WORKER_MISSING_ORDER_DETAIL_RUNTIME_DIAGNOSIS_POINTER.md`

Return one exact cause if provable, otherwise `UNKNOWN`, plus the smallest frozen correction candidate and exact path/test ceiling. Do not implement. Commit/non-force push docs only, then STOP.
