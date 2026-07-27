# 232 — ADDITIVE FREEZE: ORDER CREATION TIME

Status: **PROCEED; SUPERSEDES ONLY THE SIX-PATH CONTRACT IN HANDOFF 230**

Worker source delta is still zero. The exact six-path ceiling remains unchanged.

## Existing durable mapping

- `Order.createdAt` is an existing non-null durable `DateTime`.
- `operatorOrderData` already reads the same `Order` row once for `orderNo` and `status`.
- Widen that same SELECT with `createdAt`; no new query, join, repository authority or schema is needed.

## Additive contract

- Raw operator data adds `createdAt: Date | null`; the public operator view adds `createdAt: string | null`.
- The service emits exact `toISOString()` only for a valid finite `Date`; missing/invalid becomes null, never current time or another inferred value.
- The panel renders one `주문 시각` fact in the existing order summary.
- Valid value is formatted in `Asia/Seoul` and visibly suffixed `KST (UTC+9)`.
- Null or invalid client input displays exactly `확인 없음`.
- Do not localize or change any other status/copy.

## Tests-first addition

Before RED, extend the two already-frozen test deltas:

- lifecycle: exact ISO propagation from durable `createdAt`; invalid/missing becomes null; allowed public key set gains only `createdAt` and `option`;
- UI: pure formatter proves valid KST label and null/invalid `확인 없음`; source pins `주문 시각` and explicit `KST (UTC+9)`.

Then run the same single RED, implement the same four source paths, and run the identical single GREEN from handoff 230. No seventh path or extra command.

Worker result paths are now `234_WORKER_ORDER_DETAIL_LINE_PRESENTATION_RESULT.md` and `235_WORKER_ORDER_DETAIL_LINE_PRESENTATION_POINTER.md`, written uncommitted for Advisor.
