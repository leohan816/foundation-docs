# M3A Account and Order History — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M3A_ACCOUNT_AND_ORDER_HISTORY`
BASE: `5033a97751f028c410f2b66987bb5804b15e0979`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Use the existing Cosmile Worker at Claude Opus 4.8/xhigh in the exact mission worktree. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact return.

## Exact path ceiling

1. `app/src/app/account/page.tsx`
2. `app/src/app/account/orders/page.tsx`
3. `app/scripts/o1_account_order_history.vitest.ts` (new)

No fourth path. Do not change order detail, checkout/cart, request component/API, projection/repository/auth/payment/economic logic, schema/migration, CSS, manifest/lock/config, or legacy O1-OFF behavior.

## Frozen behavior

### Account

- Detect O1 only with the existing server-side O1 runtime gate; do not invent another truth source.
- O1 ON shows generic `게스트` or `회원`, existing auth control, and exactly two live menu items: `주문내역`, `장바구니`.
- O1 ON does not fetch or render wishlist, AI 상담, personalization, consultation, or mock-user identity. Guest copy: `로그인하면 장바구니와 주문내역을 이어서 볼 수 있어요.` Member copy remains generic and PII-free.
- O1 OFF preserves the existing wishlist/consult/mock-user menu and behavior unchanged.

### Order history

- Preserve the existing ownership-scoped Prisma query, order links, totals, and closed service-request badge helper.
- In the same file, provide distinct states: loading `주문내역을 불러오는 중…` with busy/live semantics; current empty state and `/shop` action; bounded query/auth error `주문내역을 불러올 수 없어요.` with a keyboard-accessible same-page `다시 확인`.
- Never render a raw/unknown order status. Closed labels are `결제 대기 | 주문 확정 | 배송 완료 | 주문 취소 | 환불 완료`; every unsupported value renders `상태 확인 중`.
- History rows contain no cancellation/support action and at most the existing single closed request badge.
- Do not create a timeline, date, actor, reason, ETA, percentage, identifier, or state not already present.

## Tests first

Create one focused adversarial source-contract test proving:

- O1 account uses the existing runtime gate, avoids wishlist query/render and AI/mock identity in its branch, and exposes only orders/cart while legacy remains;
- history loading/empty/error are distinct and accessible;
- unknown order status is closed and raw enum fallback is absent;
- the existing request badge is the only request projection and no request action is added.

Expected RED: account always fetches/renders wishlist and AI menu; history has no bounded loading/error state and falls back to a raw status.

Run only from `app/`:

`./node_modules/.bin/vitest run scripts/o1_account_order_history.vitest.ts -t "O1 account and order history coherence"`

Run once for RED, patch only the two page files, then run the identical command once for GREEN. No install, generate, build, typecheck, broad test, DB/runtime/browser/provider/network.

## Closure

Inspect exact three-path diff, `git diff --check`, package/lock unchanged, and no new ignored residue. Preserve worktree-local `node_modules`. One truthful additive commit and non-force push; clean/upstream-equal. Return <=60 lines and STOP before M3B.

If a distinct state requires a new route/API/projection/schema or changes ownership, return `HOLD`.

RETURN_TO: `foundation-advisor`
STOP.
